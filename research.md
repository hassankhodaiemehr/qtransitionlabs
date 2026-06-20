---
layout: default
title: Research
description: Peer-reviewed publications in post-quantum cryptography, blockchain security, and quantum-resilient systems.
script: /assets/js/research.js
permalink: /research/
---

<div class="research-layout">

<div class="sidebar">
  <div class="sidebar-title reveal-target">Research Areas</div>

  <div class="research-grid">

    <div class="research-card reveal-target">
      <div class="research-icon" aria-hidden="true">🔐</div>
      <h3>Lattice‑Based Cryptography</h3>
      <p>Design and analysis of module‑LWE/LWR schemes, signatures, and efficient implementations.</p>
    </div>

    <div class="research-card reveal-target">
      <div class="research-icon" aria-hidden="true">🛡️</div>
      <h3>PQC Implementation Security</h3>
      <p>Side‑channel resistance, fault‑injection hardening, and secure deployment of NIST PQC.</p>
    </div>

    <div class="research-card reveal-target">
      <div class="research-icon" aria-hidden="true">⚛️</div>
      <h3>Hybrid Classical–Quantum Protocols</h3>
      <p>Forward‑secure communication using combined classical and quantum primitives.</p>
    </div>

    <div class="research-card reveal-target">
      <div class="research-icon" aria-hidden="true">⛓️</div>
      <h3>Quantum‑Safe Blockchain Consensus</h3>
      <p>PQC‑ready consensus, signature migration, and secure wallet architectures.</p>
    </div>

    <div class="research-card reveal-target">
      <div class="research-icon" aria-hidden="true">🤖</div>
      <h3>AI‑Assisted Cryptographic Analysis</h3>
      <p>ML‑driven detection of protocol weaknesses and cryptographic misconfigurations.</p>
    </div>

    <div class="research-card reveal-target">
      <div class="research-icon" aria-hidden="true">🔗</div>
      <h3>Secure Multiparty Computation</h3>
      <p>Efficient MPC, threshold crypto, and privacy‑preserving computation frameworks.</p>
    </div>

    <div class="research-card reveal-target">
      <div class="research-icon" aria-hidden="true">🧩</div>
      <h3>Zero‑Knowledge Proof Systems</h3>
      <p>Design and optimization of SNARKs, STARKs, and PQ‑secure proof systems.</p>
    </div>

  </div>
</div>

<div class="right-column">

  <div class="research-header-banner">
    {% include page-banner-bg.html %}
    <div class="research-header reveal-target">
    <h1>Publications</h1>
    <p>Peer‑reviewed research in post‑quantum cryptography, blockchain security, and quantum‑resilient systems.</p>
    </div>
  </div>

  <div class="metrics-panel">
    <div class="metric-box reveal-target">
      <div class="metric-value">4</div>
      <div class="metric-label">Publications</div>
    </div>
    <div class="metric-box reveal-target">
      <div class="metric-value">2</div>
      <div class="metric-label">Surveys</div>
    </div>
    <div class="metric-box reveal-target">
      <div class="metric-value">2</div>
      <div class="metric-label">PQC / Signatures</div>
    </div>
    <div class="metric-box reveal-target">
      <div class="metric-value">2</div>
      <div class="metric-label">Blockchain</div>
    </div>
  </div>

  <div class="filter-bar reveal-target" role="group" aria-label="Filter publications">
    <button type="button" class="filter-btn active" data-filter="all">All</button>
    <button type="button" class="filter-btn" data-filter="pqc">PQC</button>
    <button type="button" class="filter-btn" data-filter="signatures">Signatures</button>
    <button type="button" class="filter-btn" data-filter="blockchain">Blockchain</button>
    <button type="button" class="filter-btn" data-filter="surveys">Surveys</button>
  </div>

  <div class="timeline">

    <div class="pub-item reveal-target" data-tags="pqc signatures">
      <div class="pub-title">SILMARILS: Information-Theoretic and Quantum-Secure Designated-Verifier Signatures</div>
      <div class="pub-authors"><strong>Hassan Khodaiemehr, Khadijeh Bagheri, Chen Feng</strong>, Dariia Porechna</div>
      <div class="pub-venue">arXiv preprint, 2026. <a href="https://arxiv.org/abs/2605.03230" target="_blank" rel="noopener noreferrer">arXiv:2605.03230</a></div>
      <div class="pub-tags">
        <span class="pub-tag">PQC</span>
        <span class="pub-tag">Signatures</span>
      </div>

      <button type="button" class="bibtex-toggle" aria-expanded="false">Show BibTeX ▼</button>
      <div class="bibtex-box">
@misc{khodaiemehr2026silmarilsinformationtheoreticquantumsecuredesignatedverifier,
  title={SILMARILS: Information-Theoretic and Quantum-Secure Designated-Verifier Signatures},
  author={Hassan Khodaiemehr and Khadijeh Bagheri and Chen Feng and Dariia Porechna},
  year={2026},
  eprint={2605.03230},
  archivePrefix={arXiv},
  primaryClass={cs.CR},
  url={https://arxiv.org/abs/2605.03230},
}
      </div>
    </div>

    <div class="pub-item reveal-target" data-tags="blockchain pqc">
      <div class="pub-title">NIROPoK-Based Post-Quantum Sidechain Design on Ethereum</div>
      <div class="pub-authors"><strong>Hassan Khodaiemehr, Khadijeh Bagheri</strong>, Saeid Yazdinejad, <strong>Chen Feng</strong></div>
      <div class="pub-venue">Cryptology ePrint Archive, 2026. <a href="https://eprint.iacr.org/2026/401" target="_blank" rel="noopener noreferrer">ePrint</a></div>
      <div class="pub-tags">
        <span class="pub-tag">Blockchain</span>
        <span class="pub-tag">PQC</span>
      </div>

      <button type="button" class="bibtex-toggle" aria-expanded="false">Show BibTeX ▼</button>
      <div class="bibtex-box">
@misc{cryptoeprint:2026/401,
  author = {Hassan Khodaiemehr and Khadijeh Bagheri and Saeid Yazdinejad and Chen Feng},
  title = {% raw %}{{NIROPoK}{% endraw %}-Based Post-Quantum Sidechain Design on Ethereum},
  howpublished = {Cryptology {ePrint} Archive, Paper 2026/401},
  year = {2026},
  url = {https://eprint.iacr.org/2026/401}
}
      </div>
    </div>

    <div class="pub-item reveal-target" data-tags="surveys blockchain">
      <div class="pub-title">Blockchain Security Risk Assessment in Quantum Era, Migration Strategies, and Proactive Defense</div>
      <div class="pub-authors">Yaser Baseri, Abdelhakim Hafid, Yahya Shahsavari, Dimitrios Makrakis, <strong>Hassan Khodaiemehr</strong></div>
      <div class="pub-venue">IEEE Communications Surveys &amp; Tutorials, 2026. <a href="https://doi.org/10.1109/COMST.2025.3621113" target="_blank" rel="noopener noreferrer">DOI</a></div>
      <div class="pub-tags">
        <span class="pub-tag">Surveys</span>
        <span class="pub-tag">Blockchain</span>
      </div>

      <button type="button" class="bibtex-toggle" aria-expanded="false">Show BibTeX ▼</button>
      <div class="bibtex-box">
@ARTICLE{11202410,
  author={Baseri, Yaser and Hafid, Abdelhakim and Shahsavari, Yahya and Makrakis, Dimitrios and Khodaiemehr, Hassan},
  journal={IEEE Communications Surveys & Tutorials},
  title={Blockchain Security Risk Assessment in Quantum Era, Migration Strategies, and Proactive Defense},
  year={2026},
  volume={28},
  pages={2925-2964},
  doi={10.1109/COMST.2025.3621113}
}
      </div>
    </div>

    <div class="pub-item reveal-target" data-tags="surveys blockchain">
      <div class="pub-title">Navigating the Quantum Computing Threat Landscape for Blockchains: A Comprehensive Survey</div>
      <div class="pub-authors"><strong>Hassan Khodaiemehr, Khadijeh Bagheri, Chen Feng</strong></div>
      <div class="pub-venue">Computer Science Review, 2026. <a href="https://www.sciencedirect.com/science/article/pii/S1574013725001224" target="_blank" rel="noopener noreferrer">ScienceDirect</a></div>
      <div class="pub-tags">
        <span class="pub-tag">Surveys</span>
        <span class="pub-tag">Blockchain</span>
      </div>

      <button type="button" class="bibtex-toggle" aria-expanded="false">Show BibTeX ▼</button>
      <div class="bibtex-box">
@article{KHODAIEMEHR2026100846,
  title = {Navigating the quantum computing threat landscape for blockchains: A comprehensive survey},
  journal = {Computer Science Review},
  volume = {59},
  pages = {100846},
  year = {2026},
  author = {Hassan Khodaiemehr and Khadijeh Bagheri and Chen Feng},
  doi = {10.1016/j.cosrev.2025.100846}
}
      </div>
    </div>

  </div>

  <div class="research-cta reveal-target">
    <a href="/contact/" class="hero-button">Discuss a Research Collaboration</a>
  </div>

</div>

</div>
