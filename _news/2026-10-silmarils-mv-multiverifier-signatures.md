---
title: "SILMARILS-MV: Multi-Verifier Signatures for Quantum-Era Permissioned Consensus"
description: "QTL researchers release SILMARILS-MV—information-theoretically secure multi-verifier signatures with dealer-free MPC key issuance, linear aggregation, and 22× lower authentication traffic than ML-DSA at 1,000 validators."
date: 2026-10-22
category: Research
source_name: arXiv
source_title: "SILMARILS-MV: Information-Theoretically Secure Multi-Verifier Signatures with Dealer-Free Key Issuance and Linear Aggregation for Permissioned Blockchains"
source_url: https://arxiv.org/abs/2610.31814
excerpt: "New QTL research extends SILMARILS to multi-verifier permissioned blockchains—constant-size finality certificates, MPC-based key issuance without a dealer, and measured gains over ML-DSA-44 in HotStuff."
---

Quantum Transition Labs has published [**SILMARILS-MV**](https://arxiv.org/pdf/2610.31814) on arXiv—a multi-verifier extension of the SILMARILS line of work for permissioned blockchains facing post-quantum signature inflation.

**Authors:** Khadijeh Bagheri, Hassan Khodaiemehr, and Chen Feng.

## Why this matters

Post-quantum replacements for ECDSA and EdDSA can increase consensus traffic by orders of magnitude. Lattice signatures such as ML-DSA are computationally secure and carry larger keys and signatures than pre-quantum schemes. For committees with hundreds or thousands of validators, authentication bytes per block become a hard constraint.

SILMARILS-MV pursues an information-theoretic signature model in which validators hold secret functionals derived from hidden anchors. The construction targets:

- **Strong unforgeability and non-repudiation** against unbounded adversaries corrupting a bounded fraction of verifiers  
- **Transferable signatures** across unboundedly many hops without single-use key exhaustion  
- **Linear aggregatability** and **dealer-free key issuance** via secure MPC for \(t < n/3\)  
- **Threshold notarization** with constant-size finality certificates for admitted verifiers  

## Reported performance highlights

The paper reports analytic and prototype measurements that security teams can sanity-check in their own models:

- Certificate verification in about **2.4 μs**  
- At **1,000 validators**, threshold notarization auth traffic on the order of **71 KiB per validator per block**—about **22× less** than ML-DSA-44 for admitted verifiers in the normal-case model described  
- In a **Rust HotStuff prototype with 100 validators**, roughly **2.8× higher TPS** than ML-DSA-44 with **67× less cryptographic CPU** in the reported experiments  

These numbers are workload-specific; the architectural point is that **unconditional security need not imply multi-megabyte quorum proofs** when aggregation and committee notarization are designed together.

## Relationship to QTL products

SILMARILS-MV builds on the same research thread as our [SILMARILS TDV demo](/demo/) and wallet/consensus hardening work. It is intended for **permissioned** and regulated ledger settings where validator committees, compact certificates, and auditable cryptography matter.

## QTL recommendations

1. **Separate permissioned vs public-chain strategy.** Use finalized NIST standards (ML-KEM, ML-DSA, SLH-DSA) for general-purpose PKIX and WebPKI; evaluate information-theoretic and aggregation designs where **you control the validator set** and traffic budgets are explicit.  
2. **Model authentication bytes per block.** Before selecting a PQC signature for consensus, chart bytes × validators × blocks per day—including notarization and client paths.  
3. **Plan for crypto-agility.** Whether you deploy ML-DSA or exploratory committee schemes, assume **algorithm rotation** and rehearsed upgrade paths.  

**Primary source:** [arXiv:2610.31814](https://arxiv.org/abs/2610.31814) ([PDF](https://arxiv.org/pdf/2610.31814)).
