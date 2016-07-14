---
layout: shared/narrow
title: "Register for push messages"
description: "Push messages may consist of breaking news, site updates, or other information of interest to the user. The information is pushed from the server to a service worker before it is sent to the user as a notification."
authors:
- dgash
published_on: 2015-10-01
updated_on: 2015-10-01
order: 2
translation_priority: 1
key-takeaways:
  tldr:
    - Users must first allow push messages as a global permissions setting.
    - Users must also explicitly subscribe to your site to receive notifications.
    - You can unsubscribe users at their request, regardless of their global notifications permissions.
---

<p class="intro">
  Push messages may consist of breaking news, site updates, or other 
  information of interest to the user. The information is pushed from the 
  server to a service worker before it is sent to the user as a notification.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

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

{% highlight javascript %}
// Check that service workers are supported
if ('serviceWorker' in navigator) {  
  navigator.serviceWorker.register('/service-worker.js')  
    .then(initialiseState);  
  } else {  
    console.warn('Service workers aren\'t supported in this browser.');  
}
{% endhighlight %}

Users expect a simple UI to enable or disable push messages for your site. 
This is typically accomplished via a UI element such as a button or toggle 
switch that enables or disables push messages and clearly indicates its 
state. For example:

![Push UX](images/pushux.png)

When the user requests a subscription activation, your web page must 
subscribe the user to your push service so they can receive messages.

{% highlight javascript %}
function subscribe() {
  // Disable the button so it can't be changed while
  //   we process the permission request
  var pushButton = document.querySelector('.js-push-button');
  pushButton.disabled = true;

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
      .then(function(subscription) {
        // The subscription was successful
        isPushEnabled = true;
        pushButton.textContent = 'Disable Push Messages';
        pushButton.disabled = false;

        // TODO: Send the subscription subscription.endpoint
        // to your server and save it to send a push message
        // at a later date
        return sendSubscriptionToServer(subscription);
      })
      .catch(function(e) {
        if (Notification.permission === 'denied') {
          // The user denied the notification permission which
          // means we failed to subscribe and the user will need
          // to manually change the notification permission to
          // subscribe to push messages
          window.Demo.debug.log('Permission for Notifications was denied');
          pushButton.disabled = true;
        } else {
          // A problem occurred with the subscription, this can
          // often be down to an issue or lack of the gcm_sender_id
          // and / or gcm_user_visible_only
          window.Demo.debug.log('Unable to subscribe to push.', e);
          pushButton.disabled = false;
          pushButton.textContent = 'Enable Push Messages';
        }
    });
  });
}
{% endhighlight %}

## Unsubscribe

Likewise, users can refuse push messages, either by unsubscribing to a 
specific site or by disabling push notifications completely. Your page has 
no control over their global enable/disable setting, but you should 
unsubscribe users when they request it.

{% highlight javascript %}
function unsubscribe() {  
  var pushButton = document.querySelector('.js-push-button');  
  pushButton.disabled = true;

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
    // To unsubscribe from push messaging, you need get the  
    // subscription object, which you can call unsubscribe() on.  
    serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(pushSubscription) {  
        // Check we have a subscription to unsubscribe  
        if (!pushSubscription) {  
          // No subscription object, so set the state  
          // to allow the user to subscribe to push  
          isPushEnabled = false;  
          pushButton.disabled = false;  
          pushButton.textContent = 'Enable Push Messages';  
          return;  
        }  

        // TODO: Make a request to your server to remove
        // the users data from your data store so you
        // don't attempt to send them push messages anymore

        // We have a subscription, so call unsubscribe on it  
        pushSubscription.unsubscribe()
          .then(function(successful) {  
            pushButton.disabled = false;  
            pushButton.textContent = 'Enable Push Messages';  
            isPushEnabled = false;  
          }).catch(function(e) {  
            // We failed to unsubscribe, this can lead to  
            // an unusual state, so may be best to remove   
            // the users data from your data store and   
            // inform the user that you have done so

            console.log('Unsubscription error: ', e);  
            pushButton.disabled = false;
            pushButton.textContent = 'Enable Push Messages'; 
          });  
      }).catch(function(e) {  
        console.error('Error thrown while unsubscribing from push messaging.', e);  
      });  
  });  
}
{% endhighlight %}
