---
title: Specifiche tecniche di base
type: concept
scope: both
tags: [nis2, italia, determinazioni-acn, tecnica, art-27]
sources: ["[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/La normativa NIS - Pagina ACN]]", "[[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]", "[[sources/Allegato 1 - Misure di sicurezza di base per i soggetti importanti]]", "[[sources/Allegato 2 - Misure di sicurezza di base per i soggetti essenziali]]", "[[sources/Allegato 3 - Incidenti significativi di base per i soggetti importanti]]", "[[sources/Allegato 4 - Incidenti significativi di base per i soggetti essenziali]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/Determinazione ACN categorizzazione - 2026-04-13]]", "[[sources/Allegato 1 modello - Categorizzazione soggetti art. 2 c. 2]]", "[[sources/Allegato 2 modello - Categorizzazione soggetti art. 2 c. 3]]", "[[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]", "[[sources/Determinazione ACN accordi condivisione - 2025-04-10]]", "[[sources/Determinazione ACN funzionamento Tavolo NIS - 2025-07-16]]", "[[sources/Determinazione ACN composizione Tavolo NIS - 2026]]", "[[sources/Linee Guida NIS - Gestione incidenti - 2025-12]]", "[[sources/Guida lettura specifiche di base]]"]
aliases: [Determinazioni ACN, Determinazioni del Direttore generale ACN, Specifiche tecniche]
---

## Definizione

Atti **sub-legislativi** adottati dal **Direttore generale dell'[[entities/ACN]]**, sentito il [[entities/Tavolo per l'attuazione della disciplina NIS|Tavolo NIS]], che dettagliano in concreto i requisiti tecnici, organizzativi e operativi imposti dal regime NIS2.

Disciplinati dall'**Art. 27** del [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]] e da norme attuative interne ad ACN.

## Funzione

Il decreto fissa **principi e ambiti** ([[concepts/Misure di gestione del rischio cyber|10 ambiti]] minimi, [[concepts/Notifica di incidente significativo|tempistiche di notifica]], etc.), ma rinvia per il **dettaglio operativo** alle determinazioni. Sono il **principale strumento regolatorio** del modello italiano:

- **Specifiche tecniche** dei 10 ambiti dell'Art. 24 (es. requisiti di crittografia, MFA, hardening, segmentazione, log retention).
- **Modalità e formati** di registrazione (Art. 7) e di notifica (Art. 25).
- **Soglie quantitative** di "[[concepts/Incidente significativo|significatività]]" (in raccordo con DPCM).
- **Criteri di [[concepts/Categorizzazione dei soggetti|categorizzazione]]** (Art. 30).
- **Criteri di [[concepts/NIS2|proporzionalità]]** (Art. 31).
- **Tempistiche di adeguamento** modulate per settore e categoria.

## Procedura di adozione

1. **Predisposizione** da parte degli uffici ACN.
2. **Consultazione** obbligatoria con il [[entities/Tavolo per l'attuazione della disciplina NIS|Tavolo NIS]] (sede di confronto con le 9 autorità di settore).
3. **Eventuale consultazione pubblica** con i soggetti rientranti.
4. **Adozione** con atto formale del Direttore generale.
5. **Pubblicazione** sul sito ACN; entrata in vigore (eventualmente differita per phase-in).

## Caratteristiche

- **Atto amministrativo**: vincolante per i destinatari ma impugnabile davanti al giudice amministrativo.
- **Aggiornabili**: ACN può modificarle per stare al passo con l'evoluzione delle minacce e dei riferimenti tecnici (standard ISO/IEC, framework NIST, linee guida ENISA).
- **Strumento agile**: rispetto a una norma di rango primario, le determinazioni si adottano in tempi brevi.

## Corpo regolamentare 2025-2026

Le determinazioni ACN adottate finora costituiscono il primo corpo regolamentare attuativo del decreto NIS:

| Determinazione | Funzione |
|---|---|
| [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19\|n. 379907 del 19/12/2025]] + 4 allegati ([[sources/Allegato 1 - Misure di sicurezza di base per i soggetti importanti\|All.1]], [[sources/Allegato 2 - Misure di sicurezza di base per i soggetti essenziali\|All.2]], [[sources/Allegato 3 - Incidenti significativi di base per i soggetti importanti\|All.3]], [[sources/Allegato 4 - Incidenti significativi di base per i soggetti essenziali\|All.4]]) | Specifiche di base: [[concepts/Misure di sicurezza di base\|misure]] (All. 1-2 = **37/43 misure**, 87/116 requisiti su 6 funzioni FNCDP) e [[concepts/Incidenti significativi di base\|incidenti]] (All. 3-4 = codici IS-1..4); regimi transitori OSE/telco |
| [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13\|piattaforma e procedure]] | Capi I-VI: ruoli, calendario annuale, verifiche di coerenza, censimento via SPID/CIE |
| [[sources/Determinazione ACN categorizzazione - 2026-04-13\|categorizzazione]] + 2 modelli ([[sources/Allegato 1 modello - Categorizzazione soggetti art. 2 c. 2\|art. 2 c. 2]], [[sources/Allegato 2 modello - Categorizzazione soggetti art. 2 c. 3\|art. 2 c. 3]]) | 10 macro-aree, 4 categorie di rilevanza, automatismo PSNC. Modelli divergono solo sulla Logistica (basso vs minimo) |
| [[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30\|termini coorte 2026]] | Termini speciali per i soggetti registrati nel 2026 |
| [[sources/Determinazione ACN accordi condivisione - 2025-04-10\|accordi condivisione]] | Notifica via piattaforma degli accordi ex art. 17 |
| [[sources/Determinazione ACN funzionamento Tavolo NIS - 2025-07-16\|funzionamento Tavolo NIS]] | Convocazione, quorum, deliberazione |
| [[sources/Determinazione ACN composizione Tavolo NIS - 2026\|composizione Tavolo NIS]] | Elenco aggiornato componenti |

A queste si affiancano le **Linee Guida** (atti non vincolanti, di indirizzo):

- [[sources/Linee Guida NIS - Gestione incidenti - 2025-12]] — modello a 5 fasi [[entities/NIST SP 800-61|NIST SP 800-61r3]].
- [[sources/Guida lettura specifiche di base]] — meta-documento ACN che fissa l'interpretazione di det. 379907/2025 e dei suoi 4 allegati: conteggi esatti (37/87 importanti, 43/116 essenziali), le 4 [[concepts/Clausole basate sul rischio|clausole basate sul rischio]], i [[concepts/Sistemi informativi e di rete rilevanti|sistemi rilevanti]], il modello tridimensionale degli incidenti, la mappatura art. 24 c.2 → codici misure (Appendice A), i 11 documenti del board (Appendice C).

## Concetti figli operativi

- [[concepts/Misure di sicurezza di base]] — Allegati 1-2 det. 379907/2025
- [[concepts/Incidenti significativi di base]] — Allegati 3-4 det. 379907/2025
- [[concepts/Macro-aree NIS]] — modello categorizzazione
- [[concepts/Categorie di rilevanza]] — alto/medio/basso/minimo
- [[concepts/Regime transitorio OSE]] — art. 5 det. 379907
- [[concepts/Regime transitorio telco]] — art. 6 det. 379907

## Collegamenti

- [[concepts/Misure di gestione del rischio cyber]] — gli ambiti che le determinazioni declinano
- [[concepts/Notifica di incidente significativo]] — la notifica è dettagliata da determinazioni
- [[concepts/Categorizzazione dei soggetti]] — Art. 30, regolato da determinazioni
- [[concepts/Identificazione dei soggetti NIS]] — Art. 7, regolato da determinazioni
- [[concepts/Processo gestione incidenti NIS]] — modello operativo
- [[concepts/Soggetti PSNC-NIS]] — interfaccia con perimetro nazionale
- [[concepts/Coordinamento DORA-NIS]] — esoneri DORA
- [[entities/ACN]], [[entities/Tavolo per l'attuazione della disciplina NIS]], [[entities/Framework Nazionale per la Cybersecurity]]
