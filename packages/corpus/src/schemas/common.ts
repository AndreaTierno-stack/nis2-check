/**
 * Shared vocabulary of the corpus schema.
 *
 * Every invariant violation carries a stable error code in square brackets at the
 * start of its message (e.g. `[E_VISIBLE_IF]`), so tests and CI logs can match it.
 */
import { z } from 'zod';

/** Stable error codes emitted by the schema and by the validator. */
export const E = {
  PARSE: 'E_PARSE',
  CITATION_ID: 'E_CITATION_ID',
  VERDICT_OUTCOME: 'E_VERDICT_OUTCOME',
  ESCALATE_AMBIGUOUS: 'E_ESCALATE_AMBIGUOUS',
  FIXED_MAPPING: 'E_FIXED_MAPPING',
  QUALIFICA_BOTH: 'E_QUALIFICA_BOTH',
  ID_MISSING: 'E_ID_MISSING',
  PHASE: 'E_PHASE',
  REF_FILE: 'E_REF_FILE',
  REF_SIGNAL: 'E_REF_SIGNAL',
  REF_QUESTION: 'E_REF_QUESTION',
  RULE_INPUT: 'E_RULE_INPUT',
  CATALOG_REF: 'E_CATALOG_REF',
  CATALOG_UNREFERENCED: 'E_CATALOG_UNREFERENCED',
  CITATION_UNREGISTERED: 'E_CITATION_UNREGISTERED',
  COPY: 'E_COPY',
  REGIME_META: 'E_REGIME_META',
  OVERRIDE_CITATIONS: 'E_OVERRIDE_CITATIONS',
  OVERRIDE_KIND: 'E_OVERRIDE_KIND',
  TRIGGER: 'E_TRIGGER',
  VISIBLE_IF: 'E_VISIBLE_IF',
  DIMENSION_CITATIONS: 'E_DIMENSION_CITATIONS',
  SIZE_BLIND: 'E_SIZE_BLIND',
  FIXTURE_VERSION: 'E_FIXTURE_VERSION',
  FIXTURE_INPUT: 'E_FIXTURE_INPUT',
  FIXTURE_SIGNAL: 'E_FIXTURE_SIGNAL',
  REGIME_ROUTING: 'E_REGIME_ROUTING',
  CORPUS_REF: 'E_CORPUS_REF',
  YAML_BOOL: 'E_YAML_BOOL',
  OUTCOME_MAPPING_INCLUSIVE: 'E_OUTCOME_MAPPING_INCLUSIVE',
  OUTCOME_WITHOUT_TRIGGER: 'E_OUTCOME_WITHOUT_TRIGGER',
  ACTIVITY_REF: 'E_ACTIVITY_REF',
} as const;
export type ErrorCode = (typeof E)[keyof typeof E];

/** Stable warning codes: reported by corpus:validate, they do not fail it. */
export const W = {
  CITATION_UNUSED: 'W_CITATION_UNUSED',
} as const;
export type WarningCode = (typeof W)[keyof typeof W];

/**
 * Keys whose values are citation IDs, wherever they appear in corpus files and
 * fixtures (arrays of IDs, or a single ID for base_legal_definition).
 */
export const CITATION_KEYS = ['citations', 'cumulative_regulations', 'base_legal_definition'] as const;

/**
 * Collects the citation IDs used in a parsed document, with their paths.
 *
 * @param doc - parsed YAML document (objects are passthrough, so every key survives)
 * @param base - path prefix of the document
 */
export function collectCitationIds(doc: unknown, base: (string | number)[]): { id: string; path: (string | number)[] }[] {
  const out: { id: string; path: (string | number)[] }[] = [];
  const walk = (node: unknown, path: (string | number)[]) => {
    if (Array.isArray(node)) return node.forEach((x, i) => walk(x, [...path, i]));
    if (node === null || typeof node !== 'object') return;
    for (const [k, v] of Object.entries(node)) {
      if ((CITATION_KEYS as readonly string[]).includes(k)) {
        if (typeof v === 'string') out.push({ id: v, path: [...path, k] });
        else if (Array.isArray(v)) v.forEach((x, i) => typeof x === 'string' && out.push({ id: x, path: [...path, k, i] }));
      } else walk(v, [...path, k]);
    }
  };
  walk(doc, base);
  return out;
}

/** Formats an issue message with its error code. */
export const msg = (code: ErrorCode, text: string): string => `[${code}] ${text}`;

/**
 * Citation ID: snake_case, first segment lowercase, later segments may carry
 * uppercase roman numerals or letters (`dlgs_138_2024_allegato_III`, `faq_a1_p9`).
 */
export const CITATION_ID_RE = /^[a-z][a-z0-9]*(?:_[A-Za-z0-9]+)*$/;
export const CitationId = z
  .string()
  .regex(CITATION_ID_RE, { message: msg(E.CITATION_ID, 'malformed citation ID') });
export const Citations = z.array(CitationId);

/** Corpus identifiers (question, option, signal, sector ids). */
export const Id = z.string().regex(/^[a-z0-9][a-z0-9_]*$/, { message: 'malformed id' });

export const VerdictOutcome = z.enum(['likely_in_scope', 'likely_out_of_scope', 'ambiguous'], {
  required_error: msg(E.VERDICT_OUTCOME, 'verdict_outcome is required (constraint 2, ADR 0002)'),
});
export const AssessmentMode = z.enum(
  ['categorical_assessment', 'qualitative_signal_only', 'escalate_to_advisor', 'out_of_scope'],
  { required_error: msg(E.REGIME_META, 'assessment_mode is required') },
);
export const RoutingEffect = z.enum(['category_override', 'massive_disapplication', 'model_substitution']);

/** Path of a regime file as written in `reference:` fields. */
export const RegimeRef = z.string().regex(/^regimes\/[a-z0-9_]+\.yaml$/, {
  message: msg(E.REF_FILE, 'reference must be "regimes/<id>.yaml"'),
});

/**
 * Invariants shared by every entry that pairs an assessment mode with a verdict outcome:
 * - escalate_to_advisor -> ambiguous (constraint 6, enforced here and asserted by the engine);
 * - fixed mapping of ADR 0002: out_of_scope -> likely_out_of_scope,
 *   categorical_assessment -> likely_in_scope.
 */
export function checkOutcomePair(
  mode: string | undefined,
  outcome: string | undefined,
  ctx: z.RefinementCtx,
  path: (string | number)[] = [],
): void {
  if (mode === 'escalate_to_advisor' && outcome !== 'ambiguous') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path,
      message: msg(E.ESCALATE_AMBIGUOUS, `escalate_to_advisor requires verdict_outcome: ambiguous (found ${outcome})`),
    });
  }
  if (mode === 'out_of_scope' && outcome !== 'likely_out_of_scope') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path,
      message: msg(E.FIXED_MAPPING, `out_of_scope requires likely_out_of_scope (found ${outcome})`),
    });
  }
  if (mode === 'categorical_assessment' && outcome !== 'likely_in_scope') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path,
      message: msg(E.FIXED_MAPPING, `categorical_assessment requires likely_in_scope (found ${outcome})`),
    });
  }
}

/**
 * Trigger of a construct that declares an outcome (rule condition, override or
 * intersection trigger, mapping answer): required and non-empty, because the engine
 * never derives a trigger from where a construct sits (ADR 0016).
 */
export const TriggerExpr = (what: string) =>
  z
    .string({ required_error: msg(E.OUTCOME_WITHOUT_TRIGGER, `${what} is required: an outcome needs a declared trigger (ADR 0016)`) })
    .min(1, { message: msg(E.OUTCOME_WITHOUT_TRIGGER, `${what} is empty: an outcome needs a declared trigger (ADR 0016)`) });

/** Required id with a coded message, for questions and options. */
export const RequiredId = z.string({ required_error: msg(E.ID_MISSING, 'id is required') }).pipe(Id);
