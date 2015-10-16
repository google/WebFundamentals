---
layout: shared/wide
description: "Web Landing"
title: "Web @ Google Developers"
---
{% for section in page.context.subdirectories %}
  {% if section.id == 'fundamentals' %}
    {% assign fundamentals = section %}
  {% elsif section.id == 'tools' %}
    {% assign tools = section %}
  {% elsif section.id == 'updates' %}
    {% assign updates = section %}
  {% endif %}
{% endfor %}

<div class="wf-subheading">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col wf-showcase__title">
      <h2>Next Generation Web</h2>
      <p class="mdl-typography--font-light">
        The average user visits 100+ sites per month on the mobile web - how will you be discovered?
      </p>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <img src="/web/imgs/landing-devices.png">
    </div>
  </div>
</div>

<div class="">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col">
      <h3>Web Fundamentals</h3>
      <p>
        Not sure where to start? Our getting started guides will walk you through the key things you need to know and help you figure out where to go next.
      </p>
      <a href="/web/fundamentals/getting-started/">Get started</a>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <img src="/web/imgs/dgc-web-w1x.jpg">
    </div>
  </div>
</div>

<style>
  .tools-thumb {
    width: 175px;
  }
</style>

<div class="wf-secondaryheading">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col">
      <a href="#"><img class="tools-thumb" src="/web/tools/imgs/chrome-devtools.png"></a>
      <a href="#"><img class="tools-thumb" src="/web/tools/starter-kit/images/thumb.jpg"></a>
      <a href="#"><img class="tools-thumb" src="/web/tools/polymer-starter-kit/thumb.jpg"></a>
      <a href="#"><img class="tools-thumb" src="/web/tools/imgs/mdl-thumb.png"></a>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <h3>Get Productive</h3>
      <p>Discover our tools and kickstart your development</p>
      <ul>
        <li><a href="/web/tools/devtools/">Chrome Dev Tools</a></li>
        <li><a href="/web/tools/devtools/">Web Starter Kit</a></li>
        <li><a href="/web/tools/devtools/">Polymer Start Kit</a></li>
        <li><a href="/web/tools/devtools/">Material Design Lite</a></li>
      </ul>
    </div>
  </div>
</div>

<div class="">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col">
      <h3>What's new?</h3>
      <p>
        Discover the latest API’s coming to the Web Platform, find out what the Chrome team are working on and check out the latest features in DevTools.
      </p>
      <ul>
        <li><a href="#">Push notifications</a></li>
        <li><a href="#">Add to home screen</a></li>
        <li><a href="#">More updates</a></li>
      </ul>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <img src="/web/imgs/dgc-web-w1x.jpg">
    </div>
  </div>
</div>

<div class="wf-secondaryheading">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col">
      <img src="https://placehold.it/350x225">
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <h3>Success stories</h3>
      <p>
        See how our partners, from publishing to ecommerce, drive discovery and re-engagement with a rich web experience. More traffic and users means more revenue for your business.
      </p>
      <a href="#">Showcase</a>
    </div>
  </div>
</div>

<div class="">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--4-col">
      <h4>Performance</h4>
      <img src="https://placehold.it/150x150">
      <p>The rail performance model</p>
      <a href="#">Learn more</a>
    </div>
    <div class="mdl-cell mdl-cell--4-col">
      <h4>Security</h4>
      <img src="https://placehold.it/150x150">
      <p>Keep your users safe with HTTPS</p>
      <a href="#">Learn more</a>
    </div>
    <div class="mdl-cell mdl-cell--4-col">
      <h4>Shows</h4>
      <img src="https://placehold.it/150x150">
      <p>Google web engineers discuss how they build web apps</p>
      <a href="#">Learn more</a>
    </div>

    <div class="mdl-cell mdl-cell--4-col">
      <a href="#">
        <img src="https://placehold.it/100x100">
        <h5>Blog</h5>
        <p>Find out the latest on Chrome</p>
      </a>
    </div>
    <div class="mdl-cell mdl-cell--4-col">
      <a href="#">
        <img src="https://placehold.it/100x100">
        <h5>Goolge Webmasters</h5>
        <p>Follow us for tips, Q&A and webinars</p>
      </a>
    </div>
    <div class="mdl-cell mdl-cell--4-col">
      <a href="#">
        <img src="https://placehold.it/100x100">
        <h5>Videos</h5>
        <p>Watch videos and talks</p>
      </a>
    </div>
  </div>
</div>
