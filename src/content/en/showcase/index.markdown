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
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col wf-showcase__title">
      <h2>Get inspired</h2>
      <p class="mdl-typography--font-light">
        Take a deep look at sites and web apps that have achieved success and learn from their mistakes, discoveries and technical advancements. Immerse yourself in <a href="/web/showcase/case-study/">case studies</a>, get inspired via lightweight <a href="/web/showcase/spotlight/">spotlights</a> and dive deep with technical deep dives.
      </p>
      <p class="mdl-typography--font-light">
        Have an idea for our showcase? <a href="https://services.google.com/fb/forms/webshowcase/">Let us know!</a>
      </p>
    </div>
  </div>
</div>

{% for section in page.context.subdirectories %}
  {% if section.id == 'case-study' %}
    {% assign caseStudyDir = section %}
    {% assign caseStudies = caseStudyDir.pages %}
    {% assign caseStudy = caseStudies[1] %}
    {% break %}
  {% endif %}
{% endfor %}

{% if caseStudy %}
<div class="wf-showcase__featured-casestudy">
  <div class="page-content">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet wf-showcase__device-img">
      <img src="{{site.WFBaseUrl}}/showcase/case-study/{{caseStudy.showcase.key_image}}" class="wf-showcase__featured-showcase-img" alt="">
    </div>
    <div>
      <h4>{{caseStudy.title}}</h4>
      <h5>{{caseStudy.subtitle}}</h5>
      <p>{{caseStudy.description}}</p>
      <a href="{{caseStudy.canonical_url}}">Read the case study</a>
    </div>
  </div>
</div>
{% endif %}

{% include page-structure/site-promo-small.liquid %}

<div class="page-content" style="clear:both">
  <div class="mdl-grid">
    <p class="mdl-cell mdl-cell--12-col">

    </p>
    {% for pageInSection in list reversed %}
      {% capture imageURL %}{{site.WFBaseUrl}}/showcase/{{pageInSection.context.id}}/{{pageInSection.featured_image}}{% endcapture %}
      {% include shared/base_card.liquid title=pageInSection.title text=pageInSection.description linkHref=pageInSection.canonical_url imgUrl=imageURL linkText=pageInSection.title %}
    {% endfor %}
  </div>
</div>
