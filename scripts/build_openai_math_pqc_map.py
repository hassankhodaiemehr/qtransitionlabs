"""Build PQC-relevant map from openai/math overview.tex (run locally after fetching overview)."""
import json
import re
import sys
from pathlib import Path

IMPACT = {
    "quantum-algorithms": "Directly shapes quantum threat models, algorithm timelines, or query-complexity assumptions used in security proofs.",
    "complexity-hardness": "Changes hardness or approximation barriers that underpin cryptographic reductions and parameter selection.",
    "number-theory-crypto": "Touches integer factorization, elliptic-curve, or analytic-number-theory assumptions behind classical public-key cryptography.",
    "algebra-structures": "Advances algebraic structures (factors, lattices, traces) that appear in advanced crypto constructions and side-channel theory.",
    "factorization-arithmetic": "Affects polynomial or integer factorization—core to RSA/DSA analysis and to comparing classical vs quantum factoring.",
    "spin-statistical": "Quantum many-body and statistical-physics results inform error correction, randomness, and hardware noise models.",
    "ai-verification": "Formal proof artifacts improve assurance for crypto implementations and protocol verification pipelines.",
}

RULES = [
    ("quantum-algorithms", r"quantum factoring|quantum quer|quantum depletion|quantum geometric|Bose.?Einstein|Heisenberg|Vlasov.?Maxwell|quantum Heisenberg|relativistic Vlasov|randomized and quantum"),
    ("complexity-hardness", r"NP-hard|NP hard|undecidable|semidefinite|#P|PSPACE|hardness|approximation|complexity"),
    ("number-theory-crypto", r"Riemann|zeta|Dirichlet L|elliptic curve|BSD|Selmer|Tate|modularity|prime factor|Goldfeld|Hilbert.?s tenth|rational zero|class number|CM abelian|Hodge|Tate conjecture|Landau.?Siegel|Birch"),
    ("algebra-structures", r"lattice von Neumann|Kaplansky|Mahler|free group factor|Baum.?Connes|Kadison|isomorphism of.*factor|quasitrace|zero-divisor conjecture"),
    ("factorization-arithmetic", r"polynomial factorization|factorization over|factoring|totient|prime gap|largest prime factor"),
    ("spin-statistical", r"spin glass|Ising|magnetization|Bloch.?s law|Mézard|Mezard.?Parisi"),
    ("ai-verification", r"Lean formal|formalization|\[Lean\]"),
]


def clean_tex(s: str) -> str:
    s = re.sub(r"\\[a-zA-Z]+(\*?)(\{[^}]*\})?", " ", s)
    s = re.sub(r"\$[^$]*\$", " ", s)
    s = re.sub(r"\\href\{[^}]+\}\{[^}]+\}", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def parse_entries(text: str):
    pattern = re.compile(
        r"\\resultentry\{(\d+)\}\{([^{}]+)\}\{(.+?)\}\{\\href",
        re.DOTALL,
    )
    entries = []
    for m in pattern.finditer(text):
        fid, title, desc = m.group(1), m.group(2), m.group(3)
        summary = clean_tex(desc)
        if len(summary) > 360:
            summary = summary[:357] + "…"
        entries.append({"id": fid, "title": title, "summary": summary})
    return entries


def classify(entry: dict) -> list[str]:
    blob = f"{entry['title']} {entry['summary']}".lower()
    cats = []
    for cat, rx in RULES:
        if re.search(rx, blob, re.I):
            cats.append(cat)
    return cats


def primary_impact(categories: list[str]) -> str:
    if not categories:
        return ""
    order = list(IMPACT.keys())
    primary = min(categories, key=lambda c: order.index(c))
    return IMPACT[primary]


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "_tmp_overview.tex")
    text = src.read_text(encoding="utf-8", errors="replace")
    entries = parse_entries(text)
    for e in entries:
        e["categories"] = classify(e)
        e["pqc_impact"] = primary_impact(e["categories"])
        e["repo_url"] = f"https://github.com/openai/math/tree/main#result-{e['id']}"

    relevant = [e for e in entries if e["categories"]]
    # Always include headline families from OpenAI README reasoning traces
    headline_ids = {"007", "017", "087", "102", "159", "197", "221", "271", "287", "362"}
    by_id = {e["id"]: e for e in entries}
    for hid in headline_ids:
        if hid in by_id and not by_id[hid]["categories"]:
            by_id[hid]["categories"] = ["complexity-hardness"]
            by_id[hid]["pqc_impact"] = IMPACT["complexity-hardness"]

    relevant = [e for e in entries if e["categories"]]
    relevant.sort(key=lambda e: (e["categories"][0], int(e["id"])))

    out = {
        "source": "https://github.com/openai/math",
        "families_total": 372,
        "manuscripts_total": 722,
        "pqc_relevant_count": len(relevant),
        "categories": [
            {"id": k, "label": k.replace("-", " ").title(), "description": v}
            for k, v in IMPACT.items()
        ],
        "entries": relevant,
    }
    dest = Path("_data/openai_math_pqc_map.json")
    dest.write_text(json.dumps(out, indent=2), encoding="utf-8")
    print(f"Parsed {len(entries)} families; {len(relevant)} PQC-relevant -> {dest}")


if __name__ == "__main__":
    main()
