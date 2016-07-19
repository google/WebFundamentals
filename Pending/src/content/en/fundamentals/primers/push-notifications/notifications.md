project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: The notification is the actual message that is sent to a user after he has enabled push messages and has subscribed to the site. Messages are often sent via Google Cloud Messaging (GCM), a service that handles all aspects of message queueing and delivery to client applications running on target devices, but there are other services that support push notifications.

<p class="intro">
  The notification is the actual message that is sent to a user after enabling
  push messages and has subscribed to the site. Messages are often sent 
  via <a href="https://developer.android.com/google/gcm/index.html">Google 
  Cloud Messaging (GCM)</a>, a service that handles all aspects of message 
  queueing and delivery to client applications running on target devices, but 
  there are other services that support push notifications.
</p>



At the most basic level, push notifications from a web app need a back-end 
service to handle messaging. Chrome currently uses Google Cloud Messaging 
(GCM). While the eventual goal is for Chrome and GCM to support the 
[Web Push Protocol](https://datatracker.ietf.org/doc/draft-thomson-webpush-protocol/), 
other browsers are free to use other services.

## Displaying

To use the GCM API, you must set up a project in the 
[Google Developer Console](https://console.developers.google.com/). Follow the 
instructions in the getting started guide for either 
[Android](https://developers.google.com/cloud-messaging/android/start) or 
[iOS](https://developers.google.com/cloud-messaging/ios/start). Make sure to 
enable *Google Cloud Messaging for Android*, and make a note of the 
*project number* and *API key*, as you’ll need them later on. The project 
number is used in the web app manifest ([below](#the-web-app-manifest)) as the `gcm_sender_id` 
parameter, and you will need the Public API Key on your server when you use 
the GCM API.

### The web app manifest

You will also need a [manifest](/web/fundamentals/engage-and-retain/web-app-manifest) 
file that includes the `gcm_sender_id` parameter, used by Chrome when 
establishing a subscription with GCM. This allows GCM to link a specific 
subscription to a corresponding project number that can be matched with the 
corresponding public API key. This relationship ensures that your server 
is permitted to send messages to the client web app by validating the 
information against the IP addresses whitelisted in the project you set up 
in Google Developer Console.

<div class="highlight"><pre><code class="language-json" data-lang="json"><span class="p">{</span>  
  <span class="nt">&quot;name&quot;</span><span class="p">:</span> <span class="s2">&quot;Push Demo&quot;</span><span class="p">,</span>  
  <span class="nt">&quot;short_name&quot;</span><span class="p">:</span> <span class="s2">&quot;Push Demo&quot;</span><span class="p">,</span>  
  <span class="nt">&quot;icons&quot;</span><span class="p">:</span> <span class="p">[{</span>  
    <span class="nt">&quot;src&quot;</span><span class="p">:</span> <span class="s2">&quot;images/icon-192x192.png&quot;</span><span class="p">,</span>  
    <span class="nt">&quot;sizes&quot;</span><span class="p">:</span> <span class="s2">&quot;192x192&quot;</span><span class="p">,</span>
    <span class="nt">&quot;type&quot;</span><span class="p">:</span> <span class="s2">&quot;image/png&quot;</span> 
  <span class="p">}],</span>  
  <span class="nt">&quot;start_url&quot;</span><span class="p">:</span> <span class="s2">&quot;/index.html?homescreen=1&quot;</span><span class="p">,</span>  
  <span class="nt">&quot;display&quot;</span><span class="p">:</span> <span class="s2">&quot;standalone&quot;</span><span class="p">,</span>  
  <span class="nt">&quot;gcm_sender_id&quot;</span><span class="p">:</span> <span class="s2">&quot;123456789012&quot;</span><span class="p">,</span>  
  <span class="nt">&quot;gcm_user_visible_only&quot;</span><span class="p">:</span> <span class="kc">true</span>  
<span class="p">}</span></code></pre></div>

When a push message is received, a push event is dispatched in the 
service worker, at which point it is ready to display a notification.

You can send notifications via GCM; in addition to the introductory 
document linked above, you can find more detailed information 
[in the GCM documentation](https://developer.chrome.com/apps/gcm). Some key 
aspects of the API include:

- An Authorization header with a value of `key=<YOUR_PUBLIC_API_KEY>`, which 
is the API key from the Google Developer Console. The public API key is used 
by GCM to find the appropriate project number, match it with the subscription 
ID’s project number you want to send the message to, and ensure that the 
server’s IP address is whitelisted for that project.
- An appropriate `Content-Type` header of `application/json` or 
`application/x-www-form-urlencoded; charset=UTF-8`, depending on whether you 
send the data as JSON or form data.
- An array of `registration_ids`, which you can extract from the 
`PushSubscription.endpoint` you sent to your server.

## Responding to the display

When the user clicks a notification, a `notificationclick` event is 
dispatched in the service worker. In the handler function, you can take 
appropriate action. A common response to a `notificationclick` event 
is to focus a tab or open a window with a particular URL.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;notificationclick&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>  
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;On notification click: &#39;</span><span class="p">,</span> <span class="nx">event</span><span class="p">.</span><span class="nx">notification</span><span class="p">.</span><span class="nx">tag</span><span class="p">);</span>  
  <span class="c1">// Android doesn&#39;t close the notification when you click on it.</span>
  <span class="nx">event</span><span class="p">.</span><span class="nx">notification</span><span class="p">.</span><span class="nx">close</span><span class="p">();</span>

  <span class="c1">// This looks to see if the current window is already open and  </span>
  <span class="c1">// focuses if it is  </span>
  <span class="nx">event</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>
    <span class="nx">clients</span><span class="p">.</span><span class="nx">matchAll</span><span class="p">({</span> <span class="nx">type</span><span class="o">:</span> <span class="s2">&quot;window&quot;</span> <span class="p">})</span>
      <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">clientList</span><span class="p">)</span> <span class="p">{</span>  
        <span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">clientList</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>  
          <span class="kd">var</span> <span class="nx">client</span> <span class="o">=</span> <span class="nx">clientList</span><span class="p">[</span><span class="nx">i</span><span class="p">];</span>  
          <span class="k">if</span> <span class="p">(</span><span class="nx">client</span><span class="p">.</span><span class="nx">url</span> <span class="o">==</span> <span class="s1">&#39;/&#39;</span> <span class="o">&amp;&amp;</span> <span class="s1">&#39;focus&#39;</span> <span class="k">in</span> <span class="nx">client</span><span class="p">)</span>  
            <span class="k">return</span> <span class="nx">client</span><span class="p">.</span><span class="nx">focus</span><span class="p">();</span>  
        <span class="p">}</span>  
        <span class="k">if</span> <span class="p">(</span><span class="nx">clients</span><span class="p">.</span><span class="nx">openWindow</span><span class="p">)</span> <span class="p">{</span>
          <span class="k">return</span> <span class="nx">clients</span><span class="p">.</span><span class="nx">openWindow</span><span class="p">(</span><span class="s1">&#39;/&#39;</span><span class="p">);</span>  
        <span class="p">}</span>
      <span class="p">})</span>
  <span class="p">);</span>
<span class="p">});</span></code></pre></div>

The current implementation of the Push API in Chrome does not allow you to send 
a payload with a push message. In the future, the payload will be encrypted 
on your server before it is sent to a push messaging endpoint. That is so that 
the endpoint, regardless of the push provider, will not be able to easily view 
the content of the push payload. Encryption also protects against other 
vulnerabilities like poor validation of HTTPS certificates and 
man-in-the-middle attacks between your server and the push provider. 

To get around not being able to tie data to your notification, you could use 
the service worker's caching API, for example, to save a URL for a 
particular notification tag; that way you can look it up in the 
`notificationclick` event and open the window to that URL.

An alternative approach (albeit somewhat unconventional) is to use a fragment
identifier on the end of your icon URL. This won’t affect the image’s
cacheability, and gives you access to a short URL. 



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






