---
title: Coordinamento Reg. UE 2024/2690 e Det. ACN 379907/2025
type: synthesis
question: "Come si coordinano normativamente il Reg. UE 2024/2690 (direttamente applicabile a 11 categorie di soggetti pertinenti) e la Det. ACN 379907/2025 (specifiche di base nazionali) per un soggetto NIS italiano che ricade in entrambi gli ambiti — in particolare per i fornitori di servizi cloud?"
tags: [nis2, coordinamento-normativo, reg-ue-2024-2690, det-acn-379907, cloud-computing, dsp, pilot-tool, primato-diritto-ue]
sources: ["[[sources/Regolamento di esecuzione UE 2024-2690]]", "[[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]", "[[sources/Direttiva (UE) 2022-2555 (NIS2)]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/Guida lettura specifiche di base]]"]
scope: nis2_tool
aliases: [Reg UE 2690 vs det ACN 379907, Coordinamento UE-IT NIS2 DSP]
---

## Domanda originale

Per un fornitore italiano di servizi di cloud computing (uno dei tre pilot sector del [[synthesis/Stratificazione delle norme cybersecurity in Italia|NIS2 Self-Assessment Tool]]), qual è il regime applicabile in materia di **misure di sicurezza** (art. 21 NIS2) e di **significatività degli incidenti** (art. 23 par. 3 NIS2)?

Tre tesi a priori:

- **T1 — Solo Reg. UE 2024/2690**: l'atto UE direttamente applicabile prevale interamente; la det. ACN non si applica ai fornitori cloud italiani.
- **T2 — Solo Det. ACN 379907/2025**: il soggetto, in quanto soggetto NIS italiano, segue solo il regime nazionale; il Reg. UE costituirebbe un *floor* europeo non applicabile direttamente.
- **T3 — Applicazione cumulativa con primato UE su conflitti**: i due regimi si sommano; in caso di conflitto, prevale il diritto UE direttamente applicabile.

La risposta è **T3**, con alcune precisazioni che il presente nodo ricostruisce.

## Quadro normativo essenziale

### Atto 1 — Reg. UE 2024/2690 (livello UE, diretto)

- **Natura giuridica**: atto di esecuzione della Commissione ex art. 21 par. 5 + art. 23 par. 11 NIS2. **Regolamento** = direttamente applicabile in tutti gli Stati membri (art. 288 TFUE).
- **Ambito soggettivo**: 11 categorie chiuse di soggetti pertinenti (DNS, TLD, **cloud**, data center, CDN, MSP, MSSP, marketplace, search engine, social network, trust services).
- **Ambito oggettivo**: requisiti tecnici e metodologici delle misure ex art. 21 par. 2 NIS2 (Allegato — 13 sezioni) + criteri di significatività incidenti (artt. 3-14).
- **Clausola di esaustività**: i criteri di significatività incidenti sono **esaustivi** (cons. 30), fatto salvo l'art. 5 NIS2 (sicurezza nazionale). **Per le misure**, nessuna clausola di esaustività analoga.
- **Entrata in vigore**: 7/11/2024 (20 giorni dopo pubblicazione).
- Cfr. [[sources/Regolamento di esecuzione UE 2024-2690]].

### Atto 2 — Det. ACN 379907/2025 (livello IT, recepimento + dettaglio)

- **Natura giuridica**: determinazione del Direttore generale ACN ex art. 31 cc. 1-2 + art. 40 c. 5 lett. l) + art. 42 c. 1 lett. c) D.Lgs. 138/2024. Atto sub-legislativo nazionale.
- **Ambito soggettivo**: **tutti** i soggetti NIS italiani (essenziali + importanti), indipendentemente dal settore — quindi anche i fornitori cloud italiani.
- **Ambito oggettivo**: specifiche di base per gli obblighi degli artt. 23, 24, 25, 29, 32 D.Lgs. 138/2024 (misure di sicurezza + incidenti significativi di base + DNS + dominio).
- **Procedura UE 2015/1535**: esperita l'11/11/2025 (notifica progetto di regola tecnica nazionale alla Commissione — non è co-decisione, è informativa).
- **Applicazione**: dal 15 gennaio 2026.
- Cfr. [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]].

### Atto 3 — Direttiva NIS2 (livello UE, recepito)

Base giuridica comune di Atto 1 e Atto 2. Definisce:

- L'**ambito personale** (settori critici/altamente critici, soggetti essenziali/importanti).
- I **principi materiali** (art. 21 par. 1-4 = approccio multi-rischio + proporzionalità + 10 ambiti minimi).
- I **principi procedurali** sulla notifica (art. 23 par. 1-2 + 4-5 = tempistiche 24h-72h-1 mese).
- La **delega** alla Commissione (art. 21 par. 5 + art. 23 par. 11) per gli atti di esecuzione che hanno generato Atto 1.

Cfr. [[sources/Direttiva (UE) 2022-2555 (NIS2)]].

## Analisi del rapporto giuridico — perché T3 è la tesi corretta

### Punto 1 — Il diritto UE direttamente applicabile **non sostituisce** il diritto nazionale, ma vi si **integra** con primato in caso di conflitto

L'art. 288 TFUE stabilisce che il regolamento è obbligatorio e direttamente applicabile. Ma questo **non significa** che il regolamento esaurisca lo spazio normativo. In particolare:

- Il Reg. UE 2024/2690 disciplina **i requisiti tecnici** delle misure NIS2 e i criteri di significatività incidenti. Non disciplina identificazione dei soggetti, registrazione, categorizzazione, regimi transitori, sanzioni, vigilanza — temi che restano di **competenza degli Stati membri** ex direttiva NIS2.
- La det. ACN 379907/2025 disciplina sia misure/incidenti sia il regime amministrativo complessivo nazionale (registrazione, tempistiche, regimi transitori OSE/telco, ecc.).
- Per i temi non coperti dal Reg. UE, la det. ACN si applica senza riserve ai fornitori cloud italiani.

### Punto 1-bis — Perché l'art. 4 NIS2 (clausola di lex specialis) non si applica qui

Un'analisi superficiale del rapporto Reg. UE 2024/2690 ↔ Det. ACN 379907/2025 potrebbe richiamare l'art. 4 della direttiva NIS2, che disciplina il rapporto tra NIS2 e altri atti UE settoriali ("se atti settoriali UE impongono obblighi almeno equivalenti, prevalgono"). Questa clausola **non risolve** la questione del coordinamento in esame, per una ragione strutturale: l'art. 4 disciplina il rapporto tra **NIS2 e altri regimi settoriali UE** (es. DORA per la finanza, CER per le infrastrutture critiche, EECC per le telco), **non** il rapporto tra l'atto di esecuzione 2024/2690 e il diritto nazionale di recepimento. Il Reg. UE 2024/2690 e la det. ACN 379907/2025 sono entrambi *attuativi* della stessa direttiva NIS2 (artt. 21 par. 5 + 23 par. 11 per il primo; artt. 31, 40, 42 D.Lgs. 138/2024 per la seconda) — non si pongono in rapporto di specialità reciproca ma di stratificazione (UE diretto + IT recepito sulla stessa materia). Il loro coordinamento si gioca quindi sui principi generali del diritto UE (primato, applicazione diretta) e non sull'art. 4 NIS2.

### Punto 2 — Sui criteri di significatività incidenti, il Reg. UE è **esaustivo** per i soggetti pertinenti

Cons. 30 Reg. UE 2024/2690: *"I criteri fissati nel presente regolamento dovrebbero inoltre essere considerati esaustivi, fatto salvo l'articolo 5 della direttiva (UE) 2022/2555"*.

**Implicazione concreta per un fornitore cloud italiano**:

- Per stabilire se un incidente è significativo (e quindi notificabile al [[entities/CSIRT Italia]]), si applicano **direttamente** i criteri dell'art. 7 Reg. UE 2024/2690 (indisponibilità > 30 min, disponibilità limitata > 1h + > 5%/1M utenti UE, CIA compromessa per azione malevola, CIA compromessa con impatto > 5%/1M utenti UE) + criteri orizzontali dell'art. 3 (perdita finanziaria, segreti commerciali, decesso, danni salute, accesso non autorizzato malevolo, incidenti ricorrenti).
- **NON si applicano** gli IS-1/IS-2/IS-3/IS-4 della det. ACN 379907/2025 allegati 3-4 ([[concepts/Incidenti significativi di base]]) **in quanto criteri concorrenti**: il regolamento UE è esaustivo.
- *Inferenza dell'agente*: la det. ACN 379907/2025 non sembra aver previsto esplicitamente questa preminenza. La [[sources/Guida lettura specifiche di base|guida alla lettura]] non discute il punto.

### Punto 3 — Sulle misure (art. 21 par. 2 NIS2), il rapporto è più complesso

Il Reg. UE 2024/2690 **non** ha clausola di esaustività analoga al cons. 30 per le misure. L'allegato del Reg. fissa requisiti tecnici minimi (13 sezioni). La det. ACN 379907/2025 fissa misure di base più granulari (37 misure / 87 requisiti importanti; 43/116 essenziali — cfr. [[concepts/Misure di sicurezza di base]]).

**Possibili scenari**:

- **3a**: il Reg. UE pone un *floor* minimo. La det. ACN aggiunge requisiti nazionali compatibili. **Applicazione cumulativa**: il fornitore cloud applica il Reg. UE + i requisiti aggiuntivi della det. ACN che non siano in conflitto.
- **3b**: il Reg. UE prevale come *lex specialis* per i DSP. La det. ACN sui DSP non si applica per le misure. **Solo Reg. UE per le misure** dei DSP italiani.
- **3c**: in caso di conflitto puntuale (es. il Reg. UE consente discrezionalità che la det. ACN restringe), prevale il Reg. UE per il principio di **primato del diritto UE**. La det. ACN deve essere disapplicata nel punto in conflitto.

> [!warning] Open question normativa
> **Il punto non è risolto** nelle fonti ingerite. Né il Reg. UE 2024/2690, né la det. ACN 379907/2025, né la [[sources/Guida lettura specifiche di base|guida ACN]] del settembre 2025 (in vigore alla data del Reg. UE) discutono esplicitamente lo scenario. La det. ACN sembra applicarsi orizzontalmente a tutti i soggetti NIS italiani, **senza eccezioni per i DSP**.
>
> **Tesi più probabile dell'agente**: combinazione di **3a** (applicazione cumulativa: la det. ACN aggiunge requisiti nazionali compatibili rispetto al Reg. UE, che pone un *floor* armonizzato) **e 3c** (primato del diritto UE sui conflitti puntuali: dove la det. ACN restringe ciò che il Reg. UE consente o impone condizioni contrastanti, la det. ACN va disapplicata sul punto specifico).
>
> **Tesi 3b scartata**: lo scenario "Reg. UE come *lex specialis* esclusiva per i DSP, det. ACN inapplicabile per le misure" non è sostenibile perché (i) la direttiva NIS2 attribuisce esplicitamente agli Stati membri la competenza sull'attuazione delle misure (art. 21 NIS2), e il Reg. UE 2024/2690 si limita a fissare requisiti tecnici e metodologici comuni; (ii) l'esclusione totale del regime nazionale per i DSP creerebbe una discontinuità non sostenuta dal testo dell'atto UE, che non contiene clausole di esclusione del diritto nazionale al di fuori dell'esaustività sui criteri di significatività (cons. 30); (iii) la prassi italiana (notifica ex Dir. 2015/1535 della det. ACN senza obiezioni della Commissione) suggerisce che gli stessi attori istituzionali considerano i due regimi come coesistenti.
>
> **Razionale a sostegno di 3a + 3c**: (i) la direttiva NIS2 non preclude requisiti nazionali aggiuntivi (art. 5 NIS2 fa salvi gli interventi nazionali per la sicurezza); (ii) la det. ACN cita esplicitamente come fonte tecnica il [[entities/Framework Nazionale per la Cybersecurity|FNCDP]] (che a sua volta deriva da NIST CSF 2.0) e non il Reg. UE, suggerendo che lo Stato italiano consideri il proprio regime come *complementare* e non *sostitutivo*. **L'aggancio normativo è monodirezionale**: la det. ACN richiama il FNCDP come fonte tecnica, ma il FNCDP — verificato in [[sources/FNCDP 2025 v2.1 Core]] in Wave 6 Sessione 3 — non cita né NIS2, né Reg. UE 2024/2690, né la det. ACN. Il FNCDP è quindi strumento tecnico *adottato* dallo Stato italiano come riferimento di buone pratiche cyber + data protection, non *negoziato* con il regolatore UE. Questo conferma il pattern di **adozione complementare**: lo Stato italiano ha scelto autonomamente di costruire il proprio regime di misure su una base tecnica nazionale neutra (FNCDP), senza ridurre il Reg. UE a fonte sostitutiva; (iii) l'Italia ha notificato la det. ACN alla Commissione ex Dir. UE 2015/1535 (procedura di informazione regole tecniche), e la Commissione non ha sollevato obiezioni — sintomo che la det. è ritenuta compatibile; (iv) il primato UE sui conflitti puntuali (3c) è principio di sistema dell'ordinamento unionale codificato dalla CGUE (sentenze Costa/ENEL C-6/64; Simmenthal C-106/77) e oggi richiamato nella dichiarazione 17 allegata al TUE — non richiede una clausola espressa nell'atto UE, opera *ex lege*.

### Punto 4 — La definizione del soggetto "fornitore di servizi di cloud computing"

La qualifica come "fornitore di servizi di cloud computing" è definita all'**art. 6 punto (30)** della direttiva NIS2:

> *"servizio di cloud computing": un servizio digitale che permette al cliente di accedere su richiesta a un insieme scalabile ed elastico di risorse di calcolo condivisibili, anche se distribuite in più ubicazioni*.

Per il NIS2 Tool **pilot Cloud**, lo strumento deve poter verificare il rientro nella definizione `(30)` NIS2 — non in una definizione ACN aggiuntiva. Il regime applicabile al soggetto qualificato come fornitore cloud è poi Reg. UE 2024/2690 + det. ACN 379907/2025 (con i caveat di cui sopra).

## Conseguenze operative per il NIS2 Self-Assessment Tool

### Cosa deve fare il Tool sul pilot Cloud

1. **Verificare la qualifica** del soggetto come fornitore di servizi di cloud computing ai sensi dell'art. 6 punto (30) NIS2 (non della det. ACN; non del Reg. UE — è la direttiva la fonte definitoria).
2. **Stabilire la classificazione** essenziale/importante secondo i criteri NIS2 (size-cap rule + Allegato I/II) e secondo la [[concepts/Categorizzazione dei soggetti|categorizzazione]] ACN (art. 30 D.Lgs. 138/2024).
3. **Emettere un verdetto sul rientro nell'ambito**, con il caveat esplicito che il **regime applicabile** è duplice: Reg. UE 2024/2690 (direttamente applicabile, esaustivo su soglie incidenti) + det. ACN 379907/2025 (regime nazionale per misure aggiuntive e profili amministrativi).

### Cosa il Tool NON deve fare (out-of-MVP)

- Non determinare nel merito **quali misure** il soggetto debba adottare — il Tool risponde a "*sei dentro o fuori dal perimetro NIS2?*", non a "*cosa devi fare se sei dentro?*".
- Non interpretare i casi di conflitto puntuale Reg. UE / det. ACN — questo è terreno per consulenza GRC, non per uno strumento self-assessment.
- Non prendere posizione sulla open question del Punto 3: il tool deve **segnalare** l'open question come "**parlare con un consulente GRC**", non risolverla.

### Avvertenza testuale che il Tool dovrebbe esporre nel verdetto Cloud

> *Suggerimento di copy* (italiano, semplice, non legalese; versione riformulata in sessione collaborativa con l'autore, 2026-05-19, alla luce di Wave 6 Sessione 3):
>
> "Sulla base degli input forniti, l'analisi suggerisce che il soggetto rientri nel perimetro NIS2 italiano come **fornitore di servizi di cloud computing**. Verifica obbligatoria con consulente qualificato prima di assumere conclusioni operative.
>
> Da questo derivano obblighi su tre piani: misure tecniche di sicurezza informatica, governance e responsabilità degli organi di gestione (art. 23 D.Lgs. 138/2024), notifica degli incidenti significativi entro le tempistiche di legge (24 ore early warning, 72 ore notifica, 1 mese report finale).
>
> **Importante**: a livello unionale, il **Regolamento di esecuzione (UE) 2024/2690** detta requisiti tecnici delle misure e i criteri quantitativi di significatività degli incidenti (artt. 3 e 7), direttamente applicabili. A livello nazionale, la **Determinazione ACN n. 379907 del 19/12/2025** detta le specifiche di base orizzontali per tutti i soggetti NIS italiani. I due regimi si applicano in parallelo, con applicazione cumulativa per le misure tecniche e primato del diritto UE in caso di conflitto puntuale. In particolare, le soglie quantitative che fanno scattare l'obbligo di notifica degli incidenti significativi sono quelle del Regolamento UE 2024/2690, non quelle della determinazione ACN.
>
> **Attenzione**: un fornitore italiano di servizi cloud può ricadere simultaneamente in altri regimi italiani correlati che il presente strumento non analizza — in particolare il Perimetro di Sicurezza Nazionale Cibernetica (PSNC), il Regolamento DORA se i servizi sono ICT critici per il settore finanziario, e il Regolamento Cloud PA se i servizi sono erogati alla Pubblica Amministrazione. Ciascun regime ha obblighi propri non sostitutivi del regime NIS2.
>
> Per orientarsi negli obblighi concreti e gestire le possibili sovrapposizioni di regime, è fortemente consigliato il supporto di un consulente qualificato in normativa cybersecurity italiana."

## Sintesi

| Aspetto | Regime applicabile a un fornitore cloud italiano | Note |
|---|---|---|
| Qualifica come soggetto NIS | Direttiva NIS2 + D.Lgs. 138/2024 | Definizione art. 6(30) NIS2 |
| Classificazione essenziale/importante | NIS2 + D.Lgs. 138/2024 | Allegati I/II + size-cap |
| Categorizzazione (alto/medio/basso/minimo) | Det. ACN categorizzazione + modelli | [[concepts/Categorie di rilevanza]] |
| Registrazione su piattaforma ACN | Det. ACN piattaforma e procedure | Annuale 15 apr–31 mag |
| **Misure tecniche e metodologiche** | **Reg. UE 2024/2690 (Allegato) + Det. ACN 379907/2025** | **Applicazione cumulativa (3a) con primato UE sui conflitti puntuali (3c) — open question normativa** |
| **Criteri di significatività incidenti** | **Reg. UE 2024/2690 artt. 3 + 7 (esaustivi)** | **NON si applicano gli IS-1..4 della det. ACN per i fornitori cloud** |
| Tempistiche di notifica (24h/72h/1 mese) | Direttiva NIS2 art. 23 par. 4 → D.Lgs. 138/2024 art. 25 | Procedurali nazionali |
| Canale di notifica | [[entities/CSIRT Italia]] tramite [[concepts/Piattaforma digitale ACN]] | |
| Vigilanza | ACN ex art. 32 D.Lgs. 138/2024 | |
| Sanzioni | D.Lgs. 138/2024 art. 38 | [[concepts/Sanzioni NIS2]] |
| Regimi transitori OSE/telco | Det. ACN 379907/2025 artt. 5-6 | Solo se applicabili al singolo soggetto |

## Tensioni / contraddizioni

- **Disallineamento delle soglie di incidente** tra Reg. UE (quantitative, oggettive: 30 min, 5%/1M utenti) e Det. ACN (qualitative, auto-determinate dal soggetto via SL/parametri quali-quantitativi ex `DE.CM-01`). Per un fornitore cloud italiano, la doppia possibilità di "soglia oggettiva UE" vs "soglia auto-determinata IT" è risolta dall'esaustività UE (cons. 30 Reg.). Per gli altri DSP della lista, idem.
- **Doppia documentazione** dei criteri: il piano di gestione incidenti del fornitore cloud dovrà documentare entrambe le serie di criteri (UE + IT) e indicare quale si applica caso per caso. Non c'è un template UE+ACN unificato — *operational gap*.
- **Mancato chiarimento ACN sull'interazione**: la guida ACN del settembre 2025 non discute la preminenza UE. Lacuna che potrebbe essere oggetto di una futura FAQ ACN o di un *guidance document* ENISA.

## Domande aperte

1. **Q1 — Misure aggiuntive ACN**: la det. ACN 379907/2025 contiene **29 requisiti aggiuntivi** per gli essenziali rispetto agli importanti (cfr. [[concepts/Misure di sicurezza di base]]). Sono **tutti applicabili** ai fornitori cloud essenziali italiani, oppure il Reg. UE pone un *floor* armonizzato che la det. ACN non può eccedere? Lacuna normativa. — *Risposta TIG ENISA: ristretta a favore di 3a (cumulazione, framework nazionali riconosciuti come compliance equivalente). Cfr. [[synthesis/Risposta TIG ENISA alle Q1-Q4 della coordinamento UE-IT]] § Q1.*

2. **Q2 — Approvazione del board**: l'**Appendice C** della guida ACN elenca **11 documenti** che richiedono approvazione del board (cfr. [[concepts/Responsabilità degli organi di gestione]]). Il Reg. UE 2024/2690 menziona l'approvazione del board solo per la policy di sicurezza dei sistemi informativi e di rete (punto 1.1.1 lett. k Allegato). Differenza di granularità — il regime IT è più stringente. Si applica al cloud? — *Risposta TIG ENISA: ristretta — regime UE delega più discrezionalità ("appropriate level of management" per topic-specific policies), regime IT più stringente è cumulabile (tesi 3a); il fornitore cloud IT applica il regime IT sugli 11 documenti. Cfr. [[synthesis/Risposta TIG ENISA alle Q1-Q4 della coordinamento UE-IT]] § Q2.*

3. **Q3 — `Sistemi informativi e di rete rilevanti`** (cfr. [[concepts/Sistemi informativi e di rete rilevanti]]) è un concetto della det. ACN, **non del Reg. UE**. Per un fornitore cloud che applica entrambi i regimi, può limitare alcuni requisiti ACN "ai sistemi rilevanti" anche dove il Reg. UE non offre questa clausola? Probabile sì (la clausola ACN è interna al regime ACN), ma da verificare. — *Risposta TIG ENISA: ristretta — UE usa asset classification + risk-based scoping; principio convergente con la clausola C1 IT; gli elenchi tendono a coincidere nella pratica. Cfr. [[synthesis/Risposta TIG ENISA alle Q1-Q4 della coordinamento UE-IT]] § Q3.*

4. **Q4 — `Misure compensative`**: il Reg. UE 2024/2690 prevede misure compensative per microsoggetti (cons. 5). La det. ACN 379907/2025 prevede misure compensative ex `ID.RA-06` p.2 (cfr. [[concepts/Clausole basate sul rischio]] clausola C3). I due regimi di compensazione coincidono? Sono cumulabili? — *Risposta TIG ENISA: ristretta — meccanismi coerenti nei principi, perimetri leggermente diversi (UE: art. 2(2) + cons. 5 microsoggetti, esempi sparsi; IT: clausola C3 + `ID.RA-06` p.2 su requisiti specifici); cumulabili con doppia documentazione; il piano di trattamento del rischio IT (board-approved) può unificare. Cfr. [[synthesis/Risposta TIG ENISA alle Q1-Q4 della coordinamento UE-IT]] § Q4.*

5. **Q5 — `Trust service providers`** (eIDAS): l'art. 14 del Reg. UE 2024/2690 li copre, ma non sono pilot del Tool. Stessa questione di coordinamento si pone se mai venissero aggiunti — eIDAS reg. 910/2014 vs det. ACN vs questo regolamento. *Out-of-scope MVP NIS2 Tool. Da rivisitare in wiki personale al momento dell'ingest del Reg. UE 910/2014 (eIDAS) e del Reg. UE 2024/1183 (eIDAS-2). Trust services è area di interesse GRC italiano in crescita (firma digitale qualificata, identità digitale europea, wallet) e merita una synthesis dedicata.*

## Action items

- **Per l'autore — NIS2 Tool**: incorporare l'avvertenza testuale (sezione *Conseguenze operative*) nel verdetto del pilot Cloud. Far rivedere a un consulente GRC esterno prima del go-live (gate pre-launch già previsto nel brief).
- **Per la wiki**: monitorare se ACN o ENISA pubblicheranno guidance sulla coordinazione Reg. UE 2024/2690 / specifiche nazionali. Aggiornare questo nodo quando disponibile.
- **Per la wiki**: ✅ ingest TIG ENISA v1.0 eseguito in Wave 6 Cluster B Sessione 1 ([[sources/ENISA Technical Implementation Guidance v1.0 - 2025-06-26]]); le risposte alle Q1-Q4 sono nel nodo follow-up [[synthesis/Risposta TIG ENISA alle Q1-Q4 della coordinamento UE-IT]]. Tutte e 4 le Q sono **ristrette** (non chiuse interamente per il vincolo di soft-law della TIG), confermando la tesi 3a + 3c.
- **Per l'autore — GRC personale**: il regolamento UE in oggetto è un caso pulito di **regime ibrido** (atto UE direttamente applicabile + recepimento nazionale con margine di dettaglio). È uno strumento didattico ideale per spiegare il concetto in eventuali contributi LinkedIn o materiale di studio per la certificazione ISO 27001 LA (dove la dimensione "interazione tra norme" è ricorrente).

## Collegamenti

- [[sources/Regolamento di esecuzione UE 2024-2690]]
- [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]
- [[sources/Direttiva (UE) 2022-2555 (NIS2)]]
- [[sources/D.Lgs. 138-2024 (Decreto NIS)]]
- [[concepts/Misure di sicurezza di base]]
- [[concepts/Incidenti significativi di base]]
- [[concepts/Notifica di incidente significativo]]
- [[concepts/Misure di gestione del rischio cyber]]
- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Settori altamente critici e critici]]
- [[concepts/Sistemi informativi e di rete rilevanti]]
- [[concepts/Clausole basate sul rischio]]
- [[concepts/Responsabilità degli organi di gestione]]
- [[synthesis/Stratificazione delle norme cybersecurity in Italia]] — sovrapposizione con questa synthesis sui DSP italiani; quella stratifica orizzontalmente (PSNC + NIS2 + DORA + Cloud PA + L.90/2024), questa stratifica verticalmente nello stack NIS2 (UE diretta + IT recepita)
