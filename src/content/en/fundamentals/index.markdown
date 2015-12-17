---
layout: shared/wide
description: "Web Fundamentals is a comprehensive resource for multi-device web development."
title: Web Fundamentals
translation_priority: 0
---

<div class="wf-subheading wf-fundamentals-landing">
  <div class="page-content">
    {% include svgs/fundamentals.svg %}
    <p class="mdl-typography--font-thin">

      Web<b>Fundamentals</b> is a comprehensive resource for web development
      best practices, designed to help you add the right features
      and experiences to your web project. If you’re new to web development
      or just looking to make your project better, we’ve got you covered.
    </p>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div class="page-content mdl-grid wf-fundamentals-cta">

  {% include shared/base_card.liquid title="Progressive Web Apps" text="What is a <b>Progressive Web App</b> and what do you need to know to get started building one?" linkHref="/web/progressive-web-apps" linkText="Learn more" imgUrl="/web/fundamentals/imgs/vm-pwa.png" %}

  {% include shared/base_card.liquid title="Get started" text="Not sure where to start? Our getting started guides will walk you through some key things you need to know and help you figure out where to go next." linkHref="/web/fundamentals/getting-started/" linkText="Get Started" imgUrl="/web/fundamentals/imgs/wsk-on-pixel-n5.jpg" %}

</div>

<div class="wf-secondaryheading">
  <div class="page-content">
    <h3>Ready, set, code!</h3>
    <p>
      Already have something in mind? Then jump right in!
    </p>
    <div class="mdl-grid mdl-typography--text-center wf-fundamentals-areas">
      {% for pageInSection in page.context.subdirectories %}
      {% if pageInSection.index.published != false %}
      {% if pageInSection.id != 'getting-started' and pageInSection.id != 'primers' %}
      {% capture icon %}svgs/{{pageInSection.id}}.svg{% endcapture %}
        <div class="mdl-cell mdl-cell--4-col">
          <div class="icon">
            <a href="{{pageInSection.index.canonical_url }}">
              {% include {{icon}} %}
            </a>
          </div>
          <h3>
            <a href="{{pageInSection.index.canonical_url }}">
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
</div>
