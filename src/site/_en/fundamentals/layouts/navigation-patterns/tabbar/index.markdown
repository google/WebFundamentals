---
layout: article
title: "Tab Bar"
description: "A Tab Bar can be used as the main navigation for your site. It gives the user visibility of the main sections of your site as well as an easy way to identify where they are within your web app."
thumbnail: images/tabbar.png
article:
  written_on: 2014-01-01
  updated_on: 2014-09-19
  order: 2
authors:
  - mattgaunt
collection: navigation-patterns
introduction: "A Tab Bar can be used as the main navigation for your site. It gives the user visibility of the main sections of your site as well as an easy way to identify where they are within your web app."
key-takeaways:
  tabs:
    - Use only if your site has no more than five sections.
    - Position below or above your main content.
    - Make it clear to the user which section is currently selected.
---

{% wrap content%}

<div class="g-medium--2 g-medium--last g-wide--3">
  {% link_sample ../_code/tabbar-sample1.html %}
    <img src="images/tabbar.png">
  {% endlink_sample %}

  <div style="text-align:center;">
    {% link_sample_button ../_code/tabbar-sample1.html %}
      Demo
    {% endlink_sample_button %}
  </div>
</div>

<div style="clear: both;"></div>

The Tab Bar can be used to quickly switch between the sections of your site.

It's only appropriate for sites with a relatively small structure, but users find it easy to glance at where they are, and where they can go, within your site.

{% include modules/takeaway.liquid list=page.key-takeaways.tabs %}

Limit the total number of tabs to five or less, otherwise each icon and tap target becomes too small and users will struggle to hit the right tab.

Position your tabs above or below your main content, this is a trade off between what feels best to use and best suites your design.

One advantage to using tabs is that it gives the user a consistent place to go for navigation and makes it easy to glance at where they are within the site.

<div class="g-medium--2 g-medium--last g-wide--3">
  <div class="g--half">
    {% link_sample ../_code/tabbar-sample2.html %}
      <img src="images/tabbar-alt-1.png">
    {% endlink_sample %}
    <div style="text-align:center;">
      {% link_sample_button ../_code/tabbar-sample2.html %}
        Demo
      {% endlink_sample_button %}
    </div>
  </div>

  <div class="g--half g--last">
    {% link_sample ../_code/tabbar-sample3.html %}
      <img src="images/tabbar-alt-2.png">
    {% endlink_sample %}
    <div style="text-align:center;">
      {% link_sample_button ../_code/tabbar-sample3.html %}
        Demo
      {% endlink_sample_button %}
    </div>
  </div>
</div>

<div style="clear: both;"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
