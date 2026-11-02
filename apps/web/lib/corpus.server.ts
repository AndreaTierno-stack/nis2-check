/**
 * Build-time loading of the corpus (server component only: it reads the file system).
 * The validated corpus reaches the client as a prop of the page; the fixtures stay out.
 */
import fs from "node:fs";
import path from "node:path";
import { loadFromDisk, validateCorpus, type Corpus } from "@nis2-check/corpus";
import { releaseDate } from "@/lib/print";

export type WebCorpus = Omit<Corpus, "fixtures"> & {
  fixtures: Record<string, never>;
  /** Release date of the corpus version, from the corpus CHANGELOG (watermark of the PDF, ADR 0018). */
  releaseDate?: string;
};

export function loadWebCorpus(): WebCorpus {
  // next build runs in apps/web
  const root = path.resolve(process.cwd(), "..", "..", "packages");
  const corpusDir = path.join(root, "corpus", "corpus");
  const { corpus: raw, sources, parseErrors } = loadFromDisk(corpusDir, path.join(root, "engine", "tests", "fixtures"));
  const { corpus, errors } = validateCorpus(raw, sources, parseErrors);
  if (!corpus) throw new Error(`corpus:validate failed at build time:\n${errors.join("\n")}`);
  const changelog = fs.readFileSync(path.join(corpusDir, "CHANGELOG.md"), "utf8");
  const release = releaseDate(changelog, corpus.version);
  return { ...corpus, fixtures: {}, ...(release ? { releaseDate: release } : {}) };
}
