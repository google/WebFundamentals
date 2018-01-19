project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to precache files with Workbox CLI.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2017-12-01 #}
{# wf_published_on: 2017-11-15 #}

# Precache Files with Workbox CLI {: .page-title }

<p>The Workbox Command Line Interface (a.k.a the Workbox CLI) can generate the
list of files to precache and inject that list into your service worker.</p>

<p>This method is useful if you aren't too familiar with Node and aren't using
webpack.</p>

<aside class="note"><b>Note:</b> You'll need to have 
<a href="https://nodejs.org/en/download/">Node installed</a> to use the 
Workbox CLI.</aside>

<h3>CLI Installation</h3>

<p>To start, install the CLI from NPM.</p>

<pre class="devsite-terminal devsite-click-to-copy">
npm install workbox-cli --global
</pre>

<p>You should be able to run the command `workbox --help` after it's installed.</p>

<pre class="devsite-terminal">
workbox --help

    workbox-cli is the command line interface for Workbox.

    Usage:
    $ workbox <command> [options]

    ...
</pre>

<h3>Run the CLI Wizard</h3>

<p>The next step is to run the wizard so the CLI is setup for your project. The
wizard will ask a set of questions about your project to determine which 
files should be precached.</p>

<pre class="devsite-terminal">
workbox wizard --injectManifest
</pre>

{% include "web/tools/workbox/guides/_shared/generate-precache/injection.html" %}

<h3>Inject a Manifest with the CLI</h3>

<p>The final step is to run the inject manifest command:</p>

<pre class="devsite-terminal">
workbox injectManifest
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

<p>When you make a change to your project, run the inject manifest command
and you'll have an up to date service worker with precache support.</p>