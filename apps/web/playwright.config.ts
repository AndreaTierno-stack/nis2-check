import { defineConfig } from "@playwright/test";

/** e2e on the static export (pnpm build first): five fixtures clicked from the start. */
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  workers: 1,
  reporter: "list",
  use: { baseURL: "http://localhost:4173", browserName: "chromium" },
  webServer: { command: "node scripts/serve-out.mjs", url: "http://localhost:4173", reuseExistingServer: !process.env.CI },
});
