# Schema YAML del corpus NIS2 (reale, v0.2.1+)

Schema canonico distillato dai file **reali** in `packages/corpus/corpus/`. Non è ricostruito a memoria: rispecchia `packages/corpus/corpus/sectors/sectors__energia_elettrica.yaml`, `sectors__pubblica_amministrazione.yaml`, `sectors__cloud_computing.yaml`, `packages/corpus/corpus/wizard/`, `packages/corpus/corpus/signals/`, `packages/corpus/corpus/regimes/`. Validazione zod build-time nel package `packages/corpus` (comando `corpus:validate`).

> Prima di scrivere, **leggi sempre il file reale più vicino al caso**. Questo schema è una mappa, non il territorio. Chiavi di schema in inglese; testo user-facing in italiano nei campi `*_it` e `reasoning_trace`. ID interni in `snake_case` (mai kebab-case).

## File `sectors/sectors__<id>.yaml`

### Blocco `meta`

```yaml
meta:
  sector_id: string                 # snake_case, univoco. Es. "energia_elettrica"
  allegato: "I" | "II" | "III" | "IV"
  punto: string                     # punto/lettera dell'allegato. Es. "1" o "1.a"
  sottosettore_id: string           # snake_case
  critical_tier: string             # indicazione di criticità (descrittiva)
  size_cap_applicable: boolean      # true se soggetto a size-cap (art. 3 c. 5)
  size_blind: boolean               # true = flag documentale/validazione (vedi sotto)
  pilot_mvp_v0_1_0: boolean         # true se settore pilota v0.1.0
  citations: [citation_id, ...]     # attestazioni a livello di settore
  cumulative_regulations: [...]     # regimi che tipicamente si cumulano
  technical_measures_source: citation_id
  incident_thresholds_source: citation_id
  notification_timeline: string     # riferimento ai termini di notifica
```

`size_blind: true` è **documentale/validazione, non un branch**. Se true, nessuna `qualification_rule` del file deve avere condizioni sulla dimensione (la PA usa `condition: categoria_pa == x`). La validazione zod lo verifica.

### Blocco `tipologie` (settori size-cap) o `categorie` (PA)

Descrittivo. Enumera le identità del settore. **La strategia di verdetto NON vive qui** — `verdict_strategy` è indicativo; l'esito reale è l'`outcome` della `qualification_rule` che matcha.

```yaml
tipologie:                          # o "categorie" per la PA
  - id: string                      # snake_case. Es. "dso", "gestore_punti_ricarica"
    label_it: string                # etichetta user-facing italiana
    faq_code: string?               # codice FAQ ACN che attesta la tipologia
    citations: [citation_id, ...]
    verdict_strategy: string?       # INDICATIVO, non vincolante
    typical_psnc_overlap: bool?     # overlap tipici (segnalazione)
    typical_l90_overlap: bool?
    scoping_note_it: string?        # nota di perimetro user-facing (opzionale)
```

### Blocco `qualification_rules`

**Qui vive la strategia di verdetto.** Ogni regola dichiara il proprio esito e — vincolo non negoziabile — il `verdict_outcome`.

```yaml
qualification_rules:
  - condition: string               # es. "dimension == media" o "categoria_pa == c"; ogni input deve esistere nel wizard del settore o nel blocco comune
    outcome: categorical_assessment | qualitative_signal_only | escalate_to_advisor | out_of_scope
    verdict_outcome: likely_in_scope | likely_out_of_scope | ambiguous   # OBBLIGATORIO
    qualifica: essenziale | importante           # SOLO se outcome == categorical_assessment
    # -- OPPURE (mai entrambi sulla stessa regola) --
    qualifica_inferita: essenziale | importante  # SOLO se outcome == qualitative_signal_only
    reasoning_trace: string          # italiano, copy NON categorico (probabilistico)
    citations: [citation_id, ...]
```

Mapping fisso `outcome` → `verdict_outcome` (rispettalo o è un bug):

| `outcome`                                | `verdict_outcome`                          |
|------------------------------------------|--------------------------------------------|
| `out_of_scope`                           | `likely_out_of_scope`                      |
| `categorical_assessment` (in ambito)     | `likely_in_scope`                          |
| `escalate_to_advisor`                    | `ambiguous` (sempre — invariante)          |
| `qualitative_signal_only`                | caso per caso, con commento giustificativo |

Invariante rinforzata (zod + assert engine): `outcome == escalate_to_advisor` ⇒ `verdict_outcome == ambiguous`.

`qualifica` (emessa) e `qualifica_inferita` (solo segnalata) sono mutuamente esclusive: mai entrambe sulla stessa voce.

### Blocco `overrides` (gate → regime)

```yaml
overrides:
  - trigger: string                 # es. "psnc == yes", "dora == yes", "cloud_pa == yes"
    override_kind: category_override | massive_disapplication | model_substitution
    reference: "regimes/<x>.yaml"    # psnc.yaml | dora.yaml | cloud_pa.yaml
    reasoning_trace: string
    citations: [citation_id, ...]
```

Per le voci instradate a un regime, l'esito è dichiarato nel `meta` del regime (`assessment_mode: escalate_to_advisor`, `verdict_outcome: ambiguous`, ADR 0009) e copiato dall'engine attraverso il `reference` dell'override, **non** un `verdict_outcome` sul settore; il `meta` popola anche un elemento dell'array `Verdict.regimeRouting` (ordine = ordine degli override nel file di settore; `residual_nis_obligation: null` = non attestato, non "nessuno"). I regimi in `regimes/*.yaml` hanno `status: routing_only_v0_1`: instradano, non risolvono nel merito.

### Trigger dei signal

La **definizione** del signal (reasoning_trace + citazioni) sta in `packages/corpus/corpus/signals/`. Nel file settore vive solo il **trigger**.

```yaml
cumulative_signals:                 # es. l90_cumulo
  - signal_id: string               # riferisce signals/signals__cumulative_regimes.yaml
    applies_to_categories: [...]     # es. [a, b, c]
cross_sector_signals: [...]         # riferisce signals/signals__cross_sector.yaml
multi_identity_intra_sector: [...]  # più identità nello stesso settore
```

### Blocco `out_of_scope_mvp`

Casi non modellati nel MVP. Ciascuno con esito dichiarato.

```yaml
out_of_scope_mvp:
  - id: string
    handling: string                # come il tool tratta il caso in v0.1.0
    verdict_outcome: likely_in_scope | likely_out_of_scope | ambiguous
    scope_evolution_note: string    # italiano, NON categorico — cosa succederà in v0.2+
```

### Blocchi speciali

```yaml
copy_constraints:                   # vincoli di naming/copy specifici del settore
  - id: string                      # es. "cer_cacer_disambiguation"
    rule_it: string                 # il vincolo, in italiano

allegato_iv_channel:                # solo PA — canale Allegato IV
  outcome: qualitative_signal_only
  verdict_outcome: ambiguous
  profili: [...]                    # es. tpl, istituto_ricerca, attivita_culturale, societa_inhouse
  citations: [citation_id, ...]

rientro_prerequisite:               # es. PA: appartenenza a ISTAT S13
  - id: string                      # es. "istat_s13"
    citations: [citation_id, ...]
```

## File `wizard/wizard__<id>.yaml`

`wizard__disambiguation.yaml` contiene i **3 gate comuni** (`execution_order: pre_standard_identification`):

```yaml
gates:
  - id: psnc | dora | cloud_pa
    question_it: string             # domanda binaria user-facing
    on_yes:
      effect: category_override | massive_disapplication | model_substitution
      reference: "regimes/<x>.yaml"
    citations: [citation_id, ...]

multi_regime_intersection:          # es. psnc AND cloud_pa
  - trigger: string
    outcome: escalate_to_advisor
    verdict_outcome: ambiguous       # per l'invariante
    citations: [citation_id, ...]
```

I file `wizard__<settore>.yaml` contengono le domande specifiche del settore (ID in snake_case, riusati come `condition` nelle `qualification_rules`).

## Regole di validazione (zod, `corpus:validate`)

1. **Schema strutturale**: ogni file matcha lo schema zod. CI fallisce su violazione.
2. **`verdict_outcome` obbligatorio**: ogni voce con esito (`qualification_rules`, `out_of_scope_mvp`, `multi_regime_intersection`, `allegato_iv_channel`) deve dichiararlo.
3. **Invariante escalate→ambiguous**: `outcome == escalate_to_advisor` ⇒ `verdict_outcome == ambiguous`.
4. **Citation ID ben formati**: `snake_case`; le referenze devono esistere nella KB (attestazione verificata).
5. **Referenze signal esistenti**: ogni `signal_id` referenziato deve avere definizione in `signals/`.
6. **`size_blind` coerente**: se `size_blind: true`, nessuna `qualification_rule` condiziona sulla dimensione.
7. **`qualifica` xor `qualifica_inferita`**: mai entrambe sulla stessa regola.

## Convenzioni di stile

- **ID in `snake_case`**: `energia_elettrica`, `gestore_punti_ricarica`. Mai kebab-case, mai CamelCase.
- **Chiavi di schema in inglese** (`meta`, `tipologie`, `qualification_rules`, `overrides`, `citations`); **testo user-facing in italiano** (`label_it`, `reasoning_trace`, `scoping_note_it`, `scope_evolution_note`).
- **Citazioni**: liste di **citation ID**, mai wikilink né prosa. Ogni ID è un'attestazione in un nodo KB. Mai inventare un ID → in dubbio, open point.
- **Copy non categorico** in ogni campo user-facing (`reasoning_trace`, `scope_evolution_note`, ecc.): formulazione probabilistica, verbi prescrittivi vietati.
- **Filename** con prefisso di cartella (`sectors__`, `wizard__`, `signals__`) per evitare collisioni.
