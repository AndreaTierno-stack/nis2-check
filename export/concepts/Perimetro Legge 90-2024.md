---
title: Perimetro Legge 90-2024
type: concept
scope: both
tags: [italia, l90-2024, perimetro, ambito-soggettivo, pa, art-1]
sources: ["[[sources/Legge 90-2024 (cybersicurezza nazionale)]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]"]
aliases: [Ambito soggettivo L. 90, Soggetti L. 90, Platea L. 90]
updated: 2026-10-27
---

## Definizione

Insieme **tassativo** dei soggetti pubblici e a controllo pubblico cui si applicano gli obblighi del Capo I della **L. 28 giugno 2024 n. 90** (notifica incidenti, struttura interna cyber, referente, segnalazioni vulnerabilità). L'art. 1 c. 1 della legge elenca le tipologie incluse; l'art. 1 c. 7 elenca le esclusioni.

A differenza dell'[[concepts/Ambito di applicazione NIS2|ambito NIS2]] (settoriale + size-cap), il perimetro L. 90 è **chiuso**: si appartiene o non si appartiene, senza criteri dimensionali o settoriali aggiuntivi.

## Tipologie incluse (art. 1 c. 1)

| # | Tipologia | Fonte di identificazione |
|---|---|---|
| 1 | Pubbliche amministrazioni centrali | Elenco ISTAT ex L. 196/2009 art. 1 c. 3 (Lista S13) |
| 2 | Regioni | Costituzionale + L. 196/2009 |
| 3 | Province autonome di Trento e Bolzano | Costituzionale |
| 4 | Città metropolitane | L. 56/2014 |
| 5 | Comuni con popolazione > 100.000 abitanti | Dati ISTAT |
| 6 | Comuni capoluogo di regione (anche se sotto soglia 100k) | Costituzionale/legge regionale |
| 7 | Società di trasporto pubblico urbano con bacino utenza ≥ 100.000 abitanti | Affidamento servizio |
| 8 | Società di trasporto pubblico extraurbano operanti nell'ambito delle città metropolitane | Affidamento servizio |
| 9 | Aziende sanitarie locali (ASL) | SSN |
| 10 | **Società in house** dei soggetti 1-9, **solo se forniscono**: (a) servizi informatici, (b) servizi di trasporto delle tipologie 7-8, (c) raccolta/smaltimento/trattamento acque reflue (Dir. 91/271/CEE artt. 2 punti 1-3), (d) gestione rifiuti (Dir. 2008/98/CE art. 3 punto 9) | D.Lgs. 175/2016 + qualifica di servizio |

> [!note] Vincolo "in house qualificate"
> Le società in house entrano nel perimetro L. 90 **solo se** forniscono una delle 4 categorie di servizi tassative. Una società in house che eroghi *servizi diversi* (es. gestione cimiteri, servizi cimiteriali, ristorazione scolastica) **non** rientra.

## Esclusioni (art. 1 c. 7)

| # | Esclusione | Riferimento | Ratio |
|---|---|---|---|
| a.1 | Soggetti dell'art. 3 c. 1 lett. g) e i) **D.Lgs. 65/2018** → ora **D.Lgs. 138/2024** via [[sources/Legge 90-2024 (cybersicurezza nazionale)\|art. 15-bis L. 90]] | NIS1 → NIS2 | Regime NIS è *lex specialis*, no doppia regolazione |
| a.2 | Soggetti dell'art. 1 c. 2-bis **DL 105/2019** ([[concepts/Soggetti PSNC-NIS\|PSNC]]) | PSNC | Regime perimetro è *lex specialis* sui sistemi essenziali Stato |
| b.1 | Organi dello Stato preposti a prevenzione/accertamento/repressione reati | Ordine pubblico | Regimi propri (forze ordine, magistratura) |
| b.2 | Organi di tutela dell'ordine e sicurezza pubblica | Ordine pubblico | Idem |
| b.3 | Organi di difesa e sicurezza militare dello Stato | Difesa nazionale | Idem |
| b.4 | Organismi di informazione per la sicurezza (DIS, AISE, AISI) | L. 124/2007 artt. 4, 6, 7 | Intelligence — regime di classifica |

> [!warning] Effetto pratico delle esclusioni
> Una **PA centrale che sia anche soggetto NIS** (es. Ministero della Salute = All. III a) D.Lgs. 138) **non applica la L. 90** (esclusa ex art. 1 c. 7 lett. a), ma applica direttamente NIS2. Quindi il perimetro L. 90 nella pratica si riduce ai soggetti pubblici che **non sono anche NIS** — situazione frequente per comuni medi, alcune società in house, parte delle aziende di trasporto. Cfr. [[synthesis/Coordinamento L. 90-2024 e NIS2]] per i casi di sovrapposizione.

## Sovrapposizione vs Allegato III D.Lgs. 138 (NIS PA)

Il perimetro L. 90 è **simile ma non coincidente** con l'Allegato III del decreto NIS:

| Soggetto | All. III NIS | Perimetro L. 90 | Esito netto (post-art. 15-bis) |
|---|---|---|---|
| PA centrale (Ministero) | Sì (cat. a) | Sì (art. 1 c. 1) | Solo NIS (esclusione L. 90 ex c. 7) |
| Regione/Provincia autonoma | Sì (cat. b) | Sì | Solo NIS |
| Città metropolitana | Sì (cat. c) | Sì | Solo NIS |
| Comune capoluogo regione | Sì (cat. c) | Sì | Solo NIS |
| Comune > 100k non capoluogo | Sì (cat. c) | Sì | Solo NIS |
| **Comune 50-100k non capoluogo** | **No** | **No** | **Fuori da entrambi** (salvo Allegato IV) |
| ASL | Sì (cat. c) + All. I p. 5 | Sì | Solo NIS (doppia All. III + All. I p. 5) |
| Società in house servizi informatici | Solo via All. IV (notifica) | Sì | L. 90 (NIS solo dopo individuazione All. IV) |
| Società di trasporto pubblico locale qualificata | Solo via All. IV tipo 1 (notifica) | Sì | L. 90 (NIS solo dopo individuazione) |
| Società in house gestione rifiuti | All. II p. 2 se prevalenza | Sì | Possibile cumulo se prevalenza rifiuti |
| Società in house acque reflue | All. I p. 7 se prevalenza | Sì | Possibile cumulo se prevalenza acque reflue |

**Sintesi**: la L. 90 copre il **gap delle società in house qualificate** e dei **trasporti pubblici qualificati** che nel NIS rientrano solo via Allegato IV (procedura di individuazione autoritativa). Per i soggetti già pienamente NIS, la L. 90 si disapplica.

## Phase-in differito (art. 1 c. 3)

| Soggetto | Decorrenza obblighi cc. 1-2 |
|---|---|
| PA centrali, Regioni, Province autonome, Città metropolitane | Immediata (dall'entrata in vigore della legge: 17/07/2024) |
| Comuni > 100k + capoluogo, società di trasporto, ASL, società in house | **180° giorno** dall'entrata in vigore = **14/01/2025** |

## Funzione

- **Chiude il gap** lasciato da NIS2 sul settore pubblico: l'All. III NIS copre le PA delle lett. a)-d) (centrali, regionali, locali, altri soggetti pubblici; elenco nel [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]]), ma esclude le **società in house** e i **trasporti pubblici locali** (che entrano in NIS solo via individuazione All. IV, procedura lenta).
- **Anticipa NIS2** per i soggetti pubblici dove l'identificazione NIS2 richiede tempo (notifica All. IV).
- **Estende il principio del referente cyber** (art. 8) anche oltre l'ambito strettamente NIS.

## Collegamenti

- [[sources/Legge 90-2024 (cybersicurezza nazionale)]] — fonte primaria
- [[concepts/Ambito di applicazione NIS2]] — confronto strutturale
- [[concepts/Soggetti PSNC-NIS]] — esclusione L. 90 art. 1 c. 7 lett. a)
- [[concepts/Referente per la cybersicurezza (L. 90-2024)]] — obbligo di nomina ex art. 8 c. 2 per i soggetti del perimetro
- [[synthesis/Coordinamento L. 90-2024 e NIS2]] — risoluzione delle sovrapposizioni
- [[synthesis/Stratificazione delle norme cybersecurity in Italia]] — quadro a 5 regimi

## Note dell'agente

- **Tassatività**: il perimetro L. 90 è un **elenco chiuso**, non un criterio. Differenza strutturale rispetto a NIS2 (settori + dimensione = criterio). Conseguenza pratica: l'autovalutazione di rientro è banale (sei o non sei in elenco), mentre per NIS è complessa.
- **Doppia identità soggetti misti**: ASL = All. III NIS + All. I p. 5 NIS + perimetro L. 90 (in astratto); l'art. 1 c. 7 lett. a) L. 90 risolve a favore del solo NIS. La triplice doppia identità diventa **NIS pieno** dopo l'art. 15-bis.
- **Società in house = il vero apporto della L. 90**: il legislatore ha voluto coprire le "ramificazioni" digitali della PA che NIS2 non prende automaticamente. La definizione restrittiva ("solo se forniscono servizi informatici/trasporto/acque/rifiuti") evita un'estensione indiscriminata.
- *Inferenza*: i comuni *50-100k* non capoluogo restano un buco del sistema italiano — fuori L. 90, fuori NIS All. III, possibili solo via Allegato IV NIS su proposta delle autorità di settore. È una categoria politicamente sensibile (centinaia di comuni) che potrebbe entrare in scope con future modifiche.
