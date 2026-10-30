import { NisApp } from "@/components/nis-app";
import { loadWebCorpus } from "@/lib/corpus.server";

/** Static shell: the corpus is read and validated at build time, then everything runs in the browser. */
export default function Home() {
  return <NisApp corpus={loadWebCorpus()} />;
}
