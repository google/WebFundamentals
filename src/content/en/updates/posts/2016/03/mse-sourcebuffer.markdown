---
layout: updates/post
title: "Media Source API: Select Playback Order"
description: "The Media Source API enables JavaScript to construct media streams for playback for uses cases such as adaptive streaming. This update to Chrome makes it possible to set the playback order of media segments."
published_on: 2016-03-09
updated_on: 2016-03-09
authors:
  - samdutton
tags:
  - audio
  - media
  - mse
  - news
  - recording
  - video
  - webrtc
featured_image: /web/updates/images/2016/03/mse-sourcebuffer/featured.jpg
---

<style>
@media screen and (max-width: 500px) {
  img.screenshot {
    max-width: 100%;
  }
}
</style>

<p class="intro">The HTML audio and video elements enable you to load, decode and play media simply by providing a src URL:
</p>

{% highlight html %}
<video src='foo.webm'></video>
{% endhighlight %}

That works well for simple use cases, but for techniques such as [adaptive streaming](https://www.youtube.com/watch?v=Fm3Bagcf9Oo), the Media Source Extensions API (MSE) provides more control. MSE enables streams to be built from segments of audio or video.

You can try out MSE at [simpl.info/mse](https://simpl.info/mse). The code below is from that example.

A `MediaSource` represents a source of media for an audio or video element. Once a `MediaSource` object is instantiated and its `open` event has fired, media segments can be added via a `SourceBuffer`:

{% highlight javascript %}
var mediaSource = new MediaSource();
video.src = window.URL.createObjectURL(mediaSource);
mediaSource.addEventListener('sourceopen', function() {
  var sourceBuffer =
      mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
  // Get video segments and append them to sourceBuffer.
}
{% endhighlight %}

Media segments are 'streamed' to an audio or video element by adding each segment to the `SourceBuffer` with `appendBuffer()`. In this example, video is fetched from the server then stored using the File APIs:

{% highlight javascript %}
reader.onload = function (e) {
  sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
  if (i === NUM_CHUNKS - 1) {
    mediaSource.endOfStream();
  } else {
    if (video.paused) {
      // start playing after first chunk is appended
      video.play();
    }
    readChunk(++i);
  }
};
{% endhighlight %}

<img class="screenshot" src="/web/updates/images/2016/03/mse-sourcebuffer/screenshot.jpg" alt="Screenshot of video played back using the MSE API">

## Setting Playback Order

Chrome 50 adds support for the `SourceBuffer` `mode` attribute.

The `mode` attribute can have either of two possible values, which can be used to determine how playback of media segments are ordered:

* _segments_: the timestamp of each segment determines playback order, no matter the order in which segments are appended.
* _sequence_: playback order is determined by the order in which segments are appended and timestamps are added to segments automatically.

If the media segments have timestamps parsed from byte stream data when they are appended to the `SourceBuffer`, the `SourceBuffer`'s `mode` property will be set to _segments_. Otherwise `mode` will be set to _sequence_.

Setting the `mode` attribute is optional and it can only be changed from _segments_ to _sequence_. An error will be thrown if you try to change `mode` from _sequence_ to _segments_ — the existing segment order needs to be maintained in sequence.

You can, however, change the value from _segments_ to _sequence_ — it just means the play order will be fixed, and new timestamps generated to reflect this.

{% highlight javascript %}
sourceBuffer.mode = 'sequence';
{% endhighlight %}

Being able to set the mode value to _sequence_ is useful because it ensures continuous media playback — no matter if the video segment timestamps were discontinuous (for example, if there were problems with video muxing, or discontinuous segments are appended).

## Demos
[Media Source API](https://simpl.info/mse)
[Shaka Player](https://shaka-player-demo.appspot.com): video player demo that uses MSE to implement [DASH](http://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-MPEG-DASH-79041.aspx) with the [Shaka](https://g.co/shakainfo) JavaScript library

## Browser Support
* Chrome 50 and above by default
* For Firefox, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer#Browser_compatibility) for details

## Specification
[Media Source Extensions `appendMode()` method](https://www.w3.org/TR/media-source/#idl-def-AppendMode)

## API Information
[MDN: SourceBuffer.mode](https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/mode)



