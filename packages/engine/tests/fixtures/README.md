# Fixtures — scenari golden del NIS2 Tool

25 scenari golden congelati che esercitano il corpus **v0.8.0** (wizard + sectors + signals + regimes + catalogo eccezioni).

## Posizione
Da S2 i file vivono in `packages/engine/tests/fixtures/` (test del decision engine). I `corpus_ref` restano relativi alla radice del corpus (`packages/corpus/corpus/`), non al monorepo.

## Schema di ogni file
- `scenario_id`, `name`, `description_it`
- `corpus_version`: versione del corpus contro cui l'esito è atteso
- `sector`: wizard/settore di ingresso
- `inputs`: input serializzati campo per campo con gli **ID reali del wizard** (`psnc`/`dora`/`cloud_pa` dal blocco disambiguation; ID sector-specific; `dimension` per lo `standard_identification`; assente per la PA size-blind)
- `expected`: `assessment_mode` (vocabolario del Verdict: `categorical_assessment` | `qualitative_signal_only` | `out_of_scope` | `escalate_to_advisor`), `verdict_outcome` (`likely_in_scope` | `likely_out_of_scope` | `ambiguous`), eventuale `qualifica`/`qualifica_inferita`, `signals` attesi, `notices` attesi (id del catalogo eccezioni, ADR 0012; assente = nessun avviso verificato dalla fixture), `regime_routing`: lista sempre presente, `[]` se nessun routing, un elemento (`regime`, `routing_effect`, `residual_nis_obligation`, `exceptions_catalog_entry`) per ogni override che matcha, nell'ordine del file di settore (ADR 0009, amendment 2026-10-27), `corpus_ref` (path reali con prefisso: `sectors/sectors__*.yaml`, `wizard/wizard__*.yaml`, `exceptions/exceptions__catalog.yaml`; per le fixture PA da 0.5.0 anche domande, opzioni e voci del catalogo)
- `citations`: **citation ID del corpus** (NON wikilink)

## Note
- Per gli scenari instradati a un regime (override PSNC: E07, E08, E21; Cloud PA nel percorso PA: E20; E22 con due regimi) vale ADR 0009: i file `regimes/*.yaml` sono `routing_only_v0_1` e dichiarano nel `meta` `assessment_mode: escalate_to_advisor` e `verdict_outcome: ambiguous`, che l'engine copia attraverso il `reference` dell'override. Ogni elemento di `regime_routing` riporta i valori del `meta` del regime, nell'ordine degli override del file di settore (posizionale, non precedenza); in E22 l'esito resta quello di `multi_regime_intersection` del wizard PA (`residual_nis_obligation: null` = non attestato nel corpus, non "nessuno").
- ADR 0014 (corpus 0.6.0): le domande `dora` e `cloud_pa` non instradano più nei settori cloud ed energia; con "sì" aggiungono avvisi di catalogo (E05, E06, E08). La PA non risponde a `cloud_pa` (`excluded_common_questions`).
- ADR 0015 (corpus 0.6.0): tutte le fixture rispondono a `soggetto_critico` (fase `standard_identification`, anche per la PA); E23 ed E24 la esercitano.
- `dimension` è la domanda della fase `standard_identification` in `wizard/wizard__disambiguation.yaml` (corpus 0.3.0); il follow-up di pertinenza pubblica ha ID `tipo_partecipazione_pubblica` in energia (E14, da 0.3.0) e in cloud (da 0.3.1).
- PA (corpus 0.5.0, ADR 0011): le lettere a)-d) dell'Allegato III hanno verdetto categoriale; le fixture PA rispondono anche a `classificazione_cloud_pa` (C5) e verificano gli avvisi `notices`.
- DIV-P1 (esoneri DORA) è chiusa in v0.2.1. Da 0.6.0 gli esoneri della Det. 127437/2026 sono un avviso di catalogo (E06), non un instradamento: l'art. 3 c. 14 riguarda i soli settori 3 e 4 dell'Allegato I (ADR 0014).

## Indice
- E01 cloud_grande_nessun_regime
- E02 energia_media_fatturato_complessivo (regola fatturato `A1.2`)
- E03 cloud_micro_out
- E04 energia_gestore_ricarica_pun_no (variante PUN "no")
- E05 cloud_pa_fornitore_qualificato (ADR 0014; era cloud_pa_model_substitution)
- E06 dora_entita_finanziaria_cloud (ADR 0014; era dora_massive_disapplication)
- E07 psnc_category_override
- E08 cloud_psnc_e_cloud_pa (ADR 0014; era multi_regime_escalate)
- E09 pa_categoria_c_importante
- E10 pa_categoria_a_essenziale (ADR 0011; era pa_categoria_a_signal_inferito)
- E11 pa_allegato_iv_inhouse_ambiguous
- E12 pa_asl_doppia_identita
- E13 cloud_msp_multi_identity
- E14 energia_multi_tipologia_pubblica
- E15 energia_gestore_ricarica_pun_si (variante PUN "sì")
- E16 pa_lett_d_ente_ricerca (lett. d) 5)
- E17 pa_lett_d_ente_culturale (lett. d) 4)
- E18 pa_lett_b_regione (importante, avviso art. 6 c. 2)
- E19 pa_esclusa_art_4_c_2 (likely_out_of_scope)
- E20 pa_cloud_pa_override (C5, regime_routing [cloud_pa])
- E21 pa_categoria_a_psnc (override PSNC della PA, ADR 0014)
- E22 pa_psnc_e_cloud_pa (intersezione nel percorso PA, regime_routing [cloud_pa, psnc])
- E23 energia_micro_soggetto_critico (ADR 0015, essenziale)
- E24 cloud_media_soggetto_critico (ADR 0015, essenziale)
- E25 energia_produttore_cliente_attivo (C-E2, FAQ A1.1.a.4)

## Controllo
`pnpm corpus:validate` (package `@nis2-check/corpus`): schema zod del corpus e delle fixture, invarianti incrociate, risoluzione dei `corpus_ref`, lint dei `yes`/`no` non quotati. I test dell'engine (`pnpm --filter @nis2-check/engine test`) eseguono le fixture, non ne ricontrollano la forma.
