/**
 * Wizard logic on top of the engine: which questions are visible, which answers are
 * still valid, which question comes next. Visibility is the engine's (ADR 0010,
 * ADR 0016 §3): this module never re-implements a condition.
 */
import type { Corpus, Question } from "@nis2-check/corpus";
import { checkAnswers, resolveSector, type SectorContext, type WizardQuestion } from "@nis2-check/engine";

export type AnswerMap = Record<string, string | string[]>;

export function sectorContext(corpus: Corpus, sectorId: string): SectorContext {
  return resolveSector(sectorId, corpus);
}

/** Visible questions, in flow order, given the answers so far. */
export function visibleQuestions(ctx: SectorContext, answers: AnswerMap): WizardQuestion[] {
  const { visible } = checkAnswers(ctx, answers);
  return ctx.questions.filter((q) => visible.has(q.id));
}

/** Drops the answers of questions that are no longer visible, until nothing changes. */
export function pruneAnswers(ctx: SectorContext, answers: AnswerMap): AnswerMap {
  let current = answers;
  for (;;) {
    const visible = new Set(visibleQuestions(ctx, current).map((q) => q.id));
    const next = Object.fromEntries(Object.entries(current).filter(([id]) => visible.has(id)));
    if (Object.keys(next).length === Object.keys(current).length) return next;
    current = next;
  }
}

/** Whether a visible question can be left: answered, or optional. */
export function isAnswered(q: WizardQuestion, answers: AnswerMap): boolean {
  const a = answers[q.id];
  if (a === undefined) return q.optional;
  // an empty multiple choice is a valid answer for the engine
  return typeof a === "string" ? a.length > 0 : true;
}

/** The question node with its optional fields (a follow-up simply has none of them). */
export const questionNode = (q: WizardQuestion): Question => q.node as Question;

export interface OptionView {
  id: string;
  label: string;
}

/** Options to show: the corpus options, or yes/no for binary questions (labels from copy). */
export function optionsOf(q: WizardQuestion, yes: string, no: string): OptionView[] {
  if (q.kind === "binary" || q.kind === "binary_with_conditional_followup") {
    return [
      { id: "yes", label: yes },
      { id: "no", label: no },
    ];
  }
  return (questionNode(q).options ?? []).map((o) => ({ id: o.id, label: o.label_it }));
}

/** Label of an answer value, for the answers panel. */
export function answerLabel(q: WizardQuestion, value: string | string[], yes: string, no: string, none: string): string {
  const options = optionsOf(q, yes, no);
  const label = (id: string) => options.find((o) => o.id === id)?.label ?? id;
  if (typeof value === "string") return label(value);
  return value.length ? value.map(label).join("; ") : none;
}
