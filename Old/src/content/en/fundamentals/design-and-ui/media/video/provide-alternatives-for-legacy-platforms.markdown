---
layout: shared/narrow
title: "Provide alternatives for legacy platforms"
description: "Not all video formats are supported on all platforms. Check which formats are supported on the major platforms and make sure your video works in each of these."
published_on: 2014-04-16
updated_on: 2014-10-23
order: 2
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
  Not all video formats are supported on all platforms. Check which formats are supported on the major platforms and make sure your video works in each of these.
</p>

{% include shared/toc.liquid %}

## Check which formats are supported

Use `canPlayType()` to find out which video formats are supported. The method
takes a string argument consistent of a `mime-type` and optional codecs and
returns one of the following values:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Return value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Return value">(empty string)</td>
      <td data-th="Description">The container and/or codec isn't supported.</td>
    </tr>
    <tr>
      <td data-th="Return value"><code>maybe</code></td>
      <td data-th="Description">
        The container and codec(s) might be supported, but the browser
        will need to download some video to check.
      </td>
    </tr>
    <tr>
      <td data-th="Return value"><code>probably</code></td>
      <td data-th="Description">The format appears to be supported.
      </td>
    </tr>
  </tbody>
</table>

Here are some examples of `canPlayType()` arguments and return values when
run in Chrome:


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Type</th>
      <th>Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type"><code>video/xyz</code></td>
      <td data-th="Response">(empty string)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response">(empty string)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Response">(empty string)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Response"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## Produce video in multiple formats

There are lots of tools to help save the same video in different formats:

* Desktop tools: [FFmpeg](//ffmpeg.org/)
* GUI applications: [Miro](//www.mirovideoconverter.com/),
  [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Online encoding/transcoding services:
  [Zencoder](//en.wikipedia.org/wiki/Zencoder),
  [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## Check which format was used

Want to know which video format was actually chosen by the browser?

In JavaScript, use the video's `currentSrc` property to return the source used.

To see this in action, check out {% link_sample _code/video-main.html %}this demo{% endlink_sample %}: Chrome and Firefox choose `chrome.webm`
(because that's the first in the list of potential sources these browsers
support) whereas Safari chooses `chrome.mp4`.


