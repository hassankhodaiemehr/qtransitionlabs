---
layout: default
title: Quantum Transition Labs
---

<style>

/* ============================
   GLOBAL LAYOUT
============================ */
.page-content, .wrapper, .container {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}

.homepage {
  padding: 2rem 2rem;
}

/* ============================
   HERO SECTION (CINEMATIC)
============================ */
.hero {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  background: radial-gradient(circle at center, #001F3F 0%, #0A0F1F 70%);
}

/* ============================
   QUANTUM ORBIT SYSTEM
============================ */
.qubit-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 26px;
  height: 26px;
  background: #58A6FF;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 22px #58A6FF, 0 0 44px #58A6FF;
  animation: corePulse 6s ease-in-out infinite;
}

@keyframes corePulse {
  0%, 100% { box-shadow: 0 0 22px #58A6FF, 0 0 44px #58A6FF; }
  50% { box-shadow: 0 0 32px #79B8FF, 0 0 60px #79B8FF; }
}

/* Orbit rings */
.orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(88,166,255,0.35);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: orbitRotate 28s linear infinite;
}

.orbit:nth-child(1) { width: 180px; height: 180px; animation-duration: 32s; }
.orbit:nth-child(2) { width: 260px; height: 260px; animation-duration: 44s; }
.orbit:nth-child(3) { width: 340px; height: 340px; animation-duration: 58s; }

@keyframes orbitRotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* ============================
   FLOATING PARTICLES
============================ */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(88,166,255,0.6);
  border-radius: 50%;
  animation: particleFloat 12s ease-in-out infinite;
}

@keyframes particleFloat {
  0% { transform: translateY(0px); opacity: 0.4; }
  50% { transform: translateY(-40px); opacity: 1; }
  100% { transform: translateY(0px); opacity: 0.4; }
}

/* ============================
   HERO TEXT
============================ */
.hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-top: 2rem;
  animation: fadeInUp 1.4s ease forwards;
}

.hero p {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 1rem auto 2rem auto;
  color: #D0D7DE;
  animation: fadeInUp 1.8s ease forwards;
}

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
  animation: fadeInUp 2.2s ease forwards;
}

.hero-button:hover {
  background: #79B8FF;
  box-shadow: 0 0 28px rgba(88,166,255,0.9);
  transform: translateY(-3px);
}

/* Fade-in animation */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
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
  color: #F0F6FC;
}

.section-subtitle {
  text-align: center;
  color: #8B949E;
  margin-bottom: 2rem;
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
  background: #161B22;
  border: 1px solid #30363D;
  padding: 1.8rem;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  transition: 0.25s ease;
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

/* ============================
   MOBILE RESPONSIVE
============================ */
@media (max-width: 768px) {

  .hero {
    height: 90vh;
    padding: 1rem;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .orbit:nth-child(1) { width: 120px; height: 120px; }
  .orbit:nth-child(2) { width: 180px; height: 180px; }
  .orbit:nth-child(3) { width: 240px; height: 240px; }

  .qubit-core {
    width: 18px;
    height: 18px;
  }
}

</style>

<div class="hero">

  <!-- Quantum Orbit System -->
  <div class="qubit-core"></div>
  <div class="orbit"></div>
  <div class="orbit"></div>
  <div class="orbit"></div>

  <!-- Floating particles -->
  <div class="particle" style="top:20%; left:15%; animation-delay:0s;"></div>
  <div class="particle" style="top:70%; left:80%; animation-delay:2s;"></div>
  <div class="particle" style="top:40%; left:60%; animation-delay:4s;"></div>
  <div class="particle" style="top:85%; left:30%; animation-delay:1s;"></div>

  <h1>Quantum‑Safe Security for High‑Assurance Systems</h1>
  <p>Post‑quantum cryptography, secure architecture, and quantum‑resilient systems for critical infrastructure and high‑value platforms.</p>
  <a href="/contact" class="hero-button">Contact Us</a>
</div>

<div class="homepage">

  <div class="section-title">Quantum‑Safe Security for High‑Assurance Systems</div>
  <div class="section-subtitle">Research‑driven. Enterprise‑ready. Built for the quantum era.</div>

  <p>
    Quantum Transition Labs (QTL) is a research‑driven security firm specializing in post‑quantum cryptography (PQC),
    cryptographic modernization, and quantum‑resilient architecture design for critical infrastructure, government,
    and high‑value digital platforms.
  </p>

  <hr style="border: 0; border-top: 1px solid #30363D; margin: 3rem 0;">

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

  <hr style="border: 0; border-top: 1px solid #30363D; margin: 3rem 0;">

  <div class="section-title">Why Quantum Security Now</div>

  <ul>
    <li><strong>Harvest‑Now‑Decrypt‑Later (HNDL)</strong> attacks are already occurring</li>
    <li><strong>NIST PQC standards</strong> are finalized and adoption timelines are accelerating</li>
    <li><strong>Long‑lived data</strong> must remain secure for decades</li>
    <li><strong>Regulators</strong> are beginning to mandate quantum‑safe transition plans</li>
  </ul>

  <p>
    Organizations that begin migration early reduce cost, risk, and operational disruption.
  </p>

  <hr style="border: 0; border-top: 1px solid #30363D; margin: 3rem 0;">

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

<script>
/* ============================================
   1. PARALLAX MOTION FOR ORBITS & PARTICLES
============================================ */
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  document.querySelectorAll(".orbit").forEach((orbit, i) => {
    const depth = (i + 1) * 4;
    orbit.style.transform =
      `translate(calc(-50% + ${x / depth}px), calc(-50% + ${y / depth}px)) rotate(0deg)`;
  });

  document.querySelectorAll(".particle").forEach((p, i) => {
    const depth = (i + 1) * 10;
    p.style.transform = `translate(${x / depth}px, ${y / depth}px)`;
  });
});

/* ============================================
   2. SCROLL‑TRIGGERED SECTION ANIMATIONS
============================================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".section-title, .cap-card, .section-subtitle, .homepage p, .homepage ul")
  .forEach(el => observer.observe(el));

const style = document.createElement("style");
style.innerHTML = `
  .reveal {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transition: 0.9s ease;
  }
  .section-title, .cap-card, .section-subtitle, .homepage p, .homepage ul {
    opacity: 0;
    transform: translateY(30px);
  }
`;
document.head.appendChild(style);

/* ============================================
   3. QUANTUM WAVE FOOTER
============================================ */
const wave = document.createElement("div");
wave.className = "quantum-wave";
document.body.appendChild(wave);

const waveStyle = document.createElement("style");
waveStyle.innerHTML = `
  .quantum-wave {
    position: relative;
    width: 100%;
    height: 180px;
    margin-top: 4rem;
    background: radial-gradient(circle at 50% 120%, rgba(88,166,255,0.25), transparent 70%);
    overflow: hidden;
  }

  .quantum-wave::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: repeating-radial-gradient(
      circle,
      rgba(88,166,255,0.15) 0px,
      rgba(88,166,255,0.15) 2px,
      transparent 3px,
      transparent 6px
    );
    animation: waveMotion 18s linear infinite;
    opacity: 0.4;
  }

  @keyframes waveMotion {
    0% { transform: rotate(0deg) scale(1); }
    100% { transform: rotate(360deg) scale(1); }
  }
`;
document.head.appendChild(waveStyle);
</script>
