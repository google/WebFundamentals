---
layout: shared/narrow
title: "Size content to the viewport"
description: "Much of the web isn't optimized for those multi-device experiences. Learn the fundamentals to get your site working on mobile, desktop or anything else with a screen."
published_on: 2014-04-30
updated_on: 2014-04-30
order: 2
translation_priority: 0
authors:
  - petelepage
key-takeaways:
  set-viewport:
    - "Use meta viewport tag to control the width and scaling of the browsers viewport."
    - "Include <code>width=device-width</code> to match the screen's width in device independent pixels."
    - "Include <code>initial-scale=1</code> to establish a 1:1 relationship between CSS pixels and device independent pixels"
    - "Ensure your page is accessible by not disabling user scaling."
  size-content-to-vp:
    - "Do not use large fixed width elements."
    - "Content should not rely on a particular viewport width to render well."
    - "Use CSS media queries to apply different styling for small and large screens."
  media-queries:
    - "Media queries can be used to apply styles based on device characteristics."
    - "Use <code>min-width</code> over <code>min-device-width</code> to ensure the broadest experience."
    - "Use relative sizes for elements to avoid breaking layout."
  choose-breakpoints:
    - "Create breakpoints based on content, never on specific devices, products or brands."
    - "Design for the smallest mobile device first, then progressively enhance the experience as more screen real estate becomes available."
    - "Keep lines of text to a maximum of around 70 or 80 characters."
notes:
  use-commas:
    - "Use a comma to separate attributes to ensure older browsers can properly parse the attributes."
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple20
---

<p class="intro">
  On both desktop and mobile devices, users are used to scrolling websites vertically but not horizontally, and forcing the user to scroll horizontally or to zoom out in order to see the whole page results in a poor user experience.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.size-content-to-vp %}

When developing a mobile site with a `meta viewport` tag, it's easy to
accidentally create page content that doesn't quite fit within the specified
viewport. For example, an image that is displayed at a width wider than the
viewport can cause the viewport to scroll horizontally. You should adjust this
content to fit within the width of the viewport, so that the user does not need
to scroll horizontally.

Since screen dimensions and width in CSS pixels vary widely between devices
(e.g. between phones and tablets, and even between different phones), content
should not rely on a particular viewport width to render well.

Setting large absolute CSS widths for page elements (such as the example below),
will cause the `div` to be too wide for the viewport on a narrower device (e.g.
a device with a width of 320 CSS pixels, such as an iPhone). Instead, consider
using relative width values, such as `width: 100%`.  Similarly, beware of using
large absolute positioning values that may cause the element to fall outside the
viewport on small screens.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Page with a 344px fixed width element on an iPhone.">
      See example
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6-col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Page with a 344px fixed width element on a Nexus 5.">
      See example
    {% endlink_sample %}
  </div>
</div>


