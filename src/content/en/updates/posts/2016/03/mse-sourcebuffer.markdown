---
layout: updates/post
title: "Media Source API: select playback order"
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


<p class="intro">The video element enables you to load, decode and play media simply by providing a src URL:
</p>

{% highlight javascript %}
<video src='foo.webm'></video>
{% endhighlight %}

That works well for simple use cases, but for techniques such as [adaptive streaming](https://www.youtube.com/watch?v=Fm3Bagcf9Oo), the Media Source Extensions API (MSE) provides more control. MSE enables streams to be built from segments of audio or video.

You can try out MSE at [simpl.info/mse](https://simpl.info/mse). In this example a `SourceBuffer` is created once the `MediaSource` object is open for business:

{% highlight javascript %}
var mediaSource = new MediaSource();
video.src = window.URL.createObjectURL(mediaSource);
mediaSource.addEventListener('sourceopen', function() {
  var sourceBuffer =
      mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
  // Get video segments and append them to sourceBuffer.
}
{% endhighlight %}

Video segments are 'streamed' to a video element by adding each segment to the `SourceBuffer`. In this example, segments are retrieved via XHR then stored using the File APIs:

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
    readChunk_(++i);
  }
};
{% endhighlight %}

## Setting playback order

The `mode` attribute of `SourceBuffer` has one of two values. This can be used to determine how play back of segments is ordered:

* _segments_: the timestamp of each segment determines playback order, no matter the order in which segments are appended.
* _sequence_: playback order is determined by the order in which segments are appended.

Setting the mode attribute is optional.

If the media segments have timestamps when they are added to the `SourceBuffer`, its `mode` will be set to _segments_. Otherwise the `SourceBuffer`'s `mode` will be set to _sequence_.

The `mode` value can be changed from _segments_ to _sequence_: However, an error will be thrown if you try the other way around.


<img class="screenshot" src="/web/updates/images/2016/01/mediarecorder/screenshot.jpg" alt="Screenshot of mediaRecorder demo on Android Nexus 5X">

{% highlight javascript %}

{% endhighlight %}

## Feedback on the APIs and demos


## Demos
[Media Source API](https://simpl.info/mse)

## Browser support
* Chrome 50 and above by default

## Spec
[Media Source Extensions `appendMode()` method](https://www.w3.org/TR/media-source/#idl-def-AppendMode)

## API information
[MDN: SourceBuffer.mode](https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/mode)
