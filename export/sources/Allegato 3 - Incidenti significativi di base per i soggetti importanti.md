---
title: Allegato 3 — Incidenti significativi di base per i soggetti importanti
type: source
scope: both
source_type: article
source_path: raw/articles/allegato-3-v2.pdf
url:
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2025-12-19
date_ingested: 2026-04-29
tags: [nis2, italia, acn, incidenti, notifica, soggetti-importanti]
---

## TL;DR

Allegato 3 della [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|det. ACN n. 379907]]: elenco minimale dei **3 codici di incidente significativo** che i soggetti **importanti** devono notificare al [[entities/CSIRT Italia]] ex art. 25 D.Lgs. 138/2024. Soglie qualitative auto-determinate dal soggetto sulla base della propria valutazione del rischio e dei livelli di servizio attesi (SL) definiti ai sensi della misura `DE.CM-01` (Allegato 1). Lettura interpretativa coerente nella [[sources/Guida lettura specifiche di base|guida alla lettura]] § 3 (modello tridimensionale condizione/compromissione/oggetto compromissione).

## Punti chiave

- **3 codici** (IS-1, IS-2, IS-3), tutti formulati in termini di "il soggetto NIS ha evidenza di...".
- **Auto-determinazione**: non ci sono soglie quantitative pre-fissate (a differenza del regime transitorio telco). La "significatività" emerge dalla violazione dei propri **livelli di servizio attesi (SL)** o dalla rilevazione di compromissioni di riservatezza/integrità con impatto verso l'esterno.
- **Aggancio diretto a `DE.CM-01`**: il codice IS-3 fa riferimento esplicito ai SL definiti dalla misura tecnica di rilevamento dell'Allegato 1. Non si può applicare l'Allegato 3 senza aver attuato `DE.CM-01`.
- **Nessun codice IS-4**: il codice "accesso non autorizzato/abuso privilegi" è esclusivo dell'[[sources/Allegato 4 - Incidenti significativi di base per i soggetti essenziali|Allegato 4]] perché si fonda sui parametri quali-quantitativi del `DE.CM-01` p.6, non richiesto agli importanti.

## Tabella dei codici

| Codice | Descrizione |
|---|---|
| **IS-1** | Il soggetto NIS ha evidenza della **perdita di riservatezza, verso l'esterno**, di dati digitali di sua proprietà o sui quali esercita il controllo, anche parziale. |
| **IS-2** | Il soggetto NIS ha evidenza della **perdita di integrità, con impatto verso l'esterno**, di dati digitali di sua proprietà o sui quali esercita il controllo, anche parziale. |
| **IS-3** | Il soggetto NIS ha evidenza della **violazione dei livelli di servizio attesi** dei suoi servizi e/o delle sue attività, sulla base dei SL stabiliti ai sensi della misura `DE.CM-01`. |

## Citazioni rilevanti

> "Il soggetto NIS ha evidenza della perdita di riservatezza, verso l'esterno, di dati digitali di sua proprietà o sui quali esercita il controllo, anche parziale." — IS-1.

> "Il soggetto NIS ha evidenza della violazione dei livelli di servizio attesi dei suoi servizi e/o delle sue attività, sulla base dei livelli di servizio atteso (SL) stabiliti ai sensi della misura DE.CM-01." — IS-3.

## Entità menzionate

- [[entities/CSIRT Italia]] — destinatario tecnico delle notifiche
- [[entities/ACN]] — autorità competente

## Concetti collegati

- [[concepts/Incidenti significativi di base]] — concept-page operativa con soglie e collegamento ai regimi transitori
- [[concepts/Incidente significativo]] — definizione generale Art. 23(3) NIS2
- [[concepts/Notifica di incidente significativo]] — obbligo scaglionato 24h-72h-1mese
- [[concepts/Processo gestione incidenti NIS]] — modello operativo a 5 fasi
- [[concepts/Soggetti essenziali e importanti]] — destinatari (importanti)
- [[concepts/Misure di sicurezza di base]] — `DE.CM-01` è l'aggancio tecnico

## Note dell'agente

- *Sintesi dell'agente:* l'Allegato 3 è quasi laconico (1 pagina). Il vero "lavoro" di soglia è altrove: nei SL definiti dal soggetto stesso (`DE.CM-01` p.2). È una scelta deliberata di **auto-regolazione tecnica** controllata da ACN solo a posteriori, in fase di vigilanza.
- I codici IS-1 e IS-2 sono identici tra Allegato 3 e Allegato 4. La differenza è solo l'**aggiunta** di IS-4 per gli essenziali.
- Per il regime transitorio telco con soglie quantitative concrete (% utenti, durata interruzione), vedere [[concepts/Regime transitorio telco]].
