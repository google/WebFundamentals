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
 <p><a href="{{subdirectory.index.relative_url}}">{{subdirectory.index.title}}</a></p>
{% endfor %}
