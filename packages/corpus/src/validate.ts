/**
 * corpus:validate — parse, schema (with cross-file invariants) and lints.
 */
import { CorpusSchema, type Corpus } from './schemas/corpus.ts';
import { E, msg } from './schemas/common.ts';
import { lintYamlBooleans } from './lint.ts';
import type { RawCorpus, SourceTexts } from './load.ts';

export interface ValidationResult {
  ok: boolean;
  errors: string[];
  corpus?: Corpus;
}

/** Formats a zod issue path as `wizard/wizard__x.yaml > questions[0] > id`. */
const formatPath = (path: (string | number)[]) =>
  path.map((p, i) => (typeof p === 'number' ? `[${p}]` : i === 0 ? p : ` > ${p}`)).join('').replace(/ > \[/g, '[');

/**
 * Validates a raw corpus (as loaded from disk or built in memory by tests).
 *
 * @param raw - unvalidated corpus
 * @param sources - source texts for the line-based lints (optional)
 * @param parseErrors - YAML parse errors from the loader (optional)
 */
export function validateCorpus(raw: RawCorpus, sources: SourceTexts = {}, parseErrors: string[] = []): ValidationResult {
  const errors = parseErrors.map((e) => msg(E.PARSE, e));
  const parsed = CorpusSchema.safeParse(raw);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      // path: [group, file, ...]; the group is redundant with the file path
      const [, file, ...rest] = issue.path;
      errors.push(`${String(file ?? issue.path[0])}${rest.length ? ` > ${formatPath(rest)}` : ''}: ${issue.message}`);
    }
  }
  errors.push(...lintYamlBooleans(sources));
  const result: ValidationResult = { ok: errors.length === 0, errors };
  if (parsed.success) result.corpus = parsed.data;
  return result;
}
