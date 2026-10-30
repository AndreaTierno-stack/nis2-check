/**
 * Data of the verdict page, from the Verdict and the corpus: scale position and color,
 * outcome phrase, facts row, notices, trace rows. No normative text is written here.
 */
import type { Corpus } from "@nis2-check/corpus";
import type { ReasoningStep, SectorContext, Stage, Verdict, VerdictOutcome } from "@nis2-check/engine";
import { answerLabel, questionNode, type AnswerMap } from "@/lib/wizard";
import { copy } from "@/src/copy.it";

export const SCALE: VerdictOutcome[] = ["likely_out_of_scope", "ambiguous", "likely_in_scope"];

/** Position on the three-step scale. */
export const scalePosition = (v: Pick<Verdict, "outcome">): number => SCALE.indexOf(v.outcome);

/** Header color: accent when in scope, warn when uncertain (escalation included), muted when out. */
export function tone(v: Pick<Verdict, "outcome">): "accent" | "warn" | "muted" {
  if (v.outcome === "likely_in_scope") return "accent";
  if (v.outcome === "ambiguous") return "warn";
  return "muted";
}

export const resolutionStep = (v: Verdict): ReasoningStep => v.reasoningTrace.find((s) => s.stage === "resolution")!;

const catalogOf = (corpus: Corpus) => new Map(Object.values(corpus.exceptions).flatMap((f) => f.exceptions.map((e) => [e.id, e] as const)));

/** Tipologia: the principal declared activity, else the sector type, else the first single choice of the sector. */
export function tipologia(ctx: SectorContext, answers: AnswerMap): string {
  const yesNo = [copy.questions.yes, copy.questions.no] as const;
  const principal = ctx.wizard.activity_inputs?.[0];
  const q = principal ? ctx.questions.find((x) => x.id === principal) : undefined;
  if (q && typeof answers[q.id] === "string") return answerLabel(q, answers[q.id]!, ...yesNo, copy.sidebar.none);
  const types = ctx.sector.tipologie ?? [];
  if (types.length === 1) return types[0]!.label_it;
  const first = ctx.questions.find((x) => !x.parent && x.kind === "single_select" && x.locator.includes("sector_specific_questions"));
  if (first && typeof answers[first.id] === "string") return answerLabel(first, answers[first.id]!, ...yesNo, copy.sidebar.none);
  return ctx.sector.meta.label_it;
}

export function facts(v: Verdict, ctx: SectorContext, answers: AnswerMap, corpus: Corpus) {
  const catalog = catalogOf(corpus);
  return {
    tipologia: tipologia(ctx, answers),
    qualifica: v.qualifica?.value ?? copy.verdict.qualificaNone,
    regimi: v.regimeRouting.length ? v.regimeRouting.map((r) => catalog.get(r.exceptionsCatalogEntry)?.title ?? r.regimeId) : [copy.verdict.regimiNone],
  };
}

export function notices(v: Verdict, corpus: Corpus) {
  const catalog = catalogOf(corpus);
  return v.notices.flatMap((id) => {
    const e = catalog.get(id);
    return e ? [{ id, title: e.title, status: e.status, description: e.description, citations: e.citations }] : [];
  });
}

export const STAGES = ["regime_routing", "type_exclusion", "size_blind", "dimensional"] as const satisfies readonly Stage[];

export interface TraceRow {
  stage: (typeof STAGES)[number];
  decided: boolean;
  /** One-line reason for the stages that did not decide. */
  reason?: string;
  /** Corpus texts and citations of the deciding constructs of the stage. */
  texts: { text: string; citations: string[] }[];
}

/** One row per stage of ADR 0016: the deciding one with its corpus text, the others with a reason. */
export function traceRows(v: Verdict): TraceRow[] {
  const resolution = resolutionStep(v);
  const deciding = new Set(resolution.construct.split(" + "));
  return STAGES.map((stage) => {
    const steps = v.reasoningTrace.filter((s) => s.stage === stage);
    const winners = steps.filter((s) => deciding.has(s.construct));
    if (winners.length) {
      return { stage, decided: true, texts: winners.map((s) => ({ text: s.corpusText ?? "", citations: s.citations })) };
    }
    const s = steps[0];
    const key =
      s?.code === "dimension_not_evaluated"
        ? "dimension_not_evaluated"
        : s?.result === "suspended" || s?.result === "demoted" || s?.result === "not_matched"
          ? s.result
          : "not_evaluated";
    return { stage, decided: false, reason: copy.verdict.reasons[key], texts: [] };
  });
}

/** Answers panel: visible questions with their answers, in flow order. */
export function answerRows(ctx: SectorContext, answers: AnswerMap) {
  return ctx.questions
    .filter((q) => answers[q.id] !== undefined)
    .map((q) => ({
      id: q.id,
      question: questionNode(q).label_it,
      answer: answerLabel(q, answers[q.id]!, copy.questions.yes, copy.questions.no, copy.sidebar.none),
    }));
}

export const catalogSize = (corpus: Corpus): number => catalogOf(corpus).size;
