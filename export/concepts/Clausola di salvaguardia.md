---
title: Clausola di salvaguardia
type: concept
scope: both
tags: [nis2, italia, sicurezza-nazionale, eccezioni]
sources: ["[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/Direttiva (UE) 2022-2555 (NIS2)]]", "[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/Determinazione ACN funzionamento Tavolo NIS - 2025-07-16]]", "[[sources/FAQ NIS - Ambito]]"]
aliases: [Eccezione sicurezza nazionale, Clausola di esclusione]
---

## Definizione

Disposizione che consente di **derogare** all'applicazione del regime NIS2 (in tutto o in parte) per ragioni superiori di **sicurezza nazionale**, **difesa**, **ordine pubblico**, **attività giudiziaria** o **funzionamento di organi costituzionali**.

Base giuridica:
- **NIS2 Art. 2(7)-(8)**: esclusioni di principio (difesa, sicurezza nazionale, attività giudiziaria, parlamenti, banche centrali per certe attività).
- **D.Lgs. 138/2024**: recepimento delle esclusioni e introduzione di **clausole nazionali** che permettono ad ACN, in casi di sicurezza nazionale, di **modulare** gli obblighi (es. anonimizzare dati nelle notifiche, sospendere temporaneamente certe pubblicazioni).

> [!warning] Due "clausole di salvaguardia" da non confondere
> Sotto la stessa etichetta "clausola di salvaguardia" convivono **due istituti distinti**. Questo nodo tratta principalmente l'**esclusione per sicurezza nazionale** (NIS2 art. 2(7)-(8)); da essa va tenuta separata la **clausola di salvaguardia dimensionale** (deroga al consolidamento dimensionale di gruppo). Il NIS2 Tool usa "clausola di salvaguardia" nel **secondo** senso (dimensionale): nel corpus l'identificatore è `safeguard_dimensional_dpcm_221`, mai la sola parola "salvaguardia".

## Disambiguazione: salvaguardia dimensionale vs esclusione di sicurezza nazionale

| Profilo | Salvaguardia **dimensionale** | Esclusione **sicurezza nazionale** |
|---|---|---|
| Funzione | Derogare al **consolidamento dimensionale di gruppo** (imprese collegate/associate) quando il calcolo è ritenuto sproporzionato | Sottrarre in tutto/in parte il soggetto al regime NIS per **sicurezza nazionale / difesa / ordine pubblico / attività giudiziaria / organi costituzionali** |
| Base giuridica | art. 3 c. 4 [[sources/D.Lgs. 138-2024 (Decreto NIS)]] (**definisce** la deroga: proporzionalità e indipendenza dalle imprese collegate) + art. 3 c. 12 (l'**ACN applica** la deroga del c. 4 secondo i criteri ex art. 40 c. 1) + **DPCM 221/2024** (i criteri, art. 3 c. 1 DPCM) | **NIS2 art. 2(7)-(8)** + esclusioni di recepimento del D.Lgs. 138/2024 |
| Chi decide | ACN d'intesa con le Autorità di settore (concessione discrezionale) | Previsione di legge / atto dell'Autorità competente |
| Codice FAQ | `AMB.GI.2` (richiesta), `AMB.GI.3` (chi non può richiederla) — [[sources/FAQ NIS - Ambito]] | — |
| Procedura piattaforma | art. 12 [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]] | art. 12 (modalità riservate, cfr. sezione sotto) |
| Effetto sull'ambito | Può far **uscire** dall'ambito un soggetto altrimenti "grande" per effetto del consolidamento | Esclusione totale o parziale dagli obblighi |

La salvaguardia **dimensionale** è attestata da [[sources/FAQ NIS - Ambito]]. Struttura dei tre livelli (verificata sul testo del decreto NIS): **art. 3 c. 4** *definisce* la deroga al consolidamento di gruppo (art. 6 par. 2 Racc. 2003/361/CE), applicabile *"salvo che ciò non sia proporzionato, tenuto anche conto dell'indipendenza del soggetto dalle sue imprese collegate in termini di sistemi informativi e di rete"*; **art. 3 c. 12** stabilisce che *"l'Autorità nazionale competente NIS applica la clausola di salvaguardia di cui al comma 4, secondo i criteri per la determinazione individuati con le modalità di cui all'articolo 40, comma 1"* — cioè il **DPCM 221/2024** (del 9 dicembre 2024, GU 10 febbraio 2025; criteri all'art. 3 c. 1 DPCM). La **procedura operativa di richiesta** si presenta sulla piattaforma ai sensi dell'art. 12 della [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|det. piattaforma]] (il cui art. 12 rinvia esplicitamente all'art. 3 c. 12 del decreto NIS). *Sintesi dell'agente:* nel NIS2 Tool questa è la sola "salvaguardia" rilevante per il calcolo del rientro; l'esclusione di sicurezza nazionale non è un percorso di self-assessment.

## Casistiche tipiche

- **Soggetto della Difesa**: opera con regimi propri di sicurezza informatica e classificazione delle informazioni; il [[entities/Ministero della Difesa]] coordina.
- **Apparato di intelligence (DIS, AISE, AISI)**: escluso.
- **Soggetto del perimetro di sicurezza nazionale cibernetica** (D.Lgs. 105/2019): il regime perimetro è **lex specialis** per le funzioni essenziali dello Stato; il rapporto NIS2/perimetro è disciplinato per evitare doppia regolazione.
- **Magistratura, Parlamento, Presidenza della Repubblica**: esclusi per **separazione dei poteri** e **autonomia costituzionale**.

## Effetti

- **Esclusione totale**: il soggetto non rientra nel campo di applicazione NIS2.
- **Esclusione parziale**: alcuni obblighi non si applicano (es. obbligo di notifica pubblica), altri sì.
- **Trattamento riservato delle informazioni**: ACN può segretare dati riguardanti soggetti del perimetro di sicurezza nazionale per evitare divulgazioni dannose per l'interesse nazionale.

## Salvaguardia DORA nel funzionamento del Tavolo NIS

L'art. 3 c. 3 della [[sources/Determinazione ACN funzionamento Tavolo NIS - 2025-07-16|det. funzionamento Tavolo]] **fa salve** le competenze e i canali di coordinamento delle **autorità del sistema finanziario UE/nazionale** in relazione al Reg. (UE) 2022/2554 (DORA). Cfr. [[concepts/Coordinamento DORA-NIS]] per gli esoneri specifici sui singoli adempimenti NIS.

## Salvaguardia su soggetti speciali (det. piattaforma)

L'art. 12 della [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|det. piattaforma e procedure]] disciplina modalità riservate per i soggetti rientranti nelle eccezioni di sicurezza nazionale e difesa, in coerenza con le clausole del decreto NIS.

## Tensioni interpretative

- *Sintesi dell'agente:* il rapporto NIS2 / perimetro / D.Lgs. 65/2018 abrogato non è banale. La pagina [[synthesis/Stratificazione delle norme cybersecurity in Italia]] mappa le intersezioni concrete tra i 5 regimi italiani.

## Collegamenti

- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Soggetti PSNC-NIS]] — doppia disciplina NIS-PSNC
- [[concepts/Coordinamento DORA-NIS]] — esoneri per entità finanziarie
- [[entities/Ministero della Difesa]]
- [[entities/ACN]]
- [[synthesis/Stratificazione delle norme cybersecurity in Italia]]
