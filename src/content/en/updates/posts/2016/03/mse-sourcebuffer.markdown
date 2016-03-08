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


<p class="intro"></p>

The mode attribute defines what determines the order of playback of media segments:

* 'segments': the timestamp of each segment.
* 'sequence': the order that segments are appended.

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
