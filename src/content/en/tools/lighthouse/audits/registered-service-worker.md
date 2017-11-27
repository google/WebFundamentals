project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Registers A Service Worker" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-07-25 #}

# Registers A Service Worker {: .page-title }

## Why the audit is important {: #why }

Registering a service worker is the first step towards enabling the following
progressive web app features:

* Offline
* Push notifications
* Add to homescreen

See [Service Workers: an Introduction](/web/fundamentals/getting-started/primers/service-workers) to learn more.

## How to pass the audit {: #how }

Registering a service worker involves only a few lines of code, but the only
reason you'd use a service worker is to implement one of the progressive
web app features outlined above. Implementing those features requires more
work.

For more help on caching files for offline use, see the "How to pass the
audit" section of the following Lighthouse doc: [URL responds with a 200 when
offline](http-200-when-offline#how).

For enabling push notifications or "add to homescreen", complete the
following step-by-step tutorials and then use what you learn to implement
the features in your own app:

* [Enable push notifications for your web
  app](https://codelabs.developers.google.com/codelabs/push-notifications).
* [Add your web app to a user's home
  screen](https://codelabs.developers.google.com/codelabs/add-to-home-screen).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Checks if the Chrome Debugger returns a service worker version.


{% include "web/tools/lighthouse/audits/_feedback/registered-service-worker.html" %}
