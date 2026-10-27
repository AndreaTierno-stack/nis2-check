"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Blocking click-wrap: the wizard stays hidden until the user explicitly accepts.
 * Acceptance lives in memory only (no localStorage, no cookies): reloading the
 * page asks again. The wizard itself is not implemented yet (S3+).
 */
export function ClickWrap() {
  const checkboxId = useId();
  const [checked, setChecked] = useState(false);
  const [accepted, setAccepted] = useState(false);

  if (accepted) {
    return (
      <section aria-live="polite" className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
        Il questionario non è ancora disponibile: lo strumento è in sviluppo (v0.1.0).
      </section>
    );
  }

  return (
    <section className="space-y-4 rounded-md border p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
        Placeholder — testo soggetto a review legale
      </p>
      <p className="text-sm">
        [PLACEHOLDER] Prima di proseguire è necessario accettare le condizioni d&apos;uso: lo strumento
        fornisce un esito preliminare e informativo, non una consulenza, e le risposte inserite restano
        nel browser.
      </p>
      <div className="flex items-start gap-3">
        <input
          id={checkboxId}
          type="checkbox"
          className="mt-1 h-4 w-4"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor={checkboxId} className="text-sm">
          [PLACEHOLDER] Ho letto e accetto le condizioni d&apos;uso e l&apos;avvertenza di non-consulenza.
        </label>
      </div>
      <Button disabled={!checked} onClick={() => setAccepted(true)}>
        Accetto e proseguo
      </Button>
    </section>
  );
}
