---
layout: default
title: News
description: Policy updates, industry developments, and analysis on post-quantum cryptography and quantum-era security from Quantum Transition Labs.
permalink: /news/
stylesheet: /assets/css/news.css
---

<div class="page-section news-page">

<div class="page-banner-group">
  {% include page-banner-bg.html %}
  <div class="page-header reveal-target">
    <h1>News &amp; Insights</h1>
    <p class="page-subtitle">
      Policy developments, industry signals, and practical analysis for organizations navigating post‑quantum security.
    </p>
  </div>
</div>

<div class="news-list">
  {% assign sorted_news = site.news | sort: 'date' | reverse %}
  {% for item in sorted_news %}
  <article class="news-card reveal-target">
    <div class="news-card-header">
      {% if item.category %}
      <span class="news-category">{{ item.category }}</span>
      {% endif %}
      <time class="news-card-date" datetime="{{ item.date | date: '%Y-%m-%d' }}">{{ item.date | date: '%B %d, %Y' }}</time>
    </div>
    <h2><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h2>
    <p>{{ item.excerpt | default: item.description }}</p>
    <a href="{{ item.url | relative_url }}" class="news-read-more">Read analysis →</a>
  </article>
  {% endfor %}
</div>

<div class="page-cta reveal-target">
  <p>Stay ahead of quantum-era cryptographic risk.</p>
  <a href="{{ '/contact/' | relative_url }}" class="hero-button">Schedule a Consultation</a>
</div>

</div>
