---
layout: default
title: Quantum Transition Labs
---

<style>
/* FULL‑WIDTH (95%) */
.page-content, .wrapper, .container {
  max-width: 95% !important;
  width: 95% !important;
  margin: 2 auto !important;
  padding: 2 !important;
}

/* Page padding */
.homepage {
  padding: 2rem 2rem;
}

/* ================================
   ANIMATED QUANTUM GRADIENT HERO
   ================================ */
.hero {
  position: relative;
  text-align: center;
  padding: 6rem 2rem;
  border-bottom: 1px solid #30363D;
  overflow: hidden;
  color: #ffffff;
  background: linear-gradient(135deg, #0A0F1F, #001F3F, #003366, #001122);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Floating particles */
.hero::before, .hero::after {
  content: "";
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(88,166,255,0.25) 0%, rgba(0,0,0,0) 70%);
  animation: float 12s infinite ease-in-out;
  filter: blur(40px);
}

.hero::before { top: -200px; left: -200px; }
.hero::after { bottom: -200px; right: -200px; animation-delay: 4s; }

@keyframes float {
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(40px) translateX(40px); }
  100% { transform: translateY(0px) translateX(0px); }
}

/* HERO CONTENT */
.hero-logo {
  width: 140px;
  margin-bottom: 1.5rem;
  animation: fadeIn 1.4s ease forwards;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  animation: fadeInUp 1.2s ease forwards;
}

.hero p {
  font-size: 1.25rem;
  color: #D0D7DE;
  max-width: 700px;
  margin: 0 auto 2rem auto;
  animation: fadeInUp 1.6s ease forwards;
}

/* Glowing CTA Button */
.hero-button {
  background: #58A6FF;
  color: #0D1117 !important;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.1rem;
  box-shadow: 0 0 18px rgba(88,166,255,0.6);
  transition: 0.25s ease;
  animation: fadeInUp 2s ease forwards;
}

.hero-button:hover {
  background: #79B8FF;
  box-shadow: 0 0 28px rgba(88,166,255,0.9);
  transform: translateY(-3px);
}

/* Fade‑in animations */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* SECTION TITLES */
.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #F0F6FC;
}

.section-subtitle {
  text-align: center;
  color: #8B949E;
  margin-bottom: 2rem;
}

/* CAPABILITY CARDS */
.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.cap-card {
  background: #161B22;
  border: 1px solid #30363D;
  padding: 1.8rem;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  transition: 0.25s ease;
  animation: fadeIn 1.2s ease forwards;
}

.cap-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(88,166,255,0.25);
  border-color: #58A6FF;
}

.cap-card h3 {
  color: #F0F6FC;
  margin-bottom: 0.8rem;
}

.cap-card ul {
  color: #C9D1D9;
  line-height: 1.55;
}

/* Light mode overrides */
body.light-mode .cap-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
}

body.light-mode .cap-card h3 {
  color: #1A1F36;
}

body.light-mode .cap-card ul {
  color: #374151;
}

</style>

<div class="hero">
  <img src="/assets/css/img/logo1.png" alt="Quantum Transition Labs" class="hero-logo">
  <h1>Quantum‑Safe Security for High‑Assurance Systems</h1>
  <p>Post‑quantum cryptography, secure architecture, and quantum‑resilient systems for critical infrastructure and high‑value platforms.</p>
  <a href="/contact" class="hero-button">Contact Us</a>
</div>

<div class="homepage">

<div class="section-title">Quantum‑Safe Security for High‑Assurance Systems</div>
<div class="section-subtitle">Research‑driven. Enterprise‑ready. Built for the quantum era.</div>

<p>
Quantum Transition Labs (QTL) is a research‑driven security firm specializing in post‑quantum cryptography (PQC), cryptographic modernization, and quantum‑resilient architecture design for critical infrastructure, government, and high‑value digital platforms.
</p>

---

<div class="section-title">Core Capabilities</div>

<div class="capabilities-grid">

<div class="cap-card">
<h3>Post‑Quantum Cryptography Migration</h3>
<ul>
  <li>Cryptographic inventory & dependency mapping</li>
  <li>PQC algorithm selection (Kyber, Dilithium, SPHINCS+)</li>
  <li>Hybrid classical–quantum transition strategies</li>
  <li>Protocol redesign & interoperability validation</li>
</ul>
</div>

<div class="cap-card">
<h3>Secure Architecture & Systems Engineering</h3>
<ul>
  <li>Zero‑trust, privacy‑by‑design architectures</li>
  <li>Secure key management & HSM integration</li>
  <li>Cloud‑native cryptographic modernization</li>
  <li>Threat modeling for quantum‑capable adversaries</li>
</ul>
</div>

<div class="cap-card">
<h3>Blockchain & Distributed Systems Security</h3>
<ul>
  <li>Quantum‑safe consensus mechanisms</li>
  <li>Wallet & key‑lifecycle hardening</li>
  <li>Lattice‑based signature integration</li>
  <li>PQC‑ready smart‑contract frameworks</li>
</ul>
</div>

<div class="cap-card">
<h3>AI‑Enhanced Security Analysis</h3>
<ul>
  <li>Automated cryptographic misconfiguration detection</li>
  <li>AI‑assisted protocol verification</li>
  <li>ML‑driven risk scoring for long‑lived systems</li>
</ul>
</div>

</div>

---

<div class="section-title">Why Quantum Security Now</div>

<ul>
  <li><strong>Harvest‑Now‑Decrypt‑Later (HNDL)</strong> attacks are already occurring</li>
  <li><strong>NIST PQC standards</strong> are finalized and adoption timelines are accelerating</li>
  <li><strong>Long‑lived data</strong> (health, financial, government) must remain secure for decades</li>
  <li><strong>Regulators</strong> are beginning to mandate quantum‑safe transition plans</li>
</ul>

<p>
Organizations that begin migration early reduce cost, risk, and operational disruption.
</p>

---

<div class="section-title">Work With Us</div>

<p>
QTL provides <strong>advisory, architecture, and implementation support</strong> for organizations preparing for the quantum era.
</p>

<p>
We help you move from “we should think about PQC” to <strong>a validated, staged, and deployable migration plan</strong>.
</p>

<p><a href="/contact" class="hero-button">Contact us →</a></p>

</div>
