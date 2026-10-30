import path from "node:path";
import { defineConfig } from "vitest/config";

// Unit and rendering tests in node: components are rendered with react-dom/server, no DOM library.
export default defineConfig({
  esbuild: { jsx: "automatic" },
  resolve: { alias: { "@": path.resolve(__dirname) } },
  test: { include: ["tests/**/*.test.{ts,tsx}"], environment: "node" },
});
