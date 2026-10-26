---
title: Framework Nazionale per la Cybersecurity e la Data Protection
type: entity
scope: both
entity_type: opera
tags: [italia, framework, cybersecurity, sapienza, cini, acn, standard, fncdp, nist-csf, data-protection, gdpr]
sources: ["[[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]", "[[sources/Allegato 1 - Misure di sicurezza di base per i soggetti importanti]]", "[[sources/Allegato 2 - Misure di sicurezza di base per i soggetti essenziali]]", "[[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]", "[[sources/Guida lettura specifiche di base]]", "[[sources/FNCDP 2025 v2.1 Core]]", "[[sources/NIST CSF 2.0 - 2024-02-26]]"]
aliases: [Framework Nazionale, FNCDP, FNCDP edizione 2025, FNCDP 2025 v2.1]
---

## Cos'è

**Strumento di supporto** per le organizzazioni pubbliche e private italiane in materia di **strategie e processi volti alla sicurezza informatica**. Realizzato dal **Centro di ricerca di cyber intelligence and information security (CIS)** della **Sapienza Università di Roma** e dal **Cybersecurity national lab del CINI** (Consorzio interuniversitario nazionale per l'informatica), in collaborazione con l'**[[entities/ACN]]**.

Edizione corrente: **2025, versione 2.1.0 (Core)** — ingerita in [[sources/FNCDP 2025 v2.1 Core]] in Wave 6 Sessione 3 (2026-05-19). 172 pagine il Core. Documento completo (Core + appendici applicative) include anche profili e linee guida settoriali pubblicati separatamente.

## Fatti chiave

- **Contenuto**: framework strutturato in **funzioni, categorie, sottocategorie e requisiti** — derivato **direttamente** da **[[sources/NIST CSF 2.0 - 2024-02-26|NIST Cybersecurity Framework 2.0]]** (header "CSF 2.0" su ogni pagina del documento) e adattato al contesto italiano con l'aggiunta di **9 sottocategorie `DP-*`** dedicate alla *data protection* (GDPR + D.Lgs. 196/2003 + ISO/IEC 29100).
- **Status regolatorio**: **non è un atto normativo**, è **soft-law**. Il FNCDP **non cita** NIS2 / Reg. UE 2024/2690 / Det. ACN 379907 — è la **det. ACN** che cita il FNCDP all'art. 1 c. 1 lett. j) come base architetturale delle misure di sicurezza di base. Aggancio asimmetrico inverso.
- **Edizioni**: v1 (2015, da NIST CSF 1.0) → v2.0 (2019, da NIST CSF 1.1, introduzione estensione *Data Protection*) → **v2.1 (2025, allineata a NIST CSF 2.0** con funzione GOVERN; espansione DP-*).
- **Partecipanti istituzionali**: **CIS-Sapienza** (Centro di ricerca di cyber intelligence and information security — lead accademico), **CINI Cybersecurity National Lab** (Consorzio interuniversitario nazionale per l'informatica — co-autore), **[[entities/ACN]]** (collaborazione istituzionale).

## Funzione nel regime NIS

- Le **misure di sicurezza di base** della [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]] (allegati 1 e 2) sono organizzate **"in accordo al Framework nazionale" e nella forma "funzioni, categorie, sottocategorie e requisiti"** (art. 1 c. 1 lett. j) della determinazione).
- È esplicitamente citato anche dalla [[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]] come "strumento di supporto".
- *Inferenza:* funge da **collante semantico** tra l'astrazione della normativa (artt. 23-24 decreto NIS, ambiti minimi) e la pratica organizzativa, fornendo un linguaggio comune a soggetti pubblici e privati.

## Le 6 funzioni — struttura piena dell'edizione 2025 v2.1

Verificata a lettura del [[sources/FNCDP 2025 v2.1 Core]] (Wave 6 Sessione 3): le 6 funzioni FNCDP sono **identiche** a NIST CSF 2.0 nei codici e nella numerazione delle sottocategorie:

| Funzione | Codice | Categorie FNCDP 2025 v2.1 |
|---|---|---|
| **GOVERN** (Governo) | `GV` | `GV.OC` Contesto org. · `GV.RM` Strategia rischio · `GV.RR` Ruoli e responsabilità · `GV.PO` Politica · `GV.OV` Supervisione · `GV.SC` Supply chain · **+`DP-GV.RR-05`** |
| **IDENTIFY** (Identificazione) | `ID` | `ID.AM` Asset · `ID.RA` Risk Assessment · `ID.IM` Improvement · **+`DP-ID.AM-09`** · **+`DP-ID.RA-11`** · **+ categoria nuova `DP-ID.DM` Data Management (5 sottocategorie DM-01..05)** |
| **PROTECT** (Protezione) | `PR` | `PR.AA` IAM · `PR.AT` Training · `PR.DS` Data Security · `PR.PS` Platform Security · `PR.IR` Infrastructure Resilience |
| **DETECT** (Rilevamento) | `DE` | `DE.CM` Continuous Monitoring · `DE.AE` Adverse Event Analysis |
| **RESPOND** (Risposta) | `RS` | `RS.MA` Management · `RS.AN` Analysis · `RS.CO` Communication · `RS.MI` Mitigation · **+`DP-RS.CO-06`** |
| **RECOVER** (Ripristino) | `RC` | `RC.RP` Recovery Planning · `RC.CO` Communication |

**Delta italiano rispetto a NIST CSF 2.0**: 9 sottocategorie `DP-*` + 1 categoria nuova `DP-ID.DM`.

**Nota terminologica** (footnote degli allegati det. ACN): nei nomi delle categorie/sottocategorie sono mantenuti i termini "cybersecurity" e "organizzazione" del Framework, ma vanno letti rispettivamente come *sicurezza informatica* e *soggetto NIS*.

## Relazioni

- Co-realizzato con [[entities/ACN]].
- Recepito normativamente dalle determinazioni ACN come base delle specifiche di base.
- Concettualmente parente del NIST Cybersecurity Framework (CSF) e di [[entities/NIST SP 800-61]] (per la gestione incidenti).

## Informative References del FNCDP

Per ciascuna sottocategoria, il FNCDP v2.1 mappa **estensivamente** verso standard internazionali e atti normativi (Informative References):

- **GDPR** (UE 2016/679) — articoli puntuali: 24, 26, 27, 28, 29, 32, 37, 38, 39
- **D.Lgs. 30/6/2003 n. 196** (Codice della privacy italiano, post-GDPR) — art. 2-quaterdecies, 2-quinquiesdecies, 2-sexiesdecies
- **ISO/IEC 29100:2011** (Privacy framework standard internazionale)
- **NIST SP 800-53 Rev 5.1.1** + **NIST SP 800-221A**
- **CCMv4.0** (Cloud Controls Matrix, Cloud Security Alliance)
- **CIS Controls v8.0**
- **CRI Profile v2.0** (Cyber Risk Institute)
- **FNCDP v2.0** (l'edizione precedente, citata per backward compatibility)

**Notabile assenza**: il FNCDP NON cita ISO/IEC 27001:2022 / 27002:2022 (gli standard ISMS) nelle Informative References. Il bridge a ISO è affidato esternamente alla [[sources/ENISA Mapping Table v1.0 - 2025-06-26]].

## Apparizioni nelle fonti

- [[sources/FNCDP 2025 v2.1 Core]]: **fonte principale**, ingerita in Wave 6 Sessione 3.
- [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]: citato in premessa e come base delle misure di sicurezza di base (art. 1 lett. j)).
- [[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]: citato in premessa.
- [[sources/Guida lettura specifiche di base]]: confermata edizione 2025 come base architetturale; descritto come "strumento di supporto" (§ 2.1, nota 16). URL ufficiale: cybersecurityframework.it.
- [[sources/NIST CSF 2.0 - 2024-02-26]]: fonte upstream (header "CSF 2.0" su ogni pagina del FNCDP v2.1).

## Note dell'agente

- *Sintesi dell'agente:* la collaborazione **accademia + ACN** rende il framework un'opera autorevole pur senza essere normativa. È un caso interessante di **co-regolazione tecnica**: lo Stato non emana lo standard, ma lo richiama nelle determinazioni come riferimento metodologico **vincolante de facto**.
- *Sintesi dell'agente:* l'**asimmetria di citazione** è il fatto architetturale più rilevante: la det. ACN cita FNCDP ma FNCDP non cita NIS2. Il regolatore italiano ha scelto un framework di buone pratiche pre-esistente come base tecnica, anziché creare un proprio framework di compliance NIS2. Modello replicato anche dalla **Mapping Table ENISA** (che però **non include** il FNCDP nei national frameworks — cfr. [[sources/ENISA Mapping Table v1.0 - 2025-06-26]]: opportunità di networking GRC per l'autore).
- Per la lista completa delle misure mappate sulle funzioni e per la Tabella 1 dei 16 ambiti politiche, vedere [[concepts/Misure di sicurezza di base]].
- ✅ **Lacuna nota chiusa in Wave 6 Sessione 3**: i contenuti precisi delle funzioni-categorie-sottocategorie del FNCDP v2.1 sono ora ingeriti in [[sources/FNCDP 2025 v2.1 Core]].
