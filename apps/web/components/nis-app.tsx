"use client";

import { useState } from "react";
import { ClickWrap } from "@/components/click-wrap";
import { Columns } from "@/components/shell/columns";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import type { WebCorpus } from "@/lib/corpus.server";
import { DISCLAIMER_ENTRY } from "@/lib/links";

/** The whole tool, client-side: click-wrap, then the wizard (S4.1, blocks 2-3). */
export function NisApp({ corpus }: { corpus: WebCorpus }) {
  const [accepted, setAccepted] = useState(false);
  const disclaimer = Object.values(corpus.exceptions)
    .flatMap((f) => f.exceptions)
    .find((e) => e.id === DISCLAIMER_ENTRY);
  if (!disclaimer) throw new Error(`catalog entry ${DISCLAIMER_ENTRY} missing`);

  return (
    <div className="flex min-h-screen flex-col">
      <Header step={accepted ? "sector" : null} />
      <main className="flex-1">
        <Columns
          main={
            accepted ? null : <ClickWrap title={disclaimer.title} text={disclaimer.description} onAccept={() => setAccepted(true)} />
          }
        />
      </main>
      <Footer disclaimer={disclaimer.description} />
    </div>
  );
}
