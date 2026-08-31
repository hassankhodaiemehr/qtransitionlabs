---
layout: default
title: SILMARILS Demo
description: Interactive demo comparing SILMARILS TDV authentication with NIST post-quantum signatures for permissioned blockchains.
stylesheet: /assets/css/demo.css
full_width: true
permalink: /demo/
---

<section class="demo-page">
  <header class="demo-header">
    <p class="demo-eyebrow">Interactive Research Demo</p>
    <h1>SILMARILS Blockchain Demo</h1>
    <p class="demo-intro">
      Explore live sign/verify, bandwidth comparisons, and TPS impact models for
      <strong>SILMARILS</strong> — our 160-byte designated-verifier authentication primitive —
      against NIST post‑quantum signature schemes (ML‑DSA, Falcon, SPHINCS+).
    </p>
    <div class="demo-links">
      <a href="https://arxiv.org/abs/2605.03230" class="hero-button" target="_blank" rel="noopener noreferrer">Read the paper</a>
      <a href="{{ '/research/' | relative_url }}" class="button button-ghost">All publications</a>
      <a href="{{ '/assets/demo/index.html?v=20260831' | relative_url }}" class="button button-ghost" target="_blank" rel="noopener">Open full screen</a>
    </div>
  </header>

  <div class="demo-frame-wrap">
    <iframe
      id="silmarils-demo-frame"
      src="{{ '/assets/demo/index.html?v=20260831' | relative_url }}"
      title="SILMARILS interactive demo"
      loading="lazy"
    ></iframe>
  </div>

  <p class="demo-note">
    Runs entirely in your browser — no external server required.
    <a href="{{ '/assets/demo/index.html?v=20260831' | relative_url }}" target="_blank" rel="noopener">Open demo directly</a> if the embed does not load.
  </p>

  <section class="demo-related reveal-target" aria-labelledby="demo-related-heading">
    <span class="demo-related__eyebrow">More from QTL</span>
    <h2 id="demo-related-heading">Related solutions</h2>
    <p class="demo-related__lead">
      This page is the <strong>live SILMARILS demo</strong>. Explore our other dedicated platforms and architectures below.
    </p>
    <div class="demo-related__grid">
      <a href="{{ '/pqc-readiness/' | relative_url }}" class="demo-related__card">
        <span class="demo-related__tag">Platform</span>
        <strong>PQC Readiness</strong>
        <span class="demo-related__desc">Interactive self‑assessment, CBOM methodology, and migration FAQ to plan your PQC program.</span>
        <span class="demo-related__cta">Start assessment →</span>
      </a>
      <a href="{{ '/qtl-wallet/' | relative_url }}" class="demo-related__card">
        <span class="demo-related__tag">Architecture</span>
        <strong>QTL Wallet</strong>
        <span class="demo-related__desc">SIM‑centric key splitting for government ID, banking, healthcare, and regulated signing.</span>
        <span class="demo-related__cta">Learn about QTL Wallet →</span>
      </a>
    </div>
  </section>
</section>

<script>
  (function () {
    var frame = document.getElementById("silmarils-demo-frame");
    if (!frame) return;

    function syncDemoTheme() {
      var theme = localStorage.getItem("theme") === "light" ? "light" : "dark";
      if (frame.contentWindow) {
        frame.contentWindow.postMessage({ type: "qtl-theme", theme: theme }, "*");
      }
    }

    frame.addEventListener("load", function () {
      frame.style.opacity = "1";
      syncDemoTheme();
    });

    window.addEventListener("storage", function (e) {
      if (e.key === "theme") syncDemoTheme();
    });
  })();
</script>
