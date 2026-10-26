---
description: Aggiungi o modifica un settore NIS2 nel knowledge model YAML
---

# /add-sector

Workflow guidato per aggiungere un nuovo settore (Allegato I, II, III o IV) al corpus YAML del NIS2 Tool, oppure per modificarne uno esistente.

## Quando usare questo comando

- Quando l'utente dice "aggiungi il settore X al corpus" o equivalenti.
- Quando va modellato un nuovo Allegato o sotto-tipologia.
- Quando l'utente vuole correggere classificazione, eccezioni o riferimenti normativi di un settore esistente.

**Non usare** questo comando per registrare nuove determinazioni ACN o aggiornare la versione del corpus — per quello c'è `/update-corpus`.

## Procedura

1. **Identifica il settore.** Chiedi all'utente:
   - Allegato di riferimento (I, II, III o IV).
   - Nome del settore e sotto-tipologia (es. "Energia → Elettricità → Imprese elettriche").
   - Riferimenti normativi precisi (articoli D.Lgs. recepimento, FAQ ACN, determinazioni rilevanti).

2. **Consulta la skill `nis2-sector-author`** per il formato YAML corretto, lo schema di validazione e gli esempi.

3. **Verifica con il knowledge esistente.** Leggi `data/nis2-corpus/settori/` per vedere se il settore già esiste e per uniformare lo stile a quello dei settori già presenti.

4. **Cerca la fonte normativa.** Se l'utente non ti fornisce riferimenti precisi, **non inventarli**. Chiedi conferma o segnala come `TODO: verificare riferimento`.

5. **Crea/modifica il file YAML** in `data/nis2-corpus/settori/<id-settore>.yaml`.

6. **Esegui validazione locale:**
   ```bash
   pnpm validate:corpus
   ```
   Se fallisce, correggi prima di proporre il commit.

7. **Aggiungi/aggiorna i test** in `packages/engine/__tests__/sectors/<id-settore>.test.ts`. Almeno un test per:
   - Caso di rientro standard.
   - Caso di esclusione standard.
   - Caso ambiguo o eccezione, se applicabile.

8. **Proponi commit message** in formato conventional:
   ```
   feat(corpus): add <sector-name> sector with <N> sub-typologies
   ```

## Vincoli da rispettare

- Linguaggio del verdetto: vedere CLAUDE.md, sezione "Linguaggio del verdetto". Mai categorico.
- Riferimenti normativi obbligatori nel campo `fonti` di ogni regola.
- Schema YAML deve passare validazione Zod prima del merge.
- Test coverage minimo: una regola = un test.

## Cosa fare se il settore tocca regimi correlati

I regimi correlati (DORA, PSNC, Cloud PA, L. 90/2024) sono esplicitamente **fuori scope nel MVP v0.1.0**. Se il settore ha intersezioni con questi regimi:

1. Segnala l'intersezione come commento YAML (`# regime_correlato: dora`).
2. Lascia un TODO per la futura implementazione.
3. Non aggiungere logica decisionale che dipenda da questi regimi finché non sono attivati.
