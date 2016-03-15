---
layout: updates/post
title: "VP9 is now available in WebRTC"
description: "From Chrome 48 on desktop and Android, VP9 will be an optional video codec for video calls using WebRTC."
published_on: 2016-01-31
updated_on: 2016-01-31
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
img {
  max-width: 100%;
}
</style>


<p class="intro">Two years ago Chrome enabled support for the <a href="http://www.webmproject.org/vp9/" title="The WebM Project: VP9">VP9</a> codec. From Chrome 48 on desktop and Android, VP9 will be an optional video codec for video calls using <a href="https://webrtc.org" title="webrtc.org: home of the WebRTC project">WebRTC</a>.</p>

While VP9 uses the same basic blueprint as previous codecs, the [WebM team](http://webmproject.org) has packed improvements into VP9 to get more quality out of each byte of video. For instance, the encoder prioritizes the sharpest image features, and the codec now uses asymmetric transforms to help keep even the most challenging scenes looking crisp and block-free.

With VP9, internet connections that are currently able to serve 720p without packet loss or delay will be able to support a 1080p video call at the same bandwidth. VP9 can also reduce data usage for users with poor connections or expensive data plans, requiring in best cases only 40% of the bitrate of VP8.

You can see how VP8 calls compare with VP9 in the screenshot below of recordings we made with the WebRTC encoder settings, showing 30% bitrate savings:

<img alt="Screenshot of video showing VP8 and VP9 WebRTC calls side by side" src="/web/updates/images/2016/01/vp9-webrtc/vp8-v-vp9.jpg" />

The codec for a WebRTC call, along with other media settings such as bitrate, is negotiated between caller and callee by exchanging Session Description Protocol (SDP) metadata messages that describe the media capabilities of the client.

This handshaking process — exchanging media capabilities — is known as offer/answer.  For example, a caller might  send an offer (an SDP message) stating a preference for VP9, with VP8 as a fallback. If the answer confirms that the callee can handle VP9, the video call can proceed using VP9. If the callee responds with an answer that it can only use VP8, the call will proceed with VP8.

To see this in action, take a look at the code for the canonical WebRTC video chat application [appr.tc](https://appr.tc/).

> <strong>Top tip: </strong> In <a href="https://appr.tc" title="appr.tc WebRTC video chat app">appr.tc</a>, you can press <strong>I</strong> to get information about call state including signaling and codec details:
>
> <img alt="Screenshot of appr.tc infobox, showing signaling and codec information" src="/web/updates/images/2016/01/vp9-webrtc/apprtc-infobox.jpg" />

In [appcontroller.js](https://github.com/webrtc/apprtc/blob/5eb702d341796840edd0e57f3e7eebb6ebcba8d4/src/web_app/js/appcontroller.js#L536), VP9 is set as the preferred codec unless a _vsc_ or _vrc_ parameter is specified in the URL:

{% highlight javascript %}
AppController.prototype.loadUrlParams_ = function() {
  // ...
  var DEFAULT_VIDEO_CODEC = 'VP9';
  // …
  this.loadingParams_.videoSendCodec = urlParams['vsc'];
  // ...
  this.loadingParams_.videoRecvCodec = urlParams['vrc'] || DEFAULT_VIDEO_CODEC;
}
{% endhighlight %}

In [sdputils.js](https://github.com/webrtc/apprtc/blob/9eed9e0f2c98bc84ea5bb75ba15c8f304f8485e4/src/web_app/js/sdputils.js#L219) the custom codec value (if specified) is then used for the SDP metadata:

{% highlight javascript %}
function maybePreferVideoSendCodec(sdp, params) {
  return maybePreferCodec(sdp, 'video', 'send', params.videoSendCodec);
}

function maybePreferVideoReceiveCodec(sdp, params) {
  return maybePreferCodec(sdp, 'video', 'receive', params.videoRecvCodec);
}
{% endhighlight %}

The [maybePreferCodec()](https://github.com/webrtc/apprtc/blob/9eed9e0f2c98bc84ea5bb75ba15c8f304f8485e4/src/web_app/js/sdputils.js#L226) function used here sets values for the requested codec in the text of the SDP metadata. SDP is verbose and not designed to be human readable, but you can view the SDP used by [appr.tc](https://appr.tc/) from the DevTools console once a call has been made. The important part with regard to codecs is the _m line_:

{% highlight javascript %}
{
    "sdp": "v=0\r\no=- 9188830394109743399 2 IN IP4 127.0.0.1\r\ns … m=video ...",
    "type": "offer"
}
{% endhighlight %}

Using [appr.tc](https://appr.tc/) with its default settings in a recent version of Chrome, you will see that VP9 is the first codec listed in the SDP _m line_ — followed by VP8, which Chrome can also use. If you set VP8 as the preferred codec (via URL parameters in [appr.tc](https://appr.tc), for example) VP8 will be listed first instead.

### Find out more

* [The WebM Project](http://www.webmproject.org/vp9/): VP9 resources
* [webrtc.org](http://www.webrtc.org/): home of the WebRTC project
* [g.co/webrtc](http://g.co/webrtc): links to other WebRTC resources
* [webrtc.github.io/samples](http://webrtc.github.io/samples): WebRTC samples
live
* [test.webrtc.org](http://test.webrtc.org): open source device and network testing tools and bug reporting framework
