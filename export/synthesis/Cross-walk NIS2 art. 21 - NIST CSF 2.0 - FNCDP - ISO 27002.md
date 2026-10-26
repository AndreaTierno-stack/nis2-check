---
title: Cross-walk NIS2 art. 21 — NIST CSF 2.0 — FNCDP 2025 v2.1 — ISO 27002:2022 (v2)
type: synthesis
question: "Come si traduce un requisito operativo dell'art. 21 NIS2 in linguaggio NIST CSF 2.0, FNCDP italiano e controlli ISO/IEC 27002:2022? Quale è la struttura comune e dove sono le divergenze?"
tags: [cross-walk, nis2, art-21, nist-csf, fncdp, iso-27002, iso-27001, mapping, grc, framework, data-protection]
sources: ["[[sources/Direttiva (UE) 2022-2555 (NIS2)]]", "[[sources/Regolamento di esecuzione UE 2024-2690]]", "[[sources/NIST CSF 2.0 - 2024-02-26]]", "[[sources/FNCDP 2025 v2.1 Core]]", "[[sources/ISO IEC 27001-2022]]", "[[sources/ISO IEC 27002-2022]]", "[[sources/ENISA Mapping Table v1.0 - 2025-06-26]]", "[[sources/ENISA Technical Implementation Guidance v1.0 - 2025-06-26]]"]
scope: both
aliases: [Cross-walk NIS2-NIST-FNCDP-ISO, NIS2 NIST CSF FNCDP ISO 27002 mapping, Cross-walk v2]
---

## Premessa

Synthesis di cross-walk **v2** aggiornata in Wave 6 Cluster B+E Sessione 3 (2026-05-19), dopo l'ingest di [[sources/FNCDP 2025 v2.1 Core]]. La v1 (Sessione 2) trattava 4 livelli; questa v2 ne tratta **5** completi: NIS2 → atti tecnici → NIST CSF 2.0 → **FNCDP 2025 v2.1** → ISO 27001/27002:2022.

**Risultato chiave della v2**: il FNCDP coincide **completamente** con NIST CSF 2.0 nei prefissi codice (`GV.PO-01`, `PR.AA-03`, ecc.) — l'ipotesi v1 è confermata. Il FNCDP aggiunge **9 sottocategorie `DP-*`** (data protection) + **1 categoria nuova `DP-ID.DM`** (Data Management) — il delta italiano è documentato nella nuova *Differenza chiave 4*. Tutte le 13 tabelle sezione-per-sezione mostrano la colonna FNCDP sostanzialmente identica a NIST CSF 2.0, con eccezioni esplicite per le DP-*.

Questa synthesis è **`scope: both`** (retag 2026-07-02, cfr. [[_meta/decision_log]] DEC-002): resta strumento di carriera GRC e di preparazione ISO LA, ma è anche la **base dell'estensione controlli** del NIS2 Tool (Fase 3, v0.2) e come tale rientra nell'export della Project Knowledge. Nella v0.1.0 (verdetto di sola ambito) il cross-walk resta comunque out-of-MVP: l'utente del tool non riceve un cross-walk.

## Domanda originale

Per un consulente GRC italiano che lavora con clienti soggetti NIS2 e clienti certificati ISO 27001:2022: come si **traduce** un requisito normativo dell'art. 21 NIS2 (o un requisito tecnico del Reg. UE 2024/2690 o della det. ACN 379907/2025) in:

- Una **sottocategoria NIST CSF 2.0** (es. `GV.PO-01`, `PR.AA-03`) — il linguaggio FNCDP italiano e della guida ACN;
- Un **controllo ISO 27002:2022** (es. § 5.1, § 8.5) — il linguaggio dell'ISMS certificabile;
- Una **clausola ISO 27001:2022** (es. § 6.1.3) — il linguaggio dei requisiti management system.

Tradurre tra questi 4 "linguaggi" è competenza centrale GRC. Quando il FNCDP sarà in wiki, si aggiungerà esplicitamente come **quinto angolo** (in realtà coincide con NIST CSF 2.0 nei prefissi codice).

## I 5 livelli del cross-walk (4 documentati + 1 pending)

| Livello | Documento | Linguaggio | Stato wiki |
|---|---|---|---|
| **L1 — Norma astratta UE** | [[sources/Direttiva (UE) 2022-2555 (NIS2)\|NIS2 direttiva]] art. 21 | 10 ambiti minimi (lettere a-l) | ✅ |
| **L2 — Atti tecnici** | [[sources/Regolamento di esecuzione UE 2024-2690\|Reg. UE 2024/2690]] Allegato + [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19\|Det. ACN 379907/2025]] Allegati 1-2 | Requisiti tecnici (UE per DSP; IT generale) | ✅ |
| **L3 — Framework outcome-based** | [[sources/NIST CSF 2.0 - 2024-02-26\|NIST CSF 2.0]] + [[sources/FNCDP 2025 v2.1 Core\|FNCDP 2025 v2.1]] | Funzioni/Categorie/Sottocategorie (`GV.PO-01`, ecc.). FNCDP aggiunge 9 sottocategorie `DP-*` + categoria `DP-ID.DM` | ✅ |
| **L4 — Standard ISMS requirements** | [[sources/ISO IEC 27001-2022\|ISO 27001:2022]] | Clausole 4-10 + Annex A | ✅ |
| **L5 — Catalogo controlli** | [[sources/ISO IEC 27002-2022\|ISO 27002:2022]] | 93 controlli in 4 themes | ✅ |

## Struttura del cross-walk (mappato sulle 13 sezioni dell'Allegato Reg. UE 2024/2690)

Per ciascuna sezione dell'Allegato, riporto la mappatura puntuale (fonte: [[sources/ENISA Mapping Table v1.0 - 2025-06-26|ENISA Mapping Table v1.0]] xlsx ufficiale, integrata con verifica FNCDP 2025 v2.1).

> **Convenzione colonne v2** — *scelta di sintesi*: le 13 tabelle sezione-per-sezione **mantengono 3 colonne** (NIST CSF 2.0, ISO 27002:2022, ISO 27001:2022). La colonna FNCDP **non è ripetuta** perché coincide con NIST CSF 2.0 nei codici (verificato in [[sources/FNCDP 2025 v2.1 Core]]): **per ogni riga della colonna NIST CSF, lo stesso codice è valido in FNCDP**. Le sottocategorie italiane `DP-*` aggiuntive sono mostrate separatamente nella tabella *"Sottocategorie DP-* del FNCDP — collocazione nel cross-walk"* sotto la sezione 13. Questa scelta evita la duplicazione e privilegia la leggibilità.

### Tabella sommaria delta FNCDP rispetto a NIST CSF 2.0 (anticipata)

| Sottocategoria FNCDP `DP-*` | Funzione/Categoria di base | Tema | Mapping a sezione Reg. UE |
|---|---|---|---|
| `DP-GV.RR-05` | GOVERN / Roles & Responsibilities | Ruoli e responsabilità trattamento dati personali | Sez. 1.2 (estensione "data protection officer") |
| `DP-ID.AM-09` | IDENTIFY / Asset Management | Trattamenti di dati personali identificati e catalogati | Sez. 12.1, 12.4 (estensione "dati personali nell'inventario") |
| `DP-ID.RA-11` | IDENTIFY / Risk Assessment | Valutazione di impatto sulla protezione dei dati personali (DPIA) | Sez. 2.1 (estensione "DPIA ex art. 35 GDPR") |
| `DP-ID.DM-01..05` (categoria nuova `DP-ID.DM` Data Management) | IDENTIFY / Data Management *(non in NIST CSF)* | Ciclo vita dati, informativa, consenso, diritti interessato, trasferimenti internazionali | Non in Reg. UE 2024/2690 (è materia GDPR; richiamato indirettamente in Sez. 12 asset management e Sez. 1 policy) |
| `DP-RS.CO-06` | RESPOND / Communication | Comunicazione incidenti su dati personali (Garante privacy) | Sez. 3.3 (estensione "data breach notification ex art. 33 GDPR") |

**Conseguenza per il consulente GRC**: quando un cliente NIS2 italiano ha già implementato adempimenti GDPR maturi (DPIA, registro trattamenti, procedure data subject rights, notifica data breach), può **mappare quegli adempimenti sulle sottocategorie `DP-*` del FNCDP** e dimostrare la conformità data protection nello stesso documento della conformità NIS2. È un effort-saving notevole.

### Sez. 1 — Policy on the security of N&IS (art. 21(2)(a) NIS2)

| Punto Allegato Reg. | Codici NIST CSF 2.0 | Controlli ISO 27002:2022 | Clausole ISO 27001:2022 |
|---|---|---|---|
| **1.1** Policy on N&IS | `GV.PO-01`, `GV.PO-02`, `GV.OC-03`, `GV.RM-03`, `PR.AT-02`, `ID.IM-01..04` | A.5.1, A.5.4, A.5.36 | 5.2, 9.3 |
| **1.2** Roles, responsibilities, authorities | `GV.RR-02`, `GV.SC-02`, `PR.AT-02`, `ID.IM-01..04` | A.5.2, A.5.3, A.5.4 | 5.3 |

### Sez. 2 — Risk management policy (art. 21(2)(a))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **2.1** Risk management framework | `ID.RA-01..06`, `GV.RM-03`, `GV.RM-06`, `ID.RM-01`, `GV.RR-03` | A.5.7, A.5.19-A.5.21 | 6.1, 6.1.2, 6.1.3, 6.2, 8.2, 8.3 |
| **2.2** Compliance monitoring | `GV.OV-02`, `ID.IM-01..04` | A.5.31, A.5.35, A.5.36 | 9.2 |
| **2.3** Independent review | `GV.OV-02`, `ID.IM-01` | A.5.35, A.8.34 | 9.2, 10.1 |

### Sez. 3 — Incident handling (art. 21(2)(b))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **3.1** Incident handling policy | `GV.SC-08`, `RS.MA-01`, `RS.MA-05`, `RS.MI-01..02`, `ID.IM-01`, `ID.IM-04` | A.5.24 | (implicito via 6.1 + Annex A) |
| **3.2** Monitoring and logging | `RS.AN-06`, `RS.AN-07`, `ID.IM-01..04` | A.5.28, A.8.15, A.8.16, A.8.17 | — |
| **3.3** Event reporting | `RS.MI-01`, `RS.CO-02` | A.6.8 | — |
| **3.4** Event assessment | `DE.AE-04`, `RS.MA-02..04`, `ID.IM-01..04` | A.5.25 | — |
| **3.5** Incident response | `RS.MA-01..04`, `ID.IM-02..04`, `RS.CO-02..03`, `RS.AN-03`, `RS.MI-01..02`, `RC.CO-03..04` | A.5.26 | — |
| **3.6** Post-incident reviews | `ID.IM-01`, `ID.IM-04`, `RS.AN-08` | A.5.27 | — |

### Sez. 4 — Business continuity and crisis management (art. 21(2)(c))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **4.1** BC/DR plan | `ID.IM-02..04`, `GV.OC-04`, `GV.SC-08`, `RC.RP-01..02` | A.5.29, A.5.30 | — |
| **4.2** Backup management | `PR.DS-11`, `RC.RP-01..02`, `ID.IM-03` | A.8.13, A.8.14 | — |
| **4.3** Crisis management | `RS.CO-02..03`, `PR.IR-03`, `DE.CM-01`, `ID.AM-03`, `DE.AE-02..08` | A.5.26, A.5.29, A.5.30 | — |

### Sez. 5 — Supply chain security (art. 21(2)(d))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **5.1** Supply chain security policy | `GV.OC-03`, `GV.OC-05`, `GV.SC-01`, `GV.SC-04`, `GV.SC-05..07`, `GV.SC-09..10`, `ID.RA-10`, `ID.IM-01..04` | A.5.19-A.5.21, A.8.30 | — |
| **5.2** Directory of suppliers | `GV.OC-05`, `GV.SC-04`, `ID.IM-01..04` | A.5.22 | — |

### Sez. 6 — Security in N&IS acquisition, dev, maintenance (art. 21(2)(e))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **6.1** ICT acquisition | `GV.PO-02`, `GV.SC-06`, `ID.RA-09..10`, `ID.IM-01..04` | A.5.21, A.5.23 | — |
| **6.2** Secure development | `ID.AM-08`, `PR.PS-06`, `ID.IM-01..04` | A.8.25, A.8.31 | — |
| **6.3** Configuration management | `PR.PS-01`, `ID.IM-01..04` | A.8.9 | — |
| **6.4** Change/repairs/maintenance | `ID.RA-07`, `ID.IM-01..04` | A.7.13, A.8.32 | 6.3, 8.1 |
| **6.5** Security testing | `ID.RA-01`, `ID.IM-01..04` | A.8.29, A.8.33, A.8.34 | — |
| **6.6** Patch management | `PR.PS-02`, `DE.CM-09`, `ID.IM-01..04` | A.8.31, A.8.32 | — |
| **6.7** Network security | `DE.CM-01`, `PR.IR-01`, `PR.PS-05`, `ID.IM-01..04` | A.8.16, A.8.20 | — |
| **6.8** Network segmentation | `PR.IR-01`, `ID.IM-01..04` | A.8.22 | — |
| **6.9** Malware/unauthorized SW | `DE.CM-01`, `DE.CM-09`, `PR.PS-05`, `ID.IM-01..04` | A.5.32, A.8.7 | — |
| **6.10** Vulnerability handling | `ID.RA-01..06`, `ID.RA-08`, `PR.PS-02..03`, `ID.IM-01..04` | A.8.8 | — |

### Sez. 7 — Effectiveness assessment (art. 21(2)(f))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **7.1** Effectiveness policy | `ID.IM-01..04`, `GV.RM-06` | (implicito Annex A) | 6.2, 9.1, 9.3 |

### Sez. 8 — Basic cyber hygiene + training (art. 21(2)(g))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **8.1** Awareness raising + hygiene | `PR.AT-01..02`, `ID.IM-01..04` | A.6.3, A.8.7 | 7.3 |
| **8.2** Security training | `PR.AT-01`, `ID.IM-01..04` | A.6.3 | 7.2 |

### Sez. 9 — Cryptography (art. 21(2)(h))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **9.1** Cryptography | `PR.DS-01..02`, `ID.IM-01..04` | A.5.31, A.8.24 | — |

### Sez. 10 — Human resources security (art. 21(2)(i))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **10.1** HR security | `PR.AT-02`, `GV.RR-04`, `ID.IM-01..04` | A.6.2, A.6.3 | 7.1, 7.2 |
| **10.2** Background verification | `GV.RR-04`, `ID.IM-01..04` | A.6.1 | — |
| **10.3** Termination/change | `GV.RR-04` | A.6.5 | — |
| **10.4** Disciplinary process | `ID.IM-01..04` | A.6.4 | (implicito via 5.28) |

### Sez. 11 — Access control (art. 21(2)(i), (j))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **11.1** Access control policy | `PR.AA-05`, `ID.IM-01..04` | A.5.15, A.7.2, A.8.3, A.8.21, A.9 | — |
| **11.2** Management of access rights | `PR.AA-05`, `ID.IM-01..04` | A.5.3, A.5.18, A.9 | — |
| **11.3** Privileged accounts | `ID.IM-01..04` | A.8.2, A.8.18, A.9 | — |
| **11.4** Administration systems | — | A.8.2, A.8.18 | — |
| **11.5** Identification | `PR.AA-01`, `PR.AA-05`, `PR.AC-02` | A.5.16 | — |
| **11.6** Authentication | `PR.AA-05`, `PR.AA-03`, `ID.IM-01..04` | A.5.17 | — |
| **11.7** Multi-factor authentication | `PR.AA-03` | A.8.5 | — |

### Sez. 12 — Asset management (art. 21(2)(i))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **12.1** Asset classification | `ID.AM-05` | A.5.9, A.5.12, A.5.13 | — |
| **12.2** Handling of assets | `ID.IM-01` | A.5.9, A.5.10, A.5.14, A.7.10 | — |
| **12.3** Removable media policy | `PR.DS-01`, `ID.IM-01..04` | A.7.7, A.7.10 | — |
| **12.4** Asset inventory | `ID.AM-01..04`, `ID.AM-07..08`, `ID.IM-01..04` | A.5.9 | — |
| **12.5** Deposit/return/deletion | — | A.5.11, A.5.18, A.8.24 | — |

### Sez. 13 — Environmental and physical security (art. 21(2)(c), (e), (i))

| Punto | NIST CSF 2.0 | ISO 27002:2022 | ISO 27001:2022 |
|---|---|---|---|
| **13.1** Supporting utilities | `DE.CM-02`, `DE.CM-06`, `GV.OC-03`, `GV.OC-05`, `GV.OC-07`, `ID.RA-10`, `ID.IM-01..04` | A.7.11 | — |
| **13.2** Physical/environmental threats | `PR.IR-02`, `ID.IM-01..04` | A.7.3, A.7.5 | — |
| **13.3** Perimeter/physical access | `PR.AA-06`, `DE.CM-02` | A.7.1, A.7.2, A.7.4 | — |

## Pattern di lettura del cross-walk

### Pattern 1 — "Il mio cliente è certificato 27001:2022; cosa gli serve in più per essere conforme NIS2?"

1. Identifica il punto del Reg. UE 2024/2690 (o della det. ACN 379907/2025) di interesse.
2. Localizza nella tabella sopra i controlli ISO 27002:2022 mappati.
3. Verifica nel SoA del cliente che i controlli siano implementati.
4. **Gap analysis**: i controlli mancanti o "policy-only" → action items per la compliance NIS2.
5. **Caveat ENISA**: il mapping non è equivalenza. La presenza del controllo ISO non garantisce la conformità del requisito normativo. Serve verifica funzionale.

### Pattern 2 — "Il mio cliente è soggetto NIS2; come si certifica ISO 27001:2022?"

1. Parti dal pacchetto di misure di sicurezza di base che il cliente deve implementare (det. ACN 379907/2025 + eventuale Reg. UE 2024/2690).
2. Per ciascuna misura, identifica il controllo ISO 27002:2022 corrispondente.
3. Costruisci il **SoA**: i controlli implementati per NIS2 vanno dichiarati "in scope" per ISO 27001 (con riferimento alle politiche/procedure NIS2 come implementing documents).
4. Aggiungi i controlli ISO 27001 **non coperti** da NIS2 ma necessari per la certificazione (es. clausole 4 contesto, 5 leadership, 9 internal audit/management review, 10 corrective actions).

### Pattern 3 — "Costruisco un Organizational Profile NIST CSF 2.0 per orientarmi nel regime NIS2"

1. Scope il Profile sul perimetro NIS2 (le attività e i servizi NIS del soggetto).
2. Mappa il Current Profile usando le sottocategorie NIST CSF (es. `GV.PO-01`, `PR.AA-03`, ecc.).
3. Mappa il Target Profile usando le stesse sottocategorie, derivate dalla det. ACN / Reg. UE.
4. **Gap analysis** = misure NIS2 da implementare.
5. Vantaggio: il linguaggio è coerente con il FNCDP italiano (stessi prefissi codice), quindi report e deliverable sono allineati alle aspettative del regolatore.

## Posizioni a confronto — differenze tra i 4/5 linguaggi

### Differenza chiave 1 — Outcome-based vs Control-based

- **NIST CSF 2.0** e **FNCDP 2025** sono **outcome-based**: descrivono *cosa* ottenere (es. *"Authorized devices are managed before connecting to the organization's networks"*).
- **ISO 27002:2022** è **control-based**: descrive **cosa fare** (Control) + **come farlo** (Guidance).
- **Reg. UE 2024/2690 / Det. ACN 379907/2025** stanno **a metà**: requisiti normativi (cosa fare) con guidance ENISA/ACN (come farlo).

**Implicazione**: tradurre tra outcome (NIST CSF / FNCDP) e control (ISO 27002) richiede sempre un'inferenza intermedia. Non c'è equivalenza 1-a-1.

### Differenza chiave 2 — Funzione GOVERN

- **NIST CSF 2.0** ha la 6.a funzione **GOVERN** (introdotta nel 2024).
- **FNCDP 2025 v2.1** ha incorporato **integralmente** la funzione GOVERN ✅ (verificato in Wave 6 Sessione 3 — header "CSF 2.0" su ogni pagina; 6 categorie GV.OC/RM/RR/PO/OV/SC identiche a NIST CSF 2.0). Si aggiunge `DP-GV.RR-05` (responsabilità data protection).
- **ISO 27002:2022** è stata pubblicata 2 anni prima (febbraio 2022) e **non riflette** la funzione GOVERN del CSF. La sua tassonomia per attributo *Cybersecurity concepts* usa ancora i 5 concetti del CSF 1.1 (Identify/Protect/Detect/Respond/Recover, senza Govern).
- **ISO 27001:2022 clausola 5 (Leadership)** è il pendant funzionale di GOVERN, ma con linguaggio "management system" classico.

**Implicazione**: per mappare la funzione GV NIST CSF 2.0 / FNCDP su ISO, si attraversa: GV → ISO 27001 clausola 5 (Leadership) + ISO 27002 controlli organizzativi 5.1-5.4. Una futura revisione di ISO 27002 introdurrà probabilmente l'attributo *Governance* in modo allineato a CSF 2.0.

### Differenza chiave 3 — *Data Protection* italiana (delta FNCDP)

**Esclusivamente del FNCDP** (assente in NIST CSF 2.0 / ISO 27002:2022 / Reg. UE 2024/2690): le 9 sottocategorie `DP-*` + categoria nuova `DP-ID.DM`.

- **Rilevanza per la GRC italiana**: chi opera in Italia raramente fa "solo cybersecurity" — c'è sempre la dimensione GDPR/Codice della privacy (D.Lgs. 196/2003 come novellato dal D.Lgs. 101/2018). Il FNCDP è l'unico framework che integra **nativamente** cyber + data protection in un'unica struttura outcome-based.
- **Mapping a GDPR**: le DP-* hanno Informative References puntuali a GDPR articoli (`Art. 12-14` informativa via DP-ID.DM-02; `Art. 7` consenso via DP-ID.DM-03; `Capo III art. 15-22` diritti via DP-ID.DM-04; `Capo V` trasferimenti via DP-ID.DM-05; `Art. 32` sicurezza trattamento riconducibile a tutta la funzione PROTECT).
- **Mapping a NIS2**: nessuno diretto. Il Reg. UE 2024/2690 e la det. ACN 379907/2025 non hanno requisiti `DP-*`-specifici. Il consulente GRC che vuole **integrare** NIS2 + GDPR usa il FNCDP come framework di sintesi.
- **Caveat**: il FNCDP NON è un atto regolatorio GDPR (non sostituisce il Codice della privacy, le linee guida del Garante, le decisioni dell'EDPB). È strumento di buone pratiche; la compliance GDPR si dimostra rispetto agli atti normativi.

**Implicazione per il [[sources/ENISA Mapping Table v1.0 - 2025-06-26|Mapping Table ENISA]]**: la colonna "National frameworks" del Mapping Table **non include il FNCDP** (verificato in Wave 6 Sessione 1 sul xlsx ufficiale). L'unico framework nazionale presente è il "Cybersecurity Handbook" (probabilmente CY). Per un'organizzazione italiana che vuole dimostrare alla Commissione UE la propria conformità via FNCDP, il bridge è asimmetrico: deve passare per NIST CSF 2.0 (codici coincidenti) o per ISO 27002:2022 (via ENISA mapping).

### Differenza chiave 4 — Statement of Applicability (SoA) vs piani NIS2

- **ISO 27001:2022 § 6.1.3 d)** richiede un SoA che dichiara per ciascun controllo Annex A: incluso/escluso + giustificazione.
- **Det. ACN 379907/2025** non ha l'equivalente formale del SoA, ma le **clausole basate sul rischio** ([[concepts/Clausole basate sul rischio]]) operano la stessa funzione tramite: (i) elenco dei sistemi rilevanti `GV.OC-04`, (ii) piano di trattamento del rischio `ID.RA-06`, (iii) misure compensative documentate.
- **Reg. UE 2024/2690** non ha SoA formale, ma art. 2(2) ammette documentazione delle eccezioni (cfr. [[synthesis/Risposta TIG ENISA alle Q1-Q4 della coordinamento UE-IT]] Q4).

**Implicazione**: un'organizzazione certificata 27001 può **derivare** dal SoA la documentazione richiesta dalla det. ACN (sistemi rilevanti, piano di trattamento, compensative). Non automatica, ma la base concettuale è la stessa.

## Limiti del cross-walk

- **Caveat ENISA** già citato: il mapping **non costituisce equivalenza** tra standard. Un controllo ISO può "coprire" solo parzialmente un requisito Reg. UE.
- **Granularità diversa**: una sottocategoria NIST CSF/FNCDP può essere coperta da 1-N controlli ISO 27002; un controllo ISO 27002 può supportare 1-N sottocategorie NIST CSF.
- **FNCDP — coverage v2**: il FNCDP è ora incorporato (Sessione 3) con la coincidenza confermata a NIST CSF 2.0 nei codici + delta DP-* documentato.
- **Standard non in wiki**: ETSI EN 319 401 (trust services) e CEN/TS 18026:2024 (specifiche tecniche CEN) sono nella Mapping Table ENISA ma non in questa synthesis. Out-of-scope di questa wave.
- **Mapping FNCDP → ISO 27002**: il FNCDP NON cita ISO 27002 nelle proprie Informative References (preferisce NIST SP 800-53 + ISO 29100 + CCM + CIS Controls + CRI). Il bridge è quindi asimmetrico: FNCDP ↔ NIST CSF 2.0 (diretto) ↔ ISO 27002 (via ENISA Mapping Table).

## Action items / Aggiornamenti per v3 (futuri)

1. **Aggiunta ETSI/CEN**: se l'autore decide di lavorare con clienti trust service provider o di approfondire CEN/TS 18026, le colonne ETSI/CEN della Mapping Table ENISA possono essere integrate.
2. **Pattern di lettura aggiuntivi**: il presente nodo ha 3 pattern. Pattern 4 ("cliente che usa NIST CSF come framework primario e deve mappare su NIS2") + Pattern 5 ("integrare DP-* del FNCDP nel SoA di un cliente certificato ISO 27001 con DPIA mature") sono candidati per v3.
3. **Profili NIST CSF / FNCDP**: il NIST pubblica online Community Profiles per settori specifici (ransomware, IoT, ecc.). Il FNCDP ha pubblicato separatamente profili settoriali (PA, finanza, ecc.) non in batch. Outlook futuro.

## Collegamenti

- [[sources/Regolamento di esecuzione UE 2024-2690]]
- [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]
- [[sources/NIST CSF 2.0 - 2024-02-26]]
- [[sources/FNCDP 2025 v2.1 Core]] — fonte upstream del corpus IT, ingerito in Sessione 3
- [[sources/ISO IEC 27001-2022]]
- [[sources/ISO IEC 27002-2022]]
- [[sources/ISO IEC 27000-2018]]
- [[sources/ENISA Mapping Table v1.0 - 2025-06-26]]
- [[sources/ENISA Technical Implementation Guidance v1.0 - 2025-06-26]]
- [[entities/Framework Nazionale per la Cybersecurity]] — entity FNCDP, aggiornato in Sessione 3 con contenuti v2.1
- [[concepts/Misure di sicurezza di base]]
- [[concepts/Clausole basate sul rischio]]
- [[concepts/Evidenze documentali NIS]]
- [[concepts/Responsabilità degli organi di gestione]]
- [[synthesis/Coordinamento Reg UE 2024-2690 e Det ACN 379907-2025]]
- [[synthesis/Risposta TIG ENISA alle Q1-Q4 della coordinamento UE-IT]]

## Note dell'agente

- *Sintesi dell'agente:* questo nodo è il **principale asset di carriera GRC** prodotto da Wave 6. Per l'autore, padroneggiarlo significa poter passare con disinvoltura tra il linguaggio del cliente (ISO 27001/27002), il linguaggio del regolatore italiano (det. ACN, FNCDP), il linguaggio del regolatore europeo (Reg. UE 2024/2690), e il linguaggio dell'industria globale (NIST CSF 2.0). È il *core skill* del consulente GRC italiano nel contesto NIS2.
- ✅ **Ipotesi v1 confermata in v2 (Sessione 3)**: la previsione del v1 secondo cui "il FNCDP coincide con NIST CSF 2.0 nei prefissi codice" è risultata corretta. La scelta di sintesi adottata in v2 — mantenere le 13 tabelle a 3 colonne anziché 4 + tabella dedicata DP-* — è giustificata da questa coincidenza. Se la verifica avesse rivelato divergenze sostanziali nei codici, avremmo dovuto duplicare la colonna.
- *Sintesi dell'agente — risultato architetturale di v2*: il delta FNCDP ↔ NIST CSF 2.0 è **9 sottocategorie + 1 categoria nuova DP-ID.DM** = aggiunte data protection. Tutto il resto è in coincidenza 1-a-1. Questo è notevolmente più "stretto" di quanto ci si potesse aspettare per un framework "nazionale italiano": il FNCDP è essenzialmente *NIST CSF 2.0 in italiano + extension data protection*. Per il consulente GRC, significa che padroneggiare NIST CSF 2.0 vale come padroneggiare 90% del FNCDP. Il restante 10% (DP-*) è coperto da GDPR mastery.
- *Caveat di lettura sulla riga `DP-ID.DM-01..05`*: la collocazione "richiamato indirettamente in Sez. 12 asset management e Sez. 1 policy" è **inferenza dell'agente**, non citazione esplicita del Reg. UE 2024/2690. Il Reg. UE non ha riferimenti `DP-*`; il legame con Sez. 12 e Sez. 1 emerge perché asset management e policy generale ricomprendono concettualmente la gestione dei trattamenti di dati personali. Un consulente GRC esterno potrebbe chiedere fonte puntuale — la risposta è "interpretazione di sistema, non riferimento testuale".
- **Possibile output pubblico**: questo cross-walk, opportunamente generalizzato (senza riferimenti specifici alla wiki), può diventare un articolo LinkedIn / blog post di alto valore per una transizione da software engineering a GRC — *"Come tradurre tra NIS2, NIST CSF, FNCDP, ISO 27001/27002: una guida pratica per consulenti italiani"*. Da considerare post-launch del NIS2 Tool. Un sotto-articolo dedicato ai delta DP-* potrebbe targettare il mercato GDPR/DPO italiano (es. *"Come usare il FNCDP per integrare NIS2 + GDPR in un'unica struttura di compliance"*).
