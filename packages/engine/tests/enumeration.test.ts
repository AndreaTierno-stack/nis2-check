/**
 * Path enumeration (ADR 0016 §6): see enumeration-lib.ts. Sectors above LIMIT are
 * sampled with a fixed seed here; `pnpm engine:enumerate --full` runs the full space
 * by hand before each pre-release (STATUS).
 *
 * Also checks that every segnalato catalog entry is emitted by some combination and
 * that every citation the engine emits has a label and a source group in the registry
 * (texts of the "Fonti" section of the web app and of the PDF).
 */
import { describe, expect, it } from 'vitest';
import { enumerateSector, type SectorReport } from './enumeration-lib.ts';
import { realCorpus } from './helpers.ts';

const corpus = realCorpus();
const sectors = Object.values(corpus.sectors).map((s) => s.meta.sector_id).sort();
const reports: SectorReport[] = [];

describe('path enumeration', () => {
  for (const sectorId of sectors) {
    it(sectorId, () => {
      const r = enumerateSector(sectorId, corpus);
      reports.push(r);
      expect(r.checked).toBeGreaterThan(0);
      expect(r.violations.slice(0, 5)).toEqual([]);
    }, 120_000);
  }

  it('every segnalato catalog entry is emitted by at least one combination', () => {
    const emitted = new Set(reports.flatMap((r) => [...r.catalog]));
    const entries = Object.values(corpus.exceptions).flatMap((f) => f.exceptions);
    expect(entries.filter((e) => e.status === 'segnalato' && !emitted.has(e.id)).map((e) => e.id)).toEqual([]);
  });

  it('every emitted citation has a label and a source group in the registry', () => {
    const registry = new Map(Object.values(corpus.citations).flatMap((f) => f.citations.map((c) => [c.id, c] as const)));
    const emitted = [...new Set(reports.flatMap((r) => [...r.citations]))].sort();
    expect(emitted.filter((id) => !registry.get(id)?.label || !registry.get(id)?.source_group)).toEqual([]);
  });
});
