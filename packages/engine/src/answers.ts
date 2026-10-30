/**
 * Questions of a sector, their visibility and the validation of the answers
 * (ADR 0016 §3). Same criterion as E_FIXTURE_INPUT, plus visibility.
 */
import type { Corpus, Question, SectorFile, WizardFile } from '@nis2-check/corpus';
import { evalVisibleIf, type AnswerValue, type ResolvedAnswers } from './conditions.ts';
import { InvalidAnswersError } from './errors.ts';
import type { AnswerIssue, Answers } from './types.ts';

type Followup = NonNullable<Question['conditional_followup']>;

/** A question as the engine sees it: a top-level question or a conditional follow-up. */
export interface WizardQuestion {
  id: string;
  kind: Question['kind'] | Followup['kind'];
  optional: boolean;
  optionIds: readonly string[];
  /** Top-level question, or the follow-up itself. */
  node: Question | Followup;
  visibleIf?: Question['visible_if'];
  /** Set on follow-ups: visible when the parent is visible and answered `triggerOn`. */
  parent?: { id: string; triggerOn: string };
  /** Locator in the corpus, for the trace. */
  locator: string;
}

/** The corpus files a sector's evaluation reads. */
export interface SectorContext {
  sectorId: string;
  sectorPath: string;
  sector: SectorFile;
  wizardPath: string;
  wizard: WizardFile;
  /** Questions asked in this sector, in flow order (follow-ups right after their parent). */
  questions: readonly WizardQuestion[];
}

const PHASES = ['disambiguation', 'sector_specific', 'standard_identification'] as const;

const isBinary = (kind: WizardQuestion['kind']) => kind === 'binary' || kind === 'binary_with_conditional_followup';

function toWizardQuestions(list: readonly Question[] | undefined, file: string, key: string, skip: ReadonlySet<string>): WizardQuestion[] {
  const out: WizardQuestion[] = [];
  (list ?? []).forEach((q, i) => {
    if (skip.has(q.id)) return;
    const locator = `${file}#${key}[${i}]`;
    out.push({
      id: q.id,
      kind: q.kind,
      optional: q.optional === true,
      optionIds: (q.options ?? []).map((o) => o.id),
      node: q,
      ...(q.visible_if !== undefined ? { visibleIf: q.visible_if } : {}),
      locator,
    });
    const f = q.conditional_followup;
    if (f) {
      out.push({
        id: f.id,
        kind: f.kind,
        optional: false,
        optionIds: f.options.map((o) => o.id),
        node: f,
        parent: { id: q.id, triggerOn: f.trigger_on },
        locator: `${locator}.conditional_followup`,
      });
    }
  });
  return out;
}

/**
 * Finds the sector file, its wizard and the common block, and lists the questions
 * asked in the sector.
 *
 * @throws {InvalidAnswersError} with kind `unknown_sector`
 */
export function resolveSector(sectorId: string, corpus: Corpus): SectorContext {
  const sectorEntry = Object.entries(corpus.sectors).find(([, s]) => s.meta.sector_id === sectorId);
  const wizardEntry = sectorEntry && Object.entries(corpus.wizard).find(([, w]) => w.meta.sector_data === sectorEntry[0]);
  if (!sectorEntry || !wizardEntry) {
    throw new InvalidAnswersError([{ questionId: '(sector)', kind: 'unknown_sector', detail: `no sector "${sectorId}" in the corpus` }]);
  }
  const [sectorPath, sector] = sectorEntry;
  const [wizardPath, wizard] = wizardEntry;
  const common = Object.entries(corpus.wizard).filter(([, w]) => w.meta.block_id !== undefined);
  const excluded = new Set(wizard.excluded_common_questions ?? []);
  const none = new Set<string>();

  const questions: WizardQuestion[] = [];
  for (const phase of wizard.flow_order ?? PHASES) {
    if (phase === 'disambiguation') {
      for (const [p, w] of common) questions.push(...toWizardQuestions(w.questions, p, 'questions', excluded));
    } else if (phase === 'sector_specific') {
      questions.push(...toWizardQuestions(wizard.questions, wizardPath, 'questions', none));
      questions.push(...toWizardQuestions(wizard.sector_specific_questions, wizardPath, 'sector_specific_questions', none));
    } else {
      for (const [p, w] of common) {
        questions.push(...toWizardQuestions(w.standard_identification_questions, p, 'standard_identification_questions', excluded));
      }
      questions.push(...toWizardQuestions(wizard.standard_identification_questions, wizardPath, 'standard_identification_questions', none));
    }
  }
  return { sectorId, sectorPath, sector, wizardPath, wizard, questions };
}

function checkValue(q: WizardQuestion, value: AnswerValue): string | undefined {
  if (isBinary(q.kind)) {
    return value === 'yes' || value === 'no' ? undefined : `expected "yes" or "no", got ${JSON.stringify(value)}`;
  }
  if (q.kind === 'multi_select') {
    if (typeof value === 'string') return 'expected a list of option ids';
    const unknown = value.filter((v) => !q.optionIds.includes(v));
    if (unknown.length) return `not options of "${q.id}": ${unknown.join(', ')}`;
    if (new Set(value).size !== value.length) return 'duplicate options';
    return undefined;
  }
  if (typeof value !== 'string') return 'expected a single option id';
  return q.optionIds.includes(value) ? undefined : `"${value}" is not an option of "${q.id}"`;
}

/** Visibility of each question given the answers, plus every validation issue (ADR 0016 §3). */
export function checkAnswers(ctx: SectorContext, answers: Answers): { resolved: ResolvedAnswers; visible: ReadonlySet<string>; issues: AnswerIssue[] } {
  const issues: AnswerIssue[] = [];
  const known = new Set(ctx.questions.map((q) => q.id));
  for (const id of Object.keys(answers)) {
    if (!known.has(id)) issues.push({ questionId: id, kind: 'unknown_question', detail: `not a question asked in sector "${ctx.sectorId}"` });
  }
  const resolved = new Map<string, AnswerValue>();
  const visible = new Set<string>();
  for (const q of ctx.questions) {
    const isVisible = q.parent
      ? visible.has(q.parent.id) && resolved.get(q.parent.id) === q.parent.triggerOn
      : q.visibleIf === undefined || evalVisibleIf(q.visibleIf, resolved);
    const value = Object.hasOwn(answers, q.id) ? answers[q.id] : undefined;
    if (!isVisible) {
      if (value !== undefined) issues.push({ questionId: q.id, kind: 'not_visible', detail: 'answered but not visible with the other answers' });
      continue;
    }
    visible.add(q.id);
    if (value === undefined) {
      if (!q.optional) issues.push({ questionId: q.id, kind: 'missing', detail: 'visible and not optional' });
      continue;
    }
    const problem = checkValue(q, value);
    if (problem) issues.push({ questionId: q.id, kind: 'invalid_value', detail: problem });
    else resolved.set(q.id, value);
  }
  return { resolved, visible, issues };
}

/**
 * Validates the answers and returns those of the visible questions.
 *
 * @throws {InvalidAnswersError} listing every issue
 */
export function resolveAnswers(ctx: SectorContext, answers: Answers): ResolvedAnswers {
  const { resolved, issues } = checkAnswers(ctx, answers);
  if (issues.length) throw new InvalidAnswersError(issues);
  return resolved;
}
