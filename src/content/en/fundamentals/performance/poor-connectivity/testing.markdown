---
layout: shared/narrow-pages-list
title: "Test with low bandwidth and high latency"
description: "It's important to understand what your app or site feels like when connectivity is poor. A range of tools can help you."
published_on: 2016-04-29
updated_on: 2016-04-29
order: 2
translation_priority: 1
authors:
  - samdutton
---

<p class="intro">An <a href="http://adwords.blogspot.co.uk/2015/05/building-for-next-moment.html">increasing proportion</a> of people experience the web on mobile devices. Even at home, <a href="https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/">many people are abandoning fixed broadband for mobile</a>.</p>

In this context, it's important to understand what your app or site feels like when connectivity is poor. A range of software tools can help you [emulate and simulate](https://stackoverflow.com/questions/1584617/simulator-or-emulator-what-is-the-difference) low bandwidth and high [latency](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/).

## Chrome DevTools

Emulate [network throttling](https://developers.google.com/web/tools/chrome-devtools/profile/network-performance/network-conditions?hl=en) with presets or custom settings from the Chrome DevTools Network panel:

![Chrome DevTools throttling](images/chrome-devtools-throttling.png)

## WebPagetest

From [webpagetest.org](https://webpagetest.org), select a location and, from advanced settings, select a connection type. You can even automate testing using [scripts](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting) (for example, to log in to a site) or using their [RESTful APIs](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis).

## Software proxies

The [Charles](https://www.charlesproxy.com/) HTTP/HTTPS proxy can be used to [adjust bandwidth and latency](http://www.charlesproxy.com/documentation/proxying/throttling/). Charles is commercial software, but a free trial is available.

![Charles proxy bandwidth and latency settings](images/charles.png)

Source: [codewithchris.com](http://codewithchris.com/tutorial-using-charles-proxy-with-your-ios-development-and-http-debugging/)

[Fiddler](http://www.telerik.com/fiddler) supports Global proxying via [GeoEdge](http://www.geoedge.com/faq), and its custom rules can be used to simulate modem speeds:

![Fiddler proxy](images/fiddler.png)

Facebook's [Augmented Traffic Control](http://facebook.github.io/augmented-traffic-control/) (ATC) is a BSD-licensed set of applications that can be used to shape traffic and emulate impaired network conditions:

![Facebook's Augmented Traffic Control](images/augmented-traffic-control.png)

## Android Emulator

[Android Emulator](http://developer.android.com/tools/devices/emulator.html#netspeed) lets you simulate various network conditions:

![Android Emulator](images/android-emulator.png)

![Android Emulator settings](images/android-emulator-settings.png)

## Mac Network Link Conditioner

This preference panel is available on Mac if you install XCode:

![Mac Network Link Conditioner control panel](images/network-link-conditioner-control-panel.png)

![Mac Network Link Conditioner settings](images/network-link-conditioner-settings.png)

