project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: How to view Cache data from the Application panel of Chrome DevTools.

{# wf_updated_on: 2019-09-03 #}
{# wf_published_on: 2019-03-25 #}
{# wf_blink_components: Platform>DevTools #}

# View Cache Data With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

This guide shows you how to use [Chrome DevTools](/web/tools/chrome-devtools) to inspect
[Cache][MDN]{: .external } data.

[HTTP]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
[log]: /web/tools/chrome-devtools/network/#load

If you're trying to inspect [HTTP cache][HTTP]{: .external } data, this is not the guide you want.
The **Size** column of the **Network Log** has the information you're looking for. See [Log network activity][log].

## View cache data {: #view }

1. Click the **Application** tab to open the **Application** panel. The **Manifest** pane usually opens
   by default.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/manifest.png"
            alt="The Manifest pane."/>
       <figcaption>
         <b>Figure 1</b>. The Manifest pane.
       </figcaption>
     </figure>

1. Expand the **Cache Storage** section to view available caches.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/cache.png"
            alt="Available caches."/>
       <figcaption>
         <b>Figure 2</b>. Available caches.
       </figcaption>
     </figure>

1. Click a cache to view its contents.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/cacheview.png"
            alt="Viewing a cache's contents."/>
       <figcaption>
         <b>Figure 3</b>. Viewing the <b>airhorner-0.6.11</b> cache.
       </figcaption>
     </figure>

1. Click a resource to view its HTTP headers in the section below the table.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/viewcacheresource.png"
            alt="Viewing a resource's HTTP headers."/>
       <figcaption>
         <b>Figure 4</b>. Viewing the HTTP headers of the <b>/index.html</b> resource.
       </figcaption>
     </figure>

1. Click **Preview** to view a resource's content.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/cachecontent.png"
            alt="Viewing a resource's content."/>
       <figcaption>
         <b>Figure 5</b>. Viewing the content of the <b>/scripts.comlink.global.js</b> resource.
       </figcaption>
     </figure>


## Refresh a resource {: #refresh }

1. [View a cache's data](#view).
1. Click the resource that you want to refresh. DevTools highlights it blue to indicate that it's selected.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/cacheselected.png"
            alt="Selecting a resource."/>
       <figcaption>
         <b>Figure 6</b>. Selecting the <b>/styles/main.css</b> resource.
       </figcaption>
     </figure>

1. Click **Refresh** ![Refresh](/web/tools/chrome-devtools/images/shared/reload.png){: .inline-icon }.

## Filter resources {: #filter }

1. [View a cache's data](#view).
1. Use the **Filter by Path** text box to filter out any resources that do not match the path that you provide.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/cachefilter.png"
            alt="Filtering out resources that do not match the specified path."/>
       <figcaption>
         <b>Figure 7</b>. Filtering out resources that do not match the <code>/script</code> path.
       </figcaption>
     </figure>

## Delete a resource {: #deleteresource }

1. [View a cache's data](#view).
1. Click the resource that you want to delete. DevTools highlights it blue to indicate that it's selected.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/cacheselected.png"
            alt="Selecting a resource."/>
       <figcaption>
         <b>Figure 8</b>. Selecting the <b>/styles/main.css</b> resource.
       </figcaption>
     </figure>

1. Click **Delete Selected** ![Delete Selected](/web/tools/chrome-devtools/images/shared/delete.png){: .inline-icon }.

## Delete all cache data {: #deletecache }

1. Open **Application** > **Clear Storage**.
1. Make sure that the **Cache Storage** checkbox is enabled.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/cachecheckbox.png"
            alt="The Cache Storage checkbox."/>
       <figcaption>
         <b>Figure 9</b>. The <b>Cache Storage</b> checkbox.
       </figcaption>
     </figure>

1. Click **Clear site data**.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/cacheclearsite.png"
            alt="The Clear Site Data button."/>
       <figcaption>
         <b>Figure 10</b>. The <b>Clear Site Data</b> button.
       </figcaption>
     </figure>

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
