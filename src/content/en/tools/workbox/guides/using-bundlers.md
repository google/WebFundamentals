project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: Advanced recipes to use with Workbox.

{# wf_published_on: 2019-02-24 #}
{# wf_updated_on: 2020-01-21 #}
{# wf_blink_components: N/A #}

# Using Bundlers (webpack/Rollup) with Workbox {: .page-title }

One of the core principles we have for Workbox is to make it as small and
light-weight as possible. We want Workbox to have lots of features, but we don't
want your users to have to download code for features they don't use.

This is why the version of Workbox we release on our CDN is configured to
[automatically only load the packages you're
using](/web/tools/workbox/guides/get-started#importing_workbox)
(via `workbox-sw`) when they're referenced. For example, if your code never
references `workbox.backgroundSync`, then the `workbox-background-sync` package
will not be downloaded.

While only loading the _packages_ being used is a good first step in reducing
your total service worker file size, you can often reduce the total size even
more by only loading the specific modules your code imports.

You can do this using JavaScript bundling tools like
[webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org) to build
your own custom service worker file. This guide will outline the recommended way
to use bundlers with Workbox.

## Importing workbox code into your bundle

When using Workbox without a bundler, you import Workbox into your service
worker file using
[`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts):

<pre class="prettyprint js">
// Import workbox-sw, which defines the global `workbox` object.
importScripts('{% include "web/tools/workbox/_shared/workbox-sw-cdn-url.html" %}');

// Then reference the workbox packages you need, which will dynamically
// call `importScripts()` to load the individual packages.
workbox.precaching.precacheAndRoute([...]);
</pre>

When using a JavaScript bundler, you don't need (and actually shouldn't use) the
`workbox` global or the `workbox-sw` module, as you can import the individual
package files directly.

Here's how you'd import and run the above code using a bundler:

```javascript
// Import just the `workbox-precaching` package.
import {precacheAndRoute} from 'workbox-precaching';

precacheAndRoute([...]);
```

### Determining import file paths

The definitive way to know what file to import is to look at the [package source
code](https://github.com/GoogleChrome/workbox/tree/master/packages), but to make
it so you don't necessarily have to do that, we follow a few conventions that
make it easy to know the path of the file:

* Every [workbox package](/web/tools/workbox/modules/) is released as a
  separate `npm` package with the name converted to
  [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles)
  (e.g. the `workbox.backgroundSync` object maps to the
  `workbox-background-sync` npm package).
* Every property of each package object maps to a module file in the top-level
  package directly with the same name, plus the `.mjs` extension (e.g.
  `workbox.backgroundSync.Queue` is defined in
  `workbox-background-sync/Queue.mjs`).
* Any `.mjs` file in the top-level directory of a workbox package is considered
  part of the public API and can be imported. Files in sub-directories should be
  considered implementation details and should not be relied upon.

### Moving from importScripts to module imports

Here's a more complete example of taking code that uses `importScripts()` versus
the same logic written for a bundler using `import` statements:

<h4 class="hide-from-toc">Using <code>importScripts</code>:</h4>

<pre class="prettyprint js">
importScripts('{% include "web/tools/workbox/_shared/workbox-sw-cdn-url.html" %}');

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);
</pre>

<h4 class="hide-from-toc">Using <code>import</code> via a bundler:</h4>

```javascript
import {registerRoute} from 'workbox-routing/registerRoute.mjs';
import {CacheFirst} from 'workbox-strategies/CacheFirst.mjs';
import {Plugin as ExpirationPlugin} from 'workbox-expiration/Plugin.mjs';

registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);
```

<aside class="caution">
  <strong>Important!</strong>
  When using a bundler to build your service worker, you don't need to import
  the <code>workbox-sw</code> package. The <code>workbox-sw</code> package code
  defines the global <code>workbox</code> object that loads the other workbox
  packages (via <code>importScripts()</code>) when referenced, but if you're
  using a bundler to build your service worker, this is unnecessary (and will
  likely result in loading code twice).
</aside>

## Keeping dev-only code out of the bundle

One of the key developer features that  Workbox offers is its logging, but when
deploying Workbox code to production, you don't want users to pay the price of
downloading that developer-focused code.

In the production builds of Workbox we release on our CDN, we've removed this
code for you. But if you're making your own bundle, you'll need to do this
yourself.

There are two things you should do to ensure dev-only code doesn't end up in a
production bundle:

* Replace instances of `process.env.NODE_ENV` in the source with the string
  `'production'`.
* Using a minifier that will remove falsy conditionals.

To understand how this works, consider this simplified example of what most of
the dev-only code looks like in Workbox:

```javascript
if (process.env.NODE_ENV !== 'production') {
  console.log('This is a dev-only log message!');
}
```

Using something like webpack's
[DefinePlugin](https://webpack.js.org/plugins/define-plugin/) or
[rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace), you
can replace all occurrences of `process.env.NODE_ENV` with the string
'production'. That means the above conditional will turn into the following
block, and a minifier can safely discard the entire block (because it will never
be true that `'production' !=== 'production'`).

```javascript
if ('production' !== 'production') {
  console.log('This is a dev-only log message!');
}
```

The following examples show how you can set up minification and dev-only code
removal in both webpack and Rollup:

### Webpack

```javascript
const webpack = require('webpack');
const Terser = require('terser-webpack-plugin');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  optimization: {
    // Use terser instead of the default Uglify since service
    // worker code does not need to be transpiled to ES5.
    minimizer: [new Terser({
      // Ensure .mjs files get included.
      test: /\.m?js$/,
    })],
    // ...
  },
  // ...
};
```

### Rollup

```javascript
import replace from 'rollup-plugin-replace';
import {terser} from 'rollup-plugin-terser';

export default {
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    terser(),
  ],
  // ...
}
```

## Using bundlers with Workbox's existing build tools

### `workbox-build`

The `workbox-build` package has a mode known as `injectManifest`, which replaces
the string `precacheAndRoute([])` in a file with a reference to the generated
manifest.

The main thing to consider when using a bundler is that if you import the
`precacheAndRoute()` method as a different name, the manifest injection will not
work, and you'd have to manually set your own replace regular expression.

### `workbox-webpack-plugin`

The primary purpose of `workbox-webpack-plugin` is to help developers create a
precache manifest based on the files generated from their webpack build process.

If you also want to use webpack to generate your service worker file (as
described in this article), beware that the `workbox-webpack-plugin`'s
[injectManifest config](/web/tools/workbox/modules/workbox-build#full_injectmanifest_config)
accepts a `swSrc` option that it will update with your precache manifest.

This can be problematic if you're using the same webpack configuration to
generate your service worker file, since it may not exist by the time the
`workbox-webpack-plugin` code runs.

## Code splitting and dynamic imports

Many bundlers today have some form of automatic [code
splitting](/web/fundamentals/performance/optimizing-javascript/code-splitting/)
based on [dynamic imports](/web/updates/2017/11/dynamic-import), where the
bundler automatically determines how to best split up your final JavaScript code
so logic that might not be needed by the user right away can be loaded at a
later time.

If you're using this feature with your bundler and you're also building a
service worker, there are a few important gotchas to consider:

* Most bundlers polyfill a version of the browsers native
  [`import()`](/web/updates/2017/11/dynamic-import) feature, and these polyfills
  are usually based on creating a `<script>` element, which will fail when run
  in a service worker.
* Along the same lines, bundlers today (as of the most recent Workbox version)
  do not support sharing the same modules between the window and a service
  worker. This will not be possible until service worker supports [dynamic
  imports](/web/updates/2017/11/dynamic-import).

Because of this, you should not use the dynamic import syntax in your service
worker's JavaScript.

## ES2015 syntax

One of the main reasons people use bundlers today is to also use transpilers to
convert their modern JavaScript syntax to
[ES5](https://en.wikipedia.org/wiki/ECMAScript#5th_Edition) so it can be run in
older browsers.

Keep in mind that every browser that supports service workers also supports most
[ES2015](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015)
features (the primary exception being `import` statements), so there's usually
no need to transpile your code.

This means you can freely use features like classes and syntax like
`async`/`await` when writing service worker code, which is fantastic as most
service worker APIs are promise-based.

<aside>
  <strong>Note:</strong>
  an exception to this is the <code>workbox-window</code> package, because
  its code will run in the window context, and not in the service worker. For
  specific advice on using <code>workbox-window</code> with JavaScript bundlers,
  see the
  <a href="/web/tools/workbox/modules/workbox-window#loading_workbox_with_javascript_bundlers">
  <code>workbox-window</code> usage guide</a>.
</aside>

## Third-party bundler plugins

The following is a list of bundler plugins that integrate with Workbox. Note:
these plugins are not maintained by the Workbox core team, so they might not be
up-to-date with the most recent Workbox version:

- [rollup-plugin-workbox](https://www.npmjs.com/package/rollup-plugin-workbox)
- [rollup-plugin-workbox-inject](https://www.npmjs.com/package/rollup-plugin-workbox-inject)
