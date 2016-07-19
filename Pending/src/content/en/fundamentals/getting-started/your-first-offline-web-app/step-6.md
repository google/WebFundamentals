project_path: /web/_project.yaml
book_path: /web/_book.yaml


With the service worker registered, an “install” event will be triggered the first time a user visits the page. In this event handler, you should cache all the assets that are needed for your application.

First add in the Cache Polyfill (it is already included in the repo). This 
polyfill is needed because the Cache API isn't yet fully implemented in all 
browser (Chrome has good support).

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">importScripts</span><span class="p">(</span><span class="s1">&#39;/cache-polyfill.js&#39;</span><span class="p">);</span></code></pre></div>

Now add an Event Listener for the install event.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;install&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">e</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">();</span>
<span class="p">});</span></code></pre></div>

Then in the Event handler function, open the caches object.  The caches object 
will be used later in the codelab to make sure that for every request we can 
return a saved version of the data.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;install&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">e</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>
    <span class="nx">caches</span><span class="p">.</span><span class="nx">open</span><span class="p">(</span><span class="s1">&#39;airhorner&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">cache</span><span class="p">)</span> <span class="p">{})</span>
  <span class="p">);</span>
<span class="p">});</span></code></pre></div>

Now that the cache is open, you need to populate it.  The cache object has a 
method called addAll (via the polyfill). addAll will take a list of urls, 
automatically fetch them from the server and add them to the cache.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;install&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>
 <span class="nx">e</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>
   <span class="nx">caches</span><span class="p">.</span><span class="nx">open</span><span class="p">(</span><span class="s1">&#39;airhorner&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">cache</span><span class="p">)</span> <span class="p">{</span>
     <span class="k">return</span> <span class="nx">cache</span><span class="p">.</span><span class="nx">addAll</span><span class="p">([</span>
       <span class="s1">&#39;/&#39;</span><span class="p">,</span>
       <span class="s1">&#39;/index.html&#39;</span><span class="p">,</span>
       <span class="s1">&#39;/index.html?homescreen=1&#39;</span><span class="p">,</span>
       <span class="s1">&#39;/?homescreen=1&#39;</span><span class="p">,</span>
       <span class="s1">&#39;/styles/main.css&#39;</span><span class="p">,</span>
       <span class="s1">&#39;/scripts/main.min.js&#39;</span><span class="p">,</span>
       <span class="s1">&#39;/sounds/airhorn.mp3&#39;</span>
     <span class="p">]);</span>
   <span class="p">})</span>
 <span class="p">);</span>
<span class="p">});</span></code></pre></div>

If any one of these files is not present or fails to be fetched, then the entire 
operation for `addAll` will also fail.  A good application will handle this case.

### Frequently Asked Questions

* Where is the polyfill?
    * [https://github.com/coonsta/cache-polyfill](https://github.com/coonsta/cache-polyfill) 
* Why do I need to polyfill?
    * Currently Chrome and other browsers don't yet fully support the addAll 
      method (**note:** Chrome 46 will be compliant)
* Why do you have ?homescreen=1
    * URL's with Query String parameters are treated as individual URL's and 
      need to be cached separately.
      


