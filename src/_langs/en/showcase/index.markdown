---
id: showcase
layout: showcase
collection: web
title: "Showcases"
description: ""
published: true
feedName: Google Developers - Web Showcase
feedPath: showcase/feed.xml
---
{% comment %}
NOTE: the spotlight header required a modifier to render properly
      If the image in the spotlight-header div is a portrait image
      make sure to add 'spotlight-header--portrait'.
      If the image is landscape, make sure you add 'spotlight-header--landscape'
{% endcomment %}

{% assign caseStudies = page.articles.case-study | sort: 'date' | reverse  %}
{% assign spotlights = page.articles.spotlight | sort: 'date' | reverse  %}

<header class="spotlight-header spotlight-header-main spotlight-header--portrait clear">
  <div class="spotlight-header__container container">
    <div class="spotlight-header__copy g--half">
      <div class="spotlight-explainer" style="margin-top: 52px;">
        Every month, we talk with the engineering team behind a successful mobile web offering to share with you what worked, what didn't and how you can follow their footsteps.
      </div> 
      <div class="divider divider--fluid">
        <span class="divider-icon divider-icon--secondary"></span>
      </div>
      <h2 class="xlarge">
        <strong class="subsection-number">{{caseStudies[0].article.written_on | date:"%B" }} case study</strong>
        {{caseStudies[0].title}}
      </h2>
      <p>{{caseStudies[0].introduction}}</p>
      <a href="{{site.baseurl}}{{caseStudies[0].url | canonicalize}}" class="spotlight-header__cta cta--primary">Read the case study</a>
    </div>
    <div class="spotlight-header__media g--half g--last">
      <img src="{{site.baseurl}}/showcase/case-study/images/{{ caseStudies[0].id }}/device-portrait.png" class="spotlight-header__image">
    </div>
  </div>
</header>

<div class="latest-spotlights">
  <div class="container clear">
    <h2 class="xlarge">Also noteworthy</h2>
    <div class="clear">
      <p class="g--half">Sites and apps we love, regardless of their mainstream success. Always pushing the web forward.</p>
      <p class="g--half g--last latest-spotlights-all"><a href="{{site.baseurl}}/showcase/spotlight/" class="cta--primary">All spotlights</a></p>
    </div>

    <ul class="latest-spotlights__list list-reset">

      {% for spotlight in spotlights limit:2 %}

      <li class="latest-spotlights__item">
        <a href="{{site.baseurl}}{{spotlight.url | canonicalize}}" class="latest-spotlights__link">
          <img src="{{site.baseurl}}/showcase/spotlight/images/{{ spotlight.id }}/screenshot-small.png" alt="Screenshot of {{spotlight.title}}">
          <p class="small">Spotlight</p>
        </a>
        <div class="latest-spotlights__description">
          <h3>{{spotlight.title}}</h3>
          <p>{{spotlight.introduction}}</p>
          <a href="{{site.baseurl}}{{spotlight.url | canonicalize}}" class="cta--primary">View Spotlight</a>
        </div>
      </li>

      {% endfor %}

    </ul>
    
  </div>
</div>

<!--
<div class="featured-section case-study-previous">
  <div class="container">

  <h2>Previous case studies</h2>

  <div class="clear case-study-previous__desc">
    <p class="g--half">Every case study is unique and includes new learnings. Check out the latest, or browse through all of them.</p>
    <p class="g--half g--last"><a href="{{site.baseurl}}/showcase/case-study/" class="cta--primary">All case studies</a></p>    
  </div>


    <ul>

      {% for caseStudy in caseStudies limit:2 offset:1 %}

        <li class="featured-list__item clear">
          <div class="container-small">
            <div class="featured-list__content g--half">
              <h3 class="xlarge">
                <strong class="subsection-number">{{caseStudy.article.written_on | date:"%B" }} case study</strong>
                {{caseStudy.title}}
              </h3>
              <p>{{caseStudy.introduction}}</p>
              <a href="{{site.baseurl}}{{caseStudy.url | canonicalize}}" class="cta--primary">Read the case study</a>
            </div>
            <figure class="featured-list__img-wrapper g--half g--last">
              <img src="{{site.baseurl}}/showcase/case-study/images/{{ caseStudy.id }}/thumbnail-medium.jpg" alt="{{caseStudy.title}}">
            </figure>
          </div>
        </li>

        {% unless forloop.last %}
          <div class="divider divider--fluid divider--spaced">
            <span class="divider-icon divider-icon--secondary"></span>
          </div>
        {% endunless %}

      {% endfor %}

    </ul>

    
  </div>
</div>
-->

{% include modules/more_casestudies.liquid %}