/**
 * Verdict contract of the decision engine.
 *
 * Mirrors the "Tipo Verdict" section of CLAUDE.md (post S1.1, ADR 0009 with the
 * 2026-10-27 amendment). Any change here is a contract change: update CLAUDE.md,
 * the ADRs and the corpus schema in the same commit.
 */

/** Direction of the verdict. Copied from the corpus `verdict_outcome`, never inferred (constraint 2). */
export type VerdictOutcome = 'likely_in_scope' | 'likely_out_of_scope' | 'ambiguous';

/** How the subject was assessed. `escalate_to_advisor` always pairs with `ambiguous` (constraint 6). */
export type AssessmentMode =
  | 'categorical_assessment'
  | 'qualitative_signal_only'
  | 'escalate_to_advisor'
  | 'out_of_scope';

/** Effect of a regime gate on the flow (regimes/*.yaml `meta.routing_effect`). */
export type RoutingEffect = 'category_override' | 'massive_disapplication' | 'model_substitution';

/** Corpus citation ID at verified granularity (e.g. `dlgs_138_2024_art_3_c_6`). */
export type CitationId = string;

/** Id of an entry of exceptions/exceptions__catalog.yaml (ADR 0012). */
export type CatalogEntryId = string;

/**
 * Reference to a signal defined in `signals/*.yaml` (e.g. `l90_cumulo`).
 * Shape to be finalized with the engine (S3).
 */
export interface SignalRef {
  id: string;
}

/**
 * One step of the client-side reasoning trace (Explainability Mode).
 * Shape to be finalized with the engine (S3).
 */
export interface ReasoningStep {
  text: string;
  citations: CitationId[];
}

/** One regime routing, populated from the `meta` of the referenced regime file (ADR 0009). */
export interface RegimeRouting {
  /** `meta.regime_id` of the regime. */
  regimeId: string;
  /** `meta.routing_effect` of the regime. */
  routingEffect: RoutingEffect;
  /**
   * `meta.residual_nis_obligation` of the regime.
   * `null` = not attested in the corpus, which is distinct from "no residual obligation".
   */
  residualNisObligation: string | null;
  /** `meta.exceptions_catalog_entry` of the regime: an exceptions catalog id (ADR 0012). */
  exceptionsCatalogEntry: string;
}

/** Output of `evaluate`. Informational pre-screening only: never a compliance statement. */
export interface Verdict {
  /** Copied from the corpus `verdict_outcome`: NEVER inferred. */
  outcome: VerdictOutcome;
  /** Feeds the Explainability Mode. */
  assessmentMode: AssessmentMode;
  /** Qualification; `inferita: true` when only signalled (no corpus rule uses it since ADR 0011). */
  qualifica?: { value: 'essenziale' | 'importante'; inferita: boolean };
  /**
   * Regime routings: empty when no override matches; otherwise one element per
   * matching override, in the order the overrides appear in the sector file.
   * The order is positional, not a precedence between regimes.
   */
  regimeRouting: RegimeRouting[];
  /** Signals such as `l90_cumulo`, `cross_sector_*`. */
  signals: SignalRef[];
  /** Verdict notices: ids of entries of the exceptions catalog (ADR 0012). */
  notices: CatalogEntryId[];
  /** Client-side observability. */
  reasoningTrace: ReasoningStep[];
  /** Verified-granularity citations only. */
  citations: CitationId[];
  /** Literal, unconditional. */
  disclaimerRequired: true;
  /** sha256 of the serialized answers. */
  inputHash: string;
  /** From corpus/VERSION. */
  corpusVersion: string;
}

/** Serialized wizard answers, keyed by question id (`"yes"`/`"no"` are strings). */
export type Answers = Readonly<Record<string, string | readonly string[]>>;
