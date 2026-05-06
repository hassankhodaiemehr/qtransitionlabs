---
layout: default
title: Quantum Transition Labs
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
  animation: gradientShift 14s ease infinite;
}

/* subtle parallax container */
.hero-inner {
  position: relative;
  z-index: 2;
}

/* gradient animation */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Floating glow fields */
.hero::before,
.hero::after {
  content: "";
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(88,166,255,0.25) 0%, rgba(0,0,0,0) 70%);
  animation: float 16s infinite ease-in-out;
  filter: blur(40px);
  opacity: 0.9;
}

.hero::before { top: -220px; left: -220px; }
.hero::after  { bottom: -220px; right: -220px; animation-delay: 4s; }

@keyframes float {
  0%   { transform: translateY(0px) translateX(0px); }
  50%  { transform: translateY(40px) translateX(40px); }
  100% { transform: translateY(0px) translateX(0px); }
}

/* HERO CONTENT */
.hero-logo {
  width: 140px;
  margin-bottom: 1.5rem;
  animation: fadeIn 1.2s ease forwards;
}

/* shimmer underline for title */
.hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  position: relative;
  animation: fadeInUp 1.2s ease forwards;
}

.hero h1::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -0.6rem;
  width: 0;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #58A6FF, #79B8FF, #58A6FF);
  transform: translateX(-50%);
  animation: titleUnderline 1.8s ease 0.8s forwards;
}

@keyframes titleUnderline {
  0%   { width: 0; opacity: 0; }
  40%  { width: 40%; opacity: 1; }
  100% { width: 26%; opacity: 1; }
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
  to   { opacity: 1; transform: scale(1); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* SECTION TITLES */
.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #F0F6FC;
  position: relative;
}

/* subtle glow behind titles */
.section-title::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 180px;
  height: 60px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(88,166,255,0.18), transparent 70%);
  opacity: 0.7;
  z-index: -1;
}

.section-subtitle {
  text-align: center;
  color: #8B949E;
  margin-bottom: 2rem;
}

/* Light mode overrides for titles & subtitles */
body.light-mode .section-title {
  color: #0A0F1F;
}

body.light-mode .section-title::before {
  background: radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%);
}

body.light-mode .section-subtitle {
  color: #374151;
}

/* Body text light mode */
body.light-mode .homepage p,
body.light-mode .homepage ul {
  color: #374151;
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
  transition: 0.25s ease, border-color 0.25s ease;
  transform: translateY(10px);
  opacity: 0;
}

.cap-card h3 {
  color: #F0F6FC;
  margin-bottom: 0.8rem;
}

.cap-card ul {
  color: #C9D1D9;
  line-height: 1.55;
}

/* hover effect */
.cap-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 8px 24px rgba(88,166,255,0.25);
  border-color: #58A6FF;
}

/* Light mode overrides */
body.light-mode .cap-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  box-shadow: 0 4px 14px rgba(15,23,42,0.06);
}

body.light-mode .cap-card h3 {
  color: #111827;
}

body.light-mode .cap-card ul {
  color: #374151;
}

/* ================================
   MOBILE RESPONSIVE FIXES
   ================================ */
@media (max-width: 768px) {

  body, html {
    overflow-x: hidden;
  }

  .hero {
    padding: 3.5rem 1.2rem;
    background-size: 300% 300%;
  }

  .hero h1 {
    font-size: 1.9rem;
    line-height: 1.25;
  }

  .hero p {
    font-size: 1rem;
    max-width: 90%;
  }

  .hero-button {
    padding: 0.7rem 1.4rem;
    font-size: 1rem;
  }

  .hero::before,
  .hero::after {
    width: 300px;
    height: 300px;
    filter: blur(25px);
  }

  .section-title {
    font-size: 1.7rem;
  }

  .cap-card {
    padding: 1.2rem;
  }

  .cap-card h3 {
    font-size: 1.2rem;
  }

  .cap-card ul {
    font-size: 0.95rem;
  }
}

/* initial state for scroll reveal */
.reveal-target {
  opacity: 0;
  transform: translateY(24px);
}

.reveal-active {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: opacity 0.8s ease, transform 0.8s ease;
}
</style>

<div class="hero">
  <div class="hero-inner">
    <img src="/assets/css/img/logo1.png" alt="Quantum Transition Labs" class="hero-logo">
    <h1>Quantum‑Safe Security for High‑Assurance Systems</h1>
    <p>Post‑quantum cryptography, secure architecture, and quantum‑resilient systems for critical infrastructure and high‑value platforms.</p>
    <a href="/contact" class="hero-button">Contact Us</a>
  </div>
</div>

<div class="homepage">

  <div class="section-title reveal-target">Quantum‑Safe Security for High‑Assurance Systems</div>
  <div class="section-subtitle reveal-target">Research‑driven. Enterprise‑ready. Built for the quantum era.</div>

  <p class="reveal-target">
    Quantum Transition Labs (QTL) is a research‑driven security firm specializing in post‑quantum cryptography (PQC),
    cryptographic modernization, and quantum‑resilient architecture design for critical infrastructure, government,
    and high‑value digital platforms.
  </p>

  <hr style="border: 0; border-top: 1px solid #30363D; margin: 3rem 0;">

  <div class="section-title reveal-target">Core Capabilities</div>

  <div class="capabilities-grid">

    <div class="cap-card reveal-target">
      <h3>Post‑Quantum Cryptography Migration</h3>
      <ul>
        <li>Cryptographic inventory & dependency mapping</li>
        <li>PQC algorithm selection (Kyber, Dilithium, SPHINCS+)</li>
        <li>Hybrid classical–quantum transition strategies</li>
        <li>Protocol redesign & interoperability validation</li>
      </ul>
    </div>

    <div class="cap-card reveal-target">
      <h3>Secure Architecture & Systems Engineering</h3>
      <ul>
        <li>Zero‑trust, privacy‑by‑design architectures</li>
        <li>Secure key management & HSM integration</li>
        <li>Cloud‑native cryptographic modernization</li>
        <li>Threat modeling for quantum‑capable adversaries</li>
      </ul>
    </div>

    <div class="cap-card reveal-target">
      <h3>Blockchain & Distributed Systems Security</h3>
      <ul>
        <li>Quantum‑safe consensus mechanisms</li>
        <li>Wallet & key‑lifecycle hardening</li>
        <li>Lattice‑based signature integration</li>
        <li>PQC‑ready smart‑contract frameworks</li>
      </ul>
    </div>

    <div class="cap-card reveal-target">
      <h3>AI‑Enhanced Security Analysis</h3>
      <ul>
        <li>Automated cryptographic misconfiguration detection</li>
        <li>AI‑assisted protocol verification</li>
        <li>ML‑driven risk scoring for long‑lived systems</li>
      </ul>
    </div>

  </div>

  <hr style="border: 0; border-top: 1px solid #30363D; margin: 3rem 0;">

  <div class="section-title reveal-target">Why Quantum Security Now</div>

  <ul class="reveal-target">
    <li><strong>Harvest‑Now‑Decrypt‑Later (HNDL)</strong> attacks are already occurring</li>
    <li><strong>NIST PQC standards</strong> are finalized and adoption timelines are accelerating</li>
    <li><strong>Long‑lived data</strong> (health, financial, government) must remain secure for decades</li>
    <li><strong>Regulators</strong> are beginning to mandate quantum‑safe transition plans</li>
  </ul>

  <p class="reveal-target">
    Organizations that begin migration early reduce cost, risk, and operational disruption.
  </p>

  <hr style="border: 0; border-top: 1px solid #30363D; margin: 3rem 0;">

  <div class="section-title reveal-target">Work With Us</div>

  <p class="reveal-target">
    QTL provides <strong>advisory, architecture, and implementation support</strong> for organizations preparing for the quantum era.
  </p>

  <p class="reveal-target">
    We help you move from “we should think about PQC” to <strong>a validated, staged, and deployable migration plan</strong>.
  </p>

  <p class="reveal-target" style="text-align:center; margin-top:2rem;">
    <a href="/contact" class="hero-button">Contact us →</a>
  </p>

</div>

<script>
// Parallax on hero glow fields
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const hero = document.querySelector(".hero");
  if (!hero) return;
  hero.style.backgroundPosition = `${50 + x / 4}% ${50 + y / 4}%`;
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-active");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal-target").forEach(el => observer.observe(el));
</script>
