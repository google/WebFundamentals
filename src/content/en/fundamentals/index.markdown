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

  {% include shared/base_card.liquid text="What is a <b>Progressive Web App</b> and what do you need to know to get started building one? In this step-by-step guide, you'll build your own Progressive Web App and learn the fundamentals needed for building Progressive Web Apps." linkHref="/web/fundamentals/getting-started/your-first-progressive-web-app/" linkText="Get Started" imgUrl="/web/fundamentals/imgs/vm-pwa.png" %}

  {% include shared/base_card.liquid text="Learn how to add <b>Push Notifications</b> to your web applications to re-engage users with breaking news and information about new content." linkHref="/web/fundamentals/getting-started/push-notifications/" linkText="Learn More" imgUrl="/web/fundamentals/imgs/notif-example.png" %}

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
