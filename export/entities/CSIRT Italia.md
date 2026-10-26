---
title: CSIRT Italia
type: entity
scope: both
entity_type: organizzazione
tags: [italia, csirt, incident-response, nis2, acn]
sources: ["[[sources/Direttiva (UE) 2022-2555 (NIS2)]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/La normativa NIS - Pagina ACN]]", "[[sources/Linee Guida NIS - Gestione incidenti - 2025-12]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]"]
aliases: [CSIRT-IT, Computer Security Incident Response Team Italia]
---

## Cos'è

Squadra nazionale di **risposta agli incidenti di sicurezza informatica**. Funzione interna all'[[entities/ACN]] (non soggetto giuridicamente autonomo nel modello italiano). Designata come CSIRT nazionale ai sensi della [[sources/Direttiva (UE) 2022-2555 (NIS2)|Direttiva NIS2 Art. 10]] e del [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024 Art. 10]]. Rappresenta l'Italia nella [[entities/Rete di CSIRT nazionali|Rete UE dei CSIRT]].

## Fatti chiave

- **Costituzione**: già operativo come CSIRT nazionale ai sensi del DPCM 8 agosto 2019 (recepimento NIS1); confermato con NIS2.
- **Funzioni**:
  - **Monitoraggio** delle minacce e degli incidenti su scala nazionale.
  - **Risposta** agli incidenti notificati dai soggetti NIS (raccolta, triage, supporto).
  - **Allerta tempestiva**, avvisi, bollettini.
  - **Gestione delle vulnerabilità**, incluso il [[concepts/Coordinated Vulnerability Disclosure|CVD]].
  - **Cooperazione** con CSIRT UE e con CSIRT settoriali (anche fuori NIS2).
  - **Volontariato**: i soggetti non NIS possono notificare volontariamente al CSIRT.
- **Ricezione delle notifiche**: tutte le notifiche di [[concepts/Incidente significativo|incidente significativo]] ex Art. 25 D.Lgs. 138/2024 affluiscono al CSIRT Italia tramite la [[concepts/Piattaforma digitale ACN|piattaforma digitale ACN]]. La controparte operativa nel soggetto è il [[entities/Referente CSIRT|referente CSIRT]] e i suoi sostituti, designati ex art. 7 della [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|det. piattaforma]].
- **Linee Guida**: pubblica linee guida non vincolanti che orientano il [[concepts/Processo gestione incidenti NIS|processo di gestione incidenti]] dei soggetti NIS — es. [[sources/Linee Guida NIS - Gestione incidenti - 2025-12]] (modello a 5 fasi [[entities/NIST SP 800-61|NIST SP 800-61r3]]).
- **Output**: produce alert TLP, bollettini periodici, advisory su vulnerabilità, threat intelligence per i settori critici.

## Relazioni

- È **una funzione operativa** dentro [[entities/ACN]], non un ente separato.
- Punto italiano della [[entities/Rete di CSIRT nazionali]] coordinata da [[entities/ENISA]].
- Si coordina con il [[entities/Nucleo per la Cybersicurezza]] in caso di crisi.
- Riceve segnalazioni dai soggetti rientranti nei [[concepts/Soggetti essenziali e importanti|due regimi NIS2]].

## Apparizioni nelle fonti

- [[sources/D.Lgs. 138-2024 (Decreto NIS)]]: Art. 10 — designazione; Art. 25 — destinatario delle notifiche; Capo III — funzioni di gestione vulnerabilità e cooperazione.
- [[sources/Direttiva (UE) 2022-2555 (NIS2)]]: Art. 10-11 — funzioni richieste a un CSIRT nazionale (modello che CSIRT Italia recepisce).
- [[sources/La normativa NIS - Pagina ACN]]: indicato come entry point per la notifica e per l'engagement volontario.
