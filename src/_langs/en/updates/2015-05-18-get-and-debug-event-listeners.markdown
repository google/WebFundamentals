---

layout: update
published: true
title: Get and debug event listeners
date: 2015-05-18
article:
  written_on: 2015-05-18
  updated_on: 2015-05-20
authors:
- umarhansa
collection: updates
type: tip
category: tools
product: chrome-devtools
description: Get and debug event listeners in DevTools with these console commands.
featured-image: /web/updates/images/2015-05-20-get-and-debug-event-listeners/get-debug-event-listeners.gif
source_name: DevTips
source_url: https://umaar.com/dev-tips/31-get-debug-event-listeners
permalink: /updates/2015/05/18/get-and-debug-event-listeners.html
---
<img src="/web/updates/images/2015-05-20-get-and-debug-event-listeners/get-debug-event-listeners.gif" alt="Get and debug event listeners">

You can use <code>getEventListeners(node)</code> in the Console Panel to retrieve registered event listeners on the passed in DOM node. In addition to that, the video clip shows <code>debug(fn)</code> invoking the debugger when <code>fn</code> is called.