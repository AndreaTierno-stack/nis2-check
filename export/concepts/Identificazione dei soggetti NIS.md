---
title: Identificazione dei soggetti NIS
type: concept
scope: both
tags: [nis2, italia, identificazione, registrazione, acn, art-7]
sources: ["[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/Direttiva (UE) 2022-2555 (NIS2)]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]", "[[sources/FAQ NIS - Profili generali]]", "[[sources/FAQ NIS - Ambito]]", "[[sources/FAQ NIS - Settori, sottosettori e tipologie di soggetto]]", "[[sources/FAQ NIS - Registrazione]]"]
aliases: [Identificazione governativa, Registrazione NIS, Iscrizione NIS]
updated: 2026-10-27
---

## Definizione

Procedura amministrativa con cui [[entities/ACN]] **classifica annualmente** ciascun soggetto rientrante nell'ambito NIS2 come [[concepts/Soggetti essenziali e importanti|essenziale o importante]] e gli notifica formalmente l'inserimento nell'elenco. L'identificazione è il **trigger** per gli obblighi del Capo IV (governance, misure di gestione del rischio, notifica incidenti).

In Italia opera secondo un modello **misto auto-dichiarativo + governativo**: il soggetto si auto-registra sulla [[concepts/Piattaforma digitale ACN|piattaforma digitale ACN]] dichiarando i propri dati (settore, dimensione, servizi); ACN verifica e conferma la classificazione.

## Sviluppo

Disciplina nel [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024 Art. 7]] e nella [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|determinazione ACN piattaforma e procedure]]:

- **Finestra di registrazione annuale**: dal **1° gennaio al 28 febbraio** di ogni anno.
- **Comunicazione di ACN**: entro il **31 marzo** ACN comunica al soggetto la classificazione (essenziale / importante / non rientrante).
- **Decorrenza obblighi**: dal **1° gennaio dell'anno successivo** alla classificazione.
- **Eccezioni alla soglia dimensionale**: alcuni soggetti rientrano **a prescindere dalla dimensione** (PA dell'Allegato III lett. a)-d), art. 3 c. 6 [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]]; soggetti unici/critici, fornitori DNS, registri TLD, prestatori di servizi fiduciari qualificati, ecc.).
- **Concorso autorità di settore**: le [[entities/Autorità di settore NIS]] cooperano nell'identificazione dei soggetti del proprio settore tramite il [[entities/Tavolo per l'attuazione della disciplina NIS|Tavolo NIS]].

### Calendario annuale completo (post-registrazione)

Il ciclo annuale del soggetto registrato non si chiude con la classificazione: la determinazione piattaforma codifica un **calendario operativo continuo** che integra l'identificazione con tutte le altre tappe procedurali NIS.

| Periodo | Adempimento | Riferimento |
|---|---|---|
| 1 gen – 28 feb | Registrazione (per nuovi soggetti) o conferma su piattaforma | art. 7 D.Lgs. 138/2024 |
| 31 mar | Classificazione comunicata da ACN | art. 7 c. 3 D.Lgs. 138/2024 |
| 15 apr – 31 mag | [[concepts/Aggiornamento annuale informazioni|Aggiornamento annuale]] (anche per accordi condivisione informazioni) | art. 16 det. piattaforma; det. accordi condivisione |
| 1 mag – 30 giu | [[concepts/Categorizzazione dei soggetti|Categorizzazione]] e categoria di rilevanza | det. categorizzazione |
| 31 mag | Designazione/conferma sostituto del [[entities/Punto di contatto NIS\|punto di contatto]] | art. 5 det. piattaforma |
| 1 set – 30 nov | Designazione [[entities/Rappresentante NIS in Italia\|rappresentante]] (soggetti extra-UE) | art. 9 det. piattaforma |
| 31 dic | Designazione [[entities/Referente CSIRT\|referente CSIRT]] e sostituti | art. 7 det. piattaforma |
| Continuo | [[concepts/Aggiornamento continuo informazioni\|Aggiornamento continuo]] (entro 14gg dalla modifica) | art. 7 c. 7 + art. 19 det. piattaforma |

### Termini speciali coorte 2026

La [[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30|determinazione n. 127434/2026]] introduce per i soggetti registrati nel 2026 termini specifici:
- adozione [[concepts/Misure di sicurezza di base|misure di sicurezza di base]] entro **31 luglio 2027**;
- avvio obbligo di [[concepts/Notifica di incidente significativo|notifica incidenti significativi di base]] dal **1° gennaio 2027**.

I soggetti della coorte 2025 restano soggetti ai termini ordinari della [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|determinazione 379907/2025]] (18 mesi misure / 9 mesi notifica dall'entrata in vigore della determinazione).

Nella Direttiva NIS2 l'identificazione segue per i più dalla **size-cap rule automatica** (Art. 2 e Allegati); gli Stati membri possono identificare anche soggetti **sotto soglia** (Art. 2(2)).

## Posizioni a confronto

- **NIS1 (vecchio modello)**: identificazione **caso per caso** dell'OSE da parte dell'autorità nazionale, ampia discrezionalità → forte divergenza tra Stati. Considerando 14 NIS2 cita esplicitamente questa eterogeneità come problema da correggere.
- **NIS2 (nuovo modello)**: identificazione **automatica** dalla size-cap rule + procedura formale di registrazione → maggiore certezza giuridica e uniformità UE.

## Chiarimenti operativi (FAQ ACN)

Le FAQ ACN dedicano a questo ciclo numerosi chiarimenti:

- [[sources/FAQ NIS - Profili generali]]: panoramica generale del regime NIS e del processo di identificazione.
- [[sources/FAQ NIS - Ambito]]: criteri di rientro nell'ambito (`AMB.SI.*`) e di esclusione (`AMB.NO.*`) — incluso il caso DORA (`AMB.NO.2` — entità finanziarie restano soggetti NIS solo per Allegato I p. 3 e p. 4 e con il solo art. 7 c. 1).
- [[sources/FAQ NIS - Settori, sottosettori e tipologie di soggetto]]: ~70 chiarimenti su tutti i 17 settori (10 altamente critici + 7 critici) + Allegato III + Allegato IV; mappa size-blind (servizi fiduciari qualificati, DNS/TLD/registry, registrar Allegato II), eccezioni di prevalenza (Acqua potabile, Acque reflue, Gestione rifiuti), esclusioni puntuali, identificazione autoritativa Allegato IV.
- [[sources/FAQ NIS - Registrazione]]: dettaglio operativo della procedura di auto-registrazione su piattaforma — accesso del pdc, designazione, gruppi di imprese, PA, rappresentante UE.

## Collegamenti

- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Size-cap rule]]
- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Piattaforma digitale ACN]]
- [[concepts/Aggiornamento annuale informazioni]]
- [[concepts/Aggiornamento continuo informazioni]]
- [[concepts/Categorizzazione dei soggetti]]
- [[entities/Punto di contatto NIS]], [[entities/Referente CSIRT]], [[entities/Rappresentante NIS in Italia]]
- [[entities/ACN]], [[entities/Tavolo per l'attuazione della disciplina NIS]]
