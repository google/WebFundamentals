---
layout: article
title: "Navigation Drawer"
description: "For sites with a larger number of sections and subsections the Navigation Drawer is a much better fit. It can be a scrollable off-canvas element to your site as well as be a common place for global state."
thumbnail: images/navdrawer.png
article:
  written_on: 2014-01-01
  updated_on: 2014-09-19
  order: 3
authors:
  - mattgaunt
collection: navigation-patterns
introduction: "For sites with a larger number of sections and subsections the Navigation Drawer is a much better fit. It can be a scrollable off-canvas element to your site as well as be a common place for global state."
key-takeaways:
  navigation-drawer:
    - Your Navigation Drawer should be easily accessible to the user.
    - If the number of sections is too large, consider grouping the items and expanding / contracting the groups. Avoid overwhelming your users.
    - Don't hide key actions inside the drawer. Actions like search should be prominently on the home page, not hidden in the drawer.
---

{% wrap content%}

<div class="g-medium--2 g-medium--last g-wide--3">
  {% link_sample ../_code/appbar-navdrawer-sample1.html %}
    <img src="images/navdrawer.png">
  {% endlink_sample %}

  <div style="text-align:center;">
    {% link_sample_button ../_code/appbar-navdrawer-sample1.html %}
      Demo
    {% endlink_sample_button %}
  </div>
</div>

<div style="clear: both;"></div>

The Navigation Drawer is a slide in panel which is primarily used for displaying a sites navigation, but can also be used for displaying global state, i.e. user login.

A user accesses the drawer using a menu button at the top of the screen in the App Bar.

{% include modules/takeaway.liquid list=page.key-takeaways.navigation-drawer %}

The key advantages of this approach is that the content can grow inside a scrolling element, allowing for larger site structures and it takes up a very small amount of screen real estate.

For users there is a small amount to learning to do to find the Navigation Drawer so having a clearly place menu button is extremely important.

<div class="g-medium--2 g-medium--last g-wide--3">

  <div class="g--third">
    {% link_sample ../_code/appbar-navdrawer-bottombar-sample.html %}
      <img src="images/navdrawer-alt-1.png">
    {% endlink_sample %}
    <div style="text-align:center;">
      {% link_sample_button ../_code/appbar-navdrawer-bottombar-sample.html %}
        Demo
      {% endlink_sample_button %}
    </div>
  </div>

  <div class="g--third">
    {% link_sample ../_code/appbar-navdrawer-sample.html %}
      <img src="images/navdrawer-alt-2.png">
    {% endlink_sample %}
    <div style="text-align:center;">
      {% link_sample_button ../_code/appbar-navdrawer-sample.html %}
        Demo
      {% endlink_sample_button %}
    </div>
  </div>

  <div class="g--third g--last">
    {% link_sample ../_code/navdrawer-sample4.html %}
      <img src="images/navdrawer-alt-3.png">
    {% endlink_sample %}
    <div style="text-align:center;">
      {% link_sample_button ../_code/navdrawer-sample4.html %}
        Demo
      {% endlink_sample_button %}
    </div>
  </div>

</div>

<div style="clear: both;"></div>

### Tabs vs Navigation Drawer

Some developers find they get higher rates of interaction when using a tab bar instead of a Navigation Drawer.

The choice is a trade off between the flexibility of the Navigation Drawer with the visibility of a Tab Bar which you should consider what is best suited to your site.

<div style="clear: both;"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
