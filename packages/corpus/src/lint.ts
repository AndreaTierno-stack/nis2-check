/**
 * Line-based lints that a YAML parser cannot see (quoting is lost after parsing).
 */
import { E, msg } from './schemas/common.ts';
import type { SourceTexts } from './load.ts';

/**
 * Unquoted YAML 1.1 booleans (`yes`/`no`/`on`/`off`/`y`/`n`) used as scalar values.
 * js-yaml v4 reads them as strings, a YAML 1.1 parser as booleans: they must be quoted.
 */
const BOOLISH = /(^|[:\-[,]\s*)(yes|no|on|off|y|n)\s*($|[,\]])/i;

export function lintYamlBooleans(sources: SourceTexts): string[] {
  const out: string[] = [];
  for (const [file, text] of Object.entries(sources)) {
    text.split(/\r?\n/).forEach((line, i) => {
      // blank out quoted strings, then drop the trailing comment
      const code = line.replace(/"(?:[^"\]|\.)*"|'(?:[^']|'')*'/g, '""').replace(/(^|\s)#.*$/, '');
      if (BOOLISH.test(code)) out.push(msg(E.YAML_BOOL, `${file}:${i + 1}: unquoted boolean-like scalar: ${line.trim()}`));
    });
  }
  return out;
}

/**
 * Copy lint for texts shown to the tool's user from the exceptions catalog
 * (ADR 0012): forbidden categorical/prescriptive wording (CLAUDE.md, constraint 1)
 * and constrained naming: "CER" (ADR 0004), "salvaguardia" only as "salvaguardia
 * dimensionale" (corpus CHANGELOG 0.2.0, B5; no ADR), "esclusioni" only with
 * "di sicurezza nazionale".
 */
const FORBIDDEN: { re: RegExp; why: string }[] = [
  { re: /\brientri\b/i, why: '"Rientri" (categorical)' },
  { re: /\bsei (dentro|conforme|tenuto)\b/i, why: 'second-person verdict' },
  { re: /\bdevi\b/i, why: '"Devi" (prescriptive)' },
  { re: /\badempi\b/i, why: '"Adempi" (prescriptive)' },
  { re: /\bimplementa\b/i, why: '"Implementa" (prescriptive)' },
  { re: /\breport di compliance\b/i, why: '"report di compliance"' },
  { re: /\baudit\b/i, why: '"audit"' },
  { re: /\bdiagnosi\b/i, why: '"diagnosi"' },
  { re: /\bcertificazione\b/i, why: '"certificazione"' },
  { re: /\bsalvaguardia\b(?! dimensionale)/i, why: 'bare "salvaguardia" (CHANGELOG 0.2.0, B5)' },
  { re: /\bCER\b/, why: 'bare "CER" (ADR 0004)' },
  { re: /\besclusioni\b(?! di sicurezza nazionale)/i, why: 'bare "esclusioni": use "esclusioni di sicurezza nazionale (art. 4 D.Lgs. 138/2024)"' },
];

export function lintCatalogCopy(exceptions: Record<string, unknown>): string[] {
  const out: string[] = [];
  for (const [file, doc] of Object.entries(exceptions)) {
    const entries = (doc as { exceptions?: { id?: string; title?: string; description?: string }[] })?.exceptions ?? [];
    for (const e of entries) {
      for (const field of ['title', 'description'] as const) {
        const text = e[field] ?? '';
        for (const { re, why } of FORBIDDEN) {
          if (re.test(text)) out.push(msg(E.COPY, `${file} > ${e.id} > ${field}: ${why}`));
        }
      }
    }
  }
  return out;
}

/** Copy lint for the registry labels (corpus 0.11.0): they are the "Fonti" texts of the UI and the PDF. */
export function lintRegistryLabels(citations: Record<string, unknown>): string[] {
  const out: string[] = [];
  for (const [file, doc] of Object.entries(citations)) {
    const entries = (doc as { citations?: { id?: string; label?: string }[] })?.citations ?? [];
    for (const e of entries) {
      for (const { re, why } of FORBIDDEN) {
        if (e.label && re.test(e.label)) out.push(msg(E.COPY, `${file} > ${e.id} > label: ${why}`));
      }
      if (e.label?.includes('—')) out.push(msg(E.COPY, `${file} > ${e.id} > label: long dash`));
    }
  }
  return out;
}

/**
 * Word-final vowels written with an apostrophe instead of an accent ("attivita'", "e'", "piu'"),
 * review 2026-11-02, F18 (corpus 0.13.1).
 *
 * An apostrophe between two letters is an elision ("l'analisi") and is ignored. An apostrophe
 * preceded by a non-letter and followed by a non-space opens a single-quoted span ('impatto alto');
 * the next apostrophe after a letter closes it. Any other apostrophe after a vowel ends a word
 * written without its accent. "po'" (troncamento of "poco") is correct Italian.
 *
 * @returns the offending words, in order of appearance
 */
const LETTER = /\p{L}/u;
const VOWEL = /[aeiou]/i;
const APOSTROPHE_EXCEPTIONS = new Set(['po']);

export function apostropheAccents(text: string): string[] {
  const found: string[] = [];
  let inQuote = false;
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== "'") continue;
    const before = text[i - 1] ?? '';
    const after = text[i + 1] ?? '';
    const letterBefore = LETTER.test(before);
    const letterAfter = LETTER.test(after);
    if (letterBefore && letterAfter) continue; // elision
    if (!letterBefore) {
      if (after && !/\s/.test(after)) inQuote = true; // opening quote ('impatto alto', '«servizio ...')
      continue;
    }
    if (inQuote) {
      inQuote = false; // closing quote
      continue;
    }
    const word = /\p{L}+$/u.exec(text.slice(0, i))![0];
    if (VOWEL.test(before) && !APOSTROPHE_EXCEPTIONS.has(word.toLowerCase())) found.push(`${word}'`);
  }
  return found;
}

/**
 * Visits every string value of the corpus files with its file and path (YAML comments are not
 * parsed). Keys in `skip` are not visited.
 */
function walkStrings(
  groups: Record<string, Record<string, unknown>>,
  visit: (file: string, path: string, text: string) => void,
  skip: ReadonlySet<string> = new Set(),
) {
  const walk = (file: string, node: unknown, path: string) => {
    if (typeof node === 'string') visit(file, path, node);
    else if (Array.isArray(node)) node.forEach((v, i) => walk(file, v, `${path}[${i}]`));
    else if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) if (!skip.has(k)) walk(file, v, path ? `${path} > ${k}` : k);
    }
  };
  for (const files of Object.values(groups)) for (const [file, doc] of Object.entries(files)) walk(file, doc, '');
}

/**
 * Applies {@link apostropheAccents} to every string value of the corpus files (YAML comments are
 * not parsed and are not checked). The check covers every value, not a list of user-facing
 * fields: texts reach the UI and the PDF from many keys (questions, help, options, rule and
 * conflict traces, signals, catalog, registry labels, regime notes).
 */
export function lintApostropheAccents(groups: Record<string, Record<string, unknown>>): string[] {
  const out: string[] = [];
  walkStrings(groups, (file, path, text) => {
    const words = apostropheAccents(text);
    if (words.length) out.push(msg(E.COPY, `${file} > ${path}: apostrophe instead of accent (${words.join(', ')})`));
  });
  return out;
}

/** Keys whose values are locators in the corpus (`<file>#<key>`), not texts for the user. */
const LOCATOR_KEYS: ReadonlySet<string> = new Set(['applies_to', 'referenced_by', 'reference', 'corpus_ref', 'kb_node']);

/**
 * Markdown syntax in the corpus texts (corpus 0.13.2, review F13): the app shows the texts as
 * plain text, so a table ("|" at the start of a line) or a heading or anchor ("#") reaches the user
 * raw. Checked on every string value except the locators ({@link LOCATOR_KEYS}).
 */
export function lintMarkdownSyntax(groups: Record<string, Record<string, unknown>>): string[] {
  const out: string[] = [];
  walkStrings(
    groups,
    (file, path, text) => {
      if (/^\s*\|/m.test(text)) out.push(msg(E.COPY, `${file} > ${path}: "|" at the start of a line (markdown table)`));
      if (text.includes('#')) out.push(msg(E.COPY, `${file} > ${path}: "#" in a text for the user`));
    },
    LOCATOR_KEYS,
  );
  return out;
}

/**
 * Copy lint for the navigation and structure strings of the web app (apps/web/src/copy.it.ts,
 * S4.1): the words of ADR 0012 and of CLAUDE.md constraint 1, no long dash and no apostrophe in
 * place of an accent (corpus 0.13.1).
 */
const UI_FORBIDDEN: { re: RegExp; why: string }[] = [
  { re: /\brientri\b/i, why: '"Rientri"' },
  { re: /\bsei dentro\b/i, why: '"Sei dentro"' },
  { re: /\bsei conforme\b/i, why: '"Sei conforme"' },
  { re: /\bdevi\b/i, why: '"Devi"' },
  { re: /\bsei tenuto a\b/i, why: '"Sei tenuto a"' },
  { re: /\badempi a\b/i, why: '"Adempi a"' },
  { re: /\bimplementa\b/i, why: '"Implementa"' },
  { re: /\bcompliance\b/i, why: '"compliance"' },
  { re: /\baudit\b/i, why: '"audit"' },
  { re: /\bdiagnosi\b/i, why: '"diagnosi"' },
  { re: /\bcertificazione\b/i, why: '"certificazione"' },
  { re: /—/, why: 'long dash' },
];

/** @returns one message per forbidden form found in each string, keyed by its path */
export function lintUiCopy(strings: Record<string, string>): string[] {
  const out: string[] = [];
  for (const [key, text] of Object.entries(strings)) {
    for (const { re, why } of UI_FORBIDDEN) if (re.test(text)) out.push(msg(E.COPY, `copy.it.ts > ${key}: ${why}`));
    const words = apostropheAccents(text);
    if (words.length) out.push(msg(E.COPY, `copy.it.ts > ${key}: apostrophe instead of accent (${words.join(', ')})`));
  }
  return out;
}
