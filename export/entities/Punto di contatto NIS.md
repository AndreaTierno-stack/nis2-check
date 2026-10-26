---
title: Punto di contatto NIS
type: entity
scope: both
entity_type: ruolo
tags: [nis2, italia, ruoli, piattaforma, governance]
sources: ["[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/FAQ NIS - Ruoli e procedure]]", "[[sources/FAQ NIS - Registrazione]]", "[[sources/Legge 90-2024 (cybersicurezza nazionale)]]"]
aliases: [Pdc NIS, Punto di contatto, Sostituto punto di contatto]
---

## Cos'è

**Persona fisica** designata da un soggetto NIS, ai sensi dell'art. 7 c. 1 lett. c) del [[sources/D.Lgs. 138-2024 (Decreto NIS)]], con il compito di curare l'attuazione del decreto NIS per conto del soggetto, accedere al Portale ACN e ai Servizi NIS, effettuare la registrazione del soggetto e interloquire con l'[[entities/ACN]]. È il **principale interlocutore amministrativo** del soggetto verso l'autorità.

Disciplinato in dettaglio dall'art. 4 della [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]].

## Fatti chiave

- **Chi può essere designato**:
  - Rappresentante legale del soggetto NIS;
  - Procuratore generale del soggetto (censito sul registro delle imprese);
  - Dipendente del soggetto delegato dal rappresentante legale;
  - Per gruppi di imprese: dipendente di altra impresa del gruppo che rientra in NIS, delegato;
  - Per PA: personale di altra PA NIS, delegato dal rappresentante legale, ex art. 53 D.Lgs. 165/2001.
- **Riferisce direttamente** al vertice gerarchico e agli **organi di amministrazione e direttivi** ai fini delle responsabilità ex art. 23 decreto NIS.
- **Censimento**: tramite SPID o CIE personale sul Portale ACN; associazione al soggetto via codice fiscale o codice IPA.
- **Attivazione**: convalida dal soggetto via PEC al domicilio digitale; ogni nuova convalida dissocia automaticamente l'utenza pdc precedente.
- **Avvicendamento**: in caso di sostituzione, gli organi di amministrazione e direttivi provvedono "senza ingiustificato ritardo" alla designazione del nuovo pdc.
- **Coordinamento Legge 90/2024**: la designazione del pdc può **soddisfare anche l'obbligo di nomina** del [[concepts/Referente per la cybersicurezza (L. 90-2024)|referente per la cybersicurezza]] ex art. 8 c. 2 della [[sources/Legge 90-2024 (cybersicurezza nazionale)|L. 90/2024]] per i soggetti che ricadono nell'[[concepts/Perimetro Legge 90-2024|art. 1 c. 1 di quella legge]] — base normativa: art. 4 c. 8 [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|Det. piattaforma 127437/2026]]. Per i soggetti L. 90 ∩ NIS, l'art. 8 c. 3 L. 90 consente anche la **triplice coincidenza con il Responsabile per la Transizione al Digitale (RTD)** ex art. 17 CAD.
- **In via eccezionale** (indisponibilità del [[entities/Referente CSIRT]] e dei sostituti), il pdc **può effettuare le notifiche di incidente** ex artt. 25 e 26 decreto NIS.
- **Avvalimento di personale esterno**: ammesso, ferme restando le disposizioni sulla figura del pdc.

## Sostituto punto di contatto

- Persona fisica **distinta** dal pdc, designata con le **stesse modalità** (art. 5 della det. piattaforma).
- **Termine di designazione**: entro il **31 maggio dell'anno** in cui il soggetto è stato inserito nell'elenco NIS.
- Supporta il pdc, può interloquire direttamente con ACN, può fare le stesse azioni del pdc **tranne** la registrazione iniziale del soggetto.
- **Esonero**: se il pdc è l'unica persona fisica operante nell'organizzazione (impossibilità materiale).

## Relazioni

- Designa, a sua volta, il [[entities/Referente CSIRT]] e i suoi sostituti, la segreteria e gli operatori sul Portale ACN.
- Risponde all'[[entities/ACN]] per la correttezza delle informazioni trasmesse (responsabilità penale ex art. 76 DPR 445/2000 in caso di dichiarazioni mendaci).
- Resta ferma la responsabilità degli organi di amministrazione e direttivi del soggetto NIS ex art. 23 decreto NIS e quella delle persone fisiche ex art. 38.

## Apparizioni nelle fonti

- [[sources/D.Lgs. 138-2024 (Decreto NIS)]]: art. 7 c. 1 lett. c) — definizione del ruolo all'interno della procedura di registrazione.
- [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]: art. 4 (pdc) e art. 5 (sostituto) — disciplina di dettaglio.
- [[sources/Linee Guida NIS - Gestione incidenti - 2025-12]]: definizione operativa nel contesto della gestione incidenti.
- [[sources/FAQ NIS - Ruoli e procedure]]: codici `PDC.1`–`PDC.7` (designazione, requisiti, sostituzione), `ODA.1`–`ODA.10` (catena con organi di amministrazione e direttivi, art. 23 non delegabile), `RR.1`–`RR.3` (rapporto pdc ↔ referente CSIRT). Tabella riassuntiva 8 ruoli (Componenti CDA, pdc, sostituto pdc, referente CSIRT, sostituto referente CSIRT, segreteria, operatori, rappresentante UE) con colonne Obbligatorio/Esternalizzabile/Trasmette comunicazioni/Notifica incidenti/Riferimento normativo.
- [[sources/FAQ NIS - Registrazione]]: codici `REG.*` con dettaglio operativo procedura su Portale ACN, casi multi-organizzazione (gruppi di imprese, PA, rappresentante UE).

## Note dell'agente

- *Sintesi dell'agente:* il pdc è il "owner amministrativo" del rapporto NIS; il [[entities/Referente CSIRT]] è il "owner tecnico" della notifica incidenti. La separazione è deliberata: assicura competenze specifiche al canale di reporting con [[entities/CSIRT Italia]] senza sovraccaricare il pdc, ma il pdc rimane "fallback operativo" in caso di indisponibilità.
- **Catena tripartita di responsabilità** (chiarita da `ODA.1`–`ODA.10` FAQ Ruoli): **CDA** (art. 23, non delegabile, artt. 2381/2392 c.c.) → **pdc** (art. 4 — "cura" l'attuazione, esternalizzazione vietata) → **referente CSIRT** (art. 7 — delega operativa per la sola notifica, esternalizzabile). Il pdc è incardinato nel soggetto NIS; non può essere consulente esterno.
