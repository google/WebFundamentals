---
layout: updates/post
title: "Present to a second screen with the Presentation API"
description: "Chrome on Android now allows mobile sites to present to Google Cast devices using the Presentation API and the Cast Web SDK."
published_on: 2015-12-04
updated_on: 2015-12-04
authors:
  - samdutton
tags:
  - news
  - audio
  - video
  - media
  - second_screen
featured_image: /web/updates/images/2015/11/presentation-api/featured.jpg
---

<p class="intro">Imagine being able to use a web app to present a slide deck to a conference projector from your phone — or share images, play games or watch videos on TV, using your phone (or tablet or laptop) as a controller.</p>

The latest release of Chrome on Android allows sites to [present to Google Cast devices](https://storage.googleapis.com/presentation-api/index.html) using the [Presentation  API](https://w3c.github.io/presentation-api/) and the [Cast Web SDK](https://developers.google.com/cast/docs/chrome_sender). This means you can now use the Cast Web SDK with Chrome on Android or iOS, or on desktop with the extension, along with native Android and iOS Cast apps. (Previously on Android it was only possible to interact with Cast devices from native apps).

The [Google Cast site](https://developers.google.com/cast/) has great resources for Chrome, Android and iOS development, including tutorials, code and samples apps.

![Alt text](/web/updates/images/2015/11/presentation-api/screens.jpg)

At present, you can only present to a Cast [Receiver Application](https://developers.google.com/cast/docs/receiver_apps) using the Cast Web SDK, but there is work underway to enable the Presentation API to be used without the Cast SDK (on desktop and Android) to present any web page to a Cast device without registration with Google. The page using the API directly will work on any user agent that supports the API.

The Presentation API, along with the [Remote Playback API](https://w3c.github.io/remote-playback/), is part of the [Second Screen Working Group](http://www.w3.org/2014/secondscreen) effort to enable web pages to use second screens to display web content.

These APIs take advantage of the range of devices coming online — including connected displays that run a user agent — enabling a rich variety of applications for users with access to a 'control' device and a 'display' device.

We'll keep you posted on our progress with implementation.

In the meantime, please let us know if you find bugs or have feature requests: [crbug.com/new](https://crbug.com/new).

### Find out more

* [Get Started with Google Cast SDK](https://developers.google.com/cast/)
* [Presentation API spec](http://www.w3.org/TR/presentation-api)
* [Use cases and requirements](https://github.com/w3c/presentation-api/blob/gh-pages/uc-req.md)
* [The Second Screen Working Group](http://www.w3.org/2014/secondscreen/)
* [Remote Playback API](https://w3c.github.io/remote-playback)



