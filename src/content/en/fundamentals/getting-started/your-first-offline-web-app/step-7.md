project_path: /web/_project.yaml
book_path: /web/_book.yaml


One of the unique attributes of the service worker is the ability to intercept requests made from the web page that the service worker controls and decide what to do with them. This gives us the ability to load the assets that were cached in the install phase.

The first step is to attach an event handler to the fetch event.  This event 
will be triggered for every request that is made.

Add the following code to your sw.js which will log the requests made from the 
parent page.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;fetch&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
 <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">.</span><span class="nx">url</span><span class="p">);</span>
<span class="p">});</span></code></pre></div>

Now open up Chrome DevTools for the service worker and you will see a number of 
requests.

<img src="images/image04.png" width="624" height="350" />
   
Now that we know we can understand all the requests that come through our app we 
need to decide what to do with those requests.  By default, if we don't do 
anything, the request will be passed to the network and the response will be 
returned to the web page.

To make our application work offline we need to pull the request from the cache 
if it is available in the Cache.

Start by adding `event.respondWith()` method. This method tells the browser to 
evaluate the result of the event in the future.  It does need to be filled out 
with an operation before it will work.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;fetch&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
 <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">.</span><span class="nx">url</span><span class="p">);</span>
 
 <span class="nx">event</span><span class="p">.</span><span class="nx">respondWith</span><span class="p">(</span> <span class="p">);</span>
<span class="p">});</span></code></pre></div>
   
Add in `caches.match(event.request)` as follows. This call takes the current web 
request that triggered the fetch event and looks in the cache for a cached piece 
of data that matches the current request (based primarily on looking at the URL 
string). 

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;fetch&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
 <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">.</span><span class="nx">url</span><span class="p">);</span>
 <span class="nx">event</span><span class="p">.</span><span class="nx">respondWith</span><span class="p">(</span>
   <span class="nx">caches</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span> <span class="p">})</span>
 <span class="p">);</span>
<span class="p">});</span></code></pre></div>

The match method returns a Promise that resolves even if the file is not found 
in the cache, this means that we get a choice about what we do.  In our simple 
case when the file is not found we simply want to fetch it from the network and 
return it to the browser.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;fetch&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
 <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">.</span><span class="nx">url</span><span class="p">);</span>
 <span class="nx">event</span><span class="p">.</span><span class="nx">respondWith</span><span class="p">(</span>
   <span class="nx">caches</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
     <span class="k">return</span> <span class="nx">response</span> <span class="o">||</span> <span class="nx">fetch</span><span class="p">(</span><span class="nx">event</span><span class="p">.</span><span class="nx">request</span><span class="p">);</span>
   <span class="p">})</span>
 <span class="p">);</span>
<span class="p">});</span></code></pre></div>

This is the simplest case, there are many other caching scenarios.  For example, 
you could incrementally cache all responses for previously uncached requests, so 
in the future they are all returned from the cache. 



