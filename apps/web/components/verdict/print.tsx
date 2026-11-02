/**
 * Print-only parts of the verdict page (ADR 0018). The PDF is the browser print of the page:
 * these blocks are hidden on screen (`hidden print:block`) and complete the printed document
 * with the cover, the answers given, the limits of the path and the header and foot repeated
 * on every page. Every text comes from copy.it.ts, the disclaimer source, the corpus or the
 * catalog; nothing is persisted.
 */
import type { ReactNode } from "react";
import { PRINT_NOTICE } from "@/content/disclaimer";
import { Disclaimer } from "@/components/disclaimer";
import { DISCLAIMER_ENTRY } from "@/lib/links";
import { limitsForPath, toolNotice } from "@/lib/limits";
import { formatEvaluatedAt, watermark } from "@/lib/print";
import type { Sources } from "@/lib/sources";
import { answerRows } from "@/lib/verdict";
import { copy } from "@/src/copy.it";
import { Cite } from "./cite";
import type { VerdictProps } from "./types";

/**
 * On screen a plain block; in print a table whose head and foot repeat on every page
 * (`table-header-group` / `table-footer-group`, honoured by Chrome and Firefox). Margin boxes
 * of `@page` are not used: their support differs between browsers. CSS in app/globals.css.
 */
export function PrintFrame({ props, children }: { props: VerdictProps; children: ReactNode }) {
  const { verdict, print } = props;
  const hash = verdict.inputHash.slice(0, 8);
  return (
    <table className="print-frame">
      <thead data-testid="print-header">
        <tr>
          <td>
            <div className="mb-4 flex justify-between gap-4 border-b border-border pb-2 text-xs text-text-soft">
              <span>
                <span className="font-semibold text-text">{copy.brand}</span> · {copy.print.docTitle}
              </span>
              <span>
                {copy.print.header(hash)}
                {print && ` · ${formatEvaluatedAt(print.evaluatedAt)}`}
              </span>
            </div>
          </td>
        </tr>
      </thead>
      <tfoot data-testid="print-footer">
        <tr>
          <td>
            <div className="mt-4 space-y-1 border-t border-border pt-2 text-xs text-text-soft">
              <p>{PRINT_NOTICE}</p>
              <p className="font-semibold" data-testid="watermark">
                {watermark(verdict.corpusVersion, print?.releaseDate, verdict.inputHash)}
              </p>
            </div>
          </td>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td className="space-y-6">{children}</td>
        </tr>
      </tbody>
    </table>
  );
}

/** Cover: document title, optional company name, sector, date and time, corpus version, evaluation code. */
export function PrintCover({ props }: { props: VerdictProps }) {
  const { verdict, ctx, print } = props;
  const rows: [string, string][] = [
    ...(print?.companyName.trim() ? [[copy.print.company, print.companyName.trim()] as [string, string]] : []),
    [copy.print.sector, ctx.sector.meta.label_it],
    ...(print ? [[copy.print.evaluatedAt, `${formatEvaluatedAt(print.evaluatedAt)} (${copy.print.italianTime})`] as [string, string]] : []),
    [copy.print.corpus, copy.print.corpusRelease(verdict.corpusVersion, print?.releaseDate)],
    [copy.print.code, verdict.inputHash.slice(0, 8)],
  ];
  return (
    <section className="hidden space-y-4 print:block" data-testid="print-cover">
      <p className="text-sm font-semibold text-accent">{copy.brand}</p>
      <p className="text-2xl font-semibold">{copy.print.docTitle}</p>
      <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-text-muted">{k}</dt>
            <dd className="font-semibold" data-testid={k === copy.print.company ? "print-company" : undefined}>
              {v}
            </dd>
          </div>
        ))}
      </dl>
      <p className="text-sm font-semibold text-text-soft">{copy.print.summaryPart}</p>
    </section>
  );
}

/** The answers given (input of the evaluation): with them the document is reproducible. */
export function PrintAnswers({ props }: { props: VerdictProps }) {
  const rows = answerRows(props.ctx, props.answers);
  return (
    <section className="hidden space-y-3 print:block" data-testid="print-answers">
      <div className="print-keep-with-next space-y-3">
        <h2 className="text-lg font-semibold">{copy.sidebar.answersTitle}</h2>
        <p className="text-sm text-text-soft">{copy.print.answersSubtitle(props.verdict.inputHash.slice(0, 8))}</p>
      </div>
      <dl className="space-y-2 rounded-panel border border-border p-5 text-sm">
        {rows.map((r) => (
          <div key={r.id} className="print-avoid-break">
            <dt className="text-text-muted">{r.question}</dt>
            <dd className="font-semibold">{r.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Heading that opens the technical part of the printed document. */
export function PrintTechnicalHeading() {
  return <p className="hidden pt-2 text-sm font-semibold text-text-soft print:block">{copy.print.technicalPart}</p>;
}

/**
 * "Cosa non gestisce il tool": catalog entries pertinent to the evaluated path (lib/limits.ts).
 * The notice of the tool, a non_gestito entry, closes the list as the full composed notice.
 */
export function PrintLimits({ props, sources }: { props: VerdictProps; sources: Sources }) {
  const { flagged, notHandled } = limitsForPath(props.corpus, props.ctx.sectorId, props.verdict.notices);
  // review 2026-11-02, F09: entries raised by the answers apart from the other entries of the
  // sector, whose texts describe situations the user did not declare
  const groups = [
    { key: "raised", title: copy.print.limitsRaised, items: flagged.filter((e) => e.raised) },
    { key: "other", title: copy.print.limitsOther, items: flagged.filter((e) => !e.raised) },
    { key: "non_gestito", title: copy.verdict.status.non_gestito, items: notHandled.map((e) => ({ ...e, raised: false })) },
  ].filter((g) => g.items.length);
  return (
    <section className="hidden space-y-3 print:block" data-testid="print-limits">
      <div className="print-keep-with-next space-y-3">
        <h2 className="text-lg font-semibold">{copy.print.limitsTitle}</h2>
        <p className="text-sm text-text-soft">{copy.print.limitsIntro}</p>
      </div>
      {groups.map((g) => (
        <div key={g.key} className="space-y-2 rounded-panel border border-border p-5">
          <h3 className="font-semibold">{g.title}</h3>
          <ul className="space-y-2">
            {g.items.map((e) =>
              e.id === DISCLAIMER_ENTRY ? (
                <li key={e.id} className="print-avoid-break text-sm text-text-soft" data-limit={e.id}>
                  <Disclaimer notice={toolNotice(props.corpus)} heading="h3" />
                </li>
              ) : (
              <li key={e.id} className="print-avoid-break text-sm" data-limit={e.id}>
                <span className="font-semibold">{e.title}</span>
                <span className="block text-text-soft">
                  {e.description} <Cite ids={e.citations} sources={sources} />
                </span>
              </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </section>
  );
}
