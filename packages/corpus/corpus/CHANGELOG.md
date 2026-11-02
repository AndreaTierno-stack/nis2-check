# Changelog — Corpus NIS2 Tool

Tutte le modifiche rilevanti al corpus normativo (wizard, sectors, signals, regimes, fixtures) sono registrate in questo file.

Formato ispirato a [Keep a Changelog](https://keepachangelog.com/it/1.1.0/); versioning [SemVer](https://semver.org/lang/it/) applicato al **contenuto del corpus** (non al codice dell'engine):
- **major**: formato del corpus o del Verdict incompatibile (il contratto dati letto dall'engine o prodotto dall'engine cambia in modo non retro-compatibile).
- **minor**: cambia il questionario, cambiano le regole, lo schema o gli invarianti.
- **patch**: cambiano testi, citazioni, registro o catalogo.

Convenzione di CLAUDE.md (sezione corpus), nella formulazione del 2026-10-30. Le versioni precedenti non si rinumerano.

Ogni bump ha una voce in questo file; le fixture dichiarano `corpus_version` e si riallineano a ogni bump.

## [Unreleased]

## [0.13.2] — 2026-11-02 — Segnalazione del soggetto critico senza la disambiguazione CACER (S4.2)

Patch (solo testi). Decisione dell'autore del 2026-11-02. Esiti, citazioni e avvisi invariati.
- **`signals/signals__cumulative_regimes.yaml`**, segnale `cer_signal`: tolta dal testo comune a tutti i settori la frase "Da non confondere con le comunità energetiche rinnovabili (configurazioni CACER).". Nessuna voce di catalogo e nessun testo del settore energia mostrato all'utente riporta la disambiguazione; restano il vincolo `copy_constraints` del settore energia (regola di redazione, non mostrata) e l'aiuto della domanda comune `soggetto_critico` ("Non riguarda le comunità energetiche rinnovabili (configurazioni CACER).").
- Fixture E01-E28: `corpus_version` 0.13.1 → 0.13.2.

## [0.13.1] — 2026-11-02 — Forma dei testi e registro sulla KB 064d9e3 (S4.2, Blocco 6)

Patch: cambiano solo testi e registro; nessuna regola, domanda, citazione o esito. Decisione dell'autore del 2026-11-02 (finding basso F18 della review avversaria, `docs/verifications/2026-11-02-review-avversaria.md`). Nessun ingest.
- **F18 (testi)**: le vocali finali scritte con l'apostrofo diventano lettere accentate ("attivita'" → "attività", "e'" → "è", "puo'" → "può", "Autorita'" → "Autorità", "piu'" → "più", "ne'" → "né") in tutti i valori di settori, questionario, segnali, regimi e conflitti: 66 parole in 9 file; i commenti YAML non cambiano. Frasi da nota interna riscritte: "Consulenza qualificata necessaria" nel conflitto `stage_2_and_stage_3` e nella mappatura di precedenza PSNC / Cloud PA del questionario PA diventa "il caso va valutato con un consulente qualificato" (forma dei testi degli override PSNC del 0.13.0); tolta "Segnalazione con invito a verificare l'obbligo PUN." dalla mappatura `registrato_pun == "non_noto"`, che chiude già con la verifica con consulente qualificato.
- **Lint di copy (validator)**: `corpus:validate` blocca (`E_COPY`) le vocali apostrofate a fine parola in ogni valore di testo del corpus; lo stesso controllo vale per le stringhe della UI (`lintUiCopy`: `copy.it.ts`, avviso, README). Elisioni, citazioni tra apici singoli e "po'" passano. Test di guasto su testo di regola, opzione del questionario, etichetta del registro e segnale.
- **Registro citazioni**: KB dichiarata 064d9e3 (prima f373942; export del Project Knowledge c69efb5). I nodi cambiati sono due, con sostituzioni riga per riga (DEC-010): D.Lgs. 138/2024 riga 42 (art. 6 c. 1 lett. a)) e FAQ Settori righe 30 e 36 (A1.1.a.3). Nessuna riga del registro si sposta; le righe citate dalle voci `dlgs_138_2024_art_6_c_1_lett_a`, `dlgs_138_2024_art_6_c_1_lett_e`, `dlgs_138_2024_art_6_c_2`, `dlgs_138_2024_art_6_c_3`, `dm_mase_106_2023` e `faq_a1_1_a_3` sono riscontrate sul testo nuovo. Registro a 77 voci.
- Fixture E01-E28: `corpus_version` 0.13.0 → 0.13.1; esiti, citazioni e avvisi invariati.
- Open point, non risolto in questa patch: il registro e il questionario chiamano la PUN "Piattaforma Unica Nazionale", la FAQ A1.1.a.3 nella KB "Piattaforma nazionale unica dei punti di ricarica".

## [0.13.0] — 2026-11-02 — Correzioni dalla review avversaria (S4.2, Blocco 5)

Minor: cambiano questionario, regole, conflitti e schema. Decisioni dell'autore del 2026-11-02 sul triage di `docs/verifications/2026-11-02-review-avversaria.md`. Un commit per voce.
- Fixture E01-E27: `corpus_version` 0.12.2 → 0.13.0.
- **A1, F02 (questionario, schema)**: nel wizard PA `categoria_pa` precede il blocco comune (`flow_order`); `psnc` (con `common_question_visibility`, campo nuovo dello schema del wizard: visibilità di settore di una domanda comune, ADR 0010 amendment) e `classificazione_cloud_pa` non sono posti all'organo escluso dall'art. 4 c. 2. Invariante nuovo n. 35 (`E_VISIBLE_IF`). Fixture E19: input senza `psnc` e `classificazione_cloud_pa` (non più posti), esito invariato; le altre fixture hanno Verdict identico.
- **A2, F03 (regole, conflitti, catalogo)**: l'esclusione dell'art. 4 c. 2 passa da regola size-blind (stadio 3) a mappatura di stadio 2 su `categoria_pa` (`activity_inputs: [categoria_pa]`, `outcome_mapping` solo per `esclusa_art_4_c_2`, stesso testo e citazione). Regola di stadio 3 nuova `categoria_pa == esclusa_art_4_c_2 AND soggetto_critico == yes` (essenziale, art. 3 c. 5 lett. a), art. 6 c. 1 lett. b), FAQ AMB.NO.1: l'art. 4 c. 2 esclude solo dai cc. 6-7): con l'esclusione decide il conflitto `stage_2_and_stage_3` (`ambiguous`). Testo del conflitto e voce `esclusione_tipologica_vs_inclusione_size_blind` generalizzati a "esclusione per tipologia (FAQ ACN) o per categoria (art. 4 c. 2 D.Lgs. 138/2024)"; la voce si applica anche alla PA. Fixture E19: solo `corpus_ref` (esito invariato, ora deciso dallo stadio 2); E26: esito invariato, testo del conflitto nuovo; **E28 nuova** (organo escluso e soggetto critico: `escalate_to_advisor` / `ambiguous`). F19 respinto dall'autore: il caso si risolve nel meccanismo dell'ADR 0016.
- **A3, F08 (testi, registro)**: riscontro sul PDF della FAQ ACN in `raw/`: "I punti vendita che offrono alla loro clientela punti di ricarica elettrica non rientrano nella definizione della tipologia di soggetto di 'gestore di un punto di ricarica [...]'. Rientrano in tale definizione solo i soggetti di cui all'articolo 5 del dm MASE n. 106 del 16 marzo 2023, ovvero tutti quei soggetti obbligati a registrarsi sulla [...] PUN" (A1.1.a.3). Esito della mappatura `registrato_pun == "no"` invariato (`qualitative_signal_only` / `likely_out_of_scope`); testo della mappatura, aiuto della domanda, voce `punti_ricarica_non_pun_attivita_ulteriore`, nota di settore e registro (`faq_a1_1_a_3`, `dm_mase_106_2023`) allineati al testo ("non rientrano nella definizione della tipologia" al posto di "non rientrano automaticamente"; tolta la frase "non verdetto di esclusione"). Opzioni di attività "Gestione di punti di ricarica per veicoli elettrici" (senza "registrati su PUN", che la domanda successiva verifica). Nodo KB corretto in DEC-010.
- **B3, F06 (citazioni, registro)**: le regole dimensionali di cloud ed energia citano il comma della qualifica: `dlgs_138_2024_art_6_c_3` per l'importante (media impresa), `dlgs_138_2024_art_6_c_1_lett_a` per l'essenziale (Allegato I oltre i massimali della media impresa). ID nuovo nel registro, attestato testualmente nel nodo D.Lgs. della KB (DEC-010, verifica sul PDF in `raw/`); tolta la voce `dlgs_138_2024_art_6` (livello di articolo), non più usata. Registro a 76 voci. Fixture E01, E02, E05, E06, E13, E14, E15, E27: citazioni allineate, esiti invariati.
- **B1, F01 strada (a) (testi, citazioni, registro)**: gli override PSNC (cloud, energia, PA) e Cloud PA (PA) restano escalation; i testi dicono che il regime non restringe l'ambito (categorizzazione delle attività, artt. 4-5 Det. ACN 155238/2026, categoria "impatto alto"), che per la PA dell'Allegato III il rientro è indipendente dalla dimensione (art. 3 c. 6) e che lo strumento non formula un esito sul rapporto tra obblighi NIS e PSNC (art. 33 D.Lgs. 138/2024). ID nuovo `dlgs_138_2024_art_33` (nodo D.Lgs. della KB, riga 54, "Coordinamento con il perimetro") nel regime PSNC, nei suoi override e nella voce `psnc_category_override`; `dlgs_138_2024_art_3_c_6` nel regime Cloud PA e nel suo override. Voci di catalogo `psnc_category_override` e `cloud_pa_model_substitution` riscritte. Registro a 77 voci. Fixture E07, E08, E21 (+ art. 33) ed E20 (+ art. 3 c. 6): citazioni, esiti invariati. Nota in ADR 0014; riesame per v0.2 (PSNC e Cloud PA come avvisi) in STATUS, punto 6.
- **B2, F05 (testi)**: le `reasoning_trace` delle regole dimensionali di cloud ed energia passano alla forma probabilistica "Sulla base degli input forniti, l'analisi suggerisce il rientro nel perimetro NIS2 italiano come soggetto [importante|essenziale] (Allegato I p. [8|1], [settore]; art. 6 c. 3 | c. 1 lett. a))"; la regola micro o piccola in "l'analisi suggerisce l'esclusione dall'ambito NIS2 in via generale (art. 3 c. 2)". Il settore è indicato allo stesso modo per media e grande (F18). La riga "Verifica obbligatoria con consulente qualificato" della pagina dell'esito è invariata. Esiti invariati.
- **B4, F07 (catalogo)**: art. 3 c. 9 lett. a) D.Lgs. 138/2024 (ex operatori di servizi essenziali, testo nel nodo D.Lgs. della KB, riga 31) richiamato nelle voci `individuazione_acn_art_3_c_9` (esempi delle lett. a), b), f)) ed `energia_regime_transitorio_ose` (il regime transitorio riguarda le misure; per l'ambito un ex OSE può essere individuato dall'ACN indipendentemente dalla dimensione; citazione `dlgs_138_2024_art_3_c_9` aggiunta). Fixture E02, E14, E15, E23, E26, E27: citazioni, esiti invariati.
- **B5, F10 (questionario, testi)**: domanda `psnc` limitata a ciò che il registro attesta (`dl_105_2019_art_1_c_2_bis`): "Il soggetto è stato inserito nel Perimetro di Sicurezza Nazionale Cibernetica (PSNC) ai sensi dell'art. 1 c. 2-bis del D.L. 105/2019?"; tolti la stima "150-250" e il riferimento all'organo che comunica l'inserimento (ACN, CISR), non attestati. Regime PSNC: open point "D.L. 105/2019 non tra le fonti primarie della KB, ingest a v0.2". Nessun credito stop-and-ingest usato.
- **B6, F16 (testi, naming)**: "comunità energetiche rinnovabili (configurazioni CACER)" al posto di "comunità energetiche rinnovabili (CACER)" nel copy della domanda `soggetto_critico`, nel segnale `cer_signal` e nel vincolo `copy_constraints` del settore energia; stessa convenzione in CLAUDE.md (vincolo 4), nelle skill del progetto e nella convenzione di naming della KB. Nessuna citazione nuova.

## [0.12.2] — 2026-11-02 — Avviso di anteprima: esito orientativo, "non rivisto" in un solo punto (S4.2)

Patch (catalogo, solo testi). Decisione dell'autore del 2026-11-02. Esiti attesi invariati.
- **`exceptions/exceptions__catalog.yaml`**, voce `anteprima_di_studio_non_consulenza`: "un esito preliminare e probabilistico" diventa "un esito preliminare e orientativo" (l'engine è deterministico e non calcola probabilità); rimossa l'ultima frase ("Questo avviso è fornito così com'è e non è stato rivisto da un legale."): la dichiarazione di avviso non rivisto da un legale vive solo nella frase di chiusura dell'avviso composto dall'app web (`apps/web/content/disclaimer.ts`, ADR 0017), che riporta anche la licenza MIT AS-IS.
- Fixture E01-E27: `corpus_version` 0.12.1 → 0.12.2.

## [0.12.1] — 2026-11-02 — Avviso di anteprima senza nome di prodotto (S4.2)

Patch (catalogo, solo testi). Decisione dell'autore del 2026-11-02. Esiti attesi invariati.
- **`exceptions/exceptions__catalog.yaml`**, voce `anteprima_di_studio_non_consulenza`: "nis2-check è un'anteprima di studio" diventa "Questo strumento è un'anteprima di studio"; il resto della descrizione è invariato. Il testo non porta più un nome di prodotto (nome mostrato nell'app: "Ambito NIS2"; repo e pacchetti restano nis2-check).
- Ricerca di "nis2-check" nei testi rivolti all'utente di catalogo, questionario, regimi, segnali, settori e registro citazioni: nessun'altra occorrenza.
- Fixture E01-E27: `corpus_version` 0.12.0 → 0.12.1.

## [0.12.0] — 2026-10-30 — Nome e descrizione dei settori (S4.1)

Minor (schema).
- `meta.label_it` e `meta.description_it` obbligatori nei file di settore: nome e descrizione di una riga mostrati dalla pagina Settore dell'app web, ricavati dalla voce di catalogo `copertura_settoriale_parziale` e dagli allegati del D.Lgs. 138/2024.

## [0.11.1] — 2026-10-30 — Avviso di non-consulenza nel catalogo (S4.1)

Patch (catalogo).
- Voce `anteprima_di_studio_non_consulenza` (`non_gestito`): avviso di anteprima di studio, AS-IS e dichiarato non rivisto da un legale (ADR 0017). È il testo del click-wrap e del footer dell'app web, che non scrive testi propri. Catalogo a 30 voci: 3 gestite, 20 segnalate, 7 non gestite.

## [0.11.0] — 2026-10-30 — Consolidamento post-S3: stadio dichiarato, regimi senza meta comune, etichette delle fonti

Minor: cambiano schema e invarianti. Esiti attesi invariati. Nessun ingest; nessun ID di citazione nuovo.

### Regole e regimi (ADR 0016, amendment 3)
- **`stage`** dichiarato su ogni regola (`size_blind` | `dimensional`: 4 regole di cloud ed energia, 9 della PA); l'engine legge il campo. Invariante **`E_RULE_STAGE_MISMATCH`** (3 test di guasto).
- **Nessun meta comune dei regimi**: con più regimi e nessuna intersezione l'engine dà un'escalation di difetto (`regimes_without_intersection`). Invariante statico **`E_REGIME_META_MISMATCH`** (2 test).

### Registro citazioni
- Campi **`label`** (una riga in italiano, dalla riga dell'export che attesta la voce) e **`source_group`** (`decreto_nis` | `faq_acn` | `determinazioni_acn` | `altro`) su tutte le 76 voci: testi della sezione "Fonti" della UI e del PDF. Avviso **`W_CITATION_UNLABELED`**; il test di enumerazione richiede l'etichetta per le 59 citazioni emesse dall'engine. Le etichette passano il lint di copy (`E_COPY`).
- Lint di copy delle stringhe della UI (`lintUiCopy`, per `apps/web/src/copy.it.ts`).

### Engine e processo
- `pnpm engine:enumerate --full`: enumerazione completa (418.576 combinazioni, 0 violazioni il 2026-10-30), da eseguire prima di ogni pre-rilascio.
- ADR 0017: gate pre-lancio e review legale del disclaimer ritirati (supera ADR 0008).

### Fixture
- `corpus_version` → 0.11.0 su tutte le 27.

## [0.10.0] — 2026-10-30 — Engine v0.1 (ADR 0016): esclusione per attività, conflitti tra stadi, fixture complete

Minor: cambiano schema, invarianti e regole (esclusione tipologica per attività; nuovo blocco `conflicts`). Il Blocco 0-bis (0.9.0) resta la base dell'engine. Nessun ingest; nessun ID di citazione nuovo (registro a 76 voci).

### Amendment dello stadio 2 e voce PUN (ADR 0016, amendment)
- **Esclusione tipologica per attività** — il wizard energia dichiara `activity_inputs: [tipologia_elettrica, attivita_elettriche_ulteriori]`; `produttore_cliente_attivo` esclude l'attività `produttore`, `registrato_pun` l'attività `gestore_punti_ricarica` (campo `activity`). Lo stadio 2 decide solo se ogni attività dichiarata è esclusa; altrimenti le esclusioni scattate diventano avvisi (`notices_if_demoted`) e decidono gli stadi 3-4. Base: FAQ A1.1.a.4 e A1.1.a.3.
- **Catalogo** — voce nuova `punti_ricarica_non_pun_attivita_ulteriore` (segnalata, `faq_a1_1_a_3`); `prosumer_definizione_cliente_attivo` riusata come avviso della produzione retrocessa.
- **Schema** — `activity_inputs`, `activity`, `notices_if_demoted`; invariante `E_ACTIVITY_REF` (3 test di guasto).
- **Fixture E27** — produttore principale, ricarica non PUN tra le ulteriori, media impresa: `likely_in_scope`, importante, avviso della voce nuova. E04, E25 invariate.

### Blocco `conflicts` e voce di E26 (ADR 0016, amendment 2)
- **File nuovo** `conflicts/conflicts__stages.yaml` (cartella nuova del loader): voce `esclusione_tipologica_vs_inclusione_size_blind`, trigger `stage_2_and_stage_3`, `escalate_to_advisor` / `ambiguous`, citazione `dlgs_138_2024_art_3_c_5_lett_a`. L'engine copia esito, avviso e citazioni: nessun id di catalogo nel codice.
- **Catalogo** — voce nuova `esclusione_tipologica_vs_inclusione_size_blind` (segnalata, premessa "non attestata"), referenziata dal blocco: `E_CATALOG_UNREFERENCED` senza eccezioni.
- **Schema** — `ConflictsFile` stretto, trigger tra i tipi ammessi, una voce per tipo; copertura del registro, riferimenti al catalogo e `corpus_ref` estesi a `conflicts/` (4 test di guasto).
- **Fixture E26** — prosumer come unica attività, soggetto critico sì: conflitto (2)×(3), `escalate_to_advisor` / `ambiguous`.

### Correzione E05/E06
- Avviso `cloud_stabilimento_principale_multi_ue` aggiunto agli attesi di E05 ed E06 (regola cloud grande, come in E01): atteso incompleto dalla riscrittura 0.6.0, l'engine è corretto.

### Fixture e catalogo
- 27 fixture, tutte verdi; `corpus_version` → 0.10.0. Catalogo a 29 voci: 3 gestite, 20 segnalate, 6 non gestite. Test di enumerazione dei percorsi: ogni voce segnalata è emessa da almeno una combinazione.

## [0.9.0] — 2026-10-30 — Trigger espliciti per ogni esito, nessuna risposta inclusiva (preparazione dell'engine, ADR 0016)

Minor: cambiano regole, questionario, schema e invarianti. Esiti attesi delle fixture invariati. Base: mappa dei costrutti `docs/verifications/2026-10-30-s3-mappa-costrutti.md`. Nessun ingest.

### Regole e questionario
- **`registrato_pun`** — rimossa la voce `si` dell'`outcome_mapping` (`categorical_assessment` / `likely_in_scope` "provvisorio"): l'esito di "sì" viene dalle regole del settore (dimensione, soggetto critico). Le citazioni della voce (`faq_a1_1_a_3`, `dm_mase_106_2023`) passano all'opzione (`on_selected.citations`). Voci `no` e `non_so` invariate. E15 invariata.
- **PA, canale Allegato IV** — regola esplicita `categoria_pa == canale_allegato_iv` con `reference: allegato_iv_channel` (pattern ADR 0009): esito (`qualitative_signal_only` / `ambiguous`), trace, citazioni (`dlgs_138_2024_art_3_c_8`, `dlgs_138_2024_art_3_c_13`, `faq_a4_1`) e avvisi dal blocco del canale, che diventa un dato. Con la regola, per la PA scatta esattamente una regola per ogni valore di `categoria_pa` e di `soggetto_critico` (12 combinazioni). E11 invariata.
- **PA, `l90_cumulo`** — `applies_to_categories: [a, b, c]` sostituito da tre trigger espliciti `categoria_pa == a|b|c` (la grammatica delle condizioni non ha `OR`). Segnali attesi invariati.

### Schema e invarianti
- Regole di qualificazione con `reference` a un blocco di dati del settore (`allegato_iv_channel`), senza esito proprio; il blocco del canale dichiara `reasoning_trace` e `citations`. `on_selected.citations` tipizzato.
- **`E_OUTCOME_MAPPING_INCLUSIVE`** — nessuna `outcome_mapping` e nessuna opzione con esito dichiara `likely_in_scope`.
- **`E_OUTCOME_WITHOUT_TRIGGER`** — `condition`, `trigger` di override e intersezioni e `answer` di `outcome_mapping` obbligatori e non vuoti; `allegato_iv_channel` deve essere referenziato da una regola. Regimi e `out_of_scope_mvp` restano dati e documentazione.
- `applies_to_categories` ritirato (`E_TRIGGER`). `E_APPLIES_TO_MISMATCH` non introdotto: il campo non sopravvive.
- Test di guasto: 7 nuovi (30 test del validator).
- `docs/ARCHITECTURE.md` §3: invarianti 27-29, invariante 1 esteso al `reference`, elenco dei costrutti dichiarativi senza effetto in v0.1 (`on_yes.reference` di `psnc`, `out_of_scope_mvp`, `rientro_prerequisite`); `out_of_scope_mvp` resta (non vuoto nella PA).

### Fixture
- `corpus_version` → 0.9.0 su tutte le 25; esiti attesi invariati.
- Test delle fixture (engine): `notices` assente = non verificato, come da README (tolto il confronto con `?? []`).

## [0.8.0] — 2026-10-30 — Residui di 0.7.0: art. 3 c. 2 nelle regole micro/piccola, trasporto pubblico nella L. 90

Minor (convenzione sopra): cambia il questionario (opzione `tpl_soggetto_l90`). Schema e invarianti invariati. Nessun ingest. Preparata come 0.7.1 e rinumerata prima del push.

### Changed
- **Regole micro/piccola di cloud ed energia** — `dlgs_138_2024_art_3` → `dlgs_138_2024_art_3_c_2` (il contenuto della regola è il superamento dei massimali delle piccole imprese, art. 3 c. 2; nodo D.Lgs. 138/2024, riga 27); reasoning trace "art. 3 c. 2". Registro: voce nuova `dlgs_138_2024_art_3_c_2`; `dlgs_138_2024_art_3` rimosso (senza usi). 76 voci.
- **`wizard/wizard__pubblica_amministrazione.yaml`, `profilo_allegato_iv`** — opzione nuova `tpl_soggetto_l90` (trasporto pubblico urbano con bacino di utenza non inferiore a 100.000 abitanti o extraurbano nell'ambito delle città metropolitane, art. 1 c. 1 L. 90/2024): è l'unica opzione di trasporto che attiva `l90_cumulo`. `tpl` ("altro trasporto pubblico locale") non lo attiva più. Profili di settore allineati (`l90_overlap`). Nessuna opzione esistente distingueva i due casi; citazioni invariate (`l90_2024_art_1_c_1` già nel segnale).
- **Fixture** — E03: citazioni `dlgs_138_2024_art_3` → `dlgs_138_2024_art_3_c_2`, esito invariato. Nessuna fixture copre `tpl`. `corpus_version` → 0.8.0 su tutte le 25.

## [0.7.0] — 2026-10-30 — L. 90 nel percorso PA, Allegato IV, salvaguardia dimensionale e citazioni dal lint KB del 2026-10-30

Minor: cambia il questionario (opzione `inhouse_soggetto_l90` nel percorso PA; avviso sull'opzione `attivita_culturale`) e cambiano i segnali attesi di E11. Nessuna modifica a engine e schema. Base: lint della KB del 2026-10-30 (DEC-009, KB f373942; `docs/verifications/2026-10-30-lint-kb.md`). Nessun ingest. I commit dei blocchi portano il prefisso "0.6.1 block N" (versione del brief); il bump è minor per la regola sopra.

### Blocco 1 — `l90_cumulo` nel percorso PA
- **`wizard/wizard__pubblica_amministrazione.yaml`, `profilo_allegato_iv`** — opzione nuova `inhouse_soggetto_l90` (stesso ID del cloud): società in house dei soggetti dell'art. 1 c. 1 L. 90/2024 che forniscono servizi informatici, di trasporto tra quelli indicati, di acque reflue o di gestione dei rifiuti; è l'unica opzione in-house che attiva `l90_cumulo`. `societa_inhouse` ("altra società in-house …") non lo attiva più. Profili di settore allineati (`l90_overlap`).
- **`l90_cumulo`** — tolto "si cumula con il regime NIS senza sostituirlo": l'art. 1 c. 7 lett. a) L. 90/2024 esclude dall'art. 1 i soggetti lì richiamati (rinvio al D.Lgs. 65/2018 riferito al D.Lgs. 138/2024 dall'art. 15-bis) e i soggetti PSNC. Contesto PA sull'art. 4 c. 8 Det. 127437/2026 ("può soddisfare", era "prassi attesa"). Registro: `l90_2024_art_1_c_7_lett_a`, `l90_2024_art_15_bis`.
- **E11** — `l90_cumulo` non più atteso (opzione `societa_inhouse`).

### Blocco 2 — `allegato_iv_individuazione`
- Segnale con testo e citazioni generali per tutti i profili: A4.1 e art. 3 cc. 8 e 13 (`faq_a4_1`); notifica dell'Autorità nazionale competente NIS (era "autorità di settore"). I criteri di A4.3.3 non valgono più per ogni profilo.
- **Catalogo** — voce nuova `allegato_iv_attivita_culturale_criteri_mic` (segnalata; A4.3.3, A4.3.4), sull'opzione `attivita_culturale` (`on_selected`). `allegato_iv_individuazione_art_3_c_8`: `faq_a4_3_4`, `faq_settori_sottosettori` → `faq_a4_1`, `faq_a4_2`. Catalogo a 27 voci: 3 gestite, 18 segnalate, 6 non gestite.
- **E11** — citazioni `faq_a4_3_3`, `faq_a4_3_4` → `faq_a4_1`.

### Blocco 3 — Salvaguardia dimensionale (DPCM 221/2024)
- `safeguard_dimensional_dpcm_221` (segnale segnaposto e voce di catalogo non gestita): non più "concessione discrezionale dell'Autorità di settore". Richiesta in registrazione tramite la piattaforma ACN, con condivisione degli elementi con le Autorità di settore (art. 12 c. 2 Det. 127437/2026); individuazione delle Autorità di settore (art. 11 c. 4 lett. c) D.Lgs. 138/2024); applicazione dell'ACN secondo i criteri del DPCM 221/2024, art. 3 c. 1 (art. 3 c. 12).
- Registro: `dlgs_138_2024_art_11_c_4_lett_c` e `det_piattaforma_127437_2026_art_12_c_2` (attestati nella nota del 2026-10-30 del nodo FAQ Ambito, non nel nodo D.Lgs.); `dpcm_221_2024` → `dpcm_221_2024_art_3_c_1`.

### Blocco 4 — Citazioni dal lint KB
- V2: `cloud_provider` `faq_settori_sottosettori` → `faq_a1_8_1`; `faq_a1_9_1` nel segnale e nella domanda Cloud+MSP.
- V3+V4: la copy sulla registrazione (C-E4) cita `dlgs_138_2024_art_7_c_1_lett_d` e `det_piattaforma_127437_2026_art_11_c_2_lett_g` (quattro segnali cross-sector, domanda Cloud+MSP); rimossi dal registro `dlgs_138_2024_art_7` e `det_piattaforma_127437_2026_art_11_c_2`, non più usati.
- V6: `copertura_settoriale_parziale` `dlgs_138_2024_art_3` → `dlgs_138_2024_art_3_c_1`.
- Registro: righe riallineate alla KB f373942; 76 voci.
- E13, E14: citazioni aggiornate, esiti invariati.

### Fixture
- `corpus_version` → 0.7.0 su tutte le 25.

### Notes
- Invariati per mancanza di testo nel corpus o di attestazione: `faq_a1_9_2` (V1, corretto); `faq_gen_6` non usato (nessun testo del corpus sulla selezione di settori/sottosettori); nessun testo del corpus su dati dimensionali facoltativi per la PA (rettifica V4).
- Non toccati: opzione `tpl` di `profilo_allegato_iv`, che attiva `l90_cumulo` per ogni trasporto pubblico locale mentre l'art. 1 c. 1 L. 90/2024 indica solo alcune società di trasporto; `dlgs_138_2024_art_3` nelle regole micro/piccola di cloud ed energia, dove il contenuto è l'art. 3 c. 2 (attestato alla riga 27 del nodo D.Lgs., ID non introdotto).
- Contatore stop-and-ingest invariato (1 residuo).

## [0.6.0] — 2026-10-28 — Regimi instradati in v0.1 (ADR 0014), soggetti critici (ADR 0015), correzioni cloud ed energia, registro e catalogo completi

Minor: cambiano gli esiti attesi di E05, E06, E08, il questionario (domande `soggetto_critico` e `produttore_cliente_attivo`, opzione `inhouse_soggetto_l90`, etichette di fornitura, DORA e Cloud PA) e lo schema (campi retro-compatibili `excluded_common_questions` e `notices` su risposte, opzioni, `outcome_mapping` e intersezioni; invarianti nuovi). Base: verifica di lettura del 2026-10-28 (`docs/verifications/2026-10-28-cloud-energia-dora.md`), KB DEC-008, audit del registro (`docs/verifications/2026-10-28-registro-citazioni.md`).

### Added
- **`wizard/wizard__disambiguation.yaml`, `soggetto_critico`** (ADR 0015) — domanda comune della fase `standard_identification`: con "sì" `categorical_assessment` / `likely_in_scope`, qualifica **essenziale** indipendentemente dalla dimensione, in cloud, energia e PA (`dlgs_138_2024_art_3_c_5_lett_a`, `dlgs_138_2024_art_6_c_1_lett_b`, `faq_amb_no_1`); attiva `cer_signal`.
- **`wizard/wizard__energia_elettrica.yaml`, `produttore_cliente_attivo`** (C-E2) — follow-up del produttore con le due condizioni della FAQ A1.1.a.4 (cliente attivo; nessun'altra attività degli Allegati I e II) → `out_of_scope` / `likely_out_of_scope`, avviso `prosumer_definizione_cliente_attivo`.
- **`sectors/sectors__pubblica_amministrazione.yaml`** — override PSNC sul regime esistente (trigger `psnc`, ADR 0014); regole b), c), d) con soggetto critico → essenziale.
- **`wizard/wizard__pubblica_amministrazione.yaml`** — `excluded_common_questions: [dimension, cloud_pa]`; fase `standard_identification` (solo `soggetto_critico`); `multi_regime_intersection` `psnc == yes AND classificazione_cloud_pa == yes` (dal blocco comune), con avviso `psnc_cloud_pa_precedenza_non_attestata`.
- **Catalogo eccezioni**: 18 voci nuove (totale 26: 3 gestite, 17 segnalate, 6 non gestite). Gestita `soggetti_critici_dlgs_134_2024_art_3_c_5_lett_a`; segnalate `dora_entita_finanziaria_fuori_settori_3_4`, `dora_soggetti_esentati_art_3_c_15`, `cloud_pa_fornitore_qualificato_a1_8_2`, `individuazione_acn_art_3_c_9`, `imprese_collegate_art_3_c_10`, `energia_regime_transitorio_ose`, `cloud_stabilimento_principale_multi_ue`, `prosumer_definizione_cliente_attivo`, `psnc_cloud_pa_precedenza_non_attestata`, `allegato_iv_individuazione_art_3_c_8`, `pa_asl_identita_sanitaria`, `pa_prerequisito_istat_s13`; non gestite `safeguard_dimensional_dpcm_221`, `dimensione_autodichiarata`, `consolidamento_di_gruppo`, `confine_50_43`, `copertura_settoriale_parziale`.
- **Registro citazioni** completo: 67 voci, tutti gli ID usati da corpus e fixture, con nodo KB e riga (HEAD e9f5913). ID nuovi: `dlgs_138_2024_art_2_c_1_lett_bbb`, `_art_3_c_5_lett_a`, `_art_3_c_9`, `_art_3_c_10`, `_art_3_c_13`, `_art_3_c_15`, `_art_6_c_1_lett_b`, `det_acn_155238_2026_art_2_c_3`, `det_acn_379907_2025_art_5`, `det_piattaforma_127437_2026_art_11_c_2`, `faq_amb_no_1`, `faq_a1_8_2`, `faq_a1_9_2`, `faq_a1_9_3`, `faq_a1_9_4`, `faq_cat_8`.
- **Invarianti** `E_CITATION_UNREGISTERED` (ID usato senza voce nel registro), `E_CATALOG_UNREFERENCED` (voce `segnalato` senza riferimenti), avviso `W_CITATION_UNUSED` (voce del registro non usata; nuovo canale `warnings` di `corpus:validate`); `E_FIXTURE_INPUT` controlla gli input sul wizard del settore; `E_REF_QUESTION` su `excluded_common_questions`. Test di guasto per ciascuno.
- **Fixture E21-E25**: PA lett. a) con PSNC (`[psnc]`), PA lett. c) con PSNC e Cloud PA (`[cloud_pa, psnc]`, ordine del file di settore), micro impresa elettrica soggetto critico (essenziale), media impresa cloud soggetto critico (essenziale), produttore cliente attivo (`likely_out_of_scope`).
- **ADR 0014, ADR 0015.**

### Changed
- **Override** (ADR 0014): rimossi `cloud_pa` dal settore cloud (art. 4 Det. 155238/2026 e FAQ CAT.8: la classificazione la svolgono le PA; FAQ A1.8.2: il fornitore qualificato rientra come fornitore cloud) e `dora` da cloud ed energia (art. 3 c. 14 riservato ai settori 3 e 4 dell'Allegato I). Le domande comuni `dora` e `cloud_pa` restano come segnali con `on_yes.notices`; esempio della domanda `dora` con tipologie dei settori 3-4; `cloud_pa` chiede di servizi "qualificati".
- **`regimes/dora.yaml`** — `referenced_by: []`, nota "riservato ai settori 3-4", `residual_nis_obligation: null`, `open_points` compilati, `faq_amb_no_2` tra le citazioni (con nota sull'incoerenza interna della FAQ). Voce di catalogo `dora_massive_disapplication` da gestita a **non gestita**. `regimes/cloud_pa.yaml` riferito solo dalla PA; `regimes/psnc.yaml` riferito anche dalla PA.
- **Regole dimensionali** di cloud ed energia e regole b)-d) della PA: condizione `AND soggetto_critico == no`.
- **Energia** — C-E1: fornitura "vendita, compresa la rivendita, di energia elettrica ai clienti" (FAQ A1.1.a.2), stesso id; C-E4: "la registrazione indica tutte le tipologie pertinenti" in 3 domande e nei segnali; C-E5: `l90_cumulo` non più attivato; C-E6: rimosse le frasi PSNC non attestate, `faq_a1_1_a_4` dalla regola micro/piccola alle regole media e grande; regime transitorio OSE da `out_of_scope_mvp` (`ambiguous`, mai attivato) ad avviso sulle regole in ambito.
- **Cloud** — C-C2: `base_legal_definition: dlgs_138_2024_art_2_c_1_lett_bbb`; `model_2` cita `det_acn_155238_2026_art_2_c_3`; `faq_settori_cloud` → `faq_settori_sottosettori`; domanda e segnale Cloud+MSP con il criterio dell'interconnessione diretta (`faq_a1_9_2`, `faq_a1_9_3`, `faq_a1_9_4`); `l90_cumulo` solo con l'opzione nuova `inhouse_soggetto_l90`; stabilimento principale multi-UE da `out_of_scope_mvp` ad avviso; `nis2_art_26` rimosso (non attestato).
- **Segnali** — `cer_signal` riscritto (non più segnaposto); `l90_cumulo` "potrebbe rientrare … va verificata"; `cross_sector_asl_sanitario`: essenziale solo sopra i massimali della media impresa (FAQ A3.c.4.1); `dlgs_138_2024_art_13` → `dlgs_138_2024_art_3_c_13` in due segnali e in E11.
- **Fixture** — `corpus_version` → 0.6.0 su tutte le 25; tutte rispondono a `soggetto_critico`; le PA non rispondono a `cloud_pa`. Esiti cambiati:
  - E05 (rinominata `cloud_pa_fornitore_qualificato`): da `escalate_to_advisor` / `ambiguous` con routing [cloud_pa] a `categorical_assessment` / `likely_in_scope`, essenziale;
  - E06 (rinominata `dora_entita_finanziaria_cloud`): da `escalate_to_advisor` / `ambiguous` con routing [dora] a `categorical_assessment` / `likely_in_scope`, essenziale;
  - E08 (rinominata `cloud_psnc_e_cloud_pa`): routing da [cloud_pa, psnc] a [psnc], esito invariato;
  - E14 senza `l90_cumulo`; avvisi attesi nuovi su E01-E03, E05, E06, E08-E12, E14, E16-E18.
- **Registro**: righe delle 8 voci 0.5.0 riallineate al nodo D.Lgs. dopo DEC-008.
- **Rimossi** `out_of_scope_mvp.cer_dlgs_134_2024` (energia), `out_of_scope_mvp.cloud_provider_multi_eu_jurisdiction` (cloud) e `multi_regime_intersection` dal blocco comune.

### Notes
- ADR 0001 (punti 1 e 3) e ADR 0004 (descrizione dei soggetti critici) superati in parte; nota di allineamento in ADR 0001 sulla lett. d) e la L. 90 (ADR 0011); nota in ADR 0005 sulle definizioni riportate nella FAQ A1.1.a.1.
- Non attestati e quindi non introdotti: `dlgs_138_2024_art_7_c_1_lett_d`, `det_piattaforma_127437_2026_art_11_c_2_lett_g` (degradato al comma), `faq_gen_6`, `faq_a1_8_1`, `faq_a1_9_1`, `dir_nis2_art_26`, `dlgs_138_2024_art_3_c_1`. Correzioni KB proposte in `docs/verifications/2026-10-28-registro-citazioni.md`.
- Non modellati: soggetto critico nel canale Allegato IV della PA; precedenza tra `outcome_mapping` (PUN, prosumer) e regole dimensionali, da fissare in S3 con l'engine.
- Contatore stop-and-ingest invariato (1 residuo): nessuna fonte nuova. Riallineato il 2026-10-28 (voce [Unreleased] precedente): la nota del 2026-10-28 in DEC-007 parte A qualifica il riscontro del D.Lgs. 138/2024 su Normattiva come no-op, che non consuma il credito (DEC-003).

## [0.5.0] — 2026-10-28 — PA dell'Allegato III (ADR 0011, C1-C6) e catalogo eccezioni (ADR 0012)

Minor: cambiano gli esiti delle lettere a), b) e d) dell'Allegato III, il questionario PA (opzioni nuove, domande nuove) e lo schema (catalogo eccezioni, avvisi `notices`, registro citazioni). Base normativa: D.Lgs. 138/2024 Allegato III, art. 3 cc. 6-7, art. 4 cc. 2-3, art. 6 cc. 1-3, art. 40 c. 2 lett. b) e c. 5 lett. a), riscontrati parola per parola su Normattiva il 2026-10-27 (DEC-007 A) e riportati nel nodo KB `sources/D.Lgs. 138-2024 (Decreto NIS)` (righe 8 e 25-36).

### Added
- **`exceptions/exceptions__catalog.yaml`** (ADR 0012) — catalogo eccezioni con schema stretto (`id`, `status` gestito | segnalato | non_gestito, `title`, `description`, `citations`, `applies_to`). 8 voci: `psnc_category_override`, `dora_massive_disapplication`, `cloud_pa_model_substitution` (gestite come escalation, ADR 0009); `pa_esclusioni_sicurezza_nazionale_art_4_c_3`, `pa_organi_costituzionali_capo_v_art_4_c_2`, `pa_qualifica_elevabile_art_6_c_2`, `pa_categorie_aggiunte_dpcm_art_3_c_7`, `pa_lett_d_cumulo_l90_non_attestato` (segnalate; l'ultima chiude STATUS 14).
- **Avvisi `notices`** su `qualification_rules` e `allegato_iv_channel`; `expected.notices` nelle fixture; `Verdict.notices`. Invariante `E_CATALOG_REF`: ogni riferimento al catalogo risolve, compresi `meta.exceptions_catalog_entry` dei regimi e `regime_routing` delle fixture. Lint di copy `E_COPY` sui testi del catalogo.
- **`citations/citations__registry.yaml`** — nodo KB e riga per gli 8 citation ID nuovi: `dlgs_138_2024_art_3_c_7`, `_art_4_c_2`, `_art_4_c_3`, `_art_6_c_1_lett_e`, `_art_6_c_2`, `_art_6_c_3`, `_art_40_c_2_lett_b`, `_art_40_c_5_lett_a`. Convenzione: `_art_<n>_c_<n>_lett_<x>`; allegati con numero romano maiuscolo (resta `dlgs_138_2024_allegato_III`, già in uso).
- **`wizard/wizard__pubblica_amministrazione.yaml`** — opzione `esclusa_art_4_c_2` di `categoria_pa`; domanda `sottotipo_d` (Allegato III lett. d) 1-6, `visible_if` ADR 0010); domanda `classificazione_cloud_pa` (C5).
- **Fixture E16-E20**: lett. d) 5 ente di ricerca e lett. d) 4 ente culturale (importante), lett. b) Regione (importante con avviso art. 6 c. 2), soggetto escluso dall'art. 4 c. 2 (`likely_out_of_scope`), PA lett. c) con override Cloud PA (`regime_routing` [cloud_pa]).
- **ADR 0011, ADR 0012.**

### Changed
- **`sectors/sectors__pubblica_amministrazione.yaml`** (ADR 0011) — lettere a)-d) `categorical_assessment` → `likely_in_scope`:
  - a) da `qualitative_signal_only` con qualifica essenziale inferita a qualifica **essenziale** (art. 6 c. 1 lett. e));
  - b) da `qualitative_signal_only` con qualifica essenziale inferita a **importante** (art. 6 c. 3), con avviso art. 6 c. 2;
  - c) invariata nell'esito (importante), con base art. 6 c. 3 e avviso art. 6 c. 2;
  - d) da `qualitative_signal_only` (solo enti a struttura associativa) a **importante** per i sei sottotipi della lett. d), con avviso art. 6 c. 2;
  - nuova regola per `esclusa_art_4_c_2` (`out_of_scope` / `likely_out_of_scope`);
  - trace di a) senza "determinazione ACN identificativa delle PA NIS": art. 40 c. 5 lett. a) (C6); nessuna soglia numerica nei trace;
  - override Cloud PA: trigger `classificazione_cloud_pa == yes` (era `cloud_pa == yes`, domanda per i fornitori, irraggiungibile per la PA con una risposta corretta); citazioni invariate;
  - rimosso `out_of_scope_mvp.pa_categoria_a_b_d_verdetto_categoriale` (strada 3 superata).
- **`categoria_pa`** — etichette con i sottotipi testuali dell'Allegato III ("agenzia statale" rimossa: lett. a) 3 sono le Agenzie fiscali); il testo di aiuto indica la lett. d) per enti di ricerca e culturali inclusi nell'elenco ISTAT, e il canale Allegato IV per i soggetti fuori dall'Allegato III.
- **`regimes/cloud_pa.yaml`** — `referenced_by` include la domanda `classificazione_cloud_pa`.
- **Fixture** — E10 rinominata `E10_pa_categoria_a_essenziale` (esito atteso cambiato per ADR 0011); E09, E11, E12 rispondono a `classificazione_cloud_pa` e verificano `notices`; `corpus_version` → 0.5.0 su tutte le 20.
- **Schema** — rimossa la chiave `visibility_citations` (dichiarata in 0.4.0, mai usata).

### Notes
- La "strada 3" (ADR 0002) è superata: la sua premessa era l'assenza di una fonte puntuale, rimossa dal riscontro del 2026-10-27.
- Art. 40 c. 5 lett. a): il riscontro Normattiva lo elenca (nodo KB, riga 8), ma le righe 25-36 non ne riportano il testo; il registro rinvia al testo ufficiale (PDF in raw/). Da integrare nel nodo KB.
- La domanda comune `cloud_pa` resta visibile anche nel percorso PA, dove non instrada nulla; l'intersezione PSNC + Cloud PA (`multi_regime_intersection`) non considera `classificazione_cloud_pa`. Il settore PA non ha override PSNC né DORA.

## [0.4.0] — 2026-10-28 — Contratto formalizzato: schema zod, `visible_if` strutturata (ADR 0010), input delle regole PA

Prima versione del corpus validata dallo schema zod (`pnpm corpus:validate`, S2). Minor: formalizza il contratto letto dall'engine, cambia la forma delle condizioni di visibilità del questionario (ADR 0010) e delle fixture rispetto a 0.3.1, aggiunge l'ID `tipo_partecipazione_pubblica` al follow-up cloud (introdotto in 0.3.1) e le citazioni dimensionali. Nessun `verdict_outcome` né `assessment_mode` atteso cambia.

Nota sul bump precedente: 0.3.1 fu tenuto patch, su decisione dell'autore, pur con argomenti per minor (forma di `regime_routing` nelle fixture, ID nuovo su una domanda esistente). Questa versione consolida quei cambiamenti in una minor.

### Added
- **Schema zod del corpus** (`packages/corpus/src/schemas/`): forma di settori, wizard, regimi, signal e fixture; chiavi formalizzate `standard_identification_questions`, `phase`, `visibility_citations`, `meta.assessment_mode` / `meta.verdict_outcome` dei regimi, `residual_nis_obligation` nullable, `regime_routing` come lista nelle fixture (chiude STATUS 12.6). Invarianti elencati con il loro ADR in `docs/ARCHITECTURE.md` §3.
- **Invariante nuovo `E_RULE_INPUT`**: ogni input letto da una regola (`condition`, `trigger`, `condition_ref`, `multi_regime_intersection`) esiste nel wizard del settore o nel blocco comune, con valore tra le sue opzioni. Al primo controllo falliva su `categoria` e `sottotipo` della PA (STATUS 17).
- **Invariante `E_DIMENSION_CITATIONS`**: ogni regola che consuma `dimension` cita `faq_amb_di_1` e `racc_ue_2003_361`.
- **`docs/decisions/0010-visible-if-condizione-strutturata.md`** — ADR 0010.

### Changed
- **`visible_if` strutturata (ADR 0010)**: oggetto `{input, op: eq | neq | includes, value}` o `any_of` / `all_of` a un livello; forma stringa ritirata.
  - `wizard/wizard__energia_elettrica.yaml`, `registrato_pun`: `any_of` (`tipologia_elettrica` `eq`, `attivita_elettriche_ulteriori` `includes` `gestore_punti_ricarica`); rimosso il flag ridondante `conditional: true`.
  - `wizard/wizard__pubblica_amministrazione.yaml`: `conditional_on` di `sottotipo_c` e `profilo_allegato_iv` unificato in `visible_if` (stesso concetto); `conditional_on` ritirato.
  - `wizard/wizard__disambiguation.yaml`, `dimension`: rimossi `visible_if` e `visibility_citations`; l'esclusione della PA è strutturale (`flow_order` del wizard PA, `size_blind`; art. 3 c. 6 già in `meta.citations` del settore PA).
- **`sectors/sectors__pubblica_amministrazione.yaml`** — input delle regole allineati al wizard (non toccato): `categoria` → `categoria_pa` nelle 4 `qualification_rules`, `sottotipo` → `sottotipo_c` nel trigger di `cross_sector_asl_sanitario`. Nessun contenuto normativo cambia. `corpus_ref` di E09, E10, E12 aggiornati; E11 invariato.
- **`sectors/sectors__cloud_computing.yaml`, `sectors/sectors__energia_elettrica.yaml`** — le 5 regole dimensionali prive di una delle due fonti nominate dal `reasoning_trace` ricevono `faq_amb_di_1` (micro/piccola energia) o `racc_ue_2003_361` (media e grande, cloud ed energia). Chiude STATUS 12.9.
- **Fixture** — `corpus_version` 0.3.1 → 0.4.0 su tutte le 15; `citations` di E01, E02, E13, E14, E15 allineate alle regole che le soddisfano (`racc_ue_2003_361`).
- **Posizione dei file** — il corpus vive in `packages/corpus/corpus/` e le fixture in `packages/engine/tests/fixtures/`; i `corpus_ref` restano relativi alla radice del corpus.

### Notes
- `scripts/validate-corpus.mjs` (controllo interim di S1.1) e la copia locale di js-yaml sono stati rimossi: i suoi 11 controlli vivono nello schema zod e nel lint di `corpus:validate`, coperti dai test di guasto in `packages/corpus/tests`.
- Da fissare in S3 (ADR 0010): valore di una condizione di visibilità il cui `input` non ha risposta.

## [0.3.1] — 2026-10-27 — Chiusura dei punti aperti di corpus 0.3.0 (S1.1)

Patch: nessun esito atteso cambia (`assessment_mode` e `verdict_outcome` di E01–E15 invariati), nessuna domanda nuova, nessuna regola nuova. Cambiano citazioni (allineamento a un regime), copy dei `reasoning_trace`, un ID di follow-up già esistente come struttura, la quotatura di `yes`/`no` (stessi valori con il parser YAML 1.2) e la forma di `regime_routing` nelle fixture (ADR 0009, amendment).

### Changed
- **`sectors/sectors__cloud_computing.yaml`** — override PSNC: `citations` da `[det_acn_155238_2026_art_5]` a `[det_acn_155238_2026_art_5, dl_105_2019_art_1_c_2_bis]`, come `regimes/psnc.yaml` (invariante citations override/regime, ADR 0009). Unico disallineamento trovato sui 6 override.
- **`sectors/sectors__cloud_computing.yaml`, `sectors/sectors__energia_elettrica.yaml`** — `reasoning_trace` delle 6 `qualification_rules` dimensionali: rimosse le soglie numeriche ("50-249 dipendenti o 10-50 M€", ">250 dipendenti o >50 M€"), che non seguivano la regola AMB.DI.1. Nuova apertura: "Dimensione dichiarata: {Micro o piccola impresa | Media impresa | Grande impresa}. Classificazione secondo FAQ ACN AMB.DI.1 e Racc. UE 2003/361."; restano le frasi senza soglie (qualifica, A1.1.a.4, A1.2). `citations` invariate. La PA non ha trace dimensionale (art. 3 c. 6).
- **`wizard/wizard__cloud_computing.yaml`** — il `conditional_followup` di `pertinenza_pubblica_cloud` riceve `id: tipo_partecipazione_pubblica`, come in energia; ID di opzione già coincidenti (`ente_pubblico`, `capitale_prevalente`, `capitale_minoritario`). Nessuna fixture lo usa.
- **`yes`/`no` quotati** come valori e ID di opzione in corpus e fixture: `wizard__energia_elettrica.yaml` (`registrato_pun`: opzione `id: "no"`, `answer: "no"`), `sectors__pubblica_amministrazione.yaml` (`l90_overlap: "yes"` ×2), input delle 15 fixture.
- **`fixtures/*`** — `regime_routing` diventa una lista (ADR 0009, amendment 2026-10-27): un elemento in E05, E06, E07; due in E08 (`cloud_pa`, `psnc`, ordine degli override di `sectors__cloud_computing.yaml`); `[]` nelle altre 11. `residual_nis_obligation: null` documentato come "non attestato nel corpus", non "nessuno". `corpus_version` → 0.3.1.

### Added
- **`docs/decisions/0009-*.md`** — sezione "Amendment 2026-10-27": `Verdict.regimeRouting: RegimeRouting[]` (vuoto se nessun routing, ordine = ordine degli override nel file di settore), semantica di `null`, alternativa scartata (routing singolo con priorità: precedenza tra regimi non attestata).
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
