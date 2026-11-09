---
title: "CCCS ITSP.40.111 Puts ML-KEM, ML-DSA, and SLH-DSA Into Canada’s Approved Algorithm Set"
description: "With ITSP.40.111 now in force, Canadian departments and vendors have explicit approval paths for NIST-aligned PQC—and phase-out schedules for quantum-vulnerable key establishment and signatures."
date: 2026-09-10
category: Policy
source_name: Canadian Centre for Cyber Security
source_title: "Cryptographic algorithms for UNCLASSIFIED, PROTECTED A, and PROTECTED B information — ITSP.40.111"
source_url: https://www.cyber.gc.ca/en/guidance/cryptographic-algorithms-unclassified-protected-protected-b-information-itsp40111
excerpt: "Effective May 29, 2026, Canada's flagship algorithm publication recognizes ML-KEM, ML-DSA, and SLH-DSA and sets phase-out dates for legacy public-key schemes—binding PQC to procurement and configuration guidance."
---

The **Canadian Centre for Cyber Security** publication **[ITSP.40.111](https://www.cyber.gc.ca/en/guidance/cryptographic-algorithms-unclassified-protected-protected-b-information-itsp40111)**—*Cryptographic algorithms for UNCLASSIFIED, PROTECTED A, and PROTECTED B information*—took effect **May 29, 2026**. For security architects, that date is the point at which **standardized post-quantum cryptography** moved from advisory language into **Canada’s authoritative algorithm catalog**.

## What changed

ITSP.40.111 incorporates the three **NIST-finalized** PQC standards:

| Capability | Algorithm | Typical legacy replacement |
|------------|-----------|----------------------------|
| Key establishment | **ML-KEM** | RSA/FFC/EC DH and MQV families (per publication sections) |
| General-purpose signatures | **ML-DSA** | RSA and ECDSA/EdDSA-class schemes for most use cases |
| Hash-based signatures | **SLH-DSA** | Settings needing hash-based assumptions; larger signatures than ML-DSA |

The publication also introduces **phase-out dates** for quantum-vulnerable public-key encryption and signature schemes. Organizations cannot treat PQC as experimental for protected government traffic—it is now the documented direction of travel.

## Procurement and agility

CCCS companion guidance **[ITSM.00.501](https://www.cyber.gc.ca/en/guidance/recommended-contract-clauses-cryptography-itsm00501)** recommends contract clauses requiring **PQC-capable cryptographic modules** by **end of 2026** for key establishment and signatures, paired with **cryptographic agility** so modules can be reconfigured as protocols and parameter sets evolve.

That combination—approved algorithms plus contractual deadlines—means vendors selling into **GC, provincial, or regulated sectors** should expect RFPs to reference ITSP.40.111 explicitly.

## Implementation notes for practitioners

- **Protocol lag** — Algorithm approval precedes ubiquitous **TLS, IPsec, and S/MIME** PQC cipher-suite deployment; follow **[ITSP.40.062](https://www.cyber.gc.ca/en/guidance/guidance-securely-configuring-network-protocols-itsp40062)** updates for secure configurations.  
- **Stateful vs stateless hash signatures** — ITSP.40.111 distinguishes **SLH-DSA** from stateful hash schemes that demand careful state management during signing.  
- **Hybrid transition** — Many enterprises will run **hybrid classical+PQC** during migration; inventory tools must record both layers.

## QTL perspective

Canadian clients often must reconcile **CCCS**, **NIST**, and **industry-sector** mandates in one roadmap. ITSP.40.111 gives QTL a concrete compliance anchor when designing **PQC wallets**, **HSM integrations**, and **permissioned ledger** authentication where byte budgets and algorithm approval intersect.

**Primary source:** [ITSP.40.111](https://www.cyber.gc.ca/en/guidance/cryptographic-algorithms-unclassified-protected-protected-b-information-itsp40111). Preparation guide: [ITSAP.00.017 — Preparing your organization for the quantum threat](https://www.cyber.gc.ca/en/guidance/preparing-your-organization-quantum-threat-cryptography-itsap00017).
