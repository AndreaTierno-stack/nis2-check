/**
 * Unit tests of the web logic: visibility of the questions (through the engine),
 * outcome -> scale position and color, numbering and grouping of the sources,
 * references formatted from the citation ids.
 */
import { describe, expect, it } from "vitest";
import { buildSources, formatReference } from "@/lib/sources";
import { SCALE, scalePosition, tone } from "@/lib/verdict";
import { isAnswered, pruneAnswers, sectorContext, visibleQuestions } from "@/lib/wizard";
import { realCorpus } from "./helpers";

const ids = (qs: { id: string }[]) => qs.map((q) => q.id);

describe("visibility of the questions", () => {
  const ctx = () => sectorContext(realCorpus(), "energia_elettrica");

  it("the PUN question appears with the charging activity, as principal or further", () => {
    expect(ids(visibleQuestions(ctx(), { tipologia_elettrica: "dso" }))).not.toContain("registrato_pun");
    expect(ids(visibleQuestions(ctx(), { tipologia_elettrica: "gestore_punti_ricarica" }))).toContain("registrato_pun");
    expect(ids(visibleQuestions(ctx(), { tipologia_elettrica: "dso", attivita_elettriche_ulteriori: ["gestore_punti_ricarica"] }))).toContain("registrato_pun");
  });

  it("a follow-up appears only after its parent answer", () => {
    expect(ids(visibleQuestions(ctx(), { pertinenza_pubblica_energia: "no" }))).not.toContain("tipo_partecipazione_pubblica");
    const shown = ids(visibleQuestions(ctx(), { pertinenza_pubblica_energia: "yes" }));
    expect(shown.indexOf("tipo_partecipazione_pubblica")).toBe(shown.indexOf("pertinenza_pubblica_energia") + 1);
  });

  it("answers of questions that become hidden are pruned", () => {
    const pruned = pruneAnswers(ctx(), { tipologia_elettrica: "dso", registrato_pun: "si", produttore_cliente_attivo: "no" });
    expect(pruned).toEqual({ tipologia_elettrica: "dso" });
  });

  it("the PA never shows dimension or cloud_pa", () => {
    const shown = ids(visibleQuestions(sectorContext(realCorpus(), "pubblica_amministrazione"), {}));
    expect(shown).not.toContain("dimension");
    expect(shown).not.toContain("cloud_pa");
  });

  it("an optional multiple choice can be left empty", () => {
    const q = ctx().questions.find((x) => x.id === "attivita_elettriche_ulteriori")!;
    expect(isAnswered(q, {})).toBe(true);
    const d = ctx().questions.find((x) => x.id === "dimension")!;
    expect(isAnswered(d, {})).toBe(false);
  });
});

describe("outcome -> scale and color", () => {
  it.each([
    ["likely_out_of_scope", 0, "muted"],
    ["ambiguous", 1, "warn"],
    ["likely_in_scope", 2, "accent"],
  ] as const)("%s -> position %i, %s", (outcome, position, color) => {
    expect(scalePosition({ outcome })).toBe(position);
    expect(tone({ outcome })).toBe(color);
    expect(SCALE[position]).toBe(outcome);
  });
});

describe("sources", () => {
  it("deduplicates, groups in the fixed order and numbers in that order", () => {
    const s = buildSources(["faq_amb_di_1", "dlgs_138_2024_art_6_c_3", "racc_ue_2003_361", "faq_amb_di_1", "det_acn_155238_2026_art_4", "dlgs_138_2024_art_5"], realCorpus());
    expect(s.groups.map((g) => g.group)).toEqual(["decreto_nis", "faq_acn", "determinazioni_acn", "altro"]);
    expect(s.groups.flatMap((g) => g.items.map((i) => [i.n, i.id]))).toEqual([
      [1, "dlgs_138_2024_art_6_c_3"],
      [2, "dlgs_138_2024_art_5"],
      [3, "faq_amb_di_1"],
      [4, "det_acn_155238_2026_art_4"],
      [5, "racc_ue_2003_361"],
    ]);
    expect(s.numberOf("faq_amb_di_1")).toBe(3);
    expect(s.numberOf("dlgs_138_2024_art_4_c_3")).toBeUndefined();
  });

  it("every item has the registry label and a KB link at the attesting line", () => {
    const [item] = buildSources(["dlgs_138_2024_art_3_c_6"], realCorpus()).groups[0]!.items;
    expect(item!.label).toMatch(/Allegato III/);
    expect(item!.url).toMatch(/^https:\/\/github\.com\/AndreaTierno-stack\/nis2-knowledge-it\/blob\/main\/wiki\/sources\/.+\?plain=1#L\d+$/);
  });

  it.each([
    ["dlgs_138_2024_art_3_c_5_lett_a", "D.Lgs. 138/2024, art. 3 c. 5 lett. a)"],
    ["dlgs_138_2024_allegato_III", "D.Lgs. 138/2024, Allegato III"],
    ["dl_105_2019_art_1_c_2_bis", "D.L. 105/2019, art. 1 c. 2-bis"],
    ["l90_2024_art_15_bis", "L. 90/2024, art. 15-bis"],
    ["dir_nis2_art_6_30", "Dir. (UE) 2022/2555, art. 6 punto 30"],
    ["det_piattaforma_127437_2026_art_11_c_2_lett_g", "Det. ACN 127437/2026, art. 11 c. 2 lett. g)"],
    ["faq_a3_c_4_1", "FAQ ACN A3.c.4.1"],
    ["faq_amb_no_1", "FAQ ACN AMB.NO.1"],
    ["faq_cat_8", "FAQ ACN CAT.8"],
    ["racc_ue_2003_361", "Racc. 2003/361/CE"],
  ])("%s -> %s", (id, ref) => {
    expect(formatReference(id)).toBe(ref);
  });

  it("every citation id of the registry has a formatted reference", () => {
    const all = Object.values(realCorpus().citations).flatMap((f) => f.citations.map((c) => c.id));
    expect(all.filter((id) => formatReference(id) === id)).toEqual([]);
  });
});

describe("printed verdict data (ADR 0018)", () => {
  it("reads the release date of a version from the CHANGELOG heading", async () => {
    const { releaseDate } = await import("@/lib/print");
    const log = "## [Unreleased]\n\n## [0.12.0] — 2026-10-30 — Nome\n\n## [0.11.1] — 2026-10-29 — Avviso\n";
    expect(releaseDate(log, "0.12.0")).toBe("2026-10-30");
    expect(releaseDate(log, "0.11.1")).toBe("2026-10-29");
    expect(releaseDate(log, "0.1.0")).toBeUndefined();
    expect(releaseDate(log, "0.12")).toBeUndefined();
  });

  it("the real CHANGELOG dates the current corpus version", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { releaseDate } = await import("@/lib/print");
    const dir = path.resolve(__dirname, "..", "..", "..", "packages", "corpus", "corpus");
    const version = fs.readFileSync(path.join(dir, "VERSION"), "utf8").trim();
    expect(releaseDate(fs.readFileSync(path.join(dir, "CHANGELOG.md"), "utf8"), version)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("watermark and date of the evaluation", async () => {
    const { formatEvaluatedAt, watermark } = await import("@/lib/print");
    expect(watermark("0.12.0", "2026-10-30", "0123456789abcdef")).toBe("corpus v0.12.0 (2026-10-30) · 01234567");
    expect(watermark("0.12.0", undefined, "0123456789abcdef")).toBe("corpus v0.12.0 · 01234567");
    expect(formatEvaluatedAt(new Date("2026-11-02T13:35:00Z"))).toBe("2 novembre 2026, 14:35");
  });

  it("limits of a path: every non_gestito entry, the segnalato entries of the sector, raised ones first", async () => {
    const { catalogItems, limitsForPath } = await import("@/lib/limits");
    const corpus = realCorpus();
    const all = catalogItems(corpus);
    const raised = ["punti_ricarica_non_pun_attivita_ulteriore", "energia_regime_transitorio_ose"];
    const { notHandled, flagged } = limitsForPath(corpus, "energia_elettrica", raised);
    expect(notHandled.map((e) => e.id)).toEqual(all.filter((e) => e.status === "non_gestito").map((e) => e.id));
    expect(notHandled).toHaveLength(7);
    expect(flagged.slice(0, 2).map((e) => [e.id, e.raised])).toEqual(raised.map((id) => [id, true]));
    expect(flagged.every((e) => e.status === "segnalato" && e.appliesTo.includes("energia_elettrica"))).toBe(true);
    expect(flagged.slice(2).every((e) => !e.raised)).toBe(true);
    expect(flagged).toHaveLength(all.filter((e) => e.status === "segnalato" && e.appliesTo.includes("energia_elettrica")).length);
  });
});
