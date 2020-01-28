project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to precache files with Workbox.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2020-01-16 #}
{# wf_published_on: 2017-11-15 #}

<style>
  .button-primary {
    background-color: #fb8c00;
  }
</style>

# Precache Files {: .page-title }

If you want your web app to work offline or there are assets you know can be
cached for a long time, precaching is the best approach.

Precaching a file will ensure that a file is downloaded and cached before a
service worker is installed, meaning that if your service worker is installed,
your files are cached.

Workbox provides an easy way to precache files, ensuring that as your service
worker changes, the precached files are maintained efficiently, only
downloading updated files and cleaning up after the service worker is made
redundant.

The most common way to precache files with Workbox is to call the
[`precacheAndRoute`](/web/tools/workbox/reference-docs/latest/module-workbox-precaching#.precacheAndRoute)
method and pass it a list of URLs along with their revision information:

```javascript
import {precacheAndRoute} from 'workbox-precaching';

precacheAndRoute([
  {url: '/index.html', revision: '383676' },
  {url: '/styles/app.0c9a31.css', revision: null},
  {url: '/scripts/app.0d5770.js', revision: null},
]);
```

The above code will download the files `/styles/app.0c9a31.css`,
`/scripts/app.0d5770.js` and `/index.html` during the service worker install
event and create a route that serves these files directly from the cache.

Notice that the CSS and JS file set their `revision` property to `null`. This is because these files have revision information in the filenames themselves.

This list of files is normally generated using a tool that manages the
versioning of files. The next sections lists the tools the Workbox provides.

### Generating a Precache Manifest

Most users of Workbox will generate the list of files to precache by using
one of the following Workbox tools, although you can use any tool that outputs
files with revisioning. Below is a list of tools that can generate this
list of files.

Note: If you're not sure what option
is best for you, [start with the CLI](./cli) as it's easy to setup
and will give you a better understanding of how the other tools work.

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
