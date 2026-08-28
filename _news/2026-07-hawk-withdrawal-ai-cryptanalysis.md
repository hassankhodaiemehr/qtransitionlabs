---
title: "HAWK Withdrawn from NIST Process After AI-Assisted Cryptanalysis Breakthrough"
description: "Anthropic's Claude Mythos model discovered a structural weakness in HAWK, halving its effective security and prompting withdrawal from NIST's additional signature standardization."
date: 2026-07-29
category: Standards
source_name: Anthropic
source_title: "Discovering cryptographic weaknesses with Claude"
source_url: https://www.anthropic.com/research/discovering-cryptographic-weaknesses
excerpt: "A lattice-based post-quantum signature candidate survived two years of expert review—then an AI-assisted analysis found a fatal symmetry in 60 hours, underscoring why migration plans should anchor on finalized NIST standards."
---

On July 28–29, 2026, the post-quantum cryptography community received a sharp reminder that standardization is a living process—and that the tools used to evaluate algorithms are evolving as fast as the threats.

Anthropic disclosed that its Claude Mythos Preview model, operating within a multi-agent research scaffold with access to SageMath and published cryptanalysis literature, discovered a previously unknown structural weakness in **HAWK**, a lattice-based digital signature scheme in the third round of NIST's **Additional Digital Signatures** standardization process.

Within 24 hours, the HAWK team confirmed the finding and **withdrew HAWK from consideration**. NIST updated its Round 3 candidate page on July 29, 2026.

## What broke—and what did not

The attack exploits a **nontrivial automorphism** in HAWK's cyclotomic lattice structure—a symmetry that prior human review had not weaponized. Researchers reduced HAWK-*n* key recovery to exact Shortest Vector Problem (SVP) oracles in dimension at most *n*/2 + 1, effectively **halving the scheme's security margin**.

For HAWK-512, estimated key-recovery cost dropped from roughly 2^150 to 2^108 gate operations in the published analysis. The HAWK team acknowledged that obvious mitigations—such as doubling parameters—would make the scheme **uncompetitive**, and chose withdrawal instead.

**Critical reassurance:** This result does **not** affect NIST's finalized standards:

- **ML-KEM** (FIPS 203) — key encapsulation  
- **ML-DSA** (FIPS 204) — digital signatures  
- **SLH-DSA** (FIPS 205) — hash-based signatures  

Nor does it impact **Falcon (FN-DSA)**, **ML-DSA**, or lattice cryptography in general. HAWK was a *candidate*, never a deployed standard.

## Why this matters for migration programs

Three lessons stand out for security leaders:

1. **Stay on finalized standards for production planning.** Organizations building PQC roadmaps should prioritize ML-KEM, ML-DSA, and SLH-DSA—not pre-standardization candidates still under active cryptanalysis.
2. **Algorithm agility is non-negotiable.** The window between proposal and failure is compressing. Crypto-agile architectures that can swap algorithms without wholesale system redesign reduce exposure when future breaks occur.
3. **AI-assisted cryptanalysis changes the evaluation timeline.** What required years of expert review may now surface in days. Inventory and monitoring programs must assume standards evolution, not a one-time cutover.

## QTL perspective

Quantum Transition Labs treats events like the HAWK withdrawal as validation of a disciplined migration methodology: cryptographic discovery first, risk-based prioritization second, and phased deployment anchored to **NIST IR 8547** and finalized FIPS standards. The standardization process worked as designed—weaknesses surfaced before deployment. The question for enterprises is whether their architecture can adapt when the next finding arrives.
