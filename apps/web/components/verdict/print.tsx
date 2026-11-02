/**
 * Print-only parts of the verdict page (ADR 0018). The PDF is the browser print of the page:
 * these blocks are hidden on screen (`hidden print:block`) and complete the printed document,
 * in about four pages: cover with the full notice, the summary panels of the page, the box for
 * the consultant with the answers given, the compact limits of the path, then the technical part
 * (trace and sources) at the end. Header and foot repeat on every page. Every text comes from
 * copy.it.ts, the disclaimer source, the corpus or the catalog; nothing is persisted.
 */
import type { ReactNode } from "react";
import { Disclaimer } from "@/components/disclaimer";
import { PRINT_NOTICE } from "@/content/disclaimer";
import { limitsForPath, toolNotice } from "@/lib/limits";
import { formatEvaluatedAt, watermark } from "@/lib/print";
import type { Sources } from "@/lib/sources";
import { answerRows, facts, notices } from "@/lib/verdict";
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

/**
 * Cover: document title, optional company name, sector, date and time, corpus version, evaluation
 * code, then the full composed notice of the tool (C1): the notice is not repeated at the end of
 * the document; the one-line notice stays at the foot of every page.
 */
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
      <Disclaimer notice={toolNotice(props.corpus)} heading="h2" className="rounded-panel border border-border p-4 text-xs text-text-soft" />
      <p className="text-sm font-semibold text-text-soft">{copy.print.summaryPart}</p>
    </section>
  );
}

/**
 * "Cosa portare al consulente" (C2): outcome and suggested qualification, special regimes, notices
 * and signals raised, evaluation code and corpus version, answers given. Only data already in the
 * Verdict and in the corpus labels: no new normative text, no prescriptive wording.
 */
export function PrintConsultantBox({ props }: { props: VerdictProps }) {
  const { verdict, ctx, answers, corpus } = props;
  const f = facts(verdict, ctx, answers, corpus);
  const raised = notices(verdict, corpus);
  const rows = answerRows(ctx, answers);
  const hash = verdict.inputHash.slice(0, 8);
  const summary: [string, string][] = [
    [copy.print.box.outcome, copy.verdict.scale[verdict.outcome]],
    [copy.verdict.facts.qualifica, f.qualifica],
    [copy.verdict.facts.regimi, f.regimi.join("; ")],
    [copy.print.box.code, copy.print.box.codeValue(hash, verdict.corpusVersion)],
  ];
  return (
    <section className="hidden space-y-3 rounded-panel border border-border p-5 print:block" data-testid="print-consultant">
      <div className="print-keep-with-next space-y-1">
        <h2 className="text-lg font-semibold">{copy.print.box.title}</h2>
        <p className="text-sm text-text-soft">{copy.print.box.intro}</p>
      </div>
      <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-sm">
        {summary.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-text-muted">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      {raised.length > 0 && (
        <div className="print-avoid-break space-y-1 text-sm">
          <h3 className="font-semibold">{copy.print.box.notices}</h3>
          <ul className="list-disc space-y-0.5 pl-5">
            {raised.map((n) => (
              <li key={n.id}>{n.title}</li>
            ))}
          </ul>
        </div>
      )}
      {verdict.signals.length > 0 && <p className="text-sm">{copy.print.box.signals(verdict.signals.length)}</p>}
      <div className="space-y-1 text-sm" data-testid="print-answers">
        <h3 className="font-semibold">{copy.sidebar.answersTitle}</h3>
        <p className="text-text-soft">{copy.print.answersSubtitle(hash)}</p>
        {/* one line per answer: question, then the answer in bold */}
        <dl className="space-y-1">
          {rows.map((r) => (
            <div key={r.id} className="print-avoid-break">
              <dt className="inline text-text-muted">{r.question}</dt> <dd className="inline font-semibold">{r.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Heading that opens the technical part of the printed document (trace and sources, at the end, C4). */
export function PrintTechnicalHeading() {
  return <p className="hidden pt-2 text-sm font-semibold text-text-soft print:block">{copy.print.technicalPart}</p>;
}

/**
 * "Cosa non gestisce il tool" (lib/limits.ts), compact (C3): the catalog entries raised by the
 * answers in full (they are the notices of the Verdict: the notices panel of the page is not printed
 * twice), every non_gestito entry on one line (title), one line pointing to the limits page for the
 * other entries of the sector.
 */
export function PrintLimits({ props, sources }: { props: VerdictProps; sources: Sources }) {
  const { flagged } = limitsForPath(props.corpus, props.ctx.sectorId, props.verdict.notices);
  const { notHandled } = limitsForPath(props.corpus, props.ctx.sectorId, []);
  const raised = notices(props.verdict, props.corpus);
  const others = flagged.filter((e) => !e.raised).length;
  return (
    <section className="hidden space-y-3 print:block" data-testid="print-limits">
      <div className="print-keep-with-next space-y-1">
        <h2 className="text-lg font-semibold">{copy.print.limitsTitle}</h2>
        <p className="text-sm text-text-soft">{copy.print.limitsIntro}</p>
      </div>
      {raised.length > 0 && (
        <div className="space-y-2 rounded-panel border border-border p-5">
          <h3 className="font-semibold">{copy.print.limitsRaised}</h3>
          <ul className="space-y-2">
            {raised.map((e) => (
              <li key={e.id} className="print-avoid-break text-sm" data-limit={e.id}>
                <span className="font-semibold">{e.title}</span>
                <span className="text-text-muted"> ({copy.verdict.status[e.status]})</span>
                <span className="block text-text-soft">
                  {e.description} <Cite ids={e.citations} sources={sources} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="print-avoid-break space-y-1 rounded-panel border border-border p-5 text-sm">
        <h3 className="font-semibold">{copy.verdict.status.non_gestito}</h3>
        <ul className="list-disc space-y-0.5 pl-5">
          {notHandled.map((e) => (
            <li key={e.id} data-limit={e.id}>
              {e.title}
            </li>
          ))}
        </ul>
      </div>
      {others > 0 && (
        <p className="text-sm text-text-soft" data-testid="print-limits-others">
          {copy.print.limitsOthers(others)}
        </p>
      )}
    </section>
  );
}
