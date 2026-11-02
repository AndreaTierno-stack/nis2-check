/**
 * Product and legal notice of the tool (S4.2): the single source of the texts that are
 * not in the exceptions catalog. The catalog entry `anteprima_di_studio_non_consulenza`
 * stays the source of the non-consultancy notice (corpus 0.11.1); this file holds the
 * product side (study preview, licence, review status, privacy, authorities).
 *
 * DRAFT: operational draft subject to legal review (bozza operativa soggetta a review
 * legale). The text is declared AS-IS and not reviewed by a lawyer (ADR 0017).
 *
 * Checked by the copy lint of ADR 0012 (tests/copy.test.ts).
 */

/** One line repeated at the foot of every printed page of the PDF (ADR 0018). */
export const PRINT_NOTICE =
  "Anteprima di studio: strumento informativo gratuito, non sostituisce una consulenza legale, una verifica certificata di terza parte o la registrazione sulla piattaforma ACN. Disclaimer non sottoposto a review legale.";

/** Every string of this file, keyed by name, for the copy lint. */
export const disclaimerStrings = (): Record<string, string> => ({ PRINT_NOTICE });
