---
layout: updates/post
title: "Edge Of The Web #4"
description: "Chrome 43 (stable) And Wed Updates"
published_on: 2015-06-28
updated_on: 2015-06-28
authors:
  - greenido
tags:
  - news
  - serviceworker
  - polymer
featured_image: /web/updates/images/2015-08-28-edge-of-the-wed-6/chrome_256.png
---

##Edge Of The Web \#4


###Chrome 43 (Stable)  

<img src="/web/updates/images/2015-09-27-edge-of-the-wed-7/chrome_256.png">

* The[ ](https://fetch.spec.whatwg.org/)[Fetch 
  API](https://fetch.spec.whatwg.org/) now allows developers to directly operate 
  on and incrementally release the bytes of[ 
  ](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)[streamed 
  network 
  responses](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html), 
  in contrast to the equivalent XMLHttpRequest functionality that requires 
  developers keep the entire in-progress stream response in memory.
* The[ 
  ](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/#cache-objects)[Cache 
  Storage 
  API](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/#cache-objects), 
  previously only available in[ 
  ](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)[service 
  workers](http://www.html5rocks.com/en/tutorials/service-worker/introduction/), 
  now provides developers full[ 
  ](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/window-caches)[imperative 
  control over their 
  caching](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/window-caches) 
  in the page context.
* Chrome OS now fires[ 
  ](http://www.html5rocks.com/en/tutorials/device/orientation/)[devicemotion](http://www.html5rocks.com/en/tutorials/device/orientation/) 
  events on pages at a regular interval, allowing developers to track the 
  device's acceleration in the same way they do on Chrome for Android, Windows, 
  Mac, and Linux.

### On the web

* [Polymer 1.0 
  Released](http://googledevelopers.blogspot.co.il/2015/05/polymer-10-released.html) 
  - Polymer is a new way of thinking about building web applications - a 
  sugaring layer on top of Web Components, making it easy for you to create 
  interoperable custom elements. These elements can then be put together to 
  create app-like immersive experiences on the web. If you are Looking for a 
  fast and easy way to get started use the [Polymer starter 
  kit](https://developers.google.com/web/tools/polymer-starter-kit/). Packed 
  with the latest elements, ready-to-use boilerplate, and an end-to-end 
  toolchain to use from development through production deployment, the starter 
  kit works out of the box so you can focus on adding features right away. Btw, 
  with this release the Polymer project now ready for production!
* [Chrome Custom 
  Tabs](https://developer.chrome.com/multidevice/android/customtabs) - Chrome 
  custom tabs allow apps to run a Chrome browser on top of the app. Take for 
  example Pinterest. When the user click on a link in Pinterest App that would 
  ordinarily spin up a browser tab on your phone. Instead, Pinterest can use a 
  custom Chrome tab. Apps are also able to customize the tab through color and 
  branding and/or add options to the options menu. Here is the code for an 
  example: 
  [https://github.com/GoogleChrome/custom-tabs-client](https://github.com/GoogleChrome/custom-tabs-client)<br/>
  <img src="/web/updates/images/2015-07-28-edge-of-the-wed-4/image00.png" width="425" height="408" />

* [Autofill and 
  Autocomplete](http://updates.html5rocks.com/2015/06/checkout-faster-with-Autofill) 
  - People hate filling out web forms, especially on mobile devices, learn how 
  to help them complete it up to 30% faster!
* [Building a Modern web app - The Guitar Tuner (Web Audio, Polymer & 
  ES6](https://aerotwist.com/blog/guitar-tuner/)) - A great post by Paul Lewis 
  on his journey into the future. How to use modern web technologies.
* We open a new slack channel to keep the conversation going. <br/>
  If you wish, you can join with: 
  [chromiumdev-slack.herokuapp.com](http://chromiumdev-slack.herokuapp.com) 
  <br/>
  Site: [chromiumdev.slack.com](http://chromiumdev.slack.com)

### Media

* New edition of Media Newsletter - Sign up at: 
  [bit.ly/signupmedia](http://bit.ly/signupmedia)
* [Ericsson Mobility Report](http://www.ericsson.com/mobility-report): 
    * 'Three quarters of global subscription growth came from Africa and Asia in 
      Q1 2015. This pattern is forecast to continue to 2020.'
    * By 2020, 70 percent of the world's population will have a smartphone, with 
      an estimated 26 billion connected devices. 
    * Mobile data traffic in Q1 2015 was 55 percent higher than in Q1 2014.
    * 'Video continues to be the key growth factor, with 60 percent of all 
      mobile data traffic forecast to be from online video by 2020.'
* [Using the Web from 
  Nairobi](https://www.facebook.com/dweekly/posts/10101729307500703) – where 
  there is a lack of fibre from the Backbone, and no Edge servers, latency is 
  terrible: "...Twitter is being served from ATLANTA. Georgia. Which it might be 
  worth noting is really really far away from Kenya. Like 300ms distant. HTTPS 
  handshakes mean three full round trip exchanges must be completed before you 
  can even begin your request to a server, so nearly a full second passes before 
  your client is even starting to send its request. DOMContentLoaded is 2.95s, 
  and page load only finishes at 12.85s. Facebook, served from London, has a 4s 
  DOMContentLoaded."

* [Making Music in the Browser – the Web MIDI 
  API](http://www.keithmcmillen.com/blog/making-music-in-the-browser-web-midi-api): 
  now in Chrome!
* [Building A Media Source HTML5 Player With Adaptive 
  Streaming](http://blog.wirewax.com/building-a-media-source-html5-player/) - 
  It's a four part series:<br/>
  '[MSE is a] significant leap forward for media handling in the browser, far 
  superior than the standard HTML5 video tag and, in many ways, an improvement 
  on anything Flash could handle.'<br/>

### Latest From Search

#### Mobile search results

* [Big news](http://googlewebmastercentral.blogspot.ie/2015/05/rolling-out-red-carpet-for-app-owners.html) from the Search Console ([ex-Webmaster Tools](http://googlewebmastercentral.blogspot.ie/2015/05/announcing-google-search-console-new.html)) team: now Search Console tracks where app content shows up in search results, for which queries, which pages are most popular and which pages have errors. If you own or develop an app, Search Console is your new go-to place for search stats. How does the magic work? [Read on here](http://googlewebmastercentral.blogspot.ie/2015/05/rolling-out-red-carpet-for-app-owners.html).

<img src="/web/updates/images/2015-07-28-edge-of-the-wed-4/image01.png" width="458" height="385" />

* On May 27th [we shared the 
  news](http://googlewebmastercentral.blogspot.ie/2015/05/surfacing-content-from-ios-apps-in.html) 
  that we have brought App indexing beyond Android apps to iOS apps too and have 
  opened it up to a small group of test users. Interest in joining can be 
  expressed 
  [here](https://developers.google.com/app-indexing/ios/interest-form).
* On the same day, [we 
  announced](http://googlewebmastercentral.blogspot.ie/2015/05/app-deep-linking-with-googl.html) 
  a new function for goo.gl short links which can now link to any content, may 
  it be Android/iOS app content or a website. With the right [App indexing 
  configuration](https://developers.google.com/app-indexing/) users can land on 
  specific app pages if the app is installed on their device.
* As a reminder, we have recently added links to the Mobile Guides of Typepad, 
  Squarespace and WIX on our Website Software Mobile Guide and are currently 
  working with Bitrix on reviewing their documentation. As always, if your CMS 
  isn't listed in our [Mobile Software SEO 
  guide](https://developers.google.com/webmasters/mobile-sites/website-software/) 
  do let us know by writing in.

### Informed users and healthy sites

* **Search Console verifications**: we're looking at helping your users getting 
  access to Search Console and its data. If you have any canonical documentation 
  about how your users can simply verify their site on Search Console, we'd love 
  to hear from you and add the documentation to our help resources. Feel free to 
  write in to giacomo@google.com.
* **Security**: we're also looking at helping your users (especially non-tech 
  savvy ones) checking their CMS/website software (incl. plugins, modules, etc.) 
  versions and upgrading it to the latest available. If you have any canonical 
  documentation about how to a) spot one's version number and b) how to upgrade, 
  feel free to share it with us.

If you have any questions or feedback, please [share it with 
us](https://groups.google.com/d/forum/mobile-web-rock) or privately with 
[@greenido](https://twitter.com/greenido)

#### Wish to get these updates to your mailbox?   
Please use this [Signup form](https://goo.gl/l6TN40)