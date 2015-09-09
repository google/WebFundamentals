---
layout: shared/plain
title: "Your first offline web app"
description: "Overview"
written_on: 2014-07-17
updated_on: 2014-10-21
translation_priority: 1
---

<img src="images/image00.png" width="624" height="409" />

In this codelab, you'll learn how to integrate service worker into an existing 
application and how to make it work offline.  The application is called [Air 
Horner](https://airhorner.com). It uses the Web Audio API to play and manipulate 
an airhorn sound, and it is probably one of the best air horner's on the market 
today (according to the author of this codelab at least). It's a simple 
application but it will demonstrate Service Worker well.

A service worker is a script that is run by your browser in the background, 
separate from a web page, opening the door to features which don't need a web 
page or user interaction. In the future this will include push messages, 
background sync, and geofencing, but the first feature it will launch with is 
the ability to intercept and handle network requests, including programmatically 
managing a cache of responses.

The reason this is such an exciting API is that it allows you to support offline 
experiences, giving developers complete control over what exactly that 
experience is.

### What you'll learn

* How to add a basic Service Worker to an existing project.
* A brief overview of Service Worker Lifecycle
* A simple offline caching strategy

### What you'll need

* Chrome 44 or above
* A basic understanding of 
  [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
* The sample code
* A text editor
* Python or a simple local web server

{% include fundamentals/lessons_toc.liquid %}
