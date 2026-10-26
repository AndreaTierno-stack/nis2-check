# ADR 0002 — DIV-S2: `verdict_outcome` dichiarativo, copiato senza inferenza

- **Stato:** accettato
- **Data:** 2026-07-02
- **Ambito:** schema del corpus / contratto engine
- **Codice divergenza:** DIV-S2

## Contesto

Il vocabolario di esito del corpus (`assessment_mode`) descrive **come** il
soggetto è valutato (`categorical_assessment`, `qualitative_signal_only`,
`out_of_scope`, `escalate_to_advisor`, `<override_kind>`) ma non dichiara
esplicitamente **se il soggetto è dentro o fuori** l'ambito. Lasciare che
l'engine derivi la direzione dall'`assessment_mode` introdurrebbe logica di
inferenza nell'engine, con rischio di divergenza tra intento del corpus e
comportamento a runtime.

## Decisione

Introdurre un campo **dichiarativo** `verdict_outcome` con vocabolario chiuso:
`likely_in_scope` | `likely_out_of_scope` | `ambiguous`. **L'engine lo copia
verbatim, senza inferirlo.** Il corpus è l'unica fonte di verità della direzione.

Vincoli fissi (validabili staticamente) tra `assessment_mode` e `verdict_outcome`:

| assessment_mode | verdict_outcome |
|---|---|
| `out_of_scope` | `likely_out_of_scope` (fisso) |
| `categorical_assessment` (in-scope) | `likely_in_scope` (fisso) |
| `escalate_to_advisor` | `ambiguous` (fisso) |
| `qualitative_signal_only` | caso per caso (dichiarato per regola) |
| `<override_kind>` (regime) | `derived_from: override_routing` (vedi nota) |

**Nota override.** Per gli scenari instradati a un regime `routing_only_v0_1`, il
`verdict_outcome` atteso non è un valore del vocabolario ma `derived_from:
override_routing`: la direzione discende dalla semantica dell'override, non da un
campo del corpus (il file di regime non contiene ancora logica di
categorizzazione).

Il caso `qualitative_signal_only` è deliberatamente non fisso: per la PA
categorie a/b/d con `qualifica_inferita` il rientro è probabile
(`likely_in_scope`, verdetto categoriale differito a v0.2); per il PUN "no"
(A1.1.a.3) è `likely_out_of_scope`; per canali non self-assessable è `ambiguous`.

## Conseguenze

- Il validatore può verificare i vincoli fissi senza eseguire l'engine.
- I 15 fixtures congelano la coppia (`assessment_mode`, `verdict_outcome`) attesa,
  incluso il caso `derived_from: override_routing` (E05, E06, E07).
- Nessuna inferenza di direzione nell'engine: se il corpus tace, l'esito è un
  errore di corpus, non un default silenzioso.

## Fonti

- Vincolo derivato dalla struttura del corpus (non da fonte normativa esterna).
