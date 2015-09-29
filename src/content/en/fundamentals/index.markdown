---
layout: shared/wide
description: "Web Fundamentals is a comprehensive resource for multi-device web development."
title: Web Fundamentals
translation_priority: 0
---

<div class="wf-subheading">
  <div class="page-content">
    <h2>Web<b>Fundamentals</b></h2>
    <p>
      Best practices for great multi-device web experiences.
    </p>
  </div>
</div>

<div class="page-content mdl-grid">
  {% include shared/base_card.liquid text="intro about how to get started" linkHref="guides/getting-started" linkText="Get Started" %}
  {% include shared/base_card.liquid title="Simplify app installs" text="blah blah blah blah blah blah blah" linkHref="engage-and-retain/simplified-app-installs/" linkText="Learn more" %}
</div>

<div class="page-content">
  <h3>Ready, set, code!</h3>
  <div class="mdl-grid mdl-typography--text-center">
    {% for pageInSection in page.context.subdirectories %}
    {% if pageInSection.index.published != false %}
    {% if pageInSection.id != 'guides' and pageInSection.id != 'primers' %}
    {% capture icon %}svgs/{{pageInSection.id}}.svg{% endcapture %}
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
