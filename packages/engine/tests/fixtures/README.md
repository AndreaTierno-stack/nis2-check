# Fixtures — scenari golden del NIS2 Tool

15 scenari golden congelati che esercitano il corpus **v0.4.0** (wizard + sectors + signals + regimes).

## Posizione
Da S2 i file vivono in `packages/engine/tests/fixtures/` (test del decision engine). I `corpus_ref` restano relativi alla radice del corpus (`packages/corpus/corpus/`), non al monorepo.

## Schema di ogni file
- `scenario_id`, `name`, `description_it`
- `corpus_version`: versione del corpus contro cui l'esito è atteso
- `sector`: wizard/settore di ingresso
- `inputs`: input serializzati campo per campo con gli **ID reali del wizard** (`psnc`/`dora`/`cloud_pa` dal blocco disambiguation; ID sector-specific; `dimension` per lo `standard_identification`; assente per la PA size-blind)
- `expected`: `assessment_mode` (vocabolario del Verdict: `categorical_assessment` | `qualitative_signal_only` | `out_of_scope` | `escalate_to_advisor`), `verdict_outcome` (`likely_in_scope` | `likely_out_of_scope` | `ambiguous`), eventuale `qualifica`/`qualifica_inferita`, `signals` attesi, `regime_routing`: lista sempre presente, `[]` se nessun routing, un elemento (`regime`, `routing_effect`, `residual_nis_obligation`, `exceptions_catalog_entry`) per ogni override che matcha, nell'ordine del file di settore (ADR 0009, amendment 2026-10-27), `corpus_ref` (path reali con prefisso: `sectors/sectors__*.yaml`, `wizard/wizard__*.yaml`)
- `citations`: **citation ID del corpus** (NON wikilink)

## Note
- Per gli scenari instradati a un regime (override: E05, E06, E07; E08 con due regimi) vale ADR 0009 (corpus 0.3.0, amendment in 0.3.1): i file `regimes/*.yaml` sono `routing_only_v0_1` e dichiarano nel `meta` `assessment_mode: escalate_to_advisor` e `verdict_outcome: ambiguous`, che l'engine copia attraverso il `reference` dell'override. Ogni elemento di `regime_routing` riporta i valori del `meta` del regime; in E08 l'esito resta quello di `multi_regime_intersection` (`residual_nis_obligation: null` = non attestato nel corpus, non "nessuno"). Superato il precedente `derived_from: override_routing` (ADR 0002, nota override).
- `dimension` è la domanda della fase `standard_identification` in `wizard/wizard__disambiguation.yaml` (corpus 0.3.0); il follow-up di pertinenza pubblica ha ID `tipo_partecipazione_pubblica` in energia (E14, da 0.3.0) e in cloud (da 0.3.1).
- DIV-P1 (esoneri DORA) è **chiusa** in v0.2.1: E06 porta `open_points: []` e cita i commi verificati (art. 7 c. 6, art. 16 c. 13, art. 20 c. 6 Det. 127437/2026). Vedi CHANGELOG [0.2.1] e ADR 0007.

## Indice
- E01 cloud_grande_nessun_regime
- E02 energia_media_fatturato_complessivo (regola fatturato `A1.2`)
- E03 cloud_micro_out
- E04 energia_gestore_ricarica_pun_no (variante PUN "no")
- E05 cloud_pa_model_substitution
- E06 dora_massive_disapplication
- E07 psnc_category_override
- E08 multi_regime_escalate
- E09 pa_categoria_c_importante
- E10 pa_categoria_a_signal_inferito
- E11 pa_allegato_iv_inhouse_ambiguous
- E12 pa_asl_doppia_identita
- E13 cloud_msp_multi_identity
- E14 energia_multi_tipologia_pubblica
- E15 energia_gestore_ricarica_pun_si (variante PUN "sì")

## Controllo
`pnpm corpus:validate` (package `@nis2-check/corpus`): schema zod del corpus e delle fixture, invarianti incrociate, risoluzione dei `corpus_ref`, lint dei `yes`/`no` non quotati. I test dell'engine (`pnpm --filter @nis2-check/engine test`) eseguono le fixture, non ne ricontrollano la forma.
