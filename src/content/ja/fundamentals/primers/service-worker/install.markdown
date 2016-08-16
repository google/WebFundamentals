---
layout: shared/narrow
title: "Install a Service Worker"
description: "After a controlled page kicks off the registration process, let's shift to the point of view of the service worker script, which handles the `install` event."
published_on: 2014-12-01
updated_on: 2016-01-19
translation_priority: 0
order: 6
authors:
  - mattgaunt
---

After a controlled page kicks off the registration process, let's shift to the
point of view of the service worker script, which handles the `install` event.

For the most basic example, you need to define a callback for the install event
and decide which files you want to cache.

{% highlight javascript %}
self.addEventListener('install', function(event) {
  // Perform install steps
});
{% endhighlight %}

Inside of our `install` callback, we need to take the following steps:

1. Open a cache.
2. Cache our files.
3. Confirm whether all the required assets are cached or not.

{% highlight javascript %}
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
{% endhighlight %}

Here you can see we call `caches.open()` with our desired cache name, after which
we call `cache.addAll()` and pass in our array of files. This is a chain of
promises (`caches.open()` and `cache.addAll()`). The `event.waitUntil()` method
takes a promise and uses it to know how long installation takes, and whether it
succeeded.

If all the files are successfully cached, then the service worker will be
installed. If **any** of the files fail to download, then the install step will
fail. This allows you to rely on having all the assets that you defined, but
does mean you need to be careful with the list of files you decide to cache in
the install step. Defining a long list of files will increase the chance that
one file may fail to cache, leading to your service worker not getting
installed.

This is just one example, you can perform other tasks in the `install` event or
avoid setting an `install` event listener altogether.

