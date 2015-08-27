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
<a href="{{subdirectory.index.relative_url}}">
  <img class="showindex__rect-img" src="{{site.WFBaseUrl}}/shows/imgs/{{subdirectory.index.key-img}}" />
</a>
{% endfor %}
