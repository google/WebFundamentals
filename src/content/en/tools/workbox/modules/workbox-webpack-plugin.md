project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-webpack-plugin.

{# wf_updated_on: 2020-02-03 #}
{# wf_published_on: 2017-12-15 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Workbox webpack Plugins  {: .page-title }

Workbox provides two [webpack](https://webpack.js.org/) plugins: one that
generates a complete service worker for you and one that generates a list
of assets to precache that is injected into a service worker file.

The plugins are implemented as two classes in the `workbox-webpack-plugin` module, named
`GenerateSW` and `InjectManifest`. The answers to the following questions can help you choose the
right plugin and configuration to use.

## Which Plugin to Use

### GenerateSW

The `GenerateSW` plugin will create a service worker file for you and
add it to the webpack asset pipeline.

{% include "web/tools/workbox/_shared/when-to-use-generate-sw.html" %}

### InjectManifest

The `InjectManifest` plugin will generate a list of URLs to precache and
add that precache manifest to an existing service worker
file. It will otherwise leave the file as-is.

{% include "web/tools/workbox/_shared/when-to-use-inject-manifest.html" %}

## GenerateSW Plugin

You can add the `GenerateSW` plugin to your webpack config like so:

```javascript
// Inside of webpack.config.js:
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new GenerateSW()
  ]
};
```

This will generate a service worker with precaching setup for all of your
webpack assets.

### Full GenerateSW Config

If you want to use any of the configuration options for the `GenerateSW` plugin,
you'd just need to add an `Object` to the plugin's constructor.

For example:

```javascript
// Inside of webpack.config.js:
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new GenerateSW({
      option: 'value',
    })
  ]
};
```

A full set of configuration options can be found on
[this reference page](/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW.html#GenerateSW).

## InjectManifest Plugin

You can add the `InjectManifest` plugin to your webpack config like so:

```javascript
// Inside of webpack.config.js:
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new InjectManifest({
      swSrc: './src/sw.js',
    })
  ]
};
```

This will create a precache manifest (a list of webpack assets) and inject it into
your service worker file via `importScripts()`.

### Full InjectManifest Config

You can pass the appropriate configuration as properties of an `Object` to the plugin's constructor.

For example:

```javascript
// Inside of webpack.config.js:
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new InjectManifest({option: 'value'})
  ]
};
```

A full set of configuration options can be found on
[this reference page](/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.InjectManifest#InjectManifest).

## Extra Info

Guidance on using the plugins within the context of a larger webpack build can be found in the
"[Progressive Web Application](https://webpack.js.org/guides/progressive-web-application/)" section
of the webpack documentation.
