---
layout: default
title: PQC Readiness
description: Self-assess your post-quantum cryptography readiness and find answers to common PQC migration questions.
stylesheet: /assets/css/readiness.css
script: /assets/js/readiness.js
permalink: /pqc-readiness/
---

<div class="page-section readiness-page">

<div class="page-banner-group">
  {% include page-banner-bg.html %}
  <div class="page-header reveal-target">
    <h1>PQC Readiness</h1>
    <p class="page-subtitle">
      A short self‑assessment and FAQ to help you gauge where you stand—and what to do next.
    </p>
  </div>
</div>

<section class="readiness-intro reveal-target" aria-labelledby="readiness-intro-heading">
  <h2 id="readiness-intro-heading" class="visually-hidden">About this assessment</h2>
  <p>
    Post‑quantum migration is a multi‑year program. This questionnaire highlights common readiness
    signals—inventory, data lifetimes, executive sponsorship, and regulatory drivers—so you can
    prioritize next steps. It takes about three minutes and does not collect personal data.
  </p>
  <p class="readiness-disclaimer">
    General guidance only—not cryptographic, legal, or compliance advice. For a tailored assessment,
    <a href="/contact/">contact our team</a>.
  </p>
</section>

<section class="readiness-assessment reveal-target" aria-labelledby="assessment-heading">
  <div class="readiness-assessment__header">
    <span class="section-eyebrow">Self‑assessment</span>
    <h2 id="assessment-heading">Where is your organization today?</h2>
    <p>Answer seven questions to receive a readiness snapshot and recommended next steps.</p>
  </div>

  <div class="readiness-wizard" id="readiness-wizard">
    <div class="readiness-progress" aria-hidden="true">
      <div class="readiness-progress__bar" id="readiness-progress-bar"></div>
    </div>
    <p class="readiness-progress__label" id="readiness-progress-label">Question 1 of 7</p>

    <form class="readiness-form" id="readiness-form" novalidate>
      <fieldset class="readiness-step is-active" data-step="0" data-score="false">
        <legend>Which best describes your organization?</legend>
        <div class="readiness-options">
          <label class="readiness-option"><input type="radio" name="q-sector" value="government" required> Government / public sector</label>
          <label class="readiness-option"><input type="radio" name="q-sector" value="finance"> Financial services / fintech</label>
          <label class="readiness-option"><input type="radio" name="q-sector" value="infra"> Critical infrastructure / utilities</label>
          <label class="readiness-option"><input type="radio" name="q-sector" value="tech"> Technology / cloud / SaaS</label>
          <label class="readiness-option"><input type="radio" name="q-sector" value="other"> Other regulated or high‑value sector</label>
        </div>
      </fieldset>

      <fieldset class="readiness-step" data-step="1" data-score="true">
        <legend>Do you maintain an inventory of cryptographic algorithms in production?</legend>
        <div class="readiness-options">
          <label class="readiness-option"><input type="radio" name="q-inventory" value="0" required> No / unknown</label>
          <label class="readiness-option"><input type="radio" name="q-inventory" value="1"> Partial, informal list</label>
          <label class="readiness-option"><input type="radio" name="q-inventory" value="2"> Documented inventory by system</label>
          <label class="readiness-option"><input type="radio" name="q-inventory" value="3"> Formal CBOM with owners &amp; refresh cycle</label>
        </div>
      </fieldset>

      <fieldset class="readiness-step" data-step="2" data-score="true">
        <legend>How long must your most sensitive data remain confidential?</legend>
        <div class="readiness-options">
          <label class="readiness-option"><input type="radio" name="q-lifetime" value="0" required> Less than 5 years</label>
          <label class="readiness-option"><input type="radio" name="q-lifetime" value="1"> 5–10 years</label>
          <label class="readiness-option"><input type="radio" name="q-lifetime" value="2"> 10–20 years</label>
          <label class="readiness-option"><input type="radio" name="q-lifetime" value="3"> 20+ years (long‑term records)</label>
        </div>
      </fieldset>

      <fieldset class="readiness-step" data-step="3" data-score="true">
        <legend>Have you assessed harvest‑now‑decrypt‑later (HNDL) exposure?</legend>
        <div class="readiness-options">
          <label class="readiness-option"><input type="radio" name="q-hndl" value="0" required> Not yet considered</label>
          <label class="readiness-option"><input type="radio" name="q-hndl" value="1"> Aware, not formally assessed</label>
          <label class="readiness-option"><input type="radio" name="q-hndl" value="2"> High‑level risk review completed</label>
          <label class="readiness-option"><input type="radio" name="q-hndl" value="3"> Formal HNDL program with priorities</label>
        </div>
      </fieldset>

      <fieldset class="readiness-step" data-step="4" data-score="true">
        <legend>Are RSA, ECC, and other quantum‑vulnerable algorithms mapped across systems?</legend>
        <div class="readiness-options">
          <label class="readiness-option"><input type="radio" name="q-mapping" value="0" required> Not mapped</label>
          <label class="readiness-option"><input type="radio" name="q-mapping" value="1"> Some critical systems only</label>
          <label class="readiness-option"><input type="radio" name="q-mapping" value="2"> Most production workloads</label>
          <label class="readiness-option"><input type="radio" name="q-mapping" value="3"> Enterprise‑wide dependency map</label>
        </div>
      </fieldset>

      <fieldset class="readiness-step" data-step="5" data-score="true">
        <legend>Is there executive or board‑level sponsorship for PQC migration?</legend>
        <div class="readiness-options">
          <label class="readiness-option"><input type="radio" name="q-sponsor" value="0" required> None</label>
          <label class="readiness-option"><input type="radio" name="q-sponsor" value="1"> Informal interest</label>
          <label class="readiness-option"><input type="radio" name="q-sponsor" value="2"> Assigned owner, limited budget</label>
          <label class="readiness-option"><input type="radio" name="q-sponsor" value="3"> Funded program with executive sponsor</label>
        </div>
      </fieldset>

      <fieldset class="readiness-step" data-step="6" data-score="true">
        <legend>Where are you in the PQC migration lifecycle?</legend>
        <div class="readiness-options">
          <label class="readiness-option"><input type="radio" name="q-stage" value="0" required> No planning started</label>
          <label class="readiness-option"><input type="radio" name="q-stage" value="1"> Awareness &amp; education</label>
          <label class="readiness-option"><input type="radio" name="q-stage" value="2"> Roadmap or pilot in development</label>
          <label class="readiness-option"><input type="radio" name="q-stage" value="3"> Active pilot or production migration</label>
        </div>
      </fieldset>

      <div class="readiness-nav">
        <button type="button" class="readiness-btn readiness-btn--ghost" id="readiness-prev" disabled>Back</button>
        <button type="button" class="readiness-btn readiness-btn--primary" id="readiness-next">Next</button>
      </div>
    </form>

    <div class="readiness-result" id="readiness-result" hidden>
      <div class="readiness-result__score">
        <span class="readiness-result__percent" id="result-percent">0%</span>
        <span class="readiness-result__tier" id="result-tier">Early stage</span>
      </div>
      <p class="readiness-result__summary" id="result-summary"></p>
      <ul class="readiness-result__actions" id="result-actions"></ul>
      <div class="readiness-result__cta">
        <a href="/contact/" class="hero-button" id="result-contact-link">Schedule a consultation</a>
        <button type="button" class="readiness-btn readiness-btn--ghost" id="readiness-restart">Start over</button>
      </div>
    </div>
  </div>
</section>

<section class="readiness-faq reveal-target" aria-labelledby="faq-heading">
  <div class="readiness-faq__header">
    <span class="section-eyebrow">FAQ</span>
    <h2 id="faq-heading">Common PQC questions</h2>
    <p>Grounded answers on standards, timelines, and migration—without the hype.</p>
  </div>

  <div class="readiness-faq__list">
    <details class="readiness-faq__item">
      <summary>What is post‑quantum cryptography (PQC)?</summary>
      <p>
        PQC refers to cryptographic algorithms designed to resist attacks from large‑scale quantum
        computers. NIST has standardized ML‑KEM (key encapsulation), ML‑DSA and SLH‑DSA (digital
        signatures) for deployment alongside or in place of classical RSA and elliptic‑curve schemes.
      </p>
    </details>

    <details class="readiness-faq__item">
      <summary>When do we need to migrate?</summary>
      <p>
        There is no single deadline for every organization—but data with long confidentiality
        requirements is already exposed to harvest‑now‑decrypt‑later risk. Governments and regulators
        are publishing roadmaps with multi‑year horizons; starting discovery and planning now reduces
        cost and disruption compared to waiting for a mandate.
      </p>
    </details>

    <details class="readiness-faq__item">
      <summary>What is harvest‑now‑decrypt‑later (HNDL)?</summary>
      <p>
        Adversaries can record encrypted traffic today and decrypt it later once quantum computers
        break current public‑key cryptography. Any secret that must stay confidential for 10–20+
        years should be protected with quantum‑resilient algorithms—or re‑encrypted—before those
        systems are considered at risk.
      </p>
    </details>

    <details class="readiness-faq__item">
      <summary>Which algorithms should we use?</summary>
      <p>
        NIST FIPS 203 (ML‑KEM), FIPS 204 (ML‑DSA), and FIPS 205 (SLH‑DSA) are the primary
        standards for new deployments. Selection depends on protocol, performance, certificate
        infrastructure, and interoperability constraints—often starting with hybrid classical‑plus‑PQC
        modes during transition.
      </p>
    </details>

    <details class="readiness-faq__item">
      <summary>What is a cryptographic bill of materials (CBOM)?</summary>
      <p>
        A CBOM is an inventory of algorithms, libraries, protocols, keys, and dependencies in your
        systems—similar to a software BOM but focused on cryptography. It is the foundation for
        prioritizing migration, measuring progress, and reporting to auditors or regulators.
      </p>
    </details>

    <details class="readiness-faq__item">
      <summary>Do we need hybrid cryptography during transition?</summary>
      <p>
        Hybrid schemes combine classical and post‑quantum algorithms so you maintain compatibility
        while PQC support matures across your stack. Many organizations use hybrids in TLS, code
        signing, or internal PKI during phased rollout, then simplify as ecosystems catch up.
      </p>
    </details>

    <details class="readiness-faq__item">
      <summary>How long does migration typically take?</summary>
      <p>
        Full enterprise migration is usually a multi‑year program: discovery (weeks to months),
        roadmap and architecture (months), pilots (quarters), and phased production rollout
        (1–3+ years depending on scale and legacy depth). Early inventory and crypto‑agility
        investments shorten later phases.
      </p>
    </details>

    <details class="readiness-faq__item">
      <summary>How can Quantum Transition Labs help?</summary>
      <p>
        We provide PQC readiness assessments, NIST‑aligned migration roadmaps, quantum‑safe
        architecture design, and executive advisory for critical infrastructure, government, and
        enterprise programs. Engagements typically begin with a discovery call and scoped assessment.
        <a href="/services/">View our services</a> or <a href="/contact/">get in touch</a>.
      </p>
    </details>
  </div>
</section>

<section class="readiness-cta reveal-target" aria-labelledby="readiness-cta-heading">
  <h2 id="readiness-cta-heading">Ready for a deeper assessment?</h2>
  <p>
    Our PQC Readiness Assessment delivers a cryptographic inventory, quantum risk scoring, and
    executive priority matrix—tailored to your environment.
  </p>
  <a href="/contact/" class="hero-button">Talk to an expert</a>
</section>

</div>
