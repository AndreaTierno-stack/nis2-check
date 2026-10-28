/**
 * Resolver for the `corpus_ref` field of the golden fixtures.
 *
 * Grammar (formalized from the forms used by E01–E15; paths are relative to the
 * corpus root, not to the monorepo):
 *
 *   corpus_ref := part ( SEP part )*          SEP := " -> " | " + " | ", "  (outside brackets)
 *   part       := file [ "#" path ] | path    (a bare path reuses the previous part's file)
 *   file       := ("sectors" | "wizard" | "regimes" | "signals" | "exceptions" | "citations") "/" name ".yaml"
 *   path       := step ( "." step )*
 *   step       := name [ "[" selector ( "," selector )* "]" ]
 *
 * A step `name` resolves to the key `name` of the current object; failing that, to
 * the wizard question, conditional follow-up or list element whose `id` is `name`.
 * A selector matches a list element (searching the lists below the current node
 * when the node is an object) when, ignoring whitespace, it equals the element's
 * `condition`, `trigger`, `case` or `id`, or has the form `k==v` with element[k] == v
 * (or element.id == v when the element has no key `k`). Every selector must match.
 */

type Node = unknown;
const isObj = (n: Node): n is Record<string, unknown> => typeof n === 'object' && n !== null && !Array.isArray(n);
const norm = (s: string) => s.replace(/\s+/g, '');
const QUESTION_LISTS = ['questions', 'sector_specific_questions', 'standard_identification_questions'];

/** Splits on top-level separators, ignoring those inside brackets. */
function splitTopLevel(ref: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < ref.length; i++) {
    const ch = ref[i]!;
    if (ch === '[') depth++;
    if (ch === ']') depth--;
    if (depth === 0) {
      const rest = ref.slice(i);
      const sep = [' -> ', ' + ', ', '].find((s) => rest.startsWith(s));
      if (sep) {
        parts.push(cur.trim());
        cur = '';
        i += sep.length - 1;
        continue;
      }
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

/** Splits a path into steps on dots outside brackets. */
function splitSteps(path: string): string[] {
  const steps: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of path) {
    if (ch === '[') depth++;
    if (ch === ']') depth--;
    if (ch === '.' && depth === 0) {
      steps.push(cur);
      cur = '';
    } else cur += ch;
  }
  steps.push(cur);
  return steps;
}

function elementMatches(el: Node, selector: string): boolean {
  if (!isObj(el)) return false;
  const sel = norm(selector);
  for (const k of ['condition', 'trigger', 'case', 'id']) {
    const v = el[k];
    if (typeof v === 'string' && norm(v) === sel) return true;
  }
  const kv = /^([A-Za-z0-9_]+)==([A-Za-z0-9_]+)$/.exec(sel);
  if (kv) {
    const [, k, v] = kv;
    if (k! in el) return String(el[k!]) === v;
    return el.id === v;
  }
  return false;
}

/** Lists to search for selectors: the node itself if it is a list, else its list-valued keys. */
function candidateLists(node: Node): Node[][] {
  if (Array.isArray(node)) return [node];
  if (isObj(node)) return Object.values(node).filter((v): v is Node[] => Array.isArray(v));
  return [];
}

function resolveStep(node: Node, name: string): Node | undefined {
  if (isObj(node)) {
    if (name in node) return node[name];
    for (const list of QUESTION_LISTS) {
      const qs = node[list];
      if (Array.isArray(qs)) {
        const q = qs.find((x) => isObj(x) && x.id === name);
        if (q) return q;
      }
    }
    const fu = node.conditional_followup;
    if (isObj(fu) && fu.id === name) return fu;
  }
  if (Array.isArray(node)) return node.find((x) => isObj(x) && x.id === name);
  return undefined;
}

/**
 * Resolves a corpus_ref against the loaded corpus files.
 *
 * @param ref - the corpus_ref string
 * @param files - corpus files keyed by corpus-relative path (e.g. "sectors/sectors__x.yaml")
 * @returns the list of problems (empty when every part resolves)
 */
export function resolveCorpusRef(ref: string, files: Readonly<Record<string, Node>>): string[] {
  const problems: string[] = [];
  let currentFile: string | undefined;
  for (const part of splitTopLevel(ref)) {
    const m = /^((?:sectors|wizard|regimes|signals|exceptions|citations)\/[A-Za-z0-9_]+\.yaml)?(?:#?(.*))$/.exec(part);
    const file = m?.[1];
    const path = m?.[2] ?? '';
    if (file) currentFile = file;
    if (!currentFile) {
      problems.push(`"${part}": no file to resolve against`);
      continue;
    }
    let node: Node = files[currentFile];
    if (node === undefined) {
      problems.push(`"${part}": file ${currentFile} not found`);
      continue;
    }
    if (!path) continue;
    for (const step of splitSteps(path)) {
      const sm = /^([A-Za-z0-9_]+)(?:\[(.+)\])?$/.exec(step);
      if (!sm) {
        problems.push(`"${part}": malformed step "${step}"`);
        node = undefined;
        break;
      }
      const [, name, selectors] = sm;
      node = resolveStep(node, name!);
      if (node === undefined) {
        problems.push(`"${part}": "${name}" not found`);
        break;
      }
      if (selectors) {
        const lists = candidateLists(node);
        for (const sel of selectors.split(',')) {
          if (!lists.some((l) => l.some((el) => elementMatches(el, sel)))) {
            problems.push(`"${part}": selector [${sel.trim()}] matches nothing under "${name}"`);
          }
        }
      }
    }
  }
  return problems;
}
