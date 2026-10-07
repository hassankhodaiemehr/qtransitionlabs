import json
import re
from collections import Counter
from pathlib import Path

entries = json.loads(Path("_data/openai_math_pqc_map.json").read_text(encoding="utf-8"))["entries"]
patterns = [
    ("backslash", re.compile(r"\\")),
    ("json-escaped-quote-in-word", re.compile(r'[A-Za-z]"[A-Za-z]')),
    ("replacement-char", re.compile("�")),
    ("double-space", re.compile(r"  +")),
    ("empty-fragment", re.compile(r"\b(the|over|in|of|to|for|a|an|is|are)\s+[.,;]")),
    ("truncated-word", re.compile(r"[a-zA-Z]{1,3}…")),
    ("lone-comma-space", re.compile(r",\s*,")),
    ("open-brace-remnant", re.compile(r"\{|\}")),
    ("dollar-remnant", re.compile(r"\$")),
    ("caret-remnant", re.compile(r"\^")),
    ("underscore-remnant", re.compile(r"_\{")),
]
by_type = Counter()
rows = []
for e in entries:
    blob = e["title"] + " " + e["summary"]
    for name, rx in patterns:
        if rx.search(blob):
            by_type[name] += 1
            rows.append((e["id"], name, e["title"][:60], e["summary"][:100]))
            break
print("flagged", len(rows), "of", len(entries))
print("by_type", dict(by_type))
for r in rows:
    print(r[0], r[1], "|", r[2], "|", r[3])
