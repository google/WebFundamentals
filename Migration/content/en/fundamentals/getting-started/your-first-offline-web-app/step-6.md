---
layout: shared/narrow
title: "Install the Site Assets"
published_on: 2015-09-30
updated_on: 2015-10-06
translation_priority: 1
order: 6
authors:
  - paulkinlan
---

With the service worker registered, an “install” event will be triggered the first time a user visits the page. In this event handler, you should cache all the assets that are needed for your application.

First add in the Cache Polyfill (it is already included in the repo). This 
polyfill is needed because the Cache API isn't yet fully implemented in all 
browser (Chrome has good support).

{% highlight javascript %}
importScripts('/cache-polyfill.js');
{% endhighlight %}

Now add an Event Listener for the install event.

{% highlight javascript %}
self.addEventListener('install', function(e) {
  e.waitUntil();
});
{% endhighlight %}

Then in the Event handler function, open the caches object.  The caches object 
will be used later in the codelab to make sure that for every request we can 
return a saved version of the data.

{% highlight javascript %}
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('airhorner').then(function(cache) {})
  );
});
{% endhighlight %}

Now that the cache is open, you need to populate it.  The cache object has a 
method called addAll (via the polyfill). addAll will take a list of urls, 
automatically fetch them from the server and add them to the cache.

{% highlight javascript %}
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/styles/main.css',
       '/scripts/main.min.js',
       '/sounds/airhorn.mp3'
     ]);
   })
 );
});
{% endhighlight %}

If any one of these files is not present or fails to be fetched, then the entire 
operation for `addAll` will also fail.  A good application will handle this case.

### Frequently Asked Questions

* Where is the polyfill?
    * [https://github.com/coonsta/cache-polyfill](https://github.com/coonsta/cache-polyfill) 
* Why do I need to polyfill?
    * Currently Chrome and other browsers don't yet fully support the addAll 
      method (**note:** Chrome 46 will be compliant)
* Why do you have ?homescreen=1
    * URL's with Query String parameters are treated as individual URL's and 
      need to be cached separately.
      

