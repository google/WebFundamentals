---
layout: showcase
title: "Spotlights"
description: "Listing of all spotlights."
id: spotlight
collection: showcase
published: true
---


<div class="page-header">
  <div class="container">
    {% include modules/breadcrumbs.liquid %}
    <header class="clear">
      <h3 class="xxlarge">Spotlights</h3>
      <div class="divider">
        <span class="themed divider-icon"></span>
      </div>
      <p class="page-header__excerpt g-medium--2 g-wide--3 g--centered">Sites and apps we love, regardless of their mainstream success. Always pushing the web forward. Click through for interviews with the developers and pro/cons.</p>

      <p class="page-header__excerpt g-medium--2 g-wide--3 g--centered">
        {% for tag in site.data['tags'] %}
          <a href="{{site.baseurl}}/showcase/spotlight/tags/{{tag}}">#{{tag}}</a>
        {% endfor %}
      </p>

      <p class="page-header__excerpt g-medium--2 g-wide--3 g--centered"><a href="https://docs.google.com/forms/d/1928U45GIS1-Opi7SG-FczCwRkwnTbXDzF2X5Pe6Q6gU/viewform?usp=send_form" class="button--secondary">Have an idea for a spotlight? Let us know!</a></p>
    </header>
  </div>
</div>

{% assign spotlights = page.articles.spotlight | sort: 'date' | reverse  %}

<div class="container spotlight-listing">

  <div class="related-items clear">
    <div class="related-items__section clear">

      <ul class="related-items-list spotlight-list list-reset">

        {% for spotlight in spotlights %}

          <li class="g-medium--1 g-wide--1{% cycle 'all-case-spotlights': '', '','', ' g-medium--last g-wide--last' %}">
            <a href="{{site.baseurl}}{{spotlight.url | canonicalize}}">
              <img src="{{site.baseurl}}/showcase/spotlight/images/{{ spotlight.id }}/screenshot-small.png" alt="{{spotlight.title}}">
              <p class="medium">{{spotlight.title}}</p>
              <p class="color--text">{{spotlight.description}}</p>
            </a>
          </li>

        {% endfor %}

      </ul>

    </div>
  </div>

</div>

{% include cc.liquid %}
