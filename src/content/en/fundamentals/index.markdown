---
layout: shared/wide
description: "Web Fundamentals is a comprehensive resource for multi-device web development."
title: Web Fundamentals
translation_priority: 0
---

<div class="wf-subheading">
  <div class="page-content">
    <h2>Web<b>Fundamentals</b></h2>
    <p class="mdl-typography--font-thin">
      Web<b>Fundamentals</b> is a comprehensive resource for best practices
      web development, designed to help you add the right the right features
      and experiences to your web project. If you’re new to web development
      or just looking to make your project better, we’ve got you covered.
    </p>
  </div>
</div>

<div class="page-content mdl-grid">
  {% include shared/base_card.liquid title="Get started" text="Not sure where to start? Our getting started guides will walk you through some key things you need to know and help you figure out where to go next." linkHref="getting-started" linkText="Get Started" %}

  {% include shared/base_card.liquid title="What's new:<br>App install banners" text="<b>App Install Banners</b> give you the ability to have your users quickly and seamlessly add your web app to their home screen, or install your native app, without ever leaving the browser." linkHref="engage-and-retain/simplified-app-installs/" linkText="Learn more" %}
</div>

<div class="page-content">
  <h3>Ready, set, code!</h3>
  <p>
    Already have something in mind, then jump right in!
  </p>
  <div class="mdl-grid mdl-typography--text-center">
    {% for pageInSection in page.context.subdirectories %}
    {% if pageInSection.index.published != false %}
    {% if pageInSection.id != 'guides' and pageInSection.id != 'primers' %}
    {% capture icon %}svgs-minified/{{pageInSection.id}}.svg{% endcapture %}
      <div class="mdl-cell mdl-cell--4-col">
        <div class="icon">
          <a href="{{pageInSection.index.canonical_url | localize_link:pageInSection }}">
            {% include {{icon}} %}
          </a>
        </div>
        <h3>
          <a href="{{pageInSection.index.canonical_url | localize_link:pageInSection }}">
          {{pageInSection.index.title}}
          </a>
        </h3>
        <p>{{pageInSection.index.description}}</p>
      </div>
    {% endif %}
    {% endif %}
    {% endfor %}
  </div>
</div>
