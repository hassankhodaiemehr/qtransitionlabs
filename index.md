---
layout: default
title: Home
description: Post-quantum cryptography, secure architecture, and quantum-resilient systems for critical infrastructure and enterprise.
full_width: true
stylesheet: /assets/css/home.css
script: /assets/js/home.js
---

<div class="hero">
  <div class="hero-bg-layer" aria-hidden="true">
    <div class="hero-quantum-field">
      <div class="hero-lattice"></div>
      <div class="hero-aurora"></div>
    </div>
    <svg class="hero-qmesh" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <g class="hero-qmesh-links" stroke="rgba(56, 189, 248, 0.12)" stroke-width="1">
        <line x1="120" y1="180" x2="280" y2="120"/><line x1="280" y1="120" x2="420" y2="200"/>
        <line x1="420" y1="200" x2="560" y2="140"/><line x1="560" y1="140" x2="680" y2="220"/>
        <line x1="200" y1="320" x2="360" y2="280"/><line x1="360" y1="280" x2="500" y2="340"/>
        <line x1="500" y1="340" x2="640" y2="300"/><line x1="280" y1="120" x2="360" y2="280"/>
        <line x1="420" y1="200" x2="500" y2="340"/><line x1="120" y1="180" x2="200" y2="320"/>
      </g>
      <g class="hero-qmesh-nodes" fill="rgba(56, 189, 248, 0.35)">
        <circle cx="120" cy="180" r="3"/><circle cx="280" cy="120" r="4"/><circle cx="420" cy="200" r="3.5"/>
        <circle cx="560" cy="140" r="3"/><circle cx="680" cy="220" r="4"/><circle cx="200" cy="320" r="3"/>
        <circle cx="360" cy="280" r="5"/><circle cx="500" cy="340" r="3.5"/><circle cx="640" cy="300" r="3"/>
      </g>
    </svg>
    <svg class="hero-qwaves" viewBox="0 0 1200 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path class="hero-qwave hero-qwave--1" d="M0,80 C150,40 300,120 450,80 S750,40 900,80 S1050,120 1200,80" fill="none" stroke="rgba(56,189,248,0.18)" stroke-width="1.5"/>
      <path class="hero-qwave hero-qwave--2" d="M0,100 C150,140 300,60 450,100 S750,140 900,100 S1050,60 1200,100" fill="none" stroke="rgba(129,140,248,0.14)" stroke-width="1.5"/>
    </svg>
  </div>

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

    <div class="particle particle--sm" style="top:18%; left:16%; animation-delay:0s;"></div>
    <div class="particle" style="top:72%; left:78%; animation-delay:2s;"></div>
    <div class="particle particle--lg" style="top:40%; left:60%; animation-delay:4s;"></div>
    <div class="particle particle--sm" style="top:82%; left:28%; animation-delay:1s;"></div>
    <div class="particle" style="top:28%; left:82%; animation-delay:3s;"></div>
    <div class="particle particle--sm" style="top:55%; left:12%; animation-delay:5s;"></div>
    <div class="particle particle--lg" style="top:12%; left:68%; animation-delay:1.5s;"></div>
  </div>

  <div class="hero-inner">
    {% include brand-logo.html hero=true %}

    <h1>Quantum Transition Labs</h1>
    <p>Post‑quantum cryptography, secure architecture, and quantum‑resilient systems for critical infrastructure, governments, and high‑value digital platforms.</p>

    <div class="hero-cta-row">
      <a href="/contact/" class="hero-button">Schedule a Consultation</a>
      <a href="/research/" class="hero-secondary">View Research &amp; Publications</a>
    </div>

    <div class="hero-stats">
      <div class="hero-stat">
        <strong>10+ years</strong>
        PQC, coding theory &amp; blockchain security
      </div>
      <div class="hero-stat">
        <strong>IEEE / IACR</strong>
        Peer‑reviewed cryptography &amp; security research
      </div>
      <div class="hero-stat">
        <strong>Global</strong>
        Remote &amp; on‑site engagements
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
    <span class="partner-pill">Financial &amp; fintech platforms</span>
    <span class="partner-pill">Cloud &amp; SaaS providers</span>
    <span class="partner-pill">Research &amp; innovation labs</span>
  </div>

  <hr class="section-divider">

  <div class="section-title reveal-target">Services</div>

  <div class="capabilities-grid">

    <div class="cap-card reveal-target">
      <h3>Post‑Quantum Cryptography Migration</h3>
      <ul>
        <li>Cryptographic inventory &amp; dependency mapping</li>
        <li>PQC algorithm selection (Kyber, Dilithium, SPHINCS+)</li>
        <li>Hybrid classical–quantum transition strategies</li>
        <li>Protocol redesign &amp; interoperability validation</li>
      </ul>
    </div>

    <div class="cap-card reveal-target">
      <h3>Secure Architecture &amp; Systems Engineering</h3>
      <ul>
        <li>Zero‑trust, privacy‑by‑design architectures</li>
        <li>Secure key management &amp; HSM integration</li>
        <li>Cloud‑native cryptographic modernization</li>
        <li>Threat modeling for quantum‑capable adversaries</li>
      </ul>
    </div>

    <div class="cap-card reveal-target">
      <h3>Blockchain &amp; Distributed Systems Security</h3>
      <ul>
        <li>Quantum‑safe consensus mechanisms</li>
        <li>Wallet &amp; key‑lifecycle hardening</li>
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

  <hr class="section-divider">

  <div class="section-title reveal-target">Why Quantum Security Now</div>

  <ul class="reveal-target">
    <li class="fade-in"><span class="icon" aria-hidden="true">🔐</span> <strong>Harvest‑Now‑Decrypt‑Later (HNDL)</strong> attacks are already underway, putting long‑term sensitive data at risk.</li>

    <li class="fade-in delay-1"><span class="icon" aria-hidden="true">🏛️</span> <strong>NIST PQC standards</strong> are finalized (<a href="https://csrc.nist.gov/projects/post-quantum-cryptography" target="_blank" rel="noopener noreferrer">link</a>), and global adoption timelines are accelerating across government and industry.</li>

    <li class="fade-in delay-2"><span class="icon" aria-hidden="true">📚</span> <strong>Long‑lived data</strong>—including health, financial, and government records—must remain secure for decades, far beyond the lifespan of today's cryptography.</li>

    <li class="fade-in delay-3"><span class="icon" aria-hidden="true">⚖️</span> <strong>Regulators</strong> are now mandating quantum‑safe transition plans:
      <ul>
        <li><a href="https://www.cyber.gc.ca/en/guidance/roadmap-migration-post-quantum-cryptography-government-canada-itsm40001" target="_blank" rel="noopener noreferrer">Canada's PQC Roadmap</a> requires federal departments to migrate to PQC.</li>
        <li><a href="https://www.cyber.gc.ca/en/news-events/g7-cybersecurity-working-group-statement-preparing-post-quantum-cryptography-migration" target="_blank" rel="noopener noreferrer">G7 Cybersecurity Working Group</a> calls for coordinated PQC migration.</li>
        <li><a href="https://digital-strategy.ec.europa.eu/en/library/coordinated-implementation-roadmap-transition-post-quantum-cryptography" target="_blank" rel="noopener noreferrer">European Commission</a> mandates PQC transition across EU institutions.</li>
        <li><a href="https://www.whitehouse.gov/fact-sheets/2025/06/fact-sheet-president-donald-j-trump-reprioritizes-cybersecurity-efforts-to-protect-america/" target="_blank" rel="noopener noreferrer">U.S. White House</a> prioritizes PQC migration as part of national cybersecurity strategy.</li>
      </ul>
    </li>
  </ul>

  <p class="reveal-target">
    Organizations that begin migration early reduce cost, risk, and operational disruption.
  </p>

  <hr class="section-divider">

  <div class="section-title reveal-target">Work With Us</div>

  <p class="reveal-target">
    QTL provides <strong>advisory, architecture, and implementation support</strong> for organizations preparing for the quantum era.
  </p>

  <p class="reveal-target">
    We help you move from "we should think about PQC" to <strong>a validated, staged, and deployable migration plan</strong>.
  </p>

  <div class="page-cta reveal-target">
    <a href="/contact/" class="hero-button">Schedule a Consultation</a>
  </div>

</div>
