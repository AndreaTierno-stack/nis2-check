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
import { LONG_SIGNALS } from "./cases/long-signals";
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

  it("keeps the preview banner off paper: the full notice of the cover covers it", () => {
    const banner = html.slice(html.lastIndexOf("<p", html.indexOf(copy.verdict.banner)), html.indexOf(copy.verdict.banner));
    expect(banner).toContain("print:hidden");
  });

  it("shows the company name only when given", () => {
    expect(html.includes('data-testid="print-company"')).toBe(id === "E05");
  });

  it("matches the print-mode DOM snapshot", () => {
    expect(printView(html)).toMatchSnapshot();
  });
});

/**
 * Pagination of the printed verdict (PDF checked on Firefox by the author, 2026-11-02): frames
 * opened at the foot of a page with their content on the next one. Every inner card is
 * unbreakable, no container draws a frame, the heading of each list travels with its first card.
 */
describe("pagination of the printed verdict, case with long signals", () => {
  const corpus = realCorpus();
  const verdict = evaluate({ sectorId: LONG_SIGNALS.sector, answers: LONG_SIGNALS.inputs }, corpus);
  const print = { evaluatedAt: AT, companyName: "", releaseDate: RELEASE };
  const props = { corpus, ctx: sectorContext(corpus, LONG_SIGNALS.sector), answers: LONG_SIGNALS.inputs, verdict, onEdit: noop, print };
  const html = renderToStaticMarkup(<VerdictMain {...props} />);
  /** The opening tag of the element that directly wraps the element whose attributes match `attr`. */
  const wrapperOf = (attr: string) => {
    const at = html.indexOf(attr);
    expect(at, attr).toBeGreaterThan(-1);
    const own = html.lastIndexOf("<", at);
    const parent = html.lastIndexOf("<div", own - 1);
    return html.slice(parent, html.indexOf(">", parent) + 1);
  };
  /** The unbreakable group that opens a list: the markup of its div, up to the matching closing tag. */
  const headGroup = (heading: string) => {
    const start = html.lastIndexOf("<div", html.lastIndexOf('data-print-group="head"', html.indexOf(heading)));
    const tags = /<div\b|<\/div>/g;
    tags.lastIndex = start;
    let depth = 0;
    for (let m = tags.exec(html); m; m = tags.exec(html)) {
      depth += m[0] === "</div>" ? -1 : 1;
      if (depth === 0) return html.slice(start, m.index + m[0].length);
    }
    throw new Error(`unclosed group before ${heading}`);
  };

  it("has four signals and three notices", () => {
    expect(verdict.signals.map((s) => s.id)).toEqual(["l90_cumulo", "cross_sector_inhouse_all_iv", "cross_sector_cloud_msp", "cer_signal"]);
    expect(verdict.notices).toHaveLength(3);
  });

  it("makes every signal, every trace stage and every raised limit an unbreakable card", () => {
    for (const s of verdict.signals) expect(wrapperOf(`data-signal="${s.id}"`)).toContain("print-avoid-break");
    for (const stage of ["regime_routing", "type_exclusion", "size_blind", "dimensional"]) {
      expect(wrapperOf(`data-stage="${stage}"`)).toContain("print-avoid-break");
    }
    const limits = html.slice(html.indexOf('data-testid="print-limits"'));
    for (const n of verdict.notices) {
      const at = limits.indexOf(`data-limit="${n}"`);
      const parent = limits.lastIndexOf("<div", limits.lastIndexOf("<", at) - 1);
      expect(limits.slice(parent, limits.indexOf(">", parent)), n).toContain("print-avoid-break");
    }
  });

  it("draws no frame on the containers of signals and trace", () => {
    expect(html).toMatch(/<section aria-labelledby="segnalazioni-title" data-testid="signals">/);
    expect(html).toMatch(/<section id="come-calcolato" class="hidden print:block" aria-labelledby="trace-title">/);
  });

  it("keeps each heading with its first card", () => {
    const signals = headGroup('id="segnalazioni-title"');
    expect(signals).toContain('id="segnalazioni-title"');
    expect(signals).toContain(`data-signal="${verdict.signals[0]!.id}"`);
    expect(signals).not.toContain(`data-signal="${verdict.signals[1]!.id}"`);
    const trace = headGroup('id="trace-title"');
    expect(trace).toContain('id="trace-title"');
    expect(trace).toContain('data-stage="regime_routing"');
    expect(trace).not.toContain('data-stage="type_exclusion"');
    const limits = headGroup(`>${copy.print.limitsRaised}<`);
    expect(limits).toContain(`>${copy.print.limitsTitle}<`);
    expect(limits).toContain(`data-limit="${verdict.notices[0]}"`);
  });

  it("matches the print-mode DOM snapshot", () => {
    expect(printView(html)).toMatchSnapshot();
  });
});

describe("signals section of the printed verdict", () => {
  it("is absent when the Verdict has no signals (E01)", () => {
    const corpus = realCorpus();
    const fx = fixture("E01");
    const verdict = evaluate({ sectorId: fx.sector, answers: fx.inputs }, corpus);
    expect(verdict.signals).toEqual([]);
    const props = { corpus, ctx: sectorContext(corpus, fx.sector), answers: fx.inputs as Record<string, string | string[]>, verdict, onEdit: noop };
    const html = renderToStaticMarkup(<VerdictMain {...props} />);
    expect(html).not.toContain('data-testid="signals"');
    expect(html).not.toContain(copy.verdict.signalsTitle);
  });
});
