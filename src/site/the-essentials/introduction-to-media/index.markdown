---
layout: article
title: "Introduction to media"
description: ""
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

