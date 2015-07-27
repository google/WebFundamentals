---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2014-11-07

title: "Support for theme-color in Chrome 39 for Android"
description: "Use theme-color to set the toolbar color in Chrome for Android."
article:
  written_on: 2014-11-07
  updated_on: 2014-11-07
authors:
  - petelepage
tags:
  - mobile
  - frontend
permalink: /updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android.html
---

Starting in version 39 of Chrome for Android on Lollipop, you’ll now be able 
to use the `theme-color` meta tag to set the toolbar color—this means no more
Seattle gray toolbars! The syntax is pretty simple: add a `meta` tag to your 
page’s `<head>` with the `name="theme-color"`, and set the `content` to any 
valid CSS color.  

<p style="text-align: center;">
  <img src="{{site.baseurl}}/updates/images/2014-11-07-Support-for-theme-color-in-Chrome-39-for-Android/theme-color-ss.png" alt="Screenshot of phone showing theme-color" />
</p>

For example, to set the background to your favorite color or HTML5Rocks orange:

`<meta name="theme-color" content="#db5945">`

In addition, Chrome will show beautiful high-res favicons when they’re
provided. Chrome for Android picks the highest res icon that you provide,
and we recommend providing a 192&times;192px PNG file. For example:

`<link rel="icon" sizes="192x192" href="nice-highres.png">`

Check out the theme-color here on HTML5Rocks as well as on the [Web
Fundamentals](https://developers.google.com/web/fundamentals/) site, and be sure 
to check out the
[Add to Home Screen docs](https://developer.chrome.com/multidevice/android/installtohomescreen)
for more ways to make your site stand out.

