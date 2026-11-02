/**
 * Declared limits of the tool, from the exceptions catalog (ADR 0012): the single source of
 * the "Cosa non gestisce il tool" block of the PDF and of the limits page. No text is written
 * here: titles and descriptions are the catalog entries, the names of what an entry concerns
 * come from the sector files and from the catalog entries of the regimes.
 */
import type { Corpus } from "@nis2-check/corpus";
import { composeDisclaimer, type ComposedDisclaimer } from "@/content/disclaimer";
import { DISCLAIMER_ENTRY } from "@/lib/links";

export type CatalogStatus = "gestito" | "segnalato" | "non_gestito";
export const STATUS_ORDER: readonly CatalogStatus[] = ["gestito", "segnalato", "non_gestito"];

export interface CatalogItem {
  id: string;
  status: CatalogStatus;
  title: string;
  description: string;
  citations: string[];
  appliesTo: string[];
}

type CatalogSource = Pick<Corpus, "exceptions">;

/**
 * All catalog entries, in file order, except that the notice of the tool
 * (`anteprima_di_studio_non_consulenza`) comes last: where it is listed, it is rendered as
 * the full composed notice and closes the list.
 */
export function catalogItems(corpus: CatalogSource): CatalogItem[] {
  const items = Object.values(corpus.exceptions).flatMap((f) =>
    f.exceptions.map((e) => ({
      id: e.id,
      status: e.status,
      title: e.title,
      description: e.description,
      citations: [...e.citations],
      appliesTo: [...e.applies_to],
    })),
  );
  return [...items.filter((e) => e.id !== DISCLAIMER_ENTRY), ...items.filter((e) => e.id === DISCLAIMER_ENTRY)];
}

/** The notice of the tool: the catalog entry composed with the product paragraphs (content/disclaimer.ts). */
export function toolNotice(corpus: CatalogSource): ComposedDisclaimer {
  const entry = catalogItems(corpus).find((e) => e.id === DISCLAIMER_ENTRY);
  if (!entry) throw new Error(`catalog entry ${DISCLAIMER_ENTRY} missing`);
  return composeDisclaimer(entry);
}

/** Catalog entries grouped by status, in the order gestito, segnalato, non gestito. */
export function catalogByStatus(corpus: CatalogSource): { status: CatalogStatus; items: CatalogItem[] }[] {
  const items = catalogItems(corpus);
  return STATUS_ORDER.map((status) => ({ status, items: items.filter((e) => e.status === status) }));
}

/** Name of a sector or regime named in `applies_to`: sector label, or the title of the regime catalog entry. */
export function appliesToLabel(corpus: Pick<Corpus, "exceptions" | "sectors" | "regimes">, id: string): string {
  const sector = Object.values(corpus.sectors).find((s) => s.meta.sector_id === id);
  if (sector) return sector.meta.label_it;
  const regime = Object.values(corpus.regimes).find((r) => r.meta.regime_id === id);
  const entry = regime && catalogItems(corpus).find((e) => e.id === regime.meta.exceptions_catalog_entry);
  return entry?.title ?? id;
}

export interface PathLimits {
  /** Every `non_gestito` entry, whatever the path (the notice of the tool last). */
  notHandled: CatalogItem[];
  /** The `segnalato` entries that apply to the evaluated sector, with the ones raised by this Verdict first. */
  flagged: (CatalogItem & { raised: boolean })[];
}

/**
 * Limits pertinent to an evaluated path: the `non_gestito` entries always, the `segnalato`
 * entries whose `applies_to` names the sector (those raised in `Verdict.notices` first,
 * in the Verdict order, then the others in catalog order).
 */
export function limitsForPath(corpus: CatalogSource, sectorId: string, raised: readonly string[]): PathLimits {
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
