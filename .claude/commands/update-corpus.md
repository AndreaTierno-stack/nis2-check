---
description: Registra una nuova determinazione/FAQ ACN nel corpus, bumpa la versione e aggiorna il changelog
---

# /update-corpus

Workflow per registrare un aggiornamento normativo emesso dall'ACN (determinazione, FAQ, circolare) nel corpus del tool, garantendo coerenza tra modifiche YAML, versione semantica, changelog e banner UI.

## Quando usare questo comando

- Quando l'ACN pubblica una nuova determinazione e va recepita nel corpus.
- Quando vengono pubblicate nuove FAQ ufficiali.
- Quando esce una circolare che impatta classificazione, eccezioni o calendario adempimenti.

## Procedura

1. **Inquadra l'aggiornamento.** Chiedi all'utente:
   - Numero di protocollo o identificativo della fonte (es. "Det. ACN 412345/2026").
   - Data di pubblicazione.
   - Sintesi delle modifiche introdotte (con riferimenti puntuali alle sezioni del corpus impattate).
   - Tipologia: nuova regola, modifica di regola esistente, abrogazione, chiarimento.

2. **Consulta la skill `nis2-corpus-update`** per le regole di versionamento semantico, formato del changelog e procedure di aggiornamento del banner.

3. **Identifica i file impattati.** Cerca in `data/nis2-corpus/` quali file YAML vanno modificati. Riepiloga all'utente prima di procedere.

4. **Determina il bump di versione.**
   - **Patch** (`0.1.0` → `0.1.1`): chiarimenti, correzioni di typo nei riferimenti, aggiunta di esempi senza modifiche di logica.
   - **Minor** (`0.1.0` → `0.2.0`): nuove regole, nuovi settori, nuove eccezioni che ampliano il corpus senza romperne le decisioni esistenti.
   - **Major** (`0.x.y` → `1.0.0`): cambiamenti che alterano il verdetto su input precedentemente già supportati. **Richiedono comunicazione attiva agli utenti**.

5. **Modifica i file YAML** seguendo lo schema. Aggiungi/aggiorna i campi `fonti` con i riferimenti alla nuova determinazione/FAQ.

6. **Aggiorna `data/nis2-corpus/version.json`:**
   ```json
   {
     "version": "0.2.0",
     "released_at": "2026-05-15",
     "last_acn_source": {
       "type": "determinazione",
       "protocol": "Det. ACN 412345/2026",
       "date": "2026-05-10",
       "url": "https://www.acn.gov.it/..."
     }
   }
   ```

7. **Aggiungi entry al CHANGELOG** `data/nis2-corpus/CHANGELOG.md`:
   ```markdown
   ## [0.2.0] — 2026-05-15

   ### Recepimento Det. ACN 412345/2026

   #### Aggiunto
   - Sotto-tipologia "X" nel settore Energia (rif. art. 3 della Det.).

   #### Modificato
   - Eccezione size-blind per gestori DNS estesa a registrar di secondo livello.

   ### Fonte
   - Det. ACN 412345/2026 del 10 maggio 2026 — [link]
   ```

8. **Esegui validazione e test:**
   ```bash
   pnpm validate:corpus
   pnpm test:engine
   ```

9. **Verifica il banner UI.** Il banner deve riflettere automaticamente i campi di `version.json`. Controlla a video che si aggiorni correttamente.

10. **Proponi commit message:**
    ```
    feat(corpus): incorporate Det. ACN 412345/2026

    Bumps corpus to v0.2.0. Adds new sub-typology in Energy sector,
    extends size-blind exception for DNS registrars.
    ```

## Vincoli da rispettare

- **Mai** modificare il corpus senza aggiornare `version.json` e `CHANGELOG.md`.
- **Mai** rilasciare un major bump senza piano di comunicazione concordato con l'utente (post LinkedIn, release notes GitHub, eventuale email a chi ha starred il repo).
- **Mai** inventare un numero di protocollo o una data. Se l'utente non te li fornisce, chiedi.
- Se l'aggiornamento ACN modifica un verdetto già emesso, considera di aggiungere una nota retroattiva al PDF generato fino a quel momento (versione precedente). Dipende dalla policy di versioning che l'utente vorrà adottare; chiedi prima di implementare.

## Idea futura (post-MVP)

Esiste un'idea di automatizzare il monitoraggio ACN tramite GitHub Actions con scraping del sito ufficiale. Per ora **non implementare**. Il monitoraggio è manuale: una volta al mese l'utente apre le pagine ACN, identifica eventuali aggiornamenti, e usa questo comando per recepirli.
