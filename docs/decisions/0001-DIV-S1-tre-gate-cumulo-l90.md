# ADR 0001 — DIV-S1: Tre gate di scoping + cumulo L. 90 come signal additivo

- **Stato:** accettato
- **Data:** 2026-07-02
- **Ambito:** decision engine / architettura del flusso
- **Codice divergenza:** DIV-S1

## Contesto

Il flusso di valutazione attraversa tre "gate" in sequenza (`flow_order`):
`disambiguation` → `sector_specific` → `standard_identification`. I tre regimi
della disambiguazione (PSNC, DORA, Cloud PA) alterano il flusso in modi diversi
(override della categoria, disapplicazione massiva, sostituzione di modello),
mentre l'appartenenza alla Legge 90/2024 è un fenomeno **cumulativo**: si aggiunge
al regime NIS senza sostituirlo né instradare il flusso altrove.

La domanda architetturale: la L. 90 va trattata come un quarto gate di
instradamento oppure come un signal additivo?

## Decisione

1. **Tre soli gate di instradamento.** Solo PSNC, DORA e Cloud PA alterano il
   `flow_order`. Sono modellati come `overrides` di settore che rinviano ai file
   `regimes/*.yaml` (routing_only_v0_1).
2. **L. 90 = signal cumulativo, mai gate.** `l90_cumulo` è un
   `kind: cumulative_regime` definito in `signals/signals__cumulative_regimes.yaml`.
   Non produce un outcome del decision engine: aggiunge una voce al Verdict.
   Si attiva via `activates_signals` (pertinenza pubblica in cloud/energia) o via
   `applies_to_categories: [a, b, c]` (PA). La categoria PA `d` **non** attiva
   L. 90 (opzione B con rigore: la categoria d non è nell'elenco L. 90 art. 1 c. 1).
3. **Precedenza tra gate non risolta.** Quando due gate sono simultaneamente
   positivi e le fonti non esplicitano la precedenza (PSNC + Cloud PA), l'engine
   emette `escalate_to_advisor` invece di tentare la risoluzione (vedi
   `multi_regime_intersection`). DORA non entra nel conflitto: disapplica
   massivamente e prevale come lex specialis.

## Conseguenze

- Il cumulo L. 90 è visibile su scenari in-scope senza deviare il verdetto
  (fixtures E09, E10, E11, E14).
- L'intersezione PSNC+Cloud PA è deterministica verso `escalate_to_advisor`
  (fixture E08), non un tentativo di ordinamento non attestato.

## Fonti

- `l90_2024_art_1_c_1`, `det_piattaforma_127437_2026_art_4_c_8` (definizione signal)
- `dl_105_2019_art_1_c_2_bis`, `det_acn_155238_2026_art_5` (PSNC)
- KB: `[[concepts/Soggetti PSNC-NIS]]`, `[[concepts/Coordinamento DORA-NIS]]`
