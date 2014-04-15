---
layout: article
title: "Introduction to media"
description: "Images, Video and Audio make the web engaging and compelling.  Use our guides to get complete mastery and deliver amazing experiences to your users."
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
collection: the-essentials
---
# {{ page.title }}

Images, Video and Audio make the web engaging and compelling.  Use our guides to get complete mastery and deliver amazing experiences to your users.

{% for guide in page.articles.introduction-to-media %}
{% class %}
### [{{guide.title}}]({{guide.url}})
{{guide.description}}
{% endclass %}
{% endfor %}

