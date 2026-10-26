---
title: Categorizzazione dei soggetti
type: concept
scope: both
tags: [nis2, italia, categorizzazione, art-30, vigilanza]
sources: ["[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/Determinazione ACN categorizzazione - 2026-04-13]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/FAQ NIS - Categorizzazione]]"]
aliases: [Categorizzazione interna NIS, Sotto-classificazione NIS]
---

## Definizione

Strumento, di rango regolatorio, con cui [[entities/ACN]] può **sotto-classificare** all'interno delle due macro-classi [[concepts/Soggetti essenziali e importanti|essenziali / importanti]] i soggetti rientranti, in funzione della loro **criticità relativa**. Permette di **modulare** intensità della vigilanza e dettaglio degli obblighi tecnici.

Disciplinato dall'**Art. 30** del [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]].

## Funzione

- È uno strumento **di proporzionalità a livello regolatorio** (distinto dalla proporzionalità nell'attuazione del singolo obbligo, che è ex Art. 31).
- Consente ad ACN di costituire **categorie omogenee** all'interno della classe (es. "soggetti essenziali sanitari di tipo A"), con specifiche tecniche differenziate.
- Si concretizza tramite **determinazioni del Direttore generale ACN** ex Art. 27.

## Criteri di categorizzazione

L'Art. 30 elenca criteri che ACN può usare:
- **Settore di appartenenza**.
- **Esposizione al rischio**.
- **Criticità del servizio** rispetto a economia, salute, sicurezza pubblica.
- **Numero di destinatari** del servizio.
- **Quota di mercato** o posizione dominante.
- **Diffusione geografica** (locale, regionale, nazionale, transfrontaliero).
- **Interconnessione** con altri soggetti rientranti.

## Effetti operativi

- **Differenziazione delle specifiche tecniche** (Art. 27): ACN può imporre standard più o meno dettagliati a categorie diverse.
- **Differenziazione dei tempi di adeguamento**: le determinazioni possono modulare phase-in distinti per categoria.
- **Differenziazione dell'intensità di vigilanza**: ispezioni, audit, test possono essere più frequenti per categorie a maggiore criticità.

## Modello attuativo (det. categorizzazione 2026)

La [[sources/Determinazione ACN categorizzazione - 2026-04-13|determinazione ACN del 13/04/2026]] (applicazione 1° maggio 2026) struttura la categorizzazione in due dimensioni:

### Dimensione 1 — Macro-aree (cosa fa il soggetto)

[[concepts/Macro-aree NIS|10 macro-aree]] di attività e servizi, che il soggetto seleziona auto-dichiarando i propri output. L'**Allegato 1** della determinazione si applica a soggetti dei tipi 1, 2, 5, 6, 7, 10 dell'All. I del decreto NIS + tipi 1-5 dell'All. II + tipo 1 dell'All. IV. L'**Allegato 2** vale per gli altri soggetti.

### Dimensione 2 — Categorie di rilevanza (quanto critico)

[[concepts/Categorie di rilevanza|4 categorie]]: impatto **alto**, **medio**, **basso**, **minimo**. ACN attribuisce la categoria sulla base di criteri quantitativi e qualitativi della determinazione.

- **[[concepts/Soggetti PSNC-NIS|Soggetti PSNC]]**: per le attività e i servizi soggetti agli obblighi PSNC, art. 5 della determinazione → **categoria "impatto alto" automatica**, fuori dal procedimento ordinario.
- **Deroga motivata**: ACN può attribuire una categoria diversa con provvedimento motivato.

### Procedura

- **Finestra annuale**: 1° maggio – 30 giugno (cfr. [[concepts/Identificazione dei soggetti NIS]]).
- **Verifica di conformità**: vedi [[concepts/Verifiche di conformità categorizzazione]] — termine ACN 90 giorni + 60 di proroga, **silenzio-assenso**.
- **Esonero DORA**: art. 20 c. 6 della [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|det. piattaforma]] esonera le entità DORA dalla categorizzazione (cfr. [[concepts/Coordinamento DORA-NIS]]).

## Processo suggerito (FAQ Categorizzazione `CAT.7`)

La FAQ [[sources/FAQ NIS - Categorizzazione]] (`CAT.7`) suggerisce un processo in **3 fasi** non vincolante:

1. **Identificazione** delle attività/servizi supportati/svolti/erogati da sistemi informativi e di rete (nessuna metodologia imposta — si possono riusare analisi di impatto pregresse).
2. **Mappatura** sulle macro-aree del modello: una sola macro-area per attività/servizio; se riconducibile a più macro-aree, scomporre.
3. **Attribuzione categoria di rilevanza**: ai sensi dell'**art. 3 c. 3 Det. 155238/2026** il soggetto può **deviare** dalla pre-assegnazione di macro-area sulla base di una **valutazione documentata** dell'impatto, da **conservare**. Conseguenza: una stessa macro-area può contenere attività con categorie diverse.

## Coordinamento Cloud PA (FAQ `CAT.8`)

L'**art. 4 Det. 155238/2026** istituisce un mapping bidirezionale: i soggetti PA che hanno già svolto la classificazione **ordinari/critici/strategici** ex DD ACN 21007/24 (Regolamento Cloud) **applicano quel modello** in luogo del modello NIS. La piattaforma NIS presenta loro l'elenco dei dati e servizi classificati pubblicato su **padigitale2026.gov.it**, con facoltà di confermarlo o aggiornarlo (mantenendo la coerenza con PA digitale 2026).

## Coordinamento PSNC (FAQ `CAT.9`)

Per i [[concepts/Soggetti PSNC-NIS|soggetti PSNC-NIS]] l'**art. 5 Det. 155238/2026** stabilisce: i servizi soggetti agli obblighi del DL 105/2019 sono **automaticamente "alto"** e **NON si indicano nell'elenco categorizzato** della piattaforma NIS (sono fuori-elenco con etichetta automatica).

## Collegamenti

- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Specifiche tecniche di base]] — strumento attuativo
- [[concepts/Identificazione dei soggetti NIS]] — passaggio precedente nel ciclo
- [[concepts/Macro-aree NIS]]
- [[concepts/Categorie di rilevanza]]
- [[concepts/Soggetti PSNC-NIS]] — impatto alto automatico
- [[concepts/Verifiche di conformità categorizzazione]]
- [[concepts/Coordinamento DORA-NIS]] — esonero
- [[entities/ACN]]
