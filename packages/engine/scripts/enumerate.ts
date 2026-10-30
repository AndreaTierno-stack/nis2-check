/**
 * pnpm engine:enumerate [--full]
 *
 * Runs the path enumeration of ADR 0016 §6 on the real corpus. Without --full it
 * reproduces the test (seeded sample above the limit); with --full it evaluates every
 * valid combination of every sector. To run by hand before each pre-release; the
 * result goes in docs/STATUS.md. Exit code 1 on any property violation.
 */
import { loadFromDisk, validateCorpus } from '@nis2-check/corpus';
import { SAMPLE, SEED, enumerateSector } from '../tests/enumeration-lib.ts';

const full = process.argv.includes('--full');
const { corpus: raw, parseErrors } = loadFromDisk();
const { corpus, errors } = validateCorpus(raw, {}, parseErrors);
if (!corpus) {
  console.error(errors.join('\n'));
  process.exit(1);
}

let violations = 0;
const catalog = new Set<string>();
const citations = new Set<string>();
for (const sectorId of Object.values(corpus.sectors).map((s) => s.meta.sector_id).sort()) {
  const started = performance.now();
  const r = enumerateSector(sectorId, corpus, full);
  const seconds = ((performance.now() - started) / 1000).toFixed(1);
  const mode = r.sampled ? `campione di ${SAMPLE}, seed ${SEED}` : 'tutte';
  console.log(`${sectorId}: ${r.combinations} combinazioni, ${r.checked} verificate (${mode}), ${r.violations.length} violazioni, ${seconds}s`);
  r.violations.slice(0, 10).forEach((v) => console.log(`  ${v}`));
  violations += r.violations.length;
  r.catalog.forEach((id) => catalog.add(id));
  r.citations.forEach((id) => citations.add(id));
}
const entries = Object.values(corpus.exceptions).flatMap((f) => f.exceptions);
console.log(`voci di catalogo mai emesse: ${entries.filter((e) => !catalog.has(e.id)).map((e) => `${e.id} (${e.status})`).join(', ') || 'nessuna'}`);
console.log(`citazioni emesse: ${citations.size}`);
if (process.argv.includes('--citations')) console.log([...citations].sort().join('\n'));
process.exit(violations === 0 ? 0 : 1);
