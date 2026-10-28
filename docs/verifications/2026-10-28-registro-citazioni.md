# Verifica di attestazione: registro citazioni del corpus 0.6.0 (2026-10-28)

> Audit di un subagente della sessione corpus 0.6.0 (sola lettura su KB e repo), scritto qui prima del report in chat (regola di CLAUDE.md). Righe verificate con `grep -n` sui nodi della KB a HEAD e9f5913 (dopo DEC-008); fedeltà riscontrata sui PDF in `raw/` estratti con `pdftotext -enc UTF-8`. Le decisioni prese in sessione su ciascun punto sono nella colonna "Esito in 0.6.0".

## Sintesi

- ID richiesti: 66 (43 già usati nel corpus 0.5.0 e non registrati, 23 nuovi o rinominati). Attestati: 57; non attestati alla granularità indicata: 9.
- Le 8 voci registrate in 0.5.0 puntavano a righe superate: il commit KB 55d69b7 ha spostato il nodo D.Lgs. 138/2024 di 5 righe.
- Nodi usati: tutti `scope: both`, tranne `sources/Regolamento di esecuzione UE 2024-2690.md` (`nis2_tool`). Nessun nodo `grc_personal`.
- Registro finale 0.6.0: 67 voci (le 8 di 0.5.0 riallineate, 57 dalla bozza, 2 aggiunte in sessione: `det_piattaforma_127437_2026_art_11_c_2`, `faq_a1_9_3`).

## Righe delle voci 0.5.0

| ID | Riga in 0.5.0 | Riga corretta |
|---|---|---|
| `dlgs_138_2024_art_3_c_7`, `dlgs_138_2024_art_40_c_2_lett_b` | 34 | 39 |
| `dlgs_138_2024_art_4_c_2`, `dlgs_138_2024_art_4_c_3` | 35 | 40 |
| `dlgs_138_2024_art_6_c_1_lett_e`, `_c_2`, `_c_3` | 36 | 41 |
| `dlgs_138_2024_art_40_c_5_lett_a` | 8, 36 | 8, 41, 62 (la riga 62 ne riporta ora il testo) |

## ID non attestati

| ID | Motivo | Esito in 0.6.0 |
|---|---|---|
| `dlgs_138_2024_art_13` | L'art. 13 del decreto è il "Quadro nazionale di gestione delle crisi informatiche"; la procedura di individuazione dei soggetti dell'Allegato IV è l'art. 3 c. 13 (nodo D.Lgs., riga 28). Origine probabile: "artt. 3 c. 8 e 13" nella KB (FAQ Settori, righe 217 e 242), dove la FAQ ufficiale dice "articolo 3, commi 8 e 13" | Sostituito con `dlgs_138_2024_art_3_c_13` in due signal e in E11; testo "art. 3 cc. 8 e 13" |
| `dlgs_138_2024_art_3_c_1` | Contenuto alla riga 26 del nodo D.Lgs., senza il numero di comma | Non introdotto: `copertura_settoriale_parziale` cita `dlgs_138_2024_art_3` |
| `dlgs_138_2024_art_7_c_1_lett_d` | Nessuna riga KB; il testo è nel PDF | Non introdotto (C-E4) |
| `det_piattaforma_127437_2026_art_11_c_2_lett_g` | La riga 50 del nodo attesta il c. 2 (contenuto della dichiarazione, comprese le tipologie degli Allegati I-IV), non la lettera | Degradato a `det_piattaforma_127437_2026_art_11_c_2` (C-E4) |
| `faq_gen_6` | Il nodo riporta GEN.6 come sintesi degli obblighi; il passo "selezionare uno o più settori/sottosettori … e la relativa tipologia" è solo nel PDF | Non introdotto (C-E4) |
| `faq_a1_8_1` | Contenuto alle righe 88-96 sotto l'intervallo "A1.8.1–A1.8.6" (riga 86), non sotto il codice | Non introdotto: `faq_settori_cloud` → `faq_settori_sottosettori` (C-C2) |
| `faq_a1_9_1` | Stesso caso, intervallo "A1.9.1–A1.9.9" (riga 114) | Non introdotto: tipologia MSP citata con `faq_a1_9_3`, `faq_a1_9_4` |
| `faq_a1_9_3` (per l'interconnessione) | Il codice è attestato (riga 125, definizione per esempi), ma la KB mette l'interconnessione diretta sotto A1.9.2 (righe 118-123, 265); il PDF la riporta in entrambi i codici | Criterio citato con `faq_a1_9_2`; `faq_a1_9_3` registrato per la definizione per esempi |
| `dir_nis2_art_26` | Nessuna riga KB; la giurisdizione è attestata solo per l'art. 5 del D.Lgs. (FAQ Ambito, righe 202-209) | `nis2_art_26` rimosso dal corpus; resta `dlgs_138_2024_art_5` |

## Casi particolari tra gli attestati

- `dir_nis2_art_6_30`: il nodo Direttiva dice solo "Articolo 6 — 41 definizioni" (riga 34); il punto 30 è attestato nel nodo D.Lgs., riga 63 ("Coincide con l'art. 6 punto 30) della direttiva").
- `det_acn_155238_2026_art_2_c_3`: la riga 67 nomina "art. 2 cc. 2-3"; il nodo "Allegato 2 modello" (riga 16) nomina il c. 3 da solo.
- `faq_a1_8_2`: attestato in FAQ Categorizzazione, riga 113; nel nodo FAQ Settori c'è solo l'intervallo A1.8.2–A1.8.3.
- Art. 3 cc. 4 e 12: attestati nel concept "Clausola di salvaguardia" (righe 26 e 32), non nel nodo D.Lgs.
- Atti non in `raw/` (attestazione chiusa con "Fonte non in raw/"): DD ACN 21007/24, DM MASE 106/2023, Dir. UE 2019/944, D.Lgs. 134/2024, D.Lgs. 175/2016, DPCM 221/2024, Racc. UE 2003/361, Reg. UE 2022/2554, D.L. 105/2019, L. 196/2009.

## Righe KB in contrasto con l'uso nel corpus 0.5.0

| # | Corpus 0.5.0 | KB / testo | Esito in 0.6.0 |
|---|---|---|---|
| 1 | "Registrazione separata per ciascuna tipologia" (segnali e domande) | Le fonti indicano un'unica dichiarazione che elenca più tipologie: art. 7 c. 1 lett. d) del decreto, det. piattaforma art. 11 c. 2 lett. g), FAQ GEN.6 | Corretto (C-E4) |
| 2 | ASL "registrazione separata per ciascuna identità" | KB riga 234 "Doppia registrazione"; FAQ A3.c.4.1: obbligo per entrambi i settori e le tipologie | Corretto nel corpus; imprecisione KB da segnalare a monte |
| 3 | ASL "essenziale se di dimensione medio-grande" | FAQ A3.c.4.1: essenziale solo se supera i massimali della media impresa | Corretto nel corpus |
| 4 | `allegato_iv_individuazione`: i criteri di A4.3.3 come criteri generali dell'Allegato IV | A4.3.3 vale per i soggetti culturali su proposta del MiC; A4.3.4 per tutto l'Allegato IV | Non corretto (fuori dalle modifiche decise): punto aperto |
| 5 | `l90_cumulo` attivo per le società elettriche a controllo pubblico | L. 90 art. 1 c. 1 (KB riga 36): in house solo per servizi informatici, trasporto, acque reflue, rifiuti | Corretto (C-E5) |
| 6 | Soggetti critici come regime parallelo | Art. 3 c. 5 lett. a), art. 6 c. 1 lett. b), FAQ AMB.NO.1 | Corretto (ADR 0015) |

## Correzioni minime proposte alla KB (non eseguite)

1. "(c. 1)" alla riga 26 del nodo D.Lgs. 138/2024.
2. Etichette `A1.8.1` (riga 88) e `A1.9.1` (riga 114) nella FAQ Settori.
3. "art. 3 cc. 8 e 13" alle righe 217 e 242 della FAQ Settori.
4. "(lett. g)" alla riga 50 della Det. piattaforma; art. 7 c. 1 lett. d) nel nodo D.Lgs.; passo di GEN.6 sulla selezione delle tipologie nel nodo FAQ Profili generali.
5. Interconnessione diretta anche sotto A1.9.3 (riga 125 della FAQ Settori).
6. FAQ Settori riga 234: "Doppia registrazione" → registrazione per entrambi i settori e le tipologie.
7. Art. 26 della direttiva nel nodo Direttiva, se serve citarlo.
