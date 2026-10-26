---
title: Referente per la cybersicurezza (L. 90-2024)
type: concept
scope: both
tags: [italia, l90-2024, referente, art-8, ruoli, governance, pa, rtd]
sources: ["[[sources/Legge 90-2024 (cybersicurezza nazionale)]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]"]
aliases: [Referente cyber L. 90, Referente cybersicurezza PA, Cyber officer L. 90]
---

## Definizione

Figura introdotta dall'**art. 8 c. 2 della L. 90/2024** per i soggetti del [[concepts/Perimetro Legge 90-2024|perimetro L. 90]] (art. 1 c. 1). Opera all'interno della **struttura cyber interna** che la legge impone al soggetto (art. 8 c. 1) e svolge la funzione di **punto di contatto unico** dell'amministrazione con [[entities/ACN]] in relazione a quanto previsto dalla L. 90 e dalle normative settoriali in materia di cybersicurezza.

## Le 7 funzioni della struttura cyber (art. 8 c. 1)

Il referente opera all'interno di una struttura interna (anche tra quelle esistenti, senza nuovi oneri) che provvede a:

| # | Funzione | Tipo |
|---|---|---|
| a | Sviluppo politiche e procedure di sicurezza delle informazioni | Policy |
| b | Sistemi di analisi preventiva di rilevamento + piano per la gestione del rischio informatico | Risk management |
| c | Documento che definisce ruoli e organizzazione del sistema sicurezza informazioni | Governance |
| d | Piano programmatico per sicurezza di dati/sistemi/infrastrutture | Planning |
| e | Pianificazione e attuazione di interventi di potenziamento capacità rischi informatici (coerente con b e d) | Capability |
| f | Pianificazione e attuazione adozione misure ex linee guida cyber ACN | Operations |
| g | Monitoraggio continuo minacce + vulnerabilità + patching tempestivo | Monitoring/Vuln mgmt |

Si tratta di un mini-ISMS legislativo: copre policy, risk, governance, planning, capability, operations e monitoring. Coerente con i pilastri del [[entities/Framework Nazionale per la Cybersecurity|FNCDP]] e con le [[concepts/Misure di gestione del rischio cyber|misure NIS2 art. 24]].

## Requisiti del referente (art. 8 c. 2)

- **Specifiche e comprovate professionalità e competenze in materia di cybersicurezza** (criterio qualitativo, lascia margine di apprezzamento all'ente)
- Possibile incarico a **dipendente di altra PA** ex art. 53 D.Lgs. 165/2001 (autorizzazione necessaria)
- Funzione di **punto di contatto unico** con ACN — sia per L. 90 sia per normative settoriali cyber cui è soggetto l'ente
- Comunicazione del nominativo ad ACN

## Coincidenza con altri ruoli

### Coincidenza con il pdc NIS (art. 4 c. 8 Det. piattaforma 127437/2026)

Il [[entities/Punto di contatto NIS|punto di contatto NIS]] designato sulla piattaforma ACN **può soddisfare anche l'obbligo di nomina del referente cyber L. 90** per i soggetti ricadenti in entrambi i regimi (cfr. [[synthesis/Stratificazione delle norme cybersecurity in Italia]] § coordinamento e [[synthesis/Coordinamento L. 90-2024 e NIS2]]).

Conseguenza pratica:
- **Soggetto L. 90 ∩ NIS**: unica persona fisica per i due ruoli → semplificazione operativa
- **Soggetto solo L. 90** (es. comune capoluogo non NIS, società in house qualificata): designa direttamente il referente cyber L. 90, senza pdc NIS

### Coincidenza con RTD ex art. 17 CAD (art. 8 c. 3)

> *"La struttura e il referente di cui ai commi 1 e 2 possono essere individuati, rispettivamente, nell'ufficio e nel responsabile per la transizione al digitale previsti dall'articolo 17 del codice dell'amministrazione digitale, di cui al decreto legislativo 7 marzo 2005, n. 82."*

Opzione, non obbligo. Razionale: evitare proliferazione di figure parallele dove le funzioni si sovrappongono.

**Possibile triplice coincidenza per soggetto L. 90 ∩ NIS**:

| Ruolo | Atto base | Funzione |
|---|---|---|
| **RTD** (Responsabile Transizione Digitale) | Art. 17 CAD | Digitalizzazione, dematerializzazione, accessibilità |
| **Punto di contatto NIS** | Art. 7 c. 6 D.Lgs. 138 + Det. piattaforma | Interlocuzione amministrativa con ACN su NIS |
| **Referente cyber L. 90** | Art. 8 c. 2 L. 90 | Cybersicurezza interna + interlocuzione operativa con ACN |

Per molti enti medi/piccoli, la convergenza sulle stessa persona fisica sarà la prassi naturale. *Implicazione GRC*: fabbisogno formativo trasversale per chi assume il ruolo (cyber tecnica + diritto digitale CAD + governance NIS2).

## Esercizio in forma associata (art. 8 c. 4)

I compiti di cui ai cc. 1 e 2 possono essere esercitati **in forma associata** secondo l'art. 17 cc. 1-sexies e 1-septies CAD. Utile per:
- Comuni piccoli del perimetro (capoluoghi sotto 100k)
- ASL che condividono servizi in distretti
- Società in house gestite a livello sovra-comunale

## Coordinamento orizzontale (art. 8 c. 5)

ACN può individuare **modalità e processi di coordinamento e collaborazione** tra le amministrazioni del perimetro e tra i referenti cyber, per facilitare la resilienza complessiva.

Lascia spazio a futuri framework di scambio informativo, tavoli tecnici, community of practice tra referenti cyber pubblici.

## Esoneri (art. 8 c. 6)

Non si applica a:
- a) Soggetti [[concepts/Soggetti PSNC-NIS|PSNC]] (art. 1 c. 2-bis DL 105/2019) — regimi propri
- b) Organi sicurezza/intelligence (L. 124/2007 artt. 4, 6, 7) — regimi di classifica

## Profilo professionale di riferimento

Il referente cyber L. 90 può essere letto come l'equivalente italiano di un **CISO/Information Security Officer del settore pubblico**, con focus operativo (struttura, processi, notifica). Per il posizionamento ECSF (European Cybersecurity Skills Framework, cfr. [[sources/ECSF Role Profiles - 2022-09]]), si avvicina maggiormente ai profili:

- **Chief Information Security Officer (CISO)** — se gestione strategica + governance
- **Cyber Incident Responder** — se enfasi su notifica e incident handling
- **Cybersecurity Implementer** — se enfasi su attuazione misure

La pluralità di funzioni dell'art. 8 c. 1 lascia all'ente la scelta del profilo prevalente. Cfr. [[synthesis/Profili ECSF per il consulente GRC NIS2 italiano]] per il match dei profili nel mercato GRC.

## Collegamenti

- [[sources/Legge 90-2024 (cybersicurezza nazionale)]] — fonte primaria art. 8
- [[concepts/Perimetro Legge 90-2024]] — chi nomina il referente
- [[entities/Punto di contatto NIS]] — ruolo cumulabile via art. 4 c. 8 Det. piattaforma
- [[entities/ACN]] — controparte istituzionale
- [[concepts/Responsabilità degli organi di gestione]] — confronto con la responsabilità del board ex art. 23 D.Lgs. 138
- [[synthesis/Coordinamento L. 90-2024 e NIS2]] — cumulo dei ruoli nei soggetti misti
- [[synthesis/Profili ECSF per il consulente GRC NIS2 italiano]] — collocazione nel framework ECSF

## Note dell'agente

- **Soggettività del requisito "specifiche e comprovate professionalità"**: il legislatore lascia all'ente l'apprezzamento, ma in caso di reiterata inosservanza la sanzione amministrativa pecuniaria (art. 1 c. 6: € 25-125k) **può ricadere anche sul referente in via personale** se ne discendono profili di responsabilità disciplinare e amministrativo-contabile (art. 1 c. 6 ultimo periodo). *Implicazione*: il profilo non è puramente "amministrativo", c'è un'esposizione personale al rischio sanzionatorio.
- **Differenza con il pdc NIS**: il pdc NIS è un ruolo principalmente **amministrativo** (interlocutore di piattaforma); il referente L. 90 è un ruolo **operativo-amministrativo misto** (gestisce anche la struttura cyber interna ex art. 8 c. 1). Quando coincidono nella stessa persona, le funzioni si sommano — la persona fisica fa entrambe.
- **Opportunità di consulenza**: per il GRC italiano, il referente cyber L. 90 è uno dei ruoli su cui i consulenti possono offrire **outsourcing** (art. 8 c. 2 lo prevede esplicitamente). Mercato emergente, soprattutto per enti piccoli che non hanno personale interno qualificato.
- *Lacuna*: la **determinazione ACN sulle linee guida cyber** richiamata dall'art. 8 c. 1 lett. f) non è ancora stata identificata univocamente — probabile riferimento alle [[concepts/Misure di sicurezza di base|misure di sicurezza di base ACN]] (Det. 379907/2025) o a successive linee guida specifiche per il perimetro L. 90. Da verificare a futuro lint.
