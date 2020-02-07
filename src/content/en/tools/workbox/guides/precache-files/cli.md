project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to precache files with Workbox CLI.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2020-01-15 #}
{# wf_published_on: 2017-11-15 #}

# Precache Files with Workbox CLI {: .page-title }

This page explains how to use the Workbox Command Line Interface (a.k.a. the
Workbox CLI) to generate the list of files to precache and add it to your
service worker.

<aside class="note"><b>Note:</b> You'll need to have
<a href="https://nodejs.org/en/download/">Node installed</a> to use the
Workbox CLI.</aside>

{% include "web/tools/workbox/guides/_shared/install-cli.html" %}

## Run the Wizard

The next step is to run the wizard. This will setup the CLI to work for your
project. The wizard will ask a set of questions about your project's file
structure which'll be used to determine the files that should be precached.

Start the wizard like so:

<pre class="devsite-terminal">
workbox wizard --injectManifest
</pre>

## Add an Injection Point

Before the files can be "injected" into your service worker, you need to add the
placeholder variable `self.__WB_MANIFEST` to your service worker file. For example:

```javascript
import {precacheAndRoute} from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);
```

This piece of code will be replaced by the CLI with the list of files. (See
the next section.)

## Inject a Manifest with the CLI

The final step is to run the inject manifest command:

<pre class="devsite-terminal">
workbox injectManifest
</pre>

This command will create the list of files to precache, read your service
worker file, inject the manifest and output a new service worker file
with the manifest. The end result with look like this:

```javascript
import {precacheAndRoute} from 'workbox-precaching';

precacheAndRoute([
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
  // ...
]);
```

When you make a change to your project, run the inject manifest command
and you'll have an up to date service worker with precache support.

{% include "web/tools/workbox/guides/_shared/precache-config.html" %}
