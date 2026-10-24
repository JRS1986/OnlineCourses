#!/usr/bin/env python3
"""Check local Markdown links, assessment references, and mirrored question text."""

import re
from pathlib import Path
from urllib.parse import unquote, urlsplit

from assess import PATHS, QUESTIONS, REFRESHERS

ROOT = Path(__file__).resolve().parents[1]


def markdown_text(path):
    return re.sub(r"^```[^\n]*\n.*?^```\s*$", "", path.read_text(), flags=re.M | re.S)


def anchors(path):
    body = markdown_text(path)
    result = set(re.findall(r'<a\s+(?:id|name)="([^"]+)"', body))
    seen = {}
    for heading in re.findall(r"^#{1,6}\s+(.+?)\s*#*\s*$", body, re.M):
        heading = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", heading)
        slug = re.sub(r"[^\w\- ]", "", heading.lower()).replace(" ", "-")
        count = seen.get(slug, 0)
        seen[slug] = count + 1
        result.add(slug + (f"-{count}" if count else ""))
    return result


def main():
    errors = []
    checked = 0
    markdown = sorted(p for p in ROOT.rglob("*.md") if ".git" not in p.parts)
    for path in markdown:
        for raw in re.findall(r"\[[^\]]*\]\(([^\s)]+)(?:\s+\"[^\"]*\")?\)", markdown_text(path)):
            url = urlsplit(raw.strip("<>"))
            if url.scheme or url.netloc:
                continue
            target = (path.parent / unquote(url.path)).resolve() if url.path else path
            checked += 1
            if not target.exists():
                errors.append(f"{path.relative_to(ROOT)}: missing {raw}")
            elif url.fragment and target.suffix == ".md" and unquote(url.fragment) not in anchors(target):
                errors.append(f"{path.relative_to(ROOT)}: missing anchor {raw}")

    catalogue = ROOT / "docs/CATALOG.md"
    catalogue_ids = re.findall(r'<a id="([^"]+)"', catalogue.read_text())
    if len(catalogue_ids) != len(set(catalogue_ids)):
        errors.append("Duplicate catalogue IDs")
    path_anchors = anchors(ROOT / "docs/LEARNING_PATHS.md")
    for key, path in PATHS.items():
        if path.anchor not in path_anchors:
            errors.append(f"Assessment path {key} has no matching documentation anchor")
        for ref in path.resources:
            if ref.lower() not in catalogue_ids:
                errors.append(f"Assessment path {key} has an unknown resource {ref}")
    for domain, refs in REFRESHERS.items():
        for ref in refs:
            if ref.lower() not in catalogue_ids:
                errors.append(f"Assessment topic {domain} has an unknown resource {ref}")
    interview = (ROOT / "docs/ASSESSMENT.md").read_text()
    for q in QUESTIONS:
        if f"### {q.id} — {q.domain}" not in interview or q.prompt not in interview or q.explanation not in interview:
            errors.append(f"Interview documentation is out of sync for {q.id}")
        if any(option not in interview for option in q.options):
            errors.append(f"Interview options are out of sync for {q.id}")
    if errors:
        print("\n".join(errors))
        return 1
    print(f"Checked {len(markdown)} Markdown files, {checked} local references, {len(PATHS)} assessment paths, and {len(QUESTIONS)} questions.")
    print("External availability is documented in RESEARCH.md; this check does not access the network.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
