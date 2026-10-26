---
title: Allegato 1 — Misure di sicurezza di base per i soggetti importanti
type: source
scope: both
source_type: article
source_path: raw/articles/allegato-1-v2.pdf
url:
author: Agenzia per la Cybersicurezza Nazionale
date_published: 2025-12-19
date_ingested: 2026-04-29
tags: [nis2, italia, acn, fncdp, nist-csf, misure-sicurezza, soggetti-importanti]
---

## TL;DR

Allegato 1 della [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|determinazione ACN n. 379907 del 19/12/2025]]: catalogo delle **misure di sicurezza di base** per i **soggetti NIS importanti**. Strutturato sulle **6 funzioni** del [[entities/Framework Nazionale per la Cybersecurity|FNCDP]] / NIST CSF v2.0 — Governo, Identificazione, Protezione, Rilevamento, Risposta, Ripristino — con **37 misure** con **87 requisiti** complessivi (numeri ancorati dalla [[sources/Guida lettura specifiche di base|guida alla lettura]] § 2.1) (codici tipo `GV.PO-01`, `ID.RA-08`, `PR.AA-03`). Due tabelle in appendice: la **Tabella 1** mappa 16 ambiti di politiche (a-p) ai requisiti tecnici minimi (è il "ponte" `GV.PO-01`); la **Tabella 2** elenca i requisiti **non derogabili** della misura `ID.RA-06`.

## Punti chiave

- **Architettura a 6 funzioni** mutuata dall'edizione 2025 del Framework Nazionale per la Cybersecurity (basato su NIST CSF v2.0): GOVERN / IDENTIFY / PROTECT / DETECT / RESPOND / RECOVER. Ogni funzione è suddivisa in **categorie** (es. `GV.OC` Contesto organizzativo, `PR.AA` Gestione identità) e ogni categoria in **sottocategorie** = misure (es. `GV.OC-04`, `PR.AA-03`).
- **Nota terminologica (nota a piè di pag. 1):** nei nomi delle categorie/sottocategorie sono mantenuti i termini "cybersecurity" e "organizzazione" del Framework, ma vanno letti rispettivamente come *sicurezza informatica* e *soggetto NIS*. L'eccezione è "organizzazione per la sicurezza informatica", che resta nel suo significato letterale.
- **`GV.PO-01` = misura cardine**: ogni soggetto adotta politiche scritte e approvate dagli organi di amministrazione e direttivi su **16 ambiti (a-p)** — gestione del rischio, ruoli, affidabilità HR, conformità/audit, supply-chain, asset, vulnerabilità, business continuity, IAM, sicurezza fisica, formazione, dati, dev/config/dismissione, reti/comunicazioni, monitoraggio, risposta incidenti.
- **`GV.PO-02`**: riesame politiche con **cadenza almeno annuale** + ad-hoc su evoluzioni normative, incidenti significativi, riorganizzazioni, mutamenti di esposizione.
- **`GV.RR-02` punto 3**: l'organizzazione di sicurezza informatica include obbligatoriamente **punto di contatto + sostituto** e **referente CSIRT + sostituti** ex art. 7 c. 6 D.Lgs. 138/2024.
- **Tabella 2 = misure tecniche non derogabili** se non con motivazione documentata e misure compensative. Per gli importanti: `GV.SC-05` p.1 (requisiti security in contratti), `PR.AA-01` p.1 (utenze censite/individuali), `PR.DS-01` p.1-2 (cifratura at-rest portabili + scansione removibili), `PR.DS-02` p.1 (cifratura in-transit), `PR.PS-02` p.1-2 (solo SW supportato + patch), `DE.CM-09` p.1 (EDR endpoint).
- **`DE.CM-01`** è la misura "ancora" per la rilevazione: **strumenti tecnici di rilevazione + livelli di servizio attesi (SL)**. La definizione di SL è ciò che attiva il codice incidente IS-3 dell'Allegato 3.
- **Riesami biennali obbligatori** su: ruoli (`GV.RR-02`), valutazione del rischio (`ID.RA-05`), piani BC/DR/crisi (`ID.IM-04`), piano risposta incidenti (`RS.MA-01`).
- **Risorse umane (`GV.RR-04`)**: il personale autorizzato ai sistemi rilevanti è scelto previa valutazione di esperienza/affidabilità; ditto per gli amministratori di sistema. Niente clausole di obblighi post-cessazione del rapporto (queste sono solo nell'Allegato 2).
- **Catena di approvvigionamento (`GV.SC-*`)**: inventario fornitori prioritizzato (`GV.SC-04`); requisiti security in contratti (`GV.SC-05`); valutazione rischio fornitura (`GV.SC-07`) considerando livello di accesso, accesso a IP/dati, impatto interruzione, tempi/costi ripristino, ruoli del fornitore.
- **Sviluppo sicuro `PR.PS-06` p.1**: pratiche di secure coding documentate. Niente test in ambiente separato del SW critico (questo è solo nell'Allegato 2).

## Citazioni rilevanti

> "Sono adottate e documentate politiche di sicurezza informatica per almeno i seguenti ambiti: a) gestione del rischio; b) ruoli e responsabilità; c) affidabilità delle risorse umane; [...] p) risposta agli incidenti e ripristino." — `GV.PO-01` punto 1.

> "All'interno dell'organizzazione per la sicurezza informatica [...], sono inclusi il punto di contatto e il suo sostituto, il referente CSIRT e gli eventuali suoi sostituti, di cui alla determinazione adottata ai sensi dell'articolo 7, comma 6 del decreto NIS." — `GV.RR-02` punto 3.

> "Per almeno i sistemi informativi e di rete rilevanti, sono presenti, aggiornati, mantenuti e configurati in modo adeguato strumenti tecnici per rilevare tempestivamente gli incidenti significativi. Sono definiti e documentati i livelli di servizio attesi (SL) dei servizi e delle attività del soggetto NIS anche ai fini di rilevare tempestivamente gli incidenti significativi." — `DE.CM-01` punti 1-2.

> "Qualora per motivate e documentate ragioni normative o tecniche non siano attuati i requisiti di cui alla tabella 2 in appendice al presente allegato, sono adottate, ove applicabile, misure di mitigazione compensative e il piano di cui al punto 1 include la descrizione di tali misure e dell'eventuale rischio residuo." — `ID.RA-06` punto 2.

## Struttura riassuntiva delle misure

| Funzione | Misure presenti |
|---|---|
| **GOVERN** | `GV.OC-04`, `GV.RM-03`, `GV.RR-02`, `GV.RR-04`, `GV.PO-01`, `GV.PO-02`, `GV.SC-01`, `GV.SC-02`, `GV.SC-04`, `GV.SC-05`, `GV.SC-07` |
| **IDENTIFY** | `ID.AM-01`, `ID.AM-02`, `ID.AM-04`, `ID.RA-01`, `ID.RA-05`, `ID.RA-06`, `ID.RA-08`, `ID.IM-01`, `ID.IM-04` |
| **PROTECT** | `PR.AA-01`, `PR.AA-03`, `PR.AA-05`, `PR.AA-06`, `PR.AT-01`, `PR.DS-01`, `PR.DS-02`, `PR.DS-11`, `PR.PS-02`, `PR.PS-04`, `PR.PS-06`, `PR.IR-01` |
| **DETECT** | `DE.CM-01`, `DE.CM-09` |
| **RESPOND** | `RS.MA-01`, `RS.CO-02` |
| **RECOVER** | `RC.RP-01` |

Totale: **37 misure / 87 requisiti** suddivisi nelle 6 funzioni. Tabella 1 mappa ognuna sui 16 ambiti (a-p) di `GV.PO-01`.

## Tabella 1 (sintesi) — ambiti politiche e requisiti tecnici

| Ambito politica | Requisiti minimi (sottoinsieme misure) |
|---|---|
| a) Gestione del rischio | `GV.OC-04`, `GV.RM-03`, `ID.RA-05`, `ID.RA-06` |
| b) Ruoli e responsabilità | `GV.RR-02` |
| c) Affidabilità risorse umane | `GV.RR-04` |
| d) Conformità e audit | `GV.PO-01`, `GV.PO-02`, `ID.IM-01` |
| e) Supply-chain cyber | `GV.SC-01`, `GV.SC-02`, `GV.SC-04`, `GV.SC-05`, `GV.SC-07` |
| f) Gestione asset | `ID.AM-01`, `ID.AM-02`, `ID.AM-04` |
| g) Gestione vulnerabilità | `ID.RA-01`, `ID.RA-08` |
| h) BC/DR/crisi | `ID.IM-04` |
| i) IAM | `PR.AA-01`, `PR.AA-03`, `PR.AA-05`, `PR.IR-01` |
| j) Sicurezza fisica | `PR.AA-06` |
| k) Formazione | `PR.AT-01` |
| l) Sicurezza dati | `PR.DS-01`, `PR.DS-02`, `PR.DS-11` |
| m) Dev/config/dismissione | `PR.PS-02`, `PR.PS-04`, `PR.PS-06` |
| n) Protezione reti/comunicazioni | `PR.IR-01` |
| o) Monitoraggio eventi | `DE.CM-01`, `DE.CM-09` |
| p) Risposta incidenti e ripristino | `RS.MA-01`, `RS.CO-02`, `RC.RP-01` |

## Entità menzionate

- [[entities/ACN]] (Agenzia per la cybersicurezza nazionale, citata art. 37 c. 3)
- [[entities/CSIRT Italia]] — destinatario notifiche e canali di comunicazione vulnerabilità
- [[entities/Framework Nazionale per la Cybersecurity]] — base architetturale 6 funzioni
- [[entities/Punto di contatto NIS]], [[entities/Referente CSIRT]] — ruoli da includere nell'organizzazione di sicurezza informatica

## Concetti collegati

- [[concepts/Misure di sicurezza di base]] — concept-page operativa
- [[concepts/Misure di gestione del rischio cyber]] — i 10 ambiti dell'Art. 24 NIS2 di cui questo allegato è declinazione
- [[concepts/Specifiche tecniche di base]] — natura giuridica
- [[concepts/Soggetti essenziali e importanti]] — destinatari (importanti)
- [[concepts/Notifica di incidente significativo]] — agganciata a `RS.MA-01`
- [[concepts/Processo gestione incidenti NIS]] — modello operativo

## Note dell'agente

- L'allegato 1 è il sub-set "leggero" rispetto all'Allegato 2: tutte le misure presenti qui sono presenti anche lì, in versione almeno uguale. Vedere [[sources/Allegato 2 - Misure di sicurezza di base per i soggetti essenziali]] per il diff puntuale.
- *Sintesi dell'agente:* la tabella 1 è lo strumento di compliance più operativo del regime. Un audit tecnico potrebbe usarla come matrice di scoping (ambito politica → misure → punti specifici).
- I termini di adozione: per i soggetti importanti registrati nelle prime coorti, le misure di base si applicano entro **18 mesi** dalla classificazione (cfr. [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]] e [[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]).
