"""Build OpenAI math catalog map (372 families + 722 manuscripts)."""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from parse_contents_md import parse_contents
from tex_plaintext import clean_tex, truncate_summary

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
HEADLINE_FALLBACK = {"007", "017", "087", "102", "159", "197", "221", "271", "287", "362"}


def clean_title(title: str) -> str:
    title = re.sub(r"<[^>]+>", "", title)
    if "\\" in title or "$" in title or "--" in title or "`" in title:
        return clean_tex(title)
    return title.replace("--", "–")


def github_blob_to_raw(url: str) -> str:
    if "/blob/" in url:
        return url.replace("https://github.com/", "https://raw.githubusercontent.com/").replace("/blob/", "/", 1)
    return url


def paper_urls(path: str) -> tuple[str, str]:
    blob = f"https://github.com/openai/math/blob/main/{path}"
    raw = f"https://raw.githubusercontent.com/openai/math/main/{path}"
    return blob, raw


LEAN_TAG_RE = re.compile(r"lean formal|formalization|\[lean\]", re.I)


def classify_substantive_pqc(entry: dict) -> list[str]:
    """Security-relevant lenses only (excludes Lean metadata)."""
    blob = f"{entry['title']} {entry['summary']}".lower()
    cats = []
    for cat, rx in RULES:
        if cat == "ai-verification":
            continue
        if re.search(rx, blob, re.I):
            cats.append(cat)
    return cats


def has_lean_formalization(entry: dict) -> bool:
    blob = f"{entry['title']} {entry['summary']}".lower()
    return bool(LEAN_TAG_RE.search(blob))


def primary_impact(categories: list[str]) -> str:
    pqc_cats = [c for c in categories if c in PQC_CATEGORY_IDS]
    if not pqc_cats:
        return GENERAL_NOTE
    order = list(PQC_CATEGORY_IDS)
    primary = min(pqc_cats, key=lambda c: order.index(c))
    return IMPACT[primary]


def annotate_family(entry: dict) -> dict:
    pqc_cats = classify_substantive_pqc(entry)
    if not pqc_cats and entry["id"] in HEADLINE_FALLBACK:
        pqc_cats = ["complexity-hardness"]
    lean = has_lean_formalization(entry)
    if pqc_cats:
        entry["pqc_relevant"] = True
        entry["categories"] = list(pqc_cats)
        if lean:
            entry["categories"].append("ai-verification")
    else:
        entry["pqc_relevant"] = False
        entry["categories"] = ["general-mathematics"]
        if lean:
            entry["categories"].append("ai-verification")
    entry["pqc_impact"] = primary_impact(entry["categories"])
    entry["repo_url"] = f"https://github.com/openai/math/tree/main#result-{entry['id']}"
    entry["kind"] = "family"
    return entry


def main():
    contents_path = Path(sys.argv[1] if len(sys.argv) > 1 else "_tmp_contents.md")
    families_raw, manuscripts_raw = parse_contents(contents_path)

    entries = []
    for f in families_raw:
        paper_url, paper_pdf_url = "", ""
        # attach first manuscript link for this family when available
        first_ms = next((m for m in manuscripts_raw if m.family_id == f.id), None)
        if first_ms:
            paper_url, paper_pdf_url = paper_urls(first_ms.paper_path)
        entry = annotate_family(
            {
                "id": f.id,
                "title": clean_title(f.title),
                "summary": truncate_summary(clean_tex(f.blurb)),
                "paper_url": paper_url,
                "paper_pdf_url": paper_pdf_url,
            }
        )
        entries.append(entry)

    entries.sort(key=lambda e: int(e["id"]))
    family_by_id = {e["id"]: e for e in entries}

    manuscripts = []
    for ms in manuscripts_raw:
        fam = family_by_id.get(ms.family_id, {})
        paper_url, paper_pdf_url = paper_urls(ms.paper_path)
        manuscripts.append(
            {
                "id": ms.id,
                "family_id": ms.family_id,
                "kind": "manuscript",
                "title": clean_title(ms.title),
                "summary": truncate_summary(clean_tex(ms.abstract)),
                "paper_url": paper_url,
                "paper_pdf_url": paper_pdf_url,
                "pqc_relevant": fam.get("pqc_relevant", False),
                "categories": fam.get("categories", ["general-mathematics"]),
                "pqc_impact": fam.get("pqc_impact", GENERAL_NOTE),
                "repo_url": f"https://github.com/openai/math/tree/main#result-{ms.family_id}",
            }
        )

    pqc_count = sum(1 for e in entries if e["pqc_relevant"])

    out = {
        "source": "https://github.com/openai/math",
        "families_total": 372,
        "manuscripts_total": 722,
        "catalog_family_count": len(entries),
        "catalog_manuscript_count": len(manuscripts),
        "pqc_relevant_count": pqc_count,
        "featured_ids": FEATURED_IDS,
        "categories": [
            {"id": k, "label": CATEGORY_LABELS.get(k, k.replace("-", " ").title()), "description": v}
            for k, v in IMPACT.items()
        ],
        "entries": entries,
        "manuscripts": manuscripts,
    }
    dest = Path("_data/openai_math_pqc_map.json")
    dest.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(
        f"Parsed {len(entries)} families, {len(manuscripts)} manuscripts; "
        f"{pqc_count} PQC-relevant families -> {dest}"
    )


if __name__ == "__main__":
    main()
