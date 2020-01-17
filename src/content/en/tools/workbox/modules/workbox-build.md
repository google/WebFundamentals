project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-build.

{# wf_updated_on: 2020-01-17 #}
{# wf_published_on: 2018-01-31 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Workbox Build {: .page-title }

The `workbox-build` module integrates into a node-based build process and can generate an entire
service worker, or just generate a list of assets to precache that could be used within an existing
service worker.

The two modes that most developers will use are `generateSW` and `injectManifest`. The answers to
the following questions can help you choose the right mode and configuration to use.

## Which Mode to Use

### generateSW

The `generateSW` mode creates a service worker file for you, and writes it out to disk.

{% include "web/tools/workbox/_shared/when-to-use-generate-sw.html" %}

### injectManifest

The injectManifest mode will generate a list of URLs to precache, and add that precache manifest to
an existing service worker file. It will otherwise leave the file as-is.

{% include "web/tools/workbox/_shared/when-to-use-inject-manifest.html" %}

## generateSW Mode

You can use the `generateSW` mode within a node-based build script like so:

```javascript
// Inside of build.js:
const {generateSW} = require('workbox-build');

const swDest = 'build/sw.js';
generateSW({
  swDest,
  // Other configuration options...
}).then(({count, size}) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});
```

This will generate a service worker with precaching setup for all of the files picked up by your
configuration.

### Full generateSW Config

A full set of configuration options can be found on
[this reference page](/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW).

## injectManifest Mode

You can use the `injectManifest` mode within a node-based build script like so:

```javascript
// Inside of build.js:
const {injectManifest} = require('workbox-build');

const swSrc = 'src/sw.js';
const swDest = 'build/sw.js';
injectManifest({
  swSrc,
  swDest,
  // Other configuration options...
}).then(({count, size}) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});
```

This will create a precache manifest based on the files picked up by your configuration and inject
it into your existing service worker file.

### Full injectManifest Config

A full set of configuration options can be found on
[this reference page](/web/tools/workbox/reference-docs/latest/module-workbox-build#.injectManifest).

## Additional modes

We expect that `generateSW` or `injectManifest` will suit most developers' needs. However, there is
one other mode supported by `workbox-build` that might be appropriate for certain use cases.

### getManifest Mode

This is conceptually similar to the `injectManifest` mode, but instead of adding the manifest into
the source service worker file, it returns the array of manifest entries, along with information
about the number of entries and total size.

You can use the `getManifest` mode within a node-based build script like so:

```javascript
// Inside of build.js:
const {getManifest} = require('workbox-build');

getManifest({
  // Configuration options...
}).then(({manifestEntries, count, size}) => {
  // Do something with the manifestEntries, and potentially log count and size.
});
```

A full set of configuration options can be found on
[this reference page](/web/tools/workbox/reference-docs/latest/module-workbox-build#.getManifest).
