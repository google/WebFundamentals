project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description:A checklist of things to ensure when setting up a service worker.

{# wf_updated_on: 2017-12-17 #}
{# wf_published_on: 2017-11-15 #}
{# wf_blink_components: N/A #}

# Service Worker Checklist {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

This page contains a couple of tips that will ensure your users get the
best experience from your web app as well as ensuring there aren't any
hidden surprises while developing your site.

## Register your service worker the right way

In general, you should wait for the window load event before registering your
service worker. This will allow the browser to prioritize assets for the page
and will prevent any risk of precaching interfering with the page.

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
```

<div class="success">
  <b>DO</b>: Wait until the `window` load event to register your service worker.
</div>

## Cache-Control of your service worker file

When you register your service worker file, the browser will make a network
request for the file. If your server returns a `Cache-Control` header with
your service worker file, some browsers will
**cache your service worker file in the HTTP cache**. Future requests for
your service worker file will check the HTTP cache, which can cause some
confusion while developing locally or after publishing a new service worker
and changes don't seem to be taking effect.

Generally, most developers will want to set the `Cache-Control` header
to `no-cache`, forcing browsers to always check the *server* for
a new service worker file.

If you are unsure what your current `Cache-Control` header is for your
service worker, you can check with [curl](https://curl.haxx.se/):

<pre class="devsite-terminal">
curl -I -L https://workbox-demos.firebaseapp.com/demo/workbox-core/sw.js | grep cache-control
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0  1185    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
<strong>cache-control: no-cache</strong>
</pre>

Note: The browser will only cache a service worker file for a **maximum** of
24 hours, so if your users are on an old service worker, it will take at most
a day before they'll get the latest service worker.

## Learn More

This guide is a summary of common gotchas developers hit when starting out,
but for more information check out the ["Service Worker Registration" guide](/web/fundamentals/primers/service-workers/registration).
