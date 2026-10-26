---
title: Categorie di rilevanza
type: concept
scope: both
tags: [nis2, italia, categorizzazione, art-30, rilevanza, impatto]
sources: ["[[sources/Determinazione ACN categorizzazione - 2026-04-13]]", "[[sources/Allegato 1 modello - Categorizzazione soggetti art. 2 c. 2]]", "[[sources/Allegato 2 modello - Categorizzazione soggetti art. 2 c. 3]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/FAQ NIS - Categorizzazione]]"]
aliases: [Impatto alto, Impatto medio, Impatto basso, Impatto minimo, Categorie impatto NIS]
---

## Definizione

Le **quattro categorie** che misurano l'**impatto di una possibile compromissione di un'attività o di un servizio sulla capacità del soggetto NIS di svolgere correttamente le attività e i servizi NIS** (art. 1 c. 1 lett. l) della [[sources/Determinazione ACN categorizzazione - 2026-04-13]]).

## Le 4 categorie

| Categoria | Codice |
|---|---|
| **Impatto alto** | a) |
| **Impatto medio** | b) |
| **Impatto basso** | c) |
| **Impatto minimo** | d) |

Definite dall'art. 2 c. 4 della determinazione di categorizzazione.

## Pre-assegnazione e deroga motivata

- Ciascuna **[[concepts/Macro-aree NIS|macro-area]]** del modello di categorizzazione ha una **categoria di rilevanza pre-assegnata**.
- Il soggetto NIS può **derogare** indicando una categoria diversa **sulla base di una propria valutazione documentata** dell'impatto (art. 3 c. 3). La documentazione va conservata.

### Distribuzione delle categorie nei 2 modelli

| Categoria | Macro-aree assegnate (Modello 1, art. 2 c. 2) | Macro-aree assegnate (Modello 2, art. 2 c. 3) |
|---|---|---|
| **Impatto alto** | Monitoraggio e controllo | Monitoraggio e controllo |
| **Impatto medio** | Produzione, R&D | Produzione, R&D |
| **Impatto basso** | Finanziaria, Clienti, HR, **Logistica** | Finanziaria, Clienti, HR |
| **Impatto minimo** | Comunicazione, Amministrativa, Altri | **Logistica**, Comunicazione, Amministrativa, Altri |

L'unica differenza tra i due modelli è che la **Logistica** scende da basso a minimo nel modello 2.

## Regola automatica per il perimetro PSNC

L'art. 5 della determinazione dispone che alle attività e ai servizi a cui si applicano gli **obblighi del [[D.L. 105-2019 (perimetro)]]** è **automaticamente attribuita la categoria "impatto alto"** — e tali servizi sono **esclusi dal procedimento ordinario** di categorizzazione (art. 3).

## Coordinamento con la classificazione cloud PA

I soggetti NIS che hanno svolto la classificazione dei dati e dei servizi ex Decreto Direttoriale ACN n. 21007/24 del 27/06/2024 (cloud PA) **applicano quel modello in luogo del modello di categorizzazione NIS** (art. 4 della determinazione).

## Funzione

- Strumento di **proporzionalità**: orienterà l'intensità delle [[concepts/Specifiche tecniche di base|specifiche tecniche]] e dei controlli — le misure più stringenti si applicheranno a quanto categorizzato "impatto alto".
- *Inferenza:* l'effetto pratico delle categorie sull'attuazione delle misure di sicurezza di base sarà chiarito dalle determinazioni successive alla [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|Det. 379907]] (la determinazione 379907 è di "prima applicazione"; il regime regolare ex art. 31 cc. 1-2 decreto NIS dovrà incorporare le categorie).

## Conferma ordinale (FAQ Categorizzazione `CAT.6`)

La FAQ ACN [[sources/FAQ NIS - Categorizzazione]] (`CAT.6`) **conferma l'ordine crescente di impatto** delle 4 categorie: **minimo → basso → medio → alto**. La categoria di rilevanza esprime il "livello di impatto" di una possibile compromissione dell'attività/servizio sulla capacità del soggetto di svolgere correttamente le attività e i servizi NIS — non un livello di importanza intrinseca dell'attività.

`CAT.7` chiarisce che la stessa macro-area può contenere attività con **categorie diverse** (es. tutte le attività di "Produzione" di un soggetto pre-assegnate a "medio" possono essere ri-categorizzate caso per caso con valutazione documentata).

## Collegamenti

- [[concepts/Categorizzazione dei soggetti]] — il processo
- [[concepts/Macro-aree NIS]] — le categorie pre-assegnate vivono dentro le macro-aree
- [[concepts/Specifiche tecniche di base]] — destinazione regolatoria
