---
title: "Quantinuum Reports Below-Threshold Color-Code Scaling on Trapped-Ion Hardware"
description: "Helios trapped-ion experiments show logical error rates falling with code distance on triangular color codes—including real-time neural decoders—another below-threshold milestone in the race toward fault-tolerant quantum computation."
date: 2026-10-18
category: Industry
source_name: Quantinuum
source_title: "Quantum error correction well below the color code threshold"
source_url: https://arxiv.org/abs/2610.24077
excerpt: "Color codes at distances 3, 5, and 7 on Helios achieved suppression factors around 12× in memory experiments—approaching error rates relevant to megaquop-scale workloads and tightening long-range PQC threat models."
---

Researchers from **Quantinuum** and collaborators reported **below-threshold** operation of **triangular color codes** on the **Helios** trapped-ion processor—one of the strongest public demonstrations to date that **increasing code distance reduces logical error rate** in a production-class architecture, not only in toy devices.

The preprint [*Quantum error correction well below the color code threshold*](https://arxiv.org/abs/2610.24077) documents memory and Clifford benchmarking experiments at distances **\(d = 3, 5, 7\)**, with reported logical error rates per syndrome cycle as low as roughly **\(5 \times 10^{-6}\)** at \(d = 7\) and a distance-scaling suppression factor **\(\Lambda \approx 12\)** in memory experiments.

## Technical highlights

- **Hardware leakage control** — Combined circuit- and hardware-level leakage mitigation, important because leakage errors break the independent-error assumptions most decoders rely on.  
- **Decoder speed** — Convolutional and transformer decoders achieved **inference latencies on the order of hundreds of microseconds**, opening a path to **real-time** decoding at syndrome extraction rates.  
- **Logical Clifford benchmarking** — Encoded two-qubit Clifford circuits at \(d = 5\) reported logical error rates near **\(7 \times 10^{-5}\)** per gate with **\(\Lambda \approx 9\)** scaling between distances.

Color codes trade some layout constraints for **transversal Clifford gates** and competitive overhead in certain connectivity models—making trapped-ion systems, with their high-fidelity gates and all-to-all connectivity, a natural testbed.

## Link to cryptographic risk

This result does **not** break RSA or ECC today. It **does** compress uncertainty on the **engineering path** from noisy intermediate-scale devices to **fault-tolerant** machines—the class of systems threat models label **cryptographically relevant quantum computers (CRQCs)**.

When multiple modalities (superconducting, neutral atom, trapped ion) publish **below-threshold** or **breakeven** error correction within months of one another, security leaders should:

1. **Refresh CRQC horizon assumptions** in enterprise risk registers—use ranges, not point estimates.  
2. **Accelerate harvest-now-decrypt-later mitigations** for data and keys with multi-decade confidentiality needs.  
3. **Keep PQC deployments crypto-agile** regardless of hardware vendor forecasts.

## QTL perspective

Quantum Transition Labs treats hardware milestones as **inputs to migration prioritization**, not reasons to panic. Quantinuum’s color-code scaling belongs beside IBM, D-Wave, Harvard–QuEra, and other 2025–2026 QEC results in a single narrative: **fault tolerance is becoming an experimental discipline**, not a distant theory exercise.

**Primary source:** [arXiv:2610.24077](https://arxiv.org/abs/2610.24077).
