---
title: Responsabilità degli organi di gestione
type: concept
scope: both
tags: [nis2, governance, art-20, art-23, responsabilita]
sources: ["[[sources/Direttiva (UE) 2022-2555 (NIS2)]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/Guida lettura specifiche di base]]", "[[sources/FAQ NIS - Ruoli e procedure]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]"]
aliases: [Responsabilità del board, Governance NIS2, Management body responsibility]
---

## Definizione

Principio cardine della NIS2 secondo cui gli **organi di amministrazione** (CdA) e gli **organi direttivi** (top management) dei [[concepts/Soggetti essenziali e importanti|soggetti essenziali e importanti]] sono **personalmente responsabili** dell'attuazione delle [[concepts/Misure di gestione del rischio cyber|misure di gestione del rischio cyber]] e del rispetto degli obblighi NIS2.

Base giuridica:
- **NIS2 Articolo 20** ("Governance").
- **D.Lgs. 138/2024 Articolo 23** ("Organi di amministrazione e direttivi").

## Contenuto degli obblighi

L'Art. 23 D.Lgs. 138/2024 declina **quattro obblighi specifici**:

1. **Approvazione**: gli organi di amministrazione e direttivi **approvano** le modalità di implementazione delle misure di gestione del rischio cyber.
2. **Supervisione**: **vigilano** sull'attuazione delle misure approvate.
3. **Responsabilità**: **rispondono delle violazioni** del decreto da parte del soggetto.
4. **Formazione**: seguono **formazione periodica** in materia di cybersicurezza, sufficiente a comprendere i rischi e a valutare le misure di gestione; assicurano che il personale del soggetto riceva analoga formazione.

## Implicazioni concrete

- **Documentazione obbligatoria**: l'approvazione delle misure deve risultare da deliberazione formale del CdA (verbale). La supervisione richiede reporting periodico.
- **Sanzioni personali**: l'[[concepts/Sanzioni NIS2|Art. 38]] prevede tra le misure non pecuniarie il **divieto temporaneo di esercizio** di funzioni dirigenziali per le persone responsabili delle violazioni.
- **Formazione**: deve essere **sostanziale**, non meramente formale. Documentabile e periodica.
- **Estensione al personale**: l'organo di amministrazione assicura che la formazione equivalente sia erogata al personale; la non-conformità del personale può configurare violazione attribuibile all'organo.

## Gli 11 documenti che richiedono approvazione del board

L'**Appendice C** della [[sources/Guida lettura specifiche di base|guida alla lettura specifiche di base]] elenca i documenti che le misure di sicurezza di base richiedono di **approvare formalmente** da parte degli organi di amministrazione e direttivi. È la **traduzione operativa** della responsabilità di approvazione/supervisione dell'art. 23:

| # | Documento | Requisito |
|---|---|---|
| 1 | Organizzazione per la sicurezza informatica | `GV.RR-02` p.1 |
| 2 | Politiche di sicurezza informatica | `GV.PO-01` p.3 |
| 3 | Valutazione del rischio | `ID.RA-05` p.3 |
| 4 | Piano di trattamento del rischio | `ID.RA-06` p.3 |
| 5 | Piano di gestione delle vulnerabilità | `ID.RA-08` p.4 |
| 6 | Piano di adeguamento | `ID.IM-01` p.1 |
| 7 | Piano di continuità operativa | `ID.IM-04` p.4 |
| 8 | Piano di ripristino in caso di disastro | `ID.IM-04` p.4 |
| 9 | Piano di gestione delle crisi | `ID.IM-04` p.4 |
| 10 | Piano di formazione | `PR.AT-01` p.2 |
| 11 | Piano per la gestione degli incidenti di sicurezza informatica | `RS.MA-01` p.2 |

Cfr. [[concepts/Evidenze documentali NIS]] per la tipizzazione completa dei documenti richiesti dalle misure.

## Sviluppo

- **NIS1**: non aveva una disposizione esplicitamente analoga sulla responsabilità del board. Il riconoscimento esplicito è una **novità di NIS2**, ispirata anche da DORA per il settore finanziario.
- **Allineamento UE**: simili obblighi di accountability del board sono presenti in DORA (settore finanziario), GDPR (su scala diversa) e Cyber Resilience Act.

## Tensioni interpretative

- **Governance societaria non standard — chiarita dalle FAQ ACN.** La definizione operativa di "organi di amministrazione e direttivi" è data dall'art. 1 c. 1 lett. e della Det. ACN 379887/2025 (oggi sostituita dalla [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|Det. ACN 127437/2026]]) e ripresa dalla FAQ `ODA.1` di [[sources/FAQ NIS - Ruoli e procedure]]: si intendono gli organi che detengono il potere di direzione, **incluso il CDA ove presente**. Le FAQ declinano i casi:
    - `ODA.4` — CDA monocratico → la persona fisica che lo ricopre; assenza di CDA → organo che svolge analoghe funzioni.
    - `ODA.5` — dove il CDA non svolge funzioni di direzione/indirizzo/coordinamento, individuare via legge istitutiva e statuto l'organo analogo; **il rappresentante legale è sempre tra i componenti**.
    - `ODA.8`-`ODA.9` — la delega interna è ammessa, ma la responsabilità ex art. 23 **non è delegabile**; per le società restano fermi gli artt. 2381 e 2392 c.c.
- **PA centrali — tensione aperta.** Per le PA centrali il concetto di "organo di amministrazione" si traduce in vertice politico-amministrativo; non è chiarito ad hoc chi sia responsabile (Ministro, Capo Dipartimento, dirigente apicale). Il criterio generale di `ODA.5` ("organo che svolge analoghe funzioni di direzione, indirizzo e coordinamento") è applicabile per analogia, ma manca una specificità per le PA centrali nelle FAQ ACN vigenti.

## Collegamenti

- [[concepts/Misure di gestione del rischio cyber]] — oggetto dell'approvazione/supervisione
- [[concepts/Misure di sicurezza di base]] — specifiche di base le cui evidenze includono gli 11 documenti del board
- [[concepts/Evidenze documentali NIS]] — il layer documentale complessivo
- [[concepts/Sanzioni NIS2]] — comprese le misure personali contro i dirigenti
- [[concepts/NIS2]]
