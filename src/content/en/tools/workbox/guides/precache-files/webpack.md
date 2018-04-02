project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to precache files with the Workbox Webpack Plugin.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2018-03-13 #}
{# wf_published_on: 2017-11-15 #}

# Precache Files with Webpack {: .page-title }

This page explains how to use the `workbox-webpack-plugin` node module to
generate the list of files to precache and add it to your service worker.

{% include "web/tools/workbox/guides/_shared/install-webpack.html" %}

## Setup your Webpack Config

To add the manifest to your service worker file you'll need to add the
plugin to your `webpack.config.js` file like so:

<pre class="prettyprint lang-javascript"><code>// Inside of webpack.config.js:
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...

  plugins: [
    // Other plugins...

    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
    })
  ]
};</code></pre>

If you look at the output of your service worker file you'll see an extra
file is added as an `importScripts()` call. It'll be named
`precache-manifest.<revision>.js`. This file will contain the list of files
to precache and it will expose the list as the variable
`self.__precacheManifest`.

## Precache Files

The final step is to tell Workbox to precache the files, which you can do
by adding the following code to your service worker.

```javascript
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
```

This will precache any of the files from the Webpack plugin.

{% include "web/tools/workbox/guides/_shared/precache-config.html" %}
