/**
 * Path enumeration (ADR 0016 §6): every valid answer combination of each sector,
 * respecting visibility, is evaluated and checked. Sectors with more than LIMIT
 * combinations are sampled with a fixed seed (SEED, SAMPLE answer sets drawn by a
 * random walk over the visible questions).
 *
 * Properties: evaluate never throws; no no_rule_matched or multiple_rules_matched;
 * when stage 4 is reached exactly one dimensional rule matches; when the subject is
 * not routed and a declared activity has no matched exclusion, stage 3 or 4 decides;
 * escalate_to_advisor always pairs with ambiguous; outcome and mode in their enums;
 * disclaimerRequired is true. The notices emitted are collected for the catalog check.
 */
import { describe, expect, it } from 'vitest';
import type { Corpus } from '@nis2-check/corpus';
import { resolveAnswers, resolveSector, type SectorContext, type WizardQuestion } from '../src/answers.ts';
import { evalVisibleIf, type AnswerValue } from '../src/conditions.ts';
import { applyDimensionalRules, applySizeBlind, applyTypeExclusions, evaluate, routeRegimes } from '../src/evaluate.ts';
import type { Answers } from '../src/types.ts';
import { realCorpus } from './helpers.ts';

export const LIMIT = 50_000;
export const SAMPLE = 25_000;
export const SEED = 20261030;

const OUTCOMES = ['likely_in_scope', 'likely_out_of_scope', 'ambiguous'];
const MODES = ['categorical_assessment', 'qualitative_signal_only', 'escalate_to_advisor', 'out_of_scope'];

/** Values a visible question accepts: yes/no, one option, or any subset of options. */
function domain(q: WizardQuestion): AnswerValue[] {
  if (q.kind === 'binary' || q.kind === 'binary_with_conditional_followup') return ['yes', 'no'];
  if (q.kind !== 'multi_select') return [...q.optionIds];
  const out: string[][] = [];
  for (let mask = 0; mask < 1 << q.optionIds.length; mask++) out.push(q.optionIds.filter((_, i) => mask & (1 << i)));
  return out;
}

const isVisible = (q: WizardQuestion, answers: Map<string, AnswerValue>, visible: Set<string>) =>
  q.parent ? visible.has(q.parent.id) && answers.get(q.parent.id) === q.parent.triggerOn : q.visibleIf === undefined || evalVisibleIf(q.visibleIf, answers);

/** Calls visit for every valid combination (depth-first over the questions in flow order). */
function forEachCombination(ctx: SectorContext, visit: (a: Answers) => void, at = 0, answers = new Map<string, AnswerValue>(), visible = new Set<string>()): void {
  const q = ctx.questions[at];
  if (!q) return visit(Object.fromEntries(answers));
  if (!isVisible(q, answers, visible)) return forEachCombination(ctx, visit, at + 1, answers, visible);
  for (const v of domain(q)) {
    answers.set(q.id, v);
    visible.add(q.id);
    forEachCombination(ctx, visit, at + 1, answers, visible);
    answers.delete(q.id);
    visible.delete(q.id);
  }
}

function countCombinations(ctx: SectorContext): number {
  let n = 0;
  forEachCombination(ctx, () => n++);
  return n;
}

/** mulberry32: small seeded PRNG, deterministic across runs. */
function prng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomCombination(ctx: SectorContext, rand: () => number): Answers {
  const answers = new Map<string, AnswerValue>();
  const visible = new Set<string>();
  for (const q of ctx.questions) {
    if (!isVisible(q, answers, visible)) continue;
    const d = domain(q);
    answers.set(q.id, d[Math.floor(rand() * d.length)]!);
    visible.add(q.id);
  }
  return Object.fromEntries(answers);
}

/** Checks the properties on one combination; returns the catalog ids it emits. */
function check(sectorId: string, answers: Answers, corpus: Corpus): string[] {
  const ctx = resolveSector(sectorId, corpus);
  const v = evaluate({ sectorId, answers }, corpus);
  const resolution = v.reasoningTrace.at(-1)!;
  const where = `${sectorId} ${JSON.stringify(answers)}`;
  expect(resolution.code === 'no_rule_matched' || resolution.code === 'multiple_rules_matched', where).toBe(false);
  expect(OUTCOMES, where).toContain(v.outcome);
  expect(MODES, where).toContain(v.assessmentMode);
  if (v.assessmentMode === 'escalate_to_advisor') expect(v.outcome, where).toBe('ambiguous');
  expect(v.disclaimerRequired).toBe(true);

  const resolved = resolveAnswers(ctx, answers);
  const routed = routeRegimes(ctx, resolved, corpus).overrides.length > 0;
  const exclusions = applyTypeExclusions(ctx, resolved);
  const sizeBlind = applySizeBlind(ctx, resolved);
  if (!routed && !exclusions.decides && sizeBlind.length === 0) {
    expect(applyDimensionalRules(ctx, resolved), `stage 4 must match exactly one rule: ${where}`).toHaveLength(1);
  }
  if (!routed && exclusions.uncovered.length > 0) {
    expect(['size_blind', 'dimensional'], `activity without exclusion must reach stage 3 or 4: ${where}`).toContain(
      resolution.detail?.replace('decide lo stadio ', ''),
    );
  }
  return [...v.notices, ...v.regimeRouting.map((r) => r.exceptionsCatalogEntry)];
}

const corpus = realCorpus();
const sectors = Object.values(corpus.sectors).map((s) => s.meta.sector_id).sort();

/** Per sector: size of the path space, combinations checked, catalog ids emitted. */
export const enumerationReport: Record<string, { combinations: number; checked: number; sampled: boolean; emitted: Set<string> }> = {};

describe('path enumeration', () => {
  for (const sectorId of sectors) {
    it(sectorId, () => {
      const ctx = resolveSector(sectorId, corpus);
      const combinations = countCombinations(ctx);
      const emitted = new Set<string>();
      let checked = 0;
      if (combinations <= LIMIT) {
        forEachCombination(ctx, (a) => {
          check(sectorId, a, corpus).forEach((id) => emitted.add(id));
          checked++;
        });
      } else {
        const rand = prng(SEED);
        for (let i = 0; i < SAMPLE; i++) {
          check(sectorId, randomCombination(ctx, rand), corpus).forEach((id) => emitted.add(id));
          checked++;
        }
      }
      enumerationReport[sectorId] = { combinations, checked, sampled: combinations > LIMIT, emitted };
      expect(checked).toBeGreaterThan(0);
    }, 120_000);
  }

  it('every segnalato catalog entry is emitted by at least one combination', () => {
    const emitted = new Set(Object.values(enumerationReport).flatMap((r) => [...r.emitted]));
    const entries = Object.values(corpus.exceptions).flatMap((f) => f.exceptions);
    const unreached = entries.filter((e) => e.status === 'segnalato' && !emitted.has(e.id)).map((e) => e.id);
    expect(unreached).toEqual([]);
    const report = Object.entries(enumerationReport).map(([s, r]) => `${s}: ${r.combinations} combinazioni, ${r.checked} verificate${r.sampled ? ` (campione, seed ${SEED})` : ''}`);
    const notReached = entries.filter((e) => !emitted.has(e.id)).map((e) => `${e.id} (${e.status})`);
    console.log(['path space:', ...report, 'catalog entries never emitted:', ...notReached].join('\n'));
  });
});
