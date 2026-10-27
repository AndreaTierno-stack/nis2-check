# ADR 0007 — Identità documentale dal testo: l'incidente Det. 127434/127437 e la checklist di ingest estesa

- **Stato:** accettato
- **Data:** 2026-07-02
- **Ambito:** governance dell'ingest KB (`LLM_Wiki`) ↔ attestazioni corpus (`nis2-check`)
- **Origine:** direttiva "STOP-AND-INGEST — Det. ACN 127437/2026" (secondo credito) e verifica sul testo che ne ha invertito la premessa

## Contesto

La direttiva di ingest chiedeva di correggere il nodo
`[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]` sulla base
di due premesse **date per acquisite**:

1. il PDF firmato `detacn_piattaformanis_251218-v9_signed.pdf` sarebbe la
   **Det. ACN n. 379887 del 19/12/2025** (piattaforma, **abrogata**), da cui il
   nodo sarebbe stato costruito "sul PDF sbagliato";
2. il file `Det_127437_2026.pdf` sarebbe la piattaforma **corretta** vigente.

La verifica sul **testo** dei PDF ha invertito entrambe le premesse:

- `detacn_piattaformanis_251218-v9_signed.pdf` (909 righe, Capi I-VI, artt. 1-24)
  è la piattaforma **vigente Det. 127437/2026**: contiene la clausola *"La
  presente determinazione aggiorna e sostituisce la Determinazione ACN n. 379887
  del 19 dicembre 2025"* e *"si applica a decorrere dal 15 aprile 2026"*, firma
  digitale 13/04/2026 12:13:09. Il token **`251218`** nel filename è un **codice
  di bozza/versione** (`-v9`), **non** un numero di protocollo. Il protocollo
  127437/2026 è confermato in modo indipendente da `CAT.4`
  ([[sources/FAQ NIS - Categorizzazione]]) e `FRN.2`-`FRN.3`
  ([[sources/FAQ NIS - Aggiornamento delle informazioni]]).
- `Det_127437_2026.pdf` (115 righe, 5 articoli) è invece la determinazione
  **termini** (protocollo **127434/2026**): estende ai soggetti inseriti nel
  2026 i termini per misure di sicurezza e notifica, richiama la
  `Det. 379907/2025`, *"si applica a decorrere dal 30 aprile 2026"*, firma
  13/04/2026 12:12:15. Il suo filename **codificava il protocollo della
  piattaforma (127437) su un testo che è la termini (127434)**.

### Anatomia dell'errore

1. **Mislabeling del filename.** `Det_127437_2026.pdf` portava un protocollo
   errato: nome che afferma un'identità che il testo smentisce.
2. **Collisione di protocolli adiacenti.** 127434 (termini) e 127437
   (piattaforma) sono numeri vicini, firmati nella **stessa sessione** (13/04/2026,
   12:12 e 12:13) dallo **stesso firmatario** (Frattasi): condizioni ideali per
   uno scambio.
3. **Falso positivo da codice di bozza nel filename.** Il token `251218` è stato
   letto come possibile protocollo/data e ha alimentato l'ipotesi (errata) di una
   determinazione diversa e abrogata (379887).
4. **Brief che codifica la conclusione come premessa.** La direttiva presentava
   "il nodo è costruito sul PDF sbagliato" come **fatto acquisito**, non come
   ipotesi. Eseguirla alla lettera avrebbe prodotto un rename/ricreazione
   **distruttivi** (nodo piattaforma degradato a "379887 abrogata") su una
   premessa falsa.

## Decisione

**L'identità di un documento normativo si stabilisce dal TESTO, mai dal nome del
file né da fonti secondarie.** Adottata una checklist di ingest estesa, vincolante
per ogni nuova fonte normativa (determinazioni, decreti, DPCM).

### Checklist di identità documentale (dal testo)

Prima di creare o correggere un nodo `sources/`, estrarre il testo e verificare:

- **Clausola di successione/abrogazione**: *"aggiorna e sostituisce…"* /
  *"abroga…"* — dice quale atto è e quale sostituisce.
- **Data di applicazione**: *"si applica a decorrere dal…"* — distingue atti
  altrimenti simili.
- **Struttura**: numero di Capi/articoli (es. piattaforma = 24 artt. in 6 Capi;
  termini = 5 artt.).
- **Firma digitale**: data e ora, firmatario — distingue versioni firmate nella
  stessa giornata.
- **Base di adozione**: gli articoli della norma abilitante citati in premessa
  (es. termini = art. 31 cc. 1-2 + art. 40 c. 5 lett. l); piattaforma = art. 7
  c. 6 + art. 40 c. 5 lett. b).

### Regola dei tre punti sul protocollo

Il numero di protocollo deve coincidere su **tre punti**: **testo/frontespizio ↔
nodo KB ↔ filename**. Se il protocollo **non è stampato nel testo** (caso della
termini: il frontespizio riporta *"data del protocollo"* senza numero),
attribuirlo dalla **pubblicazione ACN** e **registrare la fonte
dell'attribuzione** nel frontmatter (`protocol_source`), mai dedurlo dal filename.

### Regola sui token del filename

I filename possono contenere **codici di bozza/versione** (`251218-v9`,
`-v4_post`, `-signed`) che **non** sono numeri di protocollo. Mai inferire il
protocollo da un token del filename.

### Regola sulle premesse del brief

Quando un brief **codifica una conclusione come premessa** ("X è costruito sul
file sbagliato", "Y è l'atto abrogato"), trattare la premessa come **ipotesi da
verificare sul testo** prima di qualsiasi azione distruttiva. Nessun
rename/ricreazione distruttivo su premessa non verificata: in caso di conflitto
tra brief e testo, **prevale il testo** e si ferma per segnalare.

## Conseguenze

- Il nodo piattaforma **non** è stato rinominato/degradato: era già costruito sul
  testo corretto (Det. 127437/2026 vigente). Corretto solo il `source_path`
  (agganciato al PDF firmato reale) e chiusa DIV-P1 (esoneri DORA verificati sul
  testo — vedi CHANGELOG [0.2.1]).
- Il file `Det_127437_2026.pdf` è stato rinominato in
  `Det_127434_2026_termini.pdf` (protocollo corretto nel nome); il nodo termini
  è stato agganciato a una copia autentica del documento firmato.
- In `raw/articles/` resta `detacn_misuresicurezza-v4_post.pdf`: **testo
  identico** alla termini (stessi 5 articoli, stesse date, stessa firma 12:12:15;
  differisce solo l'MD5 per metadati PDF). È una **copia ridondante** non rimossa:
  la cancellazione in `raw/` non è stata autorizzata. Consolidamento rimesso a
  decisione dell'utente.
  > **Nota 2026-10-27 (correzione):** il file non è più in `raw/articles/`. Con
  > DEC-004 (2026-07-02, `_meta/decision_log.md` della KB) è stato spostato, non
  > cancellato, in `raw/_archive/detacn_misuresicurezza-v4_post.pdf`. Verificato
  > sul filesystem della KB il 2026-10-27: presente in `raw/_archive/`, assente in
  > `raw/articles/`.
- La checklist estesa integra la regola di autorità del progetto (citazioni solo
  a granularità verificata) con una regola di **identità** a monte: prima *quale
  atto è*, poi *cosa cita*.

## Contatore dei crediti stop-and-ingest

La direttiva era annunciata come **"secondo e ultimo credito"**. Poiché la sua
premessa era falsa e l'operazione si è risolta in una **correzione di
attestazione** (no-op di re-ingest: il testo era già quello giusto), **il secondo
credito NON è stato consumato**.

- **Residuo: 1 credito stop-and-ingest fino a v0.1.0.**

Registrato anche in `_meta/decision_log.md` (DEC-003).

## Fonti

- Testo verificato: `detacn_piattaformanis_251218-v9_signed.pdf` (piattaforma
  Det. 127437/2026), `Det_127434_2026_termini.pdf` = `detacn_misuresicurezza-v4_post.pdf`
  (termini Det. 127434/2026).
- KB: `[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]`,
  `[[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]`,
  `[[sources/FAQ NIS - Categorizzazione]]` (`CAT.4`),
  `[[sources/FAQ NIS - Aggiornamento delle informazioni]]` (`FRN.2`-`FRN.3`).
- Correlate: [ADR 0006](0006-cross-walk-v2-retag-doppio.md) (retag doppio, DIV-P1).
