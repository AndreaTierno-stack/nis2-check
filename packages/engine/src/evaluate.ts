/**
 * evaluate({ sectorId, answers }, corpus) → Verdict, ADR 0016.
 *
 * Four stages, all evaluated, one decides: (1) regime routing, (2) declared type
 * exclusion, (3) size-blind rules, (4) dimensional rules. Outcomes are copied from
 * the deciding construct; the only outcomes the engine sets itself are the
 * escalations of ADR 0016 (conflict 2×3, disagreeing exclusions, no or multiple rules).
 */
import type { Corpus, Question, SectorFile } from '@nis2-check/corpus';
import { resolveAnswers, resolveSector, type SectorContext, type WizardQuestion } from './answers.ts';
import { evalExpression, expressionInputs, type ResolvedAnswers } from './conditions.ts';
import { CorpusContractError } from './errors.ts';
import { sha256Hex } from './sha256.ts';
import type {
  Answers,
  AssessmentMode,
  CatalogEntryId,
  CitationId,
  EvaluationInput,
  PartialOutcome,
  Qualifica,
  ReasoningStep,
  RegimeRouting,
  SignalRef,
  Stage,
  Verdict,
  VerdictOutcome,
} from './types.ts';

/** Catalog entry of the conflict between a type exclusion and a size-blind inclusion (ADR 0016 §1). */
export const CONFLICT_NOTICE = 'esclusione_tipologica_vs_inclusione_size_blind';

/** Input of the dimensional rules (common block, standard identification). */
const DIMENSION_INPUT = 'dimension';

type Rule = SectorFile['qualification_rules'][number];

/** A construct of the corpus that matched, with the outcome it declares. */
export interface Construct {
  locator: string;
  assessmentMode: AssessmentMode;
  outcome: VerdictOutcome;
  qualifica?: { value: Qualifica; inferita: boolean };
  citations: readonly CitationId[];
  notices: readonly CatalogEntryId[];
  corpusText?: string;
}

export interface RoutingResult {
  routings: RegimeRouting[];
  /** Override constructs, in sector-file order. */
  overrides: Construct[];
  /** The construct whose outcome stage 1 copies (single regime, intersection or common regime meta). */
  decision?: Construct;
  /** Set when stage 1 cannot copy an outcome (several intersections match). */
  escalationCode?: string;
}

const uniq = <T>(xs: readonly T[]): T[] => [...new Set(xs)];
/** Optional question fields; a follow-up simply has none of them. */
const fields = (q: WizardQuestion): Question => q.node as Question;
const sameOutcome = (a: Construct, b: Construct) => a.assessmentMode === b.assessmentMode && a.outcome === b.outcome;
const partialOf = (c: Construct): PartialOutcome => ({
  assessmentMode: c.assessmentMode,
  outcome: c.outcome,
  ...(c.qualifica ? { qualifica: c.qualifica.value } : {}),
});

// ---------------------------------------------------------------------------
// Stage 1 — regime routing
// ---------------------------------------------------------------------------

export function routeRegimes(ctx: SectorContext, answers: ResolvedAnswers, corpus: Corpus): RoutingResult {
  const routings: RegimeRouting[] = [];
  const overrides: Construct[] = [];
  (ctx.sector.overrides ?? []).forEach((o, i) => {
    if (!evalExpression(o.trigger, answers)) return;
    const regime = corpus.regimes[o.reference];
    if (!regime) throw new CorpusContractError(`override ${ctx.sectorPath}#overrides[${i}]: regime ${o.reference} not found`);
    const m = regime.meta;
    routings.push({
      regimeId: m.regime_id,
      routingEffect: m.routing_effect,
      residualNisObligation: m.residual_nis_obligation ?? null,
      exceptionsCatalogEntry: m.exceptions_catalog_entry,
    });
    overrides.push({
      locator: `${ctx.sectorPath}#overrides[${i}] -> ${o.reference}`,
      assessmentMode: m.assessment_mode,
      outcome: m.verdict_outcome,
      citations: o.citations,
      notices: [],
      corpusText: o.reasoning_trace,
    });
  });
  if (overrides.length <= 1) return overrides[0] ? { routings, overrides, decision: overrides[0] } : { routings, overrides };

  const intersections = (ctx.wizard.multi_regime_intersection ?? [])
    .map((m, i) => ({ m, i }))
    .filter(({ m }) => evalExpression(m.trigger, answers));
  if (intersections.length > 1) return { routings, overrides, escalationCode: 'multiple_rules_matched' };
  const hit = intersections[0];
  if (hit) {
    return {
      routings,
      overrides,
      decision: {
        locator: `${ctx.wizardPath}#multi_regime_intersection[${hit.i}]`,
        assessmentMode: hit.m.outcome,
        outcome: hit.m.verdict_outcome,
        citations: hit.m.citations,
        notices: hit.m.notices ?? [],
        corpusText: hit.m.reasoning_trace,
      },
    };
  }
  // no intersection: the regimes must declare the same outcome, which is copied
  const first = overrides[0]!;
  if (!overrides.every((o) => sameOutcome(o, first))) {
    throw new CorpusContractError(`routed regimes declare different outcomes and no multi_regime_intersection matches (${ctx.sectorPath})`);
  }
  return { routings, overrides, decision: first };
}

// ---------------------------------------------------------------------------
// Stage 2 — declared type exclusion (outcome_mapping of the visible questions)
// ---------------------------------------------------------------------------

export function applyTypeExclusions(ctx: SectorContext, answers: ResolvedAnswers): Construct[] {
  const out: Construct[] = [];
  for (const q of ctx.questions) {
    const mappings = fields(q).outcome_mapping;
    const answer = answers.get(q.id);
    if (!mappings || typeof answer !== 'string') continue;
    mappings.forEach((m, i) => {
      if (m.answer !== answer) return;
      out.push({
        locator: `${q.locator}.outcome_mapping[${i}]`,
        assessmentMode: m.outcome,
        outcome: m.verdict_outcome,
        citations: m.citations,
        notices: m.notices ?? [],
        corpusText: m.reasoning_trace,
      });
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Stages 3 and 4 — qualification rules
// ---------------------------------------------------------------------------

/** A rule belongs to stage 4 when its condition reads `dimension`, to stage 3 otherwise. */
export const isDimensional = (rule: Rule): boolean => expressionInputs(rule.condition).includes(DIMENSION_INPUT);

function ruleConstruct(ctx: SectorContext, rule: Rule, index: number): Construct {
  const locator = `${ctx.sectorPath}#qualification_rules[${index}]`;
  if (rule.reference) {
    const block = ctx.sector[rule.reference];
    if (!block) throw new CorpusContractError(`${locator}: block "${rule.reference}" not found`);
    return {
      locator: `${locator} -> ${rule.reference}`,
      assessmentMode: block.verdict_strategy,
      outcome: block.verdict_outcome,
      citations: block.citations,
      notices: block.notices ?? [],
      corpusText: block.reasoning_trace,
    };
  }
  if (!rule.outcome || !rule.verdict_outcome || !rule.citations) {
    throw new CorpusContractError(`${locator}: rule without outcome and without reference`);
  }
  const qualifica = rule.qualifica
    ? { value: rule.qualifica, inferita: false }
    : rule.qualifica_inferita
      ? { value: rule.qualifica_inferita, inferita: true }
      : undefined;
  return {
    locator,
    assessmentMode: rule.outcome,
    outcome: rule.verdict_outcome,
    ...(qualifica ? { qualifica } : {}),
    citations: rule.citations,
    notices: rule.notices ?? [],
    ...(rule.reasoning_trace !== undefined ? { corpusText: rule.reasoning_trace } : {}),
  };
}

function matchingRules(ctx: SectorContext, answers: ResolvedAnswers, dimensional: boolean): Construct[] {
  const out: Construct[] = [];
  ctx.sector.qualification_rules.forEach((rule, i) => {
    if (isDimensional(rule) === dimensional && evalExpression(rule.condition, answers)) out.push(ruleConstruct(ctx, rule, i));
  });
  return out;
}

export const applySizeBlind = (ctx: SectorContext, answers: ResolvedAnswers): Construct[] => matchingRules(ctx, answers, false);
export const applyDimensionalRules = (ctx: SectorContext, answers: ResolvedAnswers): Construct[] => matchingRules(ctx, answers, true);

// ---------------------------------------------------------------------------
// Resolution (ADR 0016 §1)
// ---------------------------------------------------------------------------

export interface Resolution {
  stage: Stage;
  /** Constructs that decide and emit their notices. */
  deciding: Construct[];
  assessmentMode: AssessmentMode;
  outcome: VerdictOutcome;
  qualifica?: { value: Qualifica; inferita: boolean };
  /** Set when the engine escalates instead of copying an outcome. */
  code?: string;
  conflict: boolean;
}

const escalation = (stage: Stage, deciding: Construct[], code: string, conflict = false): Resolution => ({
  stage,
  deciding,
  assessmentMode: 'escalate_to_advisor',
  outcome: 'ambiguous',
  code,
  conflict,
});

const copied = (stage: Stage, deciding: Construct[]): Resolution => {
  const head = deciding[0]!;
  return {
    stage,
    deciding,
    assessmentMode: head.assessmentMode,
    outcome: head.outcome,
    ...(deciding.length === 1 && head.qualifica ? { qualifica: head.qualifica } : {}),
    conflict: false,
  };
};

export function resolve(routing: RoutingResult, exclusions: Construct[], sizeBlind: Construct[], dimensional: Construct[]): Resolution {
  if (routing.overrides.length > 0) {
    if (routing.escalationCode || !routing.decision) return escalation('regime_routing', [], routing.escalationCode ?? 'multiple_rules_matched');
    return copied('regime_routing', [routing.decision]);
  }
  const exclusionsAgree = exclusions.every((c) => sameOutcome(c, exclusions[0]!));
  if (exclusions.length > 0 && sizeBlind.length > 0) {
    const allSame = exclusionsAgree && sizeBlind.every((c) => sameOutcome(c, exclusions[0]!));
    if (!allSame) return escalation('resolution', [...exclusions, ...sizeBlind], 'conflict_type_exclusion_size_blind', true);
  }
  if (exclusions.length > 0) {
    return exclusionsAgree ? copied('type_exclusion', exclusions) : escalation('type_exclusion', exclusions, 'type_exclusions_disagree');
  }
  if (sizeBlind.length > 0) return sizeBlind.length === 1 ? copied('size_blind', sizeBlind) : escalation('size_blind', sizeBlind, 'multiple_rules_matched');
  if (dimensional.length > 0) return dimensional.length === 1 ? copied('dimensional', dimensional) : escalation('dimensional', dimensional, 'multiple_rules_matched');
  return escalation('resolution', [], 'no_rule_matched');
}

// ---------------------------------------------------------------------------
// Notices and signals (ADR 0016 §4)
// ---------------------------------------------------------------------------

type OptionNode = { id: string; activates_signals?: string[] | undefined; on_selected?: { activates_signals?: string[] | undefined; notices?: string[] | undefined } | undefined };

/** Options selected in the visible answers, in question order. */
function selectedOptions(ctx: SectorContext, answers: ResolvedAnswers): { q: SectorContext['questions'][number]; option: OptionNode }[] {
  const out: { q: SectorContext['questions'][number]; option: OptionNode }[] = [];
  for (const q of ctx.questions) {
    const a = answers.get(q.id);
    if (a === undefined) continue;
    const chosen = typeof a === 'string' ? [a] : a;
    const options = fields(q).options ?? [];
    for (const id of chosen) {
      const option = options.find((o) => o.id === id);
      if (option) out.push({ q, option });
    }
  }
  return out;
}

/** Answer-level notices: on_yes of "yes" answers and on_selected of the chosen options, in question order. */
export function answerNotices(ctx: SectorContext, answers: ResolvedAnswers): CatalogEntryId[] {
  const out: CatalogEntryId[] = [];
  for (const q of ctx.questions) {
    const onYes = fields(q).on_yes;
    if (answers.get(q.id) === 'yes' && onYes?.notices) out.push(...onYes.notices);
    for (const { q: owner, option } of selectedOptions(ctx, answers)) {
      if (owner === q && option.on_selected?.notices) out.push(...option.on_selected.notices);
    }
  }
  return out;
}

/** Signals declared on the answers, in question order. */
function answerSignals(ctx: SectorContext, answers: ResolvedAnswers): string[] {
  const out: string[] = [];
  for (const q of ctx.questions) {
    const a = answers.get(q.id);
    if (a === undefined) continue;
    const onYes = fields(q).on_yes;
    if (a === 'yes' && onYes?.activates_signals) out.push(...onYes.activates_signals);
    for (const { q: owner, option } of selectedOptions(ctx, answers)) {
      if (owner !== q) continue;
      out.push(...(option.activates_signals ?? []), ...(option.on_selected?.activates_signals ?? []));
    }
    const onAny = fields(q).on_any_selected;
    if (typeof a !== 'string' && a.length > 0 && onAny) out.push(...onAny.activates_signals);
  }
  return out;
}

/** Signals of the sector triggers (cumulative_signals, cross_sector_signals) that match. */
function sectorSignals(ctx: SectorContext, answers: ResolvedAnswers): string[] {
  const out: string[] = [];
  for (const key of ['cumulative_signals', 'cross_sector_signals'] as const) {
    for (const t of ctx.sector[key] ?? []) {
      if (typeof t.trigger === 'string' && evalExpression(t.trigger, answers)) out.push(t.signal);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// evaluate
// ---------------------------------------------------------------------------

/** Canonical serialization of the input for inputHash: sorted keys, sorted multiple choices. */
export function serializeInput(sectorId: string, answers: Answers): string {
  const sorted: Record<string, string | string[]> = {};
  for (const k of Object.keys(answers).sort()) {
    const v = answers[k]!;
    sorted[k] = typeof v === 'string' ? v : [...v].sort();
  }
  return JSON.stringify({ sectorId, answers: sorted });
}

function constructSteps(stage: Stage, constructs: readonly Construct[], result: ReasoningStep['result'], extra: Partial<ReasoningStep> = {}): ReasoningStep[] {
  return constructs.map((c) => ({
    stage,
    construct: c.locator,
    result,
    partial: partialOf(c),
    citations: [...c.citations],
    ...(c.corpusText !== undefined ? { corpusText: c.corpusText } : {}),
    ...extra,
  }));
}

function sectionLocator(ctx: SectorContext, stage: Stage): string {
  return stage === 'type_exclusion' ? `${ctx.wizardPath}#outcome_mapping` : `${ctx.sectorPath}#qualification_rules`;
}

/**
 * Evaluates the answers of a sector against the corpus (ADR 0016).
 *
 * @param input - sector id and serialized answers keyed by question id
 * @param corpus - corpus validated by the zod schema of @nis2-check/corpus
 * @throws {InvalidAnswersError} when the answers do not fit the sector's wizard
 * @throws {CorpusContractError} only on a corpus that breaks the engine contract
 */
export function evaluate(input: EvaluationInput, corpus: Corpus): Verdict {
  const ctx = resolveSector(input.sectorId, corpus);
  const answers = resolveAnswers(ctx, input.answers);
  const trace: ReasoningStep[] = [
    {
      stage: 'validation',
      construct: ctx.wizardPath,
      result: 'matched',
      citations: [],
      code: 'answers_valid',
      detail: `risposte valide: ${answers.size} domande visibili con risposta`,
    },
  ];

  const routing = routeRegimes(ctx, answers, corpus);
  const exclusions = applyTypeExclusions(ctx, answers);
  const sizeBlind = applySizeBlind(ctx, answers);
  const dimensional = applyDimensionalRules(ctx, answers);
  const r = resolve(routing, exclusions, sizeBlind, dimensional);

  // trace: stage 1, then stages 2-4 with what they gave (suspended, not evaluated, decided)
  const routed = routing.overrides.length > 0;
  if (routed) {
    trace.push(...constructSteps('regime_routing', routing.overrides, 'matched'));
    if (routing.decision && routing.decision !== routing.overrides[0]) trace.push(...constructSteps('regime_routing', [routing.decision], 'matched'));
  } else {
    trace.push({ stage: 'regime_routing', construct: `${ctx.sectorPath}#overrides`, result: 'not_matched', citations: [] });
  }
  const byStage: [Stage, Construct[]][] = [
    ['type_exclusion', exclusions],
    ['size_blind', sizeBlind],
    ['dimensional', dimensional],
  ];
  for (const [stage, constructs] of byStage) {
    if (stage === 'dimensional' && !routed && exclusions.length > 0) {
      trace.push({
        stage,
        construct: sectionLocator(ctx, stage),
        result: 'not_evaluated',
        citations: uniq(exclusions.flatMap((c) => c.citations)),
        code: 'dimension_not_evaluated',
        detail: `dimensione non valutata: tipologia esclusa (${uniq(exclusions.flatMap((c) => c.citations)).join(', ')})`,
      });
      continue;
    }
    if (constructs.length === 0) {
      trace.push({ stage, construct: sectionLocator(ctx, stage), result: 'not_matched', citations: [] });
    } else if (routed) {
      trace.push(...constructSteps(stage, constructs, 'suspended', { code: 'nis_assessment_suspended', detail: 'esito NIS ordinario sospeso' }));
    } else {
      trace.push(...constructSteps(stage, constructs, r.deciding.includes(constructs[0]!) ? 'matched' : 'not_evaluated'));
    }
  }
  const final: PartialOutcome = {
    assessmentMode: r.assessmentMode,
    outcome: r.outcome,
    ...(r.qualifica ? { qualifica: r.qualifica.value } : {}),
  };
  trace.push({
    stage: 'resolution',
    construct: r.deciding.map((c) => c.locator).join(' + ') || ctx.sectorPath,
    result: r.conflict ? 'conflict' : 'decided',
    partial: final,
    citations: uniq(r.deciding.flatMap((c) => c.citations)),
    ...(r.code ? { code: r.code } : {}),
    detail: `decide lo stadio ${r.stage}`,
  });

  if (r.assessmentMode === 'escalate_to_advisor' && r.outcome !== 'ambiguous') {
    throw new CorpusContractError('escalate_to_advisor without ambiguous (constraint 6)');
  }

  const catalog = new Map(Object.values(corpus.exceptions).flatMap((f) => f.exceptions.map((e) => [e.id, e] as const)));
  const constructNotices = [...(r.conflict && catalog.has(CONFLICT_NOTICE) ? [CONFLICT_NOTICE] : []), ...r.deciding.flatMap((c) => c.notices)];
  const notices = uniq([...constructNotices, ...answerNotices(ctx, answers)]);

  const signalIds = uniq([...answerSignals(ctx, answers), ...(routed ? [] : sectorSignals(ctx, answers))]);
  const signalDefs = new Map(Object.values(corpus.signals).flatMap((f) => f.signals.map((s) => [s.id, s] as const)));
  const signals: SignalRef[] = signalIds.map((id) => ({ id }));

  const citations = uniq([
    ...r.deciding.flatMap((c) => c.citations),
    ...signalIds.flatMap((id) => signalDefs.get(id)?.citations ?? []),
    ...notices.flatMap((id) => catalog.get(id)?.citations ?? []),
  ]);

  return {
    outcome: r.outcome,
    assessmentMode: r.assessmentMode,
    ...(r.qualifica ? { qualifica: r.qualifica } : {}),
    regimeRouting: routed ? routing.routings : [],
    signals,
    notices,
    reasoningTrace: trace,
    citations,
    disclaimerRequired: true,
    inputHash: sha256Hex(serializeInput(input.sectorId, input.answers)),
    corpusVersion: corpus.version,
  };
}

