---
title: Size-cap rule
type: concept
scope: both
tags: [nis2, soglia, dimensione, ambito, classificazione]
sources: ["[[sources/Direttiva (UE) 2022-2555 (NIS2)]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/FAQ NIS - Ambito]]"]
aliases: [Regola dimensionale, Soglia dimensionale NIS2]
updated: 2026-10-28
---

## Definizione

Criterio **dimensionale** che la NIS2 utilizza per stabilire automaticamente quali soggetti, all'interno dei settori coperti, ricadono nell'ambito di applicazione e con quale qualifica ([[concepts/Soggetti essenziali e importanti|essenziali o importanti]]). Si fonda sulla classificazione UE di **micro/piccole/medie/grandi imprese** (Raccomandazione 2003/361/CE, richiamata dalla [[sources/Direttiva (UE) 2022-2555 (NIS2)]]; soglie e regole come riportate da [[sources/FAQ NIS - Ambito]] `AMB.DI.1`):

| Categoria | Effettivi | Fatturato annuo | Bilancio annuo |
|---|---|---|---|
| Microimpresa | <10 | ≤ 2 M€ | ≤ 2 M€ |
| Piccola impresa | <50 | ≤ 10 M€ | ≤ 10 M€ |
| Media impresa | <250 | ≤ 50 M€ | ≤ 43 M€ |

**Regola di appartenenza** (`AMB.DI.1`): per stare in una categoria servono **sempre** il criterio degli effettivi **e** almeno uno tra fatturato e bilancio (parametri contabili alternativi). **Regola di salita** (`AMB.DI.1`): se il criterio degli effettivi è superato, **oppure** se entrambi i parametri contabili sono superati, si sale alla categoria superiore (o si entra tra le grandi imprese).

- **Micro / piccole**: <50 effettivi **e** almeno uno tra fatturato ≤ 10 M€ e bilancio ≤ 10 M€ → **escluse** in via generale.
- **Medie**: non piccole (≥50 effettivi, **oppure** fatturato e bilancio entrambi >10 M€), con <250 effettivi **e** almeno uno tra fatturato ≤ 50 M€ e bilancio ≤ 43 M€ → di regola **soggetti importanti**.
- **Grandi**: ≥250 effettivi, **oppure** fatturato >50 M€ **e** bilancio >43 M€ → di regola **soggetti essenziali** (se in settore "altamente critico" Allegato I).

Le **eccezioni alla soglia** (soggetti che rientrano a prescindere dalla dimensione) sono elencate nella direttiva e nel decreto. Nel [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]], art. 3: per legge, soggetti critici ex D.Lgs. 134/2024 (c. 5 lett. a)), fornitori di reti pubbliche di comunicazione elettronica e di servizi di comunicazione elettronica accessibili al pubblico (lett. b)), prestatori di servizi fiduciari (lett. c)), registri TLD e fornitori di servizi DNS (lett. d)), fornitori di servizi di registrazione dei nomi di dominio (lett. e)), PA dell'Allegato III lett. a)-d) (c. 6), imprese collegate a un soggetto essenziale o importante (c. 10); per individuazione dell'ACN, tipologie dell'Allegato IV (c. 8) e soggetti che soddisfano i criteri del c. 9, tra cui il fornitore **unico** nazionale di un servizio essenziale (lett. b)) e il soggetto **critico** per la sua importanza a livello nazionale o regionale (lett. e)).

## Sviluppo

- **NIS1**: nessuna size-cap automatica; identificazione caso per caso. Risultato: enorme variabilità tra Stati membri sull'identificazione, distorsioni di mercato.
- **NIS2 (Considerando 14)**: la size-cap rule è introdotta proprio per **eliminare la divergenza** e garantire un terreno omogeneo.
- **Recepimento italiano**: il [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024 Art. 6]] applica direttamente la regola.

## Implicazioni

- **PMI escluse di default**: le micro e piccole imprese **non rientrano** salvo eccezione tassativa.
- **Effetto dimensione**: il passaggio da media a grande (≥250 effettivi, **oppure** fatturato e bilancio entrambi oltre soglia, >50 M€ e >43 M€ — regola di salita `AMB.DI.1`) può **promuovere** un soggetto da importante a essenziale → vigilanza ex ante e tetto sanzionatorio più alto.
- **Multi-localizzazione**: il calcolo della dimensione si fa a **livello di gruppo** o di **soggetto giuridico** secondo i criteri della Raccomandazione UE.

## Posizioni a confronto

- L'**efficacia armonizzante** è confermata dalla [[sources/Direttiva (UE) 2022-2555 (NIS2)]]; tuttavia, gli Stati possono aggiungere identificazioni sotto-soglia (Art. 2(2)), introducendo un margine di asimmetria controllata.

## Collegamenti

- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Identificazione dei soggetti NIS]]
- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Settori altamente critici e critici]]
