# Fixtures — scenari golden del NIS2 Tool

15 scenari golden congelati che esercitano il corpus **v0.2.1** (wizard + sectors + signals + regimes).

## Destinazione futura
Questi file sono qui in via provvisoria, **accanto a `corpus/`**. La destinazione definitiva è `packages/engine/tests/fixtures/` (test del decision engine). Spostarli lì quando il package engine sarà inizializzato.

## Schema di ogni file
- `scenario_id`, `name`, `description_it`
- `corpus_version`: versione del corpus contro cui l'esito è atteso
- `sector`: wizard/settore di ingresso
- `inputs`: input serializzati campo per campo con gli **ID reali del wizard** (`psnc`/`dora`/`cloud_pa` dal blocco disambiguation; ID sector-specific; `dimension` per lo `standard_identification`; assente per la PA size-blind)
- `expected`: `assessment_mode` (vocabolario corpus: `categorical_assessment` | `qualitative_signal_only` | `out_of_scope` | `escalate_to_advisor` | `<override_kind>`), `verdict_outcome` (`likely_in_scope` | `likely_out_of_scope` | `ambiguous`), eventuale `qualifica`/`qualifica_inferita`, `signals` attesi, `corpus_ref`
- `citations`: **citation ID del corpus** (NON wikilink)

## Note
- Per gli scenari instradati a un regime (override), i file `regimes/*.yaml` sono `routing_only_v0_1`: il `verdict_outcome` atteso è `derived_from: override_routing` (semantica dell'override), non un campo `verdict_outcome` presente nel corpus.
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
