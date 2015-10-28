---
layout: shared/wide
title: "Case Studies"
description: "Every so often, we talk with the engineering team behind a successful mobile web offering to share with you what worked, what didn't and how you can follow their footsteps."
---

<div class="wf-subheading">
  <div class="page-content">
    <h2>Case studies</h2>
    <p class="mdl-typography--font-light">
      {{ page.description }}
    </p>
    <p class="mdl-typography--font-light">
      Have an idea for a case study? <a href="https://services.google.com/fb/forms/webshowcase/">Let us know!</a>
    </p>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div class="page-content">
  <div class="mdl-grid">
    {% for pageInSection in page.context.pages reversed %}
      {% capture featuredImage %}{{site.WFBaseUrl}}/showcase/case-study/{{pageInSection.featured_image}}{% endcapture %}
      {% include shared/base_card.liquid title=pageInSection.title text=pageInSection.description linkHref=pageInSection.canonical_url imgUrl=featuredImage linkText=pageInSection.title %}
    {% endfor %}
  </div>
</div>
