---
layout: shared/wide
title: "Showcase"
description: "Showcase is a page highlighting some of the great web apps available to day. We look at design, performance and responsiveness."
---
{% comment %}
  the following code grabs and sorts the list of case studies and spotlights
{% endcomment %}

{% assign list = site.WFarray %}
{% for dir in page.context.subdirectories %}
  {% for pg in dir.pages %}
    {% assign list = list | push: pg %}
  {% endfor %}
{% endfor %}
{% assign list = list | sort: 'published_on' %}


<div class="wf-subheading">
  <div class="page-content">
    <h2>Get inspired</h2>
    <p>
      Take a deep look at sites and web apps that have achieved success and learn from their mistakes, discoveries and technical advancements. Immerse yourself in <a href="/web/showcase/case-study/">case studies</a>, get inspired via lightweight <a href="/web/showcase/spotlight/">spotlights</a> and dive deep with technical deep dives.
    </p>
  </div>
</div>

<div class="page-content">
  <div class="mdl-grid">
    {% for pageInSection in list reversed %}
      {% capture imageURL %}{{pageInSection.context.id}}/{{pageInSection.featured_image}}{% endcapture %}
      {% include showcase/card.liquid title=pageInSection.title text=pageInSection.description linkHref=pageInSection.canonical_url imgUrl=imageURL %}
    {% endfor %}
  </div>
</div>
