---
layout: section
title: "Multi-device layouts"
description: ""
introduction: 'Mobile-first web design is a goal for a development team to create sites, apps and experiences that scale well across all devices from mobile upwards. Many people conflate Mobile-first design with: "My users will predominantly use mobile" Instead Mobile-first design really means is "Mobile is my base experience". Mobile-first Web Design combines many techniques such as <a href="#">Responsive Web Design</a>, <a href="#">Progressive Enhancement</a> and <a href="#">Responsive Server</a> solutions to deliver experiences that work well across all form-factors.'
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 1
id: multi-device-layouts
collection: the-essentials
---

<div class="articles-section">
  <div class="container">
    <p class="articles-count">{{page.articles.multi-device-layouts.size}} guides</p>
    <ol class="articles-list">

      {% for guide in page.articles.multi-device-layouts %}
      <li class="articles-list__item">
        <h3 class="xxlarge"><a href="{{site.baseurl}}{{guide.url}}">{{guide.title}}</a></h3>
        <p class="g-wide--push-1 g-wide--pull-1">{{guide.description}}</p>
        <a href="#" class="cta--primary">See all lessons</a>
      </li>
      {% endfor %}

    </ol>
  </div>
</div>
