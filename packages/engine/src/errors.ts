import type { AnswerIssue } from './types.ts';

/** The answers do not fit the wizard of the sector (ADR 0016 §3). Carries every issue found. */
export class InvalidAnswersError extends Error {
  readonly issues: readonly AnswerIssue[];

  constructor(issues: readonly AnswerIssue[]) {
    super(`invalid answers: ${issues.map((i) => `${i.questionId} (${i.kind})`).join(', ')}`);
    this.name = 'InvalidAnswersError';
    this.issues = issues;
  }
}

/**
 * The corpus breaks the engine contract at runtime (malformed expression, unresolved
 * reference). Unreachable with a corpus that passed corpus:validate.
 */
export class CorpusContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CorpusContractError';
  }
}
