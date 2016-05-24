---
layout: shared/narrow-pages-list
title: "Test with low bandwidth and high latency"
description: "It's important to understand what your app or site feels like when connectivity is poor. A range of tools can help you."
published_on: 2016-05-10
updated_on: 2016-05-10
order: 2
translation_priority: 1
authors:
  - samdutton
---

<p class="intro">An <a href="http://adwords.blogspot.co.uk/2015/05/building-for-next-moment.html">increasing proportion</a> of people experience the web on mobile devices. Even at home, <a href="https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/">many people are abandoning fixed broadband for mobile</a>.</p>

In this context, it's important to understand what your app or site feels like when connectivity is poor or unreliable. A range of software tools can help you [emulate and simulate](https://stackoverflow.com/questions/1584617/simulator-or-emulator-what-is-the-difference) low bandwidth and high [latency](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/).

## Emulate network throttling

When building or updating a site, you should check to ensure adequate performance in a variety of connectivity conditions. There are a several tools that can help.

### Browser tools

The [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/profile/network-performance/network-conditions?hl=en) enable you to test your site with a variety of upload/download speeds and [round-trip times](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/), using presets or custom settings from the Chrome DevTools Network panel:

![Chrome DevTools throttling](images/chrome-devtools-throttling.png)

### System tools

Network Link Conditioner is a preference panel available on Mac if you install [Hardware IO Tools](https://developer.apple.com/downloads/?q=Hardware%20IO%20Tools) for Xcode:

![Mac Network Link Conditioner control panel](images/network-link-conditioner-control-panel.png)

![Mac Network Link Conditioner settings](images/network-link-conditioner-settings.png)

![Mac Network Link Conditioner custom settings](images/network-link-conditioner-custom.png)

### Device emulation

[Android Emulator](http://developer.android.com/tools/devices/emulator.html#netspeed) allows you simulate various network conditions while running apps (including web browsers and hybrid web apps) on Android:

![Android Emulator](images/android-emulator.png)

![Android Emulator settings](images/android-emulator-settings.png)

For iPhone, Network Link Conditioner can be used to simulate impaired network conditions (see above).

## Test from different locations and networks

Connectivity performance depends on server location as well as network type.

[WebPagetest](https://webpagetest.org) is an online service that enables a set of performance tests to be run for your site using a variety of networks and host locations. For example, you can try out your site from a server in India on a 2G network, or over cable from a city in the US.

![WebPagetest settings](images/webpagetest.png)

Select a location and, from advanced settings, select a connection type. You can even automate testing using [scripts](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting) (for example, to log in to a site) or using their [RESTful APIs](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis). This helps you to include connectivity testing into build processes or performance logging.

[Fiddler](http://www.telerik.com/fiddler) supports Global proxying via [GeoEdge](http://www.geoedge.com/faq), and its custom rules can be used to simulate modem speeds:

![Fiddler proxy](images/fiddler.png)

## Test on an impaired network

Software and hardware proxies enable you to emulate problematic mobile network conditions, such as bandwidth throttling, packet delay and random packet loss. A shared proxy or impaired network can enable a team of developers to incorporate real-world network testing in their workflow.

Facebook's [Augmented Traffic Control](http://facebook.github.io/augmented-traffic-control/) (ATC) is a BSD-licensed set of applications that can be used to shape traffic and emulate impaired network conditions:

![Facebook's Augmented Traffic Control](images/augmented-traffic-control.png)

> Facebook even instituted [2G Tuesdays](https://code.facebook.com/posts/1556407321275493/building-for-emerging-markets-the-story-behind-2g-tuesdays/) to help understand how people on 2G use their product. On Tuesdays, employees get a pop-up that gives them the option to simulate a 2G connection.

The [Charles](https://www.charlesproxy.com/) HTTP/HTTPS proxy can be used to [adjust bandwidth and latency](http://www.charlesproxy.com/documentation/proxying/throttling/). Charles is commercial software, but a free trial is available.

![Charles proxy bandwidth and latency settings](images/charles.png)

More information about Charles is available from [codewithchris.com](http://codewithchris.com/tutorial-using-charles-proxy-with-your-ios-development-and-http-debugging/).

