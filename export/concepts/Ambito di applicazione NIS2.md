---
title: Ambito di applicazione NIS2
type: concept
scope: both
tags: [nis2, ambito, settori, soggetti, art-3]
sources: ["[[sources/Direttiva (UE) 2022-2555 (NIS2)]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]"]
aliases: [Ambito NIS2, Scope NIS2, Perimetro NIS2]
updated: 2026-10-28
---

## Definizione

Insieme dei **soggetti** che, per **settore di attività** e **dimensione**, ricadono sotto gli obblighi del [[concepts/NIS2|regime NIS2]]. Si determina come intersezione di tre vettori:

1. **Settore di appartenenza** — uno dei [[concepts/Settori altamente critici e critici|18 settori]] degli Allegati I-IV.
2. **Dimensione del soggetto** — applicando la [[concepts/Size-cap rule|size-cap rule]].
3. **Categorie speciali** — soggetti che rientrano **a prescindere dalla dimensione**: per legge, le tipologie dell'art. 3 c. 5 [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]] (soggetti critici ex D.Lgs. 134/2024, reti e servizi di comunicazione elettronica, prestatori di servizi fiduciari, registri TLD e fornitori DNS, registrar), la PA dell'Allegato III lett. a)-d) (c. 6) e le imprese collegate (c. 10); per individuazione dell'ACN, l'Allegato IV (c. 8) e i soggetti che soddisfano i criteri del c. 9 (es. unico fornitore nazionale). Elenco completo nella sezione seguente.

In Italia disciplinato dal [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024 Art. 3]].

## Sviluppo

- **Espansione rispetto a NIS1**: passaggio da ~7 settori a 18 settori (11 altamente critici + 7 critici).
- **Inclusione esplicita della PA**: novità rilevante. Due livelli:
  - *Direttiva* ([[sources/Direttiva (UE) 2022-2555 (NIS2)]], art. 2 par. 2 lett. f) e par. 5 lett. a)): enti dell'amministrazione centrale "quale definito da uno Stato membro conformemente al diritto nazionale" (punto i), essenziali ex art. 3 par. 1 lett. d)); enti a livello regionale che, "a seguito di una valutazione basata sul rischio", forniscono servizi la cui perturbazione potrebbe avere un impatto significativo su attività sociali o economiche critiche (punto ii); enti a livello locale solo se lo Stato membro lo prevede (par. 5 lett. a)).
  - *Decreto* ([[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]], art. 3 c. 6): tutte le PA dell'Allegato III lett. a)-d) per legge, a prescindere dalla dimensione, comprese le amministrazioni regionali della lett. b) senza valutazione del rischio e le amministrazioni locali della lett. c).
- **Inclusione di nuovi attori**: fornitori di servizi gestiti (MSP/MSSP), data center, CDN, fornitori di servizi cloud, motori di ricerca, mercati online, social network, gestione rifiuti, alimentare, manifattura ad alta intensità tecnologica, spazio.
- **Esclusioni**: difesa, sicurezza nazionale, ordine pubblico, attività giudiziaria, parlamenti, banche centrali (specifiche eccezioni in Art. 2 NIS2 / Art. 4 D.Lgs. 138).

## Soggetti che rientrano a prescindere dalla dimensione

Lista dal D.Lgs. 138/2024, art. 3 (testo dei commi nel [[sources/D.Lgs. 138-2024 (Decreto NIS)|nodo D.Lgs. 138/2024]]):
- **Per legge**:
  - soggetti critici ex D.Lgs. 134/2024 (c. 5 lett. a)), essenziali (art. 6 c. 1 lett. b));
  - fornitori di reti pubbliche di comunicazione elettronica o di servizi di comunicazione elettronica accessibili al pubblico (c. 5 lett. b));
  - prestatori di servizi fiduciari (c. 5 lett. c)), essenziali se qualificati (art. 6 c. 1 lett. d));
  - gestori di registri dei nomi di dominio di primo livello e fornitori di servizi DNS (c. 5 lett. d)), essenziali (art. 6 c. 1 lett. d));
  - fornitori di servizi di registrazione dei nomi di dominio (c. 5 lett. e));
  - PA dell'Allegato III lett. a)-d) (c. 6): amministrazioni centrali, regionali, locali e altri soggetti pubblici; elenco delle 15 categorie ed esclusioni dell'art. 4 cc. 2-3 nel [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]]; ulteriori categorie con DPCM (c. 7);
  - imprese collegate a un soggetto essenziale o importante che soddisfano almeno uno dei criteri del c. 10 lett. a)-d).
- **Per individuazione dell'ACN**, su proposta delle autorità di settore (c. 13):
  - tipologie dell'Allegato IV (c. 8);
  - soggetti degli Allegati I-IV che soddisfano almeno uno dei criteri del c. 9: già operatori di servizi essenziali ex D.Lgs. 65/2018 (lett. a)); unico fornitore nazionale di un servizio essenziale (lett. b)); perturbazione con impatto significativo sulla sicurezza pubblica, l'incolumità pubblica o la salute pubblica (lett. c)); rischio sistemico significativo (lett. d)); criticità per importanza a livello nazionale o regionale (lett. e)); elemento sistemico della catena di approvvigionamento (lett. f)).

## Collegamenti

- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Settori altamente critici e critici]]
- [[concepts/Size-cap rule]]
- [[concepts/Identificazione dei soggetti NIS]]
- [[concepts/Clausola di salvaguardia]]
