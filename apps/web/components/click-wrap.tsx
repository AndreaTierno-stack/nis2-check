"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Disclaimer } from "@/components/disclaimer";
import type { ComposedDisclaimer } from "@/content/disclaimer";
import { copy } from "@/src/copy.it";

/**
 * Blocking click-wrap: nothing else is shown until the user explicitly accepts.
 * The text is the composed notice of the tool (catalog entry and content/disclaimer.ts),
 * also shown in the footer, in the PDF and on the limits page. Acceptance lives in memory
 * only (no storage, no cookies): reloading the page asks again (ARCHITECTURE §2ter).
 */
export function ClickWrap({ notice, onAccept }: { notice: ComposedDisclaimer; onAccept: () => void }) {
  const checkboxId = useId();
  const [checked, setChecked] = useState(false);
  return (
    <Card className="space-y-5 p-6" data-testid="click-wrap">
      <h1 className="text-xl font-semibold">{copy.clickWrap.title}</h1>
      <Disclaimer notice={notice} className="text-text-soft" />
      <div className="flex items-start gap-3">
        <input
          id={checkboxId}
          type="checkbox"
          className="mt-1 h-4 w-4 accent-accent"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor={checkboxId} className="text-sm">
          {copy.clickWrap.accept}
        </label>
      </div>
      <Button disabled={!checked} onClick={onAccept}>
        {copy.clickWrap.proceed}
      </Button>
    </Card>
  );
}
