---
layout: default
title: "All spotlights tagged #reader"
description: "Listing of all spotlights tagged #reader."
collection: showcase
published: true
---

{% assign spotlights = page.articles.spotlight | sort: 'date' | reverse  %}

<div class="page-header">
  <div class="container">
    <!-- TODO: Find out why acenstors are not working and bring in breadcrumbs again- -->
    <header class="clear">
      <h3 class="xxlarge">All spotlights tagged #reader</h3>
      <div class="divider">
        <span class="themed divider-icon"></span>
      </div>
    </header>
  </div>
</div>

<div class="container spotlight-listing">

  <div class="related-items clear">
    <div class="related-items__section clear">

      <ul class="related-items-list list-reset">

        {% for spotlight in spotlights %}

          {% for tag in spotlight.tags %}
            {% if tag == 'reader' %}
              <li class="g-medium--1 g-wide--1{% cycle 'all-case-spotlights': '', '', ' g-medium--last g-wide--last' %}">
                <a href="{{site.baseurl}}{{spotlight.url | canonicalize}}">
                  <img src="{{site.baseurl}}/fundamentals/showcase/spotlight/images/{{ spotlight.id }}/screenshot-small.jpg" alt="{{spotlight.title}}">
                  <p class="medium">{{spotlight.title}}</p>
                </a>
              </li>
            {% endif %}
          {% endfor %}

        {% endfor %}

      </ul>

    </div>
  </div>

</div>

{% include cc.liquid %}
