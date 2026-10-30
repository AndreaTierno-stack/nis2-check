/**
 * e2e on the static export: five fixtures clicked from the start (click-wrap, sector,
 * every question); the outcome on screen matches the expected outcome of the fixture.
 */
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { expect, test } from "@playwright/test";
import type { Fixture } from "@nis2-check/corpus";
import { answerFixture } from "./wizard";

const PACKAGES = path.resolve(__dirname, "..", "..", "..", "packages");
const DIR = path.join(PACKAGES, "engine", "tests", "fixtures");
// js-yaml from the corpus package (YAML 1.2, as the corpus loader); the loader itself is ESM-only
const yaml = createRequire(path.join(PACKAGES, "corpus", "package.json"))("js-yaml") as { load: (s: string) => unknown };
const load = (id: string) => {
  const file = fs.readdirSync(DIR).find((f) => f.startsWith(`${id}_`))!;
  return yaml.load(fs.readFileSync(path.join(DIR, file), "utf8")) as Fixture;
};

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
