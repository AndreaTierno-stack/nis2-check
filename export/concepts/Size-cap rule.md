---
title: Size-cap rule
type: concept
scope: both
tags: [nis2, soglia, dimensione, ambito, classificazione]
sources: ["[[sources/Direttiva (UE) 2022-2555 (NIS2)]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]"]
aliases: [Regola dimensionale, Soglia dimensionale NIS2]
---

## Definizione

Criterio **dimensionale** che la NIS2 utilizza per stabilire automaticamente quali soggetti, all'interno dei settori coperti, ricadono nell'ambito di applicazione e con quale qualifica ([[concepts/Soggetti essenziali e importanti|essenziali o importanti]]). Si fonda sulla classificazione UE di **micro/piccole/medie/grandi imprese** (Raccomandazione 2003/361/CE, richiamata dalla NIS2):

- **Micro / piccole**: <50 dipendenti **e** fatturato/bilancio ≤ 10 M€ → **escluse** in via generale.
- **Medie**: 50-250 dipendenti **o** fatturato 10-50 M€ → di regola **soggetti importanti**.
- **Grandi**: >250 dipendenti **o** fatturato/bilancio >50 M€ → di regola **soggetti essenziali** (se in settore "altamente critico" Allegato I).

Le **eccezioni alla soglia** (soggetti che rientrano a prescindere dalla dimensione) sono elencate nella direttiva e nel decreto: PA centrali, prestatori di servizi fiduciari qualificati, fornitori di reti pubbliche di comunicazioni elettroniche e di servizi di comunicazione elettronica accessibili al pubblico, fornitori di DNS, registri TLD, soggetti **unici** in uno Stato, soggetti **critici** identificati a livello nazionale.

## Sviluppo

- **NIS1**: nessuna size-cap automatica; identificazione caso per caso. Risultato: enorme variabilità tra Stati membri sull'identificazione, distorsioni di mercato.
- **NIS2 (Considerando 14)**: la size-cap rule è introdotta proprio per **eliminare la divergenza** e garantire un terreno omogeneo.
- **Recepimento italiano**: il [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024 Art. 6]] applica direttamente la regola.

## Implicazioni

- **PMI escluse di default**: le micro e piccole imprese **non rientrano** salvo eccezione tassativa.
- **Effetto dimensione**: il passaggio da media a grande, anche solo per crescita di fatturato, può **promuovere** un soggetto da importante a essenziale → vigilanza ex ante e tetto sanzionatorio più alto.
- **Multi-localizzazione**: il calcolo della dimensione si fa a **livello di gruppo** o di **soggetto giuridico** secondo i criteri della Raccomandazione UE.

## Posizioni a confronto

- L'**efficacia armonizzante** è confermata dalla [[sources/Direttiva (UE) 2022-2555 (NIS2)]]; tuttavia, gli Stati possono aggiungere identificazioni sotto-soglia (Art. 2(2)), introducendo un margine di asimmetria controllata.

## Collegamenti

- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Identificazione dei soggetti NIS]]
- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Settori altamente critici e critici]]
