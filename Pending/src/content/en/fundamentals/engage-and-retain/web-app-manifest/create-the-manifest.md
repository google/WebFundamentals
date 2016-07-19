project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Before diving into details of a web app manifest, let's create a basic manifest and link a web page to it.

Before diving into details of a web app manifest, let's create a basic manifest and link a web page to it.



## Create the Manifest

You can call the manifest whatever you want. Most people will probably just
use `manifest.json`. An example is given below.

<div class="highlight"><pre><code class="language-json" data-lang="json"><span class="p">{</span>
  <span class="nt">&quot;short_name&quot;</span><span class="p">:</span> <span class="s2">&quot;AirHorner&quot;</span><span class="p">,</span>
  <span class="nt">&quot;name&quot;</span><span class="p">:</span> <span class="s2">&quot;Kinlan&#39;s AirHorner of Infamy&quot;</span><span class="p">,</span>
  <span class="nt">&quot;icons&quot;</span><span class="p">:</span> <span class="p">[</span>
    <span class="p">{</span>
      <span class="nt">&quot;src&quot;</span><span class="p">:</span> <span class="s2">&quot;launcher-icon-1x.png&quot;</span><span class="p">,</span>
      <span class="nt">&quot;type&quot;</span><span class="p">:</span> <span class="s2">&quot;image/png&quot;</span><span class="p">,</span>
      <span class="nt">&quot;sizes&quot;</span><span class="p">:</span> <span class="s2">&quot;48x48&quot;</span>
    <span class="p">},</span>
    <span class="p">{</span>
      <span class="nt">&quot;src&quot;</span><span class="p">:</span> <span class="s2">&quot;launcher-icon-2x.png&quot;</span><span class="p">,</span>
      <span class="nt">&quot;type&quot;</span><span class="p">:</span> <span class="s2">&quot;image/png&quot;</span><span class="p">,</span>
      <span class="nt">&quot;sizes&quot;</span><span class="p">:</span> <span class="s2">&quot;96x96&quot;</span>
    <span class="p">},</span>
    <span class="p">{</span>
      <span class="nt">&quot;src&quot;</span><span class="p">:</span> <span class="s2">&quot;launcher-icon-4x.png&quot;</span><span class="p">,</span>
      <span class="nt">&quot;type&quot;</span><span class="p">:</span> <span class="s2">&quot;image/png&quot;</span><span class="p">,</span>
      <span class="nt">&quot;sizes&quot;</span><span class="p">:</span> <span class="s2">&quot;192x192&quot;</span>
    <span class="p">}</span>
  <span class="p">],</span>
  <span class="nt">&quot;start_url&quot;</span><span class="p">:</span> <span class="s2">&quot;index.html?launcher=true&quot;</span>
<span class="p">}</span></code></pre></div>

You should include a `short_name` as this will get used for the text on the users home screen
and a `name` as that will be used in the Web App Install banner..

## Set a Start URL

If you don't provide a `start_url`, then the current page will be used, which is
unlikely to be what your users want. But that's not the only reason to include it. Because you can now define how your app is launched, add a query string parameter to the `start_url` that indicates how it was launched. For example:

<div class="highlight"><pre><code class="language-json" data-lang="json"><span class="s2">&quot;start_url&quot;</span><span class="err">:</span> <span class="s2">&quot;/index.html?homescreen=1&quot;</span></code></pre></div>

## Tell the Browser about your Manifest

Once you have the manifest created and and on your site, all you need to do is add
a `link` tag to all the pages that encompass your web app as follows:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;manifest&quot;</span> <span class="na">href=</span><span class="s">&quot;/manifest.json&quot;</span><span class="nt">&gt;</span></code></pre></div>

