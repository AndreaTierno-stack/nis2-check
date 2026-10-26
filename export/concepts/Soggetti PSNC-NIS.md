---
title: Soggetti PSNC-NIS
type: concept
scope: both
tags: [nis2, italia, perimetro-cyber, psnc, dl-105-2019, doppia-disciplina]
sources: ["[[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]", "[[sources/Determinazione ACN categorizzazione - 2026-04-13]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]"]
aliases: [Soggetti perimetro NIS, Doppia disciplina NIS-PSNC]
---

## Definizione

Soggetti che rientrano contemporaneamente:

- nel **perimetro di sicurezza nazionale cibernetica (PSNC)**, ai sensi dell'**art. 1 c. 2-bis del D.L. 21 settembre 2019, n. 105** (convertito dalla L. 18 novembre 2019, n. 133); **e**
- nell'ambito di applicazione del **decreto NIS** (D.Lgs. 138/2024).

Definizione formalizzata dall'art. 1 c. 1 lett. o) della [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|Det. ACN n. 379907]].

## Sistemi informativi e di rete PSNC

Sono i sistemi informativi e di rete inseriti nell'**elenco di cui all'art. 1 c. 2 lett. b)** del D.L. 105/2019 — sistemi e servizi indispensabili per **funzioni essenziali dello Stato** o **servizi essenziali per gli interessi dello Stato**, la cui interruzione comprometterebbe la sicurezza nazionale.

## Coordinamento NIS-PSNC

### Categorizzazione: impatto alto automatico

Per le **attività e servizi soggetti agli obblighi PSNC**, l'art. 5 della [[sources/Determinazione ACN categorizzazione - 2026-04-13|Det. categorizzazione]] dispone che:
- è **automaticamente attribuita la categoria di rilevanza "impatto alto"**;
- tali servizi **non sono oggetto** del procedimento ordinario di categorizzazione (art. 3 della determinazione).

### Misure di sicurezza

Restano applicabili le specifiche regole tecniche del PSNC, lex specialis sui sistemi PSNC. *Inferenza:* l'effetto pratico è che il soggetto a doppia disciplina segue le misure PSNC sui sistemi PSNC e le [[concepts/Misure di sicurezza di base|misure di sicurezza di base NIS]] sui restanti sistemi NIS-rilevanti.

## Funzione regolatoria

- Evita **duplicazioni** tra due regimi che si sovrappongono parzialmente.
- Garantisce comunque che la **sicurezza dei sistemi più critici** (perimetro nazionale) non sia indebolita dall'arrivo di NIS2.
- *Sintesi dell'agente:* la doppia disciplina è gestita come **stratificazione "verticale"**: PSNC è il regime più stringente per i sistemi più critici, NIS2 è il regime ordinario; nell'overlap prevalgono le regole PSNC sui sistemi PSNC.

## Collegamenti

- [[D.L. 105-2019 (perimetro)]]
- [[concepts/Categorizzazione dei soggetti]]
- [[concepts/Categorie di rilevanza]]
- [[concepts/Clausola di salvaguardia]]
- [[concepts/Specifiche tecniche di base]]
- [[synthesis/Stratificazione delle norme cybersecurity in Italia]] — quadro complessivo che inquadra la doppia disciplina PSNC ∩ NIS2 negli altri regimi (DORA, Cloud PA, L. 90/2024)

## Note dell'agente

- Il rapporto NIS2/PSNC è un punto critico del modello italiano: il **perimetro** copre poche centinaia di soggetti core (banche centrali, energia critica, telco strategici, AISE/AISI in alcune funzioni…), il NIS2 copre migliaia di soggetti. La determinazione 379907/2025 e quella di categorizzazione 2026 sono i primi atti che disciplinano espressamente l'interfaccia tra i due regimi.
