project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Media Source API enables JavaScript to construct media streams for playback. From Chrome 50, it's possible to use SourceBuffer sequence mode to ensure media segments are automatically relocated in the timeline in the order they were appended, without gaps between them.

{# wf_updated_on: 2016-03-14 #}
{# wf_published_on: 2016-03-14 #}
{# wf_tags: audio,chrome50,media,mse,recording,video,webrtc,chrome50 #}
{# wf_featured_image: /web/updates/images/2016/03/mse-sourcebuffer/featured.jpg #}
{# wf_blink_components: Blink>Media #}

# Media Source API: Automatically Ensure Seamless Playback of Media Segments in Append Order {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}



<style>
@media screen and (max-width: 500px) {
  img.screenshot {
    max-width: 100%;
  }
}
</style>

The HTML audio and video elements enable you to load, decode and play media, simply by providing a src URL:


    <video src='foo.webm'></video>
    

That works well in simple use cases, but for techniques such as [adaptive streaming](https://www.youtube.com/watch?v=Fm3Bagcf9Oo), the Media Source Extensions API (MSE) provides more control. MSE enables streams to be built in JavaScript from segments of audio or video.

You can try out MSE at [simpl.info/mse](https://simpl.info/mse):

<a href="https://simpl.info/mse"><img style="max-width: 50%" class="screenshot" src="/web/updates/images/2016/03/mse-sourcebuffer/screenshot.jpg" alt="Screenshot of video played back using the MSE API"></a>

The code below is from that example.

A `MediaSource` represents a source of media for an audio or video element. Once a `MediaSource` object is instantiated and its `open` event has fired, `SourceBuffer`s  can be added to it. These act as buffers for media segments:


    var mediaSource = new MediaSource();
    video.src = window.URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', function() {
      var sourceBuffer =
          mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
      // Get video segments and append them to sourceBuffer.
    }
    

Media segments are 'streamed' to an audio or video element by adding each segment to a `SourceBuffer` with `appendBuffer()`. In this example, video is fetched from the server then stored using the File APIs:


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
    

## Setting playback order

Chrome 50 adds additional support to the `SourceBuffer` `mode` attribute, allowing you to specify that media segments are played back continuously, in the order that they were appended, no matter whether the media segments initially had discontinuous timestamps.

Use the `mode` attribute to specify playback order for media segments. It has one of two values:

* _segments_: The timestamp of each segment (which may have been modified by [`timestampOffset`](https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/timestampOffset)) determines playback order, no matter the order in which segments are appended.
* _sequence_: The order of segments buffered in the media timeline is determined by the order in which segments are appended to the `SourceBuffer`.

If the media segments have timestamps parsed from byte stream data when they are appended to the `SourceBuffer`, the `SourceBuffer`'s `mode` property will be set to _segments_. Otherwise `mode` will be set to _sequence_.  Note that timestamps are not optional: they _must_ be there for most stream types, and _cannot_ be there for others: inband timestamps are innate to stream types that contain them.

Setting the `mode` attribute is optional. For streams that don't contain timestamps (audio/mpeg and audio/aac) `mode` can only be changed from _segments_ to _sequence_: an error will be thrown if you try to change `mode` from _sequence_ to _segments_. For streams that have timestamps, it is possible to switch between _segments_ and _sequence_, though in practice that would probably produce behaviour that was undesirable, hard to understand or difficult to predict.

For all stream types, you can change the value from _segments_ to _sequence_. This means segments will be played back in the order they were appended, and new timestamps generated accordingly:


    sourceBuffer.mode = 'sequence';
    

Being able to set the `mode` value to _sequence_ ensures continuous media playback, no matter if the media segment timestamps were discontinuous — for example, if there were problems with video [muxing](https://en.wikipedia.org/wiki/Multiplexing), or if (for whatever reason) discontinuous segments are appended. It is possible for an app to polyfill with [`timestampOffset`](https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/timestampOffset) to ensure continuous playback, if correct stream metadata is available, but _sequence_ mode makes the process simpler and less error prone.

## MSE apps and demos

These show MSE in action, though without `SourceBuffer.mode` manipulation:

* [Media Source API](https://simpl.info/mse)
* [Shaka Player](https://shaka-player-demo.appspot.com): video player demo that uses MSE to implement [DASH](http://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-MPEG-DASH-79041.aspx) with the [Shaka](https://g.co/shakainfo) JavaScript library

## Browser support

* Chrome 50 and above by default
* For Firefox, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer#Browser_compatibility) for details

## Specification

* [Media Source Extensions `appendMode()` method](https://www.w3.org/TR/media-source/#idl-def-AppendMode)

## API information

* [MDN: SourceBuffer.mode](https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/mode)


{% include "comment-widget.html" %}
