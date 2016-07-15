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

<p class="intro">The <code>captureStream()</code> method makes it possible to stream from a <code>canvas</code>, <code>audio</code> or <code>video</code> element.</p>

Try it out! There are links to canvas and video examples below.

<img src="/web/updates/images/2016/07/capture-stream/screenshot.jpg">

The `captureStream()` code is simple.

For `canvas`:

{% highlight javascript %}
var canvas = document.querySelector('canvas');
var video = document.querySelector('video');

// optional frames per second argument
var stream = canvas.captureStream(25);
video.srcObject = stream;
{% endhighlight %}

For `video`:

{% highlight javascript %}
var leftVideo = document.getElementById('leftVideo');
var rightVideo = document.getElementById('rightVideo');

leftVideo.onloadedmetadata = function() {
  var stream = leftVideo.captureStream();
  rightVideo.srcObject = stream;
};
{% endhighlight %}

## But why?

The `captureStream()` method makes it possible to [record](https://developers.google.com/web/updates/2016/01/mediarecorder) or [live stream](http://www.html5rocks.com/en/tutorials/webrtc/basics/) from canvas and media elements:

* Game play from a &lt;canvas&gt;
* Video from a camera, with content or effects added
* Picture-in-picture from videos via a canvas
* Video and images (from files or a camera) combined in a &lt;canvas&gt;
* A video played from a file

Essentially, `captureStream()` enables JavaScript to construct and 'inject stuff' into a [MediaStream](https://developer.mozilla.org/en/docs/Web/API/MediaStream).

## The small print

* Attempting to use `captureStream()` on media element that implements content protection via [Encrypted Media Extensions](http://www.html5rocks.com/en/tutorials/eme/basics/) will throw an exception. (The relevant code is [here](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/modules/mediacapturefromelement/HTMLMediaElementCapture.cpp?l=31).)

* When capturing from a &lt;canvas&gt;, the frame rate is set when `captureStream()` is called, and it doesn't vary. That can be inefficient if the &lt;canvas&gt; doesn't change, but there is no way around this for the moment, and nothing (yet) planned for the `captureStream()` spec.

## Demos

### Canvas
* [Stream from a canvas element to a video element](https://webrtc.github.io/samples/src/content/capture/canvas-video/)
* [Stream from a canvas element to a peer connection](https://webrtc.github.io/samples/src/content/capture/canvas-pc/)

### Video
* [Stream from a video element to a video element](https://webrtc.github.io/samples/src/content/capture/video-video/)
* [Stream from a video element to a peer connection](https://webrtc.github.io/samples/src/content/capture/video-pc/)

## Support
* Canvas `captureStream()`: Firefox 43 or above; Chrome 50 and above with Experimental Web Platform features enabled from chrome://flags, or Chrome 52 and above by default.
* Video and audio `captureStream()`: recent versions of Firefox; Chrome 52 and above with Experimental Web Platform features enabled from chrome://flags, or Chrome 53 and above by default.

## Find out more
* [Firefox implementation bug](https://bugzilla.mozilla.org/show_bug.cgi?id=664918)
* [Chrome Platform Status](https://www.chromestatus.com/feature/5522768674160640)

