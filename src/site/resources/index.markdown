---
layout: default
title: "Resources"
description: ""
---
#{{page.title}}

{% for article in page.articles.resources %}
  ({{article.title}})[{{article.path}}]
{% endfor %}