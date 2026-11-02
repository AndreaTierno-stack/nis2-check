import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { answerRows, catalogSize } from "@/lib/verdict";
import { copy } from "@/src/copy.it";
import type { VerdictProps } from "./types";

/** Download action of the side column (ADR 0018): the optional company name lives in memory only. */
export interface PdfAction {
  companyName: string;
  onCompanyName: (value: string) => void;
  onPrint: () => void;
}

/** Side column: the answers given, PDF download with the optional company name, limits (S4.2), technical line. Not printed. */
export function VerdictSide({ verdict, ctx, answers, corpus, onEdit, pdf }: VerdictProps & { pdf?: PdfAction }) {
  const rows = answerRows(ctx, answers);
  const companyId = useId();
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
      <Card className="space-y-3 p-5">
        <div className="space-y-1">
          <label htmlFor={companyId} className="text-sm font-semibold">
            {copy.sidebar.companyLabel}
          </label>
          {/* never persisted: no sessionStorage, no autocomplete history; it reaches only the printed cover */}
          <input
            id={companyId}
            type="text"
            autoComplete="off"
            maxLength={120}
            className="h-10 w-full rounded-full border border-border bg-surface px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            value={pdf?.companyName ?? ""}
            onChange={(e) => pdf?.onCompanyName(e.target.value)}
            disabled={!pdf}
            data-testid="company-name"
          />
          <p className="text-xs text-text-muted">{copy.sidebar.companyHelp}</p>
        </div>
        <Button className="w-full" onClick={pdf?.onPrint} disabled={!pdf} data-testid="download-pdf">
          {copy.sidebar.pdf}
        </Button>
        <p className="text-xs text-text-muted">{copy.sidebar.pdfHint}</p>
      </Card>
      <span title={copy.sidebar.comingSoon} className="block">
        <Button variant="outline" className="w-full" disabled>
          {copy.sidebar.limits}
        </Button>
      </span>
      <p className="text-xs text-text-muted" data-testid="tech">
        {copy.sidebar.tech(verdict.corpusVersion, catalogSize(corpus), verdict.inputHash.slice(0, 8))}
      </p>
    </>
  );
}
