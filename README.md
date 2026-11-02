# Ambito NIS2

Pre-screening informativo, gratuito e open source dell'ambito NIS2 italiano (D.Lgs. 138/2024), in anteprima di studio. Il repository si chiama `nis2-check`; il nome mostrato nell'app è "Ambito NIS2".

<!-- avviso:inizio. Generato da apps/web/content/disclaimer.ts e dalla voce anteprima_di_studio_non_consulenza del catalogo eccezioni: non modificare a mano (test: apps/web/tests/readme.test.ts). Bozza operativa soggetta a review legale. -->
**Anteprima di studio: strumento informativo, non consulenza**

Questo strumento è un'anteprima di studio: offre un esito preliminare e orientativo sulla possibile applicabilità della disciplina NIS2 italiana (D.Lgs. 138/2024), sulla base delle risposte fornite. Non è un parere legale né una consulenza e non sostituisce la registrazione sulla piattaforma ACN: la verifica con un consulente qualificato è necessaria prima di assumere conclusioni operative. Le risposte restano nel browser e nessun dato viene inviato a un server.

È uno strumento informativo gratuito e open source. Non sostituisce una verifica certificata di terza parte.

Gli esiti sono espressi su tre posizioni (probabile esclusione, esito incerto, probabile rientro) e non sono mai categorici: dipendono dalle risposte fornite e dalla versione del corpus normativo.

Il codice è distribuito con licenza MIT, così com'è (AS-IS), senza garanzie di alcun tipo.

I limiti dichiarati dello strumento sono elencati nella pagina Cosa non gestisce il tool.

Fanno fede i testi ufficiali: le pubblicazioni dell'Agenzia per la Cybersicurezza Nazionale ([acn.gov.it](https://www.acn.gov.it)) e la normativa vigente su [Normattiva](https://www.normattiva.it).

Questo avviso è una bozza e non è stato sottoposto a review legale.
<!-- avviso:fine -->

## 1. Cos'è e cosa non è

Ambito NIS2 pone una serie di domande su un soggetto (settore, attività, regimi speciali, dimensione) e restituisce un esito preliminare: se, sulla base degli input forniti, l'analisi suggerisce l'inclusione del soggetto nel perimetro NIS2 italiano, con quale qualifica (essenziale o importante) e con quali punti da approfondire. Ogni esito porta le fonti normative da cui deriva, citate al livello verificato (articolo e comma, o codice FAQ ACN), e la spiegazione del percorso seguito.

Non è un parere legale, non è una consulenza e non sostituisce né la registrazione sulla piattaforma ACN né una verifica certificata di terza parte. Copre tre ambiti pilota, non l'intero decreto. Non valuta nel merito i regimi speciali (Perimetro di Sicurezza Nazionale Cibernetica, Regolamento Cloud per la PA, DORA): li riconosce e indirizza al consulente.

## 2. Per chi

- **IT manager** di una media impresa che deve capire in poco tempo se la NIS2 lo riguarda e quali domande portare al consulente.
- **DPO e referenti interni** che preparano il materiale per una valutazione formale.
- **Piccolo imprenditore** che vuole un primo orientamento prima di spendere tempo e budget.

Il linguaggio è pensato per chi non è esperto della materia; la parte tecnica dell'esito (percorso di calcolo, fonti, limiti) è pensata per il consulente che lo riceve.

## 3. Come si usa

Indirizzo pubblico: **[URL DA DEFINIRE ALL'ATTO DI RILASCIO]**. Fino al rilascio il deploy è privato.

1. Si legge e si accetta l'avviso iniziale (richiesto a ogni apertura della pagina).
2. Si sceglie il settore: cloud computing, energia elettrica, pubblica amministrazione.
3. Si risponde alle domande, una per schermata; quelle non pertinenti alle risposte precedenti non compaiono.
4. Si legge l'esito, con i punti da valutare con un consulente, il percorso di calcolo e le fonti.
5. Facoltativo: "Scarica PDF" apre la finestra di stampa del browser ("Salva come PDF"). Il nome dell'azienda, se indicato, compare solo nella copertina del PDF e non viene salvato.

In locale (Node 24, pnpm via corepack):

```sh
corepack enable
pnpm install
pnpm --filter @nis2-check/web build
node apps/web/scripts/serve-out.mjs   # http://localhost:4173
```

## 4. Come funziona

Il valore del progetto è il **corpus normativo**, scritto in YAML e validato al build; il codice lo esegue senza interpretarlo. Dettagli in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

- **Corpus** (`packages/corpus/corpus/`, versione in `VERSION`, modifiche in `CHANGELOG.md`): tre ambiti (energia elettrica, Allegato I, punto 1, lettera a; fornitori di servizi di cloud computing, Allegato I, punto 8; pubbliche amministrazioni dell'Allegato III), le domande del questionario, le regole di qualifica, i regimi speciali, i segnali (ad esempio il cumulo con la L. 90/2024, che si aggiunge all'esito senza sostituirlo), il catalogo eccezioni e il registro delle citazioni. Ogni regola dichiara il proprio esito: il codice lo copia, non lo deduce.
- **Engine** (`packages/engine`): una funzione pura e deterministica, `evaluate({ sectorId, answers }, corpus)`, che valuta le regole in quattro stadi; uno solo decide, gli altri restano nella spiegazione ([ADR 0016](docs/decisions/0016-ordine-valutazione-engine-input-assenti.md)).
  1. *Regimi speciali*: se le risposte indicano un regime instradato (oggi il PSNC; il Regolamento Cloud per la PA nel solo percorso PA), l'esito è un rinvio al consulente con l'indicazione del regime.
  2. *Esclusione per tipologia*: se ogni attività dichiarata risulta esclusa secondo le FAQ ACN, l'esito suggerisce la probabile esclusione.
  3. *Regole indipendenti dalla dimensione*: pubbliche amministrazioni dell'Allegato III, soggetti critici (D.Lgs. 134/2024) e canale dell'Allegato IV decidono a prescindere dalla dimensione.
  4. *Regole dimensionali*: per cloud ed energia la categoria dimensionale dichiarata (Racc. 2003/361/CE, come riportata dalla FAQ ACN AMB.DI.1) decide l'esito e la qualifica suggerita.
- **Esito** su tre posizioni (probabile esclusione, esito incerto, probabile rientro), con qualifica suggerita, regimi speciali, avvisi dal catalogo eccezioni, percorso di calcolo e fonti numerate con il collegamento alla riga della knowledge base che le attesta.
- **PDF**: è la stampa del browser della pagina dell'esito, senza librerie né server ([ADR 0018](docs/decisions/0018-pdf-foglio-di-stile-di-stampa.md)): copertina, risposte date, percorso di calcolo, fonti con l'indirizzo completo, limiti del percorso; su ogni pagina un piè di pagina con l'avviso e il riferimento `corpus vX.Y.Z (data) · codice della valutazione`.
- **Privacy**: tutto gira nel browser. Nessun server riceve le risposte, nessuna telemetria, nessuno script o font di terze parti; le risposte restano nella scheda del browser per la durata della sessione.

## 5. Cosa non gestisce

I limiti sono dichiarati in un unico file, il catalogo eccezioni (`packages/corpus/corpus/exceptions/exceptions__catalog.yaml`), e la pagina "Cosa non gestisce il tool" dell'app è generata da quel file: 30 voci, di cui 3 gestite, 20 segnalate (mostrate nell'esito quando le risposte le fanno emergere) e 7 non gestite. Tra queste: gli altri settori e tipologie degli Allegati I, II e IV; la salvaguardia dimensionale (DPCM 221/2024); il calcolo della dimensione a partire da effettivi, fatturato e bilancio e il consolidamento con le imprese collegate; l'individuazione da parte dell'ACN indipendentemente dalla dimensione; la valutazione nel merito dei regimi speciali.

Limiti dello strumento oltre il catalogo:

- PDF verificato su Chrome; Firefox e Safari non verificati.
- L'avviso è una bozza operativa, non sottoposta a review legale.

## 6. Come verificare

```sh
pnpm corpus:validate              # schema e invarianti del corpus e delle fixture
pnpm test                         # validator, engine (fixture golden E01-E27, percorsi), web
pnpm engine:enumerate --full      # tutte le combinazioni di risposte dei tre settori
pnpm --filter @nis2-check/web test:e2e   # dopo il build: wizard, PDF, pagina dei limiti, rete
```

- **Fixture golden** (`packages/engine/tests/fixtures/`): 27 scenari con l'esito atteso e il riferimento al costrutto del corpus che lo produce.
- **Enumerazione completa**: 418.576 combinazioni valutate, 0 violazioni delle proprietà dell'engine (esecuzione del 2026-10-30, corpus 0.11.0; si ripete a ogni rilascio, esito in `docs/STATUS.md`).
- **Registro citazioni** (`packages/corpus/corpus/citations/citations__registry.yaml`): 76 voci; ogni ID usato dal corpus ha il nodo della knowledge base e le righe che lo attestano. Nell'app ogni fonte apre quella riga.
- **CI** (GitHub Actions): lint, typecheck, validazione del corpus, test, build ed e2e a ogni push.

Invarianti, decisioni e scelte scartate: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) e [`docs/decisions/`](docs/decisions/).

## 7. Rapporto con nis2-knowledge-it

Il corpus deriva dalla knowledge base [nis2-knowledge-it](https://github.com/AndreaTierno-stack/nis2-knowledge-it) (licenza CC-BY-4.0): nodi costruiti sui testi ufficiali (decreto, determinazioni e FAQ ACN), con l'identità di ogni fonte stabilita dal testo. Ogni citazione del corpus rimanda a una riga di quella knowledge base. In caso di conflitto prevale il testo ufficiale sulla knowledge base, la knowledge base sul corpus, il corpus sul codice; ogni discrepanza si corregge a monte.

## 8. Come segnalare un errore

Si apre una issue su questo repository indicando:

- il riferimento normativo preciso: articolo e comma del decreto, o codice della FAQ ACN, o protocollo della determinazione;
- il passaggio del testo ufficiale che si ritiene in contrasto con l'esito o con la fonte citata;
- il settore e le risposte date, che il PDF riporta insieme al codice della valutazione e alla versione del corpus.

Una segnalazione senza riferimento puntuale al testo ufficiale non può essere verificata.

## 9. Licenza e stato

Codice con licenza MIT; knowledge base con licenza CC-BY-4.0. Stato: **anteprima di studio**, versione 0.1.0 in preparazione, corpus alla versione indicata in `packages/corpus/corpus/VERSION`. Progetto hobbistico non commerciale, senza review legale dell'avviso: gli esiti sono orientativi e la verifica con un consulente qualificato resta necessaria.
