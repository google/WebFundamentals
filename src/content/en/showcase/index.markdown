---
layout: shared/narrow
title: "Spotlights"
description: "Listing of all spotlights."
---

<ul>
  {% for pageInSection in page.context.pages %}
    <li class="wf-section-toc__list-item">
      <p class="wf-section-toc__guide-title">
        <a href="{{pageInSection.canonical_url | localize_link:pageInSection }}">
          {{pageInSection.title}}
        </a>
      </p>
    </li>
  {% endfor %}
</ul>

