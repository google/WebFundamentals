---
layout: shared/narrow
title: "Mostly fluid"
description: "Responsive web design patterns are quickly evolving, but there are a handful of established patterns that work well across the desktop and mobile devices"
authors:
  - petelepage
published_on: 2014-04-30
updated_on: 2014-10-21
order: 1
translation_priority: 1
---

<p class="intro">
  The mostly fluid pattern consists primarily of a fluid grid.  On large or medium screens, it usually remains the same size, simply adjusting the margins on wider screens.
</p>

On smaller screens, the fluid grid causes the main content to reflow,
while columns are stacked vertically.  One major advantage of this pattern is
that it usually only requires one breakpoint between small screens and large
screens.

{% link_sample _code/mostly-fluid.html %}
  <img src="imgs/mostly-fluid.svg">
  Try it
{% endlink_sample %}

In the smallest view, each content `div` is stacked vertically.  Once the screen
width hits 600px, the primary content `div` remains at `width: 100%`, while the
secondary `div`'s are shown as two columns below the primary `div`.  Beyond
800px, the container `div` becomes fixed width and is centered on the screen.

Sites using this pattern include:

 * [A List Apart](http://mediaqueri.es/ala/)
 * [Media Queries](http://mediaqueri.es/)
 * [SimpleBits](http://simplebits.com/)


{% include_code src=_code/mostly-fluid.html snippet=mfluid lang=css %}


