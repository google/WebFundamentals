---
layout: updates/post
title: "Muted autoplay on mobile: goodbye to &lt;canvas&gt; hacks and animated GIFs!"
description: "Muted autoplay for video is supported on Android from Chrome 53. Previously, a video element required a user gesture to initiate playback."
published_on: 2016-07-18
updated_on: 2016-07-18
authors:
  - samdutton
tags:
  - canvas
  - chrome53
  - gif
  - media
  - security
  - webrtc
featured_image: /web/updates/images/2016/07/autoplay/featured.jpg
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

<p class="intro">Say goodbye to animated GIFs and &lt;canvas&gt; hacks!</p>

Muted autoplay for video is supported by Chrome for Android from version 53. Playback will start automatically for a video element once it comes into view if both `autoplay` and `muted` are set, and playback can be initiated with `play()`. Previously, playback on mobile had to be initiated by a user gesture.

{% highlight html %}
<video autoplay muted>
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
  <p>This browser does not support the video element.</p>
</video>
{% endhighlight %}

To see this in action, open [simpl.info/video/muted](https://simpl.info/video/muted). Playback starts automatically in Chrome 53 or later, whereas in older versions of Chrome you need to tap on the video element's Play button.

<img src="/web/updates/images/2016/07/autoplay/screenshot.jpg">

Muted playback can now be initiated using the `play()` method even if a video element is not visible. (If the video is not muted, playback will automatically be paused.) Previously, `play()` would only initiate playback if it came from a user gesture such as a button click. Compare the following two demos on Android in Chrome 53 and an older version:

* [Scripted playback](https://simpl.info/video/scripted)
* [Playback initiated by a button](https://simpl.info/video/button)

The `muted autoplay` change will also make it possible to use `play()` with a `video` element not created in the DOM, for example [to drive WebGL playback](https://groups.google.com/a/chromium.org/d/msg/blink-dev/Q1cnzNI2GpI/-T5luh_xAwAJ).

## Why the change?

Autoplay was disabled in previous versions of Chrome on Android because it can be disruptive, data-hungry and [many users don't like it](https://www.google.com/search?q=autoplay+bad).

Disabling autoplay had the unintended effect of driving developers to alternatives such as animated GIFs, `<canvas>` and `<img>` hacks. These techniques are all much worse than video in terms of power consumption, performance, bandwidth requirements, data cost and memory usage. Video can provide higher quality and far better compression (up to around 10x) than animated GIFs. Video decoding in JavaScript [is possible](https://github.com/mbebenita/Broadway), but it's a huge drain on battery power. In addition, these techniques have no standardised, built-in UI controls.

There [was discussion](https://github.com/whatwg/html/issues/976) of using an `img` element with a video `src` (`<img src='video.webm'>`), but this led to concerns that video requires its own UI and API features, as provided by HTMLVideoElement, and that attempting to re-implement some or all of these in the `img` element would result in extra complexity.

Chrome and other browser vendors are extremely cautious about user bandwidth. For many users in many contexts [high data cost is often a greater barrier to access than poor connectivity](https://developers.google.com/web/billions/#conserve-data-usage). The existing autoplay alternatives show no sign of going away. Enabling muted autoplay seems like a better option — even if autoplay is seen as undesirable.

The web is [increasingly media centric](http://www.cisco.com/c/en/us/solutions/collateral/service-provider/visual-networking-index-vni/vni-hyperconnectivity-wp.html) and designers and developers continue to find new and unforeseen ways to use video. Background videos are being used as design elements, for example by [Airbnb](https://airbnb.com) and [Apple](https://www.apple.com/music/). Muted autoplay enables use cases like this for video on mobile as well as desktop.

['Promisified' play()](https://developers.google.com/web/updates/2016/03/play-returns-promise?hl=en) can be used to check if muted autoplay is enabled: call `play()` on a muted video and check the result via a promise. There is an example of this at [simpl.info/video/scripted](https://simpl.info/video/scripted).

## The finer points

* From an accessibility viewpoint, autoplay can be [particularly problematic](https://www.abilitynet.org.uk/blog/why-autoplay-accessibility-issue). Android is therefore providing a setting to disable autoplay completely.

* This change does not affect the `audio` element: autoplay is still disabled on Chrome on Android, and muted autoplay doesn't make much sense for audio.

* There is no autoplay if [Data Saver mode](https://support.google.com/chrome/answer/2392284) is enabled.

* Muted autoplay will work for any visible video element in any visible frame, iframe or otherwise.

* Remember that to take advantage of the new behaviour you'll need to add `muted` as well as `autoplay`: compare [simpl.info/video](https://simpl.info/video) with [simpl.info/video/muted](https://simpl.info/video/muted).

## Support

* Muted autoplay is supported by Safari on iOS 10 and later.

* Autoplay, muted or otherwise, is already supported on Android by Firefox and UC Browser.

## Find out more

* [Launch bug](https://crbug.com/618000)

* [Intent to Implement](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/Q1cnzNI2GpI)

* [Feature dashboard](https://www.chromestatus.com/features/4864052794753024)

* [Convert animated GIFs to videos with ffmpeg](http://rigor.com/blog/2015/12/optimizing-animated-gifs-with-html5-video)
