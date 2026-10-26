---
title: Notifica di incidente significativo
type: concept
scope: both
tags: [nis2, notifica, incidente, art-23, art-25, csirt, l90-2024]
sources: ["[[sources/Direttiva (UE) 2022-2555 (NIS2)]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]", "[[sources/Linee Guida NIS - Gestione incidenti - 2025-12]]", "[[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/FAQ NIS - Misure di sicurezza e notifica di incidenti]]", "[[sources/Guida lettura specifiche di base]]", "[[sources/Legge 90-2024 (cybersicurezza nazionale)]]"]
aliases: [Obbligo di notifica NIS2, Reporting obligation NIS2]
---

## Definizione

Obbligo per i [[concepts/Soggetti essenziali e importanti|soggetti essenziali e importanti]] di notificare al CSIRT nazionale (in Italia [[entities/CSIRT Italia]] dentro [[entities/ACN]]) ogni **[[concepts/Incidente significativo|incidente significativo]]** che incida sull'erogazione dei propri servizi. La notifica è scaglionata in **tre fasi**.

Disciplinato da:
- **NIS2 — Articolo 23** (direttiva).
- **D.Lgs. 138/2024 — Articolo 25** (Italia).

## Tempistiche scaglionate

| Fase | Tempo | Contenuto |
|---|---|---|
| **Pre-notifica (early warning)** | entro **24 ore** dalla conoscenza | Indicazione preliminare: si sospetta un incidente significativo, eventuali origini illegali/dolose, eventuali impatti transfrontalieri |
| **Notifica** | entro **72 ore** dalla conoscenza | Aggiornamento con valutazione iniziale, gravità, impatto, IoC se disponibili |
| **Relazione finale** | entro **1 mese** dalla notifica | Descrizione dettagliata, root cause, tipo di minaccia, misure di mitigazione adottate, impatto transfrontaliero |
| **Relazione sullo stato di avanzamento** | a richiesta del CSIRT/autorità | Per incidenti non ancora conclusi al mese |

### Quando decorrono i termini — l'evidenza dell'incidente

La [[sources/Guida lettura specifiche di base|guida alla lettura]] (§ 3.2.1) chiarisce che la **"conoscenza dell'incidente"** = il soggetto **ha evidenza** = dispone di elementi oggettivi che ne attestano il verificarsi. L'acquisizione dell'evidenza è **tipicamente successiva** al verificarsi dell'incidente e definisce il momento dal quale **decorrono** i termini di 24h e 72h.

Canali tipici di acquisizione: (1) segnalazioni esterne (es. CSIRT Italia); (2) segnalazioni interne (es. help desk); (3) eventi dei sistemi di monitoraggio (cfr. misura `DE.CM-01`).

## Definizione di "incidente significativo"

L'Art. 23(3) NIS2 (e Art. 25(3) D.Lgs. 138/2024) lo definisce come incidente che:

a) **ha causato o è in grado di causare** grave perturbazione operativa dei servizi o perdite finanziarie per il soggetto interessato; **oppure**

b) **ha avuto o può avere ripercussioni** su altre persone fisiche o giuridiche causando danni materiali o immateriali considerevoli.

Le **soglie quantitative** che concretizzano questi criteri sono ora dettagliate dalla [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|determinazione ACN n. 379907 del 19/12/2025]] negli **Allegati 3** (incidenti per soggetti importanti) e **4** (incidenti per soggetti essenziali) — il concetto è confluito in [[concepts/Incidenti significativi di base]].

### Soglie quantitative per gli operatori telco

Per gli **operatori telco** (cfr. [[concepts/Regime transitorio telco]]) l'art. 6 c. 2 della determinazione 379907/2025 fissa una scala quantitativa:

| Durata > | Utenti colpiti > |
|---|---|
| 1 ora | 15% |
| 2 ore | 10% |
| 4 ore | 5% |
| 6 ore | 2% |
| 8 ore | 1% |

Sono soglie *floor*: oltre queste, possono comunque applicarsi i criteri qualitativi degli Allegati 3-4.

## Processo organizzativo a monte

L'efficacia della notifica dipende da un processo interno di **rilevamento e gestione**: vedi [[concepts/Processo gestione incidenti NIS]] (modello a 5 fasi [[entities/NIST SP 800-61|NIST SP 800-61r3]] adottato dalle [[sources/Linee Guida NIS - Gestione incidenti - 2025-12]]). Il **referente CSIRT** ([[entities/Referente CSIRT]]) e i sostituti sono i ruoli operativi titolari della sotto-fase Segnalazione.

## Termini di avvio dell'obbligo

- **Coorte 2025**: 9 mesi dall'entrata in vigore della [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|det. specifiche di base]].
- **Coorte 2026**: dal **1° gennaio 2027** (cfr. [[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]).

## Notifica volontaria

I soggetti **non NIS** possono notificare volontariamente incidenti, quasi-incidenti o minacce informatiche al CSIRT (Art. 30 NIS2 / disposizioni nazionali).

## Informazione ai destinatari

Quando l'incidente può incidere sui destinatari del servizio, il soggetto deve **informarli senza indebito ritardo** delle misure che possono adottare in risposta (es. cambiare password, disattivare credenziali). In casi di **interesse pubblico**, ACN può chiedere al soggetto di rendere pubblico l'incidente.

## Disallineamento con la L. 90/2024

L'**art. 1 c. 2 della [[sources/Legge 90-2024 (cybersicurezza nazionale)|L. 90/2024]]** disciplina un obbligo di notifica autonomo per il [[concepts/Perimetro Legge 90-2024|perimetro L. 90]] (PA centrali, comuni grandi, ASL, trasporto pubblico qualificato, società in house qualificate). Le tempistiche sono **simili ma non identiche** a quelle NIS2:

| Fase | NIS2 (art. 25 D.Lgs. 138) | L. 90 (art. 1 c. 2) |
|---|---|---|
| Pre-notifica / segnalazione | **24 ore** dalla conoscenza | **24 ore** dalla conoscenza |
| Notifica completa | **72 ore** dalla conoscenza | **72 ore** dalla conoscenza |
| **Relazione finale** | **1 mese** | **Assente** |
| Relazione di stato avanzamento | A richiesta | Non prevista |

**Conseguenza operativa**: i soggetti **L. 90 ∩ NIS** devono comunque produrre il report finale a 1 mese (è obbligo NIS, non disapplicato dalla L. 90). I soggetti **solo L. 90** (es. società in house qualificata non NIS, comune capoluogo sotto soglia 100k che non sia NIS) si fermano ai 2 step 24h+72h.

Per i **soggetti PSNC**, l'**art. 3 L. 90** ha modificato l'art. 1 c. 3-bis DL 105/2019 allineando anche il PSNC al doppio step 24h+72h (cfr. [[concepts/Soggetti PSNC-NIS]]).

> [!warning] Canale unico CSIRT, regimi multipli
> Il canale di notifica è unico ([[entities/CSIRT Italia]] via [[concepts/Piattaforma digitale ACN|piattaforma ACN]]), ma il **regime giuridico di riferimento** (NIS / L. 90 / PSNC / DORA) determina quali campi compilare, quali tempistiche rispettare per il report finale, e quale autorità di vigilanza è competente. Cfr. [[synthesis/Coordinamento L. 90-2024 e NIS2]] per la gestione operativa dei soggetti misti.

## Chiarimenti operativi (FAQ ACN)

La FAQ [[sources/FAQ NIS - Misure di sicurezza e notifica di incidenti]] fornisce chiarimenti operativi sull'obbligo di notifica e sull'identificazione di un incidente come "significativo", incluso il rapporto con i parametri di Allegati 3-4 della Det. 379907/2025 e la procedura sulla piattaforma. Codici FAQ rilevanti per la notifica nel cluster `MIS.NO.*` / `INC.*`.

## Collegamenti

- [[concepts/Incidente significativo]]
- [[concepts/Incidenti significativi di base]] — soglie operative concrete
- [[concepts/Processo gestione incidenti NIS]] — il processo organizzativo di IR
- [[concepts/Misure di gestione del rischio cyber]] — obbligo speculare preventivo
- [[concepts/Piattaforma digitale ACN]] — canale di notifica
- [[concepts/Regime transitorio telco]] — soglie quantitative telco
- [[concepts/Sanzioni NIS2]] — in caso di mancata notifica
- [[entities/CSIRT Italia]], [[entities/ACN]], [[entities/Referente CSIRT]]
