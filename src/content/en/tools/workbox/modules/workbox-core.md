project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-core.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2020-01-15 #}
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

## Skip Waiting and Clients Claim

Some developers want to be able to publish a new service worker and have it
update and control a web page as soon as possible, skipping the default
[service worker lifecycle](/web/fundamentals/primers/service-workers/lifecycle).

If you find yourself wanting this behavior, `workbox-core` provides some helper
methods to make this easy:

<pre class="prettyprint js">
import {skipWaiting, clientsClaim} from 'workbox-core';

skipWaiting();
clientsClaim();
</pre>

Note: If your web app lazy-loads resources that are uniquely versioned with, e.g., hashes in their
URLs, it's recommended that you avoid using skip waiting. Enabling it could
[lead to failures](https://stackoverflow.com/questions/51715127)
when lazily-loading URLs that were previously precached and were purged during an updated service
worker's activation.
