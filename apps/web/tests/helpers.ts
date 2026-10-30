import { loadFromDisk, validateCorpus, type Corpus, type Fixture } from "@nis2-check/corpus";

let cached: Corpus | undefined;

/** The real corpus with its fixtures, validated once. */
export function realCorpus(): Corpus {
  if (!cached) {
    const { corpus: raw } = loadFromDisk();
    const { corpus, errors } = validateCorpus(raw);
    if (!corpus) throw new Error(errors.join("\n"));
    cached = corpus;
  }
  return cached;
}

export function fixture(id: string): Fixture {
  const fx = Object.values(realCorpus().fixtures).find((f) => f.scenario_id === id);
  if (!fx) throw new Error(`fixture ${id} not found`);
  return fx;
}

/** Static markup without styles: class and style attributes removed, for DOM snapshots. */
export const withoutStyles = (html: string) =>
  html
    .replace(/\s(class|style)="[^"]*"/g, "")
    .replace(/></g, ">\n<");
