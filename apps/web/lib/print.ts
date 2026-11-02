/**
 * Data of the printed Verdict (ADR 0018): corpus release date from the CHANGELOG, date and
 * time of the evaluation, watermark. The PDF is the browser print of the verdict page.
 */

/**
 * Release date of a corpus version from the corpus CHANGELOG heading
 * (`## [0.12.0] — 2026-10-30 — title`), or undefined if the version has no dated heading.
 */
export function releaseDate(changelog: string, version: string): string | undefined {
  const escaped = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^## \\[${escaped}\\]\\s*\\S*\\s*(\\d{4}-\\d{2}-\\d{2})`, "m").exec(changelog)?.[1];
}

/** Date and time of the evaluation, Italian time: "2 novembre 2026, 14:35". */
export function formatEvaluatedAt(at: Date): string {
  const date = new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome" }).format(at);
  const time = new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Rome" }).format(at);
  return `${date}, ${time}`;
}

/** Watermark of CLAUDE.md "Deliverable PDF": corpus version (release date) and the first 8 characters of inputHash. */
export function watermark(corpusVersion: string, release: string | undefined, inputHash: string): string {
  return `corpus v${corpusVersion}${release ? ` (${release})` : ""} · ${inputHash.slice(0, 8)}`;
}

/**
 * Opens the print dialog ("Salva come PDF"). The document title is the default file name
 * of the PDF in most browsers: it is set for the dialog and restored afterwards.
 */
export function printVerdict(fileTitle: string): void {
  const previous = document.title;
  document.title = fileTitle;
  const restore = () => {
    document.title = previous;
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  window.print();
}
