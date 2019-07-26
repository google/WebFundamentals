project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the audio/video updates in Chrome 75: predicting whether playback will be smooth and power efficient for encrypted media and support of the video element's "playsInline" attribute hint.

{# wf_updated_on: 2019-07-26 #}
{# wf_published_on: 2019-07-22 #}
{# wf_tags: news,chrome75,media #}
{# wf_featured_image: /web/updates/images/generic/play-outline.png #}
{# wf_featured_snippet: A round up of the audio/video updates in Chrome 75: predicting whether playback will be smooth and power efficient for encrypted media and support of the video element's "playsInline" attribute hint. #}
{# wf_blink_components: Blink>Media #}

# Audio/Video Updates in Chrome 75 {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

Chrome's media capabilities were updated in version 75. In this article, I'll
discuss those new features which include:

- Predicting whether playback will be smooth and power efficient for encrypted
  media.
- Support of the video element's `playsInline` attribute hint.

## Encrypted Media: Decoding Info  {: #encrypted-media}

Since Chrome 66, web developers have been able to use [Decoding Info] to
query the browser about the clear content decoding abilities of the device based
on information such as the codecs, profile, resolution, bitrates, etc. It
indicates whether the playback will be smooth (timely) and power efficient based
on previous playback statistics recorded by the browser.

The [Media Capabilities API] specification, defining Decoding Info, has since
been updated to handle encrypted media configurations as well so that websites
using encrypted media (EME) can select the optimal media streams.

In a nutshell, here’s how Decoding Info for EME works. Give a try to the
[official sample].

    const encryptedMediaConfig = {
      type: 'media-source', // or 'file'
      video: {
        contentType: 'video/webm; codecs="vp09.00.10.08"',
        width: 1920,
        height: 1080,
        bitrate: 2646242, // number of bits used to encode a second of video
        framerate: '25' // number of frames used in one second
      },
      keySystemConfiguration: {
        keySystem: 'com.widevine.alpha',
        videoRobustness: 'SW_SECURE_DECODE' // Widevine L3
      }
    };

    navigator.mediaCapabilities.decodingInfo(encryptedMediaConfig).then(result => {
      if (!result.supported) {
        console.log('Argh! This encrypted media configuration is not supported.');
        return;
      }

      if (!result.keySystemAccess) {
        console.log('Argh! Encrypted media support is not available.')
        return;
      }

      console.log('This encrypted media configuration is supported.');
      console.log('Playback should be' +
          (result.smooth ? '' : ' NOT') + ' smooth and' +
          (result.powerEfficient ? '' : ' NOT') + ' power efficient.');

      // TODO: Use `result.keySystemAccess.createMediaKeys()` to setup EME playback.
    });

EME playbacks have specialized decoding and rendering code paths, meaning
different codec support and performance compared to clear playbacks. Hence a new
`keySystemConfiguration` key must be set in the media configuration object
passed to `navigator.mediaCapabilities.decodingInfo()`. The value of this key is
a dictionary that holds a number of [well-known EME types]. This replicates the
inputs provided to EME's `requestMediaKeySystemAccess()` with one major
difference: sequences of inputs provided to `requestMediaKeySystemAccess()`
are flattened to a single
value wherever the intent of the sequence was to have `requestMediaKeySystemAccess()`
choose a subset it supports.

Decoding Info describes the quality (smoothness and power efficiency) of
support for a single pair of audio and video streams without making a decision
for the caller. Callers should still order media configurations as they do with
`requestMediaKeySystemAccess()`. Only now they walk the list themselves.

`navigator.mediaCapabilities.decodingInfo()` returns a promise that resolves
asynchronously with an object containing three booleans: `supported`, `smooth`,
and `powerEfficient`. However when a`keySystemConfiguration` key is set and
`supported` is `true`, yet another `MediaKeySystemAccess` object named
`keySystemAccess` is returned as well. It can be used to request some media keys
and setup encrypted media playback. Here’s an example:

    // Like rMSKA(), orderedMediaConfigs is ordered from most to least wanted.
    const capabilitiesPromises = orderedMediaConfigs.map(mediaConfig =>
      navigator.mediaCapabilities.decodingInfo(mediaConfig)
    );

    // Assume this app wants a supported and smooth media playback.
    let bestConfig = null;
    for await (const result of capabilitiesPromises) {
      if (result.supported && result.smooth) {
        bestConfig = result;
        break;
      }
    }

    if (bestConfig) {
      const mediaKeys = await bestConfig.keySystemAccess.createMediaKeys();
      // TODO: rest of EME path as-is
    } else {
      // Argh! No smooth configs found.
      // TODO: Maybe choose the lowest resolution and framerate available.
    }

Note that Decoding Info for encrypted media requires HTTPS.

Moreover, be aware that it may trigger a user prompt on Android and Chrome OS in
the same way as `requestMediaKeySystemAccess()`. It won’t show more prompts than
`requestMediaKeySystemAccess()` though, in spite of
requiring more calls to setup encrypted media playback.


<div class="attempt-right">
  <figure>
    <img src="/web/updates/images/2019/07/protected-content-prompt.jpg"
        alt="Protected content prompt">
    <figcaption>
      <b>Figure 1.</b>
      Protected content prompt
    </figcaption>
  </figure>
</div>
<div class="clearfix">
</div>

Dogfood: To get feedback from web developers, this feature is available as an
[Origin Trial] in Chrome 75. You will need to [request a token], so that the
feature is automatically enabled for your origin for a limited period
of time. 

[Intent to Experiment](https://groups.google.com/a/chromium.org/d/topic/blink-dev/eA9uG98td5U/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5765900795904000) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=907909)

## HTMLVideoElement.playsInline {: #playsinline}

Chrome now supports the `playsInline` boolean attribute. If present, it hints to
the browser that the video ought to be displayed "inline" in the document by
default, constrained to the element's playback area.

[Similarly] to Safari, where video elements on iPhone don’t automatically enter
fullscreen mode when playback begins, this hint allows some embedders to have an
auto-fullscreen video playback experience. Web developers can use it to opt-out
of this experience if needed.

    <video playsinline></video>

As Chrome on Android and Desktop don’t implement auto-fullscreen, the
`playsInline` video element attribute hint is not used.

[Intent to Ship](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/0TJyePKiegs/lgU0hLyyCwAJ) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5402804803862528) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=943877)

{% include "web/_shared/rss-widget-updates.html" %}

[Decoding Info]: https://developers.google.com/web/updates/2017/12/chrome-63-64-media-updates#media-capabilities-decoding-info-api
[Media Capabilities API]: https://wicg.github.io/media-capabilities
[official sample]: https://googlechrome.github.io/samples/media-capabilities/decoding-info-eme
[well-known EME types]: https://wicg.github.io/media-capabilities/#dictdef-mediacapabilitieskeysystemconfiguration
[Origin Trial]: https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md
[request a token]: https://developers.chrome.com/origintrials
[Similarly]: https://webkit.org/blog/6784/new-video-policies-for-ios/
