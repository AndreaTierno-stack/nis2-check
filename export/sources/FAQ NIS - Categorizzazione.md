---
title: FAQ NIS — Categorizzazione
type: source
scope: both
source_type: article
source_path: raw/articles/Domande frequenti NIS - Categorizzazione - ACN.pdf
url: https://www.acn.gov.it/portale/faq-nis-categorizzazione
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2026
date_ingested: 2026-04-29
updated: 2026-10-28
tags: [NIS2, ACN, FAQ, categorizzazione, macro-aree, categorie di rilevanza, PSNC, Regolamento Cloud]
---

## TL;DR

FAQ ACN sulla **categorizzazione delle attività e dei servizi** ex art. 30 D.Lgs. 138/2024. Cita esplicitamente i protocolli **Det. ACN 155238/2026** (modello di categorizzazione) e **Det. ACN 127437/2026** (modalità sulla piattaforma) — il riferimento al protocollo della 127437 in `CAT.4` è il primo esplicito nel corpus, e fissa il numero della determinazione successora alla 379887/2025 sulla parte piattaforma+procedure. La FAQ chiarisce: **finestra annuale 1° maggio - 30 giugno**; la categorizzazione **abilita la differenziazione delle misure** ex art. 31 e prefigura le **misure di sicurezza a lungo termine** (entro fine 2026, integrate da "**misure aggiuntive**" di livello avanzato); il modello struttura le attività in **10 macro-aree** ognuna con categoria pre-assegnata su 4 livelli (**minimo / basso / medio / alto**); processo suggerito in 3 fasi (identificazione → mappatura → attribuzione, con possibile **deviazione documentata** dalla pre-assegnazione); coordinamento esplicito con il **Regolamento Cloud PA** (DD ACN 21007/24 del 27/06/2024) — i soggetti NIS che hanno svolto la classificazione di dati/servizi in ordinari/critici/strategici applicano quel modello (art. 4 Det. 155238/2026); coordinamento con **PSNC** — i servizi del perimetro di sicurezza nazionale cibernetica sono **automaticamente "alto"** e **non si indicano nell'elenco categorizzato**. 9 codici (`CAT.1`..`CAT.9`).

## Punti chiave

### Obblighi e finestra (`CAT.1`)

- **Art. 30 decreto NIS**: i soggetti NIS devono **elencare e categorizzare** tutte le attività svolte e i servizi erogati.
- **Finestra annuale**: dal **1° maggio al 30 giugno** di ogni anno, a partire dalla ricezione della prima comunicazione di inserimento ex art. 7 c. 3 lett. a).
- Disciplinato dall'**art. 3 della Determinazione ACN 155238/2026** (cfr. [[sources/Determinazione ACN categorizzazione - 2026-04-13]]).

### Definizione e finalità (`CAT.2`–`CAT.3`)

- "**Elencazione e categorizzazione**" = elenco di attività/servizi del soggetto + assegnazione della **categoria di rilevanza** (elenco categorizzato).
- **Finalità**: aggregare attività/servizi per categoria di rilevanza, in modo da abilitare quanto previsto dall'**art. 31 decreto NIS** — **differenziazione delle misure di sicurezza** in base al livello di rilevanza.
- È il **presupposto** per identificare le misure adeguate, incluse le **"misure di sicurezza a lungo termine"** che saranno stabilite con **successive determinazioni ACN entro la fine del 2026** (fasi successive alla prima applicazione).
- Architettura temporale:
  - **Misure di base** = Det. 379907/2025 (prima applicazione, art. 42).
  - **Misure aggiuntive** (livello **avanzato**) = entro fine 2026.
  - **Misure a lungo termine** = misure di base + aggiuntive integrate, con arco temporale di realizzazione ancora da definire.
- Rinvio alla **guida alla lettura del modello di categorizzazione** (cfr. PDF `guida-alla-lettura-specifiche-di-base.pdf` in pendenza Wave 5).

### Modalità sulla piattaforma (`CAT.4`)

- Elencazione + categorizzazione tramite la [[concepts/Piattaforma digitale ACN]] ex art. 7 c. 1 decreto NIS, **con le modalità stabilite dalla Determinazione ACN 127437/2026**.
- Suddivisione delle attività/servizi nelle **macro-aree** del modello ACN, **internamente ed esternamente** (sia attività interne sia servizi erogati).

### Modello di categorizzazione (`CAT.5`)

- **Modello disciplinato dalla Det. 155238/2026**, elaborato da ACN con concorso di:
  - [[entities/Autorità di settore NIS]];
  - **Tavoli Settoriali** (contributi delle associazioni di categoria).
- Struttura: **macro-aree** (insiemi astratti di attività/servizi con elementi in comune: utenti, finalità, tipologia di prestazione), ciascuna caratterizzata da:
  - denominazione;
  - descrizione;
  - **categoria di rilevanza pre-assegnata**.
- Cfr. [[sources/Allegato 1 modello - Categorizzazione soggetti art. 2 c. 2]] (10 macro-aree per soggetti art. 2 c. 2) e [[sources/Allegato 2 modello - Categorizzazione soggetti art. 2 c. 3]] (10 macro-aree per soggetti art. 2 c. 3, con Logistica = minimo).

### Categoria di rilevanza (`CAT.6`)

- Rappresenta il **livello di impatto** di una possibile compromissione di quell'attività/servizio sulla capacità del soggetto di svolgere correttamente le **attività e i servizi NIS** (per i quali è in ambito).
- **4 categorie a impatto crescente**: **minimo**, **basso**, **medio**, **alto**.

### Processo suggerito (`CAT.7`)

Tre fasi suggerite (non vincolanti — il soggetto può adottare altre modalità o riusare analisi di impatto già svolte):

1. **Identificazione** delle attività/servizi supportati/svolti/erogati da sistemi informativi e di rete. Nessuna metodologia imposta.
2. **Mappatura** sulle macro-aree del modello. Una **sola macro-area per attività/servizio**: in caso di riconducibilità multipla, è necessaria una **scomposizione** ulteriore.
3. **Attribuzione categoria di rilevanza**. Ai sensi dell'**art. 3 c. 3 Det. 155238/2026**, il soggetto può **deviare** dalla pre-assegnazione di macro-area:
   - sulla base di una **valutazione documentata** dell'impatto di possibile compromissione;
   - **conservando la documentazione** dell'analisi;
   - di conseguenza, una stessa macro-area può contenere attività/servizi con **categorie di rilevanza diverse**.

### Coordinamento con il Regolamento Cloud PA (`CAT.8`)

- **DD ACN n. 21007/24 del 27 giugno 2024** ("**Regolamento Cloud**"), art. 3: le PA predispongono e aggiornano un **elenco dati + servizi digitali** classificati in **ordinari / critici / strategici** (modalità nell'**Allegato 1** del Regolamento Cloud).
- **Art. 4 Det. 155238/2026**: i soggetti NIS che hanno **già svolto** la classificazione del Regolamento Cloud **applicano il modello del Regolamento Cloud** ai fini dell'elencazione + categorizzazione NIS.
- Procedura concreta: a tali soggetti viene presentato **l'elenco dei dati e dei servizi classificati** disponibile su **padigitale2026.gov.it** alla data di estrazione, con facoltà di:
  - **confermare** l'elenco anche ai fini NIS;
  - **aggiornarlo**, garantendo poi la **coerenza** con la classificazione su PA digitale 2026.

### Coordinamento con il PSNC (`CAT.9`)

- **Art. 5 Det. 155238/2026**: le attività/servizi soggetti agli obblighi del **DL 21 settembre 2019, n. 105** ([[concepts/Soggetti PSNC-NIS]]) **non sono oggetto** del processo di elencazione e categorizzazione → sono già etichettati con categoria **"alto"** in automatico.
- Conseguenza pratica: **i servizi del Perimetro NON si indicano nell'elenco categorizzato** della piattaforma NIS.

## Citazioni rilevanti

> "La finalità perseguita attraverso l'elencazione e la categorizzazione delle attività e dei servizi è quella di aggregare attività e servizi in funzione della categoria di rilevanza loro assegnata dal modello di categorizzazione e così corrispondere a quanto disposto dall'articolo 31 del decreto NIS che prevede che le misure di sicurezza siano differenziate in relazione alle categorie di rilevanza." — `CAT.3`.

> "Le misure di sicurezza di base saranno quindi integrate, entro la fine del 2026, da misure di sicurezza aggiuntive — caratterizzate da requisiti di livello avanzato rispetto a quelle di base — e confluiranno nelle misure di sicurezza a lungo termine per la realizzazione delle quali verrà stabilito anche l'arco temporale entro il quale questa attività dovrà essere completata." — `CAT.3`.

> "Ai sensi dell'articolo 5 della Determina 155238/2026 le attività e i servizi a cui si applicano gli obblighi imposti dal decreto-legge 21 settembre 2019, n. 105 non sono oggetto del processo di elencazione e categorizzazione, essendo già etichettati con la categoria di rilevanza 'impatto alto'." — `CAT.9`.

## Entità menzionate

- [[entities/ACN]]
- [[entities/Autorità di settore NIS]]

## Concetti collegati

- [[concepts/Categorizzazione dei soggetti]]
- [[concepts/Macro-aree NIS]]
- [[concepts/Categorie di rilevanza]]
- [[concepts/Piattaforma digitale ACN]]
- [[concepts/Soggetti PSNC-NIS]]
- [[concepts/Misure di sicurezza di base]]
- [[concepts/Specifiche tecniche di base]]

## Note dell'agente

- **Anchor protocol numbers** confermati dalle FAQ:
  - **Det. ACN 155238/2026** = modello di categorizzazione.
  - **Det. ACN 127437/2026** = modalità di elencazione+categorizzazione sulla piattaforma (si presume sia la successora della 379887/2025 per la parte piattaforma+procedure, ma serve verifica con la fonte primaria).
  - **DD ACN 21007/24 del 27/06/2024** = Regolamento Cloud.
- *Sintesi dell'agente:* la FAQ introduce la **roadmap normativa** sulle misure: **base → aggiuntive → lungo termine**. Da promuovere a concetto dedicato (lacuna attuale della wiki) — l'attuale [[concepts/Misure di sicurezza di base]] tratta solo le base.
- L'**art. 4 Det. 155238/2026** (richiamato in `CAT.8`) dispone che "i soggetti NIS che hanno svolto la classificazione dei dati e dei servizi" ex art. 3 del Regolamento Cloud applicano quel modello (ordinari/critici/strategici) ai fini dell'elencazione e della categorizzazione NIS, in luogo del modello NIS. La condizione è aver svolto la classificazione, non l'essere PA; il raccordo evita duplicazioni per chi ha già adempiuto al Regolamento Cloud. Sul piano dell'ambito il raccordo è diverso: i fornitori cloud qualificati ai sensi del Regolamento Cloud che superano i massimali delle piccole imprese rientrano in NIS come fornitori di servizi cloud (FAQ `A1.8.2`, [[sources/FAQ NIS - Settori, sottosettori e tipologie di soggetto]]).
- L'**art. 5 Det. 155238/2026** attua il principio di **automatismo PSNC → alto** già anticipato nel modello (cfr. [[sources/Determinazione ACN categorizzazione - 2026-04-13]]). Conferma operativa: i servizi PSNC **non vanno indicati** nell'elenco — il modello li tratta come fuori-elenco con etichetta automatica.
- La FAQ non chiarisce cosa succede a un soggetto **NIS ma non PA** che non ha mai svolto la classificazione ex Reg. Cloud: per esso il modello di categorizzazione resta quello standard (10 macro-aree con categoria pre-assegnata + facoltà di deviazione documentata).
- Note di traduzione: caratteri "à è ò ù" appaiono come "�" nel testo estratto.
