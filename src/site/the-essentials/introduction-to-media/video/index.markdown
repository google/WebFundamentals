---
layout: article
title: "Video"
description: "Learn about the simplest ways to add video to your site and ensure users
              get the best possible experience on any device."
introduction: "People like videos: videos can be fun and informative; users can also consume information
               on the go easier than having to read small fonts and scroll down a page on a mobile device."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 2
collection: introduction-to-media
key-takeaways:
  add-a-video:
    - Use the video element to load, code, and play video in your site.
    - Don't load the whole video if unnecessary &ndash; specify a start and end time.
    - Include a poster image so the user sees something meaningful right away.
    - Specify multiple file formats since not all browsers support the same format.
    - Improve network performance &ndash; specify each file source's type.
  provide-alternatives:
    - Check which formats are supported.
    - Produce video in multiple formats to cover a range of mobile platforms.
    - Check which format was used.
  size-videos-correctly:
    - Avoid serving video that is too long, too large in frame size, or unnecessarily high in quality.
    - Check video size &ndash; frame size may be different from element size.
    - Ensure videos don't overflow their containers.
  customize:
    - Mobile solutions need to consider device orientation.
    - Different platforms display video different.
    - Use Fullscreen API to control fullscreening of content.
  improve-accessibility:
    - Focus on the user &ndash; accessibility matters.
    - Add track element as a child of the video element.
    - Define captions in track file.
  handle-poor-connectivity:
    - Enable adaptive streaming to cope with variable network conditions.
    - Use the Media Source Extensions API to construct video streams.
    - Use DASH to enable high quality streaming on the web.
remember:
  specify-a-start-time:
    - The Media Fragments API is supported on most platforms, but not on iOS.
  range-request:
    - Make sure Range Requests are supported by your server. Range Requests are enabled by
      default on most servers, but some hosting services may turn them off.
  multiple-formats:
    - MP4 and WebM are <a href='//en.wikipedia.org/wiki/Container_formats' title='Wikipedia article about media file container formats'>container formats</a>. MP4 stores audio using AAC compression and video using H.264; WebM uses VP9 and Opus.
      Check out <a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>A Digital Media Primer for Geeks</a> to find out more about how video and audio work on the web.
  dont-overflow:
    - Don't force element sizing that results in an aspect ratio different from the original
      video. Squashed or stretched looks bad.
  compare-formats:
    - Compare the responsive sample at <a href='//simpl.info/yt' title='Demo of YouTube video with responsive sizing'>simpl.info/yt</a> to the unresponsive version at <a href='//simpl.info/unyt' title='Demo of YouTube video without responsive sizing'>simpl.info/unyt</a>.
  accessibility-matters:
    - The track element is supported on Chrome for Android, iOS Safari, and all current browsers on desktop except Firefox (see <a href="//caniuse.com/track" title="Track element support status">caniuse.com/track</a>). There are several polyfills available too. We recommend <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> or <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.
  construct-video-streams:
    - MSE is supported by Chrome and Opera on Android, and in Internet Explorer 11 and Chrome for desktop, with support planned for <a href='//wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>.
  optimize:
    - <a href="../images/">Images</a>
    - <a href="../../performance/optimizing-content-efficiency/">Optimizing content efficiency</a>
---

{% wrap content%}

{% include modules/toc.liquid %}

<style type="text/css">
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

</style>

But videos take bandwidth, they don't always work the same across every
platform, so any value the user might get from watching video diminishes when
the user has to wait for the video to load, or the user presses play and
nothing happens.

Read more to find the simplest way to add video to your site and ensure
users get the best possible experience on any device.

## Add a video

{% include modules/takeaway.liquid list=page.key-takeaways.add-a-video %}

### Add the video element

Load, decode, and play video:

<video controls>
     <source src="video/chrome.webm" type="video/webm" />
     <source src="video/chrome.mp4" type="video/mp4" />
     <p>This browser does not support the video element.</p>
</video>

{% include_code _code/basic.html basic %}

### Specify a start and end time

Save bandwidth and make your site feel more responsive: use the Media
Fragments API to add a start and end time to the video element:

<video controls>
     <source src="video/chrome.webm#t=10,15" type="video/webm" />
     <source src="video/chrome.mp4#t=10,15" type="video/mp4" />
     <p>This browser does not support the video element.</p>
</video>

{% include_code _code/base_fragment.html basic %}

{% include modules/remember.liquid title="Remember" list=page.remember.specify-a-start-time %}

You can also use the Media Fragments API to deliver multiple views on the same
video &ndash; like cue points in a DVD &ndash; without having to encode and
serve multiple files:

{% include modules/remember.liquid title="Remember" list=page.remember.range-request %}

To check for Range Request support, your browser tools for
`Accept-Ranges: bytes` in the response headers:

<img class="center" alt="Chrome Dev Tools screenshot: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png" />

### Include a poster image

Add a poster attribute to the video element so that your users have an idea
of the content as soon as the element loads, without needing to download
video or start playback:

{% include_code _code/base_poster.html basic %}

A poster can also be a fallback if the video `src` is broken or none of the
video formats supplied are supported. The only downside to poster images is
an additional file request, which consumes some bandwidth and requires
rendering. For more information see
[Image optimization](#TODO).

Here's a side-by-side comparison of videos without and with a poster image
&ndash; we've made the poster image grayscale to prove it's not the video!

<div class="clear">
  <div class="g--half">
    <img class="center" alt="Android Chrome screenshot, portrait: no poster" src="images/Chrome-Android-video-no-poster.png" />
  </div>

  <div class="g--half g--last">
    <img class="center" alt="Android Chrome screenshot, portrait: with poster" src="images/Chrome-Android-video-poster.png" />
  </div>
</div>

### Specify multiple file formats

Not all browsers support the same video formats.

Use the source element to enable browsers to choose from multiple available
formats. MP4 and WebM cover all modern browsers, including all mobile browsers:

{% include_code _code/fragment.html sourcetypes %}

The user's browser selects the first available format it can play. This
approach has several advantages over serving different HTML or server-side
scripting, especially on mobile:

* Developers can list formats in order of preference.
* Native client-side switching reduces latency: only one request is made to
  get content.
* Letting the browser choose a format is simpler, quicker and potentially
  more reliable than using a server-side support database with user-agent detection.

All of these points are especially potent in mobile contexts, where bandwidth
and latency are at a premium, and the user's patience is likely to be limited.

{% include modules/remember.liquid title="Remember" list=page.remember.multiple-formats %}

### Specify each source's type

Adding a type attribute to a source element enables the browser to select a
video source without having to download part of the video to 'sniff' the format.

Instead of this:

{% highlight html %}
<source src="video/chrome.webm" />
{% endhighlight %}

Use this:

{% highlight html %}
<source src="video/chrome.webm" type="video/webm" />
{% endhighlight %}

You can specify codecs as well as a mime type. For example:

{% highlight html %}
<source src="video/chrome.webm" type="video/webm; codecs='vp8, vorbis'" />.
{% endhighlight %}

Not including a type attribute can affect performance when there are
multiple sources with unsupported types: using your mobile browser
developer tools, compare network activity for
[simpl.info/video](//simpl.info/video/) and
[simpl.info/video/notype](//simpl.info/video/notype/).

**Remember:** [Ensure your server reports the right MIME type](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types); otherwise video source type checks won't work. You can check with [cURL](//en.wikipedia.org/wiki/CURL):

{% highlight bash %}
curl -I simpl.info/video/video/chrome.mp4
{% endhighlight %}

This should return a response that includes a header like this:

    Content-Type: video/mp4

## Provide alternatives for legacy platforms

{% include modules/takeaway.liquid list=page.key-takeaways.provide-alternatives %}

### Check which formats are supported

Use `canPlayType()` to find out which video formats are supported. The method
takes a string argument consistent of a mime type and optional codecs and
returns one of the following values:

<table class="table">
  <thead>
    <tr>
      <th>return value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(blank string)</td>
      <td>The container and/or codec isn't supported.</td>
    </tr>
    <tr>
      <td><code>maybe</code></td>
      <td>
        The container and codec(s) might be supported, but the browser
        will need to download some video to check.
      </td>
    </tr>
    <tr>
      <td><code>probably</code></td>
      <td>The format appears to be supported.
      </td>
    </tr>
  </tbody>
</table>

Here are some examples of `canPlayType()` arguments and return values when
run in Chrome:


<table class="table">
  <thead>
    <tr>
      <th>type</th>
      <th>Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>video/xyz</code></td>
      <td>(blank string)</td>
    </tr>
    <tr>
      <td><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td>(blank string)</td>
    </tr>
    <tr>
      <td><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td>(blank string)</td>
    </tr>
    <tr>
      <td><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td><code>probably</code></td>
    </tr>
    <tr>
      <td><code>video/webm</code></td>
      <td><code>maybe</code></td>
    </tr>
    <tr>
      <td><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td><code>probably</code></td>
    </tr>
  </tbody>
</table>


### Produce video in multiple formats

There are lots of tools to help save the same video in different formats:

* Desktop tools: [FFmpeg](//ffmpeg.org/)
* GUI applications: [Miro](//www.mirovideoconverter.com/),
  [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Online encoding/transcoding services:
  [Zencoder](//en.wikipedia.org/wiki/Zencoder),
  [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### Check which format was used

Want to know which video format was actually chosen by the browser?

In JavaScript, use the video's `currentSrc` property to return the source used:

{% include_code _code/basic.html currentsrc javascript %}

Given the source example above, Chrome and Firefox choose `chrome.webm`
(because that's the first in the list of potential sources these browsers
support) whereas Safari chooses `chrome.mp4`.

## Size videos correctly

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.size-videos-correctly %}

### Size matters

When it comes to keeping your users happy, size matters:

* Don't serve videos with a larger frame size or higher quality than the
  platform can handle.
* Don't make your videos any longer than they need be.
* Long videos can cause hiccups with download and seeking; some browsers may
  have to wait until the video downloads before beginning playback.

Try this example on your mobile browser and see what happens:
[simpl.info/longvideo](//simpl.info/longvideo).

### Check video size

The actual video frame size as encoded may be different from the video
element dimensions (just as an image may not be displayed using its actual
dimensions). For example, resizing the page
[simpl.info/video](//simpl.info/video) changes the size of the video element
but the video's frame size is always 480x270px.

To check the encoded size of a video, use the video element `videoWidth`
and `videoHeight` properties. `width` and `height` return the dimensions of
the video element, which may have been sized using CSS or inline width and
height attributes.

### Ensure videos don't overflow containers

Here's what a plain video element with no element sizing or CSS looks like
in Chrome on Android (portrait and landscape):

<div class="clear">
  <div class="g--half">
    <img class="center" alt="Android Chrome screenshot, portrait: unstyled video element overflows viewport" src="images/Chrome-Android-portrait-video-unstyled.png" />
  </div>

  <div class="center" class="g--half g--last">
    <img class="center" alt="Android Chrome screenshot, landscape: unstyled video element overflows viewport" src="images/Chrome-Android-landscape-video-unstyled.png" />
  </div>
</div>

The video elements are too big for the viewport; the user can't even see the
video controls properly. It's super important to size video elements to fit
their containers.

You can control video dimensions using JavaScript or CSS. JavaScript libraries
and plugins such as [FitVids](//fitvidsjs.com/) make it possible to maintain
appropriate size and aspect ratio, even for Flash videos from YouTube and
other sources.

Use [CSS media queries](#TODO) to specify the size of elements depending on
the viewport dimensions; `max-width: 100%` is your friend:

{% include_code _code/basic.html styling css %}

{% include modules/remember.liquid title="Remember" list=page.remember.dont-overflow %}

For media content in iframes (such as YouTube videos), try a responsive
approach (like the one [proposed by John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)):

**CSS:**

{% include_code _code/responsive_embed.html styling css %}

**HTML:**

{% include_code _code/responsive_embed.html markup html %}

{% include modules/remember.liquid title="Remember" list=page.remember.compare-formats %}

## Customize the video player

{% include modules/takeaway.liquid list=page.key-takeaways.customize %}

### How device orientation works across devices

Device orientation isn't an issue for desktop monitors or laptops, but is
hugely important when considering web page design for mobile and tablets.

Safari on iPhone does a good job of switching between portrait and landscape
orientation:

<div class="clear">
  <div class="g--half">
    <img class="center" alt="Screenshot of video playing in Safari on iPhone, portrait" src="images/iPhone-video-playing-portrait-3x5.png" />
  </div>

  <div class="center" class="g--half g--last">
    <img class="center" alt="Screenshot of video playing in Safari on iPhone, landscape" src="images/iPhone-video-playing-landscape-5x3.png" />
  </div>
</div>

Device orientation on an iPad and Chrome on Android can be problematic.
For example, without any customization a video playing on an iPad in landscape
orientation looks like this:

<img class="center" alt="Screenshot of video playing in Safari on iPad Retina, landscape"
src="images/iPad-Retina-landscape-video-playing-5x3.png" />

Setting the video `width: 100%` or `max-width: 100%` with CSS can resolve
many device orientation layout problems. You may also want to consider
fullscreen alternatives.

### Inline or fullscreen display

Different platforms display video differently. Safari on an iPhone displays a
video element inline on a web page, but plays video back in fullscreen mode:

<img class="center" alt="Screenshot of video element on iPhone, portrait" src="images/iPhone-video-with-poster-3x5.png" />

On Android, users can request request fullscreen mode by clicking the
fullscreen icon. But the default is to play video inline:

<img class="center" alt="Screenshot of video playing in Chrome on Android, portrait" src="images/Chrome-Android-video-playing-portrait-3x5.png" />

Safari on an iPad plays video inline:

<img class="center" alt="Screenshot of video playing in Safari on iPad Retina, landscape" src="images/iPad-Retina-landscape-video-playing-5x3.png" />

### Control fullscreening of content

For platforms that do not force fullscreen video playback, the Fullscreen API
is [widely supported](//caniuse.com/fullscreen). Use this API to control
fullscreening of content, including video:

{% include_code _code/fullscreen.html elementfs javascript %}

{% include_code _code/fullscreen.html pagefs javascript %}

{% include_code _code/fullscreen.html listener javascript %}

{% include_code _code/fullscreen.html check javascript %}

You can also use the CSS `:fullscreen` pseudo-class to change the way
elements are displayed in fullscreen mode.

On devices that support the Fullscreen API, consider using thumbnail
images as placeholders for video (demo on Chrome for Android):

<img class="center" alt="Screenshot of two videos in desktop Chrome, showing thumbnails" src="images/Chrome-desktop-video-thumbnails.jpg" />

To see this in action, check out the
{% link_sample _code/fullscreen.html %}demo{% endlink_sample %}. When you tap
or click on a thumbnail, the thumbnail is replaced by a fullscreen video
element.

### Include captions to improve accessibility

{% include modules/takeaway.liquid list=page.key-takeaways.improve-accessibility %}

### Accessibility matters

Accessibility isn't a feature. Users who can't hear or see won't be able to
experience a video at all without captions or descriptions. The time it takes
to add these to your video is much less than the bad experience you are
delivering to users. Provide at least a base experience for all users.

To make media more accessible on mobile, include captions or descriptions
using the track element.

{% include modules/remember.liquid title="Remember" list=page.remember.accessibility-matters %}

Using the track element, captions appear like this:

 <img class="center" alt="Screenshot showing captions displayed using the track element in Chrome on Android" src="images/Chrome-Android-track-landscape-5x3.jpg" />

### Add track element

It's very easy to add captions to your video &ndash; simply add a
[track element](//www.html5rocks.com/en/tutorials/track/basics/) as a child of the video element:

{% include_code _code/track.html basic %}

The track element `src` attribute gives the location of the track file.

### Define captions in track file

A track file consists of timed 'cues' in WebVTT format:

    WEBVTT FILE
    1 00:00:00.500 --> 00:00:02.000 The Web is always changing
    2 00:00:02.500 --> 00:00:04.300 and the way we access it is changing
    ...

## Handle poor connectivity with adaptive streaming

{% include modules/takeaway.liquid title="Key Takeaways" list=page.key-takeaways.handle-poor-connectivity %}

### What is adaptive streaming?

The video element is a simple way to include video in your web pages, but it
doesn't enable your site to move between different bitrate video encodings in
response to network conditions.

Adaptive streaming is a set of techniques that provide more fine grained
control over video download and playback.

* **Buffer control:** choose bitrate depending on the size of the video
  buffer, i.e. how much 'fuel in the tank' remains.
* **Efficient seeking**: move between different parts of a video with minimal unnecessary download.
* **Bitrate management**: seamlessly swap between higher or lower bitrate in response to connectivity fluctuations.

### Construct video streams

Video streaming services use server-side solutions to enable adaptive
streaming, such as Adobe's RTMP protocol and Flash Media Server. However,
these solutions can be expensive and potentially complex, they require
plug-ins not supported on mobile platforms, and don't take advantage of
HTTP – a protocol optimized over many years for delivery of content on the web.

The [Media Source Extensions](//updates.html5rocks.com/2011/11/Stream-video-using-the-MediaSource-API)
(MSE) API enables JavaScript to construct video streams, which in turns
enables client-side adaptive streaming techniques that take advantage of HTTP.

There's a simple example of MSE at [simpl.info/mse](//simpl.info/mse).

{% include modules/remember.liquid title="Remember" list=page.remember.construct-video-streams %}

### Enable high quality streaming on the web

[Dynamic Adaptive Streaming over HTTP](//www.html5rocks.com/en/tutorials/eme/basics/#related-technology-2)
(DASH) is an open standard for adaptive streaming designed to enable media
delivery at the highest possible quality for both streaming and download.
Technologies such as Apple's [HTTP Live Streaming](//en.wikipedia.org/wiki/HTTP_Live_Streaming)
(HLS) and Microsoft's [Smooth Streaming](//en.wikipedia.org/wiki/Adaptive_bitrate_streaming#Microsoft_Smooth_Streaming)
also provide adaptive-bitrate streaming via HTTP, but are not open source.

With DASH:

* Media is encoded at different bitrates.
* The different bitrate files are segmented and made available from an HTTP server.
* A client web app chooses which bitrate to retrieve and play.

DASH can be implemented using the Media Source Extensions API. As part of
the video segmentation process, an XML manifest known as a Media Presentation
Description (MPD) is built programmatically. This describes the individual
video components and how they fit together.

DASH is already in use by sites such as YouTube; you can see DASH in action
with the [YouTube DASH demo player](//dash-mse-test.appspot.com/dash-player.html?url=http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-manifest.mpd).

## Reference ###

**Video element attributes**

For the complete list of video element attributes and their definitions,
see [the video element spec](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table class="table">
  <thead>
      <th>Attribute</th>
      <th>Availability</th>
      <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td><code>src</code></td>
      <td>All browsers</td>
      <td>Address (URL) of the video.</td>
    </tr>
    <tr>
      <td><code>poster</code></td>
      <td>All browsers</td>
      <td>Address (URL) of an image file that the browser can show as soon as the video element is displayed, without downloading video content.</td>
    </tr>
    <tr>
      <td><code>preload</code></td>
      <td>All mobile browsers ignore preload.</td>
      <td>Hints to the browser that preloading metadata (or some video) in advance of playback is worthwhile. Options are none, metadata, or auto (see Preload section for details). </td>
    </tr>
    <tr>
      <td><code>autoplay</code></td>
      <td>Not supported on iPhone or Android; supported on all desktop browsers, iPad, Firefox and Opera for Android.</td>
      <td>Start download and playback as soon as possible (see Autoplay section). </td>
    </tr>
    <tr>
      <td><code>loop</code></td>
      <td>All browsers</td>
      <td>Loop the video.</td>
    </tr>
    <tr>
      <td><code>controls</code></td>
      <td>All browsers</td>
      <td>Show the default video controls (play, pause, etc.)</td>
    </tr>
  </tbody>
</table>

#### Autoplay

On desktop, `autoplay` tells the browser to immediately start downloading and
playing the video as soon as it can. On iOS, and Chrome for Android, `autoplay`
doesn't work; users must tap the screen to play the video. You can test this
with the video at [simpl.info/video](//simpl.info/video), which has an
`autoplay` attribute.

Even on platforms where autoplay is possible, you need to consider whether
it's a good idea to enable it:

* Data usage can be expensive.
* Causing media to download and playback to begin, without asking first, can
  unexpectedly hog bandwidth and CPU, and thereby delay page rendering.
* Users may be in a context where playing video or audio is intrusive.

Autoplay behavior is configurable in the Android WebView via the
[WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
It defaults to true but a WebView app can choose to disable it.

#### Preload

The `preload` attribute provides a hint to the browser as to how much
information or content should be preloaded.

<table>
  <thead>
    <tr>
      <th>value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>none</code></td>
      <td>The user may not even watch the video &ndash; don't preload anything</td>
    </tr>
    <tr>
      <td><code>metadata</code></td>
      <td>Metadata (duration, dimensions, text tracks) should be preloaded, but with minimal video.</td>
    </tr>
    <tr>
      <td><code>auto</code></td>
      <td>Downloading the entire video right away is considered desirable.</td>
    </tr>
  </tbody>
</table>

The `preload` attribute has different effects on different platforms.
For example, Chrome buffers 25 seconds of video on desktop, none on iOS or
Android. This means that on mobile, there may be playback startup delays
that don't happen on desktop. See [Steve Souders' test page](//stevesouders.com/tests/mediaevents.php)
for full details.

### JavaScript

[The HTML5 Rocks Video article](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)
does a great job of summarizing the JavaScript properties, methods, and events
that can be used to control video playback. We've included that content here,
updating it with mobile-specific concerns where relevant.

#### Properties

<table class="table">
  <thead>
    <th>Property</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td><code>currentTime</code></td>
      <td>Get or set playback position in seconds.</td>
    </tr>
    <tr>
      <td><code>volume</code></td>
      <td>Get or set current volume level for the video.</td>
    </tr>
    <tr>
      <td><code>muted</code></td>
      <td>Get or set audio muting.</td>
    </tr>
    <tr>
      <td><code>playbackRate</code></td>
      <td>Get or set playback rate; 1 is normal speed forward.</td>
    </tr>
    <tr>
      <td><code>buffered</code></td>
      <td>Information about how much of the video has been buffered and is ready to play (see <a href="//people.mozilla.org/~cpearce/buffered-demo.html" title="Demo displaying amount of buffered video in a canvas element">demo</a>).</td>
    </tr>
    <tr>
      <td><code>currentSrc</code></td>
      <td>The address of the video being played.</td>
    </tr>
    <tr>
      <td><code>videoWidth</code></td>
      <td>Width of the video in pixels (which may be different from the video element width).</td>
    </tr>
    <tr>
      <td><code>videoHeight</code></td>
      <td>Height of the video in pixels (which may be different from the video element height).</td>
    </tr>
  </tbody>
</table>

Neither playbackRate (demo at [simpl.info/rate](//simpl.info/rate))
nor volume are supported on mobile.

#### Methods

<table class="table">
  <thead>
    <th>Method</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td><code>load()</code></td>
      <td>Load or reload a video source without initiating playback: for example, when the video src is changed using JavaScript.</td>
    </tr>
    <tr>
      <td><code>play()</code></td>
      <td>Play the video from its current location.</td>
    </tr>
    <tr>
      <td><code>pause()</code></td>
      <td>Pause the video at its current location.</td>
    </tr>
    <tr>
      <td><code>canPlayType('format')</code></td>
      <td>Find out which formats are supported (see Check which formats are supported).</td>
    </tr>
  </tbody>
</table>

On mobile (apart from Opera on Android) play() and pause() don't work unless
called in response to user action, such as clicking a button: see the
example at [simpl.info/scripted](//simpl.info/scripted). (Likewise, playback
can't be initiated for content such as embedded YouTube videos.)

#### Events

These are only a subset of the media events that may be fired. Refer to
the [Media events](//developer.mozilla.org/docs/Web/Guide/Events/Media_events)
page on the Mozilla Developer Network for a complete listing.

<table class="table">
  <thead>
    <th>Event</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td><code>canplaythrough</code></td>
      <td>Fired when enough data is available that the browser believes it can play the video completely without interruption.</td>
    </tr>
    <tr>
      <td><code>ended</code></td>
      <td>Fired when video has finished playing.</td>
    </tr>
    <tr>
      <td><code>error</code></td>
      <td>Fired if an error occurs.</td>
    </tr>
    <tr>
      <td><code>playing</code></td>
      <td>Fired when video starts playing for the first time, after being paused, or when restarting.</td>
    </tr>
    <tr>
      <td><code>progress</code></td>
      <td>Fired periodically to indicate download progress.</td>
    </tr>
    <tr>
      <td><code>waiting</code></td>
      <td>Fired when an action is delayed pending completion of another action.</td>
    </tr>
    <tr>
      <td><code>loadedmetadata</code></td>
      <td>Fired when browser finishes loading metadata for video: duration, dimensions and text tracks.</td>
    </tr>
  </tbody>
</table>

{% include modules/related.liquid list=page.related.optimize %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
