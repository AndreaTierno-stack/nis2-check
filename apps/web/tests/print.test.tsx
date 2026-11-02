/**
 * Printed Verdict (ADR 0018): DOM snapshots in print mode for E05 (cloud, notices), E10 (PA,
 * size-blind essential) and E27 (energy, type exclusion with a further activity), plus the
 * content that paper needs: repeated header and foot with the disclaimer and the watermark,
 * cover, answers given, trace unfolded, explicit source URLs, limits of the path.
 *
 * "Print mode" snapshot: classes are reduced to the tokens that decide print visibility
 * (`hidden`, `print:*`), so the snapshot shows what is on paper and what is screen-only.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { evaluate } from "@nis2-check/engine";
import { PRINT_NOTICE } from "@/content/disclaimer";
import { PrintAnswers } from "@/components/verdict/print";
import { VerdictMain } from "@/components/verdict/verdict-main";
import { buildSources } from "@/lib/sources";
import { answerRows } from "@/lib/verdict";
import { sectorContext } from "@/lib/wizard";
import { copy } from "@/src/copy.it";
import { fixture, printView, realCorpus } from "./helpers";

const noop = () => {};
const AT = new Date("2026-11-02T13:35:00Z");

describe.each(["E05", "E10", "E27"])("printed verdict of %s", (id) => {
  const fx = fixture(id);
  const corpus = realCorpus();
  const verdict = evaluate({ sectorId: fx.sector, answers: fx.inputs }, corpus);
  const print = { evaluatedAt: AT, companyName: id === "E05" ? "Esempio S.r.l." : "", releaseDate: "2026-10-30" };
  const props = { corpus, ctx: sectorContext(corpus, fx.sector), answers: fx.inputs as Record<string, string | string[]>, verdict, onEdit: noop, print };
  const html = renderToStaticMarkup(<VerdictMain {...props} />);

  it("carries header, foot, disclaimer and watermark", () => {
    expect(html).toContain('data-testid="print-header"');
    expect(html).toContain('data-testid="print-footer"');
    expect(html).toContain(PRINT_NOTICE);
    expect(html).toContain(`corpus v${verdict.corpusVersion} (2026-10-30) · ${verdict.inputHash.slice(0, 8)}`);
    expect(html).toContain("2 novembre 2026, 14:35");
  });

  it("prints the trace, the answers, the source URLs and the limits of the path", () => {
    expect(html).toContain('id="come-calcolato"');
    const answers = renderToStaticMarkup(<PrintAnswers props={props} />);
    expect(answers.match(/<dt/g)?.length).toBe(answerRows(props.ctx, props.answers).length);
    expect(html).toContain(answers);
    const urls = buildSources(verdict.citations, corpus).groups.flatMap((g) => g.items.map((s) => s.url));
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) expect(html).toContain(url.replace(/&/g, "&amp;"));
    expect(html).toContain(`>${copy.print.limitsTitle}<`);
    expect(html).toContain('data-limit="anteprima_di_studio_non_consulenza"');
    for (const n of fx.expected.notices ?? []) expect(html).toContain(`data-limit="${n}"`);
  });

  it("shows the company name only when given", () => {
    expect(html.includes('data-testid="print-company"')).toBe(id === "E05");
  });

  it("matches the print-mode DOM snapshot", () => {
    expect(printView(html)).toMatchSnapshot();
  });
});
