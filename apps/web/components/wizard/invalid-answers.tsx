import type { AnswerIssue, SectorContext } from "@nis2-check/engine";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { questionNode } from "@/lib/wizard";
import { copy } from "@/src/copy.it";

/** InvalidAnswersError: a generic message and the questions to complete, never a blank page. */
export function InvalidAnswers({ ctx, issues, onGoTo }: { ctx: SectorContext; issues: readonly AnswerIssue[]; onGoTo: (id: string) => void }) {
  const questions = ctx.questions.filter((q) => issues.some((i) => i.questionId === q.id));
  return (
    <Card className="space-y-4 border-warn bg-warn-soft p-6 text-warn-text">
      <h1 className="text-xl font-semibold">{copy.questions.invalidTitle}</h1>
      <p>{copy.questions.invalidText}</p>
      <ul className="space-y-2">
        {questions.map((q) => (
          <li key={q.id} className="flex flex-wrap items-center justify-between gap-3">
            <span>{questionNode(q).label_it}</span>
            <Button size="sm" variant="outline" onClick={() => onGoTo(q.id)}>
              {copy.questions.goTo}
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
