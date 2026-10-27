---
name: nis2-corpus-update
description: Use this skill whenever the user records an ACN regulatory update (determinazione, FAQ, circolare) in the NIS2 Tool corpus, bumps the corpus version, or updates the changelog. Triggers include "nuova determinazione ACN", "aggiornamento FAQ", "bump versione corpus", "aggiorna changelog", "recepire", or notification that ACN published new normative content. Use this skill even if the user does not say "skill" — every change to corpus version metadata (VERSION + CHANGELOG.md) must go through it to guarantee semver correctness applied to CONTENT, changelog consistency, and green fixtures. Do NOT use this skill to MODEL a sector/rule/signal (use nis2-sector-author) or to write public-facing content like LinkedIn/README (use nis2-content-author). This skill owns the version bump and the fixture re-alignment that FOLLOW a content change.
---

# NIS2 Corpus Update

Skill per registrare aggiornamenti normativi ACN nel corpus **reale** (`packages/corpus/corpus/`), bumpare la versione semantica applicata al **contenuto**, aggiornare `CHANGELOG.md`, riallineare le fixture golden e proporre il commit `corpus:`.

> Fonte di verità: `packages/corpus/corpus/VERSION` (plain text, oggi `0.3.1`), `packages/corpus/corpus/CHANGELOG.md` (Keep a Changelog), `CLAUDE.md`. **Prima di scrivere, leggi VERSION e le ultime due voci del CHANGELOG** — non ricostruire il formato a memoria. La modellazione del contenuto (regole, tipologie, signal) è di `nis2-sector-author`: questo skill governa il *bump* e la *coerenza di versione* che seguono.

## Quando si attiva

- Pubblicazione di una nuova determinazione ACN che impatta il corpus.
- Aggiornamento delle FAQ ufficiali ACN o di una circolare con effetti sul corpus.
- Chiusura di un open point / patch di attestazione (come [0.2.1], DIV-P1).
- Necessità di rilasciare una patch di correzione citazioni/copy senza effetto sugli esiti.

## Struttura reale (NON la vecchia `data/nis2-corpus/`)

Non esistono nel repo: `version.json`, `<CorpusBanner/>`, `pnpm validate:corpus`, `pnpm test:engine`, `metadata.recepito_in_corpus_versione`. Usa invece:

```
packages/corpus/corpus/
  VERSION          # plain text, una riga. Es. "0.2.1"
  CHANGELOG.md     # Keep a Changelog; voci in italiano, sezioni Added/Changed/Notes
  sectors/ wizard/ signals/ regimes/
packages/engine/tests/fixtures/  # E01–E15+, ognuna dichiara corpus_version
```

Comandi reali: `corpus:validate` (schema zod build-time). CI su ogni push/PR: install → lint → typecheck → `corpus:validate` → test → build.

## Regola trasversale normativa (viene prima di tutto)

Prima di codificare qualunque contenuto normativo, **attestarlo contro il nodo KB pertinente** (`LLM_Wiki/wiki/`): articolo, comma, protocollo, codice FAQ. Se l'attestazione manca o è imprecisa → **open point riportato all'autore, mai deduzione**. Ordine di prevalenza in conflitto: testo ufficiale > KB > corpus > codice; la discrepanza si segnala sempre a monte. **Identità documentale dal testo** (ADR 0007): mai stabilire quale atto è dal nome del file o da fonti secondarie.

Ogni modifica al contenuto normativo del corpus **richiede conferma esplicita dell'autore** (CLAUDE.md, Autonomia).

## Procedura standard

### 1. Inquadra l'aggiornamento

Raccogli (dall'autore o dalla KB): protocollo/sezione FAQ/identificativo; data ACN; sintesi delle modifiche e sezioni del corpus impattate; tipologia (nuova regola / modifica / abrogazione / chiarimento / correzione attestazione); URL ufficiale se disponibile. Se manca un elemento **essenziale all'attestazione**, chiedi prima di procedere. Mai inventare protocolli, date o citation ID.

### 2. Determina il bump — semver applicato al CONTENUTO

Il versioning è del **contenuto del corpus**, non del codice dell'engine (che ha la sua versione). Definizioni reali (dal CHANGELOG):

| Tipo modifica | Bump | Esempio reale |
|---------------|------|---------------|
| Correzione di citazioni/testo **senza** modifiche di schema, senza effetto sugli esiti | **patch** | `0.2.0 → 0.2.1` (DIV-P1 chiusa, commi DORA verificati) |
| Nuove domande del questionario o nuovi campi di schema **retro-compatibili**; nuove regole/settori | **minor** | `0.1.0 → 0.2.0` (campo `verdict_outcome`, domanda PUN, regimi, fixtures) |
| Cambia il **contratto dati** letto dall'engine in modo incompatibile | **major** | (non ancora avvenuto) |

Regola di dubbio: se un cambiamento **modifica un esito atteso** (verdict_outcome/assessment_mode di una fixture), **non è patch** → almeno minor, e va aggiornata la fixture con motivazione. In dubbio tra patch e minor, scegli minor.

### 3. Coordina la modellazione del contenuto

Se l'aggiornamento aggiunge/modifica regole, tipologie, override o signal, la modellazione YAML è di **`nis2-sector-author`** (schema valido, `verdict_outcome` dichiarato, citazioni a granularità verificata, copy non categorico). Questo skill interviene **dopo**, per versione + changelog + fixture. Non duplicare qui la logica di modellazione.

### 4. Aggiorna `packages/corpus/corpus/VERSION`

File plain text di **una riga**. Sostituisci il numero:

```
0.2.2
```

Niente JSON, niente metadati: solo la versione.

### 5. Aggiorna `packages/corpus/corpus/CHANGELOG.md`

Inserisci la voce **in cima** (sotto l'intestazione), stesso stile delle voci reali: header con versione + data + titolo in italiano; sezioni Keep a Changelog (`### Added`, `### Changed`, `### Notes`); corpo in italiano; ogni voce cita i file toccati e i citation ID a granularità verificata.

```markdown
## [0.2.2] — 2026-07-15 — Recepimento Det. ACN <prot>/<anno>

Sintesi in 1-2 frasi: cosa cambia e su quale attestazione (testo ufficiale, PDF firmato ingerito e verificato verbatim).

### Added
- **`sectors/sectors__<id>.yaml`** — <regola/tipologia aggiunta>; `verdict_outcome` dichiarato; citazioni a granularità di comma verificata (`<citation_id>`).

### Changed
- **`packages/engine/tests/fixtures/E<nn>_<slug>.yaml`** — `corpus_version` 0.2.1 → 0.2.2; citazioni allineate.

### Notes
- Attestazione: nodo KB `[[sources/...]]`; ADR di riferimento `docs/decisions/<nnnn>-*.md`.
- Eventuali open point residui e cosa resta da riconciliare sul testo.
```

Ordine di prevalenza dei numeri (regola dei tre punti, ADR 0007): protocollo su **testo/frontespizio ↔ nodo KB ↔ filename**. Se il protocollo non è stampato nel testo, attribuiscilo dalla pubblicazione ACN e registrane la fonte, mai dal filename.

### 6. Riallinea le fixture golden (E01–E15+)

Le fixture in `packages/engine/tests/fixtures/` sono la suite di regressione dell'engine e dichiarano `corpus_version`. Regole:

- **MINOR/MAJOR** → aggiorna `corpus_version` in **ogni** fixture al nuovo numero e verifica che gli `expected` (`assessment_mode` + `verdict_outcome` + `citations`) restino coerenti.
- Se il cambiamento **modifica un esito atteso**, aggiorna la fixture interessata **con motivazione esplicita nel commit** — mai "aggiustare il test perché passi".
- Se serve esercitare una regola nuova, aggiungi/aggiorna una fixture che la copra (input con ID reali del wizard).
- **Le fixture devono restare verdi** prima di ogni merge che tocca corpus o engine.

Per una PATCH pura di attestazione (come [0.2.1]) di norma cambia solo `corpus_version` e le `citations` delle fixture toccate (vedi E06: `0.2.0 → 0.2.1`, commi DORA allineati).

### 7. Esegui validazione e test

```
corpus:validate    # schema zod: verdict_outcome obbligatorio, invariante escalate→ambiguous,
                   # citation ID ben formati, referenze signal esistenti
```

Poi la suite di test (fixture golden). Se `corpus:validate` fallisce, correggi prima di proporre il commit. Se una fixture diventa rossa: analizza se è un cambio di esito *voluto* (allora aggiorna fixture + motivazione + rivaluta il bump verso minor/major) o un errore di modellazione (allora correggi il corpus).

### 8. Proponi il commit `corpus:` (inglese, conventional)

I commit `corpus:` **citano la versione**. Formato reale:

```
corpus: bump 0.2.2 — incorporate Det. ACN <prot>/<anno>

- add <sector> qualification rule (Allegato I p. <x>)
- realign fixtures E01–E15 to corpus_version 0.2.2

Refs:
- Det. ACN <prot>/<anno> of <YYYY-MM-DD>
- KB: [[sources/...]]
```

Non committare finché `corpus:validate` e le fixture non sono verdi. `docs/ARCHITECTURE.md` è documentazione viva: aggiornala nello stesso commit se l'aggiornamento tocca l'architettura. Le decisioni con alternative scartate → ADR in `docs/decisions/` (numero progressivo).

## Regimi correlati toccati da una determinazione

I regimi (DORA, PSNC, Cloud PA, L. 90/2024) hanno `status: routing_only_v0_1`: **instradano, non risolvono nel merito** in v0.1.0. Se una determinazione li tocca:

- Recepisci solo le parti che impattano l'ambito NIS2 puro e il routing.
- Annota nel CHANGELOG (sezione `### Notes`) cosa è differito a post-MVP e perché.
- La risoluzione nel merito di un regime **tocca lo scope**: richiede conferma esplicita dell'autore, non si implementa in autonomia.

## Cosa NON fare

- Non usare la vecchia struttura: `version.json`, `<CorpusBanner/>`, `pnpm validate:corpus`, `pnpm test:engine`, `metadata.recepito_in_corpus_versione` **non esistono**. Usa `VERSION`, `CHANGELOG.md`, `corpus:validate`.
- Non modificare il corpus senza aggiornare `VERSION` **e** `CHANGELOG.md`.
- Non marcare come "patch" un cambiamento che modifica un esito atteso: è almeno minor, con fixture aggiornata e motivazione.
- Non lasciare le fixture rosse né disallineate su `corpus_version` dopo un MINOR/MAJOR.
- Non inventare protocolli, date, URL o citation ID: in dubbio, open point riportato all'autore.
- Non stabilire l'identità di un atto dal nome del file (ADR 0007): sempre dal testo.
- Non risolvere nel merito i regimi né toccare lo scope senza decisione esplicita.
