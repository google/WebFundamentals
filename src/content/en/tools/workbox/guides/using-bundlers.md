project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: Using build tools to bundle the Workbox runtime into a custom service worker.

{# wf_published_on: 2019-02-24 #}
{# wf_updated_on: 2020-08-25 #}
{# wf_blink_components: N/A #}

# Using bundlers with Workbox {: .page-title }

Starting with the [v5 release](https://github.com/GoogleChrome/workbox/releases/tag/v5.0.0), Workbox can be used inside of a service worker source file via [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

Using Workbox in this fashion allows you to pull in precisely the bits of Workbox that you plan on using, and leads to a smaller overall service worker file. Creating your own bundles of the Workbox runtime libraries also means that you don't need to load the Workbox runtime from third-party web servers.

## Creating a service worker bundle

### Choose a bundler

Any [bundler that supports JavaScript modules](https://bundlers.tooling.report/) will work when bundling the Workbox runtime libraries. Some popular choices include:

- [webpack](https://webpack.js.org/)
- [Rollup](https://rollupjs.org/guide/en/)
- [Parcel](https://parceljs.org/)

If you're already using a bundler for other parts of your web app, then using the same one for your service worker as part of your existing build process should work fine.

Please consult the documentation for each bundler to learn more about general configuration. There are a few Workbox-specific build options that are explained in the following sections.

### Write your service worker source code

The following example is a hypothetical service worker source file that imports a few different Workbox libraries. This source file needs to be processed by a bundler before it can be run in a browser.

```javascript
// These JavaScript module imports need to be bundled:
import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';

// Use the imported Workbox libraries to implement caching,
// routing, and other logic:
precacheAndRoute(self.__WB_MANIFEST);
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({cacheName: 'images'}),
);

// Etc.
```

### Configure your bundler for a development or production build

Workbox supports additional logging intended for development environments, and a quieter logging mode (with minifiable code that leads to a smaller runtime size) for production environments. Workbox does this by including references to `process.env.NODE_ENV` inside of its source code, and disables logging when that variable is set to `'production'`.

Your bundler is responsible for replacing `process.env.NODE_ENV` inside of Workbox's runtime code with either `'development'` or `'production'`. Here are details on how different bundlers handle this replacement:

- [webpack](https://webpack.js.org/guides/production/#specify-the-mode)
- [Rollup](https://github.com/rollup/plugins/tree/master/packages/replace#readme)
- [Parcel](https://parceljs.org/env.html)

## Optional: inject a precache manifest

Some developers use Workbox for [precaching](/web/tools/workbox/modules/workbox-precaching), which adds entries to a cache during service worker [installation](/web/fundamentals/primers/service-workers/lifecycle#install). If you use precaching, Workbox needs a [specially formatted list](/web/tools/workbox/modules/workbox-precaching#explanation_of_the_precache_list) of URLs and revision information in order to determine what gets cached. This list is known as a precache manifest.

The precache manifest is commonly generated during your build process, and then swapped in to your service worker code. The convention is to use the symbol `self.__WB_MANIFEST` as a placeholder for where the manifest will be injected.

Replacing `self.__WB_MANIFEST` with the precache manifest isn't technically part of bundling, but bundling often happens as part of a larger build process. It's common to want to both bundle your service worker and perform the precache manifest injection using the same build tools.

### webpack setup

The [`InjectManifest` plugin](/web/tools/workbox/modules/workbox-webpack-plugin#injectmanifest_plugin) handles both bundling and also injecting the precache manifest for you. When using this plugin, you don't have to configure your service worker source code as a [separate entry](https://webpack.js.org/concepts/entry-points/).

### Rollup setup

[`rollup-plugin-workbox-inject`](https://github.com/chromeos/static-site-scaffold-modules/blob/master/modules/rollup-plugin-workbox-inject/README.md) handles the precache manifest injection step for you, and assumes that you've already configured Rollup to bundle your service worker source file.

Note: [`rollup-plugin-workbox`](https://github.com/modernweb-dev/web/tree/master/packages/rollup-plugin-workbox#injectmanifest) can perform a similar replacement with a slightly different interface and set of options. Feel free to use either!

### CLI setup

Instead of using a bundler plugin, you can run [`workbox-cli`](/web/tools/workbox/modules/workbox-cli) in [`injectManifest` mode](/web/tools/workbox/modules/workbox-cli#injectmanifest).

If you take this approach, you should run the `injectManifest` step immediately following each successful build, passing in your freshly bundled service worker file as the `swSrc` option

## GenerateSW handles bundling for you

If you're using `generateSW` mode in either `workbox-build` or `workbox-cli`, or `GenerateSW` in `workbox-webpack-plugin`, then you don't need to configure bundling. Those tools will automatically generate a browser-ready service worker for you. Under the hood, Rollup is automatically used to produce the final bundle, based on the declarative configuration you provide.

## Examples

These examples feature build processes that use bundling, and in some cases also inject a precache manifest into the built service worker file.

- [https://github.com/GoogleChromeLabs/so-pwa](https://github.com/GoogleChromeLabs/so-pwa) (Rollup)
- [https://github.com/jeffposnick/jeffposnick.github.io](https://github.com/jeffposnick/jeffposnick.github.io) (Rollup)
- [https://gist.github.com/jeffposnick/fc761c06856fa10dbf93e62ce7c4bd57](https://gist.github.com/jeffposnick/fc761c06856fa10dbf93e62ce7c4bd57) (webpack)

## Using the CDN is an alternative to bundling

While we expect that most developers will eventually migrate to a bundler approach, using the Workbox runtime code from the official CDN, loaded via `workbox-sw`, remains a supported alternative. For more information, please see the [`workbox-sw` documentation](/web/tools/workbox/modules/workbox-sw).
