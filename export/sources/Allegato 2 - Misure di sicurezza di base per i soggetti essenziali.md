---
title: Allegato 2 — Misure di sicurezza di base per i soggetti essenziali
type: source
scope: both
source_type: article
source_path: raw/articles/allegato-2-v2.pdf
url:
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2025-12-19
date_ingested: 2026-04-29
tags: [nis2, italia, acn, fncdp, nist-csf, misure-sicurezza, soggetti-essenziali]
---

## TL;DR

Allegato 2 della [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|det. ACN n. 379907]]: misure di sicurezza di base per i **soggetti NIS essenziali**. **Strict super-set dell'Allegato 1**: stessa architettura a 6 funzioni FNCDP/NIST CSF v2.0, stessi codici misura, ma con **29 requisiti aggiuntivi** (19 punti aggiuntivi su 10 misure comuni + 10 punti su 6 misure solo-essenziali). Conteggi esatti: **43 misure / 116 requisiti** (ancorati dalla [[sources/Guida lettura specifiche di base|guida alla lettura]] § 2.1). **6 misure in più** assenti dall'Allegato 1: `ID.AM-03` (flussi di rete), `PR.AT-02` (formazione specializzata), `PR.PS-01` (hardening), `PR.PS-03` (dismissione hardware), `PR.IR-03` (comunicazione di emergenza), `RC.CO-03` (comunicazione attività ripristino). Tabella 2 ha un requisito in più (`ID.RA-01` p.2 = VA/PT obbligatori).

## Punti chiave — il diff vs Allegato 1

### Misure NUOVE (presenti solo nell'Allegato 2)

- **`ID.AM-03` Flussi di rete**: inventario aggiornato dei flussi di rete tra sistemi del soggetto e l'esterno, approvati internamente.
- **`PR.AT-02` Formazione specializzata**: piano di formazione dedicato al personale con ruoli specializzati (inclusi gli amministratori di sistema). Contenuti: configurazione/funzionamento sicuro, minacce informatiche note, comportamento in caso di eventi.
- **`PR.PS-01` Hardening**: configurazioni di riferimento sicure (hardened) documentate per i sistemi rilevanti.
- **`PR.PS-03` Dismissione hardware**: procedure per trasferimento fisico e dismissione sicura di dispositivi di memorizzazione + registri delle manutenzioni hardware.
- **`PR.IR-03` Comunicazione di emergenza**: sistemi di comunicazione di emergenza protetti.
- **`RC.CO-03` Comunicazione ripristino**: procedure per comunicare alle parti interne le attività di ripristino post-incidente.

### Punti AGGIUNTIVI sulle misure comuni

- `GV.RR-04` p.4-5: clausole contrattuali per **obblighi security post-cessazione/modifica rapporto di lavoro** (es. NDA).
- `GV.PO-02` p.3: registro aggiornato con esiti del riesame politiche.
- `GV.SC-01` p.2: lista esplicita di **17 ambiti di sicurezza** per i requisiti contrattuali ai fornitori (affidabilità, ruoli, audit, vulnerabilità, BC/DR, IAM, sicurezza fisica, formazione, dati, reti, monitoraggio, gestione/segnalazione incidenti, dev sicuro, manutenzione, dismissione, subappalto). Considera anche i risultati delle valutazioni coordinate del [[entities/Gruppo di Cooperazione NIS]].
- `ID.RA-01` p.2-3: **vulnerability assessment e/o penetration test obbligatori** prima della messa in esercizio (e poi periodicamente) sui sistemi rilevanti, con relazioni che descrivono attività ed esiti.
- `ID.RA-05` p.4: la valutazione del rischio considera esplicitamente minacce interne/esterne, vulnerabilità non risolte e impatti.
- `ID.RA-08` p.5: monitoraggio canali dei **fornitori del software ritenuto critico**.
- `ID.IM-01` p.3-4: piano di **valutazione efficacia** delle misure di gestione del rischio + reportistica periodica agli organi di amministrazione e direttivi.
- `PR.DS-11` p.3-5: backup cifrati o protetti fisicamente + **test di ripristino periodici** (è il punto cruciale "il backup è valido solo se è stato testato").
- `PR.PS-02` p.4-5: aggiornamento del **software ritenuto critico** verificato prima in **ambiente di test**.
- `DE.CM-01` p.4-7: **filtraggio del traffico in ingresso** (incl. email); monitoraggio attivo di accessi remoti, perimetrali, eventi amministrativi, accessi falliti agli endpoint; **parametri quali-quantitativi** per rilevare accessi non autorizzati o abuso privilegi (è la base del codice incidente IS-4 dell'Allegato 4).

### Tabella 2 — requisiti non derogabili (essenziali)

Aggiunge un requisito rispetto all'Allegato 1: **`ID.RA-01` p.2** (VA/PT periodici e pre-messa-in-esercizio).

## Citazioni rilevanti

> "Per almeno i sistemi informativi e di rete rilevanti, in accordo al piano di gestione delle vulnerabilità di cui alla misura ID.RA-08, fatte salve motivate e documentate ragioni normative o tecniche, sono eseguite periodicamente e comunque prima della loro messa in esercizio, attività per l'identificazione delle vulnerabilità che comprendano almeno vulnerability assessment e/o penetration test." — `ID.RA-01` punto 2.

> "Per almeno i sistemi informativi e di rete rilevanti, ai fini di cui al punto 1, sono definiti, monitorati e documentati parametri quali-quantitativi per rilevare gli accessi non autorizzati o con abuso dei privilegi concessi." — `DE.CM-01` punto 6.

> "Per almeno i sistemi informativi e di rete rilevanti, in accordo agli esiti della valutazione del rischio di cui alla misura ID.RA-05, è verificata periodicamente l'utilizzabilità dei backup effettuati mediante test di ripristino." — `PR.DS-11` punto 4.

> "Sono adottate e documentate procedure per comunicare alle parti interne interessate, ivi incluse le articolazioni competenti del soggetto NIS, le attività di ripristino a seguito di un incidente." — `RC.CO-03` punto 1.

## Tabella riassuntiva confronto All.1 ↔ All.2

| Aspetto | Importanti (All.1) | Essenziali (All.2) |
|---|---|---|
| Misure totali | **37** | **43** |
| Requisiti totali | **87** | **116** |
| Misure aggiuntive | — | `ID.AM-03`, `PR.AT-02`, `PR.PS-01`, `PR.PS-03`, `PR.IR-03`, `RC.CO-03` |
| Vulnerability assessment / PT | non esplicitato | obbligatori (`ID.RA-01` p.2) |
| Hardening configurazioni | non esplicitato | obbligatorio (`PR.PS-01`) |
| Test di ripristino backup | non esplicitato | obbligatorio (`PR.DS-11` p.4) |
| Test SW critico in ambiente di test | non esplicitato | obbligatorio (`PR.PS-02` p.4) |
| Comunicazione di emergenza | non esplicitato | obbligatoria (`PR.IR-03`) |
| Dismissione HW sicura | non esplicitato | obbligatoria (`PR.PS-03`) |
| Formazione specializzata sysadmin | inclusa in `PR.AT-01` generico | dedicata (`PR.AT-02`) |
| Parametri quali-quantitativi DE.CM-01 | non presenti | obbligatori (p. 6) → base IS-4 |
| Clausole HR post-cessazione | non esplicitato | obbligatorie (`GV.RR-04` p.4) |
| Tabella 1 ambiti politiche | 16 | 16 (stesso elenco) |
| Tabella 2 non derogabili | 6 voci | 7 voci (+`ID.RA-01` p.2) |

## Entità menzionate

- [[entities/ACN]] — autorità di adozione
- [[entities/CSIRT Italia]] — destinatario notifiche e canali vulnerabilità
- [[entities/Framework Nazionale per la Cybersecurity]] — base architetturale
- [[entities/Gruppo di Cooperazione NIS]] — fonte delle valutazioni coordinate dei rischi supply-chain (`GV.SC-01` p.2 lett. a)
- [[entities/Punto di contatto NIS]], [[entities/Referente CSIRT]] — inclusi in `GV.RR-02` p.3

## Concetti collegati

- [[concepts/Misure di sicurezza di base]] — concept-page operativa
- [[concepts/Misure di gestione del rischio cyber]] — Art. 24 NIS2
- [[concepts/Specifiche tecniche di base]] — Art. 27 D.Lgs.
- [[concepts/Soggetti essenziali e importanti]] — destinatari (essenziali)
- [[concepts/Notifica di incidente significativo]]
- [[concepts/Processo gestione incidenti NIS]]
- [[concepts/Coordinamento DORA-NIS]] — esoneri DORA su misure equivalenti

## Note dell'agente

- *Sintesi dell'agente:* la differenza più "operativa" tra importanti ed essenziali, oltre alle 6 misure aggiuntive, è la **mentalità testing-first**: VA/PT, test ripristino backup, test SW critico in ambiente separato, parametri quali-quantitativi per accesso anomalo. È un cambio di postura: non basta avere i controlli, vanno **dimostrati funzionanti**.
- Il super-set è puramente additivo: nessun punto dell'Allegato 1 è stato rimosso o indebolito nell'Allegato 2.
- Per il delta concreto dei codici incidente conseguenti, vedere [[sources/Allegato 4 - Incidenti significativi di base per i soggetti essenziali]] (IS-4 fonda direttamente su `DE.CM-01` p.6).
