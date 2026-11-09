---
title: "PQ-Vault: Quantum-Safe Custody for Unmodified Ethereum"
description: "QTL introduces PQ-Vault—a provable custody architecture combining quantum-safe vault contracts, compact checkpoint certificates, and an optimistic dispute layer for Ethereum without changing L1 rules."
date: 2026-10-21
category: Research
source_name: arXiv
source_title: "PQ-Vault: Provably Quantum-Safe Asset Custody for Unmodified Ethereum"
source_url: https://arxiv.org/abs/2610.29230
excerpt: "New QTL paper proves why exposed Ethereum public keys require quantum-safe custody contracts, and presents PQ-Vault with compact certificates, bounded election steering, and fraud-proof verification."
---

Quantum Transition Labs has published [**PQ-Vault**](https://arxiv.org/pdf/2610.29230) on arXiv—a custody architecture for protecting Ethereum assets when **public keys are already visible on chain**—the setting where harvest-now-decrypt-later risk is most acute.

**Authors:** Hassan Khodaiemehr, Khadijeh Bagheri, and Chen Feng.

## The core impossibility result

The paper argues that if Ethereum’s protocol rules stay unchanged, **accounts whose public keys appear on chain cannot be made quantum-safe in place**. Funds that must survive a quantum adversary need to move into a **contract** whose release logic depends only on **quantum-safe primitives**—not on classical ECDSA verification of exposed keys.

That framing matters for enterprises and custodians planning “PQC for Ethereum”: bridges and sidechains that **do not alter L1 verification** cannot, by themselves, retrofit quantum safety for already-exposed keys.

## What PQ-Vault proposes

PQ-Vault combines three layers:

1. **A quantum-safe vault contract** on unmodified Ethereum for custody and release conditions  
2. **A quantum-safe proof-of-stake sidechain** whose checkpoints carry **compact certificates**  
3. **An optimistic dispute protocol** with fraud proofs that avoid pairing-based SNARK compression (which would break the quantum-security story in the threat model used)  

The authors give a **security proof for compact certificates against quantum attackers**, characterize how **classically chosen parameters** can erode margin (e.g. from 128-bit narratives toward ~60-bit effective strength in their analysis), and propose **parameter rules** intended to restore target strength.

## Engineering-scale numbers (from the paper)

Reported figures include:

- For **65,536 validators**, a certificate size on the order of **0.8 MB** (~**260× smaller** than collecting all signatures in their construction) with verification around **20 ms**  
- Checkpoint acceptance on the vault on the order of **420,000 gas** in their model  

As with any preprint, treat these as **research benchmarks**—not a production deployment claim—until independent review and implementation hardening.

## Election steering and proof-of-stake subtleties

The paper also analyzes **seed-update rules** in hash-chain proof of stake, showing how an attacker might **steer chosen slots** and profit from stake splitting under common patterns. It proposes an election mechanism with **provably bounded steering gain and inclusion delay** against quantum attackers—relevant for anyone designing PQC-aware L2 or checkpoint committees.

## QTL perspective

PQ-Vault sits alongside QTL’s [wallet](/qtl-wallet/) and migration work: **custody and consensus cryptography must be designed together**. For public chains, the urgent program is **inventory exposed keys**, **define vault or migration paths**, and **avoid assuming L1 will fork for your organization’s timeline**.

## Next steps for readers

1. Read the impossibility argument before funding “quantum-safe Ethereum” marketing that ignores on-chain pubkeys.  
2. Map **exposed accounts** in your treasury and contract estate.  
3. Pair architectural options with a [PQC readiness assessment](/pqc-readiness/) and explicit upgrade budgets.  

**Primary source:** [arXiv:2610.29230](https://arxiv.org/abs/2610.29230) ([PDF](https://arxiv.org/pdf/2610.29230)).
