---
layout: default
title: "Your first multi-screen site"
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

{% include modules/toc.liquid %}

# {{ page.title }}


Building multi-screen experiences is not as hard as it sounds. In this
guide, we are going to create a simple landing page that shows you the basics of
building a web site using "[Mobile First](link to mobile first)" design principles that
enable you to easily scale your sites up from a mobile device through
to desktops and beyond.  We will show you best practices for interacting with both touch
and mice as well as structuring your content across screen sizes.

Our goal in this guide is to build an example product landing page for our
hypothetical Smiles product.  The end result will be a fully functioning page
that covers many of the core principles of building experiences that work well
across all different device types.

{% for guide in page.articles.multi-screen %}
{% class %}
### [{{guide.title}}]({{site.baseurl}}{{guide.url}})
{{guide.description}}
{% endclass %}
{% endfor %}

{% endwrap %}
