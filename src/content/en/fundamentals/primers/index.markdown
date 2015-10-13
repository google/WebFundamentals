---
layout: shared/narrow-subdirectories-list
title: "API primers"
description: "API primers help you to understand the key concepts behind an API"
published_on: 2015-07-21
updated_on: 2015-07-21
translation_priority: 0
order: 11
---

{% comment %}

{% for subdirectory in page.context.subdirectories %}
<h4><a href="{{subdirectory.id}}">{{subdirectory.index.title}}</a></h4>
<p>{{subdirectory.index.description}}</p>
{% endfor %}

{% endcomment %}
