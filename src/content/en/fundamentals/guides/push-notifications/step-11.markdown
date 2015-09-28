---
layout: shared/narrow
title: "Unsubscribe from notifications"
description: "Enable your users to unsubscribe from Push Notifications."
notes:
  styling:
    - Styling will come later
published_on: 2015-09-28
updated_on: 2015-09-28
translation_priority: 0
authors:
  - samdutton
---

{% include shared/toc.liquid %}

A completed version of this step is in the completed/step11 directory.

ENOUGH WITH THE MESSAGES ALREADY! How can you enable your users to unsubscribe and resubscribe?

Simple: a client unsubscribes from notifications by calling the `unsubscribe()`
method of the `PushSubscription` object.

In a production implementation you will also need to to remove subscription data
for an unsubscribed client from your server, to avoid sending notifications that
won't be received.

1. **Add a Subscribe/Unsubscribe button to your app**<br>
   <br>
   In the _index.html_ file you created in Step 1, add a button so the code
   looks like this:<br>
   <br>
   {% highlight html %}
   &lt;!DOCTYPE html&gt;
   &lt;html&gt;
   &lt;head&gt;
     &lt;title&gt;Push Notification codelab&lt;/title&gt;
     &lt;link rel="manifest" href="manifest.json"&gt;
   &lt;/head&gt;
   &lt;body&gt;
     &lt;h1&gt;Push Notification codelab&lt;/h1&gt;
     &lt;p&gt;This page must be accessed using HTTPS or via localhost.&lt;/p&gt;
     &lt;button disabled&gt;Subscribe&lt;/button&gt;
     &lt;script src="js/main.js"&gt;&lt;/script&gt;
   &lt;/body&gt;
   &lt;/html&gt;
   {% end highlight %}

2. **Add subscribe/unsubscribe functionality to _main.js_**<br>
   <br>
   Adjust _main.js_ so the code looks like this:<br>
   {% highlight javascript %}
   var reg;
   var sub;
   var isSubscribed = false;
   var subscribeButton = document.querySelector('button');
   if ('serviceWorker' in navigator) {
     console.log('Service Worker is supported');
     navigator.serviceWorker.register('sw.js').then(function() {
       return navigator.serviceWorker.ready;
     }).then(function(serviceWorkerRegistration) {
       reg = serviceWorkerRegistration;
       subscribeButton.disabled = false;
       console.log('Service Worker is ready :^)', reg);
     }).catch(function(error) {
       console.log('Service Worker Error :^(', error);
     });
   }
   subscribeButton.addEventListener('click', function() {
     if (isSubscribed) {
       unsubscribe();
     } else {
       subscribe();
     }
   });
   function subscribe() {
     reg.pushManager.subscribe({userVisibleOnly: true}).
     then(function(pushSubscription){
       sub = pushSubscription;
       console.log('Subscribed! Endpoint:', sub.endpoint);
       subscribeButton.textContent = 'Unsubscribe';
       isSubscribed = true;
     });
   }
   function unsubscribe() {
     sub.unsubscribe().then(function(event) {
       subscribeButton.textContent = 'Subscribe';
       console.log('Unsubscribed!', event);
       isSubscribed = false;
     }).catch(function(error) {
       console.log('Error unsubscribing', error);
       subscribeButton.textContent = 'Subscribe';
     });
   }
   {% end highlight %}<br>
   <br>
   In this code, you set the value of the ServiceWorkerRegistration object reg when the Service Worker installs, which is then used in the subscribe() function to subscribe to push messaging.<br>
   <br>
   The `subscribe()` function creates the `PushSubscription` object **sub** which can be used by the `unsubscribe()` function.<br>
   <br>
   Remember: every time the client gets a new registration ID every time it re-subscribes, so you will need to adjust requests to GCM accordingly.
