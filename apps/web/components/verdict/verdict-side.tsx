import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { answerRows, catalogSize } from "@/lib/verdict";
import { copy } from "@/src/copy.it";
import type { VerdictProps } from "./types";

/** Side column: the answers given, the actions of S4.2 (disabled), the technical line. */
export function VerdictSide({ verdict, ctx, answers, corpus, onEdit }: VerdictProps) {
  const rows = answerRows(ctx, answers);
  return (
    <>
      <Card className="space-y-4 p-5">
        <h2 className="font-semibold">{copy.sidebar.answersTitle}</h2>
        <dl className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="space-y-0.5" data-testid="answer" data-question={r.id}>
              <dt className="text-xs text-text-muted">{r.question}</dt>
              <dd className="flex items-start justify-between gap-2 text-sm font-medium">
                <span>{r.answer}</span>
                <button type="button" className="shrink-0 text-xs text-accent hover:underline" onClick={() => onEdit(r.id)}>
                  {copy.sidebar.editOne}
                </button>
              </dd>
            </div>
          ))}
        </dl>
        {rows[0] && (
          <Button variant="outline" size="bar" className="w-full" onClick={() => onEdit(rows[0]!.id)}>
            {copy.sidebar.edit}
          </Button>
        )}
      </Card>
      <div className="space-y-2">
        {[copy.sidebar.pdf, copy.sidebar.limits].map((label) => (
          <span key={label} title={copy.sidebar.comingSoon} className="block">
            <Button variant="outline" className="w-full" disabled>
              {label}
            </Button>
          </span>
        ))}
      </div>
      <p className="text-xs text-text-muted" data-testid="tech">
        {copy.sidebar.tech(verdict.corpusVersion, catalogSize(corpus), verdict.inputHash.slice(0, 8))}
      </p>
    </>
  );
}
