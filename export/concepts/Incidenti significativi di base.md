---
title: Incidenti significativi di base
type: concept
scope: both
tags: [nis2, italia, specifiche-di-base, art-25, allegato-3, allegato-4, soglie]
sources: ["[[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]", "[[sources/Allegato 3 - Incidenti significativi di base per i soggetti importanti]]", "[[sources/Allegato 4 - Incidenti significativi di base per i soggetti essenziali]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/Guida lettura specifiche di base]]"]
aliases: [Allegato 3 incidenti NIS, Allegato 4 incidenti NIS, Soglie incident NIS, Specifiche incidenti significativi, IS-1, IS-2, IS-3, IS-4]
---

## Definizione

Specifiche di base, adottate dall'[[entities/ACN]] con la [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|Det. n. 379907 del 19/12/2025]], che **descrivono gli incidenti significativi di cui all'articolo 25** del [[sources/D.Lgs. 138-2024 (Decreto NIS)]]. Determinano quando un evento di sicurezza informatica supera la soglia che fa scattare l'obbligo di notifica al [[entities/CSIRT Italia]].

Concretizzano l'art. 25 c. 3 decreto NIS — la definizione astratta di [[concepts/Incidente significativo|incidente significativo]] (impatto su servizio, perdite finanziarie, ripercussioni su terzi) — in **tipologie e soglie operative**.

## Doppio allegato

- **Allegato 3** — incidenti significativi di base per i **[[concepts/Soggetti essenziali e importanti|soggetti importanti]]** (3 codici: IS-1, IS-2, IS-3) — cfr. [[sources/Allegato 3 - Incidenti significativi di base per i soggetti importanti]].
- **Allegato 4** — incidenti significativi di base per i **[[concepts/Soggetti essenziali e importanti|soggetti essenziali]]** (4 codici: IS-1..3 identici + IS-4) — cfr. [[sources/Allegato 4 - Incidenti significativi di base per i soggetti essenziali]].

## Modello tridimensionale dell'incidente

La [[sources/Guida lettura specifiche di base|guida alla lettura]] (§ 3.2, introdotto in ed. 2.0 dic 2025) formalizza una **griglia tridimensionale** per descrivere ogni tipologia di incidente:

| Elemento | Significato |
|---|---|
| **Condizione** | il soggetto ha **evidenza** dell'incidente (= dispone di elementi oggettivi che ne attestano il verificarsi). L'acquisizione dell'evidenza **fa decorrere** i termini di pre-notifica (24h) e notifica (72h). |
| **Compromissione** | l'**evento di sicurezza** che configura l'incidente significativo |
| **Oggetto compromissione** | la **risorsa** su cui l'evento ha impatto (dati digitali oppure servizi/attività) |

Applicata ai codici IS-1..4:

| Codice | Condizione | Compromissione | Oggetto |
|---|---|---|---|
| IS-1 | il soggetto ha evidenza | Perdita di **riservatezza**, verso l'esterno | Dati digitali |
| IS-2 | id. | Perdita di **integrità**, con impatto verso l'esterno | Dati digitali |
| IS-3 | id. | Violazione dei **livelli di servizio attesi (SL)** ex `DE.CM-01` | Servizi e/o attività |
| IS-4 *(solo essenziali)* | id., **anche su parametri quali-quantitativi** ex `DE.CM-01` p.6 | **Accesso non autorizzato** o **abuso dei privilegi concessi** | Dati digitali |

### Acquisizione dell'evidenza

Tre canali tipici (§ 3.2.1):

1. Segnalazioni **esterne** (es. [[entities/CSIRT Italia]]).
2. Segnalazioni **interne** (es. utente che riporta malfunzionamento all'help desk).
3. Eventi rilevati dai **sistemi di monitoraggio**.

### Esempi canonici di compromissione

- **IS-1**: esfiltrazione documenti dagli archivi digitali; esposizione di credenziali utenti su Internet.
- **IS-2**: defacement del sito web; corruzione/alterazione DB che rende disponibili dati inconsistenti.
- **IS-3**: indisponibilità sito > 30 min consecutivi; servizio online disponibile per < 95% degli utenti (= il soggetto aveva definito 30 min / 95% come SL).
- **IS-4**: uso di credenziali rubate per accedere ad account; consultazione di banche dati da personale **con autorizzazione tecnica** ma in violazione delle politiche o per scopi estranei alle necessità funzionali.

> *Definizione di "abuso dei privilegi concessi" (Appendice D guida):* l'utente dispone di credenziali configurate per accedere ai dati, ma l'accesso è illecito perché effettuato in violazione delle politiche del soggetto o per scopi estranei alle necessità funzionali per cui l'accesso è stato attribuito.

## Approccio multi-rischio

In considerazione dell'[[concepts/Approccio multi-rischio|approccio multi-rischio]] e della definizione di incidente all'art. 2 c.2 lett. t) decreto NIS, **gli incidenti oggetto di notifica ricomprendono anche quelli accidentali** (fault, malfunzionamento, errore umano), non solo intenzionali.

## Codici IS-1..4

| Codice | Descrizione sintetica | Importanti (All. 3) | Essenziali (All. 4) |
|---|---|---|---|
| **IS-1** | Perdita di **riservatezza verso l'esterno** di dati di proprietà o sotto controllo | ✅ | ✅ |
| **IS-2** | Perdita di **integrità con impatto verso l'esterno** di dati di proprietà o sotto controllo | ✅ | ✅ |
| **IS-3** | Violazione dei **livelli di servizio attesi (SL)** ex misura `DE.CM-01` | ✅ | ✅ |
| **IS-4** | **Accesso non autorizzato o abuso di privilegi** rilevato sulla base dei parametri quali-quantitativi ex `DE.CM-01` p.6 | ❌ | ✅ |

### Aggancio operativo a `DE.CM-01`

I codici IS-3 e IS-4 sono **dipendenze tecniche** della misura `DE.CM-01` (Allegato 1 per IS-3, Allegato 2 per IS-4):

- **IS-3** richiede che il soggetto abbia **definito e documentato i livelli di servizio attesi (SL)** sui suoi servizi/attività (`DE.CM-01` punto 2). La violazione di questi SL fa scattare la notifica.
- **IS-4** richiede che il soggetto abbia **definito parametri quali-quantitativi** per rilevare accessi non autorizzati o abuso di privilegi (`DE.CM-01` punto 6, presente solo nell'Allegato 2 = essenziali).

*Sintesi dell'agente:* l'auto-determinazione delle soglie è coerente: il soggetto definisce SL e parametri secondo la propria valutazione del rischio, e su quelli costruisce la rilevazione. Le soglie qualitative degli allegati 3-4 non sono numeri, sono **violazioni di una baseline scelta dal soggetto**.

## Termine di adempimento

- **9 mesi** dalla ricezione, da parte del soggetto NIS, della comunicazione di inserimento nell'elenco dei soggetti NIS (art. 3 c. 2 della determinazione).
- Per i **soggetti inseriti per la prima volta nel 2026** ([[sources/Determinazione ACN termini soggetti 2026 - 2026-04-30]]): obbligo decorrente dal **1° gennaio 2027**.

## Soglie speciali per gli operatori telco

L'art. 6 c. 2 della [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|Det. n. 379907]] fissa, per gli operatori telco, **soglie quantitative aggiuntive** che fanno automaticamente scattare la qualifica di incidente significativo di base:

| Durata > | Utenti colpiti > |
|---|---|
| 1 ora | 15% degli utenti nazionali del servizio |
| 2 ore | 10% |
| 4 ore | 5% |
| 6 ore | 2% |
| 8 ore | 1% |

Soglie identiche al **DM 12/12/2018** e coerenti con la prassi UE per i servizi di comunicazione elettronica.

## Sistemi rilevanti

L'incidente è valutato sui **[[concepts/Sistemi informativi e di rete rilevanti|sistemi informativi e di rete rilevanti]]** (art. 1 c. 1 lett. l) della determinazione): sistemi la cui compromissione comporterebbe un **impatto significativo su riservatezza, integrità e disponibilità** delle attività e dei servizi NIS del soggetto.

## Regime transitorio OSE/telco

- **OSE** (NIS1): per i sistemi OSE già identificati ex D.Lgs. 65/2018, vale il regime di mantenimento delle misure preesistenti — la notifica si applica con i nuovi parametri NIS (art. 5).
- **Telco**: oltre alle soglie sopra, vale il regime di mantenimento delle misure DM 12/12/2018 (art. 6 c. 1).

## Collegamenti

- [[concepts/Notifica di incidente significativo]] — l'obbligo procedurale
- [[concepts/Incidente significativo]] — la nozione astratta
- [[concepts/Misure di sicurezza di base]] — gli altri due allegati della stessa determinazione
- [[concepts/Specifiche tecniche di base]] — concetto-ombrello
- [[concepts/Sistemi informativi e di rete rilevanti]] — perimetro tecnico su cui valutare gli incidenti
- [[concepts/Approccio multi-rischio]] — fondamento dell'inclusione degli eventi accidentali
- [[entities/CSIRT Italia]] — destinatario delle notifiche

## Note dell'agente

- *Inferenza:* le soglie telco sono **automatic floors**, non massimali. Un soggetto telco che ha incidenti sotto questi numeri può comunque doverli notificare se rispondono ai criteri qualitativi degli allegati 3 e 4.
- Sfumatura linguistica IS-3: l'Allegato 3 dice "SL stabiliti", l'Allegato 4 dice "SL definiti" — sfumatura di drafting, non sostanziale.
