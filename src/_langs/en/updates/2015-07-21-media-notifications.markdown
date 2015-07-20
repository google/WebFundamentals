---

layout: update
published: true
rss: true
collection: updates
category: chrome
product: chrome
type: news
date: 2015-06-12

title: "Media playback notifications for Chrome on Android"
description: "When audio or video is playing on a web page, a notification showing the page title and a play/pause button is displayed in the notification tray and on the lock screen. The notification can be used to pause/resume play or return to the page playing the media."
article:
  written_on: 2015-07-21
  updated_on: 2015-07-21

authors:
  - dutton
tags:
  - audio
  - video
  - Android
  - Notifications
permalink: /updates/2015/07/media-notifications.html
---
<style type="text/css" media="screen">
img, video {
  max-width: 100%;
}
</style>

# Media playback notifications for Chrome on Android

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

This screencast shows the process of displaying a notification nad controlling video playback on a web page:

<p style="text-align: center;">
  <video controls poster="/web/updates/videos/2015-07-21-media-notifications/poster.jpg">
    <source src="/web/updates/videos/2015-07-21-media-notifications/media-notifications.webm" type="video/webm" />
    <source src="/web/updates/videos/2015-07-21-media-notifications/media-notifications.mp4" type="video/mp4" />
  </video>
</p>

Note that:
* The lock screen notification is currently only shown in Android L and later (support for J and K devices is in progress).
* Notifications are only shown for media over five seconds in length.

We are currently working on implementing the MediaSession API and although this looks like a simple addition to Chrome it will be the basis for the implementation of future media control APIs. MediaSession will enable control over media in a web page, such as the ability to move between tracks or display extra metadata about the currently playing track. We are also considering better system integration, such as support for Android Wear and remote controls on bluetooth devices.


