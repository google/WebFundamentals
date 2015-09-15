---
layout: shared/plain
title: "Shows"
---

{% for subdirectory in page.context.subdirectories %}
  <div class="show-index-item">
    <div class="show-index-item__img">
      <a href="{{subdirectory.index.relative_url}}">
        <img class="showindex__rect-img" src="{{site.WFBaseUrl}}/shows/imgs/{{subdirectory.index.key_img}}" />
      </a>
    </div>
    <div class="show-index-item__info">
      <div class="show-index-item__title">
        <a href="{{subdirectory.index.relative_url}}">{{ subdirectory.index.title }}</a>
      </div>
      <div class="show-index-item__description">
        <a href="{{subdirectory.index.relative_url}}">{{ subdirectory.index.description }}</a>
      </div>
    </div>
  </div>
{% endfor %}
