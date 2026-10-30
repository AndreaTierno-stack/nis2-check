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
 * Copy lint for the navigation and structure strings of the web app (apps/web/src/copy.it.ts,
 * S4.1): the words of ADR 0012 and of CLAUDE.md constraint 1, and no long dash.
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
  }
  return out;
}
