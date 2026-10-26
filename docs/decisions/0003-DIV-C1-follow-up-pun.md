# ADR 0003 — DIV-C1: Domanda di follow-up PUN per i gestori di punti di ricarica

- **Stato:** accettato
- **Data:** 2026-07-02
- **Ambito:** wizard energia elettrica
- **Codice divergenza:** DIV-C1

## Contesto

La tipologia elettrica `gestore_punti_ricarica` ha uno scoping condizionato
all'obbligo di registrazione sulla Piattaforma Unica Nazionale (PUN), ai sensi
del DM MASE n. 106 del 16/03/2023. La FAQ Settori A1.1.a.3 attesta che i gestori
registrati/obbligati su PUN rientrano, mentre i punti vendita con ricarica non
obbligati alla registrazione **"non rientrano automaticamente"** per questo solo
titolo.

Il punto delicato: "non rientra automaticamente" **non è** un'esclusione
categoriale. Trattarlo come `out_of_scope` sovra-affermerebbe rispetto alla fonte.

## Decisione

Aggiungere una domanda condizionale `registrato_pun` (single_select: `si`/`no`/
`non_so`) visibile solo se `tipologia_elettrica == gestore_punti_ricarica OR
attivita_elettriche_ulteriori contains gestore_punti_ricarica`. Mapping esiti:

- **`si`** → `categorical_assessment` / `likely_in_scope` (**provvisorio**: la
  regola dimensionale del settore può rifinirlo; media→importante, grande→essenziale).
- **`no`** → `qualitative_signal_only` / `likely_out_of_scope`. **Non**
  `out_of_scope`: A1.1.a.3 non è esclusione categoriale; il soggetto potrebbe
  rientrare per altra tipologia o per obbligo PUN sopravvenuto. Segnalazione, non
  verdetto di esclusione.
- **`non_so`** → `qualitative_signal_only` / `ambiguous` (invito a verificare
  l'obbligo PUN).

## Conseguenze

- Coppia speculare di fixtures: E15 (PUN "si" → importante per dimensione media),
  E04 (PUN "no" → qualitative_signal_only/likely_out_of_scope).
- Il ramo "no" resta additivo/segnalatorio: non chiude la valutazione come
  un'esclusione dimensionale farebbe.

## Fonti

- `faq_a1_1_a_3` (FAQ Settori, sottosettore elettrico A1.1.a.3)
- `dm_mase_106_2023` (obbligo di registrazione su PUN)
