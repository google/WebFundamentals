---
layout: updates/post
title: "Media playback notifications for Chrome on Android"
description: "When audio or video is playing on a web page, a notification showing the page title and a play/pause button is displayed in the notification tray and on the lock screen. The notification can be used to pause/resume play or return to the page playing the media."
published_on: 2015-07-21
updated_on: 2015-07-21
authors:
  - samdutton
tags:
  - news
  - audio
  - video
  - Android
  - notifications
---

Chrome 45 Beta introduces a handy new feature for controlling audio and video playback.

When an audio or video element is playing on a web page, a notification showing the page title and a play/pause button is displayed in the notification tray and on the lock screen. The notification can be used to pause or resume play, and to quickly return to the page that is playing the media.

Great for controlling music apps and for many other audio and video use cases.

Here's an animated GIF of a notification displayed over a web page:

<p style="text-align: center;">
  <img src="/web/updates/images/2015-07-21-media-notifications/notification-over-web-page.gif" alt="Notification displayed over a web page">
</p>

This animation shows a notification over the Android lock screen:

<p style="text-align: center;">
  <img src="/web/updates/images/2015-07-21-media-notifications/notification-over-lock-screen.gif" alt="Notification displayed over the Android lock screen">
</p>

The screencast below shows the process of displaying a notification and controlling video playback on a web page:

<p style="text-align: center;">
  <video controls poster="/web/updates/videos/2015-07-21-media-notifications/poster.jpg">
    <source src="/web/updates/videos/2015-07-21-media-notifications/media-notifications.webm" type="video/webm" />
    <source src="/web/updates/videos/2015-07-21-media-notifications/media-notifications.mp4" type="video/mp4" />
  </video>
</p>

Note that:

* The lock screen notification is currently only shown in Android L and later. Support for J and K devices is in progress.
* Notifications are only shown for media over five seconds in length.
* There is no notification for audio from the Web Audio API unless it is played back via an audio element.

We are currently working on implementing the <a href="https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/dLWDxYgxzQ8" title="MediaSession Intent to Implement">MediaSession API</a>. Although this looks like a simple addition to Chrome, it will be the basis for implementation of future media control APIs. MediaSession will enable control over media in a web page, such as the ability to move between tracks or display extra metadata about the currently playing track. You could imagine that this API might be integrated with platforms such as Android Wear, or even enable remote controls on Bluetooth devices to extend the reach of web experiences.

We welcome your feedback on the MediaSession API. You can follow the <a href="https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/dLWDxYgxzQ8" title="Intent to Implement thread on Google Groups">Intent to Implement discussion</a>, comment on the <a href="https://mediasession.spec.whatwg.org/" title="WHATWG Media Session spec">WHATWG standard</a>, or track our <a href="https://crbug.com/497735" title="Implementation bug on crbug.com">implementation bug</a>.




