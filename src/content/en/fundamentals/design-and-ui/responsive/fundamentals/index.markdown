---
layout: shared/narrow-pages-list
title: "Responsive web design basics"
description: "Much of the web isn't optimized for those multi-device experiences. Learn the fundamentals to get your site working on mobile, desktop or anything else with a screen."
published_on: 2014-04-30
updated_on: 2014-04-30
order: 1
translation_priority: 0
authors:
  - petelepage
key-takeaways:
  set-viewport:
    - "Use meta viewport tag to control the width and scaling of the browsers viewport."
    - "Include <code>width=device-width</code> to match the screen's width in device independent pixels."
    - "Include <code>initial-scale=1</code> to establish a 1:1 relationship between CSS pixels and device independent pixels."
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
  - g.co/mobilesiteprinciple19

---

<p class="intro">
  The use of mobile devices to surf the web is growing at an astronomical pace, but unfortunately much of the web isn't optimized for those mobile devices. Mobile devices are often constrained by display size and require a different approach to how content is laid out on screen.
</p>

There is a multitude of different screen sizes across phones, "phablets",
tablets, desktops, game consoles, TVs, even wearables.  Screen sizes will always
be changing, so it's important that your site can adapt to any screen size,
today or in the future.

{% comment %}
{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}
{% endcomment %}

Responsive web design, originally defined by [Ethan Marcotte in A List
Apart](http://alistapart.com/article/responsive-web-design/) responds to the
needs of the users and the devices they're using.  The layout changes based on
the size and capabilities of the device.  For example, on a phone, users would
see content shown in a single column view; a tablet might show the same content
in two columns.
