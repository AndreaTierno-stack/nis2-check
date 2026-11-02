/**
 * Whole-corpus schema: per-file shapes (files.ts) plus the cross-file invariants.
 *
 * The invariants live in the schema (superRefine), not only in the CLI, so any
 * consumer that parses the corpus (validator, engine tests, web build) gets them.
 */
import { z } from 'zod';
import { resolveCorpusRef } from '../corpusRef.ts';
import { E, collectCitationIds, msg } from './common.ts';
import {
  CitationRegistryFile,
  ConflictsFile,
  ExceptionsCatalogFile,
  Fixture,
  RegimeFile,
  SectorFile,
  SignalsFile,
  WizardFile,
  conditionsOf,
  type Question,
} from './files.ts';

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
  /** Exceptions catalog (ADR 0012): every verdict notice and regime catalog entry points here. */
  exceptions: z.record(z.string(), ExceptionsCatalogFile),
  /** Citation registry: KB node and line attesting each registered citation ID. */
  citations: z.record(z.string(), CitationRegistryFile),
  /** Conflicts between evaluation stages (ADR 0016, corpus 0.10.0). */
  conflicts: z.record(z.string(), ConflictsFile),
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

  const allFiles: Record<string, unknown> = { ...c.sectors, ...c.wizard, ...c.regimes, ...c.signals, ...c.exceptions, ...c.citations, ...c.conflicts };
  const fileExists = (rel: string) => rel.split('#')[0]! in allFiles;
  const signalIds = new Set(Object.values(c.signals).flatMap((f) => f.signals.map((s) => s.id)));
  const sectorIds = new Set(Object.values(c.sectors).map((s) => s.meta.sector_id));

  // ----- question / option index per wizard; common block is visible to every wizard -----
  const commonBlocks = Object.entries(c.wizard).filter(([, w]) => w.meta.block_id);
  /** Inputs visible to a wizard (its own questions plus the common block): id -> kind and accepted values. */
  const questionIndex = (wizardPath: string) => {
    const idx = new Map<string, { kind: string; values: Set<string> }>();
    const own = c.wizard[wizardPath]!;
    // common questions the wizard does not ask (ADR 0014, ADR 0015)
    const excluded = new Set(own.excluded_common_questions ?? []);
    const add = (w: CorpusShape['wizard'][string], skip: Set<string>) =>
      questionsOf(w).forEach(({ q }) => {
        if (skip.has(q.id)) return;
        // binary questions accept "yes"/"no" (serialized as strings, YAML 1.2)
        const binary = q.kind === 'binary' || q.kind === 'binary_with_conditional_followup';
        idx.set(q.id, { kind: q.kind, values: new Set(binary ? ['yes', 'no'] : (q.options ?? []).map((o) => o.id)) });
      });
    add(own, new Set());
    for (const [p, w] of commonBlocks) if (p !== wizardPath) add(w, excluded);
    return idx;
  };
  /** Ids of the questions of the common blocks (targets of excluded_common_questions). */
  const commonQuestionIds = new Set(commonBlocks.flatMap(([, w]) => questionsOf(w).map(({ q }) => q.id)));
  const allQuestionIds = new Set(Object.values(c.wizard).flatMap((w) => questionsOf(w).map(({ q }) => q.id)));

  const checkSignals = (ids: readonly string[] | undefined, path: Path) =>
    (ids ?? []).forEach((s, i) => {
      if (!signalIds.has(s)) issue([...path, i], E.REF_SIGNAL, `signal "${s}" is not defined in signals/`);
    });

  // ----- exceptions catalog (ADR 0012) and citation registry -----
  const catalogIds = new Set<string>();
  const regimeIds = new Set(Object.values(c.regimes).map((r) => r.meta.regime_id));
  for (const [ep, f] of Object.entries(c.exceptions)) {
    f.exceptions.forEach((e, i) => {
      const p: Path = ['exceptions', ep, 'exceptions', i];
      if (catalogIds.has(e.id)) issue([...p, 'id'], E.CATALOG_REF, `duplicate catalog id "${e.id}"`);
      catalogIds.add(e.id);
      e.applies_to.forEach((a, j) => {
        if (!sectorIds.has(a) && !regimeIds.has(a)) issue([...p, 'applies_to', j], E.CATALOG_REF, `"${a}" is neither a sector nor a regime id`);
      });
    });
  }
  const checkCatalog = (ids: readonly string[] | undefined, path: Path) =>
    (ids ?? []).forEach((id, i) => {
      if (!catalogIds.has(id)) issue([...path, i], E.CATALOG_REF, `"${id}" is not an entry of the exceptions catalog`);
    });
  const registered = new Set<string>();
  for (const [cp, f] of Object.entries(c.citations)) {
    f.citations.forEach((r, i) => {
      if (registered.has(r.id)) issue(['citations', cp, 'citations', i, 'id'], E.CITATION_ID, `duplicate registry entry "${r.id}"`);
      registered.add(r.id);
    });
  }

  // ----- wizard -----
  for (const [wp, w] of Object.entries(c.wizard)) {
    const base: Path = ['wizard', wp];
    if (w.meta.sector_data && !fileExists(w.meta.sector_data)) {
      issue([...base, 'meta', 'sector_data'], E.REF_FILE, `file ${w.meta.sector_data} not found`);
    }
    (w.excluded_common_questions ?? []).forEach((id, i) => {
      if (!commonQuestionIds.has(id)) issue([...base, 'excluded_common_questions', i], E.REF_QUESTION, `"${id}" is not a question of the common block`);
    });
    // ADR 0010 amendment (corpus 0.13.0): sector-scoped visibility of common questions. The target
    // is a common question the wizard asks; every input is a question of this wizard asked in an
    // earlier phase of its flow_order (visibility reads only answers already given, ADR 0016 §3).
    Object.entries(w.common_question_visibility ?? {}).forEach(([target, cond]) => {
      const cp: Path = [...base, 'common_question_visibility', target];
      if (!commonQuestionIds.has(target)) return issue(cp, E.VISIBLE_IF, `"${target}" is not a question of the common block`);
      if ((w.excluded_common_questions ?? []).includes(target)) return issue(cp, E.VISIBLE_IF, `"${target}" is excluded from this wizard`);
      const flow = w.flow_order ?? ['disambiguation', 'sector_specific', 'standard_identification'];
      const targetPhase = commonBlocks.some(([, b]) => (b.standard_identification_questions ?? []).some((q) => q.id === target)) ? 'standard_identification' : 'disambiguation';
      const ownPhase = (id: string) =>
        [...(w.questions ?? []), ...(w.sector_specific_questions ?? [])].some((q) => q.id === id || q.conditional_followup?.id === id)
          ? 'sector_specific'
          : (w.standard_identification_questions ?? []).some((q) => q.id === id)
            ? 'standard_identification'
            : undefined;
      const idx = questionIndex(wp);
      for (const c of conditionsOf(cond)) {
        const phase = ownPhase(c.input);
        if (!phase) issue(cp, E.VISIBLE_IF, `"${c.input}" is not a question of this wizard`);
        else if (flow.indexOf(phase) >= flow.indexOf(targetPhase)) issue(cp, E.VISIBLE_IF, `"${c.input}" is not asked before "${target}" in flow_order`);
        const t = idx.get(c.input);
        if (t && !t.values.has(c.value)) issue(cp, E.VISIBLE_IF, `"${c.value}" is not an option of "${c.input}"`);
        if (t && c.op === 'includes' && t.kind !== 'multi_select') issue(cp, E.VISIBLE_IF, `"includes" requires a multi_select input ("${c.input}" is ${t.kind})`);
      }
    });
    const idx = questionIndex(wp);
    (w.activity_inputs ?? []).forEach((a, i) => {
      const target = idx.get(a);
      if (!target) issue([...base, 'activity_inputs', i], E.ACTIVITY_REF, `"${a}" is not a question of the wizard`);
      else if (target.kind !== 'single_select' && target.kind !== 'multi_select') issue([...base, 'activity_inputs', i], E.ACTIVITY_REF, `"${a}" is not a select question`);
    });
    (w.multi_regime_intersection ?? []).forEach((m, i) => {
      checkCatalog(m.notices, [...base, 'multi_regime_intersection', i, 'notices']);
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
        checkCatalog(o.on_selected?.notices, [...qp, 'options', i, 'on_selected', 'notices']);
      });
      if (!('kind' in q) || !('label_it' in q)) continue;
      const question = q as Question;
      checkSignals(question.on_yes?.activates_signals, [...qp, 'on_yes', 'activates_signals']);
      checkCatalog(question.on_yes?.notices, [...qp, 'on_yes', 'notices']);
      checkSignals(question.on_any_selected?.activates_signals, [...qp, 'on_any_selected', 'activates_signals']);
      if (question.on_yes?.reference && !fileExists(question.on_yes.reference)) {
        issue([...qp, 'on_yes', 'reference'], E.REF_FILE, `file ${question.on_yes.reference} not found`);
      }
      const optionIds = new Set((question.options ?? []).map((o) => o.id));
      (question.outcome_mapping ?? []).forEach((m, i) => {
        if (!optionIds.has(m.answer)) issue([...qp, 'outcome_mapping', i, 'answer'], E.REF_QUESTION, `answer "${m.answer}" is not an option of "${question.id}"`);
        checkCatalog(m.notices, [...qp, 'outcome_mapping', i, 'notices']);
        checkCatalog(m.notices_if_demoted, [...qp, 'outcome_mapping', i, 'notices_if_demoted']);
        // a type exclusion is per activity: it carries the notice shown when it does not decide
        if (!m.notices_if_demoted?.length) issue([...qp, 'outcome_mapping', i, 'notices_if_demoted'], E.ACTIVITY_REF, 'an outcome_mapping needs notices_if_demoted (ADR 0016 amendment)');
      });
      // ADR 0016 amendment: an outcome_mapping excludes one declared activity of the subject
      if (question.outcome_mapping?.length) {
        const activityValues = new Set((w.activity_inputs ?? []).flatMap((a) => [...(idx.get(a)?.values ?? [])]));
        if (!w.activity_inputs) issue([...qp, 'activity'], E.ACTIVITY_REF, 'a question with outcome_mapping needs activity_inputs in its wizard');
        else if (!question.activity) issue([...qp, 'activity'], E.ACTIVITY_REF, 'a question with outcome_mapping must declare the activity it excludes');
        else if (!activityValues.has(question.activity)) issue([...qp, 'activity'], E.ACTIVITY_REF, `"${question.activity}" is not an option of the activity inputs`);
      }
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

  // ----- citation registry coverage (corpus 0.6.0) -----
  // Every citation ID used in the corpus files and in the fixtures has a registry
  // entry with KB node and line (CLAUDE.md, constraint 3). Unused entries are a
  // warning, reported by validate.ts (unusedRegistryEntries).
  for (const [group, files] of [
    ['sectors', c.sectors], ['wizard', c.wizard], ['regimes', c.regimes], ['signals', c.signals],
    ['exceptions', c.exceptions], ['conflicts', c.conflicts], ['fixtures', c.fixtures],
  ] as const) {
    for (const [fp, doc] of Object.entries(files)) {
      for (const { id, path } of collectCitationIds(doc, [group, fp])) {
        if (!registered.has(id)) issue(path, E.CITATION_UNREGISTERED, `citation "${id}" has no entry in the citation registry`);
      }
    }
  }

  // ----- catalog entries "segnalato" are shown somewhere (corpus 0.6.0) -----
  // A segnalato entry is, by definition, shown in the verdict: at least one notice of
  // the corpus (rules, allegato_iv_channel, on_yes, on_selected, outcome_mapping,
  // multi_regime_intersection) or a regime meta points to it. Fixtures do not count.
  // gestito and non_gestito entries may be unreferenced.
  const referencedCatalog = new Set<string>();
  const collectNotices = (node: unknown): void => {
    if (Array.isArray(node)) return node.forEach(collectNotices);
    if (node === null || typeof node !== 'object') return;
    for (const [k, v] of Object.entries(node)) {
      if ((k === 'notices' || k === 'notices_if_demoted') && Array.isArray(v)) v.forEach((x) => typeof x === 'string' && referencedCatalog.add(x));
      else if (k === 'exceptions_catalog_entry' && typeof v === 'string') referencedCatalog.add(v);
      else collectNotices(v);
    }
  };
  [c.sectors, c.wizard, c.regimes, c.conflicts].forEach((files) => Object.values(files).forEach(collectNotices));
  for (const [ep, f] of Object.entries(c.exceptions)) {
    f.exceptions.forEach((e, i) => {
      if (e.status === 'segnalato' && !referencedCatalog.has(e.id)) {
        issue(['exceptions', ep, 'exceptions', i, 'id'], E.CATALOG_UNREFERENCED, `segnalato entry "${e.id}" is referenced by no notice or regime`);
      }
    });
  }

  // ----- regimes -----
  for (const [rp, r] of Object.entries(c.regimes)) {
    checkCatalog([r.meta.exceptions_catalog_entry], ['regimes', rp, 'meta', 'exceptions_catalog_entry']);
    if (`regimes/${r.meta.regime_id}.yaml` !== rp) issue(['regimes', rp, 'meta', 'regime_id'], E.REF_FILE, `regime_id "${r.meta.regime_id}" does not match file name`);
    r.meta.referenced_by.forEach((ref, i) => {
      if (!fileExists(ref)) issue(['regimes', rp, 'meta', 'referenced_by', i], E.REF_FILE, `file ${ref.split('#')[0]} not found`);
    });
  }

  // ----- conflicts (ADR 0016, corpus 0.10.0): catalog entry resolves, one entry per trigger -----
  const conflictTriggers = new Set<string>();
  for (const [fp, f] of Object.entries(c.conflicts)) {
    f.conflicts.forEach((x, i) => {
      checkCatalog([x.exceptions_catalog_entry], ['conflicts', fp, 'conflicts', i, 'exceptions_catalog_entry']);
      if (conflictTriggers.has(x.trigger)) issue(['conflicts', fp, 'conflicts', i, 'trigger'], E.TRIGGER, `more than one conflict for trigger "${x.trigger}"`);
      conflictTriggers.add(x.trigger);
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

    s.qualification_rules.forEach((r, i) => checkCatalog(r.notices, [...base, 'qualification_rules', i, 'notices']));
    // A rule may take its outcome from a data block of the same file (corpus 0.9.0); a
    // data block that declares an outcome is applied only through such a rule (ADR 0016).
    s.qualification_rules.forEach((r, i) => {
      if (r.reference && s[r.reference] === undefined) {
        issue([...base, 'qualification_rules', i, 'reference'], E.REF_FILE, `block "${r.reference}" not found in the sector file`);
      }
    });
    if (s.allegato_iv_channel && !s.qualification_rules.some((r) => r.reference === 'allegato_iv_channel')) {
      issue([...base, 'allegato_iv_channel'], E.OUTCOME_WITHOUT_TRIGGER, 'allegato_iv_channel declares an outcome but no rule references it');
    }
    checkCatalog(s.allegato_iv_channel?.notices, [...base, 'allegato_iv_channel', 'notices']);
    s.qualification_rules.forEach((r, i) => {
      if (/\bdimension\b/.test(r.condition)) {
        if (s.meta.size_blind) issue([...base, 'qualification_rules', i, 'condition'], E.SIZE_BLIND, 'size_blind sector with a dimension condition');
        const missing = DIMENSION_CITATIONS.filter((id) => !(r.citations ?? []).includes(id));
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
    // ADR 0016 amendment 3: two regimes that can be routed together with different outcomes need
    // a declared intersection; the engine never picks a "common" regime outcome
    const overrides = s.overrides ?? [];
    const sectorWizard = Object.values(c.wizard).find((w) => w.meta.sector_data === sp);
    const norm = (x: string) => x.replace(/\s+/g, ' ').trim();
    overrides.forEach((a, i) => overrides.slice(i + 1).forEach((b, k) => {
      const ma = OVERRIDE_TRIGGER_RE.exec(a.trigger);
      const mb = OVERRIDE_TRIGGER_RE.exec(b.trigger);
      if (!ma || !mb || (ma[1] === mb[1] && ma[2] !== mb[2])) return; // cannot match together
      const ra = c.regimes[a.reference]?.meta;
      const rb = c.regimes[b.reference]?.meta;
      if (!ra || !rb || (ra.assessment_mode === rb.assessment_mode && ra.verdict_outcome === rb.verdict_outcome)) return;
      const covered = (sectorWizard?.multi_regime_intersection ?? []).some((m) => {
        const terms = m.trigger.split(/\s+AND\s+/).map(norm);
        return terms.includes(norm(a.trigger)) && terms.includes(norm(b.trigger));
      });
      if (!covered) {
        issue([...base, 'overrides', i + 1 + k], E.REGIME_META_MISMATCH, `overrides "${a.trigger}" and "${b.trigger}" can match together with different regime outcomes and no multi_regime_intersection covers them`);
      }
    }));
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
    checkSignals(x.expected.signals, [...base, 'expected', 'signals']);
    checkCatalog(x.expected.notices, [...base, 'expected', 'notices']);
    x.expected.regime_routing.forEach((r, i) => checkCatalog([r.exceptions_catalog_entry], [...base, 'expected', 'regime_routing', i, 'exceptions_catalog_entry']));
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
    // inputs are questions the sector's wizard asks (own questions plus the common
    // block, minus excluded_common_questions: ADR 0014, ADR 0015)
    const sectorPath = Object.entries(c.sectors).find(([, s]) => s === sector)![0];
    const sectorWizard = Object.entries(c.wizard).find(([, w]) => w.meta.sector_data === sectorPath)?.[0];
    const asked = sectorWizard ? questionIndex(sectorWizard) : new Map();
    for (const k of Object.keys(x.inputs)) {
      if (!allQuestionIds.has(k)) issue([...base, 'inputs', k], E.FIXTURE_INPUT, `"${k}" is not a wizard question id`);
      else if (!asked.has(k)) issue([...base, 'inputs', k], E.FIXTURE_INPUT, `"${k}" is not asked in the wizard of "${x.sector}"`);
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

/**
 * Registry entries whose ID no corpus file or fixture uses (warning W_CITATION_UNUSED).
 *
 * @param c - corpus that passed CorpusSchema
 * @returns the unused IDs, as "<registry file> > <id>"
 */
export function unusedRegistryEntries(c: Corpus): string[] {
  const used = new Set<string>();
  for (const files of [c.sectors, c.wizard, c.regimes, c.signals, c.exceptions, c.conflicts, c.fixtures]) {
    for (const [fp, doc] of Object.entries(files)) collectCitationIds(doc, [fp]).forEach(({ id }) => used.add(id));
  }
  return Object.entries(c.citations).flatMap(([cp, f]) => f.citations.filter((r) => !used.has(r.id)).map((r) => `${cp} > ${r.id}`));
}
