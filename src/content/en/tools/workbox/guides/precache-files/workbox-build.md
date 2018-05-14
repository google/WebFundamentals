project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to precache files with workbox-build.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2018-03-13 #}
{# wf_published_on: 2017-11-15 #}

# Precache Files with workbox-build {: .page-title }

This page explains how to use the workbox-build Node module to generate the
list of files to precache and add it to your service worker.

<aside class="note"><b>Note:</b> You'll need to have
<a href="https://nodejs.org/en/download/">Node installed</a> to use
workbox-build.</aside>

{% include "web/tools/workbox/guides/_shared/install-workbox-build.html" %}

## Add an Injection Point

Before the files can be "injected" into your service worker, you need to add
this line of code to your service worker file:

```javascript
workbox.precaching.precacheAndRoute([]);
```

This piece of code will be replaced by workbox-build with the list of files (See
the next section).

## Call <code>injectManifest()</code>

The final step is to add workbox-build to your build process or script:

```javascript
const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{js,css,html,png}',
    ]
  });
}

buildSW();
```

This command will create a list of files to precache, read in your service
worker file, inject the manifest and output a new service worker file with
the manifest. The result should look something like this:

<pre class="prettyprint lang-javascript"><code>workbox.precaching.precacheAndRoute([
  {
    "url": "basic.html",
    "revision": "7ca37fd5b27f91cd07a2fc68f20787c3"
  },
  {
    "url": "favicon.ico",
    "revision": "1378625ad714e74eebcfa67bb2f61d81"
  },
  {
    "url": "images/hamburger.svg",
    "revision": "d2cb0dda3e8313b990e8dcf5e25d2d0f"
  },

  ...

]);</code></pre>

Please ensure that you build the service worker after a file change to
ensure your users get the latest files.

## Using with Gulp

Using `workbox-build` with your Gulp process is simply a case of using the same
code as above.

```javascript
const gulp = require('gulp');
const workboxBuild = require('workbox-build');

gulp.task('service-worker', () => {
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{js,css,html,png}',
    ]
  });
});
```

After this you can simply run the task via `gulp service-worker` or add it
to the end of another Gulp task.

{% include "web/tools/workbox/guides/_shared/precache-config.html" %}
