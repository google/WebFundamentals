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

{% if page.context.subdirectories.size > 0 %}

  <div class="layout-lss">
    <div class="layout-lss__large" style="background-image: url({{site.WFBaseUrl}}/shows/imgs/{{page.context.subdirectories[1].index.key-img}});">
      <a href="{{page.context.subdirectories[0].index.relative_url}}">
      <img class="showindex__rect-img" src="{{site.WFBaseUrl}}/shows/imgs/{{page.context.subdirectories[0].index.key-img}}" />
      </a>
    </div>
    <div class="layout-lss__ss-container">
      <div class="layout-lss__small" style="background-image: url({{site.WFBaseUrl}}/shows/imgs/{{page.context.subdirectories[1].index.key-img}});">
        <a href="{{page.context.subdirectories[1].index.relative_url}}">
        </a>
      </div>
      <div class="layout-lss__small" style="background-image: url({{site.WFBaseUrl}}/shows/imgs/{{page.context.subdirectories[2].index.key-img}});">
        <a href="{{page.context.subdirectories[2].index.relative_url}}">
        </a>
      </div>
    </div>
  </div>

{% endif %}

{% for subdirectory in page.context.subdirectories %}

{% endfor %}
