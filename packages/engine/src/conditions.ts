/**
 * Condition evaluation (ADR 0010 grammar, ADR 0016 §3).
 *
 * Answers reach this module already restricted to visible questions: an input with
 * no entry is absent, and every condition on an absent input is false.
 */
import type { VisibleIf, VisibleIfCondition } from '@nis2-check/corpus';
import { CorpusContractError } from './errors.ts';

export type AnswerValue = string | readonly string[];
/** Answers of the visible questions only. */
export type ResolvedAnswers = ReadonlyMap<string, AnswerValue>;

/** Simple condition of `visible_if`. */
export function evalCondition(c: VisibleIfCondition, answers: ResolvedAnswers): boolean {
  const a = answers.get(c.input);
  if (a === undefined) return false;
  switch (c.op) {
    case 'eq':
      return typeof a === 'string' && a === c.value;
    case 'neq':
      // a list answer is never equal to a single value
      return typeof a !== 'string' || a !== c.value;
    case 'includes':
      return typeof a !== 'string' && a.includes(c.value);
  }
}

/** `visible_if`: a simple condition, or `any_of` / `all_of` one level deep. */
export function evalVisibleIf(v: VisibleIf, answers: ResolvedAnswers): boolean {
  if ('any_of' in v) return v.any_of.some((c) => evalCondition(c, answers));
  if ('all_of' in v) return v.all_of.every((c) => evalCondition(c, answers));
  return evalCondition(v, answers);
}

/** One comparison of a string expression (`condition`, `trigger`). */
export interface Comparison {
  input: string;
  op: 'eq' | 'neq';
  value: string;
}

const COMPARISON_RE = /^([a-z][a-z0-9_]*)\s*(==|!=)\s*([a-z0-9_]+)$/;

/**
 * Parses `<input> == <value> [AND <input> != <value> ...]`, the string form of rule
 * conditions and triggers. OR and parentheses are outside the grammar.
 *
 * @throws {CorpusContractError} on an expression outside the grammar
 */
export function parseExpression(expr: string): Comparison[] {
  const terms = expr.trim().split(/\s+AND\s+/);
  return terms.map((term) => {
    const m = COMPARISON_RE.exec(term.trim());
    if (!m) throw new CorpusContractError(`expression outside the grammar: "${expr}"`);
    return { input: m[1]!, op: m[2] === '==' ? 'eq' : 'neq', value: m[3]! };
  });
}

/** A string expression is a conjunction: all_of over its comparisons. */
export function evalExpression(expr: string, answers: ResolvedAnswers): boolean {
  return parseExpression(expr).every((c) => evalCondition(c, answers));
}

/** Inputs read by a string expression. */
export const expressionInputs = (expr: string): string[] => parseExpression(expr).map((c) => c.input);
