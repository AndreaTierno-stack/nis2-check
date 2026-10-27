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
