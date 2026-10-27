---
name: nis2-sector-author
description: Use this skill whenever the user wants to add, modify, or review a sector, sub-typology (tipologia/categoria), qualification rule, regime override, cross-sector/cumulative signal, or copy constraint in the NIS2 Tool corpus YAML. Triggers include any mention of "settore", "sottosettore", "tipologia", "allegato", "qualification_rule", "override", "signal", "size-blind", "verdict_outcome", or requests to model normative content in the corpus. Use this skill even if the user does not explicitly say "skill" — every change to the corpus knowledge model must go through it to guarantee schema validity, verified-granularity citations, verdict_outcome correctness, and non-categorical copy. Do NOT use this skill for recording an ACN regulatory update that bumps the corpus version (use nis2-corpus-update) or for public-facing content like LinkedIn posts/README (use nis2-content-author).
---

# NIS2 Sector Author

Skill per modellare settori, tipologie, regole di qualificazione, override di regime e signal del **corpus reale del NIS2 Tool** (`packages/corpus/corpus/`), garantendo schema valido, `verdict_outcome` dichiarato, citazioni a granularità verificata e copy non categorico.

> Fonte di verità: il corpus reale in `packages/corpus/corpus/` (v0.2.1+) e i vincoli in `CLAUDE.md`. Prima di scrivere, **leggi un file esistente dello stesso tipo** — non ricostruire lo schema a memoria. Lo schema canonico distillato è in `references/yaml-schema.md`; un esempio commentato reale è in `references/examples.md`.

## Quando si attiva

- Aggiunta/modifica di un settore in `packages/corpus/corpus/sectors/sectors__<id>.yaml`.
- Aggiunta/modifica delle domande di settore in `packages/corpus/corpus/wizard/wizard__<id>.yaml`.
- Aggiunta/modifica di `qualification_rules`, `overrides`, `out_of_scope_mvp`, `copy_constraints`, `allegato_iv_channel`.
- Definizione di signal in `packages/corpus/corpus/signals/signals__cumulative_regimes.yaml` o `signals__cross_sector.yaml`.
- Correzione di citation ID o di reasoning_trace.

## Struttura reale del corpus (NON la vecchia `data/nis2-corpus/`)

```
packages/corpus/corpus/
  sectors/    sectors__cloud_computing.yaml · sectors__energia_elettrica.yaml · sectors__pubblica_amministrazione.yaml
  wizard/     wizard__disambiguation.yaml (3 gate comuni) · wizard__<settore>.yaml
  signals/    signals__cumulative_regimes.yaml (cumulo regimi) · signals__cross_sector.yaml (identità multiple)
  regimes/    psnc.yaml · dora.yaml · cloud_pa.yaml (status: routing_only_v0_1)
  VERSION     (plain text, es. "0.2.1")
  CHANGELOG.md
```

Convenzione filename: prefisso di cartella (`sectors__`, `wizard__`, `signals__`) per evitare collisioni. ID interni in `snake_case` (es. `energia_elettrica`, `gestore_punti_ricarica`), **non** kebab-case. Chiavi di schema in inglese (`meta`, `tipologie`, `qualification_rules`, `overrides`, `citations`); testo user-facing in italiano nei campi `*_it` e `reasoning_trace`.

## Flusso decisionale (per collocare correttamente una regola)

`disambiguation` (3 gate comuni) → `sector_specific` → `standard_identification` (size-cap; la PA lo salta, size-blind ex art. 3 c. 6).

I **3 gate** (`wizard__disambiguation.yaml`, `execution_order: pre_standard_identification`) alterano il flusso: `psnc` → `category_override`; `dora` → `massive_disapplication`; `cloud_pa` → `model_substitution`. La **L. 90/2024 NON è un gate**: è il signal cumulativo `l90_cumulo` (si aggiunge al verdetto, non instrada — ADR 0001).

## Vincoli non negoziabili (da CLAUDE.md v2)

### 1. `verdict_outcome` si dichiara sempre, mai si inferisce
Ogni voce che produce un esito (`qualification_rules`, `out_of_scope_mvp`, `multi_regime_intersection`, `allegato_iv_channel`) **deve** dichiarare `verdict_outcome`. L'engine lo copia; la validazione zod blocca in build una regola priva del campo. Mapping fisso (rispettalo o è un bug):

| `outcome` / `assessment_mode`             | `verdict_outcome`                          |
|-------------------------------------------|--------------------------------------------|
| `out_of_scope`                            | `likely_out_of_scope`                      |
| `categorical_assessment` (in ambito)      | `likely_in_scope`                          |
| `escalate_to_advisor`                     | `ambiguous` (sempre — invariante)          |
| `qualitative_signal_only`                 | caso per caso, con commento giustificativo |

Invariante rinforzata (schema zod + assert engine): `assessment_mode == escalate_to_advisor` ⇒ `verdict_outcome == ambiguous`. Per le voci instradate a un regime (override), l'esito è dichiarato nel `meta` del regime (`escalate_to_advisor` / `ambiguous`, ADR 0009) e copiato attraverso il `reference`, non un `verdict_outcome` sul settore. Le `citations` di un override coincidono con quelle del regime referenziato.

### 2. Citazioni solo a granularità verificata
Ogni `citations: [...]` è una lista di **citation ID** (`snake_case`), non wikilink, non prosa. Ogni ID corrisponde a un'attestazione nel nodo KB pertinente (articolo, comma, protocollo, codice FAQ). Convenzioni osservate nel corpus reale:
- Decreto: `dlgs_138_2024_art_3_c_14`, `dlgs_138_2024_allegato_III`, `dlgs_138_2024_art_3_c_6`, `dlgs_138_2024_art_6`.
- Determinazioni ACN a granularità di comma: `det_acn_379907_2025`, `det_piattaforma_127437_2026_art_7_c_6`, `det_acn_155238_2026_art_5`.
- FAQ ACN per codice: `faq_a1_1_a_1`, `faq_settori_sottosettori`, `faq_amb_di_1`.
- Fonti UE: `reg_ue_2022_2554`, `dir_ue_2019_944`, `racc_ue_2003_361`.

**Mai inventare un ID.** Se il comma non è attestato nella KB, non assumerlo: si degrada (granularità di articolo o rimozione) e si apre un **open point** riportato all'autore. In dubbio → open point, mai deduzione. Ordine di prevalenza in caso di conflitto: testo ufficiale > KB > corpus > codice; la discrepanza si segnala sempre a monte.

### 3. Copy non categorico (probabilistico)
Ogni testo che finisce nel verdetto o nell'Explainability (`reasoning_trace`, `scope_evolution_note`, `qualitative_signal_template`, i copy dei signal in `signals/`) usa formulazione probabilistica: *"Sulla base degli input forniti, l'analisi suggerisce che il soggetto rientri… Verifica obbligatoria con consulente qualificato."* Vietate in qualunque campo: "Rientri", "Sei dentro/escluso", "Sei conforme", "Devi", "Sei tenuto a", "Adempi", "Implementa", "report di compliance", "audit", "diagnosi", "certificazione".

### 4. Naming vincolato (ADR 0004, 0005)
- Mai la sola parola **"salvaguardia"**: sempre "salvaguardia dimensionale (DPCM 221/2024)" — ID `safeguard_dimensional_dpcm_221` — distinta dall'esclusione di sicurezza nazionale (NIS2 art. 2 par. 7-8).
- Mai **"CER" nudo** nel settore energia: usa "soggetti critici (D.Lgs. 134/2024)" / "Critical Entities Resilience" per il regime di resilienza fisica, e "comunità energetiche rinnovabili (CACER)" per le comunità energetiche. Vincolo formalizzato nel blocco `copy_constraints` di `sectors__energia_elettrica.yaml`.

## Anatomia di un file settore (schema reale)

Riferimento vivo: `references/yaml-schema.md` + il file reale più vicino al caso. Blocchi principali:

- **`meta`**: `sector_id`, `allegato`, `punto`, `sottosettore_id`, `critical_tier`, `size_cap_applicable`, `size_blind`, `pilot_mvp_v0_1_0`, `citations`, `cumulative_regulations`, `technical_measures_source`, `incident_thresholds_source`, `notification_timeline`.
- **`tipologie`** (settori size-cap) o **`categorie`** (PA): descrittive. `id`, `label_it`, `faq_code`, `citations`, `verdict_strategy` (indicativo), overlap tipici (`typical_psnc_overlap`, `typical_l90_overlap`), eventuale `scoping_note_it`.
- **`qualification_rules`**: la strategia di verdetto vive **qui**, non nelle tipologie. Ogni regola: `condition`, `outcome`, `verdict_outcome`, `qualifica` (se **emessa** — outcome `categorical_assessment`) **oppure** `qualifica_inferita` (se **solo segnalata** — outcome `qualitative_signal_only`), mai entrambe; `reasoning_trace`; `citations`.
- **`overrides`**: `trigger` (es. `psnc == yes`), `override_kind` (`category_override` | `massive_disapplication` | `model_substitution`), `reference: regimes/<x>.yaml`, `reasoning_trace`, `citations`.
- **Signal trigger**: `cumulative_signals` (`l90_cumulo`, con `applies_to_categories`), `cross_sector_signals`, `multi_identity_intra_sector`. La **definizione** del signal (reasoning_trace + citazioni) sta in `signals/`; qui vive solo il **trigger**.
- **`out_of_scope_mvp`**: casi non modellati nel MVP, ciascuno con `handling`, `verdict_outcome`, `scope_evolution_note`.
- **`copy_constraints`** / **`allegato_iv_channel`** (PA): come nei file reali.

`size_blind: true` è **documentale/validazione**, non un branch: se true, nessuna `qualification_rule` deve avere condizioni sulla dimensione (la PA usa `condition: categoria_pa == x`). `verdict_strategy` NON è proprietà della tipologia: è l'`outcome` della regola che matcha.

## Procedura standard

1. **Conferma il modello con l'autore**: settore, allegato/punto, tipologie, classificazione attesa, override di regime pertinenti. Procedi solo dopo conferma (il contenuto normativo del corpus richiede conferma esplicita — CLAUDE.md).
2. **Attesta contro la KB**: per ogni claim, individua il nodo KB (`LLM_Wiki/wiki/`) e il comma/FAQ che lo sostiene. Se manca o è impreciso → open point, non deduzione.
3. **Leggi il file reale più vicino** (`sectors__*.yaml`) per stile e schema. Copia i pattern, non reinventarli.
4. **Componi/aggiorna il YAML** rispettando i 4 vincoli sopra. Ogni voce con esito porta `verdict_outcome` col mapping fisso.
5. **Aggiorna il wizard** (`wizard__<settore>.yaml`) se aggiungi domande; le domande dei 3 gate vivono in `wizard__disambiguation.yaml`.
6. **Fixture verdi**: aggiungi/aggiorna una fixture in `packages/engine/tests/fixtures/` (E01–E15+) che eserciti la nuova regola (input con ID reali del wizard, `expected` con `assessment_mode` + `verdict_outcome`, `citations`). Le fixture devono restare verdi (obbligo gestito da `nis2-corpus-update`).
7. **Versione**: qualunque modifica al contenuto è un bump del corpus → passa a `nis2-corpus-update` per VERSION/CHANGELOG/fixture.
8. **Commit proposto** (inglese, conventional): `corpus: add <sector> qualification rules` con `Refs:` ai riferimenti normativi.

## Cosa NON fare

- Non usare la vecchia struttura `data/nis2-corpus/settori/`, `eccezioni/`, `version.json`, `pnpm validate:corpus` — non esistono nel repo reale (usa `packages/corpus/corpus/`, `VERSION`, `corpus:validate`).
- Non lasciare una voce con esito priva di `verdict_outcome`.
- Non mettere `qualifica` e `qualifica_inferita` sulla stessa voce.
- Non risolvere nel merito i regimi (`regimes/*.yaml` sono `routing_only_v0_1`): instradano soltanto in v0.1.0.
- Non scrivere copy categorico in `reasoning_trace`, `scope_evolution_note` o fixture.
- Non inventare citation ID; in dubbio, open point riportato all'autore.
- Non usare "salvaguardia" nuda né "CER" nudo (vincolo 4).
