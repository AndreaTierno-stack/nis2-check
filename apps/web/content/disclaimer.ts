/**
 * Notice of the tool (S4.2): the single source of the product and legal texts that are not
 * in the exceptions catalog. The notice shown to the user is always composed by
 * `composeDisclaimer` from two sources, each the only one for its content:
 *
 * - the catalog entry `anteprima_di_studio_non_consulenza` (corpus 0.12.2): study preview,
 *   preliminary and indicative outcome, not legal advice, not a substitute for the ACN
 *   registration, answers stay in the browser;
 * - this file: free and open source, no third-party certified verification, three-position
 *   outcomes never categorical, MIT licence AS-IS, limits page, official sources, and the
 *   only statement that the notice is a draft not reviewed by a lawyer (DRAFT_NOTICE).
 *
 * The composed notice is used by the click-wrap, the footer of every page (verdict page
 * included), the printed PDF and the limits page; the README carries the same text between
 * markers, checked by a test (S4.2 block 4).
 *
 * DRAFT: operational draft subject to legal review ("bozza operativa soggetta a review
 * legale"). Declared AS-IS and not reviewed by a lawyer (ADR 0017).
 *
 * Checked by the copy lint of ADR 0012 (tests/copy.test.ts).
 */

/** Href of the limits page ("Cosa non gestisce il tool"), generated from the catalog. */
export const LIMITS_HREF = "/limiti/";
/** Official sources that prevail over the tool. */
export const ACN_HREF = "https://www.acn.gov.it";
export const NORMATTIVA_HREF = "https://www.normattiva.it";

/** A run of text, or a link with its label. */
export type Segment = string | { label: string; href: string };

/** One line repeated at the foot of every printed page of the PDF (ADR 0018). */
export const PRINT_NOTICE =
  "Anteprima di studio: strumento informativo gratuito, non sostituisce una consulenza legale, una verifica certificata di terza parte o la registrazione sulla piattaforma ACN. Disclaimer non sottoposto a review legale.";

/** Visible statement of ADR 0017, last paragraph of the composed notice. */
export const DRAFT_NOTICE = "Questo avviso è una bozza e non è stato sottoposto a review legale.";

/**
 * Product and legal paragraphs, after the catalog entry. With the entry they cover (checked by
 * tests/limits.test.tsx): not legal advice or consultancy (entry), no substitute for a
 * third-party certified verification (paragraph 1), no substitute for the ACN registration
 * (entry), notice not reviewed by a lawyer (DRAFT_NOTICE, the only source of this point).
 */
export const PRODUCT_PARAGRAPHS: readonly (readonly Segment[])[] = [
  [
    "È uno strumento informativo gratuito e open source. Non sostituisce una verifica certificata di terza parte.",
  ],
  [
    "Gli esiti sono espressi su tre posizioni (probabile esclusione, esito incerto, probabile rientro) e non sono mai categorici: dipendono dalle risposte fornite e dalla versione del corpus normativo.",
  ],
  ["Il codice è distribuito con licenza MIT, così com'è (AS-IS), senza garanzie di alcun tipo."],
  ["I limiti dichiarati dello strumento sono elencati nella pagina ", { label: "Cosa non gestisce il tool", href: LIMITS_HREF }, "."],
  [
    "Fanno fede i testi ufficiali: le pubblicazioni dell'Agenzia per la Cybersicurezza Nazionale (",
    { label: "acn.gov.it", href: ACN_HREF },
    ") e la normativa vigente su ",
    { label: "Normattiva", href: NORMATTIVA_HREF },
    ".",
  ],
  // ADR 0017: the notice is declared not reviewed to whoever uses the tool, not only in the code
  [DRAFT_NOTICE],
];

export interface CatalogNotice {
  title: string;
  description: string;
}

export interface ComposedDisclaimer {
  title: string;
  paragraphs: (readonly Segment[])[];
}

/** The notice of the tool: catalog entry first (title and description), then the product paragraphs. */
export function composeDisclaimer(entry: CatalogNotice): ComposedDisclaimer {
  return { title: entry.title, paragraphs: [[entry.description], ...PRODUCT_PARAGRAPHS] };
}

/** Plain text of a paragraph (links as their label). */
export const segmentText = (p: readonly Segment[]): string => p.map((s) => (typeof s === "string" ? s : s.label)).join("");

/**
 * Markdown of the composed notice, for the README block between markers (tests/readme.test.ts).
 * Relative links (the limits page) are resolved against `siteUrl`; without it (no definitive
 * public URL yet, lib/release.ts) they stay plain text, so the README has no broken link and
 * the same words as every other surface.
 */
export function disclaimerMarkdown(d: ComposedDisclaimer, siteUrl?: string): string {
  const link = (s: { label: string; href: string }) =>
    !s.href.startsWith("/") ? `[${s.label}](${s.href})` : siteUrl ? `[${s.label}](${siteUrl.replace(/\/$/, "")}${s.href})` : s.label;
  const para = (p: readonly Segment[]) => p.map((s) => (typeof s === "string" ? s : link(s))).join("");
  return [`**${d.title}**`, ...d.paragraphs.map(para)].join("\n\n");
}

/** Every string of this file, keyed by name, for the copy lint. */
export const disclaimerStrings = (): Record<string, string> => ({
  PRINT_NOTICE,
  ...Object.fromEntries(PRODUCT_PARAGRAPHS.map((p, i) => [`PRODUCT_PARAGRAPHS[${i}]`, segmentText(p)])),
});
