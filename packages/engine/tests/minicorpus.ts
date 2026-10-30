/**
 * Synthetic mini-corpus for the stage tests of evaluate (ADR 0016): one sector
 * "test" with two regime overrides and an intersection, two type exclusions, a
 * size-blind rule and two dimensional rules. It passes corpus:validate, so every
 * test starts from a valid corpus and injects one fault or one answer set.
 */
import { validateCorpus, type Corpus, type RawCorpus } from '@nis2-check/corpus';
import { CONFLICT_NOTICE } from '../src/index.ts';

const DIM = ['c_dim', 'faq_amb_di_1', 'racc_ue_2003_361'];
const trace = (what: string) => `Testo del corpus per ${what}.`;

const entry = (id: string, status: 'gestito' | 'segnalato' | 'non_gestito', appliesTo = ['test']) => ({
  id,
  status,
  title: `Voce di prova ${id}`,
  description: `Descrizione della voce di prova ${id}.`,
  citations: ['c_cat'],
  applies_to: appliesTo,
});

const regime = (id: string, effect: string, citation: string, residual: string | null) => ({
  meta: {
    regime_id: id,
    status: 'routing_only_v0_1',
    routing_effect: effect,
    assessment_mode: 'escalate_to_advisor',
    verdict_outcome: 'ambiguous',
    exceptions_catalog_entry: `${id}_entry`,
    residual_nis_obligation: residual,
    referenced_by: ['sectors/sectors__test.yaml'],
    citations: [citation],
  },
});

export function rawMiniCorpus(): RawCorpus {
  const ids = ['c_gate_a', 'c_gate_b', 'c_rule', 'c_dim', 'c_map', 'c_inter', 'c_sig', 'c_cat', 'faq_amb_di_1', 'racc_ue_2003_361'];
  return {
    version: '0.0.1',
    citations: {
      'citations/citations__registry.yaml': {
        citations: ids.map((id) => ({ id, kb_node: 'wiki/sources/prova.md', kb_lines: '1', attestation: 'voce di prova' })),
      },
    },
    exceptions: {
      'exceptions/exceptions__catalog.yaml': {
        exceptions: [
          entry('reg_a_entry', 'gestito', ['reg_a']),
          entry('reg_b_entry', 'gestito', ['reg_b']),
          ...['n_inter', 'n_escluso', 'n_critico', 'n_grande', 'n_piccola', 'n_answer'].map((id) => entry(id, 'segnalato')),
          entry(CONFLICT_NOTICE, 'non_gestito'),
        ],
      },
    },
    regimes: {
      'regimes/reg_a.yaml': regime('reg_a', 'category_override', 'c_gate_a', null),
      'regimes/reg_b.yaml': regime('reg_b', 'model_substitution', 'c_gate_b', 'registrazione'),
    },
    signals: {
      'signals/signals__test.yaml': {
        signals: [
          { id: 'sig_a', kind: 'cross_sector', message_template: 'sig_a', base_reasoning_trace: trace('sig_a'), citations: ['c_sig'] },
          { id: 'sig_b', kind: 'cumulative_regime', message_template: 'sig_b', base_reasoning_trace: trace('sig_b'), citations: ['c_sig'] },
        ],
      },
    },
    wizard: {
      'wizard/wizard__disambiguation.yaml': {
        meta: { block_id: 'disambiguation' },
        questions: [
          { id: 'gate_a', kind: 'binary', label_it: 'Gate A?' },
          { id: 'gate_b', kind: 'binary', label_it: 'Gate B?' },
        ],
        standard_identification_questions: [
          { id: 'critico', phase: 'standard_identification', kind: 'binary', label_it: 'Critico?' },
          {
            id: 'dimension',
            phase: 'standard_identification',
            kind: 'single_select',
            label_it: 'Dimensione?',
            options: [{ id: 'piccola', label_it: 'Piccola' }, { id: 'grande', label_it: 'Grande' }],
          },
        ],
      },
      'wizard/wizard__test.yaml': {
        meta: { wizard_id: 'test', references_common_block: 'disambiguation', sector_data: 'sectors/sectors__test.yaml' },
        flow_order: ['disambiguation', 'sector_specific', 'standard_identification'],
        sector_specific_questions: [
          {
            id: 'tipo',
            kind: 'single_select',
            label_it: 'Tipo?',
            options: [{ id: 'normale', label_it: 'Normale' }, { id: 'escluso', label_it: 'Escluso' }, { id: 'ignoto', label_it: 'Ignoto' }],
            outcome_mapping: [
              { answer: 'escluso', outcome: 'out_of_scope', verdict_outcome: 'likely_out_of_scope', reasoning_trace: trace('escluso'), citations: ['c_map'], notices: ['n_escluso'] },
              { answer: 'ignoto', outcome: 'qualitative_signal_only', verdict_outcome: 'ambiguous', reasoning_trace: trace('ignoto'), citations: ['c_map'] },
            ],
          },
          {
            id: 'tipo2',
            kind: 'single_select',
            label_it: 'Tipo secondario?',
            visible_if: { input: 'tipo', op: 'neq', value: 'normale' },
            options: [{ id: 'x', label_it: 'X' }, { id: 'y', label_it: 'Y' }],
            outcome_mapping: [{ answer: 'y', outcome: 'qualitative_signal_only', verdict_outcome: 'ambiguous', reasoning_trace: trace('y'), citations: ['c_map'] }],
          },
          { id: 'extra', kind: 'binary', label_it: 'Extra?', on_yes: { activates_signals: ['sig_a'], notices: ['n_answer', 'n_grande'] } },
        ],
        multi_regime_intersection: [
          {
            trigger: 'gate_a == yes AND gate_b == yes',
            outcome: 'escalate_to_advisor',
            verdict_outcome: 'ambiguous',
            reasoning_trace: trace('intersezione'),
            citations: ['c_inter'],
            notices: ['n_inter'],
          },
        ],
      },
    },
    sectors: {
      'sectors/sectors__test.yaml': {
        meta: { sector_id: 'test', allegato: 'I', critical_tier: 'prova', size_cap_applicable: true, size_blind: false, pilot_mvp_v0_1_0: false, citations: ['c_rule'] },
        qualification_rules: [
          { condition: 'critico == yes', outcome: 'categorical_assessment', verdict_outcome: 'likely_in_scope', qualifica: 'essenziale', reasoning_trace: trace('critico'), citations: ['c_rule'], notices: ['n_critico'] },
          { condition: 'dimension == piccola AND critico == no', outcome: 'out_of_scope', verdict_outcome: 'likely_out_of_scope', reasoning_trace: trace('piccola'), citations: DIM, notices: ['n_piccola'] },
          { condition: 'dimension == grande AND critico == no', outcome: 'categorical_assessment', verdict_outcome: 'likely_in_scope', qualifica: 'importante', reasoning_trace: trace('grande'), citations: DIM, notices: ['n_grande'] },
        ],
        overrides: [
          { trigger: 'gate_a == yes', override_kind: 'category_override', reference: 'regimes/reg_a.yaml', reasoning_trace: trace('reg_a'), citations: ['c_gate_a'] },
          { trigger: 'gate_b == yes', override_kind: 'model_substitution', reference: 'regimes/reg_b.yaml', reasoning_trace: trace('reg_b'), citations: ['c_gate_b'] },
        ],
        cumulative_signals: [{ signal: 'sig_b', trigger: 'tipo == normale' }],
      },
    },
    fixtures: {},
  };
}

/** The mini-corpus, validated: throws if the synthetic corpus itself is invalid. */
export function miniCorpus(): Corpus {
  const result = validateCorpus(rawMiniCorpus());
  if (!result.corpus) throw new Error(result.errors.join('\n'));
  return result.corpus;
}
