project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to precache files with Workbox.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2018-01-22 #}
{# wf_published_on: 2017-11-15 #}

<style>
  .button-primary {
    background-color: #fb8c00;
  }
</style>

# Precache Files {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

If you want your web app to work offline or there are assets you know can be
cached for a long time, precaching is the best approach.

Precaching a file will ensure that a file is downloaded and cached before a
service worker is installed, meaning that if your service worker is installed,
your files will be cached.

Workbox provides an easy way to precache files, ensuring that as your service
worker changes, the precached files are maintained efficiently, only
downloading updated files and cleaning up after the service worker is made
redundant.

Precaching files with Workbox can be done like so:

```javascript
workbox.precaching.preacheAndRoute([
    '/styles/index.0c9a31.css',
    '/scripts/main.0d5770.js',
    { url: '/index.html', revision: '383676' },
]);
```

The above snippet will download the files `/styles/index.0c9a31.css`,
`/scripts/main.0d5770.js` and `/index.html` during the service worker install
event and create a route that serves these files directly from the cache.

This list of files is normally generated using a tool that manages the
versioning of files.

### Generating a Precache Manifest

Most users of Workbox will generate the list of files to precache by using
one of the following Workbox tools, although you can use any tools that outputs
files with revisioning. Below is a list of tools that can generate this
list of files.

<aside class="note"><strong>Note:</strong> If you're not sure what option
is best for you, <a href="./cli">start with the CLI</a> as it's easy to setup
and will give you a better understanding of how the other tools work.</aside>

###### Workbox Command Line Interface (CLI)

Ideal for developers who are **unfamiliar with Node** or **have simple needs**.

<a href="./cli" class="button button-primary">Learn how to use the CLI</a>

###### workbox Build

Perfect for developers wanting to **programmatically build the list in Node**
or are **using Gulp** for their build process.

<a href="./workbox-build" class="button button-primary">Learn how to use workbox-build</a>

###### Workbox Webpack Plugin

Ideal for **developers using webpack** to build their project.

<a href="./webpack" class="button button-primary">Learn how to use the Webpack Plugin</a>
