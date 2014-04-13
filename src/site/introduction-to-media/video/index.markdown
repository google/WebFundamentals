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

## Add a video

{% class key-takeaway %}  
Key takeaways:

* Use video element to load, code, and play video in your site.
* Don't load the whole video if unnecessary-- specify a start and end time.
* Include a poster image so the user sees something meaningful right away.
* Specify multiple file formats since not all browsers support the same format.
* Improve network performance: specify each file format's type.

{% endclass %}

### Add the Video element

Add the video element to any page in your site and users can load, code, and 
play the video: 

    <video src='foo.webm'>
        <p>This browser does not support the video element.</p>
    </video>

### Specify a start and end time

Save bandwidth and make your site feel more responsive: use the Media Fragments 
API to add a start and end time to the video element (full sample: 
[simpl.info/mf](http://simpl.info/mediafragments/)): 

    <video src='foo.webm#t=5,10'>
        <p>This browser does not support the video element.</p>
    </video>

{% class note %}  
**Availability****:** The Media Fragments API is supported on most platforms, 
but not on iOS.   
{% endclass %}

You can also use the Media Fragments API to deliver multiple views on the same 
video-- like cue points in a DVD, without having to encode and serve multiple 
files:

    <video src='foo.webm#t=5,10'>
        <p>This browser does not support the video element.</p>
    </video>

{% class remember %}  
**Remember****:** Make sure Range Requests are supported by your server. Range 
Requests are enabled by default on most servers, but some hosting services may 
turn them off.  
{% endclass %}

To check for range request support, include `Accept-Ranges:bytes` in the 
response header from your browser tools:

[ADD SCREENSHOT]

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

<!-- No converter for: PAGE_BREAK -->  
Here's a side-by-side comparison of videos without and with a poster image 
(we've made the poster image grayscale to prove it's not the video):

<img src="image00.png" width="224" height="373" />        <img src="image01.png" 
width="222" height="372" />

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

* Developers can list formats in order of preference.
* Native client-side switching reduces latency: only one request is made to get 
  content.
* Letting the browser choose it's format is quicker and more reliable than using 
  a server-side database with user-agent detection.

   
All of these points are especially potent in mobile contexts, where bandwidth 
and latency are at a premium, and the user's patience is likely to be limited.

{% class note %}  
**More information: **MP4 and WebM are 
[container](http://en.wikipedia.org/wiki/Container_format_(digital)) formats: 
MP4 stores audio using AAC compression and video using H.264; WebM uses VP9 and 
Opus. Check out [Montgomery's Digital Primer for 
Geeks](http://www.xiph.org/video/vid1.shtml) to find out more about how video 
and audio work on the web.  
{% endclass %}

### Specify each file format's type

By specifying the type, the browser can select a media source without having to 
download and 'sniff' each source out. Instead of: `<source 
src="video/chrome.webm" />`, use `<source src="video/chrome.webm" 
type=video/webm" />`.

If you don't specify the source element's type, the browser has to retrieve the 
source's type from the server before checking if it's supported. This really 
starts to affect performance when you've multiple sources with unsupported 
types. 

To see just how much performance is affected, use your mobile browser developer 
tools to compare network activity for 
[simpl.info/video](http://simpl.info/video/) and 
[simpl.info/video/notype](http://simpl.info/video/notype/).

**Remember:** [Ensure your server reports the right MIME 
type](https://developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types); 
otherwise video source type checks won't work. Check this with curl: `curl -I 
simpl.info/video/videos/chrome.mp4`, which returns a response like : 
`Content-Type: video/mp4`.

## Provide alternatives for legacy platforms

{% class key-takeaway %}  
Key takeaways:

* Check which formats are supported.
* Produce video in multiple formats to cover a range of mobile platforms.
* Check which format was used.

{% endclass %}

### Check which formats are supported

Use [canPlayType()](https://simpl.info/canplaytype/) to find out which formats 
are supported. The method takes a string argument consistent of a mime type and 
an optional codec and returns one of the following values:

* [empty string]: the container and/or codec isn't supported.
* **"maybe"**: the container and codec might be supported, but the browser will 
  need to play the video to check.
* **"probably"**: the format appears to be supported.

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

* Desktop tools: [FFmpeg](http://ffmpeg.org/)
* GUI applications: [Miro](http://www.mirovideoconverter.com/), 
  [HandBrake](http://handbrake.fr/),[ VLC](http://www.videolan.org/)
* Online encoding/transcoding services: 
  [Zencoder](http://en.wikipedia.org/wiki/Zencoder), [Amazon Elastic 
  Encoder](http://aws.amazon.com/elastictranscoder/)

### Check which format was used

Want to know which video format was actually chosen by the browser?

In JavaScript, use the video's currentSrc property to return the source used:

    <script>
      document.querySelector("video").addEventListener("loadedmetadata", function(){
        var fileName = this.currentSrc.replace(/^.*[\\\/]/, '');
      	document.querySelector("#videoSrc").innerHTML = "Playing video: "
                                                           + fileName;
      });
    </script>

Given the example above, Chrome and Firefox choose chrome.webm (because that's 
the first in the list of potential sources these browsers support); Safari 
chooses chrome.mp4.

## Size videos correctly

{% class key-takeaway %}  
Key takeaways:

* Avoid serving video that is too long, too large in frame size, or too high in 
  quality.
* Check video size: the frame size may be different from the element size.
* Ensure videos don't overflow their containers.

{% endclass %}

### Size matters

When it comes to keeping your users happy, size matters:

* Don't serve videos with a larger frame size or higher quality than the 
  platform can handle.
* Don't make your videos any longer than they need be.
* Long videos can cause hiccups with download and seeking; some browsers may 
  have to wait until the video downloads before beginning playback.

Try this example on your mobile browser and see what happens: 
[simpl.info/longvideo](http://simpl.info/longvideo).

### Check video size

The actual video frame size as encoded may be different from the video element 
dimensions (just as an image may not be displayed using its actual dimensions). 
For example, resizing the page [simpl.info/video](http://simpl.info/video) 
changes the size of the video element but the video's encoded frame size is 
always 480x270px.

To check the encoded size of a video, use the video element videoWidth and 
videoHeight properties. Don't use width and height; these return the dimensions 
of the video element which may have been sized using CSS or inline width and 
height attributes. 

### Ensure videos don't overflow containers

Here's what a plain video element with no element sizing or CSS looks like in 
Chrome on Android (portrait and landscape):

<img src="image02.png" width="196" height="349" />    <img src="image03.png" 
width="324" height="182" />

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

{% class remember %}  
**Remember:** Don't force element sizing that results in an aspect ratio 
different from the original video. Squashed or stretched looks bad.  
{% endclass %}

For media content in iframes (such as YouTube videos), try a responsive approach 
(like the one [proposed by John 
Surdakowski](http://avexdesigns.com/responsive-youtube-embed/)):

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
  <iframe src="http://www.youtube.com/embed/l-BA9Ee2XuM" frameborder="0" 
width="560" height="315"></iframe>  
</div>

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Sample: Compare the responsive sample: simpl/yt to the unresponsive sample: simple/unyt.</td>
</tr>
</table>

## Customize the video player

{% class key-takeaway %}  
**Key take-aways:**

* Mobile solutions need to consider device orientation.
* Different platforms display video different.
* Use Fullscreen API to control full-screening of content.

{% endclass %}

### How device orientation works across devices

Device orientation isn't an issue for desktop monitors or laptops, but is hugely 
important when considering web page design for mobile and tablets.

Safari on iPhone does a good job of switching between portrait and landscape 
orientation:

<img src="image04.png" width="161" height="326" />    <img src="image05.png" 
width="336" height="165" />

<!-- No converter for: PAGE_BREAK -->  
Device orientation on an iPad and Chrome on Android can be problematic. For 
example, without any customization a video playing on an iPad in landscape 
orientation looks like this:

<img src="image06.png" width="624" height="336" />

Setting the video `width:100%` with CSS may resolve most device orientation 
layout problems. You may also want to consider full-screen alternatives.

### <!-- No converter for: PAGE_BREAK -->

### Inline or full-screen display

Different platforms display video differently. Safari on an iPhone displays a 
video element inline on a web page, but plays video back in full-screen mode:

<img src="image07.png" width="193" height="386" />    <img src="image04.png" 
width="194" height="390" />

<!-- No converter for: PAGE_BREAK -->  
On Android, users can request request full-screen mode by clicking the 
full-screen icon. But the default is to play video inline:

<img src="image08.png" width="193" height="344" />    <img src="image09.png" 
width="193" height="344" />

Safari on an iPad plays video inline:

<img src="image06.png" width="624" height="336" />

### Control full-screening of content

For platforms that do not force full-screen video playback, the Full-screen API 
is [widely supported](http://caniuse.com/fullscreen). Use this API to control 
full-screening of content, including video (code snippets from 
[simpl.info/fs](http://simpl.info/fs)):

// Fullscreen a video element  
videoElement.requestFullScreen()

// Fullscreen the whole page  
document.body.requestFullScreen();

// Listen for fullscreen state change  
videoElement.onfullscreenchange =   
  function(){console.log('You fullscreened me!');}

// Check if element is fullscreened  
console.log(videoElement.displayingFullscreen)

You can also use the CSS :full-screen pseudo-class to change the way elements 
are displayed in full-screen mode.

On devices that support the Fullscreen API, consider using thumbnail images as 
placeholders for video (demo on Chrome for Android):

<img src="image10.png" width="429" height="241" />

When you tap or click on a thumbnail, the thumbnail is replaced by a fullscreen 
video element. To see this in action, check out the  
[simpl.info/fullscreen/video](http://simpl.info/fullscreen/video) demo.

## Include captions to improve accessibility

{% class key-takeaway %}  
**Key takeaways:**

* Focus on the user: accessibility matters.

* Add track element as a child of the video element.
* Define captions in track file.

{% endclass %}

### Accessibility matters

Accessibility isn't a feature. Users who can't hear or see won't be able to 
experience a video at all without captions. The time it takes to add captions to 
your video is much less than the bad experience you are delivering to users. 
Provide at least a base experience for all users.

To make media more accessible on mobile, include captions using the track 
element.

{% class note %}  
**Availability: **The track element is [supported on Chrome for Android, iOS 
Safari, and all current browsers on desktop (except 
Firefox)](http://caniuse.com/track). There are several polyfills available too. 
We recommend [Playr](http://www.delphiki.com/html5/playr/) or 
[Captionator](http://captionatorjs.com/).  
{% endclass %}

Captions appear in video like this:

<img src="image11.png" width="624" height="350" />

### Add track element

It's very easy to add captions to your video-- simply add a [track element 
](http://www.html5rocks.com/en/tutorials/track/basics/)as a child of the video 
element:

    <video>
        <source src="video/chrome.mp4" type="video/mp4;" />
        <source src="video/chrome.webm" type="video/webm" />
        <track src="tracks/chrome-subtitles-en.vtt" />
        <p>This browser does not support the video element.</p>
    </video>

The track element refers to the track file.

### Define captions in track file

The track file consists of timed 'cues' in WebVTT format:

    WEBVTT FILE

    1
    00:00:00.500 --> 00:00:02.000
    The Web is always changing

    2
    00:00:02.500 --> 00:00:04.300
    and the way we access it is changing

Captions appear in the video like this:

## Handle poor connectivity with adaptive streaming

{% class key-takeaway %}  
**Key takeaways:**

* Enable adaptive streaming to cope with variable network conditions.
* Use the Media Source Extensions API to construct video streams.
* Use DASH to enable high quality streaming on the web.

{% endclass %}

### What is adaptive streaming?

The video element is a simple way to enable video in your web pages; however, it 
doesn't enable your site to move between different bitrate video encodings in 
response to network conditions.

Adaptive streaming is a set of techniques that provide more fine grained control 
over video download and playback:

* **Buffer control **– the ability to choose bitrate depending on the size of 
  the video buffer (i.e. how much 'fuel in the tank' remains).
* **Efficient seeking** – the ability to move between different parts of a 
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

{% class note %}  
Availability: MSE is supported by Chrome and Opera on Android, and in Internet 
Explorer 11 and Chrome for desktop, with [support planned for 
Firefox](https://wiki.mozilla.org/Platform/MediaSourceExtensions).  
{% endclass %}

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

## Reference

### Video element attributes

For the complete list of video element attributes and their definitions, see:  
[http://www.w3.org/TR/html5/embedded-content-0.html#the-video-element](http://www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Element</td>
<td>Availability</td>
<td>Description</td>
</tr>
<tr>
<td>src</td>
<td>All browsers</td>
<td>Gives the address (URL) of the media resource (video, audio) to show.</td>
</tr>
<tr>
<td>poster</td>
<td>All browsers</td>
<td>Gives the address of an image file (URL) that the user agent can show while no video data is available.</td>
</tr>
<tr>
<td>preload</td>
<td>All mobile browsers ignore preload.</td>
<td>Hints to the browser about whether optimistic downloading of the video itself or its metadata is considered worthwhile. Options are none, metadata, or auto (see Preload for details).</td>
</tr>
<tr>
<td>autoplay</td>
<td>Not supported on iPhone or Chrome for Android; supported on all desktop browsers, iPad, Firefox and Opera for Android.</td>
<td>Tells the browser to immediately start downloading the video and play it as soon as it can (see Autoplay).</td>
</tr>
<tr>
<td>loop</td>
<td>All browsers</td>
<td>Tells the browser to automatically loop the video.</td>
</tr>
<tr>
<td>controls</td>
<td>All browsers</td>
<td>Shows the default video controls (play, paul, etc.).</td>
</tr>
<tr>
<td>width</td>
<td>All browsers</td>
<td>Sets the width of the video in CSS pixels.</td>
</tr>
<tr>
<td>height</td>
<td>All browsers</td>
<td>Sets the height of the video in CSS pixels.</td>
</tr>
</table>

#### Autoplay

On desktop, autoplay tells the browser to immediately start downloading and 
playing the video as soon as it can. On iPhone and Chrome for Android, autoplay 
doesn't work; users must tap the screen to play the video. You can test this 
with the video at [simpl.info/video](http://simpl.info/video), which has an 
autoplay attribute.

Even on platforms where autoplay is possible, you need to consider whether it's 
a good idea to enable it:

* Data usage can be expensive.
* Causing media to download and playback to begin, without asking first, can 
  unexpectedly hog bandwidth and CPU, and thereby delay page rendering.
* Users may be in a context where playing video or audio is intrusive.

Autoplay behavior is configurable in the Android WebView with the following API: 
[http://developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)](http://developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)). 
It defaults to true but a WebView app can choose to disable it.

#### Preload

To be clear: preload is just a hint to browsers about how to download and play 
the video; the options are:

* **none** - Hints to the browser that the user most likely won't watch the 
  video
* **metadata** - To quote from the [HTML5 video 
  standard](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html) 
  using the preload='metadata' attribute does the following:

> Hints to the user agent that the author does not expect the user to need the 
> media resource, but that fetching the resource metadata (dimensions, track 
> list, duration, etc), and maybe even the first few frames, is reasonable. … 
> When the media resource is playing, hints to the user agent that bandwidth is 
> to be considered scarce, e.g. suggesting throttling the download so that the 
> media data is obtained at the slowest possible rate that still maintains 
> consistent playback

* **auto** - Hints to the browser that downloading the entire video right away 
  is considered desirable.

The preload element has different meanings on different platforms. For example, 
Chrome buffers 25 seconds of video on desktop, none on iOS or Android. This 
means that on mobile, there may be playback startup delays that don't happen on 
desktop. See 
[stevesouders.com/tests/mediaevents.php](http://stevesouders.com/tests/mediaevents.php) 
for full details. 

### JavaScript

[The HTML5 Video 
article](http://www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) 
does a great job of summarizing the JavaScript properties, methods, and events 
that you can use to interact or control the media. We've included that content 
here, updating it with mobile-specific concerns, where relevant. 

#### Properties

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Property</td>
<td>Description</td>
</tr>
<tr>
<td>currentTime</td>
<td>Gets or sets playback position in seconds.</td>
</tr>
<tr>
<td>volume</td>
<td>Gets or sets current volume level for the video.</td>
</tr>
<tr>
<td>muted</td>
<td>Gets or sets mute state.</td>
</tr>
<tr>
<td>playbackRate</td>
<td>Gets or sets playback rate; 1 is normal speed forward.</td>
</tr>
<tr>
<td>currentSrc</td>
<td>Returns current video source file being played.</td>
</tr>
<tr>
<td>videoWidth & videoHeight</td>
<td>Returns actual dimensions of video, not video element size.</td>
</tr>
</table>

#### Methods

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Method</td>
<td>Description</td>
</tr>
<tr>
<td>load()</td>
<td>Loads video and rests it to the beginning.</td>
</tr>
<tr>
<td>play()</td>
<td>Plays the video from it's current location. Scripted playback is not supported on mobile (apart from Opera on Android). This means that play() and pause() can't be done programmatically, and neither can control of content such as embedded YouTube videos.</td>
</tr>
<tr>
<td>pause()</td>
<td>Pauses the video from it's current location. This can't be done programmatically on mobile (see play() above).</td>
</tr>
<tr>
<td>canPlayType(format)</td>
<td>Use canPlayType() to find out which formats are supported (see Check which formats are supported).</td>
</tr>
</table>

#### Events

These are only a subset of the media events that may be fired. Refer to the 
[Media events](https://developer.mozilla.org/docs/Web/Guide/Events/Media_events) 
page on the Mozilla Developer Network for a complete listing.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Event</td>
<td>Description</td>
</tr>
<tr>
<td>canplaythrough</td>
<td>Fired when enough data is available that browser believes it can play the video completely without interruption.</td>
</tr>
<tr>
<td>ended</td>
<td>Fired when video has finished playing.</td>
</tr>
<tr>
<td>error</td>
<td>Fired if an error occurs.</td>
</tr>
<tr>
<td>playing</td>
<td>Fired when video starts playing for the first time, after being paused, or when restarting.</td>
</tr>
<tr>
<td>progress</td>
<td>Fired periodically to indicate download progress.</td>
</tr>
<tr>
<td>waiting</td>
<td>Fired when an action is delayed pending completion of another action.</td>
</tr>
<tr>
<td>loadedmetadata</td>
<td>Fired when browser finished loading metadata for video and all attributes are populated.</td>
</tr>
</table>
