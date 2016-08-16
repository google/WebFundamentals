---
layout: shared/narrow
title: "Prerequisites"
description: "Before we do anything else, let's make sure we have the right technoloy."
published_on: 2014-12-01
updated_on: 2016-02-04
translation_priority: 0
order: 2
authors:
  - mattgaunt
  - josephmedley
---

<p class="intro">Before we do anything else, let's make sure we have the 
	right technoloy.
</p>

## Use an appropriate browser

Browser options are growing. Service workers are suppported by Firefox and
Opera. Microsoft Edge is now 
[showing public support](https://dev.windows.com/en-us/microsoft-edge/platform/status/serviceworker). 
Even Safari has dropped [hints of future development](https://trac.webkit.org/wiki/FiveYearPlanFall2015). 
You can follow the progress of all the browsers at Jake Archibald's 
[is Serviceworker ready](https://jakearchibald.github.io/isserviceworkerready/) 
site.

### Which version of Chrome?

If you're not using Chrome 46 or later, then  
[please upgrade now](https://support.google.com/chrome/answer/95414). 
Versions  earlier than that lack support for some features you're going 
to need for  service workers, specifically `Cache.addAll()`.

If you really are stuck with an older version of Chrome, there's 
[a polyfill](https://github.com/coonsta/cache-polyfill) that adds the missing 
features. Grab `dist/serviceworker-cache-polyfill.js` to put somewhere in your 
site and use it in a service worker with the `importScripts()` method. Any 
script which is imported will automatically be cached by the service worker.

{% highlight javascript %}
importScripts('serviceworker-cache-polyfill.js');
{% endhighlight %}

## You need HTTPS

During development you'll be able to use service worker through `localhost`, but
to deploy it on a site you'll need to have HTTPS setup on your server.

Using service worker you can hijack connections, fabricate, and filter
responses. Powerful stuff. While you would use these powers for good, a
man-in-the-middle might not. To avoid this, you can only register service
workers on pages served over HTTPS, so we know the service worker the browser
receives hasn't been tampered with during its journey through the network.

[Github Pages](https://pages.github.com/) are served over HTTPS, so they're a
great place to host demos.

If you want to add HTTPS to your server then you'll need to get a TLS 
certificate and set it up for your server. This varies depending on your setup, 
so check your server's documentation and be sure to check out 
[Mozilla's SSL config generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/) 
for best practices.
