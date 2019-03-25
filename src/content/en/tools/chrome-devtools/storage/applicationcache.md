project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: How to view Application Cache data from the Application panel of Chrome DevTools.

{# wf_updated_on: 2019-03-25 #}
{# wf_published_on: 2019-03-25 #}
{# wf_blink_components: Platform>DevTools #}

# View Application Cache Data With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<aside class="warning">
  The Application Cache API is 
  <a href="https://html.spec.whatwg.org/multipage/offline.html#offline">
    being removed from the web platform
  </a>.
</aside>

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Window/applicationCache

This guide shows you how to use [Chrome DevTools](/web/tools/chrome-devtools) to inspect
[Application Cache][MDN]{: .external } resources.

## View Application Cache Data {: #view }

1. Click the **Sources** tab to open the **Sources** panel. The **Manifest** pane usually opens
   by default.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/manifest.png"
            alt="The Manifest pane."/>
       <figcaption>
         <b>Figure 1</b>. The Manifest pane.
       </figcaption>
     </figure>

1. Expand the **Application Cache** section and click a cache to view its resources.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/appcache.png"
            alt="The Application Cache pane."/>
       <figcaption>
         <b>Figure 2</b>. The Application Cache pane.
       </figcaption>
     </figure>

Each row of the table represents a cached resource.

[category]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache#Resources_in_an_application_cache

The **Type** column represents the [resource's category][category]{: .external }:

* **Master**. The `manifest` attribute on the resource indicated that this cache is the resource's master.
* **Explicit**. This resource was explicitly listed in the manifest.
* **Network**. The manifest specified that this resource must come from the network.
* **Fallback**. The URL is a fallback for another resource. The URL of the other resource is not listed in DevTools.

At the bottom of the table there are status icons indicating your network
connection and the status of the Application Cache. The Application Cache
can have the following statuses:

* **IDLE**. The cache has no new changes.
* **CHECKING**. The manifest is being fetched and checked for updates.
* **DOWNLOADING**. Resources are being added to the cache.
* **UPDATEREADY**. A new version of the cache is available.
* **OBSOLETE**. The cache is being deleted.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
