---
layout: article
title: "Video"
description: "Users like videos: videos can be fun, informative; users can also consume
information on the go easier than having to read small font and scroll down a
page on a mobile device. Read more to find the simplest way to add video to your site and ensure users
get the best possible experience on any device."
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
collection: introduction-to-media
key-takeaways:
  add-a-video:
    - Use the video element to load, code, and play video in your site.
    - "Don't load the whole video if unnecessary: specify a start and end time."
    - Include a poster image so the user sees something meaningful right away.
    - Specify multiple file formats since not all browsers support the same format.
    - "Improve network performance: specify each file source's type."
remember:
  specify-a-start-time: 
    - The Media Fragments API is supported on most platforms, but not on iOS.
  range-request: 
    - Make sure Range Requests are supported by your server. Range Requests are enabled by 
      default on most servers, but some hosting services may turn them off. 
  multiple-formats:
    - MP4 and WebM are http://en.wikipedia.org/wiki/Container_format_(digital) formats 
      MP4 stores audio using AAC compression and video using H.264; WebM uses VP9 and Opus. 
      Check out http://www.xiph.org/video/vid1.shtml 
      to find out more about how video and audio work on the web.
---
People like videos: videos can be fun, informative; users can also consume information on the go easier than having to read small fonts and scroll down a page on a mobile device.

But videos take bandwidth, they don't always work the same across every platform, so any value the user might get from watching video diminishes when the user has to wait for the video to load, or the user presses play and nothing happens.

Read more to find the simplest way to add video to your site and ensure users get the best possible experience on any device.

# Add a video

{% include modules/highlight.liquid title="Key Takeaway" list=page.key-takeaways.add-a-video %}

### Add the video element

Load, decode, and play video:

    &lt;video src='foo.webm'&gt;
             &lt;p&gt;This browser does not support the video element.&lt;/p&gt;
    &lt;/video&gt;

### Specify a start and end time

Save bandwidth and make your site feel more responsive: use the Media Fragments API to add a start and end time to the video element (full sample: [simpl.info/mf](http://simpl.info/mediafragments/)):

{% include_code _code/fragment.html fragments %}
 
    &lt;video src='foo.webm#**t=5,10**'&gt;
        &lt;p&gt;This browser does not support the video element.&lt;/p&gt;
    &lt;/video&gt;

{% include modules/highlight.liquid title="Remember" type="remember" list=page.remember.specify-a-start-time %}

You can also use the Media Fragments API to deliver multiple views on the same video -- like cue points in a DVD -- without having to encode and serve multiple files:

    &lt;video src='foo.webm#t=5,10'&gt;
        &lt;p&gt;This browser does not support the video element.&lt;/p&gt;
    &lt;/video&gt;

{% include modules/highlight.liquid title="Remember" type="remember" list=page.remember.range-request %}
  
To check for Range Request support, your browser tools for `Accept-Ranges: bytes` in the response headers:

[ADD SCREENSHOT]

### Include a poster image

Add a poster attribute to the video element so that your users have an idea of the content as soon as the element loads, without needing to download video or start playback:

    &lt;video src='foo.webm#t=5,10' poster='foo.jpg'&gt;
        &lt;p&gt;This browser does not support the video element.&lt;/p&gt;
    &lt;/video&gt;

A poster can also be a fallback if the video `src` is broken or none of the video formats supplied are supported. The only downside to poster images is an additional file request, which consumes some bandwidth and requires rendering. For more information see [Image optimization](https://docs.google.com/a/google.com/document/d/1EdBtvM_OIdmZlPhtOq_oLuQ4nGEq1dycOsN8A-KtExY/edit#heading=h.satr4xiyp2fp).

Here's a side-by-side comparison of videos without and with a poster image -- we've made the poster image grayscale to prove it's not the video!

[SCREENSHOT]

### Specify multiple file formats

Not all browsers support the same video formats.

Use the source element to enable browsers to choose from multiple available formats. MP4 and WebM cover all modern browsers, including all mobile browsers:

    &lt;video src='foo.webm#t=5,10' poster='foo.jpg'&gt;
         &lt;source src="video/foo.mp4" /&gt;
         &lt;source src="video/foo.webm" /&gt;
        &lt;p&gt;This browser does not support the video element.&lt;/p&gt;
    &lt;/video&gt;

The user's browser selects the first available format it can play. This approach has several advantages over serving different HTML or server-side scripting, especially on mobile:

* Developers can list formats in order of preference.
* Native client-side switching reduces latency: only one request is made to get content.
* Letting the browser choose a format is simpler, quicker and potentially more reliable than using a server-side support database with user-agent detection.

All of these points are especially potent in mobile contexts, where bandwidth and latency are at a premium, and the user's patience is likely to be limited.

{% include modules/highlight.liquid title="Remember" type="remember" list=page.remember.multiple-formats %}

### Specify each source's type

Adding a type attribute to a source element enables the browser to select a video source without having to download part of the video to 'sniff' the format. Instead of: `&lt;source src="video/chrome.webm" /&gt;`, use `&lt;source src="video/chrome.webm" type="video/webm" /&gt;`. You can specify codecs as well as a mime type. For example: `&lt;source src="video/chrome.webm" type="video/webm; codecs="vp8, vorbis" /&gt;`.

Not including a type attribute can affect performance when there are multiple sources with unsupported types: using your mobile browser developer tools, compare network activity for [simpl.info/video](http://simpl.info/video/) and [simpl.info/video/notype](http://simpl.info/video/notype/).

**Remember:** [Ensure your server reports the right MIME type](https://developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types); otherwise video source type checks won't work. Check this with curl: `curl -I simpl.info/video/videos/chrome.mp4` should return a response like `Content-Type: video/mp4`.

## Provide alternatives for legacy platforms

{% class takeaways %}
* Check which formats are supported.
* Produce video in multiple formats to cover a range of mobile platforms.
* Check which format was used.
{% endclass %}

### Check which formats are supported

Use [canPlayType()](https://simpl.info/canplaytype/) to find out which formats are supported. The method takes a string argument consistent of a mime type and optional codecs and returns one of the following values:

* [empty string]: the container and/or codec isn't supported.
* `**"maybe"**`: the container and codec(s) might be supported, but the browser will need to download some video to check.
* `**"probably"**`: the format appears to be supported.

Here are some examples of `canPlayType()` arguments and return values when run in Chrome:

    **video/xyz:** ""
    **video/xyz; codecs="avc1.42E01E, mp4a.40.2":** ""
    **video/xyz; codecs="nonsense, noise":** ""
    **video/mp4; codecs="avc1.42E01E, mp4a.40.2":** "probably"
    **video/webm:** "maybe"
    **video/webm; codecs="vp8, vorbis":** "probably"

### Produce video in multiple formats

There are lots of tools to help save the same video in different formats:

* Desktop tools: [FFmpeg](http://ffmpeg.org/)
* GUI applications: [Miro](http://www.mirovideoconverter.com/), [HandBrake](http://handbrake.fr/), [VLC](http://www.videolan.org/)
* Online encoding/transcoding services: [Zencoder](http://en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](http://aws.amazon.com/elastictranscoder/)

### Check which format was used

Want to know which video format was actually chosen by the browser?

In JavaScript, use the video's `currentSrc` property to return the source used:

    document.querySelector('video').onloadedmetadata = function(){
        var fileName = this.currentSrc.replace(/^.*[\\\/]/, '');
        document.querySelector("#videoSrc").textContent = 'Playing video: ' + fileName;
    };

Given the source example above, Chrome and Firefox choose `chrome.webm` (because that's the first in the list of potential sources these browsers support) whereas Safari chooses `chrome.mp4`.

## Size videos correctly

{% class takeaways %}
* Avoid serving video that is too long, too large in frame size, or   unnecessarily high in quality.
* Check video size: frame size may be different from element size.
* Ensure videos don't overflow their containers.
{% endclass %}

### Size matters

When it comes to keeping your users happy, size matters:

* Don't serve videos with a larger frame size or higher quality than the platform can handle.
* Don't make your videos any longer than they need be.
* Long videos can cause hiccups with download and seeking; some browsers may have to wait until the video downloads before beginning playback.

Try this example on your mobile browser and see what happens: [simpl.info/longvideo](http://simpl.info/longvideo).

### Check video size

The actual video frame size as encoded may be different from the video element dimensions (just as an image may not be displayed using its actual dimensions). For example, resizing the page [simpl.info/video](http://simpl.info/video) changes the size of the video element but the video's frame size is always 480x270px.

To check the encoded size of a video, use the video element `videoWidth` and `videoHeight` properties.

`width` and `height` return the dimensions of the video element, which may have been sized using CSS or inline width and height attributes.

### Ensure videos don't overflow containers

Here's what a plain video element with no element sizing or CSS looks like in Chrome on Android (portrait and landscape):

[SCREENSHOT]

The video elements are too big for the viewport; the user can't even see the video controls properly. It's super important to size video elements to fit their containers.

You can control video dimensions using JavaScript or CSS. JavaScript libraries such as Fit FitVids jQuery plugin make it possible to maintain appropriate size and aspect ratio, even for Flash videos from YouTube and other sources.

Use [CSS media queries](https://docs.google.com/a/google.com/document/d/1sI9PrGi082PUPXe9ACcAdvxPdinGyWAINWSjfUpYJ2Q/edit#heading=h.rhwcxf4xgfg9) to specify the size of elements depending on the viewport dimensions; `max-width: 100%` is your friend:

    video#foo {
        width: 600px;
    }

    @media screen and (max-width: 1000px) {
        video#foo {
            max-width: 100%;
            width: auto;
        }
    }


{% class remember %}
**Remember:** Don't force element sizing that results in an aspect ratio different from the original video. Squashed or stretched looks bad.
{% endclass %}

For media content in iframes (such as YouTube videos), try a responsive approach (like the one [proposed by John Surdakowski](http://avexdesigns.com/responsive-youtube-embed/)):

**CSS:**

    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 30px;
        height: 0;
        overflow: hidden;
    }

    .video-container iframe,
    .video-container object,
    .video-container embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

**HTML:**

    &lt;div class="video-container"&gt;
        &lt;iframe src="http://www.youtube.com/embed/l-BA9Ee2XuM" frameborder="0" width="560" height="315"&gt;&lt;/iframe&gt;
    &lt;/div&gt;

{% class remember %}
**Sample: **Compare the responsive sample: [simpl/yt](http://simpl/yt) to the unresponsive sample: [simple/unyt](http://simple/unyt).
{% endclass %}

## Customize the video player

{% class takeaways %}
* Mobile solutions need to consider device orientation.
* Different platforms display video different.
* Use Fullscreen API to control fullscreening of content.
{% endclass %}

### How device orientation works across devices

Device orientation isn't an issue for desktop monitors or laptops, but is hugely important when considering web page design for mobile and tablets.

Safari on iPhone does a good job of switching between portrait and landscape orientation:

[SCREENSHOT]

Device orientation on an iPad and Chrome on Android can be problematic. For example, without any customization a video playing on an iPad in landscape orientation looks like this:

[SCREENSHOT]

Setting the video `width:100%` with CSS should resolve many device orientation layout problems. You may also want to consider fullscreen alternatives.

### Inline or fullscreen display

Different platforms display video differently. Safari on an iPhone displays a video element inline on a web page, but plays video back in fullscreen mode:

[SCREENSHOT]

On Android, users can request request fullscreen mode by clicking the fullscreen icon. But the default is to play video inline:

[SCREENSHOT]

Safari on an iPad plays video inline:

[SCREENSHOT]

### Control fullscreening of content

For platforms that do not force fullscreen video playback, the Fullscreen API is [widely supported](http://caniuse.com/fullscreen). Use this API to control fullscreening of content, including video (code snippets from [simpl.info/fs](http://simpl.info/fs)):

    // Fullscreen a video element
    videoElement.requestFullScreen()

    // Fullscreen the whole page
    document.body.requestFullScreen();

    // Listen for fullscreen state change
    videoElement.onfullscreenchange = function(){console.log('You fullscreened me!');}

    // Check if element is fullscreened
    console.log(videoElement.displayingFullscreen)

You can also use the CSS `:fullscreen` pseudo-class to change the way elements are displayed in fullscreen mode.

On devices that support the Fullscreen API, consider using thumbnail images as placeholders for video (demo on Chrome for Android):

[SCREENSHOT]

To see this in action, check out the [simpl.info/fullscreen/video](http://simpl.info/fullscreen/video) demo. When you tap or click on a thumbnail, the thumbnail is replaced by a fullscreen video element.

### Include captions to improve accessibility

{% class takeaways %}
* Focus on the user: accessibility matters.
* Add track element as a child of the video element.
* Define captions in track file.
{% endclass %}

### Accessibility matters

Accessibility isn't a feature. Users who can't hear or see won't be able to experience a video at all without captions or descriptions. The time it takes to add these to your video is much less than the bad experience you are delivering to users. Provide at least a base experience for all users.

To make media more accessible on mobile, include captions or descriptions using the track element.

{% class note %}
**Availability:** The track element is [supported on Chrome for Android, iOS Safari, and all current browsers on desktop (except Firefox)](http://caniuse.com/track). There are several polyfills available too. We recommend [Playr](http://www.delphiki.com/html5/playr/) or [Captionator](http://captionatorjs.com/).
{% endclass %}

Using the track element, captions appear like this:

[SCREENSHOT]

### Add track element

It's very easy to add captions to your video -- simply add a [track element](http://www.html5rocks.com/en/tutorials/track/basics/) as a child of the video element:

    &lt;video&gt;
        &lt;source src="video/chrome.mp4" type="video/mp4;" /&gt;
        &lt;source src="video/chrome.webm" type="video/webm" /&gt;
        &lt;track src="tracks/chrome-subtitles-en.vtt" /&gt;
        &lt;p&gt;This browser does not support the video element.&lt;/p&gt;
    &lt;/video&gt;

The track element `src` attribute gives the location of the track file.

### Define captions in track file

A track file consists of timed 'cues' in WebVTT format:

WEBVTT FILE

1 00:00:00.500 --&gt; 00:00:02.000 The Web is always changing

2 00:00:02.500 --&gt; 00:00:04.300 and the way we access it is changing

## Handle poor connectivity with adaptive streaming

{% class takeaways %}
* Enable adaptive streaming to cope with variable network conditions.
* Use the Media Source Extensions API to construct video streams.
* Use DASH to enable high quality streaming on the web.
{% endclass %}

### What is adaptive streaming?

The video element is a simple way to enable video in your web pages; however, it doesn't enable your site to move between different bitrate video encodings in response to network conditions.

Adaptive streaming is a set of techniques that provide more fine grained control over video download and playback.

* **Buffer control:** choose bitrate depending on the size of the video buffer, i.e. how much 'fuel in the tank' remains.
* **Efficient seeking**: move between different parts of a video with minimal unnecessary download.
* **Bitrate management**: seamlessly swap between higher or lower bitrate in response to connectivity fluctuations.

### Construct video streams

Video streaming services use server-side solutions to enable adaptive streaming, such as Adobe's RTMP protocol and Flash Media Server. However, these solutions can be expensive and potentially complex, they require plug-ins not supported on mobile platforms, and don't take advantage of HTTP – a protocol optimised over many years for delivery of content on the web.

The [Media Source Extensions](http://updates.html5rocks.com/2011/11/Stream-video-using-the-MediaSource-API) (MSE) API enables JavaScript to construct video streams, which in turns enables client-side adaptive streaming techniques that take advantage of HTTP.

There's a simple example of MSE at [simpl.info/mse](http://simpl.info/mse).

{% class note %}
**Availability:** MSE is supported by Chrome and Opera on Android, and in Internet Explorer 11 and Chrome for desktop, with [support planned for Firefox](https://wiki.mozilla.org/Platform/MediaSourceExtensions).
{% endclass %}

### Enable high quality streaming on the web

[Dynamic Adaptive Streaming over HTTP](http://www.html5rocks.com/en/tutorials/eme/basics/#related-technology-2) (DASH) is an open standard for adaptive streaming designed to enable media delivery at the highest possible quality for both streaming and download. Technologies such as Apple's [HTTP Live Streaming](https://en.wikipedia.org/wiki/HTTP_Live_Streaming) (HLS) and Microsoft's [Smooth Streaming](https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming#Microsoft_Smooth_Streaming) also provide adaptive-bitrate streaming via HTTP, but are not open source.

With DASH:

1. Media is encoded at different bitrates.
2. The different bitrate files are segmented and made available from an HTTP server.
3. A client web app chooses which bitrate to retrieve and play.

DASH can be done using the Media Source Extensions API. As part of the video segmentation process, an XML manifest known as a Media Presentation Description (MPD) is built programmatically. This describes the individual video components and how they fit together.

DASH is already in use by sites such as YouTube; you can see DASH in action with the [YouTube DASH demo ](http://dash-mse-test.appspot.com/dash-player.html?url=http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-manifest.mpd)[player](http://dash-mse-test.appspot.com/dash-player.html?url=http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-manifest.mpd).

## Reference ###

** Video element attributes

For the complete list of video element attributes and their definitions, see: [http://www.w3.org/TR/html5/embedded-content-0.html#the-video-element](http://www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table>
<tr>
    <td>Element</td>
    <td>Availability</td>
    <td>Description</td>
</tr>
<tr>
    <td>`src`</td>
    <td>All browsers</td>
    <td>Gives the address (URL) of the video.</td>
</tr>
<tr>
    <td>`poster`</td>
    <td>All browsers</td>
    <td>Gives the address (URL) of an image file that the browser can show as soon as the video element loads, before playback begins.</td>
</tr>
<tr>
    <td>`preload`</td>
    <td>All mobile browsers ignore preload.</td>
    <td>Hints to the browser that loading part of a video in advance of playback is worthwhile. Options are none, metadata, or auto (see Preload section for details). </td>
</tr>
<tr>
    <td>`autoplay`</td>
    <td>Not supported on iPhone or Chrome for Android; supported on all desktop browsers, iPad, Firefox and Opera for Android.</td>
    <td>Tells the browser to immediately start downloading the video and play it as soon as it can (see Autoplay). </td>
</tr>
<tr>
    <td>`loop`</td>
    <td>All browsers</td>
    <td>Tells the browser to automatically loop the video.</td>
</tr>
<tr>
    <td>`controls`</td>
    <td>All browsers</td>
    <td>Shows the default video controls (play, pause, etc.)</td>
</tr>
<tr>
    <td>`width`</td>
    <td>All browsers</td>
    <td>Returns the width of the video in pixels.</td>
</tr>
<tr>
    <td>`height`</td>
    <td>All browsers</td>
    <td>Returns the height of the video in pixels.</td>
</tr>
</table>

#### Autoplay

On desktop, `autoplay` tells the browser to immediately start downloading and playing the video as soon as it can. On iOS, and Chrome for Android, `autoplay` doesn't work; users must tap the screen to play the video. You can test this with the video at [simpl.info/video](http://simpl.info/video), which has an `autoplay` attribute.

Even on platforms where autoplay is possible, you need to consider whether it's a good idea to enable it:

* Data usage can be expensive.
* Causing media to download and playback to begin, without asking first, can   unexpectedly hog bandwidth and CPU, and thereby delay page rendering.
* Users may be in a context where playing video or audio is intrusive.

Autoplay behavior is configurable in the Android WebView with the following API: [http://developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)](http://developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)). It defaults to true but a WebView app can choose to disable it.

#### Preload

To be clear: `preload` is just a hint to browsers about how to download and play the video; the options are:

* `**none**` hints to the browser that the user most likely won't watch the   video
* `**metadata**` hints to the browser that metadata (duration,   dimensions, text tracks) should be preloaded, but with minimal video.
* `**auto**`hints to the browser that downloading the entire video right away is   considered desirable.

The `preload` element has different effects on different platforms. For example, Chrome buffers 25 seconds of video on desktop, none on iOS or Android. This means that on mobile, there may be playback startup delays that don't happen on desktop. See [stevesouders.com/tests/mediaevents.php](http://stevesouders.com/tests/mediaevents.php) for full details.

### JavaScript

[The HTML5 Rocks Video article](http://www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) does a great job of summarizing the JavaScript properties, methods, and events that can be used to control video playback. We've included that content here, updating it with mobile-specific concerns where relevant.

#### Properties

<table>
<tr>
    <td>Property</td>
    <td>Description</td>
</tr>
<tr>
    <td>`currentTime`</td>
    <td>Get or set playback position in seconds.</td>
</tr>
<tr>
    <td>`volume`</td>
    <td>Get or set current volume level for the video.</td>
</tr>
<tr>
    <td>`muted`</td>
    <td>Get or set mute state.</td>
</tr>
<tr>
    <td>`playbackRate`</td>
    <td>Get or set playback rate; 1 is normal speed forward.</td>
</tr>
<tr>
    <td>`currentSrc`</td>
    <td>Return current video source file being played.</td>
</tr>
<tr>
    <td>`videoWidth` `videoHeight`</td>
    <td>Returns actual dimensions of video, not video element size.</td>
</tr>
</table>

Neither playbackRate (demo at [simpl.info/rate](http://simpl.info/rate)) nor volume are supported on mobile.

#### Methods

<table>
<tr>
    <td>Method</td>
    <td>Description</td>
</tr>
<tr>
    <td>`load()`</td>
    <td>Load or reload a video source without initiating playback: for example, when the video `src` is changed using JavaScript.</td>
</tr>
<tr>
    <td>`play()`</td>
    <td>Play the video from its current location. On mobile (apart from Opera on Android) `play()` and `pause()` don't work unless called in response to user action, such as clicking a button: see the example at simpl.info/scripted. (Likewise, playback can't be initiated for content such as embedded YouTube videos.)</td>
</tr>
<tr>
    <td>`pause()`</td>
    <td>Pause the video at its current location. This can only be done in response to user action (see `play()` above).</td>
</tr>
<tr>
    <td>`canPlayType(format)`</td>
    <td>Find out which formats are supported (see Check which formats are supported).</td>
</tr>
</table>

Note that playback scripting is not supported on mobile.

#### Events

These are only a subset of the media events that may be fired. Refer to the [Media events](https://developer.mozilla.org/docs/Web/Guide/Events/Media_events) page on the Mozilla Developer Network for a complete listing.

<table>
<tr>
    <td>Event</td>
    <td>Description</td>
</tr>
<tr>
    <td>`canplaythrough`</td>
    <td>Fired when enough data is available that browser believes it can play the video completely without interruption.</td>
</tr>
<tr>
    <td>`ended`</td>
    <td>Fired when video has finished playing.</td>
</tr>
<tr>
    <td>`error`</td>
    <td>Fired if an error occurs.</td>
</tr>
<tr>
    <td>`playing`</td>
    <td>Fired when video starts playing for the first time, after being paused, or when restarting.</td>
</tr>
<tr>
    <td>`progress`</td>
    <td>Fired periodically to indicate download progress.</td>
</tr>
<tr>
    <td>`waiting`</td>
    <td>Fired when an action is delayed pending completion of another action.</td>
</tr>
<tr>
    <td>`loadedmetadata`</td>
    <td>Fired when browser finishes loading metadata for video: duration, dimensions and text tracks.</td>
</tr>
</table>
