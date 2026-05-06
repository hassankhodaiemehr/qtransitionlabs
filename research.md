---
layout: default
title: Research
---

{% raw %}

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

.research-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem 2rem;
}

@media (max-width: 900px) {
  .research-layout {
    grid-template-columns: 1fr;
  }
}

/* ============================
   LEFT SIDEBAR — OLD CARDS
============================ */
.sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.sidebar-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #F0F6FC;
}

body.light-mode .sidebar-title {
  color: #1A1F36;
}

.research-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.research-card {
  background: #161B22;
  border: 1px solid #30363D;
  padding: 1.4rem;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  transition: 0.25s ease;
}

.research-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(88,166,255,0.25);
  border-color: #58A6FF;
}

.research-icon {
  font-size: 1.8rem;
  margin-bottom: 0.6rem;
  color: #58A6FF;
}

.research-card h3 {
  color: #F0F6FC;
  margin-bottom: 0.4rem;
  font-size: 1.2rem;
}

.research-card p {
  color: #C9D1D9;
  line-height: 1.55;
  font-size: 0.95rem;
}

body.light-mode .research-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
}

body.light-mode .research-card h3 {
  color: #1A1F36;
}

body.light-mode .research-card p {
  color: #374151;
}

/* ============================
   RIGHT COLUMN — PUBLICATIONS
============================ */
.right-column {
  padding-right: 1rem;
}

/* HEADER */
.research-header {
  text-align: left;
  margin-bottom: 2rem;
}

.research-header h1 {
  font-size: 2.4rem;
  font-weight: 700;
  color: #F0F6FC;
}

.research-header p {
  color: #8B949E;
  font-size: 1.1rem;
  max-width: 700px;
}

body.light-mode .research-header h1 {
  color: #1A1F36;
}

body.light-mode .research-header p {
  color: #4B5563;
}

/* ============================
   METRICS PANEL
============================ */
.metrics-panel {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: #0F172A;
  border-radius: 14px;
  border: 1px solid #1E293B;
  box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  margin-bottom: 2.5rem;
}

.metric-box {
  text-align: center;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #38BDF8;
}

.metric-label {
  font-size: 0.9rem;
  color: #CBD5E1;
}

body.light-mode .metrics-panel {
  background: #FFFFFF;
  border-color: #E2E8F0;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}

body.light-mode .metric-value { color: #0284C7; }
body.light-mode .metric-label { color: #475569; }

/* ============================
   FILTER BAR
============================ */
.filter-bar {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid #334155;
  background: #0F172A;
  color: #E2E8F0;
  cursor: pointer;
  font-size: 0.85rem;
  transition: 0.2s;
}

.filter-btn.active,
.filter-btn:hover {
  background: #38BDF8;
  color: #0F172A;
  border-color: #38BDF8;
}

body.light-mode .filter-btn {
  background: #FFFFFF;
  border-color: #CBD5E1;
  color: #334155;
}

body.light-mode .filter-btn.active {
  background: #0284C7;
  color: white;
}

/* ============================
   TIMELINE
============================ */
.timeline {
  border-left: 2px solid #334155;
  margin-left: 1rem;
  padding-left: 1.5rem;
}

.pub-item {
  margin-bottom: 2rem;
  position: relative;
}

.pub-item::before {
  content: "";
  position: absolute;
  left: -1.1rem;
  top: 0.4rem;
  width: 12px;
  height: 12px;
  background: #38BDF8;
  border-radius: 50%;
  box-shadow: 0 0 10px #38BDF8;
}

.pub-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #F1F5F9;
}

.pub-authors,
.pub-venue {
  color: #CBD5E1;
  margin: 0.2rem 0;
}

.pub-tags {
  margin-top: 0.4rem;
}

.pub-tag {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  border-radius: 999px;
  background: #1E293B;
  color: #E2E8F0;
  margin-right: 0.4rem;
}

body.light-mode .timeline { border-color: #CBD5E1; }
body.light-mode .pub-item::before { background: #0284C7; box-shadow: 0 0 10px #0284C7; }
body.light-mode .pub-title { color: #0F172A; }
body.light-mode .pub-authors,
body.light-mode .pub-venue { color: #475569; }
body.light-mode .pub-tag { background: #E2E8F0; color: #1E293B; }

/* ============================
   COLLAPSIBLE BIBTEX
============================ */
.bibtex-toggle {
  margin-top: 0.5rem;
  cursor: pointer;
  color: #38BDF8;
  font-size: 0.9rem;
}

.bibtex-box {
  display: none;
  background: #0F172A;
  border: 1px solid #1E293B;
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 8px;
  white-space: pre-wrap;
  font-size: 0.85rem;
  color: #E2E8F0;
}

body.light-mode .bibtex-box {
  background: #FFFFFF;
  border-color: #CBD5E1;
  color: #1E293B;
}
</style>

<div class="research-layout">

<!-- ============================
     LEFT SIDEBAR
============================ -->
<div class="sidebar">
  <div class="sidebar-title">Research Areas</div>

  <div class="research-grid">

    <div class="research-card">
      <div class="research-icon">🔐</div>
      <h3>Lattice‑Based Cryptography</h3>
      <p>Design and analysis of module‑LWE/LWR schemes, signatures, and efficient implementations.</p>
    </div>

    <div class="research-card">
      <div class="research-icon">🛡️</div>
      <h3>PQC Implementation Security</h3>
      <p>Side‑channel resistance, fault‑injection hardening, and secure deployment of NIST PQC.</p>
    </div>

    <div class="research-card">
      <div class="research-icon">⚛️</div>
      <h3>Hybrid Classical–Quantum Protocols</h3>
      <p>Forward‑secure communication using combined classical and quantum primitives.</p>
    </div>

    <div class="research-card">
      <div class="research-icon">⛓️</div>
      <h3>Quantum‑Safe Blockchain Consensus</h3>
      <p>PQC‑ready consensus, signature migration, and secure wallet architectures.</p>
    </div>

    <div class="research-card">
      <div class="research-icon">🤖</div>
      <h3>AI‑Assisted Cryptographic Analysis</h3>
      <p>ML‑driven detection of protocol weaknesses and cryptographic misconfigurations.</p>
    </div>

    <div class="research-card">
      <div class="research-icon">🔗</div>
      <h3>Secure Multiparty Computation</h3>
      <p>Efficient MPC, threshold crypto, and privacy‑preserving computation frameworks.</p>
    </div>

    <div class="research-card">
      <div class="research-icon">🧩</div>
      <h3>Zero‑Knowledge Proof Systems</h3>
      <p>Design and optimization of SNARKs, STARKs, and PQ‑secure proof systems.</p>
    </div>

  </div>
</div>

<!-- ============================
     RIGHT COLUMN
============================ -->
<div class="right-column">

  <div class="research-header">
    <h1>Publications</h1>
    <p>Peer‑reviewed research in post‑quantum cryptography, blockchain security, and quantum‑resilient systems.</p>
  </div>

  <!-- Metrics -->
  <div class="metrics-panel">
    <div class="metric-box">
      <div class="metric-value">4</div>
      <div class="metric-label">Publications</div>
    </div>
    <div class="metric-box">
      <div class="metric-value">2</div>
      <div class="metric-label">Surveys</div>
    </div>
    <div class="metric-box">
      <div class="metric-value">2</div>
      <div class="metric-label">PQC / Signatures</div>
    </div>
    <div class="metric-box">
      <div class="metric-value">2</div>
      <div class="metric-label">Blockchain</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="filter-bar">
    <div class="filter-btn active" data-filter="all">All</div>
    <div class="filter-btn" data-filter="pqc">PQC</div>
    <div class="filter-btn" data-filter="signatures">Signatures</div>
    <div class="filter-btn" data-filter="blockchain">Blockchain</div>
    <div class="filter-btn" data-filter="surveys">Surveys</div>
  </div>

  <!-- Timeline -->
  <div class="timeline">

    <!-- SILMARILS -->
    <div class="pub-item" data-tags="pqc signatures">
      <div class="pub-title">SILMARILS: Information-Theoretic and Quantum-Secure Designated-Verifier Signatures</div>
      <div class="pub-authors"><strong>Hassan Khodaiemehr, Khadijeh Bagheri, Chen Feng</strong>, Dariia Porechna</div>
      <div class="pub-venue">arXiv preprint, 2026. <a href="https://arxiv.org/abs/2605.03230" target="_blank">arXiv:2605.03230</a></div>
      <div class="pub-tags">
        <span class="pub-tag">PQC</span>
        <span class="pub-tag">Signatures</span>
      </div>

      <div class="bibtex-toggle">Show BibTeX ▼</div>
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

    <!-- NIROPoK -->
    <div class="pub-item" data-tags="blockchain pqc">
      <div class="pub-title">NIROPoK-Based Post-Quantum Sidechain Design on Ethereum</div>
      <div class="pub-authors"><strong>Hassan Khodaiemehr, Khadijeh Bagheri</strong>, Saeid Yazdinejad, </strong>Chen Feng</strong></div>
      <div class="pub-venue">Cryptology ePrint Archive, 2026. <a href="https://eprint.iacr.org/2026/401" target="_blank">ePrint</a></div>
      <div class="pub-tags">
        <span class="pub-tag">Blockchain</span>
        <span class="pub-tag">PQC</span>
      </div>

      <div class="bibtex-toggle">Show BibTeX ▼</div>
      <div class="bibtex-box">
@misc{cryptoeprint:2026/401,
  author = {Hassan Khodaiemehr and Khadijeh Bagheri and Saeid Yazdinejad and Chen Feng},
  title = {{NIROPoK}-Based Post-Quantum Sidechain Design on Ethereum},
  howpublished = {Cryptology {ePrint} Archive, Paper 2026/401},
  year = {2026},
  url = {https://eprint.iacr.org/2026/401}
}
      </div>
    </div>

    <!-- IEEE COMST -->
    <div class="pub-item" data-tags="surveys blockchain">
      <div class="pub-title">Blockchain Security Risk Assessment in Quantum Era, Migration Strategies, and Proactive Defense</div>
      <div class="pub-authors">Yaser Baseri, Abdelhakim Hafid, Yahya Shahsavari, Dimitrios Makrakis, <strong>Hassan Khodaiemehr</strong></div>
      <div class="pub-venue">IEEE Communications Surveys & Tutorials, 2026. <a href="https://doi.org/10.1109/COMST.2025.3621113" target="_blank">DOI</a></div>
      <div class="pub-tags">
        <span class="pub-tag">Surveys</span>
        <span class="pub-tag">Blockchain</span>
      </div>

      <div class="bibtex-toggle">Show BibTeX ▼</div>
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

    <!-- Elsevier CSR -->
    <div class="pub-item" data-tags="surveys blockchain">
      <div class="pub-title">Navigating the Quantum Computing Threat Landscape for Blockchains: A Comprehensive Survey</div>
      <div class="pub-authors"><strong>Hassan Khodaiemehr, Khadijeh Bagheri, Chen Feng</strong></div>
      <div class="pub-venue">Computer Science Review, 2026. <a href="https://www.sciencedirect.com/science/article/pii/S1574013725001224" target="_blank">ScienceDirect</a></div>
      <div class="pub-tags">
        <span class="pub-tag">Surveys</span>
        <span class="pub-tag">Blockchain</span>
      </div>

      <div class="bibtex-toggle">Show BibTeX ▼</div>
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
</div>

</div>

<script>
/* FILTERING */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    document.querySelectorAll(".pub-item").forEach(item => {
      const tags = item.dataset.tags;
      item.style.display = (filter === "all" || tags.includes(filter)) ? "block" : "none";
    });
  });
});

/* COLLAPSIBLE BIBTEX */
document.querySelectorAll(".bibtex-toggle").forEach(toggle => {
  toggle.addEventListener("click", () => {
    const box = toggle.nextElementSibling;
    const isOpen = box.style.display === "block";
    box.style.display = isOpen ? "none" : "block";
    toggle.textContent = isOpen ? "Show BibTeX ▼" : "Hide BibTeX ▲";
  });
});
</script>

{% endraw %}
