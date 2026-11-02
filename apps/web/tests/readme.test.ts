/**
 * README of the repository (S4.2 block 4):
 * - the notice between the markers is exactly the composed notice (disclaimerMarkdown), the
 *   same text shown by click-wrap, footer, PDF and limits page;
 * - the public URL is a marked placeholder until PUBLIC_URL is set at the release act;
 * - the prose passes the copy lint (forbidden categorical and compliance wording, no long dash).
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { lintUiCopy } from "@nis2-check/corpus";
import { disclaimerMarkdown } from "@/content/disclaimer";
import { toolNotice } from "@/lib/limits";
import { PUBLIC_URL } from "@/lib/release";
import { realCorpus } from "./helpers";

const README = fs.readFileSync(path.resolve(__dirname, "..", "..", "..", "README.md"), "utf8").replace(/\r\n/g, "\n");
const START = /<!-- avviso:inizio[^>]*-->\n/;
const END = "\n<!-- avviso:fine -->";
const PLACEHOLDER = "[URL DA DEFINIRE ALL'ATTO DI RILASCIO]";

describe("README", () => {
  it("carries the composed notice between the markers, in the first lines", () => {
    const start = START.exec(README);
    expect(start, "start marker").not.toBeNull();
    const from = start!.index + start![0].length;
    const to = README.indexOf(END, from);
    expect(to, "end marker").toBeGreaterThan(from);
    expect(README.slice(from, to)).toBe(disclaimerMarkdown(toolNotice(realCorpus()), PUBLIC_URL));
    // the notice starts within the first ten lines
    expect(README.slice(0, from).split("\n").length).toBeLessThanOrEqual(10);
  });

  it("has a marked placeholder for the public URL until the release act", () => {
    if (PUBLIC_URL) {
      expect(README).toContain(PUBLIC_URL);
      expect(README).not.toContain(PLACEHOLDER);
    } else {
      expect(README).toContain(PLACEHOLDER);
      expect(README).not.toMatch(/https:\/\/[a-z0-9-]+\.vercel\.app/);
    }
  });

  it("passes the copy lint outside code blocks", () => {
    const prose = README.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
    const lines = Object.fromEntries(prose.split("\n").map((l, i) => [`README.md:${i + 1}`, l]));
    expect(lintUiCopy(lines)).toEqual([]);
  });
});
