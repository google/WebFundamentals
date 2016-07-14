---
layout: shared/narrow
title: "Quick reference"
description: "A quick overview of properties on the video element."
published_on: 2014-04-16
updated_on: 2014-10-23
order: 5
authors:
  - samdutton
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
  A quick overview of properties on the video element.
</p>

{% include shared/toc.liquid %}

## Video element attributes

For the complete list of video element attributes and their definitions,
see [the video element spec](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table class="mdl-data-table mdl-js-data-table">
  <thead>
      <th>Attribute</th>
      <th>Availability</th>
      <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>src</code></td>
      <td data-th="Availability">All browsers</td>
      <td data-th="Description">Address (URL) of the video.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>poster</code></td>
      <td data-th="Availability">All browsers</td>
      <td data-th="Description">Address (URL) of an image file that the browser can show as soon as the video element is displayed, without downloading video content.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>preload</code></td>
      <td data-th="Availability">All mobile browsers ignore preload.</td>
      <td data-th="Description">Hints to the browser that preloading metadata (or some video) in advance of playback is worthwhile. Options are none, metadata, or auto (see Preload section for details). </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>autoplay</code></td>
      <td data-th="Availability">Not supported on iPhone or Android; supported on all desktop browsers, iPad, Firefox and Opera for Android.</td>
      <td data-th="Description">Start download and playback as soon as possible (see Autoplay section). </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>loop</code></td>
      <td data-th="Availability">All browsers</td>
      <td data-th="Description">Loop the video.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>controls</code></td>
      <td data-th="Availability">All browsers</td>
      <td data-th="Description">Show the default video controls (play, pause, etc.)</td>
    </tr>
  </tbody>
</table>

### Autoplay

On desktop, `autoplay` tells the browser to immediately start downloading and
playing the video as soon as it can. On iOS, and Chrome for Android, `autoplay`
doesn't work; users must tap the screen to play the video.

Even on platforms where autoplay is possible, you need to consider whether
it's a good idea to enable it:

* Data usage can be expensive.
* Causing media to download and playback to begin, without asking first, can
  unexpectedly hog bandwidth and CPU, and thereby delay page rendering.
* Users may be in a context where playing video or audio is intrusive.

Autoplay behavior is configurable in the Android WebView via the
[WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
It defaults to true but a WebView app can choose to disable it.

### Preload

The `preload` attribute provides a hint to the browser as to how much
information or content should be preloaded.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Value"><code>none</code></td>
      <td data-th="Description">The user may not even watch the video &ndash; don't preload anything</td>
    </tr>
    <tr>
      <td data-th="Value"><code>metadata</code></td>
      <td data-th="Description">Metadata (duration, dimensions, text tracks) should be preloaded, but with minimal video.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>auto</code></td>
      <td data-th="Description">Downloading the entire video right away is considered desirable.</td>
    </tr>
  </tbody>
</table>

The `preload` attribute has different effects on different platforms.
For example, Chrome buffers 25 seconds of video on desktop, none on iOS or
Android. This means that on mobile, there may be playback startup delays
that don't happen on desktop. See [Steve Souders' test page](//stevesouders.com/tests/mediaevents.php)
for full details.

## JavaScript

[The HTML5 Rocks Video article](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)
does a great job of summarizing the JavaScript properties, methods, and events
that can be used to control video playback. We've included that content here,
updating it with mobile-specific concerns where relevant.

### Properties

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Property</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>currentTime</code></td>
      <td data-th="Description">Get or set playback position in seconds.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>volume</code></td>
      <td data-th="Description">Get or set current volume level for the video.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>muted</code></td>
      <td data-th="Description">Get or set audio muting.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>playbackRate</code></td>
      <td data-th="Description">Get or set playback rate; 1 is normal speed forward.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>buffered</code></td>
      <td data-th="Description">Information about how much of the video has been buffered and is ready to play (see <a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="Demo displaying amount of buffered video in a canvas element">demo</a>).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>currentSrc</code></td>
      <td data-th="Description">The address of the video being played.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoWidth</code></td>
      <td data-th="Description">Width of the video in pixels (which may be different from the video element width).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoHeight</code></td>
      <td data-th="Description">Height of the video in pixels (which may be different from the video element height).</td>
    </tr>
  </tbody>
</table>

Neither `playbackRate` ({% link_sample _code/scripted.html %}see demo{% endlink_sample %}) nor `volume` are supported on mobile.

### Methods

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Method</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Method"><code>load()</code></td>
      <td data-th="Description">Load or reload a video source without initiating playback: for example, when the video src is changed using JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>play()</code></td>
      <td data-th="Description">Play the video from its current location.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>pause()</code></td>
      <td data-th="Description">Pause the video at its current location.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>canPlayType('format')</code></td>
      <td data-th="Description">Find out which formats are supported (see Check which formats are supported).</td>
    </tr>
  </tbody>
</table>

On mobile (apart from Opera on Android) `play()` and `pause()` don't work unless
called in response to user action, such as clicking a button: see the {% link_sample _code/scripted.html %}demo{% endlink_sample %}. (Likewise, playback can't be initiated for content such as embedded YouTube videos.)

### Events

These are only a subset of the media events that may be fired. Refer to
the [Media events](//developer.mozilla.org/docs/Web/Guide/Events/Media_events)
page on the Mozilla Developer Network for a complete listing.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Event</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event"><code>canplaythrough</code></td>
      <td data-th="Description">Fired when enough data is available that the browser believes it can play the video completely without interruption.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>ended</code></td>
      <td data-th="Description">Fired when video has finished playing.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>error</code></td>
      <td data-th="Description">Fired if an error occurs.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>playing</code></td>
      <td data-th="Description">Fired when video starts playing for the first time, after being paused, or when restarting.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>progress</code></td>
      <td data-th="Description">Fired periodically to indicate download progress.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>waiting</code></td>
      <td data-th="Description">Fired when an action is delayed pending completion of another action.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>loadedmetadata</code></td>
      <td data-th="Description">Fired when browser finishes loading metadata for video: duration, dimensions and text tracks.</td>
    </tr>
  </tbody>
</table>


