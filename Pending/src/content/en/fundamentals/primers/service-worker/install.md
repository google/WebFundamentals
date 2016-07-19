project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: After a controlled page kicks off the registration process, let's shift to the point of view of the service worker script, which handles the `install` event.

After a controlled page kicks off the registration process, let's shift to the
point of view of the service worker script, which handles the `install` event.

For the most basic example, you need to define a callback for the install event
and decide which files you want to cache.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;install&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Perform install steps</span>
<span class="p">});</span></code></pre></div>

Inside of our `install` callback, we need to take the following steps:

1. Open a cache.
2. Cache our files.
3. Confirm whether all the required assets are cached or not.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">CACHE_NAME</span> <span class="o">=</span> <span class="s1">&#39;my-site-cache-v1&#39;</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">urlsToCache</span> <span class="o">=</span> <span class="p">[</span>
  <span class="s1">&#39;/&#39;</span><span class="p">,</span>
  <span class="s1">&#39;/styles/main.css&#39;</span><span class="p">,</span>
  <span class="s1">&#39;/script/main.js&#39;</span>
<span class="p">];</span>

<span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;install&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Perform install steps</span>
  <span class="nx">event</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>
    <span class="nx">caches</span><span class="p">.</span><span class="nx">open</span><span class="p">(</span><span class="nx">CACHE_NAME</span><span class="p">)</span>
      <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">cache</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Opened cache&#39;</span><span class="p">);</span>
        <span class="k">return</span> <span class="nx">cache</span><span class="p">.</span><span class="nx">addAll</span><span class="p">(</span><span class="nx">urlsToCache</span><span class="p">);</span>
      <span class="p">})</span>
  <span class="p">);</span>
<span class="p">});</span></code></pre></div>

Here you can see we call `caches.open()` with our desired cache name, after which
we call `cache.addAll()` and pass in our array of files. This is a chain of
promises (`caches.open()` and `cache.addAll()`). The `event.waitUntil()` method
takes a promise and uses it to know how long installation takes, and whether it
succeeded.

If all the files are successfully cached, then the service worker will be
installed. If **any** of the files fail to download, then the install step will
fail. This allows you to rely on having all the assets that you defined, but
does mean you need to be careful with the list of files you decide to cache in
the install step. Defining a long list of files will increase the chance that
one file may fail to cache, leading to your service worker not getting
installed.

This is just one example, you can perform other tasks in the `install` event or
avoid setting an `install` event listener altogether.


