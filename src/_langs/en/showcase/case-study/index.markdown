---
layout: showcase
collection: showcase
id: case-study
published: true

title: "Case studies"
description: "All case studies."

showcase:
  written_on: 2014-01-01
  updated_on: 2014-02-02
---

<div class="page-header">
  <div class="container">
    {% include modules/breadcrumbs.liquid %}
    <header class="clear">
      <h3 class="xxlarge">Case studies</h3>
      <div class="divider">
        <span class="themed divider-icon"></span>
      </div>
      <p class="page-header__excerpt g-medium--2 g-wide--3 g--centered">Every so often, we talk with the engineering team behind a successful mobile web offering to share with you what worked, what didn't and how you can follow their footsteps.</p>

      <p><a href="https://docs.google.com/forms/d/1928U45GIS1-Opi7SG-FczCwRkwnTbXDzF2X5Pe6Q6gU/viewform?usp=send_form" class="button--secondary">Have an idea for a case study? Let us know!</a></p>
    </header>
  </div>
</div>

<div class="featured-section">
  <div class="container-medium">

    <ul>

      {% assign caseStudies = page.articles.case-study | sort: 'date' | reverse  %}
      {% for caseStudy in caseStudies %}

        <li class="featured-list__item clear">
          <div class="container-small">
            <div class="featured-list__content g--half">
              <h3 class="xlarge">
                <strong class="subsection-number">{{caseStudy.title }}</strong>
                {{caseStudy.subtitle}}
              </h3>
              <p>{{caseStudy.description}}</p>
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

{% include cc.liquid %}