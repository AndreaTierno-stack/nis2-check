# ADR 0010 — `visible_if` come condizione strutturata

- **Stato:** accettato
- **Data:** 2026-10-28
- **Ambito:** schema del corpus (wizard) / contratto engine
- **Versione corpus:** 0.4.0
- **Chiude:** punto aperto 15 di `docs/STATUS.md` (S2)

## Contesto

In S2 la grammatica di `visible_if` era stata fissata come stringa con un solo
confronto (`<input> == <valore>` o `!=`), validata da una regex. Il corpus 0.3.1
conteneva due forme fuori grammatica:

- `dimension` (`wizard__disambiguation.yaml`): `"sector != pubblica_amministrazione"`.
  `sector` non è un input del wizard, è il settore di ingresso.
- `registrato_pun` (`wizard__energia_elettrica.yaml`): `"tipologia_elettrica ==
  gestore_punti_ricarica OR attivita_elettriche_ulteriori contains
  gestore_punti_ricarica"`. Ha due confronti e un operatore su scelta multipla.

Esisteva inoltre `conditional_on: {question, equals}` (wizard PA, `sottotipo_c` e
`profilo_allegato_iv`). Esprime lo **stesso concetto** di `visible_if`: la domanda
è visibile solo se una risposta precedente ha un certo valore. Due sintassi per un
concetto obbligano l'engine a due interpreti.

## Decisione

1. **`visible_if` è un oggetto YAML**; la forma stringa è ritirata e la
   validazione la rifiuta (`E_VISIBLE_IF`).
2. **Grammatica** (un solo livello, nessun annidamento):

   ```yaml
   # condizione semplice
   visible_if: { input: <id domanda>, op: eq | neq | includes, value: <id opzione> }

   # composizione a un livello: almeno due condizioni semplici
   visible_if:
     any_of:            # oppure all_of
       - { input: …, op: …, value: … }
       - { input: …, op: …, value: … }
   ```

   - `input`: id di una domanda del wizard (o del blocco comune
     `wizard__disambiguation.yaml`); deve esistere.
   - `value`: id di un'opzione di quella domanda (`yes`/`no` per le binarie).
   - `op`: `eq`, `neq`, `includes`; `includes` è ammesso solo se `input` è una
     domanda `multi_select`.
   - `any_of` (OR) e `all_of` (AND) contengono solo condizioni semplici.
3. **`conditional_on` è unificato in `visible_if`** e ritirato:
   `conditional_on: {question: categoria_pa, equals: c}` diventa
   `visible_if: {input: categoria_pa, op: eq, value: c}`. Il flag `conditional:
   true` di `registrato_pun` è ridondante e viene rimosso.
4. **`conditional_followup.trigger_on` resta**, con scopo fissato: vale solo per la
   sotto-domanda annidata nella domanda madre (`binary_with_conditional_followup`) e
   significa "visibile se la madre ha risposta `trigger_on`". Non è un meccanismo
   generale di visibilità: per domande di primo livello si usa `visible_if`.
5. **Esclusione della PA dalla domanda `dimension`: strutturale, non condizionale.**
   Il `visible_if` di `dimension` è rimosso. La PA non arriva a
   `standard_identification` perché il suo wizard non ha quella fase in `flow_order`
   e il settore è `size_blind: true` (art. 3 c. 6 D.Lgs. 138/2024, già in
   `meta.citations` di `sectors__pubblica_amministrazione.yaml`).

## Alternative scartate

- **Estendere la regex con `OR`/`AND` e `contains`.** Una stringa con operatori
  logici è un linguaggio da analizzare (precedenza, parentesi, quoting) dentro un
  campo YAML; ogni estensione futura ne complica il parser, e l'errore di battitura
  si scopre solo eseguendo la regex. La forma strutturata è validata dallo schema
  zod campo per campo, con identificatori controllati sul wizard.
- **Annidamento libero di `any_of`/`all_of`.** Nessun caso nel corpus lo richiede;
  un solo livello copre OR e AND senza introdurre alberi di condizioni da
  spiegare nell'Explainability Mode.
- **Mantenere `conditional_on` accanto a `visible_if`.** Stesso concetto con due
  sintassi: scartato per il punto 3.

## Conseguenze

- Corpus 0.4.0: `registrato_pun` usa `any_of` con `eq` + `includes`; le due domande
  PA usano `visible_if` semplice; `dimension` non ha più condizione.
- L'engine (S3) valuta un solo costrutto di visibilità più il `trigger_on` dei
  follow-up. Da fissare in S3: la semantica di una condizione il cui `input` non ha
  risposta (domanda saltata o non ancora posta).
- La chiave `visibility_citations` resta nello schema (citazioni che motivano una
  condizione di visibilità) ma oggi non è usata.
  > **Nota 2026-10-28:** rimossa dallo schema in corpus 0.5.0 (dichiarata e mai
  > usata); rientra quando una condizione di visibilità avrà bisogno di citazioni.

## Fonti

- Vincolo derivato dalla struttura del corpus (non da fonte normativa esterna).
- `packages/corpus/src/schemas/files.ts` (`VisibleIf`), `corpus.ts` (verifica degli
  identificatori).

## Amendment 2026-11-02: visibilità di settore delle domande comuni (corpus 0.13.0)

Un wizard di settore può dare un `visible_if` a una domanda del blocco comune con
`common_question_visibility: { <id della domanda comune>: <visible_if> }`, nella stessa grammatica
di questo ADR. La condizione vale solo in quel settore: negli altri la domanda comune resta come è
dichiarata nel blocco. Vincoli verificati da `corpus:validate` (`E_VISIBLE_IF`): la chiave è una
domanda del blocco comune non esclusa dal wizard; ogni `input` è una domanda del wizard posta in
una fase precedente del suo `flow_order` (la visibilità legge solo risposte già date, ADR 0016 §3).
Primo uso: nel PA `psnc` non è posta all'organo escluso dall'art. 4 c. 2 (review avversaria del
2026-11-02, F02). ADR 0016 e l'invariante 26 di `docs/ARCHITECTURE.md` restano invariati.
