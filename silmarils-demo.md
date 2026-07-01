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
      against Dilithium, Falcon, and SPHINCS+.
    </p>
    <div class="demo-links">
      <a href="https://arxiv.org/abs/2605.03230" class="hero-button" target="_blank" rel="noopener noreferrer">Read the paper</a>
      <a href="{{ '/research/' | relative_url }}" class="button button-ghost">All publications</a>
      <a href="{{ '/assets/demo/index.html?v=20260702' | relative_url }}" class="button button-ghost" target="_blank" rel="noopener">Open full screen</a>
    </div>
  </header>

  <div class="demo-frame-wrap">
    <iframe
      id="silmarils-demo-frame"
      src="{{ '/assets/demo/index.html?v=20260702' | relative_url }}"
      title="SILMARILS interactive demo"
      loading="lazy"
    ></iframe>
  </div>

  <p class="demo-note">
    Runs entirely in your browser — no external server required.
    <a href="{{ '/assets/demo/index.html?v=20260702' | relative_url }}" target="_blank" rel="noopener">Open demo directly</a> if the embed does not load.
  </p>
</section>

<script>
  (function () {
    var frame = document.getElementById("silmarils-demo-frame");
    if (!frame) return;
    frame.addEventListener("load", function () {
      frame.style.opacity = "1";
    });
  })();
</script>
