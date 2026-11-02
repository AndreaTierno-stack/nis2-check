# Review avversaria: Ambito NIS2 (export locale)

## 1. Intestazione

- **Data**: 2026-11-02
- **Oggetto**: export statico locale `apps/web/out/` (corpus 0.12.2, rilasciato il 2026-11-02, come dichiarato dall'app) e `README.md` del commit corrente (`3dc44bb`).
- **Perimetro rispettato**: letti solo `apps/web/out/` (HTML, JS, CSS, robots.txt), `README.md`, `LICENSE`; usato `apps/web/scripts/serve-out.mjs` solo per servire l'export su http://localhost:4173. Non aperti `packages/`, `docs/` (salvo la scrittura di questo file), `apps/web/src`, `components`, `lib`, `content`, `e2e`, `tests`, `CLAUDE.md`. Nessun accesso a URL Vercel né ai repository GitHub del progetto (i link "Apri la scheda" e "Fonti e metodo" non sono stati seguiti). Fonti ufficiali consultate: Normattiva (D.Lgs. 138/2024 artt. 3, 4, 6, 7; D.L. 105/2019 art. 1; L. 90/2024 artt. 1 e 15-bis), sito ACN (determinazione sulla categorizzazione ex art. 30 c. 2, FAQ "Settori, sottosettori e tipologie di soggetto"), MASE e Camera dei deputati per l'acronimo CACER. Nota: l'HTML esportato contiene il corpus serializzato (payload RSC); è stato consultato solo per confermare comportamenti osservati nell'interfaccia.
- **Strumenti**: Playwright (Chromium) da script nella cartella temporanea, `page.pdf` con emulazione di stampa, `pdftotext`.
- **Tempo impiegato**: circa 1 ora e 45 minuti.
- **Percorsi provati** (27; risposte non elencate = "No"):

| Id | Settore | Risposte principali | Esito mostrato |
|----|---------|---------------------|----------------|
| A | Energia elettrica | produzione, nessuna attività ulteriore, cliente attivo no, partecipazione pubblica no, soggetto critico no, media | Probabile rientro, importante (codice fbadcf5b) |
| C1 | Cloud | privato, B2B no, micro o piccola | Probabile esclusione |
| C2 | Cloud | partecipazione pubblica: in house di soggetto L. 90/2024; B2B sì; grande | Probabile rientro, essenziale |
| C3 | Cloud | PSNC sì, micro o piccola | Esito incerto |
| C4 | Cloud | servizi qualificati Cloud PA sì, micro o piccola | Probabile esclusione |
| C5 | Cloud | soggetto critico sì, micro o piccola | Probabile rientro, essenziale |
| C6 | Cloud | DORA sì, media | Probabile rientro, importante |
| E2 | Energia | produzione, micro o piccola | Probabile esclusione |
| E3 | Energia | produzione, cliente attivo sì, grande | Probabile esclusione |
| E4 | Energia | produzione, cliente attivo sì, soggetto critico sì, micro o piccola | Esito incerto |
| E5 | Energia | punti di ricarica, PUN "Non so", grande | Esito incerto |
| E6 | Energia | produzione + punti di ricarica, PUN no, media | Probabile rientro, importante |
| E7 | Energia | solo punti di ricarica, PUN no, grande | Probabile esclusione |
| E8 | Energia | DSO + fornitura, capitale pubblico prevalente, micro o piccola | Probabile esclusione |
| E9 | Energia | TSO, PSNC sì, soggetto critico sì, grande | Esito incerto |
| P1 | PA | lett. a | Probabile rientro, essenziale |
| P2 | PA | lett. c, ASL | Probabile rientro, importante |
| P3 | PA | lett. d, enti e istituzioni di ricerca | Probabile rientro, importante |
| P4 | PA | organo escluso art. 4 c. 2, classificazione Cloud sì | Esito incerto |
| P4b | PA | organo escluso art. 4 c. 2 | Probabile esclusione |
| P4c | PA | organo escluso art. 4 c. 2, PSNC sì | Esito incerto |
| P4d | PA | organo escluso art. 4 c. 2, DORA sì, soggetto critico sì | Probabile esclusione |
| P5 | PA | fuori Allegato III, TPL soggetto L. 90/2024 | Esito incerto |
| P6 | PA | lett. b, PSNC sì, classificazione Cloud sì | Esito incerto |
| P7 | PA | lett. b, soggetto critico sì | Probabile rientro, essenziale |
| P8 | PA | lett. c, comune capoluogo, classificazione Cloud sì | Esito incerto |

Rete: in tutti i percorsi, compresa la generazione del PDF, nessuna richiesta verso host diversi da localhost. Il server applica una CSP con `connect-src 'self'`. Le risposte restano in `sessionStorage` (chiave `nis2-check:session`), il nome azienda no: coerente con il README ("le risposte restano nella scheda del browser per la durata della sessione").

## 2. Persona A: IT manager di un produttore di energia elettrica, 120 dipendenti

L'avviso iniziale è chiaro sul punto essenziale: è un'anteprima, non una consulenza, le risposte non escono dal browser, serve un consulente. Il README spiega bene a chi serve e cosa non fa (tre ambiti, niente regimi nel merito). Restano opachi per lui "corpus normativo", "AS-IS" e il senso pratico di "anteprima di studio". Capisce cosa fa lo strumento; capisce meno cosa riceverà alla fine.

Il wizard è breve (9 domande, circa 4 minuti) ma le prime tre domande lo spiazzano: gli chiedono di PSNC, CISR e DL 105/2019, di DORA e di "servizi cloud qualificati ai sensi del Decreto Direttoriale ACN n. 21007/24", cose che non c'entrano con una centrale. Risponde "No" per esclusione grazie ai testi di aiuto, ma senza capire perché gli vengono chieste. Termini non compresi o compresi a metà: PSNC, CISR, DORA, entità finanziaria, Regolamento Cloud per la PA, "clienti attivi" (l'esempio del fotovoltaico aiuta), Allegati I e II, PUN, "effettivi", imprese collegate o associate, soggetto critico ai sensi del D.Lgs. 134/2024, CACER. La domanda sulla dimensione è la più utile ma la tabella delle soglie appare come markdown grezzo con i simboli "|" e "---" (F13).

L'esito "Probabile rientro" con "Qualifica suggerita: importante" lo capisce; il testo principale invece è una nota tecnica ("In settore Allegato I p. 1 (Energia) qualificato come soggetto importante. Per 'fatturato' si intende...") che non spiega cosa comporti essere "importante" rispetto a "essenziale". L'unico punto da valutare riguarda il regime transitorio degli ex operatori di servizi essenziali: non sa se la sua azienda lo fosse e lo strumento non glielo chiede. Sa che deve parlare con un consulente qualificato ("Verifica obbligatoria con consulente qualificato"), ma non sa cosa portargli oltre al PDF, né che esiste una finestra annuale di registrazione sulla piattaforma ACN (art. 7 c. 1, dal 1° gennaio al 28 febbraio): l'esito non dà nessun riferimento di tempo né di canale (F12). Conclusione: in dieci minuti ottiene una risposta orientativa utile e un documento da inoltrare; non ottiene un'idea di cosa succede dopo.

### Valutazione del PDF (percorso A, 7 pagine A4)

- **Pagina 1**: copertina (nome azienda, settore, data, versione del corpus, codice fbadcf5b) e parte sintetica con l'esito. La leggerebbe tutta.
- **Pagina 2**: il punto da valutare (regime ex OSE) e le risposte date. La leggerebbe; le risposte gli servono per ricordare cosa ha dichiarato.
- **Pagina 3**: "Parte tecnica, per il consulente": percorso di calcolo (tre righe "Non applicabile alle risposte date" e la stessa frase dell'esito ripetuta) e prime tre fonti con URL GitHub lunghi. La salterebbe.
- **Pagine 4-6**: fine delle fonti e "Cosa non gestisce il tool": 6 voci segnalate e 6 non gestite, quasi tutte non pertinenti al suo caso; alcune sono scritte come se descrivessero il suo soggetto (F09). Le salterebbe e potrebbe esserne confuso se le leggesse.
- **Pagina 7**: l'avviso integrale, che ripete il piè di pagina presente su ogni pagina. La salterebbe.

Giudizio: 7 pagine sono troppe per un esito con una sola regola applicata e un solo punto da valutare; per il lettore non esperto servono le pagine 1-2, per il consulente le pagine 1-3. Proposta (obiettivo 4 pagine): eliminare la pagina 7 o ridurla a un paragrafo in copertina (il piè di pagina già porta l'avviso); nella sezione dei limiti stampare solo le voci emerse dalla valutazione, più un elenco di una riga per voce dei "non gestiti" con il rinvio alla pagina /limiti/; non stampare le voci condizionali non attivate; nel percorso di calcolo non ripetere il testo dell'esito. Aggiungere in pagina 1-2 un breve riquadro informativo, non prescrittivo, "Cosa portare al consulente" (risposte, codice, dubbi aperti come l'ex qualifica OSE). Il documento è comunque utilizzabile per un consulente: contiene risposte, codice, versione del corpus e fonti numerate.

## 3. Persona B: consulente GRC esperto di NIS2

Il lessico è quasi sempre probabilistico e il naming è disciplinato (salvaguardia dimensionale, soggetti critici contro CACER, nessun "CER" nudo); nessuna chiamata di rete esterna. I problemi seri sono tre. Primo, i regimi instradati (PSNC e classificazione Cloud PA) trasformano in "Esito incerto, qualifica non determinata" casi in cui l'ambito non è in dubbio: la Det. ACN sulla categorizzazione (artt. 4 e 5) riguarda la categorizzazione delle attività dei soggetti NIS, non l'ambito; con un comune capoluogo che ha classificato i dati, cioè un caso frequente, l'esito diventa incerto (F01). Secondo, lo stesso instradamento scavalca l'esclusione dell'art. 4 c. 2: Parlamento o Banca d'Italia con PSNC o classificazione Cloud ricevono un testo che presuppone l'applicazione del decreto (F02). Terzo, i segnali calcolati (cumulo L. 90/2024, Allegato IV per le società pubbliche, servizi gestiti B2B dell'Allegato I p. 9, identità multiple) non sono mostrati da nessuna parte: restano solo le loro fonti, orfane, nell'elenco "Fonti citate" (F04). Seguono problemi di formulazione categorica nelle regole dimensionali, di granularità (art. 6 senza comma), di coerenza tra etichetta ed esito nel caso punti di ricarica, una lacuna sul criterio ex OSE dell'art. 3 c. 9 lett. a) e una domanda PSNC con un'istituzione superata (CISR).

## 4. Findings

### F01. I regimi instradati rendono "incerto" l'esito su un ambito non in dubbio

- **Persona**: B
- **Severità**: alta
- **Superficie**: esito, trace, limiti
- **Descrizione**: quando un'amministrazione dell'Allegato III dichiara di aver classificato dati e servizi ai sensi del Regolamento Cloud, o quando un soggetto dichiara l'inserimento nel PSNC, l'esito diventa "Esito incerto" con "Qualifica suggerita: Non determinata", e le regole sull'ambito sono marcate "Non valutato: decide un regime speciale". Le disposizioni citate dallo strumento però riguardano la categorizzazione delle attività e dei servizi dei soggetti NIS (art. 30 D.Lgs. 138/2024), non l'appartenenza all'ambito, e presuppongono che il soggetto sia già un soggetto NIS. Il testo stesso dell'esito lo conferma ("I servizi NIS non PSNC mantengono procedimento ordinario"). Un comune capoluogo è in ambito per l'art. 3 c. 6 con l'Allegato III lett. c) a prescindere dalla classificazione Cloud; un TSO grande e soggetto critico è in ambito per l'art. 3 cc. 2 e 5 lett. a). Poiché la classificazione Cloud è un adempimento diffuso tra le PA (ipotesi non verificata sulla diffusione), il percorso PA rischia di restituire "Esito incerto" nella maggioranza dei casi reali.
- **Passi per riprodurre**: (P8) Pubblica amministrazione; PSNC No; DORA No; categoria lett. c; Comune capoluogo di Regione; classificazione Cloud Sì; soggetto critico No. Anche (E9) Energia elettrica; PSNC Sì; DORA No; Cloud PA No; TSO; nessuna ulteriore; partecipazione pubblica No; soggetto critico Sì; Grande. Anche (P6) PA lett. b con PSNC Sì e classificazione Cloud Sì; (C3) Cloud con PSNC Sì.
- **Testo citato**: "Per una Pubblica Amministrazione, la classificazione dei dati e dei servizi ai sensi del Regolamento Cloud [...] comporta l'applicazione del modello Cloud PA (ordinari/critici/strategici) in luogo del modello di categorizzazione NIS, ai sensi dell'art. 4 Det. ACN 155238/2026." con "Qualifica suggerita: Non determinata" e "Regole indipendenti dalla dimensione: Non valutato: decide un regime speciale."; per E9: "Servizi PSNC del soggetto categorizzati come 'alto' d'ufficio, fuori dal procedimento ordinario [...]. I servizi NIS non PSNC mantengono procedimento ordinario."
- **Evidenza normativa**: Determinazione del Direttore generale ACN "di cui all'articolo 30, comma 2, del decreto legislativo 4 settembre 2024, n. 138 [...] recante le categorie di rilevanza nonché il processo, le modalità e i criteri per l'elencazione, caratterizzazione e categorizzazione delle attività e dei servizi di cui all'articolo 30" (firmata il 13/04/2026, pubblicata su acn.gov.it come `detacn_categorizzazione_260409-v8_signed`; il numero di protocollo non è leggibile nel testo estratto, lo strumento la identifica come 155238/2026), art. 4 c. 1: "I soggetti NIS che hanno svolto la classificazione dei dati e dei servizi di cui all'articolo 3 del Decreto Direttoriale ACN n. 21007/24 del 27 giugno 2024, applicano il modello stabilito dal predetto decreto ai fini dell'elencazione e della categorizzazione delle attività e dei servizi, in luogo del modello di categorizzazione di cui alla presente determinazione"; art. 5 c. 1: "Alle attività e ai servizi a cui si applicano gli obblighi di cui al decreto-legge 21 settembre 2019, n. 105 [...] è attribuita la categoria di rilevanza 'impatto alto' e non sono oggetto di quanto previsto dall'articolo 3". D.Lgs. 138/2024 art. 3 c. 6 e c. 5 lett. a) (Normattiva). Nota di naming: la determinazione dice "impatto alto", lo strumento "categoria 'alto'".

### F02. L'instradamento a regime scavalca l'esclusione dell'art. 4 c. 2

- **Persona**: B
- **Severità**: alta
- **Superficie**: esito, wizard
- **Descrizione**: un organo che l'art. 4 c. 2 non ricomprende tra le PA dell'art. 3 (Parlamento, Autorità giudiziaria, Banca d'Italia, UIF) ottiene "Probabile esclusione" se risponde No ai regimi (P4b), ma "Esito incerto" con un testo che presuppone l'applicazione del modello di categorizzazione NIS se dichiara PSNC o classificazione Cloud (P4, P4c). Lo stadio dei regimi decide prima dell'esclusione. Inoltre il wizard, dopo la scelta "Organo escluso dall'art. 4 c. 2", continua a chiedere la classificazione Cloud e la qualifica di soggetto critico.
- **Passi per riprodurre**: Pubblica amministrazione; PSNC No; DORA No; categoria "Organo escluso dall'art. 4 c. 2"; classificazione Cloud Sì; soggetto critico No. Variante: PSNC Sì, classificazione Cloud No.
- **Testo citato**: (P4c) "Servizi PSNC dell'amministrazione categorizzati come 'alto' d'ufficio, fuori dal procedimento ordinario, ai sensi dell'art. 5 Det. ACN 155238/2026. I servizi NIS non PSNC mantengono procedimento ordinario." con Tipologia "Organo escluso dall'art. 4 c. 2: Parlamento italiano, Autorità giudiziaria, Banca d'Italia, Unità di informazione finanziaria per l'Italia".
- **Evidenza normativa**: D.Lgs. 138/2024 art. 4 c. 2 (Normattiva): "I soggetti di cui all'articolo 3, commi 6 e 7, non ricomprendono il Parlamento italiano, l'Autorità giudiziaria, la Banca d'Italia e l'Unità di informazione finanziaria per l'Italia [...]". Determinazione ACN ex art. 30 c. 2, artt. 4 e 5 (vedi F01): si applicano ai "soggetti NIS".

### F03. Organo escluso dall'art. 4 c. 2 e soggetto critico: la risposta "soggetto critico" viene ignorata senza avviso

- **Persona**: B
- **Severità**: alta (lettura testuale, da confermare con l'autore)
- **Superficie**: esito
- **Descrizione**: con categoria "Organo escluso dall'art. 4 c. 2" e soggetto critico Sì, l'esito è "Probabile esclusione" e la qualifica di soggetto critico non compare né nell'esito né tra i punti da valutare. L'art. 4 c. 2 limita il perimetro dei "soggetti di cui all'articolo 3, commi 6 e 7" (canale PA), mentre l'art. 3 c. 5 lett. a) è un canale autonomo. Nel settore energia lo strumento tratta un conflitto analogo (esclusione per tipologia contro soggetto critico, E4) con "Esito incerto" e un avviso dedicato; qui no. Incoerenza interna, a prescindere dalla soluzione nel merito.
- **Passi per riprodurre**: Pubblica amministrazione; PSNC No; DORA Sì; categoria "Organo escluso dall'art. 4 c. 2"; classificazione Cloud No; soggetto critico Sì.
- **Testo citato**: "[...] l'analisi suggerisce che il soggetto non rientri nel perimetro NIS2 italiano come pubblica amministrazione dell'Allegato III." con esito "Probabile esclusione".
- **Evidenza normativa**: D.Lgs. 138/2024 art. 4 c. 2 e art. 3 c. 5 lett. a): "Il presente decreto si applica, indipendentemente dalle loro dimensioni, anche: a) ai soggetti che sono identificati come soggetti critici [...]" (Normattiva). Che la Banca d'Italia possa essere identificata come soggetto critico è un'ipotesi non verificata; il difetto di coerenza resta.

### F04. I segnali calcolati non sono mostrati: restano solo le loro fonti, senza testo

- **Persona**: B (impatta anche A)
- **Severità**: alta
- **Superficie**: esito, trace, fonti, PDF, README
- **Descrizione**: il cumulo con la L. 90/2024, il canale Allegato IV per le società a partecipazione pubblica, la doppia identità come fornitore di servizi gestiti (Allegato I p. 9) e le identità multiple nel settore elettrico non compaiono né nell'esito, né tra i "punti da valutare", né nel percorso di calcolo, né nel PDF. Le relative fonti però sono elencate in "Fonti citate in questo esito" senza alcuna frase che le richiami. Il wizard promette "ti segnaleremo le eventuali identità multiple"; il README dichiara che il cumulo L. 90/2024 "si aggiunge all'esito senza sostituirlo"; nel percorso lett. d) l'avviso "lo strumento non segnala il cumulo" lascia intendere che per le lett. a), b), c) lo segnali, ma in P1 e P2 non compare nulla. L'HTML esportato contiene il testo del segnale L. 90 (con il rinvio all'art. 1 c. 7 lett. a) e all'art. 15-bis), che quindi esiste ma non viene reso.
- **Passi per riprodurre**: (C2) Cloud; PSNC No; DORA No; Cloud PA No; partecipazione pubblica Sì; "Società in house di uno dei soggetti elencati dall'art. 1 c. 1 L. 90/2024"; B2B Sì; soggetto critico No; Grande. Anche (P2) PA lett. c ASL; (E8) Energia DSO con fornitura e capitale pubblico prevalente.
- **Testo citato**: tra le fonti di C2, senza testo corrispondente: "L. 90/2024, art. 1 c. 7 lett. a) Le disposizioni dell'art. 1 non si applicano ai soggetti richiamati dalla lettera, tra cui i soggetti del perimetro di sicurezza nazionale cibernetica.", "D.Lgs. 138/2024, art. 3 c. 8", "FAQ ACN A1.9.2", "D.Lgs. 175/2016"; nel wizard: "Seleziona l'attività principale; ti segnaleremo le eventuali identità multiple."
- **Evidenza normativa**: L. 90/2024 art. 1 c. 1, art. 1 c. 7 lett. a) e art. 15-bis (Normattiva): il rapporto tra L. 90 e NIS è proprio il tipo di informazione che il consulente deve vedere, perché l'art. 1 c. 7 lett. a), letto con l'art. 15-bis, esclude dall'art. 1 della legge i soggetti richiamati, con rinvio ora al D.Lgs. 138/2024. Il difetto è di resa, non di contenuto.

### F05. Formulazione categorica nelle regole dimensionali

- **Persona**: B
- **Severità**: media
- **Superficie**: esito, trace, PDF
- **Descrizione**: le regole indipendenti dalla dimensione usano la formula probabilistica ("l'analisi suggerisce il rientro"); le regole dimensionali di cloud ed energia affermano invece in modo categorico la qualifica o l'esclusione. Lo stesso testo è ripetuto nel percorso di calcolo e nella parte sintetica del PDF. Anche la chiusa "Verifica obbligatoria con consulente qualificato" suggerisce un obbligo giuridico che non esiste: è una raccomandazione dello strumento.
- **Passi per riprodurre**: percorso A; C2; C1; E2.
- **Testo citato**: "In settore Allegato I p. 1 (Energia) qualificato come soggetto importante."; "In settore Allegato I (altamente critico) qualificato come soggetto essenziale."; "Esclusione dall'ambito NIS2 in via generale (art. 3 c. 2 D.Lgs. 138/2024)."
- **Evidenza normativa**: non normativa (vincolo di linguaggio dichiarato dall'avviso: "non sono mai categorici").

### F06. Citazione a granularità di articolo per la qualifica (art. 6) e FAQ citata come intera sezione

- **Persona**: B
- **Severità**: media
- **Superficie**: fonti, esito, PDF
- **Descrizione**: la qualifica delle regole dimensionali è citata come "D.Lgs. 138/2024, art. 6", mentre l'intestazione delle fonti dichiara "Citate al livello verificato: articolo e comma, o codice FAQ". Il comma pertinente esiste ed è già usato altrove dallo strumento (art. 6 c. 3 nella pagina dei limiti; art. 6 c. 1 lett. b) per i soggetti critici). In E8 compare inoltre "FAQ ACN Settori, sottosettori e tipologie di soggetto", cioè un'intera sezione delle FAQ, senza codice.
- **Passi per riprodurre**: percorso A (media, importante); C2 (grande, essenziale); E8.
- **Testo citato**: "D.Lgs. 138/2024, art. 6 · Qualifiche di soggetto essenziale e importante."; "FAQ ACN Settori, sottosettori e tipologie di soggetto · Settori, sottosettori e tipologie di soggetto: atti UE, criteri dimensionali e qualifiche per sottosettore."
- **Evidenza normativa**: D.Lgs. 138/2024 art. 6 c. 1 lett. a) ("i soggetti di cui all'allegato I che superano i massimali per le medie imprese") per il grande; art. 6 c. 3 ("sono considerati soggetti importanti i soggetti di cui all'articolo 3 che non sono considerati essenziali ai sensi dei commi 1 e 2") per il medio (Normattiva).

### F07. Ex operatori di servizi essenziali: l'avviso dice che l'ambito non cambia, ma l'art. 3 c. 9 lett. a) riguarda proprio l'ambito

- **Persona**: B (e A, che non sa se era OSE)
- **Severità**: media
- **Superficie**: esito, limiti, PDF
- **Descrizione**: l'avviso sul regime transitorio degli ex OSE afferma che "riguarda le misure, non l'ambito" e che "l'esito indicato non cambia". L'avviso sull'art. 3 c. 9 cita come esempi solo l'unico fornitore nazionale e l'elemento sistemico della catena di approvvigionamento, omettendo la lett. a), che riguarda proprio gli ex OSE. Nel settore energia, dove gli ex OSE sono numerosi, una piccola impresa ex OSE riceve "Probabile esclusione" senza alcun richiamo a questo criterio (E2), e lo strumento dichiara di non chiedere la qualifica pregressa.
- **Passi per riprodurre**: (E2) Energia; produzione; micro o piccola. Confronto con il percorso A (media) dove compare l'avviso ex OSE.
- **Testo citato**: "Il regime riguarda le misure, non l'ambito: l'esito indicato non cambia, e lo strumento non chiede se il soggetto era un operatore di servizi essenziali."; "(ad esempio unico fornitore nazionale di un servizio essenziale, o elemento sistemico della catena di approvvigionamento [...])".
- **Evidenza normativa**: D.Lgs. 138/2024 art. 3 c. 9 lett. a) (Normattiva): il decreto si applica, indipendentemente dalle dimensioni, ai soggetti individuati secondo il c. 13 qualora "a) il soggetto sia identificato prima della data di entrata in vigore del presente decreto come operatore di servizi essenziali ai sensi del decreto legislativo 18 maggio 2018, n. 65".

### F08. Punti di ricarica: etichetta "Probabile esclusione" contro il testo "non verdetto di esclusione"; tipologia "registrati su PUN" dopo "No"

- **Persona**: B
- **Severità**: media
- **Superficie**: esito, wizard
- **Descrizione**: in E7 la scala evidenzia "Probabile esclusione" mentre il testo dell'esito nega che si tratti di un'esclusione. In E5 ed E7 il riquadro "Tipologia" riporta "Gestione di punti di ricarica (registrati su PUN)" anche quando l'utente ha risposto che non è obbligato o non sa. L'opzione dell'attività principale presuppone la registrazione su PUN, che la domanda successiva rimette in discussione.
- **Passi per riprodurre**: Energia; PSNC No; DORA No; Cloud PA No; attività principale "Gestione di punti di ricarica (registrati su PUN)"; nessuna ulteriore; PUN "No, non obbligato alla registrazione su PUN"; partecipazione pubblica No; soggetto critico No; Grande.
- **Testo citato**: "Non e' un'esclusione categoriale: il soggetto potrebbe rientrare per altra tipologia o per obbligo PUN sopravvenuto. Segnalazione, non verdetto di esclusione." con scala su "Probabile esclusione" e Tipologia "Gestione di punti di ricarica (registrati su PUN)".
- **Evidenza normativa**: FAQ ACN A1.1.a.3 (pagina "Settori, sottosettori e tipologie di soggetto" su acn.gov.it): i punti vendita che offrono ricarica non rientrano nella definizione di gestore di punto di ricarica; rilevano i soggetti registrati sulla PUN (dm MASE n. 106 del 2023). Il finding riguarda la coerenza tra etichetta, testo e riquadro, non il merito.

### F09. Nel PDF le voci condizionali dei limiti descrivono fatti che l'utente non ha dichiarato

- **Persona**: A e B
- **Severità**: media
- **Superficie**: PDF
- **Descrizione**: la sezione "Cosa non gestisce il tool" del PDF stampa tutte le voci segnalate del settore, anche quelle non attivate; alcune sono scritte al presente indicativo sul "soggetto". Un consulente che legge il PDF del percorso A può credere che il cliente abbia dichiarato di essere soggetto critico o di gestire punti di ricarica non PUN. Solo la voce emersa porta la marca "(Emerso da questa valutazione)", che da sola non basta a distinguere.
- **Passi per riprodurre**: percorso A, "Scarica PDF", pagine 4-5.
- **Testo citato**: "Il soggetto dichiara attività tutte escluse per tipologia secondo le FAQ ACN, ma risulta anche individuato come soggetto critico ai sensi del D.Lgs. 134/2024 [...]"; "Il soggetto indica, tra le attività dichiarate, la gestione di punti di ricarica senza obbligo di registrazione sul PUN, o con obbligo non noto."
- **Evidenza normativa**: non normativa (coerenza tra risposte e documento).

### F10. Domanda PSNC: "notifica ricevuta da ACN o dal CISR" non corrisponde al testo vigente; stima "150-250" senza fonte

- **Persona**: B
- **Severità**: media
- **Superficie**: wizard, PDF (le risposte riportano il testo della domanda)
- **Descrizione**: la domanda indica come mittente della notifica "ACN o il CISR". Il testo vigente attribuisce l'adozione dell'elenco al Presidente del Consiglio dei ministri su proposta del CIC e prevede una comunicazione al soggetto senza indicarne il mittente; il CISR non compare. Un soggetto che ha ricevuto la comunicazione da altra struttura potrebbe rispondere "No", come suggerisce lo stesso aiuto ("se non hai ricevuto una notifica esplicita, rispondi 'no'"). La stima "stimati 150-250" non ha fonte.
- **Passi per riprodurre**: qualunque settore, domanda 1.
- **Testo citato**: "Il soggetto è stato formalmente inserito nel Perimetro di Sicurezza Nazionale Cibernetica (PSNC) ai sensi del DL 105/2019, con notifica ricevuta da ACN o dal CISR?"; "Il PSNC riguarda un numero ristretto di soggetti (stimati 150-250)".
- **Evidenza normativa**: D.L. 105/2019 art. 1 cc. 2 e 2-bis (Normattiva): elencazione "contenuta in un atto amministrativo, adottato dal Presidente del Consiglio dei ministri, su proposta del CIC"; "A ciascun soggetto è data, separatamente, comunicazione senza ritardo dell'avvenuta iscrizione nell'elenco."

### F11. Domanda DORA: aiuto limitato a banche medie o grandi, nessuna distinzione per i fornitori terzi di servizi TIC

- **Persona**: B
- **Severità**: media
- **Superficie**: wizard
- **Descrizione**: l'aiuto invita a rispondere "sì" solo per banche o infrastrutture dei mercati finanziari "di dimensione media o grande", mentre la domanda chiede se il soggetto è un'entità finanziaria regolata da DORA, a prescindere dalla dimensione. Nel percorso cloud un fornitore che serve banche può considerarsi "regolato da DORA" come fornitore terzo di servizi TIC e rispondere "Sì", attivando avvisi sulle entità finanziarie che non lo riguardano (C6).
- **Passi per riprodurre**: Cloud computing, domanda 2; poi DORA Sì, Media (C6).
- **Testo citato**: "Se il soggetto è una banca o un'infrastruttura dei mercati finanziari di dimensione media o grande, rispondi 'sì'."
- **Evidenza normativa**: ipotesi non verificata in questa sessione sul testo ufficiale (EUR-Lex non leggibile dallo strumento di consultazione): Reg. (UE) 2022/2554 art. 2 par. 1, che elenca le entità finanziarie senza soglie dimensionali e include alla lett. u) i fornitori terzi di servizi TIC; art. 4 sulla proporzionalità.

### F12. Dopo l'esito manca qualunque indicazione informativa sui passi successivi

- **Persona**: A
- **Severità**: media
- **Superficie**: esito, PDF
- **Descrizione**: l'utente non esperto con "Probabile rientro, importante" riceve solo "Verifica obbligatoria con consulente qualificato". Non trova cosa significhino "importante" ed "essenziale", né che la registrazione sulla piattaforma ACN avviene in una finestra annuale, né cosa portare al consulente. L'avviso cita la piattaforma ACN solo in negativo ("non sostituisce la registrazione"). Un'informazione neutra, non prescrittiva, con la fonte, aiuterebbe senza violare il registro del prodotto.
- **Passi per riprodurre**: percorso A.
- **Testo citato**: "Verifica obbligatoria con consulente qualificato prima di assumere conclusioni operative."
- **Evidenza normativa**: D.Lgs. 138/2024 art. 7 c. 1 (Normattiva): "Dal 1° gennaio al 28 febbraio di ogni anno successivo alla data di entrata in vigore del presente decreto, i soggetti di cui all'articolo 3, si registrano o aggiornano la propria registrazione sulla piattaforma digitale".

### F13. La tabella delle soglie dimensionali appare come markdown grezzo

- **Persona**: A
- **Severità**: bassa
- **Superficie**: wizard
- **Descrizione**: nell'aiuto della domanda sulla dimensione la tabella è resa come testo con barre verticali e trattini, poco leggibile proprio nella domanda più importante per il calcolo.
- **Passi per riprodurre**: Energia o Cloud, ultima domanda "A quale categoria dimensionale appartiene il soggetto".
- **Testo citato**: "| Categoria | Effettivi | Fatturato annuo | Bilancio annuo |" seguito da "|-----------|-------------|-----------------|----------------|".
- **Evidenza normativa**: non normativa. Le soglie riportate sono coerenti con la Racc. 2003/361/CE come richiamata dall'art. 3 cc. 2 e 4 D.Lgs. 138/2024.

### F14. Gergo non spiegato per il lettore non esperto

- **Persona**: A
- **Severità**: media
- **Superficie**: wizard, esito, click-wrap
- **Descrizione**: termini usati senza spiegazione o con spiegazione insufficiente: PSNC, CISR, DORA, "entità finanziaria", "Regolamento Cloud per la PA (Decreto Direttoriale ACN n. 21007/24)", "clienti attivi", "Allegati I e II", PUN, "effettivi", "imprese collegate o associate", "Lista S13", "Capo V", "categoria 'alto'", "pre-screening", "corpus normativo", "AS-IS". La parte sintetica dell'esito riusa testo tecnico pensato per il consulente.
- **Passi per riprodurre**: percorso A; P1 per "Lista S13" e "Capo V".
- **Testo citato**: "La valutazione presuppone l'inclusione nell'elenco ISTAT (Lista S13)."; "In settore Allegato I p. 1 (Energia) qualificato come soggetto importante. Per 'fatturato' si intende quello complessivo [...]".
- **Evidenza normativa**: non normativa.

### F15. Domande non pertinenti al percorso

- **Persona**: A e B
- **Severità**: bassa
- **Superficie**: wizard
- **Descrizione**: al produttore di energia si chiede se eroga servizi cloud qualificati per la PA; alla PA si chiede se è un'entità finanziaria DORA; all'organo escluso dall'art. 4 c. 2 si chiedono classificazione Cloud e qualifica di soggetto critico (vedi F02); alla società di trasporto del canale Allegato IV si chiede "L'amministrazione ha classificato i propri dati [...]". Nell'attività ulteriore del settore elettrico si ripropone l'attività già scelta come principale. Il contatore cambia durante il percorso ("Domanda 1 di 8", poi "Domanda 5 di 9", poi "Domanda 6 di 10").
- **Passi per riprodurre**: percorso A (domanda 3); P5; P4.
- **Testo citato**: "Il soggetto eroga servizi cloud destinati a una Pubblica Amministrazione, qualificati ai sensi del Regolamento Cloud per la PA [...]?" (settore energia).
- **Evidenza normativa**: non normativa.

### F16. "Comunità energetiche rinnovabili (CACER)": espansione dell'acronimo imprecisa

- **Persona**: B
- **Severità**: bassa
- **Superficie**: wizard (domanda sul soggetto critico, in tutti e tre i settori)
- **Descrizione**: CACER indica le configurazioni di autoconsumo per la condivisione dell'energia rinnovabile, famiglia di cui la comunità energetica rinnovabile è una sola tipologia. La distinzione dai soggetti critici è corretta nell'intento; l'acronimo è attribuito all'istituto sbagliato. La precisazione compare anche nei percorsi cloud e PA, dove non serve.
- **Passi per riprodurre**: qualunque settore, domanda "Il soggetto è stato individuato come soggetto critico ai sensi del D.Lgs. 134/2024?".
- **Testo citato**: "Non riguarda le comunità energetiche rinnovabili (CACER)."
- **Evidenza normativa**: MASE, "Allegato 1 Decreto CACER e TIAD" (regole operative, mase.gov.it); Camera dei deputati, "Le configurazioni per l'autoconsumo diffuso" (temi.camera.it): le CACER comprendono più configurazioni, tra cui le CER.

### F17. Incoerenze del README con l'app

- **Persona**: B
- **Severità**: bassa
- **Superficie**: README
- **Descrizione**: (a) la sezione 1 elenca DORA tra i regimi speciali che lo strumento "riconosce e indirizza al consulente", ma con DORA Sì l'esito segue le regole del settore e il riquadro mostra "Regimi speciali: Nessuno" (C6); la pagina dei limiti, coerentemente con l'app, classifica DORA come "segnalato". (b) L'enumerazione completa citata come verifica è del corpus 0.11.0, mentre l'export è sul corpus 0.12.2. (c) La sezione 4 dice che i segnali, come il cumulo L. 90/2024, si aggiungono all'esito: nell'app non sono visibili (F04).
- **Passi per riprodurre**: README sezioni 1, 4 e 6; percorso C6.
- **Testo citato**: "Non valuta nel merito i regimi speciali (Perimetro di Sicurezza Nazionale Cibernetica, Regolamento Cloud per la PA, DORA): li riconosce e indirizza al consulente."; "418.576 combinazioni valutate [...] (esecuzione del 2026-10-30, corpus 0.11.0 [...])".
- **Evidenza normativa**: non normativa.

### F18. Forma dei testi di regola: apostrofi al posto degli accenti, frasi da nota interna, etichette diverse per la stessa regola

- **Persona**: B
- **Severità**: bassa
- **Superficie**: esito, trace, PDF
- **Descrizione**: nei testi dell'esito compaiono "attivita'", "e'", "puo'", "Autorita'", "Non e'"; frasi in stile appunto ("Segnalazione con invito a verificare l'obbligo PUN.", "Consulenza qualificata necessaria."); la stessa regola dimensionale cloud dice "In settore Allegato I (altamente critico)" per il grande e "In settore Allegato I p. 8 (Infrastrutture digitali)" per il medio; nel percorso di calcolo lo stadio dimensionale non valutato per effetto di un regime è descritto come "Non valutato: decide un regime speciale" in C3 e come "Non applicabile alle risposte date" in E9; il conflitto di E4 dice "ad esempio come soggetto critico" quando il caso è uno solo.
- **Passi per riprodurre**: P1, P3, E4, E5, E7, C2, C6, C3, E9.
- **Testo citato**: "Ogni attivita' dichiarata dal soggetto risulta esclusa per tipologia [...]".
- **Evidenza normativa**: non normativa.

### F19. Prevalenza tra esclusione per tipologia e soggetto critico: il testo dell'art. 3 c. 5 lett. a) dà un'indicazione

- **Persona**: B
- **Severità**: media (ipotesi interpretativa)
- **Superficie**: esito, limiti
- **Descrizione**: lo strumento dichiara che la prevalenza tra l'esclusione dei clienti attivi (FAQ A1.1.a.4, riferita alla tipologia "produttori") e l'inclusione come soggetto critico "non è attestata" e restituisce "Esito incerto". Il testo dell'art. 3 c. 5 lett. a) non lega l'applicazione alla tipologia dell'Allegato I ("si applica [...] anche"), il che suggerisce un canale autonomo e quindi un probabile rientro come essenziale (art. 6 c. 1 lett. b)). Va confrontato con F03, dove lo strumento risolve in senso opposto un conflitto analogo.
- **Passi per riprodurre**: (E4) Energia; produzione; cliente attivo Sì; soggetto critico Sì; micro o piccola.
- **Testo citato**: "Le fonti verificate non indicano quale dei due criteri prevalga. Consulenza qualificata necessaria."
- **Evidenza normativa**: D.Lgs. 138/2024 art. 3 c. 5 lett. a) e art. 6 c. 1 lett. b) (Normattiva). L'esito "incerto" resta prudente; la lettura proposta è un'ipotesi da sottoporre all'autore, non un errore accertato.

### F20. Soggetto critico in PA: la condizione dell'elenco ISTAT viene posta anche quando il rientro deriva dall'art. 3 c. 5 lett. a)

- **Persona**: B
- **Severità**: bassa
- **Superficie**: esito
- **Descrizione**: per una Regione individuata come soggetto critico l'esito dice che la valutazione "presuppone l'inclusione nell'elenco ISTAT", ma l'inclusione come soggetto critico opera indipendentemente dal canale PA dell'art. 3 c. 6.
- **Passi per riprodurre**: (P7) PA; lett. b; classificazione Cloud No; soggetto critico Sì.
- **Testo citato**: "La valutazione presuppone l'inclusione nell'elenco ISTAT (Lista S13)."
- **Evidenza normativa**: D.Lgs. 138/2024 art. 3 c. 5 lett. a) e c. 6 (Normattiva).

### F21. Pagina 404 in inglese

- **Persona**: A
- **Severità**: bassa
- **Superficie**: altro (404)
- **Descrizione**: un indirizzo inesistente mostra la pagina predefinita in inglese, in un'app interamente in italiano.
- **Passi per riprodurre**: aprire http://localhost:4173/qualunque.
- **Testo citato**: "404: This page could not be found."
- **Evidenza normativa**: non normativa.

## 5. Tabella riassuntiva

| Id | Severità | Superficie | Titolo breve |
|----|----------|------------|--------------|
| F01 | alta | esito, trace, limiti | PSNC e classificazione Cloud rendono "incerto" un ambito non in dubbio |
| F02 | alta | esito, wizard | L'instradamento a regime scavalca l'esclusione dell'art. 4 c. 2 |
| F03 | alta | esito | Organo escluso e soggetto critico: risposta ignorata senza avviso |
| F04 | alta | esito, trace, fonti, PDF, README | Segnali (L. 90, Allegato IV, servizi gestiti, identità multiple) non mostrati, fonti orfane |
| F05 | media | esito, trace, PDF | Formulazione categorica nelle regole dimensionali |
| F06 | media | fonti, esito, PDF | Art. 6 citato senza comma; FAQ citata come sezione |
| F07 | media | esito, limiti, PDF | Ex OSE: omesso l'art. 3 c. 9 lett. a), "l'ambito non cambia" |
| F08 | media | esito, wizard | Punti di ricarica: etichetta contro testo, tipologia "registrati su PUN" |
| F09 | media | PDF | Voci condizionali dei limiti descrivono fatti non dichiarati |
| F10 | media | wizard, PDF | Domanda PSNC: CISR e ACN contro testo vigente (CIC, PCM) |
| F11 | media | wizard | Domanda DORA: aiuto limitato per dimensione, fornitori TIC non distinti |
| F12 | media | esito, PDF | Nessuna indicazione informativa sui passi successivi |
| F13 | bassa | wizard | Tabella delle soglie in markdown grezzo |
| F14 | media | wizard, esito, click-wrap | Gergo non spiegato per il non esperto |
| F15 | bassa | wizard | Domande non pertinenti al percorso, contatore variabile |
| F16 | bassa | wizard | "Comunità energetiche rinnovabili (CACER)": acronimo attribuito male |
| F17 | bassa | README | DORA tra i regimi instradati, enumerazione su corpus precedente |
| F18 | bassa | esito, trace, PDF | Apostrofi per accenti, frasi da nota interna, etichette incoerenti |
| F19 | media | esito, limiti | Prevalenza esclusione per tipologia contro soggetto critico (ipotesi) |
| F20 | bassa | esito | Condizione ISTAT posta anche al soggetto critico |
| F21 | bassa | 404 | Pagina 404 in inglese |

Totale: 4 alta, 10 media, 7 bassa.

## 6. Triage (Claude Code, 2026-11-02)

Regola: ogni finding normativo è stato riscontrato sul corpus (`packages/corpus/corpus/`) e sulla KB (`nis2-knowledge-it`, HEAD f373942) prima di qualunque modifica; le letture del reviewer non riscontrate restano ipotesi. Nessun ingest, credito stop-and-ingest invariato (1). Nessuna modifica al corpus in questo blocco.

| Id | Sev. | Riscontro | Decisione |
|----|------|-----------|-----------|
| F01 | alta | **Confermato.** KB, nodo "Determinazione ACN categorizzazione - 2026-04-13" (righe 18, 36-37, 49): gli artt. 4 e 5 della Det. 155238/2026 regolano la categorizzazione delle attività e dei servizi dei soggetti NIS (art. 30), non l'ambito. Nel corpus gli override PSNC e Cloud PA instradano a `escalate_to_advisor` / `ambiguous` per scelta (ADR 0009, ADR 0014). | **STOP, decisione dell'autore**: la correzione cambia regole ed esiti attesi (override dei tre settori; fixture E07, E08, E20, E21, E22 e altre con PSNC o classificazione Cloud). |
| F02 | alta | **Confermato.** Lo stadio 1 (regimi) decide prima dello stadio 2 (ADR 0016 §1); `esclusa_art_4_c_2` è un'esclusione di stadio 2. Art. 4 c. 2 nel registro (`dlgs_138_2024_art_4_c_2`). Dopo l'esclusione il wizard pone ancora `classificazione_cloud_pa` e `soggetto_critico`. | **STOP, decisione dell'autore**: precedenza tra stadi (ADR 0016) e visibilità delle domande (questionario). |
| F03 | alta | **Confermato sul corpus.** Le regole PA con `soggetto_critico == yes` coprono solo le lett. b), c), d); con `esclusa_art_4_c_2` non scatta nessuna regola di stadio 3, quindi il conflitto `stage_2_and_stage_3` (che in energia dà `ambiguous` con avviso) non si attiva. Art. 3 c. 5 lett. a) nel registro. | **STOP, decisione dell'autore**: serve una regola o un conflitto nuovo (esito atteso nuovo, fixture nuova). |
| F04 | alta | **Confermato**: omissione dell'app (S4.1), `Verdict.signals` non era mai reso. Il testo esiste nel corpus (`base_reasoning_trace` più `sector_context`). | **Corretto** (web): pannello "Altre segnalazioni dalle risposte date" a schermo e in stampa; test su tutte le 27 fixture (segnali mostrati = segnali attesi) ed e2e. |
| F05 | media | **Confermato**: le `reasoning_trace` delle regole dimensionali di cloud ed energia sono in forma categorica ("qualificato come soggetto importante", "Esclusione dall'ambito NIS2 in via generale"), contro il vincolo 1 di CLAUDE.md. La chiusa "Verifica obbligatoria con consulente qualificato" è la formula prescritta da CLAUDE.md: non si cambia. | **Proposta di patch corpus 0.12.3** (testi), da confermare: copy dei verdetti. |
| F06 | media | **Confermato in parte.** Le regole dimensionali citano `dlgs_138_2024_art_6` (articolo); nel registro esiste `dlgs_138_2024_art_6_c_3` (importante), non `art_6_c_1_lett_a` (essenziale per i soggetti dell'Allegato I oltre la media impresa): va attestato nella KB prima dell'uso. `faq_settori_sottosettori` è una citazione a livello di sezione, nota. | **Proposta 0.12.3** (citazioni), con attestazione KB del c. 1 lett. a). |
| F07 | media | **Confermato.** KB, nodo D.Lgs. 138/2024, riga 31: testo dell'art. 3 c. 9 lett. a) (ex OSE, individuati ex c. 13). La voce `individuazione_acn_art_3_c_9` omette la lett. a); la voce `energia_regime_transitorio_ose` ("l'esito indicato non cambia") è corretta sul regime transitorio ma tace il c. 9 lett. a). | **Proposta 0.12.3** (catalogo): richiamo della lett. a) in entrambe le voci. |
| F08 | media | **Confermato** sul corpus: `registrato_pun == "no"` dichiara `likely_out_of_scope` mentre il testo dice "Segnalazione, non verdetto di esclusione"; l'opzione si chiama "Gestione di punti di ricarica (registrati su PUN)" e la domanda successiva lo rimette in discussione. | **Proposta**: testo della mappatura (patch) o esito (minor, cambia l'atteso): decisione dell'autore. |
| F09 | media | **Confermato** (forma del PDF). | **Corretto** (web): nel blocco limiti del PDF le voci segnalate sono divise tra "emerso dalle risposte date" e "altri casi segnalati per questo settore, non emersi dalle risposte date". La riduzione del PDF a circa 4 pagine (persona A) resta una proposta per l'autore: contraddice la decisione del Blocco 2 (segnalate del settore valutato). |
| F10 | media | **Non riscontrabile**: la KB non ha un nodo sorgente del D.L. 105/2019 (CISR / CIC, art. 1 cc. 2 e 2-bis); la stima "150-250" non ha fonte nel corpus né nella KB. | **Open point**: possibile lacuna (fonte primaria mancante, impatto sul wizard). Nessun ingest senza decisione (credito 1). |
| F11 | media | Ipotesi non verificata (testo DORA non in raw/, STATUS punto 16, residuo fornitori TIC). | **Open point**, nessuna modifica. |
| F12 | media | Contenuto nuovo (passi successivi, finestra di registrazione art. 7 c. 1). | **Proposta / backlog**: tocca lo scope e il copy dei verdetti. |
| F14 | media | Confermato come problema d'uso. | **Backlog**: glossario dei termini nel wizard e nell'esito (feature). |
| F19 | media | Ipotesi interpretativa del reviewer; la prevalenza "non attestata" è una scelta documentata (ADR 0016, conflitti). | **Open point**, da leggere insieme a F03. |
| F13, F15, F16, F18, F20, F21 | bassa | Riscontrati come forma. F16: il naming "comunità energetiche rinnovabili (CACER)" è prescritto da CLAUDE.md (vincolo 4, ADR 0004): segnalato all'autore. | **Backlog** in `docs/ARCHITECTURE.md`. |
| F17 | bassa | (a) README: DORA indicato tra i regimi "riconosciuti e indirizzati"; (b) enumerazione del corpus 0.11.0; (c) segnali non visibili. | (a) **Corretto** nel README (errore del testo, costo nullo); (c) risolto da F04; (b) l'enumerazione si ripete nel Blocco 6. |

Esito del triage: 2 findings corretti (F04 alta, F09 media), 1 corretto in parte nel README (F17); 3 alti in STOP per decisione dell'autore (F01, F02, F03); 5 medi in proposta di patch corpus o decisione (F05, F06, F07, F08, F12); 4 open point (F10, F11, F14 come backlog, F19); bassi a backlog.
