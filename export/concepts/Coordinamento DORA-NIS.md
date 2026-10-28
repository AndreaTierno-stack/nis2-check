---
title: Coordinamento DORA-NIS
type: concept
scope: both
tags: [nis2, dora, italia, esonero, settore-finanziario]
sources: ["[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/Determinazione ACN funzionamento Tavolo NIS - 2025-07-16]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/FAQ NIS - Ambito]]"]
aliases: [Esonero DORA NIS, Reg UE 2022 2554, Entità finanziarie NIS]
updated: 2026-10-28
---

## Definizione

Disciplina di **coordinamento e di esonero parziale** tra il **Regolamento (UE) 2022/2554 (DORA — Digital Operational Resilience Act)** e il regime NIS italiano, su due livelli distinti:

- **Legge** ([[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]], art. 3 c. 14): ai soggetti essenziali o importanti dei **settori 3 (bancario) e 4 (infrastrutture dei mercati finanziari) dell'Allegato I** non si applicano l'**art. 17** e i **Capi IV e V**; si applica DORA. Il c. 15 esclude dal decreto i soggetti esentati dall'ambito di DORA.
- **Determinazione** ([[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|Det. ACN 127437/2026]]): le "entità finanziarie di cui al Regolamento (UE) 2022/2554 che rientrano nell'ambito di applicazione del decreto NIS" sono **esentate da tre adempimenti di piattaforma** (art. 7 c. 6, art. 16 c. 13, art. 20 c. 6), ferma la possibilità di adesione volontaria. La platea è definita dalla qualifica DORA, non dai settori 3 e 4.

## Esoneri NIS specifici per entità DORA

- **Designazione referente CSIRT** ([[entities/Referente CSIRT]]): art. 7 c. 6 della [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]] — esonero, perché DORA prevede già canali di reporting incidenti ICT verso le ESAs / Banca d'Italia.
- **Aggiornamento annuale: organi di amministrazione e direttivi**: art. 16 c. 13 della medesima determinazione — esonero dalla compilazione del c. 3 lett. b) (elenco componenti organi) e dell'art. 17 (elencazione completa di CF + PEC dei componenti con accettazione su Portale ACN).
- **[[concepts/Categorizzazione dei soggetti|Categorizzazione]] delle attività e dei servizi**: art. 20 c. 6 della medesima determinazione — esonero.

> [!note] Esoneri DORA verificati sul testo ufficiale (DIV-P1 chiusa)
> I commi qui attestati (art. 7 c. 6, art. 16 c. 13 con esonero dal c. 3 lett. b) e dall'art. 17, art. 20 c. 6) sono stati **riconciliati verbatim sul PDF firmato** della Det. ACN 127437/2026 (`raw/articles/detacn_piattaformanis_251218-v9_signed.pdf`, testo integrale). Ogni comma reca la clausola *"È fatta salva l'adesione a tali previsioni su base volontaria"*. La granularità di comma è ora attestata sul testo ufficiale e codificata nel corpus del NIS2 Tool. Divergenza **DIV-P1 CHIUSA**.

## Salvaguardia DORA nel funzionamento del Tavolo NIS

L'art. 3 c. 3 della [[sources/Determinazione ACN funzionamento Tavolo NIS - 2025-07-16]] **fa salve** le attribuzioni e le modalità di coordinamento e di comunicazione con l'esterno rimesse alle **autorità del sistema finanziario, a livello nazionale ed europeo**, in relazione a quanto previsto dal Regolamento (UE) 2022/2554 e dalle relative disposizioni di attuazione.

## Adesione volontaria

In ciascuno degli esoneri sopra elencati la determinazione precisa: *"È fatta salva l'adesione a tali previsioni su base volontaria"*. Un'entità finanziaria può quindi designare comunque un referente CSIRT NIS, partecipare alla categorizzazione, ecc. *Inferenza:* il caso tipico è l'entità finanziaria che rientra in NIS anche per attività di altri settori (es. fornitore di servizi cloud per soggetti non finanziari): l'art. 3 c. 14, riferito ai settori 3 e 4, non dispone esoneri per quelle attività, mentre gli esoneri di piattaforma della determinazione si applicano comunque.

## Funzione regolatoria

- **Evita duplicazioni** tra DORA e NIS sugli stessi adempimenti.
- **Tutela la specialità** della governance del settore finanziario UE.
- **Lascia margini di adesione** per casi misti.

## Collegamenti

- [[entities/Referente CSIRT]]
- [[concepts/Aggiornamento annuale informazioni]]
- [[concepts/Categorizzazione dei soggetti]]
- [[concepts/Clausola di salvaguardia]]
- [[synthesis/Stratificazione delle norme cybersecurity in Italia]] — quadro complessivo del coordinamento DORA con gli altri regimi italiani

## Chiarimento ambito (FAQ Ambito `AMB.NO.2`)

La FAQ [[sources/FAQ NIS - Ambito]] (`AMB.NO.2`) riguarda i soggetti DORA medi o grandi delle tipologie dell'**Allegato I p. 3 (Settore bancario)** e **p. 4 (Infrastrutture dei mercati finanziari, IMF)**. Afferma che a essi si applicano "solamente" le disposizioni sull'obbligo di registrazione (**art. 7 c. 1**) e, nella frase successiva, che l'art. 3 c. 14 disapplica "solo" l'art. 17 e i Capi IV e V. Le due frasi non coincidono: fa testo il c. 14, che lascia applicabili le altre disposizioni del decreto (es. l'aggiornamento annuale dell'art. 7 c. 4); v. nota redazionale in [[sources/FAQ NIS - Ambito]]. La FAQ non tratta gli esoneri di piattaforma (referente CSIRT, organi di amministrazione, categorizzazione): vengono dalla determinazione.

## Note dell'agente

- *Sintesi dell'agente:* il pattern degli esoneri DORA in NIS è un esempio chiaro di **regulatory layering** all'interno del diritto UE: il legislatore nazionale **non ricostruisce** il rapporto tra atti UE, ma lo **recepisce** mantenendo la specialità di DORA. La piattaforma ACN tecnicamente "sa" se un soggetto è entità finanziaria DORA e disabilita gli adempimenti pertinenti.
- L'esonero è **non totale**. Per i soggetti dei settori 3 e 4 restano la registrazione e l'aggiornamento annuale dell'art. 7, con un [[entities/Punto di contatto NIS|punto di contatto]]; misure di gestione del rischio e notifica degli incidenti (Capo IV) non si applicano per legge (art. 3 c. 14), quindi nemmeno le [[concepts/Misure di sicurezza di base|misure di sicurezza di base]] della Det. 379907/2025. *Inferenza:* per un'entità finanziaria che rientra in NIS anche per attività di altri settori, il Capo IV resta applicabile a quelle attività.
