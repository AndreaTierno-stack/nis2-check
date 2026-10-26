---
title: Linee Guida NIS — Specifiche di base — Guida alla lettura
type: source
scope: both
source_type: article
source_path: raw/articles/guida-alla-lettura-specifiche-di-base.pdf
url:
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2025-09
date_ingested: 2026-05-18
tags: [nis2, italia, acn, specifiche-di-base, guida, framework-nazionale, art-23, art-24, art-25]
aliases: [Guida alla lettura specifiche di base, Linee Guida NIS Specifiche di base]
---

## TL;DR

Documento meta-interpretativo dell'[[entities/ACN]] (prima pubblicazione settembre 2025, ed. corrente **2.1 aprile 2026**) che accompagna la lettura della [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|det. 379907/2025]] e dei suoi 4 allegati tecnici. Approvato dal [[entities/Tavolo per l'attuazione della disciplina NIS|Tavolo NIS]] il **10 aprile 2025** dopo consultazione con autorità di settore e associazioni di categoria. Fissa i numeri esatti delle misure (**37 misure / 87 requisiti** importanti, **43 misure / 116 requisiti** essenziali), spiega l'**approccio basato sul rischio** declinato in 4 clausole standardizzate, introduce il concetto di **sistemi informativi e di rete rilevanti** con processo a 3 step, formalizza il **modello tridimensionale degli incidenti** (condizione / compromissione / oggetto), e elenca in **Appendice C** gli **11 documenti** che devono essere approvati dagli organi di amministrazione e direttivi.

## Punti chiave

### 1. Conteggi esatti misure/requisiti

| | Misure | Requisiti |
|---|---|---|
| Soggetti **importanti** (Allegato 1) | **37** | **87** |
| Soggetti **essenziali** (Allegato 2) | **43** | **116** |

Decomposizione del super-set essenziali sopra importanti:

- **27 misure** identiche tra i due allegati.
- **10 misure** comuni con **19 requisiti aggiuntivi** per gli essenziali: `GV.RR-04`, `GV.PO-02`, `GV.SC-01`, `ID.RA-01`, `ID.RA-05`, `ID.RA-08`, `ID.IM-01`, `PR.DS-11`, `PR.PS-02`, `DE.CM-01`.
- **6 misure** solo-essenziali con **10 requisiti** aggiuntivi: `ID.AM-03`, `PR.AT-02`, `PR.PS-01`, `PR.PS-03`, `PR.IR-03`, `RC.CO-03`.
- Totale extra essenziali: **29 requisiti**.

> *Nota redazionale:* le pagine wiki precedenti riportavano "~26 / ~32 misure". I numeri corretti, qui ancorati dalla guida, sono 37/43.

### 2. Approccio basato sul rischio — le 4 clausole

L'art. 31 del decreto NIS prevede di tener conto del grado di esposizione ai rischi. La guida formalizza l'attuazione tramite **4 clausole standardizzate** ricorrenti nei requisiti delle misure di base (Cap. 2.3 + Appendice B):

| Clausola | Funzione | Req. SI | Req. SE |
|---|---|---|---|
| `per almeno i sistemi informativi e di rete rilevanti` | restringe l'**ambito** ai soli sistemi rilevanti | 13 | 22 |
| `in accordo agli esiti della valutazione del rischio di cui alla misura ID.RA-05` | definisce **modalità e ambito** in funzione del rischio | 6 | 10 |
| `fatte salve motivate e documentate ragioni normative o tecniche` | consente **deroga** con motivazione + misure compensative ex `ID.RA-06` p.2 | 8 | 10 |
| `forniture con potenziali impatti sulla sicurezza dei sistemi informativi e di rete` | restringe l'ambito alle **forniture rilevanti** | 3 | 3 |

Quando combinate in un requisito, **si applicano in cascata** (es. "per almeno i sistemi rilevanti" + "in accordo alla valutazione del rischio" → solo i sistemi rilevanti per cui il rischio lo richiede).

Cfr. [[concepts/Clausole basate sul rischio]].

### 3. Sistemi informativi e di rete rilevanti — processo a 3 step

I "sistemi informativi e di rete rilevanti" — definiti all'art. 1 della determinazione obblighi di base — sono i sistemi la cui compromissione comporterebbe **impatto significativo su riservatezza, integrità e disponibilità** delle attività e servizi NIS del soggetto. Per individuarli:

1. **Identifica** attività e servizi per i quali il soggetto rientra nell'ambito NIS.
2. **Valuta** l'impatto di una compromissione CIA sui sistemi che li sostengono (nessuna metodologia obbligatoria).
3. **Marca** come rilevanti quelli con impatto significativo.

L'elenco dei rilevanti è mantenuto ex misura **`GV.OC-04`**.

Cfr. [[concepts/Sistemi informativi e di rete rilevanti]].

### 4. Tipologia requisiti — organizzativi vs tecnologici (Cap. 2.4)

- **Organizzativi**: gestione, organizzazione, documentazione, controllo di processi (es. `GV.RR-02` ruoli, `GV.PO-01` politiche, `ID.RA-06` piano trattamento rischi).
- **Tecnologici**: strumenti e soluzioni concrete (es. `DE.CM-01` rilevamento intrusioni, `PR.DS-01/02` cifratura, `PR.AA-03` MFA).

La **maggioranza** dei requisiti delle misure di base è organizzativo. Filosofia esplicita: *"costruire anzitutto una solida governance della sicurezza informatica"*; tooling tecnico al servizio dei processi.

### 5. Evidenze documentali (Cap. 2.5)

I documenti richiesti dalle misure si raggruppano in 6 tipologie:

- **Elenchi** (personale org. sicurezza, configurazioni di riferimento, sistemi accessibili da remoto)
- **Inventari** (apparati, servizi, software, flussi di rete, servizi erogati dai fornitori, fornitori)
- **Piani** (valutazione rischi, BC, DR, trattamento rischi, gestione vulnerabilità, adeguamento, valutazione efficacia, formazione, risposta incidenti)
- **Politiche** di sicurezza informatica (sui 16 ambiti di Tabella 1)
- **Procedure** (sui requisiti specifici)
- **Registri** (riesame politiche, formazione, manutenzioni)

In corsivo nel documento sono indicati quelli che valgono **solo per gli essenziali**. La forma (cartacea o digitale) è libera purché documentale e accessibile.

Cfr. [[concepts/Evidenze documentali NIS]].

### 6. Modello tipologia di incidente (Cap. 3.2)

La guida (ed. 2.0 dic 2025) introduce un **modello tridimensionale** per descrivere ogni incidente significativo:

| Elemento | Significato |
|---|---|
| **Condizione** | Il soggetto **ha evidenza** dell'incidente (= dispone di elementi oggettivi che evincono il suo verificarsi) |
| **Compromissione** | L'**evento di sicurezza** che configura l'incidente |
| **Oggetto compromissione** | La **risorsa** su cui l'evento ha impatto (dati digitali oppure servizi/attività) |

Tabella riassuntiva applicata ai codici IS-1..4:

| Codice | Condizione | Compromissione | Oggetto |
|---|---|---|---|
| IS-1 | il soggetto ha evidenza | Perdita di riservatezza, verso l'esterno | Dati digitali |
| IS-2 | id. | Perdita di integrità, con impatto verso l'esterno | Dati digitali |
| IS-3 | id. | Violazione dei livelli di servizio attesi (SL) | Servizi e/o attività |
| IS-4 (solo essenziali) | id., anche su parametri quali-quantitativi `DE.CM-01` p.6 | Accesso non autorizzato o con abuso dei privilegi concessi | Dati digitali |

L'**evidenza** è acquisita generalmente tramite: (a) segnalazioni esterne (es. [[entities/CSIRT Italia]]); (b) segnalazioni interne (es. help desk); (c) eventi dei sistemi di monitoraggio. Il momento di acquisizione dell'evidenza fa decorrere i termini di pre-notifica (24 ore) e notifica (72 ore).

Compromissione IS-1 = esfiltrazione documenti / esposizione credenziali; IS-2 = defacement / corruzione DB; IS-3 = violazione SLA scelti dal soggetto (es. sito non disponibile > 30 min); IS-4 = uso di credenziali rubate / abuso di privilegi tecnici per scopi estranei alle necessità funzionali.

### 7. Appendice A — mappatura art. 24 c.2 D.Lgs. NIS ↔ codici misure

Tabella esatta (la "stele di Rosetta" tra norma astratta e specifica tecnica):

| Elemento art. 24 c.2 | Codici misure |
|---|---|
| a) Politiche analisi dei rischi e sicurezza | `GV.OC-04`, `GV.RM-03`, `GV.RR-02`, `GV.PO-01`, `GV.PO-02`, `ID.RA-05`, `ID.RA-06` |
| b) Gestione incidenti (incl. notifiche art. 25-26) | `PR.PS-04`, `DE.CM-01`, `DE.CM-09`, `RS.MA-01`, `RS.CO-02`, `RC.RP-01`, `RC.CO-03` |
| c) Continuità operativa (backup, DR, crisi) | `ID.IM-04`, `PR.DS-11` |
| d) Sicurezza catena di approvvigionamento | `GV.SC-01`, `GV.SC-02`, `GV.SC-04`, `GV.SC-05`, `GV.SC-07` |
| e) Sicurezza acquisizione/sviluppo/manutenzione + vulnerabilità | `GV.SC-05`, `ID.RA-01`, `ID.RA-08`, `PR.PS-01`, `PR.PS-02`, `PR.PS-03`, `PR.PS-06` |
| f) Politiche valutazione efficacia misure | `ID.IM-01` |
| g) Pratiche di igiene base + formazione | `PR.AT-01`, `PR.AT-02` |
| h) Crittografia + cifratura | `PR.DS-01`, `PR.DS-02` |
| i) Sicurezza/affidabilità HR + controllo accessi + gestione asset | `GV.RR-04`, `ID.AM-01`, `ID.AM-02`, `ID.AM-03`, `ID.AM-04`, `PR.AA-01`, `PR.AA-03`, `PR.AA-05`, `PR.AA-06`, `PR.IR-01` |
| l) MFA / autenticazione continua / comunicazioni protette / emergenza | `PR.AA-03`, `PR.DS-02`, `PR.IR-03` |

### 8. Appendice C — 11 documenti da approvare dagli organi di amministrazione

Lista esatta con i requisiti che ne richiedono l'approvazione:

1. **Organizzazione per la sicurezza informatica** — `GV.RR-02` p.1
2. **Politiche di sicurezza informatica** — `GV.PO-01` p.3
3. **Valutazione del rischio** posto alla sicurezza dei sistemi — `ID.RA-05` p.3
4. **Piano di trattamento del rischio** — `ID.RA-06` p.3
5. **Piano di gestione delle vulnerabilità** — `ID.RA-08` p.4
6. **Piano di adeguamento** — `ID.IM-01` p.1
7. **Piano di continuità operativa** — `ID.IM-04` p.4
8. **Piano di ripristino in caso di disastro** — `ID.IM-04` p.4
9. **Piano di gestione delle crisi** — `ID.IM-04` p.4
10. **Piano di formazione** — `PR.AT-01` p.2
11. **Piano per la gestione degli incidenti di sicurezza informatica** — `RS.MA-01` p.2

Questa è la **traduzione operativa** della responsabilità del board ex art. 23 decreto NIS: 11 deliberazioni formali documentate.

### 9. Appendice D — Glossario

Dizionario di riferimento dei termini peculiari delle specifiche di base. Voci più rilevanti per la wiki:

- **Abuso dei privilegi concessi**: l'utente ha l'autorizzazione tecnica (credenziali) ma accede illecitamente (violazione politiche, scopi estranei alle necessità funzionali).
- **Parametri quali-quantitativi**: indicatori per rilevare accessi non autorizzati o abuso privilegi. Esempio quantitativo: soglia di query a un DB da un utente. Esempio qualitativo: accesso admin fuori orario.
- **Livelli di servizio attesi (SL)**: obiettivi misurabili di disponibilità del servizio/attività, definiti dal soggetto. Non coincidono necessariamente con SLA contrattuali.
- **Misure di mitigazione compensative**: misure adottate quando un requisito non derogabile non può essere implementato per ragioni normative o tecniche.
- **Sistema informativo e di rete**: rete + dispositivi + dati (art. 2 c. 1 lett. p) decreto NIS).
- **Sistemi informativi e di rete rilevanti**: quelli la cui compromissione produrrebbe impatto significativo su CIA delle attività/servizi NIS.

### 10. Regimi speciali

- **PSNC-NIS** sui beni ICT del perimetro: non applicano le disposizioni del decreto NIS; non sono soggetti agli obblighi di notifica art. 25 per incidenti riconducibili a notifica perimetro (art. 33 c. 1 decreto NIS).
- **OSE** ex D.Lgs. 65/2018: mantenimento misure preesistenti sui sistemi OSE (art. 5 det. obblighi di base).
- **Telco** ex D.Lgs. 259/2003: mantenimento misure DM 12/12/2018 + soglie ex art. 5 c. 2 DM come incidenti significativi di base (art. 6 det. obblighi di base).

### 11. Termini di adempimento

- Coorte 2025: misure entro 18 mesi dalla comunicazione di inserimento; notifica entro 9 mesi.
- Coorte 2026 (Det. 127434/2026): misure entro **31 luglio 2027**; notifica dal **1° gennaio 2027**.

## Citazioni rilevanti

> "Nel complesso sono state definite **37 misure di sicurezza con 87 requisiti per i soggetti importanti** e **43 misure di sicurezza con 116 requisiti per i soggetti essenziali**." — § 2.1.

> "Quando in un requisito è presente una combinazione di tali clausole, le stesse sono da intendersi applicate **in cascata**." — § 2.3.

> "Risulta, infatti, fondamentale costruire anzitutto una solida governance della sicurezza informatica. L'adozione e l'utilizzo di strumenti e soluzioni tecnologiche dovrebbero, infatti, essere a supporto dalle procedure e dei processi definiti dall'organizzazione, in coerenza con le politiche." — § 2.4.

> "L'**evidenza dell'incidente** è tipicamente successiva al verificarsi dell'incidente e definisce il momento dal quale decorre il termine per la trasmissione della pre-notifica (24 ore) e della notifica (72 ore)." — § 3.2.1.

## Entità menzionate

- [[entities/ACN]] — autore
- [[entities/Tavolo per l'attuazione della disciplina NIS]] — approvazione 10/04/2025
- [[entities/Autorità di settore NIS]] — consultate in fase di redazione
- [[entities/CSIRT Italia]] — destinatario notifiche, fonte di segnalazioni
- [[entities/Framework Nazionale per la Cybersecurity]] — base architetturale delle misure
- [[entities/Punto di contatto NIS]] — definizione glossario Appendice D

## Concetti collegati

- [[concepts/Specifiche tecniche di base]] — concetto-ombrello
- [[concepts/Misure di sicurezza di base]] — Cap. 2 della guida + Appendici A/B/C
- [[concepts/Incidenti significativi di base]] — Cap. 3 della guida + modello tridimensionale
- [[concepts/Sistemi informativi e di rete rilevanti]] — nuovo concept derivato dalla guida
- [[concepts/Clausole basate sul rischio]] — nuovo concept derivato dalla guida
- [[concepts/Evidenze documentali NIS]] — nuovo concept derivato dalla guida
- [[concepts/Misure di gestione del rischio cyber]] — mappatura art. 24 c.2 → codici misure (Appendice A)
- [[concepts/Responsabilità degli organi di gestione]] — 11 documenti da approvare (Appendice C)
- [[concepts/Approccio multi-rischio]] — confermato come fondamento degli incidenti

## Note dell'agente

- *Sintesi dell'agente:* la guida è il **meta-documento più importante** del corpo regolamentare NIS italiano oltre alla determinazione 379907 stessa. Senza di essa la determinazione è leggibile ma non operativa: la guida fornisce il **linguaggio interpretativo** (le 4 clausole, il concetto di "rilevanti", il modello tridimensionale degli incidenti) e la **mappa formale** verso la norma primaria (Appendice A).
- *Sintesi dell'agente:* per un percorso di transizione GRC, le Appendici A (mapping art. 24 → codici) e C (11 deliberazioni del board) sono le tabelle più direttamente spendibili: la prima è la "stele di Rosetta" tra norma e tecnica; la seconda è la check-list che un audit di compliance NIS userà come primo controllo.
- **Errata corrige di wiki**: la prima ondata di pagine (Wave 3) riportava "~26/~32 misure". La guida fissa **37/87 importanti, 43/116 essenziali**. Le pagine sono allineate in questa ingest.
- Lacuna nota: il contenuto preciso delle **funzioni-categorie-sottocategorie-requisiti** dell'edizione 2025 del Framework Nazionale resta da coprire con l'ingest del documento FNCDP_Edizione_2025_v2.1_Core (prossima ingest pianificata).
