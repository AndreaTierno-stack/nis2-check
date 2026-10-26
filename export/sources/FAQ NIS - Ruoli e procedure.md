---
title: FAQ NIS — Ruoli e procedure
type: source
scope: both
source_type: article
source_path: raw/articles/Domande frequenti NIS - Ruoli e procedure - ACN.pdf
url: https://www.acn.gov.it/portale/faq-nis-ruoli-e-procedure
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2026
date_ingested: 2026-04-29
tags: [NIS2, ACN, FAQ, ruoli, procedure, organi di amministrazione, punto di contatto, referente CSIRT, segreteria, operatori]
---

## TL;DR

FAQ ACN sui **ruoli organizzativi** e sulle **procedure operative** sul Portale dei Servizi ACN. Distingue 5 ruoli: **organi di amministrazione e direttivi (CDA o equivalente)**, **punto di contatto / sostituto pdc**, **referente CSIRT / sostituto**, **segreteria**, **operatori**. Catena di responsabilità: organi di amministrazione (art. 23 — responsabilità di legge non delegabile per indirizzo/pianificazione strategica, fermi restando artt. 2381 e 2392 c.c.) → punto di contatto (art. 4 Det. 379887/2025 — "cura" l'attuazione, non "responsabilità") → referente CSIRT (art. 7 Det. 379887/2025 — delega operativa per notifica incidenti, ex artt. 25 e 26 D.Lgs. 138/2024 + art. 2 c. 3 Det. 379907/2025). **Esternalizzazione**: vietata per pdc/sostituto (art. 4–5); ammessa per referente CSIRT (es. responsabile SOC/CERT esternalizzato, anche estero, dialogo CSIRT Italia in inglese ammesso). **Sovrapposizione pdc + referente CSIRT**: ammessa solo per organizzazioni piccole, con vincolo di internalità. **CDA**: solo i suoi componenti vanno elencati (non CISO, non pdc, non dirigenti sotto-CDA — salvo doppio incarico); PEC funzionale ammessa, PEC individuale auspicabile. **Segreteria + operatori**: facoltativi, supportano pdc/sostituto, **non possono trasmettere** comunicazioni perfezionative degli adempimenti. **Procedure**: censimento+associazione pdc/sostituto (PEC validazione domicilio digitale + delega caricata se non rappr. legale); pdc multi-organizzazione (gruppi imprese + PA + rappr. UE) tramite associazioni multiple e snodo "Scegli organizzazione"; credenziali personali per chi non può avere SPID/CIE (art. 8 c. 3 Det. 379887/2025); registrazione tardiva riaperta dal 14/04/2025; aggiornamento deleghe in "Documenti" del profilo. 28 codici (`ODA.1`..`10`, `PDC.1`..`7`, `RR.1`..`3`, `RCS.1`..`6`, `ELN.1`, `RET.1`, `ACC.1`, `DOC.1`).

## Punti chiave

### Organi di amministrazione e direttivi (`ODA.1`–`ODA.10`)

- **Definizione (`ODA.1`)**: organi che detengono il **potere di direzione** dell'organizzazione, **incluso il CDA** ove presente — art. 1 c. 1 lett. e) Det. ACN 379887/2025.
- **Chi va elencato (`ODA.2`)** ai fini art. 7 c. 4 lett. c) D.Lgs. 138/2024: le **persone fisiche responsabili ai sensi dell'art. 38 c. 5** D.Lgs. 138/2024 = i componenti degli organi di amministrazione e direttivi dei soggetti essenziali e importanti **ex art. 23**.
  - Sono questi a sovrintendere all'implementazione obblighi NIS ed essere responsabili per le violazioni.
  - **NON si elencano**: pdc/sostituto, CISO, responsabile sicurezza aziendale, altre figure apicali sotto-CDA (a meno che siano anche componenti del CDA).
- **Dirigenti (`ODA.3`)**: i dirigenti che **non fanno parte del CDA** non sono componenti degli organi di amministrazione e direttivi.
- **Tutti i membri (`ODA.4`)**: dove esiste un CDA, **tutti** i membri vanno elencati. CDA monocratico → la persona unica. Senza CDA → l'organo che svolge **funzioni analoghe**.
- **Senza CDA o CDA non direttivo (`ODA.5`)**: individuare l'organo con funzioni di **direzione, indirizzo e coordinamento** delle attività, anche tramite legge istitutiva e statuto. **Il rappresentante legale è sempre considerato** componente.
- **Estensione obbligo (`ODA.7`)**: tutti i soggetti NIS (essenziali + importanti).
- **Delega (`ODA.8`)**: sì, possibile delegare lo **svolgimento delle attività** finalizzate all'assolvimento art. 23 c. 1–2, ma resta in capo agli organi di amministrazione la **responsabilità di legge** per:
  1. approvare modalità implementazione misure (c. 1 lett. a);
  2. sovrintendere all'implementazione (c. 1 lett. b);
  3. essere responsabili delle violazioni (c. 1 lett. c);
  4. seguire formazione cybersecurity (c. 2 lett. a);
  5. promuovere formazione periodica per i dipendenti (c. 2 lett. b).
- **Limite della delega (`ODA.9`)**: la responsabilità ex art. 23 **non è delegabile** — sono obblighi di indirizzo e pianificazione strategica. Per le società restano fermi **artt. 2381 c.c. e 2392 c.c.** (responsabilità degli amministratori per culpa in vigilando).
- **Indirizzo PEC (`ODA.10`)**: PEC personale **non richiesta** (auspicabile). Ammessa **PEC funzionale** dell'organizzazione (domicilio digitale) o, se non disponibile, PEO aziendale.

### Punto di contatto + sostituto (`PDC.1`–`PDC.7`)

- **Chi può svolgerlo (`PDC.1`)** — art. 4 c. 2 Det. 379887/2025:
  - **rappresentante legale**;
  - **procuratore generale** censito sul registro delle imprese;
  - **dipendente delegato** del soggetto.
  - Riferisce direttamente al **vertice gerarchico** + organi di amministrazione e direttivi (c. 5).
  - Nessun requisito specifico di competenza nella disciplina NIS; può avvalersi di **competenze esterne** (senza delegare la funzione, ult. periodo art. 4 c. 2).
  - Possibile designare **personale di supporto** che opererà sul Portale.
- **Multi-organizzazione (`PDC.2`)**: in linea generale 1 persona = 1 organizzazione, ma deroghe:
  - **Gruppi di imprese** (c. 3): pdc può essere dipendente di **altra impresa NIS dello stesso gruppo**.
  - **PA** (c. 4): pdc può essere dipendente di **altra PA NIS**.
  - **Rappresentante UE in Italia** (art. 6 c. 4): può svolgere funzione di pdc.
  - **Procedura operativa**: ripetere associazione per ogni organizzazione (titolo giuridico opportuno); pulsante "**Associa nuova organizzazione**" → PEC validazione a ogni domicilio digitale → snodo "**Scegli organizzazione**" all'autenticazione + funzione "Cambia organizzazione".
- **Responsabilità (`PDC.3`)**: il pdc **NON ha "responsabilità"** degli adempimenti NIS — ne **"cura" l'attuazione** (art. 4 c. 1 Det. 379887/2025). Responsabilità in capo a CDA (artt. 23 e 38).
  - È la figura tramite cui l'**Autorità nazionale competente NIS** interloquisce con il soggetto.
- **Sostituto pdc (`PDC.4`)** — art. 5 Det. 379887/2025:
  - Designato con **stesse modalità** del pdc.
  - Supporta pdc, **interloquisce direttamente** con l'Autorità, può **eseguire le stesse azioni** del pdc sul Portale NIS/Aggiornamento annuale.
- **Censimento + associazione pdc (`PDC.5`)**:
  - Autenticazione SPID/CIE/credenziali → censimento (9 campi anagrafici).
  - **Associazione**: serve CF dell'organizzazione + (se non rappr. legale né procuratore generale) **caricamento titolo giuridico** della delega.
  - **Convalida tramite PEC** al domicilio digitale dell'organizzazione (procedura telematica indicata nella richiesta).
- **Censimento + associazione sostituto pdc (`PDC.6`)**:
  - **Invitato dal pdc** → CF + email del designato.
  - PEC al domicilio digitale per validare l'associazione + email al sostituto per **primo accesso** SPID/credenziali.
  - Sostituto deve confermare la designazione in **"Lista inviti"** del Portale.
- **Soggetti con rappresentante UE (`PDC.7`)**: oltre a rappr. legale / procuratore generale / dipendente delegato, il pdc può essere:
  - il **rappresentante NIS stesso** se persona fisica;
  - il **rappresentante legale / procuratore / dipendente** del rappresentante NIS se persona giuridica;
  - **Resta** la facoltà gruppo di imprese (art. 4 c. 3).

### Segreteria + operatori (`RR.1`–`RR.3`)

- **Segreteria (`RR.1`)** — figura facoltativa (la non-nomina va **manifestata esplicitamente**):
  - Persona fisica di **supporto** a pdc + sostituto.
  - Può **visualizzare e aggiornare** informazioni sui Servizi NIS.
  - **NON può effettuare azioni che determinano la trasmissione** di comunicazioni perfezionative degli adempimenti al domicilio digitale del soggetto o all'Autorità.
  - Designazione tramite invito da pdc/sostituto (CF + email) → email con **link valido 7 giorni** per registrazione SPID/credenziali → conferma in "Lista inviti".
  - **Associazione automatica**, senza documenti aggiuntivi.
- **Operatori (`RR.2`)** — art. 10 c. 1 Det. 379887/2025:
  - Una o più persone fisiche di supporto a pdc + sostituto.
  - **Stesse limitazioni** della segreteria (visualizzano + aggiornano, non trasmettono).
  - Designazione **facoltativa** — pdc/sostituto possono invitare ulteriori utenti con questo ruolo.
- **Esternalizzazione (`RR.3`)** — artt. 4 e 5 Det. 379887/2025:
  - **Pdc + sostituto pdc**: gli **unici ruoli che NON possono essere esternalizzati** (possono però avvalersi di personale esterno).
  - Tutti gli altri ruoli (referente CSIRT, segreteria, operatori) sono esternalizzabili.

### Referente CSIRT + sostituto (`RCS.1`–`RCS.6`)

- **Competenze e caratteristiche (`RCS.1`)** — art. 7 Det. 379887/2025:
  - Designato dal **pdc** per conto del soggetto NIS.
  - **Requisiti minimi**: competenze di base in sicurezza informatica + gestione incidenti + **conoscenza approfondita dei sistemi informativi e di rete** del soggetto.
  - **Organizzazioni complesse**: requisito soddisfatto tramite **modello operativo** che permette al referente CSIRT di disporre, anche indirettamente, attivando caso per caso personale preposto.
  - **Esternalizzazione AMMESSA** (auspicabile internalità ma non obbligatoria) — es. responsabile SOC/CERT o gestore IT esternalizzato.
  - **Sovrapposizione pdc + referente CSIRT**: ammessa per **organizzazioni di dimensioni contenute**, ma in tal caso la persona fisica deve **necessariamente essere interna** all'organizzazione.
- **Ruolo (`RCS.2`)** — art. 7 c. 2 Det. 379887/2025:
  - Interlocutore principale di **CSIRT Italia**.
  - Effettua **notifiche obbligatorie incidenti significativi** (art. 25 D.Lgs. 138/2024 + art. 2 c. 3 Det. 379907/2025) e **notifiche volontarie** (art. 26).
  - **Delega "operativa"**, non delega di responsabilità — la responsabilità resta in capo a CDA (art. 23).
  - Richiamo alla misura **`RS.MA-01`** ("Il piano di risposta agli incidenti è eseguito in coordinamento con le terze parti interessate una volta dichiarato un incidente") di All. 1 e 2 Det. 379907/2025: la misura permette di assicurare **circolarità informativa** tra IT/SOC/CERT, business e management/apicali, e processo decisionale efficace.
- **Esternalizzazione (`RCS.3`)** — confermato: ammessa, **nessuna limitazione di cittadinanza** del referente CSIRT.
  - **Lingua comunicazioni ufficiali**: italiano. Però **dialogo con CSIRT Italia ammesso anche in inglese**.
- **Sostituto referente CSIRT (`RCS.4`)**: stesse previsioni del referente CSIRT (FAQ RCS.1, RCS.2, RCS.3 si applicano).
- **Designazione (`RCS.5`)** — art. 7 Det. 379887/2025:
  - Designato dal pdc tramite la funzionalità **"Aggiornamento dati"** dei Servizi NIS sul Portale.
  - **Dal 20 novembre** [2025]: il pdc trova nuova sezione per inserimento dati referente CSIRT (CF + email) e suoi sostituti.
  - Referente CSIRT + sostituti devono accedere al Portale per completare il **censimento della propria utenza**.
  - **NON serve** caricare alcuna documentazione.
- **Chi può notificare incidenti (`RCS.6`)**:
  - **Referente CSIRT + sostituti** = principali interlocutori CSIRT Italia (preposti).
  - **Pdc + sostituto pdc** = possono anch'essi effettuare la notifica.

### Procedure (`ELN.1`, `RET.1`, `ACC.1`, `DOC.1`)

- **Mancata ricezione comunicazione di inserimento (`ELN.1`)**:
  - **12-13 aprile 2025**: trasmissione PEC art. 7 c. 3 ai domicili digitali di tutte le organizzazioni che hanno completato registrazione (censimento pdc + dichiarazione).
  - Per soggetti con PEC non recapitabili: contatto diretto da parte dell'**Autorità nazionale competente NIS**.
  - **Prima** di segnalare la mancata ricezione tramite Service Desk → **verifica approfondita** delle PEC ricevute al domicilio digitale.
- **Registrazione tardiva (`RET.1`)**:
  - Dal **14 aprile 2025** ri-attivato il servizio ACN/Registrazione sul Portale per consentire la **registrazione tardiva** alle organizzazioni che non l'hanno fatta entro il 28/02/2025.
- **Credenziali personali (`ACC.1`)** — art. 8 c. 3 Det. 379887/2025:
  - Per utenti che, **per normativa vigente**, non possono disporre di SPID/CIE.
  - Procedura: invio modulo richiesta firmato digitalmente + copia documento identificativo (passaporto preferibile, o CI nazionale, o documento autorità locali del Paese di appartenenza).
  - Richiesta inoltrata da **pdc o sostituto** tramite **Service Desk** ([https://portale.acn.gov.it/support/](https://portale.acn.gov.it/support/)) con oggetto "Richiesta credenziali personali".
  - ACN risponde con diniego motivato o con link per generazione credenziali (associate alla PEO indicata).
  - **Se la richiesta è per il pdc stesso**: documentazione inviata a **acn@pec.acn.gov.it** dalla PEC:
    1. del soggetto (se ha PEC propria);
    2. del **rappresentante UE in Italia** (se soggetto senza PEC + tenuto a designare rappresentante);
    3. del pdc del soggetto (se soggetto senza PEC + non tenuto a designare rappresentante UE).
- **Aggiornamento deleghe (`DOC.1`)**:
  - Pdc o sostituto pdc gestiscono le proprie deleghe in **"Documenti" → "Il mio profilo"**.
  - Aggiornamento → caricamento di una **nuova versione** del documento delega + documento identità del delegante (se delega non firmata digitalmente).
  - **Cronologia documentale** preservata: l'aggiornamento non elimina il documento precedente.

### Tabella riassuntiva ruoli

| Ruolo | Obbligatorio | Esternalizzabile | Trasmette comunicazioni | Notifica incidenti | Riferimento normativo |
|---|---|---|---|---|---|
| Componenti organi amministrazione/direttivi | Sì (elencazione) | — | — | — | art. 7 c. 4 lett. c, art. 23 D.Lgs. 138/2024 |
| Punto di contatto | **Sì** | **No** | **Sì** | Sì (anche pdc) | art. 4 Det. 379887/2025 |
| Sostituto pdc | Sì (designazione possibile) | **No** | Sì | Sì | art. 5 Det. 379887/2025 |
| Referente CSIRT | Sì (designazione obbligatoria) | **Sì** | — | **Sì (preposto)** | art. 7 Det. 379887/2025 |
| Sostituto referente CSIRT | No (facoltativo) | Sì | — | Sì | art. 7 Det. 379887/2025 |
| Segreteria | No (facoltativa, ma non-nomina esplicita) | Sì | **No** | No | RR.1 (FAQ) |
| Operatori | No (facoltativi) | Sì | **No** | No | art. 10 c. 1 Det. 379887/2025 |
| Rappresentante UE in Italia | Sì se art. 5 D.Lgs. 138/2024 | — | (può fare pdc) | (può fare pdc) | art. 6 Det. 379887/2025 |

## Citazioni rilevanti

> "Si tratta di obblighi di indirizzo e pianificazione strategica che, in quanto tali, non sono delegabili. È invece possibile la delega per lo svolgimento delle attività finalizzate all'attuazione dei predetti obblighi di cui all'articolo 23, commi 1 e 2 del decreto NIS. In tal caso, ai fini delle responsabilità, per le società, resta fermo quanto previsto dagli artt. 2381 c.c. e 2392 c.c.." — `ODA.9`.

> "Ai sensi dell'articolo 4, comma 1, della Determinazione ACN 379887/2025, il punto di contatto non ha la 'responsabilità' degli adempimenti di cui al decreto NIS, ma ne 'cura' l'attuazione." — `PDC.3`.

> "La designazione del referente CSIRT è una delega 'operativa' e non costituisce una delega di responsabilità, in quanto ai sensi dell'articolo 23 del Decreto NIS, in prima battuta, la responsabilità delle violazioni è posta in capo ai vertici (organi di amministrazione e direttivi)." — `RCS.2`.

> "Ai sensi della Determinazione ACN 379887/2025, articoli 4 e 5, le uniche figure che non possono essere esternalizzate sono il punto di contatto e il suo sostituto, i quali, possono avvalersi di personale esterno nell'espletamento delle proprie funzioni." — `RR.3`.

> "La piena attuazione di tale misura [`RS.MA-01`] consente al soggetto di poter assicurare la tempestiva circolarità informativa tra le figure necessarie per la gestione di un incidente sul piano tecnico (ad esempio, personale dell'IT e del SOC/CERT), di business e manageriale/apicale, nonché un efficace processo decisionale." — `RCS.2`.

## Entità menzionate

- [[entities/ACN]]
- [[entities/CSIRT Italia]]
- [[entities/Autorità nazionale competente NIS]]

## Concetti collegati

- [[entities/Punto di contatto NIS]]
- [[entities/Referente CSIRT]]
- [[concepts/Organi di amministrazione e direttivi]]
- [[concepts/Notifica di incidente significativo]]
- [[concepts/Portale dei Servizi ACN]]
- [[concepts/Piattaforma digitale ACN]]
- [[entities/Rappresentante NIS in Italia]]
- [[concepts/Sistemi informativi e di rete]]

## Note dell'agente

- **Catena di responsabilità tripartita** chiarita esplicitamente:
  - **CDA** (art. 23) = responsabilità di legge **non delegabile** (indirizzo + vigilanza, fermi artt. 2381/2392 c.c.).
  - **Pdc** (art. 4 Det. 379887/2025) = "**cura**" l'attuazione, non la "responsabilità" — figura di **interlocuzione** con l'Autorità competente.
  - **Referente CSIRT** (art. 7 Det. 379887/2025) = **delega operativa** per notifica incidenti — interlocutore CSIRT Italia.
- **Asimmetria di esternalizzazione** (`RR.3`): pdc/sostituto = **internalità rigida** (per radicamento giuridico nel soggetto); referente CSIRT, segreteria, operatori = **esternalità ammessa** (per ragioni operative). Il referente CSIRT esternalizzato può essere il **responsabile SOC/CERT** del fornitore IT — pattern realistico per PMI.
- **Sovrapposizione pdc + referente CSIRT** ammessa solo per piccole organizzazioni e con vincolo di internalità (smentisce il pattern "outsource everything" per le PMI).
- **PEC funzionale ammessa** per i componenti degli organi di amministrazione (`ODA.10`) — riduce il carico sui CdA che altrimenti dovrebbero attivare PEC individuali.
- **Pdc multi-organizzazione**: i casi ammessi (gruppi imprese, PA, rappr. UE) realizzano un'**economia di funzione** — utile per holding e per rappresentanti UE che servono più clienti extra-UE.
- **Operatori vs Segreteria**: differenza non chiara dalla FAQ — entrambi visualizzano/aggiornano ma non trasmettono. Probabilmente la segreteria è figura amministrativa unica, gli operatori figure tecniche multiple. *Inferenza dell'agente* da consolidare con altre fonti.
- La FAQ richiama **art. 2 c. 3 Det. 379907/2025** come base per le notifiche (oltre all'art. 25 D.Lgs. 138/2024) — coerente con la struttura della Det. misure di base.
- **Lingua delle comunicazioni**: l'apertura all'inglese per il dialogo con CSIRT Italia (`RCS.3`) è un'apertura operativa importante per il referente CSIRT esternalizzato a fornitori globali.
- Note di traduzione: caratteri accentati come `à è ò ù` resi come `�` nell'estratto.
