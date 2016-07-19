project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: A service running on a server is responsible for taking the data provided in the push message and actually forwarding it to the user as a notification.

<p class="intro">
  A service running on the server is responsible for taking the 
  data provided in the push message and actually forwarding it to the user as a notification.
</p>



The [GCM documentation](https://developer.android.com/google/gcm/index.html) 
has a reference for the [HTTP syntax](https://developers.google.com/cloud-messaging/http-server-ref)
used to pass messages from your app server to client apps. The 
[XMPP server protocol](https://developers.google.com/cloud-messaging/xmpp-server-ref)
serves a similar purpose.

## Message content

In the service worker's push handler, code is executed that establishes 
the message information, including the `title`, `body`, `icon`, and `tag`. It 
is the service worker's job to take the pushed data and turn it into a 
sendable notification.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;push&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Push message&#39;</span><span class="p">,</span> <span class="nx">event</span><span class="p">);</span>
  <span class="kd">var</span> <span class="nx">title</span> <span class="o">=</span> <span class="s1">&#39;Push message&#39;</span><span class="p">;</span>
  <span class="nx">event</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>
    <span class="nx">self</span><span class="p">.</span><span class="nx">registration</span><span class="p">.</span><span class="nx">showNotification</span><span class="p">(</span><span class="nx">title</span><span class="p">,</span> <span class="p">{</span>
      <span class="nx">body</span><span class="o">:</span> <span class="s1">&#39;The Message&#39;</span><span class="p">,</span>
      <span class="nx">icon</span><span class="o">:</span> <span class="s1">&#39;images/icon.png&#39;</span><span class="p">,</span>
      <span class="nx">tag</span><span class="o">:</span> <span class="s1">&#39;my-tag&#39;</span>
    <span class="p">})</span>
  <span class="p">);</span>
<span class="p">});</span></code></pre></div>


## Notification test

[Earlier](notifications), we discussed creating a project in Google Developer 
Console, and retaining some information for later use in the manifest file. 
That information is also useful in a simple notification test.

For a quick check of your service worker, you can use 
[cURL](https://en.wikipedia.org/wiki/CURL) to send a push message to your 
browser, provided that you have whitelisted your IP address for your local 
machine in the Google Developer Console.

In the cURL command below, replace `<YOUR_PUBLIC_API_KEY>` and 
`<YOUR_REGISTRATION_ID>` with your values, run it from a terminal window, 
and you should get a notification.

<div class="highlight"><pre><code class="language-bash" data-lang="bash">curl --header <span class="s2">&quot;Authorization: key=&lt;YOUR_PUBLIC_API_KEY&gt;&quot;</span> <span class="se">\ </span>
  --header <span class="s2">&quot;Content-Type: application/json&quot;</span> 
  https://android.googleapis.com/gcm/send -d <span class="se">\</span>
  <span class="s1">&#39;{&quot;registration_ids&quot;:[&quot;&lt;YOUR_REGISTRATION_ID&gt;&quot;]}&#39;</span></code></pre></div>

