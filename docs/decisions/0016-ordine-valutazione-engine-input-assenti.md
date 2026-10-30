# ADR 0016 — Ordine di valutazione dell'engine v0.1 e semantica degli input assenti

- **Stato:** accettato
- **Data:** 2026-10-30
- **Ambito:** contratto engine (firma di `evaluate`, tipo `Verdict`, errori), schema del corpus
- **Versione corpus:** 0.9.0
- **Chiude:** semantica delle condizioni senza risposta (ADR 0010, Conseguenze); precedenza
  tra `outcome_mapping` e regole dimensionali (`docs/ARCHITECTURE.md` §7)
- **Base:** `docs/verifications/2026-10-30-s3-mappa-costrutti.md` (mappa dei costrutti)

## Contesto

L'engine esegue il corpus senza conoscenza normativa propria (CLAUDE.md, vincoli 2 e 6). Il
corpus dichiara esiti in quattro famiglie di costrutti (override di regime, `outcome_mapping`,
regole size-blind, regole dimensionali) che possono scattare insieme per le stesse risposte:
un gestore di punti di ricarica non obbligato al PUN è anche una media impresa; un'impresa
elettrica nel PSNC è anche una grande impresa. Serve un ordine di valutazione che dica chi
decide, cosa si fa degli altri costrutti e come si trattano le domande senza risposta. Il
corpus 0.9.0 (stesso giorno) ha reso esplicito ogni trigger e vietato le risposte inclusive,
così che l'ordine si applichi senza interpretare commenti o posizioni.

## Decisione

### 1. Dominanza in quattro stadi

Gli stadi si valutano tutti; ne decide uno solo.

1. **Instradamento a regime** (`overrides` del settore). Se almeno un override scatta, decide
   lo stadio 1. Con un solo override l'esito è il `meta` del regime referenziato (ADR 0009);
   con più override, l'esito della `multi_regime_intersection` del wizard che scatta; senza
   intersezione, il `meta` comune ai regimi (in v0.1 tutti `escalate_to_advisor` /
   `ambiguous`). `regimeRouting` elenca i regimi nell'ordine degli override nel file di
   settore (ADR 0009, amendment). Gli stadi 2-4 si valutano solo per la trace, che registra
   "esito NIS ordinario sospeso" e cosa avrebbero dato.
2. **Esclusione tipologica dichiarata** (`outcome_mapping` delle domande visibili; il corpus
   non ha opzioni con esito). Se scatta, decide; le regole dimensionali non si valutano e la
   trace registra "dimensione non valutata: tipologia esclusa (<citazioni>)". Se scattano più
   `outcome_mapping` con esiti diversi (oggi possibile solo in energia: produttore come
   attività principale e ricarica tra le ulteriori), l'esito è `escalate_to_advisor` /
   `ambiguous` con trace `type_exclusions_disagree`: l'engine non sceglie tra esclusioni
   discordanti. Punto da riesaminare (mappa, Parte 2).
3. **Regole size-blind** (`qualification_rules` la cui `condition` non legge `dimension`):
   regole categoriali e di canale della PA (ADR 0011, regola `categoria_pa ==
   canale_allegato_iv` di corpus 0.9.0), soggetto critico in cloud ed energia (ADR 0015). Una
   regola con `reference` prende esito, trace, citazioni e avvisi dal blocco referenziato.
4. **Regole dimensionali** (`qualification_rules` la cui `condition` legge `dimension`):
   mutuamente esclusive, ne scatta esattamente una tra quelle raggiungibili.

**Conflitto (2)×(3).** Se lo stadio 2 e lo stadio 3 scattano con esiti diversi (esempio:
produttore cliente attivo individuato come soggetto critico), l'esito è `escalate_to_advisor` /
`ambiguous` e il verdetto riporta la voce di catalogo segnalata
`esclusione_tipologica_vs_inclusione_size_blind` (Parte 2, fixture E26), se presente nel
catalogo. La premessa normativa proposta (art. 2 par. 2 lett. f) della direttiva sui soggetti
critici) **non è attestata**: nel nodo KB della direttiva quella lettera riguarda la pubblica
amministrazione. La voce lo dice e cita solo l'art. 3 c. 5 lett. a) D.Lgs. 138/2024.

**Nessuna regola.** Se nessuno stadio decide, l'esito è `escalate_to_advisor` / `ambiguous` con
trace `no_rule_matched`: è un difetto di corpus, dimostrato irraggiungibile dal test di
enumerazione. Più regole dello stesso stadio che scattano insieme (`multiple_rules_matched`)
sono trattate allo stesso modo.

### 2. Trigger espliciti

L'engine non deduce mai un trigger dalla posizione di un costrutto (invariante
`E_OUTCOME_WITHOUT_TRIGGER`, corpus 0.9.0). Il canale Allegato IV è deciso da una regola PA;
`l90_cumulo` della PA scatta su `categoria_pa == a|b|c`. Nessuna `outcome_mapping` né opzione
con esito dichiara `likely_in_scope` (`E_OUTCOME_MAPPING_INCLUSIVE`): una risposta può escludere
o lasciare indeterminato, l'inclusione viene dalle regole del settore.

Costrutti dichiarativi, validati e non valutati in v0.1: `on_yes.effect` / `on_yes.reference`
di `psnc` (decide l'override del settore), `out_of_scope_mvp`, `rientro_prerequisite`,
`tipologie[].multi_identity_possible` e `multi_identity_intra_sector` (duplicano attivazioni di
segnali già dichiarate sulle domande).

### 3. Grammatica e input assenti

- `visible_if` (ADR 0010): `eq`, `neq`, `includes`, `any_of`, `all_of` a un livello. `eq` e
  `neq` confrontano risposte singole (binarie o a scelta singola); su una risposta multipla
  `eq` è falso e `neq` è vero. `includes` vale solo su una risposta multipla.
- `condition` e `trigger`: congiunzione di confronti `<input> == <valore>` o `!=` uniti da
  `AND` (nel corpus 0.9.0 solo `==`). Un'espressione fuori grammatica è un errore di corpus.
- **Input assente**: una domanda non visibile non ha risposta. Ogni condizione su un input
  assente vale falso, per `eq`, `neq` e `includes`; `any_of` e `all_of` ne seguono (un
  `all_of` con un assente è falso, un `any_of` è vero solo se un altro termine è vero).
  Nessun tri-stato.
- **Visibilità**: domande del blocco comune meno `excluded_common_questions`, più quelle del
  wizard del settore, nell'ordine di `flow_order`; una domanda con `visible_if` è visibile se
  la condizione vale sulle risposte delle domande visibili; un follow-up è visibile se la
  madre è visibile e ha risposta `trigger_on`.
- **Validazione**: l'engine valida le risposte prima di valutare (stesso criterio di
  `E_FIXTURE_INPUT`, più la visibilità): domanda sconosciuta, risposta a domanda non visibile,
  domanda visibile e non opzionale senza risposta, valore fuori dalle opzioni. Gli errori sono
  raccolti tutti in un `InvalidAnswersError`. Per risposte valide `evaluate` non lancia mai.

### 4. Avvisi e segnali

- **Avvisi di risposta** (`on_yes.notices` con risposta "yes", `on_selected.notices` delle
  opzioni scelte): sempre, a prescindere dallo stadio che decide.
- **Avvisi di costrutto** (`notices` di regole, blocchi referenziati, `outcome_mapping`,
  `multi_regime_intersection`; `meta.exceptions_catalog_entry` dei regimi va in
  `regimeRouting`, non in `notices`): solo dai costrutti dello stadio che decide. Gli stadi
  scavalcati si valutano per la trace e per il conflitto (2)×(3) ma non emettono. Con il
  conflitto emettono i due costrutti in conflitto. Vincoli: E08 (avviso di risposta con
  stadio 1), E04, E07, E21, E25 (nessun avviso delle regole scavalcate).
- **Ordine**: prima gli avvisi di costrutto (stadio, poi ordine nel file), poi quelli di
  risposta (ordine delle domande); deduplica per id del catalogo, vale la prima occorrenza
  (E12). Ogni avviso è un id del catalogo, che porta le proprie citazioni.
- **Segnali**: quelli dichiarati sulle risposte (`activates_signals` di opzioni e
  `on_selected`, `on_yes`, `on_any_selected` con almeno una scelta) sempre; quelli dei trigger
  di settore (`cumulative_signals`, `cross_sector_signals`) solo se non decide lo stadio 1,
  perché appartengono alla valutazione NIS ordinaria, sospesa dall'instradamento (E20-E22: PA
  delle lett. a) e c) con PSNC o Cloud PA, nessun `l90_cumulo`). Ordine: risposte nell'ordine
  delle domande, poi trigger di settore; deduplica per id (E11, E12, E14).

### 5. Contratto

```ts
evaluate(input: { sectorId: string; answers: Answers }, corpus: Corpus): Verdict
```

- **Verdict**: nomi camelCase di CLAUDE.md (`outcome`, `assessmentMode`, `qualifica`,
  `regimeRouting`, `signals`, `notices`, `reasoningTrace`, `citations`, `disclaimerRequired:
  true`, `inputHash`, `corpusVersion`). `outcome` e `assessmentMode` si copiano dal costrutto
  che decide; le sole eccezioni sono i casi di escalation di questo ADR (conflitto (2)×(3),
  esclusioni discordanti, nessuna regola), che non hanno un costrutto da cui copiare.
  L'invariante escalate → ambiguous è asserita anche nell'engine.
- **`citations`**: citazioni dei costrutti che decidono, poi dei segnali emessi, poi delle voci
  di catalogo degli avvisi; deduplicate. Gli elenchi `citations` delle fixture non seguono
  ancora una regola unica (mappa, punto 5.7) e il test non li confronta.
- **`reasoningTrace`**: array ordinato di passi `{ stage, construct, result, partial?,
  citations, code?, detail?, corpusText? }`. `stage`: `validation` | `regime_routing` |
  `type_exclusion` | `size_blind` | `dimensional` | `resolution`; `construct`: localizzatore
  nel corpus (`<file>#<chiave>[<indice>]`); `result`: `matched` | `not_matched` |
  `not_evaluated` | `decided` | `suspended` | `conflict`; `partial`: esito parziale del
  costrutto; `code`: codice tecnico in inglese (`nis_assessment_suspended`,
  `dimension_not_evaluated`, `type_exclusions_disagree`, `no_rule_matched`, …); `detail`: nota
  tecnica in italiano; `corpusText`: il `reasoning_trace` del corpus, unico testo di contenuto.
  La trace è tecnica: le frasi rivolte all'utente vengono dal corpus.
- **`inputHash`**: sha256 (implementazione interna, sincrona, senza dipendenze) del JSON con
  `sectorId` e risposte a chiavi ordinate, scelte multiple ordinate.
- **Errori**: `InvalidAnswersError` (`issues: { questionId, kind, detail }[]`, `kind`:
  `unknown_sector` | `unknown_question` | `not_visible` | `missing` | `invalid_value`) per le
  risposte; `CorpusContractError` per un corpus che viola il contratto a runtime (espressione
  fuori grammatica, riferimento irrisolto), irraggiungibile con un corpus valido.
- **Purezza**: nessun I/O, data, random; stesso input → stesso Verdict. Observability solo
  nel Verdict (`reasoningTrace`) e in log console gated (`?debug=1` o ambiente dev), fuori
  dall'engine.

### 6. Invariante sulle regole dimensionali

Per ogni combinazione di risposte valide che raggiunge lo stadio 4 scatta esattamente una
regola dimensionale. Lo dimostra il test di enumerazione (Parte 2): tutte le combinazioni
valide per settore, rispettando la visibilità; oltre 50.000 combinazioni per settore,
campionamento con seed fisso dichiarato nel test.

## Alternative scartate

- **Dimensione prima.** È l'ordine PDA2 → PDA3 della FAQ Registrazione, ma è incompatibile
  con E25 (prosumer media impresa: l'esclusione tipologica deve prevalere) e darebbe un motivo
  del verdetto fuorviante ("media impresa, importante") per un soggetto escluso per tipologia.
- **Reticolo o merge degli esiti** (l'esito "più restrittivo" o una combinazione). Richiede un
  ordinamento degli esiti che le fonti non danno, e produce esiti che nessun costrutto del
  corpus dichiara (vincolo 2).
- **Campo di precedenza nel corpus.** Coerente con la scelta del corpus 0.6.0 ("nessun campo
  di precedenza", ADR 0015): la precedenza tra famiglie di costrutti è un fatto dell'engine,
  uguale per tutti i settori; dentro uno stadio le condizioni sono mutuamente esclusive.
- **Tri-stato per gli input assenti** (vero / falso / sconosciuto). Ogni sconosciuto andrebbe
  propagato fino all'esito; con la visibilità validata, un input assente è per costruzione
  irrilevante, e il falso è sufficiente.

## Conseguenze

- Quando decide lo stadio 1 o 2 la trace non ha uno stadio dimensionale decisivo: riporta
  "esito NIS ordinario sospeso" o "dimensione non valutata".
- La precedenza PSNC / Cloud PA nel percorso PA resta non attestata (punto 6 di STATUS, voce
  `psnc_cloud_pa_precedenza_non_attestata`): decide la `multi_regime_intersection`.
- Fixture E05 ed E06: l'avviso della regola cloud grande va aggiunto (Parte 2); test delle
  fixture con `notices` assente = non verificato (corpus 0.9.0).
- Il numero ADR 0013 non è assegnato (`docs/decisions/README.md`); prossimo ADR: 0017.

## Fonti

- Vincoli derivati dalla struttura del corpus e dal contratto di CLAUDE.md, non da fonte
  normativa esterna. Esempi: fixture E04, E07, E08, E12, E15, E20-E22, E25.
- `[[sources/Direttiva (UE) 2022-2555 (NIS2)]]`, riga 25 (art. 2 par. 2 lett. f): pubblica
  amministrazione); `dlgs_138_2024_art_3_c_5_lett_a`.
