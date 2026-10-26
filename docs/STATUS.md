# STATUS — Progetto NIS2 (KB + nis2-check)

> Fonte unica dello stato di avanzamento. Si aggiorna in chiusura di ogni sessione Claude Code
> (data, stato sintetico, punti aperti, una riga di log). Le regole stabili vivono nelle
> Custom Instructions del Project e in CLAUDE.md — qui solo lo stato.

**Aggiornato**: 2026-10-26 · sessione "ADR 0008 gate + repo GitHub"

## Stato sintetico

- **KB**: 103 nodi (40 sources / 17 entities / 39 concepts / 7 synthesis). Scope: 69 `both` / 31 `grc_personal` / 3 `nis2_tool` (post retag Cross-walk → `both`, DEC-002, esecuzione anticipata di ADR 0006). Sweep raw/ completato: identità documentali tutte verificate; 6 source_path morti (`_tmp/*.txt`) **ripuntati ai PDF firmati reali** (vault pulito, 0 residui); duplicato termini archiviato in `raw/_archive/` (DEC-004).
- **Corpus**: v0.2.1. 3 gate (PSNC / DORA / Cloud PA) + segnale cumulativo `l90_cumulo`; `verdict_outcome` dichiarativo su ogni regola; regimi `routing_only_v0_1`; catalogo eccezioni 4 gestite / 8 segnalate / 10 non gestite; 15 fixture golden E01–E15 (corpus_version 0.2.1); ADR 0001–0007.
- **Claude Code config**: CLAUDE.md v2 installato in root; 3 skill (6 file) rigenerate su corpus reale; vecchia bozza in `nis2-claude-config/` superata (non usare). Regola "STATUS.md fonte unica dello stato" aggiunta a CLAUDE.md (sezione CI/CD e workflow).
- **Tool**: codice non iniziato. Repo GitHub creati il 2026-10-26, entrambi privati: nis2-check e nis2-knowledge-it (AndreaTierno-stack). nis2-knowledge-it diventa pubblico a T0; nis2-check resta privato fino al pre-rilascio v0.1.0. (target: `nis2-check` MIT, `nis2-knowledge-it` CC-BY-4.0).
- **Contatore stop-and-ingest**: 1 residuo fino a v0.1.0 (budget 2; consumato: Wave 7).
- **Gate pre-lancio**: DECISO 2026-10-26: opzione B, solo tool, KB esente (ADR 0008). Reviewer da contattare quando l'engine passa le fixture.
- **T0 (lancio pubblico KB): NON ANCORA AVVENUTO** — il timer delle metriche non è partito.

## Punti aperti (in ordine di priorità)

Nota 2026-10-26: nessuna attività sui file tra il 2026-07-02 e il 2026-10-26. Report di riconciliazione completo nella sessione Claude del 2026-10-26.

1. **FASE 0 — post LinkedIn di lancio KB**: pronto dal 23/05 a meno di tre rifiniture (aggiornare a 103 nodi; riga "Legge 90/2024" nella lista documenti; decisione screenshot grafo). Costo 2–3h. Percorso minimo, gate non applicabile. **Avvia T0.**
2. **Caricamento export PK nel Project** (residuo manuale): Export generato il 2026-07-02, upload in Project Knowledge NON eseguito (verificato 2026-10-26: Project Knowledge vuoto).
3. **Identificazione e contatto reviewer GRC (ambiente corso ISO 27001)**: Decisione perimetro CHIUSA (ADR 0008). Contatto: non avviato, parte a engine verde sulle fixture.
4. **Scaffolding monorepo + CI minimale** (dopo il punto 2). Poi kickoff coding v0.1.0.
5. **Codici AMB.GI.2/GI.3** (clausola dimensionale): CHIUSO 2026-10-26: codici e intestazioni confermati sul testo della FAQ Ambito via estrazione testuale; corpo delle FAQ non riverificato integralmente.
6. **Precedenza PSNC (art. 5 Det. 155238) vs Cloud PA (art. 4)**: non nelle fonti; `escalate_to_advisor` per scelta documentata (fixture E08). Riesaminare se emerge prassi ACN.
7. **Det. ACN identificativa delle PA NIS**: prerequisito per promuovere le categorie PA a/b/d a verdetto categoriale (backlog v0.2). Monitorare le pubblicazioni ACN.
8. **Date corso ISO 27001 + ore residue effettive**: [DA CONFERMARE dall'utente] — senza questi dati il piano ha durate, non date.

## Prossima milestone

**v0.1.0** — stima ~90–110h effettive dal kickoff coding (engine+zod+unit 30–40h · wizard UI 25–30h · PDF 15–20h · click-wrap+explainability+deploy ~10h · docs+release ~10h) ≈ 5–6 settimane a 20h/sett., più eventuale stop ISO. Il gate reviewer corre in parallelo: i 5 scenari partono appena l'engine passa le fixture golden, non a UI finita.

## Log sessioni recenti

- 2026-10-26 · git init + push privato su GitHub di entrambi i repo; riconciliazione stato; housekeeping KB (commit 5ff623e); ADR 0008.
- 2026-07-02 · Igiene raw/ (sweep 34 OK / 6 mismatch / 1 orfano archiviato), CLAUDE.md v2 confermato installato, 3 skill (6 file) rigenerate su corpus reale. Repoint 6 source_path morti → PDF firmati reali (vault pulito). Export PK generato in `export/`: 72 nodi (25 sources / 31 concepts / 10 entities / 6 synthesis), 0 link morti. DEC-002 annotato in ADR 0006. Regola STATUS.md aggiunta a CLAUDE.md. Residuo: caricamento manuale dei 72 file nel Project.
- 2026-07-02 · Chiusura DIV-P1 sul testo ufficiale (esoneri DORA art. 7 c. 6 / 16 c. 13 / 20 c. 6); riconciliazione art. 3 c. 4 (deroga) vs c. 12 (applicazione ACN ex art. 40 c. 1 → DPCM 221/2024); corpus 0.2.1; ADR 0007; contatore confermato a 1 residuo.
- 2026-07-02 · Sessione patch coordinata KB↔corpus: verdict_outcome dichiarativo, follow-up PUN, naming salvaguardie, CER/CACER, corpus 0.2.0→0.2.1, 15 fixture congelate, ADR 0001–0006.
