---
layout: default
title: Research
---

<style>
/* FULL‑WIDTH (95%) */
.page-content, .wrapper, .container {
  max-width: 95% !important;
  width: 95% !important;
  margin: 0 auto !important;
  padding: 0 !important;
}

/* Page padding */
.research-page {
  padding: 2rem 2rem;
}

/* HEADER */
.research-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.research-header h1 {
  font-size: 2.6rem;
  font-weight: 700;
  color: #F0F6FC;
}

.research-header p {
  color: #8B949E;
  font-size: 1.15rem;
  max-width: 700px;
  margin: 0.5rem auto 0 auto;
}

body.light-mode .research-header h1 {
  color: #1A1F36;
}

body.light-mode .research-header p {
  color: #4B5563;
}

/* GRID */
.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* CARDS — DARK MODE */
.research-card {
  background: #161B22;
  border: 1px solid #30363D;
  padding: 1.6rem;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  transition: 0.25s ease;
  animation: fadeIn 1s ease forwards;
}

.research-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(88,166,255,0.25);
  border-color: #58A6FF;
}

/* LIGHT MODE OVERRIDE */
body.light-mode .research-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
}

body.light-mode .research-card h3 {
  color: #1A1F36;
}

body.light-mode .research-card p {
  color: #374151;
}

/* CARD CONTENT */
.research-card h3 {
  color: #F0F6FC;
  margin-bottom: 0.6rem;
  font-size: 1.3rem;
}

.research-card p {
  color: #C9D1D9;
  line-height: 1.55;
  text-align: justify;
}

/* ICON */
.research-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
  color: #58A6FF;
}

/* Fade‑in animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<div class="research-page">

<div class="research-header">
  <h1>Research & Innovation</h1>
  <p>Advancing the foundations of post‑quantum cryptography, secure distributed systems, and quantum‑resilient architectures.</p>
</div>

<div class="research-grid">

  <div class="research-card">
    <div class="research-icon">🔐</div>
    <h3>Lattice‑Based Cryptography</h3>
    <p>
      Design and analysis of lattice‑based schemes, including module‑LWE/LWR constructions,
      signature systems, and efficient implementations for constrained environments.
    </p>
  </div>

  <div class="research-card">
    <div class="research-icon">🛡️</div>
    <h3>PQC Implementation Security</h3>
    <p>
      Side‑channel resistance, fault‑injection hardening, and secure deployment of NIST‑standardized
      post‑quantum algorithms in real‑world systems.
    </p>
  </div>

  <div class="research-card">
    <div class="research-icon">⚛️</div>
    <h3>Hybrid Classical–Quantum Protocols</h3>
    <p>
      Protocols that combine classical cryptography with quantum primitives to achieve
      long‑term confidentiality and forward‑secure communication.
    </p>
  </div>

  <div class="research-card">
    <div class="research-icon">⛓️</div>
    <h3>Quantum‑Safe Blockchain Consensus</h3>
    <p>
      PQC‑ready consensus mechanisms, signature migration strategies, and secure wallet
      architectures for decentralized systems.
    </p>
  </div>

  <div class="research-card">
    <div class="research-icon">🤖</div>
    <h3>AI‑Assisted Cryptographic Analysis</h3>
    <p>
      Machine‑learning‑driven detection of protocol weaknesses, misconfigurations,
      and cryptographic vulnerabilities in large‑scale systems.
    </p>
  </div>

  <div class="research-card">
    <div class="research-icon">🔗</div>
    <h3>Secure Multiparty Computation</h3>
    <p>
      Efficient MPC protocols, threshold cryptography, and privacy‑preserving computation
      frameworks for distributed and adversarial environments.
    </p>
  </div>

  <div class="research-card">
    <div class="research-icon">🧩</div>
    <h3>Zero‑Knowledge Proof Systems</h3>
    <p>
      Design and optimization of ZK‑SNARKs, STARKs, and post‑quantum‑secure proof systems
      for authentication and privacy.
    </p>
  </div>

</div>

</div>
