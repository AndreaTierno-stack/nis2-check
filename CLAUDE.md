# CLAUDE.md — nis2-check (v2 — luglio 2026, corpus ≥ 0.3.0)

Tool open source di **pre-screening dell'ambito NIS2 italiano**. Web-first, client-side, zero raccolta dati. Il valore del progetto è il **corpus normativo dichiarativo** (derivato dalla KB "LLM Wiki" dell'autore, repo separato): il codice lo esegue, non lo interpreta. Progetto hobbistico non commerciale: strumento **informativo**, mai di compliance, audit o certificazione — questo vincolo vale per codice, copy, naming e documentazione.

Repo gemello: `nis2-knowledge-it` (KB, CC-BY-4.0). Questo repo: MIT.

## Vincoli non negoziabili — leggere per primi

1. **Mai verdetti categorici.** Ogni testo rivolto all'utente usa formulazioni probabilistiche: *"Sulla base degli input forniti, l'analisi suggerisce che il soggetto rientri nel perimetro NIS2 italiano come [tipologia]. Verifica obbligatoria con consulente qualificato."* Vietato in qualunque output: "Rientri", "Sei dentro", "Sei conforme", "Devi", "Sei tenuto a", "Adempi a", "Implementa", "Report di compliance", "audit", "diagnosi", "certificazione".
2. **`verdict_outcome` si copia, mai si inferisce.** L'engine legge il campo `verdict_outcome` dichiarato nella regola del corpus e lo riporta nel Verdict. Per un override di regime lo legge, insieme ad `assessment_mode`, dal `meta` del regime referenziato (`reference: regimes/<id>.yaml`). **Nessun `verdict_outcome` e nessun `reference` a un regime che lo dichiara = errore bloccante**: la validazione zod lo blocca in build, non è un caso da gestire con fallback o euristiche (ADR 0002, ADR 0009).
3. **Citazioni solo a granularità verificata.** Ogni citation ID nel corpus corrisponde a un'attestazione nella KB (articolo, comma, protocollo, codice FAQ). Un comma non attestato si degrada, non si assume. Mai inventare riferimenti normativi: in dubbio, open point.
4. **Naming vincolato** (ADR 0004, 0005): mai "salvaguardia" nuda — sempre "salvaguardia dimensionale (DPCM 221/2024)" distinta dalle "esclusioni di sicurezza nazionale (art. 2 par. 7-8 NIS2)"; ID: `safeguard_dimensional_dpcm_221`. Mai "CER" nudo nel settore energia — sempre "soggetti critici (D.Lgs. 134/2024)" vs "comunità energetiche rinnovabili (CACER)".
5. **`disclaimerRequired: true`** è un literal type, incondizionato, in ogni Verdict.
6. **Invariante**: `assessment_mode = escalate_to_advisor` → `outcome = ambiguous`, sempre. Applicata due volte: nello schema zod del corpus e come assert nell'engine.
7. **Zero telemetria remota.** Vietati Sentry, PostHog, Datadog, Plausible, GA, beacon, font/script di terze parti a runtime. Nessuna chiamata di rete a runtime oltre il caricamento degli asset statici. Le risposte dell'utente non lasciano mai il browser.
8. **Identità documentale dal testo** (ADR 0007): l'identità di una fonte normativa si stabilisce dal contenuto (clausola di successione, data di applicazione, struttura, firma), mai dal nome del file né da fonti secondarie. Match obbligatorio protocollo-frontespizio ↔ nodo KB ↔ filename. I prompt e le sessioni normative operano in modalità *verifica-poi-azione*: mai eseguire modifiche premesse su conclusioni non verificate sul testo.

## Architettura

Monorepo pnpm workspaces:

```
nis2-check/
  apps/web            → Next.js 15.5 App Router (export statico), React 19, TypeScript strict, TailwindCSS 3, shadcn/ui
                        (pin 15.5: la linea 14.x è fuori supporto, con CVE senza fix — S2, 2026-10-28)
  packages/engine     → funzione pura, zero dipendenze runtime, nessun I/O
    tests/fixtures/   → scenari golden E01–E15 (legati a corpus_version)
  packages/corpus     → loader YAML + schemi zod + corpus:validate
    corpus/           → il corpus: VERSION, CHANGELOG.md, sectors/, wizard/, signals/, regimes/
  packages/pdf        → generazione PDF client-side
  docs/               → ARCHITECTURE.md (viva), decisions/ (ADR), STATUS.md, CORPUS_SCHEMA.md
  export/             → export della KB per il Project Knowledge (scripts/export_kb.py)
```

I `corpus_ref` delle fixture sono relativi alla radice del corpus (`packages/corpus/corpus/`), non al monorepo.

`apps/web`: il wizard gira interamente client-side; nessuna API route trasporta risposte dell'utente; server components solo per shell statica. Stato di sessione in memoria — nessuna persistenza (no localStorage per i dati dell'utente: la promessa è zero raccolta, l'export è solo manuale ed esplicito).

`packages/engine`: `evaluate(answers, corpus) => Verdict`. Pura, deterministica, testabile senza DOM. Non contiene conoscenza normativa: solo meccanica di esecuzione (routing dei gate, applicazione qualification_rules, raccolta signals, composizione reasoning trace).

## Corpus — fonte di verità (v0.3.0+)

Struttura: `sectors/`, `wizard/`, `signals/`, `regimes/`, più `VERSION` e `CHANGELOG.md`. Convenzione filename con prefisso di cartella (`sectors__`, `wizard__`, `signals__`) per evitare collisioni.

**Flusso**: `disambiguation` (3 gate) → `sector_specific` → `standard_identification` (size-cap; la PA lo salta, size-blind ex art. 3 c. 6).

**I 3 gate** (`wizard__disambiguation.yaml`, `execution_order: pre_standard_identification`): `psnc` → `category_override` · `dora` → `massive_disapplication` · `cloud_pa` → `model_substitution`. Alterano il flusso, per questo sono gate. La **L. 90/2024 non è un gate**: è il segnale cumulativo `l90_cumulo`, attivato da follow-up/profili PA — si aggiunge al verdetto, non instrada (ADR 0001).

**Outcome delle regole** (`assessment_mode`): `categorical_assessment` | `qualitative_signal_only` | `escalate_to_advisor` | `out_of_scope`. Ogni regola con esito dichiara anche `verdict_outcome` (vedi vincolo 2). Mapping fisso: categorical in ambito → `likely_in_scope`; `out_of_scope` → `likely_out_of_scope`; `escalate` → `ambiguous`; `qualitative_signal_only` → dichiarato caso per caso con commento giustificativo.

**Regimi**: `regimes/{psnc,dora,cloud_pa}.yaml` hanno `status: routing_only_v0_1` — instradano, non risolvono nel merito. In v0.1 ogni regime dichiara nel `meta` `assessment_mode: escalate_to_advisor` e `verdict_outcome: ambiguous`, copiati dall'engine attraverso il `reference` dell'override, e popola un elemento di `Verdict.regimeRouting` (array, un elemento per override che matcha, nell'ordine del file di settore; ADR 0009 + amendment 2026-10-27). Non implementare la risoluzione senza decisione esplicita di scope (è v0.2+).

**Semver corpus**: MAJOR = cambio di schema incompatibile; MINOR = cambia questionario o regole; PATCH = correzioni di attestazione/copy senza effetto sugli esiti. Ogni bump → voce CHANGELOG. Le fixture dichiarano `corpus_version` e vanno riallineate a ogni MINOR/MAJOR.

**Lacuna strutturale e stop-and-ingest** (regola stabile): una lacuna è strutturale quando soddisfa 2 criteri su 3: fonte primaria mancante, impatto sul tool, centralità. Una lacuna strutturale impone stop-and-ingest. Un riscontro con esito no-op non consuma il credito (DEC-003).

## Tipo Verdict

```ts
type VerdictOutcome = 'likely_in_scope' | 'likely_out_of_scope' | 'ambiguous';
type AssessmentMode =
  | 'categorical_assessment'
  | 'qualitative_signal_only'
  | 'escalate_to_advisor'
  | 'out_of_scope';

interface RegimeRouting {             // popolato dal meta del regime (ADR 0009 + amendment 2026-10-27)
  regimeId: string;
  routingEffect: 'category_override' | 'massive_disapplication' | 'model_substitution';
  residualNisObligation: string | null; // null = non attestato nel corpus, NON "nessuno"
  exceptionsCatalogEntry: string;
}

interface Verdict {
  outcome: VerdictOutcome;          // copiato da corpus.verdict_outcome — MAI inferito
  assessmentMode: AssessmentMode;   // alimenta l'Explainability Mode
  qualifica?: { value: 'essenziale' | 'importante'; inferita: boolean }; // strada 3 PA
  regimeRouting: RegimeRouting[];   // vuoto se nessun routing; ordine = ordine degli override nel file di settore (non precedenza)
  signals: SignalRef[];             // l90_cumulo, cross_sector_*, ecc.
  reasoningTrace: ReasoningStep[];  // observability client-side
  citations: CitationId[];          // solo granularità verificata
  disclaimerRequired: true;         // literal, incondizionato
  inputHash: string;                // sha256 delle risposte serializzate
  corpusVersion: string;            // da packages/corpus/corpus/VERSION
}
```

## Testing

- **Fixture golden E01–E15** = suite di regressione dell'engine. Verdi obbligatorie prima di ogni merge che tocca engine o corpus. Un cambiamento di esito atteso richiede aggiornamento esplicito della fixture con motivazione nel commit (mai "aggiustare il test perché passi").
- **Validazione corpus in build-time** (zod): schema, `verdict_outcome` obbligatorio, invariante escalate→ambiguous, citation ID ben formati, referenze signals esistenti. CI fallisce su violazione.
- Unit (engine, schemi) → integration (corpus reale + engine) → E2E Playwright (da v1.0).
- Commenti estensivi nel codice; JSDoc in inglese.

## Deliverable PDF

Naming: "Esito preliminare di verifica dell'ambito NIS2" (mai wording da certificato). Watermark: `corpus vX.Y.Z · ultima det. ACN considerata: [data] · [primi 8 char di inputHash]`. Disclaimer di non-consulenza in piè di pagina di **ogni** pagina. Struttura ibrida: parte sintetica (verdetto + segnalazioni regimi) per il lettore non esperto; parte tecnica (citazioni puntuali, open question, regimi correlati possibili) per il consulente. Campo opzionale "Nome azienda analizzata" in copertina. Generazione interamente client-side.

## Observability (solo client-side)

Consentito: `reasoningTrace` nel Verdict; console log strutturati gated `?debug=1` o env dev; log di build in CI; export manuale della sessione su richiesta esplicita dell'utente. Tutto il resto è vietato (vincolo 7).

## CI/CD e workflow

GitHub Actions su ogni push/PR: install → lint → typecheck → `corpus:validate` → test → build. Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `corpus:`); i commit `corpus:` citano la versione (es. `corpus: bump 0.2.1 — attestation patch, DIV-P1 closed`). `docs/ARCHITECTURE.md` è documentazione viva: si aggiorna nello stesso commit che cambia l'architettura. Le decisioni con alternative scartate → ADR in `docs/decisions/` (prossimo numero: 0010). `docs/STATUS.md` è la fonte unica dello stato di avanzamento e dei punti aperti; si aggiorna in chiusura di ogni sessione (data, stato sintetico, punti aperti, una riga di log).

## Autonomia di Claude Code

**Puoi fare in autonomia**: scrivere/refactorare codice e test entro lo scope v0.1.0; sincronizzare la doc; eseguire fixture e validazioni; correggere bug meccanici; migliorare copy non normativo mantenendo i vincoli di linguaggio.

**Richiede conferma esplicita dell'autore**: ogni modifica al contenuto normativo del corpus (regole, soglie, citazioni, copy dei verdetti, domande del wizard); nuove dipendenze; modifiche allo schema del corpus; qualunque cancellazione in `raw/` (lato KB — solo archiviazione autorizzata); qualunque azione che tocchi lo scope (feature nuove, regimi risolti nel merito, settori aggiuntivi).

**Regola trasversale normativa**: prima di codificare qualunque contenuto normativo, attestarlo contro il nodo KB pertinente; se l'attestazione manca o è imprecisa → open point riportato all'autore, mai deduzione. In caso di conflitto tra fonti: il testo ufficiale vince sulla KB, la KB vince sul corpus, il corpus vince sul codice — e la discrepanza si segnala sempre a monte.

## Scope v0.1.0 (promemoria)

3 settori pilota (Cloud computing, Energia elettrica, PA) · wizard doppio binario (3 gate + identificazione standard) · verdetto motivato + Explainability Mode · PDF client-side · click-wrap bloccante · deploy Vercel. **Fuori scope**: risoluzione nel merito dei regimi (routing/segnalazione soltanto), suggerimenti controlli (v0.2/v0.3, pianificati), altri 14 settori, autenticazione, persistenza, analytics, scraping ACN, iframe.

## Lingua

Codice, identificatori, JSDoc, commit: **inglese**. Copy UI/PDF, documentazione di prodotto, CHANGELOG del corpus, ADR: **italiano**. Il pubblico del tool è l'IT manager/DPO italiano non esperto; il linguaggio user-facing è semplice, preciso, mai prescrittivo.
