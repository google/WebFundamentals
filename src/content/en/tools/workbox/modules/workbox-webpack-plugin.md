project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-webpack-plugin.

{# wf_updated_on: 2017-12-15 #}
{# wf_published_on: 2017-12-15 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Workbox webpack Plugin  {: .page-title }

## What's the Workbox webpack Plugin?

This is a plugin for [webpack](https://webpack.js.org/) which generates a list of URLs to
[precache](/web/tools/workbox/guides/precache-files) (known as a "precache manifest") based on the
assets in a webpack compilation.

Guidance on using the plugin within the context of a larger webpack build can be found in the
"[Progressive Web Application](https://webpack.js.org/guides/progressive-web-application/)" section
of the webpack documentation.

## Considerations

There are a few decisions to make which will determine the right configuration for your use case.

### Should the plugin create your service worker file?

If you leave out the `swSrc` configuration option, the plugin will create a service worker file for
you and automatically add it to the webpack asset pipeline. This is referred to as `generateSW`
mode.

{% include "web/tools/workbox/_shared/when-to-use-generate-sw.md" %}

If you set `swSrc` to the path of an existing service worker file (which does not have to be
otherwise configured as a webpack asset) then the plugin will generate a list of URLs to precache
and add a reference to that precache manifest, along with a reference to the Workbox runtime code,
to your file. It will otherwise leave the file as-is. This is referred to as `injectManifest` mode.

{% include "web/tools/workbox/_shared/when-to-use-inject-manifest.md" %}

### Do you need to cache additional, non-webpack assets?

By default, the plugin will generate a precache manifest that contains URLs for all of the assets
that come from the current webpack compilation. Any assets that webpack doesn't "know" about will
not be picked up.

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

Once you've determined the answers to those considerations, you can pass the appropriate
configuration as properties of an `Object` to the plugin's constructor. For example:

    // Inside of webpack.config.js:
    const WorkboxPlugin = require('workbox-webpack-plugin');
    
    module.exports = {
      // Other webpack config...
      plugins: [
        // Other plugins...
        WorkboxPlugin({option: 'value'})
      ]
    };

<table class="responsive">
  <tbody>
    <tr>
      <th colspan="2">Supported Options</th>
    </tr>
{% include "web/tools/workbox/guides/_shared/webpack-specific.html" %}
{% include "web/tools/workbox/guides/_shared/common-generate-schema.html" %}
{% include "web/tools/workbox/guides/_shared/base-schema.html" %}
  </tbody>
</table>
