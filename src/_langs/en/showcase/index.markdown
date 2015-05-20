---
id: showcase
layout: showcase
collection: web
title: "Showcases"
description: ""
published: true
feedName: Web Showcase - Google Developers
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
{% assign combined = caseStudies | wfconcat: spotlights | sort: 'date' | reverse  %}


<p style="float: right; margin-top: -40px; margin-right: 20px;"><a href="https://services.google.com/fb/forms/webshowcase/" class="button--secondary">Have an idea for the showcase? Let us know!</a></p>

<header class="clear" style="margin-bottom: 60px; margin-top: 70px;">
  <div class="container">
    <h2 class="xxlarge">Get inspired.</h2>
    <div class="g--half">
      <p>
        Take a deep look at sites and web apps that have achieved success and learn from their mistakes, discoveries and technical advancements. Immerse yourself in <a href="{{site.baseurl}}/showcase/case-study/">case studies</a>, get inspired via lightweight <a href="{{site.baseurl}}/showcase/spotlight/">spotlights</a> and dive deep with technical deep dives.
      </p>
    </div>
  </div>
</header>

<div class="latest-spotlights">
  <div class="container clear">

  <div class="g--half">
    <h2 class="xlarge">
    <strong class="subsection-number">{{caseStudies[0].title }}</strong>
    {{caseStudies[0].subtitle}}
    </h2>
    <p>{{caseStudies[0].description}}</p>
    <a href="{{site.baseurl}}{{caseStudies[0].url | canonicalize}}" class="spotlight-header__cta cta--primary">Read the case study</a>    
  </div>

  <div class="spotlight-header__media g--half g--last" style="position: relative;">
    <img src="{{site.baseurl}}/showcase/case-study/images/{{ caseStudies[0].id }}/device-portrait.png" class="spotlight-header__image" style="top: -370px;">
  </div>

  </div>
</div>

<div class="showcase-listing-more">
  <a href="{{site.baseurl}}/showcase/case-study/" class="cta--primary">All case studies</a>
  <a href="{{site.baseurl}}/showcase/spotlight/" class="cta--primary">All spotlights</a>
  <a href="#" class="cta--primary disabled">All deep dives</a>
</div>

<div class="showcase-listing-list">
  <ul>

    {% for article in combined %}

      {% if article.collection == "case-study" %}

        <li class="clear showcase-listing-list-case-study">
          <div class="showcase-card clear">
            <div class="featured-list__content g--half">
              <h3 class="xlarge">
                <strong class="subsection-number">{{article.title }}</strong>
                <a href="{{site.baseurl}}{{article.url | canonicalize}}">{{article.subtitle}}</a>
              </h3>
              <p>{{article.description}}</p>
              <a href="{{site.baseurl}}{{article.url | canonicalize}}" class="cta--primary">View case-study</a>
            </div>
            <figure class="featured-list__img-wrapper g--half g--last">
              <a href="{{site.baseurl}}{{article.url | canonicalize}}"><img src="{{site.baseurl}}/showcase/case-study/images/{{ article.id }}/thumbnail-medium.jpg" alt="{{article.title}}"></a>
            </figure>
            <footer>

              {% if article.authors %}
              <div>
              {% for author in article.authors %}
              {% assign contributor = site.data["contributors"][author] %}
                  <a href="{{contributor.homepage}}" target="_blank" title="{{contributor.name.given}} {{contributor.name.family}}">
                    <span class="icon-circle" style="background-image: url({{site.url}}/imgs/contributors/{{author}}.jpg); background-size: contain;"></span>
                    {{contributor.name.given}} {{contributor.name.family}}
                  </a>
              {% endfor %}

              </div>
              {% endif %}

              <div>{{ article.article.written_on | date: '%B %d, %Y' }}</div>

              {% if article.tags %}
              <div class="tags">
                {% for tag in article.tags %}
                <span>{{tag}}</span>
                {% endfor %}
              </div>
              {% endif %}
            </footer>
          </div>
        </li>

      {% else %}

        <li class="clear half">
          <div class="showcase-card clear">
            <div class="featured-list__content g--half">
              <h3 class="xlarge">
                <strong class="subsection-number">In the spotlight</strong>
                <a href="{{site.baseurl}}{{article.url | canonicalize}}">{{article.title}}</a>
              </h3>
              <p>{{article.description}}</p>
              <a href="{{site.baseurl}}{{article.url | canonicalize}}" class="cta--primary">View spotlight</a>
            </div>
            <figure class="featured-list__img-wrapper g--half g--last">
              <a href="{{site.baseurl}}{{article.url | canonicalize}}" class="latest-spotlights__link">
                <img src="{{site.baseurl}}/showcase/spotlight/images/{{ article.id }}/screenshot-small.png" alt="Screenshot of {{article.title}}">
                <p class="small">Spotlight</p>
              </a>
            </figure>
            <footer>

              {% if article.authors %}
              <div>
              {% for author in article.authors %}
              {% assign contributor = site.data["contributors"][author] %}
                  <a href="{{contributor.homepage}}" target="_blank" title="{{contributor.name.given}} {{contributor.name.family}}">
                    <span class="icon-circle" style="background-image: url({{site.url}}/imgs/contributors/{{author}}.jpg); background-size: contain;"></span>
                    {{contributor.name.given}} {{contributor.name.family}}
                  </a>
              {% endfor %}

              </div>
              {% endif %}

              <div>{{ article.article.written_on | date: '%B %d, %Y' }}</div>

              {% if article.tags %}
              <div class="tags">
                {% for tag in article.tags %}
                <a href="{{site.baseurl}}/showcase/spotlight/tags/{{tag}}">#{{tag}}</a>
                {% endfor %}
              </div>
              {% endif %}
            </footer>
          </div>
        </li>

      {% endif %}

    {% endfor %}

  </ul>
</div>