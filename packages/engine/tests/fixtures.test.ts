/**
 * Golden fixtures E01–E25: one test per scenario that loads the fixture, calls
 * evaluate() and compares the Verdict with `expected`.
 *
 * The shape of the fixtures is not re-checked here: corpus:validate already covers
 * it. Every scenario runs (S3).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parseYaml, type Fixture } from '@nis2-check/corpus';
import { evaluate } from '../src/index.ts';
import { realCorpus } from './helpers.ts';

const FIXTURES_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures');
const files = fs.readdirSync(FIXTURES_DIR).filter((f) => /^E\d{2}_.*\.yaml$/.test(f)).sort();

describe('golden fixtures', () => {
  for (const file of files) {
    const fx = parseYaml(fs.readFileSync(path.join(FIXTURES_DIR, file), 'utf8')) as Fixture;
    const name = `${fx.scenario_id} ${fx.name}`;
    it(name, () => {
      const corpus = realCorpus();
      const verdict = evaluate({ sectorId: fx.sector, answers: fx.inputs }, corpus);
      const x = fx.expected;
      expect(verdict.outcome).toBe(x.verdict_outcome);
      expect(verdict.assessmentMode).toBe(x.assessment_mode);
      expect(verdict.qualifica).toEqual(
        x.qualifica ? { value: x.qualifica, inferita: false } : x.qualifica_inferita ? { value: x.qualifica_inferita, inferita: true } : undefined,
      );
      expect(verdict.regimeRouting).toEqual(
        x.regime_routing.map((r) => ({
          regimeId: r.regime,
          routingEffect: r.routing_effect,
          residualNisObligation: r.residual_nis_obligation,
          exceptionsCatalogEntry: r.exceptions_catalog_entry,
        })),
      );
      // fixtures README: an absent key means "not verified by this fixture"
      if (x.notices !== undefined) expect(verdict.notices).toEqual(x.notices);
      if (x.signals !== undefined) expect(verdict.signals.map((s) => s.id)).toEqual(x.signals);
      // ADR 0016 amendment 3: deciding constructs, then signals, then catalog entries; compared as a set
      expect([...new Set(verdict.citations)].sort()).toEqual([...new Set(fx.citations)].sort());
      expect(verdict.disclaimerRequired).toBe(true);
      expect(verdict.corpusVersion).toBe(corpus.version);
    });
  }
});
