project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Push messages may consist of breaking news, site updates, or other information of interest to the user. The information is pushed from the server to a service worker before it is sent to the user as a notification.

<p class="intro">
  Push messages may consist of breaking news, site updates, or other 
  information of interest to the user. The information is pushed from the 
  server to a service worker before it is sent to the user as a notification.
</p>



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## Subscribe 

To receive messages, users must allow your web site to push notificaton 
messages to them. This is a two-step process performed on the receiving 
device, comprising of enabling of push notifications and an explicit 
subscription request to a specific web site. Both of these conditions must 
be met for the user to receive push messages; that is, a status of either 
"disabled" or "enabled but not subscribed" prevents messages from 
being received.

Push messages are implemented via a [service worker](/web/fundamentals/primers/service-workers/).
When a push message is received, the browser can start up a service worker 
that runs in the background without a page being open. The service worker 
must be initialized and registered in order to process push messages. 

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="c1">// Check that service workers are supported</span>
<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;serviceWorker&#39;</span> <span class="k">in</span> <span class="nx">navigator</span><span class="p">)</span> <span class="p">{</span>  
  <span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span><span class="p">.</span><span class="nx">register</span><span class="p">(</span><span class="s1">&#39;/service-worker.js&#39;</span><span class="p">)</span>  
    <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="nx">initialiseState</span><span class="p">);</span>  
  <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>  
    <span class="nx">console</span><span class="p">.</span><span class="nx">warn</span><span class="p">(</span><span class="s1">&#39;Service workers aren\&#39;t supported in this browser.&#39;</span><span class="p">);</span>  
<span class="p">}</span></code></pre></div>

Users expect a simple UI to enable or disable push messages for your site. 
This is typically accomplished via a UI element such as a button or toggle 
switch that enables or disables push messages and clearly indicates its 
state. For example:

![Push UX](images/pushux.png)

When the user requests a subscription activation, your web page must 
subscribe the user to your push service so they can receive messages.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="nx">subscribe</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// Disable the button so it can&#39;t be changed while</span>
  <span class="c1">//   we process the permission request</span>
  <span class="kd">var</span> <span class="nx">pushButton</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.js-push-button&#39;</span><span class="p">);</span>
  <span class="nx">pushButton</span><span class="p">.</span><span class="nx">disabled</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span>

  <span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span><span class="p">.</span><span class="nx">ready</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">serviceWorkerRegistration</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">serviceWorkerRegistration</span><span class="p">.</span><span class="nx">pushManager</span><span class="p">.</span><span class="nx">subscribe</span><span class="p">({</span><span class="nx">userVisibleOnly</span><span class="o">:</span> <span class="kc">true</span><span class="p">})</span>
      <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">subscription</span><span class="p">)</span> <span class="p">{</span>
        <span class="c1">// The subscription was successful</span>
        <span class="nx">isPushEnabled</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span>
        <span class="nx">pushButton</span><span class="p">.</span><span class="nx">textContent</span> <span class="o">=</span> <span class="s1">&#39;Disable Push Messages&#39;</span><span class="p">;</span>
        <span class="nx">pushButton</span><span class="p">.</span><span class="nx">disabled</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>

        <span class="c1">// TODO: Send the subscription subscription.endpoint</span>
        <span class="c1">// to your server and save it to send a push message</span>
        <span class="c1">// at a later date</span>
        <span class="k">return</span> <span class="nx">sendSubscriptionToServer</span><span class="p">(</span><span class="nx">subscription</span><span class="p">);</span>
      <span class="p">})</span>
      <span class="p">.</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">if</span> <span class="p">(</span><span class="nx">Notification</span><span class="p">.</span><span class="nx">permission</span> <span class="o">===</span> <span class="s1">&#39;denied&#39;</span><span class="p">)</span> <span class="p">{</span>
          <span class="c1">// The user denied the notification permission which</span>
          <span class="c1">// means we failed to subscribe and the user will need</span>
          <span class="c1">// to manually change the notification permission to</span>
          <span class="c1">// subscribe to push messages</span>
          <span class="nb">window</span><span class="p">.</span><span class="nx">Demo</span><span class="p">.</span><span class="nx">debug</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Permission for Notifications was denied&#39;</span><span class="p">);</span>
          <span class="nx">pushButton</span><span class="p">.</span><span class="nx">disabled</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span>
        <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
          <span class="c1">// A problem occurred with the subscription, this can</span>
          <span class="c1">// often be down to an issue or lack of the gcm_sender_id</span>
          <span class="c1">// and / or gcm_user_visible_only</span>
          <span class="nb">window</span><span class="p">.</span><span class="nx">Demo</span><span class="p">.</span><span class="nx">debug</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Unable to subscribe to push.&#39;</span><span class="p">,</span> <span class="nx">e</span><span class="p">);</span>
          <span class="nx">pushButton</span><span class="p">.</span><span class="nx">disabled</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>
          <span class="nx">pushButton</span><span class="p">.</span><span class="nx">textContent</span> <span class="o">=</span> <span class="s1">&#39;Enable Push Messages&#39;</span><span class="p">;</span>
        <span class="p">}</span>
    <span class="p">});</span>
  <span class="p">});</span>
<span class="p">}</span></code></pre></div>

## Unsubscribe

Likewise, users can refuse push messages, either by unsubscribing to a 
specific site or by disabling push notifications completely. Your page has 
no control over their global enable/disable setting, but you should 
unsubscribe users when they request it.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="nx">unsubscribe</span><span class="p">()</span> <span class="p">{</span>  
  <span class="kd">var</span> <span class="nx">pushButton</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.js-push-button&#39;</span><span class="p">);</span>  
  <span class="nx">pushButton</span><span class="p">.</span><span class="nx">disabled</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span>

  <span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span><span class="p">.</span><span class="nx">ready</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">serviceWorkerRegistration</span><span class="p">)</span> <span class="p">{</span>  
    <span class="c1">// To unsubscribe from push messaging, you need get the  </span>
    <span class="c1">// subscription object, which you can call unsubscribe() on.  </span>
    <span class="nx">serviceWorkerRegistration</span><span class="p">.</span><span class="nx">pushManager</span><span class="p">.</span><span class="nx">getSubscription</span><span class="p">()</span>
      <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">pushSubscription</span><span class="p">)</span> <span class="p">{</span>  
        <span class="c1">// Check we have a subscription to unsubscribe  </span>
        <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">pushSubscription</span><span class="p">)</span> <span class="p">{</span>  
          <span class="c1">// No subscription object, so set the state  </span>
          <span class="c1">// to allow the user to subscribe to push  </span>
          <span class="nx">isPushEnabled</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>  
          <span class="nx">pushButton</span><span class="p">.</span><span class="nx">disabled</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>  
          <span class="nx">pushButton</span><span class="p">.</span><span class="nx">textContent</span> <span class="o">=</span> <span class="s1">&#39;Enable Push Messages&#39;</span><span class="p">;</span>  
          <span class="k">return</span><span class="p">;</span>  
        <span class="p">}</span>  

        <span class="c1">// TODO: Make a request to your server to remove</span>
        <span class="c1">// the users data from your data store so you</span>
        <span class="c1">// don&#39;t attempt to send them push messages anymore</span>

        <span class="c1">// We have a subscription, so call unsubscribe on it  </span>
        <span class="nx">pushSubscription</span><span class="p">.</span><span class="nx">unsubscribe</span><span class="p">()</span>
          <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">successful</span><span class="p">)</span> <span class="p">{</span>  
            <span class="nx">pushButton</span><span class="p">.</span><span class="nx">disabled</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>  
            <span class="nx">pushButton</span><span class="p">.</span><span class="nx">textContent</span> <span class="o">=</span> <span class="s1">&#39;Enable Push Messages&#39;</span><span class="p">;</span>  
            <span class="nx">isPushEnabled</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>  
          <span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>  
            <span class="c1">// We failed to unsubscribe, this can lead to  </span>
            <span class="c1">// an unusual state, so may be best to remove   </span>
            <span class="c1">// the users data from your data store and   </span>
            <span class="c1">// inform the user that you have done so</span>

            <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Unsubscription error: &#39;</span><span class="p">,</span> <span class="nx">e</span><span class="p">);</span>  
            <span class="nx">pushButton</span><span class="p">.</span><span class="nx">disabled</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>
            <span class="nx">pushButton</span><span class="p">.</span><span class="nx">textContent</span> <span class="o">=</span> <span class="s1">&#39;Enable Push Messages&#39;</span><span class="p">;</span> 
          <span class="p">});</span>  
      <span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>  
        <span class="nx">console</span><span class="p">.</span><span class="nx">error</span><span class="p">(</span><span class="s1">&#39;Error thrown while unsubscribing from push messaging.&#39;</span><span class="p">,</span> <span class="nx">e</span><span class="p">);</span>  
      <span class="p">});</span>  
  <span class="p">});</span>  
<span class="p">}</span></code></pre></div>

