---
layout: shared/narrow
title: "Size videos correctly"
description: "When it comes to keeping your users happy, size matters."
published_on: 2014-04-16
updated_on: 2014-09-19
order: 3
authors:
  - samdutton
key-takeaways:
  size-matters:
    - "Don't serve videos with a larger frame size or higher quality than the platform can handle."
    - "Don't make your videos any longer than they need be."
    - "Long videos can cause hiccups with download and seeking; some browsers may have to wait until the video downloads before beginning playback."
notes:
  media-fragments:
    - "The Media Fragments API is supported on most platforms, but not on iOS."
    - "Make sure Range Requests are supported by your server. Range Requests are enabled by default on most servers, but some hosting services may turn them off."
  dont-overflow:
    - "Don't force element sizing that results in an aspect ratio different from the original video. Squashed or stretched looks bad."
  accessibility-matters:
    - "The track element is supported on Chrome for Android, iOS Safari, and all current browsers on desktop except Firefox (see <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). There are several polyfills available too. We recommend <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> or <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>."
  construct-video-streams:
    - "MSE is supported by Chrome and Opera on Android, and in Internet Explorer 11 and Chrome for desktop, with support planned for <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>."
  optimize:
    - "<a href='../images/'>Images</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Optimizing content efficiency</a>"
related-guides:
  media:
  -
      title: "Use CSS media queries for responsiveness"
      href: fundamentals/design-and-ui/responsive/fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "Responsive Web Design Basics"
        href: fundamentals/design-and-ui/responsive/
---

<p class="intro">
  When it comes to keeping your users happy, file size is important.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}

## Check video size

The actual video frame size as encoded may be different from the video
element dimensions (just as an image may not be displayed using its actual
dimensions).

To check the encoded size of a video, use the video element `videoWidth`
and `videoHeight` properties. `width` and `height` return the dimensions of
the video element, which may have been sized using CSS or inline width and
height attributes.

## Ensure videos don't overflow containers

When video elements are too big for the viewport, they may overflow their
container, making it impossible for the user to see the content or use
the controls.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--4-col"> 
    <img alt="Android Chrome screenshot, portrait: unstyled video element overflows viewport" src="images/Chrome-Android-portrait-video-unstyled.png">
    <figcaption>Android Chrome screenshot, portrait: unstyled video element overflows viewport</figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--8-col">
    <img alt="Android Chrome screenshot, landscape: unstyled video element overflows viewport" src="images/Chrome-Android-landscape-video-unstyled.png">
    <figcaption>Android Chrome screenshot, landscape: unstyled video element overflows viewport</figcaption>
  </figure>
</div>

You can control video dimensions using JavaScript or CSS. JavaScript libraries
and plugins such as [FitVids](//fitvidsjs.com/) make it possible to maintain
appropriate size and aspect ratio, even for Flash videos from YouTube and
other sources.

Use [CSS media queries](/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries) to specify the size of elements depending on the viewport dimensions; `max-width: 100%` is your friend.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

For media content in iframes (such as YouTube videos), try a responsive
approach (like the one [proposed by John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

{% include shared/remember.liquid title="Remember" list=page.notes.dont-overflow %}

**CSS:**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML:**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

Compare the {% link_sample _code/responsive_embed.html %}responsive sample{% endlink_sample %} to the {% link_sample _code/unyt.html %}unresponsive version{% endlink_sample %}.



