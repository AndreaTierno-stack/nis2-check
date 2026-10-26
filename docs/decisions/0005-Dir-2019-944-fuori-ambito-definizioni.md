# ADR 0005 — Direttiva (UE) 2019/944: base UE del settore, non fonte di definizioni nel corpus

- **Stato:** accettato
- **Data:** 2026-07-02
- **Ambito:** citazioni settore energia / KB FAQ Settori

## Contesto

Il settore elettrico ha come base unionale la Direttiva (UE) 2019/944 (Clean
Energy Package), citata come `dir_ue_2019_944` nelle `tipologie` di
`sectors__energia_elettrica.yaml`. È forte la tentazione di importare nel corpus,
o nell'arricchimento della KB (FAQ Settori), le definizioni di dettaglio della
2019/944 (TSO, DSO, aggregatore, ecc.) per rendere più preciso lo scoping delle
tipologie elettriche.

## Decisione

**Non importare le definizioni di dettaglio della Dir. 2019/944** né nel corpus
né nell'arricchimento KB. La 2019/944 resta citata come **base UE del settore**
(riferimento di provenienza della tipologia), ma la mappatura operativa
tipologia→scoping si fonda esclusivamente sui **codici FAQ Settori** attestati
(`A1.1.a.1` lista generale, `A1.1.a.2` venditori domestici, `A1.1.a.3` punti di
ricarica su PUN, `A1.1.a.4` esclusione prosumer).

Motivazione: la regola di autorità del progetto vieta citazioni con granularità
non verificata. Le definizioni della 2019/944 non sono state ingerite/attestate
come fonte del corpus; usarle come base di scoping introdurrebbe granularità non
verificata. I codici FAQ, invece, sono attestati nella fonte "FAQ NIS - Settori".

## Conseguenze

- L'arricchimento A3 della KB ("Mappa tipologia → codice FAQ") mappa le tipologie
  ai soli codici `A1.1.a.*`, senza definizioni 2019/944.
- Lo scoping del gestore punti di ricarica dipende dal PUN (A1.1.a.3 + DM MASE
  106/2023), non dalla nozione di "recharging point operator" della 2019/944.

## Fonti

- `dir_ue_2019_944` (base UE, riferimento di provenienza)
- `faq_a1_1_a_1`, `faq_a1_1_a_2`, `faq_a1_1_a_3`, `faq_a1_1_a_4` (scoping attestato)
