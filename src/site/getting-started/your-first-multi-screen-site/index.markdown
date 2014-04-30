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

Building multi-screen experiences is not as hard as it sounds. By following 
the lessons in this guide, we will build an example product landing page for our
[CS256 Mobile Web Developement course](https://www.udacity.com/course/cs256) 
that works well across all different device types.

## Lessons

{% for guide in page.articles.multi-screen %}
1. [{{guide.title}}]({{site.baseurl}}{{guide.url}}) &mdash;
{{guide.description}}
{% endfor %}

## Final product

After you've completed the above lessons, you will have produced an excellent product landing
page that you could use on your own sites.  It will be responsive across
mobile all the way up to TV.

<div class="demo clear">
  <img class="g-wide--1 g-medium--half" src="images/narrowsite.jpg" alt="Narrow Viewport final look" style="max-width: 100%;">
  <img  class="g-wide--3 g-wide--last g-medium--half g--last" src="images/widesite.jpg" alt="Narrow Viewport final look" style="max-width: 100%;">
</div>



{% endwrap %}
