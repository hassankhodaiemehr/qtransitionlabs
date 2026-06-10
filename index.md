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
  z-index: 1;
}

/* ============================
   HERO: QUANTUM CINEMATIC
============================ */
.hero {
  position: relative;
  text-align: center;
  padding: 6rem 2rem 5rem 2rem;
  border-bottom: 1px solid #30363D;
  overflow: hidden;
  color: #ffffff;
  background: radial-gradient(circle at top, #1F2937 0%, #020617 55%, #000000 100%);
}

/* animated gradient overlay */
.hero-gradient {
  position: absolute;
  inset: -40%;
  background: conic-gradient(from 180deg,
    rgba(56,189,248,0.08),
    rgba(59,130,246,0.18),
    rgba(147,51,234,0.12),
    rgba(56,189,248,0.08)
  );
  mix-blend-mode: screen;
  opacity: 0.9;
  animation: spinGradient 32s linear infinite;
}

@keyframes spinGradient {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* subtle grid */
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.35;
  mask-image: radial-gradient(circle at center, black 0%, transparent 70%);
}

/* orbit system container */
.hero-orbit-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

/* qubit core */
.qubit-core {
  position: relative;
  width: 26px;
  height: 26px;
  background: #58A6FF;
  border-radius: 50%;
  box-shadow: 0 0 22px #58A6FF, 0 0 44px #58A6FF;
  animation: corePulse 6s ease-in-out infinite;
}

.qubit-core::after {
  content: "";
  position: absolute;
  inset: -18px;
  border-radius: 999px;
  border: 1px solid rgba(148,163,184,0.4);
  box-shadow: 0 0 30px rgba(148,163,184,0.4);
  opacity: 0.6;
}

@keyframes corePulse {
  0%, 100% { box-shadow: 0 0 22px #58A6FF, 0 0 44px #58A6FF; }
  50%      { box-shadow: 0 0 32px #79B8FF, 0 0 64px #79B8FF; }
}

/* orbit rings */
.orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(148,163,184,0.45);
  box-shadow: 0 0 18px rgba(15,23,42,0.9);
  animation: orbitSpin 40s linear infinite;
}

.orbit:nth-child(1) {
  width: 180px; height: 180px;
  animation-duration: 34s;
}
.orbit:nth-child(2) {
  width: 260px; height: 260px;
  animation-duration: 46s;
}
.orbit:nth-child(3) {
  width: 340px; height: 340px;
  animation-duration: 60s;
}

@keyframes orbitSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* orbit nodes */
.orbit-node {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #38BDF8;
  box-shadow: 0 0 12px rgba(56,189,248,0.9);
}

.orbit-node:nth-child(1) { top: -3px; left: 50%; transform: translateX(-50%); }
.orbit-node:nth-child(2) { bottom: -3px; left: 18%; }
.orbit-node:nth-child(3) { top: 22%; right: -3px; }

/* floating particles */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(148,163,184,0.9);
  border-radius: 50%;
  animation: particleFloat 14s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes particleFloat {
  0%   { transform: translateY(0px); opacity: 0.3; }
  50%  { transform: translateY(-40px); opacity: 1; }
  100% { transform: translateY(0px); opacity: 0.3; }
}

/* HERO CONTENT */
.hero-inner {
  position: relative;
  z-index: 3;
}

.hero-logo {
  width: 140px;
  margin-bottom: 1.5rem;
  animation: fadeIn 1.1s ease forwards;
}

.hero-badge-row {
  display: inline-flex;
  gap: 0.6rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.hero-badge {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(148,163,184,0.6);
  color: #E5E7EB;
  background: rgba(15,23,42,0.7);
}

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
  background: linear-gradient(90deg, #38BDF8, #60A5FA, #38BDF8);
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
  max-width: 720px;
  margin: 0 auto 2rem auto;
  animation: fadeInUp 1.6s ease forwards;
}

/* CTA row */
.hero-cta-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  animation: fadeInUp 2s ease forwards;
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

.hero-secondary {
  padding: 0.85rem 1.8rem;
  border-radius: 999px;
  border: 1px solid rgba(148,163,184,0.7);
  color: #E5E7EB;
  text-decoration: none;
  font-size: 0.98rem;
  background: rgba(15,23,42,0.7);
  backdrop-filter: blur(6px);
  transition: 0.25s ease;
}

.hero-secondary:hover {
  border-color: #38BDF8;
  color: #F9FAFB;
  transform: translateY(-2px);
}

/* hero stats strip */
.hero-stats {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: #9CA3AF;
}

.hero-stat {
  min-width: 150px;
}

.hero-stat strong {
  display: block;
  font-size: 1.1rem;
  color: #E5E7EB;
}

/* animations */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
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
  color: #F9FAFB;
  position: relative;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 190px;
  height: 60px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%);
  opacity: 0.7;
  z-index: -1;
}

.section-subtitle {
  text-align: center;
  color: #9CA3AF;
  margin-bottom: 2rem;
}

/* light mode overrides for titles */
body.light-mode .section-title {
  color: #0F172A;
}

body.light-mode .section-title::before {
  background: radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%);
}

body.light-mode .section-subtitle {
  color: #4B5563;
}

body.light-mode .homepage p,
body.light-mode .homepage ul {
  color: #374151;
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
  background: #020617;
  border: 1px solid #1F2937;
  padding: 1.8rem;
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(15,23,42,0.7);
  transition: 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  transform: translateY(18px);
  opacity: 0;
}

.cap-card h3 {
  color: #E5E7EB;
  margin-bottom: 0.8rem;
}

.cap-card ul {
  color: #CBD5F5;
  line-height: 1.55;
  font-size: 0.97rem;
}

/* accent bar */
.cap-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(56,189,248,0.4), transparent, rgba(129,140,248,0.4));
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.cap-card:hover::before {
  opacity: 1;
}

.cap-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 24px 60px rgba(15,23,42,0.9);
  border-color: #38BDF8;
}

/* light mode cards */
body.light-mode .cap-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  box-shadow: 0 18px 40px rgba(15,23,42,0.08);
}

body.light-mode .cap-card h3 {
  color: #111827;
}

body.light-mode .cap-card ul {
  color: #374151;
}

/* ============================
   PARTNER / CONTEXT STRIP
============================ */
.partner-strip {
  margin-top: 3rem;
  padding: 1.2rem 1.5rem;
  border-radius: 999px;
  border: 1px solid #1F2937;
  background: radial-gradient(circle at left, rgba(56,189,248,0.18), transparent 60%);
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: #9CA3AF;
}

.partner-label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  color: #E5E7EB;
}

.partner-pill {
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(148,163,184,0.7);
}

/* light mode partner strip */
body.light-mode .partner-strip {
  border-color: #E5E7EB;
  background: radial-gradient(circle at left, rgba(59,130,246,0.12), transparent 60%);
  color: #4B5563;
}

body.light-mode .partner-label {
  color: #111827;
}

/* ============================
   SCROLL REVEAL
============================ */
.reveal-target {
  opacity: 0;
  transform: translateY(24px);
}

.reveal-active {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: opacity 0.8s ease, transform 0.8s ease;
}

/* ============================
   MOBILE
============================ */
@media (max-width: 768px) {

  body, html {
    overflow-x: hidden;
  }

  .hero {
    padding: 4rem 1.2rem 3.5rem 1.2rem;
  }

  .hero h1 {
    font-size: 2rem;
    line-height: 1.25;
  }

  .hero p {
    font-size: 1rem;
    max-width: 95%;
  }

  .hero-cta-row {
    flex-direction: column;
  }

  .hero-button,
  .hero-secondary {
    width: 100%;
    justify-content: center;
    text-align: center;
  }

  .hero-stats {
    gap: 1.5rem;
  }

  .section-title {
    font-size: 1.7rem;
  }

  .cap-card {
    padding: 1.3rem;
  }

  .cap-card h3 {
    font-size: 1.15rem;
  }

  .cap-card ul {
    font-size: 0.95rem;
  }

  .partner-strip {
    border-radius: 1.25rem;
  }
}
</style>

<div class="hero">
  <div class="hero-gradient"></div>
  <div class="hero-grid"></div>

  <div class="hero-orbit-layer">
    <div class="orbit">
      <div class="orbit-node"></div>
      <div class="orbit-node"></div>
      <div class="orbit-node"></div>
    </div>
    <div class="orbit">
      <div class="orbit-node"></div>
      <div class="orbit-node"></div>
      <div class="orbit-node"></div>
    </div>
    <div class="orbit">
      <div class="orbit-node"></div>
      <div class="orbit-node"></div>
      <div class="orbit-node"></div>
    </div>
    <div class="qubit-core"></div>

    <!-- floating particles -->
    <div class="particle" style="top:18%; left:16%; animation-delay:0s;"></div>
    <div class="particle" style="top:72%; left:78%; animation-delay:2s;"></div>
    <div class="particle" style="top:40%; left:60%; animation-delay:4s;"></div>
    <div class="particle" style="top:82%; left:28%; animation-delay:1s;"></div>
    <div class="particle" style="top:28%; left:82%; animation-delay:3s;"></div>
  </div>

  <div class="hero-inner">
    <img src="/assets/css/img/logo1.png" alt="Quantum Transition Labs" class="hero-logo">


    <h1>Quantum Transition Labs (QTL)</h1>
    <p>Post‑quantum cryptography, secure architecture, and quantum‑resilient systems for critical infrastructure, governments, and high‑value digital platforms.</p>

    <div class="hero-cta-row">
      <a href="/contact" class="hero-button">Engage with QTL</a>
      <a href="/research" class="hero-secondary">View research & publications</a>
    </div>

    <div class="hero-stats">
      <div class="hero-stat">
        <strong>10+ years</strong>
        PQC, coding theory & blockchain security
      </div>
      <div class="hero-stat">
        <strong>IEEE / IACR</strong>
        Peer‑reviewed cryptography & security research
      </div>
      <div class="hero-stat">
        <strong>Global</strong>
        Remote & on‑site engagements
      </div>
    </div>
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

  <div class="partner-strip reveal-target">
    <span class="partner-label">Who we work with</span>
    <span class="partner-pill">Critical infrastructure operators</span>
    <span class="partner-pill">Financial & fintech platforms</span>
    <span class="partner-pill">Cloud & SaaS providers</span>
    <span class="partner-pill">Research & innovation labs</span>
  </div>

  <hr style="border: 0; border-top: 1px solid #1F2937; margin: 3rem 0;">

  <div class="section-title reveal-target">Services</div>

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

  <hr style="border: 0; border-top: 1px solid #1F2937; margin: 3rem 0;">

  <div class="section-title reveal-target">Why Quantum Security Now</div>

<ul class="reveal-target">
  <li><strong>Harvest‑Now‑Decrypt‑Later (HNDL)</strong> attacks are already occurring.</li>
  <li><strong>NIST PQC standards</strong> are finalized and adoption timelines are accelerating.</li>
  <li><strong>Long‑lived data</strong> (health, financial, government) must remain secure for decades.</li>
  <li><strong>Regulators</strong> are beginning to mandate quantum‑safe transition plans:
    <ul>
      <li>Canada’s Cyber Centre requires federal departments to migrate to PQC (<a href="https://www.cyber.gc.ca/en/guidance/roadmap-migration-post-quantum-cryptography-government-canada-itsm40001" target="_blank">ITSM.40.001 Roadmap</a>).</li>
      <li>The G7 Cybersecurity Working Group issued a coordinated PQC migration statement (<a href="https://www.cyber.gc.ca/en/news-events/g7-cybersecurity-working-group-statement-preparing-post-quantum-cryptography-migration" target="_blank">2026</a>).</li>
      <li>The European Commission published a PQC transition roadmap for EU institutions (<a href="https://digital-strategy.ec.europa.eu/en/library/coordinated-implementation-roadmap-transition-post-quantum-cryptography" target="_blank">2025</a>).</li>
      <li>The U.S. government emphasized PQC migration as part of national cybersecurity reprioritization (<a href="https://www.whitehouse.gov/fact-sheets/2025/06/fact-sheet-president-donald-j-trump-reprioritizes-cybersecurity-efforts-to-protect-america/" target="_blank">White House Fact Sheet</a>).</li>
    </ul>
  </li>
</ul>




  <p class="reveal-target">
    Organizations that begin migration early reduce cost, risk, and operational disruption.
  </p>

  <hr style="border: 0; border-top: 1px solid #1F2937; margin: 3rem 0;">

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
// Parallax: subtle hero gradient shift
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 16;
  const y = (e.clientY / window.innerHeight - 0.5) * 16;
  const gradient = document.querySelector(".hero-gradient");
  if (gradient) {
    gradient.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;
  }
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
