---
title: Determinazione ACN specifiche di base — 379907 — 2025-12-19
type: source
scope: both
source_type: article
source_path: raw/articles/detacn_obblighi_2511-v3_signed.pdf
url: https://www.acn.gov.it/portale/nis/normativa
author: Direttore generale ACN — Bruno Frattasi
date_published: 2025-12-19
date_ingested: 2026-04-29
tags: [NIS2, ACN, specifiche di base, misure sicurezza, incidenti, allegati 1-4, prima applicazione]
---

## TL;DR

Determinazione del Direttore generale ACN n. 379907 del 19 dicembre 2025, adottata ex art. 31 cc. 1-2 e art. 40 c. 5 lett. l), nonché ai fini dell'art. 42 c. 1 lett. c) del [[sources/D.Lgs. 138-2024 (Decreto NIS)]]. È la **determinazione tecnica centrale** della prima applicazione del regime NIS in Italia: stabilisce in **quattro allegati** (1 misure soggetti importanti, 2 misure soggetti essenziali, 3 incidenti significativi soggetti importanti, 4 incidenti significativi soggetti essenziali) le **specifiche di base** per gli obblighi degli artt. 23, 24, 25, 29 e 32 del decreto. Termini di adozione: 18 mesi per le misure, 9 mesi per la notifica. Aggiorna e sostituisce la Det. ACN n. 164179 del 14/04/2025. Applicazione dal 15 gennaio 2026.

> **Meta-documento interpretativo**: la lettura coerente della determinazione e dei suoi 4 allegati passa per la [[sources/Guida lettura specifiche di base|Guida alla lettura specifiche di base]] (settembre 2025, ed. 2.1 aprile 2026), approvata dal Tavolo NIS il 10/04/2025, che fissa: conteggi esatti (**37 misure / 87 requisiti** importanti, **43 / 116** essenziali), le 4 [[concepts/Clausole basate sul rischio|clausole basate sul rischio]], il concetto di [[concepts/Sistemi informativi e di rete rilevanti|sistemi rilevanti]], il modello tridimensionale degli incidenti (condizione/compromissione/oggetto), la mappatura art. 24 c.2 → codici misure (Appendice A guida), gli 11 documenti che richiedono approvazione del board (Appendice C guida).

## Punti chiave

- **Base giuridica**: artt. 31 cc. 1-2 + 40 c. 5 lett. l) + 42 c. 1 lett. c) decreto NIS. Il principio rettore è la **proporzionalità** rispetto a esposizione ai rischi, dimensione, probabilità e gravità degli incidenti, impatto sociale ed economico.
- **Iter di adozione**: presentata al Tavolo NIS nella II plenaria del 28/01/2025; condivisa con Autorità di settore e associazioni di categoria via tavoli settoriali; **procedura di informazione UE ex Direttiva 2015/1535 esperita l'11/11/2025**; sentito il Tavolo nella riunione del 18/12/2025.
- **Quattro allegati**, parte integrante della determinazione (art. 2):
  - **Allegato 1** — misure di sicurezza di base per soggetti **importanti**.
  - **Allegato 2** — misure di sicurezza di base per soggetti **essenziali**.
  - **Allegato 3** — incidenti significativi di base per soggetti **importanti**.
  - **Allegato 4** — incidenti significativi di base per soggetti **essenziali**.
- **Definizioni chiave** (art. 1):
  - **Misure di sicurezza di base**: specifiche per gli obblighi degli artt. 23 e 24, sviluppate **in accordo al Framework Nazionale** per la Cybersecurity e la Data Protection (edizione 2025) e organizzate in funzioni, categorie, sottocategorie e requisiti.
  - **Incidenti significativi di base**: specifiche che descrivono gli incidenti significativi ex art. 25.
  - **Sistemi informativi e di rete rilevanti**: sistemi la cui compromissione comporterebbe un **impatto significativo su riservatezza, integrità, disponibilità** delle attività e dei servizi NIS.
  - **Soggetti PSNC-NIS**: soggetti ex art. 1 c. 2-bis del [[D.L. 105-2019 (perimetro)]] che sono anche soggetti NIS.
  - **Operatori di servizi essenziali (OSE)**: soggetti già identificati ai sensi del [[D.Lgs. 65-2018]] (NIS1) prima dell'entrata in vigore del decreto NIS.
  - **Operatori telco**: soggetti che forniscono reti pubbliche di comunicazione elettronica o servizi accessibili al pubblico ex D.Lgs. 259/2003 con utenza ≥ 1% della base nazionale (Osservatorio AGCom) o ≥ 1 milione di utenti.
- **Termini di adozione** (art. 3):
  - Adozione delle **misure di sicurezza di base** (all. 1 e 2): **18 mesi** dalla ricezione della comunicazione di inserimento nell'elenco dei soggetti NIS.
  - Adempimento dell'obbligo di **notifica degli incidenti significativi di base** (all. 3 e 4): **9 mesi** dalla ricezione della comunicazione di inserimento.
- **DNS — sicurezza, stabilità e resilienza** (art. 4): per gestori di registri TLD e fornitori di servizi di registrazione, **18 mesi** dalla comunicazione di inserimento per:
  - adeguarsi all'art. 29 cc. 1-2 decreto NIS;
  - adottare e rendere pubbliche le politiche e procedure ex art. 29 c. 3;
  - adottare politiche di sicurezza coerenti con l'allegato 1 (art. 32 c. 3).
  - **Tutte queste politiche sono approvate dagli organi di amministrazione e direttivi**.
- **Regime transitorio OSE** (art. 5): gli OSE NIS1, **limitatamente ai sistemi informativi e di rete OSE**, mantengono le **misure tecniche e organizzative già adottate** ai sensi del D.Lgs. 65/2018, salvo contrasti con il decreto NIS.
- **Regime transitorio telco** (art. 6 cc. 1-2): gli operatori telco, **limitatamente ai sistemi telco critici**, mantengono le misure di sicurezza/integrità già adottate ai sensi del **DM 12/12/2018**. Inoltre, ai fini dell'obbligo di notifica ex art. 25 e nella definizione del livello di servizio atteso (all. 3 e 4), gli operatori telco considerano come **incidenti significativi di base almeno**:
  - durata > 1 ora e impatto utenti > 15%;
  - durata > 2 ore e impatto utenti > 10%;
  - durata > 4 ore e impatto utenti > 5%;
  - durata > 6 ore e impatto utenti > 2%;
  - durata > 8 ore e impatto utenti > 1%.
- **Disposizioni finanziarie**: nessun nuovo onere.
- **Sostituzione**: aggiorna e sostituisce la **Determinazione ACN n. 164179 del 14 aprile 2025** (la prima versione delle specifiche di base, che resta importante per la storia regolatoria).
- **Applicazione**: dal **15 gennaio 2026**.

## Citazioni rilevanti

> "Le misure di sicurezza di base, a carico degli organi di amministrazione e direttivi e in materia di misure di gestione dei rischi per la sicurezza informatica, sono stabiliti: a) per i soggetti importanti, nell'allegato 1; b) per i soggetti essenziali, nell'allegato 2." — art. 2 c. 2.

> "Il termine per l'adozione delle misure di sicurezza di base di cui agli allegati 1 e 2 è fissato in diciotto mesi dalla ricezione, da parte del soggetto NIS della comunicazione di inserimento nell'elenco dei soggetti NIS." — art. 3 c. 1.

> "Il termine per l'adempimento dell'obbligo di notifica degli incidenti significativi di base descritti negli allegati 3 e 4 è fissato in nove mesi dalla ricezione […] della comunicazione di inserimento nell'elenco dei soggetti NIS." — art. 3 c. 2.

## Entità menzionate

- [[entities/ACN]]
- [[entities/Tavolo per l'attuazione della disciplina NIS]] — sentito il 18 dicembre 2025
- [[entities/Framework Nazionale per la Cybersecurity]] — base metodologica delle misure
- [[entities/Autorità di settore NIS]] — coinvolte tramite tavoli settoriali
- [[entities/Comitato Interministeriale per la Cybersicurezza]] (implicito — perimetro PSNC)

## Concetti collegati

- [[concepts/Specifiche tecniche di base]]
- [[concepts/Misure di gestione del rischio cyber]]
- [[concepts/Notifica di incidente significativo]]
- [[concepts/Incidente significativo]]
- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Responsabilità degli organi di gestione]]
- Regime transitorio OSE/NIS1
- Regime transitorio telco
- Soggetti PSNC-NIS

## Note dell'agente

- Questa è **la** determinazione di riferimento per la cybersicurezza operativa NIS in Italia. Le altre 7 ruotano intorno: la det. piattaforma fissa il "come si registra"; la det. categorizzazione fissa il "come si pesano i servizi"; la det. soggetti 2026 fissa "quando devono adempiere i nuovi entrati"; la det. funzionamento Tavolo organizza il foro che la valida.
- La **distinzione misure importanti / essenziali** è interna al testo (allegati 1 vs 2): si presume che i soggetti essenziali abbiano misure più stringenti — ma questa pagina non vede gli allegati testuali (Wave 3).
- Le **soglie telco** sono identiche a quelle del Reg. UE 2018/1972 sui servizi di comunicazione elettronica e del DM 12/12/2018 — coerenza intenzionale con il preesistente.
- *Sintesi dell'agente:* l'esperimento della procedura UE 2015/1535 (notifica progetti regolatori tecnici) è prova che ACN ha trattato gli allegati come **regola tecnica nazionale rilevante per il mercato unico digitale** — implica trasparenza verso UE/altri SM.
- Lacuna nota: il **contenuto preciso** delle 4 specifiche tecniche (struttura "funzioni, categorie, sottocategorie, requisiti" derivata dal Framework Nazionale) sarà coperto in Wave 3 (lettura degli allegati).
