---
layout: default
title: "Resources"
description: "Helpful resources about the site"
---
#{{page.title}}

{% for article in page.articles.resources %}
* [{{article.title}}]({{article.url}})
{% endfor %}
