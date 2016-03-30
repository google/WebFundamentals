---
layout: shared/narrow
title: "Handle Subscriptions"
description: "To receive messages, users must allow your web site to push messages to them. That's where subscriptions come in. You can't just subscribe users and call it done. You need to let users unsubscribe as well."
authors:
- dgash
published_on: 2015-10-01
updated_on: 2016-04-01
order: 30
translation_priority: 1 
notes:
  clarity: "For clarity, this code sample excludes several items include two <code>catch()</code> clauses for error handling."
---

<p class="intro">
  To receive messages, users must allow your web site to push messages to them. That's where subscriptions come in. You can't just subscribe users and call it done. You need to let users unsubscribe as well.
</p>

{% include shared/toc.liquid %}

This lesson uses code from the [Push Messaging and Notifications](https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications) Chrome sample, but it doesn't show all of the code in that sample. Instead, we're going to highlight certain aspects of it.

## User permission

Users expect a simple UI to enable or disable push messages for your site. 
This is typically accomplished via a button or a [switch from Material Design Light](https://www.getmdl.io/components/index.html#toggles-section/switch) that enables or disables push messages and clearly indicates its 
state. 

When the user requests a subscription activation, your web page must 
subscribe the user to your push service so they can receive messages. For example:

![Example of a mobile permission control](images/pushux.png)

The section on [Best Practices](/web/fundamentals/engage-and-retain/push-best-practices/asking-permission) looks at where and when to show the switch. The key thing is, don't ask for permission unless the switch has been toggled.

## Subscribing

Subscribing to notification is a two step process, first requesting permission and getting the user's endpoint (essentially an id to that user/device) and then sending the endpoint info to YOUR server so that you can reach the user later when you're ready to send a message.

Subscribing to push is done by calling `pushManager.subscribe()` (a member of the [service worker registration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration) interface). This triggers a permission request from the browser, but only applies to your site or app. As with when to request permissions, when to call `subscribe()` is also a [best practices](/web/fundamentals/engage-and-retain/push-best-practices) issue. If the time and the trigger aren't chosen carefully, users may be surprised or annoyed.

{% highlight javascript %}
function subscribe() {

  // CODE EXCERPTED 

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    // STEP 1: Subscribe to push.
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
      .then(function(subscription) {
        // The subscription was successful.
        // Toggle the user control.
        isPushEnabled = true;

        // STEP 2: Let your web server know the user has subscribed.
        return sendSubscriptionToServer(subscription);
     })
     .catch(function(e) {
       If (Notification.permission === 'denied') {
  // The user did not grant permission.
       } else {
            // Some other error occurred.
       }
     });
  });
}
{% endhighlight %}

## Unsubscribe

If a user decides they no longer wish to receive notifications, they should be able to disable them within your app. If you don't provide a way to unsubscribe, they may turn off notifications for your site globally, and you'll never get them back. Your page has 
no control over their global enable/disable setting, but you should 
unsubscribe users when they request it.

{% include shared/note.liquid list=page.notes.clarity %}

{% highlight javascript %}
function unsubscribe() { 
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
    // To unsubscribe from push messaging, you need to get the  
    // subscription object, which you can call unsubscribe() on.  
    serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(pushSubscription) { 
        // We have a subscription, so call unsubscribe on it  
        pushSubscription.unsubscribe()
          .then(function(successful) {     
            isPushEnabled = false; 
          }); 
  });  
}
{% endhighlight %}