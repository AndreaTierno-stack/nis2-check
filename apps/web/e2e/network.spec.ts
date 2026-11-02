/**
 * Zero runtime network beyond the static assets (CLAUDE.md, constraint 7; S4.2 block 3).
 * - The export carries no third-party script, stylesheet, font or image: every src/href of
 *   <script>, <link> and <img> in the HTML files is relative to the origin.
 * - A full session (click-wrap, wizard, verdict, print media, limits page) sends requests only
 *   to the origin, under the CSP of vercel.json (applied by scripts/serve-out.mjs), with no
 *   CSP violation.
 * - Preview stage: noindex on every page and robots.txt disallowing everything.
 */
import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { answerFixture, loadFixture } from "./wizard";

const OUT = path.resolve(__dirname, "..", "out");
const htmlFiles = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? htmlFiles(path.join(dir, e.name)) : e.name.endsWith(".html") ? [path.join(dir, e.name)] : []));

test("the export references no external resource", () => {
  const files = htmlFiles(OUT);
  expect(files.length).toBeGreaterThan(1);
  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const refs = [...html.matchAll(/<(?:script|link|img)\b[^>]*?\s(?:src|href)="([^"]*)"/g)].map((m) => m[1]!);
    for (const ref of refs) expect(ref, `${path.relative(OUT, file)}: ${ref}`).toMatch(/^\/(?!\/)/);
  }
});

test("a full session sends requests only to the origin, without CSP violations", async ({ page, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const foreign: string[] = [];
  const violations: string[] = [];
  page.on("request", (r) => {
    const u = new URL(r.url());
    if (u.protocol !== "data:" && u.origin !== origin) foreign.push(r.url());
  });
  page.on("console", (m) => {
    if (/Content.Security.Policy/i.test(m.text())) violations.push(m.text());
  });
  const fx = loadFixture("E27");
  await answerFixture(page, fx.sector, fx.inputs);
  await page.getByTestId("company-name").fill("Esempio S.r.l.");
  await page.emulateMedia({ media: "print" });
  await expect(page.getByTestId("print-footer")).toBeVisible();
  await page.emulateMedia({ media: "screen" });
  await page.getByTestId("limits-link").click();
  await expect(page.locator("[data-entry]").first()).toBeVisible();
  const csp = (await page.request.get("/")).headers()["content-security-policy"];
  expect(csp).toContain("default-src 'self'");
  expect(foreign).toEqual([]);
  expect(violations).toEqual([]);
});

test("preview stage: noindex on every page, robots.txt disallows everything", async ({ page, request }) => {
  for (const url of ["/", "/limiti/"]) {
    await page.goto(url);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  }
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Disallow: \//);
});
