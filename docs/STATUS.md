# STATUS — Progetto NIS2 (KB + nis2-check)

> Fonte unica dello stato di avanzamento. Si aggiorna in chiusura di ogni sessione Claude Code
> (data, stato sintetico, punti aperti, una riga di log). Le regole stabili vivono nelle
> Custom Instructions del Project e in CLAUDE.md — qui solo lo stato.

**Aggiornato**: 2026-10-27 · sessione "T0 confermato"

## Stato sintetico

- **KB**: 103 nodi (40 sources / 17 entities / 39 concepts / 7 synthesis). Scope: 69 `both` / 31 `grc_personal` / 3 `nis2_tool` (post retag Cross-walk → `both`, DEC-002, esecuzione anticipata di ADR 0006). Sweep raw/ completato: identità documentali tutte verificate; 6 source_path morti (`_tmp/*.txt`) **ripuntati ai PDF firmati reali** (vault pulito, 0 residui); duplicato termini archiviato in `raw/_archive/` (DEC-004). Repo nis2-knowledge-it PUBBLICO dal 2026-10-26 (commit unico eb1a192, storia privata schiacciata; rischio residuo accettato: SHA dei commit pre-squash potenzialmente in cache GitHub fino alla garbage collection). Correzioni di contenuto del 2026-10-26: Size-cap rule e Soggetti essenziali e importanti allineati a FAQ AMB.DI.1; Direttiva allineata a AMB.GE.2; protocolli 136118 e 112335 attestati via pagina ACN.
- **Corpus**: v0.2.1. 3 gate (PSNC / DORA / Cloud PA) + segnale cumulativo `l90_cumulo`; `verdict_outcome` dichiarativo su ogni regola; regimi `routing_only_v0_1`; catalogo eccezioni 4 gestite / 8 segnalate / 10 non gestite; 15 fixture golden E01–E15 (corpus_version 0.2.1); ADR 0001–0007.
- **Claude Code config**: CLAUDE.md v2 installato in root; 3 skill (6 file) rigenerate su corpus reale; vecchia bozza in `nis2-claude-config/` superata (non usare). Regola "STATUS.md fonte unica dello stato" aggiunta a CLAUDE.md (sezione CI/CD e workflow).
- **Tool**: codice non iniziato. Repo GitHub: nis2-knowledge-it PUBBLICO dal 2026-10-26; nis2-check privato fino al pre-rilascio v0.1.0 (ADR 0008).
- **Contatore stop-and-ingest**: 1 residuo fino alla release v0.1.0 del tool (non alla versione 0.1.0 del corpus) (budget 2; consumato: Wave 7).
- **Gate pre-lancio**: DECISO 2026-10-26: opzione B, solo tool, KB esente (ADR 0008). Reviewer da contattare quando l'engine passa le fixture.
- **T0 (lancio pubblico KB)**: T0 = 2026-10-27: post LinkedIn di lancio programmato per le 07:45 del 27/10/2026. Valutazione segnali GRC a T0+10 settimane: settimana del 2027-01-05. Segnali da registrare: citazioni da profili GRC italiani identificabili, richieste di intervista, colloqui, connessioni; stelle e fork secondari.

## Punti aperti (in ordine di priorità)

Nota 2026-10-26: nessuna attività sui file tra il 2026-07-02 e il 2026-10-26. Report di riconciliazione completo nella sessione Claude del 2026-10-26.

1. **FASE 0 — post LinkedIn di lancio KB**: CHIUSO 2026-10-26: post programmato (T0 = 2026-10-27). Post: https://www.linkedin.com/posts/andrea-tierno-412b28182_nis2-cybersecurity-grc-ugcPost-7520512549063278593-lxNC
   Pubblicato 2026-10-27 07:46. T0+7h: 51 impressioni, 22 utenti raggiunti, 2 reazioni, 0 commenti, 0 click sul link, 0 visite al profilo. Pubblico raggiunto: prevalentemente IT/software, livello base, nessun segnale GRC. Baseline follower: 88.
2. **Caricamento export PK nel Project**: CHIUSO 2026-10-26: 72 nodi caricati nel Project e riallineati al commit eb1a192.
3. **Identificazione e contatto reviewer GRC (ambiente corso ISO 27001)**: Decisione perimetro CHIUSA (ADR 0008). Contatto: non avviato, parte a engine verde sulle fixture.
4. **Scaffolding monorepo + CI minimale** (dopo il punto 2). Poi kickoff coding v0.1.0.
5. **Codici AMB.GI.2/GI.3** (clausola dimensionale): CHIUSO 2026-10-26: codici e intestazioni confermati sul testo della FAQ Ambito via estrazione testuale; corpo delle FAQ non riverificato integralmente.
6. **Precedenza PSNC (art. 5 Det. 155238) vs Cloud PA (art. 4)**: non nelle fonti; `escalate_to_advisor` per scelta documentata (fixture E08). Riesaminare se emerge prassi ACN.
7. **Det. ACN identificativa delle PA NIS**: prerequisito per promuovere le categorie PA a/b/d a verdetto categoriale (backlog v0.2). Monitorare le pubblicazioni ACN.
8. **Date corso ISO 27001 + ore residue effettive**: [DA CONFERMARE dall'utente] — senza questi dati il piano ha durate, non date.
9. Lint post-T0 sulla KB: 4 link dubbi (Autorità nazionale competente NIS, Portale dei Servizi ACN, Sistemi informativi e di rete, Organi di amministrazione e direttivi), 7 concept stub, esempio al confine 50/43 M€ in FAQ Ambito AMB.DI.1.
10. Kickoff v0.2 (controlli): ritaggare a both i concept Misure di gestione del rischio cyber (citato da 23 nodi esportati), Clausole basate sul rischio, Approccio multi-rischio; oggi grc_personal e assenti dal Project Knowledge.
11. Scaffolding v0.1.0, corpus 0.2.2 prima dell'engine: domanda dimension assente dal wizard (la logica deve seguire FAQ AMB.DI.1: effettivi più almeno un parametro contabile, salita di categoria); id tipo_partecipazione_pubblica inesistente (E14); riferimenti a file non prefissati; verdict_outcome {derived_from: override_routing} fuori vocabolario Verdict; granularità DORA negli override di settore (art. 20 nudo); corpus_version delle fixture; ambiguità v0.1.0 nel contatore stop-and-ingest.

## Segnali GRC (T0 → 2027-01-05)

Tipo di segnale: commento / connessione / citazione / richiesta / colloquio.

| Data | Tipo di segnale | Profilo e ruolo | Fonte |
|------|-----------------|-----------------|-------|

## Prossima milestone

v0.1.0 in tre blocchi: corpus 0.3.0 (S1) → scaffold + CI (S2) → engine a fixture verdi (S3, 30-40h). A 8-10h/settimana osservate: fine gennaio / febbraio 2027. La review GRC terza parte a engine verde.

## Log sessioni recenti

- 2026-10-27 · T0 confermato: post LinkedIn pubblicato 07:46, link e prime metriche (T0+7h) registrati al punto aperto 1; aperta la tabella Segnali GRC.
- 2026-10-26 · T0 fissato al 27/10 (post programmato 07:45). Decisione ADR 0009 presa nel Project (override di regime → escalate_to_advisor + regimeRouting), da scrivere in S1.
- 2026-10-26 · Fase 0 eseguita: git init + repo privati; riconciliazione stato; housekeeping e sweep KB; ADR 0008; README/LICENSE/DEC-005; de-personalizzazione; export_kb.py + export rigenerato; lint Size-cap rule da query; squash e pubblicazione nis2-knowledge-it; Project Knowledge caricato e riallineato. Residuo: post LinkedIn.
- 2026-07-02 · Igiene raw/ (sweep 34 OK / 6 mismatch / 1 orfano archiviato), CLAUDE.md v2 confermato installato, 3 skill (6 file) rigenerate su corpus reale. Repoint 6 source_path morti → PDF firmati reali (vault pulito). Export PK generato in `export/`: 72 nodi (25 sources / 31 concepts / 10 entities / 6 synthesis), 0 link morti. DEC-002 annotato in ADR 0006. Regola STATUS.md aggiunta a CLAUDE.md. Residuo: caricamento manuale dei 72 file nel Project.
- 2026-07-02 · Chiusura DIV-P1 sul testo ufficiale (esoneri DORA art. 7 c. 6 / 16 c. 13 / 20 c. 6); riconciliazione art. 3 c. 4 (deroga) vs c. 12 (applicazione ACN ex art. 40 c. 1 → DPCM 221/2024); corpus 0.2.1; ADR 0007; contatore confermato a 1 residuo.
- 2026-07-02 · Sessione patch coordinata KB↔corpus: verdict_outcome dichiarativo, follow-up PUN, naming salvaguardie, CER/CACER, corpus 0.2.0→0.2.1, 15 fixture congelate, ADR 0001–0006.
