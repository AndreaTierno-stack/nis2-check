---
name: nis2-content-author
description: Use this skill whenever the user wants to write public-facing / build-in-public content for the NIS2 Tool — LinkedIn posts, GitHub release notes, README sections, project announcements, technical lessons-learned, or normative deep-dives that promote the tool. Triggers include "post LinkedIn", "release notes", "annuncio", "articolo", "scrivere il README", "deep dive normativo". Use this skill even if the user does not say "skill" — all public-facing NIS2 Tool content goes through it to keep voice consistency (declarative, impersonal, honest about limits), probabilistic (never categorical) phrasing, and the corpus naming constraints. Do NOT use this skill to MODEL corpus content (use nis2-sector-author) or to bump the corpus version/changelog (use nis2-corpus-update). Internal repo docs (ARCHITECTURE, contributing) are ordinary tasks, not build-in-public content.
---

# NIS2 Content Author

Skill per scrivere materiale build-in-public del NIS2 Tool, mantenendo voce coerente (dichiarativa, impersonale, onesta sui limiti), formulazione **probabilistica mai categorica**, audience target (IT manager / DPO / consulenti GRC italiani) e i vincoli di naming del corpus.

> Guida di voce estesa con esempi: `references/voice-guide.md`. Il tool è uno **strumento informativo di pre-screening dell'ambito NIS2**, **mai** di compliance/audit/certificazione: questo vincolo vale per ogni parola pubblicata.

## Quando si attiva

- Post/articoli LinkedIn legati al progetto.
- Release notes per tag GitHub.
- Sezioni del README destinate al pubblico esterno.
- Annunci di milestone (rilascio MVP, nuova feature, nuova versione del corpus).
- Deep-dive normativi che fungono da magnete per il tool.
- Lessons learned tecnici condivisi pubblicamente.

## Voce del progetto

Registro **dichiarativo, impersonale, asciutto**. Focalizzato sul tema, non sull'autore.

- **Dichiarativa e fattuale.** Constata, non esorta. Mai entusiastica, mai promozionale.
- **Impersonale.** Nessuna narrazione eroica del builder solitario. La prima persona, quando serve, è **solo fattuale** ("ho modellato tre settori in YAML validato"), mai emotiva ("sono fiero di annunciare").
- **Tecnicamente precisa.** Riferimenti normativi corretti, terminologia GRC italiana corretta, numeri concreti.
- **Onesta sui limiti.** Dichiarare cosa il tool **non fa** è più credibile che elencare cosa fa. Segnala competenza e scarica il rischio legale.

Vedi `references/voice-guide.md` per esempi positivi/negativi commentati e il vocabolario di riferimento.

## Vincolo non negoziabile: copy probabilistico, mai categorico

Ogni contenuto che descrive un esito del tool usa formulazione **probabilistica**, come nel corpus:

> "Sulla base degli input forniti, l'analisi suggerisce che il soggetto rientri nel perimetro NIS2 italiano come [tipologia]. Verifica obbligatoria con consulente qualificato."

**Vietati in qualunque contenuto** (anche negli esempi): "Rientri", "Sei dentro/escluso", "Sei conforme", "Devi", "Sei tenuto a", "Adempi", "Implementa", "report di compliance", "audit", "diagnosi", "certificazione". Vietato descrivere il tool come qualcosa che "ti dice se sei dentro": semmai "indica se l'analisi suggerisce l'inclusione".

## Vincoli di naming del corpus (ADR 0004, 0005)

Valgono anche nei contenuti pubblici:

- **Mai la sola parola "salvaguardia".** Due istituti distinti da non confondere: la **salvaguardia dimensionale (DPCM 221/2024)** (id corpus `safeguard_dimensional_dpcm_221`) e le **esclusioni di sicurezza nazionale (NIS2 art. 2 par. 7-8)**. Se un post parla di soglie dimensionali, è la prima; non usarle come sinonimi.
- **Mai "CER" nudo** parlando di energia: "**soggetti critici (D.Lgs. 134/2024)**" / "Critical Entities Resilience" per la resilienza fisica, "**comunità energetiche rinnovabili (CACER)**" per le comunità energetiche. Nel settore energia "CER" è ambiguo tra i due.

## Fatti del prodotto da citare correttamente (v0.1.0)

Non inventare feature né numeri. Stato reale:

- **3 settori pilota**: Cloud computing, Energia elettrica, Pubblica Amministrazione.
- **Wizard a doppio binario**: 3 gate di disambiguazione di regime (PSNC, DORA, Cloud PA) → identificazione standard con size-cap (la PA lo salta: size-blind ex art. 3 c. 6). La **L. 90/2024 non è un gate**: è un segnale cumulativo che si aggiunge al verdetto.
- **Verdetto motivato + Explainability Mode** (mostra il percorso decisionale, `reasoningTrace` client-side).
- **PDF client-side** intitolato "**Esito preliminare di verifica dell'ambito NIS2**" (mai wording da certificato).
- **Corpus dichiarativo** in YAML validato con zod, versionato (`VERSION` + `CHANGELOG.md`), citazioni normative tracciabili a granularità di comma.
- **Zero raccolta dati / zero telemetria**: le risposte non lasciano il browser.
- **Fuori scope MVP**: gli altri 14 settori, la risoluzione nel merito dei regimi (solo routing/segnalazione), autenticazione, persistenza, analytics.

## Pattern strutturali per tipo di contenuto

### Annuncio di milestone (350-500 parole)

1. **Hook** (1-2 righe, fattuale e specifico, non vago). ✅ "Da oggi è online la prima versione del tool open source per un pre-screening dell'ambito NIS2 italiano."
2. **Cosa è stato rilasciato** — funzionalità concrete, non slogan.
3. **Perché conta** — quale problema, per chi, come si differenzia.
4. **Limiti dichiarati** — cosa non fa ancora, cosa è in roadmap.
5. **CTA leggera** — link al repo/sito, invito a provare e segnalare. Niente urgency, niente "iscriviti".
6. **Hashtag** (max 5, italiani e settoriali).

### Approfondimento normativo (500-700 parole)

1. **Hook** con osservazione contro-intuitiva ma **corretta e attestata** (non clickbait normativo).
2. **Setup del problema** — perché il tema è frainteso o sottovalutato.
3. **Cuore dell'analisi** — spiega le regole, cita le fonti (articolo/comma/FAQ), esempi concreti.
4. **Implicazioni operative** — cosa cambia nel lavoro quotidiano di chi legge.
5. **Riferimento al tool** (leggero) — come aiuta su questo tema, in termini probabilistici.
6. **CTA** + hashtag.

### Lessons learned tecnico (400-600 parole)

Problema concreto → opzione scartata (e perché) → soluzione adottata (con dettaglio utile) → lesson distillata in 1-2 frasi. Ottimo per raccontare scelte di modellazione reali: `verdict_outcome` copiato-non-inferito, l'invariante escalate→ambiguous, l'identità documentale dal testo (ADR 0007), la disambiguazione CER/CACER.

### Release notes GitHub

Keep a Changelog con voce umana (non solo bullet asettici). Rispecchia il `CHANGELOG.md` reale del corpus: header con versione + data + titolo italiano, sezioni Added/Changed/Notes, fonti normative recepite in fondo. Cita la **versione del corpus**, non un `version.json` (non esiste).

### Sezione README — Overview

Scritta come lettera al DPO/consulente che apre il README per la prima volta: cosa fa la v0.1.0 (3 settori pilota, wizard doppio binario, verdetto motivato, PDF), cosa **esplicitamente non fa** (non sostituisce il parere qualificato; niente altri settori né regimi risolti nel merito; zero raccolta dati). Sempre in registro probabilistico.

## Vincoli legali per ogni contenuto pubblico

- Dichiarare che il tool **non costituisce parere legale** e non garantisce conformità: aiuta l'analisi, non la certifica.
- Nessun verdetto categorico negli esempi (vedi lista vietata sopra).
- Per casi di rientro/esclusione, **anonimizza** sempre: mai clienti reali o dati identificabili.

## Trappole stilistiche da evitare

- Hook con domanda retorica banale ("Ti sei mai chiesto se la tua azienda…").
- Apertura con "Sono fiero/felice/emozionato di annunciare".
- Emoji o check-mark a inizio paragrafo (✅ ❌ 🚀 🔥).
- "In un mondo dove…", "Oggi più che mai…".
- Promesse di silver bullet ("il tool che risolve la NIS2 una volta per tutte").
- Attaccare un competitor per nome (Big4, vendor cyber).
- Hashtag inglesi generici su audience italiana (#cybersecurity al posto di #ComplianceItalia).

## Procedura standard

1. Identifica il tipo di contenuto e raccogli gli ingredienti (link, numeri, riferimenti normativi **attestati**).
2. Genera la bozza seguendo il pattern strutturale.
3. Passa i due controlli: **copy probabilistico** (nessun verbo vietato) e **naming** (salvaguardie, CER/CACER).
4. **Proponi due varianti di hook** così l'autore sceglie.
5. Suggerisci il timing di pubblicazione se rilevante.

## Cosa NON fare

- Non usare i fatti di prodotto della vecchia bozza (`data/nis2-corpus/`, `version.json`, `<CorpusBanner/>`, "6 step", "cinque eccezioni size-blind"): riferisciti alla realtà v0.1.0 sopra.
- Non scrivere in prima persona come se fossi l'autore, salvo richiesta esplicita.
- Non promettere date di rilascio non fornite, né inventare numeri di trazione (stelle, follower, download).
- Non usare copy categorico né descrivere il tool come strumento di compliance/audit/certificazione.
- Non inventare riferimenti normativi: se un claim non è attestato, non pubblicarlo.
- Non scrivere disclaimer "definitivi": sono soggetti a review legale.
