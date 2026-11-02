/**
 * Declared limits of the tool, from the exceptions catalog (ADR 0012): the single source of
 * the "Cosa non gestisce il tool" block of the PDF and of the limits page. No text is written
 * here: titles and descriptions are the catalog entries.
 */
import type { Corpus } from "@nis2-check/corpus";

export type CatalogStatus = "gestito" | "segnalato" | "non_gestito";

export interface CatalogItem {
  id: string;
  status: CatalogStatus;
  title: string;
  description: string;
  citations: string[];
  appliesTo: string[];
}

/** All catalog entries, in file order. */
export function catalogItems(corpus: Pick<Corpus, "exceptions">): CatalogItem[] {
  return Object.values(corpus.exceptions).flatMap((f) =>
    f.exceptions.map((e) => ({
      id: e.id,
      status: e.status,
      title: e.title,
      description: e.description,
      citations: [...e.citations],
      appliesTo: [...e.applies_to],
    })),
  );
}

export interface PathLimits {
  /** Every `non_gestito` entry, whatever the path. */
  notHandled: CatalogItem[];
  /** The `segnalato` entries that apply to the evaluated sector, with the ones raised by this Verdict first. */
  flagged: (CatalogItem & { raised: boolean })[];
}

/**
 * Limits pertinent to an evaluated path: the `non_gestito` entries always, the `segnalato`
 * entries whose `applies_to` names the sector (those raised in `Verdict.notices` first,
 * in the Verdict order, then the others in catalog order).
 */
export function limitsForPath(corpus: Pick<Corpus, "exceptions">, sectorId: string, raised: readonly string[]): PathLimits {
  const items = catalogItems(corpus);
  const flagged = items.filter((e) => e.status === "segnalato" && (e.appliesTo.includes(sectorId) || raised.includes(e.id)));
  const order = (e: CatalogItem) => {
    const i = raised.indexOf(e.id);
    return i === -1 ? raised.length + flagged.indexOf(e) : i;
  };
  return {
    notHandled: items.filter((e) => e.status === "non_gestito"),
    flagged: [...flagged].sort((a, b) => order(a) - order(b)).map((e) => ({ ...e, raised: raised.includes(e.id) })),
  };
}
