# Esempio commentato: un file settore reale

Walkthrough annotato di `corpus/sectors/sectors__energia_elettrica.yaml` (corpus v0.2.1). È un file **reale del repo**, non un template inventato: usalo come riferimento di stile e per capire *perché* ogni blocco è modellato così. Le annotazioni `# →` sono commento didattico, non parte del file.

> Per un settore `size_blind` (PA) la struttura cambia: `categorie` invece di `tipologie`, `qualification_rules` che condizionano su `categoria == x`, blocco `allegato_iv_channel`. Vedi `sectors__pubblica_amministrazione.yaml`.

## `meta` — identità e cumulo del settore

```yaml
meta:
  sector_id: energia_elettrica       # → snake_case, univoco nel corpus
  allegato: I                        # → settore altamente critico
  punto: 1
  sottosettore_id: A1_1_a
  critical_tier: altamente_critico
  size_cap_applicable: true          # → il settore È soggetto al size-cap (art. 3 c. 5)
  size_blind: false                  # → NON size-blind: le regole possono condizionare sulla dimensione
  pilot_mvp_v0_1_0: true             # → settore pilota v0.1.0
  citations:
    - dlgs_138_2024_allegato_I
    - faq_settori_sottosettori
    - dir_ue_2019_944                # → base UE (Clean Energy Package)
  cumulative_regulations:
    - det_acn_379907_2025            # → unico atto cumulativo rilevante per l'energia
  technical_measures_source: det_acn_379907_2025_only
  incident_thresholds_source: det_acn_379907_2025   # → NON Reg. UE 2024/2690
  notification_timeline: nis2_art_23_par_4
  reg_ue_2024_2690_applicable: false # → il Reg. UE 2024/2690 (DSP) NON si applica all'energia
```

Note di modellazione:
- `size_cap_applicable: true` + `size_blind: false`: il settore segue il flusso standard di identificazione dimensionale. La validazione **consente** `qualification_rules` che condizionano sulla dimensione.
- Ogni claim in `meta.citations` è un **citation ID** attestato nella KB. `reg_ue_2024_2690_applicable: false` è una decisione documentata (l'energia non è coperta dal regolamento di esecuzione DSP): resa esplicita perché è un errore facile da commettere.

## `tipologie` — le identità del settore (descrittive)

```yaml
tipologie:
  - id: tso
    label_it: "Gestore del sistema di trasmissione (TSO)"
    faq_code: A1_1_a_1
    citations: [faq_a1_1_a_1, dir_ue_2019_944]
    verdict_strategy: categorical_assessment   # → INDICATIVO, non l'esito reale
    categorization_model: model_1
    typical_psnc_overlap: very_high            # → il TSO nazionale è in PSNC
    typical_l90_overlap: conditional
  # ... dso, impresa_fornitura, produttore, gestore_mercato,
  #     partecipante_aggregazione, gestore_punti_ricarica
  - id: gestore_punti_ricarica
    label_it: "Gestore di punti di ricarica"
    faq_code: A1_1_a_3
    citations: [faq_a1_1_a_3]
    verdict_strategy: categorical_assessment
    categorization_model: model_1
    typical_psnc_overlap: none
    typical_l90_overlap: conditional
    scoping_note_it: "Rientra solo se registrato su PUN (DM MASE 106/2023). I meri punti vendita con ricarica non registrati su PUN non rientrano automaticamente (A1.1.a.3)."
```

Note di modellazione:
- **`verdict_strategy` è indicativo.** Non è l'esito: l'esito è l'`outcome` della `qualification_rule` che matcha. Le tipologie enumerano *chi* può essere il soggetto, non *cosa* gli succede.
- `typical_psnc_overlap` / `typical_l90_overlap` sono **segnalazioni di overlap**, non regole: aiutano a capire dove i signal cumulativi si attivano tipicamente.
- `scoping_note_it` è copy user-facing italiano: perimetra una tipologia ambigua (i punti di ricarica rientrano solo se su PUN). Nota la formulazione fattuale, non prescrittiva.

## `qualification_rules` — qui vive la strategia di verdetto

```yaml
qualification_rules:
  - condition: dimension == micro_or_piccola
    outcome: out_of_scope
    verdict_outcome: likely_out_of_scope   # → mapping fisso: out_of_scope → likely_out_of_scope
    reasoning_trace: "Dimensione micro/piccola impresa esclusa dall'ambito NIS2 in via generale (Racc. 2003/361/CE; D.Lgs. 138/2024 art. 3). Per il settore elettrico, si segnala l'esclusione esplicita di clienti attivi e prosumer (FAQ A1.1.a.4)."
    citations: [dlgs_138_2024_art_3, racc_ue_2003_361, faq_a1_1_a_4]
  - condition: dimension == media
    outcome: categorical_assessment
    qualifica: importante                  # → EMESSA (categorical_assessment)
    verdict_outcome: likely_in_scope       # → mapping fisso: categorical in-scope → likely_in_scope
    reasoning_trace: "Soggetto di dimensione media (50-249 dipendenti o 10-50 M€); in settore Allegato I p. 1 (Energia) qualificato come soggetto importante. Per 'fatturato' si intende quello complessivo del soggetto, non solo dell'attività NIS (FAQ A1.2)."
    citations: [dlgs_138_2024_art_6, faq_amb_di_1, faq_a1_2]
  - condition: dimension == grande
    outcome: categorical_assessment
    qualifica: essenziale
    verdict_outcome: likely_in_scope
    reasoning_trace: "Soggetto di dimensione grande (>250 dipendenti o >50 M€); in settore Allegato I (altamente critico) qualificato come soggetto essenziale."
    citations: [dlgs_138_2024_art_6, faq_amb_di_1]
```

Note di modellazione:
- **Ogni regola dichiara `verdict_outcome`.** L'engine lo copia; una regola priva del campo è bloccata in build da zod.
- Il mapping è **fisso**: `out_of_scope`→`likely_out_of_scope`; `categorical_assessment` in ambito→`likely_in_scope`. Rispettarlo o è un bug.
- `qualifica` è **emessa** perché l'outcome è `categorical_assessment`. Se l'outcome fosse `qualitative_signal_only`, si userebbe `qualifica_inferita` — mai entrambe.
- `reasoning_trace` è **non categorico**: "qualificato come soggetto importante", non "sei un soggetto importante". Cita anche il chiarimento FAQ sul significato di "fatturato" (complessivo, non solo NIS): dettaglio attestato, non dedotto.

## `overrides` — i gate che instradano a un regime

```yaml
overrides:
  - trigger: psnc == yes
    override_kind: category_override
    reference: regimes/psnc.yaml
    reasoning_trace: "Servizi PSNC del soggetto categorizzati come 'alto' d'ufficio, fuori dal procedimento ordinario, ai sensi dell'art. 5 Det. ACN 155238/2026. Per il settore elettrico, TSO e grandi DSO sono tipicamente in perimetro PSNC. I servizi NIS non PSNC mantengono procedimento ordinario."
    citations: [det_acn_155238_2026_art_5, dl_105_2019_art_1_c_2_bis]
  - trigger: dora == yes
    override_kind: massive_disapplication
    reference: regimes/dora.yaml
    reasoning_trace: "Entità DORA: disapplicato il regime NIS salvo l'art. 7 c. 1. Nota: per un soggetto del settore energia questa risposta è inattesa; verifica che il soggetto sia effettivamente un'entità finanziaria regolata da DORA."
    citations: [dlgs_138_2024_art_3_c_14, det_piattaforma_127437_2026_art_20]
```

Note di modellazione:
- Gli override **non portano `verdict_outcome`** sul settore: instradano a un regime (`reference: regimes/<x>.yaml`). Il `meta` del regime dichiara `assessment_mode: escalate_to_advisor` e `verdict_outcome: ambiguous` (ADR 0009); nelle fixture l'esito atteso è quello del regime, più la lista `regime_routing` (un elemento per override che matcha, nell'ordine del file di settore; `[]` se nessun routing — ADR 0009, amendment 2026-10-27).
- I regimi in `regimes/*.yaml` hanno `status: routing_only_v0_1`: **instradano, non risolvono nel merito** in v0.1.0.
- L'override `dora` è modellato anche se "inatteso" per l'energia: la domanda comune resta nel flusso, quindi il caso va gestito (con nota di verifica), non ignorato. Il commento `# Cloud PA: non pertinente → nessun override` documenta l'assenza deliberata.

## Signal, `out_of_scope_mvp`, `copy_constraints`

```yaml
multi_identity_intra_sector:
  - signal: cross_sector_multi_tipologia_elettrica   # → definizione in signals/, qui solo il trigger
    condition_source: wizard_question
    condition_ref: attivita_elettriche_ulteriori
    trigger: any_selected

out_of_scope_mvp:
  - case: regime_transitorio_ose
    handling: cross_sector_signal
    verdict_outcome: ambiguous          # → anche i casi non modellati dichiarano l'esito
    scope_evolution_note: "Il regime transitorio OSE (art. 5 Det. 379907/2025) per i soggetti già OSE energia ex D.Lgs. 65/2018 non è modellato nel MVP; segnalato come possibile applicabilità."
  - case: cer_dlgs_134_2024
    handling: cross_sector_signal
    verdict_outcome: ambiguous
    scope_evolution_note: "L'energia è settore soggetto alla disciplina sui soggetti critici (D.Lgs. 134/2024, resilienza fisica; CER = Critical Entities Resilience). Il MVP non valuta il rientro tra i soggetti critici; segnalato come regime parallelo da non confondere né con il NIS2 né con le comunità energetiche rinnovabili (CACER)."

copy_constraints:
  - id: cer_cacer_disambiguation
    rule_it: "Mai usare l'acronimo nudo 'CER' nel copy del verdetto o dei signal. La disciplina D.Lgs. 134/2024 va resa come 'soggetti critici (D.Lgs. 134/2024)' oppure 'Critical Entities Resilience'; le comunità energetiche vanno rese come 'comunità energetiche rinnovabili (CACER)'. Nel settore energia 'CER' è ambiguo tra i due istituti."
    applies_to: [cer_signal, "out_of_scope_mvp.cer_dlgs_134_2024"]
```

Note di modellazione:
- Il **trigger** del signal vive nel file settore; la **definizione** (reasoning_trace + citazioni) vive in `signals/signals__cross_sector.yaml`. Non duplicare.
- `out_of_scope_mvp` dichiara comunque `verdict_outcome` per ogni caso (qui `ambiguous`: casi solo segnalati, non valutati). `scope_evolution_note` è copy non categorico che spiega cosa succederà in v0.2+.
- `copy_constraints` formalizza il vincolo di naming ADR 0005 (CER/CACER) **dentro il corpus**, così il rendering non può violarlo per distrazione. Questo è il pattern da replicare quando un settore ha una collisione terminologica.

## Pattern ricorrenti da riusare

1. **Dimensione modula l'esito** (settori size-cap): tre `qualification_rules` — `micro_or_piccola` → `out_of_scope`; `media` → `categorical_assessment`/`importante`; `grande` → `categorical_assessment`/`essenziale`. Ognuna con il proprio `verdict_outcome` fisso.
2. **Override sempre gestito, anche se "inatteso"**: se una domanda gate resta nel flusso, il caso positivo va modellato (con nota di verifica), mai lasciato implicito.
3. **Caso non modellato = `out_of_scope_mvp` con esito dichiarato**: mai far sparire un caso; segnalarlo con `verdict_outcome` + `scope_evolution_note`.
4. **Collisione terminologica = `copy_constraints`**: formalizza il vincolo di naming nel corpus, non solo nella prosa.
5. **Ogni `reasoning_trace` è probabilistico e citato**: esito qualificato, mai imperativo; ogni claim non ovvio porta il suo citation ID.
