---
layout: shared/narrow
title: "Intercept the web page requests"
published_on: 2015-09-30
updated_on: 2015-10-06
translation_priority: 1
order: 7
authors:
  - paulkinlan
---

One of the unique attributes of the service worker is the ability to intercept requests made from the web page that the service worker controls and decide what to do with them. This gives us the ability to load the assets that were cached in the install phase.

The first step is to attach an event handler to the fetch event.  This event 
will be triggered for every request that is made.

Add the following code to your sw.js which will log the requests made from the 
parent page.

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
});
{% endhighlight %}

Now open up Chrome DevTools for the service worker and you will see a number of 
requests.

<img src="images/image04.png" width="624" height="350" />
   
Now that we know we can understand all the requests that come through our app we 
need to decide what to do with those requests.  By default, if we don't do 
anything, the request will be passed to the network and the response will be 
returned to the web page.

To make our application work offline we need to pull the request from the cache 
if it is available in the Cache.

Start by adding `event.respondWith()` method. This method tells the browser to 
evaluate the result of the event in the future.  It does need to be filled out 
with an operation before it will work.

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
 
 event.respondWith( );
});
{% endhighlight %}
   
Add in `caches.match(event.request)` as follows. This call takes the current web 
request that triggered the fetch event and looks in the cache for a cached piece 
of data that matches the current request (based primarily on looking at the URL 
string). 

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
 event.respondWith(
   caches.match(event.request).then(function(response) { })
 );
});
{% endhighlight %}

The match method returns a Promise that resolves even if the file is not found 
in the cache, this means that we get a choice about what we do.  In our simple 
case when the file is not found we simply want to fetch it from the network and 
return it to the browser.

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
{% endhighlight %}

This is the simplest case, there are many other caching scenarios.  For example, 
you could incrementally cache all responses for previously uncached requests, so 
in the future they are all returned from the cache. 


