project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Avoids Application Cache" Lighthouse audit.

{# wf_updated_on: 2017-12-11 #}
{# wf_published_on: 2017-01-04 #}
{# wf_blink_components: N/A #}

# Avoids Application Cache  {: .page-title }

## Overview {: #overview }

Application Cache, also known as AppCache, is [deprecated][deprecated].

[deprecated]: https://html.spec.whatwg.org/multipage/browsers.html#offline

## Recommendations {: #recommendations }

Consider using the service worker [Cache API][API] instead.

To help migrate from AppCache to service workers, consider the
[sw-appcache-behavior][sw-appcache-behavior] library. This library generates a
service-worker-based implementation of the behavior defined in an AppCache
manifest.

See the [URL Responds With a 200 When Offline](http-200-when-offline) audit
reference for more resources on using service workers to make your site work
offline.

[API]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

[sw-appcache-behavior]: https://github.com/GoogleChrome/sw-appcache-behavior

## More information {: #more-info }

The audit passes if no AppCache manifest is detected.


{% include "web/tools/lighthouse/audits/_feedback/appcache.html" %}
