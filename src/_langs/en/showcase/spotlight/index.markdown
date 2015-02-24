---
layout: showcase
title: "All spotlights"
description: "Listing of all spotlights."
id: spotlight
collection: showcase
published: true
---


<div class="page-header">
  <div class="container">
    {% comment %}{% include modules/breadcrumbs.liquid %}{% endcomment %}
    <header class="clear">
      <h3 class="xxlarge">All spotlights</h3>
      <div class="divider">
        <span class="themed divider-icon"></span>
      </div>
      <p class="page-header__excerpt g-medium--2 g-wide--3 g--centered">Sites and apps we love, regardless of their mainstream success. Always pushing the web forward.</p>

      <p class="page-header__excerpt g-medium--2 g-wide--3 g--centered">
        {% for tag in site.data['tags'] %}
          <a href="{{site.baseurl}}/showcase/spotlight/tags/{{tag}}">#{{tag}}</a>
        {% endfor %}
      </p>
    </header>
  </div>
</div>

{% assign spotlights = page.articles.spotlight | sort: 'date' | reverse  %}

<div class="container spotlight-listing">

  <div class="related-items clear">
    <div class="related-items__section clear">

      <ul class="related-items-list list-reset">

        {% for spotlight in spotlights %}

          <li class="g-medium--1 g-wide--1{% cycle 'all-case-spotlights': '', '', ' g-medium--last g-wide--last' %}">
            <a href="{{site.baseurl}}{{spotlight.url | canonicalize}}">
              <img src="{{site.baseurl}}/showcase/spotlight/images/{{ spotlight.id }}/screenshot-small.png" alt="{{spotlight.title}}">
              <p class="medium">{{spotlight.title}}</p>
            </a>
          </li>

        {% endfor %}

      </ul>

    </div>
  </div>

</div>

{% include cc.liquid %}
