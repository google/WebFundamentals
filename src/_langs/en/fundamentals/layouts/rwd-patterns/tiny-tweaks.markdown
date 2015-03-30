---
layout: article
title: "Tiny tweaks"
description: "Responsive web design patterns are quickly evolving, but there
              are a handful of established patterns that work well across the
              desktop and mobile devices"
introduction: "Tiny tweaks simply makes small changes to the layout, such as adjusting font
  size, resizing images or moving content around in very minor ways.  "
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-10-21
  order: 4
priority: 1
collection: rwd-patterns
---

{% wrap content%}

It works well on single column layouts such as one page linear websites, text
heavy articles.

{% link_sample _code/tiny-tweaks.html %}
  <img src="imgs/tiny-tweaks.svg">
  Try it
{% endlink_sample %}

As its name implies, little changes with this sample as the screen size changes.
As the screen width gets larger, so do the font size and padding.

Sites using this pattern include:

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

{% include_code _code/tiny-tweaks.html ttweaks css %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
