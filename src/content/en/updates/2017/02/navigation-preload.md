project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Navigation preload lets you overcome service worker startup time by making requests in parallel.

{# wf_updated_on: 2017-09-07 #}
{# wf_published_on: 2017-02-15 #}
{# wf_tags: chrome59,serviceworker,performance #}
{# wf_featured_image: /web/updates/images/generic/devices.png #}
{# wf_featured_snippet: Navigation preload lets you overcome service worker startup time by making requests in parallel. #}

# Speed up Service Worker with Navigation Preloads {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

### TL;DR {: .hide-from-toc }

* In some situations, [service worker boot-up time can delay a network
  response](#the-problem).
* A new experimental feature, [navigation preload](#the-solution), fixes this by
  allowing you to make the request in parallel with service worker boot-up.
* You can distinguish preload requests from regular navigations using a header,
  and [serve different content](#header).
* Navigation preload is in Chrome 59 Canary behind a flag, and the API may
  change in response to developer feedback.
* It'll remain behind a flag in Chrome 59 stable (likely to be released in
  March), but you can [apply for an origin trial](#origin-trial) to test it with
  real users.
  
Note: An earlier version of this article stated that navigation preload was in
Chrome 57; however, the feature was delayed to Chrome 59.

## The problem {: #the-problem }

When you navigate to a site that uses a service worker to handle fetch events,
the browser asks the service worker for a response. This involves booting up the
service worker (if it isn't already running), and dispatching the fetch event.

The bootup time depends on the device and conditions. It's usually around 50ms.
On mobile it's more like 250ms. In extreme cases (slow devices, CPU in
distress) it can be over 500ms. However, since the service worker stays awake
for a browser-determined time between events, you only get this delay
occasionally, such as when the user navigates to your site from a fresh tab, or
another site.

The boot-up time isn't a problem if you're responding from the cache, as the
benefit of skipping the network is greater than the boot-up delay. But if you're
responding using the network…

{% framebox height="38px" %}
<style>
  .group {
    height: 38px;
    display: flex;
  }
  .group div {
    display: flex;
    align-items: center;
    font: normal 1.2rem/1 sans-serif;
    text-shadow: 0 1.6px 2.7px rgba(0,0,0,0.5);
    color: #fff;
    box-sizing: border-box;
    padding: 0 8px;
    white-space: pre;
  }
  .sw-startup {
    margin-right: 1px;
    width: 100px;
    background: #f0c457;
  }
  .network-request {
    flex: 1;
    background: #6ea1e3;
  }
</style>
<div class="group">
  <div class="sw-startup">SW boot</div>
  <div class="network-request">Navigation request</div>
</div>
{% endframebox %}

…the network request is delayed by the service worker booting-up.

We're continuing to reduce the boot-up time by [using code-caching in
V8](http://v8project.blogspot.com/2015/07/code-caching.html), by [skipping
service workers that don't have a fetch
event](https://bugs.chromium.org/p/chromium/issues/detail?id=605844), by
[launching service workers
speculatively](https://codereview.chromium.org/2045153003), and other
optimizations. However, bootup time will always be greater than zero.

Facebook brought the impact of this problem to our attention, and asked for a
way to perform navigation requests in parallel:

{% framebox height="77px" %}
<style>
  .group {
    height: 38px;
    display: flex;
  }
  .group div {
    display: flex;
    align-items: center;
    font: normal 1.2rem/1 sans-serif;
    text-shadow: 0 1.6px 2.7px rgba(0,0,0,0.5);
    color: #fff;
    box-sizing: border-box;
    padding: 0 8px;
    white-space: pre;
  }
  .sw-startup {
    margin-right: 1px;
    width: 100px;
    background: #f0c457;
  }
  .network-request {
    flex: 1;
    transform: translate(-101px, 1px) translate(0, 100%);
    background: #6ea1e3;
  }
</style>
<div class="group">
  <div class="sw-startup">SW boot</div>
  <div class="network-request">Navigation request</div>
</div>
{% endframebox %}

…and we said "yeah, seems fair".

## "Navigation preload" to the rescue {: #the-solution }

Navigation preload is a new experimental feature that lets you say, "Hey, when
the user makes a GET navigation request, start the network request while
the service worker is booting up".

The startup delay is still there, but it doesn't block the network request, so
the user gets content sooner.

Here's a video of it in action, where the service worker is given a deliberate
500ms startup delay using a while-loop:

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="icv_DpQLryE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

[Here's the demo
itself](https://jakearchibald.github.io/isserviceworkerready/demos/nav-preload/).
To get the benefits of navigation preload, you'll need [Chrome 59
or later](https://www.google.com/chrome/browser/canary.html) with
`chrome://flags/#enable-service-worker-navigation-preload` enabled. 

## Activating navigation preload

<pre class="prettyprint">
addEventListener('activate', event => {
  event.waitUntil(async function() {
    // Feature-detect
    if (self.registration.navigationPreload) {
      <strong>// Enable navigation preloads!
      await self.registration.navigationPreload.enable();</strong>
    }
  }());
});
</pre>

You can call `navigationPreload.enable()` whenever you want, or disable it with
`navigationPreload.disable()`. However, since your `fetch` event needs to make
use of it, it's best to enable/disable it in your service worker's `activate`
event.

## Using the preloaded response

Now the browser will be performing preloads for navigations, but you still need
to *use* the response:

<pre class="prettyprint">
addEventListener('fetch', event => {
  event.respondWith(async function() {
    // Respond from the cache if we can
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    <strong>// Else, use the preloaded response, if it's there
    const response = await event.preloadResponse;
    if (response) return response;</strong>
    
    // Else try the network.
    return fetch(event.request);
  }());
});
</pre>

`event.preloadResponse` is a promise that resolves with a response, if:

* Navigation preload is enabled.
* The request is a `GET` request.
* The request is a navigation request (which browsers generate when they're
  loading pages, including iframes).

Otherwise `event.preloadResponse` is still there, but it resolves with
`undefined`.

Warning: Don't enable navigation preload then forget to use it. If you use
`fetch(event.request)` instead of `event.preloadResponse`, you'll end up with
double requests for navigations.

## Custom responses for preloads {: #header }

If your page needs data from the network, the quickest way is to request it in
the service worker and create a single streamed response containing parts from
the cache and parts from the network.

Say we wanted to display an article:

    addEventListener('fetch', event => {
      const url = new URL(event.request.url);
      const includeURL = new URL(url);
      includeURL.pathname += 'include';

      if (isArticleURL(url)) {
        event.respondWith(async function() {
          // We're going to build a single request from multiple parts.
          const parts = [
            // The top of the page.
            caches.match('/article-top.include'),
            // The primary content
            fetch(includeURL)
              // A fallback if the network fails.
              .catch(() => caches.match('/article-offline.include')),
            // The bottom of the page
            caches.match('/article-bottom.include')
          ];

          // Merge them all together.
          const {done, response} = await mergeResponses(parts);
          // Wait until the stream is complete.
          event.waitUntil(done);
          // Return the merged response.
          return response;
        }());
      }
    });

In the above, [`mergeResponses` is a little
function](https://gist.github.com/jakearchibald/d0b7e65496a8ec362f10739c3e28da6e)
that merges the streams of each request. This means we can display the cached
header while the network content streams in.

This is quicker than the "app shell" model as the network request is made along
with the page request, and the content can stream without [major
hacks](https://jakearchibald.com/2016/fun-hacks-faster-content/#using-iframes-and-documentwrite-to-improve-performance).

However, the request for `includeURL` will be delayed by the service worker's
startup time. We can use navigation preload to fix this too, but in this case we
don't want to preload the full page, we want to preload an include.

To support this, a header is sent with every preload request:

    Service-Worker-Navigation-Preload: true

The server can use this to send different content for navigation preload
requests than it would for a regular navigation request. Just remember to add a
`Vary: Service-Worker-Navigation-Preload` header, so caches know that your
responses differ.

Now we can use the preload request:

<pre class="prettyprint">
<strong>// Try to use the preload
const networkContent = Promise.resolve(event.preloadResponse)
  // Else do a normal fetch
  .then(r => r || fetch(includeURL))</strong>
  // A fallback if the network fails.
  .catch(() => caches.match('/article-offline.include'));

const parts = [
  caches.match('/article-top.include'),
  <strong>networkContent</strong>,
  caches.match('/article-bottom')
];
</pre>

Note: `Promise.resolve(event.preloadResponse)` means we get a promise for
undefined if `event.preloadResponse` is undefined. It's a good way to normalize
behaviour with browsers that don't support `event.preloadResponse`.

## Changing the header

By default, the value of the `Service-Worker-Navigation-Preload` header is
`true`, but you can set it to whatever you want:

    navigator.serviceWorker.ready.then(registration => {
      return registration.navigationPreload.setHeaderValue(newValue);
    }).then(() => {
      console.log('Done!');
    });

You could, for example, set it to the ID of the last post you have cached
locally, so the server only returns newer data.

## Getting the state

You can look up the state of navigation preload using `getState`:

    navigator.serviceWorker.ready.then(registration => {
      return registration.navigationPreload.getState();
    }).then(state => {
      console.log(state.enabled); // boolean
      console.log(state.headerValue); // string
    });

## Use it on live sites today! {: #origin-trial }

We're still experimenting with this feature, but we're looking for real-world
feedback. To get feedback, we're making it available as an [origin
trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)
starting in Chrome 59. Origin trials allow you to temporarily enable the feature
for users of your website, so you can test its real-world impact. To do this,
you'll need to [request a token for your
origin](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin),
and include the token as a header on your pages and service worker:

    Origin-Trial: token_obtained_from_signup

To avoid the problems we saw with vendor prefixes, origin trials are globally
shut off if usage exceeds 0.03% of all Chrome page loads, so large sites should
only enable the feature for a fraction of its users.

If you do experiment with this feature, you can send us feedback on our [mailing
list](https://groups.google.com/a/chromium.org/forum/#!forum/service-worker-discuss),
or join the [spec discussion](https://github.com/w3c/ServiceWorker/issues/920).
If you find any bugs, please [file an issue](https://crbug.com/new), including
the words "service worker navigation preload" in the issue Summary.

<small>Many thanks to Matt Falkenhagen and Tsuyoshi Horo for their work on this
feature, and help with this article. And a huge thanks to everyone involved in
[the standardization
effort](https://github.com/w3c/ServiceWorker/issues/920)</small>

{% include "comment-widget.html" %}
