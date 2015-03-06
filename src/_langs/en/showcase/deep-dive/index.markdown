---
layout: showcase
title: "All deep-dives"
description: "Listing of all technical deep-dives."
id: deep-dive
collection: showcase
published: true
---


<div class="page-header">
  <div class="container">
    {% include modules/breadcrumbs.liquid %}
    <header class="clear">
      <h3 class="xxlarge">All deep dives</h3>
      <div class="divider">
        <span class="themed divider-icon"></span>
      </div>
      <p class="page-header__excerpt g-medium--2 g-wide--3 g--centered">Technical deep-dives on amazing Chrome Experiments and the best outlook into the future the web has to offer.</p>

      <p class="page-header__excerpt g-medium--2 g-wide--3 g--centered">
        {% for tag in site.data['tags'] %}
          <a href="{{site.baseurl}}/showcase/deep-dive/tags/{{tag}}">#{{tag}}</a>
        {% endfor %}
      </p>
    </header>
  </div>
</div>

{% assign deepdives = page.articles.deep-dive | sort: 'date' | reverse  %}

<div class="container spotlight-listing">

  <div class="related-items clear">
    <div class="related-items__section clear">

      <ul class="related-items-list list-reset">

        {% for deepdive in deepdives %}

          <li class="g-medium--1 g-wide--1{% cycle 'all-case-spotlights': '', '', ' g-medium--last g-wide--last' %}">
            <a href="{{site.baseurl}}{{deepdive.url | canonicalize}}">
              <img src="{{site.baseurl}}/showcase/deep-dive/images/{{ deepdive.id }}/screenshot-small.png" alt="{{deepdive.title}}">
              <p class="medium">{{deepdive.title}}</p>
            </a>
          </li>

        {% endfor %}

      </ul>

    </div>
  </div>

</div>

{% include cc.liquid %}
