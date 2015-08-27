---
id: shows
layout: shared/plain
title: "Shows"
description: ""
collection: web
published: true
feedName: Google Developers Web Shows
feedPath: shows/feed.xml
---

{% for subdirectory in page.context.subdirectories %}
  <div class="show-index-item">
    <div class="show-index-item__img">
      <a href="{{subdirectory.index.relative_url}}">
        <img class="showindex__rect-img" src="{{site.WFBaseUrl}}/shows/imgs/{{subdirectory.index.key-img}}" />
      </a>
    </div>
    <div class="show-index-item__description">
      <a href="{{subdirectory.index.relative_url}}">{{ subdirectory.index.description }}</a>
    </div>
  </div>
{% endfor %}
