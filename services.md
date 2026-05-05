---
layout: default
title: Services
---

<style>
/* GLOBAL FULL-WIDTH */
.page-content, .wrapper, .container {
  max-width: 95% !important;
  width: 95% !important;
  padding-left: 2 !important;
  padding-right: 2 !important;
}

/* Page padding */
.services-page {
  padding: 2rem 3rem;
}

/* Header */
.services-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.services-header h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #F0F6FC;
}

.services-subtitle {
  color: #8B949E;
  font-size: 1.15rem;
  margin-top: -0.3rem;
}

body.light-mode .services-header h1 {
  color: #1A1F36;
}

body.light-mode .services-subtitle {
  color: #4B5563;
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

/* Service Card — Dark Mode */
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

/* Light Mode Card Override */
body.light-mode .service-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}

body.light-mode .service-card h3 {
  color: #1A1F36;
}

body.light-mode .service-card p {
  color: #374151;
}

body.light-mode .service-icon {
  color: #0A66C2;
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
  font-size: 1.4rem;
  font-weight: 600;
}

/* Text */
.service-card p {
  color: #C9D1D9;
  line-height: 1.55;
}
</style>

<div class="services-page">

<div class="services-header">
  <h1>Our Services</h1>
  <p class="services-subtitle">
    Enterprise‑grade post‑quantum security solutions designed for real‑world systems.
  </p>
</div>

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
