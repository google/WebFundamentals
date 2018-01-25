project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to generate a complete service worker with workbox-build.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2018-01-25 #}
{# wf_published_on: 2017-11-15 #}

# Generate a Service Worker with workbox-build {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

This page explains how to use the workbox-build Node module to generate a
complete service worker with precaching and runtime caching.

<aside class="note"><b>Note:</b> You'll need to have
<a href="https://nodejs.org/en/download/">Node installed</a> to use
workbox-build.</aside>

{% include "web/tools/workbox/guides/_shared/install-workbox-build.md" %}

## Call <code>generateSW()</code>

To generate a service worker, you need to add `workbox-build.generateSW()`
to your build process or Node script:

```javascript
const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.generateSW({
    globDirectory: 'build',
    globPatthers: [
      '**\/*.{html,json,js,css}',
    ],
    swDest: 'build/sw.js',
  });
}

buildSW();
```

This command will output a service worker to `build/sw.js` which
will precache all the files in the `build/` directory that match
any of the `globPatterns` defined.

In your webpage, you can register this service worker by adding:

{% include "web/tools/workbox/guides/_shared/register-sw.md" %}

## Adding Runtime Caching

There may be files that you don't want to precache but will be used by
your webapp that you'd like cache at runtime. Images are a great example.

Instead of precaching all images for your site, which will take up a lot of
space in the cache, you can cache them as they are used and limit the number
of images cached.

Runtime caching can be achieved by adding the `runtimeCaching` configuration
to the options passed into `generateSW()`. `runtimeCaching` expects an
array of objects that describe the runtime caching rules you want.

In the example below, we'll demonstrate how to cache images and limit that
cache to a maximum of 10 images.

```javascript
const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.generateSW({
    globDirectory: 'build',
    globPatthers: [
      '**\/*.{html,json,js,css}',
    ],
    swDest: 'build/sw.js',

    // Define runtime caching rules.
    runtimeCaching: [
      {
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
      },
    ],
  });
}

buildSW();
```

The full set of available options can be found on the
[workbox-build module page](/web/tools/workbox/modules/workbox-build).

<aside class="note"><b>Note:</b> Please ensure that whenever you update your
site you re-run `workbox generateSW` as this will unsure your service worker
caches the latest files.</aside>

## Using with Gulp

Using `workbox-build` with your Gulp process is simply a case of using the same
code as above as a Gulp task..

```javascript
const gulp = require('gulp');
const workboxBuild = require('workbox-build');

gulp.task('service-worker', () => {
  return workboxBuild.generateSW({
    globDirectory: 'build',
    globPatthers: [
      '**\/*.{html,json,js,css}',
    ],
    swDest: 'build/sw.js',
  });
});
```

After this you can simply run the task via `gulp service-worker` or add it
to the end of another Gulp task.
