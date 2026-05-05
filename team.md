---
layout: default
title: Our Team
---

<style>
/* GLOBAL FULL-WIDTH */
.page-content, .wrapper, .container {
  max-width: 100% !important;
  width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* Page padding */
.team-page {
  padding: 2rem 3rem;
}

/* Header */
.team-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.team-header h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #F0F6FC;
}

.team-header p {
  color: #8B949E;
  font-size: 1.15rem;
  margin-top: -0.3rem;
}

body.light-mode .team-header h1 {
  color: #1A1F36;
}

body.light-mode .team-header p {
  color: #4B5563;
}

/* Team Grid */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.2rem;
  margin-top: 2rem;
}

/* Force 3 columns on desktop */
@media (min-width: 900px) {
  .team-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Team Card — Dark Mode */
.team-card {
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 14px;
  padding: 1.8rem;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}

/* Light Mode Override */
body.light-mode .team-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}

body.light-mode .team-card h2,
body.light-mode .team-card h4 {
  color: #1A1F36;
}

body.light-mode .team-card p,
body.light-mode .team-card li {
  color: #374151;
}

/* Photo */
.team-photo {
  width: 180px;
  border-radius: 12px;
  margin-bottom: 1rem;
}

/* Headings */
.team-card h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #F0F6FC;
}

.team-card h4 {
  font-size: 1.1rem;
  font-weight: 500;
  color: #C9D1D9;
  margin-top: -0.4rem;
  margin-bottom: 1rem;
}

/* Text — JUSTIFIED */
.team-card p,
.team-card li {
  color: #C9D1D9;
  line-height: 1.55;
  text-align: justify;
}

/* LinkedIn Button */
.linkedin-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #0A66C2;
  color: white !important;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.25s ease;
  font-size: 0.95rem;
}

.linkedin-btn:hover {
  background: #0D7BE0;
  box-shadow: 0 0 12px rgba(10,102,194,0.6);
  transform: translateY(-2px);
}

/* Divider */
.section-divider {
  margin: 4rem 0 2rem 0;
  border-top: 2px solid #30363D;
}

body.light-mode .section-divider {
  border-top: 2px solid #E5E7EB;
}
</style>

<div class="team-page">

<div class="team-header">
  <h1>Leadership Team</h1>
  <p>Experts in post‑quantum security, distributed systems, and advanced cryptography.</p>
</div>

<div class="team-grid">

<!-- Hassan -->
<div class="team-card">
  <img src="/assets/team/hassan.jpeg" alt="Photo of Hassan Khodaiemehr" class="team-photo" />
  <h2>Dr. Hassan Khodaiemehr</h2>
  <h4>Co‑Founder & CEO</h4>

  <p>
    Dr. Khodaiemehr has experience across coding theory, wireless communications, cryptography,
    blockchain security, quantum error correction, and data science. He holds a PhD in Pure Mathematics
    and is currently a Postdoctoral Research Fellow at UBC Okanagan. His work spans lattice/LDPC code design,
    quantum LDPC & GKP codes, post‑quantum cryptography, blockchain security, and privacy‑preserving protocols.
  </p>

  <p><strong>Focus areas:</strong></p>
  <ul>
    <li>Post‑quantum & quantum‑resistant system architecture</li>
    <li>Quantum error correction & fault‑tolerant communication</li>
    <li>Blockchain & privacy‑preserving protocol design</li>
    <li>Cryptographic modernization for enterprises</li>
    <li>Wireless & physical‑layer security</li>
  </ul>

  <a class="linkedin-btn" href="https://www.linkedin.com/in/hassan-khodaiemehr-b8b7b954/" target="_blank">LinkedIn Profile</a>
</div>

<!-- Chen -->
<div class="team-card">
  <img src="/assets/team/chen.jpeg" alt="Photo of Chen Feng" class="team-photo" />
  <h2>Dr. Chen Feng</h2>
  <h4>Co‑Founder & Chief Scientist</h4>

  <p>
    Dr. Chen Feng is an Associate Professor at UBC Okanagan and a leading expert in digital and networked
    technologies. He holds the Canada Research Chair in Blockchain‑based Digital Technologies and is a core
    executive member of Blockchain@UBC. His research spans blockchain consensus, quantum communications,
    and information theory, supported by multiple NSERC Quantum grants.
  </p>

  <p><strong>Focus areas:</strong></p>
  <ul>
    <li>Blockchain security, scalability & consensus (Fast‑HotStuff)</li>
    <li>Quantum communications & quantum error correction</li>
    <li>Information theory for wireless & cloud systems</li>
  </ul>

  <a class="linkedin-btn" href="https://www.linkedin.com/in/chen-feng-75272a37/" target="_blank">LinkedIn Profile</a>
</div>

<!-- Khadijeh -->
<div class="team-card">
  <img src="/assets/team/mina.jpeg" alt="Photo of Khadijeh Bagheri" class="team-photo" />
  <h2>Dr. Khadijeh Bagheri</h2>
  <h4>Co‑Founder & Chief Cryptographer</h4>

  <p>
    Dr. Bagheri is a Postdoctoral Research Fellow at UBC Okanagan, working on advanced cryptographic and
    quantum‑resilient security systems. She earned her PhD in Applied Mathematics and received the Best PhD
    Thesis Award from the Iranian Society of Cryptology. Her background includes research roles at Sharif
    University of Technology and IPM, with expertise spanning PQC, blockchain security, and physical‑layer security.
  </p>

  <p><strong>Focus areas:</strong></p>
  <ul>
    <li>Post‑quantum cryptography (PQC)</li>
    <li>Quantum‑resistant blockchain & information‑theoretic security</li>
    <li>Lattice‑ & code‑based cryptographic constructions</li>
    <li>Physical‑layer security for wireless systems</li>
  </ul>

  <a class="linkedin-btn" href="https://www.linkedin.com/in/khadijeh-bagheri-7235b542/" target="_blank">LinkedIn Profile</a>
</div>

</div>

<div class="section-divider"></div>

<h1>Advisory & Research Network</h1>

<p>
We collaborate with researchers and engineers across:
</p>

<ul>
  <li>Applied cryptography</li>
  <li>Quantum information science</li>
  <li>Blockchain security</li>
  <li>Cloud & distributed architecture</li>
  <li>AI‑driven security tooling</li>
</ul>

<p>
Our advisory network includes contributors from academia, industry labs, and open‑source security communities.
</p>

</div>
