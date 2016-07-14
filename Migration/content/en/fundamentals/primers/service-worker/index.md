---
layout: shared/narrow-pages-list
title: "Introduction to Service Worker"
description: "Rich offline experiences, periodic background syncs, push notifications&mdash;functionality that would normally require a native application&mdash;are coming to the web. Service workers provide the technical foundation that all these features will rely on."
published_on: 2014-12-01
updated_on: 2016-01-18
translation_priority: 0
order: 1
---

<p class="intro">Rich offline experiences, periodic background syncs, push
notifications&mdash; functionality that would normally require a native
application&mdash;are coming to the web. Service workers provide the technical
foundation that all these features will rely on.</p>

## What is a Service Worker

A service worker is a script that is run by your browser in the background,
separate from a web page, opening the door to features which don't need a web
page or user interaction. Today, they already include features like 
[push notifications](/web/updates/2015/03/push-notifications-on-the-open-web) 
and [background sync](/web/updates/2015/12/background-sync). In the future 
service workers will support other things like periodic sync, or geofencing. 
The core feature discussed in this tutorial is the ability to intercept and 
handle network requests, including programmatically managing a cache of 
responses.

The reason this is such an exciting API is that it allows you to support offline
experiences, giving developers complete control over what exactly that
experience is.

Before service worker there was one other API that would give users an offline
experience on the web called [AppCache](http://www.html5rocks.com/en/tutorials/appcache/beginner/). 
The major issue with App Cache is the [number of gotcha's](http://alistapart.com/article/application-cache-is-a-douchebag) 
that exist as well as the design working particularly well for single page web 
apps, but not for multi-page sites. Service workers have been designed to 
avoid these common pain points.

Things to note about a service worker:

* It's a [JavaScript Worker](http://www.html5rocks.com/en/tutorials/workers/basics/),
  so it can't access the DOM directly. Instead, a service worker can 
  communicate with the pages it controls by responding to messages sent via 
  the [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) 
  interface, and those pages can manipulate the DOM if needed.
* Service worker is a programmable network proxy, allowing you to control how 
  network requests from your page are handled.
* It will be terminated when not in use, and restarted when it's next needed, 
  so you cannot rely on global state within a service worker's `onfetch` and 
  `onmessage` handlers. If there is information that you need to persist and 
  reuse across restarts, service workers do have access to the 
  [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
* Service workers make extensive use of promises, so if you're new to promises, 
  then you should stop reading this and check out 
  [Jake Archibald's article](/web/fundamentals/primers/promises/).
