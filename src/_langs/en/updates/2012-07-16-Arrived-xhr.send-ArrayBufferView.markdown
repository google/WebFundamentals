---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2012-07-16

title: "Arrived! xhr.send(ArrayBufferViews)"
description: ""
article:
  written_on: 2012-07-16
  updated_on: 2012-07-16
authors:
  - ericbidelman
tags:
  - xhr2
  - binary
permalink: /updates/2012/07/Arrived-xhr-send-ArrayBufferViews.html
---
And here you thought we were done improving XHR!

[For a while now](http://www.html5rocks.com/en/tutorials/file/xhr2/#toc-send-arraybuffer) XHR2's overloaded `send()` method has supported sending a `ArrayBuffer` (a raw byte array).

Chrome 22 (current Canary) deprecates this feature by replacing it with sending `ArrayBufferView`s instead. JS Typed Arrays are just special `ArrayBufferView`s, so all this really means is that you can now send a typed array directly across the wire without touching its underlying buffer. This change is in match step with the recent updates to the [XMLHttpRequest2 spec](http://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html#dom-xmlhttprequest-send).

So for example, instead of sending an `ArrayBuffer`:

{% highlight javascript %}
var xhr = new XMLHttpRequest();
xhr.open('POST', '/server', true);
xhr.onload = function(e) { ... };

var uInt8Array = new Uint8Array([1, 2, 3]);

xhr.send(uInt8Array.buffer);
{% endhighlight %}

Just send the typed array itself:

{% highlight javascript %}
xhr.send(uInt8Array);
{% endhighlight %}


Eventually, sending `ArrayBuffers` will be removed, but for the time being you'll get console warnings when trying to send a buffer.

As always, you can keep up with these types of changes by following [chromestatus.com](http://chromestatus.com).
