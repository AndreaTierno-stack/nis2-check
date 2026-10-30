/**
 * Truth table of the condition evaluator (ADR 0010 grammar, ADR 0016 §3), including
 * operators the corpus 0.9.0 does not use (neq, includes, any_of, all_of) and absent inputs.
 */
import { describe, expect, it } from 'vitest';
import { evalCondition, evalExpression, evalVisibleIf, parseExpression, type ResolvedAnswers } from '../src/conditions.ts';
import { CorpusContractError } from '../src/errors.ts';

const answers: ResolvedAnswers = new Map<string, string | readonly string[]>([
  ['single', 'a'],
  ['binary', 'yes'],
  ['multi', ['x', 'y']],
  ['empty_multi', []],
]);

describe('simple conditions', () => {
  it.each([
    // input, op, value, expected
    ['single', 'eq', 'a', true],
    ['single', 'eq', 'b', false],
    ['single', 'neq', 'a', false],
    ['single', 'neq', 'b', true],
    ['single', 'includes', 'a', false],
    ['binary', 'eq', 'yes', true],
    ['binary', 'neq', 'yes', false],
    ['multi', 'includes', 'x', true],
    ['multi', 'includes', 'z', false],
    ['multi', 'eq', 'x', false],
    ['multi', 'neq', 'x', true],
    ['empty_multi', 'includes', 'x', false],
    ['empty_multi', 'neq', 'x', true],
    ['absent', 'eq', 'a', false],
    ['absent', 'neq', 'a', false],
    ['absent', 'includes', 'a', false],
  ] as const)('%s %s %s -> %s', (input, op, value, expected) => {
    expect(evalCondition({ input, op, value }, answers)).toBe(expected);
  });
});

describe('any_of / all_of (one level)', () => {
  const t = { input: 'single', op: 'eq', value: 'a' } as const;
  const f = { input: 'single', op: 'eq', value: 'b' } as const;
  const absent = { input: 'absent', op: 'neq', value: 'a' } as const;

  it.each([
    ['any_of', [t, f], true],
    ['any_of', [f, f], false],
    ['any_of', [absent, t], true],
    ['any_of', [absent, f], false],
    ['all_of', [t, t], true],
    ['all_of', [t, f], false],
    ['all_of', [t, absent], false],
  ] as const)('%s %j -> %s', (kind, conds, expected) => {
    const v = kind === 'any_of' ? { any_of: [...conds] } : { all_of: [...conds] };
    expect(evalVisibleIf(v, answers)).toBe(expected);
  });

  it('a simple visible_if is a single condition', () => {
    expect(evalVisibleIf(t, answers)).toBe(true);
    expect(evalVisibleIf(absent, answers)).toBe(false);
  });
});

describe('string expressions (condition, trigger)', () => {
  it('parses a conjunction of == and !=', () => {
    expect(parseExpression('dimension == grande AND soggetto_critico != yes')).toEqual([
      { input: 'dimension', op: 'eq', value: 'grande' },
      { input: 'soggetto_critico', op: 'neq', value: 'yes' },
    ]);
  });

  it.each([
    ['single == a', true],
    ['single == a AND binary == yes', true],
    ['single == a AND binary == no', false],
    ['single != b AND binary == yes', true],
    ['absent == a', false],
    ['absent != a', false],
    ['single == a AND absent != a', false],
  ])('%s -> %s', (expr, expected) => {
    expect(evalExpression(expr, answers)).toBe(expected);
  });

  it.each(['single == a OR binary == yes', '(single == a)', 'single = a', 'single == ', 'Single == a'])(
    'rejects "%s" as outside the grammar',
    (expr) => {
      expect(() => parseExpression(expr)).toThrow(CorpusContractError);
    },
  );
});
