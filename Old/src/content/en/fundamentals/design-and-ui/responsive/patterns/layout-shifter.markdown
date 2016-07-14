---
layout: shared/narrow
title: "Layout shifter"
description: "Responsive web design patterns are quickly evolving, but there are a handful of established patterns that work well across the desktop and mobile devices"
authors:
  - petelepage
published_on: 2014-04-30
updated_on: 2014-10-21
order: 3
translation_priority: 1
---

<p class="intro">
  The layout shifter pattern is the most responsive pattern, with multiple breakpoints across several screen widths.
</p>

Key to this layout is the way content moves about, instead of reflowing and
dropping below other columns.  Due to the significant differences between each
major breakpoint, it is more complex to maintain and likely involves changes
within elements, not just overall content layout.

{% link_sample _code/layout-shifter.html %}
  <img src="imgs/layout-shifter.svg">
  Try it
{% endlink_sample %}

This simplified example shows the layout shifter pattern, on smaller screens
content is stacked vertically, but changes significantly as the screen becomes
larger, with a left `div` and two stacked `div`'s on the right.

Sites using this pattern include:

 * [Food Sense](http://foodsense.is/)
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)

{% include_code src=_code/layout-shifter.html snippet=lshifter lang=css %}


