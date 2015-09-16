---
layout: shared/wide
title: "Shows"
---

<div class="wf-subheading">
  <div class="page-content">
    <h2>Watch &amp; learn</h2>
    <p>Learn about the latest and greatest from the Chrome team.</p>
  </div>
</div>

<div class="page-content">
  <div class="mdl-grid">
    {% for subdirectory in page.context.subdirectories %}
      {% capture action %}<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="{{subdirectory.index.relative_url}}">{{subdirectory.index.title}}</a>{% endcapture %}
      {% capture image %}imgs/{{subdirectory.index.key_img}}{% endcapture %}
      {% include shared/base_card.liquid imgUrl=image text=subdirectory.index.description action=action %}
    {% endfor %}
  </div>
</div>
