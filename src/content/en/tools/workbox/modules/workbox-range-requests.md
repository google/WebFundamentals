project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-range-requests.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2020-01-15 #}
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
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {RangeRequestsPlugin} from 'workbox-range-requests';

registerRoute(
  /\.mp4$/,
  new CacheFirst({
    plugins: [
      new RangeRequestsPlugin(),
    ],
  });
);
```

Note: There are some additional considerations to take into account when serving
cached media content. Read more in the
["Serve cached audio and video" recipe](/web/tools/workbox/guides/advanced-recipes#cached-av)

## Advanced Usage

If you want to make use of this logic outside of the Plugin you
can use the `createPartialResponse()` function.

```javascript
import {createPartialResponse} from 'workbox-range-requests';

createPartialResponse(request, cachedResponse);
```

For more info [see the reference docs](../reference-docs/latest/module-workbox-range-requests).
