"""Build OpenAI math catalog map (PQC-curated + full browseable families)."""
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
    "general-mathematics": "Included for full-catalog browsing. No specific post-quantum migration impact is assigned by QTL.",
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
    "general-mathematics": "General math (non-PQC)",
}

GENERAL_NOTE = (
    "General mathematics result in the OpenAI catalog. QTL does not classify this family "
    "as directly relevant to post-quantum migration planning."
)

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

PQC_CATEGORY_IDS = [k for k in IMPACT if k != "general-mathematics"]


def clean_tex(s: str) -> str:
    s = s.replace("\u2019", "'").replace("\u2018", "'").replace("�", "'")
    s = re.sub(r'K\\+"ahler', "Kähler", s, flags=re.I)
    s = re.sub(r'M\\+"obius', "Möbius", s, flags=re.I)
    s = re.sub(r'H\\+"older', "Hölder", s, flags=re.I)
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
        (r"\$\\mathbb\s+Q\(\\sqrt\{-3\}\)\$", "Q(√−3)"),
        (r"\$\\mathbb Q\(\\sqrt\{-3\}\)\$", "Q(√−3)"),
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


def github_blob_to_raw(url: str) -> str:
    if "/blob/" in url:
        return url.replace("https://github.com/", "https://raw.githubusercontent.com/").replace("/blob/", "/", 1)
    return url


def parse_entries(text: str):
    pattern = re.compile(
        r"\\resultentry\{(\d+)\}\{([^{}]+)\}\{(.+?)\}\{\\href\{([^}]+)\}",
        re.DOTALL,
    )
    entries = []
    for m in pattern.finditer(text):
        fid, title, desc, paper_url = m.group(1), m.group(2), m.group(3), m.group(4)
        title = clean_title(title)
        summary = clean_tex(desc)
        if len(summary) > 520:
            summary = summary[:517] + "…"
        entries.append(
            {
                "id": fid,
                "title": title,
                "summary": summary,
                "paper_url": paper_url,
                "paper_pdf_url": github_blob_to_raw(paper_url) if paper_url.endswith(".pdf") else "",
            }
        )
    return entries


def classify_pqc(entry: dict) -> list[str]:
    blob = f"{entry['title']} {entry['summary']}".lower()
    cats = []
    for cat, rx in RULES:
        if re.search(rx, blob, re.I):
            cats.append(cat)
    return cats


def primary_impact(categories: list[str]) -> str:
    pqc_cats = [c for c in categories if c in PQC_CATEGORY_IDS]
    if not pqc_cats:
        return GENERAL_NOTE
    order = list(PQC_CATEGORY_IDS)
    primary = min(pqc_cats, key=lambda c: order.index(c))
    return IMPACT[primary]


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "_tmp_overview.tex")
    text = src.read_text(encoding="utf-8", errors="replace")
    entries = parse_entries(text)

    headline_fallback = {"007", "017", "087", "102", "159", "197", "221", "271", "287", "362"}

    for e in entries:
        pqc_cats = classify_pqc(e)
        if not pqc_cats and e["id"] in headline_fallback:
            pqc_cats = ["complexity-hardness"]
        if pqc_cats:
            e["pqc_relevant"] = True
            e["categories"] = pqc_cats
        else:
            e["pqc_relevant"] = False
            e["categories"] = ["general-mathematics"]
        e["pqc_impact"] = primary_impact(e["categories"])
        e["repo_url"] = f"https://github.com/openai/math/tree/main#result-{e['id']}"

    entries.sort(key=lambda e: int(e["id"]))
    pqc_count = sum(1 for e in entries if e["pqc_relevant"])

    out = {
        "source": "https://github.com/openai/math",
        "families_total": 372,
        "manuscripts_total": 722,
        "catalog_count": len(entries),
        "pqc_relevant_count": pqc_count,
        "featured_ids": FEATURED_IDS,
        "categories": [
            {"id": k, "label": CATEGORY_LABELS.get(k, k.replace("-", " ").title()), "description": v}
            for k, v in IMPACT.items()
        ],
        "entries": entries,
    }
    dest = Path("_data/openai_math_pqc_map.json")
    dest.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Parsed {len(entries)} families; {pqc_count} PQC-relevant -> {dest}")


if __name__ == "__main__":
    main()
