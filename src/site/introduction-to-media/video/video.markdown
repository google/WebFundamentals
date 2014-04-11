---
layout: article
title: "Video"
description: ""
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
collection: introductionToMedia
---

Users like videos: videos can be fun, informative; users can also consume 
information on the go easier than having to read small font and scroll down a 
page on a mobile device.

But videos take bandwidth, they don't always work the same across every 
platform, so any value the user might get from watching video diminishes when 
the user has to wait for the video to load, or the user presses play and nothing 
happens.

Read more to find the simplest way to add video to your site and ensure users 
get the best possible experience on any device.

# Add a video

{% class keytakeaway %}

Key takeaways:

* Use video element to load, code, and play video in your site.
* Don't load the whole video if unnecessary-- specify a start and end time.
* Include a poster image so the user sees something meaningful right away.
* Specify multiple file formats since not all browsers support the same format.
* Improve network performance: specify each file format's type.

{% endclass%}

### Add the Video element

Add the video element to any page in your site and users can load, code, and 
play the video: 

    <video src='foo.webm'>
        <p>This browser does not support the video element.</p>
    </video>

### Specify a start and end time

Save bandwidth and make your site feel more responsive: use the Media Fragments 
API to add a start and end time to the video element (full sample: 
simpl.info/mf): 

    <video src='foo.webm#t=5,10'>
        <p>This browser does not support the video element.</p>
    </video>

**Availability:** The Media Fragments API is supported on most platforms, but 
not on iOS. 

You can also use the Media Fragments API to deliver multiple views on the same 
video-- like cue points in a DVD, without having to encode and serve multiple 
files:

    <video src='foo.webm#t=5,10'>
        <p>This browser does not support the video element.</p>
    </video>

**Remember:** Make sure Range Requests are supported by your server. Range 
Requests are enabled by default on most servers, but some hosting services may 
turn them off.

To check for range request support, include Accept-Ranges:bytes in the response 
header from your browser tools:

<ADD SAMPLE-- maybe an image>

### Include a poster image

Include a poster attribute in the video element so that your users have an idea 
of the content as soon as the element loads, without needing to download video 
or start playback:

    <video src='foo.webm#t=5,10' poster='foo.jpg'>
        <p>This browser does not support the video element.</p>
    </video>

A poster can also be a fallback if the video src is broken or the video format 
isn't supported. The only downside to poster images is an additional file 
request, which consumes some bandwidth and requires rendering. For information 
on how to optimize your images, see foo-section-in-foo-performance-doc.

Here's a side-by-side comparison of videos without and with a poster image 
(we've made the poster image grayscale to prove it's not the video):

<ADD COMPARISON IMAGES>

### Specify multiple file formats

Not all browsers support the same video format. Use the source element to enable 
browsers to choose from multiple available formats. MP4 and WebM cover all 
modern browsers, including all mobile browsers:

    <video src='foo.webm#t=5,10' poster='foo.jpg'>
        <source src="video/foo.mp4" />
        <source src="video/foo.webm" />
        <p>This browser does not support the video element.</p>
    </video>

The user's browser selects the first available format it can play. This approach 
has several advantages over serving different HTML or server-side scripting, 
especially on mobile:

* The source element is easier to understand and debug than additional 
  client-side or server-side scripting.
* Native client-side switching reduces latency: only one request is made to get 
  content.
* Letting the browser choose it's format is quicker and more reliable than using 
  a server-side database with user-agent detection.

   
All of these points are especially potent in mobile contexts, where bandwidth 
and latency are at a premium, and the user's patience is likely to be limited.

**More information: **MP4 and WebM are container formats: MP4 stores audio using 
AAC compression and video using H.264; WebM uses VP9 and Opus. Check out 
Montgomery's Digital Primer for Geeks to find out more about how video and audio 
work on the web.

### Specify each file format's type

By specifying the type, the browser can select a media source without having to 
download and 'sniff' each source out. Instead of: <source 
src="video/chrome.webm" />, use <source src="video/chrome.webm" type=video/webm" 
/>.

If you don't specify the source element's type, the browser has to retrieve the 
source's type from the server before checking if it's supported. This really 
starts to affect performance when you've multiple sources with unsupported 
types. 

To see just how much performance is affected, use your mobile browser developer 
tools to compare network activity for simpl.info/video and 
simpl.info/video/notype.

**Remember:** Ensure your server reports the right MIME type; otherwise video 
source type checks won't work. Check this with curl: curl -I 
simpl.info/video/videos/chrome.mp4, which returns a response like : 
Content-Type: video/mp4.

## Provide alternatives for legacy platforms

{% class key-takeaway %}
Key takeaways:

* Check which formats are supported.
* Produce video in multiple formats to cover a range of mobile platforms.
* Check which format was used.
{% endclass %}

### Check which formats are supported

Use canPlayType() to find out which formats are supported. The method takes a 
string argument consistent of a mime type and an optional codec and returns one 
of the following values:

* "" (empty string): the container and/or codec isn't supported.
* 'maybe': the container and codec might be supported, but the browser will need 
  to play the video to check.
* 'probably': the format appears to be supported.

Here's some examples of canPlayType() arguments and return values when run in 
Chrome:

    video/xyz: ""
    video/xyz; codecs="avc1.42E01E, mp4a.40.2": ""
    video/xyz; codecs="nonsense, noise": ""
    video/mp4; codecs="avc1.42E01E, mp4a.40.2": "probably"
    video/webm: "maybe"
    video/webm; codecs="vp8, vorbis": "probably"

### Produce video in multiple formats

There's lots of tools that can help you produce the same video in different 
formats:

* Desktop tools: FFmpeg
* GUI applications: Miro, HandBrake, VLC
* Online encoding/transcoding services: Zencoder, Amazon Elastic Encoder

### Check which format was used

Want to know which video format was actually chosen by the browser?

In JavaScript, use the video's currentSrc property to return the source used:

    <script>
      document.querySelector("video").addEventListener("loadedmetadata", function(){
        var fileName = this.currentSrc.replace(/^.*[\\\/]/, '');
      	document.querySelector("#videoSrc").innerHTML = "Playing video: " +                   fileName;
      });
    </script>

Chrome and Firefox choose chrome.webm (because that's the first in the list of 
potential sources these browsers support); Safari chooses chrome.mp4.

## Size videos correctly

Key takeaways:

* Avoid serving too large, long, or high a quality video than the platform can 
  handle.
* Check video size: the frame size may be different from the element size. 
* Ensure videos don't overflow their containers.
* Choose the inline or full-screen player, if possible.

### Size matters

When it comes to keeping your users happy, size matters:

* Don't serve videos with a larger frame size or higher quality than the 
  platform can handle.
* Don't make your videos any longer than they need be.
* Playback for long videos can be buggy; the browser may wait until the video 
  downloads before beginning playback.

Try this example on your mobile browser and see what happens: 
simpl.info/longvideo.

### Check video size

The actual video frame size as encoded may be different from the video element 
dimensions (just as an image may not be displayed using its actual dimensions). 
For example, resizing the page simpl.info/video changes the size of the video 
element but the video's encoded frame size is always 480x270px.

To check the encoded size of a video, use the video element videoWidth and 
videoHeight properties. As with images, be careful not to force element sizing 
that results in an aspect ratio different from the original video. Squashed or 
stretched looks bad.

### Ensure videos don't overflow containers

Here's what a plain video element with no element sizing or CSS looks like in 
Chrome on Android (portrait and landscape):

<IMAGES>

The video is too big for the viewport; the user can't even see the video 
controls. It's super important to size video elements to fit their containers. 

You can control video dimensions using JavaScript or CSS. JavaScript libraries 
such as Fit  
FitVids jQuery plugin make it possible to maintain appropriate size and aspect 
ratio, even for Flash videos from YouTube and other sources.

Use CSS media queries to specify the size of elements depending on the viewport 
dimensions; max-width: 100% is your friend:

    video#foo {
      width: 600px;
    }

    @media screen and (max-width: 1000px) {
      video#foo {
        max-width: 100%;
        width: auto;
      }
    }

For media content in iframes (such as YouTube videos), try a responsive approach 
(like the one proposed by John Surdakowski):

**CSS:**

    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 30px; height: 0; overflow: hidden;
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

    <div class="video-container">
      <iframe src="http://www.youtube.com/embed/l-BA9Ee2XuM" frameborder="0" width="560" height="315"></iframe>
    </div>

**Sample: **Compare the responsive sample: simpl/yt to the unresponsive sample: 
simple/unyt.

## Customize the video player

**Key take-aways:**

* Mobile solutions need to consider device orientation.
* Different platforms display video different.
* Use Fullscreen API to control full-screening of content.

### How device orientation works across devices

Device orientation isn't an issue for desktop monitors or laptops, but is hugely 
important when considering web page design for mobile and tablets.

Safari on iPhone does a good job of switching between portrait and landscape 
orientation:

<IMAGE>

Device orientation on an iPad and Chrome on Android can be problematic. For 
example, without any customization a video playing on an iPad in landscape 
orientation looks like this:

<IMAGE>

Setting the video width:100% with CSS may resolve most device orientation layout 
problems. You may also want to consider full-screen alternatives.

### Inline or full-screen display

Different platforms display video differently. Safari on an iPhone displays a 
video element inline on a web page, but plays video back in full-screen mode:

<IMAGE>

On Android, users can request request full-screen mode by clicking the 
full-screen icon. But the default is to play video inline:

<IMAGE>

Safari on an iPad plays video inline:

<IMAGE>

### Control full-screening of content

For platforms that do not force full-screen video playback, the Full-screen API 
is widely supported. Use this API to control full-screening of content, 
including video (code snippets from simpl.info/fs):

<ADD SNIPPETS>

You can also use the CSS :full-screen pseudo-class to change the way elements 
are displayed in full-screen mode.

On devices that support the Fullscreen API, consider using thumbnail images as 
placeholders for video (demo on Chrome for Android):

<IMAGE>

When you tap or click on a thumbnail, the thumbnail is replaced by a fullscreen 
video element. To see this in action, check out the  
[simpl.info/fullscreen/video](http://simpl.info/fullscreen/video) demo.

## Include captions to improve accessibility

**Key takeaways:**

* Focus on the user: accessibility matters.

* Add track element as a child of the video element.
* Define captions in track file.

### Accessibility matters

Accessibility isn't a feature. Users who can't hear or see won't be able to 
experience a video at all without captions. The time it takes to add captions to 
your video is much less than the bad experience you are delivering to users. 
Provide at least a base experience for all users.

To make media more accessible on mobile, include captions using the track 
element. 

**Availability: **The track element is supported on Chrome for Android, iOS 
Safari, and all current browsers on desktop (except Firefox). There are several 
polyfills available too. We recommend Playr or Captionator.

Captions appear in video like this:

<IMAGE>

### Add track element

It's very easy to add captions to your video-- simply add a track element as a 
child of the video element:

<ADD SNIPPET>

The track element refers to the track file.

### Define captions in track file

The track file consists of timed 'cues' in WebVTT format:

<ADD SNIPPET>

## Handle poor connectivity with adaptive streaming

**Key takeaways:**

* Enable adaptive streaming to cope with variable network conditions.
* Use the Media Source Extensions API to construct video streams.
* Use DASH to enable high quality streaming on the web.

### What is adaptive streaming?

The video element is a simple way to enable video in your web pages; however, it 
doesn't enable your site to move between different bitrate video encodings in 
response to network conditions.

**Adaptive streaming **is a set of techniques that provide more fine grained 
control over video download and playback:

* **Buffer control** – the ability to choose bitrate depending on the size of 
  the video buffer (i.e. how much 'fuel in the tank' remains).
* **Efficient seeking **– the ability to move between different parts of a 
  video, with minimal unnecessary download. 
* **Bitrate management** – seamless swapping between higher or lower quality 
  encodings in order to handle connectivity fluctuations. 

### Construct video streams

Video streaming services use server-side solutions to enable adaptive streaming, 
such as Adobe's RTMP protocol and Flash Media Server. However, these solutions 
are expensive, potentially complex, require plug-ins not supported on mobile 
platforms, and don't take advantage of HTTP – a protocol optimised over many 
years for delivery of content on the web.

The [Media Source 
Extensions](http://updates.html5rocks.com/2011/11/Stream-video-using-the-MediaSource-API) 
(MSE) API enables JavaScript to construct video streams, which in turns enables 
client-side adaptive streaming techniques that take advantage of HTTP.

**Availability: **MSE is supported by Chrome and Opera on Android, and in 
Internet Explorer 11 and Chrome for desktop, with [support planned for 
Firefox](https://wiki.mozilla.org/Platform/MediaSourceExtensions).

### Enable high quality streaming on the web

[Dynamic Adaptive Streaming over 
HTTP](http://www.html5rocks.com/en/tutorials/eme/basics/#related-technology-2) 
(DASH) is an open standard for adaptive streaming designed to enable media 
delivery at the highest possible quality for both streaming and download. 
Technologies such as Apple's [HTTP Live 
Streaming](https://en.wikipedia.org/wiki/HTTP_Live_Streaming) (HLS) and 
Microsoft's [Smooth 
Streaming](https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming#Microsoft_Smooth_Streaming) 
also provide adaptive-bitrate streaming via HTTP, but are not open source. 

With DASH:

1. Media is encoded at different bitrates.
1. The different bitrate files are segmented and made available from an HTTP 
   server.
1. A client web app chooses which bitrate to retrieve and play.

DASH can be done using the Media Source Extensions API. As part of the video 
segmentation process, an XML manifest known as a Media Presentation Description 
(MPD) is built programmatically. This describes the individual video components.

DASH is already in use by sites such as YouTube; you can see DASH in action the 
[YouTube DASH demo 
](http://dash-mse-test.appspot.com/dash-player.html?url=http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-manifest.mpd)[player](http://dash-mse-test.appspot.com/dash-player.html?url=http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-manifest.mpd).

## Summary of Video reference
### Video element attributes

The official video reference is here: 
[http://www.w3.org/TR/html5/embedded-content-0.html#the-video-element](http://www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

#### Autoplay

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Description:</td>
<td>Tells the browser to immediately start downloading the video and play it as soon as it can.</td>
</tr>
<tr>
<td>Availability:</td>
<td>Autoplay is not currently supported on iPhone or Chrome for Android – but it is supported on all desktop browsers, on iPad, and in Firefox and Opera for Android.
Even on platforms where autoplay is possible, you need to consider whether it's a good idea to enable it:
Data usage can be expensive.
Causing media to download and playback to begin, without asking first, can unexpectedly hog bandwidth and CPU, and thereby delay page rendering.
Users may be in a context where playing video or audio is intrusive.
Autoplay behavior is configurable in the Android WebView with the following API: http://developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean). It defaults to true but a WebView app can choose to disable it.
Scripted playback is not supported on mobile (apart from Opera on Android). This means that play() and pause() can't be done programmatically, and neither can control of content such as embedded YouTube videos. </td>
</tr>
<tr>
<td>Learn more:</td>
<td>You can test this with the video at simpl.info/video, which has an autoplay attribute.</td>
</tr>
</table>

#### Controls

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Description:</td>
<td>Shows the default video controls (play, paul, etc.).</td>
</tr>
<tr>
<td>Availability:</td>
<td>All browsers.</td>
</tr>
<tr>
<td>Learn more:</td>
<td>MDN's Video Element Attributes</td>
</tr>
</table>

#### Height & Width

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Description:</td>
<td>Sets the width and height of the video in CSS pixels.</td>
</tr>
<tr>
<td>Availability:</td>
<td>All browsers.</td>
</tr>
<tr>
<td>Learn more:</td>
<td>MDN's Video Element Attributes</td>
</tr>
</table>

#### Loop

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Description:</td>
<td>Tells the browser to automatically loop the video.</td>
</tr>
<tr>
<td>Availability:</td>
<td>All browsers.</td>
</tr>
<tr>
<td>Learn more:</td>
<td>MDN's Video Element Attributes</td>
</tr>
</table>

#### Poster

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Description:</td>
<td>Provides an image to show before the video loads.</td>
</tr>
<tr>
<td>Availability:</td>
<td>All browsers.</td>
</tr>
<tr>
<td>Learn more:</td>
<td>MDN's Video Element Attributes</td>
</tr>
</table>

#### Preload

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Description:</td>
<td>To quote from the HTML5 video standard using the preload='metadata' attribute does the following:
Hints to the user agent that the author does not expect the user to need the media resource, but that fetching the resource metadata (dimensions, track list, duration, etc), and maybe even the first few frames, is reasonable. … When the media resource is playing, hints to the user agent that bandwidth is to be considered scarce, e.g. suggesting throttling the download so that the media data is obtained at the slowest possible rate that still maintains consistent playback.
To be clear: preload is just a hint, and has different defaults on different platforms. For example, Chrome buffers 25 seconds of video on desktop, none on iOS or Android. This means that on mobile, there may be playback startup delays that don't happen on desktop.</td>
</tr>
<tr>
<td>Availability:</td>
<td>Mobile browsers ignore preload (video is never preloaded).</td>
</tr>
<tr>
<td>Learn more:</td>
<td>See stevesouders.com/tests/mediaevents.php for full details. </td>
</tr>
</table>

### JavaScript properties

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Property</td>
<td>Description</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
</table>

### JavaScript methods

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Method</td>
<td>Description</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
</table>

### JavaScript events

https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Event</td>
<td>Description</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
</table>

