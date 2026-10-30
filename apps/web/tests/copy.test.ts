/** Copy lint of ADR 0012 extended to copy.it.ts (forbidden words, no long dash). */
import { describe, expect, it } from "vitest";
import { lintUiCopy } from "@nis2-check/corpus";
import { copyStrings } from "@/src/copy.it";

describe("copy.it.ts", () => {
  it("passes the copy lint", () => {
    expect(lintUiCopy(copyStrings())).toEqual([]);
  });

  it("the lint catches the forbidden forms", () => {
    const errors = lintUiCopy({ a: "Rientri nel perimetro", b: "Report di compliance", c: "Esito — incerto", d: "Devi registrarti" });
    expect(errors).toHaveLength(4);
  });
});
