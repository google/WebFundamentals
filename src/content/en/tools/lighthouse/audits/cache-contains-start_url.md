project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Cache contains start_url from manifest" Lighthouse audit.

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# Cache Contains start_url From Manifest  {: .page-title }

## Why the audit is important {: #why }

Ensures that a progressive web app properly launches from a mobile device
homescreen while offline.

## How to pass the audit {: #how }

1. Define a `start_url` property in your `manifest.json` file.
2. Ensure that your service worker properly caches a resource that matches
   the value of `start_url`.

To learn the basics of adding apps to homescreens,
see [Add Your Web App to a User's Home
Screen](https://codelabs.developers.google.com/codelabs/add-to-home-screen).
This is a step-by-step, hands-on codelab in which you add "add to
homescreen" functionality into an existing app. Use what you learn in
this codelab to integrate "add to homescreen" functionality in your own app.

For more help on how to cache files with service workers for offline use,
see the "How to pass the audit" section of the following Lighthouse doc:
[URL responds with a 200 when offline](http-200-when-offline#how)

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

When a progressive web app is launched from the homescreen of a mobile
device, the app opens on a specific URL. That URL is defined in the app's
`manifest.json` file as the `start_url` property.

This audit parses the value of `start_url` from `manifest.json` and then
ensures that a matching resource is cached in the service worker's cache.

**If your service worker redirects** `start_url` **requests, this audit
may produce inaccurate results**.

One shortcoming of this audit is that it inspects the cache contents
directly, rather than asking the service worker to resolve the `start_url`
request. This can produce a false negative result if your cache is missing
a resource that matches the exact value of `start_url`, even though in
real scenarios the request resolves successfully because the service
worker redirects to another resource in the cache. Conversely, the audit can
produce a false positive result if your cache contains a resource that
matches `start_url`, but your service worker redirects the request to
a non-existent resource.


{% include "web/tools/lighthouse/audits/_feedback/cache-contains-start_url.html" %}
