---
layout: article
title: "Tab Bar"
description: "A Tab Bar can be used as the main navigation for your site. It gives the user visibility of the main sections of your site as well as an easy way to identify where they are within your web app."
thumbnail: tabbar/images/tabbar.png
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
rel:
  gplusauthor: https://plus.google.com/+MattGaunt
collection: navigation-patterns
introduction: "A Tab Bar can be used as the main navigation for your site. It gives the user visibility of the main sections of your site as well as an easy way to identify where they are within your web app."
key-takeaways:
  tabs:
    - Use only if your site has no more than five sections.
    - Position below or above your main content.
    - Make it clear to the user which section is currently selected.
---

{% wrap content%}

<a href="{{site.baseurl}}/resources/samples/documentation/multi-device-layouts/navigation-patterns/tabbar-sample1.html">
	<img class="g-medium--full g-wide--full" src="images/tabbar.png">
</a>

<div style="clear: both;"></div>

The Tab Bar can be used to quickly switch between the sections of your site.

It's only appropriate for sites with a relatively small structure, but users find it easy to glance at where they are, and where they can go, within your site.

{% include modules/takeaway.liquid list=page.key-takeaways.tabs %}

Limit the total number of tabs to five or less, otherwise each icon and tap target becomes too small and users will struggle to hit the right tab.

Position your tabs above or below your main content, this is a trade off between what feels best to use and best suites your design.

One advantage to using tabs is that it gives the user a consistent place to go for navigation and makes it easy to glance at where they are within the site.

<a href="{{site.baseurl}}/resources/samples/documentation/multi-device-layouts/navigation-patterns/tabbar-sample2.html">
	<img class="g--half" src="images/tabbar-alt-1.png">
</a>

<a href="{{site.baseurl}}/resources/samples/documentation/multi-device-layouts/navigation-patterns/tabbar-sample3.html">
	<img class="g--half g--last" src="images/tabbar-alt-2.png">
</a>

<div style="clear: both;"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
