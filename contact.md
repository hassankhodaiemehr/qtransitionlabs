---
layout: default
title: Contact
---

<style>
/* GLOBAL LAYOUT (FULL-WIDTH FEEL) */
.page-content, .wrapper, .container {
  max-width: 95% !important;
  width: 95% !important;
  margin: 0 auto !important;
  padding: 0 !important;
}

.contact-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem;
}

/* GRID LAYOUT */
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 2.5rem;
  width: 100%;
  max-width: 1100px;
}

/* LEFT: HEADER & DESCRIPTION */
.contact-header-card {
  padding: 2rem 2.4rem;
  border-radius: 18px;
  border: 1px solid #30363D;
  background: radial-gradient(circle at top left, #1F2933 0, #0D1117 55%, #05070A 100%);
  box-shadow: 0 16px 40px rgba(0,0,0,0.5);
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.9s ease forwards;
}

body.light-mode .contact-header-card {
  background: radial-gradient(circle at top left, #E5F0FF 0, #FFFFFF 55%, #F9FAFB 100%);
  border-color: #E5E7EB;
  box-shadow: 0 18px 40px rgba(15,23,42,0.12);
}

.contact-header-card::before {
  content: "";
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle at top right, rgba(88,166,255,0.18), transparent 55%);
  opacity: 0.9;
  pointer-events: none;
}

.contact-header-inner {
  position: relative;
  z-index: 1;
}

/* BADGE */
.contact-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.8rem;
  border-radius: 999px;
  background: rgba(56,189,248,0.08);
  border: 1px solid rgba(56,189,248,0.3);
  color: #7DD3FC;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
}

body.light-mode .contact-badge {
  background: rgba(37,99,235,0.05);
  border-color: rgba(37,99,235,0.2);
  color: #2563EB;
}

.contact-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #22C55E;
  box-shadow: 0 0 0 6px rgba(34,197,94,0.25);
}

/* HEADER TEXT */
.contact-header h1 {
  font-size: clamp(2.1rem, 2.5vw + 1.4rem, 2.9rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #F9FAFB;
  margin: 0 0 0.8rem 0;
}

body.light-mode .contact-header h1 {
  color: #0B1120;
}

.contact-header p {
  color: #9CA3AF;
  font-size: 1.02rem;
  max-width: 520px;
  margin: 0 0 1.6rem 0;
  line-height: 1.65;
}

body.light-mode .contact-header p {
  color: #4B5563;
}

/* PILL STATS */
.contact-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.8rem;
}

.contact-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  background: rgba(15,23,42,0.7);
  color: #E5E7EB;
  font-size: 0.82rem;
}

body.light-mode .contact-pill {
  background: #EFF6FF;
  color: #1F2937;
}

.contact-pill-icon {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: linear-gradient(135deg, #38BDF8, #6366F1);
}

/* HIGHLIGHT BOX */
.contact-highlight {
  margin-top: 0.8rem;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  background: rgba(15,23,42,0.65);
  border: 1px solid rgba(55,65,81,0.9);
  color: #E5E7EB;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

body.light-mode .contact-highlight {
  background: #EEF2FF;
  border-color: #C7D2FE;
  color: #111827;
}

.contact-highlight-icon {
  font-size: 1.1rem;
  line-height: 1;
  opacity: 0.9;
}

/* RIGHT: CONTACT CARD */
.contact-card {
  background: #0D1117;
  border-radius: 18px;
  border: 1px solid #30363D;
  padding: 2rem 2.2rem;
  box-shadow: 0 16px 38px rgba(0,0,0,0.55);
  animation: fadeInUp 0.9s ease 0.1s forwards;
  transform-origin: center;
}

body.light-mode .contact-card {
  background: #FFFFFF;
  border-color: #E5E7EB;
  box-shadow: 0 20px 40px rgba(15,23,42,0.12);
}

.contact-card h2 {
  margin: 0 0 0.6rem 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #F9FAFB;
}

body.light-mode .contact-card h2 {
  color: #111827;
}

.contact-card-sub {
  margin: 0 0 1.6rem 0;
  font-size: 0.96rem;
  color: #9CA3AF;
}

body.light-mode .contact-card-sub {
  color: #6B7280;
}

/* ITEMS */
.contact-item {
  padding: 0.7rem 0.2rem;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.6rem 1rem;
  align-items: flex-start;
  font-size: 0.98rem;
  color: #D1D5DB;
  border-bottom: 1px solid rgba(55,65,81,0.6);
}

.contact-item:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

body.light-mode .contact-item {
  color: #374151;
  border-bottom-color: #E5E7EB;
}

.contact-item-label {
  font-weight: 600;
  color: #9CA3AF;
  white-space: nowrap;
}

body.light-mode .contact-item-label {
  color: #6B7280;
}

.contact-item-value {
  line-height: 1.5;
}

.contact-item-value a {
  color: #58A6FF;
  text-decoration: none;
  border-bottom: 1px dashed rgba(88,166,255,0.6);
  padding-bottom: 1px;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.contact-item-value a:hover {
  color: #79B8FF;
  border-color: rgba(121,184,255,0.9);
}

body.light-mode .contact-item-value a {
  color: #2563EB;
  border-color: rgba(37,99,235,0.5);
}

body.light-mode .contact-item-value a:hover {
  color: #1D4ED8;
  border-color: rgba(37,99,235,0.9);
}

/* CTA FOOTER */
.contact-footer {
  margin-top: 1.6rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

/* PRIMARY BUTTON */
.contact-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #3B82F6, #22C55E);
  color: #0B1120 !important;
  font-weight: 700;
  font-size: 0.97rem;
  text-decoration: none;
  border: none;
  box-shadow: 0 0 0 1px rgba(15,23,42,0.9), 0 16px 40px rgba(59,130,246,0.55);
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
}

.contact-button-icon {
  font-size: 1.05rem;
}

.contact-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow: 0 0 0 1px rgba(15,23,42,0.9), 0 22px 55px rgba(59,130,246,0.7);
}

.contact-button:active {
  transform: translateY(0);
  box-shadow: 0 0 0 1px rgba(15,23,42,0.9), 0 10px 20px rgba(15,23,42,0.6);
}

/* SECONDARY TEXT */
.contact-response-time {
  font-size: 0.86rem;
  color: #9CA3AF;
}

.contact-response-time strong {
  color: #F9FAFB;
}

body.light-mode .contact-response-time {
  color: #6B7280;
}

body.light-mode .contact-response-time strong {
  color: #111827;
}

/* ANIMATIONS */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(18px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 640px) {
  .contact-page {
    padding: 2rem 1rem;
  }

  .contact-header-card,
  .contact-card {
    padding: 1.6rem 1.4rem;
  }

  .contact-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-response-time {
    max-width: 260px;
  }
}
</style>

<div class="contact-page">
  <div class="contact-grid">

    <!-- LEFT: STORY / SUMMARY -->
    <section class="contact-header-card">
      <div class="contact-header-inner">
        <div class="contact-badge">
          <span class="contact-badge-dot"></span>
          <span>We respond within 24 hours</span>
        </div>

        <header class="contact-header">
          <h1>Contact QTransition Labs</h1>
          <p>
            For engagements, collaborations, or inquiries, our team is ready to assist with
            quantum transition strategy, research partnerships, and technical advisory.
          </p>
        </header>

        <div class="contact-stats">
          <div class="contact-pill">
            <span class="contact-pill-icon"></span>
            Global coverage: remote &amp; on‑site
          </div>
          <div class="contact-pill">
            <span class="contact-pill-icon"></span>
            Enterprise &amp; research collaborations
          </div>
          <div class="contact-pill">
            <span class="contact-pill-icon"></span>
            NDAs available on request
          </div>
        </div>

        <div class="contact-highlight">
          <div class="contact-highlight-icon">✦</div>
          <div>
            Tell us briefly about your use‑case or challenge. We’ll follow up with tailored
            next steps, including timelines and potential engagement models.
          </div>
        </div>
      </div>
    </section>

    <!-- RIGHT: CONTACT DETAILS -->
    <section class="contact-card" aria-label="Contact details">
      <h2>Get in Touch</h2>
      <p class="contact-card-sub">
        Reach out by email to start a conversation. If appropriate, we’ll propose a follow‑up
        call or workshop.
      </p>

      <div class="contact-item">
        <div class="contact-item-label">Email</div>
        <div class="contact-item-value">
          <a href="mailto:contact@qtransitionlabs.com">contact@qtransitionlabs.com</a>
        </div>
      </div>

      <div class="contact-item">
        <div class="contact-item-label">Location</div>
        <div class="contact-item-value">
          Suite 250 — PMB 1725<br>
          997 Seymour St<br>
          Vancouver, BC, V6B 3M1<br>
          Canada
        </div>
      </div>

      <div class="contact-item">
        <div class="contact-item-label">Availability</div>
        <div class="contact-item-value">
          Global (remote &amp; on‑site), across North America, Europe, and selected APAC hubs.
        </div>
      </div>

      <div class="contact-footer">
        <a href="mailto:contact@qtransitionlabs.com" class="contact-button">
          <span class="contact-button-icon">✉</span>
          <span>Send an Email</span>
        </a>

        <div class="contact-response-time">
          Typical response time: <strong>under 24 hours</strong> on business days.
        </div>
      </div>
    </section>

  </div>
</div>
