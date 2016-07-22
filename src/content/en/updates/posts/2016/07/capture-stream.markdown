---
layout: updates/post
title: "Capture a media stream from &lt;canvas&gt;, &lt;audio&gt; or &lt;video&gt;"
description: "The captureStream() method enables a MediaStream to be captured from a canvas, audio or video element, on Android and desktop."
published_on: 2016-07-18
updated_on: 2016-07-18
authors:
  - samdutton
tags:
  - canvas
  - chrome53
  - media
  - security
  - webrtc
featured_image: /web/updates/images/2016/07/capture-stream/featured.jpg
---

<style>
.screenshot-landscape {
 max-width: 60%;
}
.screenshot-portrait {
 max-width: 35%;
}
@media screen and (max-width: 500px) {
  img.screenshot {
    max-width: 100%;
  }
}
</style>

<p class="intro">The <a href="https://w3c.github.io/mediacapture-fromelement/#dfn-capturestream" title="W3C captureStream() spec"><code>captureStream()</code></a> method makes it possible to stream from a <code>canvas</code>, <code>audio</code> or <code>video</code> element.</p>

This enables a `MediaStream` captured from any of these elements to be live-streamed via WebRTC, recorded, or combined with effects or other `MediaStream`s in a &lt;canvas&gt;. In other words, `captureStream()` enables `MediaStream` to pass media back and forth between canvas, audio or video elements — or to an `RTCPeerConnection` or `MediaRecorder`.

In the following demo (available from the [WebRTC samples](https://webrtc.github.io/samples/src/content/capture/canvas-pc/)) a `MediaStream` captured from a canvas element on the left is streamed via a WebRTC peer connection to the video element on the right:

<video autoplay loop muted>
  <source src="/web/updates/videos/2016/07/capture-stream/canvas-pc.webm" type="video/webm" />
  <source src="/web/updates/videos/2016/07/capture-stream/canvas-pc.mp4" type="video/mp4" />
  <p>Sorry! Your browser does not support the video element.</p>
</video>

(There are links to more canvas and video examples below.)

The `captureStream()` code is simple.

For `canvas`:

{% highlight javascript %}
var canvas = document.querySelector('canvas');
var video = document.querySelector('video');

// Optional frames per second argument.
var stream = canvas.captureStream(25);
// Set the source of the <video> element to be the stream from the <canvas>.
video.srcObject = stream;
{% endhighlight %}

For `video`:

{% highlight javascript %}
var leftVideo = document.getElementById('leftVideo');
var rightVideo = document.getElementById('rightVideo');

leftVideo.onplay = function() {
  // Set the source of one <video> element to be a stream from another.
  var stream = leftVideo.captureStream();
  rightVideo.srcObject = stream;
};
{% endhighlight %}

Note that `captureStream()` can only be called after the video element is able to play video: that's the reason it's in the handler here.

## But why?

The `captureStream()` method makes it possible to [record](https://developers.google.com/web/updates/2016/01/mediarecorder) or [live stream](http://www.html5rocks.com/en/tutorials/webrtc/basics/) from canvas and media elements:

* Record and stream game play from a &lt;canvas&gt;
* Capture video from a camera, then add additional content or effects
* Create picture-in-picture effects from multiple videos via a &lt;canvas&gt;
* Combine video and images (from files or a camera or both) in a &lt;canvas&gt;
* Live-stream video played from a file
* Use a recorded audio or video message for a video or voice mail

Essentially, `captureStream()` enables JavaScript to construct and "inject stuff" into a [MediaStream](https://developer.mozilla.org/en/docs/Web/API/MediaStream).

## The small print

* Attempting to use `captureStream()` with a media element that implements content protection via [Encrypted Media Extensions](http://www.html5rocks.com/en/tutorials/eme/basics/) will throw an exception.

* When capturing from a &lt;canvas&gt;, the frame rate is set when `captureStream()` is called, and it can't then be modified. This could be inefficient, given that the &lt;canvas&gt; might sometimes change rapidly, and sometimes not at all — for example, during game play. Unfortunately there is no way around this for the moment, and nothing (yet) planned for the `captureStream()` spec.

## Demos

### Canvas
* [Stream from a canvas element to a video element](https://webrtc.github.io/samples/src/content/capture/canvas-video/)
* [Stream from a canvas element to a peer connection](https://webrtc.github.io/samples/src/content/capture/canvas-pc/)

### Video
* [Stream from a video element to a video element](https://webrtc.github.io/samples/src/content/capture/video-video/)
* [Stream from a video element to a peer connection](https://webrtc.github.io/samples/src/content/capture/video-pc/)

## Support
* Canvas `captureStream()`: Firefox 43 or above; Chrome 50 and above with  chrome://flags/#enable-experimental-web-platform-features enabled, or Chrome 52 and above by default.
* Video and audio `captureStream()`: recent versions of Firefox; Chrome 52 and above with  chrome://flags/#enable-experimental-web-platform-features enabled, or Chrome 53 and above by default.

## Find out more
* [Firefox implementation bug](https://bugzilla.mozilla.org/show_bug.cgi?id=664918)
* [Chrome Platform Status](https://www.chromestatus.com/feature/5522768674160640)

