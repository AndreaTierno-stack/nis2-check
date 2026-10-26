---
title: Legge 90-2024 (cybersicurezza nazionale)
type: source
scope: both
source_type: paper
source_path: raw/articles/90_2024.pdf
url: https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2024-06-28;90
author: Repubblica Italiana — Parlamento
date_published: 2024-06-28
date_ingested: 2026-05-23
tags: [italia, cybersicurezza-nazionale, l90-2024, reati-informatici, perimetro-pa, referente-cybersicurezza, procurement, dora-bancoposta, codice-penale, d-lgs-231]
aliases: [L. 90/2024, Legge cybersicurezza, Legge cyber, Legge sui reati informatici]
---

## TL;DR

**Legge 28 giugno 2024 n. 90** (GU 2 luglio 2024 n. 153, vigente dal 17 luglio 2024). Atto unitario in **due capi**:

- **Capo I (artt. 1-15-bis)** — Cybersicurezza nazionale: obblighi specifici per una platea di **soggetti pubblici/controllo pubblico tassativamente elencati** (PA centrali, regioni, città metropolitane, comuni >100k e capoluogo, trasporto pubblico ≥100k, ASL, società in house qualificate) di **notifica incidenti** (24h+72h), **adeguamento a segnalazioni vulnerabilità** (15gg), **referente per la cybersicurezza** dentro una struttura interna con 7 funzioni, e **procurement ICT con criteri "buy EU/NATO"** per beni/servizi destinati a interessi nazionali strategici. Sanzioni € 25-125k per reiterata inosservanza + responsabilità disciplinare e amministrativo-contabile per funzionari/dirigenti. Cooling-off periods 2-3 anni per personale ACN e intelligence. Istituzione del Centro Nazionale di Crittografia presso ACN.
- **Capo II (artt. 16-23)** — Reati informatici: riforma sistematica del Capo III-bis e correlati del codice penale (artt. 615-ter et seq.) con **aumento generalizzato delle pene**, **introduzione dell'estorsione informatica** (art. 629 c. 3 = ransomware), nuovo art. 635-quater.1 sulla detenzione/diffusione di tool offensivi, estensione del [[D.Lgs. 231-2001]] (responsabilità amministrativa enti) a tutto il pacchetto cyber-criminale aggiornato. Procura nazionale antimafia/antiterrorismo competente sui cyber-reati gravi. Personale CSIRT come pubblico ufficiale; trasmissione notifiche al Ministero Interno = referto ex art. 331 CPP.

Posizionamento nello stack normativo italiano: **5° regime** dopo [[concepts/Soggetti PSNC-NIS|PSNC]], [[concepts/NIS2|NIS2]], [[concepts/Coordinamento DORA-NIS|DORA]], Regolamento Cloud PA (cfr. [[synthesis/Stratificazione delle norme cybersecurity in Italia]]). **Art. 15-bis** è la disposizione di coordinamento chiave: ridireziona ogni riferimento al D.Lgs. 65/2018 (NIS1, abrogato) al [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]] a partire dalla data di efficacia.

## Punti chiave — Capo I (cybersicurezza)

### Art. 1 — Obblighi di notifica di incidenti

**c. 1 — Ambito soggettivo tassativo** (cfr. [[concepts/Perimetro Legge 90-2024]]):
- **PA centrali** (elenco ISTAT ex L. 196/2009 art. 1 c. 3 = Lista S13)
- **Regioni** + Province autonome Trento/Bolzano
- **Città metropolitane**
- **Comuni > 100.000 abitanti** + **Comuni capoluogo di regione** (anche se sotto soglia)
- **Società di trasporto pubblico urbano** con bacino utenza ≥ 100.000 abitanti
- **Società di trasporto pubblico extraurbano** operanti nell'ambito delle città metropolitane
- **Aziende sanitarie locali (ASL)**
- **Società in house** dei soggetti sopra, **solo se forniscono**: (a) servizi informatici, (b) servizi di trasporto delle tipologie elencate, (c) raccolta/smaltimento/trattamento acque reflue (Dir. 91/271/CEE artt. 2 punti 1-3), (d) gestione rifiuti (Dir. 2008/98/CE art. 3 punto 9)

Tassonomia incidenti = **determinazione tecnica del Direttore generale ACN**.

**c. 2 — Tempistiche notifica**:
- **24 ore** dalla conoscenza dell'evidenza: **segnalazione**
- **72 ore** dalla stessa decorrenza: **notifica completa**
- Canale: procedure ACN su sito istituzionale

> [!warning] Disallineamento con NIS2
> L. 90 prevede **solo 2 step (24h + 72h)** e **manca il report finale a 1 mese** invece previsto dall'[[concepts/Notifica di incidente significativo|art. 23 par. 4 NIS2 / art. 25 D.Lgs. 138]]. Per soggetti L. 90 ∩ NIS doppia procedura.

**c. 3 — Phase-in differito (180 giorni)**: per comuni >100k + capoluogo, società di trasporto, ASL, società in house gli obblighi cc. 1-2 si applicano dal **180° giorno** successivo all'entrata in vigore. PA centrali e Regioni: applicazione immediata.

**c. 4 — Notifiche volontarie**: rinvio a D.Lgs. 65/2018 art. 18 cc. 3-5 → ora D.Lgs. 138/2024 (art. 15-bis).

**c. 5 — Inosservanza**: comunicazione ACN al soggetto sulla potenziale escalation; possibili **ispezioni** nei 12 mesi successivi.

**c. 6 — Sanzioni per reiterata inosservanza (5 anni)**:
- **€ 25.000 – € 125.000** (stessa forbice [[concepts/Sanzioni NIS2|sanzioni PA NIS2]])
- + **responsabilità disciplinare e amministrativo-contabile** per funzionari/dirigenti responsabili

**c. 7 — Esclusioni**:
- a) Soggetti [[concepts/Soggetti PSNC-NIS|PSNC]] (DL 105/2019 art. 1 c. 2-bis); soggetti ex D.Lgs. 65/2018 art. 3 c. 1 lett. g) e i) → **ora soggetti NIS ex D.Lgs. 138 via art. 15-bis**
- b) Organi prevenzione/repressione reati + ordine pubblico + difesa militare + **organismi intelligence** (L. 124/2007 artt. 4, 6, 7)

### Art. 2 — Adeguamento a segnalazioni puntuali di vulnerabilità ACN

ACN segnala **specifiche vulnerabilità** ai soggetti potenzialmente esposti → **15 giorni** dalla comunicazione per adottare gli interventi risolutivi indicati. Si applica a soggetti L. 90 c. 1 **+ PSNC + soggetti NIS** (ridirezione 15-bis) **+ operatori telco art. 40 c. 3 cod. comunicazioni elettroniche**.

Mancata/ritardata adozione → sanzioni art. 1 c. 6, salvo motivate esigenze tecnico-organizzative tempestivamente comunicate ad ACN.

### Art. 3 — Norme di raccordo con il PSNC

Modifica DL 105/2019 art. 1 c. 3-bis:
- Tempistiche notifica PSNC allineate a **24h + 72h**
- Sanzione **€ 25.000 – € 125.000** per reiterata inosservanza (allineamento orizzontale con L. 90 c. 6 e con sanzioni PA NIS)

### Art. 4 — Raccolta dati incidenti

Nuova lett. n-ter all'art. 7 c. 1 DL 82/2021: ACN raccoglie, elabora, classifica i dati delle notifiche di incidenti; **pubblicazione nella Relazione annuale** ex art. 14 c. 1 DL 82/2021 come **dati ufficiali di riferimento** sugli attacchi cyber ai settori rilevanti per interessi nazionali.

### Art. 5 — Nucleo per la Cybersicurezza

Nuovo c. 4.1 all'art. 8 DL 82/2021: il [[entities/Nucleo per la Cybersicurezza]] può essere convocato in composizione estesa con rappresentanti della **Direzione nazionale antimafia/antiterrorismo**, della **Banca d'Italia**, di **operatori PSNC** e altri soggetti rilevanti.

### Art. 6 — Coordinamento intelligence ↔ ACN

Le **AISE e AISI** (L. 124/2007 artt. 6-7), via **DIS**, possono chiedere al PCM (o all'Autorità delegata) il **differimento** di attività di resilienza ACN (art. 7 c. 1 lett. n, n-bis DL 82/2021) per esigenze del Sistema di informazione per la sicurezza della Repubblica.

### Art. 7 — Composizione CISR allargata

Modifica L. 124/2007 art. 5 c. 3: il [[entities/Comitato Interministeriale per la Cybersicurezza|CISR]] include ora anche i Ministri delle Imprese e del Made in Italy, dell'Ambiente e Sicurezza Energetica, dell'Agricoltura, delle Infrastrutture e Trasporti, dell'Università e Ricerca → coincide con il bacino delle [[entities/Autorità di settore NIS|autorità di settore NIS]].

### Art. 8 — Struttura interna e referente per la cybersicurezza

Norma centrale per il GRC pubblico. Cfr. [[concepts/Referente per la cybersicurezza (L. 90-2024)]].

**c. 1 — Struttura interna** con **7 funzioni**:
- a) sviluppo politiche e procedure di sicurezza delle informazioni
- b) sistemi di analisi preventiva di rilevamento + piano di gestione del rischio informatico
- c) documento ruoli e organizzazione del sistema di sicurezza informazioni
- d) piano programmatico per sicurezza dati/sistemi/infrastrutture
- e) potenziamento capacità per gestione rischi informatici
- f) attuazione delle linee guida cyber ACN
- g) monitoraggio continuo minacce e vulnerabilità + patching tempestivo

**c. 2 — Referente cyber**:
- Individuato per **specifiche e comprovate professionalità e competenze** in cybersicurezza
- Possibile incarico a dipendente di **altra PA** ex art. 53 D.Lgs. 165/2001
- Funzione di **punto di contatto unico** dell'amministrazione con ACN (per L. 90 + normative settoriali) → **identità funzionale col [[entities/Punto di contatto NIS|pdc NIS]]** (cfr. art. 4 c. 8 Det. piattaforma 127437/2026)

**c. 3 — Coincidenza con RTD**: la struttura e il referente *possono* essere individuati nell'ufficio e nel **Responsabile per la Transizione al Digitale** ex art. 17 CAD (D.Lgs. 82/2005).

**c. 4 — Esercizio in forma associata**: art. 17 cc. 1-sexies/septies CAD → utile per amministrazioni piccole.

**c. 5 — Coordinamento orizzontale**: ACN può individuare modalità di collaborazione tra amministrazioni e tra referenti.

**c. 6 — Esoneri**: PSNC (regime proprio) + organi intelligence/sicurezza.

### Art. 9-10 — Crittografia

**Art. 9** — Le strutture cyber dei soggetti L. 90 + PSNC + NIS verificano che programmi/applicazioni che usano crittografia rispettino le **linee guida sulla crittografia + conservazione password** adottate da **ACN + Garante privacy** e non comportino vulnerabilità note.

**Art. 10** — Istituzione del **Centro Nazionale di Crittografia** presso ACN (nuovo art. 7 c. 1 lett. m-bis DL 82/2021):
- Centro di competenza nazionale per crittografia in ambito non classificato (resta competenza UCSe ex L. 124/2007 art. 9 sul classificato)
- Collaborazione con università/centri di ricerca per algoritmi proprietari e capacità crittografiche nazionali
- Esplicito riferimento a **blockchain** come strumento di cybersicurezza
- Senza nuovi oneri (risorse disponibili a legislazione vigente)

### Art. 11 — Procedimento sanzionatorio amministrativo ACN

Nuovo c. 4-quater all'art. 17 DL 82/2021. **DPCM attuativo** entro 90 gg per disciplinare termini e modalità di accertamento/contestazione/sanzione. Transitoriamente si applicano le sezioni I-II del Capo I della **L. 689/1981**.

### Art. 12 — Cooling-off period personale ACN

Nuovo c. 8-ter all'art. 12 DL 82/2021:
- **2 anni** dal completamento di percorsi formativi specialistici a spese ACN: divieto di assunzione/incarichi presso soggetti privati per mansioni cyber
- Contratti in violazione → **nulli**
- Esclusi: pensionamento, inabilità, dispensa per salute
- Fino al 31/12/2026: permanenza minima Area operativa ridotta a 3 anni (deroga transitoria)

### Art. 13 — Cooling-off period intelligence

- Ex direttori/vice direttori DIS/AISE/AISI + dirigenti generali: **3 anni** divieto presso soggetti esteri pubblici/privati e soggetti italiani **golden power** (DL 21/2012), salvo autorizzazione PCM
- Personale ruolo unico DIS/AISE/AISI: **3 anni** divieto presso titolari licenza investigatori privati (art. 134 TULPS) o soggetti di investigazione/ricerca/raccolta informativa
- Personale post-formazione specialistica: **3 anni** per le stesse mansioni
- Contratti in violazione → **nulli**

### Art. 14 — Contratti pubblici ICT con interessi nazionali strategici

Norma di forte rilievo GRC e industriale. Cfr. [[concepts/Elementi essenziali di cybersicurezza (procurement)]].

**c. 1 — DPCM attuativo** (entro 120 gg dall'entrata in vigore), su proposta ACN + parere CISR:
- Individua **"elementi essenziali di cybersicurezza"** per specifiche categorie tecnologiche ICT
- Definisce casi in cui prevedere **criteri di premialità** per tecnologie italiane/UE/NATO/Paesi terzi con accordi UE-NATO
- Definizione legislativa: *"insieme di criteri e regole tecniche la cui conformità […] garantisce la confidenzialità, l'integrità e la disponibilità dei dati"* (= CIA)

**c. 2 — Obblighi stazioni appaltanti**:
- **OEPV**: tetto **10% sul punteggio economico** (forza la qualità sul prezzo)
- **Minor prezzo**: elementi cyber tra **requisiti minimi**
- **Premialità** per tecnologie italiane/UE/NATO/Paesi accordi
- **Facoltà di esclusione** (artt. 107 c. 2 e 108 c. 10 D.Lgs. 36/2023) se offerta non considera gli elementi cyber

**c. 3 — Estensione a privati PSNC** (art. 1 c. 2-bis DL 105/2019): si applicano gli stessi obblighi su elementi essenziali.

**c. 4 — Resta fermo il regime DL 105/2019 art. 1 c. 2 lett. b)** sui beni/servizi ICT del perimetro.

### Art. 15 — Resilienza operativa digitale intermediari finanziari

Aggiunge lett. c-bis al c. 2 dell'art. 16 L. 21/02/2024 n. 15 (legge di delegazione UE): delega Governo a estendere principi **DORA-equivalenti** a:
- **Intermediari finanziari iscritti albo art. 106 TUB** (D.Lgs. 385/1993)
- **Poste Italiane Spa per il Patrimonio Bancoposta** (DPR 144/2001)

Con criteri di proporzionalità + **Banca d'Italia come autorità di vigilanza, indagine, sanzione**.

→ Estende il principio DORA a soggetti finanziari "minori" non coperti direttamente dal Reg. UE 2022/2554.

### Art. 15-bis — Disposizione di coordinamento (cruciale)

> *"Ogni riferimento al decreto legislativo 18 maggio 2018, n. 65, è da intendersi alle corrispondenti disposizioni di cui al decreto legislativo 4 settembre 2024, n. 138, a decorrere dalla data in cui le stesse acquistano efficacia."*

Risolve l'open question della wiki (referenze al D.Lgs. 65/2018 abrogato): **tutti i riferimenti della L. 90 al D.Lgs. 65 si leggono come riferimenti al D.Lgs. 138/2024** dalla data di efficacia delle relative disposizioni.

**Effetto operativo**: art. 1 c. 7 lett. a) → l'esclusione dei "soggetti NIS" dalla L. 90 va letta come esclusione dei soggetti **D.Lgs. 138/2024** (sia essenziali sia importanti, salvo ridelimitazioni interpretative ACN).

## Capo II — Sintesi operativa GRC (artt. 16-23)

<!-- scope-internal: Capo II = grc_personal puro; non rilevante per posizionamento NIS2 tool, rilevante per consulenza GRC italiana orientata al modello 231 dell'ente cliente. -->

Riforma sistematica del **Capo III-bis del Titolo XII Libro II del codice penale** + **D.Lgs. 231/2001** + codice di procedura penale + DL 82/2021. Profondità di trattamento qui: panoramica operativa per GRC, non dogmatica penalistica.

### Codice penale (art. 16)

**Aumento generalizzato delle pene** per accesso abusivo (615-ter: 2-10 anni / 3-12 aggravato), detenzione di credenziali (615-quater), intercettazione (617-quater/quinquies/sexies), danneggiamento dati (635-bis), danneggiamento sistemi pubblici (635-ter), danneggiamento sistemi telematici di pubblico interesse (635-quinquies).

**Tre fattispecie nuove/riformulate** di interesse GRC:
- **Art. 629 c. 3 — Estorsione informatica** (cyber-extortion): chi, con condotte degli artt. 615-ter, 617-quater, 617-sexies, 635-bis/quater/quinquies o con minaccia di compierle, costringe a fare/omettere → 6-12 anni base, 8-22 anni aggravato. **Codifica esplicita del ransomware**.
- **Art. 615-ter c. 2 n. 3** ampliato: aggravante anche per **sottrazione mediante riproduzione/trasmissione** o **inaccessibilità al titolare** → cattura sia data exfiltration sia ransomware lock.
- **Art. 635-quater.1 nuovo** — Detenzione/diffusione/installazione abusiva di apparecchiature/dispositivi/programmi dannosi (sostituisce 615-quinquies abrogato): 1-2 anni base, 2-6 aggravato, 3-8 anni se sistemi di pubblico interesse.

**Truffa online**: nuovo n. 2-ter all'art. 640 c. 2 — aggravante se commessa a distanza con strumenti che ostacolano identificazione.

### D.Lgs. 231/2001 — responsabilità amministrativa degli enti (art. 20)

**Punto chiave per consulenza GRC**: il modello 231 dell'ente cliente va revisionato.
- Art. 24-bis c. 1 D.Lgs. 231: quote da 100-500 → **200-700**
- Nuovo c. 1-bis: **estorsione informatica → 300-800 quote**
- Aggiornamento terminologia: 615-quinquies → 635-quater.1
- **Sanzioni interdittive** ex art. 9 c. 2 D.Lgs. 231 per estorsione cyber → **min. 2 anni**

### Procedura penale (art. 17) + raccordo CSIRT (art. 22)

- **Procura nazionale antimafia/antiterrorismo competente** sui cyber-reati gravi (estensione art. 51 c. 3-quinquies CPP)
- 635-quater.1 + 635-quinquies entrano nella competenza DDA/DNA
- Termini più lunghi indagini (art. 407 c. 2 lett. a) nuovo n. 7-ter)
- Personale **CSIRT Italia = pubblico ufficiale** (art. 22)
- **Trasmissione notifiche CSIRT al Ministero Interno (organo per la sicurezza dei servizi di TLC) = adempimento art. 331 CPP** (dovere referto del pubblico ufficiale)
- Procedure di raccordo CSIRT ↔ Procura nazionale antimafia per cyber-eventi su sistemi PSNC/NIS/telco

### Implicazione per il consulente GRC

Tre verifiche tipiche per cliente con modello 231 pre-2024:
1. I reati informatici aggiornati sono **mappati** nel catalogo 231 del cliente?
2. La fattispecie nuova di **estorsione informatica** (629 c. 3) è inserita come reato presupposto separato (è la 1-bis di 24-bis)?
3. Le **misure di prevenzione 231** sui rischi cyber sono allineate alle misure di gestione del rischio NIS2 e alle linee guida ACN ex art. 8 c. 1 lett. f)?

Non c'è duplicazione: il modello 231 governa la responsabilità ammnistrativa dell'ente per reati commessi *nel suo interesse o vantaggio*; NIS2/L. 90 governano gli obblighi di sicurezza/notifica. Ma le **misure preventive concrete** (formazione, controlli accessi, monitoraggio, gestione incidenti) sono in larga sovrapposizione → opportunità di **integrazione documentale** ai sensi del principio di proporzionalità.

## Posizionamento nello stack normativo italiano

La L. 90 è il **5° regime** della stratificazione cyber italiana. Per il quadro complessivo cfr. [[synthesis/Stratificazione delle norme cybersecurity in Italia]] (sezione § 5).

| Regime | Atto base | Logica | Numero soggetti |
|---|---|---|---|
| **PSNC** | DL 105/2019 | Funzioni essenziali Stato (lex specialis) | ~150-250 (DPCM riservato) |
| **NIS2** | D.Lgs. 138/2024 | 18 settori, size-cap, essenziali/importanti | Migliaia |
| **DORA** | Reg. UE 2022/2554 | Resilienza finanziaria UE | Tutte le entità finanziarie |
| **Cloud PA** | DD ACN 21007/24 | Classificazione dati/servizi PA cloud | Tutte le PA |
| **L. 90/2024** | L. 90/2024 | PA + soggetti pubblici qualificati: governance + notifica + procurement | ~200-300 |

**Coordinamento dedicato** L. 90 ↔ NIS2: cfr. [[synthesis/Coordinamento L. 90-2024 e NIS2]]. Sintesi degli aggangi normativi:

| Punto di coordinamento | Riferimento |
|---|---|
| Cumulo referente cyber L. 90 + pdc NIS sulla stessa persona | Art. 4 c. 8 Det. piattaforma 127437/2026 |
| Esclusione soggetti NIS dalla L. 90 | Art. 1 c. 7 lett. a) L. 90 + art. 15-bis |
| Esclusione soggetti PSNC dalla L. 90 | Art. 1 c. 7 lett. a) L. 90 |
| Ridireccionamento riferimenti D.Lgs. 65 → D.Lgs. 138 | Art. 15-bis L. 90 |
| Sanzione PA armonizzata € 25-125k | Art. 1 c. 6 L. 90 + art. 38 c. 9 D.Lgs. 138 |
| Notifica unica al CSIRT (canale ACN) | Art. 1 c. 2 L. 90 + art. 25 D.Lgs. 138 |

## Atti attuativi attesi (opzione A — tabella tracker)

| Articolo L. 90 | Tipo atto | Termine previsto | Contenuto | Stato (al 2026-05-23) |
|---|---|---|---|---|
| Art. 1 c. 1 | **Determinazione tecnica ACN** | non specificato | Tassonomia incidenti L. 90 | Da verificare su sito ACN |
| Art. 1 c. 5 | **Determinazione ACN** | non specificato | Modalità delle ispezioni post-inosservanza | Da verificare |
| Art. 11 | **DPCM** | 90 gg da entrata vigore (≈ 15/10/2024) | Disciplina del procedimento sanzionatorio ACN | Da verificare |
| Art. 12 | **Determinazione DG ACN** | non specificato | Individuazione percorsi formativi che attivano il cooling-off | Da verificare |
| Art. 13 c. 5 | **Regolamento ex art. 43 L. 124/2007** | non specificato | Procedure autorizzative ex c. 1 + eccezioni cc. 2-3 personale intelligence | Da verificare |
| **Art. 14 c. 1** | **DPCM** | **120 gg da entrata vigore** (≈ 14/11/2024) | **Elementi essenziali di cybersicurezza per categorie ICT** | **Da verificare — atto chiave per procurement** |
| Art. 15 | Decreto legislativo (via L. 15/2024) | termini delega L. 15/2024 | Estensione DORA-equivalenti a intermediari art. 106 TUB + Bancoposta | Da verificare presso MEF/Banca d'Italia |

**Azione**: alla prossima revisione lint, verificare se gli atti attuativi sono stati emanati. Se sì, candidare a Wave 8 l'ingest singoli con creazione di pagine source dedicate.

## Citazioni rilevanti

> *"Le pubbliche amministrazioni centrali individuate ai sensi dell'articolo 1, comma 3, della legge 31 dicembre 2009, n. 196, le regioni e le province autonome di Trento e di Bolzano, le città metropolitane, i comuni con popolazione superiore a 100.000 abitanti e, comunque, i comuni capoluoghi di regione […] segnalano e notificano […] gli incidenti indicati nella tassonomia […]."* — Art. 1 c. 1

> *"Presso le strutture di cui al comma 1 opera il referente per la cybersicurezza, individuato in ragione di specifiche e comprovate professionalità e competenze in materia di cybersicurezza. […] Il referente per la cybersicurezza svolge anche la funzione di punto di contatto unico dell'amministrazione con l'Agenzia per la cybersicurezza nazionale in relazione a quanto previsto dalla presente legge e dalle normative settoriali in materia di cybersicurezza cui è soggetta la medesima amministrazione."* — Art. 8 c. 2

> *"Ai fini del presente articolo, si intende per «elementi essenziali di cybersicurezza» l'insieme di criteri e regole tecniche la conformità ai quali, da parte di beni e servizi informatici da acquisire, garantisce la confidenzialità, l'integrità e la disponibilità dei dati da trattare in misura corrispondente alle esigenze di tutela di cui al primo periodo."* — Art. 14 c. 1

> *"Ogni riferimento al decreto legislativo 18 maggio 2018, n. 65, è da intendersi alle corrispondenti disposizioni di cui al decreto legislativo 4 settembre 2024, n. 138, a decorrere dalla data in cui le stesse acquistano efficacia."* — Art. 15-bis

> *"Chiunque, mediante le condotte di cui agli articoli 615-ter, 617-quater, 617-sexies, 635-bis, 635-quater e 635-quinquies ovvero con la minaccia di compierle, costringe taluno a fare o ad omettere qualche cosa, procurando a sé o ad altri un ingiusto profitto con altrui danno, è punito con la reclusione da sei a dodici anni e con la multa da euro 5.000 a euro 10.000."* — Art. 16 lett. m) — nuovo art. 629 c. 3 c.p. (estorsione informatica)

## Entità menzionate

- [[entities/ACN]] — autorità competente + funzione sanzionatoria + Centro Nazionale di Crittografia + raccordo con Procura nazionale antimafia
- [[entities/CSIRT Italia]] — personale come pubblico ufficiale; trasmissione notifiche al Ministero Interno = referto art. 331 CPP
- [[entities/Comitato Interministeriale per la Cybersicurezza]] — composizione CISR allargata (art. 7)
- [[entities/Nucleo per la Cybersicurezza]] — convocazione estesa con DNA, Banca d'Italia, operatori PSNC (art. 5)
- [[entities/Autorità di settore NIS]] — i nuovi membri CISR coincidono con i 9 ministeri NIS
- [[entities/Ministero della Difesa]] — coordinamento crisi cyber (intersezione art. 6)
- Banca d'Italia — autorità vigilanza intermediari finanziari estesi DORA (art. 15)
- DIS / AISE / AISI — esclusi dalla L. 90 (art. 1 c. 7 + art. 8 c. 6); cooling-off art. 13
- Garante per la protezione dei dati personali — linee guida crittografia/password (art. 9)
- Procura nazionale antimafia e antiterrorismo — competenza estesa sui cyber-reati gravi (art. 17 + art. 22)

## Concetti collegati

### Nuovi concept creati nell'ingest L. 90

- [[concepts/Perimetro Legge 90-2024]] — ambito soggettivo tassativo art. 1 c. 1
- [[concepts/Referente per la cybersicurezza (L. 90-2024)]] — duale del pdc NIS, struttura + 7 funzioni
- [[concepts/Elementi essenziali di cybersicurezza (procurement)]] — art. 14 + DPCM atteso

### Concept esistenti collegati

- [[concepts/NIS2]], [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Notifica di incidente significativo]] — disallineamento tempi L. 90 vs NIS2
- [[concepts/Sanzioni NIS2]] — regime € 25-125k armonizzato per PA
- [[concepts/Soggetti PSNC-NIS]] — esclusione L. 90 art. 1 c. 7 lett. a)
- [[concepts/Coordinamento DORA-NIS]] — intersezione art. 15 (estensione DORA-equivalenti)
- [[concepts/Strategia nazionale di cybersicurezza]] — la L. 90 attua misure del Piano di Implementazione

### Synthesis collegate

- [[synthesis/Stratificazione delle norme cybersecurity in Italia]] — quadro complessivo 5 regimi (sezione § 5 aggiornata in questo ingest)
- [[synthesis/Coordinamento L. 90-2024 e NIS2]] — synthesis dedicata creata in questo ingest

## Note dell'agente

- **Capo I vs Capo II — diversa logica**. Capo I è disciplina autonoma con perimetro proprio e nuovi obblighi; Capo II è prevalentemente novella di altri codici (penale, procedura penale, 231/2001). La struttura unitaria della legge nasce dalla ratio politica del momento (post-attacchi cyber alla PA 2023-2024) ma i due capi vivono in ecosistemi giuridici diversi. *Decisione editoriale*: trattamento profondo del Capo I, sintesi operativa GRC del Capo II senza concept dedicato (cfr. discussione di scope con l'autore, 2026-05-23).
- **Art. 15-bis è la chiave di lettura sistemica**: senza questa disposizione di coordinamento la L. 90 (28/06/2024) avrebbe vissuto in un limbo rispetto al D.Lgs. 138 (04/09/2024) — i riferimenti al D.Lgs. 65 sarebbero stati riferimenti a un atto già marcato per l'abrogazione. Il legislatore ha inserito 15-bis al momento giusto, ma la sua rilevanza è facilmente sottostimata.
- **Coincidenza referente cyber ↔ pdc NIS ↔ RTD**: la L. 90 apre la triplice coincidenza (art. 8 c. 2 → pdc; c. 3 → RTD). Per molti enti pubblici medi/piccoli sarà la prassi naturale. *Implicazione GRC*: un singolo profilo professionale gestisce tre funzioni regolatorie distinte → fabbisogno formativo trasversale (cybersicurezza tecnica + diritto digitale CAD + governance interna).
- **Art. 14 + DPCM su elementi essenziali**: è la disposizione più innovativa industrialmente. La definizione di "elementi essenziali = criteri/regole CIA" + il **tetto 10% punteggio economico** invertono la logica del minor prezzo nei contratti ICT pubblici. Atto attuativo non ingerito (al 2026-05-23): verificare al prossimo lint.
- **Lacuna nota**: la **L. 124/2007** (Sistema di informazione per la sicurezza) è richiamata in 6 articoli della L. 90 ma non è in `raw/`. Sarebbe candidata per Wave 8 se l'angolo intelligence ↔ cybersicurezza diventerà rilevante per il posizionamento di carriera.
- **Lacuna nota**: il **DL 82/2021** (istituzione ACN), modificato dalla L. 90 in 5 articoli (artt. 4, 5, 10, 11, 12, 22), non è in `raw/` come fonte primaria. Per ora la wiki tratta il DL 82 come "regime esterno" via i suoi rinvii. Per analisi più fini meriterebbe ingest dedicato.
- **Lacuna nota**: il **DL 105/2019 (PSNC)** è citato 14 volte nella L. 90 ma non in `raw/`. Cfr. note già presenti nelle pagine [[concepts/Soggetti PSNC-NIS]] e [[synthesis/Stratificazione delle norme cybersecurity in Italia]].
- *Sintesi dell'agente*: la L. 90 è una legge "ponte" — tecnicamente precede il D.Lgs. 138 di 2 mesi ma è scritta sapendo che il decreto NIS sta per arrivare (art. 15-bis lo dichiara). Operativamente per il GRC italiano è asset di posizionamento: pochissimi consulenti junior conoscono la mappatura completa L. 90 ↔ NIS2 ↔ PSNC ↔ Cloud PA, e questa wiki ne fornisce ora una base ricostruita.
