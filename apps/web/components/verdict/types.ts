import type { Corpus } from "@nis2-check/corpus";
import type { SectorContext, Verdict } from "@nis2-check/engine";
import type { AnswerMap } from "@/lib/wizard";

/** Data shown only on paper (ADR 0018): never persisted, never sent anywhere. */
export interface PrintMeta {
  /** When the Verdict was computed in this browser. */
  evaluatedAt: Date;
  /** Optional "Nome azienda analizzata", typed next to the download button; empty by default. */
  companyName: string;
  /** Corpus release date from the CHANGELOG, if dated. */
  releaseDate?: string;
}

export interface VerdictProps {
  corpus: Corpus;
  ctx: SectorContext;
  answers: AnswerMap;
  verdict: Verdict;
  onEdit: (questionId: string) => void;
  print?: PrintMeta;
}
