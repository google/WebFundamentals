project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to precache files with a custom precache list.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2017-12-01 #}
{# wf_published_on: 2017-11-15 #}

<p>If none of the Workbox tools are suitable for your use case, you can
generate the list of files to precache yourself.</p>

<p>The format for the list must be an array of objects with a `url` and `revision`
property like so</p>

<pre class="prettyprint lang-javascript"><code>{
  url: '&lt;URL of file to precache&gt;',
  revision: '&lt;Hash of the file contents&gt;'
}</code></pre>

<aside class="caution">
  <p>The most important thing to ensure is that the `revision` is 
    updated whenever there is a change to the file.</p>
  <p>If the revision isn't updated files will fail to be
    updated when you update your service worker, see the
    <a href="../modules/workbox-precaching">workbox.precaching for more info</a>.</p>
</aside>

<p>An md5 hash of the file contents is normally enough to use for the 
`revision` of a file.</p>