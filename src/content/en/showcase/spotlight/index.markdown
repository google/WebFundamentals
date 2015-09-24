---
layout: shared/wide
title: "Spotlight"
description: "Sites and apps we love, regardless of their mainstream success. Always pushing the web forward. Click through for interviews with the developers and pro/cons."
---

<div class="wf-subheading">
  <div class="page-content">
    <h2>Get inspired</h2>
    <p>
      {{ page.description }}
    </p>
  </div>
</div>

<div class="page-content">
  <div class="mdl-grid">
    {% for pageInSection in page.context.pages reversed %}
      {% include shared/base_card.liquid title=pageInSection.title text=pageInSection.description linkHref=pageInSection.canonical_url imgUrl=pageInSection.featured_image linkText="View" %}
    {% endfor %}
  </div>
</div>
