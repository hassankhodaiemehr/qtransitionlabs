---
title: "OpenAI’s 722-Manuscript Math Catalog: A PQC Security Radar"
description: "Interactive map of OpenAI’s open math repository—372 families spanning quantum factoring claims, elliptic-curve arithmetic, complexity breakthroughs, and formal proofs—with QTL analysis for post-quantum migration planning."
date: 2026-10-07
category: Research
source_name: OpenAI
source_title: "openai/math — Mathematics manuscript collection"
source_url: https://github.com/openai/math/tree/main
excerpt: "OpenAI released 722 manuscripts across 372 families from large-scale model evaluations. QTL maps 99 families with direct or indirect post-quantum security implications—and why AI-accelerated mathematics belongs in every crypto-agility program."
script: /assets/js/openai-math-news.js
---

OpenAI’s public [**math repository**](https://github.com/openai/math/tree/main) is not a cryptography release—but it is a strategic signal for anyone running a post-quantum migration. The catalog documents **722 manuscripts** organized into **372 result families**, produced while stress-testing an internal model on open research problems. Some families include Lean formalizations; many do not, and OpenAI explicitly warns that unformalized writeups may contain errors.

For security leaders, the important question is not whether every claim is final. It is whether **AI-scale mathematical discovery** is beginning to touch the same number theory, complexity theory, and quantum algorithmic ideas that underpin RSA, ECC, lattice schemes, and threat timelines.

## Why this belongs on a PQC roadmap

Three forces converge:

1. **Quantum threat modeling** — Families such as **279** (*exact quantum factoring over a fixed finite gate set*) and **284** (randomized vs quantum query separation) sit squarely in the conversation about when integer factorization and search problems shift from classical to quantum regimes—even when individual claims await independent verification.
2. **Classical public-key assumptions** — Breakthroughs in **elliptic-curve arithmetic**, **BSD/Selmer** results, and **quasi-Riemann** progress do not “break TLS tomorrow,” but they reshape how quickly expert communities can analyze structured instances, special curves, and related hard problems that appear in legacy deployments.
3. **AI-assisted cryptanalysis velocity** — QTL’s analysis of the [HAWK withdrawal](/news/2026-07-hawk-withdrawal-ai-cryptanalysis/) showed how model-assisted review can collapse multi-year evaluation windows. A 700+ manuscript drop generalizes that pattern: mathematics at machine scale becomes an input to **crypto-agility**, not a curiosity.

## How to read the interactive map below

We classified **99 families** from the OpenAI overview into seven lenses that matter for post-quantum security planning:

- **Quantum algorithms & physics** — factoring models, query complexity, quantum many-body results tied to hardware and error correction narratives  
- **Number theory & ECC** — zeta/L-function progress, elliptic-curve structure, modularity—adjacent to classical PKI analysis  
- **Complexity & hardness** — UGC-class results and approximation thresholds that affect how we reason about hard problems in reductions  
- **Factorization & arithmetic** — polynomial factorization, prime statistics, totients—RSA/DSA adjacent  
- **Algebra & structures** — Kaplansky/Mahler/factor-algebra results that influence advanced constructions and future cryptanalysis tools  
- **Spin & statistical physics** — spin glasses, magnetization—inputs to noise, randomness, and QEC storytelling  
- **Formal verification** — Lean-linked families that matter for high-assurance implementations  

Use **search** to jump to a family ID (for example `279` or `102`), **filter** by category, and expand rows for QTL’s one-line **PQC lens** on each entry. Featured cards highlight families security teams should discuss in quarterly risk reviews.

{% include openai-math-explorer.html %}

## QTL recommendations

1. **Separate “claimed” from “deployed.”** Treat catalog entries as early-warning intelligence. Production decisions should still anchor on NIST FIPS standards (ML-KEM, ML-DSA, SLH-DSA) and your CBOM—not on preprints from any AI lab.
2. **Add AI-mathematics to threat-intake.** Assign ownership for monitoring large model releases the same way you track NIST drafts and IETF PQ TLS work.
3. **Invest in agility, not just parameters.** If discovery accelerates across number theory and lattice analysis, the winning architecture is swappable algorithms, monitored dependencies, and rehearsed incident playbooks—not a one-time RSA sunset project.
4. **Pair with readiness tooling.** Use QTL’s [PQC Readiness assessment](/pqc-readiness/) to translate external research shocks into inventory priorities and executive timelines.

## What we did not do

This page does **not** assert that OpenAI has broken modern cryptography. It maps **where their released mathematics intersects security-relevant fields** so CISOs, cryptographers, and program managers can prioritize review time. For primary sources, start with OpenAI’s [overview PDF](https://github.com/openai/math/blob/main/overview.pdf) and [CONTENTS.md manuscript map](https://github.com/openai/math/blob/main/CONTENTS.md).
