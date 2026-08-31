---
layout: default
title: QTL Wallet
description: SIM-centric key-splitting wallet architecture for high-assurance, post-quantum-ready signing—not software-only custody.
stylesheet: /assets/css/wallet.css
permalink: /qtl-wallet/
---

<div class="page-section wallet-page">

<div class="page-banner-group">
  {% include page-banner-bg.html %}
  <div class="page-header reveal-target">
    <p class="wallet-eyebrow">Dedicated solution</p>
    <h1>QTL Wallet</h1>
    <p class="page-subtitle">
      SIM‑centric key splitting for high‑assurance signing—cryptographic material anchored in the UICC/eSIM,
      not a conventional software‑only wallet on the host operating system.
    </p>
  </div>
</div>

<section class="wallet-intro reveal-target" aria-labelledby="wallet-intro-heading">
  <h2 id="wallet-intro-heading" class="visually-hidden">Overview</h2>
  <p>
    Most mobile and edge wallets store keys in application memory or host secure enclaves that still
    share a general‑purpose attack surface. <strong>QTL Wallet</strong> takes a different approach:
    secrets are <strong>split across shares</strong>, with the <strong>SIM (UICC/eSIM) as the trust anchor</strong>
    for high‑value signing and identity operations.
  </p>
  <p>
    The architecture targets <strong>post‑quantum‑ready signing paths</strong>, permissioned network
    participation, and custody workflows where compromise of the host app must not imply compromise of
    long‑lived signing authority—across sectors that already depend on strong identity and long‑lived trust.
  </p>
  <p class="wallet-status">
    <strong>Status:</strong> Pilot integration—available for scoped
    deployment and co‑engineering engagements. <a href="/contact/">Contact us</a> to discuss a pilot.
  </p>
  <p class="wallet-patent">
    The QTL Wallet SIM‑centric key‑splitting approach is <strong>patented with the University of British Columbia (UBC)</strong>.
    Licensing and integration terms are available for qualified operators and integrators.
  </p>
</section>

<section class="wallet-compare reveal-target" aria-labelledby="wallet-compare-heading">
  <span class="section-eyebrow">Why SIM‑centric</span>
  <h2 id="wallet-compare-heading">Not a software‑only wallet</h2>
  <div class="wallet-compare__grid">
    <article class="wallet-compare__card wallet-compare__card--muted">
      <h3>Typical software wallet</h3>
      <ul>
        <li>Keys generated and used inside the host app/OS stack</li>
        <li>Single point of failure if malware or OS compromise occurs</li>
        <li>PQC retrofit often bolted onto existing app trust boundaries</li>
      </ul>
    </article>
    <article class="wallet-compare__card wallet-compare__card--accent">
      <h3>QTL Wallet</h3>
      <ul>
        <li>Key material split; SIM (UICC/eSIM) holds the trust anchor</li>
        <li>Host application orchestrates—does not alone custody root authority</li>
        <li>Designed for PQC‑ready signing and high‑assurance identity workflows</li>
      </ul>
    </article>
  </div>
</section>

<section class="wallet-flow reveal-target" aria-labelledby="wallet-flow-heading">
  <span class="section-eyebrow">Architecture</span>
  <h2 id="wallet-flow-heading">How key splitting works</h2>
  <ol class="wallet-flow__steps">
    <li class="wallet-flow__step">
      <span class="wallet-flow__num" aria-hidden="true">1</span>
      <div>
        <h3>Split at enrollment</h3>
        <p>Cryptographic secrets are divided into shares during provisioning—no single software process holds the full signing authority.</p>
      </div>
    </li>
    <li class="wallet-flow__step">
      <span class="wallet-flow__num" aria-hidden="true">2</span>
      <div>
        <h3>SIM as trust anchor</h3>
        <p>The UICC/eSIM participates in reconstruction and policy enforcement—rooted in carrier‑grade secure element semantics, not app sandboxing alone.</p>
      </div>
    </li>
    <li class="wallet-flow__step">
      <span class="wallet-flow__num" aria-hidden="true">3</span>
      <div>
        <h3>Sign under policy</h3>
        <p>Transactions and attestations are approved only when host and SIM shares combine under defined rules—supporting audit, rotation, and PQC algorithm agility.</p>
      </div>
    </li>
  </ol>
</section>

<section class="wallet-usecases reveal-target" aria-labelledby="wallet-usecases-heading">
  <span class="section-eyebrow">Use cases</span>
  <h2 id="wallet-usecases-heading">Where QTL Wallet fits</h2>
  <p class="wallet-usecases__lead">
    QTL Wallet is designed for regulated, high‑assurance identity and signing—where keys must survive
    host compromise and migrate toward post‑quantum algorithms without rebuilding trust from scratch.
  </p>
  <div class="wallet-usecases__grid">
    <article class="wallet-usecase">
      <h3>Government ID &amp; digital identity</h3>
      <p>National and provincial ID programs, e‑ID credentials, and mobile document providers that need SIM‑anchored signing—not keys stored only in consumer apps.</p>
    </article>
    <article class="wallet-usecase">
      <h3>Banks &amp; financial institutions</h3>
      <p>Strong customer authentication, transaction signing, and institutional custody workflows where SIM‑backed keys support audit, policy, and PQC migration paths.</p>
    </article>
    <article class="wallet-usecase">
      <h3>Healthcare &amp; life sciences</h3>
      <p>Clinician credentials, patient‑consent attestations, and long‑lived health records where identity and signing must remain trustworthy for decades.</p>
    </article>
    <article class="wallet-usecase">
      <h3>Permissioned ledgers &amp; digital assets</h3>
      <p>Validator and operator keys, institutional custody, and designated‑verification networks—not public mempool semantics.</p>
    </article>
    <article class="wallet-usecase">
      <h3>Critical infrastructure &amp; supply chain</h3>
      <p>Operator identity, provenance attestations, and supplier credentials on edge devices in utilities, telecom, and industrial networks.</p>
    </article>
    <article class="wallet-usecase">
      <h3>Private mobile &amp; edge</h3>
      <p>Private 5G, enterprise mobility, and controlled field deployments where UICC/eSIM is already part of the trust model.</p>
    </article>
  </div>
</section>

<section class="wallet-ecosystem reveal-target" aria-labelledby="wallet-ecosystem-heading">
  <span class="section-eyebrow">QTL platform</span>
  <h2 id="wallet-ecosystem-heading">Works with the rest of QTL</h2>
  <div class="wallet-ecosystem__grid">
    <a href="/demo/" class="wallet-ecosystem__link">
      <strong>SILMARILS TDV</strong>
      <span>160‑byte designated‑verifier authentication for permissioned ledger nodes—complements wallet‑level signing policy.</span>
    </a>
    <a href="/pqc-readiness/" class="wallet-ecosystem__link">
      <strong>PQC Readiness</strong>
      <span>Inventory and prioritize cryptographic dependencies before wallet and ledger upgrades.</span>
    </a>
    <a href="/services/" class="wallet-ecosystem__link">
      <strong>Migration programs</strong>
      <span>End‑to‑end discovery, hybrid TLS/PKI design, pilot, and production rollout.</span>
    </a>
  </div>
</section>

<section class="wallet-pilot reveal-target" aria-labelledby="wallet-pilot-heading">
  <h2 id="wallet-pilot-heading">Pilot &amp; integration</h2>
  <p>
    QTL Wallet is offered as an <strong>architecture and integration engagement</strong>—not a consumer
    app download. We work with government ID providers, banks and financial institutions, healthcare
    organizations, operators, and integrators to scope SIM provisioning flows, signing policy, PQC
    algorithm selection, and API or ledger integration.
  </p>
  <ul class="wallet-pilot__list">
    <li>Architecture review and threat modeling for your trust boundaries</li>
    <li>SIM‑centric provisioning and key‑lifecycle design</li>
    <li>Integration with permissioned nodes, APIs, or custody workflows</li>
    <li>Alignment with NIST PQC standards and hybrid transition plans</li>
  </ul>
</section>

<div class="wallet-cta reveal-target">
  <p>Discuss a QTL Wallet pilot or integration scope.</p>
  <a href="/contact/" class="hero-button">Schedule a consultation</a>
  <a href="/demo/" class="hero-secondary">Explore SILMARILS demo</a>
</div>

</div>
