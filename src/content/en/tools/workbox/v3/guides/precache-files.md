project_path: /web/tools/workbox/v3/_project.yaml
book_path: /web/tools/workbox/v3/_book.yaml
description: A guide on how to precache files with Workbox.

{# wf_updated_on: 2017-11-15 #}
{# wf_published_on: 2017-11-15 #}

# Precache Files {: .page-title }

If you want your web app to work offline or there are assets you know can be
cached for a long time, precaching is the best approach.

Precaching a file will ensure that a file is downloaded and cached before a
service worker is installed, meaning that if you service worker is installed,
your files will be cached.

Workbox provides an easy way to precache files, ensuring that as your service
worker changes, the precached files are maintained efficiently, only
downloaded updated files and cleaning up after the service worker is made
redundant.

```javascript
workbox.precaching.preacheAndRoute([
    '/styles/index.0c9a31.css',
    '/scripts/main.0d5770.js',
    { url: '/index.html', revision: '383676' },
]);
```

This command will download the files `/styles/index.0c9a31.css`,
`/scripts/main.0d5770.js` and `/index.html` during the service worker install
event and then create a route that serves these files directly from the cache.

First we'll cover some of the options that relate to precaching before looking
at how you can generate a list of files to precache (we call this array of
files the "precache manifest").

## Handling "/" and "/index.html"

It's fairly common to have an `index.html` file that is served when a
url ending in a `/` is request.

By default, the *precache route *will append an `index.html` to any url ending
in a slash to check if it's precached as `index.html`. This means that any
`index.html` file you've precached will be accessible via `/index.html` or `/`.

You can alter this behavior by changing the
[directoryIndex option](../reference-docs/latest/workbox.precaching#.addRoute).
For example, if you wanted to disable this behaviour, you can pass in null.

```javascript
workbox.precaching.precacheAndRoute(
  [
    '/styles/index.0c9a31.css',
    '/scripts/main.0d5770.js',
    { url: '/index.html', revision: '383676' },
  ],
  {
    directoryIndex: null,
  }
);
```

## Ignoring Search Parameters

By default Workbox will treat URL's as different if the search parameters are
different. This means that if you precached `/index.html` and someone made a
request for `/index.html?example=search`, Workbox **wouldn't** match the URL
with the precached file.

You can alter this behavior with the `ignoreUrlParametersMatching` option
which will remove any search parameters matching a regex in this option.

For example, if we wanted to convert the URL `/example.html?key1=1&key2=2`
such that `key1` wasn't a part of the URL, you set the
`ignoreURLParametersMatching` option to remove it, like so:

```javascript
workbox.precaching.precacheAndRoute(
  [
    { url: '/example.html?key2=2', revision: '6821e0' }
  ],
  {
    ignoreUrlParametersMatching:[/key1/],
  }
);
```

By default, this is set to `[/^utm_/]` to ensure tracking metrics don't
affect precaching. If you wanted to ignore all search parameters you use
the regex `[/./]`.

## Generating the Precache Manifest

Most users of Workbox will generate the list of files to precache by using
one of the following Workbox tools:

- [Workbox CLI](../modules/workbox-cli)
- [workbox Build](../modules/workbox-build)
- [Workbox Webpack Plugin](../modules/workbox-webpack-plugin)

In the rest of this document we'll cover how you can use these tools to
generate the precache manifest and inject it in your service worker, but
it's worth noting that this list can be generated from other tools, the
format just needs to be `{url: '<URL of file to precache>', revision:
'<Hash of the file contents>' }`. You just need to ensure that any change
you make to a file updates the revision otherwise files will fail to be
updated when you update your service worker, see the
[workbox.precaching for more info](../modules/workbox-precaching).

The [Workbox CLI](../modules/workbox-cli),
[Workbox Build](../modules/workbox-build) and
[Workbox WebPack Plugin](../modules/workbox-webpack-plugin)
modules provide methods to generate a complete service worker for you.
This is perfect for a wide range of use cases, especially static sites. If
this sounds like something you want, stop reading this guide
and check out
[Generate a Complete Service Worker Guide](./generate-complete-sw).

### Using the Workbox CLI

TODO: How to inject manifest

### Using workbox-build

TODO: How to inject manifest

### Using the webpack Plugin

TODO: How to inject manifest

TODO: Handling Revisioned URLs
