import type { Corpus } from "@nis2-check/corpus";
import type { SectorContext, Verdict } from "@nis2-check/engine";
import type { AnswerMap } from "@/lib/wizard";

export interface VerdictProps {
  corpus: Corpus;
  ctx: SectorContext;
  answers: AnswerMap;
  verdict: Verdict;
  onEdit: (questionId: string) => void;
}
