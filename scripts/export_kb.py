#!/usr/bin/env python3
"""Export the NIS2 Tool Project Knowledge from the LLM Wiki vault.

Selects every node under ``<vault>/wiki/`` whose YAML frontmatter declares
``scope: nis2_tool`` or ``scope: both`` and copies it, byte for byte, into the
``export/`` directory of this repository, mirroring the layer folders
(``sources/``, ``entities/``, ``concepts/``, ``synthesis/``).

After the export it prints:
  * the node count per layer and the total;
  * the internal ``[[wiki-links]]`` found in exported nodes that point to
    nodes which are NOT exported (i.e. what the Project Knowledge cannot see),
    split between links to existing out-of-scope nodes and links that do not
    resolve to any node of the vault.

Standard library only. Usage::

    python scripts/export_kb.py [VAULT_PATH]
    py scripts/export_kb.py [VAULT_PATH]      # Windows (Python launcher)

Vault path, in order: the ``VAULT_PATH`` argument; the ``NIS2_KB_PATH`` environment
variable; ``../LLM_Wiki`` next to this repository (the KB clone beside the tool clone).
"""

from __future__ import annotations

import os
import re
import shutil
import sys
from collections import defaultdict
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
# No user-specific path in the code: argument, then NIS2_KB_PATH, then the sibling clone.
DEFAULT_VAULT = Path(os.environ["NIS2_KB_PATH"]) if os.environ.get("NIS2_KB_PATH") else REPO_ROOT.parent / "LLM_Wiki"
EXPORT_DIR = REPO_ROOT / "export"
EXPORTED_SCOPES = {"nis2_tool", "both"}
LAYERS = ("sources", "entities", "concepts", "synthesis")

# [[target]], [[target|alias]], [[target#heading]], [[target#heading|alias]].
# Inside Markdown tables the alias pipe is escaped as "\|": the trailing
# backslash is stripped from the target below.
WIKILINK_RE = re.compile(r"\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]")


def read_scope(text: str) -> str | None:
    """Return the ``scope`` value from the frontmatter block, or None.

    Minimal parsing: the frontmatter is the block between the first line
    ``---`` and the next line ``---``; only a top-level ``scope:`` key is read.
    """
    lines = text.lstrip("\ufeff").splitlines()
    if not lines or lines[0].strip() != "---":
        return None
    for line in lines[1:]:
        if line.strip() == "---":
            break
        match = re.match(r"^scope:\s*(.*?)\s*$", line)
        if match:
            value = match.group(1).split("#", 1)[0].strip()
            return value.strip("\"'") or None
    return None


def collect_nodes(wiki_dir: Path) -> dict[str, Path]:
    """Map vault-relative node ids (e.g. ``sources/Foo``) to file paths."""
    nodes: dict[str, Path] = {}
    for path in sorted(wiki_dir.rglob("*.md")):
        if path == wiki_dir / "README.md":
            continue
        node_id = path.relative_to(wiki_dir).with_suffix("").as_posix()
        nodes[node_id] = path
    return nodes


def resolve_link(target: str, nodes: dict[str, Path], by_basename: dict[str, list[str]]) -> str | None:
    """Resolve a wiki-link target to a node id, Obsidian-style.

    A path-qualified target (``concepts/Foo``) must match exactly; a bare name
    (``Foo``) resolves by file basename when it is unique.
    """
    if target in nodes:
        return target
    if "/" not in target:
        candidates = by_basename.get(target, [])
        if len(candidates) == 1:
            return candidates[0]
    return None


def clear_export_dir(export_dir: Path) -> None:
    """Remove every file and folder inside ``export_dir`` (the dir itself stays)."""
    export_dir.mkdir(parents=True, exist_ok=True)
    for child in export_dir.iterdir():
        if child.is_dir():
            shutil.rmtree(child)
        else:
            child.unlink()


def main(argv: list[str]) -> int:
    # Node titles contain non-ASCII characters; avoid console codepage errors.
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    vault = Path(argv[1]) if len(argv) > 1 else DEFAULT_VAULT
    wiki_dir = vault / "wiki"
    if not wiki_dir.is_dir():
        print(f"error: wiki directory not found: {wiki_dir}", file=sys.stderr)
        return 1

    nodes = collect_nodes(wiki_dir)
    texts = {node_id: path.read_text(encoding="utf-8") for node_id, path in nodes.items()}
    selected = sorted(n for n in nodes if read_scope(texts[n]) in EXPORTED_SCOPES)

    # Write the export: byte-identical copies, same layer structure.
    clear_export_dir(EXPORT_DIR)
    for node_id in selected:
        destination = EXPORT_DIR / (node_id + ".md")
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(nodes[node_id], destination)

    # Counts per layer.
    per_layer: dict[str, int] = defaultdict(int)
    for node_id in selected:
        per_layer[node_id.split("/", 1)[0]] += 1
    print(f"Vault: {vault}")
    print(f"Export: {EXPORT_DIR}")
    print(f"Nodes in vault: {len(nodes)} | exported (scope nis2_tool OR both): {len(selected)}")
    for layer in LAYERS:
        print(f"  {layer:<10} {per_layer.get(layer, 0)}")
    others = sorted(set(per_layer) - set(LAYERS))
    for layer in others:
        print(f"  {layer:<10} {per_layer[layer]}")
    print(f"  {'TOTAL':<10} {len(selected)}")

    # Links from exported nodes to nodes outside the export.
    by_basename: dict[str, list[str]] = defaultdict(list)
    for node_id in nodes:
        by_basename[node_id.rsplit("/", 1)[-1]].append(node_id)
    exported = set(selected)
    not_exported: dict[str, set[str]] = defaultdict(set)  # target node -> sources
    unresolved: dict[str, set[str]] = defaultdict(set)  # raw target -> sources
    for node_id in selected:
        for match in WIKILINK_RE.finditer(texts[node_id]):
            target = match.group(1).strip().rstrip("\\").strip()
            resolved = resolve_link(target, nodes, by_basename)
            if resolved is None:
                unresolved[target].add(node_id)
            elif resolved not in exported:
                not_exported[resolved].add(node_id)

    print()
    print(f"Links to existing nodes NOT exported: {len(not_exported)} target(s)")
    for target in sorted(not_exported):
        scope = read_scope(texts[target]) or "(none)"
        print(f"  [[{target}]] (scope: {scope}) <- {len(not_exported[target])} node(s)")
        for source in sorted(not_exported[target]):
            print(f"      - {source}")

    print()
    print(f"Links that resolve to no wiki node: {len(unresolved)} target(s)")
    for target in sorted(unresolved):
        print(f"  [[{target}]] <- {len(unresolved[target])} node(s)")
        for source in sorted(unresolved[target]):
            print(f"      - {source}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
