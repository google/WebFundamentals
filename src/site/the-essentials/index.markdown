---
layout: listing
title: "The Essentials"
description: ""
introduction: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
---

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
