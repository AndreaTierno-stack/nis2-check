---
title: Referente CSIRT
type: entity
scope: both
entity_type: ruolo
tags: [nis2, italia, ruoli, csirt, notifica-incidenti]
sources: ["[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/Linee Guida NIS - Gestione incidenti - 2025-12]]", "[[sources/FAQ NIS - Ruoli e procedure]]"]
aliases: [Referente CSIRT NIS, Sostituti referente CSIRT]
---

## Cos'è

**Persona fisica** designata dal [[entities/Punto di contatto NIS|punto di contatto]] del soggetto NIS, attraverso la procedura telematica del Portale ACN, con il compito di **interloquire con [[entities/CSIRT Italia]] ed effettuare le notifiche** degli incidenti significativi (art. 25) e delle informazioni a destinatari (art. 26) del [[sources/D.Lgs. 138-2024 (Decreto NIS)]] per conto del soggetto.

Disciplinato dall'art. 7 della [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]].

## Fatti chiave

- **Termine di designazione**: entro il **31 dicembre dell'anno** in cui il soggetto NIS è stato inserito nell'elenco.
- **Designazione**: effettuata dal [[entities/Punto di contatto NIS|pdc]] tramite procedura telematica sul Portale ACN.
- **Sostituti**: possibili **uno o più sostituti referente CSIRT**, designati con le stesse modalità, per garantire **disponibilità operativa continua** (24/7 di fatto) per la notifica degli incidenti.
- **Competenze richieste** (art. 7 c. 5):
  - "Almeno **competenze di base in materia di sicurezza informatica e di gestione di incidenti informatici**";
  - **Conoscenza approfondita** dei sistemi informativi e di rete del soggetto per conto del quale operano.
- **Esonero DORA**: le **entità finanziarie** ex Reg. (UE) 2022/2554 sono **esentate** dall'attuazione di questo articolo. Adesione volontaria possibile.
- **Backup di emergenza**: in caso di indisponibilità del referente CSIRT e di tutti i sostituti, il [[entities/Punto di contatto NIS|pdc]] può effettuare le notifiche per il soggetto NIS (art. 4 c. 9 det. piattaforma).

## Funzione operativa

- **Punto di triage** del soggetto NIS verso [[entities/CSIRT Italia]] per ogni evento qualificabile come [[concepts/Incidente significativo|incidente significativo]].
- **Coordinatore interno** del processo di gestione degli incidenti (cfr. [[sources/Linee Guida NIS - Gestione incidenti - 2025-12]] — fase Risposta, sotto-fase Segnalazione).
- **Aggiornatore** delle informazioni sul referente nell'aggiornamento annuale (art. 16 c. 3 lett. f) det. piattaforma).

## Relazioni

- Subordinato funzionalmente al [[entities/Punto di contatto NIS|pdc]] che lo designa.
- Interfaccia operativa con [[entities/CSIRT Italia]].
- Esegue le notifiche scaglionate descritte in [[concepts/Notifica di incidente significativo]].

## Apparizioni nelle fonti

- [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]: art. 7 — disciplina completa.
- [[sources/Linee Guida NIS - Gestione incidenti - 2025-12]]: definizione e ruolo nel processo di gestione incidenti.
- [[sources/D.Lgs. 138-2024 (Decreto NIS)]]: artt. 25 e 26 (notifiche incidenti e informazione destinatari).
- [[sources/FAQ NIS - Ruoli e procedure]]: codici `RCS.1`–`RCS.6` — **esternalizzazione esplicitamente ammessa** (a differenza del pdc), **sovrapposizione con il pdc ammessa** per piccole organizzazioni, **dialogo con CSIRT Italia in inglese** previsto come opzione operativa; `RR.1`–`RR.3` rapporto con il pdc.

## Note dell'agente

- L'esonero DORA per il referente CSIRT NIS è **strutturale**: per le entità finanziarie il canale di reporting principale per gli ICT-related incidents è quello DORA (verso le ESAs / Banca d'Italia), e ACN evita di duplicare. Resta possibile aderire volontariamente, utile per soggetti con doppia esposizione (NIS + DORA).
- *Sintesi dell'agente:* la previsione "competenze di base" è un **floor minimo** non opzionabile per via di delega — si profila come responsabilità precisa del pdc nella scelta della persona, e indirettamente degli organi di amministrazione che vigilano sul pdc.
- **Differenza chiave rispetto al pdc** (FAQ Ruoli): il referente CSIRT è **esternalizzabile** (può essere personale di un MSSP/SOC esterno), mentre il pdc deve essere **incardinato nel soggetto NIS**. La sovrapposizione pdc = referente CSIRT è ammessa per piccoli soggetti, ma sconsigliata operativamente.
