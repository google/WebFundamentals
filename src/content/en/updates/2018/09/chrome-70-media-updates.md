project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the audio/video updates in Chrome 70: Cross-codec and cross-bytestream buffering and playback, Opus in MP4 with MSE, and protected content playback allowed by default on Android.

{# wf_updated_on: 2018-10-19 #}
{# wf_published_on: 2018-09-18 #}
{# wf_tags: news,chrome70,media #}
{# wf_featured_image: /web/updates/images/generic/play-outline.png #}
{# wf_featured_snippet: A round up of the audio/video updates in Chrome 70: AV1 decoder, cross-codec and cross-bytestream buffering and playback, Opus in MP4 with MSE, and protected content playback allowed by default on Android. #}
{# wf_blink_components: Blink>Media #}

# Audio/Video Updates in Chrome 70 {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

- Web developers can control [Picture-in-Picture for videos](#pip).
- [AV1 decoder](#av1-decoder) is now supported in Chrome Desktop x86-64.
- [Cross-codec and cross-bytestream buffering and
  playback](#sourcebuffer-changetype) is possible in MSE.
- Chrome now supports [Opus in MP4 with MSE](#opus-in-mp4-for-mse).
- Protected content playback is [allowed by
  default](#protected-content-allowed-by-default) on Android.

## Watch video using Picture-in-Picture {: #pip }

Picture-in-Picture (PiP) allows users to watch videos in a floating window
(always on top of other windows) so they can keep an eye on what they’re
watching while interacting with other sites, or applications. With the new
[Picture-in-Picture Web API], you can initiate and control Picture-in-Picture
for videos on your website.

Read [our article] to learn all about it.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="t2QAzHZH-5s"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## AV1 decoder {: #av1-decoder }

AV1 is a next generation codec developed by the [Alliance for Open Media]. AV1
[improves compression efficiency by greater than 30%] over the current
state-of-the-art video codec, VP9. Chrome 70 adds an AV1 decoder to Chrome
Desktop x86-64 based on the [official bitstream specification]. At this time,
support is limited to “Main” [profile 0] and does not include encoding
capabilities. The supported container is MP4 ([ISO-BMFF]) (see [From raw video
to web ready] for a brief explanation of containers).

To try AV1:

- Go to the [YouTube TestTube page].
- Select "Prefer AV1 for SD" or "Always Prefer AV1" to get the desired
  AV1 resolution. Note that at higher resolutions, AV1 is more likely to
  experience playback performance issues on some devices.
- Try playing YouTube clips from the [AV1 Beta Launch Playlist].
- Confirm the codec av01 in "Stats for nerds".

<figure>
  <img src="/web/updates/images/2018/09/stats-for-nerds-featuring-av1-in-youtube.png"
       alt="Stats for nerds featuring AV1 in YouTube.">
  <figcaption>
    <b>Figure 1.</b>
    Stats for nerds featuring AV1 in YouTube.
  </figcaption>
</figure>

## Support for codec and container switching in MSE {: #sourcebuffer-changetype }

Chrome is [adding support] for improved cross-codec or cross-bytestream
transitions in [Media Source Extensions] (MSE) playback using a new
`changeType()` method on `SourceBuffer`. It allows the type of media
bytes appended to the `SourceBuffer` to be changed afterwards.

The [current version of MSE] (W3C Recommendation 17 November 2016) supports
adaptive playback of media; however adaptation requires that any media appended
to a `SourceBuffer` must conform to the MIME type provided when initially
creating the `SourceBuffer` via `MediaSource.addSourceBuffer(type)`. Codecs
from that type and any previously parsed initialization segments must remain
the same throughout. This means the website has to take explicit steps to
accomplish codec or bytestream switching (by using multiple media elements or
`SourceBuffer` tracks and switching among those), increasing application
complexity and user-visible latency. (Such transitions require the web app to
take synchronous action on the renderer main thread). This transition latency
impairs the smoothness of media playback across transitions.

With its new `changeType()` method, a `SourceBuffer` can buffer and support
playback across different [bytestream formats] and codecs. This new method
retains previously buffered media, modulo future MSE coded frame eviction or
removal, and leverages the splicing and buffering logic in the existing MSE
coded frame processing algorithm.

Here's how to use the `changeType()` method:

    const sourceBuffer = myMediaSource.addSourceBuffer('video/webm; codecs="opus, vp09.00.10.08"');
    sourceBuffer.appendBuffer(someWebmOpusVP9Data);

    // Later on...
    if ('changeType' in sourceBuffer) {
      // Change source buffer type and append new data.
      sourceBuffer.changeType('video/mp4; codecs="mp4a.40.5, avc1.4d001e"');
      sourceBuffer.appendBuffer(someMp4AacAvcData);
    }

As expected, if the passed type is not supported by the browser, this method
throws a `NotSupportedError` exception.

Check out the [sample] to play with cross-codec and
cross-bytestream buffering and playback of an audio element.

[Intent to Ship](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/K_OFPxA_whE) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5719220952236032) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=605134)

## Opus in MP4 for MSE {: #opus-in-mp4-for-mse }

The open and highly versatile audio codec [Opus] has been supported in the
`<audio>` and `<video>` elements since Chrome 33. [Opus in ISO-BMFF] support
(aka Opus in MP4) was added after. And now Opus in MP4 is available in Chrome
70 for [Media Source Extensions] (MSE).

Here's how you can detect if Opus in MP4 is supported for MSE:

    if (MediaSource.isTypeSupported('audio/mp4; codecs="opus"')) {
      // TODO: Fetch data and feed it to a media source.
    }

If you want to see a full example, check out our [official sample].

Due to lack of tools to mux Opus in MP4 with correct end trimming and preskip
values, if such precision is important to you, you'll need to use
`SourceBuffer.appendWindow{Start,End}` and `SourceBuffer.timestampOffset` in
Chrome to obtain sample-accurate playback.

Warning: Chrome for Android does not support encrypted Opus content on Android
versions prior to Lollipop.

[Intent to Ship](https://groups.google.com/a/chromium.org/d/msg/blink-dev/Ce2j1tA_xdU/T9C6sxpTDQAJ) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5100845653819392) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=649438)

## Allow protected content playback by default on Android {: #protected-content-allowed-by-default }

In Chrome 70 for Android, the default value of the “protected content” site
setting changes from “Ask first” to “Allowed”, lowering the friction associated
with playback of such media. This change is possible, in part, because of
additional steps taken to clear media licenses alongside cookies and site data,
ensuring that media licenses are not used by sites to track users who have
cleared browsing data.

<div class="attempt-right">
<figure>
  <img src="/web/updates/images/2018/09/protected-content-setting.png"
       alt="Protected content setting in Android.">
  <figcaption>
    <b>Figure 2.</b>
    Protected content setting in Android.
  </figcaption>
</figure>
</div>


<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}

[Picture-in-Picture Web API]: https://wicg.github.io/picture-in-picture/
[our article]: /web/updates/2018/10/watch-video-using-picture-in-picture
[Alliance for Open Media]: http://aomedia.org/
[improves compression efficiency by greater than 30%]: https://code.fb.com/video-engineering/av1-beats-x264-and-libvpx-vp9-in-practical-use-case/
[official bitstream specification]: https://aomedia.org/av1-bitstream-and-decoding-process-specification/
[profile 0]: https://aomediacodec.github.io/av1-spec/#profiles
[ISO-BMFF]: https://aomediacodec.github.io/av1-isobmff
[From raw video to web ready]: /web/fundamentals/media/manipulating/files#how_are_media_files_put_together
[YouTube TestTube page]: https://www.youtube.com/testtube
[AV1 Beta Launch Playlist]: https://www.youtube.com/playlist?list=PLyqf6gJt7KuHBmeVzZteZUlNUQAVLwrZS
[adding support]: https://github.com/wicg/media-source/blob/codec-switching/codec-switching-explainer.md
[Media Source Extensions]: /web/fundamentals/media/mse/basics
[current version of MSE]: https://www.w3.org/TR/2016/REC-media-source-20161117/
[bytestream formats]: https://www.w3.org/TR/mse-byte-stream-format-registry/
[sample]: https://googlechrome.github.io/samples/media/sourcebuffer-changetype.html
[Opus]: https://opus-codec.org/
[Opus in ISO-BMFF]: https://people.xiph.org/~shobson/opus-codec.org/docs/opus_in_isobmff.html
[official sample]: https://googlechrome.github.io/samples/media/opus-in-mp4-for-mse.html
