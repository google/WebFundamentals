project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Much of the web isn't optimized for those multi-device experiences. Learn the fundamentals to get your site working on mobile, desktop or anything else with a screen.

<p class="intro">
  On both desktop and mobile devices, users are used to scrolling websites vertically but not horizontally, and forcing the user to scroll horizontally or to zoom out in order to see the whole page results in a poor user experience.
</p>

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






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
    <a href="/web/resources/samples/fundamentals/design-and-ui/responsive/fundamentals/vp-fixed.html">
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Page with a 344px fixed width element on an iPhone.">
      See example
    </a>
  </div>

  <div class="mdl-cell mdl-cell--6-col">
    <a href="/web/resources/samples/fundamentals/design-and-ui/responsive/fundamentals/vp-fixed.html">
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Page with a 344px fixed width element on a Nexus 5.">
      See example
    </a>
  </div>
</div>



