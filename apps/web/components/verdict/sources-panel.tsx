import { Card } from "@/components/ui/card";
import type { Sources } from "@/lib/sources";
import { copy } from "@/src/copy.it";

/**
 * "Fonti" section: citations numbered and grouped by registry source_group, with label and
 * KB link (printed as an explicit URL, ADR 0018). Used by the verdict page and the limits page.
 */
export function SourcesPanel({ sources, title }: { sources: Sources; title: string }) {
  if (!sources.groups.length) return null;
  return (
    <section className="space-y-3" aria-labelledby="fonti-title">
      <div className="print-keep-with-next space-y-1">
        <h2 id="fonti-title" className="text-lg font-semibold">
          {title}
        </h2>
        <p className="text-sm text-text-soft">{copy.verdict.sourcesSubtitle}</p>
      </div>
      <Card className="space-y-6 p-6">
        {sources.groups.map((g) => (
          <div key={g.group} className="space-y-3">
            <h3 className="font-semibold">{copy.verdict.groups[g.group]}</h3>
            <ol className="space-y-3">
              {g.items.map((s) => (
                <li key={s.id} id={`fonte-${s.n}`} className="print-avoid-break flex gap-3" data-testid="source" data-source={s.id}>
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent-soft px-1.5 text-xs font-semibold text-accent">
                    {s.n}
                  </span>
                  <span className="space-y-0.5 text-sm">
                    <span className="block font-semibold">{s.reference}</span>
                    <span className="block text-text-soft">{s.label}</span>
                    {s.url && (
                      <>
                        <a className="text-accent underline-offset-4 hover:underline print:hidden" href={s.url}>
                          {copy.verdict.sourceLink}
                        </a>
                        {/* paper loses the link: the URL is printed in full (ADR 0018) */}
                        <span className="hidden break-all text-xs text-text-soft print:block" data-testid="source-url">
                          {s.url}
                        </span>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </Card>
    </section>
  );
}
