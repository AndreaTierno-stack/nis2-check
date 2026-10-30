/**
 * Build-time loading of the corpus (server component only: it reads the file system).
 * The validated corpus reaches the client as a prop of the page; the fixtures stay out.
 */
import path from "node:path";
import { loadFromDisk, validateCorpus, type Corpus } from "@nis2-check/corpus";

export type WebCorpus = Omit<Corpus, "fixtures"> & { fixtures: Record<string, never> };

export function loadWebCorpus(): WebCorpus {
  // next build runs in apps/web
  const root = path.resolve(process.cwd(), "..", "..", "packages");
  const { corpus: raw, sources, parseErrors } = loadFromDisk(
    path.join(root, "corpus", "corpus"),
    path.join(root, "engine", "tests", "fixtures"),
  );
  const { corpus, errors } = validateCorpus(raw, sources, parseErrors);
  if (!corpus) throw new Error(`corpus:validate failed at build time:\n${errors.join("\n")}`);
  return { ...corpus, fixtures: {} };
}
