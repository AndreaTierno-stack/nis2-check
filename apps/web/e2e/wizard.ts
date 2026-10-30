import type { Page } from "@playwright/test";

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
