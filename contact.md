---
layout: default
title: Contact
---

<style>
/* FULL‑WIDTH (95%) */
.page-content, .wrapper, .container {
  max-width: 95% !important;
  width: 95% !important;
  margin: 0 auto !important;
  padding: 0 !important;
}

/* Page padding */
.contact-page {
  padding: 2rem 2rem;
}

/* HEADER */
.contact-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.contact-header h1 {
  font-size: 2.6rem;
  font-weight: 700;
  color: #F0F6FC;
}

.contact-header p {
  color: #8B949E;
  font-size: 1.15rem;
  max-width: 700px;
  margin: 0.5rem auto 0 auto;
}

body.light-mode .contact-header h1 {
  color: #1A1F36;
}

body.light-mode .contact-header p {
  color: #4B5563;
}

/* CONTACT CARD */
.contact-card {
  max-width: 600px;
  margin: 0 auto;
  background: #161B22;
  border: 1px solid #30363D;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  animation: fadeIn 1s ease forwards;
  text-align: center;
}

body.light-mode .contact-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
}

.contact-card h2 {
  color: #F0F6FC;
  margin-bottom: 1rem;
  font-size: 1.6rem;
}

body.light-mode .contact-card h2 {
  color: #1A1F36;
}

.contact-item {
  margin: 1rem 0;
  font-size: 1.1rem;
  color: #C9D1D9;
}

body.light-mode .contact-item {
  color: #374151;
}

.contact-item strong {
  color: #58A6FF;
}

body.light-mode .contact-item strong {
  color: #0A66C2;
}

/* CTA BUTTON */
.contact-button {
  display: inline-block;
  margin-top: 1.5rem;
  background: #58A6FF;
  color: #0D1117 !important;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.05rem;
  box-shadow: 0 0 14px rgba(88,166,255,0.6);
  transition: 0.25s ease;
}

.contact-button:hover {
  background: #79B8FF;
  box-shadow: 0 0 22px rgba(88,166,255,0.9);
  transform: translateY(-3px);
}

/* Fade‑in animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<div class="contact-page">

<div class="contact-header">
  <h1>Contact Us</h1>
  <p>For engagements, collaborations, or inquiries, our team is ready to assist.</p>
</div>

<div class="contact-card">
  <h2>Get in Touch</h2>

  <div class="contact-item">
    <strong>Email:</strong> contact@qtransitionlabs.com
  </div>

  <div class="contact-item">
    <strong>Location:</strong> Suite 250 — PMB 1725
    
997 Seymour St
VANCOUVER, BC, V6B 3M1, CANADA
  </div>

  <div class="contact-item">
    <strong>Availability:</strong> Global (remote & on‑site)
  </div>

  <div class="contact-item">
    We respond within <strong>24 hours</strong>.
  </div>

  <a href="mailto:contact@qtransitionlabs.com" class="contact-button">Send Email</a>
</div>

</div>
