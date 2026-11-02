# Checklist pre-rilascio (file vivo)

> Si esegue e si documenta a ogni rilascio del tool. Completata in S4.2, Blocco 6 (prompt S4.2);
> questa prima stesura nasce nel Blocco 3 per la voce sull'indicizzazione.

## Indicizzazione e anteprima (Blocco 3)

- Variabile di build `NIS2_RELEASE_STAGE` (`apps/web/lib/release.ts`), default **`preview`**:
  `<meta name="robots" content="noindex, nofollow">` su ogni pagina e `robots.txt` con
  `Disallow: /`. Verificato da `apps/web/e2e/network.spec.ts`.
- Valore attuale: **`preview`** (nessuna variabile d'ambiente su Vercel).
- Al tag v0.1.0, solo su decisione nel Project: build con `NIS2_RELEASE_STAGE=public` (variabile
  sul progetto Vercel, ambiente Production, o cambio del default nel codice con commit dedicato),
  poi controllo di `robots.txt` e del meta `robots` sull'URL di produzione.

## Protezione del deploy fino al rilascio (Blocco 3)

- Progetto Vercel `nis2-check`: Vercel Authentication con `deploymentType: all` (piano Hobby): ogni
  URL, produzione compresa, risponde 302 verso il login Vercel a chi non è membro del team.
  Verificato con richieste anonime il 2026-11-02. Nessun link di condivisione emesso.
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
