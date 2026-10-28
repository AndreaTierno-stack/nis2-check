# ADR 0015 — Soggetti critici (D.Lgs. 134/2024): essenziali a prescindere dalla dimensione

- **Stato:** accettato
- **Data:** 2026-10-28
- **Ambito:** corpus (questionario comune, regole di cloud, energia e PA, signal, catalogo), schema
- **Versione corpus:** 0.6.0
- **Supera:** ADR 0004 nella parte che descrive il D.Lgs. 134/2024 come "regime parallelo
  e distinto dal NIS2" il cui rientro "non è valutato" (il vincolo di naming resta)
- **Chiude:** punto aperto 19 di `docs/STATUS.md` (allineamento del corpus a DEC-008)
- **Base:** `docs/verifications/2026-10-28-cloud-energia-dora.md`, punti 2 e 4; KB DEC-008

## Contesto

Fino al corpus 0.5.0 i soggetti critici erano un caso `out_of_scope_mvp` dell'energia
(`cer_dlgs_134_2024`, `verdict_outcome: ambiguous`) e un signal segnaposto mai attivato
(`cer_signal`), descritti come "regime parallelo e distinto dal NIS2". Il testo dice
altro:

- art. 3 c. 5 lett. a) D.Lgs. 138/2024: il decreto si applica, "indipendentemente dalle
  loro dimensioni", ai soggetti identificati come soggetti critici ai sensi del decreto
  che recepisce la direttiva (UE) 2022/2557;
- art. 6 c. 1 lett. b): sono essenziali, "indipendentemente dalle loro dimensioni", i
  soggetti identificati come soggetti critici;
- FAQ AMB.NO.1: "tutte le organizzazioni individuate quali soggetti critici … sono
  soggetti essenziali"; la qualifica si acquisisce con l'inserimento nel DPCM che reca
  l'elenco dei soggetti critici, con notizia al soggetto.

Conseguenza nel corpus 0.5.0: una micro o piccola impresa elettrica individuata come
soggetto critico riceveva `likely_out_of_scope`, una media impresa la qualifica di
importante. La KB ha corretto la stessa omissione in 7 nodi (DEC-008).

## Decisione

1. **Domanda comune** `soggetto_critico` nella fase `standard_identification`
   (`wizard__disambiguation.yaml`, prima di `dimension`): "Il soggetto è stato
   individuato come soggetto critico ai sensi del D.Lgs. 134/2024?". Citazioni:
   `dlgs_138_2024_art_3_c_5_lett_a`, `dlgs_138_2024_art_6_c_1_lett_b`, `faq_amb_no_1`.
   Con "sì" attiva `cer_signal`.
2. **Regole.** Con "sì": `categorical_assessment` → `likely_in_scope`, qualifica
   **essenziale**, indipendente dalla dimensione.
   - Cloud ed energia: regola `soggetto_critico == yes`; le tre regole dimensionali
     valgono con `soggetto_critico == no` (condizioni mutuamente esclusive, nessuna
     precedenza implicita tra regole).
   - PA: la qualifica essenziale prevale sull'importante delle lett. b)-d) (l'art. 6
     c. 3 riguarda i soggetti non essenziali ai sensi dei cc. 1-2): regole
     `categoria_pa == b|c|d AND soggetto_critico == yes`; le regole esistenti di b)-d)
     valgono con `soggetto_critico == no`. La lett. a) è già essenziale (art. 6 c. 1
     lett. e)) e non cambia.
3. **Percorso PA.** Il wizard PA ha ora la fase `standard_identification`, per la sola
   `soggetto_critico`: `dimension` è esclusa con `excluded_common_questions` (campo
   nuovo, ADR 0014). L'esclusione resta strutturale, non condizionale (ADR 0010).
4. **Signal e catalogo.** `cer_signal` riscritto: l'individuazione porta il soggetto in
   ambito NIS come essenziale, la disciplina dei soggetti critici resta distinta e si
   aggiunge; da non confondere con le comunità energetiche rinnovabili (CACER).
   Rimosso `out_of_scope_mvp.cer_dlgs_134_2024`. Nuova voce di catalogo
   `soggetti_critici_dlgs_134_2024_art_3_c_5_lett_a`, `gestito`.

## Alternative scartate

- **Gate di disambiguazione.** Un soggetto critico non è instradato a un regime: la
  qualifica è NIS, e l'esito è categoriale. Il posto è l'identificazione standard,
  accanto alla dimensione che sostituisce.
- **Solo un avviso sulla regola micro/piccola.** Lascerebbe `likely_out_of_scope` per un
  soggetto che il testo pone in ambito come essenziale.
- **Domanda solo per l'energia.** Art. 3 c. 5 lett. a) e FAQ AMB.NO.1 non distinguono per
  settore.

## Conseguenze

- Fixture nuove: E23 (micro impresa elettrica soggetto critico → essenziale), E24 (media
  impresa cloud soggetto critico → essenziale). Tutte le fixture rispondono a
  `soggetto_critico` ("no" dove non esercitata); i `corpus_ref` delle regole
  dimensionali e PA b)-d) riportano la condizione completa.
- Non modellato: soggetto critico nel canale Allegato IV (`categoria_pa ==
  canale_allegato_iv`), che resta `ambiguous`; soggetto critico tra i soggetti dell'art. 4
  c. 2.
- Il vincolo di naming di ADR 0004 resta in vigore.

## Fonti

- `dlgs_138_2024_art_3_c_5_lett_a`, `dlgs_138_2024_art_6_c_1_lett_b`, `faq_amb_no_1`,
  `dlgs_134_2024`
- KB: `[[sources/D.Lgs. 138-2024 (Decreto NIS)]]`, `[[sources/FAQ NIS - Ambito]]` (DEC-008)
