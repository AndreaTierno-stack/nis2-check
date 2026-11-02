import { defineConfig } from "@playwright/test";

/**
 * e2e on the static export (pnpm build first): fixtures clicked from the start, printed verdict,
 * limits page, network. Chromium in CI; E2E_BROWSER=firefox runs the same specs on Firefox
 * (local check of the print CSS). E2E_BASE_URL=<deployed origin> runs them against a deployment,
 * without the local server (S4.2 block 3).
 */
const remote = process.env.E2E_BASE_URL;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: remote ?? "http://localhost:4173",
    browserName: process.env.E2E_BROWSER === "firefox" ? "firefox" : "chromium",
  },
  ...(remote ? {} : { webServer: { command: "node scripts/serve-out.mjs", url: "http://localhost:4173", reuseExistingServer: !process.env.CI } }),
});
