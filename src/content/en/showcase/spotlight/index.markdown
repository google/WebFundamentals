---
layout: shared/wide
title: "Spotlight"
description: "Sites and apps we love, regardless of their mainstream success. Always pushing the web forward. Click through for interviews with the developers and pro/cons."
---

<div class="wf-subheading">
  <div class="page-content">
    <h2>Get inspired</h2>
    <p class="mdl-typography--font-light">
      {{ page.description }}
    </p>
    <p class="mdl-typography--font-light">
      Have an idea for a spotlight? <a href="https://services.google.com/fb/forms/webshowcase/">Let us know!</a>
    </p>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div class="page-content">
  <div class="mdl-grid">
    {% for pageInSection in page.context.pages reversed %}
      {% capture featuredImage %}{{site.WFBaseUrl}}/showcase/spotlight/{{pageInSection.featured_image}}{% endcapture %}
      {% include shared/base_card.liquid title=pageInSection.title text=pageInSection.description linkHref=pageInSection.canonical_url imgUrl=featuredImage linkText=pageInSection.title %}
    {% endfor %}
  </div>
</div>
