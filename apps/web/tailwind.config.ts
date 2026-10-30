import type { Config } from "tailwindcss";

/**
 * Design tokens of the app (S4.1): the only colors available. The default Tailwind
 * palette is replaced, not extended, so no other color can be used by mistake.
 * Radii: panels 20px, rows 16px, everything else a pill. No shadows, no gradients.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ground: "#eef1ee",
      surface: "#ffffff",
      text: { DEFAULT: "#1b1f1d", muted: "#6b716d", soft: "#505753" },
      border: { DEFAULT: "#dfe4df", soft: "#e3e8e3" },
      accent: { DEFAULT: "#1d6b47", hover: "#155237", soft: "#e3efe8" },
      warn: { DEFAULT: "#d98b1a", soft: "#fff4e0", text: "#7a4a0c" },
    },
    borderRadius: {
      none: "0",
      row: "16px",
      panel: "20px",
      full: "9999px",
    },
    boxShadow: { none: "none" },
    extend: {
      fontFamily: {
        sans: ["var(--font-public-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
