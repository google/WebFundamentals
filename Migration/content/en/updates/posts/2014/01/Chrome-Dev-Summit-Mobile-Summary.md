---
layout: updates/post
title: "Chrome Dev Summit: Mobile Summary"
description: "Here's the first in a series of reports from Chrome Dev Summit. There was a strong emphasis on Mobile and Cross-device development, so we'll kick off with that!"
published_on: 2014-01-06
updated_on: 2014-01-06
authors:
  - paulkinlan
tags:
  - news
  - ux
  - workflow
  - mobile
  - webview
  - grunt
  - serviceworker
---
The [Chrome Dev Summit](http://developer.chrome.com/devsummit‎) finished a couple of weeks ago, and here's the first in a series of reports from the event. There was a strong emphasis on Mobile and Cross-device development, so we'll kick off with that!

# Best UX patterns for mobile web apps by Paul Kinlan

After an analysis of the mobile-friendliness of the top 1000 sites we found some problem areas: _53%_ still only provide a desktop-only experience, _82%_ of sites have issues with interactivity on a mobile device and _64%_ of sites have text that users will have issues reading.

## Quick hits to dramatically improve your mobile web experience:

+  Always define a viewport
+  Fit content inside the viewport
+  Keep font sized at a readable level
+  Limit use of Web Fonts
+  Size and space out tap targets appropriately
+  Use the semantic types for input elements

PageSpeed Insights just launched a [UX analysis for determining how mobile-friendly](https://developers.google.com/speed/pagespeed/insights/) your site is. It will help you [find common problems](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fnews.google.com) with your sites mobile UX. Try it out!

[Slides: Best UX patterns for mobile web apps](http://mobile-ux.appspot.com/)

{% ytvideo j3YbNHtnYo4 %} 

<hr>

# Multi-device Accessibility by Alice Boxhall

Users will be accessing your sites and services from a multitude of devices with a wide range of different accessibility requirements.  By using the correct semantic elements and correct ARIA roles you help give the browser and assistive technology a much improved understanding of your page.

[Slides: Multi-device Accessibility](https://docs.google.com/a/google.com/presentation/d/1xKlQZRHyLPXvrTdGkGIumc24bT4_kxRmdqIC_b7fngo/pub?start=false&loop=false&delayms=3000#slide=id.p)

{% ytvideo E0ojKLzXoZ4 %} 

## Key ways to understand and address a11y issues

+ Ensure you have a good keyboard-only user experience
+ Express the semantics of your interface with correct element choice and ARIA
+ Use [ChromeVox](http://www.chromevox.com/) on desktop and TalkBack on Android to test.
+ Try the [Accessibility Developer Tools Chrome extension](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en)
+  A more diverse audience is getting online, which further amplifies the need of making your sites accessible

<hr>

# Build Mobile Apps using the Chrome WebView by Matt Guant

We all know the problems that developers have had in the past building for WebView:  Limited HTML5 features, no debugging tools, no build tools.  With the introduction of a [Chromium powered WebView](https://developers.google.com/chrome/mobile/docs/webview/overview) in Android 4.4 (KitKat) developers now have a huge range of new tools at their disposal to build great native apps using the WebView.

The WebView supports full [remote debugging](https://developers.google.com/chrome-developer-tools/docs/remote-debugging#debugging-webviews) with the same tools you use for Chrome. You can also take your trusted web development workflow with Grunt and integrate that into your native stack tooling via Gradle.  Further merging worlds, there's a clever trick to use the Chrome DevTools to test your native code from Javascript.

[Slides: Build Mobile Apps using the Chrome WebView](http://gauntface.co.uk/presentations/chrome-dev-summit-2013/chrome-webview/)

{% ytvideo BTlzw5UAjQs %} 

## Effective WebView development takeaways

+  It’s not the new features that are important, its the tooling that you can now use to speed up your workflow
+  Don’t try to emulate the native UI.  But make sure to remove some of the tells that it is Web Content.
+  Use native implementations of features when appropriate.  i.e, use the DownloadManager rather than XHR for large files.

<hr>

# Optimizing your Workflow for a Cross-device world by Matt Gaunt

If we have to develop for Desktop, Mobile, Tablet, wearables and other form factors, how can you optimise your workflow to make your life less stressful?  There's a solid multi-device approach for quick iteration with LiveReload, Grunt, Yeoman, and the newly-unveiled [Mini Mobile Device Lab](https://github.com/GoogleChrome/MiniMobileDeviceLab). Lastly, if you don't have the physical hardware you want to test, some providers make it available through the cloud.

[Slides: Optimizing your Workflow for a Cross-device world](http://gauntface.co.uk/presentations/chrome-dev-summit-2013/cross-device-workflow/#1)

{% ytvideo bZRPetpUcjQ %} 

## Key points

+  The number of devices that we are going to have to cater for is only going to increase
+  Getting your workflow with the right with [Grunt](http://gruntjs.com/) and [Yeoman](http://yeoman.io/)
+  Simplify cross browser and cross device testing with [Mini Mobile Device Lab](https://github.com/GoogleChrome/MiniMobileDeviceLab)
+  Be smart with your emulation choice using Chrome DevTools Emulation, Stock Emulators, Cloud Based Emulators like [Saucelabs](https://saucelabs.com/), [Browserstack](http://www.browserstack.com/) and [Device Anywhere](http://www.deviceanywhere.com/) and third party emulator [Genymotion](http://www.genymotion.com/)
+ Mobile testing means more than just testing on your wifi connection, use a proxy to simulate slower network speeds

<hr>

# Network connectivity: optional by Jake Archibald

We learnt many things from this talk: Jake doesn’t wear shoes when presenting; [Business Kinlan](https://twitter.com/Business_Kinlan/status/403231878246715392) has a new book coming out soon; Offline is being taken seriously by browser vendors and you will soon have the tools in your hands that help you build great experiences that work well when you are offline.

[ServiceWorker](https://github.com/slightlyoff/ServiceWorker) will give us the flexibility that we need to build compelling offline first experiences with ease and not suffer the pains inflicted by AppCache.  You can even [experiment with the API using a Polyfill](https://github.com/phuu/serviceworker-demo).

[Slides: Network connectivity: optional](https://speakerdeck.com/jaffathecake/network-optional)

{% ytvideo Z7sRMg0f5Hk %} 

## ServiceWorker to the rescue

+ In the next generation of progressive enhancement, we treat the network as a potential enhancement
+ ServiceWorker gives you full, scriptable, debuggable control over network requests
+ If you have an offline experience, don’t wait for the network to fail before you show it, as this can take ages
