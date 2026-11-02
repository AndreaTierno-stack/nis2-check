import type { Metadata } from "next";
import { LimitsPage } from "@/components/limits/limits-page";
import { Columns } from "@/components/shell/columns";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { loadWebCorpus } from "@/lib/corpus.server";
import { copy } from "@/src/copy.it";

export const metadata: Metadata = { title: copy.limits.metaTitle, description: copy.meta.description };

/** Static page generated at build time from the exceptions catalog: reachable without the click-wrap. */
export default function Limits() {
  const corpus = loadWebCorpus();
  return (
    <div className="flex min-h-screen flex-col">
      <Header step={null} backHref="/" />
      <main className="flex-1">
        <Columns main={<LimitsPage corpus={corpus} />} />
      </main>
      {/* the notice is the last entry of the list: not repeated in the footer */}
      <Footer />
    </div>
  );
}
