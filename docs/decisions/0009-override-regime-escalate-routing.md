# ADR 0009 — Override di regime: escalation dichiarata nel regime + `regimeRouting`

- **Stato:** accettato
- **Data:** 2026-10-27
- **Ambito:** schema del corpus / contratto engine (tipo `Verdict`)
- **Versione corpus:** 0.3.0
- **Supera:** la "Nota override" dell'ADR 0002 (`derived_from: override_routing`)

## Contesto

Le fixture E05 (Cloud PA), E06 (DORA) ed E07 (PSNC) attendevano due valori
estranei al contratto dell'engine:

- un `assessment_mode` fuori vocabolario, pari al *routing effect* del regime
  (`model_substitution`, `massive_disapplication`, `category_override`), mentre
  `AssessmentMode` ammette solo `categorical_assessment` | `qualitative_signal_only`
  | `escalate_to_advisor` | `out_of_scope`;
- un `verdict_outcome` non letterale, `{derived_from: override_routing}`, assente
  dal vocabolario chiuso `VerdictOutcome` (ADR 0002).

In questo stato l'engine non poteva soddisfare le fixture senza inferire l'esito
dalla semantica dell'override, cioè senza violare il vincolo 2 di CLAUDE.md
("`verdict_outcome` si copia, mai si inferisce"). I file `regimes/*.yaml` sono
`routing_only_v0_1`: instradano, non risolvono nel merito.

## Decisione

1. **In v0.1 l'instradamento a un regime è un'escalation.** Ogni file di regime
   dichiara nel proprio `meta`:
   - `assessment_mode: escalate_to_advisor`
   - `verdict_outcome: ambiguous` (invariante escalate → ambiguous)
2. **L'engine copia i due valori attraverso il `reference` dell'override.**
   Quando un override del settore matcha (es. `cloud_pa == yes`), l'engine segue
   `reference: regimes/<id>.yaml` e riporta nel Verdict `assessment_mode` e
   `verdict_outcome` letti dal `meta` del regime. Nessuna inferenza.
3. **Nuovo campo `Verdict.regimeRouting`**, popolato dal `meta` del regime:

   ```ts
   regimeRouting?: {
     regimeId: string;                // meta.regime_id
     routingEffect: 'category_override' | 'massive_disapplication' | 'model_substitution'; // meta.routing_effect
     residualNisObligation?: string;  // meta.residual_nis_obligation (oggi solo DORA)
     exceptionsCatalogEntry: string;  // meta.exceptions_catalog_entry
   };
   ```

   Il *routing effect* resta un dato del Verdict (alimenta Explainability Mode e
   PDF), ma esce da `assessmentMode`.
4. **Vincolo 2 riformulato:** "nessun `verdict_outcome` e nessun `reference` a un
   regime che lo dichiara = errore bloccante". Una voce con esito è valida se
   dichiara `verdict_outcome` **oppure** se è un override il cui `reference` punta
   a un regime che dichiara `assessment_mode` e `verdict_outcome`. La validazione
   zod blocca in build ogni altro caso.

## Alternative scartate

- **Routing effect come valore di `AssessmentMode`.** Mescola un evento (il flusso
  è stato instradato) con un esito (come è valutato il soggetto), e andrebbe
  rimosso in v0.2 quando i regimi saranno risolti nel merito: un cambio
  incompatibile del contratto pianificato in anticipo.
- **Esito letterale duplicato in ogni override.** `assessment_mode` e
  `verdict_outcome` scritti in ogni voce `overrides` dei settori (oggi 6 voci per
  3 regimi). La fonte di verità dell'esito di un regime si sparpaglierebbe nei
  file di settore, con rischio di divergenza a ogni modifica.

## Conseguenze

- E05, E06, E07 attendono `escalate_to_advisor` / `ambiguous` più un blocco
  `regime_routing` con i valori del `meta` del regime (corpus 0.3.0).
- **v0.2 risolve un regime cambiando solo il file del regime**: quando il `meta`
  dichiarerà un esito diverso (o regole di merito), gli override dei settori
  restano invariati.
- Il validatore verifica staticamente: (a) ogni `reference` di override punta a un
  regime esistente; (b) il regime dichiara `assessment_mode` e `verdict_outcome`;
  (c) l'invariante escalate → ambiguous anche sul `meta` del regime.
- Regola di coerenza delle citazioni: le `citations` di un override coincidono con
  quelle del regime referenziato (applicata a DORA in 0.3.0).
- La "Nota override" dell'ADR 0002 (`derived_from: override_routing`) è superata.

## Fonti

- Vincolo derivato dalla struttura del corpus e dal tipo `Verdict` in CLAUDE.md
  (non da fonte normativa esterna).
- `corpus/regimes/{psnc,dora,cloud_pa}.yaml`; fixture E05, E06, E07.

## Amendment 2026-10-27

Corpus 0.3.1. Il corpo dell'ADR resta invariato; le regole seguenti lo
modificano dove contrastano.

1. **`Verdict.regimeRouting` diventa un array** `RegimeRouting[]`, sempre
   presente: vuoto se nessun override di regime matcha; un elemento per ogni
   override che matcha, nell'**ordine in cui gli override compaiono nel file di
   settore**. L'ordine è posizionale, non una precedenza: non esprime quale
   regime prevale.

   ```ts
   interface RegimeRouting {
     regimeId: string;
     routingEffect: 'category_override' | 'massive_disapplication' | 'model_substitution';
     residualNisObligation: string | null;
     exceptionsCatalogEntry: string;
   }
   regimeRouting: RegimeRouting[];
   ```

2. **Semantica di `residual_nis_obligation: null`**: "non attestato nel corpus",
   distinto da "nessun obbligo residuo". Vale oggi per PSNC e Cloud PA, il cui
   `meta` non dichiara il campo. Un regime che non lascia obblighi NIS residui
   andrebbe dichiarato esplicitamente (valore da definire quando servirà, non
   dedotto dall'assenza).

3. **Intersezione multipla** (E08, `psnc == yes AND cloud_pa == yes`): l'esito
   resta quello di `multi_regime_intersection` (`escalate_to_advisor` /
   `ambiguous`); `regimeRouting` elenca entrambi i regimi nell'ordine degli
   override di `sectors__cloud_computing.yaml` (`cloud_pa`, poi `psnc`).

### Alternativa scartata

- **Routing singolo con ordine di priorità tra regimi.** Richiederebbe di
  scegliere quale regime riportare quando più override matchano, cioè una
  precedenza tra regimi che le fonti non attestano (cfr. punto aperto 6 di
  `docs/STATUS.md`, precedenza PSNC / Cloud PA non esplicitata).

### Conseguenze

- Fixture E05, E06, E07: `regime_routing` diventa una lista di un elemento; E08
  una lista di due elementi; le altre fixture dichiarano `regime_routing: []`.
- Il validatore verifica che ogni elemento coincida con il `meta` del regime e
  che l'ordine della lista segua l'ordine degli override nel file di settore.
