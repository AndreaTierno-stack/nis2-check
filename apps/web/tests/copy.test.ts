/** Copy lint of ADR 0012 extended to copy.it.ts and to the disclaimer source (forbidden words, no long dash). */
import { describe, expect, it } from "vitest";
import { lintUiCopy } from "@nis2-check/corpus";
import { disclaimerStrings } from "@/content/disclaimer";
import { copyStrings } from "@/src/copy.it";

describe("copy.it.ts", () => {
  it("passes the copy lint", () => {
    expect(lintUiCopy(copyStrings())).toEqual([]);
  });

  it("the lint catches the forbidden forms", () => {
    const errors = lintUiCopy({ a: "Rientri nel perimetro", b: "Report di compliance", c: "Esito — incerto", d: "Devi registrarti", e: "Attivita' non dichiarata" });
    expect(errors).toHaveLength(5);
  });
});

describe("content/disclaimer.ts", () => {
  it("passes the copy lint", () => {
    expect(lintUiCopy(disclaimerStrings())).toEqual([]);
  });
});
