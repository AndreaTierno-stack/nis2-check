/**
 * Click-wrap and limits page on the static export (S4.2 block 2): the wizard is not
 * reachable without acceptance, acceptance is in memory only (a reload asks again), the
 * limits page lists the whole catalog and is reachable from the click-wrap and the verdict.
 */
import { expect, test } from "@playwright/test";
import { DRAFT_NOTICE } from "../content/disclaimer";
import { answerFixture, loadFixture } from "./wizard";

const CATALOG_SIZE = 30;

test("no wizard without acceptance; a reload asks again", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("click-wrap")).toBeVisible();
  await expect(page.getByRole("button", { name: "Prosegui" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Scegli" })).toHaveCount(0);
  await expect(page.getByTestId("click-wrap").getByTestId("disclaimer")).toContainText(DRAFT_NOTICE);
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Prosegui" }).click();
  await expect(page.getByRole("button", { name: "Scegli" }).first()).toBeVisible();
  // nothing about the acceptance is stored: no cookie, no storage key
  expect(await page.context().cookies()).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  await page.reload();
  await expect(page.getByTestId("click-wrap")).toBeVisible();
});

test("the limits page lists the whole catalog in three sections, from the click-wrap link", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("click-wrap").getByRole("link", { name: "Cosa non gestisce il tool" }).click();
  await expect(page).toHaveURL(/\/limiti\/$/);
  await expect(page.locator("[data-entry]")).toHaveCount(CATALOG_SIZE);
  const sections = await page.locator("[data-section]").evaluateAll((els) => els.map((e) => [e.getAttribute("data-section"), e.querySelectorAll("[data-entry]").length]));
  expect(sections).toEqual([
    ["gestito", 3],
    ["segnalato", 20],
    ["non_gestito", 7],
  ]);
  await expect(page.locator('[data-entry="anteprima_di_studio_non_consulenza"]').getByTestId("disclaimer")).toBeVisible();
  await page.getByRole("link", { name: "Torna allo strumento" }).click();
  await expect(page.getByTestId("click-wrap")).toBeVisible();
});

test("the verdict links to the limits page", async ({ page }) => {
  const fx = loadFixture("E01");
  await answerFixture(page, fx.sector, fx.inputs);
  await page.getByTestId("limits-link").click();
  await expect(page).toHaveURL(/\/limiti\/$/);
});
