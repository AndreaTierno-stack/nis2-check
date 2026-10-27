/**
 * Whole-corpus schema: per-file shapes (files.ts) plus the cross-file invariants.
 *
 * The invariants live in the schema (superRefine), not only in the CLI, so any
 * consumer that parses the corpus (validator, engine tests, web build) gets them.
 */
import { z } from 'zod';
import { resolveCorpusRef } from '../corpusRef.ts';
import { E, msg } from './common.ts';
import { Fixture, RegimeFile, SectorFile, SignalsFile, WizardFile, conditionsOf, type Question } from './files.ts';

/**
 * Comparison inside a rule expression (`condition`, `trigger`): `<input> == <value>`
 * or `!=`, possibly joined by AND/OR. Used to check that every input a rule reads
 * exists in the sector's wizard (STATUS 17).
 */
const RULE_COMPARISON_RE = /([a-z][a-z0-9_]*)\s*(==|!=)\s*([a-z0-9_]+)/g;

/** Grammar of override triggers: one equality between a gate input and a value. */
export const OVERRIDE_TRIGGER_RE = /^\s*([a-z][a-z0-9_]*)\s*==\s*([a-z0-9_]+)\s*$/;

/** Citations every rule consuming the `dimension` input must carry (STATUS 12.9). */
export const DIMENSION_CITATIONS = ['faq_amb_di_1', 'racc_ue_2003_361'] as const;

export const CorpusInput = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  /** Corpus files keyed by corpus-relative path, e.g. "sectors/sectors__cloud_computing.yaml". */
  sectors: z.record(z.string(), SectorFile),
  wizard: z.record(z.string(), WizardFile),
  regimes: z.record(z.string(), RegimeFile),
  signals: z.record(z.string(), SignalsFile),
  /** Golden fixtures keyed by file name. */
  fixtures: z.record(z.string(), Fixture),
});

type CorpusShape = z.infer<typeof CorpusInput>;
type Path = (string | number)[];

/** All questions of a wizard file, including conditional follow-ups. */
function questionsOf(w: CorpusShape['wizard'][string]): { q: Question | NonNullable<Question['conditional_followup']>; path: Path }[] {
  const out: { q: Question | NonNullable<Question['conditional_followup']>; path: Path }[] = [];
  for (const list of ['questions', 'sector_specific_questions', 'standard_identification_questions'] as const) {
    (w[list] ?? []).forEach((q, i) => {
      out.push({ q, path: [list, i] });
      if (q.conditional_followup) out.push({ q: q.conditional_followup, path: [list, i, 'conditional_followup'] });
    });
  }
  return out;
}

const sameSet = (a: readonly string[], b: readonly string[]) =>
  a.length === b.length && [...a].sort().every((x, i) => x === [...b].sort()[i]);

export const CorpusSchema = CorpusInput.superRefine((c, ctx) => {
  const issue = (path: Path, code: Parameters<typeof msg>[0], text: string) =>
    ctx.addIssue({ code: z.ZodIssueCode.custom, path, message: msg(code, text) });

  const allFiles: Record<string, unknown> = { ...c.sectors, ...c.wizard, ...c.regimes, ...c.signals };
  const fileExists = (rel: string) => rel.split('#')[0]! in allFiles;
  const signalIds = new Set(Object.values(c.signals).flatMap((f) => f.signals.map((s) => s.id)));
  const sectorIds = new Set(Object.values(c.sectors).map((s) => s.meta.sector_id));

  // ----- question / option index per wizard; common block is visible to every wizard -----
  const commonBlocks = Object.entries(c.wizard).filter(([, w]) => w.meta.block_id);
  /** Inputs visible to a wizard (its own questions plus the common block): id -> kind and accepted values. */
  const questionIndex = (wizardPath: string) => {
    const idx = new Map<string, { kind: string; values: Set<string> }>();
    const add = (w: CorpusShape['wizard'][string]) =>
      questionsOf(w).forEach(({ q }) => {
        // binary questions accept "yes"/"no" (serialized as strings, YAML 1.2)
        const binary = q.kind === 'binary' || q.kind === 'binary_with_conditional_followup';
        idx.set(q.id, { kind: q.kind, values: new Set(binary ? ['yes', 'no'] : (q.options ?? []).map((o) => o.id)) });
      });
    add(c.wizard[wizardPath]!);
    for (const [p, w] of commonBlocks) if (p !== wizardPath) add(w);
    return idx;
  };
  const allQuestionIds = new Set(Object.values(c.wizard).flatMap((w) => questionsOf(w).map(({ q }) => q.id)));

  const checkSignals = (ids: readonly string[] | undefined, path: Path) =>
    (ids ?? []).forEach((s, i) => {
      if (!signalIds.has(s)) issue([...path, i], E.REF_SIGNAL, `signal "${s}" is not defined in signals/`);
    });

  // ----- wizard -----
  for (const [wp, w] of Object.entries(c.wizard)) {
    const base: Path = ['wizard', wp];
    if (w.meta.sector_data && !fileExists(w.meta.sector_data)) {
      issue([...base, 'meta', 'sector_data'], E.REF_FILE, `file ${w.meta.sector_data} not found`);
    }
    const idx = questionIndex(wp);
    (w.multi_regime_intersection ?? []).forEach((m, i) => {
      for (const [, input, , value] of m.trigger.matchAll(RULE_COMPARISON_RE)) {
        const target = idx.get(input!);
        const p = [...base, 'multi_regime_intersection', i, 'trigger'];
        if (!target) issue(p, E.RULE_INPUT, `input "${input}" is not a question of the wizard`);
        else if (!target.values.has(value!)) issue(p, E.RULE_INPUT, `"${value}" is not an option of "${input}"`);
      }
    });
    for (const { q, path } of questionsOf(w)) {
      const qp = [...base, ...path];
      (q.options ?? []).forEach((o, i) => {
        checkSignals(o.activates_signals, [...qp, 'options', i, 'activates_signals']);
        checkSignals(o.on_selected?.activates_signals, [...qp, 'options', i, 'on_selected', 'activates_signals']);
      });
      if (!('kind' in q) || !('label_it' in q)) continue;
      const question = q as Question;
      checkSignals(question.on_yes?.activates_signals, [...qp, 'on_yes', 'activates_signals']);
      checkSignals(question.on_any_selected?.activates_signals, [...qp, 'on_any_selected', 'activates_signals']);
      if (question.on_yes?.reference && !fileExists(question.on_yes.reference)) {
        issue([...qp, 'on_yes', 'reference'], E.REF_FILE, `file ${question.on_yes.reference} not found`);
      }
      const optionIds = new Set((question.options ?? []).map((o) => o.id));
      (question.outcome_mapping ?? []).forEach((m, i) => {
        if (!optionIds.has(m.answer)) issue([...qp, 'outcome_mapping', i, 'answer'], E.REF_QUESTION, `answer "${m.answer}" is not an option of "${question.id}"`);
      });
      if (question.visible_if !== undefined) {
        // ADR 0010: input exists in the wizard, value is one of its options, includes only on multi_select
        for (const cond of conditionsOf(question.visible_if)) {
          const target = idx.get(cond.input);
          if (!target) {
            issue([...qp, 'visible_if'], E.VISIBLE_IF, `"${cond.input}" is not an input of the wizard`);
            continue;
          }
          if (cond.input === question.id) issue([...qp, 'visible_if'], E.VISIBLE_IF, 'a question cannot depend on itself');
          if (!target.values.has(cond.value)) issue([...qp, 'visible_if'], E.VISIBLE_IF, `"${cond.value}" is not an option of "${cond.input}"`);
          if (cond.op === 'includes' && target.kind !== 'multi_select') {
            issue([...qp, 'visible_if'], E.VISIBLE_IF, `"includes" requires a multi_select input ("${cond.input}" is ${target.kind})`);
          }
        }
      }
    }
  }

  // ----- regimes -----
  for (const [rp, r] of Object.entries(c.regimes)) {
    if (`regimes/${r.meta.regime_id}.yaml` !== rp) issue(['regimes', rp, 'meta', 'regime_id'], E.REF_FILE, `regime_id "${r.meta.regime_id}" does not match file name`);
    r.meta.referenced_by.forEach((ref, i) => {
      if (!fileExists(ref)) issue(['regimes', rp, 'meta', 'referenced_by', i], E.REF_FILE, `file ${ref.split('#')[0]} not found`);
    });
  }

  // ----- signals -----
  for (const [sp, f] of Object.entries(c.signals)) {
    f.signals.forEach((s, i) => {
      for (const k of Object.keys(s.sector_context ?? {})) {
        if (!sectorIds.has(k)) issue(['signals', sp, 'signals', i, 'sector_context', k], E.REF_FILE, `unknown sector "${k}"`);
      }
    });
  }

  // ----- sectors -----
  for (const [sp, s] of Object.entries(c.sectors)) {
    const base: Path = ['sectors', sp];

    // Every input a rule reads exists in the sector's wizard or in the common block
    // (disambiguation + standard_identification), with a value among its options (STATUS 17).
    const wizardPath = Object.entries(c.wizard).find(([, w]) => w.meta.sector_data === sp)?.[0];
    if (!wizardPath) {
      issue([...base, 'meta'], E.RULE_INPUT, 'no wizard declares this file as meta.sector_data');
    } else {
      const inputs = questionIndex(wizardPath);
      const checkExpression = (expr: string, path: Path) => {
        for (const [, input, , value] of expr.matchAll(RULE_COMPARISON_RE)) {
          const target = inputs.get(input!);
          if (!target) issue(path, E.RULE_INPUT, `input "${input}" is not a question of ${wizardPath} or of the common block`);
          else if (!target.values.has(value!)) issue(path, E.RULE_INPUT, `"${value}" is not an option of "${input}"`);
        }
      };
      const checkRef = (ref: string, path: Path) => {
        if (!inputs.has(ref)) issue(path, E.RULE_INPUT, `input "${ref}" is not a question of ${wizardPath} or of the common block`);
      };
      s.qualification_rules.forEach((r, i) => checkExpression(r.condition, [...base, 'qualification_rules', i, 'condition']));
      (s.overrides ?? []).forEach((o, i) => checkExpression(o.trigger, [...base, 'overrides', i, 'trigger']));
      for (const key of ['cumulative_signals', 'cross_sector_signals', 'multi_identity_intra_sector'] as const) {
        (s[key] ?? []).forEach((t, i) => {
          if (typeof t.trigger === 'string') checkExpression(t.trigger, [...base, key, i, 'trigger']);
          if (typeof t.condition_ref === 'string') checkRef(t.condition_ref, [...base, key, i, 'condition_ref']);
        });
      }
      (s.tipologie ?? []).forEach((t, i) =>
        (t.multi_identity_possible ?? []).forEach((m, j) =>
          checkRef(m.condition_ref, [...base, 'tipologie', i, 'multi_identity_possible', j, 'condition_ref']),
        ),
      );
    }

    s.qualification_rules.forEach((r, i) => {
      if (/\bdimension\b/.test(r.condition)) {
        if (s.meta.size_blind) issue([...base, 'qualification_rules', i, 'condition'], E.SIZE_BLIND, 'size_blind sector with a dimension condition');
        const missing = DIMENSION_CITATIONS.filter((id) => !r.citations.includes(id));
        if (missing.length) issue([...base, 'qualification_rules', i, 'citations'], E.DIMENSION_CITATIONS, `rule on dimension must cite ${missing.join(', ')}`);
      }
    });
    (s.overrides ?? []).forEach((o, i) => {
      const op: Path = [...base, 'overrides', i];
      if (!OVERRIDE_TRIGGER_RE.test(o.trigger)) issue([...op, 'trigger'], E.TRIGGER, `trigger "${o.trigger}" is not "<input> == <value>"`);
      const regime = c.regimes[o.reference];
      if (!regime) {
        issue([...op, 'reference'], E.REF_FILE, `regime ${o.reference} not found (an override needs a regime declaring its outcome, ADR 0009)`);
        return;
      }
      if (!sameSet(o.citations, regime.meta.citations)) {
        issue([...op, 'citations'], E.OVERRIDE_CITATIONS, `[${o.citations.join(', ')}] != citations of ${o.reference} [${regime.meta.citations.join(', ')}]`);
      }
      if (o.override_kind !== regime.meta.routing_effect) {
        issue([...op, 'override_kind'], E.OVERRIDE_KIND, `${o.override_kind} != routing_effect of ${o.reference} (${regime.meta.routing_effect})`);
      }
    });
    const signalTriggers = [
      ...(s.cumulative_signals ?? []).map((t, i) => ({ t, p: ['cumulative_signals', i] })),
      ...(s.cross_sector_signals ?? []).map((t, i) => ({ t, p: ['cross_sector_signals', i] })),
      ...(s.multi_identity_intra_sector ?? []).map((t, i) => ({ t, p: ['multi_identity_intra_sector', i] })),
    ];
    for (const { t, p } of signalTriggers) checkSignals([t.signal], [...base, ...p, 'signal']);
    (s.tipologie ?? []).forEach((t, i) =>
      (t.multi_identity_possible ?? []).forEach((m, j) => {
        checkSignals([m.signal], [...base, 'tipologie', i, 'multi_identity_possible', j, 'signal']);
      }),
    );
    if (s.allegato_iv_channel) {
      checkSignals([s.allegato_iv_channel.signal], [...base, 'allegato_iv_channel', 'signal']);
      s.allegato_iv_channel.profili.forEach((p, i) => {
        if (p.unifies_with) checkSignals([p.unifies_with], [...base, 'allegato_iv_channel', 'profili', i, 'unifies_with']);
      });
    }
  }

  // ----- fixtures -----
  for (const [fp, x] of Object.entries(c.fixtures)) {
    const base: Path = ['fixtures', fp];
    if (x.corpus_version !== c.version) issue([...base, 'corpus_version'], E.FIXTURE_VERSION, `${x.corpus_version} != corpus VERSION ${c.version}`);
    for (const k of Object.keys(x.inputs)) {
      if (!allQuestionIds.has(k)) issue([...base, 'inputs', k], E.FIXTURE_INPUT, `"${k}" is not a wizard question id`);
    }
    checkSignals(x.expected.signals, [...base, 'expected', 'signals']);
    for (const [refPath, ref] of [
      [['expected', 'corpus_ref'], x.expected.corpus_ref],
      [['expected', 'sanitario_secondary', 'corpus_ref'], x.expected.sanitario_secondary?.corpus_ref],
    ] as const) {
      if (ref === undefined) continue;
      for (const p of resolveCorpusRef(ref, allFiles)) issue([...base, ...refPath], E.CORPUS_REF, p);
    }

    // regime_routing: the regimes of the matching overrides, in sector-file order (ADR 0009 amendment)
    const sector = Object.values(c.sectors).find((s) => s.meta.sector_id === x.sector);
    if (!sector) {
      issue([...base, 'sector'], E.REF_FILE, `no sector file for "${x.sector}"`);
      continue;
    }
    const matching = (sector.overrides ?? []).filter((o) => {
      const m = OVERRIDE_TRIGGER_RE.exec(o.trigger);
      return m !== null && String(x.inputs[m[1]!]) === m[2];
    });
    const expected = matching.flatMap((o) => {
      const r = c.regimes[o.reference];
      return r
        ? [{
            regime: r.meta.regime_id,
            routing_effect: r.meta.routing_effect,
            residual_nis_obligation: r.meta.residual_nis_obligation ?? null,
            exceptions_catalog_entry: r.meta.exceptions_catalog_entry,
          }]
        : [];
    });
    if (JSON.stringify(x.expected.regime_routing) !== JSON.stringify(expected)) {
      issue([...base, 'expected', 'regime_routing'], E.REGIME_ROUTING, `${JSON.stringify(x.expected.regime_routing)} != ${JSON.stringify(expected)} (regime meta, sector-file order)`);
    }
    // a single routed regime carries the regime's own declared outcome (ADR 0009)
    if (matching.length === 1) {
      const r = c.regimes[matching[0]!.reference];
      if (r && (x.expected.assessment_mode !== r.meta.assessment_mode || x.expected.verdict_outcome !== r.meta.verdict_outcome)) {
        issue([...base, 'expected'], E.REGIME_ROUTING, `outcome ${x.expected.assessment_mode}/${x.expected.verdict_outcome} != meta of ${r.meta.regime_id} (${r.meta.assessment_mode}/${r.meta.verdict_outcome})`);
      }
    }
  }
});

export type Corpus = z.infer<typeof CorpusSchema>;
