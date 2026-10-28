# Architettura di nis2-check

> Documentazione viva: si aggiorna nello stesso commit che cambia l'architettura
> (CLAUDE.md, CI/CD e workflow). Stato di avanzamento e punti aperti: `docs/STATUS.md`.
> Ultimo aggiornamento: 2026-10-28, sessione corpus 0.5.0 (pacchetto PA, catalogo eccezioni).

nis2-check è uno strumento **informativo** di pre-screening dell'ambito NIS2 italiano:
non fa compliance, audit o certificazione. Il valore sta nel **corpus normativo
dichiarativo**; il codice lo esegue senza interpretarlo.

## 1. Struttura

Monorepo pnpm (workspaces `apps/*`, `packages/*`), Node ≥ 24, TypeScript strict.

```
nis2-check/
  apps/web/                 Next.js 15.5 App Router, React 19, Tailwind 3, shadcn/ui
                            export statico (output: export): nessun server in produzione
  packages/engine/          evaluate(answers, corpus) => Verdict — pura, deterministica, nessun I/O
    src/types.ts            contratto Verdict (CLAUDE.md, ADR 0009 + amendment)
    tests/fixtures/         scenari golden E01–E15 (corpus_version, input, expected)
  packages/corpus/          corpus + loader + schemi zod + corpus:validate
    corpus/                 VERSION · CHANGELOG.md · sectors/ · wizard/ · signals/ · regimes/
                            exceptions/ (catalogo eccezioni, ADR 0012) · citations/ (registro citazioni)
    src/load.ts             lettura YAML (js-yaml v4, YAML 1.2: yes/no sono stringhe)
    src/schemas/files.ts    forma di ogni file (settore, wizard, regime, signal, fixture)
    src/schemas/corpus.ts   invarianti incrociati (riferimenti, override/regime, fixture)
    src/corpusRef.ts        risoluzione dei corpus_ref delle fixture
    src/lint.ts             lint testuali (booleani YAML 1.1 non quotati)
    src/cli.ts              pnpm corpus:validate
  packages/pdf/             PDF client-side (v0.1.0: da implementare)
  docs/                     ARCHITECTURE.md · STATUS.md · decisions/ (ADR)
  export/                   export della KB per il Project Knowledge (scripts/export_kb.py)
```

Dipendenze tra pacchetti: `engine` importa da `corpus` solo tipi (`Corpus`); in
test usa anche il loader. `web` non importa ancora engine e corpus (S3+).

Vincoli trasversali (CLAUDE.md): nessuna telemetria, nessuna chiamata di rete a
runtime oltre agli asset statici, nessuna persistenza dei dati dell'utente (lo
stato del wizard e del click-wrap vive in memoria).

## 2. Flusso del wizard

```
disambiguation (3 gate)  →  sector_specific  →  standard_identification
psnc · dora · cloud_pa      domande del          dimension (size-cap)
wizard__disambiguation      wizard di settore    wizard__disambiguation
```

1. **Gate di regime** (`wizard__disambiguation.yaml`, comuni a tutti i settori):
   `psnc` → `category_override`, `dora` → `massive_disapplication`, `cloud_pa` →
   `model_substitution`. Se un gate è positivo, l'override del settore instrada al
   regime (`reference: regimes/<id>.yaml`); in v0.1 l'instradamento è
   un'escalation dichiarata nel `meta` del regime (`escalate_to_advisor` /
   `ambiguous`) e popola `Verdict.regimeRouting` (ADR 0009). L'intersezione PSNC +
   Cloud PA ha un esito proprio (`multi_regime_intersection`, E08).
2. **Domande di settore** (`wizard__<settore>.yaml`): tipologia, follow-up
   condizionati (`visible_if`, ADR 0010), pertinenza pubblica, identità multiple.
3. **Identificazione standard**: la domanda `dimension` alimenta le
   `qualification_rules` dei settori size-cap. La PA non la incontra per
   **struttura**: il suo wizard non ha la fase in `flow_order` e il settore è
   `size_blind` (art. 3 c. 6 D.Lgs. 138/2024).
4. **Verdetto**: l'engine copia `assessment_mode` e `verdict_outcome` dalla regola
   che matcha (mai inferiti), raccoglie i signal (`l90_cumulo`, `cross_sector_*`)
   e compone il reasoning trace con le citazioni a granularità verificata.
   `disclaimerRequired: true` sempre.

La L. 90/2024 non è un gate: è il signal cumulativo `l90_cumulo` (ADR 0001).

**PA (ADR 0011).** Le lettere a)-d) dell'Allegato III hanno verdetto categoriale (a)
essenziale, b)-d) importanti); l'opzione `esclusa_art_4_c_2` porta a
`likely_out_of_scope`; il canale Allegato IV è alternativo alle lettere nella stessa
domanda. Nel percorso PA l'override Cloud PA scatta sulla domanda
`classificazione_cloud_pa`, non sulla domanda comune `cloud_pa` (rivolta ai fornitori).

**Avvisi (ADR 0012).** Le regole possono dichiarare `notices`: id del catalogo
eccezioni, riportati in `Verdict.notices`. Anche `regimeRouting[].exceptionsCatalogEntry`
è un id del catalogo.

## 3. Invarianti dello schema

Applicati dallo schema zod (`packages/corpus/src/schemas/`), quindi da chiunque
analizzi il corpus. Ogni violazione porta un codice stabile tra parentesi quadre.

| # | Invariante | Codice | Motivazione |
|---|---|---|---|
| 1 | Ogni voce con esito (`qualification_rules`, `out_of_scope_mvp`, `multi_regime_intersection`, `outcome_mapping`, `allegato_iv_channel`) dichiara `verdict_outcome` | `E_VERDICT_OUTCOME` | ADR 0002, CLAUDE.md vincolo 2 |
| 2 | Un override non ha esito proprio: il suo `reference` punta a un regime esistente il cui `meta` dichiara `assessment_mode` e `verdict_outcome` | `E_REF_FILE`, `E_REGIME_META` | ADR 0009 |
| 3 | `escalate_to_advisor` ⇒ `verdict_outcome: ambiguous`, ovunque (regole, regimi, fixture) | `E_ESCALATE_AMBIGUOUS` | CLAUDE.md vincolo 6, ADR 0002 |
| 4 | Mapping fisso: `out_of_scope` ⇒ `likely_out_of_scope`; `categorical_assessment` ⇒ `likely_in_scope` | `E_FIXED_MAPPING` | ADR 0002 |
| 5 | `qualifica` e `qualifica_inferita` mutuamente esclusive | `E_QUALIFICA_BOTH` | note di schema del settore PA |
| 6 | Citation ID ben formati (`snake_case`, segmenti con numeri romani ammessi) | `E_CITATION_ID` | CLAUDE.md vincolo 3 |
| 7 | Le `citations` di un override coincidono con quelle del regime referenziato | `E_OVERRIDE_CITATIONS` | ADR 0009 |
| 8 | `override_kind` di un override = `routing_effect` del regime | `E_OVERRIDE_KIND` | ADR 0009 |
| 9 | Trigger di override nella forma `<input> == <valore>` | `E_TRIGGER` | ADR 0009, amendment (ordine di `regimeRouting`) |
| 10 | Riferimenti a file e a signal esistenti (`sector_data`, `reference`, `referenced_by`, `activates_signals`, trigger di signal, `unifies_with`) | `E_REF_FILE`, `E_REF_SIGNAL` | CLAUDE.md, Testing |
| 11 | Ogni domanda, follow-up e opzione ha un `id` | `E_ID_MISSING` | S1.1 (STATUS 12.3) |
| 12 | Le domande in `standard_identification_questions` hanno `phase: standard_identification` | `E_PHASE` | STATUS 12.6 |
| 13 | `visible_if` strutturata, un livello; `input` esiste nel wizard, `value` tra le sue opzioni, `includes` solo su `multi_select`; `conditional_on`/`conditional` ritirati | `E_VISIBLE_IF` | ADR 0010 |
| 14 | Ogni input letto da una regola (`condition`, `trigger`, `condition_ref`, intersezioni) esiste nel wizard del settore o nel blocco comune, con valore ammesso | `E_RULE_INPUT` | STATUS 17 (S2) |
| 15 | Le risposte di `outcome_mapping` sono opzioni della domanda | `E_REF_QUESTION` | ADR 0003 (follow-up PUN) |
| 16 | Ogni regola che consuma `dimension` cita `faq_amb_di_1` e `racc_ue_2003_361` | `E_DIMENSION_CITATIONS` | STATUS 12.9 |
| 17 | Settore `size_blind` senza condizioni su `dimension` | `E_SIZE_BLIND` | note di schema del settore PA |
| 18 | Fixture: `corpus_version` = `VERSION`; input = id di domande; signal definiti; `corpus_ref` risolvibili; `regime_routing` = `meta` dei regimi degli override che matchano, nell'ordine del file di settore; con un solo regime, esito = `meta` del regime | `E_FIXTURE_VERSION`, `E_FIXTURE_INPUT`, `E_FIXTURE_SIGNAL`, `E_CORPUS_REF`, `E_REGIME_ROUTING` | ADR 0009 + amendment, CLAUDE.md Testing |
| 19 | Nessun booleano YAML 1.1 non quotato (`yes`/`no`/`on`/`off`/`y`/`n`) | `E_YAML_BOOL` | S1.1 (lint testuale, non dello schema) |
| 20 | Catalogo eccezioni con schema stretto; ogni riferimento al catalogo (`notices` delle regole e di `allegato_iv_channel`, `meta.exceptions_catalog_entry` dei regimi, `notices` e `regime_routing` delle fixture) risolve; id unici; `applies_to` solo settori o regimi | `E_CATALOG_REF` | ADR 0012 |
| 21 | Testi del catalogo (`title`, `description`) senza formule categoriche o prescrittive e con il naming vincolato ("salvaguardia dimensionale", mai "CER" nudo, "esclusioni di sicurezza nazionale") | `E_COPY` | CLAUDE.md vincolo 1, ADR 0004, ADR 0005, ADR 0012 |
| 22 | Registro citazioni con schema stretto (nodo KB, righe, attestazione) e id unici | `E_CITATION_ID` | ADR 0011 (rinvio KB per ogni ID nuovo) |

Gli invarianti incrociati (2, 7–10, 13–18, 20, 22) girano solo se la forma dei file è
valida: zod non esegue i `superRefine` su un input di forma errata.

## 4. Grammatica di `visible_if` (ADR 0010)

```yaml
# condizione semplice
visible_if: { input: tipologia_elettrica, op: eq, value: gestore_punti_ricarica }

# composizione a un livello (almeno due condizioni, nessun annidamento)
visible_if:
  any_of:                                   # OR; all_of = AND
    - { input: tipologia_elettrica, op: eq, value: gestore_punti_ricarica }
    - { input: attivita_elettriche_ulteriori, op: includes, value: gestore_punti_ricarica }
```

- `op`: `eq`, `neq`, `includes` (solo su domande `multi_select`).
- `input`: id di una domanda del wizard o del blocco comune; `value`: id di
  un'opzione (`yes`/`no` per le domande binarie).
- `conditional_followup.trigger_on` resta per le sole sotto-domande annidate.
- Da fissare in S3: valore di una condizione il cui `input` non ha risposta.

## 5. `corpus_ref` delle fixture

Relativi alla radice del corpus (`packages/corpus/corpus/`), non al monorepo.
Forma: parti separate da ` -> `, ` + ` o `, `; ogni parte è `file#percorso` o un
percorso sul file precedente; i passi del percorso sono chiavi o id, con selettori
`[...]` confrontati con `condition`, `trigger`, `case`, `id` o `chiave==valore`.
Grammatica completa nel commento di `packages/corpus/src/corpusRef.ts`.

## 6. Comandi e CI

```
pnpm install            # pnpm 9 via corepack (packageManager)
pnpm lint               # ESLint 9 (apps/web)
pnpm typecheck          # tsc --noEmit su ogni pacchetto
pnpm corpus:validate    # schema + invarianti + lint del corpus e delle fixture
pnpm test               # vitest: validator (guasti iniettati) + fixture engine (todo)
pnpm build              # export statico di apps/web
```

GitHub Actions (`.github/workflows/ci.yml`): stessi passi in quest'ordine su push e
PR, Node 24, solo action di GitHub, nessun servizio terzo.

**Sviluppo su Windows**: clonare il repository in un percorso corto. I percorsi di
`node_modules/.pnpm` superano facilmente il limite di 260 caratteri e Node non legge
il `package.json` dei pacchetti (errore `ERR_PACKAGE_IMPORT_NOT_DEFINED` di vitest).

## 6bis. Documenti generati dal catalogo eccezioni

`docs/known-limitations.md` e le sezioni "limitazioni" del disclaimer si **generano**
da `exceptions/exceptions__catalog.yaml` (script in S4): non si scrivono mai a mano.
Una limitazione nuova entra prima nel catalogo, poi nei documenti generati.

## 7. Cosa manca per v0.1.0

- **Engine (S3)**: `evaluate` reale; fixture E01–E20 da `todo` a test verdi;
  semantica delle condizioni senza risposta (ADR 0010); assert dell'invariante
  escalate → ambiguous anche nell'engine (vincolo 6); `Verdict.notices`.
- **Corpus**: lettura cloud/energia estesa agli override DORA, art. 3 c. 14
  (STATUS 16); registrazione nel registro citazioni degli ID precedenti a 0.5.0;
  riporto nel catalogo delle voci del catalogo di riferimento (STATUS: "4 gestite /
  8 segnalate / 10 non gestite") e valutazione della migrazione di `out_of_scope_mvp`.
- **Documenti generati (S4)**: script che genera `docs/known-limitations.md` e le
  sezioni limitazioni del disclaimer dal catalogo.
- **Web**: wizard, Explainability Mode, testi definitivi di disclaimer e click-wrap
  dopo la review legale, collegamento a engine e corpus.
- **PDF**: `packages/pdf` secondo CLAUDE.md (watermark, disclaimer su ogni pagina).
- **Qualità**: ESLint anche su `packages/*` (oggi solo web); migrazione a zod 4
  (advisory di zod 3 sulla memoria con collezioni enormi, non rilevante su un corpus
  locale fidato); lint dei vincoli di copy esteso dai testi del catalogo ai
  reasoning trace e ai testi del wizard.
- **Rilascio**: review GRC terza sui 5 scenari (ADR 0008), deploy Vercel.
