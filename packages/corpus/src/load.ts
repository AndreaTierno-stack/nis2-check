/**
 * YAML loader for the corpus and the golden fixtures (js-yaml v4, YAML 1.2 core
 * schema: `yes`/`no` are strings). Pure I/O: no validation here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/** Default corpus root: packages/corpus/corpus. */
export const DEFAULT_CORPUS_DIR = path.join(PKG_ROOT, 'corpus');
/** Default fixtures dir: packages/engine/tests/fixtures. */
export const DEFAULT_FIXTURES_DIR = path.resolve(PKG_ROOT, '..', 'engine', 'tests', 'fixtures');

export const CORPUS_FOLDERS = ['sectors', 'wizard', 'regimes', 'signals'] as const;
export type CorpusFolder = (typeof CORPUS_FOLDERS)[number];

/** Raw (unvalidated) corpus as read from disk; file maps are keyed by corpus-relative path. */
export interface RawCorpus {
  version: string;
  sectors: Record<string, unknown>;
  wizard: Record<string, unknown>;
  regimes: Record<string, unknown>;
  signals: Record<string, unknown>;
  fixtures: Record<string, unknown>;
}

/** Source text of every loaded file, keyed by display path (for line-based lints). */
export type SourceTexts = Record<string, string>;

export interface LoadResult {
  corpus: RawCorpus;
  sources: SourceTexts;
  parseErrors: string[];
}

const yamlFiles = (dir: string) => fs.readdirSync(dir).filter((f) => f.endsWith('.yaml')).sort();

/** Parses YAML text with js-yaml v4 (YAML 1.2 core schema). */
export const parseYaml = (text: string): unknown => yaml.load(text);

/**
 * Loads corpus and fixtures from disk.
 *
 * @param corpusDir - corpus root (contains VERSION, sectors/, wizard/, regimes/, signals/)
 * @param fixturesDir - directory of the E*.yaml fixtures
 */
export function loadFromDisk(corpusDir = DEFAULT_CORPUS_DIR, fixturesDir = DEFAULT_FIXTURES_DIR): LoadResult {
  const sources: SourceTexts = {};
  const parseErrors: string[] = [];
  const read = (abs: string, display: string): unknown => {
    const text = fs.readFileSync(abs, 'utf8');
    sources[display] = text;
    try {
      return parseYaml(text);
    } catch (e) {
      parseErrors.push(`${display}: ${(e as Error).message.split('\n')[0]}`);
      return undefined;
    }
  };
  const corpus: RawCorpus = {
    version: fs.readFileSync(path.join(corpusDir, 'VERSION'), 'utf8').trim(),
    sectors: {},
    wizard: {},
    regimes: {},
    signals: {},
    fixtures: {},
  };
  for (const folder of CORPUS_FOLDERS) {
    for (const f of yamlFiles(path.join(corpusDir, folder))) {
      const rel = `${folder}/${f}`;
      corpus[folder][rel] = read(path.join(corpusDir, folder, f), rel);
    }
  }
  for (const f of yamlFiles(fixturesDir).filter((f) => /^E\d{2}_/.test(f))) {
    corpus.fixtures[f] = read(path.join(fixturesDir, f), `fixtures/${f}`);
  }
  return { corpus, sources, parseErrors };
}
