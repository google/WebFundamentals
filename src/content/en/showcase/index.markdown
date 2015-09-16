---
layout: shared/wide
title: "Spotlights"
description: "Listing of all spotlights."
---

<div class="wf-subheading">
  <div class="page-content">
    <h2>Get inspired</h2>
    <p>
      Take a deep look at sites and web apps that have achieved success and learn from their mistakes, discoveries and technical advancements. Immerse yourself in <a href="{{site.baseurl}}/showcase/case-study/">case studies</a>, get inspired via lightweight <a href="{{site.baseurl}}/showcase/spotlight/">spotlights</a> and dive deep with technical deep dives.
    </p>
  </div>
</div>

<div class="page-content">
  <div class="mdl-grid">
    {% for pageInSection in page.context.pages | reverse %}
      {% include showcase/card.liquid title=pageInSection.title text=pageInSection.description linkHref=pageInSection.canonical_url imgUrl=pageInSection.key_img %}
    {% endfor %}
  </div>
</div>

