---
layout: shared/narrow
title: "Respond to the User"
description: "Before we leave the service worker behind, we need to implement another event
handler called <code>notificationclick</code>."
authors:
 - dgash
 - josephmedley
published_on: 2015-10-01
updated_on: 2016-02-19
order: 20
translation_priority: 1
---

<p class="intro">
Before we leave the service worker behind, we need to implement another event
handler called <code>notificationclick</code>. When the user clicks a notification, a
<code>notificationclick</code> event is dispatched in the service worker.
</p>

## Show the Page

A common
response to a `notificationclick` event  is to focus a tab or open a window with
a particular URL.

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {  
  console.log('Notification clicked: ', event);  
  // Android doesn't close the notification when you click on it  
  // See: http://crbug.com/463146  
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

