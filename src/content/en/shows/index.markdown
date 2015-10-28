---
layout: shared/wide
title: "Shows"
---

<div class="wf-subheading">
  <div class="page-content">
    <h2>Watch &amp; learn</h2>
    <p class="mdl-typography--font-light">
      Learn about the latest and greatest from the Chrome team.
    </p>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div class="page-content">
  <div class="mdl-grid">
    {% for subdirectory in page.context.subdirectories %}
      {% capture image %}{{site.WFBaseUrl}}/shows/imgs/{{subdirectory.index.key_img}}{% endcapture %}
      {% include shared/base_card.liquid imgUrl=image text=subdirectory.index.description linkHref=subdirectory.index.relative_url linkText=subdirectory.index.title %}
    {% endfor %}
  </div>
</div>
