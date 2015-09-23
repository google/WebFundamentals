---
layout: shared/wide
title: "Case Studies"
description: "Every so often, we talk with the engineering team behind a successful mobile web offering to share with you what worked, what didn't and how you can follow their footsteps."
---

<div class="wf-subheading">
  <div class="page-content">
    <h2>Case studies</h2>
    <p>
      {{ page.description }}
    </p>
  </div>
</div>

<div class="page-content">
  <div class="mdl-grid">
    {% for pageInSection in page.context.pages reversed %}
      {% include showcase/card.liquid title=pageInSection.title text=pageInSection.description linkHref=pageInSection.canonical_url imgUrl=pageInSection.featured_image %}
    {% endfor %}
  </div>
</div>
