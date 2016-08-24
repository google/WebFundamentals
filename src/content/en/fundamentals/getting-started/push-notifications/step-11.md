project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Enable your users to unsubscribe from Push Notifications.

A completed version of this step is in the completed/step11 directory.

**ENOUGH WITH THE MESSAGES ALREADY :^)!**

How can you enable your users to unsubscribe and resubscribe?

Simple: a client unsubscribes from notifications by calling the `unsubscribe()`
method of the `PushSubscription` object.

In a production implementation you will also need to to remove subscription data for an unsubscribed client from your server, to avoid sending notifications that won't be received.

## 1. Add a Subscribe/Unsubscribe button to your app

In the _index.html_ file you created earlier, add a button so the code looks like this:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="cp">&lt;!DOCTYPE html&gt;</span>
<span class="nt">&lt;html&gt;</span>
<span class="nt">&lt;head&gt;</span>
  <span class="nt">&lt;title&gt;</span>Push Notification codelab<span class="nt">&lt;/title&gt;</span>
  <span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;manifest&quot;</span> <span class="na">href=</span><span class="s">&quot;manifest.json&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;/head&gt;</span>
<span class="nt">&lt;body&gt;</span>
  <span class="nt">&lt;h1&gt;</span>Push Notification codelab<span class="nt">&lt;/h1&gt;</span>
  <span class="nt">&lt;p&gt;</span>This page must be accessed using HTTPS or via localhost.<span class="nt">&lt;/p&gt;</span>
  <span class="nt">&lt;button</span> <span class="na">disabled</span><span class="nt">&gt;</span>Subscribe<span class="nt">&lt;/button&gt;</span>
  <span class="nt">&lt;script </span><span class="na">src=</span><span class="s">&quot;js/main.js&quot;</span><span class="nt">&gt;&lt;/script&gt;</span>
<span class="nt">&lt;/body&gt;</span>
<span class="nt">&lt;/html&gt;</span></code></pre></div>

## 2. Add subscribe/unsubscribe functionality to _main.js_

Adjust _main.js_ so the code looks like this:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">reg</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">sub</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">isSubscribed</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">subscribeButton</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;button&#39;</span><span class="p">);</span>
<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;serviceWorker&#39;</span> <span class="k">in</span> <span class="nx">navigator</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Service Worker is supported&#39;</span><span class="p">);</span>
  <span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span><span class="p">.</span><span class="nx">register</span><span class="p">(</span><span class="s1">&#39;sw.js&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span><span class="p">.</span><span class="nx">ready</span><span class="p">;</span>
  <span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">serviceWorkerRegistration</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">reg</span> <span class="o">=</span> <span class="nx">serviceWorkerRegistration</span><span class="p">;</span>
    <span class="nx">subscribeButton</span><span class="p">.</span><span class="nx">disabled</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Service Worker is ready :^)&#39;</span><span class="p">,</span> <span class="nx">reg</span><span class="p">);</span>
  <span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Service Worker Error :^(&#39;</span><span class="p">,</span> <span class="nx">error</span><span class="p">);</span>
  <span class="p">});</span>
<span class="p">}</span>
<span class="nx">subscribeButton</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;click&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="k">if</span> <span class="p">(</span><span class="nx">isSubscribed</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">unsubscribe</span><span class="p">();</span>
  <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
    <span class="nx">subscribe</span><span class="p">();</span>
  <span class="p">}</span>
<span class="p">});</span>
<span class="kd">function</span> <span class="nx">subscribe</span><span class="p">()</span> <span class="p">{</span>
  <span class="nx">reg</span><span class="p">.</span><span class="nx">pushManager</span><span class="p">.</span><span class="nx">subscribe</span><span class="p">({</span><span class="nx">userVisibleOnly</span><span class="o">:</span> <span class="kc">true</span><span class="p">}).</span>
  <span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">pushSubscription</span><span class="p">){</span>
    <span class="nx">sub</span> <span class="o">=</span> <span class="nx">pushSubscription</span><span class="p">;</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Subscribed! Endpoint:&#39;</span><span class="p">,</span> <span class="nx">sub</span><span class="p">.</span><span class="nx">endpoint</span><span class="p">);</span>
    <span class="nx">subscribeButton</span><span class="p">.</span><span class="nx">textContent</span> <span class="o">=</span> <span class="s1">&#39;Unsubscribe&#39;</span><span class="p">;</span>
    <span class="nx">isSubscribed</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span>
  <span class="p">});</span>
<span class="p">}</span>
<span class="kd">function</span> <span class="nx">unsubscribe</span><span class="p">()</span> <span class="p">{</span>
  <span class="nx">sub</span><span class="p">.</span><span class="nx">unsubscribe</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">subscribeButton</span><span class="p">.</span><span class="nx">textContent</span> <span class="o">=</span> <span class="s1">&#39;Subscribe&#39;</span><span class="p">;</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Unsubscribed!&#39;</span><span class="p">,</span> <span class="nx">event</span><span class="p">);</span>
    <span class="nx">isSubscribed</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>
  <span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Error unsubscribing&#39;</span><span class="p">,</span> <span class="nx">error</span><span class="p">);</span>
    <span class="nx">subscribeButton</span><span class="p">.</span><span class="nx">textContent</span> <span class="o">=</span> <span class="s1">&#39;Subscribe&#39;</span><span class="p">;</span>
  <span class="p">});</span>
<span class="p">}</span></code></pre></div>

In this code, you set the value of the ServiceWorkerRegistration object reg when the service worker installs, which is then used in the subscribe() function to subscribe to push messaging.

The `subscribe()` function creates the `PushSubscription` object **sub** which can be used by the `unsubscribe()` function.

Remember: the client gets a new registration ID every time it re-subscribes, so you will need to adjust requests to GCM accordingly.

