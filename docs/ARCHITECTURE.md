# Architettura di nis2-check

> Documentazione viva: si aggiorna nello stesso commit che cambia l'architettura
> (CLAUDE.md, CI/CD e workflow). Stato di avanzamento e punti aperti: `docs/STATUS.md`.
> Ultimo aggiornamento: 2026-11-02, S4.2 (PDF dal foglio di stile di stampa, ADR 0018; advisory accettate).

nis2-check è uno strumento **informativo** di pre-screening dell'ambito NIS2 italiano:
non fa compliance, audit o certificazione. Il valore sta nel **corpus normativo
dichiarativo**; il codice lo esegue senza interpretarlo.

## 1. Struttura

Monorepo pnpm (workspaces `apps/*`, `packages/*`), Node ≥ 24, TypeScript strict.

```
nis2-check/
  apps/web/                 Next.js 15.5 App Router, React 19, Tailwind 3, shadcn/ui
                            export statico (output: export): nessun server in produzione
  packages/engine/          evaluate({ sectorId, answers }, corpus) => Verdict — pura, deterministica, nessun I/O (ADR 0016)
    src/types.ts            contratto Verdict (CLAUDE.md, ADR 0009 + amendment, ADR 0016)
    src/evaluate.ts         stadi, risoluzione, avvisi, segnali, Verdict (ADR 0016)
    src/answers.ts          domande del settore, visibilità, validazione delle risposte
    src/conditions.ts       visible_if (ADR 0010) e condizioni stringa, input assente = falso
    src/sha256.ts           inputHash, sincrono e senza dipendenze
    tests/fixtures/         scenari golden E01–E27 (corpus_version, input, expected)
  packages/corpus/          corpus + loader + schemi zod + corpus:validate
    corpus/                 VERSION · CHANGELOG.md · sectors/ · wizard/ · signals/ · regimes/
                            exceptions/ (catalogo eccezioni, ADR 0012) · citations/ (registro citazioni)
                            conflicts/ (conflitti tra stadi, ADR 0016)
    src/load.ts             lettura YAML (js-yaml v4, YAML 1.2: yes/no sono stringhe)
    src/schemas/files.ts    forma di ogni file (settore, wizard, regime, signal, fixture)
    src/schemas/corpus.ts   invarianti incrociati (riferimenti, override/regime, fixture)
    src/corpusRef.ts        risoluzione dei corpus_ref delle fixture
    src/lint.ts             lint testuali (booleani YAML 1.1 non quotati)
    src/cli.ts              pnpm corpus:validate
  docs/                     ARCHITECTURE.md · STATUS.md · decisions/ (ADR)
  export/                   export della KB per il Project Knowledge (scripts/export_kb.py)
```

Dipendenze tra pacchetti: `engine` importa da `corpus` solo tipi (`Corpus`); in
test usa anche il loader. `web` usa il loader del corpus solo al build (server
component) e l'engine nel browser (§2ter).

Vincoli trasversali (CLAUDE.md): nessuna telemetria, nessuna chiamata di rete a
runtime oltre agli asset statici, nessuna persistenza dei dati dell'utente (lo
stato del wizard e del click-wrap vive in memoria).

## 2. Flusso del wizard

```
disambiguation           →  sector_specific  →  standard_identification
psnc (gate) · dora ·        domande del          soggetto_critico, dimension
cloud_pa (segnali)          wizard di settore    wizard__disambiguation
```

1. **Regimi instradati in v0.1 (ADR 0014)**: PSNC in cloud, energia e PA (domanda
   comune `psnc` → `category_override`) e Cloud PA nella sola PA (domanda
   `classificazione_cloud_pa` del wizard PA → `model_substitution`). Se il trigger è
   positivo, l'override del settore instrada al regime (`reference:
   regimes/<id>.yaml`); in v0.1 l'instradamento è un'escalation dichiarata nel `meta`
   del regime (`escalate_to_advisor` / `ambiguous`) e popola `Verdict.regimeRouting`
   (ADR 0009). Le domande comuni `dora` e `cloud_pa` sono **segnali**: con "sì"
   aggiungono avvisi del catalogo (`on_yes.notices`) e l'esito segue le regole del
   settore (l'art. 3 c. 14 riguarda i soli settori 3 e 4 dell'Allegato I; l'art. 4
   Det. 155238/2026 le PA che hanno classificato i propri dati). Il regime DORA resta
   dichiarato senza settori che lo instradano. L'intersezione PSNC + Cloud PA vive nel
   wizard PA (`multi_regime_intersection`, E22).
2. **Domande di settore** (`wizard__<settore>.yaml`): tipologia, follow-up
   condizionati (`visible_if`, ADR 0010), pertinenza pubblica, identità multiple.
3. **Identificazione standard**: `soggetto_critico` (ADR 0015: con "sì" essenziale
   indipendentemente dalla dimensione, art. 3 c. 5 lett. a) e art. 6 c. 1 lett. b)) e
   `dimension`, che alimenta le `qualification_rules` dei settori size-cap con
   `soggetto_critico == no`. La PA incontra solo `soggetto_critico`: `dimension` è
   esclusa per **struttura** (`excluded_common_questions` del wizard PA) e il settore
   è `size_blind` (art. 3 c. 6 D.Lgs. 138/2024). Un wizard può escludere domande del
   blocco comune: la PA esclude `dimension` e `cloud_pa`.
4. **Verdetto**: l'engine copia `assessment_mode` e `verdict_outcome` dalla regola
   che matcha (mai inferiti), raccoglie i signal (`l90_cumulo`, `cross_sector_*`)
   e compone il reasoning trace con le citazioni a granularità verificata.
   `disclaimerRequired: true` sempre.

La L. 90/2024 non è un gate: è il signal cumulativo `l90_cumulo` (ADR 0001).

**PA (ADR 0011).** Le lettere a)-d) dell'Allegato III hanno verdetto categoriale (a)
essenziale, b)-d) importanti); l'opzione `esclusa_art_4_c_2` porta a
`likely_out_of_scope`; il canale Allegato IV è alternativo alle lettere nella stessa
domanda. Nel percorso PA l'override Cloud PA scatta sulla domanda
`classificazione_cloud_pa`; la domanda comune `cloud_pa` (rivolta ai fornitori) non è
posta alla PA. Le lett. b)-d) individuate come soggetto critico sono essenziali (ADR 0015).

**Avvisi (ADR 0012, ADR 0014).** Dichiarano `notices` (id del catalogo eccezioni,
riportati in `Verdict.notices`): le regole che matchano, `allegato_iv_channel`, le
risposte "sì" (`on_yes.notices`), le opzioni scelte (`on_selected.notices`), gli esiti
di `outcome_mapping` e le intersezioni. Anche `regimeRouting[].exceptionsCatalogEntry` è
un id del catalogo.

## 2bis. Engine (S3, ADR 0016)

`evaluate({ sectorId, answers }, corpus) => Verdict`: pura, deterministica, senza I/O, data o
random. Non contiene conoscenza normativa: esegue i costrutti del corpus in quattro stadi,
tutti valutati, uno solo decide.

| Stadio | Costrutti | Decide |
|---|---|---|
| 1, instradamento a regime | `overrides` del settore → `meta` del regime; `multi_regime_intersection` con più regimi | se almeno un override scatta; gli stadi 2-4 restano nella trace come sospesi |
| 2, esclusione tipologica | `outcome_mapping` delle domande visibili, per attività (`activity_inputs`, `activity`) | se ogni attività dichiarata ha un'esclusione scattata; altrimenti le esclusioni diventano avvisi (`notices_if_demoted`) |
| 3, size-blind | `qualification_rules` che non leggono `dimension` (PA, soggetto critico, canale Allegato IV via `reference`) | se una regola scatta |
| 4, dimensionale | `qualification_rules` che leggono `dimension` | esattamente una regola raggiungibile |

Conflitto (2)×(3): esito, avviso e citazioni dal blocco `conflicts` (`stage_2_and_stage_3`).
Nessuna regola o più regole dello stesso stadio: `escalate_to_advisor` / `ambiguous` con
codice `no_rule_matched` / `multiple_rules_matched` (difetti di corpus, irraggiungibili:
test di enumerazione).

- **Input**: domande del blocco comune meno `excluded_common_questions`, più quelle del
  wizard, in `flow_order`; input non visibile = assente, ogni condizione su un assente è falsa.
  Le risposte si validano contro la visibilità: `InvalidAnswersError` con tutti gli errori
  (`unknown_sector`, `unknown_question`, `not_visible`, `missing`, `invalid_value`). Per
  risposte valide `evaluate` non lancia; `CorpusContractError` solo per un corpus fuori
  contratto.
- **Verdict** (CLAUDE.md): esito e modo copiati dal costrutto che decide; `regimeRouting`
  nell'ordine degli override; avvisi di costrutto solo dallo stadio che decide, poi avvisi delle
  esclusioni retrocesse, poi avvisi di risposta (`on_yes`, `on_selected`), deduplicati;
  segnali di risposta sempre, segnali dei trigger di settore se non decide lo stadio 1;
  citazioni dei costrutti che decidono, dei segnali e delle voci di catalogo; `reasoningTrace`
  strutturata (stadio, costrutto, risultato, esito parziale, citazioni, codice, nota tecnica,
  testo del corpus); `inputHash` sha256 dell'input canonico; `disclaimerRequired: true`.
- **Test** (`packages/engine/tests/`): valutatore di condizioni (tabella di verità con assenti
  e operatori non usati dal corpus); visibilità e validazione sul corpus reale; stadi su un
  mini-corpus sintetico valido (un caso per stadio, esclusione per attività, conflitto, difetti,
  avvisi da posizioni diverse, purezza, sha256); fixture golden E01–E27; enumerazione dei
  percorsi (cloud 480 e PA 304 combinazioni tutte, energia 417.792 campionate con seed fisso:
  25.000), con le proprietà dell'ADR 0016 §6, la raggiungibilità di ogni voce segnalata e
  l'etichetta di ogni citazione emessa. L'enumerazione dell'energia nel test è un
  **campionamento** (25.000 su 417.792, seed 20261030): `pnpm engine:enumerate --full` valuta
  l'intero spazio (418.576 combinazioni, circa 15 s) e va eseguito a mano prima di ogni
  pre-rilascio, con esito registrato in STATUS.

## 2ter. Web (S4.1)

`apps/web`: Next.js 15.5 in export statico, tutto client-side dopo il build.

- **Dati.** La pagina (server component) carica e valida il corpus al build
  (`lib/corpus.server.ts`, `loadFromDisk` + `validateCorpus`) e lo passa al client senza
  fixture. Nel browser: visibilità e validazione con `checkAnswers`/`resolveSector`
  dell'engine (mai una seconda implementazione della grammatica di ADR 0010), esito con
  `evaluate`. Nessuna chiamata di rete a runtime: il font (Public Sans, `next/font/google`)
  si scarica al build e si serve dall'export; gli unici link esterni sono di navigazione (KB
  e codice su GitHub).
- **Stato.** Click-wrap accettato in memoria (al ricaricamento si chiede di nuovo); risposte,
  settore, domanda corrente e passo in `sessionStorage` (`lib/session.ts`), mai
  `localStorage`; le risposte di domande non più visibili si potano a ogni modifica.
- **Pagine** (un'unica route, passo nello stepper): Settore (nome e descrizione dai file di
  settore); Domande (una per schermata, help dal YAML; binarie e multiple a pillole, singole
  a righe radio; `InvalidAnswersError` mostrato come elenco di domande da completare); Esito
  (banner di anteprima; pannello dell'esito con scala a tre posizioni, frase del corpus,
  riga di verifica, tipologia, qualifica, regimi; avvisi dal catalogo; "Come è stato
  calcolato" ripiegato, quattro righe per gli stadi dell'ADR 0016; fonti numerate e
  raggruppate per `source_group` del registro, con etichetta e link alla riga della KB;
  colonna laterale con le risposte, azioni di S4.2 disabilitate, riga tecnica).
- **Token** (`tailwind.config.ts`, unici colori: la palette di Tailwind è sostituita):
  ground #eef1ee, surface #ffffff, text #1b1f1d, text-muted #6b716d, text-soft #505753,
  border #dfe4df e #e3e8e3, accent #1d6b47 (hover #155237), accent-soft #e3efe8, warn #d98b1a,
  warn-soft #fff4e0, warn-text #7a4a0c. Raggi: pannelli 20px, righe 16px, il resto a pillola.
  Nessuna ombra, nessun gradiente; mai contenitori dentro contenitori.
- **Copy.** Ogni testo normativo viene dal corpus (domande, help, frasi dell'esito, avvisi,
  trace) o dal registro (etichette delle fonti); anche l'avviso del click-wrap e del footer è
  una voce del catalogo (`anteprima_di_studio_non_consulenza`). Le stringhe di navigazione e
  struttura vivono solo in `apps/web/src/copy.it.ts`, sottoposto al lint di copy
  (`lintUiCopy`: parole vietate di ADR 0012 e CLAUDE.md, nessun trattino lungo). I riferimenti
  delle fonti si formattano dall'id della citazione con i nomi degli atti di `copy.it.ts`.
- **Test.** Vitest in node (render con `react-dom/server`, nessuna libreria DOM): logica del
  wizard, scala e colori, fonti, snapshot del DOM senza stili per E05, E22, E25, E26, E11, lint
  di copy. Playwright sull'export (`scripts/serve-out.mjs`): E01, E05, E11, E22, E25 cliccate
  dall'inizio; in CI dopo la build (circa 40 s su 1:48 totali).

## 3. Invarianti dello schema

Applicati dallo schema zod (`packages/corpus/src/schemas/`), quindi da chiunque
analizzi il corpus. Ogni violazione porta un codice stabile tra parentesi quadre.

| # | Invariante | Codice | Motivazione |
|---|---|---|---|
| 1 | Ogni voce con esito (`qualification_rules`, `out_of_scope_mvp`, `multi_regime_intersection`, `outcome_mapping`, `allegato_iv_channel`) dichiara `verdict_outcome`; una regola con `reference` lo prende dal blocco referenziato e non dichiara esito, trace, citazioni o avvisi propri (corpus 0.9.0) | `E_VERDICT_OUTCOME`, `E_REF_FILE` | ADR 0002, CLAUDE.md vincolo 2, ADR 0009 (pattern del `reference`) |
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
| 18 | Fixture: `corpus_version` = `VERSION`; input = domande poste dal wizard del settore (blocco comune meno `excluded_common_questions`, da 0.6.0); signal definiti; `corpus_ref` risolvibili; `regime_routing` = `meta` dei regimi degli override che matchano, nell'ordine del file di settore; con un solo regime, esito = `meta` del regime | `E_FIXTURE_VERSION`, `E_FIXTURE_INPUT`, `E_FIXTURE_SIGNAL`, `E_CORPUS_REF`, `E_REGIME_ROUTING` | ADR 0009 + amendment, CLAUDE.md Testing |
| 19 | Nessun booleano YAML 1.1 non quotato (`yes`/`no`/`on`/`off`/`y`/`n`) | `E_YAML_BOOL` | S1.1 (lint testuale, non dello schema) |
| 20 | Catalogo eccezioni con schema stretto; ogni riferimento al catalogo (`notices` di regole, `allegato_iv_channel`, `on_yes`, `on_selected`, `outcome_mapping`, `multi_regime_intersection`, `meta.exceptions_catalog_entry` dei regimi, `notices` e `regime_routing` delle fixture) risolve; id unici; `applies_to` solo settori o regimi | `E_CATALOG_REF` | ADR 0012 |
| 21 | Testi del catalogo (`title`, `description`) senza formule categoriche o prescrittive e con il naming vincolato ("salvaguardia dimensionale", mai "CER" nudo, "esclusioni di sicurezza nazionale") | `E_COPY` | CLAUDE.md vincolo 1, ADR 0004 ("CER"), CHANGELOG 0.2.0 B5 ("salvaguardia"), ADR 0012 |
| 22 | Registro citazioni con schema stretto (nodo KB, righe, attestazione) e id unici | `E_CITATION_ID` | ADR 0011 (rinvio KB per ogni ID nuovo) |
| 23 | Ogni citation ID usato (corpus e fixture: `citations`, `cumulative_regulations`, `base_legal_definition`) ha una voce nel registro | `E_CITATION_UNREGISTERED` | CLAUDE.md vincolo 3; corpus 0.6.0 (registro completo) |
| 24 | Ogni voce del registro è usata (avviso, non blocca) | `W_CITATION_UNUSED` | corpus 0.6.0 |
| 25 | Ogni voce di catalogo `segnalato` è referenziata da almeno un avviso o dal `meta` di un regime; `gestito` e `non_gestito` possono non esserlo | `E_CATALOG_UNREFERENCED` | ADR 0012 (segnalato = mostrato nel verdetto) |
| 26 | `excluded_common_questions` nomina solo domande del blocco comune; le domande escluse non sono input del settore (regole, trigger, fixture) | `E_REF_QUESTION`, `E_RULE_INPUT`, `E_FIXTURE_INPUT` | ADR 0014, ADR 0015 |
| 27 | Nessuna `outcome_mapping` e nessuna opzione con esito dichiara `likely_in_scope`: una risposta può escludere o lasciare indeterminato, l'inclusione viene dalle regole del settore | `E_OUTCOME_MAPPING_INCLUSIVE` | ADR 0016; corpus 0.9.0 (voce `si` di `registrato_pun` rimossa) |
| 28 | Ogni costrutto con esito valutato dall'engine ha un trigger dichiarato e non vuoto (`condition` delle regole, `trigger` di override e intersezioni, `answer` di `outcome_mapping`); un blocco di dati con esito (`allegato_iv_channel`) è applicato solo da una regola che lo referenzia. Regimi e `out_of_scope_mvp` sono dati o documentazione, non trigger | `E_OUTCOME_WITHOUT_TRIGGER` | ADR 0016 (l'engine non deduce un trigger dalla posizione) |
| 29 | `applies_to_categories` ritirato: i segnali di settore dichiarano un `trigger` esplicito | `E_TRIGGER` | corpus 0.9.0 |
| 30 | Esclusione tipologica per attività: `activity_inputs` sono domande a scelta del wizard; ogni domanda con `outcome_mapping` dichiara `activity` (opzione degli input di attività); ogni `outcome_mapping` dichiara `notices_if_demoted`, che contano come riferimenti al catalogo | `E_ACTIVITY_REF` | ADR 0016, amendment (corpus 0.10.0) |
| 31 | Blocco `conflicts` con schema stretto: `trigger` tra i tipi ammessi (`stage_2_and_stage_3`), una voce per tipo, `exceptions_catalog_entry` che risolve e conta come riferimento | `E_TRIGGER`, `E_CATALOG_REF`, `E_OUTCOME_WITHOUT_TRIGGER` | ADR 0016, amendment (2) (corpus 0.10.0) |
| 32 | Ogni regola dichiara `stage` (`size_blind` o `dimensional`): una regola `dimensional` legge `dimension` e al più `soggetto_critico`, una `size_blind` non legge `dimension`; l'engine legge il campo | `E_RULE_STAGE_MISMATCH` | ADR 0016, amendment 3 (corpus 0.11.0) |
| 33 | Due override dello stesso settore che possono scattare insieme, con regimi dagli esiti diversi, sono coperti da una `multi_regime_intersection` del wizard; l'engine non copia mai un "meta comune" | `E_REGIME_META_MISMATCH` | ADR 0016, amendment 3 (corpus 0.11.0) |
| 34 | Voci del registro con `label` (una riga, dalla riga dell'export) e `source_group`; le etichette passano il lint di copy. Obbligatori per le citazioni emesse dall'engine (test di enumerazione), avviso per le altre | `W_CITATION_UNLABELED`, `E_COPY` | ADR 0016, amendment 3 (corpus 0.11.0) |

Gli invarianti incrociati (2, 7–10, 13–18, 20, 22–26, 28 per il blocco referenziato) girano
solo se la forma dei file è valida: zod non esegue i `superRefine` su un input di forma errata.

**Costrutti dichiarativi senza effetto in v0.1** (validati, non valutati dall'engine; corpus
0.9.0): `on_yes.effect` / `on_yes.reference` della domanda `psnc` (l'instradamento lo decide
l'override del settore, ADR 0009); `out_of_scope_mvp` dei settori (casi non modellati nel MVP,
con `verdict_outcome` documentale e senza trigger; oggi solo nel settore PA: sanitario e
Allegato IV); `rientro_prerequisite` della PA (assunzione ISTAT S13, resa nelle trace e
nell'avviso `pa_prerequisito_istat_s13`).

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

- **Engine (S3)**: fatto (§2bis, ADR 0016). Resta non modellato il soggetto critico nel canale
  Allegato IV della PA (STATUS 23).
- **Corpus**: correzioni KB proposte dall'audit del registro
  (`docs/verifications/2026-10-28-registro-citazioni.md`), poi gli ID oggi degradati
  (art. 7 c. 1 lett. d), art. 11 c. 2 lett. g), FAQ GEN.6, A1.8.1, A1.9.1); migrazione dei
  casi residui di `out_of_scope_mvp` (PA) nel catalogo.
- **Documenti generati (S4)**: script che genera `docs/known-limitations.md` e le
  sezioni limitazioni del disclaimer dal catalogo.
- **Web (S4.2)**: PDF con foglio di stile di stampa, pagina "Cosa non gestisce il tool" dal
  catalogo, click-wrap finale, deploy Vercel, README per il lettore di dieci minuti. Wizard,
  esito ed Explainability Mode: fatti in S4.1 (§2ter).
- **PDF** (ADR 0018): stampa del browser dalla pagina dell'esito (`window.print()` e
  `@media print` in `apps/web`), nessuna libreria PDF; contenuto secondo CLAUDE.md
  ("Deliverable PDF": watermark, intestazione e disclaimer su ogni pagina).
- **Qualità**: ESLint anche su `packages/*` (oggi solo web); zod 4: migrazione in v0.1.1,
  advisory accettata per corpus locale fidato validato in build; lint dei vincoli di copy
  esteso dai testi del catalogo ai reasoning trace e ai testi del wizard.
- **Rilascio** (ADR 0017): anteprima di studio con disclaimer AS-IS, checklist pre-rilascio
  (CI verde, `pnpm engine:enumerate --full` senza violazioni, review avversaria interna),
  deploy Vercel. Nessun gate con reviewer terzo.
