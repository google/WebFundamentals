project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to precache files with the Workbox Webpack Plugin.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2017-12-01 #}
{# wf_published_on: 2017-11-15 #}

# Precache Files with `workbox-webpack` {: .page-title }

<h3>Manifest Importing</h3>

<p>You can use the Workbox webpack plugin to create a manifest of chunks and local files
which are added to your service worker via an `importScript` and can be reference via
the variables `self.__precacheManifest`.</p>

<p>In your webpack configuration you can add the manifest like so:</p>

<pre class="prettyprint lang-javascript"><code>// Inside of webpack.config.js:
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...
  
  plugins: [
    // Other plugins...

    WorkboxPlugin.InjectManifest()
  ]
};</code></pre>

<p>In your service worker you can precache files like so:</p>

<pre class="prettyprint lang-javascript"><code>workbox.precaching.precacheAndRoute(self.__precacheManifest || []);</code></pre>

<p>If you look at the final output, you'll find a file named 
<code>precache-manifest.&lt;revision&gt;.js</code> in the same directory as your
service worker. This file contains your precache manifest and sets the
<code>self.__precacheManifest</code> value. This file is imported in your
final service worker.</p>
