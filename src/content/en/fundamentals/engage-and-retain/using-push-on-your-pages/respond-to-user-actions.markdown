---
layout: shared/narrow
title: "Respond to User Actions"
description: "Notifications are great, but notifications by themselves aren't as engaging as they could be. We show a notification because we want a response from a user. Let's look at a couple of ways to capture a user's response."
authors:
 - josephmedley
published_on: 2015-10-01
updated_on: 2016-04-01
order: 20
translation_priority: 1
---

<p class="intro" markdown="1">
  Notifications are great, but notifications by themselves aren't as engaging as they could be. We show a notification because we want a response from a user. Let's look at a couple of ways to capture a user's response.
</p>

{% include shared/toc.liquid %}

## The Click Event

The most basic way to respond to a user is by implementing a `notificationclick` event on the service worker. A common action for this event is to focus a tab or open a window with a particular URL.

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {  
  console.log('Notification clicked: ', event);  
  // Android doesn't close the notification when you click on it.   
  event.notification.close();

  // This looks to see if the current window is already open and  
  // focuses if it is  
  event.waitUntil(
    clients.matchAll({ type: "window" })
      .then(function(clientList) {  
        for (var i = 0; i < clientList.length; i++) {  
          var client = clientList[i];  
          if (client.url == '/' && 'focus' in client)  
            return client.focus();  
        }  
        if (clients.openWindow) {
          return clients.openWindow('/');  
        }
      })
  );
});
{% endhighlight %}

## Action Buttons

You can put buttons directly into the notification. Let's say you want to notify a user that a new video is available on your site. You don't want to download right away because the user might be on a slow network. It would also be nice if the user didn't need to open a page to decide when to download. Fortunately, notifications let you add buttons.

Remember that the [second parameter](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification#Parameters) to `showNotification()` is an `options` object.

{% highlight javascript %}
self.registration.showNotification(title, { //object excerpted. }):
{% endhighlight %}

The `options` object has a member called `actions` that takes an object literal in the form:

{% highlight javascript %}
{action: "actionName", title: "Title"}
{% endhighlight %}

So, to add two buttons to a notification you would do something like this:

{% highlight javascript %}
var noteOptions = {
  body: 'A new video is available.',
  icon: 'images/icon.png',
  actions: [
    {action: "play", title: "Play Now"},
    {action: "remind", title: "Remind Me Later"}
  ]
};
self.registration.showNotification(title, noteOptions);
{% endhighlight %}

Respond to the button in the `notificationclick` handler. The clicked button is a little deep in the `event` object, specifically:

{% highlight javascript %}
event.notification.data.options.action
{% endhighlight %}

In practice this might be accessed something like this:

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {
  event.waitUntil(
    var notification = event.notification;
    if (notification.data.hasOwnProperty('options')) {
      var options = notification.data.options;
      if (options.close) {
        event.notification.close();
      };

      if (options.action == 'play') {
        //Fetch the video, cache it, then open the client page that plays it.
      } else {
        //Send a reminder request to the server.
      };
    } else {
      return;
    };
  );
});
{% endhighlight %}

For the sake of clarity, I've left context out of this explanation. If you want to study a more functional example along with all the other features notifications have to offer, check out Peter Beverloo's [Notification GEnerator](https://tests.peter.sh/notification-generator/).
