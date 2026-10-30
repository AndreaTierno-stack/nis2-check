import type { Sources } from "@/lib/sources";

/** Round source numbers that link to the "Fonti" section; ids not in the list are skipped. */
export function Cite({ ids, sources, onSoft = false }: { ids: readonly string[]; sources: Sources; onSoft?: boolean }) {
  const numbers = [...new Set(ids.map((id) => sources.numberOf(id)).filter((n): n is number => n !== undefined))].sort((a, b) => a - b);
  if (!numbers.length) return null;
  return (
    <span className="inline-flex flex-wrap gap-1 align-middle">
      {numbers.map((n) => (
        <a
          key={n}
          href={`#fonte-${n}`}
          className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold text-accent hover:bg-accent hover:text-surface ${onSoft ? "bg-surface" : "bg-accent-soft"}`}
        >
          {n}
        </a>
      ))}
    </span>
  );
}
