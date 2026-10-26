---
title: FAQ NIS — Misure di sicurezza e notifica di incidenti
type: source
scope: both
source_type: article
source_path: raw/articles/Domande frequenti NIS - Misure di sicurezza e notifica di incidenti - ACN.pdf
url: https://www.acn.gov.it/portale/faq-nis-misure-di-sicurezza-e-notifica-di-incidenti
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2026
date_ingested: 2026-04-29
tags: [NIS2, ACN, FAQ, misure di sicurezza, notifica, incidenti, fornitori, cloud]
---

## TL;DR

FAQ ACN che applica operativamente la [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]] sui due fronti **misure di sicurezza di base** e **notifica di incidenti significativi di base**. Documenta la **transizione** dalla Det. ACN n. 164179 del 14 aprile 2025 alla Det. 379907/2025 del 19 dicembre 2025 (applicabile dal **15 gennaio 2026**), incluso il completamento della **notifica TRIS** (standstill chiuso 11/11/2025) e il fine-tuning delle misure (`DSB.1`). Conferma chi adotta le misure (chi ha ricevuto comunicazione di inserimento), quali (Allegato 1 importanti / Allegato 2 essenziali), entro quando (18 mesi coorte 2025; 31 luglio 2027 coorte 2026), come sono strutturate (codice + descrizione + requisiti, ancorati alle sottocategorie del [[entities/Framework Nazionale per la Cybersecurity]]), il significato di "**sistemi informativi e di rete rilevanti**" (facoltà di limitare ai sistemi la cui compromissione ha impatto significativo CIA), il modello di **valutazione del rischio ID.RA-05** (libero), le **due tipologie di specifiche** (amministrative + tecniche), le **evidenze documentali** (elenchi/inventari/piani/politiche/procedure/registri). Sulla notifica: **24h pre-notifica + 72h notifica** (no causa rilevante, multi-rischio), 4 fattispecie IS-1..4 con focus CIA + abuso privilegi (`ISB.G.1..5`), e regole di **ripartizione dell'obbligo nelle forniture** cliente vs fornitore vs cloud (`ISB.F.1..3`). 19 codici.

## Punti chiave

### Aggiornamento Det. 164179/2025 → Det. 379907/2025 (`DSB.1`)

- **Det. ACN n. 379907/2025 del 19 dicembre 2025** (applicabile dal **15 gennaio 2026**) **aggiorna** la **Det. ACN n. 164179 del 14 aprile 2025**.
- **Notifica TRIS** (Direttiva 2015/1535) perfezionata: **standstill concluso l'11 novembre 2025**.
- Le previsioni transitorie su obbligo di notifica per **OSE** e **operatori telco** restano in vigore fino al **14 gennaio 2026**, poi abrogate dalla disciplina generale dal **15 gennaio 2026**.
- **Affinamenti** introdotti (estratto):
  - `GV.SC-04`: stessa formulazione delle altre misure su forniture con potenziali impatti sulla sicurezza.
  - `ID.RA-06`: piano di **trattamento dei rischi** per la sicurezza informatica (specificato).
  - Configurazione sistemi perimetrali "**in modo adeguato**".
  - Conservazione log "**acquisiti**" (specificato).
  - Inclusione "**ivi incluse le esigenze di continuità/ripristino**" nei piani (richiamo `PR.DS-11`).
  - Rimossi riferimenti a 3 punti (`PR.IR-01` p.1, `DE.CM-01` p.2, `DE.CM-01` p.6) nei requisiti dove richiesta documentazione di procedure.
  - Termini: "**riservatezza**" al posto di "confidenzialità"; "**dei servizi**" al posto di "servizi"; "**soluzioni di autenticazione multifattore**"; "**punti terminali (endpoint)**"; "**gestione delle crisi informatiche**".
  - **Inclusione referente CSIRT** + sostituti nell'organizzazione di sicurezza informatica (`GV.RR-02`).
  - Clausola "**in accordo agli esiti della valutazione del rischio**" su `PR.DS-11` p.4 (verifica backup) e `PR.PS-02` p.1 (installazione SW con aggiornamenti di sicurezza).
  - Politiche **rese note alle articolazioni competenti** del soggetto NIS (need-to-know).

### Misure di sicurezza di base (`MSB.1`..`MSB.11`)

#### Destinatari, oggetto, termini

- **Destinatari** (`MSB.1`): tutti i soggetti che hanno ricevuto la **comunicazione di inserimento** nell'elenco nazionale dei soggetti NIS.
- **Oggetto** (`MSB.2`):
  - Soggetti **importanti** → [[sources/Allegato 1 - Misure di sicurezza di base per i soggetti importanti]] della Det. 379907/2025.
  - Soggetti **essenziali** → [[sources/Allegato 2 - Misure di sicurezza di base per i soggetti essenziali]] della medesima determinazione.
- **Termini** (`MSB.3`):
  - Coorte **2025**: **18 mesi** dalla ricezione della comunicazione.
  - Coorte **2026**: entro **31 luglio 2027** (cfr. [[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]).

#### Inquadramento "di base" (`MSB.4`)

- "Di base" = misure di prima applicazione ex **art. 42 decreto NIS**. La fase di prima applicazione si è conclusa il **31 dicembre 2025**.
- I termini differenziati per coorte 2025/2026 sono espressione del **principio di proporzionalità e gradualità** ex artt. 23, 24, 25, 27, 28, 29 D.Lgs. 138/2024.

#### Struttura delle misure (`MSB.5`)

Ogni misura ha:
- **codice identificativo** + **descrizione** → riferimento alle **sottocategorie** del [[entities/Framework Nazionale per la Cybersecurity]] (FNCDP edizione 2025);
- **uno o più requisiti** che specificano cosa serve per implementare la misura.

#### Adottare = implementare tutti i requisiti (`MSB.6`)

L'"adozione" comporta **l'implementazione di tutti i requisiti** delle misure di sicurezza previste per i soggetti NIS.

#### "Sistemi informativi e di rete rilevanti" (`MSB.7`)

- **Default**: le misure si applicano a **tutti** i sistemi informativi e di rete del soggetto (definizione: art. 2 c. 1 lett. p) decreto NIS).
- **Eccezione di scoping**: dove il requisito (o parte di esso) contiene la dicitura "*per almeno i sistemi informativi e di rete rilevanti*", il soggetto NIS può **limitare l'ambito** ai sistemi la cui compromissione comporterebbe **impatto significativo su confidenzialità, integrità, disponibilità (CIA)** delle attività e servizi NIS.

#### "Forniture con potenziali impatti sulla sicurezza" (`MSB.8`)

- Sono le forniture la cui **compromissione** può determinare effetti sulla capacità dei sistemi di **resistere** (con un determinato livello di affidabilità) ad eventi che compromettono **CIA + autenticità** dei dati e dei servizi.

#### Modello per la valutazione del rischio `ID.RA-05` (`MSB.9`)

- **Nessuno standard imposto**: il soggetto NIS può usare il modello già in uso o quello che ritiene più appropriato.

#### Tipologie di specifiche dei requisiti (`MSB.10`)

- **Amministrative**: gestione, organizzazione, documentazione, controllo (politiche, piani, procedure).
- **Tecniche**: strumenti tecnologici (cifratura, aggiornamento SW, MFA).

#### Evidenze documentali (`MSB.11`)

| Tipo | Esempi | Note |
|---|---|---|
| **Elenchi** | personale dell'organizzazione di sicurezza informatica; configurazioni di riferimento (**solo essenziali**); sistemi accessibili da remoto | |
| **Inventari** | apparati fisici, servizi, sistemi e applicazioni SW, **flussi di rete (solo essenziali)**, servizi erogati dai fornitori, fornitori | |
| **Piani** | gestione del rischio, **business continuity + disaster recovery**, trattamento del rischio, gestione vulnerabilità, adeguamento, valutazione efficacia misure (**solo essenziali**), formazione, risposta agli incidenti | |
| **Politiche** | per i requisiti elencati nella **Tabella 1** in appendice agli Allegati 1 (importanti) e 2 (essenziali) | 16 ambiti |
| **Procedure** | per gli specifici requisiti che le richiedono | |
| **Registri** | esiti riesame politiche, attività di formazione, manutenzioni effettuate | |

- **Organizzazione libera**: documenti unici o multipli, cartacei o digitali, purché **fruibili** e **aggiornati** allo stato di fatto.

### Incidenti significativi di base — generali (`ISB.G.1`..`ISB.G.5`)

#### Quali incidenti notificare (`ISB.G.1`)

- ACN definisce **quattro fattispecie** (3 per tutti i soggetti + 1 ulteriore per i soli essenziali) che, se si verificano, sono **incidenti significativi**.
- Riferimenti: [[sources/Allegato 3 - Incidenti significativi di base per i soggetti importanti]] (3 codici) + [[sources/Allegato 4 - Incidenti significativi di base per i soggetti essenziali]] (4 codici).
- Resta sempre la **facoltà** di notifica volontaria di incidenti non significativi, **quasi-incidenti**, **minacce informatiche**.

#### La causa è irrelevante (`ISB.G.2`)

- L'obbligo di notifica scatta indipendentemente dalla causa: **eventi naturali** (alluvione), **accidentali** (malfunzionamenti), **antropici** (errore umano).
- Coerente con l'**[[concepts/Approccio multi-rischio]]** della Direttiva NIS2: rischi da "tutte le tipologie di minaccia ai sistemi informativi e di rete e al loro contesto fisico" (furti, incendi, inondazioni, interruzioni di telco/corrente, accessi fisici non autorizzati).

#### Termine per l'obbligo (`ISB.G.3`)

- Coorte **2025**: **9 mesi** dalla ricezione della comunicazione di inserimento.
- Coorte **2026**: dal **1° gennaio 2027**.

#### Tempistica della notifica (`ISB.G.4`)

- **Pre-notifica**: senza ingiustificato ritardo, **non oltre 24 ore** da quando il soggetto, **a valle di analisi anche sommaria**, dispone degli **elementi oggettivi** che fanno emergere una delle fattispecie IS-1..4.
- **Notifica completa**: senza ingiustificato ritardo, **non oltre 72 ore** dopo la pre-notifica, con elementi informativi aggiuntivi raccolti.
- L'evidenza dell'incidente proviene da: segnalazioni esterne (es. [[entities/CSIRT Italia]]), segnalazioni interne (utente che riporta a help desk), **monitoraggio** (eventi di sicurezza o malfunzionamenti rilevati dai sistemi).

#### Tassonomia IS-1..4 (`ISB.G.5`)

- **IS-1** — violazione di **riservatezza** dei servizi e delle attività del soggetto NIS.
- **IS-2** — violazione di **integrità** dei servizi e delle attività.
- **IS-3** — violazione di **disponibilità** (prevalentemente).
- **IS-4** — **accesso non autorizzato** o con **abuso dei privilegi** concessi (solo essenziali).

> [!note] Il "di base" qui ha la stessa logica delle misure: prima applicazione ex art. 42, principio di proporzionalità, termini differenziati per coorte 2025/2026.

### Incidenti significativi nelle forniture (`ISB.F.1`..`ISB.F.3`)

#### Caso 1 — Incidente sui sistemi del cliente NIS, fornitore esterno (`ISB.F.1`)

- **Obbligo notifica al CSIRT Italia in capo al cliente NIS**.
- Esempi: SOC gestito, manutenzione HVAC.
- Il cliente potrà **coinvolgere il fornitore** nella gestione dell'incidente.
- Misura **`GV.SC-01`**: il cliente NIS è tenuto ad assicurarsi che il fornitore **segnali tempestivamente** eventi di sicurezza con impatto sui servizi del cliente.

#### Caso 2 — Incidente sui sistemi del fornitore NIS che eroga servizi al cliente NIS (`ISB.F.2`)

- **Obbligo in capo al fornitore NIS**.
- **Anche al cliente NIS** se l'incidente si configura come significativo anche per i servizi/attività del cliente.
- Esempio: amministrazione di un BMS (Building Management System) con impatto sul cliente.
- Rinvio: art. 25 cc. 9 e 10 decreto NIS per gli obblighi del fornitore NIS verso i destinatari dei propri servizi.

#### Caso 3 — Incidente in servizi cloud (`ISB.F.3`)

- **Default**: obbligo **in capo a entrambi** (cliente NIS + fornitore NIS).
- **Eccezione**: se il servizio cloud è di tipo **IaaS** (infrastructure as a service) o **hosting dell'infrastruttura del cliente** → obbligo **solo del cliente NIS**.
- Anche qui: misura **`GV.SC-01`** sull'obbligo informativo del fornitore.

#### Sintesi tabellare

| Sistemi compromessi | Servizio | Notifica cliente | Notifica fornitore |
|---|---|---|---|
| del cliente NIS | servizi gestiti dal fornitore | **sì** | no |
| del fornitore NIS | servizi al cliente NIS | sì *se significativo per il cliente* | **sì** |
| del cliente NIS | cloud (default — SaaS/PaaS) | **sì** | **sì** |
| del cliente NIS | cloud **IaaS / hosting infrastruttura** | **sì** | no |

## Citazioni rilevanti

> "Il termine per l'adozione delle misure di sicurezza di base si configura differentemente a seconda che il soggetto sia stato inserito nell'elenco dei soggetti NIS per la prima volta nel corso dell'anno solare 2025 o dell'anno solare 2026." — `MSB.3`.

> "La causa dell'incidente non è rilevante per determinare se si tratta di un incidente significativo o meno. Pertanto, rientrano nell'obbligo di notifica anche gli incidenti significativi dovuti a eventi naturali (e.g., alluvione) o accidentali (i.e., malfunzionamenti), e quelli di natura antropica (e.g. errore umano)." — `ISB.G.2`.

> "Nel caso di specie, l'obbligo di notifica al CSIRT Italia è in capo sia al soggetto NIS cliente che al soggetto NIS fornitore, ad eccezione del caso in cui il servizio cloud erogato sia di tipo IAAS (infrastructure as a service) o di hosting dell'infrastruttura del cliente. In tali fattispecie l'obbligo è pertanto in capo al solo soggetto NIS cliente." — `ISB.F.3`.

## Entità menzionate

- [[entities/ACN]]
- [[entities/CSIRT Italia]]
- [[entities/Framework Nazionale per la Cybersecurity]]
- [[entities/Referente CSIRT]]

## Concetti collegati

- [[concepts/Misure di sicurezza di base]]
- [[concepts/Misure di gestione del rischio cyber]]
- [[concepts/Approccio multi-rischio]]
- [[concepts/Notifica di incidente significativo]]
- [[concepts/Incidente significativo]]
- [[concepts/Incidenti significativi di base]]
- [[concepts/Specifiche tecniche di base]]
- [[concepts/Regime transitorio OSE]]
- [[concepts/Regime transitorio telco]]
- [[concepts/Processo gestione incidenti NIS]]

## Note dell'agente

- *Sintesi dell'agente:* la FAQ è di fatto la **rosetta operativa** della Det. 379907/2025: ne traduce gli articoli in domande pratiche e fissa lo **scoping** ("rilevanti", "forniture con potenziali impatti", "evidenze documentali") che la determinazione lascia al testo normativo.
- L'**`MSB.7`** — facoltà di limitare ai "rilevanti" — è il principale strumento di proporzionalità del soggetto NIS: chi ha più sistemi ma pochi davvero critici per i servizi NIS, può ridurre il perimetro effettivo dell'obbligo (criterio CIA + impatto significativo). Da segnalare come **vero "size-cap" interno**.
- Le tre regole `ISB.F.1`/`ISB.F.2`/`ISB.F.3` configurano una **matrice di responsabilità** semplice: la notifica segue **dove è successo l'incidente** (sui sistemi di chi), con eccezione cloud (responsabilità condivisa, salvo IaaS).
- Il riferimento `[CB2.1]` e `[CB3.1]` nel testo originale (`ISB.G.1`) sembra un artefatto di redazione / commento residuo del processo di review (probabilmente review di Beatrice o coautore con iniziali CB). Da ignorare.
- Note di traduzione: caratteri "à è ò ù" appaiono come "�" nel testo estratto. Le citazioni qui trascritte ricostruiscono la corretta forma italiana.
