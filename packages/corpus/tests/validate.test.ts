/**
 * Fault-injection tests of corpus:validate. Each test validates an in-memory copy
 * of the real corpus with one injected fault and expects its error code: the seven
 * faults injected by hand in S1.1 plus the three introduced with ADR 0010 and the
 * rule-input invariant (S2).
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { loadFromDisk, validateCorpus, type RawCorpus, type SourceTexts } from '../src/index.ts';

type Doc = Record<string, any>;

let pristine: { corpus: RawCorpus; sources: SourceTexts };

beforeAll(() => {
  const { corpus, sources, parseErrors } = loadFromDisk();
  expect(parseErrors).toEqual([]);
  pristine = { corpus, sources };
});

/** Deep copy of the real corpus and of its source texts. */
const fresh = () => ({ corpus: structuredClone(pristine.corpus), sources: { ...pristine.sources } });

/** Validates a mutated copy and returns its errors. */
function errorsAfter(mutate: (c: RawCorpus, s: SourceTexts) => void): string[] {
  const { corpus, sources } = fresh();
  mutate(corpus, sources);
  const result = validateCorpus(corpus, sources);
  expect(result.ok).toBe(false);
  return result.errors;
}

const expectCode = (errors: string[], code: string, where: string) =>
  expect(errors.filter((e) => e.includes(`[${code}]`) && e.includes(where)), errors.join('\n')).not.toHaveLength(0);

const sector = (c: RawCorpus, id: string) => c.sectors[`sectors/sectors__${id}.yaml`] as Doc;
const wizard = (c: RawCorpus, id: string) => c.wizard[`wizard/wizard__${id}.yaml`] as Doc;
const fixture = (c: RawCorpus, prefix: string) =>
  c.fixtures[Object.keys(c.fixtures).find((k) => k.startsWith(prefix))!] as Doc;

describe('corpus:validate', () => {
  it('passes on the real corpus', () => {
    const { corpus, sources } = fresh();
    const result = validateCorpus(corpus, sources);
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
  });

  describe('S1.1 faults', () => {
    it('unquoted "no" in a fixture -> E_YAML_BOOL', () => {
      const errors = errorsAfter((_c, s) => {
        const key = Object.keys(s).find((k) => k.includes('E01_'))!;
        s[key] = s[key]!.replace('psnc: "no"', 'psnc: no');
      });
      expectCode(errors, 'E_YAML_BOOL', 'E01_');
    });

    it('PSNC override citations removed -> E_OVERRIDE_CITATIONS', () => {
      const errors = errorsAfter((c) => {
        const o = sector(c, 'cloud_computing').overrides.find((x: Doc) => x.trigger === 'psnc == yes');
        o.citations = ['det_acn_155238_2026_art_5'];
      });
      expectCode(errors, 'E_OVERRIDE_CITATIONS', 'sectors__cloud_computing.yaml');
    });

    it('follow-up without id -> E_ID_MISSING', () => {
      const errors = errorsAfter((c) => {
        const q = wizard(c, 'energia_elettrica').sector_specific_questions.find((x: Doc) => x.id === 'pertinenza_pubblica_energia');
        delete q.conditional_followup.id;
      });
      expectCode(errors, 'E_ID_MISSING', 'wizard__energia_elettrica.yaml');
    });

    it('regime outcome changed -> E_ESCALATE_AMBIGUOUS', () => {
      const errors = errorsAfter((c) => {
        (c.regimes['regimes/psnc.yaml'] as Doc).meta.verdict_outcome = 'likely_in_scope';
      });
      expectCode(errors, 'E_ESCALATE_AMBIGUOUS', 'regimes/psnc.yaml');
    });

    it('E08 routing order changed -> E_REGIME_ROUTING', () => {
      const errors = errorsAfter((c) => {
        fixture(c, 'E08_').expected.regime_routing.reverse();
      });
      expectCode(errors, 'E_REGIME_ROUTING', 'E08_');
    });

    it('verdict_outcome missing on a rule -> E_VERDICT_OUTCOME', () => {
      const errors = errorsAfter((c) => {
        delete sector(c, 'cloud_computing').qualification_rules[0].verdict_outcome;
      });
      expectCode(errors, 'E_VERDICT_OUTCOME', 'sectors__cloud_computing.yaml');
    });

    it('corpus_ref without file prefix -> E_CORPUS_REF', () => {
      const errors = errorsAfter((c) => {
        const x = fixture(c, 'E01_');
        x.expected.corpus_ref = x.expected.corpus_ref.replace('sectors/sectors__', 'sectors/');
      });
      expectCode(errors, 'E_CORPUS_REF', 'E01_');
    });
  });

  describe('S2 faults (ADR 0010, rule inputs)', () => {
    const registratoPun = (c: RawCorpus) =>
      wizard(c, 'energia_elettrica').sector_specific_questions.find((x: Doc) => x.id === 'registrato_pun');

    it('visible_if as a string -> E_VISIBLE_IF', () => {
      const errors = errorsAfter((c) => {
        registratoPun(c).visible_if = 'tipologia_elettrica == gestore_punti_ricarica';
      });
      expectCode(errors, 'E_VISIBLE_IF', 'wizard__energia_elettrica.yaml');
    });

    it('nested visible_if -> E_VISIBLE_IF', () => {
      const errors = errorsAfter((c) => {
        const q = registratoPun(c);
        q.visible_if = { any_of: [{ all_of: q.visible_if.any_of }, q.visible_if.any_of[0]] };
      });
      expectCode(errors, 'E_VISIBLE_IF', 'wizard__energia_elettrica.yaml');
    });

    it('rule reading an input missing from the wizard -> E_RULE_INPUT', () => {
      const errors = errorsAfter((c) => {
        sector(c, 'pubblica_amministrazione').qualification_rules[2].condition = 'categoria == c';
      });
      expectCode(errors, 'E_RULE_INPUT', 'sectors__pubblica_amministrazione.yaml');
    });
  });
});
