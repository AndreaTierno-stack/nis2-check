/**
 * Printed Verdict (ADR 0018) on the static export, with print media emulated: header and
 * foot with the disclaimer and the watermark, cover with the optional company name, trace
 * unfolded, explicit source URLs; side column and buttons off paper. "Scarica PDF" calls
 * window.print() (stubbed: the dialog is the browser's).
 */
import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { PRINT_NOTICE } from "../content/disclaimer";
import { LONG_SIGNALS } from "../tests/cases/long-signals";
import { answerFixture, loadFixture } from "./wizard";

const VERSION = fs.readFileSync(path.resolve(__dirname, "..", "..", "..", "packages", "corpus", "corpus", "VERSION"), "utf8").trim();

for (const id of ["E05", "E27"]) {
  test(`${id}: printed verdict carries disclaimer, corpus version and source URLs`, async ({ page }) => {
    const fx = loadFixture(id);
    await answerFixture(page, fx.sector, fx.inputs);
    await page.getByTestId("company-name").fill("Esempio S.r.l.");
    await page.evaluate(() => {
      const w = window as unknown as { __printed: number; print: () => void };
      w.__printed = 0;
      w.print = () => void w.__printed++;
    });
    await page.getByTestId("download-pdf").click();
    expect(await page.evaluate(() => (window as unknown as { __printed: number }).__printed)).toBe(1);

    // screen: print-only parts hidden
    await expect(page.getByTestId("print-cover")).toBeHidden();
    await expect(page.getByTestId("print-footer")).toBeHidden();

    await page.emulateMedia({ media: "print" });
    await expect(page.getByTestId("print-footer")).toBeVisible();
    await expect(page.getByTestId("print-footer")).toContainText(PRINT_NOTICE);
    await expect(page.getByTestId("print-header")).toContainText("Ambito NIS2");
    await expect(page.getByTestId("watermark")).toContainText(`corpus v${VERSION}`);
    await expect(page.getByTestId("print-cover")).toContainText(`${VERSION}`);
    await expect(page.getByTestId("print-company")).toHaveText("Esempio S.r.l.");
    await expect(page.locator("#come-calcolato")).toBeVisible();
    await expect(page.getByTestId("print-answers")).toBeVisible();
    await expect(page.getByTestId("print-limits")).toBeVisible();
    const urls = page.getByTestId("source-url");
    expect(await urls.count()).toBeGreaterThan(0);
    for (const url of await urls.all()) {
      await expect(url).toBeVisible();
      await expect(url).toHaveText(/^https:\/\/github\.com\/AndreaTierno-stack\/nis2-knowledge-it\/blob\/main\/.+#L\d+$/);
    }
    // off paper: side column, header bar, buttons
    await expect(page.getByTestId("download-pdf")).toBeHidden();
    await expect(page.getByTestId("tech")).toBeHidden();
    await expect(page.getByRole("button", { name: "Nuova valutazione" })).toBeHidden();
  });
}

/**
 * Pagination (PDF checked on Firefox by the author, 2026-11-02: frames opened at the foot of a page
 * with their content on the next one). Computed print styles on the case with long signals: every
 * signal, trace stage and raised limit is an unbreakable card, no container draws a frame, each
 * heading is in one unbreakable group with its first card. Runs on Firefox too (E2E_BROWSER=firefox).
 */
test("long signals: unbreakable cards, no container frames, headings with their first card", async ({ page }) => {
  await answerFixture(page, LONG_SIGNALS.sector, LONG_SIGNALS.inputs);
  await page.emulateMedia({ media: "print" });
  const breakOfParent = (sel: string) =>
    page.locator(sel).evaluateAll((els) => els.map((e) => getComputedStyle(e.parentElement!).breakInside));
  const signals = await breakOfParent('[data-testid="signal"]');
  expect(signals).toHaveLength(4);
  expect(new Set(signals)).toEqual(new Set(["avoid"]));
  const stages = await breakOfParent("#come-calcolato [data-stage]");
  expect(stages.length).toBeGreaterThanOrEqual(4);
  expect(new Set(stages)).toEqual(new Set(["avoid"]));
  const limits = await breakOfParent('[data-testid="print-limits"] div[data-limit]');
  expect(limits).toHaveLength(3);
  expect(new Set(limits)).toEqual(new Set(["avoid"]));
  for (const sel of ['[data-testid="signals"]', "#come-calcolato"]) {
    const border = await page.locator(sel).evaluate((e) => getComputedStyle(e).borderTopWidth);
    expect(border, sel).toBe("0px");
  }
  // the wrappers of signals and trace rows: framed cards for signals, unframed rows for the trace
  const signalFrames = await page.locator('[data-testid="signal"]').evaluateAll((els) => els.map((e) => getComputedStyle(e.parentElement!).borderTopWidth));
  expect(new Set(signalFrames)).toEqual(new Set(["1px"]));
  for (const [heading, first] of [
    ["#segnalazioni-title", '[data-testid="signal"]'],
    ["#trace-title", "[data-stage]"],
  ] as const) {
    const group = page.locator('[data-print-group="head"]').filter({ has: page.locator(heading) });
    await expect(group).toHaveCount(1);
    expect(await group.evaluate((e) => getComputedStyle(e).breakInside)).toBe("avoid");
    await expect(group.locator(first)).toHaveCount(1);
  }
});

test("no signals: the section of the other signals is absent (E01)", async ({ page }) => {
  const fx = loadFixture("E01");
  await answerFixture(page, fx.sector, fx.inputs);
  await page.emulateMedia({ media: "print" });
  await expect(page.getByTestId("print-footer")).toBeVisible();
  await expect(page.getByTestId("signals")).toHaveCount(0);
});

/** Example PDFs for review (not a test): PDF_OUT=<dir> pnpm --filter @nis2-check/web test:e2e print */
test("example PDFs", async ({ page, browserName }) => {
  test.skip(!process.env.PDF_OUT || browserName !== "chromium", "set PDF_OUT to write example PDFs (Chromium only)");
  const cases = [...["E05", "E27"].map((id) => ({ id, ...loadFixture(id) })), { id: "segnalazioni-lunghe", ...LONG_SIGNALS }];
  for (const { id, sector, inputs } of cases) {
    await answerFixture(page, sector, inputs);
    await page.getByTestId("company-name").fill("Esempio S.r.l.");
    await page.emulateMedia({ media: "print" });
    // printBackground off, as the browser default: colors must survive through print-color-adjust
    await page.pdf({ path: path.join(process.env.PDF_OUT!, `${id}.pdf`), preferCSSPageSize: true, printBackground: false });
    await page.emulateMedia({ media: "screen" });
    await page.evaluate(() => window.sessionStorage.clear());
  }
});
