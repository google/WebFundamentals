---
layout: shared/narrow
title: "Cache and Return Requests"
description: "Now that you've installed a service worker, you probably want to return one of your cached responses, right?"
published_on: 2014-12-01
updated_on: 2016-01-19
translation_priority: 0
order: 7
authors:
  - mattgaunt
---

<p class="intro">Now that you've installed a service worker, you probably want to 
  return one of your cached responses, right?</p>

After a service worker is installed and the user navigates to a different page
or refreshes, the service worker will begin to receive `fetch` events, an example
of which is below.

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
{% endhighlight %}

Here we've defined our `fetch` event and within `event.respondWith()`, we
pass in a promise from `caches.match()`. This method looks at the request and
finds any cached results from any of the caches your service worker created.

If we have a matching response, we return the cached value, otherwise we return
the result of a call to `fetch`, which will make a network request and return
the data if anything can be retrieved from the network. This is a simple example
and uses any cached assets we cached during the install step.

If we want to cache new requests cumulatively, we can do so by handling the
response of the fetch request and then adding it to the cache, like below.

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
{% endhighlight %}

What we are doing is this:

1. Add a callback to `.then()` on the `fetch` request.
2. Once we get a response, we perform the following checks:

   1. Ensure the response is valid.
   2. Check the status is `200` on the response.
   3. Make sure the response type is **basic**, which indicates that it's a 
      request from our origin. This means that requests to third party assets 
      aren't cached as well.
3. If we pass the checks, we [clone](https://fetch.spec.whatwg.org/#dom-response-clone) 
   the response. The reason for this is that because the response is a 
   [Stream](https://streams.spec.whatwg.org/), the body can only be consumed 
   once. Since we want to return the response for the browser to use, as well 
   as pass it to the cache to use, we need to clone it so we can send one to 
   the browser and one to the cache.
