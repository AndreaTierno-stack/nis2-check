import type { Corpus } from "@nis2-check/corpus";
import { copy } from "@/src/copy.it";

/** The three pilot sectors, one row each; names and descriptions from the sector files. */
export function SectorPage({ corpus, onChoose }: { corpus: Corpus; onChoose: (sectorId: string) => void }) {
  const sectors = Object.values(corpus.sectors)
    .map((s) => s.meta)
    .sort((a, b) => a.sector_id.localeCompare(b.sector_id));
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{copy.sector.title}</h1>
        <p className="text-text-soft">{copy.sector.subtitle}</p>
      </div>
      <ul className="space-y-3">
        {sectors.map((s) => (
          <li key={s.sector_id}>
            <button
              type="button"
              onClick={() => onChoose(s.sector_id)}
              className="flex w-full items-center justify-between gap-4 rounded-panel border border-border bg-surface p-5 text-left transition-colors hover:border-accent hover:bg-accent-soft"
            >
              <span className="space-y-1">
                <span className="block text-lg font-semibold">{s.label_it}</span>
                <span className="block text-sm text-text-soft">{s.description_it}</span>
              </span>
              <span className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-surface">{copy.sector.choose}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
