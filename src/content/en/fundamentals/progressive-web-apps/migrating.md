project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-09-26 #}
{# wf_published_on: 2016-09-27 #}

# Migrating an Existing App to Progressive Web App {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

When migrating to a PWA, there are no hard and fast requirements around what to
cache. You might, in fact, find it useful to think of your offline strategy as a
series of milestones. It is feasible to begin by adding a simple service worker
and just caching static assets, such as stylesheets and images, so these can be
quickly loaded on repeat visits.

The next step might be caching the full-page HTML or caching the app shell to
serve the empty UI first, and then allow the data layer to be pulled in from the
server. This is the equivalent of a server sending down a rendered page without
any results.

Each milestone allows you to deploy separately, measure the potential
performance gains from each step you explore, and progressively roll out a
better PWA.

## Steps to migrate your app

1. [Move to HTTPS](#)
2. [Something else](#)
3. [Another thing](#)
4. [Add a service worker](#), maybe?
5. [Add a manifest](#), probably?

Note: That section needs to be completed. If I'm a dev, what are the things I'm going to need to do?

## Choosing a caching strategy

Server-rendered pages can vary in complexity, either being (primarily) static
HTML pages or involve more dynamic content. It is useful to think about how
you might want to handle dynamic content as a number of different [offline
caching](/web/fundamentals/instant-and-offline/offline-cookbook/) strategies
can be used.

Success: Understanding the network traffic is key to successful migration. You can use the guidelines in [Measure Resource Loading Times](/web/tools/chrome-devtools/profile/network-performance/resource-loading) to get started using the Network DevTools panel.

Once you decide on a strategy for caching then you must implement it. A SPA
architecture is often recommended when using an app shell, but it can take
some time to refactor an existing site/app over to this architecture. If
refactoring is a daunting task or if using an exclusively SSR approach is
your only option for now, then you can still take advantage of service worker
caching. But, you might end up treating your UI app shell the same way you
would dynamic content. 

* A [cache-first](#) strategy will not be entirely safe here if your server-rendered content is not entirely static and may change.

* A [cache/network race](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-network-race) approach might work as with some combinations of hardware, getting resources from the network can be quicker than going to disk. Just keep in mind that requesting content from the network when the user has some copy of it on their device can waste potentially costly data.

* A [network-first approach that falls back to the cache](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache) might also work. Effectively, provide online users with the most up to date version of the content, but offline users get an older cached version. If a network request succeeds, then ensure the cached version gets updated. 

Any of these strategies implements a web app that works offline. However, it is
possible for data (any common HTML between `/route1`, `/route2` , `/route3`,
etc) to be cached twice. There can be performance and bandwidth hits when going
to the network for the full content of the page as opposed to the app shell
approach only fetches content (instead of content + UI). This can be mitigated
using proper [HTTP browser caching headers](/web/fundamentals/performance
/optimizing-content-efficiency/http-caching).

If you have time for a larger refactor, then try to implement a hybrid approach
that relies on server-side rendering for non-service worker controlled
navigations. This then upgrades to an SPA-style experience when the service
worker is installed. To accomplish this, use a JavaScript framework that
supports universal rendering so that the code to render pages is shared between
the server and client. React, Ember and Angular are examples of solutions that
have universal rendering options.



