/**
 * @nis2-check/corpus — declarative normative corpus, zod schemas and loader.
 */
export { CorpusSchema, CorpusInput, OVERRIDE_TRIGGER_RE, DIMENSION_CITATIONS, unusedRegistryEntries } from './schemas/corpus.ts';
export type { Corpus } from './schemas/corpus.ts';
export * from './schemas/files.ts';
export { E, W, CITATION_ID_RE, collectCitationIds, type ErrorCode, type WarningCode } from './schemas/common.ts';
export { loadFromDisk, parseYaml, DEFAULT_CORPUS_DIR, DEFAULT_FIXTURES_DIR, type RawCorpus, type SourceTexts } from './load.ts';
export { validateCorpus, type ValidationResult } from './validate.ts';
export { apostropheAccents, lintApostropheAccents, lintCatalogCopy, lintMarkdownSyntax, lintRegistryLabels, lintRepeatedClosing, lintUiCopy, lintYamlBooleans } from './lint.ts';
export { resolveCorpusRef } from './corpusRef.ts';
