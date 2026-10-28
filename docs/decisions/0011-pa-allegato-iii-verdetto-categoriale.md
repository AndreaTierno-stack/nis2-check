# ADR 0011 — PA dell'Allegato III: verdetto categoriale per le lettere a)-d)

- **Stato:** accettato
- **Data:** 2026-10-28
- **Ambito:** corpus, settore `pubblica_amministrazione` (regole, questionario)
- **Versione corpus:** 0.5.0
- **Supera:** la "strada 3" per la PA (ADR 0002, paragrafo sul `qualitative_signal_only`;
  `out_of_scope_mvp.pa_categoria_a_b_d_verdetto_categoriale` in corpus ≤ 0.4.0)
- **Chiude:** punto aperto 13 di `docs/STATUS.md` (pacchetto C1-C6); supera il punto 7

## Contesto

Fino al corpus 0.4.0 solo la lettera c) dell'Allegato III aveva un verdetto
categoriale (`categorical_assessment`, importante). Le lettere a), b) e d) erano
`qualitative_signal_only` con `qualifica_inferita` ("strada 3"): la qualifica era
"ricostruita dall'architettura del decreto e non da una fonte normativa puntuale già
verificata", e il verdetto categoriale era differito a v0.2, previo ingest di una
"determinazione ACN identificativa delle PA NIS". La lettera b) portava inoltre una
qualifica inferita essenziale e la lettera d) copriva solo gli enti a struttura
associativa.

Il 2026-10-27 il D.Lgs. 138/2024 è stato riscontrato parola per parola su Normattiva
(DEC-007 A): Allegato III, art. 3 cc. 6-7, art. 4 cc. 2-3, art. 6 cc. 1-3, art. 40 c. 2
lett. b) e c. 5 lett. a), riportati nel nodo KB `sources/D.Lgs. 138-2024 (Decreto NIS)`
(righe 8 e 25-36). La premessa della strada 3, cioè l'assenza di una fonte puntuale,
non regge più.

## Decisione

1. **Rientro per legge.** La PA dell'Allegato III lett. a)-d) rientra
   indipendentemente dalla dimensione (art. 3 c. 6): tutte e quattro le lettere hanno
   `assessment_mode: categorical_assessment` → `verdict_outcome: likely_in_scope`.
2. **Qualifiche.**
   - lett. a): **essenziale** (art. 6 c. 1 lett. e));
   - lett. b), c), d): **importante** (art. 6 c. 3), con avviso nel verdetto: "la
     qualifica può essere elevata a essenziale con individuazione dell'ACN (art. 6
     c. 2)" (voce di catalogo `pa_qualifica_elevabile_art_6_c_2`, ADR 0012).
3. **Soggetti non ricompresi (art. 4 c. 2).** Nuova opzione di `categoria_pa`
   `esclusa_art_4_c_2` (Parlamento italiano, Autorità giudiziaria, Banca d'Italia, Unità
   di informazione finanziaria per l'Italia) → `out_of_scope` / `likely_out_of_scope`.
   Per gli organi costituzionali e di rilievo costituzionale che rientrano, avviso sulla
   non applicazione del Capo V (seconda parte del c. 2), senza modellarla.
4. **Questionario.** Etichette di `categoria_pa` con i sottotipi testuali
   dell'Allegato III ("agenzia statale" sparisce: lett. a) 3 sono le Agenzie fiscali);
   nuova domanda `sottotipo_d` (6 opzioni, lett. d) 1-6). Il canale Allegato IV resta
   un'opzione alternativa alle lettere a)-d) della stessa domanda a scelta singola: è
   raggiungibile solo da chi non si indica come PA dell'Allegato III.
5. **Cloud PA nel percorso PA (C5).** Il trigger dell'override del settore diventa la
   condizione dell'override stesso: domanda `classificazione_cloud_pa` ("l'amministrazione
   ha classificato i propri dati e servizi digitali ai sensi del Regolamento Cloud?"),
   con le citazioni dell'override (`dd_acn_21007_24_art_3`, `det_acn_155238_2026_art_4`).
   La domanda comune `cloud_pa` resta per i fornitori.
6. **Trace (C6).** Il rinvio alla "determinazione ACN identificativa delle PA NIS" (atto
   non presente nel vault) è sostituito dall'art. 40 c. 5 lett. a) (elenco dei soggetti
   essenziali e importanti stabilito con determinazione ACN).

## Alternative scartate

- **Mantenere la strada 3 fino all'ingest di una determinazione ACN.** La qualifica
  delle lettere a)-d) discende dal decreto (art. 6 cc. 1-3), già riscontrato: la
  determinazione dell'art. 40 c. 5 lett. a) stabilisce l'elenco dei soggetti, non la
  regola di qualificazione.
- **Qualifica essenziale anche per b), c), d).** L'art. 6 c. 1 lett. e) riguarda solo le
  amministrazioni centrali; per le altre l'essenzialità richiede l'individuazione
  dell'ACN (c. 2): resta un avviso, non una qualifica.

## Conseguenze

- Esiti cambiati: lett. a) da `qualitative_signal_only` (essenziale inferita) a
  `categorical_assessment` essenziale; lett. b) da essenziale inferita a importante
  categoriale; lett. d) da `qualitative_signal_only` (solo enti associativi) a
  `categorical_assessment` importante per tutti e sei i sottotipi. `verdict_outcome`
  resta `likely_in_scope`.
- Fixture: E10 aggiornata; nuove E16 (d.5), E17 (d.4), E18 (b), E19 (art. 4 c. 2), E20
  (Cloud PA nel percorso PA).
- Il campo `qualifica_inferita` resta nello schema ma non è più usato dal settore PA.
- Il cumulo con la L. 90/2024 per la lett. d) resta non attestato: voce di catalogo
  (STATUS 14).

## Fonti

- D.Lgs. 138/2024, Allegato III, art. 3 cc. 6-7, art. 4 cc. 2-3, art. 6 cc. 1-3, art. 40
  c. 2 lett. b) e c. 5 lett. a): riscontro Normattiva 2026-10-27 (DEC-007 A); nodo KB
  `wiki/sources/D.Lgs. 138-2024 (Decreto NIS).md`, righe 8 e 25-36; registro
  `packages/corpus/corpus/citations/citations__registry.yaml`.
