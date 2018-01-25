project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to generate a compolete service worker with Workbox.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2018-01-25 #}
{# wf_published_on: 2017-11-15 #}

<style>
  .button-primary {
    background-color: #fb8c00;
  }
</style>

# Generate a Complete Service Worker {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

Workbox can generate a complete service worker that supports precaching and set up runtime caching purely from a configuration object or file. This is a great option for anyone looking for an easy solution and works really well for static sites.

You can generate a service worker using the CLI, workbox-build Node module or with the webpack plugin.

Depending on how you build your site, you’ll need to select the right tool for you. The CLI is easiest to get up and running with. The Node Module `workbox-build` is useful if you have a build process that runs in node, like Gulp. If you use webpack, the Workbox plugin will be the best fit.

<aside class="note"><strong>Note:</strong> If you're not sure what option
is best for you, <a href="./cli">start with the CLI</a> as it's easy to setup
and will give you a better understanding of how the other tools work.</aside>

###### Workbox Command Line Interface (CLI)

Ideal for developers who are **unfamiliar with Node** or **have simple needs**.

<a href="./cli" class="button button-primary">Learn how to use the CLI</a>

###### workbox Build

Perfect for developers wanting to
**programmatically generate the service worker in Node**
or are **using Gulp** for their build process.

<a href="./workbox-build" class="button button-primary">Learn how to use workbox-build</a>

###### Workbox Webpack Plugin

Ideal for **developers using webpack** to build their project.

<a href="./webpack" class="button button-primary">Learn how to use the Webpack Plugin</a>
