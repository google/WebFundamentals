---
layout: default
title: "Showcases"
description: ""
class: case-study
related-guides:
  create-amazing-forms:
    -
      title: Create amazing forms
      href: input/form-input/
      thumbnail: ../imgs/placeholder--small.png
    -
      title: Label and name inputs correctly
      href: input/form-input/#label-and-name-inputs-properly
      thumbnail: ../imgs/placeholder--small.png
    -
      title: Choose the best input type
      href: input/form-input/#choose-the-best-input-type
      thumbnail: ../imgs/placeholder--small.png
---
{% comment %}
NOTE: the spotlight header required a modifier to render properly
      If the image in the spotlight-header div is a portrait image
      make sure to add 'spotlight-header--portrait'.
      If the image is landscape, make sure you add 'spotlight-header--landscape'
{% endcomment %}

<header class="spotlight-header spotlight-header--portrait clear">
  <div class="spotlight-header__container container">
    <div class="spotlight-header__copy g--half">
      <h2 class="huge">Some site</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, error cupiditate.</p>
      <a href="#" class="spotlight-header__cta cta--primary">View styleguide</a>
    </div>
    <div class="spotlight-header__media g--half g--last">
      <img src="../imgs/placeholder--device-portrait.png" class="spotlight-header__image">
    </div>
  </div>
</header>

<div class="latest-spotlights">
  <div class="container clear">
    <h2>Latest spotlights</h2>
    <ul class="latest-spotlights__list list-reset">
      <li class="latest-spotlights__item">
        <a href="#" class="latest-spotlights__link">
          <img src="../imgs/image-example.jpg" alt="image example">
          <p class="small">Spotlight name</p>
        </a>
      </li>
      <li class="latest-spotlights__item">
        <a href="#" class="latest-spotlights__link">
          <img src="../imgs/image-example-2.jpg" alt="image example">
          <p class="small">Spotlight name</p>
        </a>
      </li>
      <li class="latest-spotlights__item">
        <a href="#" class="latest-spotlights__link">
          <img src="../imgs/image-example-3.jpg" alt="image example">
          <p class="small">Spotlight name</p>
        </a>
      </li>
      <li class="latest-spotlights__item">
        <a href="#" class="latest-spotlights__link">
          <img src="../imgs/image-example-4.jpg" alt="image example">
          <p class="small">Spotlight name</p>
        </a>
      </li>
    </ul>
  </div>
</div>

{% include modules/related_guides.liquid list=page.related-guides.create-amazing-forms minimal=true %}
