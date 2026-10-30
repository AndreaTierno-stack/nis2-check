/**
 * Stage tests of evaluate on the synthetic mini-corpus (ADR 0016 and its amendment):
 * one case per stage, type exclusion per activity (decisive, demoted, ambiguous), the
 * 2×3 conflict, no_rule_matched, multiple matches, notices from different positions
 * with dedup, invalid answers, purity and inputHash.
 */
import { describe, expect, it } from 'vitest';
import type { Corpus } from '@nis2-check/corpus';
import { InvalidAnswersError, evaluate, type Answers } from '../src/index.ts';
import { serializeInput } from '../src/evaluate.ts';
import { sha256Hex } from '../src/sha256.ts';
import { miniCorpus } from './minicorpus.ts';

const base: Answers = { gate_a: 'no', gate_b: 'no', attivita: 'a1', extra: 'no', critico: 'no', dimension: 'grande' };
const run = (answers: Partial<Record<string, string | string[]>>, corpus: Corpus = miniCorpus()) =>
  evaluate({ sectorId: 'test', answers: { ...base, ...answers } as Answers }, corpus);
const steps = (v: ReturnType<typeof run>, stage: string) => v.reasoningTrace.filter((s) => s.stage === stage);
const finalStep = (v: ReturnType<typeof run>) => v.reasoningTrace.at(-1)!;

describe('mini-corpus', () => {
  it('is a valid corpus', () => {
    expect(() => miniCorpus()).not.toThrow();
  });
});

describe('stage 4: dimensional rules', () => {
  it('grande -> categorical importante, rule notice, sector signal', () => {
    const v = run({});
    expect([v.assessmentMode, v.outcome]).toEqual(['categorical_assessment', 'likely_in_scope']);
    expect(v.qualifica).toEqual({ value: 'importante', inferita: false });
    expect(v.notices).toEqual(['n_grande']);
    expect(v.signals).toEqual([{ id: 'sig_b' }]);
    expect(v.regimeRouting).toEqual([]);
    expect(steps(v, 'dimensional')).toEqual([expect.objectContaining({ result: 'matched', corpusText: 'Testo del corpus per grande.' })]);
    expect(finalStep(v)).toEqual(expect.objectContaining({ stage: 'resolution', result: 'decided' }));
  });

  it('piccola -> out_of_scope', () => {
    const v = run({ dimension: 'piccola' });
    expect([v.assessmentMode, v.outcome, v.qualifica]).toEqual(['out_of_scope', 'likely_out_of_scope', undefined]);
    expect(v.notices).toEqual(['n_piccola']);
  });
});

describe('stage 3: size-blind rules', () => {
  it('critico -> essenziale; the dimensional rules do not match', () => {
    const v = run({ critico: 'yes', dimension: 'piccola' });
    expect(v.qualifica).toEqual({ value: 'essenziale', inferita: false });
    expect(v.notices).toEqual(['n_critico']);
    expect(steps(v, 'dimensional')).toEqual([expect.objectContaining({ result: 'not_matched' })]);
  });
});

describe('stage 2: declared type exclusion, per activity (ADR 0016 amendment)', () => {
  it('the only declared activity excluded -> out_of_scope; dimension not evaluated, no dimensional notice', () => {
    const v = run({ attivita: 'a2', q_a2: 'si' });
    expect([v.assessmentMode, v.outcome]).toEqual(['out_of_scope', 'likely_out_of_scope']);
    expect(v.notices).toEqual(['n_escluso']);
    expect(v.signals).toEqual([]);
    expect(steps(v, 'dimensional')).toEqual([
      expect.objectContaining({ result: 'not_evaluated', code: 'dimension_not_evaluated', detail: 'dimensione non valutata: tipologia esclusa (c_map)' }),
    ]);
  });

  it('a further activity without exclusion -> stage 4 decides, the exclusion becomes its demoted notice', () => {
    const v = run({ attivita: 'a1', attivita_ulteriori: ['a2'], q_a2: 'si' });
    expect([v.assessmentMode, v.outcome, v.qualifica?.value]).toEqual(['categorical_assessment', 'likely_in_scope', 'importante']);
    expect(v.notices).toEqual(['n_grande', 'n_demoted']);
    expect(steps(v, 'type_exclusion')).toEqual([expect.objectContaining({ result: 'demoted', code: 'type_exclusion_demoted' })]);
    expect(steps(v, 'type_exclusion')[0]!.detail).toContain('a1');
  });

  it('every activity excluded, exclusive outcomes differing in mode -> the non-categorical one', () => {
    const v = run({ attivita: 'a2', attivita_ulteriori: ['a3'], q_a2: 'si', q_a3: 'y' });
    expect([v.assessmentMode, v.outcome]).toEqual(['qualitative_signal_only', 'likely_out_of_scope']);
    expect(v.notices).toEqual(['n_escluso']);
  });

  it('every activity excluded, one ambiguous -> ambiguous', () => {
    const v = run({ attivita: 'a2', attivita_ulteriori: ['a3'], q_a2: 'non_so', q_a3: 'y' });
    expect([v.assessmentMode, v.outcome]).toEqual(['qualitative_signal_only', 'ambiguous']);
  });

  it('the same activity as principal and further counts once', () => {
    const v = run({ attivita: 'a2', attivita_ulteriori: ['a2'], q_a2: 'si' });
    expect(v.outcome).toBe('likely_out_of_scope');
  });
});

describe('conflict (2)x(3)', () => {
  it('exclusion of every activity and size-blind inclusion -> the conflicts entry: outcome, notice and citations copied', () => {
    const v = run({ attivita: 'a2', q_a2: 'si', critico: 'yes' });
    expect([v.assessmentMode, v.outcome, v.qualifica]).toEqual(['escalate_to_advisor', 'ambiguous', undefined]);
    expect(v.notices).toEqual(['n_conflitto', 'n_escluso', 'n_critico']);
    expect(v.citations.slice(0, 2)).toEqual(['c_rule', 'c_map']);
    expect(finalStep(v)).toEqual(
      expect.objectContaining({ result: 'conflict', code: 'conflict_type_exclusion_size_blind', construct: expect.stringContaining('conflicts/conflicts__stages.yaml#conflicts[0]') }),
    );
  });

  it('a demoted exclusion is no conflict: stage 3 decides', () => {
    const v = run({ attivita: 'a1', attivita_ulteriori: ['a2'], q_a2: 'si', critico: 'yes' });
    expect(v.qualifica?.value).toBe('essenziale');
    expect(v.notices).toEqual(['n_critico', 'n_demoted']);
  });

  it('without a conflicts entry the conflict still escalates (corpus defect), with no conflict notice', () => {
    const corpus = structuredClone(miniCorpus());
    corpus.conflicts = {};
    const v = run({ attivita: 'a2', q_a2: 'si', critico: 'yes' }, corpus);
    expect(v.outcome).toBe('ambiguous');
    expect(v.notices).toEqual(['n_escluso', 'n_critico']);
  });
});

describe('stage 1: regime routing', () => {
  it('one override -> regime meta copied; later stages suspended; no construct or sector-signal output', () => {
    const v = run({ gate_a: 'yes' });
    expect([v.assessmentMode, v.outcome]).toEqual(['escalate_to_advisor', 'ambiguous']);
    expect(v.regimeRouting).toEqual([
      { regimeId: 'reg_a', routingEffect: 'category_override', residualNisObligation: null, exceptionsCatalogEntry: 'reg_a_entry' },
    ]);
    expect(v.notices).toEqual([]);
    expect(v.signals).toEqual([]);
    expect(steps(v, 'dimensional')).toEqual([
      expect.objectContaining({ result: 'suspended', code: 'nis_assessment_suspended', partial: expect.objectContaining({ qualifica: 'importante' }) }),
    ]);
  });

  it('two overrides with an intersection -> intersection outcome and notice, routing in file order', () => {
    const v = run({ gate_a: 'yes', gate_b: 'yes' });
    expect(v.regimeRouting.map((r) => [r.regimeId, r.residualNisObligation])).toEqual([['reg_a', null], ['reg_b', 'registrazione']]);
    expect(v.notices).toEqual(['n_inter']);
    expect(finalStep(v).construct).toBe('wizard/wizard__test.yaml#multi_regime_intersection[0]');
  });

  it('two overrides without an intersection -> the common regime meta', () => {
    const corpus = structuredClone(miniCorpus());
    delete corpus.wizard['wizard/wizard__test.yaml']!.multi_regime_intersection;
    const v = run({ gate_a: 'yes', gate_b: 'yes' }, corpus);
    expect([v.assessmentMode, v.outcome]).toEqual(['escalate_to_advisor', 'ambiguous']);
    expect(v.notices).toEqual([]);
  });

  it('answer-level notices and signals survive routing', () => {
    const v = run({ gate_a: 'yes', extra: 'yes' });
    expect(v.notices).toEqual(['n_answer', 'n_grande']);
    expect(v.signals).toEqual([{ id: 'sig_a' }]);
  });
});

describe('corpus defects (unreachable with the real corpus)', () => {
  it('no rule matches -> escalate, no_rule_matched', () => {
    const corpus = structuredClone(miniCorpus());
    const s = corpus.sectors['sectors/sectors__test.yaml']!;
    s.qualification_rules = s.qualification_rules.filter((r) => !r.condition.startsWith('dimension == grande'));
    const v = run({}, corpus);
    expect([v.assessmentMode, v.outcome]).toEqual(['escalate_to_advisor', 'ambiguous']);
    expect(finalStep(v).code).toBe('no_rule_matched');
  });

  it('two rules of the same stage match -> escalate, multiple_rules_matched', () => {
    const corpus = structuredClone(miniCorpus());
    const s = corpus.sectors['sectors/sectors__test.yaml']!;
    s.qualification_rules.push({ ...s.qualification_rules[2]! });
    expect(finalStep(run({}, corpus)).code).toBe('multiple_rules_matched');
  });
});

describe('notices from different positions', () => {
  it('construct notices first, then answer-level; dedup keeps the first occurrence', () => {
    const v = run({ extra: 'yes' });
    expect(v.notices).toEqual(['n_grande', 'n_answer']);
    expect(v.signals).toEqual([{ id: 'sig_a' }, { id: 'sig_b' }]);
  });

  it('citations: deciding construct, then signals, then catalog entries, deduplicated', () => {
    const v = run({ extra: 'yes' });
    expect(v.citations).toEqual(['c_dim', 'faq_amb_di_1', 'racc_ue_2003_361', 'c_sig', 'c_cat']);
  });
});

describe('answers and purity', () => {
  it('invalid answers -> InvalidAnswersError', () => {
    expect(() => run({ q_a2: 'si' })).toThrow(InvalidAnswersError);
    expect(() => evaluate({ sectorId: 'nessuno', answers: base }, miniCorpus())).toThrow(InvalidAnswersError);
  });

  it('is deterministic and the disclaimer is unconditional', () => {
    const a = run({ extra: 'yes' });
    const b = run({ extra: 'yes' });
    expect(a).toEqual(b);
    expect(a.disclaimerRequired).toBe(true);
    expect(a.corpusVersion).toBe('0.0.1');
  });

  it('inputHash is the sha256 of the canonical input, independent of key and choice order', () => {
    expect(sha256Hex('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    expect(sha256Hex('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    const v = run({});
    expect(v.inputHash).toBe(sha256Hex(serializeInput('test', base)));
    expect(serializeInput('s', { b: '1', a: ['y', 'x'] })).toBe(serializeInput('s', { a: ['x', 'y'], b: '1' }));
  });
});
