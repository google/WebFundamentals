---
layout: shared/narrow
title: "Column drop"
description: "Responsive web design patterns are quickly evolving, but there are a handful of established patterns that work well across the desktop and mobile devices"
authors:
  - petelepage
published_on: 2014-04-30
updated_on: 2014-10-21
order: 2
translation_priority: 1
---

<p class="intro">
  For full-width multi-column layouts, column drop simply stacks the columns vertically as the window width becomes too narrow for the content.
</p>

Eventually
this results in all of the columns being stacked vertically.  Choosing
breakpoints for this layout pattern is dependent on the content and will change
for each design.

{% link_sample _code/column-drop.html %}
  <img src="imgs/column-drop.svg">
  Try it
{% endlink_sample %}


Like the mostly fluid sample, content is stacked vertically in the smallest
view, but as the screen expands beyond 600px, the primary and secondary content
`div`'s take the full width of the screen.  The order of the `div`'s is set using
the order CSS property.  At 800px all three content `div`'s are shown, using the
full screen width.

Sites using this pattern include:

 * [Modernizr](https://modernizr.com/)
 * [Wee Nudge](http://weenudge.com/)

{% include_code src=_code/column-drop.html snippet=cdrop lang=css %}


