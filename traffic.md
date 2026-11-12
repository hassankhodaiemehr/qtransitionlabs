---
layout: default
title: Traffic statistics
description: Anonymous visit statistics for the Quantum Transition Labs public website.
permalink: /traffic/
stylesheet: /assets/css/traffic.css
---

<div class="page-section traffic-page">

  <header class="page-header reveal-target">
    <h1>Site traffic</h1>
    <p class="page-subtitle">
      Anonymous pageview totals for <strong>qtransitionlabs.com</strong>. We do not use advertising trackers or sell traffic data.
    </p>
  </header>

  <div class="traffic-grid reveal-target">
    <article class="traffic-card">
      <p class="traffic-card__label">Total page views</p>
      <p class="traffic-card__value"><span data-qtl-stat="pageviews">…</span></p>
    </article>
    <article class="traffic-card">
      <p class="traffic-card__label">Unique visitors (all time)</p>
      <p class="traffic-card__value"><span data-qtl-stat="unique">…</span></p>
      <p class="traffic-card__hint">Browser-local ID; not personal data.</p>
    </article>
    <article class="traffic-card">
      <p class="traffic-card__label">Views today (UTC)</p>
      <p class="traffic-card__value"><span data-qtl-stat="today">…</span></p>
      <p class="traffic-card__hint"><span data-qtl-stat="unique_today">…</span> unique today</p>
    </article>
  </div>

  <section class="traffic-detail reveal-target" aria-labelledby="traffic-paths-heading">
    <h2 id="traffic-paths-heading">Popular paths</h2>
    <ul class="traffic-path-list" id="traffic-top-paths">
      <li class="traffic-path-list__placeholder">Loading…</li>
    </ul>
  </section>

  <section class="traffic-notes reveal-target">
    <h2>How this works</h2>
    <ul>
      <li>Each browser session records at most <strong>one pageview</strong> when you load a page (refreshing in the same session does not inflate counts).</li>
      <li>Counts are stored in a database on the <strong><code>qtl-analytics</code></strong> Render service (<code>analytics.stats_api_url</code> in site config).</li>
      <li>No cookies are required; a random ID in <code>localStorage</code> distinguishes returning browsers for unique-visitor estimates.</li>
      {% if site.analytics.public_stats_url and site.analytics.public_stats_url != '' %}
      <li>Extended analytics: <a href="{{ site.analytics.public_stats_url }}" target="_blank" rel="noopener noreferrer">full GoatCounter dashboard</a>.</li>
      {% elsif site.analytics.goatcounter_url and site.analytics.goatcounter_url != '' %}
      <li>Extended analytics are also collected with <a href="https://www.goatcounter.com" target="_blank" rel="noopener noreferrer">GoatCounter</a> (privacy-friendly, no ad network).</li>
      {% else %}
      <li>Optional: set <code>goatcounter_url</code> in <code>_config.yml</code> for long-term dashboards via <a href="https://www.goatcounter.com" target="_blank" rel="noopener noreferrer">GoatCounter</a>.</li>
      {% endif %}
    </ul>
    <p class="traffic-since">Tracking active since <span data-qtl-stat-since">—</span> (UTC).</p>
    <p class="traffic-api-hint" id="traffic-api-hint" hidden>
      Could not reach the statistics API. In Render, run a <strong>Blueprint sync</strong> so <code>qtl-analytics</code> is deployed, then verify
      <a href="https://qtl-analytics.onrender.com/api/health" target="_blank" rel="noopener noreferrer">/api/health</a>.
    </p>
  </section>

</div>
