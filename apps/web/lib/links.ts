/** Public locations: the knowledge base (CC-BY-4.0) and this repository. */
export const KB_REPO = "https://github.com/AndreaTierno-stack/nis2-knowledge-it";
export const CODE_REPO = "https://github.com/AndreaTierno-stack/nis2-check";

/** Catalog entry whose text is the click-wrap and footer notice (corpus 0.11.1, ADR 0017). */
export const DISCLAIMER_ENTRY = "anteprima_di_studio_non_consulenza";

/** KB page of a registry entry: the node on GitHub, plain view, at the first attesting line. */
export function kbUrl(kbNode: string, kbLines: string): string {
  const first = /^\d+/.exec(kbLines)?.[0] ?? "1";
  const encoded = kbNode.split("/").map(encodeURIComponent).join("/");
  return `${KB_REPO}/blob/main/${encoded}?plain=1#L${first}`;
}
