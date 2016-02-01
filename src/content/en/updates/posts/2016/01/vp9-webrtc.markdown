---
layout: updates/post
title: "VP9 is now available in WebRTC"
description: "From Chrome 48 on desktop and Android, VP9 will be an optional video codec for video calls using WebRTC."
published_on: 2016-01-30
updated_on: 2016-01-30
authors:
  - samdutton
tags:
  - audio
  - codecs
  - media
  - news
  - video
  - vp9
  - webrtc
featured_image: /web/updates/images/2016/01/vp9-webrtc/featured.jpg
---

<style>
img.screenshot {
  max-width: 360px;
}
@media screen and (max-width: 500px) {
  img.screenshot {
    max-width: 100%;
  }
}
</style>


<p class="intro">Two years ago Chrome enabled support for the [VP9](http://webmproject.org) codec. From Chrome 48 on desktop and Android, VP9 will be an optional video codec for video calls using [WebRTC](https://webrtc.org).</p>

With VP9, internet connections that are currently able to serve 720p without
packet loss or delay will be able to support a 1080p video call at the same
bandwidth. VP9 can also reduce data usage for users with poor connections or
expensive data plans, requiring only 40% of the bitrate of VP8.

You can try out VP9 with the canonical video chat application [appr.tc](https://appr.tc/), which uses VP9 by default, or [compare VP8 video side by side with VP9](), screenshot below:

<img alt="Screenshot of video showing VP8 and VP9 WebRTC calls side by side" src="/web/updates/images/2016/01/vp9-webrtc/vp8-v-vp9.jpg" />

### Find out more

* [The WebM Project](http://www.webmproject.org/vp9/): VP9 resources
* [webrtc.org](http://www.webrtc.org/): home of the WebRTC project
* [g.co/webrtc](http://g.co/webrtc): links to other WebRTC resources
* [webrtc.github.io/samples](http://webrtc.github.io/samples): WebRTC samples
live
* [test.webrtc.org](http://test.webrtc.org): open source device and network testing tools and bug reporting framework
