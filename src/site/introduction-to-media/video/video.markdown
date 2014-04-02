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

The video element is a thing of simple beauty:

    <video src='foo.webm'>
        <p>This browser does not support the video element.</p>
    </video>

Load, decode and play video in a few lines of code! 

HTML video is [well supported](http://caniuse.com/video): over 85% of browsers 
on mobile and desktop implement the video element, including all current 
versions of all browsers (apart from Opera Mini). There are similar numbers for 
<audio>.

So it's time to move away from plugins. Phone and tablet browsers do not support 
Flash or other media players, plugins are 
[being](https://blog.mozilla.org/futurereleases/2013/09/24/plugin-activation-in-firefox/) 
[deprecated](http://blog.chromium.org/2013/09/saying-goodbye-to-our-old-friend-npapi.html), 
and it's unlikely that future web platforms will support them whether they're 
wearables, big-screen devices, in-car systems or whatever else comes along.

The good news is that a range of powerful media technologies are gaining support 
across mobile platforms:

* [poster='foo.jpg'](https://simpl.info/video)
* [<source>](http://simpl.info/video)
* [<track>](https://simpl.info/video)
* [canPlayType()](https://simpl.info/canplaytype)
* [MSE](http://simpl.info/mse)
* [EME](http://www.html5rocks.com/en/tutorials/eme/basics/)
* [WebRTC](http://www.html5rocks.com/en/tutorials/webrtc/basics/)
* [Fullscreen](https://simpl.info/fullscreen/video)
* [Media Fragments](https://simpl.info/mf)
* [Overlaid content](http://simpl.info/videooverlay)

We look into these below, and explain some techniques for making the most of 
video on mobile. 

Before that – what's the best way to choose content and formats?

## Sources and codecs

The only problem with the simple <video> example above is that it only works on 
browsers that support WebM. To get around this, we can encode to multiple codecs 
and use the source element rather than a single _src_. On mobile, users have 
even less patience than on desktop, so make sure media content works right first 
time:

 <video>
     <source src="video/chrome.mp4" />
     <source src="video/chrome.webm" />
     <p>This browser does not support the video element.</p>
 </video>

From the list of sources available, a browser will select the first available 
format it can play. Using MP4 and WebM will cover  recent versions of all 
browsers on all platofrms, including all current mobile browsers. 

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>MP4 and WebM are container formats. Most commonly, MP4 stores audio using AAC compression and video using H.264. WebM uses VP8 and Vorbis or, more recently VP9 and Opus.  Monty Montgomery's Digital Media Primer for Geeks has more information about how video and audio work on the web.</td>
</tr>
</table>

This approach enables playback on different platforms without having to serve 
different HTML or use server-side scripting. This has several advantages over 
other methods of switching between medi sources:  

* The source element is less cumbersome, and easier to understand and debug, 
  than additional client-side or server-side scripting.
* Native client-side switching can reduce latency: only one request is made to 
  get content.
* Letting the browser choose what format it can play is likely to be quicker and 
  more reliable than techniques such as using a server-side database with 
  user-agent detection.

All of these points are especially potent in mobile contexts, where bandwidth 
and latency are at a premium, and the user's patience may have a shorter 
timeout.

Making use of the source element's _type_ attribute can improve performance even 
further, by enabling the browser to select a media source without having to 
download and 'sniff' it:

 <video>
     <source src="video/chrome.mp4" **type="video/mp4"** />
     <source src="video/chrome.webm" **type="video/webm"** />
     <p>This browser does not support the video element.</p>
 </video>

(To see this in action, use your mobile browser dev tools to compare network 
activity for [simpl.info/video](http://simpl.info/video) and 
[simpl.info/video/notype](http://simpl.info/video/notype).)

Ensure your server gives the right MIME type, otherwise video source type checks 
won't work. You can check this with curl, for example by running a command like 
this:

 curl -I simpl.info/video/videos/chrome.mp4

...which should return a response like this: 

 Content-Type: video/mp4

All platforms that support <audio> and <video> support the source element: see 
[longtailvideo.com/](http://www.longtailvideo.com/html5/)[html5](http://www.longtailvideo.com/html5/) 
for the gory details. There are a number of online services for converting from 
one format to another (aka transcoding), such as 
[Zencoder](http://en.wikipedia.org/wiki/Zencoder) and [Amazon Elastic 
Encoder](http://aws.amazon.com/elastictranscoder/). Desktop tools such as 
[FFmpeg](http://ffmpeg.org/) can be used from the command line or be integrated 
with build processes; GUI applications such as 
[Miro](http://www.mirovideoconverter.com/) and [HandBrake](http://handbrake.fr/) 
(which use FFmpeg) and [VLC](http://www.videolan.org/) are available for Linux, 
Mac and Windows. 

If a new codec is required, it can be added to the video sources. (You may want 
to put the MP4 file first in the list of <source> elements: there was a bug in 
earlier iOS versions where it failed to display the video unless the first 
<source> element pointed to the mp4 file.)

Want to know which source was actually chosen? In JavaScript, the video's 
_currentSrc_ property returns the actual source chosen: see the example at 
[simpl.info/video](http://simpl.info/video).

Want to know what codecs are supported? Try 
_[canPlayType()](https://simpl.info/canplaytype/)_.

## Media Fragments

We can specify what part of a video we want to play simply by adding a 
'fragment' to the URL:

 <video src='foo.webm#t=5,10'>
     <p>This browser does not support the video element.</p>
 </video>

This is called the Media Fragments API – there's an example at 
[simpl.info/mf](http://simpl.info/mf) – and is well supported on mobile and 
desktop -- though sadly not on iOS. 

It's especially useful on mobile because you only need to download the part of 
the video you want to watch, which can save bandwidth and make your app feel 
more responsive. Using Media Fragments also enables you to deliver multiple 
views on the same video – liked cue points in a DVD – without having to encode 
and serve multiple files.

You need to make sure Range Requests are supported by your server: this is on by 
default for Apache and other servers, but is turned off by some hosting 
services. You can check for support by looking for Accept Ranges: Bytes in the 
response header from your browser tools.

## Accessibility

A significant proportion of mobile web users [have difficulty with vision or 
hearing](http://blog.powermapper.com/blog/post/Website-Accessibility-Disability-Statistics.aspx): 

* 4%-5% of people in the US, UK and Canada suffer from hearing loss. Incidence 
  increases sharply in over-60s, with more than 20% of over-75s affected.
* 3%-4% of people in the US, UK and Canada can't see well enough to read. 
  Incidence increases with age, with more than 10% of over-70s affected.

To make media more accessible on mobile, include captions by [using the track 
element](http://www.html5rocks.com/en/tutorials/track/basics/), which now has 
[wide support](http://caniuse.com/track). It's very easy. You simply add a track 
element as a child of the audio or video element, like this:

 <video>
     <source src="video/chrome.mp4" type="video/mp4;" />
     <source src="video/chrome.webm" type="video/webm" />
 **    ****<track src="tracks/chrome-subtitles-en.vtt" />**
     <p>This browser does not support the video element.</p>
 </video>

The track file consists of timed 'cues' in WebVTT format:

 WEBVTT FILE

 1
 00:00:00.500 --> 00:00:02.000 D:vertical A:start
 The Web is always changing

 2
 00:00:02.500 --> 00:00:04.300
 and the way we access it is changing

The track element is supported for video and audio on Chrome for Android, in iOS 
Safari, and by all current browsers (except Firefox) on desktop. There are also 
[several 
polyfills](http://www.w3.org/community/texttracks/2012/08/23/webvtt-support-in-browsers/) 
available for the track element. 

<img src="image00.png" width="624" height="350" />

## Fallbacks

Provide a fallback for platforms that don't support the video or audio element, 
by including alternative content within the video or audio element, such as the 
paragraph element in the code example above.

If you need to support the long tail of legacy mobile browsers that don't 
support the video element, you may want consider services and players such as 
[vid.ly](http://vid.ly), [JWPlayer](http://www.jwplayer.com/) and 
[video.js](http://www.videojs.com/), or polyfills such as [those listed on the 
Modernizr 
site](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills#video). 
[Video for Everybody](http://camendesign.co.uk/code/video_for_everybody) uses 
HTML (not JavaScript) to provide a Flash fallback for the video element.

## File size

Stating the obvious: try to avoid serving media with large file sizes to mobile 
devices – not least because of the potential for high and unforeseen data 
charges. Likewise, there's no point serving videos with a larger frame size (or 
higher quality) than the destination platform can make use of.

Playback for long videos [can also be 
buggy](https://code.google.com/p/chromium/issues/detail?id=167292): depending on 
the platform, the browser may wait until all of a video downloads before 
beginning playback. (Try the example at 
[simpl.info/longvideo](http://www.simpl.info/longvideo).)

## Adaptive streaming

A video element with a src attribute is a simple way to enable download and 
playback of video on the web but, given the changeable nature of mobile 
connectivity, you may need to consider alternatives.

### DASH

[Dynamic Adaptive Streaming over 
HTTP](http://www.html5rocks.com/en/tutorials/eme/basics/#related-technology-2) 
(aka MPEG-DASH) is an open standard  designed to enable media delivery at the 
highest possible quality for both streaming and download. Technologies such as 
Apple's [HTTP Live Streaming](https://en.wikipedia.org/wiki/HTTP_Live_Streaming) 
(HLS) and Microsoft's [Smooth 
Streaming](https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming#Microsoft_Smooth_Streaming) 
also provide adaptive-bitrate streaming via HTTP, but are not open source. 

With DASH:  
1. Media is encoded at different bitrates.  
2. The different bitrate files are segmented and made available from an HTTP 
server.  
3. A client web app chooses which bitrate to retrieve and play.

As part of the video segmentation process, an XML manifest known as a Media 
Presentation Description (MPD) is built programmatically. This describes the 
individual video components.

DASH is already in use by sites such as YouTube; you can see DASH in action the 
[YouTube DASH demo 
](http://dash-mse-test.appspot.com/dash-player.html?url=http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-manifest.mpd)[player](http://dash-mse-test.appspot.com/dash-player.html?url=http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-manifest.mpd). 

JavaScript DASH libraries use the Media Source Extensions API. MSE is supported 
from version 30 on Chrome for Android, and in Internet Explorer and Chrome for 
desktop, with [support planned for 
Firefox](https://wiki.mozilla.org/Platform/MediaSourceExtensions). 

## Autoplay, scripting, looping

Autoplay [is not currently supported](http://www.jwplayer.com/html5/autoloop/) 
on iPhone or Chrome for Android – but it _is_ supported on all desktop browsers, 
on iPad, and in Firefox and Opera for Android. (You can test this with the video 
at [simpl.info/video](http://simpl.info/video), which has an autoplay 
attribute.)

Even on platforms where autoplay is possible, you need to consider whether it's 
a good idea to enable it:

* Data usage can be expensive.
* Causing media to download and playback to begin, without asking first, can 
  unexpectedly hog bandwidth and CPU, and thereby delay page rendering.
* Users may be in a context where playing video or audio is intrusive.

Autoplay behavior is configurable in the Android WebView with the following API: 
[http://developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)](http://developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)). 
It defaults to true but a WebView app can choose to disable it.

Scripted playback is not supported on mobile (apart from Opera on Android). This 
means that _play()_ and _pause()_ can't be done programmatically, and neither 
can control of content such as embedded YouTube videos. 

Looping [is supported](http://www.jwplayer.com/html5/autoloop/) on iOS and 
Android.

## Poster images

As in the code example above, it's often sensible to include a `poster` 
attribute, which gives the URL of an image to display until playback begins. 
This gives viewers a meaningful idea of content without needing to download 
video or start playback. 

Compare the following (I've made the poster image grayscale to prove it's not 
the video!)

[poster/no-poster screenshots from iPhone and Android]

The only downside is that using a poster image incurs an additional file 
request, which consumes a little bit of bandwidth and requires rendering.

## Preload

To quote from the [HTML5 video 
standard](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html) 
using the _preload='metadata'_ attribute does the following:

> Hints to the user agent that the author does not expect the user to need the 
> media resource, but that fetching the resource metadata (dimensions, track 
> list, duration, etc), and maybe even the first few frames, is reasonable. … 
> When the media resource is playing, hints to the user agent that bandwidth is 
> to be considered scarce, e.g. suggesting throttling the download so that the 
> media data is obtained at the slowest possible rate that still maintains 
> consistent playback.

To be clear: _preload_ is just a hint, and has different defaults on different 
platforms: see 
[stevesouders.com/tests/mediaevents.php](http://stevesouders.com/tests/mediaevents.php) 
for full details. For example, Chrome buffers 25 seconds of video on desktop, 
none on iOS or Android. This means that on mobile, there may be playback startup 
delays that don't happen on desktop.

## Landscape and portrait

Device orientation is not an issue for desktop monitors or laptops, but is 
hugely important when considering mobile web page design.

Whether or not you like the fact that video plays fullscreen in its own window, 
Safari on iPhone does a good job of switching between portrait and landscape.

<img src="image01.png" width="161" height="326" /><img src="image02.png" 
width="336" height="165" />

For iPad and for Chrome on Android, you'll need to roll your own solution. 

Here's an iPad playing a video landscape. As you can see, the layout is quite 
poor! 

<img src="image03.png" width="624" height="494" />

Here's what a plain video element with no element sizing or CSS looks like in 
Chrome on Android, before pressing play:

<img src="image04.png" width="196" height="349" />    <img src="image05.png" 
width="324" height="182" />

Not only is the video too big for the viewport, it doesn't even look much like a 
video!

## Fullscreen or not?

Different platforms display video differently. 

For example, Safari on an iPhone displays a video element inline on a web page, 
but plays video back full screen:

<img src="image06.png" width="193" height="386" /><img src="image01.png" 
width="194" height="390" />

On Android, unless you request full screen mode, video plays back right in the 
page:  
   
<img src="image07.png" width="193" height="344" />   <img src="image08.png" 
width="193" height="344" />

Likewise for Safari on iPad – the video plays inline:  
<img src="image09.png" width="424" height="477" />  
All in all, video on the multi-device web calls for a more flexible approach to 
web design than we've gotten used to in desktop browsers.

### The Fullscreen API

For platforms that do not force fullscreen video playback, the Fullscreen API is 
[widely supported](http://caniuse.com/fullscreen). This provides scripting, 
events and CSS to control full-screening of content, including the video 
element.

On Android devices with smaller screens, you may want to consider using 
thumbnail images as placeholders for video: when you tap on a thumbnail, the 
thumbnail is replaced by a video element that makes use of whatever screen area 
is available.

For this, you can use the Fullscreen API – there's a demo at 
[simpl.info/fullscreen/video](http://simpl.info/fullscreen/video):

[Image: video with poster.]  
[Image: video playing back fullscreen.]

## Responsive media

Responsive Web Design is an approach that emphasises design which works well 
across a variety of devices and browsing contexts -- without serving different 
content for each different operating system, device, browser, display size or 
pixel density.

The term was coined by Ethan Marcotte in [an article on A List 
Apart](http://www.alistapart.com/articles/responsive-web-design/), who suggested 
three methods to cope with different browser window sizes:

* Fluid grids (layout that adjusts to fit the viewport)
* Flexible images (images that [adjust to 
  fit](http://www.alistapart.com/articles/dao/))
* CSS [Media Queries](http://css-tricks.com/css-media-queries/)

This is especially important when planning layouts to incorporate video across a 
variety of platforms. It may not even be possible to ascertain video dimensions 
before playback – or dimensions may change dynamically (for example, during a 
WebRTC call – see below.)

### Media queries  

Media queries make it possible to specify the size of elements, depending on the 
viewport dimensions. Above all, Ensure that video (and audio) elements don't 
overflow their containers. _max-width: 100%_ is your friend!   
Media queries are are [supported on both iOS and 
Android](http://caniuse.com/#feat=css-mediaqueries):

 video#foo {
   width: 600px;
 }

 @media screen and (max-width: 1000px) {
   video#foo {
     max-width: 100%;
     width: auto;
   }
 }

[More detail and more examples.]

See Ethan Marcotte's [Fluid Images 
](http://www.alistapart.com/articles/fluid-images/)[article](http://www.alistapart.com/articles/fluid-images/) 
 for more information.

For media content in iframes, such as YouTube videos, try a responsive approach 
such as that [proposed by John 
Surdakowski](http://avexdesigns.com/responsive-youtube-embed/):

CSS:

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

HTML:

 <div class="video-container">
   <iframe src="[http://www.youtube.com/embed/l-BA9Ee2XuM](http://www.youtube.com/embed/l-BA9Ee2XuM%20%20)" frameborder="0" width="560" height="315"></iframe>
 </div>

You can see an example of this at [simpl/](http://simpl/yt)[yt](http://simpl/yt) 
– and an unresponsive version at  
[simpl/unyt](http://simpl/video/youtube/unresponsive/).

### JavaScript libraries

Libraries such as the [FitVids](http://fitvidsjs.com/) jQuery plugin make it 
possible to maintain appropriate size and aspect ratio, even for Flash videos 
from YouTube and other sources. 

## What about WebRTC?

[WebRTC](http://www.html5rocks.com/en/tutorials/webrtc/basics/) is now supported 
in Chrome, Firefox and Opera on mobile, enabling peer-to-peer video chat and 
data sharing within web applications.  The _getUserMedia()_ part of WebRTC gives 
access to the local camera and microphone – and choice of 
[cameras](http://simpl.info/sources) and [resolutions](http://simpl.info/res) is 
supported on mobile.  Great for building [crazy](http://webcamtoy.com/app/) 
[photobooth](https://rawgithub.com/SenorBlanco/moggy/master/filterbooth.html) 
[apps](http://idevelop.ro/ascii-camera/) (and for working with Web Audio!)

Here are some suggestions for a better WebRTC experience on mobile:  

* Don't provide resolutions higher than the receiver can handle.
* Make muting easy and obvious: particularly important when users are more 
  likely to be in a public environment.
* Impose limits via constraints or by [editing 
  SDP](http://www.html5rocks.com/en/tutorials/webrtc/infrastructure/#what-is-signaling) 
  (SDP is the protocol that WebRTC apps use to exchange metadata).
* If you use HTTPS, the user will only be prompted once per domain to allow 
  camera and microphone access. Much better, especially on mobile!
* The WebRTC permissions UI is completely different on mobile and desktop (and 
  varies between browsers) so if you add extra page content to prompt users to 
  allow device access, make sure it fits the platform!

<img src="image10.png" width="161" height="286" /><img src="image11.png" 
width="421" height="516" />

We maintain a video chat client designed to work across mobile and desktop 
platforms at [apprtc.appspot.com](http://apprtc.appspot.com). For more 
information, see [A Practical Guide to Building WebRTC 
Apps](https://thenewcircle.com/s/post/1548/a_practical_guide_to_building_webrtc_apps_ben_strong_video).

## Find out more

### Digital media overview

* [A Digital Media Primer for Geeks](http://www.xiph.org/video/vid1.shtml)<br/>
  Want to know what 4:4:4 means? Expert and entertaining introduction from Monty 
  Montgomery, creator of Ogg and Vorbis.
* [Digital Video and HD, Second Edition: Algorithms and 
  Interfaces](http://books.google.co.uk/books/about/Digital_Video_and_HDTV.html?id=ra1lcAwgvq4C&redir_esc=y)<br/>
  Definitive reference work, by Charles A. Poynton.

### Articles and documentation

* [Encrypted Media 
  Extensions](http://www.html5rocks.com/en/tutorials/eme/basics/)
* [WebRTC](http://www.html5rocks.com/en/tutorials/webrtc/basics/)
* [Media Source 
  Extensions](http://updates.html5rocks.com/2011/11/Stream-video-using-the-MediaSource-API)
* [The track element](http://www.html5rocks.com/en/tutorials/track/basics/)
* [Fullscreen](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode)
* [Media Fragments](http://simpl.info/mf) 
* [MPEG-DASH Test 
  Streams](http://bbc.co.uk/rd/blog/2013/09/mpeg-dash-test-streams): BBC R&D 
  blog post, good introduction to DASH
* [Responsive web 
  design](http://docs.webplatform.org/wiki/concepts/mobile_web/responsive_design)

### What works where?

* [caniuse.com/video](http://caniuse.com/video): web technology support across 
  platforms
* [chromestatus.com](http://chromestatus.com): web platform feature support
* [HTML video support](http://www.jwplayer.com/html5/#html5_marketshare)
* [Media format 
  support](https://developer.mozilla.org/en-US/docs/HTML/Supported_media_formats)
* [Steve Souders' preload test](http://stevesouders.com/tests/mediaevents.php)

### Demos

* [Video](http://simpl.info/v)
* [Video with scripted playback](http://simpl.info/video/scripted)
* [Media Source Extensions](http://simpl.info/mse)

* [Fullscreen video](https://simpl.info/fullscreen/video)
* [Media Fragments](http://simpl.info/mf)

* [EME Clear Key](http://simpl.info/clearkey)
* [WebM adaptive encrypted 
  video](http://downloads.webmproject.org/adaptive-encrypted-demo/adaptive) 
  ([repo](https://chromium.googlesource.com/webm/webm-dash-javascript/))
* [YouTube MPEG-DASH / Media Source demo](http://dash-mse-test.appspot.com/)
* [Media Source Extensions (MSE) 
  demo](http://html5-demos.appspot.com/static/media-source.html)

* [Speech recognition](https://simpl.info/stt)
* [Speech synthesis](https://simpl.info/tts)
* [WebRTC video chat](http://apprtc.appspot.com)

### Standards

* [Media Source Extensions](http://www.w3.org/TR/media-source/)

* [Encrypted Media 
  Extensions](https://dvcs.w3.org/hg/html-media/raw-file/default/encrypted-media/encrypted-media.html)
* [DASH 
  standard](http://standards.iso.org/ittf/PubliclyAvailableStandards/c057623_ISO_IEC_23009-1_2012.zip) 
  (yes, it's a PDF)
* [Overview of the DASH standard](http://dashif.org/mpeg-dash/)<!-- No converter 
  for: PAGE_BREAK -->
