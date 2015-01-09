---
layout: default
title: "All spotlights"
description: "Listing of all spotlights."
id: spotlight
collection: showcase
published: true
---

<div class="page-header">
  <div class="container">
    {% include modules/breadcrumbs.liquid %}
    <header class="clear">
      <h3 class="xxlarge">All spotlights</h3>
      <div class="divider">
        <span class="themed divider-icon"></span>
      </div>
      <p class="page-header__excerpt g-medium--2 g-wide--3 g--centered">Sites and apps we love, regardless of their mainstream success. Always pushing the web forward.</p>
    </header>
  </div>
</div>

<div class="container spotlight-listing">

  {% assign spotlights = page.articles.spotlight | sort: 'date' | reverse  %}

  <div class="related-items clear">
    <div class="related-items__section clear">

      <ul class="related-items-list list-reset">

        {% for spotlight in spotlights %}

          <li class="g-medium--1 g-wide--1{% cycle 'all-case-spotlights': '', '', ' g-medium--last g-wide--last' %}">
            <a href="{{site.baseurl}}{{spotlight.url | canonicalize}}">
              <img src="{{site.baseurl}}/fundamentals/showcase/spotlight/images/{{ spotlight.id }}/screenshot-small.jpg" alt="{{spotlight.title}}">
              <p class="medium">{{spotlight.title}}</p>
            </a>
          </li>

        {% endfor %}

      </ul>

    </div>
  </div>

</div>

{% include cc.liquid %}
