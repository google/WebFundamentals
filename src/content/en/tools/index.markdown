---
layout: shared/wide
description: "Web Developer Tools provides a set of instructions and tools to help you build your website."
title: Tools
translation_priority: 0
---

<div class="wf-subheading">
  <div class="page-content">
    <h2>Get productive</h2>
    <p>Discover our tools and kickstart your development.</p>
  </div>
</div>

<div class="page-content">
  <h2>Guides</h2>
  <p>When you first start developing for the web, you can get going with a basic text editor and a browser to view everything in.</p>
  <p>As your experience grows, so will the range of tools you'll use on a regular basis. In these guides, we'll walk through the tools
  that will make you more productive, make development easier and help fix bugs and problems.</p>

  <div class="mdl-grid">
  {% for subdirectory in page.context.subdirectories %}
    {% if subdirectory.subdirectories.size > 0 %}
    <div class="mdl-cell mdl-cell--6-col wf-tools-guide">
      <h5 class="wf-tools-guide__title"><a href="{{subdirectory.index.relative_url}}">{{subdirectory.index.title}}</a></h5>
      <p class="wf-tools-guide__description">{{subdirectory.index.description}}</p>
      {% if subdirectory.subdirectories %}
          {% for sub in subdirectory.subdirectories %}
            <p class="wf-tools-guide__section-link"><a href="{{sub.index.relative_url}}">{{sub.index.title}}</a></p>
          {% endfor %}
      {% endif %}
    </div>
    {% endif %}
  {% endfor %}
  </div>
</div>

<div class="page-content mdl-grid">
  <h2>Projects at Google</h2>
  <p>There are a number of tools and projects being worked on at Google that you may find useful, find everything you need to know with these links.</p>

  {% include shows/card.liquid title="" text="<strong>Chrome Devtools:</strong> Our web authoring and debugging tools built into Google Chrome." linkHref="/web/tools/chrome-devtools" linkText="Learn More" imgUrl="imgs/chrome-devtools.jpg" %}

  {% include shows/card.liquid title="" text="<strong>Web Starter Kit:</strong> Let us do the bootstrapping, and you focus on what you'd like to build." linkHref="/web/tools/starter-kit/" linkText="Learn More" imgUrl="/web/tools/starter-kit/images/thumb.jpg" %}

  {% include shows/card.liquid title="" text="<strong>Polymer Starter Kit:</strong> An opinionated starting point for building Polymer 1.0 web apps that work great across different devices." linkHref="/web/tools/polymer-starter-kit/" linkText="Learn More" imgUrl="/web/tools/polymer-starter-kit/thumb.jpg" %}

  {% include shows/card.liquid title="" text="<strong>Material Design Lite:</strong> A light-weight implementation of Material Design, targeted at legacy browsers and static content sites." linkHref="http://www.getmdl.io/" linkText="Learn More" imgUrl="imgs/mdl-thumb.png" %}

  {% include shows/card.liquid title="" text="<strong>Polymer:</strong> Polymer makes it easier than ever to make fast, beautiful, and interoperable web components." linkHref="https://www.polymer-project.org" linkText="Learn More" imgUrl="/web/tools/polymer-starter-kit/thumb_polymer.jpg" %}
</div>

{% if page.articles.updates %}
  <!-- TODO -->
  <h2><a href="/web/updates/tools/tip">Tips &amp; Tricks</a></h2>
  {% include modules/latest_updates.liquid limit=2 product="tools" type="tip" details="false" headingontop="true" %}
{% endif %}
