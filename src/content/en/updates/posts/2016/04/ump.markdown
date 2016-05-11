---
layout: updates/post
title: "Service worker caching, playbackRate and Blob URLS for audio and video on Chrome for Android"
description: "From version 51, Android Chrome uses the same media stack as desktop Chrome, rather than relying on the underlying platform implementation. This enables service worker media caching, variable playback rates, Blob URLs on Android, MediaStream passing between APIs, and easier cross-platform debugging."
published_on: 2016-05-19
updated_on: 2016-05-19
authors:
  - samdutton
tags:
  - audio
  - chrome51
  - media
  - recording
  - video
  - webrtc
featured_image: /web/updates/images/2016/04/ump/featured.jpg
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

<p class="intro">Sometimes good things have boring names.</p>

Case in point: the Unified Media Pipeline, **UMP** for short.

This may sound like a sinister Soviet era directive, but in fact it's an important step towards consistent cross-platform audio and video delivery. Chrome on Android will now use the same media stack as desktop Chrome, rather than relying on the underlying platform implementation.

UMP enables you to do a lot:

* Cache audio and video with service workers — since media delivery is now implemented directly within Chrome rather than being passed off to the Android media stack.
* Use Blob URLs for audio and video elements.
* Set `playbackRate` for audio and video.
* Pass MediaStreams between Web Audio and MediaRecorder.
* Develop and debug media across different devices. Media works the same on desktop and Android.

UMP took some hard engineering work to implement:

* A new caching layer for improved power performance.
* Updating a new MediaCodec based video decoder hosted in Chrome's GPU process.
* Lots of testing and iteration on different devices.


Here's a <a href="https://googlechrome.github.io/samples/service-worker/prefetch-video/index.html">demo of video caching with a service worker</a>:

<a href="https://googlechrome.github.io/samples/service-worker/prefetch-video/index.html"><img class="screenshot-landscape" src="/web/updates/images/2016/04/ump/screenshot-sw.jpg" alt="Screenshot of video playback"></a>

The inability to change `playbackRate` on Android has been a [long-standing bug](https://bugs.chromium.org/p/chromium/issues/detail?id=263654). UMP fixes this. For the demo at <a href="https://simpl.info/video/playbackrate">simpl.info/video/playbackrate</a>, `playbackRate` is set to 2. Try it out!

<a href="https://simpl.info/video/playbackrate"><img class="screenshot-landscape" src="/web/updates/images/2016/04/ump/screenshot-rate.jpg" alt="Screenshot of video playback with playbackRate set to 2"></a>

The ability to use Blob URLs means that, for example, you can now <a href="https://simpl.info/mediarecorder" title="MediRecorder demo">play back a video recorded using the MediaRecorder API</a>:

<a href="https://simpl.info/mediarecorder"><img class="screenshot-landscape" src="/web/updates/images/2016/04/ump/screenshot-mr.jpg" alt="Screenshot of playback in Chrome on Android of a video recorded using the MediaRecorder API"></a>

For the demo at <a href="https://simpl.info/video/offline" title="Offline video using the File APIs">simpl.info/video/offline</a>, video is stored using the File APIs, then played back using a Blob URL:

<a href="https://simpl.info/video/offline"><img class="screenshot-portrait" src="/web/updates/images/2016/04/ump/screenshot-file.jpg" alt="Screenshot of playback in Chrome on Android of video stored using the File APIs"></a>

The Unified Media Pipeline has also been [enabled for MSE and EME](https://groups.google.com/a/chromium.org/forum/#!topic/chromium-reviews/Qi4dLcKjcCM).

> One thing that hasn't changed: autoplay. The UI and implementations for this are still in discussion. (Check out [the bug](https://bugs.chromium.org/p/chromium/issues/detail?id=178297) for updates.)

This is another step towards unifying mobile and desktop Chrome. You don't need to change your code, but building a consistent media experience across desktop and mobile should now be easier, since the media stack is the same across platforms. Debugging with Chrome DevTools? Mobile emulation now uses the 'real' audio and video stack.

If you experience problems as a result of the Unified Media Pipeline, please file issues on the [implementation bug](https://groups.google.com/a/chromium.org/forum/#!topic/chromium-reviews/Qi4dLcKjcCM) or via [new.crbug.com](https://new.crbug.com).

## Demos

* <a href="https://googlechrome.github.io/samples/service-worker/prefetch-video/index.html">Cache video with a service worker</a>
* <a href="https://simpl.info/video/playbackrate">Media `playbackRate`</a>
* <a href="https://simpl.info/mediarecorder">MediaRecorder: playback using a Blob URL</a>
* <a href="https://simpl.info/video/offline">Offline video implemented with the File APIs</a>

## Relevant bugs

* [Tracking issues for the Unified Media Pipeline](https://bugs.chromium.org/p/chromium/issues/detail?id=507834)
* [UMP Field Trial](https://groups.google.com/a/chromium.org/forum/#!topic/chromium-reviews/okUkrNc0z6w)
* [MSE, EME and the Unified Media Pipeline](https://groups.google.com/a/chromium.org/forum/#!topic/chromium-reviews/Qi4dLcKjcCM)

## Browser support

* Behind a flag in Chrome Dev since January 2016
* Enabled by default in Chrome 51 and above

