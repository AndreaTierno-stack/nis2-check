/**
 * Per-file schemas of the corpus (sectors, wizard, regimes, signals) and of the
 * golden fixtures. Objects are `passthrough`: descriptive keys not listed here are
 * kept but not validated; the keys the engine reads are typed, and invariants that
 * concern a single entry live next to it. Cross-file invariants (references,
 * override/regime coherence, fixtures vs corpus) live in `corpus.ts`.
 */
import { z } from 'zod';
import {
  AssessmentMode,
  Citations,
  CitationId,
  E,
  Id,
  RegimeRef,
  RequiredId,
  RoutingEffect,
  TriggerExpr,
  VerdictOutcome,
  checkOutcomePair,
  msg,
} from './common.ts';

const SignalList = z.array(Id);
/** Verdict notices: each one is the id of an entry of the exceptions catalog (ADR 0012). */
export const Notices = z.array(Id);
const ActivatesSignals = z.object({ activates_signals: SignalList }).passthrough();
/** Effect of selecting an option: signals, verdict notices (corpus 0.6.0) and the citations of the answer (0.9.0). */
const OnSelected = z
  .object({ activates_signals: SignalList.optional(), notices: Notices.optional(), citations: Citations.optional() })
  .passthrough();

/** An answer may restrict or exclude, never include on its own (ADR 0016): no likely_in_scope. */
function checkNotInclusive(outcome: unknown, ctx: z.RefinementCtx) {
  if (outcome === 'likely_in_scope') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['verdict_outcome'],
      message: msg(E.OUTCOME_MAPPING_INCLUSIVE, 'an answer-level outcome cannot be likely_in_scope: inclusion comes from the sector rules (ADR 0016)'),
    });
  }
}

// ---------------------------------------------------------------------------
// Wizard
// ---------------------------------------------------------------------------

export const Option = z
  .object({
    id: RequiredId,
    label_it: z.string(),
    activates_signals: SignalList.optional(),
    on_selected: OnSelected.optional(),
    note_it: z.string().optional(),
  })
  .passthrough()
  // options carry no outcome today; if one ever does, the same rule as outcome_mapping applies
  .superRefine((o, ctx) => checkNotInclusive((o as Record<string, unknown>).verdict_outcome, ctx));

/** Outcome declared directly by an answer (e.g. produttore_cliente_attivo). */
export const OutcomeMapping = z
  .object({
    answer: TriggerExpr('outcome_mapping.answer').pipe(Id),
    outcome: AssessmentMode,
    verdict_outcome: VerdictOutcome,
    reasoning_trace: z.string(),
    citations: Citations,
    /** Verdict notices added with this outcome (corpus 0.6.0). */
    notices: Notices.optional(),
    /** Notices emitted when the exclusion does not decide: another declared activity has no exclusion (ADR 0016 amendment). */
    notices_if_demoted: Notices.optional(),
  })
  .passthrough()
  .superRefine((m, ctx) => {
    checkOutcomePair(m.outcome, m.verdict_outcome, ctx);
    checkNotInclusive(m.verdict_outcome, ctx);
  });

export const ConditionalFollowup = z
  .object({
    id: RequiredId,
    trigger_on: z.string(),
    label_it: z.string(),
    kind: z.enum(['single_select', 'multi_select']),
    options: z.array(Option),
  })
  .passthrough();

export const Phase = z.enum(['disambiguation', 'sector_specific', 'standard_identification']);

/** Simple visibility condition (ADR 0010). Identifiers are checked against the wizard in corpus.ts. */
export const VisibleIfCondition = z
  .object({
    input: Id,
    op: z.enum(['eq', 'neq', 'includes']),
    value: Id,
  })
  .strict();

/**
 * `visible_if` (ADR 0010): a simple condition, or `any_of` / `all_of` over at least
 * two simple conditions, one level only. The string form is retired.
 */
export const VisibleIf = z.union(
  [
    VisibleIfCondition,
    z.object({ any_of: z.array(VisibleIfCondition).min(2) }).strict(),
    z.object({ all_of: z.array(VisibleIfCondition).min(2) }).strict(),
  ],
  {
    errorMap: (_issue, ctx) => ({
      message:
        typeof ctx.data === 'string'
          ? msg(E.VISIBLE_IF, `string form "${ctx.data}" is retired: use {input, op, value} (ADR 0010)`)
          : msg(E.VISIBLE_IF, 'expected {input, op: eq|neq|includes, value} or {any_of|all_of: [conditions]} with no nesting (ADR 0010)'),
    }),
  },
);
export type VisibleIfCondition = z.infer<typeof VisibleIfCondition>;
export type VisibleIf = z.infer<typeof VisibleIf>;

/** Flattens a visible_if into its simple conditions. */
export const conditionsOf = (v: VisibleIf): VisibleIfCondition[] =>
  'any_of' in v ? v.any_of : 'all_of' in v ? v.all_of : [v];

export const Question = z
  .object({
    id: RequiredId,
    kind: z.enum(['binary', 'single_select', 'multi_select', 'binary_with_conditional_followup']),
    /** Flow phase; required in `standard_identification_questions` (see wizardFile). */
    phase: Phase.optional(),
    label_it: z.string(),
    help_text_it: z.string().optional(),
    /** Structured visibility condition (ADR 0010); identifiers checked cross-file. */
    visible_if: VisibleIf.optional(),
    // retired by ADR 0010: objects are passthrough, so reject them explicitly
    conditional_on: z
      .undefined({ invalid_type_error: msg(E.VISIBLE_IF, 'conditional_on is retired: use visible_if (ADR 0010)') })
      .optional(),
    conditional: z
      .undefined({ invalid_type_error: msg(E.VISIBLE_IF, 'conditional is retired: visibility is visible_if (ADR 0010)') })
      .optional(),
    optional: z.boolean().optional(),
    options: z.array(Option).optional(),
    conditional_followup: ConditionalFollowup.optional(),
    on_yes: z
      .object({
        effect: RoutingEffect.optional(),
        reference: RegimeRef.optional(),
        activates_signals: SignalList.optional(),
        /** Verdict notices added when the answer is "yes" (gate questions kept as signals, ADR 0014). */
        notices: Notices.optional(),
      })
      .passthrough()
      .optional(),
    on_any_selected: ActivatesSignals.optional(),
    outcome_mapping: z.array(OutcomeMapping).optional(),
    /** Activity (an option of the wizard's activity_inputs) the outcome_mapping excludes (ADR 0016 amendment). */
    activity: Id.optional(),
    citations: Citations.optional(),
  })
  .passthrough();

export const MultiRegimeIntersection = z
  .object({
    trigger: TriggerExpr('multi_regime_intersection.trigger'),
    outcome: AssessmentMode,
    verdict_outcome: VerdictOutcome,
    reasoning_trace: z.string(),
    citations: Citations,
    /** Verdict notices added when the intersection matches (ADR 0014). */
    notices: Notices.optional(),
  })
  .passthrough()
  .superRefine((m, ctx) => checkOutcomePair(m.outcome, m.verdict_outcome, ctx));

export const WizardFile = z
  .object({
    meta: z
      .object({
        wizard_id: Id.optional(),
        block_id: Id.optional(),
        references_common_block: Id.optional(),
        execution_order: z.string().optional(),
        sector_data: z.string().optional(),
      })
      .passthrough(),
    flow_order: z.array(Phase).optional(),
    /**
     * Questions of the common block not asked in this wizard (ADR 0014, ADR 0015):
     * no rule, trigger or fixture of the sector may read them.
     */
    excluded_common_questions: z.array(Id).optional(),
    /** Inputs whose answers are the declared activities of the subject (ADR 0016 amendment). */
    activity_inputs: z.array(Id).min(1).optional(),
    questions: z.array(Question).optional(),
    sector_specific_questions: z.array(Question).optional(),
    standard_identification_questions: z.array(Question).optional(),
    multi_regime_intersection: z.array(MultiRegimeIntersection).optional(),
  })
  .passthrough()
  .superRefine((w, ctx) => {
    (w.standard_identification_questions ?? []).forEach((q, i) => {
      if (q.phase !== 'standard_identification') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['standard_identification_questions', i, 'phase'],
          message: msg(E.PHASE, `phase must be "standard_identification" (found ${q.phase})`),
        });
      }
    });
  });

// ---------------------------------------------------------------------------
// Sectors
// ---------------------------------------------------------------------------

/** Data blocks of a sector file that a rule may take its outcome from (corpus 0.9.0). */
export const RuleReference = z.enum(['allegato_iv_channel']);

/**
 * A qualification rule declares its outcome inline, or takes it from a data block of
 * the same sector file through `reference` (pattern of ADR 0009): never both.
 */
export const QualificationRule = z
  .object({
    condition: TriggerExpr('qualification_rules.condition'),
    reference: RuleReference.optional(),
    outcome: AssessmentMode.optional(),
    verdict_outcome: VerdictOutcome.optional(),
    qualifica: z.enum(['essenziale', 'importante']).optional(),
    qualifica_inferita: z.enum(['essenziale', 'importante']).optional(),
    qualitative_signal_template: z.string().optional(),
    reasoning_trace: z.string().optional(),
    citations: Citations.optional(),
    notices: Notices.optional(),
  })
  .passthrough()
  .superRefine((r, ctx) => {
    const inline = ['outcome', 'verdict_outcome', 'qualifica', 'qualifica_inferita', 'reasoning_trace', 'citations', 'notices'] as const;
    if (r.reference) {
      for (const k of inline) {
        if (r[k] !== undefined) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: [k], message: msg(E.REF_FILE, `${k} comes from reference "${r.reference}": not allowed inline`) });
        }
      }
      return;
    }
    if (r.verdict_outcome === undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['verdict_outcome'], message: msg(E.VERDICT_OUTCOME, 'verdict_outcome is required (constraint 2, ADR 0002)') });
    }
    for (const k of ['outcome', 'reasoning_trace', 'citations'] as const) {
      if (r[k] === undefined) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [k], message: msg(E.REF_FILE, `${k} is required without reference`) });
    }
    checkOutcomePair(r.outcome, r.verdict_outcome, ctx);
    if (r.qualifica && r.qualifica_inferita) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: msg(E.QUALIFICA_BOTH, 'qualifica and qualifica_inferita are mutually exclusive'),
      });
    }
  });

/** Override of a regime gate: no verdict_outcome of its own, it inherits the regime's (ADR 0009). */
export const Override = z
  .object({
    trigger: TriggerExpr('overrides.trigger'),
    override_kind: RoutingEffect,
    reference: RegimeRef,
    reasoning_trace: z.string(),
    citations: Citations,
  })
  .passthrough();

export const OutOfScopeMvp = z
  .object({
    // case ids may carry uppercase roman numerals (settore_sanitario_allegato_I_p5)
    case: z.string().regex(/^[a-z0-9][A-Za-z0-9_]*$/),
    handling: z.string(),
    verdict_outcome: VerdictOutcome,
    scope_evolution_note: z.string(),
    citations: Citations.optional(),
  })
  .passthrough();

const SignalTrigger = z
  .object({
    signal: Id,
    trigger: z.string().optional(),
    // retired in corpus 0.9.0: implicit binding of sector categories to an input
    applies_to_categories: z
      .undefined({ invalid_type_error: msg(E.TRIGGER, 'applies_to_categories is retired: use an explicit trigger (corpus 0.9.0)') })
      .optional(),
  })
  .passthrough();

export const SectorFile = z
  .object({
    meta: z
      .object({
        sector_id: Id,
        allegato: z.string(),
        critical_tier: z.string(),
        size_cap_applicable: z.boolean(),
        size_blind: z.boolean(),
        pilot_mvp_v0_1_0: z.boolean(),
        citations: Citations,
        cumulative_regulations: Citations.optional(),
      })
      .passthrough(),
    tipologie: z
      .array(
        z
          .object({
            id: Id,
            label_it: z.string(),
            citations: Citations,
            base_legal_definition: CitationId.optional(),
            multi_identity_possible: z
              .array(z.object({ signal: Id, condition_source: z.string(), condition_ref: Id }).passthrough())
              .optional(),
          })
          .passthrough(),
      )
      .optional(),
    categorie: z
      .array(z.object({ id: Id, label_it: z.string(), citations: Citations.optional() }).passthrough())
      .optional(),
    rientro_prerequisite: z.object({ id: Id, citations: Citations }).passthrough().optional(),
    qualification_rules: z.array(QualificationRule),
    overrides: z.array(Override).optional(),
    out_of_scope_mvp: z.array(OutOfScopeMvp).optional(),
    cumulative_signals: z.array(SignalTrigger).optional(),
    cross_sector_signals: z.array(SignalTrigger).optional(),
    multi_identity_intra_sector: z.array(SignalTrigger).optional(),
    allegato_iv_channel: z
      .object({
        signal: Id,
        verdict_strategy: AssessmentMode,
        verdict_outcome: VerdictOutcome,
        reasoning_trace: z.string(),
        citations: Citations,
        notices: Notices.optional(),
        profili: z.array(z.object({ id: Id, unifies_with: Id.optional() }).passthrough()),
      })
      .passthrough()
      .superRefine((c, ctx) => checkOutcomePair(c.verdict_strategy, c.verdict_outcome, ctx))
      .optional(),
    copy_constraints: z.array(z.object({ id: Id, rule_it: z.string() }).passthrough()).optional(),
  })
  .passthrough();

// ---------------------------------------------------------------------------
// Regimes
// ---------------------------------------------------------------------------

export const RegimeFile = z
  .object({
    meta: z
      .object({
        regime_id: Id,
        status: z.literal('routing_only_v0_1'),
        routing_effect: RoutingEffect,
        /** Declared escalation outcome, copied through the override reference (ADR 0009). */
        assessment_mode: AssessmentMode,
        verdict_outcome: z.enum(['likely_in_scope', 'likely_out_of_scope', 'ambiguous'], {
          required_error: msg(E.REGIME_META, 'verdict_outcome is required in regime meta (ADR 0009)'),
        }),
        exceptions_catalog_entry: Id,
        /** null or absent = not attested in the corpus, distinct from "none" (ADR 0009 amendment). */
        residual_nis_obligation: z.string().nullable().optional(),
        referenced_by: z.array(z.string()),
        citations: Citations,
        open_points: z.array(z.string()).optional(),
      })
      .passthrough()
      .superRefine((m, ctx) => checkOutcomePair(m.assessment_mode, m.verdict_outcome, ctx)),
  })
  .passthrough();

// ---------------------------------------------------------------------------
// Signals
// ---------------------------------------------------------------------------

export const SignalsFile = z
  .object({
    signals: z.array(
      z
        .object({
          id: Id,
          kind: z.enum(['cross_sector', 'qualitative_channel', 'cumulative_regime']),
          message_template: Id,
          base_reasoning_trace: z.string(),
          citations: Citations,
          target_regime: Id.optional(),
          status: z.string().optional(),
          sector_context: z.record(Id, z.string()).optional(),
        })
        .passthrough(),
    ),
  })
  .passthrough();

// ---------------------------------------------------------------------------
// Exceptions catalog (ADR 0012) — strict: no undeclared keys
// ---------------------------------------------------------------------------

export const ExceptionStatus = z.enum(['gestito', 'segnalato', 'non_gestito']);

export const ExceptionEntry = z
  .object({
    id: Id,
    status: ExceptionStatus,
    title: z.string().min(1),
    /** Text shown to the tool's user: informational, never prescriptive (copy lint in lint.ts). */
    description: z.string().min(1),
    citations: Citations,
    /** Sector ids or regime ids the entry concerns (checked cross-file). */
    applies_to: z.array(Id).min(1),
  })
  .strict();

export const ExceptionsCatalogFile = z.object({ exceptions: z.array(ExceptionEntry).min(1) }).strict();

// ---------------------------------------------------------------------------
// Citation registry — KB attestation of citation IDs (strict)
// ---------------------------------------------------------------------------

export const CitationRegistryEntry = z
  .object({
    id: CitationId,
    /** KB node (vault-relative path) that attests the citation. */
    kb_node: z.string().min(1),
    /** Line or line range of the node, e.g. "36" or "29-33". */
    kb_lines: z.string().regex(/^\d+(?:-\d+)?(?:,\s*\d+(?:-\d+)?)*$/),
    /** What exactly is attested, and how (verbatim, riscontro, provenance note). */
    attestation: z.string().min(1),
  })
  .strict();

export const CitationRegistryFile = z.object({ citations: z.array(CitationRegistryEntry).min(1) }).strict();

// ---------------------------------------------------------------------------
// Conflicts between evaluation stages (ADR 0016, corpus 0.10.0) — strict
// ---------------------------------------------------------------------------

/** Explicit trigger types of a conflict: the stages whose outcomes collide. */
export const CONFLICT_TRIGGERS = ['stage_2_and_stage_3'] as const;

export const ConflictEntry = z
  .object({
    id: Id,
    trigger: z
      .string({ required_error: msg(E.OUTCOME_WITHOUT_TRIGGER, 'a conflict needs a declared trigger (ADR 0016)') })
      .refine((t) => (CONFLICT_TRIGGERS as readonly string[]).includes(t), {
        message: msg(E.TRIGGER, `conflict trigger must be one of: ${CONFLICT_TRIGGERS.join(', ')}`),
      }),
    assessment_mode: AssessmentMode,
    verdict_outcome: VerdictOutcome,
    exceptions_catalog_entry: Id,
    reasoning_trace: z.string(),
    citations: Citations,
  })
  .strict()
  .superRefine((c, ctx) => checkOutcomePair(c.assessment_mode, c.verdict_outcome, ctx));

export const ConflictsFile = z.object({ conflicts: z.array(ConflictEntry).min(1) }).strict();

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

export const RegimeRoutingEntry = z
  .object({
    regime: Id,
    routing_effect: RoutingEffect,
    /** null = not attested in the corpus, distinct from "none" (ADR 0009 amendment). */
    residual_nis_obligation: z.string().nullable(),
    exceptions_catalog_entry: Id,
  })
  .strict();

export const Fixture = z
  .object({
    scenario_id: z.string().regex(/^E\d{2}$/),
    name: Id,
    description_it: z.string(),
    corpus_version: z.string(),
    sector: Id,
    inputs: z.record(Id, z.union([z.string(), z.array(z.string())])),
    expected: z
      .object({
        assessment_mode: AssessmentMode,
        verdict_outcome: VerdictOutcome,
        qualifica: z.enum(['essenziale', 'importante']).optional(),
        qualifica_inferita: z.enum(['essenziale', 'importante']).optional(),
        signals: SignalList.optional(),
        /** Expected verdict notices (exceptions catalog ids, ADR 0012). */
        notices: Notices.optional(),
        /** Always present: [] when no override matches (ADR 0009 amendment). */
        regime_routing: z.array(RegimeRoutingEntry),
        corpus_ref: z.string(),
        open_points: z.array(z.string()).optional(),
        sanitario_secondary: z
          .object({ handling: z.string(), verdict_outcome: VerdictOutcome, corpus_ref: z.string() })
          .passthrough()
          .optional(),
      })
      .passthrough()
      .superRefine((x, ctx) => checkOutcomePair(x.assessment_mode, x.verdict_outcome, ctx)),
    citations: Citations,
  })
  .passthrough();

export type SectorFile = z.infer<typeof SectorFile>;
export type WizardFile = z.infer<typeof WizardFile>;
export type RegimeFile = z.infer<typeof RegimeFile>;
export type SignalsFile = z.infer<typeof SignalsFile>;
export type Fixture = z.infer<typeof Fixture>;
export type ExceptionsCatalogFile = z.infer<typeof ExceptionsCatalogFile>;
export type CitationRegistryFile = z.infer<typeof CitationRegistryFile>;
export type ConflictsFile = z.infer<typeof ConflictsFile>;
export type Question = z.infer<typeof Question>;
