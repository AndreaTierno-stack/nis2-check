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

/** Example PDFs for review (not a test): PDF_OUT=<dir> pnpm --filter @nis2-check/web test:e2e print */
test("example PDFs", async ({ page, browserName }) => {
  test.skip(!process.env.PDF_OUT || browserName !== "chromium", "set PDF_OUT to write example PDFs (Chromium only)");
  for (const id of ["E05", "E27"]) {
    const fx = loadFixture(id);
    await answerFixture(page, fx.sector, fx.inputs);
    await page.getByTestId("company-name").fill("Esempio S.r.l.");
    await page.emulateMedia({ media: "print" });
    // printBackground off, as the browser default: colors must survive through print-color-adjust
    await page.pdf({ path: path.join(process.env.PDF_OUT!, `${id}.pdf`), preferCSSPageSize: true, printBackground: false });
    await page.emulateMedia({ media: "screen" });
    await page.evaluate(() => window.sessionStorage.clear());
  }
});
