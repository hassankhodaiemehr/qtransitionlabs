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

FEATURED_IDS = [
    "279", "003", "002", "102", "197", "271", "087", "221", "362", "004", "284", "069",
]

CATEGORY_LABELS = {
    "quantum-algorithms": "Quantum algorithms & physics",
    "complexity-hardness": "Complexity & hardness",
    "number-theory-crypto": "Number theory & ECC",
    "algebra-structures": "Algebra & structures",
    "factorization-arithmetic": "Factorization & arithmetic",
    "spin-statistical": "Spin & statistical physics",
    "ai-verification": "Formal verification",
}

RULES = [
    ("quantum-algorithms", r"quantum factoring|quantum quer|quantum depletion|quantum geometric|Bose.?Einstein|Heisenberg|Vlasov.?Maxwell|quantum Heisenberg|relativistic Vlasov|randomized and quantum"),
    (
        "complexity-hardness",
        r"NP-hard|NP hard|undecidable|semidefinite|#P\b|PSPACE|unique games|2-to-1 games|approximation ratio|goemans.?williamson",
    ),
    (
        "number-theory-crypto",
        r"quasi-riemann|riemann hypothesis|riemann zeta|landau.?siegel|dirichlet l|elliptic curve|bsd|selmer|tate.?shaf|modularity|goldfeld|hilbert.?s tenth|rational zero|class number|cm abelian|hodge conjecture|tate conjecture|birch.?swinnerton|hecke l",
    ),
    ("algebra-structures", r"lattice von Neumann|Kaplansky|Mahler|free group factor|Baum.?Connes|Kadison|isomorphism of.*factor|quasitrace|zero-divisor conjecture"),
    ("factorization-arithmetic", r"polynomial factorization|factorization over|quantum factoring|totient|prime gap|largest prime factor"),
    ("spin-statistical", r"spin glass|Ising|magnetization|Bloch.?s law|Mézard|Mezard.?Parisi"),
    ("ai-verification", r"Lean formal|formalization|\[Lean\]"),
]


def clean_tex(s: str) -> str:
    s = s.replace("\u2019", "'").replace("\u2018", "'").replace("�", "'")
    s = s.replace('\\"', '"').replace("''", "'")
    s = s.replace("---", "—").replace("--", "–")

    replacements = [
        (r"\$\\zeta\(s\)\$", "ζ(s)"),
        (r"\$\\zeta\(s\)", "ζ(s)"),
        (r"\$L\$", "L"),
        (r"\$L\^2\$", "L²"),
        (r"\$\\Re s>7/8\$", "Re(s) > 7/8"),
        (r"\$\\Re s>11/12\$", "Re(s) > 11/12"),
        (r"\$S\^4\$", "S⁴"),
        (r"\$\\mathbb\{CP\}\^2\$", "CP²"),
        (r"\$\\mathbb\{S\}\^2\$", "S²"),
        (r"\\mathbb\{Q\}\(\\sqrt\{-3\}\)", "Q(√−3)"),
        (r"\\mathbb\{Q\}", "Q"),
        (r"\\mathbb\{CP\}\^2", "CP²"),
        (r'K\\"ahler', "Kähler"),
        (r'M\\"obius', "Möbius"),
        (r'H\\"older', "Hölder"),
        (r"\\CP\^2", "CP²"),
    ]
    for pattern, repl in replacements:
        s = re.sub(pattern, repl, s)

    s = re.sub(r"\\[a-zA-Z]+\*?(\{[^}]*\})*", " ", s)
    s = re.sub(r"\$[^$]+\$", " ", s)
    s = re.sub(r"\\href\{[^}]+\}\{[^}]+\}", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def clean_title(title: str) -> str:
    return clean_tex(title) if "\\" in title or "$" in title else title.replace("--", "–")


def parse_entries(text: str):
    pattern = re.compile(
        r"\\resultentry\{(\d+)\}\{([^{}]+)\}\{(.+?)\}\{\\href",
        re.DOTALL,
    )
    entries = []
    for m in pattern.finditer(text):
        fid, title, desc = m.group(1), m.group(2), m.group(3)
        title = clean_title(title)
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

    by_id = {e["id"]: e for e in entries}
    for hid in {"007", "017", "087", "102", "159", "197", "221", "271", "287", "362"}:
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
        "featured_ids": FEATURED_IDS,
        "categories": [
            {"id": k, "label": CATEGORY_LABELS.get(k, k.replace("-", " ").title()), "description": v}
            for k, v in IMPACT.items()
        ],
        "entries": relevant,
    }
    dest = Path("_data/openai_math_pqc_map.json")
    dest.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Parsed {len(entries)} families; {len(relevant)} PQC-relevant -> {dest}")


if __name__ == "__main__":
    main()
