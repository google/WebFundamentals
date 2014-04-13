---
layout: article
title: "Optimizing Performance"
description: ""
---
# {{ page.title }}

Performance Matters (#perfmatters).  It not only matters it is critical that you deliver your content as quickly as possible to the user and once they are in your app you make your page's interaction and rendering as smooth as possible.

{% for guide in page.articles.performance %}
*  <a href="{{guide.url}}">{{guide.title}}</a>
{% endfor %}
