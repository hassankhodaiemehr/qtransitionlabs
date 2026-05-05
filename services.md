---
layout: default
title: Services
---

<style>
/* Full-width layout */
.page-content, .wrapper, .container {
  max-width: 100% !important;
  width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* Page padding */
.services-page {
  padding: 2rem 3rem;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Force 3 columns on desktop */
@media (min-width: 900px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Service Card */
.service-card {
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 14px;
  padding: 1.8rem;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}

/* Icon */
.service-icon {
  font-size: 2.4rem;
  margin-bottom: 1rem;
  color: #58A6FF;
}

/* Headings */
.service-card h3 {
  margin-top: 0.5rem;
  margin-bottom: 0.8rem;
  color: #F0F6FC;
}

/* Text */
.service-card p {
  color: #C9D1D9;
  line-height: 1.55;
}
</style>

<div class="services-page">

# Our Services

<div class="services-grid">

<!-- PQC Readiness -->
<div class="service-card">
  <div class="service-icon">🔍</div>
  <h3>PQC Readiness Assessment</h3>
  <p>
    Comprehensive analysis of your cryptographic footprint, algorithm dependencies, 
    long‑term data exposure, and quantum‑risk posture.
  </p>
</div>

<!-- PQC Migration -->
<div class="service-card">
  <div class="service-icon">🛠️</div>
  <h3>PQC Migration Roadmap</h3>
  <p>
    A phased, low‑risk transition plan aligned with NIST standards, operational constraints, 
    and enterprise‑grade security requirements.
  </p>
</div>

<!-- Architecture -->
<div class="service-card">
  <div class="service-icon">🏗️</div>
  <h3>Architecture & Protocol Design</h3>
  <p>
    Quantum‑safe redesign of authentication, key exchange, signatures, 
    and data‑at‑rest protection for modern distributed systems.
  </p>
</div>

<!-- Blockchain -->
<div class="service-card">
  <div class="service-icon">🔐</div>
  <h3>Blockchain & Web3 Hardening</h3>
  <p>
    Quantum‑resistant consensus, wallet security, and post‑quantum signature integration 
    for blockchain and decentralized applications.
  </p>
</div>

<!-- AI Security -->
<div class="service-card">
  <div class="service-icon">🤖</div>
  <h3>AI‑Enhanced Security Analysis</h3>
  <p>
    Automated detection of cryptographic misconfigurations, protocol weaknesses, 
    and emerging quantum‑era vulnerabilities.
  </p>
</div>

<!-- Training -->
<div class="service-card">
  <div class="service-icon">📘</div>
  <h3>Training & Executive Briefings</h3>
  <p>
    Clear, actionable education for engineering teams, CISOs, and leadership 
    on PQC, migration strategy, and quantum‑era risk.
  </p>
</div>

</div>
</div>
