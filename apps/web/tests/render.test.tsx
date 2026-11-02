/**
 * Rendering from the Verdict of five fixtures (E05 linear, E22 double routing, E25
 * exclusion, E26 conflict, E11 ambiguous with notices): DOM snapshots without styles of
 * the main column (trace included) and of the side column. Plus a question screen.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { evaluate } from "@nis2-check/engine";
import { TracePanel, VerdictMain } from "@/components/verdict/verdict-main";
import { VerdictSide } from "@/components/verdict/verdict-side";
import { QuestionPage } from "@/components/wizard/question-page";
import { buildSources } from "@/lib/sources";
import { signalItems } from "@/lib/verdict";
import { sectorContext, visibleQuestions } from "@/lib/wizard";
import { fixture, realCorpus, withoutStyles } from "./helpers";

const noop = () => {};

describe.each(["E05", "E22", "E25", "E26", "E11"])("verdict page of %s", (id) => {
  const fx = fixture(id);
  const corpus = realCorpus();
  const verdict = evaluate({ sectorId: fx.sector, answers: fx.inputs }, corpus);
  const props = { corpus, ctx: sectorContext(corpus, fx.sector), answers: fx.inputs as Record<string, string | string[]>, verdict, onEdit: noop };

  it("shows the expected outcome", () => {
    const html = renderToStaticMarkup(<VerdictMain {...props} />);
    expect(html).toContain(`data-outcome="${fx.expected.verdict_outcome}"`);
    expect(html).toContain(`data-mode="${fx.expected.assessment_mode}"`);
    for (const n of fx.expected.notices ?? []) expect(html).toContain(`data-notice="${n}"`);
  });

  it("matches the DOM snapshot", () => {
    const main = renderToStaticMarkup(<VerdictMain {...props} />);
    const trace = renderToStaticMarkup(<TracePanel props={props} sources={buildSources(verdict.citations, corpus)} />);
    const side = renderToStaticMarkup(<VerdictSide {...props} />);
    expect(withoutStyles(`${main}\n${trace}\n${side}`)).toMatchSnapshot();
  });
});

describe("question screen", () => {
  it("renders the visible question with its corpus label, help and options", () => {
    const corpus = realCorpus();
    const ctx = sectorContext(corpus, "energia_elettrica");
    const answers = { psnc: "no", dora: "no", cloud_pa: "no", tipologia_elettrica: "gestore_punti_ricarica" };
    const visible = visibleQuestions(ctx, answers);
    const index = visible.findIndex((q) => q.id === "registrato_pun");
    expect(index).toBeGreaterThan(0);
    const html = renderToStaticMarkup(
      <QuestionPage question={visible[index]!} index={index} total={visible.length} answers={answers} onAnswer={noop} onBack={noop} onNext={noop} isLast={false} />,
    );
    expect(html).toContain('data-question="registrato_pun"');
    expect(html).toContain('data-option="non_so"');
    expect(withoutStyles(html)).toMatchSnapshot();
  });
});

describe("signals on the verdict page (review 2026-11-02, F04)", () => {
  const corpus = realCorpus();
  const fixtures = Object.values(corpus.fixtures);

  it.each(fixtures.map((f) => [f.scenario_id, f] as const))("%s shows exactly its expected signals, with their corpus text", (_, fx) => {
    const verdict = evaluate({ sectorId: fx.sector, answers: fx.inputs }, corpus);
    const props = { corpus, ctx: sectorContext(corpus, fx.sector), answers: fx.inputs as Record<string, string | string[]>, verdict, onEdit: noop };
    const html = renderToStaticMarkup(<VerdictMain {...props} />);
    const shown = [...html.matchAll(/data-signal="([^"]+)"/g)].map((m) => m[1]);
    expect(shown).toEqual(fx.expected.signals ?? []);
    for (const s of signalItems(verdict, corpus, fx.sector)) expect(s.text.length).toBeGreaterThan(40);
  });

  it("at least one fixture exercises the panel", () => {
    expect(fixtures.some((f) => (f.expected.signals ?? []).length > 0)).toBe(true);
  });
});
