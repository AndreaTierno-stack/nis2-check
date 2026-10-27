#!/usr/bin/env node
/**
 * validate-corpus.mjs — static consistency checks for the NIS2 corpus and the
 * golden fixtures.
 *
 * Interim tool (corpus 0.3.1): it is NOT yet `corpus:validate`. In S2 these
 * checks move into the zod schema of `packages/corpus` and run in CI.
 *
 * Only dependency: js-yaml v4 (YAML 1.2 core schema: `yes`/`no` are strings,
 * which is exactly why the yes/no lint below exists — a YAML 1.1 parser would
 * read them as booleans).
 *
 * Usage: node scripts/validate-corpus.mjs   (exit code 1 on any failure)
 *
 * Checks:
 *  1. every YAML file in corpus/ and fixtures/ parses;
 *  2. every outcome-bearing entry declares verdict_outcome (constraint 2);
 *     overrides instead need a regime that declares it (ADR 0009);
 *  3. invariant escalate_to_advisor -> ambiguous, everywhere (regime meta included);
 *  4. override citations == citations of the referenced regime (ADR 0009);
 *  5. every wizard question and every option has an id;
 *  6. wizard meta.sector_data and fixture corpus_ref files exist;
 *  7. fixtures: corpus_version == corpus/VERSION, input ids exist in the wizard,
 *     expected signals are defined, regime_routing == meta of the regimes of the
 *     matching overrides, in sector-file order (ADR 0009 amendment 2026-10-28);
 *  8. lint: no unquoted YAML 1.1 boolean-like scalar (yes/no/on/off/y/n).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['corpus/sectors', 'corpus/wizard', 'corpus/signals', 'corpus/regimes', 'fixtures'];

const errors = [];
const passed = [];
/** Record the outcome of one named check. */
const check = (name, failures) => {
  if (failures.length === 0) passed.push(name);
  else errors.push(...failures.map((f) => `${name}: ${f}`));
};

// ---------------------------------------------------------------------------
// Load
// ---------------------------------------------------------------------------
const files = DIRS.flatMap((d) =>
  fs.readdirSync(path.join(ROOT, d)).filter((f) => f.endsWith('.yaml')).map((f) => `${d}/${f}`),
);
const raw = {};
const doc = {};
{
  const failures = [];
  for (const f of files) {
    raw[f] = fs.readFileSync(path.join(ROOT, f), 'utf8');
    try {
      doc[f] = yaml.load(raw[f]);
    } catch (e) {
      failures.push(`${f}: ${e.message.split('\n')[0]}`);
    }
  }
  check(`parse (${files.length} YAML files)`, failures);
}
const corpusFiles = files.filter((f) => f.startsWith('corpus/') && doc[f]);
const byPrefix = (p) => corpusFiles.filter((f) => f.startsWith(p));
const VERSION = fs.readFileSync(path.join(ROOT, 'corpus/VERSION'), 'utf8').trim();
/** Resolve a corpus-relative path such as "regimes/psnc.yaml". */
const corpusDoc = (rel) => doc[`corpus/${rel}`];

// ---------------------------------------------------------------------------
// 2-3. verdict_outcome declared; escalate -> ambiguous
// ---------------------------------------------------------------------------
{
  const missing = [];
  const invariant = [];
  // Containers whose entries carry an outcome (CLAUDE.md, constraint 2).
  const OUTCOME_LISTS = ['qualification_rules', 'out_of_scope_mvp', 'multi_regime_intersection', 'outcome_mapping'];
  const walk = (node, file, where) => {
    if (Array.isArray(node)) return node.forEach((n, i) => walk(n, file, `${where}[${i}]`));
    if (!node || typeof node !== 'object') return;
    const mode = node.outcome ?? node.assessment_mode;
    if (mode === 'escalate_to_advisor' && node.verdict_outcome !== 'ambiguous') invariant.push(`${file}${where}`);
    for (const [k, v] of Object.entries(node)) {
      if (OUTCOME_LISTS.includes(k) && Array.isArray(v)) {
        v.forEach((e, i) => { if (!e.verdict_outcome) missing.push(`${file}${where}.${k}[${i}]`); });
      }
      walk(v, file, `${where}.${k}`);
    }
  };
  for (const f of corpusFiles) walk(doc[f], f, '');
  for (const f of byPrefix('corpus/sectors')) {
    const ch = doc[f].allegato_iv_channel;
    if (ch && !ch.verdict_outcome) missing.push(`${f}.allegato_iv_channel`);
  }
  for (const f of byPrefix('corpus/regimes')) {
    const m = doc[f].meta ?? {};
    if (!m.assessment_mode || !m.verdict_outcome) missing.push(`${f}.meta (assessment_mode/verdict_outcome)`);
  }
  check('verdict_outcome declared (constraint 2)', missing.map((m) => `missing at ${m}`));
  check('invariant escalate_to_advisor -> ambiguous', invariant.map((m) => `violated at ${m}`));
}

// ---------------------------------------------------------------------------
// 4. override citations == regime citations
// ---------------------------------------------------------------------------
{
  const failures = [];
  const sameSet = (a = [], b = []) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
  for (const f of byPrefix('corpus/sectors')) {
    for (const o of doc[f].overrides ?? []) {
      const regime = corpusDoc(o.reference);
      if (!regime) { failures.push(`${f} [${o.trigger}]: reference ${o.reference} not found`); continue; }
      if (!sameSet(o.citations, regime.meta.citations)) {
        failures.push(`${f} [${o.trigger}]: [${o.citations}] != ${o.reference} [${regime.meta.citations}]`);
      }
    }
  }
  check('override citations == regime citations (ADR 0009)', failures);
}

// ---------------------------------------------------------------------------
// 5. every question and every option has an id; collect question ids
// ---------------------------------------------------------------------------
const questionIds = new Set();
{
  const failures = [];
  const QUESTION_LISTS = ['questions', 'sector_specific_questions', 'standard_identification_questions'];
  const visitQuestion = (q, where) => {
    if (!q.id) failures.push(`question without id at ${where}`);
    else questionIds.add(q.id);
    (q.options ?? []).forEach((o, i) => { if (!o.id) failures.push(`option without id at ${where}.options[${i}]`); });
    if (q.conditional_followup) visitQuestion(q.conditional_followup, `${where}.conditional_followup`);
  };
  for (const f of byPrefix('corpus/wizard')) {
    for (const key of QUESTION_LISTS) (doc[f][key] ?? []).forEach((q, i) => visitQuestion(q, `${f}.${key}[${i}]`));
  }
  check('every question and option has an id', failures);
}

// ---------------------------------------------------------------------------
// 6. file references
// ---------------------------------------------------------------------------
{
  const failures = [];
  for (const f of byPrefix('corpus/wizard')) {
    const sd = doc[f].meta?.sector_data;
    if (sd && !corpusDoc(sd)) failures.push(`${f}: meta.sector_data ${sd} not found`);
  }
  for (const f of files.filter((x) => x.startsWith('fixtures/') && doc[x])) {
    const refs = JSON.stringify(doc[f].expected).match(/\b(sectors|wizard|regimes|signals)\/[\w]+\.yaml/g) ?? [];
    for (const r of refs) if (!corpusDoc(r)) failures.push(`${f}: corpus_ref ${r} not found`);
  }
  check('file references resolve', failures);
}

// ---------------------------------------------------------------------------
// 7. fixtures
// ---------------------------------------------------------------------------
{
  const signalIds = new Set(byPrefix('corpus/signals').flatMap((f) => doc[f].signals.map((s) => s.id)));
  const sectorFile = (sector) => `corpus/sectors/sectors__${sector}.yaml`;
  /** Minimal trigger evaluator for "<input> == <value>" (the only form used by overrides). */
  const matches = (trigger, inputs) => {
    const m = /^(\w+)\s*==\s*(\w+)$/.exec(trigger.trim());
    if (!m) throw new Error(`unsupported override trigger: ${trigger}`);
    return String(inputs[m[1]]) === m[2];
  };
  const versionFail = [];
  const inputFail = [];
  const signalFail = [];
  const routingFail = [];
  for (const f of files.filter((x) => x.startsWith('fixtures/') && doc[x])) {
    const x = doc[f];
    if (String(x.corpus_version) !== VERSION) versionFail.push(`${f}: ${x.corpus_version} != ${VERSION}`);
    for (const k of Object.keys(x.inputs ?? {})) if (!questionIds.has(k)) inputFail.push(`${f}: input ${k}`);
    for (const s of x.expected.signals ?? []) if (!signalIds.has(s)) signalFail.push(`${f}: signal ${s}`);

    const actual = x.expected.regime_routing;
    if (!Array.isArray(actual)) { routingFail.push(`${f}: regime_routing missing or not a list`); continue; }
    const sector = doc[sectorFile(x.sector)];
    if (!sector) { routingFail.push(`${f}: sector file for ${x.sector} not found`); continue; }
    const expected = (sector.overrides ?? [])
      .filter((o) => matches(o.trigger, x.inputs))
      .map((o) => {
        const m = corpusDoc(o.reference).meta;
        return {
          regime: m.regime_id,
          routing_effect: m.routing_effect,
          residual_nis_obligation: m.residual_nis_obligation ?? null,
          exceptions_catalog_entry: m.exceptions_catalog_entry,
        };
      });
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      routingFail.push(`${f}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
    }
    // A single routed regime (no multi-regime intersection) must carry the regime's own outcome.
    if (expected.length === 1) {
      const m = corpusDoc(sector.overrides.find((o) => matches(o.trigger, x.inputs)).reference).meta;
      if (x.expected.assessment_mode !== m.assessment_mode || x.expected.verdict_outcome !== m.verdict_outcome) {
        routingFail.push(`${f}: outcome != meta of ${m.regime_id}`);
      }
    }
  }
  check(`fixtures corpus_version == ${VERSION}`, versionFail);
  check('fixture inputs are wizard question ids', inputFail.map((m) => `unknown ${m}`));
  check('fixture signals are defined', signalFail.map((m) => `undefined ${m}`));
  check('fixture regime_routing == regime meta, sector-file order (ADR 0009 amendment)', routingFail);
}

// ---------------------------------------------------------------------------
// 8. lint: unquoted YAML 1.1 booleans
// ---------------------------------------------------------------------------
{
  const failures = [];
  const BOOLISH = /(^|[:\-\[,]\s*)(yes|no|on|off|y|n)\s*($|[,\]])/i;
  for (const f of files) {
    raw[f].split(/\r?\n/).forEach((line, i) => {
      // Blank out quoted strings, then drop the comment.
      const code = line.replace(/"(?:[^"\\]|\\.)*"|'(?:[^']|'')*'/g, '""').replace(/(^|\s)#.*$/, '');
      if (BOOLISH.test(code)) failures.push(`${f}:${i + 1}: ${line.trim()}`);
    });
  }
  check('lint: no unquoted yes/no/on/off/y/n', failures);
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
for (const p of passed) console.log(`PASS  ${p}`);
for (const e of errors) console.log(`FAIL  ${e}`);
console.log(errors.length ? `\n${errors.length} failure(s)` : `\nAll ${passed.length} checks passed (corpus ${VERSION})`);
process.exit(errors.length ? 1 : 0);
