---
layout: updates/post
title: "Chrome 47 WebRTC: media recording, secure origins &amp; proxy&nbsp;handling"
description: "Chrome 47 has several significant WebRTC enhancements and updates including audio and video recording, proxy handling and mandatory secure origins for getUserMedia()."
published_on: 2015-10-28
updated_on: 2015-10-28
authors:
  - samdutton
tags:
  - news
  - audio
  - video
  - media
  - WebRTC
  - getUserMedia
featured_image: /web/updates/images/2015-10-28-chrome-47-webrtc/featured.png
---

<p class="intro">Chrome 47 includes several significant WebRTC enhancements and updates.</p>

### Record video from your web apps

The `MediaStreamRecorder` API has long been the top chromium.org request, with over 2500
stars. Media recording has now been added to Chrome behind the experimental Web Platform features flag &mdash; though it's desktop only (and video-only) for the moment. This allows you to record and play back or download video. There is a simple demo [here](https://rawgit.com/Miguelao/demos/master/mediarecorder.html) and you can find out more from the [discuss-webrtc announcement](https://groups.google.com/forum/?#!msg/discuss-webrtc/n11m846oV4I/0b3ycjmjCAAJ).

### Audio output device selection

`MediaDevices.enumerateDevices()` has been released. More details are available from [Chromium issue
504280](https://crbug.com/504280). You can now enumerate audio output devices in
addition to the audio input and video input devices that `MediaStreamTrack.getSources()` already provides. You can find out more about how to use it
in [this update](https://developers.google.com/web/updates/2015/10/media-devices).

On Windows there has been a [known issue](http://crbug.com/525443) with communications device support. Default communications device support on Windows has now been added. This means that when enumerating audio
devices on Windows, there will be an additional entry for the communications
device whose ID will be 'communications'.

Device IDs for the default audio device (and communications on Windows) will no
longer be hashed ([Issue 535980](http://crbug.com/535980)).  Instead, two
reserved IDs, 'default' and 'communications' are supported and are the same
across all security origins. Device labels will be translated to the browser
locale so developers should not expect labels to have a predetermined value.
Video rendering accuracy has been improved by propagating the capture timestamp
all the way to the rendering algorithm, where the right vsync can be chosen
based on that. For Windows platform the capture timestamp are also more accurate
in 47.

### Proxy handling

Chrome 47 adds a new preference to force WebRTC traffic to be sent through a local proxy server, if one is configured, which is important for some users browsing via a VPN. This means that the WebRTC application will only see the proxy IP address. Be aware that this will hurt application performance, and won't work at all unless the application supports TURN/TCP or ICE-TCP. Look for a new version of the [WebRTC Network Limiter Extension](https://chrome.google.com/webstore/detail/webrtc-network-limiter/npeicpdbkakmehahjeeohfdhnlpdklia) soon to provide a UI for this preference.

### ...and more

Data channel throughput has been greatly improved for high latency connections.

We will gradually roll out support for DTLS 1.2 in the M47 timeframe.

VP9 did not make it for this release, nor did H.264 support. Work on these
continues, and we expect to release VP9 and an initial version of H.264 (behind
a flag) in M48.

### Public Service Announcements

* From Chrome 47, getUserMedia requests are only allowed from secure origins: HTTPS or localhost.
* RTP data channel support has been removed. Any remaining applications still
  using RTP data channels should use the standard data channels instead.

As with all releases, we encourage developers to try Chrome on the Canary, Dev, and Beta channels and report any issues found. The help we receive is invaluable! For pointers on how to file a good bug report, please take a look at the [WebRTC bug page](http://www.webrtc.org/report-bug).

### Demos

* [MediaRecorder](https://rawgit.com/Miguelao/demos/master/mediarecorder.html)
* enumerateDevices():

    * [Select sources &amp; outputs](https://webrtc.github.io/samples/src/content/devices/input-output/)
    * [Output device
      selection](https://webrtc.github.io/samples/src/content/devices/multi/)
* [MediaDevices shim](https://webrtc.github.io/samples/src/js/adapter.js)

### Find out more

* [MediaRecorder implementation status](https://www.chromestatus.com/features/5929649028726784)
* Media Capture and Streams Editor's Draft:
  [MediaDevices](https://w3c.github.io/mediacapture-main/#mediadevices)
* [Audio Output Devices API](http://www.w3.org/TR/audio-output)
* [WebRTC Update](https://youtu.be/HCE3S1E5UwY)




