---
layout: default
title: "Resources"
description: "Helpful resources about the site"
---
{% wrap content%}

#{{page.title}}

{% for article in page.articles.resources %}
* [{{article.title}}]({{site.baseurl}}{{article.url}}) - {{article.description}}
{% endfor %}
{% endwrap %}
