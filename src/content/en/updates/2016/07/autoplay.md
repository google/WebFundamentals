project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Muted autoplay for video is supported on Android from Chrome 53. Previously, a video element required a user gesture to initiate playback.

{# wf_updated_on: 2017-09-25 #}
{# wf_published_on: 2016-07-27 #}
{# wf_tags: canvas,chrome53,gif,media,security,webrtc #}
{# wf_featured_image: /web/updates/images/2016/07/autoplay/featured.jpg #}
{# wf_blink_components: Blink>Media #}

# Muted Autoplay on Mobile: Say Goodbye to Canvas Hacks and Animated GIFs! {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}



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

Muted autoplay for video is supported by Chrome for Android as of version 53. Playback will start automatically for a video element once it comes into view if both `autoplay` and `muted` are set, and playback of muted videos can be [initiated pragmatically with `play()`](/web/updates/2016/03/play-returns-promise). Previously, playback on mobile had to be initiated by a user gesture, regardless of the muted state.


    <video autoplay muted>
      <source src="video.webm" type="video/webm" />
      <source src="video.mp4" type="video/mp4" />
    </video>
    

You can see this in action by visiting [this sample](https://googlechrome.github.io/samples/muted-autoplay/index.html). Playback of the `muted` video starts automatically in Chrome 53 or later.

<img src="/web/updates/images/2016/07/autoplay/screenshot.jpg">

In addition, muted playback can now be initiated using the `play()` method. Previously, `play()` would only initiate playback if it came from a user gesture such as a button click. Compare the following two demos on Android — try them on Chrome 53, then on an older version:

* [Scripted playback](https://simpl.info/video/scripted)
* [Playback initiated by a button](https://simpl.info/video/button)

We recommend using the `autoplay` attribute whenever possible, and the `play()` method only if necessary.

It's possible to unmute a video programmatically in response to a user gesture such as a `click`, but if you attempt to unmute a video programmatically without a user gesture, playback will pause.

The `muted autoplay` change will also make it possible to use `play()` with a `video` element not created in the DOM, for example [to drive WebGL playback](https://groups.google.com/a/chromium.org/d/msg/blink-dev/Q1cnzNI2GpI/-T5luh_xAwAJ).

The `play()` method also [returns a promise](/web/updates/2016/03/play-returns-promise), which can be used to check whether muted programmatic playback is enabled. There is an example of this at [simpl.info/video/scripted](https://simpl.info/video/scripted).

## Why the change?

Autoplay was disabled in previous versions of Chrome on Android because it can be disruptive, data-hungry and [many users don't like it](http://ux.stackexchange.com/questions/5252/video-and-audio-autoplay-evidence-that-its-bad-practice).

Disabling autoplay had the unintended effect of driving developers to alternatives such as animated GIFs, as well as `<canvas>` and `<img>` hacks. These techniques are much worse than optimized video in terms of power consumption, performance, bandwidth requirements, data cost and memory usage. Video can provide higher quality than animated GIFs, with far better compression: around 10 times on average, and up to 100 times at best. Video decoding in JavaScript [is possible](https://github.com/mbebenita/Broadway), but it's a huge drain on battery power.

Compare the following — the first is a video and the second is an animated GIF:

<video id="chrome-clip" autoplay loop muted>
  <source src="/web/updates/videos/2016/07/autoplay/chrome-clip.webm" type="video/webm" />
  <source src="/web/updates/videos/2016/07/autoplay/chrome-clip.mp4" type="video/mp4" />
  <p>Your browser does not support the video element.</p>
</video>

<img src="/web/updates/images/2016/07/autoplay/chrome-clip.gif" style="display: block; margin: 0 0 20px 0;">

They look pretty similar, but the video is less than 200KB in size and the animated GIF is over 900KB.

Chrome and other browser vendors are extremely cautious about user bandwidth. For many users in many contexts [high data cost is often a greater barrier to access than poor connectivity](/web/billions/#conserve-data-usage). Given the prevalence of workarounds, muted autoplay isn't something that can be blocked, so offering good APIs and defaults is the best the platform can do.

The web is [increasingly media centric](http://www.cisco.com/c/en/us/solutions/collateral/service-provider/visual-networking-index-vni/vni-hyperconnectivity-wp.html). Designers and developers continue to find new and unforeseen ways to use video — and they want consistent behaviour across platforms, for example when using background video as a design element. Muted autoplay enables functionality like this on both mobile and desktop.

## The finer points

* From an accessibility viewpoint, autoplay can be [particularly problematic](https://www.abilitynet.org.uk/blog/why-autoplay-accessibility-issue). Chrome 53 and above on Android provide a setting to disable autoplay completely: from Media settings, select Autoplay.
* This change does not affect the `audio` element: autoplay is still disabled on Chrome on Android, because muted autoplay doesn't make much sense for audio.
* There is no autoplay if [Data Saver mode](https://support.google.com/chrome/answer/2392284) is enabled. If Data Saver mode is enabled, autoplay is disabled in Media settings.
* Muted autoplay will work for any visible video element in any visible document, iframe or otherwise.
* Remember that to take advantage of the new behaviour, you'll need to add `muted` as well as `autoplay`: compare [simpl.info/video](https://simpl.info/video) with [simpl.info/video/muted](https://simpl.info/video/muted).

## Support

* Muted autoplay is supported by Safari on iOS 10 and later.
* Autoplay, whether muted or not, is already supported on Android by Firefox and UC Browser: they do not block any kind of autoplay.

## Find out more

* [Launch bug](https://crbug.com/618000)
* [Intent to Implement](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/Q1cnzNI2GpI)
* [Feature dashboard](https://www.chromestatus.com/features/4864052794753024)
* [Convert animated GIFs to videos with ffmpeg](http://rigor.com/blog/2015/12/optimizing-animated-gifs-with-html5-video)


{% include "comment-widget.html" %}
