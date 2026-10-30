/**
 * @nis2-check/engine — pure, deterministic execution of the declarative corpus.
 *
 * The engine holds no normative knowledge: it evaluates the four stages of ADR 0016
 * (regime routing, type exclusion, size-blind rules, dimensional rules), collects
 * notices and signals and composes the reasoning trace, copying `verdict_outcome`
 * from the deciding corpus construct (CLAUDE.md, constraint 2).
 */
export type * from './types.ts';
export { evaluate, CONFLICT_NOTICE } from './evaluate.ts';
export { InvalidAnswersError, CorpusContractError } from './errors.ts';
export { checkAnswers, resolveSector, type SectorContext, type WizardQuestion } from './answers.ts';
