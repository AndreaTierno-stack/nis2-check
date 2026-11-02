# ADR 0017 — Ritiro del gate pre-lancio e della review legale del disclaimer

- **Stato:** accettato
- **Data:** 2026-10-30
- **Ambito:** processo di rilascio pubblico del tool `nis2-check`
- **Supera:** ADR 0008 (perimetro del gate pre-lancio: solo tool, KB esente)
- **Decisione dell'autore** del 2026-10-30

## Contesto

L'ADR 0008 subordinava ogni release pubblica del tool alla review di un consulente GRC
italiano terzo (5 scenari, OK informale citabile, elenco delle eccezioni non gestite) e, su
binario separato, alla review legale del disclaimer. Con l'engine verde sulle 27 fixture e
sull'enumerazione dei percorsi (S3, ADR 0016) il gate diventava il prossimo vincolo sul
calendario, senza una data controllabile dall'autore: il reviewer non è stato ancora
individuato e la review legale non ha un incaricato. Il tool è un progetto hobbistico non
commerciale, informativo e mai di consulenza (CLAUDE.md).

## Decisione

1. **Gate pre-lancio ritirato.** La release pubblica del tool non attende la review GRC terza.
2. **Review legale del disclaimer ritirata.** Il disclaimer resta obbligatorio e incondizionato
   (`disclaimerRequired: true`, click-wrap bloccante), ed è dichiarato **AS-IS, non rivisto da
   un legale**.
3. **Anteprima di studio.** Il tool esce come anteprima di studio: ogni pagina dell'esito porta
   il banner "Anteprima di studio: non è un parere legale e non sostituisce la registrazione
   sulla piattaforma ACN".
4. **Review GRC come azione di posizionamento.** La richiesta di review ai consulenti GRC
   resta, dopo il rilascio, come azione di posizionamento (STATUS, segnali GRC), non come
   condizione di rilascio.

## Alternative scartate

- **Mantenere l'ADR 0008.** Lega il rilascio a terzi non ancora individuati: lo stesso schema
  di blocco che l'ADR 0008 aveva rilevato per la KB (16 settimane senza artefatti pubblici).
- **Gate con scadenza** (review entro una data, poi rilascio comunque). Equivale al ritiro con
  un'attesa in più, senza aggiungere garanzie verificabili.
- **Rilascio privato a un gruppo ristretto.** Non produce l'artefatto pubblico che serve al
  posizionamento e non sostituisce la review.

## Conseguenze

- Restano invariati i vincoli di contenuto (CLAUDE.md, vincoli 1-8): mai verdetti categorici,
  esiti copiati dal corpus, citazioni a granularità verificata, zero telemetria.
- La checklist pre-rilascio (S4.2) sostituisce il gate: CI verde, `pnpm engine:enumerate --full`
  senza violazioni, review avversaria interna, disclaimer AS-IS dichiarato.
- STATUS: riga "Gate pre-lancio" aggiornata; il punto 3 (contatto reviewer) diventa un'azione
  di posizionamento post-rilascio.
- Prossimo ADR: 0018.

## Fonti

- Decisione dell'autore del 2026-10-30; ADR 0008; CLAUDE.md (vincoli non negoziabili).

## Amendment 2026-11-02: repo privato fino al pre-rilascio

La clausola dell'ADR 0008 sul repo `nis2-check` privato fino al pre-rilascio v0.1.0 resta in vigore; il passaggio a pubblico si decide nel Project a fine S4.2.
