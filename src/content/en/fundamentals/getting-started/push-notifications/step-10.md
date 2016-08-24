project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Add service worker code to enable an action (such as navigating to a web page) when a user clicks a notification.

A completed version of this step is in the completed/step10 directory.

In this step you will add code to enable an action (such as navigating to a web page) when a user clicks a notification.

Add the following code to _sw.js_, replacing the _TODO_ comment from step
6:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;notificationclick&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Notification click: tag &#39;</span><span class="p">,</span> <span class="nx">event</span><span class="p">.</span><span class="nx">notification</span><span class="p">.</span><span class="nx">tag</span><span class="p">);</span>
    <span class="nx">event</span><span class="p">.</span><span class="nx">notification</span><span class="p">.</span><span class="nx">close</span><span class="p">();</span>
    <span class="kd">var</span> <span class="nx">url</span> <span class="o">=</span> <span class="s1">&#39;https://youtu.be/gYMkEMCHtJ4&#39;</span><span class="p">;</span>
    <span class="nx">event</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>
        <span class="nx">clients</span><span class="p">.</span><span class="nx">matchAll</span><span class="p">({</span>
            <span class="nx">type</span><span class="o">:</span> <span class="s1">&#39;window&#39;</span>
        <span class="p">})</span>
        <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">windowClients</span><span class="p">)</span> <span class="p">{</span>
            <span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">windowClients</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
                <span class="kd">var</span> <span class="nx">client</span> <span class="o">=</span> <span class="nx">windowClients</span><span class="p">[</span><span class="nx">i</span><span class="p">];</span>
                <span class="k">if</span> <span class="p">(</span><span class="nx">client</span><span class="p">.</span><span class="nx">url</span> <span class="o">===</span> <span class="nx">url</span> <span class="o">&amp;&amp;</span> <span class="s1">&#39;focus&#39;</span> <span class="k">in</span> <span class="nx">client</span><span class="p">)</span> <span class="p">{</span>
                    <span class="k">return</span> <span class="nx">client</span><span class="p">.</span><span class="nx">focus</span><span class="p">();</span>
                <span class="p">}</span>
            <span class="p">}</span>
            <span class="k">if</span> <span class="p">(</span><span class="nx">clients</span><span class="p">.</span><span class="nx">openWindow</span><span class="p">)</span> <span class="p">{</span>
                <span class="k">return</span> <span class="nx">clients</span><span class="p">.</span><span class="nx">openWindow</span><span class="p">(</span><span class="nx">url</span><span class="p">);</span>
            <span class="p">}</span>
        <span class="p">})</span>
    <span class="p">);</span>
<span class="p">});</span></code></pre></div>

This code listens for a notification click, then opens a web page — in this example, a YouTube video.

This code checks all window clients for this service worker: if the requested URL is already open in a tab, focus on it — otherwise open a new tab for it.

**NOTE**: Android [doesn't close the notification](https://crbug.com/463146) when you click it.

That's why we need `event.notification.close();`.

