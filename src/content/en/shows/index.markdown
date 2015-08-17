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
 <p><a href="{{subdirectory[1].pages[1].relative_url}}">{{subdirectory[1].pages[1].title}}</a></p>
{% endfor %}
