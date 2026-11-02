/**
 * e2e on the static export: five fixtures clicked from the start (click-wrap, sector,
 * every question); the outcome on screen matches the expected outcome of the fixture.
 */
import { expect, test } from "@playwright/test";
import { answerFixture, loadFixture as load } from "./wizard";

for (const id of ["E01", "E05", "E11", "E22", "E25"]) {
  test(`${id}: outcome on screen = expected`, async ({ page }) => {
    const fx = load(id);
    await answerFixture(page, fx.sector, fx.inputs);
    const outcome = page.getByTestId("outcome");
    await expect(outcome).toHaveAttribute("data-outcome", fx.expected.verdict_outcome);
    await expect(outcome).toHaveAttribute("data-mode", fx.expected.assessment_mode);
    if (fx.expected.qualifica) await expect(page.getByTestId("qualifica")).toHaveText(fx.expected.qualifica);
    const notices = await page.getByTestId("notice").evaluateAll((els) => els.map((e) => e.getAttribute("data-notice")));
    if (fx.expected.notices) expect(notices).toEqual(fx.expected.notices);
  });
}
