"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { copy } from "@/src/copy.it";

/**
 * Blocking click-wrap: nothing else is shown until the user explicitly accepts.
 * The text is the catalog notice also shown in the footer. Acceptance lives in
 * memory only (no storage, no cookies): reloading the page asks again.
 */
export function ClickWrap({ title, text, onAccept }: { title: string; text: string; onAccept: () => void }) {
  const checkboxId = useId();
  const [checked, setChecked] = useState(false);
  return (
    <Card className="space-y-5 p-6">
      <h1 className="text-xl font-semibold">{copy.clickWrap.title}</h1>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-text-soft">{text}</p>
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
