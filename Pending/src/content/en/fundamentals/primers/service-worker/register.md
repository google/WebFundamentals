project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: To install a service worker you need to kick start the process by **registering** it in your page.

<p class="intro">To install a service worker you need to kick start the process by
<b>registering</b> it in your page. This tells the browser where your
service worker JavaScript file lives.</p>

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="k">if</span> <span class="p">(</span><span class="s1">&#39;serviceWorker&#39;</span> <span class="k">in</span> <span class="nx">navigator</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span><span class="p">.</span><span class="nx">register</span><span class="p">(</span><span class="s1">&#39;/sw.js&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">registration</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// Registration was successful</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;ServiceWorker registration successful with scope: &#39;</span><span class="p">,</span> <span class="nx">registration</span><span class="p">.</span><span class="nx">scope</span><span class="p">);</span>
  <span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// registration failed :(</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;ServiceWorker registration failed: &#39;</span><span class="p">,</span> <span class="nx">err</span><span class="p">);</span>
  <span class="p">});</span>
<span class="p">}</span></code></pre></div>

This code checks to see if the service worker API is available, and if it is,
the service worker at `/sw.js` is registered.

You can call `register()` every time a page loads without concern; the browser will
figure out if the service worker is already registered or not and handle it
accordingly.

One subtlety with the `register()` method is the location of the service worker
file. You'll notice in this case that the service worker file is at the root of
the domain. This means that the service worker's scope will be the entire
origin. In other words, this service worker will receive `fetch` events for
everything on this domain. If we register the service worker file at
`/example/sw.js`, then the service worker would only see `fetch` events for pages
whose URL starts with `/example/` (i.e. `/example/page1/`, `/example/page2/`).

Now you can check that a service worker is enabled by going to `chrome://inspect
/#service-workers` and looking for your site.

![Inspect service workers](images/sw-chrome-inspect.png)

When service worker was first being implemented you could also view your service
worker details through `chrome://serviceworker-internals`. This may still be
useful, if for nothing more than learning about the life cycle of service
workers, but don't be surprised if it gets replaced completely by
`chrome://inspect/#service-workers` at a later date.

You may find it useful to test your service worker in an Incognito window so
that you can close and reopen knowing that the previous service worker won't
affect the new window. Any registrations and caches created from within an
Incognito window will be cleared out once that window is closed.

