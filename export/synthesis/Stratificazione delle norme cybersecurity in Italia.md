---
title: Stratificazione delle norme cybersecurity in Italia
type: synthesis
scope: both
question: "In quale regime di cybersicurezza italiano ricade un soggetto e cosa deve fare? Come si coordinano PSNC, NIS2, DORA, Regolamento Cloud PA e Legge 90/2024?"
tags: [stratificazione, psnc, nis2, dora, cloud-pa, legge-90-2024, governance, coordinamento]
sources: ["[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/Determinazione ACN categorizzazione - 2026-04-13]]", "[[sources/Determinazione ACN funzionamento Tavolo NIS - 2025-07-16]]", "[[sources/FAQ NIS - Ambito]]", "[[sources/FAQ NIS - Categorizzazione]]", "[[sources/FAQ NIS - Ruoli e procedure]]"]
created: 2026-04-29
updated: 2026-10-28
---

## Sintesi

In Italia la cybersicurezza dei soggetti pubblici e privati è disciplinata da **cinque regimi sovrapposti** che condividono autorità (in larga misura ACN), ma differiscono per ambito soggettivo, tipologia di obblighi e logiche di vigilanza. La stratificazione produce frequentemente soggetti **con doppia o tripla disciplina**: il legislatore italiano (e in parte UE) **non sostituisce** un regime con l'altro ma li **coordina** tramite **rinvii, esoneri puntuali e automatismi**. Mappare correttamente i regimi applicabili è il primo passo operativo per ogni soggetto rientrante.

## I cinque regimi

### 1. PSNC — Perimetro di Sicurezza Nazionale Cibernetica
- **Atto base**: [[D.L. 105-2019 (perimetro)]] (convertito L. 133/2019) + DPCM attuativi.
- **Ambito soggettivo**: soggetti che svolgono **funzioni essenziali per lo Stato** o erogano servizi la cui interruzione comprometterebbe sicurezza nazionale, ordine pubblico, difesa.
- **Logica regolatoria**: identificazione **autoritativa** (decreto del Presidente del Consiglio); elenco classificato; obblighi tecnici stringenti (notifica incidenti golden power, ispezioni, scrutinio tecnologico CVCN).
- **Numero soggetti**: ristretto (poche centinaia, classificato).

### 2. NIS2 — Direttiva (UE) 2022/2555 e [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]]
- **Ambito soggettivo**: soggetti dei 17 [[concepts/Settori altamente critici e critici|settori altamente critici e critici]] (Allegati I-II) + PA (Allegato III) + soggetti identificati autoritativamente (Allegato IV) — di norma sopra soglia dimensionale, con eccezioni "size-blind".
- **Logica regolatoria**: auto-registrazione su [[concepts/Piattaforma digitale ACN|piattaforma ACN]] + verifica/conferma da ACN; classificazione [[concepts/Soggetti essenziali e importanti|essenziale/importante]]; obblighi su misure (art. 24), notifica (art. 25), governance (art. 23).
- **Numero soggetti**: **ampio** (migliaia, in crescita rispetto a NIS1).

### 3. DORA — Regolamento (UE) 2022/2554
- **Ambito soggettivo**: **entità finanziarie** UE (banche, assicurazioni, IMF, fornitori cloud critici per il finanziario).
- **Logica regolatoria**: regolamento UE **direttamente applicabile**; vigilanza condivisa tra Banca d'Italia / Consob / IVASS / ESAs; ICT-related incident reporting verso ESAs; framework operational resilience.
- **Numero soggetti**: ampio per il settore finanziario, ma chiuso (perimetro definito da DORA stesso).

### 4. Regolamento Cloud PA
- **Atto base**: **DD ACN n. 21007/24 del 27/06/2024** ("Regolamento Cloud").
- **Ambito soggettivo**: tutte le **PA** che adottano servizi cloud per dati e servizi digitali (perimetro CAD ampio).
- **Logica regolatoria**: classificazione obbligatoria di dati e servizi in **ordinari / critici / strategici** (art. 3 + Allegato 1); pubblicazione su `padigitale2026.gov.it`; vincoli di qualifica per fornitori cloud.
- **Numero soggetti**: tutte le PA italiane.

### 5. Legge 90/2024
- **Atto base**: **L. 28 giugno 2024, n. 90**, "Disposizioni in materia di rafforzamento della cybersicurezza nazionale e di reati informatici" (GU 02/07/2024 n. 153, in vigore dal 17/07/2024). Cfr. [[sources/Legge 90-2024 (cybersicurezza nazionale)]].
- **Ambito soggettivo (art. 1 c. 1)**: elenco **tassativo** — PA centrali (Lista S13 ISTAT ex L. 196/2009), Regioni + Province autonome, Città metropolitane, Comuni > 100.000 abitanti + Comuni capoluogo di regione, società di trasporto pubblico urbano (bacino ≥ 100k) + extraurbano in città metropolitane, ASL, **società in house** dei soggetti precedenti **solo se forniscono** servizi informatici / trasporto qualificato / acque reflue (Dir. 91/271/CEE) / gestione rifiuti (Dir. 2008/98/CE). Cfr. [[concepts/Perimetro Legge 90-2024]].
- **Esclusioni (art. 1 c. 7)**: soggetti NIS ex D.Lgs. 65/2018 (→ D.Lgs. 138/2024 via art. 15-bis) + soggetti PSNC + organi sicurezza/intelligence (L. 124/2007 artt. 4, 6, 7).
- **Phase-in (art. 1 c. 3)**: applicazione immediata per PA centrali/Regioni; **180 giorni** (= 14/01/2025) per comuni, trasporto, ASL, in house.
- **Logica regolatoria**: notifica incidenti scaglionata **24h+72h** (no report 1 mese, cfr. [[concepts/Notifica di incidente significativo]] § disallineamento); adeguamento a segnalazioni vulnerabilità ACN entro 15 gg (art. 2); designazione del [[concepts/Referente per la cybersicurezza (L. 90-2024)|referente per la cybersicurezza]] (art. 8 c. 2) all'interno di una struttura interna con 7 funzioni (art. 8 c. 1); [[concepts/Elementi essenziali di cybersicurezza (procurement)|elementi essenziali di cybersicurezza]] nei contratti pubblici ICT strategici (art. 14); sanzioni € 25-125k per reiterata inosservanza (art. 1 c. 6, allineate alle PA NIS).
- **Art. 15-bis — Disposizione di coordinamento (chiave)**: *"Ogni riferimento al D.Lgs. 65/2018 è da intendersi alle corrispondenti disposizioni di cui al D.Lgs. 138/2024, a decorrere dalla data in cui le stesse acquistano efficacia."* → risolve la transizione NIS1 → NIS2 nei rinvii della L. 90.
- **Numero soggetti**: limitato (~200-300), parzialmente sovrapposto con PA NIS (Allegato III) — ma per la maggioranza dei soggetti L. 90 ∩ NIS, l'art. 1 c. 7 lett. a) **disapplica la L. 90** a favore del solo NIS.
- **Capo II (artt. 16-23)** — non strettamente "regime di compliance", ma rilevante per consulenza GRC: riforma reati informatici (615-ter et seq.) con aumento pene + **estorsione informatica** (nuovo 629 c. 3 c.p., 6-12 anni) + estensione [[D.Lgs. 231-2001]] all'aggiornato catalogo cyber-criminale. Per dettaglio: source L. 90 §§ Capo II.

## Matrice di intersezione

I cinque regimi si combinano in modi sistematici. La tabella sintetizza i casi tipici (la cella indica i regimi tipicamente cumulati):

| Tipo di soggetto | PSNC | NIS2 | DORA | Cloud PA | L. 90/2024 |
|---|---|---|---|---|---|
| PA centrale (ministero, agenzia) | possibile | sì (All. III) | no | sì | sì |
| Comune capoluogo > 100k abitanti | no | sì (All. III) | no | sì | sì |
| ASL / azienda ospedaliera | possibile | sì (All. I p. 5 + All. III) | no | sì | sì |
| Banca grande | possibile | sì (All. I p. 3) | sì | no | no |
| Operatore TLC backbone | sì (tipico) | sì (All. I p. 8) | no | no | no |
| Operatore energia critico | sì (tipico) | sì (All. I p. 1) | no | no | no |
| MSSP / cloud provider | possibile | sì (All. I p. 9 / p. 8) | possibile (se ICT critico DORA) | no | no |
| PMI manifatturiera (NACE C div. 28) | no | sì (All. II p. 5) — solo se grande/media | no | no | no |
| Università pubblica | no | sì (All. III + All. I p. 5 se sanitario) | no | sì | possibile |

> *Sintesi dell'agente:* la "fascia alta" della stratificazione (PSNC + NIS2 + Cloud PA + L. 90/2024 per PA critiche; PSNC + NIS2 + DORA per banca/IMF) è il caso più complesso: il soggetto convive con quattro autorità di interlocuzione (ACN + autorità di settore NIS + Banca d'Italia + DPCM PSNC) e altrettanti calendari di adempimento.

## Punti concreti di coordinamento normativo

I rinvii e gli esoneri **espliciti** che ho ricostruito dal corpus:

### PSNC ↔ NIS2 — automatismo "impatto alto"
- **Art. 5 [[sources/Determinazione ACN categorizzazione - 2026-04-13|Det. 155238/2026]]**: alle attività e ai servizi soggetti agli obblighi PSNC è **automaticamente attribuita la categoria "impatto alto"**, e tali servizi **non sono oggetto del procedimento ordinario di categorizzazione** ex art. 3.
- **FAQ Categorizzazione `CAT.9`**: i servizi PSNC **NON si indicano** nell'elenco categorizzato della piattaforma NIS — sono fuori-elenco con etichetta automatica.
- *Razionale:* evitare doppio lavoro per i soggetti perimetro + dare priorità regolatoria al regime più stringente (PSNC).
- Cfr. [[concepts/Soggetti PSNC-NIS]].

### DORA ↔ NIS2 — esoneri puntuali
- **Legge** ([[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]], art. 3 c. 14): ai soggetti essenziali o importanti dei **settori 3 (bancario) e 4 (IMF) dell'Allegato I** non si applicano l'art. 17 e i Capi IV e V; si applica DORA. Restano le altre disposizioni del decreto, tra cui registrazione e aggiornamento ex art. 7. La [[sources/FAQ NIS - Ambito|FAQ Ambito `AMB.NO.2`]] parla di sola registrazione (art. 7 c. 1) ma richiama lo stesso c. 14: incoerenza interna, fa testo il decreto.
- **Esoneri operativi per determinazione** (Det. piattaforma 127437/2026), riferiti alle entità finanziarie DORA che rientrano nell'ambito NIS, senza limitazione ai settori 3 e 4:
  - **Art. 7 c. 6**: esonero dalla designazione del [[entities/Referente CSIRT|referente CSIRT]] (ICT-related incident reporting già coperto da DORA verso ESAs / Banca d'Italia).
  - **Art. 16 c. 13** + **art. 17**: esonero dall'aggiornamento annuale della componente "organi di amministrazione e direttivi".
  - **Art. 20 c. 6**: esonero dalla [[concepts/Categorizzazione dei soggetti|categorizzazione]] delle attività e dei servizi.
- **Salvaguardia DORA nel Tavolo NIS**: art. 3 c. 3 [[sources/Determinazione ACN funzionamento Tavolo NIS - 2025-07-16|Det. funzionamento Tavolo NIS]] fa salve le attribuzioni delle autorità del sistema finanziario UE.
- **Adesione volontaria** ammessa per ogni esonero.
- Cfr. [[concepts/Coordinamento DORA-NIS]].

### Cloud PA ↔ NIS2 — due raccordi distinti
- **Categorizzazione — art. 4 [[sources/Determinazione ACN categorizzazione - 2026-04-13|Det. 155238/2026]]**: "I soggetti NIS che hanno svolto la classificazione dei dati e dei servizi di cui all'articolo 3 del Decreto Direttoriale ACN n. 21007/24" (Regolamento Cloud: ordinari/critici/strategici) **applicano quel modello in luogo del modello di categorizzazione NIS**. La condizione è aver svolto la classificazione, non l'essere PA.
- **FAQ `CAT.8`** ([[sources/FAQ NIS - Categorizzazione]]): a tali soggetti viene presentato l'elenco dei dati e servizi classificati presente su `padigitale2026.gov.it` con facoltà di **confermare** o **aggiornare** (assicurando la coerenza con la classificazione su PA digitale 2026).
- **Ambito — FAQ `A1.8.2`** ([[sources/FAQ NIS - Settori, sottosettori e tipologie di soggetto]]): i fornitori di servizi cloud qualificati ai sensi del Regolamento Cloud che superano i massimali delle piccole imprese rientrano nel decreto NIS come fornitori di servizi cloud (Allegato I, punto 8).
- *Razionale:* evitare duplicazione per chi ha già adempiuto al Regolamento Cloud.

### L. 90/2024 ↔ NIS2 — sovrapposizione del referente
- **Art. 4 c. 8 [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|Det. piattaforma 127437/2026]]**: la designazione del [[entities/Punto di contatto NIS|punto di contatto NIS]] **può soddisfare anche l'obbligo di nomina** del **referente per la cybersicurezza** ex **art. 8 c. 2 L. 90/2024**, per i soggetti che ricadono nell'art. 1 c. 1 di quella legge.
- *Razionale:* il pdc NIS e il referente L. 90/2024 hanno funzione operativa sostanzialmente sovrapposta (interlocuzione con ACN su cybersicurezza).
- *Sintesi dell'agente:* cumulo dei due ruoli formali su un'unica persona fisica — per le PA interessate è la prassi attesa.

## Decision tree pratico

Per un soggetto che voglia capire i regimi applicabili:

1. **Sei soggetto perimetro PSNC?** (DPCM ad hoc ti ha incluso?)
   - Sì → PSNC + verifica gli altri regimi sotto.
2. **Rientri nei settori NIS2?** (Allegati I/II/III/IV D.Lgs. 138/2024 + soglia dimensionale o eccezioni size-blind)
   - Sì → NIS2. Se anche PSNC → categoria "impatto alto" automatica, no categorizzazione ordinaria.
3. **Sei entità finanziaria DORA?**
   - Sì → DORA primario. Se anche NIS2 (All. I p. 3 / p. 4) → art. 17 e Capi IV-V NIS non applicabili (art. 3 c. 14); restano registrazione e aggiornamento ex art. 7, con gli esoneri di piattaforma della Det. 127437/2026.
4. **Sei una PA?**
   - Sì → Regolamento Cloud applicabile per dati/servizi cloud. Se anche NIS2 e ha svolto la classificazione ex art. 3 DD ACN 21007/24 → modello Cloud in luogo del modello NIS per la categorizzazione (art. 4 Det. 155238/2026, FAQ `CAT.8`).
5. **Sei una PA / soggetto pubblico nell'art. 1 c. 1 L. 90/2024?**
   - Sì → L. 90/2024 + designazione referente cybersicurezza assolvibile col pdc NIS.

## Tensioni e contraddizioni

- **PSNC vs NIS2 — dove finisce uno e comincia l'altro?** Il DPCM PSNC è coperto da classifica e individua il perimetro; la determinazione di categorizzazione NIS (155238/2026) presuppone che il soggetto **sappia già** quali suoi servizi siano "PSNC". Nei soggetti misti questa conoscenza richiede coordinamento interno tra responsabili PSNC e responsabili NIS.
- **DORA vs NIS2 — due platee diverse.** L'esonero di legge (art. 3 c. 14) riguarda i soggetti dei settori 3 e 4 e copre art. 17 e Capi IV-V; gli esoneri della Det. 127437/2026 riguardano tutte le entità finanziarie DORA in ambito NIS e coprono tre adempimenti di piattaforma (referente CSIRT, organi di amministrazione, categorizzazione), con adesione volontaria. *Inferenza:* un'entità finanziaria che rientra in NIS anche per attività di altri settori resta soggetta al Capo IV per quelle attività, notifica degli incidenti compresa, pur essendo esentata dalla designazione del referente CSIRT: per questi soggetti l'adesione volontaria al referente è la scelta coerente.
- **Cloud PA vs NIS2 — mapping di categorie.** Il Regolamento Cloud usa **3 categorie** (ordinari/critici/strategici), il modello NIS usa **4 categorie** (minimo/basso/medio/alto). Il mapping non è 1:1; la determinazione 155238/2026 dice "applicano quel modello", non chiarisce come si traducono le categorie in fase di categorizzazione → vigilanza ACN. *Lacuna nota* da monitorare.
- **L. 90/2024 vs NIS2 — perimetro non coincidente.** L. 90 ha platea propria (art. 1 c. 1), che si sovrappone solo parzialmente con PA NIS (Allegato III). Soggetti L. 90 ma non NIS esistono e devono comunque designare il referente cybersicurezza ex art. 8 c. 2 — per loro il "merging" con il pdc NIS non è applicabile.

## Domande aperte

- **Come si interfacciano in concreto le notifiche di incidente** quando un soggetto è simultaneamente PSNC, NIS2, L. 90/2024? La risposta nominale è "una sola notifica al CSIRT che le smista", ma le tempistiche scaglionate (24h-72h-1mese NIS vs golden power PSNC) e il livello di classifica differiscono.
- **Il mapping ordinari/critici/strategici → minimo/basso/medio/alto** è semantica regolatoria che ACN dovrà esplicitare prima della prima finestra di categorizzazione (1 maggio - 30 giugno 2026).
- **DORA + PSNC**: una banca di rilevanza sistemica può essere anche PSNC. In quel caso PSNC tipicamente prevale per le specifiche tecniche; gli esoneri DORA in NIS si applicano comunque rispetto a NIS, ma l'interazione PSNC ↔ DORA non è oggetto delle determinazioni ACN NIS — va cercata nel diritto del settore finanziario UE.

## Collegamenti

- [[concepts/Soggetti PSNC-NIS]] — concetto-chiave per il caso PSNC ∩ NIS2.
- [[concepts/Coordinamento DORA-NIS]] — concetto-chiave per il caso DORA ∩ NIS2.
- [[concepts/Categorizzazione dei soggetti]] — destinazione operativa degli automatismi PSNC/Cloud PA.
- [[concepts/Identificazione dei soggetti NIS]] — punto di ingresso del ciclo NIS.
- [[concepts/Clausola di salvaguardia]] — meccanismo trasversale di esclusione (sicurezza nazionale, difesa).
- [[entities/ACN]] — autorità unica per NIS + Cloud PA + L. 90/2024 (porta unica di interlocuzione, nonostante regimi distinti).
