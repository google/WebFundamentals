---
layout: default
title: "Your First Multi-Screen Site"
description: "The web is accessible on a huge range of devices from small-screen phones
to huge-screen televisions. Learn how to build a site that works well across all these devices."
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
id: multi-screen
collection: getting-started
---
{% wrap content%}

# {{ page.title }}

Building multi-screen experiences is not as hard as it sounds. 

Our goal in this guide is to build an example product landing page for our
 [CS256 Mobile Web Developement course](https://www.udacity.com/course/cs256).  The end result will be a fully functioning page
that covers many of the core principles of building experiences that work well
across all different device types.


<div class="demo clear">
  <img class="g-wide--1 g-medium--half" src="images/narrowsite.jpg" alt="Narrow Viewport final look" style="max-width: 100%;"><img  class="g-wide--3 g-wide--last g-medium--half g--last" src="images/widesite.jpg" alt="Narrow Viewport final look" style="max-width: 100%;">
</div>


{% for guide in page.articles.multi-screen %}
{% class %}
### [{{guide.title}}]({{site.baseurl}}{{guide.url}})
{{guide.description}}
{% endclass %}
{% endfor %}

{% endwrap %}
