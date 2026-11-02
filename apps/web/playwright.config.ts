import { defineConfig } from "@playwright/test";

/**
 * e2e on the static export (pnpm build first): fixtures clicked from the start, printed verdict.
 * Chromium in CI; E2E_BROWSER=firefox runs the same specs on Firefox (local check of the print CSS).
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  workers: 1,
  reporter: "list",
  use: { baseURL: "http://localhost:4173", browserName: process.env.E2E_BROWSER === "firefox" ? "firefox" : "chromium" },
  webServer: { command: "node scripts/serve-out.mjs", url: "http://localhost:4173", reuseExistingServer: !process.env.CI },
});
