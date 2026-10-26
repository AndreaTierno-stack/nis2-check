---
title: FAQ NIS — Settori, sottosettori e tipologie di soggetto
type: source
scope: both
source_type: article
source_path: raw/articles/Domande frequenti NIS - Settori, sottosettori e tipologie di soggetto - ACN.pdf
url: https://www.acn.gov.it/portale/faq-nis-settori-sottosettori-e-tipologie-di-soggetto
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2026
date_ingested: 2026-04-29
tags: [NIS2, ACN, FAQ, settori, sottosettori, allegato I, allegato II, allegato III, allegato IV, tipologie di soggetto]
---

## TL;DR

FAQ ACN sui **settori e tipologie di soggetto** rientranti nell'ambito NIS. È la FAQ più estesa del corpus (~70 codici, da `A1.1.a.1` a `A4.3.5`) e fornisce, settore per settore, l'**elenco operativo dei provvedimenti unionali** che identificano le tipologie di soggetto: per ciascun sottosettore la struttura è "**direttiva/regolamento UE → tipologia di soggetto → criterio dimensionale (Racc. 2003/361/CE) → essenziale/importante**". Coperti tutti i 10 settori altamente critici (Allegato I) + 7 settori critici (Allegato II) + Allegato III (PA) + Allegato IV (individuazione autoritativa). **Eccezioni di prevalenza**: Acqua potabile (solo distributore), Acque reflue, Gestione rifiuti — non rientrano se l'attività non è prevalente. **Tipologie size-blind** (tutte le dimensioni, anche micro/piccole): fornitori servizi fiduciari qualificati (essenziali a prescindere), DNS/TLD/registrar (essenziali), reti+servizi comunicazione elettronica, fornitori digitali Allegato II (rivenditori nomi dominio), prestatori di servizi TIC infragruppo verso impresa collegata NIS (art. 3 c. 10). **Esclusioni notevoli**: punti vendita di GNL/GNC per autotrazione, prosumer fotovoltaici, mediatori solo marketing/contabili, mangimi, sementi, GPL non REACH, GNL liquido non rigassificato, biogas/biometano in forma liquida, RSA (incluse), istituti di istruzione (inclusi solo via Allegato IV su proposta MUR). **PA**: 4 sottocategorie a c) Amm. locali (Città metropolitane, Comuni >100k abitanti, Comuni capoluogo, ASL); le **Aziende ospedaliere/universitarie** sono **soggetti distinti** dalle ASL e si registrano **autonomamente**. **Allegato IV**: 4 tipologie attivate solo via Det. ACN su proposta autorità di settore, inclusi *trasporto pubblico locale*, *istituti istruzione con ricerca*, *attività interesse culturale*, *società in-house/partecipate/controllo pubblico*. **Servizi gestiti TIC**: definiti dall'**interconnessione diretta** rete fornitore↔cliente (assistenza/amministrazione attiva); i 13 servizi di sicurezza gestiti elencati esplicitamente.

## Punti chiave

### Settore 1 — Energia (`A1.1.a`–`A1.1.e`)

**Sottosettore Energia elettrica (`A1.1.a.1`–`A1.1.a.4`)** — direttiva 2019/944/UE (Clean Energy Package, recepita dal D.Lgs. 201/2021) + regolamento 2019/943/UE (D.Lgs. 210/2021) — tipologie:
- **Imprese elettriche** che svolgono **fornitura** (= vendita a clienti, anche rivendita).
- **Gestori sistema di distribuzione** (DSO).
- **Gestori sistema di trasmissione** (TSO).
- **Produttori** (esclusi prosumer / clienti attivi — `A1.1.a.4`).
- **Gestori del mercato elettrico designati** (coupling unico DA/ID).
- **Partecipanti al mercato dell'energia elettrica** che forniscono aggregazione, gestione domanda, stoccaggio.
- **Gestori di punti di ricarica** ex DM MASE n. 106 del 16/03/2023 (registrati su PUN). NB: i punti vendita che offrono ricarica elettrica alla clientela **non** rientrano automaticamente — solo se obbligati a registrarsi su PUN (`A1.1.a.3`).
- Aziende che vendono energia elettrica a clienti domestici a mercato libero **rientrano** quali "imprese elettriche" — `A1.1.a.2`.

**Mappa tipologia → codice FAQ (sottosettore elettrico `A1.1.a`)** — codici come attestati dalla FAQ (nessuna definizione della Dir. 2019/944 riportata: fuori ambito):
- `A1.1.a.1` — elencazione generale delle tipologie del sottosettore elettrico: imprese elettriche di fornitura (vendita), gestori del sistema di distribuzione (DSO), gestori del sistema di trasmissione (TSO), produttori, gestori del mercato elettrico designati, partecipanti al mercato (aggregazione, gestione domanda, stoccaggio).
- `A1.1.a.2` — imprese elettriche che vendono a **clienti domestici** sul mercato libero: rientrano come "imprese elettriche".
- `A1.1.a.3` — **gestori di punti di ricarica** registrati su PUN (ex DM MASE n. 106 del 16/03/2023); i punti vendita che offrono ricarica ma non obbligati alla registrazione su PUN **non rientrano automaticamente**.
- `A1.1.a.4` — **esclusione** di prosumer / clienti attivi dalla tipologia "produttori".

**Sottosettore Teleriscaldamento e teleraffrescamento (`A1.1.b.1`)** — direttiva 2018/2001/UE (D.Lgs. 199/2021): gestori di teleriscaldamento o teleraffrescamento.

**Sottosettore Petrolio (`A1.1.c.1`–`A1.1.c.2`)** — gestori di oleodotti, impianti produzione, raffinazione, trattamento, deposito + organismi centrali di stoccaggio (Direttiva 2009/119/CE, D.Lgs. 249/2012). **Solo petrolio greggio** — non i raffinati (`A1.1.c.2`), salve identificazioni governative.

**Sottosettore Gas (`A1.1.d.1`–`A1.1.d.6`)** — direttiva 2009/73/CE (D.Lgs. 93/2011): impresa fornitrice, gestore distribuzione, gestore trasporto, gestore impianto stoccaggio, gestore sistema GNL, impresa di gas naturale + gestori raffinazione/trattamento gas naturale.
- **GNL liquido tal quale** non rigassificato/non in rete: **escluso** (`A1.1.d.2`).
- **Biometano e biogas**: produzione/fornitura/acquisto **inclusi**; trasporto/distribuzione in forma liquida non in rete **esclusi** (`A1.1.d.3`).
- **GPL**: **NON nel settore Energia/Petrolio** (`A1.1.d.4`); **NEL settore Chimici** **solo se trattato come prodotto soggetto a registrazione REACH** (`A1.1.d.5`).
- **Punti vendita GNL/GNC per autotrazione**: **esclusi** (non sono imprese fornitrici di gas) (`A1.1.d.6`).

**Sottosettore Idrogeno (`A1.1.e.1`)** — gestori di impianti di produzione, stoccaggio, trasporto idrogeno.

**Fatturato e ambito (`A1.2`)**: il fatturato considerato è **quello complessivo**, non solo NIS, salvo casi previsti dal decreto.

### Settore 2 — Trasporti (`A1.2.a`–`A1.2.d`)

**Trasporto aereo (`A1.2.a.1`–`A1.2.a.2`)** — Reg. 2008/300/CE + Dir. 2009/12/CE + Reg. 2004/549/CE: vettori aerei commerciali, gestori aeroportuali, aeroporti, soggetti che gestiscono **impianti annessi in aeroporto**, operatori del controllo del traffico aereo.

**Trasporto ferroviario (`A1.2.b.1`)** — Dir. 2012/34/UE: gestori dell'infrastruttura + imprese ferroviarie.

**Trasporto su strada (`A1.2.d.1`–`A1.2.d.2`)** — Reg. 2015/962/UE + Dir. 2010/40/UE: autorità stradali + gestori di sistemi di trasporto intelligenti (ITS).
- I **clienti finali** che fruiscono ITS forniti da terzi (anche se rielaborano i dati internamente) **non rientrano** in base a questo solo titolo (`A1.2.d.2`).

**Trasporto per vie d'acqua (`A1.2.c.1`–`A1.2.c.4`)** — Reg. 725/2004/CE + Dir. 2005/65/CE: compagnie navigazione (interne, marittime, costiere — **escluse le singole navi**), organi di gestione dei porti, organi di gestione di impianti portuali, soggetti che gestiscono opere/attrezzature in porti.
- **Esclusione delle singole navi** = solo i Capi IV e V del decreto (eccetto art. 23) **NON si applicano alle navi**, fermi gli obblighi tecnici di settore (`A1.2.c.4`).
- L'esclusione **non incide sul calcolo dei dipendenti** ai fini del dimensionamento PMI.
- "Organo di gestione dei porti" = **Autorità Portuali** ex art. 2 c. e) D.Lgs. 203/2007 (`A1.2.c.2`).

### Settore 5 — Sanitario (`A1.5.1`–`A1.5.2`)

Direttiva 2011/24/UE + Reg. 2022/2371/UE + Dir. 2001/83/CE + Reg. 2022/123/UE: prestatori di assistenza sanitaria + laboratori di riferimento UE + soggetti R&S medicinali + fabbricanti prodotti farmaceutici (NACE Sez.C div.21) + fabbricanti dispositivi medici critici per emergenza sanità pubblica.
- **RSA**: rientrano (anche se in via residuale prestano assistenza sanitaria) — `A1.5.2`.

### Settore 6 — Acqua potabile (`A1.6.1`–`A1.6.5`)

Dir. 2020/2184 (D.Lgs. 18/2023): fornitori + distributori di acque destinate al consumo umano.
- **Eccezione di prevalenza** (`A1.6.3`–`A1.6.4`): per la tipologia "**distributore**", **NON si rientra** se la distribuzione di acqua potabile **non è l'attività prevalente** (criterio fatturato superiore alle altre attività) → comuni/enti locali esclusi salvo prevalenza.
- **In-house, partecipate, controllate**: rientrano alla pari di privati (`A1.6.2`).
- **Enti di Governo d'Ambito**: NON nel settore Acqua potabile (collaborano con Regioni nel supporto Autorità di settore) — `A1.6.5`.

### Settore 7 — Acque reflue (`A1.7.1`–`A1.7.5`)

Dir. 1991/271/CEE (D.Lgs. 152/1999): imprese con attività **prevalente** di raccolta, smaltimento o trattamento di acque reflue urbane/domestiche/industriali.
- **Eccezione di prevalenza** (analoga ad Acqua potabile): comuni/enti locali esclusi se non prevalenza.
- **In-house, partecipate, controllate**: rientrano.
- **Enti di Governo d'Ambito**: NON nel settore.

### Settore 8 — Infrastrutture digitali (`A1.8.1`–`A1.8.6`)

**5 cluster di tipologie** con regimi dimensionali differenziati:

1. **IXP** (internet exchange point) — superamento massimali piccola impresa → importante (essenziale se >medie).
2. **Servizi fiduciari** (Reg. eIDAS 910/2014 sostituito da eIDAS-2 Reg. 2024/1183):
   - Non qualificati → importante (essenziale se >medie). **A prescindere dalla dimensione**.
   - **Qualificati → essenziale a prescindere dalla dimensione**.
3. **Reti pubbliche di comunicazione + servizi di comunicazione elettronica accessibili al pubblico** (Dir. 2018/1972, D.Lgs. 207/2021) — **a prescindere dalla dimensione** (anche piccole/micro): importante (essenziale se >piccole).
4. **DNS + TLD registry**: **essenziali a prescindere dalla dimensione** (anche piccole/micro).
5. **Cloud + data center + CDN**: superamento massimali piccola impresa → importante (essenziale se >medie).

**Giurisdizione nazionale per i cluster 4 e 5** (DNS/TLD/registry, cloud/DC/CDN) — art. 5 D.Lgs. 138/2024:
- stabilimento solo IT (anche se ha stabilimenti extra-UE);
- stabilimento principale in IT (multi-Stato membro);
- nessuno stabilimento UE + offerta in IT + designazione rappresentante UE in IT.

**Coordinamento Regolamento Cloud (`A1.8.2`–`A1.8.3`)**:
- Fornitori cloud **qualificati** ex DD ACN 21007/24 (art. 33-septies DL 179/2012) → rientrano come fornitori cloud (Allegato I p. 8 terzo allinea), se >piccola impresa.
- Operatori infrastrutture digitali **soggette ad adeguamento o qualificate** → rientrano come fornitori data center (Allegato I p. 8 quarto allinea), se >piccola impresa.

**Broker/reseller (`A1.8.4`)**:
- **Rientrano** se l'infrastruttura digitale del rivenditore **concorre alla fornitura** del servizio (impatti su CIA), incluso help desk/service desk tecnico.
- **Non rientrano** organizzazioni che svolgono solo marketing + amministrativa contabile/contrattualistica.
- I fornitori dei servizi mediati restano comunque NIS-soggetti a Direttiva 2022/2555.

**Servizi infragruppo (`A1.8.6`)**: la disciplina si applica alla **legal entity**; non distingue se servizi sono erogati a soggetti dello stesso gruppo o esterni. → infrastrutture digitali infragruppo rientrano alla pari.

### Settore 9 — Gestione dei servizi TIC b2b (`A1.9.1`–`A1.9.9`)

**Tipologie**: fornitori di servizi gestiti + fornitori di servizi di sicurezza gestiti — superamento massimali piccola impresa + giurisdizione IT (stesso schema cloud).

**"Assistenza o amministrazione attiva" (`A1.9.2`)** = svolta tramite **interconnessione diretta** tra rete fornitore e rete cliente. Esempi:
- domini federati;
- accesso remoto del fornitore a reti/sistemi cliente con dispositivi del fornitore;
- collegamento di dispositivi attivi del fornitore (diversi dall'oggetto) alla rete cliente.

**NON rientra**: assistenza su dispositivi del cliente o tramite istruzioni verbali/scritte al personale cliente.

**Fornitori di servizi gestiti (`A1.9.3`)** — esempi (non esaustivo):
- installazione hardware/software;
- aggiornamento configurazione/software/firmware (anche di sicurezza);
- gestione software o servizi di piattaforma;
- monitoraggio;
- amministrazione.

**Fornitori di servizi di sicurezza gestiti (`A1.9.4`)** — **13 servizi tipici** (elenco non esaustivo):
- **NOC** (Network Operation Centre);
- **MDR** (Managed Detection and Response);
- **IDS** (Intrusion Detection Systems);
- **IPS** (Intrusion Prevention Systems);
- **IDR** (Incident Detection and Response);
- **EDR** (Endpoint Detection and Response);
- **XDR** (Extended Detection and Response);
- **SIEM** (Security Information and Event Management);
- **SOC** (Security Operation Centre);
- **CSOC** (Cyber Security Operation Centre);
- **CERT** (Computer Emergency Response Team);
- **VA/PT** (Vulnerability Assessment + Penetration Test);
- **Red Teaming**.

**Broker/reseller di servizi TIC (`A1.9.5`)**: stesso principio Infrastrutture digitali (rientrano se infrastruttura concorre, escluso solo marketing/contabile).

**Servizi infragruppo TIC (`A1.9.6`)**:
- Se l'organizzazione **supera** la piccola impresa → rientra **come settore Gestione TIC + (in aggiunta)** ex art. 3 c. 10.
- Se l'organizzazione **NON supera** la piccola impresa → rientra **solo se** prestatore TIC verso **impresa collegata** che è soggetto NIS essenziale/importante (attrazione gruppale art. 3 c. 10) — vedi `FRN.4.2` su [[sources/FAQ NIS - Aggiornamento delle informazioni]].
- *Inferenza dell'agente*: la doppia inclusione (Gestione TIC + art. 3 c. 10) ha rilevanza pratica — il prestatore va elencato in entrambe le tabelle del modello categorizzazione.

**Differenza servizi gestiti vs sicurezza gestiti (`A1.9.8`)**: sicurezza gestiti = sottoinsieme focalizzato sulla **gestione dei rischi di sicurezza informatica**.

**Esclusioni (`A1.9.9`)**: assistenza solo su dispositivi cliente, istruzioni al personale, rivendita prodotti TIC senza installazione/manutenzione.

**Assistenza post-vendita su prodotti audio-video (`A1.9.7`)**: **rientra** come servizi gestiti se comporta interventi su sistemi informativi/rete (anche teleassistenza).

### Settore 10 — Spazio (`A1.10.1`)

**Operatori di infrastrutture terrestri** che sostengono fornitura di servizi spaziali — esclusi i fornitori di reti pubbliche di comunicazione elettronica (già nel settore Infrastrutture digitali).

### Settore 1 (Allegato II) — Servizi postali e di corriere (`A2.1.1`–`A2.1.2`)

Dir. 1997/67/CE (D.Lgs. 261/1999): fornitori di servizi postali (raccolta, smistamento, trasporto, distribuzione di invii postali — almeno una fase, con offerta al pubblico, abilitazione AGCOM) + fornitori di servizi di corriere.
- I **soli trasportatori** (che effettuano solo trasporto senza altre fasi del servizio postale) **non sono operatori postali**.

### Settore 2 (Allegato II) — Gestione rifiuti (`A2.2.1`–`A2.2.4`)

Dir. 2008/98/CE (D.Lgs. 205/2010): imprese di gestione rifiuti — **eccezione di prevalenza**: rientrano solo se la gestione rifiuti è la **principale attività economica** (criterio fatturato).
- **In-house, partecipate, controllate** rientrano.
- **Comuni/enti locali**: esclusi se non prevalenza.

### Settore 3 (Allegato II) — Sostanze chimiche (`A2.3.1`–`A2.3.2`)

Reg. REACH 2006/1907/CE: fabbricanti, distributori di sostanze, distributori di miscele, produttori di articoli.
- **Esenti da REACH** (art. 2 Titolo II) → **esclusi da NIS** per il settore chimico (`A2.3.2`).

### Settore 4 (Allegato II) — Alimenti (`A2.4.1`–`A2.4.4`)

Reg. 178/2002/CE (D.Lgs. 190/2006): imprese alimentari che si occupano di distribuzione all'ingrosso, produzione industriale, trasformazione industriale di alimenti.
- **Mangimi**: esclusi (non sono "alimenti" — destinati ad alimentazione animale) — `A2.4.2`.
- **Sementi**: escluse — `A2.4.3`.
- **Integratori alimentari**: inclusi (sono alimenti per EFSA) — `A2.4.4`.

### Settore 5 (Allegato II) — Fabbricazione (`A2.5.a`–`A2.5.f`)

| Sottosettore | Riferimento NACE/regolamento | Tipologia |
|---|---|---|
| **a) Dispositivi medici + medico-diagnostici in vitro** | Reg. 2017/745 + Reg. 2017/746 (D.Lgs. 137/2022) | Fabbricanti |
| **b) Computer e prodotti elettronica/ottica** | NACE Sez.C **div. 26** | Attività economica sostanziale in div. 26 |
| **c) Apparecchiature elettriche** | NACE Sez.C **div. 27** | Attività economica sostanziale in div. 27 |
| **d) Macchinari e apparecchiature n.c.a.** | NACE Sez.C **div. 28** | Attività economica sostanziale in div. 28 |
| **e) Autoveicoli, rimorchi e semirimorchi** | NACE Sez.C **div. 29** | Attività economica sostanziale in div. 29 |
| **f) Altri mezzi di trasporto** | NACE Sez.C **div. 30** | Attività economica sostanziale in div. 30 |

### Settore 6 (Allegato II) — Fornitori di servizi digitali (`A2.6.1`–`A2.6.4`)

**Tipologie**:
1. **>piccola impresa** + giurisdizione IT:
   - Fornitori di **mercati online** (= "marketplace" multi-venditore di terzi);
   - Fornitori di **motori di ricerca online**;
   - Fornitori di **piattaforme di social network**.
2. **A prescindere dalla dimensione** + giurisdizione IT:
   - **Fornitori di servizi di registrazione di nomi di dominio** (registrar e agenti per conto di registrar — incluso intermediari non tecnici che raccolgono solo informazioni per acquisto domini) — `A2.6.3`.
- **Mercati online** (`A2.6.2`): la sola vendita online dei propri prodotti **NON** comporta riconducibilità.
- **Registrar — obblighi limitati (`A2.6.3`)**: ai sensi **art. 32 D.Lgs. 138/2024**, ai registrar che non svolgono altre attività NIS si applicano **NON** gli obblighi:
  - misure di sicurezza (art. 24);
  - notifiche incidenti (art. 25).
  - **Restano** gli obblighi: registrazione (art. 7), organi di amministrazione (art. 23), banche dati nomi dominio (art. 29).
- **Broker/reseller di servizi digitali** (`A2.6.4`): stesso schema (rientrano se l'infrastruttura concorre).

### Settore 7 (Allegato II) — Ricerca (`A2.7.1`–`A2.7.2`)

**Organizzazioni di ricerca** = obiettivo principale ricerca applicata o sviluppo sperimentale per sfruttamento commerciale (art. 2 c. 1 lett. mmm D.Lgs. 138/2024) — **esclusi gli istituti di istruzione**.
- **Istituti di istruzione che svolgono ricerca**: in linea generale **NON** rientrano nel settore Ricerca; possono essere individuati come essenziali/importanti **via Allegato IV** su proposta MUR (artt. 3 c. 8 e 13, art. 11 c. 4 lett. b).

### Settore PA (Allegato III) — `A3.1`–`A3.d.3.2`

**Allegato III** = applicazione **a prescindere dalle dimensioni** (art. 3 c. 6) per le PA in elenco ISTAT (legge 31/12/2009 n. 196 art. 1 c. 3) appartenenti alle 4 categorie a)-d).

**Categoria c) — Amministrazioni locali**:
- **Città metropolitane**;
- **Comuni con popolazione >100.000 abitanti**;
- **Comuni capoluogo di Regione**;
- **Aziende sanitarie locali (ASL)**.

**Sottoidentità rilevanti**:
- **Consigli regionali/provinciali/metropolitani/comunali (`A3.b.1.1`)**: soggetti **autonomi** rispetto all'Ente di cui sono organi → **registrazione separata**.
- **Aziende ospedaliere/ospedaliero-universitarie (`A3.c.4.3`–`A3.c.4.4`)**: 
  - Rientrano nel settore **Sanitario** (Allegato I p. 5), **NON** ASL.
  - Sono **soggetti distinti dalle ASL** di appartenenza → **registrazione autonoma**.
- **ASL (`A3.c.4.1`)**: soggetti **importanti** ex art. 3 c. 6 + 6 c. 3; se **>medie imprese** anche prestatore sanitario → essenziali. **Doppia registrazione**: per Allegato III (PA) + Allegato I p. 5 (Sanitario).
- **ASL "fuori ambito" sulla piattaforma (`A3.c.4.5`)**: bug/falsa risposta della piattaforma se la ASL si registra solo per Allegato I p. 5 dichiarando dimensioni inferiori a piccola impresa — la classificazione "fuori ambito" **non è corretta** (ASL rientra comunque per Allegato III).
- **Aziende Pubbliche di Servizi alla Persona (`A3.c.4.2`)**: NON in Allegato III; possono rientrare in Sanitario via Allegato I se prestano assistenza sanitaria (anche residuale) e superano massimali piccola impresa.
- **Enti a struttura associativa (`A3.d.3.1`–`A3.d.3.2`)**: solo i soggetti dell'omonima categoria nell'elenco ISTAT.
  - **Ordini, collegi professionali, organismi nazionali**: **NON** sono Enti a struttura associativa ai fini Allegato III. Possono rientrare via Allegato II (Gestione TIC, Infrastrutture digitali) se svolgono attività riconducibili.

### Allegato IV — Individuazione autoritativa (`A4.1`–`A4.3.5`)

**Meccanismo (`A4.1`)** — art. 3 c. 8 + 13 D.Lgs. 138/2024:
- Soggetti individuati con **Determinazioni ACN** su proposta delle **Autorità di settore NIS**, sentito il **Tavolo per l'attuazione**.
- L'**Autorità nazionale competente NIS notifica** ai soggetti l'individuazione.
- Solo i soggetti notificati sono tenuti alla registrazione ex Allegato IV.

**4 tipologie (`A4.2`)**:
1. **Trasporto pubblico locale**;
2. **Istituti di istruzione che svolgono ricerca**;
3. **Soggetti che svolgono attività di interesse culturale**;
4. **Società in-house, partecipate, controllate** (D.Lgs. 175/2016).

**Cultura — chiarimenti (`A4.3.1`–`A4.3.5`)**:
- **Fondazioni museali / soggetti culturali**: NON automaticamente NIS — solo via individuazione (`A4.3.1`).
  - Resta sempre la possibilità di rientro via Allegati I e II (es. infrastrutture digitali) — in tal caso obbligo di registrazione **ex lege** senza individuazione.
- **Biblioteche e musei del Ministero della Cultura**: **già nel perimetro** dei soggetti essenziali via Allegato III p. 1; l'Allegato IV p. III riguarda soggetti **terzi** (`A4.3.2`).
- **Criterio di proposta MiC (`A4.3.3`)**: attività culturale rilevante + dipendenza critica da ICT + impatto potenziale incidente cyber.
- **Nessun criterio dimensionale** (`A4.3.4`): valutazione qualitativa/funzionale.
- **Partecipazione/vigilanza MiC** (`A4.3.5`): **NON** comporta automaticamente NIS — valutazione di autonomia giuridica e funzione esercitata.

## Citazioni rilevanti

> "Pertanto, le organizzazioni che si occupano [degli integratori alimentari] sono considerate imprese alimentari ai fini del medesimo regolamento e del Decreto NIS." — `A2.4.4` (rinvio a EFSA).

> "Sussiste una interconnessione diretta tra la rete del fornitore e quella del cliente quando, ad esempio (elenco non esaustivo): i domini sono federati; il fornitore può accedere a reti e sistemi informativi del cliente da remoto tramite dispositivi del fornitore stesso; il fornitore collega propri dispositivi attivi (diversi da quelli oggetto dell'attività di assistenza) alla rete del cliente." — `A1.9.2`.

> "Ai sensi dell'articolo 32, a tali soggetti [registrar], qualora non svolgano ulteriori attività riconducibili all'ambito di applicazione del decreto NIS, non si applicano alcuni degli obblighi previsti dal decreto medesimo, con particolare riguardo a quelli relativi alle misure di sicurezza (articolo 24) e alle notifiche di incidente (articolo 25). Restano fermi, in particolare, gli obblighi relativi alla registrazione (articolo 7), agli organi di amministrazione e direttivi (articolo 23) e alle banche dei dati di registrazione dei nomi di dominio (articolo 29)." — `A2.6.3`.

> "Le Aziende ospedaliere e ospedaliero-universitarie, pur facendo parte del Sistema Sanitario Nazionale ed essendo ricomprese nel territorio di un'Azienda Sanitaria Locale, non sono qualificabili come Aziende Sanitarie Locali. Esse sono enti dotati di personalità giuridica autonoma […]. Di conseguenza, le Aziende ospedaliere/ospedaliero-universitarie sono soggetti distinti dalle Aziende Sanitarie Locali di appartenenza ai sensi della disciplina NIS e devono adempiere autonomamente agli obblighi posti da tale disciplina." — `A3.c.4.4`.

## Entità menzionate

- [[entities/ACN]]
- [[entities/Autorità di settore NIS]]
- [[entities/Autorità nazionale competente NIS]]
- [[entities/Tavolo per l'attuazione della disciplina NIS]]
- [[entities/Ministero della Cultura]]
- [[entities/Ministero dell'università e della ricerca]]

## Concetti collegati

- [[concepts/Settori altamente critici e critici|Settori altamente critici]]
- [[concepts/Settori altamente critici e critici|Settori critici]]
- [[concepts/Tipologie di soggetto]]
- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Servizi gestiti]]
- [[concepts/Servizi di sicurezza gestiti]]
- [[concepts/Pubbliche amministrazioni NIS]]
- [[concepts/Identificazione dei soggetti NIS]]
- [[concepts/Imprese collegate (art. 3 c. 10)]]
- [[concepts/Eccezioni di prevalenza]]
- [[concepts/Giurisdizione nazionale]]

## Note dell'agente

- **Mappa size-blind** (entità soggette a NIS a prescindere dalla dimensione, anche micro/piccole) — utile per autovalutazione PDA2:
  1. **Servizi fiduciari qualificati** (Allegato I p. 8) → **essenziali**;
  2. **DNS + TLD registry** (Allegato I p. 8) → **essenziali**;
  3. **Reti pubbliche + servizi comunicazione elettronica** (Allegato I p. 8) → importanti (essenziali se >piccole);
  4. **Servizi fiduciari non qualificati** (Allegato I p. 8) → importanti (essenziali se >medie);
  5. **Registrar nomi di dominio** (Allegato II p. 6) → importanti — con **obblighi ridotti** ex art. 32 (no art. 24/25);
  6. **PA Allegato III** → essenziali/importanti per categoria;
  7. **Allegato IV** (post-individuazione) → tipologia per tipologia;
  8. **Imprese collegate art. 3 c. 10** prestatori TIC verso NIS → attrazione gruppale.
- **Mappa eccezioni di prevalenza** (criterio fatturato superiore alle altre attività):
  - Acqua potabile (solo distributore) — `A1.6.3`;
  - Acque reflue — `A1.7.3`;
  - Gestione rifiuti — `A2.2.3`.
  - *Conseguenza*: comuni/enti locali sono attratti **solo** se queste attività sono prevalenti (rare in pratica).
- **Mappa esclusioni puntuali** (chiarite dalla FAQ):
  - Punti vendita GNL/GNC autotrazione (`A1.1.d.6`);
  - GNL liquido non rigassificato non in rete (`A1.1.d.2`);
  - Biogas/biometano in forma liquida non in rete (`A1.1.d.3`);
  - GPL — non in petrolio, in chimici **solo se REACH** (`A1.1.d.4`–`A1.1.d.5`);
  - Prosumer fotovoltaici (`A1.1.a.4`);
  - Mediatori solo marketing/contabili dei servizi digitali e gestiti (`A1.8.4`, `A1.9.5`, `A2.6.4`);
  - Mangimi (`A2.4.2`);
  - Sementi (`A2.4.3`);
  - Esenti REACH (`A2.3.2`);
  - Singole navi (`A1.2.c.4`);
  - Trasportatori puri (postali) (`A2.1.2`);
  - Istituti di istruzione (Ricerca) — solo via Allegato IV (`A2.7.2`);
  - Aziende Pubbliche di Servizi alla Persona (Allegato III no, possibile via Allegato I p. 5) (`A3.c.4.2`);
  - Ordini/collegi professionali (Allegato III no, possibile via Allegato II) (`A3.d.3.2`).
- **Doppia/tripla registrazione obbligatoria** in alcuni casi tipici:
  - **ASL** = Allegato III + Allegato I p. 5 (Sanitario);
  - **Consigli regionali/provinciali** = registrazione **separata** dall'Ente (`A3.b.1.1`);
  - **Aziende ospedaliere/universitarie** = registrazione **autonoma** dall'ASL territoriale, in Allegato I p. 5 (`A3.c.4.4`);
  - **Imprese >piccola con servizi TIC infragruppo** = doppia inclusione settore TIC + art. 3 c. 10.
- **Connessione con `FRN.4` di [[sources/FAQ NIS - Aggiornamento delle informazioni]]**: i 13 servizi di sicurezza gestiti elencati in `A1.9.4` corrispondono ai **codici CPV ICT-servizi sicurezza** della tabella forniture rilevanti (più ampia: `A1.9.4` ha 13 servizi tecnici, `FRN.4` aggrega + introduce tabelle CPV).
- **Sintesi dell'agente**: la FAQ è in pratica un **manuale operativo** per l'autovalutazione di settore (PDA3 in `REG.1`/`PDA1-3` di [[sources/FAQ NIS - Registrazione]]). Cita decine di provvedimenti unionali con definizioni operative, e va letta in parallelo con `AMB.GE` di [[sources/FAQ NIS - Ambito]] (principio di non-prevalenza orizzontale) e `AMB.NO` (esclusioni DORA).
- **Possibile gap normativo**: "**piattaforme di social network**" definite nella FAQ in modo simile alla DSA — manca il riferimento esplicito al Reg. 2022/2065 (DSA), che potrebbe sovrapporsi. Da verificare se ACN ha emesso chiarimenti.
- Note di traduzione: caratteri "à è ò ù" appaiono come "�" nel testo estratto.
