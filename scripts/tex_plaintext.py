"""Convert OpenAI overview.tex fragments to readable plain text."""
import re

ACCENT_LITERALS = {
    '\\"a': "ä",
    '\\"A': "Ä",
    '\\"o': "ö",
    '\\"O': "Ö",
    '\\"u': "ü",
    '\\"U': "Ü",
    "\\'a": "á",
    "\\'A": "Á",
    "\\'e": "é",
    "\\'E": "É",
    "\\'i": "í",
    "\\'I": "Í",
    "\\'o": "ó",
    "\\'O": "Ó",
    "\\'u": "ú",
    "\\'U": "Ú",
    "\\'c": "ç",
    "\\'C": "Ç",
    "\\'n": "ñ",
    "\\'N": "Ñ",
    "\\'s": "ś",
    "\\'y": "ý",
    "\\`a": "à",
    "\\`e": "è",
    "\\`i": "ì",
    "\\`o": "ò",
    "\\`u": "ù",
    "\\c{c}": "ç",
    "\\c{C}": "Ç",
}

SYMBOL_LITERALS = {
    r"\infty": "∞",
    r"\varepsilon": "ε",
    r"\epsilon": "ε",
    r"\alpha": "α",
    r"\beta": "β",
    r"\gamma": "γ",
    r"\delta": "δ",
    r"\lambda": "λ",
    r"\mu": "μ",
    r"\nu": "ν",
    r"\pi": "π",
    r"\rho": "ρ",
    r"\sigma": "σ",
    r"\tau": "τ",
    r"\phi": "φ",
    r"\omega": "ω",
    r"\ell": "ℓ",
    r"\#": "#",
    r"\%": "%",
    r"\times": "×",
    r"\cdot": "·",
    r"\leq": "≤",
    r"\le": "≤",
    r"\geq": "≥",
    r"\ge": "≥",
    r"\neq": "≠",
    r"\ne": "≠",
    r"\sum": "∑",
    r"\prod": "∏",
    r"\int": "∫",
    r"\approx": "≈",
    r"\equiv": "≡",
    r"\to": "→",
    r"\rightarrow": "→",
    r"\leftarrow": "←",
    r"\Re": "Re",
    r"\Im": "Im",
    r"\log": "log",
    r"\exp": "exp",
    r"\dim": "dim",
    r"\deg": "deg",
    r"\det": "det",
    r"\gcd": "gcd",
    r"\min": "min",
    r"\max": "max",
    r"\sup": "sup",
    r"\inf": "inf",
    r"\sin": "sin",
    r"\cos": "cos",
    r"\tan": "tan",
    r"\zeta": "ζ",
    r"\,": " ",
    r"\;": " ",
    r"\:": " ",
    r"\!": "",
    r"\quad": " ",
    r"\qquad": " ",
}

SUPERS = str.maketrans("0123456789+-=()", "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾")


def _apply_superscripts(s: str) -> str:
    s = re.sub(r"\^\{([^}]+)\}", lambda m: m.group(1).translate(SUPERS), s)
    s = re.sub(r"\^([0-9+\-=()a-zA-Z]+)", lambda m: m.group(1).translate(SUPERS), s)
    return s


def _apply_subscripts(s: str) -> str:
    s = re.sub(r"_\{([^}]+)\}", lambda m: "(" + m.group(1).strip() + ")", s)
    s = re.sub(r"_([0-9a-zA-Z])", r"_\1", s)
    return s


def _strip_commands_keep_braces(s: str) -> str:
    for _ in range(24):
        prev = s
        s = re.sub(
            r"\\[a-zA-Z@]+(\*?)(\{[^{}]*\})",
            lambda m: " " + m.group(2)[1:-1] + " ",
            s,
        )
        s = re.sub(r"\\[a-zA-Z@]+\*?\b", " ", s)
        if s == prev:
            break
    s = re.sub(r"\{([^{}]+)\}", r" \1 ", s)
    return s


def _clean_math_segment(inner: str) -> str:
    inner = inner.strip()
    for pat, repl in [
        (r"\\overline\{\\mathbb\s+Q\}", "Q̄"),
        (r"\\overline\{\\mathbb\{Q\}\}", "Q̄"),
        (r"\\mathbb\{Q\}", "Q"),
        (r"\\mathbb\{R\}", "R"),
        (r"\\mathbb\{C\}", "C"),
        (r"\\mathbb\{Z\}", "Z"),
        (r"\\mathbb\{N\}", "N"),
        (r"\\mathbb\{S\}\^2", "S²"),
        (r"\\mathbb\{CP\}\^2", "CP²"),
        (r"\\mathrm\{([^}]+)\}", r"\1"),
        (r"\\operatorname\{([^}]+)\}", r"\1"),
        (r"\\text\{([^}]+)\}", r"\1"),
        (r"\\sqrt\{([^}]+)\}", r"√(\1)"),
    ]:
        inner = re.sub(pat, repl, inner)
    for tok, repl in SYMBOL_LITERALS.items():
        inner = inner.replace(tok, repl)
    inner = _apply_subscripts(inner)
    inner = _apply_superscripts(inner)
    inner = _strip_commands_keep_braces(inner)
    return inner.strip()


def clean_tex(text: str) -> str:
    if not text:
        return ""
    s = text.replace("\u2019", "'").replace("\u2018", "'").replace("�", "'")
    s = s.replace("---", "—")
    s = re.sub(r"(?<![\u2014\u2013])--(?![\u2014\u2013])", "–", s)

    for src, dst in sorted(ACCENT_LITERALS.items(), key=lambda x: -len(x[0])):
        s = s.replace(src, dst)

    s = re.sub(r'K\\+"ahler', "Kähler", s, flags=re.I)
    s = re.sub(r'M\\+"obius', "Möbius", s, flags=re.I)
    s = re.sub(r'H\\+"older', "Hölder", s, flags=re.I)

    s = re.sub(r"\$([^$]+)\$", lambda m: " " + _clean_math_segment(m.group(1)) + " ", s)

    for tok, repl in SYMBOL_LITERALS.items():
        s = s.replace(tok, repl)
    s = _apply_subscripts(s)
    s = _apply_superscripts(s)
    s = _strip_commands_keep_braces(s)
    s = re.sub(r"\\(?![\\])", " ", s)

    s = s.replace('\\"', '"').replace("''", "'")
    s = re.sub(r"\s+", " ", s).strip()
    s = postprocess_plaintext(s)
    return soften_heavy_math(s)


def postprocess_plaintext(s: str) -> str:
    s = re.sub(r"\(\s*\)", "", s)
    s = re.sub(r"\s+([.,;:])", r"\1", s)
    s = re.sub(r",\s*,", ",", s)
    s = re.sub(r"\^(\*)", "*", s)
    s = re.sub(r"(\d+)\^(\s|;|,|\.|$)", r"\1°\2", s)
    s = re.sub(r"⁽+", "(", s)
    s = re.sub(r"⁾+", ")", s)
    s = re.sub(r"\s+", " ", s)
    s = re.sub(r"\b(over|in|on|to|from|at|of|for|with|and|or|the|a|an|is|are|as)\s+([.,;])", r"\2", s)
    s = soften_heavy_math(s)
    s = re.sub(r"([A-Za-z0-9ℓ]) - ([A-Za-z0-9])", r"\1-\2", s)
    s = re.sub(r"prime-to-\s+p\b", "prime-to-p", s)
    s = re.sub(r"\s+([.,;])", r"\1", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def soften_heavy_math(s: str) -> str:
    """If math normalization still looks broken, keep readable lead sentences."""
    broken = bool(
        s.count("^") > 1
        or "⁽" in s
        or re.search(r"\(\s*-", s)
        or re.search(r"\(-\d", s)
        or re.search(r"log\(L", s)
        or re.search(r"\(\s*[A-Z]\s+[⁻^]", s)
        or re.search(r"\bK\^", s)
        or re.search(r"\b2O\(", s)
    )
    if not broken:
        return s
    parts = re.split(r"(?<=[.!?])\s+", s)
    if len(parts) >= 2 and len(parts[0]) >= 80:
        return parts[0].strip()
    if " using " in s:
        return s.split(" using ", 1)[0].strip() + "."
    if ":" in s:
        return s.split(":", 1)[0].strip() + "."
    if parts:
        return parts[0][:240].rsplit(" ", 1)[0] + "…"
    return s[:240].rsplit(" ", 1)[0] + "…"


def truncate_summary(s: str, max_len: int = 560) -> str:
    if len(s) <= max_len:
        return s
    window = s[:max_len]
    last_stop = max(window.rfind(". "), window.rfind("; "))
    if last_stop >= int(max_len * 0.55):
        return window[: last_stop + 1].strip()
    return window.rstrip(" ,;–—") + "…"
