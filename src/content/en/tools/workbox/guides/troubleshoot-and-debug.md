project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide to general service worker debugging, and Workbox-specific logging.

{# wf_updated_on: 2020-07-31 #}
{# wf_published_on: 2017-11-15 #}
{# wf_blink_components: N/A #}

# Troubleshoot and debug {: .page-title }

Building a service workers can be challenging, especially when starting out.
This page will cover a few general resources for debugging service workers,
focused on Chrome's Developer Tools, and explain how to enable additional
debugging when using with Workbox.

## Get to know the available tools

### Chrome & Edge

Chrome (and recent versions of Edge, featuring a similar underlying codebase)
have a robust set of Developer Tools for inspecting service workers and the
Cache Storage API. The following resources provide an overview of those tools
and tips for how to use Chrome's Developer Tools effectively:

- [Debug Progressive Web Apps](/web/tools/chrome-devtools/progressive-web-apps)
- [Inspect Network Activity In Chrome DevTools](/web/tools/chrome-devtools/network)
- Video: [Debugging Service Workers in Chrome](https://www.youtube.com/watch?v=tuRPSaSiK_c)
- Codelab: [Debugging Service Workers](https://codelabs.developers.google.com/codelabs/debugging-service-workers/index.html)

### Firefox

Firefox users can refer to the following resources:

- [Debugging service workers using the Firefox DevTools Application Panel](https://developer.mozilla.org/en-US/docs/Tools/Application/Service_workers)
- Video: [Debugging Service Workers in Firefox](https://www.youtube.com/watch?v=ranU2qe1JVA)

### Safari

Safari users currently have a more limited set of Developer Tools available for
debugging service workers. You can learn more about them at:

- [Workers at Your Service](https://webkit.org/blog/8090/workers-at-your-service/#post-8090:~:text=Web%20Inspector%20supports%20debugging%20service%20workers.)
- Video: [Debugging Service Workers in Safari](https://www.youtube.com/watch?v=87RU7v6Y-bk)

## Debugging Workbox

If you are finding it difficult to debug something specific to Workbox, rather
than a general service worker problem, there are a few things you can do to get
some extra logging information via the libraries' development builds.

Note: to prevent all Workbox messages from being logged to the console when in
development mode, you can set the variable `self.__WB_DISABLE_DEV_LOGS` to
`true` in your service worker.

### Bundled Workbox runtime usage

If you're using
[`generateSW`](/web/tools/workbox/modules/workbox-build#generatesw_mode)/[`GenerateSW`](/web/tools/workbox/modules/workbox-webpack-plugin#generatesw_plugin)
with Workbox v5+ to create your bundled service worker, then you can toggle
between the development and production builds of Workbox by changing the
[`mode` parameter](/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW#parameter_1:~:text=patterns.-,mode).

If you're bundling your own copy of the Workbox libraries, you can
[learn more](/web/tools/workbox/guides/using-bundlers#configure_your_bundler_for_a_development_or_production_build)
about using `NODE_ENV` to switch between the production and development builds.

### Legacy workbox-sw usage

If you are loading Workbox via
[`workbox-sw`](/web/tools/workbox/modules/workbox-sw), then you have dynamic
control over whether the development or production builds are run.

By default, `workbox-sw` will detect whether your service worker is currently
running on `http://localhost`, and use that as a signal to load the development
builds of the Workbox libraries. Otherwise, the production builds will be used.

You can explicitly override this default behavior, and explicitly control
whether the production or development builds are loaded, via
[`workbox.setConfig()`](/web/tools/workbox/modules/workbox-sw#force_use_of_debug_or_production_builds):

```javascript
importScripts('{% include "web/tools/workbox/_shared/workbox-sw-cdn-url.html" %}');

// This needs to come before any other workbox.* methods.
workbox.setConfig({
  debug: true,
});

// Now use workbox.routing.*, workbox.precaching.*, etc.
```

## Stack Overflow

If you are still struggling to figure out your problem, try posting a question
to [Stack Overflow with the `workbox` tag](https://stackoverflow.com/questions/ask?tags=workbox).
This enables a wide audience of people to view, answer and learn from your
question.
