/**
 * "Fonti" section: the citations of the Verdict, deduplicated, grouped by the registry
 * source_group (decreto NIS, FAQ ACN, determinazioni ACN, altre fonti) and numbered in
 * that order. Labels come from the registry; references are formatted from the citation id.
 */
import type { Corpus } from "@nis2-check/corpus";
import { kbUrl } from "@/lib/links";
import { copy } from "@/src/copy.it";

export const GROUP_ORDER = ["decreto_nis", "faq_acn", "determinazioni_acn", "altro"] as const;
export type SourceGroup = (typeof GROUP_ORDER)[number];

export interface SourceItem {
  n: number;
  id: string;
  reference: string;
  label: string;
  url: string;
}

export interface Sources {
  groups: { group: SourceGroup; items: SourceItem[] }[];
  /** Number of a citation id in the list, if listed. */
  numberOf: (id: string) => number | undefined;
}

const ACT_IDS = Object.keys(copy.acts).sort((a, b) => b.length - a.length);

/** "art_3_c_5_lett_a" -> "art. 3 c. 5 lett. a)"; "allegato_III" -> "Allegato III"; "art_1_c_2_bis" -> "art. 1 c. 2-bis". */
function formatTail(tail: string[]): string {
  const out: string[] = [];
  for (let i = 0; i < tail.length; i++) {
    const t = tail[i]!;
    const next = tail[i + 1];
    if (t === "allegato" && next) {
      out.push(`Allegato ${next}`);
      i++;
    } else if ((t === "art" || t === "c") && next) {
      const bis = tail[i + 2] === "bis";
      out.push(`${t}. ${next}${bis ? "-bis" : ""}`);
      i += bis ? 2 : 1;
    } else if (t === "lett" && next) {
      out.push(`lett. ${next})`);
      i++;
    } else if (/^\d+$/.test(t) && out.length && out.at(-1)!.startsWith("art.")) {
      out.push(`punto ${t}`);
    } else if (t === "bis" && out.length) {
      out[out.length - 1] += "-bis";
    } else {
      out.push(t);
    }
  }
  return out.join(" ");
}

/** FAQ code from the id: faq_a1_9_2 -> A1.9.2, faq_a3_c_4_1 -> A3.c.4.1, faq_amb_no_1 -> AMB.NO.1. */
function faqCode(parts: string[]): string {
  const alpha = /^[a-z]+$/.test(parts[0]!);
  return parts.map((p, i) => (i === 0 || (alpha && /^[a-z]+$/.test(p)) ? p.toUpperCase() : p)).join(".");
}

/** Human reference of a citation id, from the act names in copy.it.ts. */
export function formatReference(id: string): string {
  if (id in copy.acts) return copy.acts[id as keyof typeof copy.acts];
  if (id.startsWith("faq_")) return `${copy.acts.faq} ${faqCode(id.slice(4).split("_"))}`;
  const act = ACT_IDS.find((a) => id.startsWith(`${a}_`));
  if (!act) return id;
  return `${copy.acts[act as keyof typeof copy.acts]}, ${formatTail(id.slice(act.length + 1).split("_"))}`;
}

export function buildSources(citations: readonly string[], corpus: Corpus): Sources {
  const registry = new Map(Object.values(corpus.citations).flatMap((f) => f.citations.map((c) => [c.id, c] as const)));
  const unique = [...new Set(citations)];
  const groups = GROUP_ORDER.map((group) => ({
    group,
    ids: unique.filter((id) => (registry.get(id)?.source_group ?? "altro") === group),
  }));
  let n = 0;
  const numbers = new Map<string, number>();
  const out = groups
    .filter((g) => g.ids.length)
    .map((g) => ({
      group: g.group,
      items: g.ids.map((id) => {
        const entry = registry.get(id);
        numbers.set(id, ++n);
        return {
          n,
          id,
          reference: formatReference(id),
          label: entry?.label ?? "",
          url: entry ? kbUrl(entry.kb_node, entry.kb_lines) : "",
        };
      }),
    }));
  return { groups: out, numberOf: (id) => numbers.get(id) };
}
