project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-core.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2018-03-13 #}
{# wf_published_on: 2017-11-27 #}

# Workbox Range Requests {: .page-title }

## What are Range Requests?

When making a request, a `range` header can be set that tells
the server to return only a portion of the full request. This
is useful for certain files like a video file, where a user
might change where to play the video.

## What does this module do?

There may be scenarios where you want to serve a cached file
but the browser has set a `range` header. Normally the header
would be ignored.

This module will read the cached response and return the
specified range of data.

## Basic Usage

You can use Workbox Range Requests by adding the plugin to the
strategy you want to check for range requests against.

```javascript
workbox.routing.registerRoute(
  /.*.mp4/,
  workbox.strategies.cacheFirst({
    plugins: [
      new workbox.rangeRequests.Plugin(),
    ],
  });
);
```

## Advanced Usage

If you want to make use of this logic outside of the Plugin you
can use the `createPartialResponse()` function.

```javascript
workbox.rangeRequests.createPartialResponse(request, cachedResponse);
```

For more info [see the reference docs](../reference-docs/prerelease/workbox.rangeRequests).
