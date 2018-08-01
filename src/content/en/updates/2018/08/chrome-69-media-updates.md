project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the audio/video updates in Chrome 69: AV1, Picture-in-Picture, and HDCP policy check.

{# wf_updated_on: 2018-08-01 #}
{# wf_published_on: 2018-08-01 #}
{# wf_tags: news,chrome69,media,removals #}
{# wf_featured_image: /web/updates/images/generic/play-outline.png #}
{# wf_featured_snippet: A round up of the audio/video updates in Chrome 69: AV1, Picture-in-Picture, and HDCP policy check. #}
{# wf_blink_components: Blink>Media #}

# Audio/Video Updates in Chrome 69 {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

- Chrome supports [AV1 video decoding](#av1).
- Web developers can now control [Picture-in-Picture](#picture_in_picture) for
  video elements.
- Querying [which encryption schemes are supported](#encryption_scheme) through
  EME is now available.
- Web developers can experiment with [querying whether a certain HDCP policy
  can be enforced](#hdcp).
- Media Source Extensions now use [PTS for buffered ranges and duration
  values](#pts).
- Android Go users can [open downloaded audio, video and images in Chrome](#media_intent_handler).
- [Stalled events](#stalled) for media elements using MSE are removed.

## AV1 video decoder {: #av1 }

AV1 is a next generation codec developed by the [Alliance for Open Media] which
[improves compression efficiency by 30%] over the current state-of-the-art
video codec, VP9.

Chrome 69 adds an AV1 decoder to Chrome Desktop (Windows, Mac, Linux, ChromeOS)
based on the [official bitstream specification]. At this time, support is
limited to "Main" [profile 0] and does not include encoding capabilities. The
supported container is [ISO-BMFF (MP4)]. See [From raw video to web ready] for
a brief explanation of containers.

[Chromestatus Tracker](https://www.chromestatus.com/features/5729898442260480) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=838380)

## Watch video using Picture-in-Picture {: #picture_in_picture }

Picture-in-Picture (PiP) allows users to watch videos in a floating window
(always on top of other windows) so they can keep an eye on what they’re
watching while interacting with other sites or applications. With the new
[Picture-in-Picture Web API], you can initiate and control Picture-in-Picture
for video elements on your website. Read our [article] to learn more.

<figure>
  <img src="/web/updates/images/2018/08/picture-in-picture.png"
       alt="Picture-in-Picture window">
  <figcaption>
    <b>Figure 1.</b>
    Picture-in-Picture window
  </figcaption>
</figure>

[Intent to Ship](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ibVPbqBQapU) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5729206566649856) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=806249)

## EME: Querying encryption scheme support {: #encryption_scheme }

Some platforms or key systems only support [CENC mode], while others only support
[CBCS mode]. Still others are able to support both. These two encryption schemes
are incompatible, so web developers must be able to make intelligent choices
about what content to serve.

To avoid having to determine which platform they’re on to check for “known”
encryption scheme support, a new `encryptionScheme` key is [added] in
`MediaKeySystemMediaCapability` [dictionnary] to allow websites to specify
which encryption scheme could be used in [Encrypted Media Extensions (EME)].

The new `encryptionScheme` key can be one of two values:

- `'cenc'` AES-CTR mode full sample and video NAL subsample encryption.
- `'cbcs'` AES-CBC mode partial video NAL pattern encryption.

If not specified, it indicates that any encryption scheme is acceptable. Note
that [Clear Key] always supports the `'cenc'` scheme.

The example below shows how to query two configurations with different
encryption schemes. In this case, only one will be chosen.

    await navigator.requestMediaKeySystemAccess('org.w3.clearkey', [
        {
          label: 'configuration using the "cenc" encryption scheme',
          videoCapabilities: [{
            contentType: 'video/mp4; codecs="avc1.640028"',
            encryptionScheme: 'cenc'
          }],
          audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            encryptionScheme: 'cenc'
          }],
          initDataTypes: ['keyids']
        },
        {
          label: 'configuration using the "cbcs" encryption scheme',
          videoCapabilities: [{
            contentType: 'video/mp4; codecs="avc1.640028"',
            encryptionScheme: 'cbcs'
          }],
          audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            encryptionScheme: 'cbcs'
          }],
          initDataTypes: ['keyids']
        },
      ]);

In the example below, only one configuration with two different encryption
schemes is queried. In that case, Chrome will discard any capabilities object
it cannot support, so the accumulated configuration may contain one encryption
scheme or both.

    await navigator.requestMediaKeySystemAccess('org.w3.clearkey', [{
        videoCapabilities: [
          { // A video capability using the "cenc" encryption scheme
            contentType: 'video/mp4; codecs="avc1.640028"',
            encryptionScheme: 'cenc'
          },
          { // A video capability using the "cbcs" encryption scheme
            contentType: 'video/mp4; codecs="avc1.640028"',
            encryptionScheme: 'cbcs'
          },
        ],
        audioCapabilities: [
          { // An audio capability using the "cenc" encryption scheme
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            encryptionScheme: 'cenc'
          },
          { // An audio capability using the "cbcs" encryption scheme
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            encryptionScheme: 'cbcs'
          },
        ],
        initDataTypes: ['keyids']
      }]);

[Intent to Implement](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/lMUKOaohUTY) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5184416120832000) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=838416)

## EME: HDCP policy check {: #hdcp}

Nowadays [HDCP] is a common policy requirement for streaming high resolutions
of [protected content]. And web developers who want to enforce an HDCP policy
must either wait for the license exchange to complete or start streaming
content at a low resolution. This, is a sad situation that the [HDCP Policy
Check API] aims to solve.

This proposed API allows web developers to query whether a certain HDCP policy
can be enforced so that playback can be started at the optimum resolution for
the best user experience. It consists of a simple method to query the status of
a hypothetical key associated with an HDCP policy, without the need to create a
`MediaKeySession` or fetch a real license. It does not require `MediaKeys` to be
attached to any audio or video elements either.

The HDCP Policy Check API works simply by calling
`mediaKeys.getStatusForPolicy()` with an object that has a `minHdcpVersion` key
and a valid value. If HDCP is available at the specified version, the returned
promise resolves with a `MediaKeyStatus` of `'usable'`. Otherwise, the promise
resolves with [other error values] of `MediaKeyStatus` such as
`'output-restricted'` or `'output-downscaled'`. If the key system does not
support HDCP Policy Check at all (e.g. Clear Key System), the promise rejects.

In a nutshell, here’s how the API works for now. Check out the [official sample]
to try out all versions of HDCP.

    const config = [{
      videoCapabilities: [{
        contentType: 'video/webm; codecs="vp09.00.10.08"',
        robustness: 'SW_SECURE_DECODE' // Widevine L3
      }]
    }];

    navigator.requestMediaKeySystemAccess('com.widevine.alpha', config)
    .then(mediaKeySystemAccess => mediaKeySystemAccess.createMediaKeys())
    .then(mediaKeys => {

      // Get status for HDCP 2.2
      return mediaKeys.getStatusForPolicy({ minHdcpVersion: 'hdcp-2.2' })
      .then(status => {
        if (status !== 'usable')
          return Promise.reject(status);

        console.log('HDCP 2.2 can be enforced.');
        // TODO: Fetch high resolution protected content...
      });
    })
    .catch(error => {
      // TODO: Fallback to fetch license or stream low-resolution content...
    });

### Available for Origin Trials

To get feedback from web developers, the HDCP Policy Check API is available as
an [Origin Trial] in Chrome 69 for Desktop (Chrome OS, Linux, Mac, and
Windows). You will need to [request a token], so that the feature is
automatically enabled for your origin for a limited period of time, without the
need to enable the experimental "Web Platform Features" flag at
`chrome://flags/#enable-experimental-web-platform-features`.

[Intent to Experiment](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ITzZ_yx4bF8) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5652917147140096) &#124;
[Chromium Bug](https://crbug.com/709348)

## MSE PTS/DTS compliance {: #pts }

Buffered ranges and duration values are now reported by Presentation Time Stamp
(PTS) intervals, rather than by Decode Time Stamp (DTS) intervals in [Media
Source Extensions (MSE)].

When MSE was new, Chrome’s implementation was tested against WebM and MP3, some
media stream formats where there was no distinction between PTS and DTS. And
it was working fine until ISO BMFF (aka MP4) was added. This container
frequently contains out-of-order presentation versus decode time streams (for
codecs like H.264 for example) causing DTS and PTS to differ. That caused
Chrome to report (usually just slightly) different buffered ranges and duration
values than expected. This new behavior will roll out gradually in Chrome 69
and make its MSE implementation compliant with the [MSE specification].

<figure>
  <img src="/web/updates/images/2018/08/pts-dts.png"
       alt="PTS/DTS">
  <figcaption>
    <b>Figure 2.</b>
    PTS/DTS
  </figcaption>
</figure>

This change affects `MediaSource.duration` (and consequently
`HTMLMediaElement.duration`), `SourceBuffer.buffered` (and consequently
`HTMLMediaElement.buffered)`, and `SourceBuffer.remove(start, end)`.

If you’re not sure which method is used to report buffered ranges and duration
values, you can go to the internal `chrome://media-internals` page and search for
"ChunkDemuxer: buffering by PTS" or  "ChunkDemuxer: buffering by DTS" in the
logs.

[Intent to Implement](https://groups.google.com/a/chromium.org/d/msg/blink-dev/I6oGJLym-Tk/Z46le9l4CQAJ) &#124;
[Chromium Bug](https://crbug.com/718641)

## Handling of media view intents on Android Go {: #media_intent_handler }

[Android Go] is a lightweight version of Android designed for entry-level
smartphones. To that end, it does not necessarily ship with some media-viewing
applications, so if a user tries to open a downloaded video for instance, they
won’t have any applications to handle that intent.

To fix this, Chrome 69 on Android Go now listens for media-viewing intents so
users can view downloaded audio, videos, and images. In other words, it takes
the place of the missing viewing applications.

<figure>
  <img src="/web/updates/images/2018/08/media-intent-handler.png"
       alt="Media intent handler">
  <figcaption>
    <b>Figure 3.</b>
    Media intent handler
  </figcaption>
</figure>

Note that this Chrome feature is enabled on all Android devices running Android
O and onwards with 1 GB of RAM or less.

[Chromium Bug](https://crbug.com/718641)

## Removal of “stalled” events for media elements using MSE {: #stalled }

A "stalled" event is raised on a media element if downloading media data has
failed to progress for about 3 seconds. When using [Media Source Extensions
(MSE)], the web app manages the download and the media element is not aware of
its progress. This caused Chrome to raise "stalled" events at inappropriate
times whenever the website has not appended new media data chunks with
`SourceBuffer.appendBuffer()` in the last 3 seconds.

As websites may decide to append large chunks of data at a low frequency, this
is not a useful signal about buffering health. Removing "stalled" events for
media elements using MSE clears up confusion and brings Chrome more in line
with the MSE specification. Note that media elements that don't use MSE will
continue to raise "stalled" events as they do today.

[Intent to Deprate and Remove](https://groups.google.com/a/chromium.org/d/msg/blink-dev/x54XtrTyOP8/4-5QZlZzDAAJ) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/6338037575319552) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=836951)

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

[Picture-in-Picture Web API]: https://wicg.github.io/picture-in-picture/
[article]: /web/updates/2018/08/watch-video-using-picture-in-picture
[CENC mode]: https://www.iso.org/obp/ui/#iso:std:iso-iec:23001:-7:ed-2:v1:en
[CBCS mode]: https://www.iso.org/obp/ui/#iso:std:iso-iec:23001:-7:ed-3:v1:en
[added]: https://github.com/WICG/encrypted-media-encryption-scheme/blob/master/explainer.md
[dictionnary]: https://w3c.github.io/encrypted-media/#idl-def-mediakeysystemmediacapability
[Encrypted Media Extensions (EME)]: https://w3c.github.io/encrypted-media/
[Clear Key]: https://www.w3.org/TR/encrypted-media/#clear-key
[HDCP]: https://en.wikipedia.org/wiki/High-bandwidth_Digital_Content_Protection
[protected content]: /web/fundamentals/media/eme
[HDCP Policy Check API]: https://github.com/WICG/hdcp-detection/blob/master/explainer.md
[other error values]: https://w3c.github.io/encrypted-media/#dom-mediakeystatus
[official sample]: https://googlechrome.github.io/samples/hdcp-detection/
[Origin Trial]: https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md
[request a token]: http://bit.ly/HdcpPolicyCheckOriginTrials
[Alliance for Open Media]: http://aomedia.org/
[improves compression efficiency by 30%]: https://code.fb.com/video-engineering/av1-beats-x264-and-libvpx-vp9-in-practical-use-case/
[official bitstream specification]: https://aomedia.org/av1-bitstream-and-decoding-process-specification/
[profile 0]: https://aomediacodec.github.io/av1-spec/#profiles
[ISO-BMFF (MP4)]: https://aomediacodec.github.io/av1-isobmff
[From raw video to web ready]: /web/fundamentals/media/manipulating/files#how_are_media_files_put_together
[Media Source Extensions (MSE)]: /web/fundamentals/media/mse/basics
[MSE specification]: https://w3c.github.io/media-source/
[Android Go]: https://www.android.com/versions/oreo-8-0/go-edition/
[raise]: https://bugs.chromium.org/p/chromium/issues/detail?id=517240
[Removing]: https://chromium-review.googlesource.com/982564
[more in line]: https://github.com/w3c/media-source/issues/88#issuecomment-374406928
