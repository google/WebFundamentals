project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-build.

{# wf_updated_on: 2018-03-15 #}
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

<table class="responsive">
  <tbody>
{% include "web/tools/workbox/_shared/config/single/swDest.html" %}
{% include "web/tools/workbox/_shared/config/groups/common-generate-schema.html" %}
{% include "web/tools/workbox/_shared/config/groups/base-schema.html" %}
  </tbody>
</table>

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

<table class="responsive">
  <tbody>
{% include "web/tools/workbox/_shared/config/single/swDest.html" %}
{% include "web/tools/workbox/_shared/config/groups/common-inject-schema.html" %}
{% include "web/tools/workbox/_shared/config/groups/base-schema.html" %}
  </tbody>
</table>

## Additional modes

We expect that `generateSW` or `injectManifest` will suit most developers' needs. However, there are
two other modes supported by `workbox-build` that might be appropriate for certain use cases.

### generateSWString Mode

This is conceptually similar to the `generateSW` mode, but instead of writing the generated service
worker file to disk, it returns the contents of the service worker as a string.

You can use the `generateSWSring` mode within a node-based build script like so:

```javascript
// Inside of build.js:
const {generateSWString} = require('workbox-build');

generateSWString({
  // Configuration options...
}).then((swString) => {
  // Do something with the generated code in swString.
});
```

The supported configuration options are:

<table class="responsive">
  <tbody>
{% include "web/tools/workbox/_shared/config/groups/generate-sw-string-schema.html" %}
{% include "web/tools/workbox/_shared/config/groups/common-generate-schema.html" %}
{% include "web/tools/workbox/_shared/config/groups/base-schema.html" %}
  </tbody>
</table>

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

The supported configuration options are:

<table class="responsive">
  <tbody>
{% include "web/tools/workbox/_shared/config/groups/get-manifest-schema.html" %}
{% include "web/tools/workbox/_shared/config/groups/base-schema.html" %}
  </tbody>
</table>
