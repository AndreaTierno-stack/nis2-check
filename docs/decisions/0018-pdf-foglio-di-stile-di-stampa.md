# ADR 0018: PDF dal foglio di stile di stampa

- **Stato:** accettato
- **Data:** 2026-11-02
- **Ambito:** deliverable PDF del tool (`apps/web`), struttura del monorepo
- **Decisione dell'autore** del 2026-11-02 (S4.2, Blocco 0)

## Contesto

CLAUDE.md prevede un PDF "Esito preliminare di verifica dell'ambito NIS2" generato interamente
nel browser, con watermark, disclaimer di non-consulenza su ogni pagina, una parte sintetica
per il lettore non esperto e una parte tecnica per il consulente. Lo scaffold di S2 aveva
riservato al PDF un pacchetto dedicato (`packages/pdf`), rimasto vuoto. Con S4.1 la pagina
dell'esito rende già tutto il contenuto del PDF a partire dal Verdict, dal corpus e dal
registro citazioni: esito, avvisi, "Come è stato calcolato", fonti numerate per gruppo,
risposte date. Un secondo renderer dovrebbe ricostruire lo stesso contenuto con un altro
modello di layout.

## Decisione

1. **Il PDF è la stampa del browser.** Il pulsante "Scarica PDF" chiama `window.print()`;
   l'utente sceglie "Salva come PDF" nella finestra di stampa. Il layout di carta è un foglio
   di stile `@media print` sulla pagina dell'esito: nasconde navigazione, colonna laterale e
   pulsanti, mostra esito, avvisi, trace, fonti con l'URL esplicito, risposte date, limiti del
   percorso, intestazione, piè di pagina e watermark.
2. **Nessuna libreria PDF e nessun server.** Nessuna dipendenza nuova, nessuna funzione
   serverless: il contenuto non lascia il browser (CLAUDE.md, vincolo 7).
3. **`packages/pdf` rimosso.** Il PDF vive in `apps/web` accanto alla pagina che stampa.
4. **Contenuto fissato da CLAUDE.md** ("Deliverable PDF", aggiornato nello stesso commit):
   titolo, watermark `corpus vX.Y.Z (data di rilascio dal CHANGELOG) · inputHash[0:8]`,
   disclaimer su ogni pagina, campo opzionale "Nome azienda analizzata" mai persistito. La
   voce "ultima det. ACN considerata" cade: il corpus non ha un campo che la dichiari e non si
   inventa.

## Alternative scartate

- **react-pdf (`@react-pdf/renderer`).** Un secondo albero di componenti con primitive proprie
  (`Document`, `Page`, `View`): ogni testo del Verdict andrebbe renderizzato due volte, con il
  rischio che PDF e pagina divergano. Aggiunge alcune centinaia di kB al bundle client e un
  motore di layout da tenere aggiornato.
- **pdfmake.** Descrittore JSON del documento e font incorporati nel bundle (Public Sans
  andrebbe convertito e distribuito a parte): stessa duplicazione del contenuto, bundle più
  pesante.
- **jsPDF (anche con html2canvas).** Disegno a coordinate o rasterizzazione della pagina:
  testo non selezionabile o layout manuale, link persi, accessibilità peggiore.
- **Rendering lato server** (Chromium headless, servizio esterno). Le risposte dell'utente
  lascerebbero il browser: escluso dal vincolo 7 e dall'export statico senza funzioni.

## Conseguenze

- Fedeltà: il PDF è il Verdict già renderizzato, con le stesse sorgenti (corpus, registro,
  catalogo); un test di snapshot del DOM in modalità stampa e un test e2e con
  `emulateMedia({ media: 'print' })` coprono il contenuto stampato.
- Limiti accettati: impaginazione, margini e intestazioni del browser dipendono dal browser e
  dalle impostazioni di stampa dell'utente; il supporto dei margin box di `@page` varia tra
  browser, per cui intestazione e piè di pagina ripetuti si verificano su Chrome e Firefox, con
  blocco iniziale e finale come ripiego. Safari si segnala come non verificato se non
  disponibile.
- CLAUDE.md (architettura e "Deliverable PDF") e `docs/ARCHITECTURE.md` aggiornati; il glob
  `packages/*` di `pnpm-workspace.yaml` e la CI non nominano il pacchetto e restano invariati.
- Prossimo ADR: 0019.

## Fonti

- Decisione dell'autore del 2026-11-02 (prompt S4.2, Blocco 0, e risposte al report di stop);
  CLAUDE.md (vincoli 1 e 7, "Deliverable PDF"); ADR 0017 (anteprima di studio).
