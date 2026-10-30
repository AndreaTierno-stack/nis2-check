/**
 * Fault-injection tests of corpus:validate. Each test validates an in-memory copy
 * of the real corpus with one injected fault and expects its error code: the seven
 * faults injected by hand in S1.1 plus the three introduced with ADR 0010 and the
 * rule-input invariant (S2), and the exceptions catalog checks (corpus 0.5.0, ADR 0012).
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { loadFromDisk, validateCorpus, type RawCorpus, type SourceTexts } from '../src/index.ts';

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

    it('applies_to_categories reintroduced -> E_TRIGGER', () => {
      const errors = errorsAfter((c) => {
        pa(c).cumulative_signals[0].applies_to_categories = ['a'];
      });
      expectCode(errors, 'E_TRIGGER', 'sectors__pubblica_amministrazione.yaml');
    });
  });
});
