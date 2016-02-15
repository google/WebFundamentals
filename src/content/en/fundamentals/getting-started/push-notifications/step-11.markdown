---
layout: shared/narrow
title: "Unsubscribe from notifications"
description: "Enable your users to unsubscribe from Push Notifications."
notes:
  styling:
    - Styling will come later
published_on: 2015-09-28
updated_on: 2015-09-28
translation_priority: 1
order: 11
authors:
  - samdutton
---

{% include shared/toc.liquid %}

A completed version of this step is in the completed/step11 directory.

**ENOUGH WITH THE MESSAGES ALREADY :^)!**

How can you enable your users to unsubscribe and resubscribe?

Simple: a client unsubscribes from notifications by calling the `unsubscribe()`
method of the `PushSubscription` object.

In a production implementation you will also need to to remove subscription data for an unsubscribed client from your server, to avoid sending notifications that won't be received.

## 1. Add a Subscribe/Unsubscribe button to your app

In the _index.html_ file you created earlier, add a button so the code looks like this:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <title>Push Notification codelab</title>
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <h1>Push Notification codelab</h1>
  <p>This page must be accessed using HTTPS or via localhost.</p>
  <button disabled>Subscribe</button>
  <script src="js/main.js"></script>
</body>
</html>
{% endhighlight %}

## 2. Add subscribe/unsubscribe functionality to _main.js_

Adjust _main.js_ so the code looks like this:

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
{% endhighlight %}

In this code, you set the value of the ServiceWorkerRegistration object reg when the service worker installs, which is then used in the subscribe() function to subscribe to push messaging.

The `subscribe()` function creates the `PushSubscription` object **sub** which can be used by the `unsubscribe()` function.

Remember: the client gets a new registration ID every time it re-subscribes, so you will need to adjust requests to GCM accordingly.
