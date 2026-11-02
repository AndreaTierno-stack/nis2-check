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
