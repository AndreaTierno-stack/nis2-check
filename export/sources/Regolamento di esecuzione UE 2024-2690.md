---
title: Regolamento di esecuzione (UE) 2024/2690
type: source
source_type: article
source_path: raw/articles/OJ_L_202402690_IT_TXT.pdf
url: http://data.europa.eu/eli/reg_impl/2024/2690/oj
author: Commissione europea (atto firmato Ursula von der Leyen)
date_published: 2024-10-17
date_ingested: 2026-05-18
updated: 2026-10-28
tags: [nis2, ue, regolamento-esecuzione, direttamente-applicabile, dns, tld, cloud, data-center, cdn, msp, mssp, marketplace, search-engine, social-network, trust-service]
scope: nis2_tool
aliases: [Reg. UE 2024/2690, Reg. esecuzione NIS2 DSP, Implementing Regulation 2024/2690, Reg. UE 2690/2024]
---

## TL;DR

**Regolamento di esecuzione (UE) 2024/2690 della Commissione del 17 ottobre 2024**, pubblicato in GU UE L del 18/10/2024 (codice 2024/2690). Atto **direttamente applicabile** in tutti gli Stati membri (entrata in vigore 7/11/2024, 20 giorni dopo la pubblicazione). Stabilisce, ai sensi degli **artt. 21 par. 5 e 23 par. 11** della [[sources/Direttiva (UE) 2022-2555 (NIS2)|direttiva NIS2]]: (1) **requisiti tecnici e metodologici** delle misure di gestione dei rischi di cibersicurezza (Allegato — 13 sezioni mappate sulle lettere dell'art. 21 par. 2 NIS2); (2) **soglie quantitative** che configurano un incidente come significativo, sia orizzontali (art. 3) sia specifiche per 11 categorie di "soggetti pertinenti" (artt. 5-14). Abroga il Reg. di esecuzione (UE) 2018/151 (NIS1).

Il regolamento si **basa esplicitamente** su norme europee e internazionali (ISO/IEC 27001, ISO/IEC 27002, ETSI EN 319 401) e specifiche tecniche (CEN/TS 18026:2024). Pur essendo norma UE direttamente applicabile, **non sostituisce automaticamente la [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|det. ACN 379907/2025]]**: il coordinamento tra i due regimi è oggetto della [[synthesis/Coordinamento Reg UE 2024-2690 e Det ACN 379907-2025|synthesis dedicata]].

## Ambito soggettivo — 11 categorie di "soggetti pertinenti"

Il regolamento si applica esclusivamente alle 11 categorie elencate all'**art. 1** (tipologie della direttiva NIS2: Allegato I p. 8 "Infrastrutture digitali", compresi i prestatori di servizi fiduciari, e p. 9 "Gestione dei servizi TIC"; Allegato II p. 6 "Fornitori di servizi digitali"):

1. Fornitori di **servizi DNS**
2. **Registri dei nomi di dominio di primo livello** (TLD)
3. **Fornitori di servizi di cloud computing** ⭐ *(pilot sector NIS2 Tool)*
4. **Fornitori di servizi di data center**
5. **Fornitori di reti di distribuzione dei contenuti** (CDN)
6. **Fornitori di servizi gestiti** (MSP)
7. **Fornitori di servizi di sicurezza gestiti** (MSSP)
8. **Fornitori di mercati online** (marketplace)
9. **Fornitori di motori di ricerca online**
10. **Fornitori di piattaforme di servizi di social network**
11. **Prestatori di servizi fiduciari** (eIDAS / reg. UE 910/2014)

Gli altri settori NIS2 (energia, trasporti, sanità, PA, ecc.) **non rientrano** nell'ambito di questo regolamento: per essi continua ad applicarsi il regime nazionale ex direttiva NIS2 art. 21 (in Italia, [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|det. 379907/2025]]). Fanno eccezione i settori 3 (bancario) e 4 (infrastrutture dei mercati finanziari): l'art. 3 c. 14 del [[sources/D.Lgs. 138-2024 (Decreto NIS)|D.Lgs. 138/2024]] non applica loro i Capi IV e V e rinvia a DORA (Reg. UE 2022/2554), quindi nemmeno la det. 379907/2025.

## Struttura dell'atto

### Considerando (43)

Espongono il razionale del regolamento. Punti rilevanti:

- **Cons. 3**: i requisiti tecnici si basano su **ISO/IEC 27001, ISO/IEC 27002, ETSI EN 319 401, CEN/TS 18026:2024**.
- **Cons. 4-5**: principio di **proporzionalità** — i requisiti si applicano tenuto conto di esposizione, criticità, dimensioni del soggetto. Per microsoggetti possibili **misure compensative** (es. sorveglianza dirigenziale aumentata se non è possibile separare funzioni).
- **Cons. 6**: clausole `se opportuno`, `se applicabile`, `nella misura del possibile` consentono al soggetto di **non applicare** un requisito documentando la motivazione.
- **Cons. 7**: ENISA e autorità nazionali possono fornire **orientamenti** (es. risk assessment nazionali/settoriali).
- **Cons. 30**: i criteri di significatività incidenti sono **esaustivi**, fatta salva la clausola dell'art. 5 NIS2 (sicurezza nazionale).
- **Cons. 31**: il momento "viene a conoscenza" decorre dalla valutazione iniziale che porta a ragionevole certezza che si sia verificato un incidente significativo.
- **Cons. 32**: per stabilire il numero di utenti interessati, il soggetto somma clienti contrattualizzati + persone fisiche/giuridiche associate ai clienti commerciali.

### Articolato (16 articoli)

| Articolo | Oggetto |
|---|---|
| Art. 1 | Oggetto e ambito soggettivo (11 categorie) |
| Art. 2 | Rinvio all'Allegato per i requisiti tecnici e metodologici |
| Art. 3 | **Criteri orizzontali** di significatività incidenti |
| Art. 4 | **Incidenti ricorrenti** (≥2 in 6 mesi, stessa causa, soglia 500k cumulata) |
| Artt. 5-14 | Criteri **specifici per tipo di soggetto** |
| Art. 15 | Abrogazione Reg. esecuzione (UE) 2018/151 (NIS1) |
| Art. 16 | Entrata in vigore + applicabilità diretta |

### Allegato — 13 sezioni di requisiti tecnici

Mappate uno-a-uno sulle lettere dell'art. 21 par. 2 NIS2:

| Sezione allegato | Lettera art. 21(2) NIS2 | Contenuto |
|---|---|---|
| 1. Politica di sicurezza dei sistemi informativi e di rete | a) | Policy ISP approvata dagli organi di gestione + ruoli/responsabilità |
| 2. Politica di gestione dei rischi | a) | Quadro rischi + monitoraggio conformità + riesame indipendente |
| 3. Gestione degli incidenti | b) | Policy IR + monitoraggio/log + segnalazione + valutazione/classificazione + risposta + riesami post-incidente |
| 4. Continuità operativa e gestione crisi | c) | BC/DR plan + backup/ridondanza + crisis management |
| 5. Sicurezza catena di approvvigionamento | d) | Policy SC + criteri selezione fornitori + clausole contrattuali + registro fornitori |
| 6. Sicurezza acquisizione/sviluppo/manutenzione | e) | TIC procurement + SDLC sicuro + config mgmt + change mgmt + test sicurezza + patch + network sec + segmentazione + malware + gestione vulnerabilità |
| 7. Valutazione efficacia misure | f) | Strategy + metriche + monitoring/measurement |
| 8. Pratiche di igiene + formazione | g) | Awareness + training role-specific |
| 9. Crittografia | h) | Policy + key management lifecycle |
| 10. Sicurezza HR | i) | HR sec + background check + cessazione + processo disciplinare |
| 11. Controllo accesso | i, j) | Access control strategy + privileged accounts + identification + authentication + MFA |
| 12. Gestione risorse | i) | Asset classification + asset management + supporti rimovibili + inventario + cessazione rapporto |
| 13. Sicurezza ambientale e fisica | c, e, i) | Servizi pubblici + minacce fisiche/ambientali + accesso perimetrale |

## Criteri orizzontali di incidente significativo (art. 3)

Un incidente è significativo se si verifica uno o più dei seguenti:

| Criterio | Soglia |
|---|---|
| a) Perdita finanziaria diretta | > **500 000 EUR** oppure > **5% fatturato totale annuo** dell'esercizio precedente (il minore) |
| b) Esfiltrazione segreti commerciali | nessuna soglia (criterio binario) — definizione ex art. 2.1 dir. UE 2016/943 |
| c) Decesso persona fisica | nessuna soglia (criterio binario) |
| d) Danni considerevoli alla salute di una persona fisica | nessuna soglia |
| e) Accesso non autorizzato sospetto-malevolo che può causare gravi perturbazioni operative | nessuna soglia |
| f) Incidenti ricorrenti ex art. 4 | combinazione (≥2 in 6 mesi + stessa causa + 500k cumulato) |
| g) Criteri specifici per tipo di soggetto (artt. 5-14) | vedi tabella sotto |

I criteri sono **esaustivi** (cons. 30) salvo art. 5 NIS2 (sicurezza nazionale).

## Criteri specifici per tipo di soggetto (artt. 5-14)

### Art. 7 — Fornitori di servizi di cloud computing ⭐ (pilot NIS2 Tool)

| Criterio | Soglia |
|---|---|
| a) Indisponibilità totale del servizio | > **30 minuti** |
| b) Disponibilità limitata del servizio | > **1 ora** **AND** impatto su > 5% utenti UE **OR** > 1 milione utenti UE (il minore) |
| c) CIA dei dati compromessa per azione sospetta-malevola | nessuna soglia (criterio binario) |
| d) CIA dei dati compromessa | impatto su > 5% utenti UE **OR** > 1 milione utenti UE (il minore) |

### Tabella sintetica delle altre categorie

| Tipo soggetto | Articolo | Soglia indisponibilità totale | Soglia disponibilità limitata | Trigger CIA compromessa |
|---|---|---|---|---|
| **DNS provider** | art. 5 | risoluzione ricorsiva/autorevole > 30 min | tempo risposta > 10 sec per > 1 ora | sì (autorevole; eccezione < 1 000 / 1% nomi) |
| **TLD registry** | art. 6 | servizio autorevole > 0 (binario) | tempo risposta > 10 sec per > 1 ora | sì (binario) |
| **Cloud** | art. 7 | > 30 min | > 1h + > 5%/1M utenti UE | sì (malevolo) o > 5%/1M |
| **Data center** | art. 8 | servizio del data center > 0 (binario) | > 1 ora | sì (malevolo); + compromissione accesso fisico |
| **CDN** | art. 9 | > 30 min | > 1h + > 5%/1M utenti UE | sì (malevolo) o > 5%/1M |
| **MSP + MSSP** | art. 10 | > 30 min | > 1h + > 5%/1M utenti UE | sì (malevolo) o > 5%/1M |
| **Marketplace** | art. 11 | > 5%/1M utenti UE (no soglia tempo) | > 5%/1M utenti UE | sì (malevolo) o > 5%/1M |
| **Search engine** | art. 12 | > 5%/1M utenti UE | > 5%/1M utenti UE | sì (malevolo) o > 5%/1M |
| **Social network** | art. 13 | > 5%/1M utenti UE | > 5%/1M utenti UE | sì (malevolo) o > 5%/1M |
| **Trust service provider** | art. 14 | > **20 minuti** | > **1h/settimana** **AND** > 1% utenti/parti facenti affidamento UE oppure > 200 000 utenti UE | compromissione accesso fisico; CIA con impatto > 0,1% utenti / > 100 |

> *Soglie quantitative significative del Reg. UE — confronto con il regime italiano [[concepts/Incidenti significativi di base]]: in Italia (per i soggetti non DSP) gli allegati 3-4 della det. 379907/2025 usano **soglie qualitative auto-determinate** (IS-1/2/3/4 fondate sui SL definiti dal soggetto ex `DE.CM-01`). Il Reg. UE introduce soglie quantitative oggettive a livello UE per i DSP, vincolanti e armonizzate. Vedi [[synthesis/Coordinamento Reg UE 2024-2690 e Det ACN 379907-2025]] per l'analisi del rapporto regolatorio.*

## Calcolo del numero di utenti interessati (art. 3 par. 3)

Per le soglie che fanno riferimento alla percentuale o al numero di utenti UE (artt. 7, 9, 10, 11, 12, 13, 14), il soggetto **somma**:

- a) clienti con contratto che concede accesso ai sistemi o servizi del soggetto;
- b) persone fisiche e giuridiche **associate** a clienti commerciali che usano i sistemi.

Se il calcolo non è possibile, si usa la **stima del numero massimo possibile** di utenti interessati (cons. 32).

Per i **trust service provider**: si conteggiano anche le **parti facenti affidamento** sulla certificazione (relying parties), non solo gli utenti diretti.

## Misurazione della durata di un incidente

- **Indisponibilità totale** (cons. 35): dal momento in cui il servizio è completamente indisponibile per gli utenti fino al ripristino al livello pre-incidente.
- **Durata generale** (cons. 34): dalla perturbazione della corretta fornitura del servizio fino al ripristino; se il momento di inizio non è determinabile, dal momento del rilevamento o della registrazione nei log.

## Esclusioni esplicite

- **Manutenzione programmata** (art. 3 par. 2 + cons. 33): le interruzioni programmate e le conseguenze prevedibili di operazioni di manutenzione **non sono** incidenti significativi.
- **Interruzioni programmate contrattuali** (cons. 33): idem.

## Coordinamento con altre fonti normative

- **Base giuridica**: art. 21 par. 5 primo comma + art. 23 par. 11 secondo comma della **direttiva (UE) 2022/2555** ([[sources/Direttiva (UE) 2022-2555 (NIS2)]]).
- **Standard tecnici di riferimento esplicito** (cons. 3): ISO/IEC 27001, ISO/IEC 27002, ETSI EN 319 401, CEN/TS 18026:2024.
- **Reg. UE 2019/881 (Cybersecurity Act)** richiamato per certificazione europea di cibersicurezza dei prodotti TIC (cons. 17).
- **Reg. UE 2018/151 NIS1**: **abrogato** dall'art. 15 di questo regolamento.
- **Garante europeo della protezione dei dati**: consultato e ha formulato parere il 1° settembre 2024 (cons. 42).

## Citazioni rilevanti

> "Il presente regolamento è obbligatorio in tutti i suoi elementi e direttamente applicabile in ciascuno degli Stati membri." — Art. 16.

> "I criteri fissati nel presente regolamento dovrebbero inoltre essere considerati esaustivi, fatto salvo l'articolo 5 della direttiva (UE) 2022/2555." — Considerando 30.

> "Il soggetto pertinente è quindi da ritenersi 'a conoscenza' dell'incidente significativo se, dopo tale valutazione iniziale, è ragionevolmente certo che si sia verificato un incidente significativo." — Considerando 31.

> "I requisiti tecnici e metodologici delle misure di gestione dei rischi di cibersicurezza di cui all'allegato del presente regolamento si basano su norme europee e internazionali, quali ISO/IEC 27001, ISO/IEC 27002 ed ETSI EN 319 401, e su specifiche tecniche, quali CEN/TS 18026:2024." — Considerando 3.

## Entità menzionate

- Commissione europea — autore
- [[entities/ENISA]] — consultata + ruolo di guidance ex cons. 7
- Gruppo di cooperazione NIS — consultato (cons. 41) — [[entities/Gruppo di Cooperazione NIS]]
- Garante europeo della protezione dei dati — consultato (cons. 42)
- Comitato istituito ex art. 39 NIS2 — ha espresso parere conforme (cons. 43)
- ISO/IEC — fonte degli standard ISO 27001/27002 di riferimento
- ETSI — fonte di EN 319 401
- CEN — fonte di CEN/TS 18026:2024

## Concetti collegati

- [[concepts/NIS2]] — direttiva-madre
- [[concepts/Ambito di applicazione NIS2]] — i soggetti pertinenti del regolamento sono un sottoinsieme dell'ambito NIS2
- [[concepts/Soggetti essenziali e importanti]] — la distinzione resta rilevante: il regolamento si applica a entrambi se rientrano nelle 11 categorie
- [[concepts/Settori altamente critici e critici]] — le 11 categorie del regolamento sono ricavate dall'Allegato I punti 8-9 e dall'Allegato II punto 6 NIS2
- [[concepts/Misure di gestione del rischio cyber]] — l'art. 21 NIS2 è la base; il regolamento ne è esecutivo per le 11 categorie
- [[concepts/Notifica di incidente significativo]] — i criteri di significatività qui sono **esaustivi** per le 11 categorie
- [[concepts/Incidente significativo]]
- [[concepts/Incidenti significativi di base]] — regime IT alternativo per i soggetti non DSP (auto-determinazione vs soglie quantitative UE)
- [[concepts/Misure di sicurezza di base]] — regime IT alternativo (det. ACN 379907/2025)
- [[concepts/Coordinamento DORA-NIS]] — DORA ha precedenza sui prestatori di servizi finanziari; eIDAS-trust services hanno regime proprio sotto questo reg.
- [[concepts/Approccio multi-rischio]] — confermato dal cons. 28 del regolamento (rischi fisici, ambientali, accidentali inclusi)

## Synthesis collegate

- [[synthesis/Coordinamento Reg UE 2024-2690 e Det ACN 379907-2025]] — analisi del rapporto regolatorio UE/IT (snodo critico per il NIS2 Tool, pilot Cloud)
- [[synthesis/Stratificazione delle norme cybersecurity in Italia]] — aggiungere questa fonte nel quadro stratificato

## Note dell'agente

- *Sintesi dell'agente:* questo regolamento è la **prima manifestazione concreta** dell'art. 21 par. 5 NIS2 (la possibilità per la Commissione di adottare atti di esecuzione che dettano requisiti tecnici). Cambia il modello regolatorio NIS2 da "direttiva con recepimento nazionale flessibile" a "regime ibrido": per le 11 categorie DSP, il livello UE è direttamente applicabile e armonizzato; per gli altri settori, resta la flessibilità del recepimento nazionale.
- *Implicazione per il NIS2 Tool — pilot Cloud:* per un fornitore italiano di servizi cloud, lo strumento deve **almeno**: (a) riconoscere se il soggetto è un fornitore di servizi cloud ai sensi della direttiva NIS2 (definizione art. 6 punto 30) NIS2, identica all'art. 2 c. 1 lett. bbb) D.Lgs. 138/2024); (b) segnalare che gli obblighi sostanziali (misure + significatività incidenti) sono **prima** sotto Reg. UE 2024/2690, **poi** sotto det. ACN 379907/2025 ove non in conflitto. Il tool **non deve** entrare nel merito delle misure (out-of-scope MVP), ma deve almeno disambiguare il regime applicabile.
- **Open question normativa** (oggetto della synthesis dedicata): in che misura la det. ACN 379907/2025 si applica cumulativamente al Reg. UE 2024/2690 per i fornitori cloud italiani? Il Reg. UE non prevede una clausola di esaustività generale, solo per i criteri di significatività incidenti (cons. 30). Per le misure, la det. ACN potrebbe in teoria aggiungere requisiti nazionali, ma il principio dell'effetto diretto e della preminenza del diritto UE limita questo spazio. Va monitorato il primo *guidance document* ACN o ENISA che chiarisca la questione.
- *Lacuna nota:* questo regolamento cita **CEN/TS 18026:2024** come fonte tecnica. Non è ancora ingerito in wiki (non in batch 2026-05-18). Da considerare in waves future.
- *Lacuna nota:* il **Reg. eIDAS** (UE 910/2014, e successivo eIDAS 2.0 — UE 2024/1183) è il regime parallelo per i trust service providers (art. 14 del presente reg.). Non in wiki. Out-of-scope MVP NIS2 Tool ma rilevante per il GRC personale.
