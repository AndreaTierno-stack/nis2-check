# ADR 0012 — Catalogo eccezioni come file del corpus

- **Stato:** accettato
- **Data:** 2026-10-28
- **Ambito:** schema del corpus / contratto engine (tipo `Verdict`) / documentazione generata
- **Versione corpus:** 0.5.0
- **Chiude:** punto aperto 14 di `docs/STATUS.md` (in voce di catalogo)

## Contesto

I limiti dichiarati dello strumento (regimi instradati e non risolti, casi segnalati e
non valutati, lacune di attestazione) vivevano in punti diversi: `meta.exceptions_catalog_entry`
dei regimi (id senza un file che li definisse), `out_of_scope_mvp` dei settori, testo
libero nei reasoning trace, `docs/STATUS.md`. Un avviso nel verdetto non aveva un
riferimento verificabile, e una pagina "limitazioni note" andava scritta a mano.

## Decisione

1. **File** `packages/corpus/corpus/exceptions/exceptions__catalog.yaml`, schema zod
   **stretto** (nessuna chiave non dichiarata). Campi per voce:
   - `id`; `status`: `gestito` | `segnalato` | `non_gestito`;
   - `title`; `description` (testo per l'utente del tool, informativo, mai categorico
     né prescrittivo: lint di copy in `corpus:validate`);
   - `citations` (citation ID a granularità verificata);
   - `applies_to`: id di settori o di regimi.
2. **Riferimenti.** Ogni avviso del verdetto è un id del catalogo:
   - campo `notices` delle `qualification_rules` e di `allegato_iv_channel`;
   - `meta.exceptions_catalog_entry` dei regimi, copiato in
     `Verdict.regimeRouting[].exceptionsCatalogEntry`;
   - `expected.notices` e `regime_routing[].exceptions_catalog_entry` delle fixture.
   Nuovo campo `Verdict.notices: string[]` (id del catalogo).
3. **Invariante** (`E_CATALOG_REF`): ogni riferimento al catalogo risolve; id unici;
   `applies_to` contiene solo settori o regimi esistenti.
4. **Documentazione generata.** `docs/known-limitations.md` e le sezioni "limitazioni"
   del disclaimer si generano dal catalogo (script in S4), mai scritti a mano.

## Voci iniziali (0.5.0)

| id | status | oggetto |
|---|---|---|
| `psnc_category_override` | gestito | PSNC (escalation, ADR 0009) |
| `dora_massive_disapplication` | gestito | DORA (escalation, ADR 0009) |
| `cloud_pa_model_substitution` | gestito | Cloud PA (escalation, ADR 0009) |
| `pa_esclusioni_sicurezza_nazionale_art_4_c_3` | segnalato | esclusioni di sicurezza nazionale (art. 4 D.Lgs. 138/2024) per attività |
| `pa_organi_costituzionali_capo_v_art_4_c_2` | segnalato | Capo V non applicabile agli organi costituzionali |
| `pa_qualifica_elevabile_art_6_c_2` | segnalato | importante elevabile a essenziale con individuazione ACN |
| `pa_categorie_aggiunte_dpcm_art_3_c_7` | segnalato | categorie di PA aggiunte con DPCM |
| `pa_lett_d_cumulo_l90_non_attestato` | segnalato | cumulo L. 90/2024 per la lett. d), non attestato |

## Alternative scartate

- **Avvisi come testo libero nel reasoning trace.** Non verificabili, non deduplicabili,
  non generabili in una pagina di limitazioni.
- **Catalogo fuori dal corpus (documentazione).** Il verdetto ne dipende: deve essere
  versionato e validato con il corpus.
- **Schema permissivo (`passthrough`) come per gli altri file.** Il catalogo è testo
  rivolto all'utente: una chiave non prevista è più probabilmente un errore.

## Conseguenze

- `out_of_scope_mvp` dei settori resta per i casi non modellati nel MVP; la loro
  migrazione nel catalogo è da valutare (non in 0.5.0).
- Il catalogo di riferimento citato in STATUS ("4 gestite / 8 segnalate / 10 non
  gestite") non è nel repo: le sue voci vanno riportate qui in una sessione dedicata.

## Fonti

- Vincolo derivato dalla struttura del corpus. Citazioni delle voci: registro
  `packages/corpus/corpus/citations/citations__registry.yaml` e nodi KB citati lì.
