project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-core.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2021-03-19 #}
{# wf_published_on: 2017-11-27 #}

# Workbox Core {: .page-title }

## What is Workbox Core?

Workbox has been built to be modular, allowing developers to select the
pieces they want to use without forcing them to download everything in a
single file.

There is however overlap between modules, for example, each module will like
need to interact with the console, throw meaningful errors and make use of
the network or cache. To avoid each module implementing the same logic,
`workbox-core` contains this common code which each module relies on.

This module does provide some functionality to developers, but beyond log
levels and caching, `workbox-core` offers internal logic to each module,
rather than the end developer.

## View and Change the Default Cache Names

Workbox defines it's caches via `cacheNames`:

```javascript
import {cacheNames} from 'workbox-core';

console.log(cacheNames.precache);
console.log(cacheNames.runtime);
console.log(cacheNames.googleAnalytics);
```

These cache names are constructed in the format of a prefix, a name and
suffix, where the name changes based on the use of the cache.

`<prefix>-<cache-id>-<suffix>`

You can change these default names by altering all or some of the values
passed to `setCacheNameDetails()`.

```javascript
import {cacheNames, setCacheNameDetails} from 'workbox-core';

setCacheNameDetails({
  prefix: 'my-app',
  suffix: 'v1',
  precache: 'install-time',
  runtime: 'run-time',
  googleAnalytics: 'ga',
});

// Will print 'my-app-install-time-v1'
console.log(cacheNames.precache);

// Will print 'my-app-run-time-v1'
console.log(cacheNames.runtime);

// Will print 'my-app-ga-v1'
console.log(cacheNames.googleAnalytics);
```

The main use case for the prefix and suffix is that if you use Workbox for
multiple projects and use the same localhost port for each project, setting a
custom prefix for each module will prevent the caches from conflicting
with each other.

## Clients Claim

Some developers want to be able to publish a new service worker and have it
control already-open web pages as soon as soon as it activates, which will not
happen [by default](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim).

If you find yourself wanting this behavior, `workbox-core` provides a helper method:

<pre class="prettyprint js">
import {clientsClaim} from 'workbox-core';

// This clientsClaim() should be at the top level
// of your service worker, not inside of, e.g.,
// an event handler.
clientsClaim();
</pre>

The `clientsClaim()` method in `workbox-core` automatically adds an `activate`
event listener to your service worker, and inside of it, calls
`self.clients.claim()`. Calling `self.clients.claim()` before the current service
worker activates will lead to a
[runtime exception](https://w3c.github.io/ServiceWorker/#:~:text=If%20the%20service%20worker%20is%20not%20an%20active%20worker%2C%20return%20a%20promise%20rejected%20with%20an%20%22InvalidStateError%22%20DOMException.),
and `workbox-core`'s wrapper helps ensure that you call it at the right time.

### The skipWaiting wrapper is deprecated

Previous to Workbox v6, developers were also encouraged to use the `skipWaiting()`
method from `workbox-core`. However, this method offered little value beyond what
developers would get if they called `self.skipWaiting()` explicitly.

Because the legacy `workbox-core` wrapper also registered an `install` event handler
in which `self.skipWaiting()` was called, the wrapper would not behave as expected
if it were called inside of another event handler, like `message`, after installation
had already completed.

For these reasons, `workbox-core`'s `skipWaiting()` is deprecated, and developers
should switch to calling `self.skipWaiting()` directly. Unlike with
`self.clients.claim()`, `self.skipWaiting()` will not throw an exception if called
at the "wrong" time, so there is no need to wrap it in an event handler.

Note: If your web app lazy-loads resources that are uniquely versioned with, e.g., hashes in their
URLs, it's recommended that you avoid using skip waiting. Enabling it could
[lead to failures](https://stackoverflow.com/questions/51715127)
when lazily-loading URLs that were previously precached and were purged during an updated service
worker's activation.
