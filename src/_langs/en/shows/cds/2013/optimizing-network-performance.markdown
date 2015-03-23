---
id: optimizing-network-performance
showid: cds
layout: shows/single-video
collection: cds-2013
title: "Optimizing Network Performance"
description: "In this talk Ilya stepped through recent changes in Chrome that will improve loading time, as well as a few changes you can make in your environment to help keep network load to an absolute minimum."
published: true
showYoutubeID: MOEiQ6sjeaI

date: 2013-11-20 11:30:00
article:
  written_on: 2015-02-24
  updated_on: 2015-02-24

---

Network and latency typically accounts for 70% of a site’s total page load time. That’s a large percentage, but it also means that any improvements you make there will reap huge benefits for your users. In this talk Ilya stepped through recent changes in Chrome that will improve loading time, as well as a few changes you can make in your environment to help keep network load to an absolute minimum.

[Slides](http://bit.ly/cds-network)

+ Chrome M27 has a new and improved resource scheduler.
+ Chrome M28 has made SPDY sites (even) faster.
+ Chrome’s simple cache has received an overhaul.
+ SPDY / HTTP/2.0 offer huge transfer speed improvements. There are mature SPDY modules available for nginx, Apache and Jetty (to name just three).
+ QUIC is a new and experimental protocol built on top of UDP; it’s early days but however it works out users will win.
