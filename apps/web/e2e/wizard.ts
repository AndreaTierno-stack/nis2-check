import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import type { Page } from "@playwright/test";
import type { Fixture } from "@nis2-check/corpus";

const PACKAGES = path.resolve(__dirname, "..", "..", "..", "packages");
const DIR = path.join(PACKAGES, "engine", "tests", "fixtures");
// js-yaml from the corpus package (YAML 1.2, as the corpus loader); the loader itself is ESM-only
const yaml = createRequire(path.join(PACKAGES, "corpus", "package.json"))("js-yaml") as { load: (s: string) => unknown };

/** A golden fixture of the engine, read from its YAML file. */
export function loadFixture(id: string): Fixture {
  const file = fs.readdirSync(DIR).find((f) => f.startsWith(`${id}_`))!;
  return yaml.load(fs.readFileSync(path.join(DIR, file), "utf8")) as Fixture;
}

/** Walks the wizard from the start with the inputs of a fixture: click-wrap, sector, every question. */
export async function answerFixture(page: Page, sector: string, inputs: Record<string, string | string[]>) {
  await page.goto("/");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Prosegui" }).click();
  await page.locator("li").filter({ has: page.locator("button") }).nth(["cloud_computing", "energia_elettrica", "pubblica_amministrazione"].indexOf(sector)).locator("button").click();
  for (let guard = 0; guard < 40; guard++) {
    const question = page.getByTestId("question");
    if (!(await question.isVisible().catch(() => false))) return;
    const id = await question.getAttribute("data-question");
    if (!id) throw new Error("question without id");
    const value = inputs[id];
    for (const v of value === undefined ? [] : Array.isArray(value) ? value : [value]) {
      await question.locator(`[data-option="${v}"]`).click();
    }
    await page.getByTestId("next").click();
  }
  throw new Error("wizard did not end");
}
