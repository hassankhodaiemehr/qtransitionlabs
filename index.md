---
layout: default
title: Quantum Transition Labs
---

<style>

/* ============================
   GLOBAL LAYOUT
============================ */
.page-content, .wrapper, .container {
  max-width: 95% !important;
  width: 95% !important;
  margin: 0 auto !important;
  padding: 0 !important;
}

.homepage {
  padding: 2.5rem 2rem 3.5rem 2rem;
  position: relative;
  z-index: 2;
}

/* ============================
   HERO — CLEAN + CINEMATIC
============================ */
.hero {
  position: relative;
  padding: 6rem 2rem 5rem 2rem;
  text-align: center;
  overflow: hidden;
  background: #020617;
  border-bottom: 1px solid #1E293B;
}

/* Clean center content well */
.hero-content {
  position: relative;
  z-index: 5;
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 0 40px rgba(0,0,0,0.45);
}

/* ============================
   ATOM BACKGROUND — NOW SAFE
============================ */

/* Container for atom animation */
.atom-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

/* Fade atom away from center */
.atom-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center,
    rgba(2,6,23,1) 0%,
    rgba(2,6,23,0.85) 30%,
    rgba(2,6,23,0.6) 55%,
    rgba(2,6,23,0.2) 75%,
    rgba(2,6,23,0) 100%
  );
  z-index: 3;
}

/* Orbit system pushed to edges */
.atom-orbits {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 900px;
  height: 900px;
  transform: translate(-50%, -50%);
  opacity: 0.35;
  filter: blur(1px);
  z-index: 2;
}

/* Orbit rings */
.atom-orbits .ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(148,163,184,0.28);
  animation: spin 40s linear infinite;
}

.atom-orbits .ring:nth-child(1) { width: 600px; height: 600px; animation-duration: 34s; }
.atom-orbits .ring:nth-child(2) { width: 750px; height: 750px; animation-duration: 46s; }
.atom-orbits .ring:nth-child(3) { width: 900px; height: 900px; animation-duration: 60s; }

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Floating particles */
.particle {
  position: absolute;
  width: 7px;
  height: 7px;
  background: rgba(148,163,184,0.55);
  border-radius: 50%;
  animation: float 14s ease-in-out infinite;
  opacity: 0.45;
  filter: blur(1px);
}

@keyframes float {
  0%   { transform: translateY(0px); opacity: 0.3; }
  50%  { transform: translateY(-40px); opacity: 1; }
  100% { transform: translateY(0px); opacity: 0.3; }
}

/* ============================
   HERO TEXT
============================ */
.hero-logo {
  width: 140px;
  margin-bottom: 1.5rem;
}

.hero h1 {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #F8FAFC;
}

.hero p {
  font-size: 1.2rem;
  color: #CBD5E1;
  max-width: 680px;
  margin: 0 auto 2rem auto;
}

.hero-button {
  background: #38BDF8;
  color: #0F172A !important;
  padding: 0.9rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.05rem;
  box-shadow: 0 0 18px rgba(56,189,248,0.6);
  transition: 0.25s ease;
}

.hero-button:hover {
  background: #60A5FA;
  box-shadow: 0 0 26px rgba(56,189,248,0.9);
  transform: translateY(-2px);
}

/* ============================
   SECTION TITLES
============================ */
.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #F1F5F9;
}

body.light-mode .section-title {
  color: #0F172A;
}

.section-subtitle {
  text-align: center;
  color: #94A3B8;
  margin-bottom: 2rem;
}

body.light-mode .section-subtitle {
  color: #475569;
}

/* ============================
   CAPABILITY CARDS
============================ */
.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.cap-card {
  background: #0F172A;
  border: 1px solid #1E293B;
  padding: 1.8rem;
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(15,23,42,0.7);
  transition: 0.25s ease;
}

.cap-card:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: #38BDF8;
  box-shadow: 0 24px 60px rgba(15,23,42,0.9);
}

.cap-card h3 {
  color: #E2E8F0;
  margin-bottom: 0.8rem;
}

.cap-card ul {
  color: #CBD5E1;
  line-height: 1.55;
  font-size: 0.97rem;
}

body.light-mode .cap-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  box-shadow: 0 18px 40px rgba(15,23,42,0.08);
}

body.light-mode .cap-card h3 {
  color: #0F172A;
}

body.light-mode .cap-card ul {
  color: #475569;
}

/* ============================
   MOBILE
============================ */
@media (max-width: 768px) {
  .hero-content {
    padding: 1.5rem;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .cap-card {
    padding: 1.3rem;
  }
}
</style>

<!-- ============================
     HERO SECTION
============================ -->
<div class="hero">

  <!-- Atom background (now safe) -->
  <div class="atom-bg">
    <div class="atom-orbits">
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
    </div>

    <!-- floating particles -->
    <div class="particle" style="top:18%; left:16%; animation-delay:0s;"></div>
    <div class="particle" style="top:72%; left:78%; animation-delay:2s;"></div>
    <div class="particle" style="top:40%; left:60%; animation-delay:4s;"></div>
    <div class="particle" style="top:82%; left:28%; animation-delay:1s;"></div>
    <div class="particle" style="top:28%; left:82%; animation-delay:3s;"></div>
  </div>

  <!-- Clean content well -->
  <div class="hero-content">
    <img src="/assets/css/img/logo1.png" alt="Quantum Transition Labs" class="hero-logo">

    <h1>Quantum‑Safe Security for High‑Assurance Systems</h1>

    <p>
      Post‑quantum cryptography, secure architecture, and quantum‑resilient systems
      for critical infrastructure and high‑value platforms.
    </p>

    <a href="/contact" class="hero-button">Contact Us</a>
  </div>
</div>

<!-- ============================
     MAIN CONTENT
============================ -->
<div class="homepage">

  <div class="section-title">Quantum‑Safe Security for High‑Assurance Systems</div>
  <div class="section-subtitle">Research‑driven. Enterprise‑ready. Built for the quantum era.</div>

  <p>
    Quantum Transition Labs (QTL) is a research‑driven security firm specializing in post‑quantum cryptography (PQC),
    cryptographic modernization, and quantum‑resilient architecture design for critical infrastructure, government,
    and high‑value digital platforms.
  </p>

  <hr style="border: 0; border-top: 1px solid #1E293B; margin: 3rem 0;">

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

  <hr style="border: 0; border-top: 1px solid #1E293B; margin: 3rem 0;">

  <div class="section-title">Why Quantum Security Now</div>

  <ul>
    <li><strong>Harvest‑Now‑Decrypt‑Later (HNDL)</strong> attacks are already occurring.</li>
    <li><strong>NIST PQC standards</strong> are finalized and adoption timelines are accelerating.</li>
    <li><strong>Long‑lived data</strong> must remain secure for decades.</li>
    <li><strong>Regulators</strong> are beginning to mandate quantum‑safe transition plans.</li>
  </ul>

  <p>
    Organizations that begin migration early reduce cost, risk, and operational disruption.
  </p>

  <hr style="border: 0; border-top: 1px solid #1E293B; margin: 3rem 0;">

  <div class="section-title">Work With Us</div>

  <p>
    QTL provides <strong>advisory, architecture, and implementation support</strong> for organizations preparing for the quantum era.
  </p>

  <p>
    We help you move from “we should think about PQC” to <strong>a validated, staged, and deployable migration plan</strong>.
  </p>

  <p style="text-align:center; margin-top:2rem;">
    <a href="/contact" class="hero-button">Contact us →</a>
  </p>

</div>
