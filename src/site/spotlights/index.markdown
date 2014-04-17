---
layout: default
title: "Showcases"
description: ""
---
{% wrap content%}

# {{page.title}}

## Showcases
{% for article in page.articles.showcase %}
*  [{{article.title}}]({{site.baseurl}}/{{article.url}})
{% endfor %}


## Spotlight
{% for article in page.articles.spotlight %}
*  [{{article.title}}]({{site.baseurl}}/{{article.url}})
{% endfor %}
{% endwrap %}
