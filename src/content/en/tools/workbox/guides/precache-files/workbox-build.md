project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to precache files with workbox-build.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2017-12-01 #}
{# wf_published_on: 2017-11-15 #}

# Precache Files with `workbox-build` {: .page-title }

<p>The workbox-build module can generate the list of files to precache and
inject that list into your service worker.</p>
        
<p>This method is useful if you want to programmatically generate a service worker
from a node script or are using a build process like Gulp.</p>
        
<aside class="note"><b>Note:</b> You'll need to have 
<a href="https://nodejs.org/en/download/">Node installed</a> to use 
workbox-build.</aside>
        
<h3><code>workbox-build</code> Installation</h3>
        
<p>To start, install `workbox-build` from NPM.</p>
        
<pre class="devsite-terminal devsite-click-to-copy">
npm install workbox-build --save-dev
</pre>

{% include "web/tools/workbox/guides/_shared/generate-precache/injection.html" %}
        
<h3>Call <code>injectManifest()</code></h3>
        
<p>The final step is to add workbox-build to your build process or script:</p>
        
<pre class="prettyprint lang-javascript">
const workboxBuild = require('workbox-build');

const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatthers: [
      '**\/*.{js,css,html,png}',
    ]
  });
}

// TODO: Build all of your sites assets before build SW.
...

// Finally, build SW
buildSW();
</pre>
        
<p>This command will read in your service worker, inject the manifest and output
a new service worker file with the manifest, like so:</p>
        
<pre class="prettyprint lang-javascript"><code>workbox.precaching.precacheAndRoute([
  {
    "url": "basic.html",
    "revision": "7ca37fd5b27f91cd07a2fc68f20787c3"
  },
  {
    "url": "favicon.ico",
    "revision": "1378625ad714e74eebcfa67bb2f61d81"
  },
  {
    "url": "images/hamburger.svg",
    "revision": "d2cb0dda3e8313b990e8dcf5e25d2d0f"
  },

  ...

]);</code></pre>
        
<p>Please ensure that you build the service worker after each file change to ensure
your users get the latest files.</p>