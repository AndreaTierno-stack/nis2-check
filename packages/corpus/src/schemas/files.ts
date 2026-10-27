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
  VerdictOutcome,
  checkOutcomePair,
  msg,
} from './common.ts';

const SignalList = z.array(Id);
const ActivatesSignals = z.object({ activates_signals: SignalList }).passthrough();

// ---------------------------------------------------------------------------
// Wizard
// ---------------------------------------------------------------------------

export const Option = z
  .object({
    id: RequiredId,
    label_it: z.string(),
    activates_signals: SignalList.optional(),
    on_selected: ActivatesSignals.optional(),
    note_it: z.string().optional(),
  })
  .passthrough();

/** Outcome declared directly by an answer (e.g. registrato_pun). */
export const OutcomeMapping = z
  .object({
    answer: Id,
    outcome: AssessmentMode,
    verdict_outcome: VerdictOutcome,
    reasoning_trace: z.string(),
    citations: Citations,
  })
  .passthrough()
  .superRefine((m, ctx) => checkOutcomePair(m.outcome, m.verdict_outcome, ctx));

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

export const Question = z
  .object({
    id: RequiredId,
    kind: z.enum(['binary', 'single_select', 'multi_select', 'binary_with_conditional_followup']),
    /** Flow phase; required in `standard_identification_questions` (see wizardFile). */
    phase: Phase.optional(),
    label_it: z.string(),
    help_text_it: z.string().optional(),
    /** Single comparison, grammar in corpus.ts (VISIBLE_IF_RE); identifiers checked cross-file. */
    visible_if: z.string().optional(),
    /** Citations that ground the visibility rule (e.g. size-blind PA, art. 3 c. 6). */
    visibility_citations: Citations.optional(),
    conditional: z.boolean().optional(),
    conditional_on: z.object({ question: Id, equals: Id }).optional(),
    optional: z.boolean().optional(),
    options: z.array(Option).optional(),
    conditional_followup: ConditionalFollowup.optional(),
    on_yes: z
      .object({
        effect: RoutingEffect.optional(),
        reference: RegimeRef.optional(),
        activates_signals: SignalList.optional(),
      })
      .passthrough()
      .optional(),
    on_any_selected: ActivatesSignals.optional(),
    outcome_mapping: z.array(OutcomeMapping).optional(),
    citations: Citations.optional(),
  })
  .passthrough();

export const MultiRegimeIntersection = z
  .object({
    trigger: z.string(),
    outcome: AssessmentMode,
    verdict_outcome: VerdictOutcome,
    reasoning_trace: z.string(),
    citations: Citations,
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

export const QualificationRule = z
  .object({
    condition: z.string(),
    outcome: AssessmentMode,
    verdict_outcome: VerdictOutcome,
    qualifica: z.enum(['essenziale', 'importante']).optional(),
    qualifica_inferita: z.enum(['essenziale', 'importante']).optional(),
    qualitative_signal_template: z.string().optional(),
    reasoning_trace: z.string(),
    citations: Citations,
  })
  .passthrough()
  .superRefine((r, ctx) => {
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
    trigger: z.string(),
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

const SignalTrigger = z.object({ signal: Id }).passthrough();

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
export type Question = z.infer<typeof Question>;
