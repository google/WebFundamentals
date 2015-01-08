---
layout: default
title: "All spotlights"
description: "Listing of all spotlights."
id: spotlight
collection: showcase
---

<div class="page-header">
  <div class="container">
    {% include modules/breadcrumbs.liquid %}
    <header class="clear">
      <h3 class="xxlarge">All spotlights</h3>
      <div class="divider">
        <span class="themed divider-icon"></span>
      </div>
      <p class="page-header__excerpt g-medium--2 g-wide--3 g--centered">Don't assume your users prefer one device over another. Provide a great experience no matter what device they choose. Main goal for responsive web design: create sites, apps, and experiences that scale well across all devices.</p>
    </header>
  </div>
</div>

<div class="container spotlight-listing">

      {% for spotlight in page.articles %}
        <p>{{spotlight | first}}</p>
      {% endfor %}

  <div class="related-items clear">
    <div class="related-items__section clear">

      <ul class="related-items-list list-reset">



        <li class="g-medium--1 g-wide--1 theme--multi-device-layouts">
          <a href="#">
            <img src="http://40.media.tumblr.com/a77ae878c17cc666d898f86b724f9d08/tumblr_ngumxeiVx61tk03rro1_1280.png" alt="Case study name">
            <p class="medium">Guides title which goes over two lines</p>
          </a>
        </li>
        <li class="g-medium--1 g-wide--1 theme--multi-device-layouts">
          <a href="#">
            <img src="../../imgs/placeholder--small.png" alt="Case study name">
            <p class="medium">Guides title which goes over two lines</p>
          </a>
        </li>
        <li class="g-medium--1 g-wide--1 theme--introduction-to-media">
          <a href="#">
            <img src="../../imgs/placeholder--small.png" alt="Case study name">
            <p class="medium">Guides completely device agnostic site created for the this website</p>
          </a>
        </li>
        <li class="g-medium--1 g-medium--last g-wide--1 g-wide--last theme--performance">
          <a href="#">
            <img src="../../imgs/placeholder--small.png" alt="Case study name">
            <p class="medium">Guides new, completely device agnostic site created for the this website</p>
          </a>
        </li>
        <li class="g-medium--1 g-wide--1 theme--multi-device-layouts">
          <a href="#">
            <img src="../../imgs/placeholder--small.png" alt="Case study name">
            <p class="medium">Guides title which goes over two lines</p>
          </a>
        </li>
        <li class="g-medium--1 g-wide--1 theme--introduction-to-media">
          <a href="#">
            <img src="../../imgs/placeholder--small.png" alt="Case study name">
            <p class="medium">Guides completely device agnostic site created for the this website</p>
          </a>
        </li>
        <li class="g-medium--1 g-wide--1 theme--introduction-to-media">
          <a href="#">
            <img src="../../imgs/placeholder--small.png" alt="Case study name">
            <p class="medium">Guides completely device agnostic site created for the this website</p>
          </a>
        </li>
        <li class="g-medium--1 g-medium--last g-wide--1 g-wide--last theme--performance">
          <a href="#">
            <img src="../../imgs/placeholder--small.png" alt="Case study name">
            <p class="medium">Guides new, completely device agnostic site created for the this website</p>
          </a>
        </li>
      </ul>

    </div>
  </div>

</div>

{% include cc.liquid %}
