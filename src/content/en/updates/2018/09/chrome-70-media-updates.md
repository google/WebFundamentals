project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the audio/video updates in Chrome 70: Cross-codec and cross-bytestream buffering and playback, Opus in MP4 with MSE, and protected content playback allowed by default on Android.

{# wf_updated_on: 2018-09-18 #}
{# wf_published_on: 2018-09-17 #}
{# wf_tags: news,chrome70,media #}
{# wf_featured_image: /web/updates/images/generic/play-outline.png #}
{# wf_featured_snippet: A round up of the audio/video updates in Chrome 70: Cross-codec and cross-bytestream buffering and playback, Opus in MP4 with MSE, and protected content playback allowed by default on Android. #}
{# wf_blink_components: Blink>Media #}

# Audio/Video Updates in Chrome 70 {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

- [Cross-codec and cross-bytestream buffering and
  playback](#sourcebuffer-changetype) is possible in MSE.
- Chrome now supports [Opus in MP4 with MSE](#opus-in-mp4-for-mse).
- Protected content playback is [allowed by
  default](#protected-content-allowed-by-default) on Android.

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
retains previously buffered media modulo future MSE coded frame eviction or
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
    <b>Figure 1.</b>
    Protected content setting in Android.
  </figcaption>
</figure>
</div>


<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

[adding support]: https://github.com/wicg/media-source/blob/codec-switching/codec-switching-explainer.md
[Media Source Extensions]: /web/fundamentals/media/mse/basics
[current version of MSE]: https://www.w3.org/TR/2016/REC-media-source-20161117/
[bytestream formats]: https://www.w3.org/TR/mse-byte-stream-format-registry/
[sample]: https://googlechrome.github.io/samples/media/sourcebuffer-changetype.html
[Opus]: https://opus-codec.org/
[Opus in ISO-BMFF]: https://people.xiph.org/~shobson/opus-codec.org/docs/opus_in_isobmff.html
[official sample]: https://googlechrome.github.io/samples/media/opus-in-mp4-for-mse.html
