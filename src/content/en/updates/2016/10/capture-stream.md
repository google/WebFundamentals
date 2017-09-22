project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The captureStream() method enables a MediaStream to be captured from a canvas, audio or video element, on Android and desktop.

{# wf_updated_on: 2016-10-20 #}
{# wf_published_on: 2016-10-20 #}
{# wf_tags: canvas,chrome53,gif,media,security,webrtc #}
{# wf_featured_image: /web/updates/images/2016/10/capture-stream/featured.jpg #}
{# wf_featured_snippet: The <code>captureStream()</code> method makes it possible to capture a MediaStream from a canvas, video or audio element. #}
{# wf_blink_components: Blink>Media #}

<style>
video {
  max-width: 100%;
}
</style>

# Capture a MediaStream From a Canvas, Video or Audio Element {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

The <a href="https://w3c.github.io/mediacapture-fromelement/#dfn-capturestream"
title="W3C captureStream() spec"><code>captureStream()</code></a> method makes
it possible to capture a `MediaStream` from a <code>&lt;canvas&gt;</code>,
<code>&lt;audio&gt;</code> or <code>&lt;video&gt;</code> element.

This enables a video or audio stream from any of these elements to be recorded,
live-streamed via WebRTC, or combined with effects or other `MediaStream`s in a
`<canvas>`. In other words, `captureStream()` enables `MediaStream` to pass
media back and forth between canvas, audio or video elements — or to an
`RTCPeerConnection` or `MediaRecorder`.

In the following demo (available from the
[WebRTC samples](https://webrtc.github.io/samples/src/content/capture/canvas-pc/))
a `MediaStream` captured from a canvas element on the left is streamed via a
WebRTC peer connection to the video element on the right:

<video autoplay loop muted>
  <source src="/web/updates/videos/2016/07/capture-stream/canvas-pc.webm" type="video/webm" />
  <source src="/web/updates/videos/2016/07/capture-stream/canvas-pc.mp4" type="video/mp4" />
  <p>Sorry! Your browser does not support the video element.</p>
</video>

(There are links to more canvas and video examples below.)

The `captureStream()` code is simple.

For `<canvas>`:

    var canvas = document.querySelector('canvas');
    var video = document.querySelector('video');

    // Optional frames per second argument.
    var stream = canvas.captureStream(25);
    // Set the source of the <video> element to be the stream from the <canvas>.
    video.srcObject = stream;

For `<video>`:

    var leftVideo = document.getElementById('leftVideo');
    var rightVideo = document.getElementById('rightVideo');

    leftVideo.onplay = function() {
      // Set the source of one <video> element to be a stream from another.
      var stream = leftVideo.captureStream();
      rightVideo.srcObject = stream;
    };

Note: `captureStream()` can only be called after the video element is able
to play video; that's the reason it's in the `onplay` handler here.

## But why?

The `captureStream()` method makes it possible to
[record](/web/updates/2016/01/mediarecorder) or
[live stream](http://www.html5rocks.com/en/tutorials/webrtc/basics/) from canvas
and media elements:

* Record and stream game play from a `<canvas>`
* Capture video from a camera, then add additional content or effects
* Create picture-in-picture effects from multiple videos via a `<canvas>`
* Combine video and images (from files or a camera or both) in a `<canvas>`
* Live-stream video played from a file
* Use a recorded audio or video message for a video or voice mail

Essentially, `captureStream()` enables JavaScript to construct and "inject
stuff" into a
[MediaStream](https://developer.mozilla.org/en/docs/Web/API/MediaStream).

## The small print

* Attempting to use `captureStream()` with a media element that implements
content protection via
[Encrypted Media Extensions](http://www.html5rocks.com/en/tutorials/eme/basics/)
will throw an exception.

* When capturing from a `<canvas>`, the maximum frame rate is set when
`captureStream()` is called. For example, `canvas.captureStream(10)` means that
the canvas outputs between 0 and 10 fps. Nothing gets captured when nothing gets
painted on the `<canvas>`, and 10 fps is captured even if the `<canvas>` gets
painted at 30 fps. There is a
[bug with more discussion](https://github.com/w3c/mediacapture-fromelement/issues/43)
filed on the `captureStream` spec.

* The dimensions of a `captureStream()` video match the `<canvas>` it was called
on.

## Demos

### Canvas
* [Stream from a canvas element to a video element](https://webrtc.github.io/samples/src/content/capture/canvas-video/)
* [Stream from a canvas element to a peer connection](https://webrtc.github.io/samples/src/content/capture/canvas-pc/)

### Video
* [Stream from a video element to a video element](https://webrtc.github.io/samples/src/content/capture/video-video/)
* [Stream from a video element to a peer connection](https://webrtc.github.io/samples/src/content/capture/video-pc/)

## Support
* Canvas `captureStream()`: Firefox 43 or above; Chrome 50 and above with
chrome://flags/#enable-experimental-web-platform-features enabled, or Chrome 52
and above by default.
* Video and audio `captureStream()`: Firefox 47; Chrome 52 and above with
chrome://flags/#enable-experimental-web-platform-features enabled, or Chrome 53
and above by default.

## Find out more
* [Firefox implementation bug](https://bugzilla.mozilla.org/show_bug.cgi?id=664918)
* [Chrome Platform Status](https://www.chromestatus.com/feature/5522768674160640)


{% include "comment-widget.html" %}
