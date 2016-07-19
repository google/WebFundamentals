project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Now that you've installed a service worker, you probably want to return one of your cached responses, right?

<p class="intro">Now that you've installed a service worker, you probably want to 
  return one of your cached responses, right?</p>

After a service worker is installed and the user navigates to a different page
or refreshes, the service worker will begin to receive `fetch` events, an example
of which is below.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;fetch&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">event</span><span class="p">.</span><span class="nx">respondWith</span><span class="p">(</span>
    <span class="nx">caches</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">)</span>
      <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
        <span class="c1">// Cache hit - return response</span>
        <span class="k">if</span> <span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
          <span class="k">return</span> <span class="nx">response</span><span class="p">;</span>
        <span class="p">}</span>
        <span class="k">return</span> <span class="nx">fetch</span><span class="p">(</span><span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">);</span>
      <span class="p">}</span>
    <span class="p">)</span>
  <span class="p">);</span>
<span class="p">});</span></code></pre></div>

Here we've defined our `fetch` event and within `event.respondWith()`, we
pass in a promise from `caches.match()`. This method looks at the request and
finds any cached results from any of the caches your service worker created.

If we have a matching response, we return the cached value, otherwise we return
the result of a call to `fetch`, which will make a network request and return
the data if anything can be retrieved from the network. This is a simple example
and uses any cached assets we cached during the install step.

If we want to cache new requests cumulatively, we can do so by handling the
response of the fetch request and then adding it to the cache, like below.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;fetch&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">event</span><span class="p">.</span><span class="nx">respondWith</span><span class="p">(</span>
    <span class="nx">caches</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">)</span>
      <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
        <span class="c1">// Cache hit - return response</span>
        <span class="k">if</span> <span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
          <span class="k">return</span> <span class="nx">response</span><span class="p">;</span>
        <span class="p">}</span>

        <span class="c1">// IMPORTANT: Clone the request. A request is a stream and</span>
        <span class="c1">// can only be consumed once. Since we are consuming this</span>
        <span class="c1">// once by cache and once by the browser for fetch, we need</span>
        <span class="c1">// to clone the response.</span>
        <span class="kd">var</span> <span class="nx">fetchRequest</span> <span class="o">=</span> <span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">.</span><span class="nx">clone</span><span class="p">();</span>

        <span class="k">return</span> <span class="nx">fetch</span><span class="p">(</span><span class="nx">fetchRequest</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span>
          <span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
            <span class="c1">// Check if we received a valid response</span>
            <span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="nx">response</span> <span class="o">||</span> <span class="nx">response</span><span class="p">.</span><span class="nx">status</span> <span class="o">!==</span> <span class="mi">200</span> <span class="o">||</span> <span class="nx">response</span><span class="p">.</span><span class="nx">type</span> <span class="o">!==</span> <span class="s1">&#39;basic&#39;</span><span class="p">)</span> <span class="p">{</span>
              <span class="k">return</span> <span class="nx">response</span><span class="p">;</span>
            <span class="p">}</span>

            <span class="c1">// IMPORTANT: Clone the response. A response is a stream</span>
            <span class="c1">// and because we want the browser to consume the response</span>
            <span class="c1">// as well as the cache consuming the response, we need</span>
            <span class="c1">// to clone it so we have two streams.</span>
            <span class="kd">var</span> <span class="nx">responseToCache</span> <span class="o">=</span> <span class="nx">response</span><span class="p">.</span><span class="nx">clone</span><span class="p">();</span>

            <span class="nx">caches</span><span class="p">.</span><span class="nx">open</span><span class="p">(</span><span class="nx">CACHE_NAME</span><span class="p">)</span>
              <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">cache</span><span class="p">)</span> <span class="p">{</span>
                <span class="nx">cache</span><span class="p">.</span><span class="nx">put</span><span class="p">(</span><span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">,</span> <span class="nx">responseToCache</span><span class="p">);</span>
              <span class="p">});</span>

            <span class="k">return</span> <span class="nx">response</span><span class="p">;</span>
          <span class="p">}</span>
        <span class="p">);</span>
      <span class="p">})</span>
    <span class="p">);</span>
<span class="p">});</span></code></pre></div>

What we are doing is this:

1. Add a callback to `.then()` on the `fetch` request.
2. Once we get a response, we perform the following checks:

   1. Ensure the response is valid.
   2. Check the status is `200` on the response.
   3. Make sure the response type is **basic**, which indicates that it's a 
      request from our origin. This means that requests to third party assets 
      aren't cached as well.
3. If we pass the checks, we [clone](https://fetch.spec.whatwg.org/#dom-response-clone) 
   the response. The reason for this is that because the response is a 
   [Stream](https://streams.spec.whatwg.org/), the body can only be consumed 
   once. Since we want to return the response for the browser to use, as well 
   as pass it to the cache to use, we need to clone it so we can send one to 
   the browser and one to the cache.

