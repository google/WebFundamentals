project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description:A checklist of things to ensure when setting up a service worker.

{# wf_updated_on: 2019-02-01 #}
{# wf_published_on: 2017-11-15 #}
{# wf_blink_components: N/A #}

# Service Worker Checklist {: .page-title }

This page contains a couple of tips that will ensure your users get the
best experience from your web app as well as ensuring there aren't any
hidden surprises while developing your site.

## Register your service worker the right way

In general, you should wait for the window load event before registering your
service worker. This will allow the browser to prioritize assets for the page
and will prevent any risk of precaching interfering with the page.

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
```

<div class="success">
  <b>DO</b>: Wait until the `window` load event to register your service worker.
</div>

## Learn More

This guide is a summary of common gotchas developers hit when starting out,
but for more information check out the ["Service Worker Registration" guide](/web/fundamentals/primers/service-workers/registration).
