project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: There will be a point in time where your service worker will need updating.

<p class="intro">There will be a point in time where your service worker will 
  need updating. When that time comes, you'll need to follow these steps:</p>

1. Update your service worker JavaScript file. When the user navigates to
   your site, the browser tries to redownload the script file that defined the
   service worker in the background. If there is even a byte's difference in 
   the service worker file compared to what it currently has, it considers it 
   _new_.
2. Your new service worker will be started and the `install` event will be fired.
3. At this point the old service worker is still controlling the current pages 
   so the new service worker will enter a `waiting` state.
4. When the currently open pages of your site are closed, the old service 
   worker will be killed and the new service worker will take control.
5. Once your new service worker takes control, its `activate` event will be 
   fired.

One common task that will occur in the `activate` callback is cache management.
The reason you'll want to do this in the `activate` callback is because if you
were to wipe out any old caches in the install step, any old service worker,
which keeps control of all the current pages, will suddenly stop being able to
serve files from that cache.

Let's say we have one cache called `'my-site-cache-v1'`, and we find that we
want to split this out into one cache for pages and one cache for blog posts.
This means in the install step we'd create two caches, `'pages-cache-v1'` and
`'blog-posts-cache-v1'` and in the activate step we'd want to delete our older
`'my-site-cache-v1'`.

The following code would do this by looping through all of the caches in the
service worker and deleting any caches which aren't defined in the cache
whitelist.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;activate&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>

  <span class="kd">var</span> <span class="nx">cacheWhitelist</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;pages-cache-v1&#39;</span><span class="p">,</span> <span class="s1">&#39;blog-posts-cache-v1&#39;</span><span class="p">];</span>

  <span class="nx">event</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>
    <span class="nx">caches</span><span class="p">.</span><span class="nx">keys</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">cacheNames</span><span class="p">)</span> <span class="p">{</span>
      <span class="k">return</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">all</span><span class="p">(</span>
        <span class="nx">cacheNames</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">cacheName</span><span class="p">)</span> <span class="p">{</span>
          <span class="k">if</span> <span class="p">(</span><span class="nx">cacheWhitelist</span><span class="p">.</span><span class="nx">indexOf</span><span class="p">(</span><span class="nx">cacheName</span><span class="p">)</span> <span class="o">===</span> <span class="o">-</span><span class="mi">1</span><span class="p">)</span> <span class="p">{</span>
            <span class="k">return</span> <span class="nx">caches</span><span class="p">.</span><span class="k">delete</span><span class="p">(</span><span class="nx">cacheName</span><span class="p">);</span>
          <span class="p">}</span>
        <span class="p">})</span>
      <span class="p">);</span>
    <span class="p">})</span>
  <span class="p">);</span>
<span class="p">});</span></code></pre></div>

