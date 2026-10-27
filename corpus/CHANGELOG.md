# Changelog — Corpus NIS2 Tool

Tutte le modifiche rilevanti al corpus normativo (wizard, sectors, signals, regimes, fixtures) sono registrate in questo file.

Formato ispirato a [Keep a Changelog](https://keepachangelog.com/it/1.1.0/); versioning [SemVer](https://semver.org/lang/it/) applicato al **contenuto del corpus** (non al codice dell'engine):
- **major**: cambio di schema incompatibile (il contratto dati letto dall'engine cambia in modo non retro-compatibile).
- **minor**: cambia il questionario o cambiano le regole (incluse le modifiche che alterano un esito atteso delle fixture).
- **patch**: correzioni di attestazione o di copy senza effetto sugli esiti.

Ogni bump ha una voce in questo file; le fixture dichiarano `corpus_version` e si riallineano a ogni minor/major.

## [0.3.1] — 2026-10-28 — Chiusura dei punti aperti di corpus 0.3.0 (S1.1)

Patch: nessun esito atteso cambia (`assessment_mode` e `verdict_outcome` di E01–E15 invariati), nessuna domanda nuova, nessuna regola nuova. Cambiano citazioni (allineamento a un regime), copy dei `reasoning_trace`, un ID di follow-up già esistente come struttura, la quotatura di `yes`/`no` (stessi valori con il parser YAML 1.2) e la forma di `regime_routing` nelle fixture (ADR 0009, amendment).

### Changed
- **`sectors/sectors__cloud_computing.yaml`** — override PSNC: `citations` da `[det_acn_155238_2026_art_5]` a `[det_acn_155238_2026_art_5, dl_105_2019_art_1_c_2_bis]`, come `regimes/psnc.yaml` (invariante citations override/regime, ADR 0009). Unico disallineamento trovato sui 6 override.
- **`sectors/sectors__cloud_computing.yaml`, `sectors/sectors__energia_elettrica.yaml`** — `reasoning_trace` delle 6 `qualification_rules` dimensionali: rimosse le soglie numeriche ("50-249 dipendenti o 10-50 M€", ">250 dipendenti o >50 M€"), che non seguivano la regola AMB.DI.1. Nuova apertura: "Dimensione dichiarata: {Micro o piccola impresa | Media impresa | Grande impresa}. Classificazione secondo FAQ ACN AMB.DI.1 e Racc. UE 2003/361."; restano le frasi senza soglie (qualifica, A1.1.a.4, A1.2). `citations` invariate. La PA non ha trace dimensionale (art. 3 c. 6).
- **`wizard/wizard__cloud_computing.yaml`** — il `conditional_followup` di `pertinenza_pubblica_cloud` riceve `id: tipo_partecipazione_pubblica`, come in energia; ID di opzione già coincidenti (`ente_pubblico`, `capitale_prevalente`, `capitale_minoritario`). Nessuna fixture lo usa.
- **`yes`/`no` quotati** come valori e ID di opzione in corpus e fixture: `wizard__energia_elettrica.yaml` (`registrato_pun`: opzione `id: "no"`, `answer: "no"`), `sectors__pubblica_amministrazione.yaml` (`l90_overlap: "yes"` ×2), input delle 15 fixture.
- **`fixtures/*`** — `regime_routing` diventa una lista (ADR 0009, amendment 2026-10-28): un elemento in E05, E06, E07; due in E08 (`cloud_pa`, `psnc`, ordine degli override di `sectors__cloud_computing.yaml`); `[]` nelle altre 11. `residual_nis_obligation: null` documentato come "non attestato nel corpus", non "nessuno". `corpus_version` → 0.3.1.

### Added
- **`docs/decisions/0009-*.md`** — sezione "Amendment 2026-10-28": `Verdict.regimeRouting: RegimeRouting[]` (vuoto se nessun routing, ordine = ordine degli override nel file di settore), semantica di `null`, alternativa scartata (routing singolo con priorità: precedenza tra regimi non attestata).
- **`scripts/validate-corpus.mjs`** — controllo statico interim (solo js-yaml v4): parsing, `verdict_outcome` dichiarato, invariante escalate → ambiguous, citations override = regime, ID di ogni domanda e opzione, riferimenti a file, coerenza delle fixture (versione, input, signal, `regime_routing` in ordine di file), lint dei booleani YAML 1.1 non quotati (`yes`/`no`/`on`/`off`/`y`/`n`). Diventa `corpus:validate` in S2.

### Notes
- Verifica di lettura (AMB.DI.1, concept Size-cap rule, testo della FAQ): la fascia "grande" parte da 250 effettivi ("almeno 250"), la media è "meno di 250". Le etichette della domanda `dimension` sono coerenti: nessuna correzione.
- Restano nelle `citations` delle regole dimensionali le asimmetrie già presenti (per esempio la micro/piccola di energia non cita `faq_amb_di_1`; media e grande non citano `racc_ue_2003_361`), anche se il nuovo trace nomina entrambe le fonti. Non corrette: richiesta "citations invariate"; segnalate in `docs/STATUS.md`.

## [0.3.0] — 2026-10-27 — Patch coordinata pre-engine: domanda dimension, override di regime come escalation (ADR 0009), riferimenti a file, citazioni DORA

Minor: cambia il questionario (nuova domanda `dimension`, ID del follow-up di pertinenza pubblica nel settore energia) e cambia l'esito atteso di E05, E06, E07. Chiude le voci del punto aperto 11 di `docs/STATUS.md` che bloccavano l'avvio dell'engine.

### Added
- **`wizard/wizard__disambiguation.yaml`** — nuova sezione `standard_identification_questions` con la domanda `dimension` (fase `standard_identification`, `single_select`, opzioni `micro_or_piccola` / `media` / `grande`). Saltata per la PA (`visible_if: "sector != pubblica_amministrazione"`, `visibility_citations: [dlgs_138_2024_art_3_c_6]`): size-blind, art. 3 c. 6 D.Lgs. 138/2024 verificato sul testo ufficiale. Testo di aiuto con la tabella effettivi/fatturato/bilancio, la regola "effettivi sempre, più almeno uno tra fatturato e bilancio" e la regola di salita, da FAQ `AMB.DI.1` e dal concept Size-cap rule. `citations: [faq_amb_di_1, racc_ue_2003_361]` (ID già in uso nel corpus). La domanda era referenziata da `qualification_rules` e fixture ma non esisteva nel wizard.
- **`regimes/{psnc,dora,cloud_pa}.yaml`** — in `meta`: `assessment_mode: escalate_to_advisor`, `verdict_outcome: ambiguous` (ADR 0009). L'engine li copia nel Verdict attraverso il `reference` dell'override; il `meta` del regime popola il nuovo campo `Verdict.regimeRouting` (`regimeId`, `routingEffect`, `residualNisObligation?`, `exceptionsCatalogEntry`).
- **`docs/decisions/0009-override-regime-escalate-routing.md`** — ADR 0009.

### Changed
- **`fixtures/E05`, `E06`, `E07`** — `expected` passa da `assessment_mode: <routing effect>` + `verdict_outcome: {derived_from: override_routing}` (fuori dal vocabolario del Verdict) a `assessment_mode: escalate_to_advisor`, `verdict_outcome: ambiguous`, più il blocco `regime_routing` (`regime`, `routing_effect`, `residual_nis_obligation`, `exceptions_catalog_entry`) con i valori del `meta` del regime. `residual_nis_obligation: null` per PSNC e Cloud PA (non dichiarato nel loro `meta`). Citations invariate. Motivazione: ADR 0009.
- **`wizard/wizard__energia_elettrica.yaml`** — il `conditional_followup` di `pertinenza_pubblica_energia` riceve `id: tipo_partecipazione_pubblica`, l'ID già usato come input da E14.
- **`sectors/sectors__cloud_computing.yaml`, `sectors/sectors__energia_elettrica.yaml`** — override DORA: `citations` da `[dlgs_138_2024_art_3_c_14, det_piattaforma_127437_2026_art_20]` (articolo) a quelle di `regimes/dora.yaml` (commi verificati in 0.2.1: `_art_7_c_6`, `_art_16_c_13`, `_art_20_c_6`). Regola: le citations di un override coincidono con quelle del regime referenziato. `reasoning_trace` cloud: "art. 20" → "art. 20 c. 6".
- **Header dei regimi** — "STATUS v0.1.0" → "STATUS: routing-only fino alla release v0.1.0 del tool; risoluzione nel merito in v0.2" (la versione 0.1.0 è del tool, non del corpus).
- **Riferimenti a file** — normalizzati ai nomi reali con prefisso (`sectors__`, `wizard__`, `signals__`): `meta.sector_data` dei 3 wizard, header dei wizard e dei settori, commenti di rinvio ai signal in `sectors__energia_elettrica.yaml` e `sectors__pubblica_amministrazione.yaml`, `signals__cross_sector.yaml`, `corpus_ref` delle 15 fixture. In E14 il riferimento informale `wizard.pertinenza_pubblica_energia[...]` diventa `wizard/wizard__energia_elettrica.yaml#pertinenza_pubblica_energia.tipo_partecipazione_pubblica[capitale_prevalente]`.
- **Intestazione di questo file** — definizione di semver allineata a CLAUDE.md.
- **`fixtures/*`** — `corpus_version` → 0.3.0 su tutte le 15 fixture; `fixtures/README.md` aggiornato.

### Notes
- Attestazioni: art. 3 c. 6 D.Lgs. 138/2024 sul PDF ufficiale `raw/articles/Decreto NIS2.pdf` e sul nodo `[[sources/FAQ NIS - Settori, sottosettori e tipologie di soggetto]]` (sezione Allegato III); il nodo `[[sources/D.Lgs. 138-2024 (Decreto NIS)]]` non attesta il comma (lacuna KB segnalata a monte). Soglie e regole della dimensione: `[[sources/FAQ NIS - Ambito]]` `AMB.DI.1`, `[[concepts/Size-cap rule]]`. Commi DORA: `[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]`.
- Il confine 50 M€ / 43 M€ resta ambiguo nella FAQ `AMB.DI.1` (definizione "non superiore a" contro esempio "almeno"): le etichette delle opzioni seguono la definizione ("fino a" / "oltre"). Punto aperto 9 di `docs/STATUS.md`.
- **Backlog v0.2**: (1) calcolo automatico della categoria dimensionale a partire dai tre numeri (effettivi, fatturato, bilancio), incluso il consolidamento di gruppo; (2) risoluzione nel merito dei regimi PSNC, DORA, Cloud PA, che con ADR 0009 richiede di modificare solo i file `regimes/*.yaml`.

## [0.2.1] — 2026-07-02 — Patch di attestazione: DIV-P1 chiusa (esoneri DORA)

Patch di sole citazioni/testo (nessuna modifica di schema). Chiude la divergenza **DIV-P1** dopo la riconciliazione degli esoneri DORA sul testo ufficiale della Det. ACN 127437/2026 (PDF firmato `detacn_piattaformanis_251218-v9_signed`, ingerito e verificato verbatim).

### Changed
- **`regimes/dora.yaml`** — `open_points` svuotato (`[]`); intestazione APERTO (DIV-P1) → CHIUSO. `citations` passate da granularità di articolo (`det_piattaforma_127437_2026_art_20`) a granularità di comma verificata: `det_piattaforma_127437_2026_art_7_c_6` (esonero referente CSIRT), `_art_16_c_13` (esonero da c. 3 lett. b) e art. 17), `_art_20_c_6` (esonero elencazione/categorizzazione). Ogni comma reca "è fatta salva l'adesione a tali previsioni su base volontaria".
- **`fixtures/E06_dora_massive_disapplication.yaml`** — `open_points: [DIV-P1]` → `[]`; `corpus_version` 0.2.0 → 0.2.1; `citations` allineate ai commi verificati; descrizione aggiornata.

### Notes
- Retag doppio (ADR 0006): i callout DIV-P1 nei nodi KB `[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]` e `[[concepts/Coordinamento DORA-NIS]]` sono stati convertiti da `> [!warning]` APERTO a `> [!note]` verificato, con lo stesso set di commi. Il `source_path` del nodo piattaforma è stato agganciato al PDF firmato reale.
- Contesto documentale e checklist ingest estesa in `docs/decisions/0007-*.md`.

## [0.2.0] — 2026-07-02 — Patch coordinato KB↔corpus

Introduzione del vocabolario `verdict_outcome`, della domanda condizionale PUN, dei file di routing dei regimi e del set di fixtures golden. Modifiche allineate con le attestazioni normative della KB (vedi `docs/decisions/`).

### Added
- **B1** — Campo `verdict_outcome` (`likely_in_scope` | `likely_out_of_scope` | `ambiguous`) su tutte le regole che dichiarano un esito: `qualification_rules`, `out_of_scope_mvp`, `multi_regime_intersection`, `allegato_iv_channel`. L'engine copia il valore senza inferenza. Vincoli fissi: `out_of_scope`→`likely_out_of_scope`; `categorical_assessment` in-scope→`likely_in_scope`; `escalate_to_advisor`→`ambiguous`; `qualitative_signal_only` caso per caso (vedi ADR DIV-S2).
- **B2** — Domanda condizionale `registrato_pun` in `wizard/wizard__energia_elettrica.yaml`, visibile solo se la tipologia elettrica (principale o ulteriore) è `gestore_punti_ricarica`. Mapping esiti: `si`→`categorical_assessment`/`likely_in_scope` (provvisorio); `no`→`qualitative_signal_only`/`likely_out_of_scope` (A1.1.a.3 "non rientra automaticamente", non esclusione categoriale); `non_so`→`qualitative_signal_only`/`ambiguous` (vedi ADR DIV-C1).
- **B4** — File di routing dei regimi `regimes/psnc.yaml`, `regimes/dora.yaml`, `regimes/cloud_pa.yaml` (`status: routing_only_v0_1`). Non contengono logica di categorizzazione: dichiarano `routing_effect` e la voce del catalogo eccezioni. `dora.yaml` porta `open_points: [DIV-P1]` (elenco esoneri DORA da riconciliare sul testo ufficiale).
- **Fixtures** — 15 scenari golden congelati in `fixtures/` (E01–E15), destinazione futura `packages/engine/tests/fixtures/`. Ogni file: `corpus_version`, input serializzati con ID reali del wizard, `expected` (`assessment_mode` + `verdict_outcome`), citation ID del corpus.

### Changed
- **B3** — Patch di citazioni:
  - `dl_105_2019_art_1` → `dl_105_2019_art_1_c_2_bis` (granularità di comma attestata in KB `[[concepts/Soggetti PSNC-NIS]]`), in `wizard__disambiguation.yaml` e `sectors__energia_elettrica.yaml`.
  - Giurisdizione/stabilimento principale cloud: `dlgs_138_2024_art_5` come riferimento primario (recepimento italiano, art. 5 c. 2), `nis2_art_26` come riferimento unionale secondario; `verdict_outcome: ambiguous`.
- **B5** — Rinominato il signal `safeguard_clause_signal` → `safeguard_dimensional_dpcm_221` (id, message_template, copy): "clausola di salvaguardia dimensionale" (DPCM 221/2024), da non confondere con l'esclusione di sicurezza nazionale NIS2 art. 2(7)-(8). Mai la sola parola "salvaguardia" in ID/label/copy.
- **B6** — Riscritto il copy di `cer_signal` e di `out_of_scope_mvp.cer_dlgs_134_2024`: mai l'acronimo nudo "CER"; resa esplicita la disambiguazione tra soggetti critici (D.Lgs. 134/2024, Critical Entities Resilience) e comunità energetiche rinnovabili (CACER). Aggiunto blocco `copy_constraints` (`cer_cacer_disambiguation`) in `sectors__energia_elettrica.yaml`.

### Notes
- Le decisioni di modellazione sono documentate in `docs/decisions/` (ADR DIV-S1, DIV-S2, DIV-C1, CER/CACER, Dir 2019/944, cross-walk retag).
- **APERTO (DIV-P1)**: l'elenco puntuale degli esoneri DORA (art. 7 c. 6, art. 16 c. 13, art. 20 c. 6) resta da riconciliare sul testo ufficiale prima della codifica con granularità di comma.

## [0.1.0] — 2026-07-02 — Stato pre-patch (baseline)

Prima versione tracciata del corpus. Stato di fatto al momento dell'introduzione di `VERSION`/`CHANGELOG`, prima del patch coordinato KB↔corpus.

### Contenuto
- 3 settori pilota MVP: `cloud_computing`, `energia_elettrica`, `pubblica_amministrazione`.
- Blocco comune di disambiguazione di regime a 3 domande binarie (`psnc`, `dora`, `cloud_pa`) in `wizard/wizard__disambiguation.yaml`.
- `qualification_rules` per settore in `sectors/sectors__*.yaml`.
- Signal di cumulo con regimi paralleli (`l90_cumulo`) e placeholder `safeguard_clause_signal`, `cer_signal` in `signals/signals__cumulative_regimes.yaml`.
- Signal cross-settore in `signals/signals__cross_sector.yaml`.

### Lacune note (rispetto al design a 5 livelli)
- Mancano le cartelle `regimes/`, `rules/`, `categorization/`, `docs/`, `fixtures/`.
- I regimi (`psnc`, `dora`, `cloud_pa`) sono referenziati da `reference: regimes/*.yaml` ma i file non esistono ancora.
