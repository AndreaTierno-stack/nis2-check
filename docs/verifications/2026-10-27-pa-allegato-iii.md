# Verifica di lettura: ambito soggettivo della PA nel D.Lgs. 138/2024 (2026-10-27)

> Report della sessione di lettura Claude Code del 2026-10-27, trascritto dalla chat del Project. Alcune righe e celle di tabella sono troncate nella copia incollata; il contenuto non è stato ricostruito.

La verifica è completa e non ho modificato nulla. In sintesi: la KB riduce la PA alle "PA centrali" e non nomina mai i sei "altri soggetti pubblici" della lett. d), mentre il corpus li riduce a uno solo, gli enti a struttura associativa. A questo si aggiungono due errori di qualifica nel corpus: per la lett. a) e per la lett. b).

## 1. Testo ufficiale (pdftotext -enc UTF-8)

Art. 3 c. 6 (già verificato): "Il presente decreto si applica, altresì, anche indipendentemente dalle loro dimensioni, alle pubbliche amministrazioni di cui all'articolo 1, comma 3, della legge 31 dicembre 2009, n. 196, ricomprese nelle categorie elencate nell'allegato III."

Allegato III, "Amministrazioni centrali, regionali, locali e di altro tipo", c. 1: "Ai fini dell'articolo 3, comma 6, sono individuatele seguenti categorie:" (il refuso è nel PDF). Le categorie sono 15, e corrispondono alle "15 categorie" della FAQ AMB.PU.1:
- a) amministrazioni centrali: "1) gli Organi costituzionali e di rilievo costituzionale; 2) la Presidenza del Consiglio dei ministri e i Ministeri; 3) le Agenzie fiscali; 4) le Autorità amministrative indipendenti"
- b) amministrazioni regionali: "1. le Regioni e le Province autonome"
- c) amministrazioni locali: "1. le Città metropolitane; 2. i Comuni con popolazione superiore a 100.000 abitanti; 3. i Comuni capoluoghi di regione; 4. le Aziende sanitarie locali"
- d) altri soggetti pubblici: "1. gli Enti di regolazione dell'attività economica; 2. gli Enti produttori di servizi economici; 3. gli Enti a struttura associativa; 4. gli Enti produttori di servizi assistenziali, ricreativi e culturali; 5. gli Enti e le Istituzioni di ricerca; 6. gli Istituti zooprofilattici sperimentali"

Le uniche soglie di popolazione o altre condizioni sono quella di c.2 (oltre 100.000 abitanti), il capoluogo di regione per c.3, e l'inclusione nell'elenco di cui all'art. [troncato]

Altri commi che rinviano alla PA:
- Art. 3 c. 7 e art. 40 c. 2 lett. b): uno o più DPCM possono aggiungere categorie di PA "al fine di adeguare l'elenco di categorie di cui all'allegato III".
- Art. 4 c. 2: i soggetti dei cc. 6-7 "non rico[mprendono …]ano, l'Autorità giudiziaria, la Banca d'Italia e l'Unità di informazione finanziaria". Agli organi costituzionali non si applica il capo V. [riga troncata nella copia]
- Art. 4 c. 3: esclude la PA che opera in [pubblica sicurezza …] e attività di contrasto, gli organismi di informazione (L. 124/2007) e l'ACN. [riga troncata nella copia]
- Art. 4 cc. 4 e 6: un DPCM individua i forni[tori …] non possono essere esclusi gli enti con competenze di regolazione. [riga troncata nella copia]
- Art. 6:
  - c. 1 lett. e): sono essenziali "le pubblich[e amministrazioni] di cui all'allegato III, comma 1, lettera a)". Vale solo per la lettera a).
  - c. 2: l'ACN, con le modalità dell'art. 40 c. 5, individua tra i soggetti dell'art. 3 c. 6 quelli che sono essenziali.
  - c. 3: tutti gli altri sono importanti.
- Altri rinvii all'ACN:
  - Art. 3 cc. 9 e 13: individuazione delle tip[ologie …] indipendentemente dalla dimensione. [riga troncata nella copia]
  - Art. 40 c. 5 lett. a): elenco dei soggetti essenziali e importanti (art. 7 c. 2).
  - Art. 32 c. 2 lett. a), numerazione del PDF: [obbli]ghi del capo per l'Allegato III lett. c) e d). [riga troncata nella copia]
- Regimi PA già specifici:
  - Art. 5 c. 1 lett. c): giurisdizione.
  - Art. 37 c. 4: la sospensione non si applica alla PA dell'Allegato III.
  - Art. 38: il c. 9 lett. c) prevede 25.000-125.000 € per la PA essenziale e la lett. d) riduce gli importi di un terzo per la PA importante; il c. 11 lett. c)-d) prev[ede la s]tessa riduzione di un terzo.

> [!note] Provenienza
> Il PDF è la versione Normattiva "Vigente al [data troncata]"; gli allegati riportano l'intestazione "SCHEMA DI DECRETO LEGISLATIVO DI RECEPIMENTO". Prima di correggere conviene un riscontro dell'Allegato III sulla Gazzetta Ufficiale.
> (Riscontro eseguito il 2026-10-27 su Normattiva: testo identico, DEC-007 parte A.)

## 2. Nodo sources/D.Lgs. 138-2024 (Decreto NIS).md

| Riga | Testo del nodo | Restrizione o scarto rispetto al testo |
|---|---|---|
| 24 | "soggetti che lo Stato identifica indipendentemente dalle soglie (PA centrali, …)" | omette b), c), d). "Lo Stato identifica" è inesatto: il c. 6 opera per legge, senza individuazione. Mancano le [lett.] 2-3 e l'art. 3 c. 7. [cella troncata] |
| 25 | art. 3 c. 6 | [cella troncata] |
| 41 | "Pubbliche amministrazioni: forbice € 25.000 – € 125.000" | [solo la PA essenz]iale (art. 38 c. 9 lett. c). Mancano la riduzione di un terzo per la PA importante (lett. d) e la forbice 10.000-50.000 € del c. 11. |

## 3. Altri nodi KB (scope both)

- concepts/Ambito di applicazione NIS2.md:
  - r. 16: "PA centrali" come unica categoria [a prescindere dalla di]mensione.
  - rr. 30-31: "PA centrali (amministrazioni dello Stato)", "PA regionali (per i servizi rilevanti)", attribuite all'art. 3 del D.Lgs. 138. La condizione "per i servi[zi rilevanti" non è nel decret]o, e mancano c) e d).
  - r. 25: le esclusioni sono attribuite all'"Art. 3 D.Lgs. 138", ma stanno nell'art. 4.
- concepts/Identificazione dei soggetti NIS.md r. 23 e concepts/Size-cap rule.md r. 27: "PA centrali" come unica eccezione PA alla soglia.
- concepts/Settori altamente critici e critici.md r. 30: "PA — amministrazioni centrali (regionali secondo identificazione nazionale)" sotto l'Allegato I. Nel decreto la PA è l'Allegato III e le regionali rientrano per legge (lett. b).
- concepts/Perimetro Legge 90-2024.md r. 77: "l'All. III NIS copre PA centrali + locali grandi". Omette b) e d).
- concepts/Soggetti essenziali e importanti.md:
  - r. 15: "PA centrali" tra gli essenziali è c[orretto per la lett. a)]. [riga troncata]
  - r. 16: tra gli importanti manca la PA b)-d), che è importante salvo individuazione ACN (art. 6 c. 2).
- sources/FAQ NIS - Ambito.md:
  - r. 55: conforme (riguarda gli essenziali).
  - rr. 183-184: fedeli al PDF della FAQ, che p[one le Regioni tra le "]locali" e non elenca la lett. d), pur rinviando alle 15 categorie.
- sources/Direttiva (UE) 2022-2555 (NIS2).md r. [troncato], "Stratificazione delle norme cybersecurity in Italia" e "Coordinamento L. 90-2024 e NIS2": nessuna restrizione. La riga della Direttiva riguarda gli essenziali.
- Nessun nodo KB nomina le categorie d.1, d.2, d.4, d.5 e d.6.

## 4. Corpus nis2-check

- Categoria d (sectors rr. 90-96, opzione d del [wizard] r. 137): è "Enti a struttura associativa (es. ANCI, UPI, Unioncamere)", cioè solo d.3, l'unica ripresa dal nodo FAQ Settori (A3.d.3). Per gli altri cinque sottotipi non c'è un'opzione. Un ente di ricerca o un ente culturale tende a scegliere canale_allegato_iv, e il wizard lo manda su "Istituto di istruzione che svolge ricerca" o "[attività di interesse cultu]rale" (Allegato IV): risultato ambiguous anziché likely_in_scope.
- Categoria a (sectors rr. 56-57, wizard r. 37), [etichetta "…] organo costituzionale".
  - Più stretta del testo: mancano "di rilievo costituzionale" e le Autorità amministrative indipendenti.
  - Più larga del testo: "agenzie statali" inve[ce di "Agenzie fiscali"].
  - Più larga anche perché le esclusioni dell'art. 4 cc. 2-3 non sono modellate: il Parlamento oggi ottiene likely_in_scope.
- Qualifiche:
  - a) è trattata come "essenziale INFERITA… non da fonte normativa puntuale" (r. 110), ma l'art. 6 c. 1 lett. e) è proprio la fonte puntuale.
  - b) "qualifica_inferita: essenziale" (r. 117) non trova appoggio nel testo: per l'art. 6 c. 3 le Regioni sono importanti, salvo individuazione dell'ACN.
- Etichetta cloud_pa (disambiguation r. 45): è [dal lato del fornitore ("e]roga servizi cloud destinati a una PA"). L'override PA (r. 148) presuppone invece una PA che ha classificato i propri dati: una PA che risponde in modo corretto non lo attiva mai.
- visible_if di dimension (r. 88): conforme all'art. 3 c. 6.
- Fixture PA:

| Fixture | Categoria | Esito |
|---|---|---|
| E09 | c, comune oltre 100k | categorical |
| E10 | a | qualifica essenziale inferita |
| E11 | Allegato IV, in-house | ambiguous |
| E12 | c, ASL | importante, più segnale sanitario |

Nessuna fixture copre b), d), città metropolitana, comune capoluogo o gli altri profili dell'Allegato IV.

## 5. Tabella riepilogativa

| Categoria (Allegato III) | Nodo D.Lgs. / altri nodi KB | Corpus |
|---|---|---|
| a.1 Organi costituzionali e di rilievo costituzionale | "PA centrali" | "organo costituzionale" (manca "di rilievo"); esclusioni art. 4 c. 2 assenti |
| a.2 Presidenza del Consiglio e Ministeri | "PA centrali" | conforme |
| a.3 Agenzie fiscali | "PA centrali" | "agenzia statale" (più ampia) |
| a.4 Autorità amministrative indipendenti | "PA centrali" | assente |
| b Regioni e Province autonome | assente nel nodo D.Lgs.; "per i servizi rilevanti" (Ambito); "secondo identificazione nazionale" (Se[ttori]) | categoria presente; qualifica errata (essenziale) |
| c.1-c.4 amministrazioni locali | assente nel nodo D.Lgs.; "locali grandi" (Perimetro L. 90) | conforme |
| d.1, d.2, d.4, d.5, d.6 | assenti | assenti (d.4 e d.5 instradate di fatto sull'Allegato IV) |
| d.3 Enti a struttura associativa | solo nel nodo [FAQ Settori] | unica voce della categoria d |
| Art. 3 c. 7: categorie aggiunte con DPCM | assente | assente |

## Proposte di correzione

### KB

1. Nodo D.Lgs.:
   - r. 24: separare i rientri per legge (cc. 5[-6]) [dalle individuazioni ACN] (cc. 8, 9, 13), e citare la PA come "Allegato III a)-d)".
   - Aggiungere sotto-punti con: l'Allegato III [con le 15 categorie], l'art. 3 c. 7 co]n l'art. 40 c. 2 lett. b), l'art. 4 cc. 2-3 e l'art. 6 c. 1 lett. e) e cc. 2-3.
   - r. 41: allineare le sanzioni all'art. 38 c[. 9 lett.] c)-d).
   - Nel compito precedente mi avevi chiesto di non toccare altro in questo nodo, quindi serve il tuo via libera.
2. Allineare i nodi Ambito, Identificazione, Si[ze-cap rule, Settori, Perime]tro L. 90 a "PA Allegato III a)-d)", con rinvio al nodo D.Lgs. Correggere anche "Art. 3" in "Art. 4" in Ambito r. 25.
3. Soggetti essenziali e importanti, r. 16: aggiungere la PA b)-d) tra gli importanti, salvo l'art. 6 c. 2.
4. FAQ Ambito, r. 183: aggiungere una nota [sulla differenza con l'Al]legato III, cioè Regioni tra le "locali" e lett. d) non elencata.

### Corpus

In base alla regola del CHANGELOG, ogni cambio alle regole o al questionario è un minor. Il pacchetto C1-C5 porta quindi alla 0.4.0 [poi deciso: 0.5.0, dopo S2].

| # | Correzione | Effetto sul verdetto |
|---|---|---|
| C1 | d → "Altri soggetti pubblici" con domanda sottotipo_d a 6 opzioni e una nuova fix[ture (es. ente di ricerca,] d.5) | Cambia: d.1, d.2, d.4, d.5, d.6 passano da ambiguous (o [likely_in_scope inferito]) a likely_in_scope |
| C2 | a: etichetta con i 4 sottotipi testuali [(incl. Autorità amministrative] indipendenti); art. 4 cc. 2-3 come out_of_scope | [Cambia per] Parlamento, Banca d'Italia e gli altri esclusi |
| C3 | a → categorical_assessment, essenziale, citando l'art. 6 c. 1 lett. e) | verdict_outcome invariato; cambiano assessment_mode e qualifica, e l'atteso di E10 va aggiornato. Supera anche [la decisione "]verdetto categoriale rinviato a v0.2": la scelta è tua |
| C4 | b → importante (art. 6 c. 3), con avviso sull'art. 6 c. 2; nuova fixture | verdict_outcome invariato; cambia la qualifica |
| C5 | Riformulare cloud_pa per il percorso PA | Cambia: l'override PA diventa raggiungibile |
| C6 | reasoning trace a): sostituire "determinazione ACN identificativa delle PA NIS" (non presente nel vault) con l'art. 40 c. 5 lett. a) | Nessuno; da sola sarebbe una patch |

> [!note] Da verificare, non attestato nel vault
> Inferenza: nell'elenco ISTAT S13 le categorie d.1-d.6 dovrebbero stare sotto le "Amministrazioni centrali". Se è così, il "tutte le PA centrali" della FAQ includerebbe [anche la lett. d), e l90]_cumulo andrebbe attivato anche per d), perché la L. 90 art. 1 c. 1 rinvia alle "PA centrali" ex L. 196/2009. Per confermarlo serve un ingest dell'elenco ISTAT.
