---
title: FAQ NIS — Aggiornamento delle informazioni
type: source
scope: both
source_type: article
source_path: raw/articles/Domande frequenti NIS - Aggiornamento delle informazioni - ACN.pdf
url: https://www.acn.gov.it/portale/faq-nis-aggiornamento-delle-informazioni
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2026
date_ingested: 2026-04-29
tags: [NIS2, ACN, FAQ, aggiornamento annuale, IP pubblici, nomi di dominio, accordi condivisione, fornitori rilevanti, CPV]
---

## TL;DR

FAQ ACN sull'**aggiornamento delle informazioni** ex art. 7 cc. 4-7 D.Lgs. 138/2024. Sei cluster (`AGA` aggiornamento annuale, `EDS` elenco servizi UE, `SIT` sedi UE + rappresentante, `IPD` indirizzi IP + domini, `ACI` accordi condivisione, `FRN` fornitori rilevanti). Conferma la **finestra annuale 15 aprile - 31 maggio** + **aggiornamento continuo entro 14 giorni** dalla modifica; elenca i **7 passaggi** dell'aggiornamento annuale (sostituto pdc → anagrafica → organi di amministrazione → segreteria → servizi UE → IP/domini → accordi di condivisione); precisa che l'**obbligo è per legal entity** (ogni soggetto del gruppo distintamente); definisce **IP pubblici statici** e **nomi di dominio** in uso/disponibilità via contratti con ISP/RIR/registrar (anche infragruppo, anche extra-UE — la localizzazione fisica delle filiali non rileva); chiarisce gli **accordi di condivisione ex art. 17 c. 2 NIS** (definiti dall'art. 1 c. 1 lett. kk) Det. 379887/2025) e l'allineamento del termine di adeguamento a **ottobre 2026**; identifica **8 categorie di servizi di sicurezza informatica** che si configurano come accordi notificabili (NOC, MDR, SOC, CSOC, CERT, VA/PT, Red Teaming, Cyber Threat Intel); cita esplicitamente la **Determinazione ACN 127437/2026** come **norma di disciplina dei fornitori rilevanti NIS** (art. 1 c. 1 lett. ll + art. 18); fornisce le **tabelle CPV** (Reg. CE 2195/2002) per le forniture rilevanti raggruppate in **non-fungibili** (connettività, energia elettrica) e **ICT** (infrastrutture digitali + MSP/MSSP). 29 codici.

## Punti chiave

### Aggiornamento annuale (`AGA.1`..`AGA.5`)

#### Termini (`AGA.1`)

- **Aggiornamento annuale** ex art. 7 cc. 4 e 5 NIS: entro il **31 maggio** di ogni anno, tramite "Servizio NIS / Aggiornamento annuale informazioni".
- **Aggiornamento continuo** ex art. 7 c. 7: tempestivo, comunque **entro 14 giorni** dalla modifica, tramite "Servizio NIS / Aggiornamento continuo informazioni".

#### 7 passaggi (`AGA.2`)

L'art. 16 della **Det. ACN 379887/2025** disciplina i passaggi:

1. **Invitare il sostituto pdc** (cfr. [[entities/Punto di contatto NIS]]).
2. **Verifica anagrafica del soggetto NIS**: codice fiscale, denominazione, sede legale, rappresentante legale, procuratori generali, telefono, **domicilio digitale**, email funzionale.
3. **Elencare i componenti degli organi di amministrazione e direttivi** ex art. 38 c. 5 (responsabili).
4. **Invitare la segreteria** (se opportuno).
5. **Servizi NIS in UE**: elenco servizi NIS che il soggetto offre nell'UE + indicazione SM (cfr. cluster `EDS`).
6. **IP statici pubblici e nomi di dominio** in uso/disponibilità (cfr. cluster `IPD`).
7. **Accordi di condivisione delle informazioni** (cfr. cluster `ACI`).

Inoltre: pdc + sostituto verificano i propri dati anagrafici/contatti; il pdc verifica che la **delega** sia conforme all'art. 4 della determinazione.

I soggetti ex **art. 7 c. 5** (con servizi inerentemente transfrontalieri) e ex **art. 5 c. 1 lett. b)** condividono ulteriori informazioni su sedi UE + rappresentante NIS in Italia (cfr. cluster `SIT`).

#### Finestra (`AGA.3`)

- L'art. 16 Det. 379887/2025 fissa la **finestra 15 aprile - 31 maggio** per l'aggiornamento annuale ex art. 7 cc. 3 e 4.
- Continuo nel tempo ex art. 7 c. 7.

#### Destinatari (`AGA.4`)

- **Tutti i soggetti NIS** essenziali e importanti.
- L'art. 38 cc. 10 e 13 prevede che la **mancata registrazione non solleva** dall'obbligo di aggiornamento annuale.

#### Procedura (`AGA.5`)

- Servizio NIS / Aggiornamento annuale visibile **solo** agli utenti associati a soggetti che hanno ricevuto comunicazione di inserimento ex art. 7 c. 3 lett. a).

### Elenco dei servizi in UE (`EDS.1`..`EDS.3`)

- **Tutti i soggetti NIS** elencano gli SM in cui erogano servizi NIS (`EDS.1`).
- Sono "servizi NIS" tutti i servizi riconducibili alle tipologie Allegati I, II, III, IV, **inclusa l'Italia** (`EDS.2`).
- Nei gruppi: **per ogni legal entity** distintamente (art. 16 c. 3 lett. c) **Det. 379887/2025**) — `EDS.3`.

### Sedi UE e rappresentante NIS (`SIT.1`..`SIT.2`)

- **Sedi UE** (`SIT.1`): elencano le proprie sedi i soggetti NIS stabiliti in Italia (sede principale) che svolgono attività **inerentemente transfrontaliere** ex art. 7 c. 5 NIS (DNS, registri TLD, registrar, cloud, data center, CDN, MSP, MSSP, mercati online, motori di ricerca, social network).
- **Rappresentante NIS in Italia** (`SIT.2`): indicano il rappresentante i soggetti NIS che **non hanno sedi UE**, hanno designato il rappresentante in Italia, e svolgono le stesse attività transfrontaliere.

### Indirizzi IP e nomi di dominio (`IPD.1`..`IPD.11`)

#### Default e definizioni (`IPD.1`..`IPD.5`)

- Devono essere elencati **tutti** gli **IP pubblici statici** e **nomi di dominio** **in uso o nella disponibilità** del soggetto, **acquisiti tramite contratti o accordi** con:
  - **ISP** (fornitori servizi Internet);
  - **Registri Internet Regionali** (RIR);
  - **fornitori di servizi di registrazione di nomi di dominio** o altre organizzazioni deputate (per nomi di dominio).
- Si prescinde da aspetti organizzativi e tecnologici.

#### Casi particolari (`IPD.6`..`IPD.11`)

- **Più organizzazioni che condividono IP/domini** (`IPD.6`): ogni organizzazione elenca quanto presente nei propri contratti, **anche infragruppo**. Lo stesso IP/dominio può essere indicato da più organizzazioni.
- **Filiali extra-UE** (`IPD.7`): si elencano **prescindendo dalla localizzazione fisica** delle filiali.
- **Società estere del gruppo** (`IPD.8`): il decreto si applica per legal entity → ognuna conferisce solo gli IP/domini propri.
- **IP/domini di terzi** (`IPD.9`): da elencare anche quelli **gestiti per conto di terzi** (clienti) o gestiti **da terzi** (fornitori) **se il soggetto li ha in uso/disponibilità per contratto** (es. servizi di gestione contenuti web).
- **Fornitori di servizi di registrazione di nomi di dominio** (`IPD.10`): **non sono tenuti** a comunicare i nomi di dominio mediati o rivenduti per i clienti né quelli oggetto di hosting.
- **Fornitori di servizi di sistema dei nomi di dominio** (`IPD.11`): **non sono tenuti** a comunicare i nomi presenti nei DNS che gestiscono.

### Accordi di condivisione delle informazioni (`ACI.1`..`ACI.4`)

#### Definizione (`ACI.1`)

- Riferimento normativo: **art. 17 c. 2** decreto NIS + **art. 1 c. 1 lett. kk) Det. ACN 379887/2025**.
- Sono accordi **volontari** tra soggetti essenziali/importanti per scambiare informazioni di sicurezza informatica:
  - minacce informatiche;
  - quasi-incidenti, vulnerabilità;
  - tecniche e procedure (TTP), indicatori di compromissione (IoC);
  - tattiche avversarie, attori delle minacce;
  - allarmi di sicurezza informatica;
  - raccomandazioni sulla configurazione degli strumenti di sicurezza.
- **Finalità**: prevenire/rilevare gli incidenti, aumentare il livello di sicurezza informatica.

#### Obbligatorietà (`ACI.2`)

- Lo scambio di informazioni di sicurezza informatica ex art. 17 c. 1 NIS tra soggetti NIS o tra NIS e terzi (inclusi fornitori) **deve** essere regolato da accordi di condivisione (art. 17 c. 2).
- Tali accordi definiscono **perimetro** della condivisione e **strumenti di tutela** delle informazioni.
- **Termine di adeguamento allineato a quello delle misure di base** = **ottobre 2026**.
- Nel rischio della catena di approvvigionamento: i soggetti NIS valutano l'opportunità di inserire **clausole di protezione delle informazioni** scambiate con i fornitori (es. NDA).

#### Aggiornamento annuale 2025 vs 2026 (`ACI.3`)

- **Aggiornamento 2025**: notifica solo degli accordi **vigenti e sottoscritti dopo l'entrata in vigore del decreto NIS** (16 ottobre 2024).
- **Aggiornamento 2026**: notifica anche degli accordi **previgenti**, dopo analisi/eventuale adeguamento.

#### 8 servizi che sono "accordi" (`ACI.4`)

In via interpretativa (in attesa di consenso unionale), si configurano come accordi di condivisione ex art. 17 c. 1 i contratti per le **forniture che hanno per oggetto, anche in parte, servizi di sicurezza informatica**:

1. **NOC** — Network Operation Centre;
2. **MDR** — Managed Detection and Response;
3. **SOC** — Security Operation Centre;
4. **CSOC** — Cyber Security Operation Centre;
5. **CERT** — Computer Emergency Response Team;
6. **VA/PT** — Vulnerability Assessment + Penetration Test;
7. **Red Teaming**;
8. **Cyber Threat Intel**.

**Non rientrano** i contratti di forniture **non di sicurezza** in cui il fornitore segnali al cliente eventi di sicurezza di interesse.

Per la notifica è sufficiente comunicare l'**estratto del contratto** relativo allo scambio di informazioni.

### Fornitori rilevanti NIS (`FRN.1`..`FRN.4`)

#### Razionale (`FRN.1`)

- **Art. 3 c. 9 lett. f) NIS** prevede che il decreto si applichi indipendentemente dalle dimensioni a un soggetto **critico in quanto elemento sistemico della catena di approvvigionamento** di soggetti essenziali/importanti.
- L'aggiornamento annuale acquisisce le informazioni sui **fornitori rilevanti** per individuare, d'intesa con le Autorità di settore, gli elementi sistemici e proporne l'identificazione governativa come essenziali/importanti.

#### Definizione (`FRN.2`)

Ai sensi dell'**art. 1 c. 1 lett. ll) Det. ACN 127437/2026** un fornitore è "**fornitore rilevante NIS**" se fornisce servizi/prodotti a un soggetto NIS e soddisfa **almeno uno** di:

- **a) fornitura ICT**: riconducibile alle attività/servizi dell'**Allegato I punti 8 e 9** (infrastrutture digitali + gestione servizi TIC);
- **b) fornitura non fungibile**: l'interruzione/compromissione comporta impatto significativo sulla capacità del soggetto NIS di erogare le proprie attività/servizi NIS, anche per indisponibilità di alternative.

#### Informazioni da comunicare (`FRN.3`)

Ai sensi dell'**art. 18 Det. 127437/2026**:

- **denominazione**;
- **codice fiscale**;
- **paese sede legale**;
- **codici CPV** ex Reg. (CE) 2195/2002 — Common Procurement Vocabulary;
- **criterio di rilevanza** utilizzato (a, b, o entrambi).

Riferimenti CPV: tassonomia del Reg. CE 2195/2002 (modificato dal Reg. CE 213/2008). Tabella di alto livello CPV ↔ NACE/ATECO disponibile come **Allegato II.2 bis Tabella D.1** del nuovo Codice Appalti, **non sostitutiva** dell'elenco CPV completo.

#### Esempi tabellati (`FRN.4`)

##### Forniture **non fungibili** (criterio b)

| Descrizione fornitura | Codice CPV |
|---|---|
| Connettività dati e voce, fissa e mobile, **se non ridondata** | Servizi di Internet **72400000-4**; ISP **72411000-4**; Trasmissione dati **72318000-7** |
| Corrente elettrica | Erogazione energia elettrica **65310000-9**; Erogazione energia elettrica + servizi connessi **65300000-6** |

##### Forniture **ICT — Infrastrutture digitali** (criterio a)

| Tipologia | Descrizione fornitura nel CPV | Codice CPV |
|---|---|---|
| Punti di interscambio internet | Servizi di interconnessione | 64221000-1 |
| Servizi di sistema dei nomi di dominio | Nomi di dominio di Internet | 72417000-6 |
| Servizi di cloud computing | Servizi di elaborazione dati | 72300000-8 |
| | Servizi di Internet | 72400000-4 |
| | Servizi informatici | 72500000-0 |
| | Servizi di gestione connessi all'informatica | 72510000-3 |
| Servizi di data center | Servizi informatici: consulenza, sviluppo SW, Internet, supporto | 72000000-5 |
| Reti di distribuzione dei contenuti | Servizi di Internet | 72400000-4 |
| Servizi fiduciari | Certificazione firma elettronica | 79132100-9 |
| | Pacchetti SW e sistemi di informazione | 48000000-8 |
| Reti pubbliche di comunicazione elettronica | Servizi di telecomunicazione | 64200000-8 |
| Servizi di comunicazione elettronica accessibili al pubblico | Servizi telefonici e di trasmissione dati | 64210000-1 |

##### Forniture **ICT — Servizi gestiti e gestiti di sicurezza** (criterio a)

| Descrizione fornitura nel CPV | Codice CPV |
|---|---|
| Servizi informatici | 72500000-0 |
| Servizi di gestione connessi all'informatica | 72510000-3 |
| Servizi di manutenzione e assistenza sistemi | 72250000-2 |
| Servizi di consulenza e assistenza informatica | 72600000-6 |
| Servizi di audit e collaudo informatico | 72800000-8 |

## Citazioni rilevanti

> "Tutti i soggetti NIS (essenziali e importanti) di cui agli articoli 3 e 7 del decreto NIS sono tenuti a svolgere l'aggiornamento annuale. Si evidenzia che, ai sensi dell'articolo 38, commi 10 e 13, la mancata registrazione non solleva dall'obbligo di aggiornamento annuale." — `AGA.4`.

> "Sono pertanto oggetto di notifica i contratti relativi alle forniture di servizi quali: NOC (Network Operation Centre); MDR (Managed Detection and Response); SOC (Security Operation Centre); CSOC (Cyber Security Operation Centre); CERT (Computer Emergency Response Team); VA/PT (Vulnerability Assessment e Penetration Test); Red Teaming; Cyber Threat Intel." — `ACI.4`.

> "Ai sensi dell'articolo 1, comma 1, lettera ll), della Determinazione ACN 127437/2026, un fornitore si considera 'fornitore rilevante NIS' se fornisce servizi o prodotti a un soggetto NIS e soddisfa almeno uno dei seguenti criteri di rilevanza: a. la fornitura è riconducibile alle attività o ai servizi di cui all'allegato I, punti 8 e 9, del decreto NIS (fornitura ICT); b. l'interruzione o la compromissione della fornitura comportano un impatto significativo sulla capacità del soggetto NIS […] (fornitura non fungibile)." — `FRN.2`.

## Entità menzionate

- [[entities/ACN]]
- [[entities/Autorità di settore NIS]]
- [[entities/Punto di contatto NIS]]
- [[entities/Rappresentante NIS in Italia]]

## Concetti collegati

- [[concepts/Aggiornamento annuale informazioni]]
- [[concepts/Aggiornamento continuo informazioni]]
- [[concepts/Accordi di condivisione delle informazioni]]
- [[concepts/Fornitori rilevanti NIS]]
- [[concepts/Piattaforma digitale ACN]]
- [[concepts/Settori altamente critici e critici]]
- [[concepts/Identificazione dei soggetti NIS]]

## Note dell'agente

- **Anchor protocol numbers**:
  - **Det. ACN 379887/2025** — accordi di condivisione (art. 1 c. 1 lett. kk) e aggiornamento annuale (art. 16). È il **predecessore** della determinazione del 13 aprile 2026 di cui parla [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]].
  - **Det. ACN 127437/2026** — fornitori rilevanti (art. 1 c. 1 lett. ll + art. 18). È la **versione attuale** di disciplina dei fornitori rilevanti, citata in `FRN.2` e `FRN.3`.
- *Sintesi dell'agente:* la lettura combinata `ACI.4` + `FRN.4` mostra una **doppia tassonomia di servizi cyber**: gli **8 servizi notificabili come accordi** (NOC/MDR/SOC/CSOC/CERT/VA-PT/Red/CTI) sono il *cosa scambia il fornitore*, mentre i **CPV in `FRN.4`** sono il *cosa lo qualifica come fornitore rilevante*. Le due liste si intersecano (MSP/MSSP) ma non sono sovrapponibili.
- L'**`ACI.3`** ("solo accordi sottoscritti dopo il 16/10/2024 nel 2025; il resto nel 2026") è un'attuazione progressiva esplicita: ACN preferisce **non chiedere il pregresso** finché i soggetti non hanno tempo di rivederlo alla luce del decreto.
- L'art. 18 della Det. 127437/2026 è il riferimento puntuale per i **dati strutturati** sui fornitori rilevanti (denominazione, CF, paese, CPV, criterio). I codici CPV sono il **collante interoperabile** con il sistema di appalti pubblici, non con ATECO/NACE direttamente.
- Lacuna nota: la FAQ **non chiarisce la sorte degli IP dinamici** o degli IPv6 dinamici. Il testo dice "**IP statici e pubblici**". Da chiarire se rilevante.
- Nota di traduzione: caratteri "à è ò ù" appaiono come "�" nel testo estratto.
