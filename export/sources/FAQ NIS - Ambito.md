---
title: FAQ NIS — Ambito
type: source
scope: both
source_type: article
source_path: raw/articles/Domande frequenti NIS - Ambito - ACN.pdf
url: https://www.acn.gov.it/portale/faq-nis-ambito
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2026
date_ingested: 2026-04-29
tags: [NIS2, ACN, FAQ, ambito, dimensione, gruppi imprese, PA, organizzazioni estere, DORA, CER]
---

## TL;DR

FAQ ACN sull'**ambito di applicazione** del decreto NIS in 6 cluster (`AMB.GE` generalità, `AMB.DI` dimensione, `AMB.GI` gruppi di imprese, `AMB.PU` settore pubblico, `AMB.ES` organizzazioni estere, `AMB.NO` relazioni con altre normative). Ricostruisce la **logica binaria essenziale/importante** ex art. 6 D.Lgs. 138/2024; chiarisce che **l'identificazione non si basa su codici ATECO/NACE** salvo eccezioni del settore "Fabbricazione" (NACE C.21/26/27/28/29/30); afferma il **principio di non-prevalenza** con **3 eccezioni** (Acque reflue, Gestione rifiuti, Acqua potabile); chiarisce che **un fornitore di un soggetto NIS non è automaticamente NIS**, ma deve adempiere a obblighi contrattuali; spiega l'**attrazione ex art. 3 c. 10** delle imprese collegate/associate indipendentemente dalle dimensioni; fornisce la **definizione operativa** di micro/piccola/media impresa (ex Racc. 2003/361/CE — Guida UE 2020) e i criteri (n. effettivi + uno tra fatturato/bilancio); spiega la **clausola di salvaguardia DPCM 221/2024** del 9/12/2024 (GU 10/02/2025); indica **15 categorie PA Allegato III** + criterio dei comuni con popolazione >100k o capoluogo + ASL; classifica le organizzazioni **EU/extra-UE** in giurisdizione nazionale e le 2 eccezioni transfrontaliere (telco + servizi inerentemente transfrontalieri); affronta i **soggetti CER → essenziali in automatico** (D.Lgs. 134/2024); chiarisce il rapporto **DORA / NIS** (lex specialis: solo art. 7 c. 1 NIS per banche/IMF). 22 codici.

## Punti chiave

### Generalità (`AMB.GE.1`..`AMB.GE.8`)

#### Allegati e criteri di inclusione (`AMB.GE.1`)

- **Allegato I** — settori altamente critici.
- **Allegato II** — altri settori critici.
- **Allegato III** — categorie di pubbliche amministrazioni.
- **Allegato IV** — ulteriori tipologie a seguito di **identificazione governativa**.

Soggetti che ricadono per criterio standard:
- tipologie Allegati I/II + **almeno medie imprese** (Racc. 2003/361/CE);

Soggetti **a prescindere dalla dimensione**:
- soggetti **CER** ex D.Lgs. 134/2024 (recepimento Dir. UE 2022/2557 sulla resilienza dei soggetti critici);
- fornitori di **reti pubbliche di comunicazione elettronica** o **servizi di comunicazione elettronica** accessibili al pubblico (Allegato I);
- **prestatori di servizi fiduciari** (Allegato I);
- **gestori di registri TLD** + **fornitori DNS** (Allegato I);
- fornitori di **servizi di registrazione nomi di dominio** (Allegato II);
- **PA** ex Allegato III (15 categorie, art. 1 c. 3 L. 196/2009);
- **imprese associate/collegate** ai soggetti essenziali/importanti che soddisfano almeno uno dei 4 criteri **art. 3 c. 10**:
  1. esercitano influenza dominante sulle misure di gestione del rischio del soggetto NIS;
  2. detengono/gestiscono i sistemi info da cui dipende la fornitura dei servizi del soggetto NIS;
  3. effettuano operazioni di sicurezza informatica per il soggetto NIS;
  4. forniscono **servizi TIC o di sicurezza, anche gestiti**, al soggetto NIS.

Identificazione governativa (art. 3 c. 9, c. 13):
- **Allegato IV su valutazione del rischio**: trasporto pubblico locale, istituti di ricerca, soggetti culturali, società in-house/partecipate/a controllo pubblico (D.Lgs. 175/2016).
- Ulteriori soggetti **indipendentemente dalla dimensione** se almeno uno dei criteri art. 3 c. 9: ex OSE D.Lgs. 65/2018, unico fornitore nazionale di servizio essenziale, perturbazione → impatto significativo su sicurezza/incolumità/salute, **rischio sistemico** anche transfrontaliero, criticità a livello nazionale/regionale, **elemento sistemico della catena di approvvigionamento**.

#### Essenziali vs Importanti (`AMB.GE.2`)

**Essenziali**:
- Allegato I + **almeno medie imprese** che superano i massimali medi (art. 2 par. 1 Racc. 2003/361/CE);
- **a prescindere dalla dimensione**: soggetti CER, prestatori di servizi fiduciari **qualificati**, gestori registri TLD, fornitori DNS;
- fornitori reti/servizi telco accessibili al pubblico **almeno medie imprese**;
- **PA centrali** Allegato III lett. a);
- soggetti individuati dall'Autorità competente NIS con notifica.

**Importanti**: tutti gli altri soggetti in ambito non essenziali.

#### Codici ATECO/NACE (`AMB.GE.3`)

- Il decreto NIS **non distingue** in base a ATECO/NACE in linea generale.
- **Eccezioni** che richiamano espressamente **NACE Rev. 2**:
  - **Sez. C div. 21** — fabbricazione prodotti farmaceutici di base e preparati farmaceutici;
  - **Sez. C div. 26** — computer e prodotti elettronica/ottica;
  - **Sez. C div. 27** — apparecchiature elettriche;
  - **Sez. C div. 28** — macchinari e apparecchiature n.c.a.;
  - **Sez. C div. 29** — autoveicoli, rimorchi, semirimorchi;
  - **Sez. C div. 30** — altri mezzi di trasporto.
- Salvo questi casi, **non è possibile** determinare l'ambito da ATECO/NACE.

#### Principio di non-prevalenza con 3 eccezioni (`AMB.GE.4`)

- Regola: rientrano in ambito anche le attività svolte **in forma residuale**.
- **Eccezioni** dove la non-essenzialità dell'attività esclude l'ambito:
  - **Acque reflue** (Allegato I): "*escluse le imprese per cui la raccolta, lo smaltimento o il trattamento di acque reflue urbane, domestiche o industriali è una parte non essenziale della loro attività generale*" (Dir. 91/271/CEE);
  - **Gestione rifiuti** (Allegato II): "*escluse quelle per cui la gestione dei rifiuti non è la principale attività economica*" (Dir. 2008/98/CE);
  - **Acqua potabile** (Allegato I): "*esclusi i distributori per i quali la distribuzione di acque destinate al consumo umano è una parte non essenziale dell'attività generale di distribuzione di altri prodotti e beni*" (Dir. UE 2020/2184).

#### Attività effettivamente svolte (`AMB.GE.5`)

- Conta **lo stato attuale** delle attività/servizi, non l'oggetto sociale o i codici ATECO/NACE registrati: questi ultimi sono **indicativi e non tassativi**.

#### Fornitori NON sono automaticamente in ambito (`AMB.GE.6`)

- Non c'è propagazione automatica dell'ambito dalla supply chain del soggetto NIS.
- I fornitori **non sono soggetti NIS** per il solo fatto di servire un soggetto NIS.
- Restano gli **obblighi contrattuali** che il soggetto NIS è tenuto a imporre per gestire il rischio di catena di approvvigionamento (art. 24 lett. d) decreto NIS, misura `GV.SC-01`).

#### Imprese collegate/associate (`AMB.GE.7`)

- **Art. 3 c. 10** attrae **indipendentemente dalle dimensioni** le imprese che esercitano **controllo** o offrono determinati **servizi** al soggetto NIS dello stesso gruppo (lett. a/b/c/d).
- In registrazione: dichiarazione di verso quali soggetti NIS del gruppo si soddisfano i criteri; sezione tipologie di soggetto consente di indicare "**soggetto NIS unicamente in forza dell'art. 3 c. 10**".
- **Vincoli giurisdizionali**: l'art. 3 c. 10 vale solo verso soggetti NIS **nazionali**; non rileva tra soggetti a cui non si applica la giurisdizione nazionale.
- Le organizzazioni che soddisfano lett. b/c/d dell'art. 3 c. 10 potrebbero anche ricadere ex Allegato I (settori **infrastrutture digitali** e **gestione servizi TIC**) indipendentemente dall'art. 3 c. 10.

#### Associazioni datoriali/territoriali/di settore (`AMB.GE.8`)

- **Non automaticamente** in ambito.
- Possibile inclusione se i servizi alle imprese associate sono riconducibili a tipologie I/II (es. fornitore cloud, MSP, registrar) e i criteri dimensionali sono soddisfatti.
- Anche **organizzazioni senza scopo di lucro** possono ricadere in ambito.

### Dimensione (`AMB.DI.1`..`AMB.DI.3`)

#### Definizione PMI (`AMB.DI.1`)

Riferimento **Racc. 2003/361/CE** + Guida dell'utente alla definizione di PMI (Commissione UE, 2020):

| Categoria | Effettivi | Fatturato annuo | Bilancio annuo |
|---|---|---|---|
| **Microimpresa** | <10 | ≤ 2 M€ | ≤ 2 M€ |
| **Piccola impresa** | <50 | ≤ 10 M€ | ≤ 10 M€ |
| **Media impresa** | <250 | ≤ 50 M€ | ≤ 43 M€ |

**Regola di soglia**: per essere PMI servono **sempre** entrambi:
- criterio del **n. effettivi**;
- almeno **uno tra** fatturato e bilancio (alternativi).

Se entrambi i parametri contabili sono superati **oppure** se il criterio degli effettivi è superato, si sale alla categoria superiore (o si entra tra le grandi imprese).

**Esempi della FAQ** (da `AMB.DI.1`):
- <50 occupati, fatturato 2-10 M€, bilancio >43 M€ → **piccola** (effettivi limita).
- <10 occupati, fatturato e bilancio 10-43 M€ → **media** (entrambi i contabili sopra-soglia).
- <10 occupati, fatturato >50 M€, bilancio 10-43 M€ → **media** (un solo contabile sopra fa media, non grande).
- <10 occupati, fatturato ≥50 M€, bilancio ≥43 M€ → **grande** (entrambi i contabili sopra → grande).
- 50 ≤ x < 250 dipendenti, fatturato + bilancio ≤ 10 M€ → **media** (effettivi limita).
- ≥250 dipendenti, fatturato + bilancio ≤ 10 M€ → **grande** (effettivi limita).

> *Nota dell'agente:* l'esempio 4 è riportato come nel testo della FAQ ("un fatturato di almeno 50 milioni e un bilancio di almeno 43 milioni, ricade nella categoria delle grandi imprese"). La definizione di media impresa nella stessa FAQ usa invece "non superiore a 50 milioni" / "non superiore a 43 milioni": un soggetto con valori esattamente pari a 50 M€ e 43 M€ sarebbe media secondo la definizione e grande secondo l'esempio. Ambiguità al confine, da risolvere sul testo della Racc. 2003/361/CE.

**Calcolo per gruppi**: art. 6 par. 2 Racc. 2003/361/CE — consolidamento con imprese collegate/associate. Possibile **deroga** ex art. 3 c. 4 decreto NIS via [[concepts/Clausola di salvaguardia]] DPCM 221/2024.

> Nota della FAQ: l'impostazione segue anche l'**Autorità nazionale competente NIS belga**; le interpretazioni di fonti non ufficiali non saranno prese in considerazione.

#### Micro/piccole — eccezioni di inclusione (`AMB.DI.2`)

In ambito **a prescindere** anche micro/piccole se:
- art. 3 c. 5 lett. b) — fornitori reti/servizi telco accessibili al pubblico;
- art. 3 c. 5 lett. c) — prestatori di servizi fiduciari;
- art. 3 c. 5 lett. d) — gestori registri TLD + fornitori DNS;
- art. 3 c. 5 lett. e) — fornitori servizi registrazione nomi di dominio.

PA Allegato III: in ambito **indipendentemente dalla dimensione**.

Resta sempre la **identificazione governativa** ex art. 9 + notifica art. 3 c. 13.

#### Medie/grandi (`AMB.DI.3`)

- Tutte le medie/grandi che svolgono attività delle tipologie Allegati I/II/III/IV sono in ambito.
- Per **Allegato IV**: obbligo solo dopo notifica di individuazione (art. 3 cc. 8, 13).

### Gruppi di imprese (`AMB.GI.1`..`AMB.GI.3`)

#### Attività infragruppo (`AMB.GI.1`)

- Direttiva e decreto NIS si applicano alle **legal entity**, non a gruppi/consorzi/aggregazioni.
- **Non rileva** se i servizi sono erogati a soggetti dentro o fuori il gruppo: rientrano in ambito anche le organizzazioni che svolgono attività delle tipologie I/II/III/IV **esclusivamente verso il proprio gruppo o consorzio**.

#### Clausola di salvaguardia (`AMB.GI.2`)

- **Riferimenti**: art. 3 c. 4 decreto NIS + **DPCM n. 221 del 9 dicembre 2024** (GU 10 febbraio 2025).
- **Funzione**: mitigare effetti sproporzionati dell'art. 6 par. 2 Racc. 2003/361/CE (consolidamento con imprese collegate/associate).
- **Effetto**: disapplicazione dell'art. 6 par. 2 → potenziale declassamento (grande → media; media → piccola → fuori ambito).
- **Concessa** dall'Autorità di settore competente "*tenuto anche conto dell'indipendenza del soggetto dalle sue imprese collegate in termini di sistemi informativi e di rete che utilizza nella fornitura dei suoi servizi e in termini di servizi che fornisce*".
- **Criteri DPCM 221/2024** (art. 3 c. 1 DPCM):
  - lett. a) **totale indipendenza dei sistemi informativi e di rete NIS** dalle imprese del gruppo;
  - lett. b) **totale indipendenza delle attività e servizi NIS** dalle imprese collegate;
  - art. 3 c. 2 DPCM: non si applica l'art. 3 c. 10 decreto NIS al richiedente.
- **Procedura**: il pdc dichiara in registrazione + fornisce dimensioni **disapplicando** art. 6 par. 2; le Autorità di settore valutano in fase di analisi; **comunicazione di esito** con la notifica di inizio aprile (art. 7 c. 3 decreto NIS).

#### Chi NON può richiedere la salvaguardia (`AMB.GI.3`)

- **Imprese autonome** (senza imprese collegate/associate).
- Organizzazioni attratte ex **art. 3 c. 10** decreto NIS.
- Organizzazioni i cui **sistemi NIS** dipendono **anche solo in forma residuale** dai sistemi delle imprese del gruppo.
- Organizzazioni le cui **attività/servizi NIS** dipendono **anche solo in forma residuale** dalle attività/servizi delle imprese del gruppo.

### Settore pubblico (`AMB.PU.1`..`AMB.PU.2`)

#### PA in ambito (`AMB.PU.1`)

- 15 categorie ex Allegato III decreto NIS, riprese dall'**elenco ISTAT** del bilancio consolidato dello Stato.
- **Tutte le PA centrali**.
- PA locali: **Regioni + Province autonome**, **Città metropolitane**, **Comuni** con popolazione **>100.000 abitanti**, **Comuni capoluoghi di regione**, **ASL**.
- **Fuori ambito** in linea generale: comuni non capoluoghi con ≤100k abitanti, **Unioni di comuni**, **scuole** (salvo svolgimento di attività ex Allegati I/II o notifica art. 3 c. 13).

> *Nota redazionale (2026-10-27):* la FAQ conta le Regioni tra le amministrazioni locali e non elenca la lett. d) ("altri soggetti pubblici"); l'elenco vigente è nell'Allegato III del D.Lgs. 138/2024 (lett. a)-d), 15 categorie), riportato in [[sources/D.Lgs. 138-2024 (Decreto NIS)]]. I punti sopra restano fedeli al testo della FAQ.

#### Altre organizzazioni del settore pubblico (`AMB.PU.2`)

- **Società in-house, partecipate, a controllo pubblico** (D.Lgs. 175/2016) → in ambito se svolgono attività ex Allegati I/II e sono **medie/grandi**.
- Se assimilabili a micro/piccole → in ambito se svolgono attività delle 4 fattispecie indipendenti dalla dimensione (telco, fiduciari, DNS/TLD, registrar) — vedi `AMB.DI.2`.
- Allegato IV: obbligo solo a seguito notifica di individuazione.

### Organizzazioni estere (`AMB.ES.1`..`AMB.ES.3`)

#### EU stabiliti in Italia (`AMB.ES.1`)

- **Default**: rientrano in ambito le legal entity stabilite in Italia (anche di diritto di altri SM).
- Per i gruppi multinazionali: **solo le legal entity stabilite in Italia** (salvo eccezioni).
- **Eccezioni transfrontaliere** (art. 5 decreto NIS):
  - Telco accessibili al pubblico → giurisdizione **congiunta** di tutti gli SM in cui offrono servizi (art. 5 c. 1 lett. a);
  - Servizi inerentemente transfrontalieri (DNS, registri TLD, registrar, cloud, data center, CDN, MSP, MSSP, mercati online, motori di ricerca, social network) → giurisdizione dello SM dove è lo **stabilimento principale UE** (art. 5 c. 2).
- **Stabilimento principale**: è una sede della singola legal entity; **non rilevano** le imprese collegate (art. 1 c. 1 lett. cc) **Det. ACN 379887/2025**).

#### Extra-UE stabiliti in Italia (`AMB.ES.2`)

- Stessa disciplina di `AMB.ES.1`, con la specifica che per i servizi inerentemente transfrontalieri **senza stabilimento UE** la giurisdizione è quella dello SM dove è designato il **rappresentante UE** (art. 5 c. 3).

#### Estere fuori dal territorio nazionale (`AMB.ES.3`)

- **Default**: fuori ambito se non stabilite in Italia, salvo eccezioni telco e servizi transfrontalieri.
- Soggette alla **giurisdizione di altri SM** (non IT):
  - telco che non offrono servizi in Italia;
  - servizi transfrontalieri il cui stabilimento principale UE non è IT;
  - soggetti senza stabilimento UE che non offrono servizi in Italia.

### Relazioni con altre normative (`AMB.NO.1`..`AMB.NO.2`)

#### CER → essenziali (`AMB.NO.1`)

- **Art. 3 c. 5 lett. a) decreto NIS**: tutti i soggetti CER ex **D.Lgs. 134/2024** (recepimento Dir. UE 2022/2557, **CER — Resilience of Critical Entities**) sono **essenziali** ai sensi del decreto NIS.
- Acquisizione qualifica CER: con il **DPCM** che reca l'elenco dei soggetti critici (art. 8 D.Lgs. 134/2024); notifica entro 30 giorni dall'adozione, sia all'organizzazione censita sia ad ACN.

#### DORA come lex specialis (`AMB.NO.2`)

- **DORA** (Reg. UE 2022/2554) = **lex specialis settoriale** per la maggior parte delle previsioni della Direttiva NIS2.
- Per i soggetti DORA medie/grandi che svolgono attività riconducibili all'**Allegato I punti 3 (settore bancario)** e **4 (infrastrutture dei mercati finanziari)** del decreto NIS si applica **solo l'art. 7 c. 1 NIS** (obbligo di registrazione).
- **Art. 3 c. 14 decreto NIS** disapplica per tali soggetti: **art. 17** (accordi di condivisione delle informazioni) + **Capi IV** (obblighi misure + notifica) + **Capo V** (regime di vigilanza).
- Resta **fermo il ruolo di [[entities/EU-CyCLONe]]** nel contesto della gestione delle crisi cyber transfrontaliere.

## Citazioni rilevanti

> "Al riguardo, salvo tre eccezioni, la riconducibilità prescinde dalla prevalenza dell'attività svolta dal soggetto. Pertanto, un soggetto rientra nell'ambito di applicazione anche qualora svolga solo in forma residuale attività riconducibili alle tipologie di soggetto di cui agli allegati I, II, III e IV." — `AMB.GE.4`.

> "Le organizzazioni che non soddisfano i criteri di cui all'articolo 3 del decreto NIS non rientrano automaticamente nell'ambito di applicazione del decreto NIS per il solo fatto di fornire servizi a soggetti NIS […]. Tuttavia, i soggetti NIS, al fine di gestire il rischio informatico che deriva dalla propria catena di approvvigionamento, digitale o meno, dovranno imporre obblighi contrattuali ai propri fornitori." — `AMB.GE.6`.

> "DORA (Regolamento (UE) 2022/2554) è considerato lex specialis settoriale per la maggior parte delle previsioni della Direttiva NIS (2022/2555). Pertanto, ai soggetti DORA […] si applicano solamente le disposizioni del decreto NIS relative all'obbligo di registrazione (articolo 7, comma 1, del decreto NIS)." — `AMB.NO.2`.

## Entità menzionate

- [[entities/ACN]]
- [[entities/Autorità di settore NIS]]
- [[entities/EU-CyCLONe]]

## Concetti collegati

- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Settori altamente critici e critici]]
- [[concepts/Size-cap rule]]
- [[concepts/Identificazione dei soggetti NIS]]
- [[concepts/Clausola di salvaguardia]]
- [[concepts/Coordinamento DORA-NIS]]
- [[concepts/Soggetti PSNC-NIS]]

## Note dell'agente

- *Sintesi dell'agente:* il cluster `AMB.GE` introduce **tre regole di proporzionalità inverse** alla logica generale:
  1. la **non-prevalenza** (regola: includi anche se residuale) **vs** le 3 eccezioni "core-only" (acque reflue, rifiuti, acqua potabile);
  2. l'**indipendenza dimensionale** per 4 settori critici per il funzionamento di Internet (telco/fiduciari/DNS/registrar);
  3. l'**attrazione gruppale** ex art. 3 c. 10 (entità anche piccole tirate dentro per legame con un soggetto NIS).
  La FAQ `AMB.DI.1` in particolare costituisce il **glossario operativo** della Racc. 2003/361/CE: i 6 esempi numerici sono lo strumento più utile per i pdc.
- **Numeri di protocollo confermati**:
  - **DPCM 221/2024 del 9 dicembre 2024** (GU 10 febbraio 2025) = clausola di salvaguardia.
  - **D.Lgs. 134/2024** = recepimento Direttiva CER (UE 2022/2557).
  - **Det. ACN 379887/2025** citata come riferimento per le definizioni di "imprese collegate" (art. 1 c. 1 lett. cc) — è la versione *predecessora* della determinazione del 13/04/2026.
- **DORA → NIS solo art. 7 c. 1** (`AMB.NO.2`) è il punto più sintetico: per banche e infrastrutture mercati finanziari **medie/grandi**, l'unico obbligo NIS è la **registrazione**, tutto il resto (art. 17 + Capi IV-V) disapplicato. Fermo restando il ruolo di EU-CyCLONe.
- **`AMB.GI.3`** è la lista nera della clausola di salvaguardia: **dipendenza residuale** è già sufficiente a precludere — soglia molto stringente.
- *Sintesi dell'agente:* il combinato `AMB.PU.1` + `AMB.PU.2` mostra che il decreto NIS in Italia **non copre l'intero settore pubblico**: scuole e comuni piccoli sono fuori, salvo identificazione governativa. È un'asimmetria rispetto al regime CER (che non ha questa esclusione di soglia).
- Nota di traduzione: caratteri "à è ò ù" appaiono come "�" nel testo estratto.
- Nota redazionale: la FAQ `AMB.DI.2` cita "decreto legislativo 134/2024 (cd. decreto NIS)" — è un errore della FAQ, il decreto NIS è il D.Lgs. 138/2024 (134/2024 è il decreto CER). Lo stesso errore si ripete in `AMB.DI.3`.
