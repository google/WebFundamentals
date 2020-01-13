project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: HTTP requests that check for updates to the service worker script will no longer be fulfilled by the HTTP cache by default, and imported scripts can trigger the service worker update flow.

{# wf_updated_on: 2019-09-20 #}
{# wf_published_on: 2019-09-19 #}
{# wf_tags: progressive-web-apps, serviceworker, chrome68 #}
{# wf_featured_image: /web/updates/images/generic/sd-card.png #}
{# wf_featured_snippet: HTTP requests that check for updates to the service worker script will no longer be fulfilled by the <a href="/web/fundamentals/performance/optimizing-content-efficiency/http-caching">HTTP cache</a> by default. This works around a <a href="/web/tools/workbox/guides/service-worker-checklist#cache-control_of_your_service_worker_file">common developer pain point</a>, in which setting an inadvertent <code>Cache-Control</code> header on your service worker script could lead to delayed updates. Also, updates to imported scripts can trigger the service worker update flow. #}
{# wf_blink_components: Blink>ServiceWorker #}

# Fresher service workers, by default {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

Note: This article was [updated](#checks_for_updates_to_imported_scripts) to
reflect that the byte-for-byte service worker update check applies to imported
scripts starting in Chrome 78.

### tl;dr {: .hide-from-toc }

Starting in Chrome 68, HTTP requests that check for updates to the service worker script will no
longer be fulfilled by the [HTTP cache](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
by default. This works around a [common developer pain point](/web/tools/workbox/guides/service-worker-checklist#cache-control_of_your_service_worker_file),
in which setting an inadvertent `Cache-Control` header on your service worker script could lead
to delayed updates.

If you've already opted-out of HTTP caching for your `/service-worker.js` script by serving it
with `Cache-Control: max-age=0`, then you shouldn't see any changes due to the new default
behavior.

Additionally, starting in Chrome 78, the byte-for-byte comparison will be
applied to scripts loaded in a service worker via
[`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts).
Any change made to an imported script will trigger the
[service worker update flow](/web/fundamentals/primers/service-workers/lifecycle#updates),
just like a change to the top-level service worker would.

## Background

Every time you navigate to a new page that's under a service worker's scope, explicitly call [`registration.update()`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update)
from JavaScript, or when a service worker is "woken up" via a `push` or `sync` event, the browser
will, in parallel, request the JavaScript resource that was originally passed in to the
`navigator.serviceWorker.register()` call, to look for updates to the service worker script.

For the purposes of this article, let's assume its URL is `/service-worker.js` and that it
contains a single call to [`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts),
which loads additional code that's run inside the service worker:

```js
// Inside our /service-worker.js file:
importScripts('path/to/import.js');

// Other top-level code goes here.
```

## What's changing?

Prior to Chrome 68, the update request for `/service-worker.js` would be made via the HTTP cache
(as most fetches are). This meant if the script was originally sent with `Cache-Control:
max-age=600`, updates within the next 600 seconds (10 minutes) would not go to the network, so the
user may not receive the most up-to-date version of the service worker. However, if `max-age` was
greater than 86400 (24 hours), it would be treated as if it were 86400, to avoid users being stuck
with a particular version forever.

Starting in 68, the HTTP cache will be ignored when requesting updates to the service worker
script, so existing web applications may see an increase in the frequency of requests for their
service worker script. Requests for `importScripts` will still go via the HTTP cache. But this is
just the default—a new registration option, `updateViaCache` is available that offers control over
this behavior.

### updateViaCache

Developers can now pass in a new option when calling `navigator.serviceWorker.register()`: the [`updateViaCache` parameter](https://w3c.github.io/ServiceWorker/#enumdef-serviceworkerupdateviacache).
It takes one of three values: `'imports'`, `'all'`, or `'none'`.

The values determine if and how the browser's standard [HTTP cache](https://jakearchibald.com/2016/caching-best-practices/)
comes into play when making the HTTP request to check for updated service worker resources.

- When set to `'imports'`, the HTTP cache will never be consulted when checking for updates to the
  `/service-worker.js` script, but will be consulted when fetching any imported scripts
  (`path/to/import.js`, in our example). This is the default, and it matches the behavior starting
  in Chrome 68.

- When set to `'all'`, the HTTP cache will be consulted when making requests for both the
  top-level `/service-worker.js` script, as well as any scripts imported inside of the service
  worker, like `path/to/import.js`. This option corresponds to the previous behavior in Chrome,
  prior to Chrome 68.

- When set to `'none'`, the HTTP cache will not be consulted when making requests for either the
  top-level `/service-worker.js` or for any imported scripts, such as the hypothetical
  `path/to/import.js`.

For example, the following code will register a service worker, and ensure that the HTTP cache is
never consulted when checking for updates to either the `/service-worker.js` script, or for any
scripts that are referenced via `importScripts()` inside of `/service-worker.js`:

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', {
    updateViaCache: 'none',
    // Optionally, set 'scope' here, if needed.
  });
}
```

## Checks for updates to imported scripts

Prior to Chrome 78, any service worker script loaded via
[`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts)
would be retrieved only once (checking first against the HTTP cache, or via the
network, depending on the `updateViaCache` configuration). After that initial
retrieval, it would be stored internally by the browser, and never re-fetched.

The only way to force an already installed service worker to pick up changes to
an imported script was to change the script's URL, usually either by adding in a
[semver value](https://semver.org/) (e.g.
`importScripts('https://example.com/v1.1.0/index.js')`) or by including a hash of
the contents (e.g. `importScripts('https://example.com/index.abcd1234.js')`). A
side-effect of changing the imported URL is that the top-level service worker
script's contents change, which in turn triggers the
[service worker update flow](/web/fundamentals/primers/service-workers/lifecycle#updates).

Starting with Chrome 78, each time an update check is performed for a top-level
service worker file, checks will be made at the same time to determine whether
or not the contents of any imported scripts have changed. Depending on the
`Cache-Control` headers used, these imported script checks might be fulfilled by
the HTTP cache if `updateViaCache` is set to `'all'` or `'imports'` (which is
the default value), or the checks might go directly against the network if
`updateViaCache` is set to `'none'`.

If an update check for an imported script results in a byte-for-byte difference
compared to what was previously stored by the service worker, that will in turn
trigger the full service worker update flow, even if the top-level service
worker file remains the same.

The Chrome 78 behavior matches what Firefox [implemented](https://bugzilla.mozilla.org/show_bug.cgi?id=1290951)
several years ago, in Firefox 56. Safari already implements this behavior as
well.

## What do developers need to do?

If you've effectively opted-out of HTTP caching for your `/service-worker.js` script by serving it
with `Cache-Control: max-age=0` (or a similar value), then you shouldn't see any changes due to
the new default behavior.

If you do serve your `/service-worker.js` script with HTTP caching enabled, either intentionally
or because it's just the [default for your hosting environment](https://jakearchibald.com/2016/caching-best-practices/#max-age-on-mutable-content-is-often-the-wrong-choice),
you may start seeing an uptick of additional HTTP requests for `/service-worker.js` made against
your server—these are requests that used to be fulfilled by the HTTP cache. If you want to
continue allowing the `Cache-Control` header value to influence the freshness of your
`/service-worker.js`, you'll need to start explicitly setting `updateViaCache: 'all'` when
registering your service worker.

Given that there may be a long-tail of users on older browser versions, it's still a good idea to
continue setting the `Cache-Control: max-age=0` HTTP header on service worker scripts, even though
newer browsers might ignore them.

Developers can use this opportunity to decide whether they want to explicitly opt their imported
scripts out of HTTP caching now, and add in `updateViaCache: 'none'` to their service worker
registration if appropriate.

### Serving imported scripts

Starting with Chrome 78, developers might see more incoming HTTP requests for
resources loaded via `importScripts()`, since they will now be checked for
updates.

If you would like to avoid this additional HTTP traffic, set long-lived
`Cache-Control` headers when serving scripts that include semver or hashes in
their URLs, and rely on the default `updateViaCache` behavior of `'imports'`.

Alternatively, if you *want* your imported scripts to be checked for frequent
updates, then make sure you either serve them with `Cache-Control: max-age=0`,
or that you use `updateViaCache: 'none'`.

## Further reading

"[The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)" and
"[Caching best practices & max-age gotchas](https://jakearchibald.com/2016/caching-best-practices/)",
both by Jake Archibald, are recommended reading for all developers who deploy anything to the web.

{% include "web/_shared/rss-widget-updates.html" %}

