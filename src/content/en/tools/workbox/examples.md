project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Workbox Examples.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2017-05-16 #}

# Examples {: .page-title }

This page contains examples for some of the Workbox modules.

Workbox is a set of small modules that can be used on their own, but we've
also combined the most common pieces into one module, `workbox-sw`. This module
supports precaching, routing of fetch events, runtime caching and more.

## workbox-sw

The `workbox-sw` example demonstrates a complete service worker
implementation, demonstrating the common parts of the API. It's an in-depth
exploration of everything you'd need to build a production-ready service worker.

<a href="https://workbox-samples.glitch.me/examples/workbox-sw/" class="btn">View Example</a>

## Lower Level Modules

As an alternative to using the full `workbox-sw` library, you can use these
smaller, standalone modules in your service worker.


#### workbox-broadcast-cache-update

Uses the <a href="https://developer.mozilla.org/en-us/docs/web/api/broadcast_channel_api">Broadcast Channel API</a>
to let you know when two responses are different.

<a href="https://workbox-samples.glitch.me/examples/workbox-broadcast-cache-update/" class="btn">View Example</a>

#### workbox-cache-expiration

Takes care of expiring cached entries based on the maximum number or age of
entries.

<a href="https://workbox-samples.glitch.me/examples/workbox-cache-expiration/" class="btn">View Example</a>

#### workbox-routing

Makes it easy to handle network requests using the response strategy of your
choice.

<a href="https://workbox-samples.glitch.me/examples/workbox-routing/" class="btn">View Example</a>

#### workbox-runtime-caching

Implements common cache strategies, and provides hooks to extend the default behaviors.

<a href="https://workbox-samples.glitch.me/examples/workbox-runtime-caching/" class="btn">View Example</a>
