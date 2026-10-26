---
title: Coordinamento L. 90-2024 e NIS2
type: synthesis
scope: both
question: "Come si coordinano la L. 90/2024 (cybersicurezza nazionale) e il D.Lgs. 138/2024 (recepimento NIS2) per un soggetto pubblico italiano? Quale dei due regimi si applica, quando si sommano, e come gestire i casi di sovrapposizione?"
tags: [italia, l90-2024, nis2, coordinamento-normativo, pa, referente-cyber, art-15-bis, stratificazione]
sources: ["[[sources/Legge 90-2024 (cybersicurezza nazionale)]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]", "[[sources/FAQ NIS - Ambito]]"]
created: 2026-05-23
---

## Domanda originale

Un soggetto pubblico italiano (PA centrale, Comune, ASL, società in house qualificata) si trova teoricamente nel raggio applicativo di due regimi: il [[concepts/Perimetro Legge 90-2024|perimetro L. 90/2024]] e l'[[concepts/Ambito di applicazione NIS2|ambito NIS2]] recepito dal [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]]. Tre tesi possibili:

- **T1 — Cumulo pieno**: i due regimi si applicano cumulativamente; il soggetto è tenuto a tutti gli obblighi di entrambi.
- **T2 — Esclusione reciproca**: chi è NIS non è L. 90 e viceversa; perimetri disgiunti.
- **T3 — Esclusione asimmetrica con coordinamento operativo**: la L. 90 esclude esplicitamente i soggetti NIS (art. 1 c. 7 lett. a)) ma le determinazioni ACN consentono **cumulazione di ruoli** (pdc NIS = referente cyber L. 90) per i soggetti in cui non scatta l'esclusione totale.

La risposta è **T3**, con alcune precisazioni che il presente nodo ricostruisce.

## Quadro normativo essenziale

### Atto 1 — L. 90/2024 (livello primario, legge ordinaria)

- **Natura giuridica**: legge dello Stato (atto primario interno).
- **Ambito soggettivo**: elenco tassativo art. 1 c. 1 → cfr. [[concepts/Perimetro Legge 90-2024]].
- **Ambito oggettivo**: notifica incidenti (24h+72h), struttura cyber + referente (art. 8), adeguamento a segnalazioni vulnerabilità (15gg art. 2), procurement ICT strategico (art. 14), riforma reati informatici (Capo II).
- **Entrata in vigore**: 17/07/2024; phase-in 180gg per parte dei soggetti.

### Atto 2 — D.Lgs. 138/2024 (livello primario, recepimento NIS2)

- **Natura giuridica**: decreto legislativo (recepimento direttiva UE 2022/2555).
- **Ambito soggettivo**: 18 settori + size-cap + Allegati I-IV → cfr. [[concepts/Ambito di applicazione NIS2]].
- **Ambito oggettivo**: registrazione, misure di sicurezza (art. 24), notifica incidenti scaglionata 24h+72h+1mese (art. 25), governance (art. 23), vigilanza, sanzioni.
- **Entrata in vigore**: 16/10/2024; obblighi sostanziali decorrono dal 1° gennaio dell'anno successivo alla classificazione.

### Atto 3 — Determinazione ACN piattaforma e procedure (Det. 127437/2026 = Det. piattaforma)

- **Natura giuridica**: atto sub-legislativo del Direttore generale ACN.
- **Rilevanza per il coordinamento**: art. 4 c. 8 — la designazione del [[entities/Punto di contatto NIS|pdc NIS]] **può soddisfare anche l'obbligo di nomina** del referente cyber L. 90 art. 8 c. 2. Punto centrale del coordinamento operativo.

## Analisi del rapporto giuridico — perché T3 è la tesi corretta

### Punto 1 — L'art. 1 c. 7 lett. a) L. 90 è una clausola di esclusione esplicita

> *"Fermi restando gli obblighi e le sanzioni, anche penali, previsti da altre norme di legge, le disposizioni del presente articolo non si applicano: a) ai soggetti di cui all'articolo 3, comma 1, lettere g) e i), del decreto legislativo 18 maggio 2018, n. 65, e a quelli di cui all'articolo 1, comma 2-bis, del decreto-legge 21 settembre 2019, n. 105."* — Art. 1 c. 7 L. 90/2024

Questa clausola esclude dalla L. 90:
- I soggetti NIS (lettere g, i dell'art. 3 c. 1 D.Lgs. 65/2018 → ridireccionati a D.Lgs. 138/2024 via [[sources/Legge 90-2024 (cybersicurezza nazionale)|art. 15-bis L. 90]])
- I soggetti [[concepts/Soggetti PSNC-NIS|PSNC]] (DL 105/2019 art. 1 c. 2-bis)

**Effetto**: per i soggetti che sono **sia L. 90 sia NIS** prevale **NIS**. La L. 90 si applica **residualmente** ai soggetti che NON sono già NIS.

### Punto 1-bis — L'art. 15-bis L. 90 risolve il problema della transizione NIS1→NIS2

L'art. 1 c. 7 L. 90 rinvia al D.Lgs. 65/2018 (NIS1, abrogato dal D.Lgs. 138/2024). L'art. 15-bis L. 90 risolve esplicitamente:

> *"Ogni riferimento al decreto legislativo 18 maggio 2018, n. 65, è da intendersi alle corrispondenti disposizioni di cui al decreto legislativo 4 settembre 2024, n. 138, a decorrere dalla data in cui le stesse acquistano efficacia."*

**Implicazione**: l'esclusione dell'art. 1 c. 7 lett. a) L. 90 si legge come *"non si applica ai soggetti del D.Lgs. 138/2024 e ai PSNC"*. Senza l'art. 15-bis ci sarebbe stato un vuoto interpretativo dal 16/10/2024 (entrata in vigore D.Lgs. 138) in poi.

### Punto 2 — La L. 90 ha un perimetro proprio che NIS2 non copre completamente

Il [[concepts/Perimetro Legge 90-2024|perimetro L. 90]] include alcune categorie che **NIS2 copre solo via Allegato IV** (individuazione autoritativa, procedura lunga):

| Soggetto L. 90 | Stato in NIS2 |
|---|---|
| Comuni > 100k non capoluogo | Sì, All. III cat. c) — coperti da NIS, **esclusi L. 90** |
| Comuni capoluogo regione (anche sotto soglia) | Sì, All. III cat. c) — coperti, esclusi L. 90 |
| **Società di trasporto pubblico urbano (bacino ≥100k)** | **Solo via All. IV tipo 1** (notifica MIT) — **L. 90 si applica** finché non c'è notifica NIS |
| **Società di trasporto pubblico extraurbano in città metropolitane** | **Solo via All. IV tipo 1** (notifica MIT) — **L. 90 si applica** |
| **Società in house servizi informatici** | **Solo via All. IV tipo 4** (notifica) — **L. 90 si applica** |
| **Società in house gestione rifiuti / acque reflue** | All. II p. 2 / All. I p. 7 **solo se prevalenza** — **L. 90 si applica** se non prevalenza |

**Conseguenza**: la L. 90 colma il gap delle **società in house qualificate** e dei **trasporti pubblici qualificati** che in NIS2 entrano solo via individuazione All. IV. Per questi soggetti, finché non viene emessa la notifica di individuazione, **il regime applicabile è L. 90, non NIS**.

### Punto 3 — Sui soggetti misti, la coincidenza di ruoli è esplicitamente prevista

Per i (pochi) soggetti che hanno **sia obblighi L. 90 sia obblighi NIS**, l'art. 4 c. 8 della [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|Det. piattaforma 127437/2026]] consente la **cumulazione di ruoli sulla stessa persona fisica**:

| Ruolo | Atto base | Funzione |
|---|---|---|
| **Punto di contatto NIS** | Art. 7 c. 6 D.Lgs. 138 + art. 4 Det. piattaforma | Interlocuzione amministrativa con ACN su NIS |
| **Referente cyber L. 90** | Art. 8 c. 2 L. 90 | Interlocuzione operativa con ACN su L. 90 + cybersicurezza interna |
| **RTD ex CAD** (opzionale) | Art. 17 D.Lgs. 82/2005 | Transizione digitale dell'ente |

Per soggetti L. 90 ∩ NIS l'art. 8 c. 3 L. 90 consente anche la **triplice coincidenza** con il RTD. Cfr. [[concepts/Referente per la cybersicurezza (L. 90-2024)]].

> [!note] Il cumulo dei ruoli è la prassi attesa per gli enti misti
> Quando un soggetto è sia NIS sia L. 90 (poco frequente: solo se la L. 90 ha effetto residuale su una attività non NIS dello stesso ente), la stessa persona fisica gestisce entrambi i ruoli. Per soggetti **solo NIS**, basta il pdc NIS. Per soggetti **solo L. 90**, basta il referente cyber L. 90. **Non si cumula due persone**.

### Punto 4 — Tempistiche di notifica disallineate

Il punto operativamente più delicato. Cfr. [[concepts/Notifica di incidente significativo]] § Disallineamento.

| Fase | NIS2 (art. 25 D.Lgs. 138) | L. 90 (art. 1 c. 2) |
|---|---|---|
| Pre-notifica / segnalazione | **24 ore** | **24 ore** |
| Notifica completa | **72 ore** | **72 ore** |
| **Relazione finale** | **1 mese** | **Assente** |

**Conseguenze**:
- **Soggetti solo NIS**: 3 step (24h + 72h + 1 mese).
- **Soggetti solo L. 90**: 2 step (24h + 72h). Niente report a 1 mese.
- **Soggetti NIS ∩ L. 90 (residuali)**: applicano lo schema più stringente = NIS = 3 step. Il report a 1 mese resta dovuto perché L. 90 non lo esclude (non potrebbe: 1 mese è obbligo NIS = atto UE recepito, intoccabile da L. 90).

**Canale unico**: in tutti i casi notifica al [[entities/CSIRT Italia|CSIRT Italia]] via [[concepts/Piattaforma digitale ACN|piattaforma ACN]]. Cambia il regime giuridico, non il canale tecnico.

### Punto 5 — Sanzioni allineate per le PA, ma cumulative se i fatti generatori sono diversi

Le sanzioni € 25-125k per la PA sono identiche per i 3 regimi (NIS art. 38 c. 9, L. 90 art. 1 c. 6, PSNC ex art. 3 L. 90 → art. 1 c. 3-bis DL 105/2019). Cfr. [[concepts/Sanzioni NIS2]] § Allineamento orizzontale.

**Cumulo possibile**: se un soggetto NIS ∩ L. 90 **commette violazioni in entrambi i regimi** (es. inosservanza obbligo NIS art. 24 misure di sicurezza + inosservanza obbligo L. 90 art. 8 nomina referente), può subire **due sanzioni distinte** — non perché si cumulino sullo stesso fatto, ma perché i fatti generatori sono diversi.

**Esposizione personale aggravata sul lato L. 90**: l'art. 1 c. 6 ultimo periodo L. 90 prevede esplicitamente responsabilità disciplinare e amministrativo-contabile per funzionari e dirigenti — esposizione personale che il decreto NIS art. 23 prevede in modo più generale (responsabilità del board per le violazioni).

## Decision tree pratico per il soggetto

```
1. Sei nel perimetro NIS ex D.Lgs. 138/2024 (Allegati I-IV)?
   - Sì → applica NIS pieno
   - No → vai al 2.
2. Sei nel perimetro L. 90 ex art. 1 c. 1?
   - Sì → applica L. 90 (è il "default" per i soggetti pubblici non NIS qualificati)
   - No → vai al 3.
3. Sei un soggetto PSNC ex DL 105/2019 art. 1 c. 2-bis?
   - Sì → applica PSNC (lex specialis) + se anche NIS, doppia disciplina (cfr. [[concepts/Soggetti PSNC-NIS]])
   - No → fuori dai 3 regimi cyber italiani principali (potrebbe rientrare in DORA o Cloud PA)
```

**Casi pratici**:

| Soggetto | Regime applicabile | Note |
|---|---|---|
| Ministero della Salute | NIS pieno (All. III a) + All. I p. 5) | L. 90 esclusa ex c. 7 |
| Regione | NIS pieno (All. III b) | L. 90 esclusa |
| Comune capoluogo regione | NIS pieno (All. III c) | L. 90 esclusa |
| Comune 200k abitanti non capoluogo | NIS pieno (All. III c) | L. 90 esclusa |
| Comune 80k abitanti capoluogo regione | NIS pieno (All. III c) | L. 90 esclusa |
| Comune 80k abitanti non capoluogo | **Né NIS né L. 90** | Salvo individuazione All. IV |
| Comune 60k abitanti non capoluogo | Né NIS né L. 90 | Salvo individuazione All. IV |
| ASL | NIS pieno (All. III c + All. I p. 5, doppio rientro) | L. 90 esclusa |
| Azienda ospedaliera | NIS pieno (All. I p. 5, registrazione autonoma) | L. 90 esclusa |
| **Società in house servizi IT di un Comune** | **L. 90** (NIS solo se notifica All. IV) | Caso tipico di L. 90 residuale |
| **Società di trasporto urbano (>100k bacino)** | **L. 90** (NIS solo se notifica All. IV tipo 1) | Caso tipico di L. 90 residuale |
| Società in house gestione rifiuti non prevalenza | L. 90 (NIS non scatta per prevalenza) | Caso tipico di L. 90 residuale |
| Società in house gestione rifiuti prevalenza | NIS (All. II p. 2) | L. 90 esclusa |
| Università pubblica | NIS All. III + possibilmente All. I p. 5 se ricerca sanitaria | L. 90 esclusa (ma cfr. Allegato IV tipo 2 per istituti istruzione che svolgono ricerca) |
| AISE/AISI/DIS | Né NIS né L. 90 (esclusione art. 1 c. 7 lett. b + clausola di salvaguardia) | Regimi propri |

## Tabella riassuntiva — cosa fa cosa

| Adempimento | Soggetto NIS puro | Soggetto L. 90 puro | Soggetto NIS ∩ L. 90 (residuali) |
|---|---|---|---|
| Registrazione piattaforma ACN | Sì (art. 7 D.Lgs. 138) | No (la L. 90 non prevede piattaforma di registrazione) | Sì (solo via NIS) |
| Designazione pdc NIS | Sì | No | Sì |
| Designazione referente cyber L. 90 | No | Sì (art. 8 c. 2) | Cumulato sul pdc (art. 4 c. 8 Det. piattaforma) |
| Struttura cyber 7 funzioni (art. 8 c. 1) | No formalmente (ma NIS art. 24 copre simile) | Sì | Sì (cumulo sostanziale) |
| Notifica incidenti | 24h+72h+1mese | 24h+72h | 24h+72h+1mese (NIS prevale) |
| Misure di gestione del rischio (10 ambiti) | Sì (art. 24 D.Lgs. 138) | No esplicito | Sì |
| Adeguamento a segnalazioni vulnerabilità ACN (15gg) | Implicito in NIS art. 24 | Sì (art. 2 L. 90) | Sì |
| Procurement ICT strategico (art. 14 L. 90) | Non scatta da NIS, ma se è ente art. 2 c. 2 CAD applica | Sì | Sì se anche art. 2 c. 2 CAD |
| Sanzione massima (PA) | € 25-125k (art. 38 c. 9) | € 25-125k (art. 1 c. 6) | Cumulabili se fatti diversi |
| Vigilanza | ACN ex post (importanti) o ex ante (essenziali) | ACN (ispezioni post-inosservanza, art. 1 c. 5) | ACN doppio canale |

## Tensioni e contraddizioni

- **Riferimento a D.Lgs. 65 abrogato**: senza l'art. 15-bis L. 90, l'esclusione dell'art. 1 c. 7 sarebbe stata letteralmente "ai soggetti del D.Lgs. 65/2018", atto abrogato — sarebbe stato un richiamo a vuoto. La disposizione di coordinamento è quindi indispensabile, ma poco visibile.
- **Sovrapposizione con DORA**: l'art. 15 L. 90 estende principi DORA-equivalenti a intermediari finanziari art. 106 TUB + Bancoposta. Per questi soggetti si pone una **doppia stratificazione**: L. 90 art. 15 (delega via L. 15/2024) + L. 90 stessa (se rientrano nel perimetro art. 1 c. 1 — improbabile, ma da verificare). Cfr. [[concepts/Coordinamento DORA-NIS]].
- **Comuni 50-100k non capoluogo = buco normativo**: fuori L. 90 (sotto soglia), fuori NIS All. III (sotto soglia), entrano solo via individuazione All. IV NIS che richiede proposta del MIT o di altra autorità di settore. Sono centinaia di comuni italiani — un'**asimmetria politicamente sensibile** che potrebbe essere oggetto di future modifiche legislative.
- **Capo II L. 90 (reati informatici)**: si applica a tutti i soggetti italiani (è codice penale + 231/2001), non solo al perimetro art. 1 c. 1. Per consulenza GRC, la mappatura 231 dell'ente cliente va aggiornata indipendentemente dalla qualifica NIS/L. 90/PSNC del cliente stesso.

## Domande aperte

1. **Determinazione tecnica ACN sulla tassonomia incidenti L. 90 (art. 1 c. 1)**: non è chiaro se sia stata emanata o se coincida con la tassonomia NIS. Da verificare presso ACN al prossimo lint.
2. **DPCM ex art. 14 L. 90 sugli elementi essenziali di cybersicurezza**: termine 14/11/2024. Se emanato, integra/sostituisce eventuali misure NIS sui contratti pubblici? Da verificare.
3. **Casi di soggetti in house multi-servizio**: una società in house che fornisce *sia* servizi informatici (rientra L. 90 art. 1 c. 1) *sia* gestione rifiuti con prevalenza (rientra NIS All. II p. 2) — quale regime prevale? L'esclusione art. 1 c. 7 dovrebbe far prevalere il NIS, ma il punto non è esplicitamente discusso nelle determinazioni ACN.
4. **Procedimento sanzionatorio**: il DPCM ex art. 11 L. 90 (90 gg) introduce procedura unica ACN per sanzioni NIS + L. 90 + PSNC? Se sì, è il primo punto di **convergenza procedurale** trasversale ai 3 regimi.

## Action items

- **Per l'autore — wiki**: monitorare emanazione DPCM art. 11 + DPCM art. 14 + determinazione ACN tassonomia incidenti L. 90. Quando disponibili, ingest come fonti dedicate.
- **Per l'autore — consulenza GRC**: usare questa synthesis come asset di posizionamento. La distinzione "*chi è in NIS, chi in L. 90, chi in entrambe*" è un test diagnostico immediato per identificare il livello di seniority del consulente. Pochi junior la sanno applicare correttamente.
- **Per l'autore — modello 231 dei clienti**: indipendentemente dal regime NIS/L. 90, verificare aggiornamento del modello 231 con il pacchetto cyber-criminale aggiornato dal Capo II L. 90 (estorsione informatica + 635-quater.1 nuovo + aumento quote 24-bis D.Lgs. 231).

## Collegamenti

- [[sources/Legge 90-2024 (cybersicurezza nazionale)]] — fonte primaria
- [[sources/D.Lgs. 138-2024 (Decreto NIS)]] — recepimento NIS2
- [[concepts/Perimetro Legge 90-2024]] — ambito soggettivo L. 90
- [[concepts/Referente per la cybersicurezza (L. 90-2024)]] — figura centrale art. 8
- [[concepts/Elementi essenziali di cybersicurezza (procurement)]] — art. 14 L. 90
- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Notifica di incidente significativo]] — disallineamento tempi
- [[concepts/Sanzioni NIS2]] — allineamento orizzontale 25-125k
- [[entities/Punto di contatto NIS]] — cumulo con referente L. 90
- [[entities/ACN]] — autorità unica
- [[synthesis/Stratificazione delle norme cybersecurity in Italia]] — quadro complessivo 5 regimi (questa synthesis è la zoom su 2 dei 5)
- [[synthesis/Coordinamento Reg UE 2024-2690 e Det ACN 379907-2025]] — modello narrativo simile (zoom UE-IT su DSP)
