---
layout: default
title: "Showcases"
description: ""
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
      <h2 class="huge">The Guardian</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, error cupiditate.</p>
      <a href="#" class="spotlight-header__cta cta--primary">View styleguide</a>
    </div>
    <div class="spotlight-header__media g--half g--last">
      <img src="../imgs/placeholder--device-portrait.png" class="spotlight-header__image">
      <!-- <img src="../imgs/placeholder--device-landscape.png" class="spotlight-header__image"> -->
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

<div class="container">
  <div class="related-items related-items--minimal clear">
    <h3 class="related-items__title g-wide--1 g-medium--full">More case studies</h3>
    <div class="related-items__section clear">

      <ul class="related-items-list list-reset">
        <li class="g-medium--1 g-wide--1 theme--multi-device-layouts">
          <a href="#">
            <img src="../imgs/placeholder--small.png" alt="Case study name">
            <p class="medium">Guides title which goes over two lines</p>
          </a>
        </li>
        <li class="g-medium--1 g-wide--1 theme--introduction-to-media">
          <a href="#">
            <img src="../imgs/placeholder--small.png" alt="Case study name">
            <p class="medium">Guides completely device agnostic site created for the this website</p>
          </a>
        </li>
        <li class="g-medium--1 g-medium--last g-wide--1 g-wide--last theme--performance">
          <a href="#">
            <img src="../imgs/placeholder--small.png" alt="Case study name">
            <p class="medium">Guides new, completely device agnostic site created for the this website</p>
          </a>
        </li>
      </ul>

    </div>
  </div>
</div>
