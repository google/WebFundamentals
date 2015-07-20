---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2012-05-08

title: "Websocket Frame Inspection now in Chrome DevTools"
description: ""
article:
  written_on: 2012-05-08
  updated_on: 2012-05-08
authors:
  - paulirish
tags:
  - devtools
permalink: /updates/2012/05/Websocket-Frame-Inspection-now-in-Chrome-DevTools.html
---
While before we could see sockets being established, we haven't had inspection ability into the data going over the wire in websockets. Thanks to a [WebKit patch](http://trac.webkit.org/changeset/115427) from RIM, we can now see the frame data, along with small unicode arrows indicating which direction the data is going. 

Open up your [Chrome Canary](https://tools.google.com/dlpage/chromesxs) or a [fresh Chromium build](http://download-chromium.appspot.com) for the latest changes here.