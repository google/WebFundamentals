---
layout: updates/post
title: "Websocket Frame Inspection now in Chrome DevTools"
published_on: 2012-05-08
updated_on: 2012-05-08
authors:
  - paulirish
tags:
  - news
  - devtools
---
While before we could see sockets being established, we haven't had inspection ability into the data going over the wire in websockets. Thanks to a [WebKit patch](http://trac.webkit.org/changeset/115427) from RIM, we can now see the frame data, along with small unicode arrows indicating which direction the data is going. 

Open up your [Chrome Canary](https://tools.google.com/dlpage/chromesxs) or a [fresh Chromium build](http://download-chromium.appspot.com) for the latest changes here.
