---
layout: shared/narrow
title: "Add a video"
description: "Learn about the simplest ways to add video to your site and ensure users get the best possible experience on any device."
published_on: 2014-04-16
updated_on: 2014-04-29
order: 1
authors:
  - samdutton
translation_priority: 1
key-takeaways:
  add-a-video:
    - "Use the video element to load, decode, and play video on your site."
    - "Produce video in multiple formats to cover a range of mobile platforms."
    - "Size videos correctly; ensure they don't overflow their containers."
    - "Accessibility matters; add the track element as a child of the video element."
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
---

<p class="intro">
  Learn about the simplest ways to add video to your site and ensure users get the best possible experience on any device.
  </p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.add-a-video %}

## Add the video element

Add the video element to load, decode, and play video in your site:

<video controls>
  <source src="video/chrome.webm" type="video/webm">
  <source src="video/chrome.mp4" type="video/mp4">
  <p>This browser does not support the video element.</p>
</video>

{% highlight html %}
<video src="chrome.webm" type="video/webm">
    <p>Your browser does not support the video element.</p>
</video>
{% endhighlight %}

## Specify multiple file formats

Not all browsers support the same video formats.
The `<source>` element lets you specify multiple formats
as a fallback in case the user's browser doesn't support one of them.
For example:

{% include_code src=_code/video-main.html snippet=sourcetypes %}

When the browser parses the `<source>` tags, it uses the optional `type`
attribute to help decide which file to download and play. If the browser supports WebM, it will play chrome.webm, if not, it will check if it can play MPEG-4 videos.
Check out
<a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>A Digital Media Primer for Geeks</a>
to find out more about how video and audio work on the web.

This approach has several advantages over serving different HTML or
server-side scripting, especially on mobile:

* Developers can list formats in order of preference.
* Native client-side switching reduces latency; only one request is made to
  get content.
* Letting the browser choose a format is simpler, quicker and potentially
  more reliable than using a server-side support database with user-agent detection.
* Specifying each file source's type improves network performance; the browser can select a
  video source without having to download part of the video to 'sniff' the format.

All of these points are especially important in mobile contexts, where bandwidth
and latency are at a premium, and the user's patience is likely to be limited.
Not including a type attribute can affect performance when there are
multiple sources with unsupported types.

Using your mobile browser
developer tools, compare network activity {% link_sample _code/video-main.html %}with type attributes{% endlink_sample %} and {% link_sample _code/notype.html %}without type attributes{% endlink_sample %}.
Also check the response headers in your browser developer tools to [ensure your server reports the right MIME type](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types);
otherwise video source type checks won't work.

## Specify a start and end time

Save bandwidth and make your site feel more responsive: use the Media
Fragments API to add a start and end time to the video element.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
  <p>This browser does not support the video element.</p>
</video>

To add a media fragment, you simply add `#t=[start_time][,end_time]` to the
media URL. For example, to play the video between seconds 5 through 10,
specify:

{% highlight html %}
<source src="video/chrome.webm#t=5,10" type="video/webm">
{% endhighlight %}

You can also use the Media Fragments API to deliver multiple views on the same
video &ndash; like cue points in a DVD &ndash; without having to encode and
serve multiple files.

{% include shared/remember.liquid title="Remember" list=page.notes.media-fragments %}

Using your browser developer tools,
check for `Accept-Ranges: bytes` in the response headers:

<img class="center" alt="Chrome DevTools screenshot: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## Include a poster image

Add a poster attribute to the video element so that your users have an idea
of the content as soon as the element loads, without needing to download
video or start playback.

{% highlight html %}
<video poster="poster.jpg" ...>
  ...
</video>
{% endhighlight %}

A poster can also be a fallback if the video `src` is broken or none of the
video formats supplied are supported. The only downside to poster images is
an additional file request, which consumes some bandwidth and requires
rendering. For more information see [Image optimization](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Here's a side-by-side comparison of videos without and with a poster image
&ndash; we've made the poster image grayscale to prove it's not the video:

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <img class="center" alt="Android Chrome screenshot, portrait: no poster" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6-col">
    <img class="center" alt="Android Chrome screenshot, portrait: with poster" src="images/Chrome-Android-video-poster.png">
  </div>
</div>


