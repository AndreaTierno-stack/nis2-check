---
title: D.Lgs. 138/2024 (Decreto NIS)
type: source
scope: both
source_type: paper
source_path: raw/articles/Decreto NIS2.pdf
url: https://www.gazzettaufficiale.it/eli/id/2024/10/01/24G00155/sg
author: Repubblica Italiana — Governo
date_published: 2024-09-04
date_ingested: 2026-04-29
tags: [nis2, italia, decreto-legislativo, cybersicurezza, normativa-primaria, attuazione]
aliases: [Decreto 138, Decreto NIS, D.Lgs. 138 del 2024, Decreto legislativo 138/2024]
---

## TL;DR

Decreto legislativo 4 settembre 2024, n. 138, pubblicato in Gazzetta Ufficiale il **1° ottobre 2024**, in vigore dal **16 ottobre 2024**. Recepisce in Italia la Direttiva (UE) 2022/2555 (NIS2). Designa l'**[[entities/ACN|Agenzia per la Cybersicurezza Nazionale]]** come **autorità nazionale competente NIS, punto di contatto unico e CSIRT** (tre ruoli in un unico soggetto), istituisce il **[[entities/Tavolo per l'attuazione della disciplina NIS|Tavolo per l'attuazione della disciplina NIS]]** con 9 ministeri-autorità di settore, conferma il [[concepts/Size-cap rule|criterio dimensionale]] della direttiva e disciplina il ciclo annuale di **identificazione governativa** dei soggetti rientranti. Capi IV-VI dettagliano governance interna (Art 23), 10 misure minime di gestione del rischio (Art 24), notifica incidenti significativi con tempistica scaglionata (Art 25), vigilanza differenziata per essenziali/importanti (Capo V) e regime sanzionatorio (Art 38). Art 40 rinvia a un **DPCM** e a successive **determinazioni del Direttore generale ACN** per le specifiche tecniche e i tempi di adeguamento.

## Punti chiave

- **Architettura istituzionale unificata**: ACN concentra tre ruoli (autorità competente NIS, single point of contact, CSIRT nazionale) — scelta che differenzia il modello italiano da molti altri Stati membri.
- **Tavolo NIS** (Art 11): foro permanente di raccordo tra ACN e le 9 [[entities/Autorità di settore NIS|autorità di settore]] (Min. Difesa, Affari esteri, Interno, Giustizia, Economia e finanze, Imprese e Made in Italy, Salute, Ambiente e sicurezza energetica, Infrastrutture e trasporti).
- **[[concepts/Identificazione dei soggetti NIS|Identificazione]]** (Art 7): meccanismo annuale di registrazione obbligatoria sulla piattaforma digitale ACN, finestra **1° gennaio – 28 febbraio**; ACN comunica a ciascun soggetto entro **31 marzo** se è essenziale o importante; gli obblighi decorrono dal **1° gennaio dell'anno successivo** alla classificazione.
- **Ambito (Art 3)**: 18 settori (11 altamente critici + 7 critici, Allegati I-IV), oltre a soggetti che lo Stato identifica indipendentemente dalle soglie (PA centrali, soggetti unici/critici, fornitori di servizi essenziali a livello locale, ecc.).
- **Capo IV — Obblighi**:
  - **Art 23 — Governance**: gli **organi di amministrazione e direttivi** approvano le misure ex Art 24, vigilano sull'attuazione, sono **responsabili per le violazioni**, devono seguire **formazione periodica** e devono assicurare formazione equivalente al personale.
  - **Art 24 — Misure di gestione del rischio**: 10 ambiti minimi (politiche di analisi rischio e SI, gestione incidenti, continuità operativa e crisi, supply chain, sviluppo/manutenzione sicuri, valutazione efficacia, igiene di base e formazione, crittografia, sicurezza HR e access control, MFA/SSO). Approccio **multi-rischio**: include rischi fisici, ambientali, errore umano, atti dolosi.
  - **Art 25 — Notifica incidente significativo**: pre-notifica entro **24h**, notifica entro **72h**, relazione finale entro **1 mese** all'ACN. Soglie di "significatività" definite dal DPCM e specificate da determinazioni ACN.
  - **Art 26 — Certificazione**: l'ACN può imporre l'uso di prodotti/servizi/processi ICT certificati secondo il Regolamento UE 2019/881 (Cybersecurity Act).
  - **Art 27 — Specifiche tecniche di base**: il Direttore generale ACN, sentito il Tavolo, adotta determinazioni tecniche dettagliate per attuare Art 23-25.
  - **Art 29 — Banca dati DNS, registri TLD, servizi di registrazione**: obblighi di accuratezza dati WHOIS.
- **Capo V — Vigilanza ed esecuzione**:
  - **Art 30**: ACN può classificare ulteriormente i soggetti per criticità.
  - **Art 31 — Proporzionalità**: misure proporzionate a dimensione, esposizione, criticità.
  - **Art 32-33 — Vigilanza**: ex post per gli **importanti**, anche **ex ante** (ispezioni programmate, audit, test) per gli **essenziali**.
  - **Art 36-37 — Esecuzione**: poteri di ordinanza, diffida, sospensione di certificazioni e divieto temporaneo di esercizio per dirigenti.
- **Art 38 — Sanzioni amministrative**:
  - Soggetti **essenziali**: fino a **€ 10.000.000** o **2%** del fatturato totale annuo mondiale (il maggiore).
  - Soggetti **importanti**: fino a **€ 7.000.000** o **1,4%** del fatturato (il maggiore).
  - **Pubbliche amministrazioni**: forbice **€ 25.000 – € 125.000** (regime speciale).
- **Art 40 — Strumenti attuativi**: rinvio a **DPCM** per i criteri di significatività degli incidenti e a **determinazioni ACN** per le specifiche tecniche di dettaglio.

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
