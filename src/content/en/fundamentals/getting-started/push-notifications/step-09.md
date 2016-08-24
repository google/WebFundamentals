project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Add code to your service worker's push handler to show a notification.

A completed version of this step is in the completed/step9 directory.

In this step you will add code to your service worker's push handler to show a
notification.

## 1. Add showNotification() code

Update _sw.js_ to look like this, replacing the _TODO_ comment:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Started&#39;</span><span class="p">,</span> <span class="nx">self</span><span class="p">);</span>
<span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;install&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">self</span><span class="p">.</span><span class="nx">skipWaiting</span><span class="p">();</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Installed&#39;</span><span class="p">,</span> <span class="nx">event</span><span class="p">);</span>
<span class="p">});</span>
<span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;activate&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Activated&#39;</span><span class="p">,</span> <span class="nx">event</span><span class="p">);</span>
<span class="p">});</span>
<span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;push&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Push message&#39;</span><span class="p">,</span> <span class="nx">event</span><span class="p">);</span>
  <span class="kd">var</span> <span class="nx">title</span> <span class="o">=</span> <span class="s1">&#39;Push message&#39;</span><span class="p">;</span>
  <span class="nx">event</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>
    <span class="nx">self</span><span class="p">.</span><span class="nx">registration</span><span class="p">.</span><span class="nx">showNotification</span><span class="p">(</span><span class="nx">title</span><span class="p">,</span> <span class="p">{</span>
      <span class="nx">body</span><span class="o">:</span> <span class="s1">&#39;The Message&#39;</span><span class="p">,</span>
      <span class="nx">icon</span><span class="o">:</span> <span class="s1">&#39;images/icon.png&#39;</span><span class="p">,</span>
      <span class="nx">tag</span><span class="o">:</span> <span class="s1">&#39;my-tag&#39;</span>
    <span class="p">}));</span>
<span class="p">});</span>
<span class="c1">// TODO</span></code></pre></div>

The `event.waitUntil()` method takes a promise and extends the lifetime of the event handler until, in this case, the promise returned by `showNotification()` is resolved.

One notification will be shown for each tag value: if a new push message is received, the old notification will be replaced. To show multiple notifications, use a different tag value for each showNotification() call, or no tag at all.

## 2. Make a request to GCM to send a notification

Run the cURL command or the XHR request from the previous steps.

You should see a notification like this:

<img src="images/image19.png" width="394" height="114" alt="Screenshot of Push Notification" />

