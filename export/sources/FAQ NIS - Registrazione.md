---
title: FAQ NIS — Registrazione
type: source
scope: both
source_type: article
source_path: raw/articles/Domande frequenti NIS - Registrazione - ACN.pdf
url: https://www.acn.gov.it/portale/faq-nis-registrazione
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2026
date_ingested: 2026-04-29
tags: [NIS2, ACN, FAQ, registrazione, autovalutazione, punto di contatto, gruppi imprese, rappresentante UE]
---

## TL;DR

FAQ ACN che descrive il **processo di autovalutazione in 3 passi (PDA1, PDA2, PDA3)** che ogni organizzazione deve svolgere per stabilire se è soggetto NIS, le **scadenze annuali di registrazione** sulla [[concepts/Piattaforma digitale ACN]] (28 febbraio in via generale; 17 gennaio 2025 per i fornitori "inerentemente transfrontalieri"), il rapporto registrazione ↔ elenco soggetti NIS (la qualifica di soggetto NIS è di diritto, indipendente dalla registrazione; l'elenco viene adottato entro il 31 marzo), i **criteri di designazione del [[entities/Punto di contatto NIS]]** (legale rappresentante / procuratore generale / dipendente delegato; per gruppi e PA, dipendente di altra entità del medesimo gruppo o di altra PA), l'elenco delle **informazioni necessarie alla registrazione** in 3 fasi (censimento pdc, associazione al soggetto, compilazione dichiarazione), le specificità per **gruppi di imprese** (codici fiscali capogruppo + collegate ex art. 3 c. 10 + valutazione del grado di indipendenza dei sistemi/servizi NIS dalle imprese collegate), la conferma che **la registrazione è per persona giuridica singola, mai a livello di gruppo**, e la **procedura per la designazione del rappresentante NIS in Italia** via PEC ad acn@pec.acn.gov.it. 10 codici (`REG.1`..`REG.10`).

## Punti chiave

### Processo di autovalutazione PDA1/2/3 (`REG.1`)

Le organizzazioni (diverse dalle PA) devono svolgere un'**autovalutazione in tre passi** *prima* di procedere con la registrazione:

#### PDA1 — Giurisdizione nazionale

- **PDA1.1** — Salvo eccezioni, se l'organizzazione è **stabilita sul territorio nazionale** la giurisdizione è italiana → procedere a PDA2.
- **PDA1.2** — *Prima eccezione* (art. 5 c. 1 lett. a) decreto NIS): **fornitori di reti pubbliche di comunicazione elettronica** e **servizi di comunicazione elettronica accessibili al pubblico**: se offrono il servizio sul territorio nazionale → registrazione obbligatoria, processo interrotto.
- **PDA1.3** — *Seconda eccezione* (art. 5 c. 1 lett. b)): **servizi inerentemente transfrontalieri** (DNS, registri TLD, registrazione nomi di dominio, cloud, data center, CDN, servizi gestiti, servizi di sicurezza gestiti, mercati online, motori di ricerca, social network). Soggetti alla giurisdizione nazionale se almeno una delle condizioni è vera:
  - stabilita in Italia e senza altri stabilimenti UE (gli stabilimenti extra-UE non rilevano);
  - stabilimenti in più SM e **stabilimento principale** in Italia (art. 5 c. 2): da individuarsi tra le sedi della **singola legal entity** — *non rilevano le imprese collegate* (cfr. art. 1 c. 1 lett. cc), Det. ACN 333017/2025);
  - nessuno stabilimento UE, ma offerta di servizi in Italia + designato il rappresentante UE in Italia (art. 5 c. 3).
- **PDA1.4** — Salvo PDA1.2/PDA1.3, organizzazioni non stabilite in Italia → fuori ambito, processo interrotto.

#### PDA2 — Dimensione (Raccomandazione 2003/361/CE)

- **PDA2.1** — Se l'organizzazione **supera i massimali di micro/piccola** ed è quindi media o grande impresa ai sensi della Racc. 2003/361/CE → procedere a PDA3. La FAQ non esplicita qui la regola di superamento (≥50 effettivi, oppure fatturato e bilancio entrambi oltre 10 M€): cfr. [[sources/FAQ NIS - Ambito]] `AMB.DI.1` e [[concepts/Size-cap rule]].
- **PDA2.2** — *Eccezione* di **identificazione indipendentemente dalla dimensione**: prestatori di servizi fiduciari, gestori registri TLD, fornitori DNS, fornitori servizi registrazione nomi di dominio → **registrazione obbligatoria a prescindere dalla dimensione**, processo interrotto.
- **PDA2.3** — Salvo PDA2.2, micro/piccole imprese → fuori ambito, processo interrotto.
- Per il calcolo dimensionale di soggetti con imprese collegate/associate o appartenenti a gruppo: vedi **art. 6 par. 2** dell'allegato alla Racc. 2003/361/CE (cfr. [[sources/FAQ NIS - Ambito]] AMB.DI.1..3).

#### PDA3 — Riconducibilità alle tipologie Allegati I/II

- **PDA3.1** — Se almeno **una** tipologia degli Allegati I/II è applicabile, **anche in forma residuale** → registrazione (eccezione: nei settori "Acqua potabile", "Acque reflue", "Gestione rifiuti" la **forma residuale non è eccezione** — la prevalenza non si applica).
- **PDA3.2** — In **caso di dubbio** anche su una sola tipologia → **opportuno** registrarsi (con la stessa eccezione settoriale della prevalenza).
- **PDA3.3** — Negativo per tutte → fuori ambito.

#### Casi speciali fuori PDA1/2/3

- Organizzazioni che si riconoscono **solo** nelle tipologie Allegato IV (settore Spazio): registrano **solo dopo aver ricevuto notifica di individuazione governativa** ex art. 3 c. 13.
- Organizzazioni che fanno parte di **gruppo di imprese** (collegate/associate) e che soddisfano i criteri art. 3 c. 10 D.Lgs. 138/2024: **rientrano indipendentemente dalla dimensione** (cfr. [[sources/FAQ NIS - Ambito]] AMB.GE.7).
- Resta sempre la **facoltà di identificazione governativa** ex art. 3 c. 9 (su proposta delle [[entities/Autorità di settore NIS]]) per soggetti operanti in settori/sottosettori/tipologie Allegati I-IV: notifica al domicilio digitale ex art. 3 c. 13.

### Scadenze di registrazione (`REG.2`)

- **Regola generale**: dal **1° gennaio al 28 febbraio** di ogni anno successivo all'entrata in vigore del decreto. Quindi prima scadenza: **28 febbraio 2025**.
- **Eccezione "inerentemente transfrontalieri"**: registrazione entro **17 gennaio 2025** per fornitori di servizi DNS, gestori registri TLD, fornitori servizi registrazione nomi di dominio, cloud, data center, CDN, servizi gestiti, servizi di sicurezza gestiti, mercati online, motori di ricerca, social network.

### Registrazione vs status di soggetto NIS (`REG.3`)

- I soggetti NIS sono tali **a prescindere dalla registrazione**: gli obblighi del decreto si applicano dall'inserimento nell'ambito di applicazione, e il primo obbligo è proprio la registrazione.
- La registrazione è sottoposta a **fase di analisi**: ACN, **entro il 31 marzo** di ogni anno, redige l'**elenco dei soggetti essenziali o importanti** d'intesa con le Autorità di settore, e nel **mese di aprile** notifica al domicilio digitale di tutti i soggetti registrati l'inserimento (o meno) nell'elenco.
- Funzione del processo: istituire un **canale di comunicazione diretto** ACN-soggetto e dare chiarezza sull'ambito di applicazione.

### Designazione del Punto di contatto (`REG.4`)

Ai sensi dell'**art. 4 della [Determinazione ACN n. 379887/2025](#)** (succeduta dalla [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]):

- **c. 2** — Le funzioni di pdc possono essere svolte da:
  - rappresentante legale;
  - **procuratore generale** censito sul registro delle imprese;
  - **dipendente delegato** del soggetto (deve caricare il titolo giuridico — modello ad hoc suggerito o delega più ampia preesistente).
- **c. 3** — *Gruppi di imprese*: pdc può essere il dipendente di **altra impresa NIS dello stesso gruppo**.
- **c. 4** — *Pubbliche amministrazioni*: pdc può essere il dipendente di **altra PA NIS** (in linea con la Legge 90/2024 sul referente per la cybersicurezza).

Compito: **curare l'attuazione del decreto NIS** per conto del soggetto, dalla registrazione in poi, e **interloquire con ACN**.

### Le 3 fasi della registrazione (`REG.5`)

#### 1) Censimento del punto di contatto

Dati anagrafici del pdc da fornire/verificare:
- nome e cognome, luogo e data di nascita, codice fiscale, cittadinanza, paese di residenza/domicilio;
- email ordinaria (preferibilmente individuale + di servizio);
- ove disponibile, **PEC** individuale + di servizio;
- numero di telefono individuale/di servizio + alternativo (se disponibile).

#### 2) Associazione del pdc al soggetto

- **Codice fiscale del soggetto** (o codice IPA per le PA).
- Se il pdc non è legale rappresentante né procuratore generale: caricamento del **titolo giuridico di delega**.

#### 3) Compilazione della dichiarazione

- elenco **codici ATECO** delle attività/servizi rilevanti;
- **normative europee settoriali** del decreto NIS che si applicano al soggetto;
- **n. dipendenti, fatturato, bilancio** (per imprese non autonome: calcolo ex art. 6 par. 2 Racc. 2003/361/CE);
- **tipologie di soggetto** Allegati I, II, III, IV applicabili;
- **autovalutazione**: essenziale / importante / fuori ambito (artt. 3 e 6 decreto NIS).

### Specificità per le PA Allegato III (`REG.6`)

- Le PA possono designare quale pdc il dipendente di **un'altra PA NIS** (Legge 90/2024).
- Se la stessa persona fisica è pdc per più PA NIS: **ripetere associazione + registrazione per ogni soggetto**.

### Specificità per i gruppi di imprese (`REG.7`)

#### Designazione del pdc nei gruppi

Due pattern operativi (governance decentralizzata vs centralizzata):
1. **Governance decentralizzata**: ogni soggetto del gruppo designa un proprio dipendente come pdc;
2. **Governance centralizzata**: tutti i soggetti del gruppo designano un dipendente della struttura centrale come pdc, *oppure* ognuno designa il proprio pdc che si coordina con la struttura centrale.

In entrambi i casi, se la stessa persona fisica è pdc per più soggetti del gruppo: **ripetere associazione + registrazione per ogni soggetto**.

#### Informazioni aggiuntive in dichiarazione

Per soggetti non-autonomi (art. 1 c. 1 lett. dd) Det. 379887/2025):
1. **CF + ragione sociale della capogruppo** (se il soggetto non è la capogruppo);
2. **CF + ragione sociale di tutte le imprese collegate** (art. 1 c. 1 lett. cc) Det. 379887/2025) che soddisfano almeno uno dei criteri **art. 3 c. 10** decreto NIS verso il soggetto;
3. **CF + ragione sociale di tutte le imprese collegate che siano a loro volta soggetti NIS** verso cui il soggetto soddisfa i criteri art. 3 c. 10;
4. **n. dipendenti / fatturato / bilancio** ai sensi della Racc. 2003/361/CE con applicazione art. 6 par. 2.

#### Clausola di sproporzione (proporzionalità calcolo dimensionale)

Se il soggetto ritiene **sproporzionata** l'applicazione dell'art. 6 par. 2 (somma con imprese collegate), deve fornire anche:
1. dimensioni **senza** applicare art. 6 par. 2;
2. **valutazione del grado di indipendenza** (totale/parziale/assente) dei sistemi informativi e di rete NIS rispetto alle imprese collegate;
3. **valutazione del grado di indipendenza** delle attività e servizi NIS rispetto alle imprese collegate;
4. risposta sì/in parte/no a 3 domande:
   - i sistemi info delle collegate concorrono ai sistemi NIS dell'organizzazione?
   - le attività delle collegate concorrono alle attività/servizi NIS dell'organizzazione?
   - le collegate sono essenziali nella catena di approvvigionamento (anche digitale)?

→ Questa clausola alimenta la **valutazione della [[concepts/Clausola di salvaguardia]]** (art. 12 Det. piattaforma).

### Registrazione per persona giuridica, non per gruppo (`REG.8`)

- Direttiva e decreto NIS si applicano alle **singole legal entity**: l'obbligo di registrazione va assolto **per ogni persona giuridica distintamente**, anche se appartenente al medesimo gruppo.
- Per i fornitori "inerentemente transfrontalieri" (art. 5 c. 2): lo **stabilimento principale** è da individuarsi tra le sedi della singola legal entity, **senza rilevanza delle imprese collegate** e relative sedi.

### Designazione del rappresentante NIS in Italia (`REG.9`)

Per organizzazioni **senza alcuno stabilimento UE** che svolgono i servizi inerentemente transfrontalieri ex art. 5 c. 1 lett. b) (cfr. PDA1.3):

- Se servizi offerti **solo** in Italia → **obbligatorio** designare il rappresentante in Italia.
- Se servizi offerti anche in altri SM → **facoltà** di designare in Italia o in altro SM.
- Se servizi **non** offerti in Italia → **non possibile** designare in Italia.

#### Procedura PEC (art. 6 Det. 379887/2025)

- PEC a **acn@pec.acn.gov.it**;
- Oggetto: *"NIS – Designazione Rappresentante nell'UE – [DENOMINAZIONE ORGANIZZAZIONE RICHIEDENTE]"*;
- Allegati: **Modulo_PF** (persona fisica) o **Modulo_PG** (persona giuridica) — compilato e firmato digitalmente dal legale rappresentante / procuratore generale dell'organizzazione designante; copia documento identificativo (passaporto preferibile, carta d'identità nazionale, altro);
- Indirizzo PEC del mittente: dell'**organizzazione designante** o (se sprovvista) del **rappresentante UE in Italia**;
- **Una PEC per ogni soggetto** se il rappresentante svolge il ruolo per più organizzazioni;
- ACN risponde entro **30 giorni** dalla ricezione: autorizzazione (a procedere con censimento e registrazione) o **diniego motivato**; possibili integrazioni richieste (art. 6 c. 3).

### Gruppi italiani che controllano società estere (`REG.10`)

- Le organizzazioni extra-UE riconducibili al gruppo italiano possono designare quale rappresentante UE in Italia **una delle imprese del gruppo stabilite in Italia**, **inclusa la capogruppo**.
- Sostanzialmente: se una società extra-UE del gruppo deve designare un rappresentante UE per offrire servizi in Italia, il gruppo italiano può funzionare come "infrastruttura di rappresentanza" interna.

## Citazioni rilevanti

> "Le pubbliche amministrazioni e i soggetti pubblici o privati che rientrano nell'ambito di applicazione del decreto legislativo 138/2024 (decreto NIS) sono soggetti NIS a prescindere dalla registrazione e sono pertanto tenuti a rispettare gli obblighi previsti dal relativo decreto, a partire dalla registrazione stessa." — `REG.3`.

> "PDA3.1. In caso affermativo anche per una sola tipologia di soggetto, anche qualora l'attività o il servizio siano svolti in forma residuale (fatta eccezione per i settori 'Acqua potabile', 'Acque reflue' e 'Gestione rifiuti'), è necessario procedere alla registrazione." — `REG.1`.

> "Gli adempimenti previsti dal decreto NIS, così come la Direttiva, sono relativi alle singole persone giuridiche che rientrano nell'ambito di applicazione. Pertanto, l'obbligo di registrazione deve essere assolto da ogni persona giuridica distintamente, anche se parte del medesimo gruppo." — `REG.8`.

## Entità menzionate

- [[entities/ACN]]
- [[entities/CSIRT Italia]]
- [[entities/Autorità di settore NIS]]
- [[entities/Punto di contatto NIS]]
- [[entities/Rappresentante NIS in Italia]]

## Concetti collegati

- [[concepts/Identificazione dei soggetti NIS]]
- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Size-cap rule]]
- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Piattaforma digitale ACN]]
- [[concepts/Clausola di salvaguardia]]
- [[concepts/Settori altamente critici e critici]]

## Note dell'agente

- *Sintesi dell'agente:* il processo PDA1/2/3 è il **vero algoritmo decisionale** del regime NIS in Italia: trasforma l'apparente complessità delle definizioni di Direttiva/decreto in tre check sequenziali che chiunque può eseguire. Merita una pagina **concept dedicata** ("Autovalutazione NIS (PDA1/2/3)") per essere referenziabile dalle altre pagine.
- L'eccezione settoriale **"Acqua potabile / Acque reflue / Gestione rifiuti"** è citata in PDA3.1 e PDA3.2 senza spiegazione: il punto è che in questi settori non vale la regola della "forma residuale" (cfr. [[sources/FAQ NIS - Ambito]] AMB.GE.4 — non-prevalenza). Aggancio incrociato esplicito.
- I riferimenti **"Determinazione ACN 333017/2025"** (PDA1.3) e **"Determinazione ACN 379887/2025"** (REG.4, REG.7, REG.8, REG.9) sono i **predecessori** della Det. ACN del 13 aprile 2026 di cui parla [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]. Le FAQ non sono ancora state aggiornate al protocollo 2026 ma le definizioni sono coerenti (l'art. 1 c. 1 lett. cc/dd/ee è stata mantenuta nella nuova determinazione).
- Lacuna nota: la FAQ non discute il **codice identificativo univoco** che ACN attribuisce dopo l'inserimento in elenco (art. 15 Det. piattaforma). Da chiarire in eventuale lint.
- Note di traduzione: caratteri "à è ò" appaiono come "�" nel testo estratto. Le citazioni qui trascritte ricostruiscono la corretta forma italiana.
