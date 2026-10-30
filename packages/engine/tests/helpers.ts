import { loadFromDisk, validateCorpus, type Corpus } from '@nis2-check/corpus';

let cached: Corpus | undefined;

/** The real corpus, validated once per test file. */
export function realCorpus(): Corpus {
  if (!cached) {
    const { corpus: raw, parseErrors } = loadFromDisk();
    if (parseErrors.length) throw new Error(parseErrors.join('\n'));
    const { corpus, errors } = validateCorpus(raw);
    if (!corpus) throw new Error(errors.join('\n'));
    cached = corpus;
  }
  return cached;
}
