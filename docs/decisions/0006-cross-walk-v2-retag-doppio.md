# ADR 0006 — Cross-walk v2: retag doppio KB↔corpus per il coordinamento DORA-NIS

- **Stato:** accettato
- **Data:** 2026-07-02
- **Ambito:** coerenza KB (`LLM_Wiki`) ↔ corpus (`nis2-check`)
- **Aggiornamento (2026-07-02, v0.2.1):** DIV-P1 — usato in questa ADR come esempio
  di affermazione retag-doppia — è stato **chiuso**. Gli esoneri DORA sono ora
  attestati con granularità di comma sul testo ufficiale (art. 7 c. 6, art. 16
  c. 13, art. 20 c. 6 Det. 127437/2026). Vedi [ADR 0007](0007-ingest-det-127437-identita-documentale.md).
  Il **meccanismo** del retag doppio descritto qui resta valido; gli esempi che
  seguono riflettono lo stato APERTO al momento della decisione.
- **Aggiornamento (2026-07-02, esecuzione anticipata DEC-002):** il retag di scope
  del nodo cross-walk a 4 framework
  ([[synthesis/Cross-walk NIS2 art. 21 - NIST CSF 2.0 - FNCDP - ISO 27002]],
  `grc_personal` → `both`) — originariamente **pianificato al kickoff v0.2** come
  base dell'estensione controlli (Fase 3) — è stato **eseguito in anticipo** su
  richiesta dell'utente. Motivazione: evitare di rifare l'export della Project
  Knowledge a metà sviluppo v0.2 e allineare da subito il tag alla natura
  dual-purpose del nodo (asset GRC/ISO LA + base controlli tool). Il nodo è ora
  incluso nell'export PK (`scope: nis2_tool OR both`, 72 nodi). Nessun effetto sul
  meccanismo di retag doppio descritto in questa ADR. Registrato in
  `_meta/decision_log.md` (DEC-002, ATTUATA).

## Contesto

Il coordinamento DORA-NIS vive su due repository con autorità diverse:

- **regole di flusso** → il corpus è autoritativo (il file `regimes/dora.yaml`
  dichiara `routing_effect: massive_disapplication` e l'obbligo residuo art. 7 c. 1);
- **attestazioni normative** → i nodi KB e le fonti ingerite sono autoritativi
  (es. l'elenco puntuale degli esoneri DORA).

Senza un cross-walk esplicito, le due rappresentazioni divergono: il corpus può
citare un comma che la KB non attesta, o la KB può descrivere un esonero che il
corpus codifica con granularità non supportata dal testo ufficiale.

## Decisione

Adottare un **retag doppio** sistematico: ogni affermazione normativa condivisa
è marcata su **entrambi** i lati con lo stesso stato di verifica.

- Il `regimes/dora.yaml` porta `open_points: [DIV-P1_esoneri_dora_da_riconciliare]`.
- I nodi KB corrispondenti (`[[concepts/Coordinamento DORA-NIS]]`, fonte
  "Determinazione ACN piattaforma e procedure") portano un callout
  `> [!warning]` con lo stesso codice APERTO (DIV-P1) e la stessa lista di commi
  da riconciliare (art. 7 c. 6, art. 16 c. 13, art. 20 c. 6).
- Nessun lato può "promuovere" un esonero a granularità di comma finché il testo
  ufficiale non è riconciliato su entrambi. In caso di dubbio: si degrada la
  citazione o si lascia APERTO, mai si inventa.

## Conseguenze

- La divergenza è tracciabile con un unico codice (DIV-P1) grep-abile su entrambi
  i repo.
- Il fixture E06 (DORA) porta `open_points: [DIV-P1]`: lo scenario è congelato
  come routing massive_disapplication, ma segnala che l'elenco esoneri non è
  ancora codificato con granularità di comma.
- Regola operativa: quando si aggiorna un lato di un'affermazione retag-doppia,
  aggiornare o ri-verificare anche l'altro nello stesso passaggio.

## Fonti

- Corpus: `dlgs_138_2024_art_3_c_14`, `det_piattaforma_127437_2026_art_20`
- KB: `[[concepts/Coordinamento DORA-NIS]]`, `[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]`
