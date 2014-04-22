---
layout: default
title: "The Essentials"
description: ""
---


<div class="page-header">
  <div class="container">
    <nav class="breadcrumbs">
      <p> / <a href="#" class="breadcrumbs__link"> The Essentials</a></p>
    </nav>
    <h3 class="xxlarge">{{ page.title }}</h3>
    <p class="page-header__excerpt g-wide--push-1 g-wide--pull-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, optio, ad, voluptates repudiandae at excepturi error delectus explicabo nulla eum provident quibusdam ipsum sapiente culpa sequi quia unde fuga id.</p>
  </div>
</div>



<div class="guides-section">
  <header class="container">
      <h2 class="xlarge">Guides Section</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae varius augue, eu varius dolor.</p>
  </header>

  <ul class="guides-list container-medium">

    {% for guide in page.articles.the-essentials %}
    <li class="guides-list__item g--half {% cycle '', 'g--last' %}">
      <h3 class="xlarge"><a href="{{site.baseurl}}{{guide.url}}">{{guide.title}}</a></h3>
      <p>{{guide.description}}</p>
      <ol class="list--links list--reset">
        <li><a href="#">Layout basics</a></li>
        <li><a href="#">Basics layouts</a></li>
        <li><a href="#">Layout patterns</a></li>
      </ol>
    </li>

    {% endfor %}

  </ul>
</div>
