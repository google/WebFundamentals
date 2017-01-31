project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome 47 has several significant WebRTC enhancements and updates including audio and video recording, proxy handling and mandatory secure origins for getUserMedia().

{# wf_updated_on: 2015-11-23 #}
{# wf_published_on: 2015-11-23 #}
{# wf_tags: news,audio,video,media,webrtc,getusermedia #}
{# wf_featured_image: /web/updates/images/2015-10-28-chrome-47-webrtc/featured.jpg #}

# Chrome 47 WebRTC: Media Recording, Secure Origins and Proxy Handling {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

Chrome 47 includes several significant WebRTC enhancements and updates.

### Record video from your web apps

The `MediaStreamRecorder` API has long been the top chromium.org request, with over 2500 stars. Media recording has now been added to Chrome behind the experimental Web Platform features flag &mdash; though it's desktop only for the moment. This allows you to record and play back or download video. There is a simple demo on [the WebRTC samples repo](https://webrtc.github.io/samples/src/content/getusermedia/record/){: .external } and you can find out more from the [discuss-webrtc announcement](https://groups.google.com/forum/?#!msg/discuss-webrtc/n11m846oV4I/0b3ycjmjCAAJ). A sample Chrome App for recording video from screen capture is available at [github.com/niklasenbom/RecordingApp](https://github.com/niklasenbom/RecordingApp). These are brand-new implementations and there may still be bugs to iron out: please file issues on the repos if you encounter problems.

<a href="https://webrtc.github.io/samples/src/content/getusermedia/record/" title="MediaRecorder demo"><img src="/web/updates/images/2015-10-28-chrome-47-webrtc/lp.jpg" alt="Screenshot of MediaRecorder demo on the WebRTC GitHub samples repo"></a>

### Audio output device selection

`MediaDevices.enumerateDevices()` has been released. More details are available from [Chromium issue 504280](https://crbug.com/504280). You can now enumerate audio output devices in addition to the audio input and video input devices that `MediaStreamTrack.getSources()` already provides. You can find out more about how to use it in [this update](/web/updates/2015/10/media-devices).

### Device support on Windows

Default communications device support on Windows has now been added. This means that when enumerating audio devices on Windows, there will be an additional entry for the communications device whose ID will be 'communications'.

Device IDs for the default audio device (and communications on Windows) will no
longer be hashed ([Issue 535980](http://crbug.com/535980)).  Instead, two
reserved IDs, 'default' and 'communications' are supported and are the same
across all security origins. Device labels will be translated to the browser
locale so developers should not expect labels to have a predetermined value.
Video rendering accuracy has been improved by propagating the capture timestamp
all the way to the rendering algorithm, where the right vsync can be chosen
based on that. For Windows platform the capture timestamp is also more accurate
in Chrome 47.

### Proxy handling

Chrome 47 adds a new preference to force WebRTC traffic to be sent through a local proxy server, if one is configured, which is important for some users browsing via a VPN. This means that the WebRTC application will only see the proxy IP address. Be aware that this will hurt application performance, and won't work at all unless the application supports TURN/TCP or ICE-TCP. Look for a new version of the [WebRTC Network Limiter Extension](https://chrome.google.com/webstore/detail/webrtc-network-limiter/npeicpdbkakmehahjeeohfdhnlpdklia) soon to provide a UI for this preference. There's more information about IP address 'leakage' in [What's Next for WebRTC](https://www.youtube.com/watch?v=HCE3S1E5UwY&t=5m24s).

<a href="https://chrome.google.com/webstore/detail/webrtc-network-limiter/npeicpdbkakmehahjeeohfdhnlpdklia" title="WebRTC Network Limiter extension on the Chrome Web Store"><img src="/web/updates/images/2015-10-28-chrome-47-webrtc/network-limiter.png" alt="WebRTC Network Limiter Chrome extension"></a>

### ...And more

Data channel throughput has been greatly improved for high latency connections.

We will gradually roll out support for DTLS 1.2 in the Chrome 47 timeframe.

Though neither VP9 nor H.264 are supported in this release, work on these
continues, and we hope to implement support for VP9 and an initial version of H.264 (behind a flag) in Chrome 48.

### Public service announcements

* Starting with Chrome 47, `getUserMedia()` requests are only allowed from secure origins: HTTPS or localhost.
* RTP data channel support has been removed. Any remaining applications still
  using RTP data channels should use the standard data channels instead.

As with all releases, we encourage developers to try Chrome on the Canary, Dev, and Beta channels and report any issues found. The help we receive is invaluable. For pointers on how to file a good bug report, please take a look at the [WebRTC bug page](https://webrtc.org/bugs/).

### Demos

* [MediaRecorder](https://webrtc.github.io/samples/src/content/getusermedia/record/){: .external }
* enumerateDevices():

    * [Select sources &amp; outputs](https://webrtc.github.io/samples/src/content/devices/input-output/)
    * [Output device
      selection](https://webrtc.github.io/samples/src/content/devices/multi/){: .external }
* [MediaDevices shim](https://github.com/webrtc/adapter)

### Find out more

* [MediaRecorder implementation status](https://www.chromestatus.com/features/5929649028726784)
* Media Capture and Streams Editor's Draft:
  [MediaDevices](https://w3c.github.io/mediacapture-main/#mediadevices)
* [Audio Output Devices API](http://www.w3.org/TR/audio-output)
* [WebRTC Update](https://youtu.be/HCE3S1E5UwY)






{% include "comment-widget.html" %}
