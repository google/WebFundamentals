project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to generate a complete service worker with the Workbox Webpack Plugin.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2019-07-07 #}
{# wf_published_on: 2017-11-15 #}

# Generate a Service Worker with Webpack {: .page-title }

This page explains how to use the `workbox-webpack-plugin` node module to
generate a complete service worker with precaching and runtime caching.

{% include "web/tools/workbox/guides/_shared/install-webpack.html" %}

## Set up your Webpack Config

To generate a service worker as part of your build process, you'll need to add
the plugin to your `webpack.config.js` file like so:

```javascript
// Inside of webpack.config.js:
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...

  plugins: [
    // Other plugins...

    new WorkboxPlugin.GenerateSW()
  ]
};
```

The generated service worker will be set up to precache all the files in your
webpack build.

In your web page, you can register this service worker by adding:

{% include "web/tools/workbox/guides/_shared/register-sw.html" %}

## Adding Runtime Caching

There may be files that you don't want to precache but will be used by
your web app that you'd like to cache at runtime. Images are a great example.

Instead of precaching all images for your site, which will take up a lot of
space in the cache, you can cache them as they are used and limit the number
of images cached.

Runtime caching can be achieved by adding the `runtimeCaching` configuration
to the options passed into `GenerateSW()`. `runtimeCaching` expects an
array of objects that describe the runtime caching rules you want.

In the example below, we'll demonstrate how to cache images and limit that
cache to a maximum of 10 images.

```javascript
// Inside of webpack.config.js:
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...

  plugins: [
    // Other plugins...

    new WorkboxPlugin.GenerateSW({
      // Do not precache images
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],

      // Define runtime caching rules.
      runtimeCaching: [{
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // Apply a cache-first strategy.
        handler: 'CacheFirst',

        options: {
          // Use a custom cache name.
          cacheName: 'images',

          // Only cache 10 images.
          expiration: {
            maxEntries: 10,
          },
        },
      }],
    })
  ]
};
```

The full set of available options can be found on the
[Workbox Webpack module page](/web/tools/workbox/modules/workbox-webpack-plugin).
