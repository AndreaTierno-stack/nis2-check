# ADR 0014 — Regimi instradati in v0.1: PSNC (cloud, energia, PA) e Cloud PA (solo PA)

- **Stato:** accettato
- **Data:** 2026-10-28
- **Ambito:** corpus (override dei settori, domande comuni, regimi, catalogo), schema
- **Versione corpus:** 0.6.0
- **Supera:** ADR 0001, punto 1 ("tre soli gate di instradamento") e punto 3 (DORA
  come lex specialis senza conflitto), per la parte su DORA e Cloud PA
- **Base:** `docs/verifications/2026-10-28-cloud-energia-dora.md`, punti 3 e 5;
  KB DEC-008 (2026-10-28)

## Contesto

Fino al corpus 0.5.0 le tre domande comuni `psnc`, `dora` e `cloud_pa` erano gate:
con "sì" l'override del settore instradava al regime, e l'esito era l'escalation
dichiarata nel `meta` del regime (ADR 0009). La verifica di lettura del 2026-10-28 ha
trovato che due dei tre instradamenti si reggevano su un'inferenza:

- **Cloud PA sul fornitore.** L'art. 4 Det. ACN 155238/2026 si applica ai "soggetti
  NIS che hanno svolto la classificazione dei dati e dei servizi di cui all'articolo 3"
  del Decreto Direttoriale ACN 21007/24. Secondo la FAQ CAT.8 quella classificazione la
  svolgono le pubbliche amministrazioni sui propri dati e servizi. Secondo la FAQ A1.8.2
  il fornitore qualificato ai sensi del Regolamento Cloud rientra come fornitore di
  servizi di cloud computing (Allegato I p. 8, terzo allinea), se supera i massimali
  delle piccole imprese. L'override `cloud_pa == yes` del settore cloud non era coperto
  dalle sue citazioni.
- **DORA su cloud ed energia.** L'art. 3 c. 14 D.Lgs. 138/2024 esclude l'art. 17 e i
  Capi IV e V per i soli soggetti essenziali o importanti dei **settori 3 e 4**
  dell'Allegato I (settore bancario, infrastrutture dei mercati finanziari). Cloud
  (settore 8) ed energia (settore 1) non rientrano mai nel c. 14. Gli esoneri della Det.
  ACN 127437/2026 (art. 7 c. 6, art. 16 c. 13, art. 20 c. 6) valgono per le entità
  finanziarie DORA che rientrano nell'ambito NIS, ma riguardano solo adempimenti di
  piattaforma. Il testo "disapplicato il regime NIS salvo l'art. 7 c. 1" degli override
  DORA era un'estensione del c. 14.

## Decisione

1. **Regimi instradati in v0.1.**
   - **PSNC**: cloud, energia, PA. Trigger: la domanda comune `psnc`. Il settore PA
     riceve l'override PSNC sul regime esistente (`regimes/psnc.yaml`).
   - **Cloud PA**: solo PA. Trigger: la domanda `classificazione_cloud_pa` del wizard
     PA (corpus 0.5.0, C5), che riprende la condizione dell'art. 4.
   - **DORA**: nessun settore del corpus. `regimes/dora.yaml` resta dichiarato, con
     `referenced_by: []`, nota "riservato ai settori 3-4", `residual_nis_obligation:
     null` e `open_points` compilati.
2. **Domande comuni `dora` e `cloud_pa` come segnali.** Restano nel blocco comune; con
   "sì" aggiungono avvisi del catalogo eccezioni (`on_yes.notices`, campo nuovo dello
   schema), e l'esito segue le regole del settore:
   - `dora` → `dora_entita_finanziaria_fuori_settori_3_4` (esoneri di piattaforma;
     Capi IV e V applicabili secondo il testo del c. 14) e
     `dora_soggetti_esentati_art_3_c_15`;
   - `cloud_pa` → `cloud_pa_fornitore_qualificato_a1_8_2` (FAQ A1.8.2, FAQ CAT.8).
   La domanda `dora` porta come esempio due tipologie dei settori 3-4 (ente creditizio,
   gestore di una sede di negoziazione) al posto di "impresa di investimento"; la
   domanda `cloud_pa` chiede di servizi "qualificati" (non "classificati") ai sensi del
   Regolamento Cloud.
3. **`cloud_pa` fuori dal percorso PA.** Il wizard PA dichiara
   `excluded_common_questions: [cloud_pa]` (campo nuovo): la domanda non è posta alla
   PA, e nessuna regola, trigger o fixture PA può leggerla (`E_RULE_INPUT`,
   `E_FIXTURE_INPUT`). Per la PA conta `classificazione_cloud_pa`.
4. **Intersezione PSNC + Cloud PA.** Esce dal blocco comune e passa nel wizard PA, con
   trigger `psnc == yes AND classificazione_cloud_pa == yes`: resta l'escalation
   (precedenza non attestata, STATUS 6) e riporta l'avviso
   `psnc_cloud_pa_precedenza_non_attestata`. `regimeRouting` elenca i due regimi
   nell'ordine degli override del file di settore: ordine posizionale, non precedenza
   (ADR 0009, amendment).
5. **Catalogo.** `dora_massive_disapplication` (voce del `meta` del regime) passa a
   `non_gestito`: descrive il c. 14, che riguarda settori non valutati.
   `cloud_pa_model_substitution` resta `gestito`, riferito alla PA.

## Effetto sugli esiti (fixture)

| Fixture | Prima (0.5.0) | Dopo (0.6.0) |
|---|---|---|
| E05 cloud grande, `cloud_pa` sì | `escalate_to_advisor` / `ambiguous`, routing [cloud_pa] | `categorical_assessment` / `likely_in_scope`, essenziale, avviso A1.8.2 |
| E06 cloud grande, `dora` sì | `escalate_to_advisor` / `ambiguous`, routing [dora] | `categorical_assessment` / `likely_in_scope`, essenziale, avvisi DORA |
| E08 cloud grande, `psnc` e `cloud_pa` sì | `escalate_to_advisor` / `ambiguous`, routing [cloud_pa, psnc] | `escalate_to_advisor` / `ambiguous`, routing [psnc] |

## Alternative scartate

- **Tenere l'escalation togliendo solo la citazione del c. 14.** Lascia un esito
  `ambiguous` per un soggetto che le fonti attestate collocano in ambito secondo le
  regole del settore; l'escalation resterebbe senza base.
- **Togliere le domande `dora` e `cloud_pa`.** Perde l'avviso per i casi in cui la
  risposta è pertinente (entità DORA in un altro settore, fornitore qualificato), che
  le fonti trattano in modo specifico.
- **Riformulare `cloud_pa` come domanda sulla classificazione fatta dal soggetto
  stesso.** Nei settori cloud ed energia il soggetto non è una PA; per la PA la domanda
  esiste già (`classificazione_cloud_pa`).

## Conseguenze

- L'engine (S3) raccoglie gli avvisi anche da `on_yes.notices` delle domande con
  risposta "sì", oltre che dalle regole che matchano.
- Il regime DORA tornerà instradato solo con un settore 3 o 4 nel corpus (fuori scope
  v0.1.0).
- Le fixture E05, E06, E08 cambiano esito atteso e nome; E21-E22 (PA con PSNC) coprono
  l'override PSNC della PA e l'intersezione nel percorso PA.

## Fonti

- `det_acn_155238_2026_art_4`, `faq_cat_8`, `faq_a1_8_2`, `dd_acn_21007_24_art_3`
- `dlgs_138_2024_art_3_c_14`, `dlgs_138_2024_art_3_c_15`, `faq_amb_no_2`,
  `det_piattaforma_127437_2026_art_7_c_6`, `_art_16_c_13`, `_art_20_c_6`
- KB: `[[concepts/Coordinamento DORA-NIS]]`, `[[sources/FAQ NIS - Categorizzazione]]`,
  `[[sources/FAQ NIS - Settori, sottosettori e tipologie di soggetto]]`

## Nota 2026-11-02 (corpus 0.13.0, review avversaria F01)

Gli override PSNC e Cloud PA restano escalation (`ambiguous`), ma i testi dicono che il regime non restringe l'ambito: riguarda la categorizzazione delle attività (artt. 4-5 Det. ACN 155238/2026); per la PA dell'Allegato III il rientro è indipendente dalla dimensione (art. 3 c. 6); lo strumento non formula un esito sul rapporto tra obblighi NIS e PSNC (art. 33 D.Lgs. 138/2024). Riesame per v0.2: PSNC e Cloud PA come avvisi (F01, strada b).
