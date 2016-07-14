---
layout: shared/narrow-pages-list
title: "Your first offline web app"
description: "Service workers are background scripts that open the door to rich offline functionality that would normally require a native application. Learn how to integrate a service worker into an existing application to make it work offline."
published_on: 2015-09-30
updated_on: 2015-10-06
translation_priority: 1
order: 3
---
In this codelab, you’ll learn how to integrate a service worker into an existing application to make it work offline.

<img src="images/image00.png" width="624" height="409" />

The application is called [Air
Horner](https://airhorner.com). It uses the Web Audio API to play and manipulate
an airhorn sound, and it is probably one of the best air horn apps on the market
today (according to the author of this codelab at least). It's a simple
application but it will demonstrate the use of a service worker.

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

* How to add a basic service worker to an existing project.
* A brief overview of the service worker Lifecycle
* A simple offline caching strategy

### What you'll need

* Chrome 44 or above
* A basic understanding of
  [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
* The sample code
* A text editor
* Python or a simple local web server
