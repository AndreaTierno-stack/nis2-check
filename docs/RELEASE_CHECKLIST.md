# Checklist pre-rilascio (file vivo)

> Si esegue e si documenta a ogni rilascio del tool. Prima stesura nel Blocco 3 di S4.2 (voce
> sull'indicizzazione), completata ed eseguita nel Blocco 6 (2026-11-02, corpus 0.13.1). L'atto di
> rilascio resta da decidere nel Project.

## Controlli pre-rilascio

Ogni voce si esegue sul commit candidato; l'esito di ogni esecuzione si registra nella tabella
in fondo alla sezione.

1. **CI verde sul `main`** (GitHub Actions: install, lint, typecheck, `corpus:validate`, test, build).
2. **`pnpm corpus:validate` verde** in locale, con la versione del corpus attesa.
3. **E2e Playwright verdi in locale** (`pnpm --filter @nis2-check/web exec playwright test`), prima del push.
4. **Enumerazione completa** dei percorsi senza violazioni (sezione sotto).
5. **`pnpm audit`**: nessuna advisory oltre quelle in `pnpm.auditConfig.ignoreCves` del `package.json`
   di root; ciascuna ignorata ha motivo e data di riesame in `docs/ARCHITECTURE.md` (§7, "Advisory accettate").
6. **Fine riga LF**: `.gitattributes` con `* text=auto eol=lf` ed eccezioni binarie; `git ls-files --eol`
   mostra solo `i/lf` per i file di testo.
7. **Avviso identico da sorgente unica** su click-wrap, esito (piè di pagina), PDF (copertina), pagina
   dei limiti e README: `apps/web/tests/limits.test.tsx` ("is rendered identically by click-wrap,
   footer, PDF and limits page") e `apps/web/tests/readme.test.ts` (avviso tra i marcatori, nelle
   prime righe).
8. **Nessuna richiesta verso host esterni** dall'export statico: `apps/web/e2e/network.spec.ts`
   (riferimenti dell'export, sessione completa solo verso l'origine, nessuna violazione CSP).
9. **Protezione del deploy attiva** fino all'atto di rilascio: richiesta anonima all'URL di
   produzione con risposta 302 verso il login Vercel (sezione "Protezione del deploy").

| Data | Commit | Corpus | Esito |
|---|---|---|---|
| 2026-11-02 | aa517bc | 0.13.1 | 1 CI verde (run 41441503448); 2 verde (43 file YAML, 28 fixture); 3 13 verdi, 1 saltato (PDF di esempio, solo con `PDF_OUT`); 4 418.564 combinazioni, 0 violazioni; 5 uscita 0, 6 advisory tutte in `ignoreCves` (il conteggio "7" di pnpm somma due volte minimatch, presente su due percorsi); 6 rinormalizzazione senza modifiche, indice già LF; 7 e 8 verdi; 9 302 su `/` e `/robots.txt` |
| 2026-11-02 | 1959d84 | 0.13.2 | Dopo la verifica Firefox dell'autore (impaginazione a schede, `cer_signal`): 1 CI verde (run 41464307767); 2 verde; 3 15 verdi e 1 saltato su Chromium e su Firefox; 4 418.564, 0 violazioni; 5 invariato (uscita 0, nessuna advisory fuori da `ignoreCves`); 6 tutto `i/lf`; 7 e 8 verdi; 9 302 |

## Indicizzazione e anteprima (Blocco 3)

- Variabile di build `NIS2_RELEASE_STAGE` (`apps/web/lib/release.ts`), default **`preview`**:
  `<meta name="robots" content="noindex, nofollow">` su ogni pagina e `robots.txt` con
  `Disallow: /`. Verificato da `apps/web/e2e/network.spec.ts`.
- Valore attuale: **`public`** in produzione dal 2026-11-02 (atto di rilascio v0.1.0, variabile
  `NIS2_RELEASE_STAGE=public` sul progetto Vercel, solo ambiente Production); le anteprime restano
  `preview`.
- Al tag v0.1.0, solo su decisione nel Project: build con `NIS2_RELEASE_STAGE=public` (variabile
  sul progetto Vercel, ambiente Production, o cambio del default nel codice con commit dedicato),
  poi controllo di `robots.txt` e del meta `robots` sull'URL di produzione.

## Protezione del deploy fino al rilascio (Blocco 3)

- Progetto Vercel `nis2-check`: Vercel Authentication con `deploymentType: all` (piano Hobby): ogni
  URL, produzione compresa, risponde 302 verso il login Vercel a chi non è membro del team.
  Verificato con richieste anonime il 2026-11-02 (Blocco 3 e di nuovo nel Blocco 6). Nessun link di
  condivisione emesso.
- Fino al rilascio la review e i test lavorano sull'export locale `apps/web/out`.

## Atto di rilascio

Da eseguire solo su decisione nel Project, non in S4.2. In quest'ordine:

1. Repository `nis2-check` pubblico su GitHub.
2. Tag `v0.1.0` sul commit verificato dalla checklist.
3. Protezione Vercel tolta dalla produzione (Vercel Authentication da `all` a una modalità che
   lascia aperta la produzione, o spenta).
4. Variabile di indicizzazione `NIS2_RELEASE_STAGE=public` sul progetto Vercel (ambiente Production),
   o cambio del default in `apps/web/lib/release.ts` con commit dedicato: via `noindex` e
   `Disallow: /`. Valore accettato dal codice: `public` (ogni altro valore resta `preview`).
5. URL pubblico definitivo: alias più pulito di `nis2-check-three.vercel.app` o dominio custom, da
   decidere prima del post di rilascio; aggiornare il segnaposto del README.
6. Issue abilitate sul repository con un template minimo, scritto all'atto di rilascio: riferimento
   normativo (articolo e comma, codice FAQ o protocollo); passaggio del testo ufficiale; settore,
   risposte e codice della valutazione dal PDF.
7. Verifica e2e contro l'URL definitivo:
   `E2E_BASE_URL=<URL definitivo> pnpm --filter @nis2-check/web exec playwright test`, più controllo
   a mano di `robots.txt`, meta `robots` e header.

## Enumerazione completa dei percorsi

`pnpm engine:enumerate --full`, da eseguire prima di ogni rilascio; esito registrato qui e in `docs/STATUS.md`.

| Data | Corpus | Combinazioni | Violazioni | Note |
|---|---|---|---|---|
| 2026-10-30 | 0.11.0 | 418.576 (cloud 480, energia 417.792, PA 304) | 0 | S4.1, Blocco 0 |
| 2026-11-02 | 0.13.0 | 418.564 (cloud 480, energia 417.792, PA 292) | 0 | S4.2, correzioni della review avversaria; PA: all'organo escluso dall'art. 4 c. 2 non si pongono più PSNC e classificazione Cloud PA (A1). Citazioni emesse: 60 |
| 2026-11-02 | 0.13.1 | 418.564 (cloud 480, energia 417.792, PA 292) | 0 | S4.2, Blocco 6: patch di testi, nessuna regola cambiata; rieseguita comunque. Citazioni emesse: 60 |
| 2026-11-02 | 0.13.2 | 418.564 (cloud 480, energia 417.792, PA 292) | 0 | S4.2, dopo la verifica Firefox: patch di testo di `cer_signal`. Citazioni emesse: 60 |
| 2026-11-02 | 0.13.3 | non rieseguita | n/a | Patch di soli testi e lint di copy (chiusa "Verifica obbligatoria" tolta da 11 testi di esito), nessuna regola cambiata: vale l'esecuzione su 0.13.2 (418.564 combinazioni, 0 violazioni). Anche i testi aggiunti alla 0.13.2 dopo quell'esecuzione (aiuto di `dimension`, regola dei soggetti critici) non toccano le regole |
