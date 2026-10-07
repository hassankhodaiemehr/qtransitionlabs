"""Parse openai/math CONTENTS.md into families and individual manuscripts."""
import re
from dataclasses import dataclass
from pathlib import Path

FAMILY_HEADER_RE = re.compile(r"\*\*(\d{3})\.\s+([^*]+?)\*\*(.*?)(?=\n\n|\Z)", re.DOTALL)
MANUSCRIPT_LINK_RE = re.compile(
    r"(?:&emsp;)?\[([^\]]+)\]\((preprints/[^)]+\.pdf)\)"
)


@dataclass
class FamilyBlock:
    id: str
    title: str
    blurb: str


@dataclass
class ManuscriptBlock:
    id: str
    family_id: str
    title: str
    paper_path: str
    abstract: str


def parse_families(text: str) -> list[FamilyBlock]:
    families: list[FamilyBlock] = []
    for m in FAMILY_HEADER_RE.finditer(text):
        blurb = re.sub(r"\s+", " ", m.group(3).strip())
        families.append(FamilyBlock(id=m.group(1), title=m.group(2).strip(), blurb=blurb))
    return families


def parse_manuscripts(text: str) -> list[ManuscriptBlock]:
    family_markers = [(m.start(), m.group(1)) for m in re.finditer(r"\*\*(\d{3})\.", text)]
    manuscripts: list[ManuscriptBlock] = []

    for m in MANUSCRIPT_LINK_RE.finditer(text):
        pos = m.start()
        family_id = family_markers[0][1] if family_markers else "000"
        for marker_pos, fid in family_markers:
            if marker_pos <= pos:
                family_id = fid
        start = m.end()
        tail = text[start:]
        end_rel = len(tail)
        for stop in re.finditer(r"&emsp;\[|\*\*\d{3}\.|</td>", tail):
            end_rel = stop.start()
            break
        abstract = re.sub(r"\s+", " ", tail[:end_rel].strip())
        manuscripts.append(
            ManuscriptBlock(
                id="",
                family_id=family_id,
                title=m.group(1).strip(),
                paper_path=m.group(2).strip(),
                abstract=abstract,
            )
        )

    for idx, ms in enumerate(manuscripts, start=1):
        ms.id = f"m{idx:03d}"
    return manuscripts


def parse_contents(path: Path) -> tuple[list[FamilyBlock], list[ManuscriptBlock]]:
    text = path.read_text(encoding="utf-8", errors="replace")
    return parse_families(text), parse_manuscripts(text)


if __name__ == "__main__":
    import sys

    p = Path(sys.argv[1] if len(sys.argv) > 1 else "_tmp_contents.md")
    fam, mans = parse_contents(p)
    print(f"families {len(fam)} manuscripts {len(mans)}")
