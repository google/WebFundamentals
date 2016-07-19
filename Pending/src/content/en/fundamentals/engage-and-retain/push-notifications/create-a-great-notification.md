project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: 

## Always use a title, description, and icon

A notification takes a number of options. To be minimally user-friendly you
should always include a title, description, and icon. Do this with the options
parameter of the `showNotification()` method. For example:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">self</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;push&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Received a push message&#39;</span><span class="p">,</span> <span class="nx">event</span><span class="p">);</span>

    <span class="kd">var</span> <span class="nx">title</span> <span class="o">=</span> <span class="s1">&#39;Yay a message.&#39;</span><span class="p">;</span>
    <span class="kd">var</span> <span class="nx">body</span> <span class="o">=</span> <span class="s1">&#39;We have received a push message.&#39;</span><span class="p">;</span>
    <span class="kd">var</span> <span class="nx">icon</span> <span class="o">=</span> <span class="s1">&#39;/images/icon-192x192.png&#39;</span><span class="p">;</span>
    <span class="kd">var</span> <span class="nx">tag</span> <span class="o">=</span> <span class="s1">&#39;simple-push-demo-notification-tag&#39;</span><span class="p">;</span>

    <span class="nx">event</span><span class="p">.</span><span class="nx">waitUntil</span><span class="p">(</span>
      <span class="nx">self</span><span class="p">.</span><span class="nx">registration</span><span class="p">.</span><span class="nx">showNotification</span><span class="p">(</span><span class="nx">title</span><span class="p">,</span> <span class="p">{</span>
        <span class="nx">body</span><span class="o">:</span> <span class="nx">body</span><span class="p">,</span>
        <span class="nx">icon</span><span class="o">:</span> <span class="nx">icon</span><span class="p">,</span>
        <span class="nx">tag</span><span class="o">:</span> <span class="nx">tag</span>
      <span class="p">})</span>
    <span class="p">);</span>
  <span class="p">});</span></code></pre></div>

## Make the title relevant and specific

Make the title relevant to the context of the message and include something
specific from the message.

**BAD:** Notifcation from facebook.com

**GOOD:** Paul Kinlan sent you a message

## Make the icon contextual

Just as with titles, icons should convey something about the message. In the
previous instance where 'Paul Kinlan sent you a message', use an
icon specific to messages rather than your app or site logo.

## Use vibration judiciously

To vibrate a mobile device has to run a tiny motor. Consequently it's a larger
battery drain than an on-screen notification. Be courteous of the user and use
vibration judiciously. Give users the ability to select which notifications
use vibrate, or to turn them off completely.

## Combine similar notifications

Even though you're not spamming users, you might still have a reason to send
multiple, similar notifications back to back.  For example, if a messaging app
receives two messages back to back, instead of stacking the messages you might
do something like this:

![Combined notifications](images/combined-notifications.png)

Notice that this message has also pluralized the text to make it clear that
more than one update is available.

