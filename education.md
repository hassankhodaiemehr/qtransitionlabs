---
layout: default
title: PQC Education
description: Interactive introduction to the quantum computing threat, NIST post-quantum standards (ML-KEM, ML-DSA, SLH-DSA), and the global PQC migration roadmap.
stylesheet: /assets/css/education.css
script: /assets/js/education.js
permalink: /education/
---

{% assign edu = site.data.education %}

<div class="page-section education-page">
  <div class="page-banner-group education-banner">
    {% include page-banner-bg.html %}
    <div class="page-header reveal-target">
      <p class="education-eyebrow">Interactive learning</p>
      <h1>Quantum Threat &amp; PQC Roadmap</h1>
      <p class="page-subtitle">
        Explore how quantum computers threaten today's cryptography, what NIST standardized in 2024,
        and how governments are scheduling the migration — updated {{ edu.meta.updated }}.
      </p>
    </div>
  </div>

  <nav class="edu-modules reveal-target" id="edu-modules" aria-label="Education modules">
    {% for mod in edu.modules %}
    <button
      type="button"
      class="edu-module-tab{% if forloop.first %} is-active{% endif %}"
      data-module="{{ mod.id }}"
      aria-selected="{% if forloop.first %}true{% else %}false{% endif %}"
      aria-controls="edu-panel-{{ mod.id }}"
    >
      <span class="edu-module-tab__eyebrow">{{ mod.eyebrow }}</span>
      <span class="edu-module-tab__label">{{ mod.label }}</span>
    </button>
    {% endfor %}
  </nav>

  <!-- Module 1: Threat -->
  <section
    class="edu-panel is-active reveal-target"
    id="edu-panel-threat"
    data-module="threat"
    aria-labelledby="edu-threat-heading"
  >
    {% assign threat = edu.modules | where: "id", "threat" | first %}
    <header class="edu-panel__header">
      <span class="section-eyebrow">{{ threat.eyebrow }}</span>
      <h2 id="edu-threat-heading">{{ threat.title }}</h2>
      <p class="edu-panel__lead">{{ threat.lead }}</p>
    </header>

    <div class="edu-hndl" id="edu-hndl">
      <div class="edu-hndl__viz" aria-hidden="true">
        <div class="edu-hndl__stage">
          <span class="edu-hndl__node edu-hndl__node--attacker">Adversary</span>
          <span class="edu-hndl__stream" id="edu-hndl-stream"></span>
          <span class="edu-hndl__node edu-hndl__node--vault">Encrypted store</span>
          <span class="edu-hndl__stream edu-hndl__stream--future" id="edu-hndl-future"></span>
          <span class="edu-hndl__node edu-hndl__node--quantum">Quantum decrypt</span>
        </div>
      </div>
      <div class="edu-hndl__controls" role="tablist" aria-label="Harvest-now-decrypt-later steps">
        {% for step in edu.threat_steps %}
        <button
          type="button"
          class="edu-hndl__step{% if forloop.first %} is-active{% endif %}"
          data-hndl-step="{{ step.id }}"
          role="tab"
          aria-selected="{% if forloop.first %}true{% else %}false{% endif %}"
        >
          <span class="edu-hndl__step-num">{{ forloop.index }}</span>
          <span class="edu-hndl__step-title">{{ step.title }}</span>
        </button>
        {% endfor %}
      </div>
      <div class="edu-hndl__detail" id="edu-hndl-detail" aria-live="polite">
        {% assign first_step = edu.threat_steps | first %}
        <div class="edu-hndl__stat">
          <strong id="edu-hndl-stat">{{ first_step.stat }}</strong>
          <span id="edu-hndl-stat-label">{{ first_step.stat_label }}</span>
        </div>
        <p id="edu-hndl-text">{{ first_step.detail }}</p>
      </div>
    </div>

    <h3 class="edu-subheading">Cryptographic impact spectrum</h3>
    <div class="edu-impact-grid">
      {% for item in edu.crypto_impact %}
      <article class="edu-impact-card edu-impact-card--{{ item.level }} reveal-target">
        <span class="edu-impact-card__level">{{ item.level_label }}</span>
        <h4>{{ item.name }}</h4>
        <p>{{ item.detail }}</p>
      </article>
      {% endfor %}
    </div>
  </section>

  <!-- Module 2: Standards -->
  <section
    class="edu-panel reveal-target"
    id="edu-panel-standards"
    data-module="standards"
    aria-labelledby="edu-standards-heading"
    hidden
  >
    {% assign standards = edu.modules | where: "id", "standards" | first %}
    <header class="edu-panel__header">
      <span class="section-eyebrow">{{ standards.eyebrow }}</span>
      <h2 id="edu-standards-heading">{{ standards.title }}</h2>
      <p class="edu-panel__lead">{{ standards.lead }}</p>
    </header>

    <div class="edu-timeline-widget" id="edu-timeline">
      <div class="edu-timeline__controls">
        <label for="edu-timeline-slider" class="edu-timeline__label">
          Scrub the timeline: <strong id="edu-timeline-year">1994</strong>
        </label>
        <input
          type="range"
          id="edu-timeline-slider"
          class="edu-timeline__slider"
          min="0"
          max="{{ edu.timeline.size | minus: 1 }}"
          value="0"
          step="1"
          aria-valuemin="0"
          aria-valuemax="{{ edu.timeline.size | minus: 1 }}"
          aria-valuenow="0"
        />
        <div class="edu-timeline__track" aria-hidden="true">
          {% for event in edu.timeline %}
          <span class="edu-timeline__tick" data-index="{{ forloop.index0 }}"></span>
          {% endfor %}
        </div>
      </div>
      <article class="edu-timeline__card" aria-live="polite">
        <span class="edu-timeline__phase" id="edu-timeline-phase">research</span>
        <h3 id="edu-timeline-title">{{ edu.timeline.first.title }}</h3>
        <p id="edu-timeline-detail">{{ edu.timeline.first.detail }}</p>
      </article>
    </div>

    <h3 class="edu-subheading">NIST primary standards (August 2024)</h3>
    <div class="edu-algo-grid" id="edu-algo-grid">
      {% for algo in edu.algorithms %}
      <article class="edu-algo-card reveal-target" data-algo="{{ algo.id }}">
        <button type="button" class="edu-algo-card__toggle" aria-expanded="false">
          <span class="edu-algo-card__fips">{{ algo.fips }}</span>
          <strong class="edu-algo-card__name">{{ algo.name }}</strong>
          <span class="edu-algo-card__role">{{ algo.role }}</span>
          <span class="edu-algo-card__chevron" aria-hidden="true"></span>
        </button>
        <div class="edu-algo-card__body" hidden>
          <dl class="edu-algo-card__meta">
            <div><dt>Typical use</dt><dd>{{ algo.use }}</dd></div>
            <div><dt>Basis</dt><dd>{{ algo.basis }}</dd></div>
            <div><dt>Strengths</dt><dd>{{ algo.pros }}</dd></div>
            <div><dt>Trade-offs</dt><dd>{{ algo.cons }}</dd></div>
          </dl>
        </div>
      </article>
      {% endfor %}
    </div>
    <p class="edu-note">Falcon (FN-DSA) and HQC remain on NIST's ongoing standardization path as additional options.</p>
  </section>

  <!-- Module 3: Roadmap -->
  <section
    class="edu-panel reveal-target"
    id="edu-panel-roadmap"
    data-module="roadmap"
    aria-labelledby="edu-roadmap-heading"
    hidden
  >
    {% assign roadmap = edu.modules | where: "id", "roadmap" | first %}
    <header class="edu-panel__header">
      <span class="section-eyebrow">{{ roadmap.eyebrow }}</span>
      <h2 id="edu-roadmap-heading">{{ roadmap.title }}</h2>
      <p class="edu-panel__lead">{{ roadmap.lead }}</p>
    </header>

    <div class="edu-phases" id="edu-phases">
      {% for phase in edu.migration_phases %}
      <button
        type="button"
        class="edu-phase{% if forloop.first %} is-active{% endif %}"
        data-phase="{{ phase.id }}"
        aria-expanded="{% if forloop.first %}true{% else %}false{% endif %}"
      >
        <span class="edu-phase__num">Phase {{ phase.id }}</span>
        <span class="edu-phase__title">{{ phase.title }}</span>
        <span class="edu-phase__period">{{ phase.period }}</span>
      </button>
      {% endfor %}
      <div class="edu-phase-detail" id="edu-phase-detail" aria-live="polite">
        {% assign first_phase = edu.migration_phases | first %}
        <h3 id="edu-phase-detail-title">{{ first_phase.title }}</h3>
        <p id="edu-phase-detail-text">{{ first_phase.detail }}</p>
      </div>
    </div>

    <h3 class="edu-subheading">Global policy signals</h3>
    <div class="edu-global-grid">
      {% for signal in edu.global_signals %}
      <article class="edu-global-card reveal-target">
        <span class="edu-global-card__region">{{ signal.region }}</span>
        <strong>{{ signal.policy }}</strong>
        <p>{{ signal.detail }}</p>
      </article>
      {% endfor %}
    </div>
  </section>

  <section class="edu-sources reveal-target" aria-labelledby="edu-sources-heading">
    <h2 id="edu-sources-heading" class="edu-sources__title">Sources &amp; further reading</h2>
    <ul class="edu-sources__list">
      {% for src in edu.meta.sources %}
      <li><a href="{{ src.url }}" target="_blank" rel="noopener noreferrer">{{ src.name }} ↗</a></li>
      {% endfor %}
    </ul>
    <p class="edu-sources__note">
      This page is educational — not legal or compliance advice. Timelines evolve; validate against current NIST and agency guidance.
    </p>
  </section>

  <section class="edu-cta reveal-target" aria-label="Next steps">
    <h2>Ready to assess your organization?</h2>
    <p>Use our interactive PQC Readiness tool or talk to our team about a migration program.</p>
    <div class="edu-cta__actions">
      <a href="{{ '/pqc-readiness/' | relative_url }}" class="hero-button">Check PQC readiness</a>
      <a href="{{ '/contact/' | relative_url }}" class="hero-secondary">Schedule a consultation</a>
    </div>
  </section>
</div>

<script type="application/json" id="edu-data">
{{ site.data.education | jsonify }}
</script>
