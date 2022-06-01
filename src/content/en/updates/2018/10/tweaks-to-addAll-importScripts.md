project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Some small changes are coming to cache.addAll() and importScripts and in Chrome 71.

{# wf_updated_on: 2022-06-01 #}
{# wf_published_on: 2018-10-15 #}
{# wf_tags: progressive-web-apps,serviceworker,chrome71,deprecations,removals #}
{# wf_featured_image: /web/updates/images/generic/sd-card.png #}
{# wf_featured_snippet: Some small changes are coming to <code>cache.addAll()</code> and <code>importScripts()</code>, starting in Chrome 71. #}
{# wf_blink_components: Blink>ServiceWorker #}

# Tweaks to cache.addAll() and importScripts() coming in Chrome 71 {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

Developers using [service
workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) and the [Cache Storage
API](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) should be on the lookout for two
small changes rolling out in Chrome 71. Both changes bring Chrome's implementation more in line with
[specification](https://w3c.github.io/ServiceWorker/)s and other browsers.

## Disallowing asynchronous importScripts()

[`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts)
tells your main service worker script to pause its current execution, download additional code from
a given URL, and run it to completion in the current [global
scope](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope). Once that's done,
the main service worker script resumes execution. `importScripts()` comes in handy when
you want to break your main service worker script into smaller pieces for organizational reasons, or
pull in third-party code to add functionality to your service worker.

Browsers attempt to mitigate the possible performance gotchas of "download and run some synchronous
code" by automatically caching anything pulled in via `importScripts()`, meaning that after the
initial download, there's very little overhead involved in executing the imported code.

For that to work, though, the browser needs to know that there won't be any "surprise" code imported
into the service worker after the initial
[installation](/web/fundamentals/primers/service-workers/lifecycle#install).
As per the [service worker specification](https://w3c.github.io/ServiceWorker/#importscripts),
calling `importScripts()` is supposed to only work during the synchronous execution of the top-level
service worker script, or if needed, asynchronously inside of the `install` handler.

Prior to Chrome 71, calling `importScripts()` asynchronously outside of the `install` handler would
work. [Starting with Chrome 71](https://www.chromestatus.com/feature/5748516353736704), those calls
throw a runtime exception (unless the same URL was previously imported in an `install` handler),
matching the behavior in other browsers.

Instead of code like this:

```javascript
// This only works in Chrome 70 and below.
self.addEventListener('fetch', event => {
  importScripts('my-fetch-logic.js');
  event.respondWith(self.customFetchLogic(event));
});
```

Your service worker code should look like:

```javascript
// Move the importScripts() to the top-level scope.
// (Alternatively, import the same URL in the install handler.)
importScripts('my-fetch-logic.js');
self.addEventListener('fetch', event => {
  event.respondWith(self.customFetchLogic(event));
});
```

Note: Some users of the [Workbox library](https://developer.chrome.com/docs/workbox/) might be
implicitly relying on asynchronous calls to `importScripts()` without realizing it. Please see [this
guidance](https://developer.chrome.com/docs/workbox/modules/workbox-sw/#avoid-async-imports) to
make sure you don't run into issues in Chrome 71.

## Deprecating repeated URLs passed to cache.addAll()

If you're using the Cache Storage API alongside of a service worker, there's another small change in
Chrome 71 to align with the [relevant
specification](https://w3c.github.io/ServiceWorker/#batch-cache-operations). When the same URL is
passed in multiple times to a single call to
[`cache.addAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll), the
specification says that the promise returned by the call should reject.

Prior to Chrome 71, that was not detected, and the duplicate URLs would effectively be ignored.

<figure>
  <img src="/web/updates/images/2018/10/cache-addall-warning.png"
       alt="A screenshot of the warning message in Chrome's console."/>
  <figcaption>
    Starting in Chrome 71, you'll see a warning message logged to the console.
  </figcaption>
</figure>

This logging is a prelude to Chrome 72, where instead of just a logged warning, duplicate URLs will
lead to `cache.addAll()` rejecting. If you're calling `cache.addAll()` as part of a promise chain
passed to
[`InstallEvent.waitUntil()`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil),
as is common practice, that rejection might cause your service worker to fail to install.

Here's how you might run into trouble:

```javascript
const urlsToCache = [
  '/index.html',
  '/main.css',
  '/app.js',
  '/index.html'  // Oops! This is listed twice and should be removed.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache')
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

This restriction only applies to the actual URLs being passed to `cache.addAll()`, and caching what
ends up being two equivalent responses that have different URLs—like `'/'` and `'/index.html'`—will
not trigger a rejection.

## Test your service worker implementation widely

Service workers are [widely implemented](https://jakearchibald.github.io/isserviceworkerready/)
across all major ["evergreen" browsers](https://www.w3.org/2001/tag/doc/evergreen-web/#updates) at
this point. If you regularly test your progressive web app against a number of browsers, or if you
have a significant number of users who don't use Chrome, then chances are you've already detected
the inconsistency and updated your code. But on the off chance that you haven't noticed this
behavior in other browsers, we wanted to call out the change before switching Chrome's behavior.

{% include "web/_shared/rss-widget-updates.html" %}
