---
title: Direttiva (UE) 2022/2555 (NIS2)
type: source
scope: both
source_type: paper
source_path: raw/articles/Publications Office.pdf
url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj
author: Parlamento europeo e Consiglio dell'Unione europea
date_published: 2022-12-14
date_ingested: 2026-04-28
tags: [nis2, ue, direttiva, cybersicurezza, normativa-primaria]
aliases: [NIS2, Direttiva NIS2, Direttiva 2022/2555]
updated: 2026-10-28
---

## TL;DR

Direttiva UE che fissa misure per un livello comune elevato di cybersicurezza nell'Unione, sostituendo la NIS1 (Direttiva 2016/1148). Adottata il 14 dicembre 2022, in vigore dal 16 gennaio 2023, doveva essere recepita dagli Stati membri entro il **17 ottobre 2024**. Espande l'ambito a nuovi settori, introduce la distinzione **soggetti essenziali / soggetti importanti** basata su size-cap rule, impone obblighi minimi di gestione del rischio (10 misure) e di **notifica incidenti significativi** in tempistica scaglionata (24h–72h–1 mese), con sanzioni fino a **10 M€ o 2% del fatturato globale**. Il D.Lgs. 138/2024 ne è il recepimento italiano.

## Punti chiave

- **Sostituisce la NIS1**: la Direttiva (UE) 2016/1148 è abrogata con effetto 18 ottobre 2024.
- **Ambito ampliato**: 11 settori "altamente critici" (Allegato I) + 7 settori "critici" (Allegato II), tra cui PA, spazio, gestione rifiuti, alimentare, manifattura.
- **Classificazione binaria**: soggetti **essenziali** (soggetti dell'Allegato I che superano i massimali delle medie imprese, più le categorie a prescindere dalla dimensione: PA centrali e qualifiche speciali) vs **importanti** (gli altri rientranti, incluse le medie imprese dell'Allegato I) — cfr. [[sources/FAQ NIS - Ambito]] `AMB.GE.2` e [[concepts/Soggetti essenziali e importanti]]. Distinzione basata sulla **size-cap rule**: per le soglie di media e grande impresa la direttiva rinvia alla Racc. 2003/361/CE (art. 2 par. 1 NIS2), senza fissare valori propri (cfr. [[concepts/Size-cap rule]] e [[sources/FAQ NIS - Ambito]] `AMB.DI.1`).
- **Pubblica amministrazione (art. 2 par. 2 lett. f) e par. 5 lett. a); art. 3 par. 1 lett. d))**: la direttiva si applica, indipendentemente dalle dimensioni, se "il soggetto è un ente della pubblica amministrazione: i) dell'amministrazione centrale quale definito da uno Stato membro conformemente al diritto nazionale; o ii) a livello regionale quale definito da uno Stato membro conformemente al diritto nazionale che, a seguito di una valutazione basata sul rischio, fornisce servizi la cui perturbazione potrebbe avere un impatto significativo su attività sociali o economiche critiche" (art. 2 par. 2 lett. f)). Per il livello locale: "Gli Stati membri possono prevedere che la presente direttiva si applichi a: a) enti della pubblica amministrazione a livello locale" (art. 2 par. 5). Sono soggetti essenziali "i soggetti della pubblica amministrazione di cui all'articolo 2, paragrafo 2, lettera f), punto i)" (art. 3 par. 1 lett. d)). Confronto con il recepimento italiano in [[concepts/Ambito di applicazione NIS2]] (Sviluppo, riga "Inclusione esplicita della PA").
- **Identificazione**: largamente automatica per dimensione/settore, con eccezioni per soggetti che lo Stato membro identifica indipendentemente dalla soglia (impatto critico, monopolisti, PA, ecc.).
- **Approccio multi-rischio**: le misure devono coprire tutti i tipi di rischio (anche fisici e ambientali), non solo cyber.
- **Articolo 21 — Misure di gestione del rischio**: 10 ambiti minimi obbligatori (policy, gestione incidenti, BCP, supply chain, sviluppo sicuro, valutazione efficacia, igiene cyber e formazione, crittografia, sicurezza HR e access control, MFA).
- **Articolo 23 — Obblighi di notifica**: pre-notifica entro **24h**, notifica entro **72h**, relazione finale entro **1 mese** all'autorità nazionale o al CSIRT.
- **Definizione di incidente significativo (Art 23(3))**: causa o può causare grave perturbazione operativa o perdite finanziarie, **oppure** ha causato o può causare danni materiali/immateriali considerevoli a terzi.
- **Cooperazione UE**: rafforza il **Gruppo di Cooperazione NIS**, la **Rete dei CSIRT** ed **EU-CyCLONe** (gestione coordinata crisi cyber su larga scala).
- **Sanzioni (Art 34)**: fino a **10 M€ o 2%** del fatturato annuo mondiale per soggetti essenziali; **7 M€ o 1,4%** per soggetti importanti. Possibile **sospensione temporanea** di certificazioni e autorizzazioni e **divieto di esercizio** per dirigenti.
- **Responsabilità organi di gestione (Art 20)**: gli organi di gestione approvano le misure di rischio e ne supervisionano l'attuazione; possono essere ritenuti responsabili in caso di violazione e devono seguire formazione.
- **Articolo 6 — 41 definizioni** che fanno da glossario di riferimento: rete e sistema informativo, sicurezza, incidente, quasi-incidente, cyber-minaccia, gestore di servizi gestiti (MSP), MSSP, fornitori di servizi cloud, data center, CDN, ecc.

## Citazioni rilevanti

> "La presente direttiva stabilisce misure volte a garantire un livello comune elevato di cibersicurezza in tutta l'Unione" — Art. 1

> "Gli Stati membri provvedono affinché i soggetti essenziali e importanti adottino misure tecniche, operative e organizzative adeguate e proporzionate per gestire i rischi posti alla sicurezza dei sistemi informatici e di rete" — Art. 21(1)

> "Per «incidente significativo» si intende un incidente che: a) ha causato o è in grado di causare grave perturbazione operativa dei servizi o perdite finanziarie per il soggetto interessato; b) ha avuto o può avere ripercussioni su altre persone fisiche o giuridiche causando danni materiali o immateriali considerevoli" — Art. 23(3)

## Entità menzionate

- [[entities/ENISA]] — agenzia UE per la cybersicurezza, ruolo accresciuto
- [[entities/Gruppo di Cooperazione NIS]] — coordinamento strategico tra Stati membri
- [[entities/Rete di CSIRT nazionali]] — coordinamento tecnico-operativo
- [[entities/EU-CyCLONe]] — gestione delle crisi cyber su larga scala
- [[entities/ACN]] — autorità nazionale italiana che ne darà attuazione
- [[entities/CSIRT Italia]] — punto di contatto italiano per la rete CSIRT

## Concetti collegati

- [[concepts/NIS2]]
- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Size-cap rule]]
- [[concepts/Identificazione dei soggetti NIS]]
- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Settori altamente critici e critici]]
- [[concepts/Misure di gestione del rischio cyber]]
- [[concepts/Notifica di incidente significativo]]
- [[concepts/Incidente significativo]]
- [[concepts/Approccio multi-rischio]]
- [[concepts/Sanzioni NIS2]]
- [[concepts/Coordinated Vulnerability Disclosure]]

## Note dell'agente

- La direttiva fissa il "minimo armonizzato": gli Stati membri possono adottare misure più stringenti (Art. 5 — armonizzazione minima).
- Il Considerando 14 chiarisce che NIS2 vuole **eliminare le ampie divergenze** tra Stati membri create da NIS1, in particolare sull'identificazione degli operatori.
- Il rapporto con altre normative settoriali (DORA per la finanza, regolamento sulla resilienza degli enti critici CER, EECC per le tlc) è regolato dall'**Articolo 4 — lex specialis**: se altri atti UE settoriali impongono obblighi almeno equivalenti, prevalgono.
- Da verificare contro la versione consolidata UE eventuali rettifiche pubblicate dopo dicembre 2022.
