/**
 * Path enumeration (ADR 0016 §6), shared by the test and by `pnpm engine:enumerate`.
 * Every valid answer combination of a sector, respecting visibility, is generated
 * depth-first; above LIMIT combinations the test samples SAMPLE answer sets with a
 * fixed SEED (random walk over the visible questions). The script runs the full space.
 */
import type { Corpus } from '@nis2-check/corpus';
import { resolveAnswers, resolveSector, type SectorContext, type WizardQuestion } from '../src/answers.ts';
import { evalVisibleIf, type AnswerValue } from '../src/conditions.ts';
import { applyDimensionalRules, applySizeBlind, applyTypeExclusions, evaluate, routeRegimes } from '../src/evaluate.ts';
import type { Answers } from '../src/types.ts';

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
export function forEachCombination(ctx: SectorContext, visit: (a: Answers) => void, at = 0, answers = new Map<string, AnswerValue>(), visible = new Set<string>()): void {
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

export function countCombinations(ctx: SectorContext): number {
  let n = 0;
  forEachCombination(ctx, () => n++);
  return n;
}

/** mulberry32: small seeded PRNG, deterministic across runs. */
export function prng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomCombination(ctx: SectorContext, rand: () => number): Answers {
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

export interface CombinationResult {
  /** Property violations; empty when the combination is fine. */
  violations: string[];
  /** Catalog ids emitted (notices and regime routing entries). */
  catalog: string[];
  citations: string[];
}

/** Checks the properties of ADR 0016 §6 on one combination. */
export function checkCombination(sectorId: string, answers: Answers, corpus: Corpus): CombinationResult {
  const violations: string[] = [];
  const fail = (what: string) => violations.push(`${what}: ${sectorId} ${JSON.stringify(answers)}`);
  let v;
  try {
    v = evaluate({ sectorId, answers }, corpus);
  } catch (e) {
    fail(`evaluate threw ${(e as Error).name}`);
    return { violations, catalog: [], citations: [] };
  }
  const resolution = v.reasoningTrace.at(-1)!;
  if (['no_rule_matched', 'multiple_rules_matched', 'regimes_without_intersection'].includes(resolution.code ?? '')) fail(`corpus defect ${resolution.code}`);
  if (!OUTCOMES.includes(v.outcome)) fail('outcome outside the enum');
  if (!MODES.includes(v.assessmentMode)) fail('mode outside the enum');
  if (v.assessmentMode === 'escalate_to_advisor' && v.outcome !== 'ambiguous') fail('escalate without ambiguous');
  if (v.disclaimerRequired !== true) fail('disclaimer not required');

  const ctx = resolveSector(sectorId, corpus);
  const resolved = resolveAnswers(ctx, answers);
  const routed = routeRegimes(ctx, resolved, corpus).overrides.length > 0;
  const exclusions = applyTypeExclusions(ctx, resolved);
  const sizeBlind = applySizeBlind(ctx, resolved);
  if (!routed && !exclusions.decides && sizeBlind.length === 0 && applyDimensionalRules(ctx, resolved).length !== 1) {
    fail('stage 4 reached without exactly one dimensional rule');
  }
  const stage = resolution.detail?.replace('decide lo stadio ', '');
  if (!routed && exclusions.uncovered.length > 0 && stage !== 'size_blind' && stage !== 'dimensional') {
    fail('activity without exclusion did not reach stage 3 or 4');
  }
  return { violations, catalog: [...v.notices, ...v.regimeRouting.map((r) => r.exceptionsCatalogEntry)], citations: v.citations };
}

export interface SectorReport {
  sectorId: string;
  combinations: number;
  checked: number;
  sampled: boolean;
  violations: string[];
  catalog: Set<string>;
  citations: Set<string>;
}

/** Runs the enumeration of one sector: full space, or a seeded sample above LIMIT unless `full`. */
export function enumerateSector(sectorId: string, corpus: Corpus, full = false): SectorReport {
  const ctx = resolveSector(sectorId, corpus);
  const combinations = countCombinations(ctx);
  const report: SectorReport = { sectorId, combinations, checked: 0, sampled: !full && combinations > LIMIT, violations: [], catalog: new Set(), citations: new Set() };
  const take = (a: Answers) => {
    const r = checkCombination(sectorId, a, corpus);
    report.violations.push(...r.violations);
    r.catalog.forEach((id) => report.catalog.add(id));
    r.citations.forEach((id) => report.citations.add(id));
    report.checked++;
  };
  if (report.sampled) {
    const rand = prng(SEED);
    for (let i = 0; i < SAMPLE; i++) take(randomCombination(ctx, rand));
  } else {
    forEachCombination(ctx, take);
  }
  return report;
}
