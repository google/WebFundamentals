project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to generate a complete service worker with Workbox CLI.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2018-06-08 #}
{# wf_published_on: 2017-11-15 #}

# Generate a Complete Service Worker with Workbox CLI {: .page-title }

This page explains how to use the Workbox Command Line Interface (a.k.a the
Workbox CLI) to generate a complete service worker with support for precaching
files and setup runtime caching.

<aside class="note"><b>Note:</b> You'll need to have
<a href="https://nodejs.org/en/download/">Node installed</a> to use the
Workbox CLI.</aside>

{% include "web/tools/workbox/guides/_shared/install-cli.html" %}

## Run the Wizard

The next step is to run the wizard. This will setup the CLi to work for your
project. The wizard will ask a set of questions about your projects file
structure which'll be used to determine the files that should be precached.

Start the wizard like so:

<pre class="devsite-terminal">
workbox wizard
</pre>

## Generate a Service Worker

Now that the wizard has run and created a configuration file, we can generate
a service worker like so:

<pre class="devsite-terminal">
workbox generateSW workbox-config.js
</pre>

This will generate a service worker with precaching setup to cache your sites
files for offline use.

In your web page, you can register this service worker by adding:

{% include "web/tools/workbox/guides/_shared/register-sw.html" %}

## Adding Runtime Caching

There may be files that you don't want to precache but will be used by
your webapp that you'd like cache at runtime. Images are a great example.

Instead of precaching all images for your site, which will take up a lot of
space in the cache, you can cache them as they are used and limit the number
of images cached.

To do this, edit the config file used to generate the service worker, by default
this is `workbox-config.js`.

Runtime caching can be achieved by adding the `runtimeCaching` options. This
expects an array of objects that describe the runtime caching rules you want.

In the example below, we'll demonstrate how to cache images and limit that
cache to a maximum of 10 images.

```javascript
module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    '**/*.{html,json,js,css}'
  ],
  swDest: 'build/sw.js',

  // Define runtime caching rules.
  runtimeCaching: [{
    // Use a custom cache name.
    cacheName: 'images',

    // Match any request ends with .png, .jpg, .jpeg or .svg.
    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

    // Apply a cache-first strategy.
    handler: 'cacheFirst',

    options: {
      // Only cache 10 images.
      expiration: {
        maxEntries: 10,
      },
    },
  }],
};
```

The full set of available options can be found on the
[Workbox CLI module page](/web/tools/workbox/modules/workbox-cli).

<aside class="note"><b>Note:</b> Please ensure that whenever you update your
site you re-run `workbox generateSW` as this will unsure your service worker
caches the latest files.</aside>
