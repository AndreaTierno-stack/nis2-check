/**
 * CLI: `pnpm corpus:validate [corpusDir] [fixturesDir]`. Exit code 1 on any violation.
 */
import { loadFromDisk, DEFAULT_CORPUS_DIR, DEFAULT_FIXTURES_DIR } from './load.ts';
import { validateCorpus } from './validate.ts';

const [corpusDir = DEFAULT_CORPUS_DIR, fixturesDir = DEFAULT_FIXTURES_DIR] = process.argv.slice(2);
const { corpus, sources, parseErrors } = loadFromDisk(corpusDir, fixturesDir);
const result = validateCorpus(corpus, sources, parseErrors);
const files = Object.keys(sources).length;
for (const w of result.warnings) console.log(`WARN  ${w}`);

if (result.ok) {
  console.log(`corpus:validate OK — corpus ${corpus.version}, ${files} YAML files (${Object.keys(corpus.fixtures).length} fixtures)`);
} else {
  for (const e of result.errors) console.log(`FAIL  ${e}`);
  console.log(`\ncorpus:validate: ${result.errors.length} violation(s) — corpus ${corpus.version}, ${files} YAML files`);
  process.exitCode = 1;
}
