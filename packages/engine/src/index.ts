/**
 * @nis2-check/engine — pure, deterministic execution of the declarative corpus.
 *
 * The engine holds no normative knowledge: it routes the gates, applies the
 * qualification_rules, collects signals and composes the reasoning trace, copying
 * `verdict_outcome` from the corpus without inference (CLAUDE.md, constraint 2).
 */
import type { Corpus } from '@nis2-check/corpus';
import type { EvaluationInput, Verdict } from './types.ts';

export type * from './types.ts';

/** Thrown by the engine stub until S3 implements `evaluate`. */
export class NotImplementedError extends Error {
  constructor(what: string) {
    super(`${what}: not implemented (engine stub, S3)`);
    this.name = 'NotImplementedError';
  }
}

/**
 * Evaluates the answers against the corpus.
 *
 * @param input - sector id and serialized wizard answers, keyed by question id (ADR 0016)
 * @param corpus - corpus validated by the zod schema of @nis2-check/corpus
 * @returns the Verdict (S3)
 * @throws {NotImplementedError} always, until S3
 */
export function evaluate(input: EvaluationInput, corpus: Corpus): Verdict {
  void input;
  void corpus;
  throw new NotImplementedError('evaluate');
}
