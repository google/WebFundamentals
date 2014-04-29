---
layout: default
title: "Showcases"
description: ""
---
{% wrap content%}

{% if site.spotlights %}

## Showcases
{% for article in page.articles.showcase %}
*  [{{article.title}}]({{site.baseurl}}{{article.url}})
{% endfor %}


## Spotlight
{% for article in page.articles.spotlight %}
*  [{{article.title}}]({{site.baseurl}}{{article.url}})
{% endfor %}

{% else %}
# Coming Soon

Thanks for visiting.  We currently don't have any content here.

{% endif %}

{% endwrap %}
