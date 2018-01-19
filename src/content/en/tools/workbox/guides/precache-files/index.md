project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to precache files with Workbox.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2017-12-01 #}
{# wf_published_on: 2017-11-15 #}

<style>
/* These are used to make the tabs act more like documentation toggles */
.ui-datasection-main {
  border: none;
}

.ui-datasection-main > section {
  padding: 0;
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

First we'll look at how to create the list of files to precache and then
we'll look at some of the configuration options available for precaching.

### Generating a Precache Manifest

Most users of Workbox will generate the list of files to precache by using
one of the following Workbox tools:

- [Workbox CLI](../modules/workbox-cli)
- [workbox Build](../modules/workbox-build)
- [Workbox Webpack Plugin](../modules/workbox-webpack-plugin)

You can however create the list of files to precache using any other
tool it just has to follow a specific format, which is covered in 
"Custom".

After you've run the wizard we'll need to add the location of our service
worker to the config file. Notice the `swSrc` entry added to the workbox
config.

```javascript
module.exports = {
  "globDirectory": "app/",
  "globPatterns": [
    "**/*.{html,ico,svg,png,js,css}"
  ],
  "swDest": "dist/sw.js",
  "swSrc": "app/sw.js"
};
```

With this, you can run the `injectManifest` command that will read the file
defined in `swSrc` and generate a version of it with the manifest to the
location defined in `swDest`.

In this case it will take `app/sw.js`, inject the manifest and write the file
to `dist/sw.js`.

When the inject manifest command is run, it'll print up some stats on the
number of files and the total size.

<pre class="devsite-terminal">
workbox injectManifest workbox-config.js
The service worker was written to dist/sw.js
11 files will be precached, totalling 43.5 kB.
</pre>

Run the `workbox injectManifest` command before you deploy your site to ensure
the precache list is up to date.

### Using workbox-build

The `workbox-build` module provides a method to inject the precache manifest
into your service worker.

This module is the best option if you currently have a Node based build process
for your project (i.e. you are using a tool like [Gulp](https://gulpjs.com/)).

To install the module just run:

<pre class="devsite-terminal">
npm install workbox-build --save-dev
</pre>

Then in your build process you'll want to `require` in the module and
use the
[injectManifest method](../reference-docs/latest/module-workbox-build#.injectManifest)
to read in your service worker and output a version with the injected manifest.

```javascript
const workboxBuild = require('workbox-build');

workboxBuild.injectManifest({
  swSrc: path.join(__dirname, 'app', 'sw.js'),
  swDest: path.join(__dirname, 'dist', 'sw.js'),
  injectionPointRegexp: /(\.precacheAndRoute\()\s*\[\s*\]\s*(\))/,
})
.catch((err) => {
  console.error(`Unable to inject the precache manifest into sw.js`);
  throw err;
});
```

Running this will read in `app/sw.js` and output a version of it to `dist/sw.js`
with the manifest injected into it.

To use this in Gulp, you would do the following:

```javascript
const workboxBuild = require('workbox-build');
const gulp = require('gulp');

gulp.task('build-sw', () => {
  return workboxBuild.injectManifest({
    swSrc: path.join(__dirname, 'app', 'sw.js'),
    swDest: path.join(__dirname, 'dist', 'sw.js'),
    injectionPointRegexp: /(\.precacheAndRoute\()\s*\[\s*\]\s*(\))/,
  })
  .catch((err) => {
    console.error(`Unable to inject the precache manifest into sw.js`);
    throw err;
  });
});
```

### Using workbox-webpack-plugin

**The webpack plugin has a different behavior to the CLI and workbox-build.**

To use the webpack plugin you'll first need to install the plugin.

<pre class="devsite-terminal">
npm install workbox-webpack-plugin --save-dev
</pre>

Then you'll need to add it to your webpack config.

```javascript
const workboxPlugin = require('workbox-webpack-plugin');

...

plugins: [
  ...

  new workboxPlugin({
    swSrc: './src/sw.js',
    swDest: './dist/sw.js',
    globDirectory: './dist/',
    globPatterns: ['**/*.{html,js,css}'],
  })
]
...
```

Then in your service worker, you'll need to add the following:

```javascript
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
```

When the plugin is run, it'll add an `importScripts()` that will include
a file that provides `self.__precacheManifest`. This will be the list of
files to precache.


### Configuring Precaching

Workbox Precaching has some baked in behaviors that work for the
most common use cases but you can be alter or disable these 
features if needed.

#### TODO: Fix the next section

It's fairly common to have an `index.html` file that is served when a
url ending in a `/` is request or support for `/about.html` being accessible
by `/about.html`.

By default, when a file is requested precaching will manipulate the URL
in several ways to attempt to match against a precache URL.

For example, `/?utm_=123` would be tested for the following URLs:

1. `/?utm_=123` (First it checks the URL as is)
1. `/` (Then it will check the URL with ignore URL Params)
1. `/index.html` (If the URL ends in a slash it will attempt the request
the `index.html`)
1. `/.html` (Lastly it checks the URL with .html on the end which is
useful for clean URLs such as `/about` matching `/about.html`)

These changes to the input URL can be altered and opted out of with
configuration like so:

```javascript
workbox.precaching.precacheAndRoute(
  [
    '/styles/index.0c9a31.css',
    '/scripts/main.0d5770.js',
    { url: '/index.html', revision: '383676' },
  ],
  {
    ignoreUrlParametersMatching: /.*/
    directoryIndex: null,
    cleanUrls: false,
    urlManipulaion: ({url}) => {
      ...
      return alteredUrl;
    }
  }
);
```

Below is a look at each of these options.

### Ignoring Search Parameters

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

### Change the Directory Index

Precache will add `index.html` to URL's ending in `/` *if* no match
in the precache can be found. If you want to change the addition, you
can pass in a different string:

```javascript
workbox.precaching.precacheAndRoute(
  [
    { url: '/index.php', revision: '6821e0' }
  ],
  {
    directoryIndex: 'index.php',
  }
);
```

You can **disable this behaviour** by setting `directoryIndex` to `null`.

### Supporting Clean URLs

It's not uncommon for backends to support "pretty" or "clean" URL's where a 
request like `/about` would be responded to with the contents of a static
file like `/about.html`. By default, Workbox precaching will do this when
checking for matches in the precache.

By default this logic is applied but you can turn if off like so:

```javascript
workbox.precaching.precacheAndRoute(
  [
    { url: '/index.php', revision: '6821e0' }
  ],
  {
    cleanUrls: false,
  }
);
```

### Custom URL to Precache Matching

If you need to customise the logic that matches a URL request
to the file in the precache, you can use the `urlManipulation` 
callback to define what should be checked for in the precache
list.

```javascript
workbox.precaching.precacheAndRoute(
  [
    { url: '/index.php', revision: '6821e0' }
  ],
  {
    urlManipulation: ({url}) => {
      // TODO: Alter the URL some how.
      return alteredUrl;
    },
  }
);
```

**You can also return an array of URLs** if there are
multiple possible matches that you would like to match for.
