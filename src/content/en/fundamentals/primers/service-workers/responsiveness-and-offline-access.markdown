---
layout: shared/narrow
published: false
title: "Responsiveness and offline access with fetch and cache"
description: "Responsiveness and offline access are two of the key advantages of service workers. How do we get them? We get them by implementing fetching and caching in our service worker. Fetching allows us to intercept requests made by service worker clients and cache them so they're available when the network connection is slow or unavailable."
authors:
  - josephmedley
published_on: 2014-09-25
updated_on: 2015-09-25
order: 6
---

<p class="intro">
  Responsiveness and offline access are two of the key advantages of service 
  workers. How do we get them? We get them by implementing fetching and caching 
  in our service worker. Fetching allows us to intercept requests made by 
  service worker clients and cache them so they're available when the network
  connection is slow or unavailable.
</p>

To implement fetching, add a `fetch` event handler to your service worker. 

{% highlight javascript %}
self.addEventListener('fetch', function(fetchEvent) {
  fetchEvent.respondWith(
    // Some functionality: fetching from cache and/or network, adding
    //   fetched items to the cache.
  );
});
{% endhighlight %}

The `fetch` event contains an HTTP request. You can either use it to retrieve 
something from cache or pass it to the network. There are several ways to do 
that, covered in 
[Jake Archibald's Offline Cookbook](https://jakearchibald.com/2014/offline-cookbook/). 
The example below intercepts every request from a client and tries to 
retrieve it from the cache. If retrieval fails, it passes the request to 
the network using the `fetch()` method. Finally, it returns an HTTP 
response with a call to `event.respondWith()`.

{% highlight javascript %}
self.addEventListener('fetch', function(fetchEvent) {
  fetchEvent.respondWith(  
    // Always return a response object or a promise resolving to a response object.
    // Look in the cache.
    caches.match(fetchEvent.request).then(function(response) {
      // Go to the network if it's not in the cache.
     return response || fetch(fetchEvent.request);
    })
  );
});
{% endhighlight %}

This code is still missing a few pieces. It doesn't show how data gets into
the  cache, and it doesn't cache anything it requests. For that, head over to
Jake Archibald's [Offline Cookbook](https://jakearchibald.com/2014/offline-
cookbook/) and keep reading.
