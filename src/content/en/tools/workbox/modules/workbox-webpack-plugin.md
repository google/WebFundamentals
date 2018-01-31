project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-webpack-plugin.

{# wf_updated_on: 2018-01-18 #}
{# wf_published_on: 2017-12-15 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Workbox webpack Plugins  {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

## What are the Workbox webpack Plugins?

They are plugins for [webpack](https://webpack.js.org/), which generate a list of URLs to
[precache](/web/tools/workbox/guides/precache-files) (known as a "precache manifest") based on the
assets in a webpack compilation.

Guidance on using the plugins within the context of a larger webpack build can be found in the
"[Progressive Web Application](https://webpack.js.org/guides/progressive-web-application/)" section
of the webpack documentation.

## Considerations

There are two different plugins within the `workbox-webpack-plugin` module: `GenerateSW` and
`InjectManifest`. The answers to the following questions can help you choose the right plugin and
configuration to use.

### Should the plugin create your service worker file?

The `GenerateSW` plugin will create a service worker file for you and automatically add it to the
webpack asset pipeline.

{% include "web/tools/workbox/_shared/when-to-use-generate-sw.md" %}

The `InjectManifest` plugin will generate a list of URLs to precache and add a reference to that
precache manifest, along with a reference to the Workbox runtime code, to an existing service worker
file (specified via `swSrc`). It will otherwise leave the file as-is.

{% include "web/tools/workbox/_shared/when-to-use-inject-manifest.md" %}

### Do you need to cache additional, non-webpack assets?

By default, both plugins generate a precache manifest that contains URLs for assets created by the
current webpack compilation. Any assets that webpack doesn't "know" about will not be picked up.

If you need to precache additional assets that are managed outside of webpack, then you can
use the `globDirectory` and `globPatterns` options to specify how to find those additional assets.

If you decide to use `globDirectory` and `globPatterns`, the following applies:

- The [`glob` pattern matching](https://github.com/isaacs/node-glob#glob-primer) will be performed
against the local file system, and the directory that `globDirectory` is set to must exist at the
time the plugin runs. This might run afoul of
[`webpack-dev-server` configurations](https://github.com/webpack/webpack-dev-server), where an
in-memory file system is used.
- The options that work with `glob`-based precache manifests, like `manifestTranforms` and
`modifyUrlPrefix`, can also be used, but they'll apply **only** to the entries that are matched via
`glob` patterns, and not to any assets that are picked up via the webpack compilation.

## Configuration

### GenerateSW Plugin

You can pass the appropriate configuration as properties of an `Object` to the plugin's constructor.
For example:

    // Inside of webpack.config.js:
    const {GenerateSW} = require('workbox-webpack-plugin');

    module.exports = {
      // Other webpack config...
      plugins: [
        // Other plugins...
        GenerateSW({option: 'value'})
      ]
    };

<table class="responsive">
  <tbody>
    <tr>
      <th colspan="2">These options apply to the webpack compilation.</th>
    </tr>
{% include "web/tools/workbox/_shared/config/groups/common-webpack.html" %}
    <tr>
      <th colspan="2">These options configure behavior unrelated to the webpack compilation.</th>
    </tr>
{% include "web/tools/workbox/_shared/config/groups/common-generate-schema.html" %}
{% include "web/tools/workbox/_shared/config/groups/base-schema.html" %}
  </tbody>
</table>

### InjectManifest Plugin

You can pass the appropriate configuration as properties of an `Object` to the plugin's constructor.
For example:

    // Inside of webpack.config.js:
    const {InjectManifest} = require('workbox-webpack-plugin');

    module.exports = {
      // Other webpack config...
      plugins: [
        // Other plugins...
        InjectManifest({option: 'value'})
      ]
    };

<table class="responsive">
  <tbody>
    <tr>
      <th colspan="2">These options are specificly for the webpack compilation.</th>
    </tr>
{% include "web/tools/workbox/_shared/config/groups/common-webpack.html" %}
    <tr>
      <th colspan="2">These options configure behavior unrelated to the webpack compilation.</th>
    </tr>
{% include "web/tools/workbox/_shared/config/groups/common-inject-schema.html" %}
{% include "web/tools/workbox/_shared/config/groups/base-schema.html" %}
  </tbody>
</table>
