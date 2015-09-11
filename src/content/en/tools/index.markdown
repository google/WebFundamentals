---
layout: shared/plain
description: "Web Developer Tools provides a set of instructions and tools to help you build your website."
title: Google Web Tools
translation_priority: 0
---

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <h2>Get productive</h2>
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <p>Discover our tools and kickstart your development.</p>
    <p><a class="mdl-button mdl-js-button mdl-button--raised" href="/web/updates/tools/">What's New</a></p>
  </div>
</div>

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--1-col">
  </div>
  <div class="mdl-cell mdl-cell--2-col">
    <a href="/web/tools/chrome-devtools">
      <img src="imgs/chrome-devtools.jpg" alt="DevTools">
    </a>
    <div>
      <a href="/web/tools/chrome-devtools"><h5>Chrome DevTools</h5></a>
      <p>Our web authoring and debugging tools built into Google Chrome.</p>
    </div>
  </div>
  <div class="mdl-cell mdl-cell--2-col">
    <a href="/web/tools/starter-kit/">
      <img src="/web/tools/starter-kit/images/thumb.jpg" alt="Web Starter Kit">
    </a>
    <div>
      <a href="/web/tools/starter-kit/"><h5>Web Starter Kit</h5></a>
      <p>Let us do the bootstrapping, and you focus on what you'd like to build.</p>
    </div>
  </div>
  <div class="mdl-cell mdl-cell--2-col">
    <a href="/web/tools/polymer-starter-kit/">
      <img src="/web/tools/polymer-starter-kit/thumb.jpg" alt="Polymer Starter Kit">
    </a>
    <div>
      <a href="/web/tools/polymer-starter-kit/"><h5>Polymer Starter Kit</h5></a>
      <p>An opinionated starting point for building Polymer 1.0 web apps that
      work great across different devices.</p>
    </div>
  </div>
  <div class="mdl-cell mdl-cell--2-col">
    <a href="http://www.getmdl.io/">
      <img src="imgs/mdl-thumb.png" alt="Material Design Lite">
    </a>
    <div>
      <a href="http://www.getmdl.io/"><h5>Material Design Lite</h5></a>
      <p>
        A light-weight implementation of Material Design, targeted at legacy
        browsers and static content sites.
      </p>            
    </div>
  </div>
  <div class="mdl-cell mdl-cell--2-col">
    <a href="https://www.polymer-project.org">
      <img src="/web/tools/polymer-starter-kit/thumb_polymer.jpg" alt="Polymer">
    </a>
    <div>
      <a href="https://www.polymer-project.org"><h5>Polymer</h5></a>
      <p>
        Polymer makes it easier than ever to make fast, beautiful, and interoperable web components.
      </p>
    </div>
  </div>
  <div class="mdl-cell mdl-cell--1-col">
</div>

<h2>Action-oriented guides</h2>
<ul>
{% for subdirectory in page.context.subdirectories %}
  <li>
    <h5><a href="{{subdirectory.index.relative_url}}">{{subdirectory.index.title}}</a></h5>
    {% if subdirectory.subdirectories %}
      <ul>
        {% for sub in subdirectory.subdirectories %}
          <li>
            <h6><a href="{{sub.index.relative_url}}">{{sub.index.title}}</a></h6>
            <p>{{sub.index.description}}</p>
            </li>
        {% endfor %}
      </ul>
    {% endif %}
  </li>
{% endfor %}
</ul>

{% if page.articles.updates %}
  <!-- TODO -->
  <h2><a href="/web/updates/tools/tip">Tips &amp; Tricks</a></h2>
  {% include modules/latest_updates.liquid limit=2 product="tools" type="tip" details="false" headingontop="true" %}
{% endif %}



