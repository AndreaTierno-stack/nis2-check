# S3, Blocco 1: mappa dei costrutti del corpus sugli stadi dell'ADR 0016 (2026-10-30)

> Lettura di corpus 0.8.0 (commit 8d317c6) prima di scrivere l'engine: loader e schemi
> (`packages/corpus/src`), invarianti (`docs/ARCHITECTURE.md` §3), i tre file di settore,
> `regimes/`, catalogo eccezioni, registro citazioni, le 25 fixture, ADR 0009-0012, 0014,
> 0015. Scritta prima del report in chat (regola di CLAUDE.md). Esito: **STOP**, due
> costrutti non mappabili sugli stadi senza inventare semantica (sezione 4).

Stadi dell'ADR 0016 (bozza del brief): (1) instradamento a regime; (2) esclusione
tipologica dichiarata (`outcome_mapping`, opzioni con esito); (3) inclusione size-blind
(regole categoriali PA, soggetto critico); (4) regole dimensionali.

## 1. Grammatica delle espressioni

- `visible_if` (ADR 0010): oggetto `{input, op: eq|neq|includes, value}` o `any_of`/`all_of`
  a un livello. Unico uso composto: `registrato_pun` (`any_of` con `eq` + `includes`).
- `condition` delle regole, `trigger` di override, intersezioni e segnali: stringhe. Nel
  corpus 0.8.0 compaiono solo `==` e `AND` (nessun `!=`, nessun `OR`). L'ADR 0010 non le
  copre: la grammatica effettiva è "uno o più `<input> == <valore>` uniti da `AND`".
- `conditional_followup.trigger_on`: visibilità della sotto-domanda (ADR 0010, punto 4).

## 2. Costrutti che producono esito, qualifica, avviso o instradamento

| Costrutto | Dove | Stadio | Fixture |
|---|---|---|---|
| `overrides[]` (trigger `psnc == yes`, `classificazione_cloud_pa == yes`) → `reference` al regime, esito dal `meta` | 3 settori | 1 | E07, E20, E21 |
| `multi_regime_intersection` (`psnc == yes AND classificazione_cloud_pa == yes`) → `escalate_to_advisor`/`ambiguous`, `notices` | wizard PA | 1 (esito dell'intersezione quando più override scattano) | E22 |
| `meta` dei regimi (`assessment_mode`, `verdict_outcome`, `exceptions_catalog_entry`, `residual_nis_obligation`) | `regimes/` | 1 (contenuto di `regimeRouting`) | E07, E08, E20-E22 |
| `on_yes.effect` / `on_yes.reference` della domanda `psnc` | blocco comune | nessuno: dichiarativo, duplica l'override di settore (ADR 0009: decide l'override) | — |
| `outcome_mapping` di `produttore_cliente_attivo` (`si` → `out_of_scope`) | wizard energia | 2 | E25 |
| `outcome_mapping` di `registrato_pun` (`no` → `qualitative_signal_only`/`likely_out_of_scope`; `non_so` → `qualitative_signal_only`/`ambiguous`) | wizard energia | 2 | E04 (`no`) |
| `outcome_mapping` di `registrato_pun`, `answer: si` → `categorical_assessment`/`likely_in_scope` | wizard energia | **non mappabile** (4.1) | E15 |
| opzioni con esito | — | nessuna nel corpus: lo schema `Option` non ha campi di esito; l'unico esito per risposta è `outcome_mapping` | — |
| regole PA `categoria_pa == a`; `== b\|c\|d AND soggetto_critico == no\|yes` → `categorical_assessment` | settore PA | 3 | E09, E10, E16-E18 |
| regola PA `categoria_pa == esclusa_art_4_c_2` → `out_of_scope` | settore PA | 3 (regola di categoria, esclusa per condizione dalle altre; vedi 3.2) | E19 |
| regola `soggetto_critico == yes` → essenziale | cloud, energia | 3 | E23, E24 |
| regole `dimension == … AND soggetto_critico == no` | cloud, energia | 4 | E01-E03, E13-E15 |
| `allegato_iv_channel` (`verdict_strategy: qualitative_signal_only`, `verdict_outcome: ambiguous`, `notices`) | settore PA | **non mappabile** (4.2) | E11 |
| `notices` delle regole, di `outcome_mapping`, di `multi_regime_intersection`, di `allegato_iv_channel` | settori, wizard | raccolta avvisi | E01-E03, E09-E12, E16-E18, E22, E25 |
| `on_yes.notices` (`dora`, `cloud_pa`), `on_selected.notices` (`attivita_culturale`, `asl`) | wizard | raccolta avvisi (posizione di risposta) | E05, E06, E08, E12 |
| `out_of_scope_mvp[]` con `verdict_outcome` (PA: sanitario, Allegato IV) | settore PA | nessuno: documentale, senza trigger; il Verdict non ha un campo per un esito secondario | E12 (`sanitario_secondary`, non confrontato dal test) |
| `rientro_prerequisite` (PA, ISTAT S13) | settore PA | nessuno: assunzione dichiarata nelle trace e nell'avviso `pa_prerequisito_istat_s13` | — |

Segnali (non producono esito, ma il Verdict li riporta): `activates_signals` di opzioni,
`on_selected`, `on_yes`, `on_any_selected`; `cross_sector_signals` (trigger), `multi_identity_intra_sector`
(`trigger: any_selected` su `condition_ref`), `tipologie[].multi_identity_possible`
(`condition_ref` binaria), `cumulative_signals` (`applies_to_categories`). Gli ultimi tre
duplicano attivazioni già dichiarate sulle domande (deduplica per id). `applies_to_categories:
[a, b, c]` lega implicitamente le categorie del settore alla domanda `categoria_pa` (vedi 4.3).

## 3. Mutua esclusione delle regole di settore

### 3.1 Cloud ed energia (4 regole ciascuno)

Input: `soggetto_critico` ∈ {yes, no}, `dimension` ∈ {micro_or_piccola, media, grande}, entrambi
nella fase `standard_identification`, sempre visibili, non opzionali.

- `soggetto_critico == yes` scatta per i 3 valori di `dimension`; le tre regole dimensionali
  richiedono `soggetto_critico == no`: con "yes" scatta solo la regola 1.
- Con "no" scatta esattamente una regola dimensionale (i tre valori di `dimension` sono
  disgiunti ed esaustivi).

**Dimostrato**: per ogni combinazione valida scatta esattamente una regola. Allo stadio 4 si
arriva solo con `soggetto_critico == no`, e lì scatta esattamente una regola dimensionale.

### 3.2 Pubblica amministrazione (8 regole)

Input: `categoria_pa` ∈ {a, esclusa_art_4_c_2, b, c, d, canale_allegato_iv} (scelta singola),
`soggetto_critico` ∈ {yes, no}.

- a: una regola, senza condizione su `soggetto_critico` (già essenziale, art. 6 c. 1 lett. e)).
- esclusa_art_4_c_2: una regola, senza condizione su `soggetto_critico` (ADR 0015: caso non
  modellato).
- b, c, d: due regole ciascuna, `soggetto_critico == no` / `== yes`.
- canale_allegato_iv: **nessuna regola**.

**Dimostrato**: le regole sono mutuamente esclusive (condizioni su valori distinti della stessa
scelta singola, o sullo stesso valore con `soggetto_critico` opposto). **Smentito**:
l'esaustività. Per `canale_allegato_iv` (12 combinazioni di profilo e `soggetto_critico`)
nessuna regola scatta; l'esito viene da `allegato_iv_channel`, che non dichiara un trigger
(4.2).

## 4. Costrutti non mappabili: STOP

### 4.1 `registrato_pun`, `outcome_mapping` con `answer: si`

```yaml
- answer: si
  outcome: categorical_assessment   # tipologia confermata: prosegue con l'identificazione standard (esito per dimensione)
  verdict_outcome: likely_in_scope   # provvisorio: la regola dimensionale del settore puo' rifinirlo (micro/piccola -> likely_out_of_scope)
```

- **Viola l'invariante proposto `E_OUTCOME_MAPPING_INCLUSIVE`** (nessuna `outcome_mapping` può
  dichiarare `likely_in_scope`). Il brief prescrive STOP.
- **Non è un'esclusione tipologica**: è una conferma di tipologia che rimanda alla dimensione.
  Se lo stadio 2 la applicasse, E15 (`si`, media) darebbe `categorical_assessment` senza
  qualifica, mentre l'atteso è "importante" dalla regola media. Il commento chiede che non
  decida: lo stadio 2 dovrebbe saltarla, cioè l'engine ignorerebbe un esito dichiarato
  (contro il vincolo 2 di CLAUDE.md) oppure dovrebbe interpretare "provvisorio".
- **Proposta, da decidere**: togliere la voce `si` dall'`outcome_mapping` (minor del corpus:
  cambia una regola, non gli esiti attesi; E15 invariata). La frase di trace della voce
  andrebbe persa o spostata nella `help_text_it`.

### 4.2 `allegato_iv_channel`

- Dichiara un esito (`verdict_strategy: qualitative_signal_only`, `verdict_outcome: ambiguous`)
  e degli avvisi, ma **nessun trigger**. Il `corpus_ref` di E11 usa
  `allegato_iv_channel[profilo==societa_inhouse]`, che non è un campo del YAML.
- Non è uno dei quattro stadi: non instrada, non esclude per tipologia, non include
  size-blind, non è dimensionale. Per applicarlo l'engine dovrebbe dedurre che scatta quando
  `categoria_pa == canale_allegato_iv` (o quando `profilo_allegato_iv` ha risposta).
- **Proposta, da decidere**: una regola di qualificazione esplicita
  `categoria_pa == canale_allegato_iv` (`qualitative_signal_only` / `ambiguous`, con gli
  avvisi del canale) nello stadio 3, e il canale ridotto a dati di settore (profili,
  autorità proponenti). In alternativa, un campo `trigger` nel canale con uno stadio proprio
  nell'ADR 0016. In entrambi i casi è una minor del corpus; E11 resta invariata.

### 4.3 Da decidere, non bloccante

- `cumulative_signals.applies_to_categories: [a, b, c]` (PA): binding implicito categorie →
  `categoria_pa`. Funziona perché gli id delle categorie coincidono con le opzioni, ma è
  semantica non dichiarata. Proposta: `trigger` esplicito, come `cross_sector_signals`.
  Influenza i segnali di E09, E10, E12, E18, non gli esiti.

## 5. Altri riscontri per l'ADR 0016 e le fixture

1. **Avvisi e stadi.** Le fixture fissano una regola più stretta del testo del brief ("raccolti
   da tutte le posizioni … a prescindere dallo stadio che decide"):
   - gli avvisi delle posizioni di risposta (`on_yes`, `on_selected`) si raccolgono sempre:
     E08 riporta `cloud_pa_fornitore_qualificato_a1_8_2` anche se decide lo stadio 1;
   - gli avvisi delle regole si raccolgono solo dalla regola che decide: E07 (PSNC, energia
     grande) e E21 (PSNC, PA lett. a) non riportano gli avvisi delle regole scavalcate; E04
     ed E25 (stadio 2) non riportano `energia_regime_transitorio_ose` della regola media.
   La formulazione dell'ADR va adattata a questo.
2. **E05 ed E06: atteso incompatibile con la regola del punto 1.** Cloud grande, decide la
   regola grande (stadio 4), che emette `cloud_stabilimento_principale_multi_ue` (atteso in
   E01, stessa regola). E05 ed E06 dichiarano `notices` e lo omettono. Nessuna regola di
   raccolta coerente con E01 lo esclude: da correggere nelle fixture (Parte 2), non
   nell'engine. Probabile origine: avviso aggiunto alle regole cloud in 0.6.0 dopo la stesura
   degli avvisi di E05 ed E06.
3. **`notices` assente nelle fixture.** Il README delle fixture: "assente = nessun avviso
   verificato dalla fixture" (E04, E07, E13, E15, E20, E21, E23, E24). Il test attuale
   confronta `notices ?? []`: contraddice il README e farebbe fallire E13, E15, E24 (le regole
   che decidono emettono avvisi). Da allineare al README nel test.
4. **Premessa del conflitto (2)×(3) non attestata.** Nel nodo Direttiva dell'export (riga 25)
   l'art. 2 par. 2 lett. f) riguarda la **pubblica amministrazione**, non i soggetti critici;
   il nodo non tratta i soggetti critici. La voce di catalogo del conflitto dirà "non
   attestato" e citerà solo `dlgs_138_2024_art_3_c_5_lett_a`.
5. **ADR 0013 inesistente.** Il numero è stato saltato (la decisione è diventata l'ADR 0014,
   `docs/verifications/2026-10-28-cloud-energia-dora.md`, punto C-C1). Gli avvisi sono
   dell'ADR 0012.
6. **Contratto del Verdict.** CLAUDE.md e `packages/engine/src/types.ts` usano camelCase
   (`outcome`, `assessmentMode`, `qualifica`, `reasoningTrace`, `disclaimerRequired`,
   `corpusVersion`, `inputHash`); la firma attuale è `evaluate(answers, corpus)`. Il brief
   chiede `(sectorId, answers, corpus)` e una trace strutturata (stadio, costrutto, esito
   parziale, citazioni): cambio di contratto da registrare in CLAUDE.md e `types.ts` nello
   stesso commit dell'engine. `inputHash` (sha256) va calcolato senza dipendenze runtime e in
   modo sincrono (engine puro, eseguito anche nel browser).
7. **Citazioni delle fixture.** Il test non le confronta; gli elenchi non seguono una regola
   unica (E12 non riporta le citazioni di registrazione del segnale ASL, nessuna fixture
   riporta quelle di `l90_cumulo`). La regola di composizione di `Verdict.citations` va fissata
   nell'ADR 0016.
