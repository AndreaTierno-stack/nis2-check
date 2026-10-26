---
title: FAQ NIS — Profili generali
type: source
scope: both
source_type: article
source_path: raw/articles/Domande frequenti NIS - Profili generali - ACN.pdf
url: https://www.acn.gov.it/portale/faq-nis-profili-generali
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2026
date_ingested: 2026-04-29
tags: [NIS2, ACN, FAQ, profili generali, panoramica]
---

## TL;DR

Pagina FAQ ufficiale ACN che espone i **fondamenti** del regime NIS2 in Italia: cos'è la Direttiva (UE) 2022/2555, come è stata recepita con il [[sources/D.Lgs. 138-2024 (Decreto NIS)]], quali sono gli **elementi fondanti** (estensione ambito a >80 tipologie / 18 settori, identificazione automatica, 10 ambiti di misure, notifica scaglionata, sanzioni allineate a GDPR, CVD, EU-CyCLONe). Identifica [[entities/ACN]] come Autorità nazionale competente NIS + Punto di contatto unico + ospite di [[entities/CSIRT Italia]]; elenca le 9 [[entities/Autorità di settore NIS]]; riassume gli **obblighi** (registrazione, organi di amministrazione, misure di sicurezza, notifica incidenti, banca nomi di dominio, categorizzazione); fissa le **scadenze** del calendario annuale e i **regimi transitori** per le coorti 2025 e 2026; rimanda alla [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]] per il dettaglio degli obblighi di base. 9 codici (`GEN.1`..`GEN.9`).

## Punti chiave

### Fonti normative inquadranti (`GEN.1`..`GEN.3`)

- **Direttiva (UE) 2022/2555 (NIS2)** — Parlamento europeo + Consiglio, 14 dicembre 2022. Aggiorna NIS1 (Dir. 2016/1148).
- **Recepimento IT**: D.Lgs. 4 settembre 2024, n. 138 ("decreto NIS"), GU Serie Generale n. 230 del 1° ottobre 2024, **entrata in vigore 16 ottobre 2024**.
- **Abrogazione**: il D.Lgs. 138/2024 abroga il D.Lgs. 65/2018 (recepimento NIS1).
- **Elementi fondanti**:
  1. Estensione ambito: oltre **80 tipologie di soggetto** in **18 settori** (11 altamente critici + 7 critici, vs 8/0 di NIS1); copertura dell'**intera infrastruttura ICT** del soggetto (non solo reti/sistemi che servono i servizi essenziali).
  2. Identificazione automatica essenziali/importanti per criteri oggettivi (tipologia + medio/grande impresa per Racc. 2003/361/CE), salvo eccezioni; possibile **identificazione governativa** ex art. 3 c. 13 decreto NIS su proposta delle Autorità di settore.
  3. Rafforzamento obblighi: 10 ambiti minimi di misure (multi-rischio + proporzionalità), notifica più articolata, poteri ispettivi/sanzionatori allineati al GDPR.
  4. Nuovi strumenti: **CVD**, **EU-CyCLONe** + Autorità nazionale per la gestione delle crisi informatiche.

### ACN come Autorità nazionale competente NIS (`GEN.4`)

- Funzioni ex **art. 10 D.Lgs. 138/2024**: sovrintende all'attuazione del decreto; regolamentazione + linee guida/raccomandazioni; **elabora e adotta l'elenco dei soggetti NIS**; partecipa al [[entities/Gruppo di Cooperazione NIS]] e ai consessi UE; **definisce gli obblighi** ex art. 7 c. 6 e Capo IV (gestione del rischio + notifica); monitoraggio, vigilanza, esecuzione.
- ACN è anche **Punto di contatto unico NIS** ex Direttiva NIS2 (collegamento transfrontaliero con SM, Commissione, [[entities/ENISA]]).
- ACN (con funzioni di coordinamento) e [[entities/Ministero della Difesa]] sono **Autorità nazionali di gestione delle crisi informatiche**.
- Presso ACN opera **CSIRT Italia** (Gruppo nazionale di risposta agli incidenti di sicurezza informatica).

### Autorità di settore NIS (`GEN.5`)

Le 9 Autorità di settore NIS supportano ACN, **convalidano l'elenco dei soggetti NIS** per il settore di competenza, propongono identificazioni governative, **coordinano i tavoli settoriali**:

- Presidenza del Consiglio dei ministri
- Ministero dell'economia e delle finanze
- Ministero delle imprese e del made in Italy
- Ministero dell'agricoltura, della sovranità alimentare e delle foreste
- Ministero dell'ambiente e della sicurezza energetica
- Ministero delle infrastrutture e dei trasporti
- Ministero dell'università e della ricerca
- Ministero della cultura
- Ministero della salute

### Sintesi degli obblighi (`GEN.6`)

| Articolo D.Lgs. 138/2024 | Obbligo |
|---|---|
| art. 7 | **Registrazione** e aggiornamento delle informazioni sulla [[concepts/Piattaforma digitale ACN]] |
| art. 23 | **Organi di amministrazione e direttivi**: approvazione/supervisione/formazione/responsabilità |
| art. 24 | **Misure di sicurezza** in 10 ambiti minimi obbligatori |
| art. 25 | **Notifica incidente significativo** (24h pre-notifica + 72h notifica + 1 mese relazione finale) |
| art. 29 | **Banca dati registrazione nomi di dominio** (solo gestori registri TLD + fornitori servizi registrazione) |
| art. 30 | **Categorizzazione delle attività e dei servizi** |

I **10 ambiti minimi** dell'art. 24 (per esteso nella FAQ): analisi rischi e sicurezza, gestione incidenti, continuità operativa + backup + disaster recovery, sicurezza catena di approvvigionamento, sicurezza acquisizione/sviluppo/manutenzione + gestione vulnerabilità, valutazione efficacia misure, igiene + formazione, crittografia/cifratura, sicurezza/affidabilità personale + controllo accessi + asset management, MFA + comunicazioni protette + emergenza.

### Decorrenza differenziata degli obblighi (`GEN.6`–`GEN.7`)

- **Notifica incidenti (art. 25)**:
  - Coorte **2025**: dal nono mese successivo alla ricezione della comunicazione di inserimento ACN.
  - Coorte **2026**: dal **1° gennaio 2027** (cfr. [[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]).
- **Misure di sicurezza (art. 24)**:
  - Coorte **2025**: entro 18 mesi dalla comunicazione di inserimento.
  - Coorte **2026**: entro **31 luglio 2027**.

### Calendario annuale (`GEN.7`)

- **Registrazione**: entro **28 febbraio** di ogni anno (art. 7 c. 1).
- **Aggiornamento informazioni**: entro **31 maggio** di ogni anno, e in continuo entro **14 giorni** dalla modifica (art. 7 cc. 4, 5, 7).
- **Misure di sicurezza** e **notifica incidenti**: come da decorrenza differenziata sopra.

### EU-CyCLONe (`GEN.8`)

- Rete di cooperazione delle autorità nazionali per la **gestione delle crisi informatiche su larga scala**; lanciata 2020, formalizzata con NIS2.
- Composta dai rappresentanti delle autorità di gestione delle crisi degli SM; la **Commissione** partecipa di norma come osservatore, e a pieno titolo se l'incidente ha o può avere impatto significativo sui servizi NIS.
- Compiti: gestione coordinata operativa, scambio regolare di informazioni, preparazione, **consapevolezza situazionale** condivisa, valutazione conseguenze, supporto al decisore politico, discussione (su richiesta SM) dei piani nazionali di risposta.

### Rimando alla "specifica di base" (`GEN.9`)

- Gli obblighi di **misure di sicurezza** (artt. 23-24) e **notifica incidente** (art. 25) sono **declinati operativamente** dalla **[[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]** (citata come "Determinazione ACN 379907 del 19 dicembre 2025").
- Si rimanda alla sezione FAQ dedicata "[[sources/FAQ NIS - Misure di sicurezza e notifica di incidenti]]".

## Citazioni rilevanti

> "L'Agenzia per la cybersicurezza nazionale è l'Autorità nazionale competente NIS di cui all'articolo 8, paragrafo 1, della Direttiva (UE) 2022/2555 e svolge numerose funzioni ai sensi dell'articolo 10 del d.lgs. n. 138/2024." — `GEN.4`.

> "Il termine per l'adempimento degli obblighi di base in materia di notifica degli incidenti di cui all'articolo 25 del decreto decorre differentemente a seconda che il soggetto sia stato inserito nell'elenco dei soggetti NIS per la prima volta nel corso dell'anno solare 2025 o dell'anno solare 2026." — `GEN.6`.

> "In ossequio ai principi di proporzionalità e gradualità previsti dal decreto NIS, gli obblighi (articolo 23, 24 e 25) in materia di misure di sicurezza e notifica di incidente sono definiti con Determinazione ACN 379907 del 19 dicembre 2025." — `GEN.9`.

## Entità menzionate

- [[entities/ACN]]
- [[entities/CSIRT Italia]]
- [[entities/ENISA]]
- [[entities/Autorità di settore NIS]]
- [[entities/Ministero della Difesa]]
- [[entities/EU-CyCLONe]]
- [[entities/Gruppo di Cooperazione NIS]]

## Concetti collegati

- [[concepts/NIS2]]
- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Settori altamente critici e critici]]
- [[concepts/Identificazione dei soggetti NIS]]
- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Misure di gestione del rischio cyber]]
- [[concepts/Notifica di incidente significativo]]
- [[concepts/Categorizzazione dei soggetti]]
- [[concepts/Sanzioni NIS2]]
- [[concepts/Coordinated Vulnerability Disclosure]]
- [[concepts/Responsabilità degli organi di gestione]]
- [[concepts/Approccio multi-rischio]]
- [[concepts/Piattaforma digitale ACN]]

## Note dell'agente

- È la **pagina-portale** del corpus FAQ: ricapitola in una manciata di voci ciò che il decreto e la Direttiva dicono in centinaia di articoli. Densità di link interni alle altre FAQ molto alta — nelle FAQ originali ogni rimando "v. FAQ X.Y" è esplicito, qui ho normalizzato i wiki-link.
- *Sintesi dell'agente:* la FAQ tradisce la **stratificazione** del regime: il decreto fissa il "che cosa", la Determinazione 379907/2025 il "come", le FAQ il "in che ordine fare le cose nella pratica". Il rinvio circolare tra FAQ e determinazioni è esplicito e voluto.
- Discrepanza minore: la FAQ `GEN.6` indica "entro il 31 marzo di ogni anno" come termine per l'elaborazione dell'elenco dei soggetti NIS, mentre la determinazione piattaforma ([[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]) lo regola attraverso le verifiche di coerenza (30+20gg dalla dichiarazione). Coerenza operativa: i due termini convergono se la dichiarazione è entro 28 febbraio e la verifica si chiude entro 31 marzo.
- Note di traduzione: i caratteri "à è ò" del PDF sono mostrati nel testo estratto come "�". Le citazioni qui trascritte ne tengono conto e ricostruiscono la corretta forma italiana.
