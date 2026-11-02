/**
 * Printed Verdict (ADR 0018): DOM snapshots in print mode for E05 (cloud, notices), E10 (PA,
 * size-blind essential) and E27 (energy, type exclusion with a further activity), plus the
 * content that paper needs: repeated header and foot with the disclaimer and the watermark,
 * cover, answers given, trace unfolded, explicit source URLs, limits of the path.
 *
 * "Print mode" snapshot: classes are reduced to the tokens that decide print visibility
 * (`hidden`, `print:*`), so the snapshot shows what is on paper and what is screen-only.
 */
import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { evaluate } from "@nis2-check/engine";
import { PRINT_NOTICE } from "@/content/disclaimer";
import { PrintConsultantBox, PrintCover } from "@/components/verdict/print";
import { VerdictMain } from "@/components/verdict/verdict-main";
import { releaseDate } from "@/lib/print";
import { buildSources } from "@/lib/sources";
import { answerRows } from "@/lib/verdict";
import { sectorContext } from "@/lib/wizard";
import { copy } from "@/src/copy.it";
import { fixture, printView, realCorpus } from "./helpers";

const noop = () => {};
const AT = new Date("2026-11-02T13:35:00Z");
const CORPUS_DIR = path.resolve(__dirname, "..", "..", "..", "packages", "corpus", "corpus");
const RELEASE = releaseDate(fs.readFileSync(path.join(CORPUS_DIR, "CHANGELOG.md"), "utf8"), realCorpus().version)!;

describe.each(["E05", "E10", "E27"])("printed verdict of %s", (id) => {
  const fx = fixture(id);
  const corpus = realCorpus();
  const verdict = evaluate({ sectorId: fx.sector, answers: fx.inputs }, corpus);
  const print = { evaluatedAt: AT, companyName: id === "E05" ? "Esempio S.r.l." : "", releaseDate: RELEASE };
  const props = { corpus, ctx: sectorContext(corpus, fx.sector), answers: fx.inputs as Record<string, string | string[]>, verdict, onEdit: noop, print };
  const html = renderToStaticMarkup(<VerdictMain {...props} />);

  it("carries header, foot, disclaimer and watermark", () => {
    expect(html).toContain('data-testid="print-header"');
    expect(html).toContain('data-testid="print-footer"');
    expect(html).toContain(PRINT_NOTICE);
    expect(html).toContain(`corpus v${verdict.corpusVersion} (${RELEASE}) · ${verdict.inputHash.slice(0, 8)}`);
    expect(html).toContain("2 novembre 2026, 14:35");
  });

  it("prints the cover with the full notice, the box for the consultant with the answers, the trace, the source URLs and the compact limits", () => {
    expect(html).toContain('id="come-calcolato"');
    // C1: the full composed notice on the cover
    const cover = renderToStaticMarkup(<PrintCover props={props} />);
    expect(cover).toContain('data-testid="disclaimer"');
    expect(html).toContain(cover);
    // C2: the box carries outcome, qualification, regimes, code and every answer given
    const box = renderToStaticMarkup(<PrintConsultantBox props={props} />);
    expect(html).toContain(box);
    expect(box).toContain(copy.verdict.scale[verdict.outcome]);
    expect(box).toContain(verdict.inputHash.slice(0, 8));
    const answers = box.slice(box.indexOf('data-testid="print-answers"'));
    expect(answers.match(/<dt/g)?.length).toBe(answerRows(props.ctx, props.answers).length);
    // C4: the technical part comes after the summary, the box and the limits
    expect(html.indexOf('data-testid="print-limits"')).toBeLessThan(html.indexOf('id="come-calcolato"'));
    expect(html.indexOf('data-testid="print-consultant"')).toBeLessThan(html.indexOf('data-testid="print-limits"'));
    const urls = buildSources(verdict.citations, corpus).groups.flatMap((g) => g.items.map((s) => s.url));
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) expect(html).toContain(url.replace(/&/g, "&amp;"));
    expect(html).toContain(`>${copy.print.limitsTitle}<`);
    expect(html).toContain('data-limit="anteprima_di_studio_non_consulenza"');
    for (const n of fx.expected.notices ?? []) expect(html).toContain(`data-limit="${n}"`);
    // C3: the notice of the tool is a one-line title in the limits, not the full text again
    const limits = html.slice(html.indexOf('data-testid="print-limits"'), html.indexOf('id="come-calcolato"'));
    expect(limits).not.toContain('data-testid="disclaimer"');
  });

  it("shows the company name only when given", () => {
    expect(html.includes('data-testid="print-company"')).toBe(id === "E05");
  });

  it("matches the print-mode DOM snapshot", () => {
    expect(printView(html)).toMatchSnapshot();
  });
});
