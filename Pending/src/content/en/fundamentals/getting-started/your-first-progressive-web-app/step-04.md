project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Use a service worker to pre-cache the app shell of a Progressive Web App.

<p class="intro">
Progressive Web Apps have to be fast, and installable, which means that they 
work online, offline, or on intermittent, slow connections. To achieve 
this, we need to cache our app shell using a service worker so that it's 
always available quickly and reliably. 
</p>



If you're unfamiliar with service workers, you can get a basic 
understanding by reading [Introduction To Service 
Workers](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) 
about what they can do, how their lifecycle works and more.

Features provided via service workers should be considered a progressive 
enhancement, and added only if supported by the browser. For example, with 
service workers you can cache the app shell and data for your app, so that it's 
available even when the network isn't. When service workers aren't supported, 
the offline code isn't called, and the user gets a basic experience. Using 
feature detection to provide progressive enhancement has little overhead and it 
won't break in older browsers that don't support that feature.


















<div class="wf-highlight-list wf-highlight-list--remember" markdown="1">
  <h3 class="wf-highlight-list__title">Remember</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Service worker functionality is only available on pages that are accessed via HTTPS (<code>https://localhost</code> and equivalents will also work, to facilitate testing). To learn about the rationale behind this restriction check out <a href='http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features'>Prefer Secure Origins For Powerful New Features</a> from the Chromium team.</li>
    
  </ul>
  
</div>



## Register the service worker if it's available

The first step to making the app work offline is to register a service worker, a 
script that allows background functionality without the need for an open web 
page or user interaction.

This takes two simple steps:

1. Create a JavaScript file that will be the service worker
1. Tell the browser to register the JavaScript file as the service worker.

First, create a blank file called `service-worker.js` in your application root
folder. This `service-worker.js` file must live in the application root because
the scope for the service workers is defined by the directory where the file 
exists. 

Next, we need to check if the browser supports service workers, and if it does, 
register the service worker. Add the following code to the `app.js` file:  

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="k">if</span><span class="p">(</span><span class="s1">&#39;serviceWorker&#39;</span> <span class="k">in</span> <span class="nx">navigator</span><span class="p">)</span> <span class="p">{</span>  
  <span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span>  
           <span class="p">.</span><span class="nx">register</span><span class="p">(</span><span class="s1">&#39;/service-worker.js&#39;</span><span class="p">)</span>  
           <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span> <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Service Worker Registered&#39;</span><span class="p">);</span> <span class="p">});</span>  
<span class="p">}</span></code></pre></div>

## Cache the site assets

When the service worker is registered, an `install` event is triggered the first 
time the user visits the page. In this event handler, we will cache all the 
assets that are needed for the application.


















<div class="wf-highlight-list wf-highlight-list--note" markdown="1">
  <h3 class="wf-highlight-list__title">Note</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>The code below <b>must NOT</b> be used in production, it covers only the most basic use cases and it's easy to get yourself into a state where your app shell will never update. Be sure to review the section below that discusses the pitfalls of this implementation and how to avoid them.</li>
    
  </ul>
  
</div>



When the service worker is fired, it should open the caches object and 
populate it with the assets necessary to load the App Shell. Add this 
code to your `service-worker.js` file:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">cacheName</span> <span class="o">=</span> <span class="s1">&#39;weatherPWA-step-5-1&#39;</span><span class="p">;</span>  
<span class="kd">var</span> <span class="nx">filesToCache</span> <span class="o">=</span> <span class="p">[];</span>

<span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;install&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>  
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;[ServiceWorker] Install&#39;</span><span class="p">);</span>  
  <span class="nx">e</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>  
    <span class="nx">caches</span><span class="p">.</span><span class="nx">open</span><span class="p">(</span><span class="nx">cacheName</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">cache</span><span class="p">)</span> <span class="p">{</span>  
      <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;[ServiceWorker] Caching app shell&#39;</span><span class="p">);</span>  
      <span class="k">return</span> <span class="nx">cache</span><span class="p">.</span><span class="nx">addAll</span><span class="p">(</span><span class="nx">filesToCache</span><span class="p">);</span>  
    <span class="p">})</span>  
  <span class="p">);</span>  
<span class="p">});</span></code></pre></div>

First, we need to open the cache with `cache.open()` and provide a cache name. 
Providing a cache name allows us to version files, or separate data from the 
app shell so that we can easily update one but not affect the other. 

Once the cache is open, we can then call `cache.addAll()`, which takes a list of 
URLs, then fetches them from the server and adds the response to the cache. 
Unfortunately `cache.addAll()` is atomic, if any of the files fail, the entire 
cache step will also fail!

Be sure to bump `cacheName` each time you make changes to your service worker to 
ensure you're always getting the latest version of the files from the cache. 
It's important to periodically purge the cache of unused content and data. Add 
an event listener to the `activate` event that gets all of the cache keys and 
deletes the unused ones:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;activate&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>  
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;[ServiceWorker] Activate&#39;</span><span class="p">);</span>  
  <span class="nx">e</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>  
    <span class="nx">caches</span><span class="p">.</span><span class="nx">keys</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">keyList</span><span class="p">)</span> <span class="p">{</span>  
      <span class="k">return</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">all</span><span class="p">(</span><span class="nx">keyList</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">key</span><span class="p">)</span> <span class="p">{</span>  
        <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;[ServiceWorker] Removing old cache&#39;</span><span class="p">,</span> <span class="nx">key</span><span class="p">);</span>  
        <span class="k">if</span> <span class="p">(</span><span class="nx">key</span> <span class="o">!==</span> <span class="nx">cacheName</span><span class="p">)</span> <span class="p">{</span>  
          <span class="k">return</span> <span class="nx">caches</span><span class="p">.</span><span class="k">delete</span><span class="p">(</span><span class="nx">key</span><span class="p">);</span>  
        <span class="p">}</span>  
      <span class="p">}));</span>  
    <span class="p">})</span>  
  <span class="p">);</span>  
<span class="p">});</span></code></pre></div>

Finally, let's update the list of files required for the app shell. In the 
array, we need to include all of the files our app needs, including images, 
JavaScript, stylesheets, etc.   

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">filesToCache</span> <span class="o">=</span> <span class="p">[</span>  
  <span class="s1">&#39;/&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/index.html&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/scripts/app.js&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/styles/inline.css&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/clear.png&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/cloudy-scattered-showers.png&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/cloudy.png&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/fog.png&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/ic\_add\_white\_24px.svg&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/ic\_refresh\_white\_24px.svg&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/partly-cloudy.png&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/rain.png&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/scattered-showers.png&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/sleet.png&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/snow.png&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/thunderstorm.png&#39;</span><span class="p">,</span>  
  <span class="s1">&#39;/images/wind.png&#39;</span>  
<span class="p">];</span></code></pre></div>


















<div class="wf-highlight-list wf-highlight-list--note" markdown="1">
  <h3 class="wf-highlight-list__title">Note</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Be sure to include all permutations of file names, for example our app is served from <code>index.html</code>, but it may also be requested as <code>/</code> since the server sends <code>index.html</code> when a root folder is requested. You could deal with this in the <code>fetch</code> method, but it would require special casing which may become complex.</li>
    
  </ul>
  
</div>



Our app doesn’t work offline quite yet. We’ve cached the app shell components, 
but we still need to load them from the local cache.

## Serve the app shell from the cache

Service workers provide the ability to intercept requests made from our 
Progressive Web App and handle them within the service worker. That means we can 
determine how we want to handle the request and potentially serve our own cached 
response.

For example:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;fetch&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>  
  <span class="c1">// Do something interesting with the fetch here  </span>
<span class="p">});</span></code></pre></div>

Let's now serve the app shell from the cache. Add the following code to the 
`service-worker.js` file:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;fetch&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>  
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;[ServiceWorker] Fetch&#39;</span><span class="p">,</span> <span class="nx">e</span><span class="p">.</span><span class="nx">request</span><span class="p">.</span><span class="nx">url</span><span class="p">);</span>  
  <span class="nx">e</span><span class="p">.</span><span class="nx">respondWith</span><span class="p">(</span>  
    <span class="nx">caches</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">request</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>  
      <span class="k">return</span> <span class="nx">response</span> <span class="o">||</span> <span class="nx">fetch</span><span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">request</span><span class="p">);</span>  
    <span class="p">})</span>  
  <span class="p">);</span>  
<span class="p">});</span></code></pre></div>

Stepping from inside, out, `caches.match()` evaluates the web request that 
triggered the `fetch` event, and checks to see if it's available in the cache. 
It then either responds with the cached version, or uses `fetch` to get a copy 
from the network. The `response` is passed back to the web page with 
`e.respondWith()`.


















<div class="wf-highlight-list wf-highlight-list--remember" markdown="1">
  <h3 class="wf-highlight-list__title">Remember</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>If you're not seeing the <code>[ServiceWorker]</code> logging in the console, be sure you've bumped <code>cacheName</code> and reload the page. If that doesn't work, see the section on Tips for testing live service workers.</li>
    
  </ul>
  
</div>



## Beware of the edge cases

As previously mentioned, this code **must not be used in production** 
because of the many unhandled edge cases. 

### Cache depends on updating the cache key for every change

For example this caching method requires you to update the cache key every time 
content is changed, otherwise, the cache will not be updated, and the old 
content will be served. So be sure to change the cache key with every change 
as you’re working on your project!

### Requires everything to be redownloaded for every change

Another downside is that the entire cache is invalidated and needs to be 
re-downloaded every time a file changes. That means fixing a simple single 
character spelling mistake will invalidate the cache and require everything to 
be downloaded again. Not exactly efficient. 

### Browser cache may prevent the service worker cache from updating

There's another important caveat here. It's crucial that the HTTPS request made 
during the install handler goes directly to the network and doesn't return a 
response from the browser's cache. Otherwise the browser may return the old, 
cached version, resulting in the service worker cache never actually updating!

### Beware of cache-first strategies in production

Our app uses a cache-first strategy, which results in a copy of any cached 
content being returned without consulting the network. While a cache-first 
strategy is easy to implement, it can cause challenges in the future. Once the 
copy of the host page and service worker registration is cached, it can be 
extremely difficult to change the configuration of the service worker (since the 
configuration depends on where it was defined), and you could find yourself 
deploying sites that are extremely difficult to update!

### How do I avoid these edge cases?

So how do we avoid these edge cases? Use a library like 
[sw-precache](https://github.com/GoogleChrome/sw-precache), which 
provides fine control over what gets expired, ensures requests go directly to 
the network and handles all of the hard work for you. 

## Tips for testing live service workers

Debugging service workers can be a challenge, and when it involves caching, 
things can become even more of a nightmare if the cache isn't updated when you 
expect it. Between the typical service worker life cycle and bug in your code, 
you may become quickly frustrated. But don't. There are some tools you can use 
to make your life easier.

A couple of tips:

* Once a service worker has been unregistered, it may remain listed until 
  its containing browser window is closed.
* If multiple windows to your app are open, the new service worker will 
  not take effect until they've all been reloaded and updated to the latest 
  service worker.
* Unregistering a service worker does not clear the cache, so it may be possible 
  you'll still get old data if the cache name hasn't changed.
* If a service worker exists and a new service worker is registered, the new 
  service worker won't take control until the page is reloaded, unless you take 
  [immediate 
  control](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/immediate-control). 

### Your new best friend: chrome://serviceworker-internals

Chrome's Service Worker Internals page (`chrome://serviceworker-internals`) is a 
life saver, easily allowing you to stop and un-register existing service workers 
and start fresh. You can also use this page to launch the Developer Tools on the 
service worker, giving you access to the console of the service worker. 

## Test it out

* Open the Chrome DevTools and check the resources tab to make sure the
service worker is properly registered and the right resources are cached.
* Try changing the `cacheName` and make sure that the cache is properly updated.

<a href="https://weather-pwa-sample.firebaseapp.com/step-06/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Try it</a>

