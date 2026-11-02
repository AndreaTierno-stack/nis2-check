/**
 * "Cosa non gestisce il tool" (S4.2): generated at build time from the exceptions catalog,
 * never written by hand. Three sections (gestito, segnalato, non gestito), each entry with
 * title, description, the sectors or regimes it concerns and its citations from the registry.
 * The notice of the tool, a non_gestito entry, is rendered as the full composed notice.
 * Every text comes from the corpus, the registry, copy.it.ts or content/disclaimer.ts.
 */
import type { Corpus } from "@nis2-check/corpus";
import { Disclaimer } from "@/components/disclaimer";
import { Card } from "@/components/ui/card";
import { Cite } from "@/components/verdict/cite";
import { SourcesPanel } from "@/components/verdict/sources-panel";
import { DISCLAIMER_ENTRY } from "@/lib/links";
import { appliesToLabel, catalogByStatus, catalogItems, toolNotice } from "@/lib/limits";
import { buildSources } from "@/lib/sources";
import { copy } from "@/src/copy.it";

export function LimitsPage({ corpus }: { corpus: Corpus }) {
  const sections = catalogByStatus(corpus);
  const all = catalogItems(corpus);
  // numbered in page order: the citations of every entry, section by section
  const sources = buildSources(
    sections.flatMap((s) => s.items.flatMap((e) => e.citations)),
    corpus,
  );
  return (
    <>
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">{copy.limits.title}</h1>
        <p className="text-text-soft">{copy.limits.intro(corpus.version, all.length)}</p>
      </section>
      {sections.map(({ status, items }) => (
        <section key={status} className="space-y-3" aria-labelledby={`limiti-${status}`} data-section={status}>
          <div className="print-keep-with-next space-y-1">
            <h2 id={`limiti-${status}`} className="text-lg font-semibold">
              {copy.verdict.status[status]} ({copy.limits.count(items.length)})
            </h2>
            <p className="text-sm text-text-soft">{copy.limits.sections[status]}</p>
          </div>
          <Card className="divide-y divide-border">
            {items.map((e) => (
              <article key={e.id} id={e.id} className="print-avoid-break space-y-2 p-5" data-entry={e.id}>
                {e.id === DISCLAIMER_ENTRY ? (
                  <Disclaimer notice={toolNotice(corpus)} heading="h3" className="text-sm text-text-soft" />
                ) : (
                  <>
                    <h3 className="font-semibold">{e.title}</h3>
                    <p className="text-sm text-text-soft">
                      {e.description} <Cite ids={e.citations} sources={sources} />
                    </p>
                  </>
                )}
                <p className="text-xs text-text-muted">
                  {copy.limits.appliesTo}: {e.appliesTo.map((id) => appliesToLabel(corpus, id)).join(", ")}
                </p>
              </article>
            ))}
          </Card>
        </section>
      ))}
      <SourcesPanel sources={sources} title={copy.limits.sourcesTitle} />
    </>
  );
}
