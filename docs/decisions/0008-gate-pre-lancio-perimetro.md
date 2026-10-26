# ADR 0008: Perimetro del gate pre-lancio, solo tool, KB esente

- **Stato:** accettato
- **Data:** 2026-10-26
- **Ambito:** processo di rilascio pubblico (KB `nis2-knowledge-it` e tool `nis2-check`)

## Contesto

Il gate pre-lancio prevede, prima di ogni release pubblica del tool, la review di un
consulente GRC italiano terzo (5 scenari scelti dal consulente, OK informale citabile,
elenco scritto delle eccezioni non gestite) e, su binario separato, la review legale del
disclaimer. Dal 2026-07-02 era aperta la decisione sul perimetro: A (gate anche sulla KB),
B (solo tool, KB esente), C (gate eliminato).

La KB è il prodotto primario e il suo lancio pubblico fissa T0, l'ancora del calendario di
posizionamento. Tra il 2026-07-02 e il 2026-10-26 non c'è stata attività: il costo della
decisione non presa è stato di 16 settimane senza alcun artefatto pubblico.

## Decisione

**Opzione B.** Il gate con reviewer GRC terzo si applica al tool e non alla KB.

Motivazione: la KB non produce esiti su input di terzi; pubblica una lettura strutturata di
fonti ufficiali pubbliche, con disclaimer, licenza CC-BY-4.0 e stato di verifica dichiarato
nodo per nodo. Il rischio che un reviewer mitigherebbe (un esito sbagliato presentato a un
utente non esperto) non esiste nella KB; esiste nel tool.

Condizioni di esenzione della KB, tutte verificabili nel repo:
1. README pubblico con disclaimer di non-consulenza (bozza operativa, soggetta alla review
   legale sul binario del tool) e sezione "Stato di verifica" che elenca i marcatori aperti,
   le attribuzioni di protocollo non attestate, i riferimenti non ingeriti e i nodi stub.
2. `raw/` e `_tmp/` mai pubblicati; nessuna provenienza non ufficiale nel repo.
3. Nessun nodo con riferimenti personali dell'autore non generalizzati.

Perimetro del gate sul tool, precisato: si applica a ogni istanza del tool raggiungibile da
terzi (deploy) e a ogni tag di release a partire da v0.1.0. Rendere pubblico il repository
`nis2-check` senza un deploy e senza tag di release è un pre-rilascio di solo codice e non
attiva il gate, a condizione che il README dichiari "non rilasciato, non utilizzare".

## Alternative scartate

- **A, gate anche sulla KB.** Costo: 4-6 settimane minime per identificare e coinvolgere
  un reviewer su 103 nodi, con effort del reviewer non proporzionato a un contenuto che non
  emette esiti. Con il ritmo osservato, il percorso a più alta probabilità di non lanciare.
- **C, gate eliminato anche per il tool.** La review terza sui 5 scenari è il contenuto del
  secondo articolo della narrativa e l'unica attestazione esterna del metodo; eliminarla
  toglie valore e aumenta il rischio sull'unico artefatto che produce esiti.

## Conseguenze

- Il punto aperto 3 di STATUS.md si chiude sulla parte "decisione"; resta aperta la parte
  "identificazione e contatto reviewer", da avviare quando l'engine passa le fixture golden.
- T0 può avvenire senza reviewer. Il timer dei segnali GRC (T0+10 settimane) parte alla
  pubblicazione del post di lancio.
- La KB registra la decisione come DEC-005 in `_meta/decision_log.md`.
- Al passaggio da regime hobbista a professionale la decisione va rivalutata.

## Fonti

- `docs/STATUS.md` (voce "Gate pre-lancio", 2026-07-02 e 2026-10-26)
- Custom Instructions del Project, sezione "Gate pre-lancio pubblico"
