/**
 * Limits page ("Cosa non gestisce il tool", S4.2) and notice of the tool.
 * - Bidirectional invariant with the exceptions catalog (same spirit as E_CATALOG_UNREFERENCED):
 *   every catalog entry is on the page, and every entry on the page is in the catalog.
 * - Copy lint of the page texts: the lint of the registry labels and of the catalog texts.
 * - One notice everywhere: click-wrap, footer (verdict page included), PDF and limits page
 *   render the same composed paragraphs.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { lintUiCopy } from "@nis2-check/corpus";
import { evaluate } from "@nis2-check/engine";
import { ClickWrap } from "@/components/click-wrap";
import { LimitsPage } from "@/components/limits/limits-page";
import { Footer } from "@/components/shell/footer";
import { PrintLimits } from "@/components/verdict/print";
import { segmentText } from "@/content/disclaimer";
import { appliesToLabel, catalogItems, toolNotice } from "@/lib/limits";
import { DISCLAIMER_ENTRY } from "@/lib/links";
import { buildSources } from "@/lib/sources";
import { sectorContext } from "@/lib/wizard";
import { copy } from "@/src/copy.it";
import { fixture, realCorpus } from "./helpers";

/** HTML escaping of react-dom/server for text content and attributes. */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
const noop = () => {};

describe("limits page", () => {
  const corpus = realCorpus();
  const html = renderToStaticMarkup(<LimitsPage corpus={corpus} />);
  const catalog = catalogItems(corpus);
  const onPage = [...html.matchAll(/data-entry="([^"]+)"/g)].map((m) => m[1]);

  it("every catalog entry is on the page, every entry on the page is in the catalog, once", () => {
    expect(new Set(onPage)).toEqual(new Set(catalog.map((e) => e.id)));
    expect(onPage).toHaveLength(new Set(onPage).size);
  });

  it("three sections in the order gestito, segnalato, non gestito, with the catalog counts", () => {
    const sections = [...html.matchAll(/data-section="([^"]+)"/g)].map((m) => m[1]);
    expect(sections).toEqual(["gestito", "segnalato", "non_gestito"]);
    for (const status of ["gestito", "segnalato", "non_gestito"] as const) {
      const n = catalog.filter((e) => e.status === status).length;
      expect(n).toBeGreaterThan(0);
      expect(html).toContain(esc(`${copy.verdict.status[status]} (${copy.limits.count(n)})`));
      const block = html.slice(html.indexOf(`data-section="${status}"`)).split("data-section=")[1]!;
      expect([...block.matchAll(/data-entry="/g)]).toHaveLength(n);
    }
  });

  it("each entry shows title, description, what it concerns and its registry citations", () => {
    const sources = buildSources(catalog.flatMap((e) => e.citations), corpus);
    for (const e of catalog) {
      expect(html).toContain(esc(e.title));
      expect(html).toContain(esc(e.description));
      for (const id of e.appliesTo) expect(html).toContain(esc(appliesToLabel(corpus, id)));
      for (const c of e.citations) expect(html).toContain(`data-source="${c}"`);
      expect(e.citations.every((c) => sources.numberOf(c) !== undefined)).toBe(true);
    }
    // what an entry concerns is always named, never left as an id
    for (const id of new Set(catalog.flatMap((e) => e.appliesTo))) expect(appliesToLabel(corpus, id)).not.toBe(id);
  });

  it("passes the copy lint (catalog texts, registry labels, page strings, notice)", () => {
    const registry = new Map(Object.values(corpus.citations).flatMap((f) => f.citations.map((c) => [c.id, c.label ?? ""] as const)));
    const texts: Record<string, string> = {
      intro: copy.limits.intro(corpus.version, catalog.length),
      ...Object.fromEntries(Object.entries(copy.limits.sections).map(([k, v]) => [`section.${k}`, v])),
      ...Object.fromEntries(catalog.flatMap((e) => [[`${e.id}.title`, e.title], [`${e.id}.description`, e.description]])),
      ...Object.fromEntries(catalog.flatMap((e) => e.appliesTo.map((id) => [`${e.id}.applies_to.${id}`, appliesToLabel(corpus, id)]))),
      ...Object.fromEntries(catalog.flatMap((e) => e.citations.map((c) => [`label.${c}`, registry.get(c) ?? ""]))),
      ...Object.fromEntries(toolNotice(corpus).paragraphs.map((p, i) => [`notice.${i}`, segmentText(p)])),
    };
    expect(lintUiCopy(texts)).toEqual([]);
  });
});

describe("notice of the tool", () => {
  const corpus = realCorpus();
  const notice = toolNotice(corpus);
  const texts = notice.paragraphs.map((p) => esc(segmentText(p)));

  it("is the catalog entry followed by the product paragraphs", () => {
    const entry = catalogItems(corpus).find((e) => e.id === DISCLAIMER_ENTRY)!;
    expect(notice.title).toBe(entry.title);
    expect(segmentText(notice.paragraphs[0]!)).toBe(entry.description);
    expect(entry.description).not.toMatch(/nis2-check/i);
    expect(notice.paragraphs.map(segmentText).join(" ")).toMatch(/non è stato rivisto da un legale/);
  });

  it("is rendered identically by click-wrap, footer, PDF and limits page", () => {
    const fx = fixture("E27");
    const verdict = evaluate({ sectorId: fx.sector, answers: fx.inputs }, corpus);
    const props = { corpus, ctx: sectorContext(corpus, fx.sector), answers: fx.inputs as Record<string, string | string[]>, verdict, onEdit: noop };
    const surfaces = {
      clickWrap: renderToStaticMarkup(<ClickWrap notice={notice} onAccept={noop} />),
      footer: renderToStaticMarkup(<Footer notice={notice} />),
      pdf: renderToStaticMarkup(<PrintLimits props={props} sources={buildSources(verdict.citations, corpus)} />),
      limitsPage: renderToStaticMarkup(<LimitsPage corpus={corpus} />),
    };
    for (const [name, html] of Object.entries(surfaces)) {
      const rendered = [...html.matchAll(/data-text="([^"]*)"/g)].map((m) => m[1]);
      expect(rendered, name).toEqual(texts);
      expect(html, name).toContain(esc(notice.title));
    }
  });
});
