---
title: Misure di sicurezza di base
type: concept
scope: both
tags: [nis2, italia, specifiche-di-base, art-23, art-24, allegato-1, allegato-2]
sources: ["[[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]", "[[sources/Allegato 1 - Misure di sicurezza di base per i soggetti importanti]]", "[[sources/Allegato 2 - Misure di sicurezza di base per i soggetti essenziali]]", "[[sources/Linee Guida NIS - Gestione incidenti - 2025-12]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/FAQ NIS - Misure di sicurezza e notifica di incidenti]]", "[[sources/FAQ NIS - Categorizzazione]]", "[[sources/Guida lettura specifiche di base]]"]
aliases: [Allegato 1 misure NIS, Allegato 2 misure NIS, Misure di sicurezza essenziali e importanti]
---

## Definizione

Specifiche di base, adottate dall'[[entities/ACN]] con la [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|Det. n. 379907 del 19/12/2025]], che dettagliano gli **obblighi degli articoli 23 e 24** del [[sources/D.Lgs. 138-2024 (Decreto NIS)]] (responsabilità degli organi di amministrazione e direttivi + misure di gestione dei rischi cyber). Sono **organizzate in funzioni, categorie, sottocategorie e requisiti**, in accordo al [[entities/Framework Nazionale per la Cybersecurity]] (edizione 2025).

## Doppio allegato

- **Allegato 1** — misure di sicurezza di base per i **[[concepts/Soggetti essenziali e importanti|soggetti importanti]]** (cfr. [[sources/Allegato 1 - Misure di sicurezza di base per i soggetti importanti]]).
- **Allegato 2** — misure di sicurezza di base per i **[[concepts/Soggetti essenziali e importanti|soggetti essenziali]]** (cfr. [[sources/Allegato 2 - Misure di sicurezza di base per i soggetti essenziali]]). Strict super-set dell'Allegato 1.

## Architettura a 6 funzioni FNCDP / NIST CSF v2.0

Entrambi gli allegati sono strutturati sulle **6 funzioni** del [[entities/Framework Nazionale per la Cybersecurity|Framework Nazionale per la Cybersecurity]] edizione 2025 (mutuate da NIST CSF v2.0):

| Funzione | Codice | Misure dell'Allegato 1 (importanti) | Misure aggiuntive nell'Allegato 2 (essenziali) |
|---|---|---|---|
| **GOVERNO** | GV | `GV.OC-04`, `GV.RM-03`, `GV.RR-02`, `GV.RR-04`, `GV.PO-01`, `GV.PO-02`, `GV.SC-01`, `GV.SC-02`, `GV.SC-04`, `GV.SC-05`, `GV.SC-07` | — (punti aggiuntivi su `GV.RR-04`, `GV.PO-02`, `GV.SC-01`) |
| **IDENTIFICAZIONE** | ID | `ID.AM-01`, `ID.AM-02`, `ID.AM-04`, `ID.RA-01`, `ID.RA-05`, `ID.RA-06`, `ID.RA-08`, `ID.IM-01`, `ID.IM-04` | **`ID.AM-03`** (flussi rete) + VA/PT obbligatori (`ID.RA-01` p.2) |
| **PROTEZIONE** | PR | `PR.AA-01`, `PR.AA-03`, `PR.AA-05`, `PR.AA-06`, `PR.AT-01`, `PR.DS-01`, `PR.DS-02`, `PR.DS-11`, `PR.PS-02`, `PR.PS-04`, `PR.PS-06`, `PR.IR-01` | **`PR.AT-02`** (formazione specializzata), **`PR.PS-01`** (hardening), **`PR.PS-03`** (dismissione HW), **`PR.IR-03`** (comunicazione di emergenza) + test ripristino backup (`PR.DS-11` p.4), test SW critico (`PR.PS-02` p.4) |
| **RILEVAMENTO** | DE | `DE.CM-01`, `DE.CM-09` | Filtraggio traffico, monitoraggio accessi remoti/perimetrali/admin, parametri quali-quantitativi (`DE.CM-01` p.4-7) — base del codice IS-4 |
| **RISPOSTA** | RS | `RS.MA-01`, `RS.CO-02` | — |
| **RIPRISTINO** | RC | `RC.RP-01` | **`RC.CO-03`** (comunicazione attività ripristino) |

## Conteggi esatti (ancorati dalla [[sources/Guida lettura specifiche di base|guida alla lettura]])

| | Misure | Requisiti |
|---|---|---|
| Soggetti **importanti** (Allegato 1) | **37** | **87** |
| Soggetti **essenziali** (Allegato 2) | **43** | **116** |

Decomposizione del super-set essenziali:

- **27 misure** identiche tra i due allegati.
- **10 misure** comuni con **19 requisiti aggiuntivi** per gli essenziali (`GV.RR-04`, `GV.PO-02`, `GV.SC-01`, `ID.RA-01`, `ID.RA-05`, `ID.RA-08`, `ID.IM-01`, `PR.DS-11`, `PR.PS-02`, `DE.CM-01`).
- **6 misure** solo-essenziali con **10 requisiti** aggiuntivi (`ID.AM-03`, `PR.AT-02`, `PR.PS-01`, `PR.PS-03`, `PR.IR-03`, `RC.CO-03`).
- Totale extra essenziali: **29 requisiti**.

## Approccio basato sul rischio — 4 clausole

I requisiti sono modulati da **4 [[concepts/Clausole basate sul rischio|clausole standardizzate]]** (cfr. § 2.3 + Appendice B della guida):

1. `per almeno i sistemi informativi e di rete rilevanti` — restringe l'ambito ai [[concepts/Sistemi informativi e di rete rilevanti|sistemi rilevanti]] (13 req SI / 22 req SE).
2. `in accordo agli esiti della valutazione del rischio di cui alla misura ID.RA-05` — definisce modalità/ambito in base al risk assessment (6/10).
3. `fatte salve motivate e documentate ragioni normative o tecniche` — consente deroga con misure compensative ex `ID.RA-06` p.2 (8/10).
4. `forniture con potenziali impatti sulla sicurezza` — restringe alle forniture rilevanti (3/3).

Quando combinate, **si applicano in cascata**.

## Tipologia requisiti

- **Organizzativi** (maggioranza): governance, processi, documentazione (es. `GV.RR-02`, `GV.PO-01`).
- **Tecnologici**: strumenti concreti (es. `DE.CM-01`, `PR.AA-03` MFA, `PR.DS-01/02` cifratura).

Filosofia esplicita della guida (§ 2.4): *"costruire anzitutto una solida governance"*; il tooling è al servizio dei processi.

## Evidenze documentali

Cfr. [[concepts/Evidenze documentali NIS]] per la tipizzazione completa (elenchi, inventari, piani, politiche, procedure, registri) e per gli **11 documenti che richiedono approvazione del board** (Appendice C della guida).

## Misura cardine: `GV.PO-01` e i 16 ambiti di politica

Il punto 1 della misura `GV.PO-01` impone l'adozione di politiche scritte e approvate dagli organi di amministrazione e direttivi su **16 ambiti**. La Tabella 1 in appendice a ciascun allegato mappa ogni ambito sui requisiti tecnici minimi (le altre misure):

| Ambito | Lettera | Requisiti minimi (sottoinsieme misure) |
|---|---|---|
| Gestione del rischio | a | `GV.OC-04`, `GV.RM-03`, `ID.RA-05`, `ID.RA-06` |
| Ruoli e responsabilità | b | `GV.RR-02` |
| Affidabilità risorse umane | c | `GV.RR-04` |
| Conformità e audit di sicurezza | d | `GV.PO-01`, `GV.PO-02`, `ID.IM-01` |
| Supply-chain cyber | e | `GV.SC-01..07` |
| Gestione asset | f | `ID.AM-01..04` (incl. `ID.AM-03` solo essenziali) |
| Gestione vulnerabilità | g | `ID.RA-01`, `ID.RA-08` |
| BC / DR / crisi | h | `ID.IM-04` |
| IAM (autenticazione, identità, accessi) | i | `PR.AA-01`, `PR.AA-03`, `PR.AA-05`, `PR.IR-01` |
| Sicurezza fisica | j | `PR.AA-06` |
| Formazione e consapevolezza | k | `PR.AT-01` (+ `PR.AT-02` solo essenziali) |
| Sicurezza dei dati | l | `PR.DS-01`, `PR.DS-02`, `PR.DS-11` |
| Sviluppo, configurazione, manutenzione, dismissione | m | `PR.PS-02`, `PR.PS-04`, `PR.PS-06` (+ `PR.PS-01`, `PR.PS-03` solo essenziali) |
| Protezione reti e comunicazioni | n | `PR.IR-01` (+ `PR.IR-03` solo essenziali) |
| Monitoraggio eventi di sicurezza | o | `DE.CM-01`, `DE.CM-09` |
| Risposta agli incidenti e ripristino | p | `RS.MA-01`, `RS.CO-02`, `RC.RP-01` (+ `RC.CO-03` solo essenziali) |

## Tabella 2 — requisiti non derogabili

L'art. `ID.RA-06` p.2 di entrambi gli allegati identifica un sottoinsieme di **requisiti tecnici minimi non derogabili** se non con motivazione documentata e adozione di misure compensative.

- **Importanti** (Allegato 1): `GV.SC-05` p.1, `PR.AA-01` p.1, `PR.DS-01` p.1-2, `PR.DS-02` p.1, `PR.PS-02` p.1-2, `DE.CM-09` p.1.
- **Essenziali** (Allegato 2): tutti i sopra + **`ID.RA-01` p.2** (VA/PT obbligatori). `PR.PS-02` arriva al punto 4 (test ambiente).

## Riesami obbligatori

| Cosa | Cadenza minima | Trigger ad-hoc |
|---|---|---|
| Politiche `GV.PO-01` | annuale (`GV.PO-02`) | evoluzioni normative, incidenti significativi, riorganizzazioni, mutamenti di esposizione |
| Ruoli `GV.RR-02` | biennale | incidenti significativi, riorganizzazioni, mutamenti minacce |
| Valutazione del rischio `ID.RA-05` | biennale | id. |
| Piani BC/DR/crisi `ID.IM-04` | biennale | id. |
| Piano risposta incidenti `RS.MA-01` | biennale (con integrazione lessons learned) | id. |

## Termine di adozione

- **18 mesi** dalla ricezione, da parte del soggetto NIS, della comunicazione di inserimento nell'elenco dei soggetti NIS (art. 3 c. 1 della determinazione).
- Per i **soggetti inseriti per la prima volta nel 2026** ([[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]): termine fissato al **31 luglio 2027**.

## Responsabilità

- Le misure sono "**a carico degli organi di amministrazione e direttivi**" (art. 2 c. 2 della determinazione) — le politiche di sicurezza informatica sono **approvate** dall'organo apicale (art. 4 cc. 2 e 4).
- *Sintesi dell'agente:* è una traduzione operativa della responsabilità del board ex art. 23 decreto NIS: non basta delegare al CISO, l'organo apicale deve approvare formalmente le politiche di sicurezza.

## DNS

L'art. 4 della [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|Det. n. 379907]] dispone che gestori di registri TLD e fornitori di servizi di registrazione dei nomi di dominio:
- **Si adeguano** alle previsioni dell'art. 29 cc. 1-2 decreto NIS;
- **Adottano e pubblicano** politiche e procedure ex art. 29 c. 3;
- **Adottano politiche di sicurezza coerenti con l'allegato 1** (cioè con le misure dei soggetti importanti — anche se non sempre lo sono in senso stretto), ai sensi dell'art. 32 c. 3 decreto NIS.
- Termine: 18 mesi dalla comunicazione di inserimento.

## Regime transitorio

- **Operatori di servizi essenziali (OSE)** ex D.Lgs. 65/2018 (NIS1): **mantengono le misure tecniche e organizzative già adottate**, limitatamente ai sistemi OSE, salvo contrasti con il decreto NIS (art. 5 della determinazione).
- **Operatori telco**: **mantengono le misure di sicurezza/integrità già adottate** ai sensi del DM 12/12/2018, limitatamente ai sistemi telco critici (art. 6 c. 1).

## Coordinamento con linee guida settoriali

- Le **[[sources/Linee Guida NIS - Gestione incidenti - 2025-12]]** mappano le misure di sicurezza di base sulle 5 fasi del processo NIST SP 800-61r3 (preparazione, rilevamento, risposta, ripristino, miglioramento) — Appendice B.

## Roadmap normativa misure (FAQ Categorizzazione `CAT.3`)

La FAQ ACN [[sources/FAQ NIS - Categorizzazione]] (`CAT.3`) introduce una **roadmap evolutiva** delle misure NIS in tre tappe:

1. **Misure di sicurezza di base** = Det. 379907/2025 (oggetto di questa pagina, prima applicazione ex art. 42).
2. **Misure aggiuntive** (livello **avanzato** rispetto alle base) = saranno emanate **entro la fine del 2026** con successive determinazioni ACN, e si differenzieranno per categoria di rilevanza ex [[concepts/Categorie di rilevanza]] (art. 31 decreto NIS).
3. **Misure di sicurezza a lungo termine** = misure di base + aggiuntive integrate in un set unico, con arco temporale di realizzazione ancora da definire.

Citazione `CAT.3`: *"Le misure di sicurezza di base saranno quindi integrate, entro la fine del 2026, da misure di sicurezza aggiuntive — caratterizzate da requisiti di livello avanzato rispetto a quelle di base — e confluiranno nelle misure di sicurezza a lungo termine"*.

## Collegamenti

- [[concepts/Specifiche tecniche di base]] — concetto-ombrello
- [[concepts/Misure di gestione del rischio cyber]] — base normativa (art. 24 decreto NIS)
- [[concepts/Responsabilità degli organi di gestione]] — art. 23
- [[concepts/Incidenti significativi di base]] — gli altri due allegati della stessa determinazione (`DE.CM-01` è l'aggancio operativo: SL → IS-3, parametri quali-quantitativi → IS-4)
- [[concepts/Processo gestione incidenti NIS]] — modello operativo a 5 fasi
- [[concepts/Sistemi informativi e di rete rilevanti]] — lo scoping primario delle misure (clausola C1)
- [[concepts/Clausole basate sul rischio]] — le 4 clausole modulanti
- [[concepts/Evidenze documentali NIS]] — i deliverable richiesti dalle misure
- [[concepts/Responsabilità degli organi di gestione]] — gli 11 documenti che richiedono delibera del board
- [[entities/Framework Nazionale per la Cybersecurity]]
- [[entities/Punto di contatto NIS]], [[entities/Referente CSIRT]] — inclusi nell'organizzazione di sicurezza informatica (`GV.RR-02` p.3)
