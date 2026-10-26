---
title: Piattaforma digitale ACN
type: concept
scope: both
tags: [italia, acn, registrazione, notifica, piattaforma]
sources: ["[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/La normativa NIS - Pagina ACN]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/Determinazione ACN accordi condivisione - 2025-04-10]]"]
aliases: [Portale NIS ACN, Piattaforma NIS, Piattaforma ACN]
---

## Definizione

Portale telematico gestito da [[entities/ACN]] che costituisce il **canale unico** di interazione tra i soggetti rientranti e l'autorità per gli adempimenti NIS2:

- **[[concepts/Identificazione dei soggetti NIS|Registrazione annuale]]** (Art. 7 D.Lgs. 138/2024).
- **[[concepts/Notifica di incidente significativo|Notifica di incidenti significativi]]** (Art. 25).
- **Comunicazioni di vigilanza** (Capi V).
- **Aggiornamento dati** del soggetto.
- **Ricezione di comunicazioni** ufficiali da ACN (classificazione, ordini, diffide).

## Funzioni

- **Identità digitale**: accesso tramite SPID / CIE / token PA.
- **Form strutturati** per la registrazione (settore, dimensione, servizi erogati, contatti del responsabile NIS).
- **Form scaglionati** per la notifica incidenti (pre-notifica 24h, notifica 72h, relazione finale 1 mese).
- **Notifiche di servizio** ai soggetti.
- **[[concepts/Categorizzazione dei soggetti|Categorizzazione]]** annuale (10 macro-aree + 4 categorie di rilevanza).
- **[[concepts/Aggiornamento annuale informazioni|Aggiornamento annuale]]** (15 aprile – 31 maggio) e **[[concepts/Aggiornamento continuo informazioni|aggiornamento continuo]]** (entro 14gg dalla modifica).
- **Notifica accordi di condivisione informazioni** ([[concepts/Accordi di condivisione delle informazioni]]) ex [[sources/Determinazione ACN accordi condivisione - 2025-04-10]].
- **Repository documentale** di [[concepts/Specifiche tecniche di base|specifiche tecniche]] e [[concepts/NIS2|atti regolatori]].

## Ruoli operativi sulla piattaforma

Disciplinati dalla [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|det. piattaforma e procedure]]:

- **[[entities/Punto di contatto NIS|Punto di contatto]]** (art. 4) — owner amministrativo, accetta su Portale ACN.
- **Sostituto del punto di contatto** (art. 5) — designato entro 31 maggio.
- **Segreteria del punto di contatto** (art. 6) — supporto operativo.
- **Operatori del soggetto** (art. 8) — utenti tecnici sulla piattaforma.
- **[[entities/Referente CSIRT|Referente CSIRT]] e sostituti** (art. 7) — owner della notifica incidenti, designati entro 31 dicembre. Le entità DORA possono esonerarsi (cfr. [[concepts/Coordinamento DORA-NIS]]).
- **[[entities/Rappresentante NIS in Italia|Rappresentante NIS]]** (art. 9) — solo per soggetti extra-UE, finestra 1 set – 30 nov.

## Tempistiche

- **Apertura della finestra di registrazione**: 1° gennaio – 28 febbraio di ogni anno.
- **Operatività della funzione di notifica**: continua, 24/7.
- Per il calendario completo: [[concepts/Identificazione dei soggetti NIS#Calendario annuale completo (post-registrazione)]].

## Verifiche

- **[[concepts/Verifiche di coerenza]]** (art. 14 det. piattaforma): 30 + 20 giorni, no silenzio-assenso, sui dati comunicati.
- **[[concepts/Verifiche di conformità categorizzazione]]** (art. 21 det. piattaforma + art. 30 c.3 D.Lgs. 138/2024): 90 + 60 giorni, **silenzio-assenso**.

## Posizione nell'architettura

- **Single point of entry** per tutti gli adempimenti NIS in Italia.
- Coerente con la concentrazione dei ruoli in ACN: un'unica piattaforma per tutti i settori.
- Sostituisce, per i soggetti già rientranti in NIS1, gli eventuali canali precedenti.

## Collegamenti

- [[concepts/Identificazione dei soggetti NIS]]
- [[concepts/Notifica di incidente significativo]]
- [[concepts/Categorizzazione dei soggetti]]
- [[concepts/Aggiornamento annuale informazioni]]
- [[concepts/Aggiornamento continuo informazioni]]
- [[concepts/Accordi di condivisione delle informazioni]]
- [[concepts/Verifiche di coerenza]]
- [[concepts/Verifiche di conformità categorizzazione]]
- [[entities/Punto di contatto NIS]], [[entities/Referente CSIRT]], [[entities/Rappresentante NIS in Italia]]
- [[entities/ACN]]
- [[entities/CSIRT Italia]] — destinatario tecnico delle notifiche
