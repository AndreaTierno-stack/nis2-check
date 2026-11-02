/**
 * Fault-injection tests of corpus:validate. Each test validates an in-memory copy
 * of the real corpus with one injected fault and expects its error code: the seven
 * faults injected by hand in S1.1 plus the three introduced with ADR 0010 and the
 * rule-input invariant (S2), and the exceptions catalog checks (corpus 0.5.0, ADR 0012).
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { apostropheAccents, loadFromDisk, validateCorpus, type RawCorpus, type SourceTexts } from '../src/index.ts';

type Doc = Record<string, any>;

let pristine: { corpus: RawCorpus; sources: SourceTexts };

beforeAll(() => {
  const { corpus, sources, parseErrors } = loadFromDisk();
  expect(parseErrors).toEqual([]);
  pristine = { corpus, sources };
});

/** Deep copy of the real corpus and of its source texts. */
const fresh = () => ({ corpus: structuredClone(pristine.corpus), sources: { ...pristine.sources } });

/** Validates a mutated copy and returns its errors. */
function errorsAfter(mutate: (c: RawCorpus, s: SourceTexts) => void): string[] {
  const { corpus, sources } = fresh();
  mutate(corpus, sources);
  const result = validateCorpus(corpus, sources);
  expect(result.ok).toBe(false);
  return result.errors;
}

const expectCode = (errors: string[], code: string, where: string) =>
  expect(errors.filter((e) => e.includes(`[${code}]`) && e.includes(where)), errors.join('\n')).not.toHaveLength(0);

const sector = (c: RawCorpus, id: string) => c.sectors[`sectors/sectors__${id}.yaml`] as Doc;
const wizard = (c: RawCorpus, id: string) => c.wizard[`wizard/wizard__${id}.yaml`] as Doc;
const fixture = (c: RawCorpus, prefix: string) =>
  c.fixtures[Object.keys(c.fixtures).find((k) => k.startsWith(prefix))!] as Doc;

describe('corpus:validate', () => {
  it('passes on the real corpus', () => {
    const { corpus, sources } = fresh();
    const result = validateCorpus(corpus, sources);
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
  });

  describe('S1.1 faults', () => {
    it('unquoted "no" in a fixture -> E_YAML_BOOL', () => {
      const errors = errorsAfter((_c, s) => {
        const key = Object.keys(s).find((k) => k.includes('E01_'))!;
        s[key] = s[key]!.replace('psnc: "no"', 'psnc: no');
      });
      expectCode(errors, 'E_YAML_BOOL', 'E01_');
    });

    it('PSNC override citations removed -> E_OVERRIDE_CITATIONS', () => {
      const errors = errorsAfter((c) => {
        const o = sector(c, 'cloud_computing').overrides.find((x: Doc) => x.trigger === 'psnc == yes');
        o.citations = ['det_acn_155238_2026_art_5'];
      });
      expectCode(errors, 'E_OVERRIDE_CITATIONS', 'sectors__cloud_computing.yaml');
    });

    it('follow-up without id -> E_ID_MISSING', () => {
      const errors = errorsAfter((c) => {
        const q = wizard(c, 'energia_elettrica').sector_specific_questions.find((x: Doc) => x.id === 'pertinenza_pubblica_energia');
        delete q.conditional_followup.id;
      });
      expectCode(errors, 'E_ID_MISSING', 'wizard__energia_elettrica.yaml');
    });

    it('regime outcome changed -> E_ESCALATE_AMBIGUOUS', () => {
      const errors = errorsAfter((c) => {
        (c.regimes['regimes/psnc.yaml'] as Doc).meta.verdict_outcome = 'likely_in_scope';
      });
      expectCode(errors, 'E_ESCALATE_AMBIGUOUS', 'regimes/psnc.yaml');
    });

    it('E22 routing order changed -> E_REGIME_ROUTING', () => {
      const errors = errorsAfter((c) => {
        fixture(c, 'E22_').expected.regime_routing.reverse();
      });
      expectCode(errors, 'E_REGIME_ROUTING', 'E22_');
    });

    it('E08 routing removed -> E_REGIME_ROUTING', () => {
      const errors = errorsAfter((c) => {
        fixture(c, 'E08_').expected.regime_routing = [];
      });
      expectCode(errors, 'E_REGIME_ROUTING', 'E08_');
    });

    it('gate notice pointing to a missing catalog entry -> E_CATALOG_REF', () => {
      const errors = errorsAfter((c) => {
        const q = (c.wizard['wizard/wizard__disambiguation.yaml'] as Doc).questions.find((x: Doc) => x.id === 'dora');
        q.on_yes.notices.push('voce_inesistente');
      });
      expectCode(errors, 'E_CATALOG_REF', 'wizard__disambiguation.yaml');
    });

    it('verdict_outcome missing on a rule -> E_VERDICT_OUTCOME', () => {
      const errors = errorsAfter((c) => {
        delete sector(c, 'cloud_computing').qualification_rules[0].verdict_outcome;
      });
      expectCode(errors, 'E_VERDICT_OUTCOME', 'sectors__cloud_computing.yaml');
    });

    it('corpus_ref without file prefix -> E_CORPUS_REF', () => {
      const errors = errorsAfter((c) => {
        const x = fixture(c, 'E01_');
        x.expected.corpus_ref = x.expected.corpus_ref.replace('sectors/sectors__', 'sectors/');
      });
      expectCode(errors, 'E_CORPUS_REF', 'E01_');
    });
  });

  describe('S2 and 0.5.0 faults (ADR 0010, rule inputs, ADR 0012)', () => {
    const registratoPun = (c: RawCorpus) =>
      wizard(c, 'energia_elettrica').sector_specific_questions.find((x: Doc) => x.id === 'registrato_pun');

    it('visible_if as a string -> E_VISIBLE_IF', () => {
      const errors = errorsAfter((c) => {
        registratoPun(c).visible_if = 'tipologia_elettrica == gestore_punti_ricarica';
      });
      expectCode(errors, 'E_VISIBLE_IF', 'wizard__energia_elettrica.yaml');
    });

    it('nested visible_if -> E_VISIBLE_IF', () => {
      const errors = errorsAfter((c) => {
        const q = registratoPun(c);
        q.visible_if = { any_of: [{ all_of: q.visible_if.any_of }, q.visible_if.any_of[0]] };
      });
      expectCode(errors, 'E_VISIBLE_IF', 'wizard__energia_elettrica.yaml');
    });

    // ADR 0010 amendment (corpus 0.13.0): sector-scoped visibility of common questions
    it('common_question_visibility on a question that is not in the common block -> E_VISIBLE_IF', () => {
      const errors = errorsAfter((c) => {
        wizard(c, 'pubblica_amministrazione').common_question_visibility.categoria_pa = { input: 'categoria_pa', op: 'eq', value: 'a' };
      });
      expectCode(errors, 'E_VISIBLE_IF', 'wizard__pubblica_amministrazione.yaml');
    });

    it('common_question_visibility reading a question asked later in flow_order -> E_VISIBLE_IF', () => {
      const errors = errorsAfter((c) => {
        wizard(c, 'pubblica_amministrazione').flow_order = ['disambiguation', 'sector_specific', 'standard_identification'];
      });
      expectCode(errors, 'E_VISIBLE_IF', 'wizard__pubblica_amministrazione.yaml');
    });

    it('common_question_visibility on an excluded common question -> E_VISIBLE_IF', () => {
      const errors = errorsAfter((c) => {
        wizard(c, 'pubblica_amministrazione').common_question_visibility.cloud_pa = { input: 'categoria_pa', op: 'eq', value: 'a' };
      });
      expectCode(errors, 'E_VISIBLE_IF', 'wizard__pubblica_amministrazione.yaml');
    });

    it('notice pointing to a missing catalog entry -> E_CATALOG_REF', () => {
      const errors = errorsAfter((c) => {
        sector(c, 'pubblica_amministrazione').qualification_rules[0].notices.push('voce_inesistente');
      });
      expectCode(errors, 'E_CATALOG_REF', 'sectors__pubblica_amministrazione.yaml');
    });

    it('prescriptive wording in the catalog -> E_COPY', () => {
      const errors = errorsAfter((c) => {
        const cat = c.exceptions['exceptions/exceptions__catalog.yaml'] as Doc;
        cat.exceptions[0].description = 'Devi verificare il regime con un consulente.';
      });
      expectCode(errors, 'E_COPY', 'exceptions__catalog.yaml');
    });

    it('PA rule reading an excluded common question -> E_RULE_INPUT', () => {
      const errors = errorsAfter((c) => {
        sector(c, 'pubblica_amministrazione').qualification_rules[2].condition = 'categoria_pa == b AND dimension == media';
      });
      expectCode(errors, 'E_RULE_INPUT', 'sectors__pubblica_amministrazione.yaml');
    });

    it('PA fixture answering an excluded common question -> E_FIXTURE_INPUT', () => {
      const errors = errorsAfter((c) => {
        fixture(c, 'E09_').inputs.dimension = 'grande';
      });
      expectCode(errors, 'E_FIXTURE_INPUT', 'E09_');
    });

    it('excluded_common_questions naming a non-common question -> E_REF_QUESTION', () => {
      const errors = errorsAfter((c) => {
        wizard(c, 'pubblica_amministrazione').excluded_common_questions.push('categoria_pa');
      });
      expectCode(errors, 'E_REF_QUESTION', 'wizard__pubblica_amministrazione.yaml');
    });

    it('citation ID missing from the registry -> E_CITATION_UNREGISTERED', () => {
      const errors = errorsAfter((c) => {
        sector(c, 'energia_elettrica').qualification_rules[1].citations.push('dlgs_138_2024_art_99');
      });
      expectCode(errors, 'E_CITATION_UNREGISTERED', 'sectors__energia_elettrica.yaml');
    });

    it('citation ID in a fixture missing from the registry -> E_CITATION_UNREGISTERED', () => {
      const errors = errorsAfter((c) => {
        fixture(c, 'E01_').citations.push('faq_settori_cloud');
      });
      expectCode(errors, 'E_CITATION_UNREGISTERED', 'E01_');
    });

    it('registry entry used nowhere -> W_CITATION_UNUSED (warning, still valid)', () => {
      const { corpus, sources } = fresh();
      (corpus.citations['citations/citations__registry.yaml'] as Doc).citations.push({
        id: 'dlgs_138_2024_art_99',
        kb_node: 'wiki/sources/D.Lgs. 138-2024 (Decreto NIS).md',
        kb_lines: '1',
        attestation: 'voce di prova',
      });
      const result = validateCorpus(corpus, sources);
      expect(result.errors).toEqual([]);
      expect(result.warnings.filter((w) => w.includes('[W_CITATION_UNUSED]') && w.includes('dlgs_138_2024_art_99'))).toHaveLength(1);
    });

    it('segnalato catalog entry referenced by no notice -> E_CATALOG_UNREFERENCED', () => {
      const errors = errorsAfter((c) => {
        const rule = sector(c, 'energia_elettrica').qualification_rules.find((r: Doc) => r.condition.startsWith('dimension == media'));
        rule.notices = [];
        for (const r of sector(c, 'energia_elettrica').qualification_rules) {
          if (r.notices) r.notices = r.notices.filter((n: string) => n !== 'energia_regime_transitorio_ose');
        }
      });
      expectCode(errors, 'E_CATALOG_UNREFERENCED', 'exceptions__catalog.yaml');
    });

    it('non_gestito catalog entry may be unreferenced', () => {
      const { corpus, sources } = fresh();
      const cat = corpus.exceptions['exceptions/exceptions__catalog.yaml'] as Doc;
      cat.exceptions.push({ ...cat.exceptions.find((e: Doc) => e.id === 'confine_50_43'), id: 'voce_di_prova_non_gestita' });
      expect(validateCorpus(corpus, sources).errors).toEqual([]);
    });

    it('rule reading an input missing from the wizard -> E_RULE_INPUT', () => {
      const errors = errorsAfter((c) => {
        sector(c, 'pubblica_amministrazione').qualification_rules[2].condition = 'categoria == c';
      });
      expectCode(errors, 'E_RULE_INPUT', 'sectors__pubblica_amministrazione.yaml');
    });
  });

  describe('corpus 0.9.0 faults (ADR 0016)', () => {
    const pa = (c: RawCorpus) => sector(c, 'pubblica_amministrazione');
    const produttore = (c: RawCorpus) =>
      wizard(c, 'energia_elettrica').sector_specific_questions.find((q: Doc) => q.id === 'produttore_cliente_attivo');

    it('outcome_mapping declaring likely_in_scope -> E_OUTCOME_MAPPING_INCLUSIVE', () => {
      const errors = errorsAfter((c) => {
        Object.assign(produttore(c).outcome_mapping[0], { outcome: 'categorical_assessment', verdict_outcome: 'likely_in_scope' });
      });
      expectCode(errors, 'E_OUTCOME_MAPPING_INCLUSIVE', 'wizard__energia_elettrica.yaml');
    });

    it('option declaring likely_in_scope -> E_OUTCOME_MAPPING_INCLUSIVE', () => {
      const errors = errorsAfter((c) => {
        produttore(c).options[1].verdict_outcome = 'likely_in_scope';
      });
      expectCode(errors, 'E_OUTCOME_MAPPING_INCLUSIVE', 'wizard__energia_elettrica.yaml');
    });

    it('rule without condition -> E_OUTCOME_WITHOUT_TRIGGER', () => {
      const errors = errorsAfter((c) => {
        delete pa(c).qualification_rules[0].condition;
      });
      expectCode(errors, 'E_OUTCOME_WITHOUT_TRIGGER', 'sectors__pubblica_amministrazione.yaml');
    });

    it('empty override trigger -> E_OUTCOME_WITHOUT_TRIGGER', () => {
      const errors = errorsAfter((c) => {
        sector(c, 'cloud_computing').overrides[0].trigger = '';
      });
      expectCode(errors, 'E_OUTCOME_WITHOUT_TRIGGER', 'sectors__cloud_computing.yaml');
    });

    it('allegato_iv_channel referenced by no rule -> E_OUTCOME_WITHOUT_TRIGGER', () => {
      const errors = errorsAfter((c) => {
        pa(c).qualification_rules = pa(c).qualification_rules.filter((r: Doc) => r.reference !== 'allegato_iv_channel');
      });
      expectCode(errors, 'E_OUTCOME_WITHOUT_TRIGGER', 'allegato_iv_channel');
    });

    it('rule with reference and an inline outcome -> E_REF_FILE', () => {
      const errors = errorsAfter((c) => {
        pa(c).qualification_rules.find((r: Doc) => r.reference).verdict_outcome = 'ambiguous';
      });
      expectCode(errors, 'E_REF_FILE', 'sectors__pubblica_amministrazione.yaml');
    });

    it('outcome_mapping on a question without activity -> E_ACTIVITY_REF', () => {
      const errors = errorsAfter((c) => {
        delete produttore(c).activity;
      });
      expectCode(errors, 'E_ACTIVITY_REF', 'wizard__energia_elettrica.yaml');
    });

    it('activity that is not an option of the activity inputs -> E_ACTIVITY_REF', () => {
      const errors = errorsAfter((c) => {
        produttore(c).activity = 'eolico';
      });
      expectCode(errors, 'E_ACTIVITY_REF', 'wizard__energia_elettrica.yaml');
    });

    it('outcome_mapping without notices_if_demoted -> E_ACTIVITY_REF', () => {
      const errors = errorsAfter((c) => {
        delete produttore(c).outcome_mapping[0].notices_if_demoted;
      });
      expectCode(errors, 'E_ACTIVITY_REF', 'wizard__energia_elettrica.yaml');
    });

    const conflict = (c: RawCorpus) => (c.conflicts['conflicts/conflicts__stages.yaml'] as Doc).conflicts[0];

    it('conflict with an unknown trigger type -> E_TRIGGER', () => {
      const errors = errorsAfter((c) => {
        conflict(c).trigger = 'stage_1_and_stage_4';
      });
      expectCode(errors, 'E_TRIGGER', 'conflicts__stages.yaml');
    });

    it('conflict pointing to a catalog entry that does not exist -> E_CATALOG_REF', () => {
      const errors = errorsAfter((c) => {
        conflict(c).exceptions_catalog_entry = 'voce_inesistente';
      });
      expectCode(errors, 'E_CATALOG_REF', 'conflicts__stages.yaml');
    });

    it('conflict without trigger -> E_OUTCOME_WITHOUT_TRIGGER', () => {
      const errors = errorsAfter((c) => {
        delete conflict(c).trigger;
      });
      expectCode(errors, 'E_OUTCOME_WITHOUT_TRIGGER', 'conflicts__stages.yaml');
    });

    it('conflict catalog entry no longer referenced -> E_CATALOG_UNREFERENCED', () => {
      const errors = errorsAfter((c) => {
        c.conflicts = {};
        // corpus 0.13.0: the PA art. 4 c. 2 mapping also points to the entry (notices_if_demoted)
        const categoria = wizard(c, 'pubblica_amministrazione').sector_specific_questions.find((x: Doc) => x.id === 'categoria_pa');
        categoria.outcome_mapping[0].notices_if_demoted = ['pa_organi_costituzionali_capo_v_art_4_c_2'];
      });
      expectCode(errors, 'E_CATALOG_UNREFERENCED', 'exceptions__catalog.yaml');
    });

    it('rule without stage -> E_RULE_STAGE_MISMATCH', () => {
      const errors = errorsAfter((c) => {
        delete sector(c, 'cloud_computing').qualification_rules[0].stage;
      });
      expectCode(errors, 'E_RULE_STAGE_MISMATCH', 'sectors__cloud_computing.yaml');
    });

    it('size_blind rule reading dimension -> E_RULE_STAGE_MISMATCH', () => {
      const errors = errorsAfter((c) => {
        sector(c, 'cloud_computing').qualification_rules[1].stage = 'size_blind';
      });
      expectCode(errors, 'E_RULE_STAGE_MISMATCH', 'sectors__cloud_computing.yaml');
    });

    it('dimensional rule reading another input -> E_RULE_STAGE_MISMATCH', () => {
      const errors = errorsAfter((c) => {
        sector(c, 'cloud_computing').qualification_rules[1].condition = 'dimension == micro_or_piccola AND pertinenza_pubblica_cloud == no';
      });
      expectCode(errors, 'E_RULE_STAGE_MISMATCH', 'sectors__cloud_computing.yaml');
    });

    it('two regimes with different outcomes and no intersection -> E_REGIME_META_MISMATCH', () => {
      const errors = errorsAfter((c) => {
        Object.assign((c.regimes['regimes/cloud_pa.yaml'] as Doc).meta, { assessment_mode: 'qualitative_signal_only', verdict_outcome: 'ambiguous' });
        delete wizard(c, 'pubblica_amministrazione').multi_regime_intersection;
      });
      expectCode(errors, 'E_REGIME_META_MISMATCH', 'sectors__pubblica_amministrazione.yaml');
    });

    it('two regimes with different outcomes covered by an intersection are valid', () => {
      const { corpus, sources } = fresh();
      Object.assign((corpus.regimes['regimes/cloud_pa.yaml'] as Doc).meta, { assessment_mode: 'qualitative_signal_only', verdict_outcome: 'ambiguous' });
      expect(validateCorpus(corpus, sources).errors.filter((e) => e.includes('E_REGIME_META_MISMATCH'))).toEqual([]);
    });

    it('registry entry without label -> W_CITATION_UNLABELED (warning, still valid)', () => {
      const { corpus, sources } = fresh();
      const reg = (corpus.citations['citations/citations__registry.yaml'] as Doc).citations;
      delete reg[0].label;
      const result = validateCorpus(corpus, sources);
      expect(result.errors).toEqual([]);
      expect(result.warnings.filter((w) => w.includes('[W_CITATION_UNLABELED]') && w.includes(reg[0].id))).toHaveLength(1);
    });

    it('applies_to_categories reintroduced -> E_TRIGGER', () => {
      const errors = errorsAfter((c) => {
        pa(c).cumulative_signals[0].applies_to_categories = ['a'];
      });
      expectCode(errors, 'E_TRIGGER', 'sectors__pubblica_amministrazione.yaml');
    });
  });

  describe('corpus 0.13.1 faults (review F18, apostrophe instead of accent)', () => {
    it('apostrophized vowel in a rule trace -> E_COPY', () => {
      const errors = errorsAfter((c) => {
        const r = sector(c, 'energia_elettrica').qualification_rules[1];
        r.reasoning_trace = `${r.reasoning_trace} L'attivita' e' dichiarata.`;
      });
      expectCode(errors, 'E_COPY', 'sectors__energia_elettrica.yaml > qualification_rules[1] > reasoning_trace');
    });

    it('apostrophized vowel in a wizard option label -> E_COPY', () => {
      const errors = errorsAfter((c) => {
        wizard(c, 'pubblica_amministrazione').sector_specific_questions[0].options[0].label_it += ' (piu\' categorie)';
      });
      expectCode(errors, 'E_COPY', 'wizard__pubblica_amministrazione.yaml');
    });

    it('apostrophized vowel in a registry label and in a signal -> E_COPY', () => {
      const errors = errorsAfter((c) => {
        const reg = (c.citations['citations/citations__registry.yaml'] as Doc).citations;
        reg[0].label = "Specifiche di base: e' il modello dell'allegato 2";
        const sig = (c.signals['signals/signals__cumulative_regimes.yaml'] as Doc).signals[0];
        sig.base_reasoning_trace = 'Il cumulo puo\' applicarsi.';
      });
      expectCode(errors, 'E_COPY', 'citations__registry.yaml');
      expectCode(errors, 'E_COPY', 'signals__cumulative_regimes.yaml');
    });

    it('elisions, single-quoted spans and "po\'" are not flagged', () => {
      expect(apostropheAccents("l'analisi della categoria 'impatto alto' e dell'Allegato")).toEqual([]);
      expect(apostropheAccents("'«servizio di cloud computing»: ... in varie ubicazioni'")).toEqual([]);
      expect(apostropheAccents("un po' di contesto")).toEqual([]);
      expect(apostropheAccents("E' una attivita' che ne' l'una ne' l'altra")).toEqual(["E'", "attivita'", "ne'", "ne'"]);
    });
  });
});
