---
title: Allegato 4 — Incidenti significativi di base per i soggetti essenziali
type: source
scope: both
source_type: article
source_path: raw/articles/allegato-4-v2.pdf
url:
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2025-12-19
date_ingested: 2026-04-29
tags: [nis2, italia, acn, incidenti, notifica, soggetti-essenziali]
---

## TL;DR

Allegato 4 della [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|det. ACN n. 379907]]: **4 codici** di incidente significativo per i soggetti **essenziali**. Strict super-set dell'[[sources/Allegato 3 - Incidenti significativi di base per i soggetti importanti|Allegato 3]]: identici IS-1, IS-2, IS-3 + IS-4 nuovo che cattura **accesso non autorizzato o abuso di privilegi** rilevato sulla base dei parametri quali-quantitativi della misura `DE.CM-01` punto 6 (Allegato 2). Lettura interpretativa coerente nella [[sources/Guida lettura specifiche di base|guida alla lettura]] § 3 (modello tridimensionale condizione/compromissione/oggetto compromissione).

## Punti chiave

- **Solo 1 codice in più rispetto all'Allegato 3**: IS-4.
- **IS-4 è una conseguenza diretta di `DE.CM-01` p.6** dell'[[sources/Allegato 2 - Misure di sicurezza di base per i soggetti essenziali|Allegato 2]] (parametri quali-quantitativi su accessi remoti/perimetrali/admin/falliti). Senza la misura tecnica i soggetti essenziali non avrebbero il "sensore" per rilevare l'incidente, quindi i due allegati sono coerenti per design.
- **Formulazione di IS-1, IS-2, IS-3 identica all'Allegato 3** salvo una sfumatura linguistica in IS-3 ("livelli di servizio definiti" invece di "stabiliti" — sfumatura di drafting, non sostanziale).
- **Auto-determinazione delle soglie**: come per gli importanti, non ci sono soglie quantitative ACN-side. Il soggetto definisce i propri SL e i parametri quali-quantitativi e su quelli costruisce la rilevazione.

## Tabella dei codici

| Codice | Descrizione |
|---|---|
| **IS-1** | Il soggetto NIS ha evidenza della **perdita di riservatezza, verso l'esterno**, di dati digitali di sua proprietà o sui quali esercita il controllo, anche parziale. |
| **IS-2** | Il soggetto NIS ha evidenza della **perdita di integrità, con impatto verso l'esterno**, di dati digitali di sua proprietà o sui quali esercita il controllo, anche parziale. |
| **IS-3** | Il soggetto NIS ha evidenza della **violazione dei livelli di servizio attesi** dei suoi servizi e/o delle sue attività, sulla base dei SL **definiti** ai sensi della misura `DE.CM-01`. |
| **IS-4** | Il soggetto NIS ha evidenza, anche sulla base dei **parametri quali-quantitativi** definiti ai sensi della misura `DE.CM-01`, dell'**accesso non autorizzato o con abuso dei privilegi concessi** a dati digitali di sua proprietà o sui quali esercita il controllo, anche parziale. |

## Citazioni rilevanti

> "Il soggetto NIS ha evidenza, anche sulla base dei parametri quali-quantitativi definiti ai sensi della misura DE.CM-01, dell'accesso, non autorizzato o con abuso dei privilegi concessi, a dati digitali di sua proprietà o sui quali esercita il controllo, anche parziale." — IS-4.

## Entità menzionate

- [[entities/CSIRT Italia]] — destinatario tecnico
- [[entities/ACN]] — autorità competente

## Concetti collegati

- [[concepts/Incidenti significativi di base]] — concept-page operativa
- [[concepts/Incidente significativo]] — definizione Art. 23(3) NIS2
- [[concepts/Notifica di incidente significativo]] — obbligo scaglionato 24h-72h-1mese
- [[concepts/Processo gestione incidenti NIS]] — 5 fasi
- [[concepts/Soggetti essenziali e importanti]] — destinatari (essenziali)
- [[concepts/Misure di sicurezza di base]] — agganci `DE.CM-01` p.2 (SL → IS-3) e p.6 (parametri → IS-4)

## Note dell'agente

- *Sintesi dell'agente:* IS-4 è il "delta operativo" del regime essenziali sul versante incidenti. È coerente con la postura testing-first dell'Allegato 2: rilevare anche accessi anomali, non solo perdite di confidenzialità/integrità "viste dall'esterno".
- Il dettaglio del lessico: IS-3 importanti dice "stabiliti", IS-3 essenziali dice "definiti". Sfumatura non sostanziale.
- Per il calendario di entrata in vigore (30 giorni dalla classificazione, 9 mesi per coorte 2026), vedere [[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]].
