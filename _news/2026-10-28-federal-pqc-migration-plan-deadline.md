---
title: "Federal PQC Migration Plans Due Under OMB M-26-15"
description: "U.S. agencies reached the October 22, 2026 milestone to submit post-quantum cryptography migration plans to OMB and ONCD—turning EO 14412 into accountable inventory, prioritization, and cutover schedules."
date: 2026-10-28
category: Policy
source_name: Office of Management and Budget
source_title: "M-26-15: Execution of the Migration to Post-Quantum Cryptography"
source_url: https://www.whitehouse.gov/wp-content/uploads/2026/06/M-26-15-Execution-of-the-Migration-to-Post-Quantum-Cryptography.pdf
excerpt: "The first government-wide PQC planning deadline is now in the rear-view mirror. Agencies must show inventories, governance, and prioritized migration for high-value assets—with key establishment targeted by 2030 and signatures by 2031."
---

The **October 22, 2026** deadline in **OMB Memorandum M-26-15** marked the first mandatory checkpoint in the U.S. federal **post-quantum cryptography (PQC)** program. Civilian agencies were required to deliver **PQC Migration Plans** to the Office of Management and Budget (OMB) and the **Office of the National Cyber Director (ONCD)**—translating **Executive Order 14412** from policy language into accountable plans.

## What M-26-15 requires

The memorandum frames migration as a **prioritized, agency-wide obligation**, not a narrow PKI project:

- **Governance** — CIO and CISO accountability extended across component leadership; roles for inventory, procurement, and high-value asset owners must be explicit.  
- **Cryptographic inventory** — Agencies are expected to discover and maintain visibility into where quantum-vulnerable algorithms appear—including embedded libraries, managed services, and supply-chain dependencies agencies do not fully control.  
- **Prioritized migration** — Plans must identify **high-value assets** and **high-impact systems** first, with federal objectives to mitigate quantum risk on key establishment by **December 31, 2030** and digital signatures by **December 31, 2031**, and to complete remaining migrations by **2035**.  
- **Standards alignment** — Deployments should track **NIST FIPS 203 (ML-KEM)**, **FIPS 204 (ML-DSA)**, and **FIPS 205 (SLH-DSA)** and prefer products in categories catalogued by **CISA**.  
- **FedRAMP and shared responsibility** — Cloud and SaaS paths require explicit delineation of who migrates which cryptographic layers.

CISA supports execution through technical guidance, sector outreach, and work on **automated cryptographic discovery and inventory (ACDI)** tools with NIST’s National Cybersecurity Center of Excellence.

## Why the deadline matters beyond Washington

Even organizations outside the federal footprint should treat this milestone as a **reference architecture** for serious PQC programs:

1. **Planning without inventory is non-auditable.** The federal bar is a documented asset-to-algorithm map, not a single TLS upgrade project.  
2. **Procurement is a migration lever.** M-26-15 pushes PQC into **contract requirements** and product categories—vendors selling to government or critical infrastructure will feel this in RFP language first.  
3. **Timelines are phased but not optional.** 2030/2031 targets for the highest-impact layers are closer than many enterprise roadmaps assume.

## QTL perspective

Quantum Transition Labs sees the post-deadline phase as where programs succeed or stall: **dependency mapping**, **HSM and key-management cutovers**, and **blockchain or ledger systems** that expose long-lived public keys. Agencies—and vendors supporting them—should expect follow-on scrutiny on whether inventories are **continuously updated**, not one-time spreadsheets.

**Primary source:** [OMB M-26-15 (PDF)](https://www.whitehouse.gov/wp-content/uploads/2026/06/M-26-15-Execution-of-the-Migration-to-Post-Quantum-Cryptography.pdf). Related: [CISA Post-Quantum Cryptography Initiative](https://www.cisa.gov/topics/risk-management/quantum), [NIST PQC project](https://csrc.nist.gov/projects/post-quantum-cryptography/).
