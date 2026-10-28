/**
 * Golden fixtures E01–E25: one test per scenario that loads the fixture, calls
 * evaluate() and compares the Verdict with `expected`.
 *
 * The shape of the fixtures is not re-checked here: corpus:validate already covers
 * it. These tests are about execution. While the engine is a stub (S2) every
 * scenario is registered as test.todo; S3 flips ENGINE_READY.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { loadFromDisk, parseYaml, validateCorpus, type Fixture } from '@nis2-check/corpus';
import { evaluate } from '../src/index.ts';

const ENGINE_READY = false;

const FIXTURES_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures');
const files = fs.readdirSync(FIXTURES_DIR).filter((f) => /^E\d{2}_.*\.yaml$/.test(f)).sort();

describe('golden fixtures', () => {
  for (const file of files) {
    const fx = parseYaml(fs.readFileSync(path.join(FIXTURES_DIR, file), 'utf8')) as Fixture;
    const name = `${fx.scenario_id} ${fx.name}`;
    if (!ENGINE_READY) {
      it.todo(name);
      continue;
    }
    it(name, () => {
      const { corpus: raw } = loadFromDisk();
      const { corpus } = validateCorpus(raw);
      const verdict = evaluate(fx.inputs, corpus!);
      expect(verdict.outcome).toBe(fx.expected.verdict_outcome);
      expect(verdict.assessmentMode).toBe(fx.expected.assessment_mode);
      expect(verdict.regimeRouting).toEqual(
        fx.expected.regime_routing.map((r) => ({
          regimeId: r.regime,
          routingEffect: r.routing_effect,
          residualNisObligation: r.residual_nis_obligation,
          exceptionsCatalogEntry: r.exceptions_catalog_entry,
        })),
      );
      expect(verdict.notices).toEqual(fx.expected.notices ?? []);
      expect(verdict.disclaimerRequired).toBe(true);
    });
  }
});
