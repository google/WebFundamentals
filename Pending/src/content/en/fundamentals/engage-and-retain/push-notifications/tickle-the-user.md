project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: The PushMessageData object will eventually let you send data to the user immediately, but you may not want to use that every time, especially if additional data could accumulate on the server after the notification is sent.

<p class="intro"> 
  The PushMessageData object will eventually let you send
  data to the user immediately, but you may not want to use that every time,
  especially if additional data could accumulate on the server after the
  notification is sent. 
</p>



For example, an email client might want to show a notification when an email
comes in. It might be several minutes before the user acknowledges the
notification. Meanwhile additional emails have appeared on the server. In that
case, use `fetch()` inside the `onnotificationclick` event.

## In the service worker

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;notificationclick&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">event</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>
    <span class="kd">var</span> <span class="nx">someRequest</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Request</span><span class="p">(</span><span class="s1">&#39;some/url/path.html&#39;</span><span class="p">);</span>
    <span class="c1">// This call will be intercepted by the fetch handler.</span>
    <span class="nx">fetch</span><span class="p">(</span><span class="nx">someRequest</span><span class="p">);</span>
  <span class="p">)</span>
  <span class="p">});</span>

  <span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;fetch&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">event</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>
      <span class="c1">//Some call to global fetch with an appropriate caching pattern.</span>
    <span class="p">)</span>
  <span class="p">});</span></code></pre></div>

## In the client page

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;focus&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
    <span class="kd">var</span> <span class="nx">someRequest</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Request</span><span class="p">(</span><span class="s1">&#39;some/url/path.html&#39;</span><span class="p">);</span>
    <span class="c1">// This call will be intercepted by the service worker&#39;s</span>
    <span class="c1">// fetch handler and the result returned from cache.</span>
    <span class="kd">var</span> <span class="nx">someResponse</span> <span class="o">=</span> <span class="nx">fetch</span><span class="p">(</span><span class="nx">someRequest</span><span class="p">);</span>
    <span class="c1">// Update the page with the data from the response.</span>
  <span class="p">});</span></code></pre></div>

