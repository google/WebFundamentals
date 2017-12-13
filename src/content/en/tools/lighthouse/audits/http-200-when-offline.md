project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Responds With A 200 When Offline" Lighthouse audit.

{# wf_updated_on: 2017-12-11 #}
{# wf_published_on: 2016-09-15 #}
{# wf_blink_components: N/A #}

# Responds With A 200 When Offline {: .page-title }

## Overview {: #overview }

Progressive web apps work offline. If Lighthouse does not receive an HTTP 200
response when accessing a page while offline, then the page is not accessible
offline.

## Recommendations {: #recommendations }

1. Add a service worker to your app.
2. Use the service worker to cache files locally.
3. When offline, use the service worker as a network proxy to return the
   locally cached version of the file.

To learn how to add a service worker into an existing app, see [Adding a Service
Worker and Offline Into Your Web
App](https://codelabs.developers.google.com/codelabs/offline). Use what you
learn in this step-by-step, hands-on codelab to learn how to add a service
worker into your own app. This covers steps 1 and 3 above.

The codelab above shows you some basics on how to debug your service worker
using Chrome DevTools. For more detailed help, see the codelab dedicated to
this topic, [Debugging Service
Workers](https://codelabs.developers.google.com/codelabs/debugging-service-workers).

Use the [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/) to
determine which caching strategy fits your app best. This covers step 2 above.

## More information {: #more-info }

Lighthouse emulates an offline connection using the Chrome Debugging Protocol,
and then attempts to retrieve the page using `XMLHttpRequest`.


{% include "web/tools/lighthouse/audits/_feedback/http-200-when-offline.html" %}
