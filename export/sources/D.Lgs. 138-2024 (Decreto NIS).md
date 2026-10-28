---
title: D.Lgs. 138/2024 (Decreto NIS)
type: source
scope: both
source_type: paper
source_path: raw/articles/Decreto NIS2.pdf
url: https://www.gazzettaufficiale.it/eli/id/2024/10/01/24G00155/sg
provenance_note: "Riscontro del 2026-10-27 su Normattiva, testo vigente (urn:nir:stato:decreto.legislativo:2024-09-04;138, vigenza 2026-10-27): Allegato III, art. 3 cc. 6-7, art. 4 cc. 2-3, art. 6 cc. 1-3, art. 40 c. 2 lett. b) e c. 5 lett. a) identici parola per parola al PDF; articoli e allegato in versione 1, testo in vigore dal 2024-10-16. L'intestazione 'SCHEMA DI DECRETO LEGISLATIVO' degli allegati compare anche nel testo Normattiva. DEC-007 parte A."
author: Repubblica Italiana — Governo
date_published: 2024-09-04
date_ingested: 2026-04-29
updated: 2026-10-28
tags: [nis2, italia, decreto-legislativo, cybersicurezza, normativa-primaria, attuazione]
aliases: [Decreto 138, Decreto NIS, D.Lgs. 138 del 2024, Decreto legislativo 138/2024]
---

## TL;DR

Decreto legislativo 4 settembre 2024, n. 138, pubblicato in Gazzetta Ufficiale il **1° ottobre 2024**, in vigore dal **16 ottobre 2024**. Recepisce in Italia la Direttiva (UE) 2022/2555 (NIS2). Designa l'**[[entities/ACN|Agenzia per la Cybersicurezza Nazionale]]** come **autorità nazionale competente NIS, punto di contatto unico e CSIRT** (tre ruoli in un unico soggetto), istituisce il **[[entities/Tavolo per l'attuazione della disciplina NIS|Tavolo per l'attuazione della disciplina NIS]]** con 9 ministeri-autorità di settore, conferma il [[concepts/Size-cap rule|criterio dimensionale]] della direttiva e disciplina il ciclo annuale di **identificazione governativa** dei soggetti rientranti. Capi IV-VI dettagliano governance interna (Art 23), 10 misure minime di gestione del rischio (Art 24), notifica incidenti significativi con tempistica scaglionata (Art 25), vigilanza differenziata per essenziali/importanti (Capo V) e regime sanzionatorio (Art 38). Art 40 rinvia a un **DPCM** e a successive **determinazioni del Direttore generale ACN** per le specifiche tecniche e i tempi di adeguamento.

## Punti chiave

- **Architettura istituzionale unificata**: ACN concentra tre ruoli (autorità competente NIS, single point of contact, CSIRT nazionale) — scelta che differenzia il modello italiano da molti altri Stati membri.
- **Tavolo NIS** (Art 11): foro permanente di raccordo tra ACN e le 9 [[entities/Autorità di settore NIS|autorità di settore]] (Min. Difesa, Affari esteri, Interno, Giustizia, Economia e finanze, Imprese e Made in Italy, Salute, Ambiente e sicurezza energetica, Infrastrutture e trasporti).
- **[[concepts/Identificazione dei soggetti NIS|Identificazione]]** (Art 7): meccanismo annuale di registrazione obbligatoria sulla piattaforma digitale ACN, finestra **1° gennaio – 28 febbraio**; ACN comunica a ciascun soggetto entro **31 marzo** se è essenziale o importante; gli obblighi decorrono dal **1° gennaio dell'anno successivo** alla classificazione.
- **Ambito (Art 3)**: soggetti pubblici e privati delle tipologie degli Allegati I-IV (Allegato I: 10 settori altamente critici; Allegato II: 7 settori critici; Allegato III: pubbliche amministrazioni; Allegato IV: ulteriori tipologie), sopra i massimali delle piccole imprese per gli Allegati I-II (c. 2). Due canali di rientro indipendenti dalla dimensione:
  - **Per legge**: c. 5 (soggetti critici ex direttiva (UE) 2022/2557, reti e servizi di comunicazione elettronica, prestatori di servizi fiduciari, registri TLD e DNS, servizi di registrazione dei nomi di dominio) e c. 6 (PA dell'**Allegato III lett. a)-d)**); anche c. 10 (imprese collegate a un soggetto essenziale o importante che soddisfano uno dei criteri delle lett. a)-d)).
  - **Per individuazione dell'ACN**, su proposta delle autorità di settore e con notifica al soggetto (c. 13): c. 8 (tipologie dell'Allegato IV) e c. 9 (soggetti degli Allegati I-IV che soddisfano uno dei criteri delle lett. a)-f), es. unico fornitore nazionale, impatto significativo, rischio sistemico).
  - **Art. 3, c. 5** (testo): "Il presente decreto si applica, indipendentemente dalle loro dimensioni, anche: a) ai soggetti che sono identificati come soggetti critici ai sensi del decreto legislativo, che recepisce la direttiva (UE) 2022/2557 del Parlamento europeo e del Consiglio, del 14 dicembre 2022; b) ai fornitori di reti pubbliche di comunicazione elettronica o di servizi di comunicazione elettronica accessibili al pubblico; c) ai prestatori di servizi fiduciari; d) ai gestori di registri dei nomi di dominio di primo livello e fornitori di servizi di sistema dei nomi di dominio; e) ai fornitori di servizi di registrazione dei nomi di dominio." Il decreto che recepisce la direttiva (UE) 2022/2557 è il D.Lgs. 134/2024 ([[sources/FAQ NIS - Ambito]], `AMB.NO.1`). Qualifiche: essenziali i soggetti critici (art. 6 c. 1 lett. b)), i prestatori di servizi fiduciari qualificati, i registri TLD e i fornitori DNS (lett. d)), le reti e i servizi di comunicazione elettronica che si considerano medie imprese (lett. c)); gli altri soggetti del c. 5 (prestatori di servizi fiduciari non qualificati, fornitori di servizi di registrazione dei nomi di dominio, reti e servizi di comunicazione elettronica micro e piccoli) sono importanti (art. 6 c. 3), salvo che, se dell'Allegato I, superino i massimali per le medie imprese (c. 1 lett. a)) o siano individuati come essenziali (c. 2).
  - **Art. 3, c. 9** (testo): "Il presente decreto si applica, altresì, anche ai soggetti dei settori o delle tipologie di cui agli allegati I, II, III e IV, indipendentemente dalle loro dimensioni, individuati secondo le procedure di cui al comma 13, qualora: a) il soggetto sia identificato prima della data di entrata in vigore del presente decreto come operatore di servizi essenziali ai sensi del decreto legislativo 18 maggio 2018, n. 65; b) il soggetto sia l'unico fornitore nazionale di un servizio che è essenziale per il mantenimento di attività sociali o economiche fondamentali; c) una perturbazione del servizio fornito dal soggetto potrebbe avere un impatto significativo sulla sicurezza pubblica, l'incolumità pubblica o la salute pubblica; d) una perturbazione del servizio fornito dal soggetto potrebbe comportare un rischio sistemico significativo, in particolare per i settori nei quali tale perturbazione potrebbe avere un impatto transfrontaliero; e) il soggetto sia critico in ragione della sua particolare importanza a livello nazionale o regionale per quel particolare settore o tipo di servizio o per altri settori indipendenti nel territorio dello Stato; f) il soggetto sia considerato critico ai sensi del presente decreto quale elemento sistemico della catena di approvvigionamento, anche digitale, di uno o più soggetti considerati essenziali o importanti."
  - **Art. 3, c. 10** (testo): "Il presente decreto si applica, infine, indipendentemente dalle sue dimensioni, all'impresa collegata ad un soggetto essenziale o importante, se soddisfa almeno uno dei seguenti criteri: a) adotta decisioni o esercita una influenza dominante sulle decisioni relative alle misure di gestione del rischio per la sicurezza informatica di un soggetto importante o essenziale; b) detiene o gestisce sistemi informativi e di rete da cui dipende la fornitura dei servizi del soggetto importante o essenziale; c) effettua operazioni di sicurezza informatica del soggetto importante o essenziale; d) fornisce servizi TIC o di sicurezza, anche gestiti, al soggetto importante o essenziale."
  - **Art. 3, cc. 14-15 — Settori 3 e 4 e DORA** (testo): "Le disposizioni di cui all'articolo 17 e ai Capi IV e V del presente decreto non si applicano ai soggetti identificati come essenziali o importanti dei settori 3 e 4 di cui all'allegato I, ai quali si applica la disciplina di cui al regolamento (UE) 2022/2554." (c. 14); "Il presente decreto non si applica, ai sensi dell'articolo 2, comma 10, della direttiva, ai soggetti esentati dall'ambito di applicazione del regolamento (UE) 2022/2554." (c. 15). Gli esoneri disposti per determinazione ACN sono in [[concepts/Coordinamento DORA-NIS]].
  - **Art. 3, c. 6 — Pubbliche amministrazioni**: "Il presente decreto si applica, altresì, anche indipendentemente dalle loro dimensioni, alle pubbliche amministrazioni di cui all'articolo 1, comma 3, della legge 31 dicembre 2009, n. 196, ricomprese nelle categorie elencate nell'allegato III." Stessa attestazione in [[sources/FAQ NIS - Settori, sottosettori e tipologie di soggetto]] (Settore PA, Allegato III).
  - **Allegato III — 15 categorie** ("Amministrazioni centrali, regionali, locali e di altro tipo"):
    - a) amministrazioni centrali: "1) gli Organi costituzionali e di rilievo costituzionale; 2) la Presidenza del Consiglio dei ministri e i Ministeri; 3) le Agenzie fiscali; 4) le Autorità amministrative indipendenti";
    - b) amministrazioni regionali: "1. le Regioni e le Province autonome";
    - c) amministrazioni locali: "1. le Città metropolitane; 2. i Comuni con popolazione superiore a 100.000 abitanti; 3. i Comuni capoluoghi di regione; 4. le Aziende sanitarie locali";
    - d) altri soggetti pubblici: "1. gli Enti di regolazione dell'attività economica; 2. gli Enti produttori di servizi economici; 3. gli Enti a struttura associativa; 4. gli Enti produttori di servizi assistenziali, ricreativi e culturali; 5. gli Enti e le Istituzioni di ricerca; 6. gli Istituti zooprofilattici sperimentali".
  - **Categorie aggiunte con DPCM** (art. 3 c. 7 e art. 40 c. 2 lett. b): con criterio di gradualità e in base all'esposizione al rischio, uno o più DPCM possono individuare "ulteriori categorie di pubbliche amministrazioni" per adeguare l'elenco dell'Allegato III.
  - **Esclusioni** (art. 4 cc. 2-3): i soggetti dei cc. 6-7 "non ricomprendono il Parlamento italiano, l'Autorità giudiziaria, la Banca d'Italia e l'Unità di informazione finanziaria per l'Italia"; agli organi costituzionali e di rilievo costituzionale non si applica il Capo V. Il decreto non si applica agli enti, organi e articolazioni della PA che operano nei settori della pubblica sicurezza, della difesa nazionale o dell'attività di contrasto, agli organismi di informazione per la sicurezza (L. 124/2007) e all'ACN.
  - **Qualifiche** (art. 6): sono essenziali "indipendentemente dalle loro dimensioni, le pubbliche amministrazioni centrali di cui all'allegato III, comma 1, lettera a)" (c. 1 lett. e); l'ACN individua, con le modalità dell'art. 40 c. 5, i soggetti dell'art. 3 cc. 6, 8, 9 e 10 considerati essenziali (c. 2); gli altri sono importanti (c. 3). Ne segue che la PA delle lett. b)-d) è importante salvo individuazione ex c. 2.
- **Capo IV — Obblighi**:
  - **Art 23 — Governance**: gli **organi di amministrazione e direttivi** approvano le misure ex Art 24, vigilano sull'attuazione, sono **responsabili per le violazioni**, devono seguire **formazione periodica** e devono assicurare formazione equivalente al personale.
  - **Art 24 — Misure di gestione del rischio**: 10 ambiti minimi (politiche di analisi rischio e SI, gestione incidenti, continuità operativa e crisi, supply chain, sviluppo/manutenzione sicuri, valutazione efficacia, igiene di base e formazione, crittografia, sicurezza HR e access control, MFA/SSO). Approccio **multi-rischio**: include rischi fisici, ambientali, errore umano, atti dolosi.
  - **Art 25 — Notifica incidente significativo**: pre-notifica entro **24h**, notifica entro **72h**, relazione finale entro **1 mese** all'ACN. Soglie di "significatività" definite dal DPCM e specificate da determinazioni ACN.
  - **Art 26 — Notifica volontaria**: notifiche volontarie al CSIRT Italia di incidenti diversi da quelli dell'art. 25, minacce informatiche e quasi-incidenti, anche da soggetti fuori ambito.
  - **Art 27 — Certificazione**: l'ACN, con le modalità dell'art. 40 c. 5, può imporre l'uso di prodotti/servizi/processi TIC certificati nei sistemi europei di certificazione ex art. 49 del Regolamento UE 2019/881 (Cybersecurity Act).
  - **Art 28 — Specifiche tecniche**: l'ACN promuove l'uso di specifiche tecniche europee e internazionali per l'attuazione dell'art. 24 cc. 1-2. Le specifiche di base adottate con determinazione (Det. ACN 379907/2025) poggiano sull'art. 31 cc. 1-2 e sull'art. 40 c. 5 lett. l).
  - **Art 29 — Banca dati DNS, registri TLD, servizi di registrazione**: obblighi di accuratezza dati WHOIS.
  - **Art 30 — Elencazione, caratterizzazione e categorizzazione**: dal 1° maggio al 30 giugno di ogni anno i soggetti comunicano l'elenco delle attività e dei servizi con la relativa categoria di rilevanza (c. 1); categorie e criteri con determinazione ex art. 40 c. 5 lett. i).
  - **Art 31 — Proporzionalità e gradualità**: obblighi proporzionati a esposizione al rischio, dimensioni, probabilità e gravità degli incidenti (c. 1); termini, modalità, specifiche e tempi graduali con le modalità dell'art. 40 c. 5 (c. 2).
  - **Art 32 — Previsioni settoriali specifiche**: obblighi specifici per i fornitori della PA (c. 1); obblighi del Capo IV non applicabili, se individuati dall'ACN, alla PA dell'Allegato III lett. c)-d) e ai soggetti dell'art. 3 c. 8, c. 9 lett. f) e c. 10 (c. 2); artt. 24-25 non applicabili a chi eroga esclusivamente servizi di registrazione dei nomi di dominio (c. 3).
  - **Art 33 — Coordinamento con il perimetro di sicurezza nazionale cibernetica**: obblighi del D.L. 105/2019 considerati almeno equivalenti; ai beni ICT inseriti negli elenchi del perimetro non si applica il decreto.
- **Capo V — Monitoraggio, vigilanza ed esecuzione** (artt. 34-38):
  - **Art 35 — Monitoraggio, analisi e supporto**: rendicontazioni, audit, scansioni di sicurezza, raccomandazioni e avvertimenti (c. 3).
  - **Art 36 — Verifiche e ispezioni**: verifiche documentali, ispezioni in loco e a distanza, richieste di accesso (c. 1); verso gli **importanti** solo in presenza di elementi che suggeriscano possibili violazioni (c. 2).
  - **Art 37 — Misure di esecuzione**: intimazioni (c. 3; niente audit periodici imposti agli importanti, lett. a)), istruzioni vincolanti (c. 4), funzionario designato (c. 5), diffida (c. 6). Se la diffida resta inadempiuta: sospensione temporanea di certificati o autorizzazioni dei soggetti essenziali, non applicabile alla PA dell'Allegato III (art. 38 c. 4), e incapacità a svolgere funzioni dirigenziali (art. 38 c. 6).
- **Art 38 — Sanzioni amministrative**:
  - Soggetti **essenziali**: fino a **€ 10.000.000** o **2%** del fatturato totale annuo mondiale (il maggiore).
  - Soggetti **importanti**: fino a **€ 7.000.000** o **1,4%** del fatturato (il maggiore).
  - **Pubbliche amministrazioni dell'Allegato III** (regime speciale, esteso ai soggetti dell'Allegato IV punto 1 a partecipazione o controllo pubblico e punto 4, se individuati): per le violazioni del c. 8 (artt. 23-25, disposizioni e diffide ex art. 37), **€ 25.000 – € 125.000** se essenziali (c. 9 lett. c), ridotte di un terzo se importanti (c. 9 lett. d); per le violazioni del c. 10 (registrazione e aggiornamento ex art. 7, categorizzazione ex art. 30, artt. 27, 29 e 32, collaborazione con ACN e CSIRT Italia), **€ 10.000 – € 50.000** se essenziali (c. 11 lett. c), ridotte di un terzo se importanti (c. 11 lett. d).
- **Art 40 — Strumenti attuativi**: rinvio a **DPCM** (c. 1: criteri della clausola di salvaguardia, art. 34 c. 10, strumenti deflattivi del contenzioso; c. 2: ulteriori criteri di identificazione e categorie di PA) e a **determinazioni ACN** (cc. 4-5) per individuazioni e specifiche di dettaglio. Tra queste, c. 5 lett. a): "ai sensi degli articoli 3 e 6, è stabilito l'elenco dei soggetti essenziali e dei soggetti importanti di cui all'articolo 7, comma 2"; la determinazione non è soggetta a pubblicazione (c. 6 lett. b)).
- **Art. 2, c. 1, lett. bbb) — Definizione di cloud** (testo): "«servizio di cloud computing»: un servizio digitale che consente l'amministrazione su richiesta di un pool scalabile ed elastico di risorse di calcolo condivisibili e l'ampio accesso remoto a quest'ultimo, anche ove tali risorse sono distribuite in varie ubicazioni". Coincide con l'art. 6 punto 30) della [[sources/Direttiva (UE) 2022-2555 (NIS2)|direttiva]].

## Citazioni rilevanti

> "Il presente decreto è volto ad assicurare un elevato livello di cibersicurezza nel territorio nazionale ... mediante l'attuazione della direttiva (UE) 2022/2555" — Art. 1, c. 1

> "L'Agenzia per la cybersicurezza nazionale è l'Autorità nazionale competente NIS, il punto di contatto unico e il gruppo di intervento per la sicurezza informatica in caso di incidente (CSIRT Italia)" — Art. 10

> "Gli organi di amministrazione e gli organi direttivi dei soggetti essenziali e dei soggetti importanti approvano le modalità di implementazione delle misure di gestione dei rischi per la sicurezza informatica ... ne supervisionano l'attuazione e rispondono delle violazioni" — Art. 23, c. 1

> "I soggetti essenziali e importanti notificano ... senza ingiustificato ritardo, ogni incidente significativo" — Art. 25, c. 1

## Entità menzionate

- [[entities/ACN]] — autorità competente NIS + SPOC + CSIRT
- [[entities/CSIRT Italia]] — funzione di risposta agli incidenti dentro ACN
- [[entities/Tavolo per l'attuazione della disciplina NIS]] — sede di raccordo
- [[entities/Autorità di settore NIS]] — i 9 ministeri designati
- [[entities/Comitato Interministeriale per la Cybersicurezza]] — indirizzo politico
- [[entities/Nucleo per la Cybersicurezza]] — gestione crisi
- [[entities/Ministero della Difesa]] — autorità coordinamento crisi cyber

## Concetti collegati

- [[concepts/NIS2]]
- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Identificazione dei soggetti NIS]]
- [[concepts/Size-cap rule]]
- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Settori altamente critici e critici]]
- [[concepts/Misure di gestione del rischio cyber]]
- [[concepts/Notifica di incidente significativo]]
- [[concepts/Incidente significativo]]
- [[concepts/Approccio multi-rischio]]
- [[concepts/Categorizzazione dei soggetti]]
- [[concepts/Specifiche tecniche di base]]
- [[concepts/Sanzioni NIS2]]
- [[concepts/Strategia nazionale di cybersicurezza]]
- [[concepts/Piattaforma digitale ACN]]
- [[concepts/Clausola di salvaguardia]]
- [[concepts/Coordinated Vulnerability Disclosure]]

## Note dell'agente

- Il decreto è "lex specialis" rispetto al **D.Lgs. 65/2018** (recepimento NIS1), che è abrogato.
- Le date degli **obblighi sostanziali** (Art 23-25) **non decorrono dall'entrata in vigore**, ma dal 1° gennaio dell'anno successivo all'identificazione: nella prima finestra (2025), i soggetti identificati nel 2025 hanno gli obblighi pieni dal 2026, con una **fase transitoria** modulata via determinazioni ACN.
- Il Capo IV usa la formula "**al fine di adottare un approccio multi-rischio**" (Art 24): è la chiave interpretativa per la natura delle misure.
- Possibile sovrapposizione con **D.Lgs. 105/2019** (perimetro di sicurezza nazionale cibernetica): da chiarire in pagine dedicate ai due regimi e nei loro confini di applicazione.
