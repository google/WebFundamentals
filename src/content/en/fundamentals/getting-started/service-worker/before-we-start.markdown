---
layout: shared/narrow
title: "Before We Start"
description: "Versions of Chrome earlier than 46 lack support for needed features. Here's what you can do about it."
published_on: 2014-12-01
updated_on: 2016-01-19
translation_priority: 0
order: 2
authors:
  - mattgaunt
  - josephmedley
---

If you're not using Chrome 46 or later, then 
[please upgrade now](https://support.google.com/chrome/answer/95414). Versions 
earlier than that lack support for some features you're going to need for 
service workers, specifically `Cache.addAll()`.

If you really are stuck with an older version of Chrome, there's 
[a polyfill](https://github.com/coonsta/cache-polyfill) that adds the missing 
features. Grab `dist/serviceworker-cache-polyfill.js` to put somewhere in your 
site and use it in a service worker with the `importScripts()` method. Any 
script which is imported will automatically be cached by the service worker.

{% highlight javascript %}
importScripts('serviceworker-cache-polyfill.js');
{% endhighlight %}