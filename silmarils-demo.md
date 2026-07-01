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
    </div>
  </header>

  <div class="demo-frame-wrap">
    <iframe
      id="silmarils-demo-frame"
      src="{{ site.demo_url }}"
      title="SILMARILS interactive demo"
      loading="lazy"
      allow="clipboard-read; clipboard-write"
    ></iframe>
    <noscript>
      <p>Enable JavaScript to load the interactive demo, or visit <a href="{{ site.demo_url }}">{{ site.demo_url }}</a> directly.</p>
    </noscript>
  </div>

  <p class="demo-note">
    The demo runs on QTL research infrastructure. If the embed does not load, open
    <a href="{{ site.demo_url }}" target="_blank" rel="noopener noreferrer">{{ site.demo_url }}</a>.
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
