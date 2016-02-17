---
layout: shared/narrow
title: "Responding to the User"
description: "efore we leave the service worker behind, we need to implement another event
handler called <code>notificationclick</code>."
authors:
 - dgash
 - josephmedley
published_on: 2015-10-01
updated_on: 2016-02-19
order: 3
translation_priority: 1
notes:
  sameorigin: "It is important to note that a notification can only open URLs from the same origin as the notification. The simplest way to overcome this issue is to have a page on your domain that performs a redirect."
---

<p class="intro">
Before we leave the service worker behind, we need to implement another event
handler called <code>notificationclick</code>. When the user clicks a notification, a
<code>notificationclick</code> event is dispatched in the service worker.
</p>

{% include shared/toc.liquid %}

## Add the Handler Code

As before, we start by adding an event handler to the service worker script.

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked: ', event);
  // Process the click event.
}
{% endhighlight %}

What you do in this handler depends on the app that you're writing. We're going to look at two common responses, which usually occur in the same service worker.

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

The current implementations of the Push API do not allow you to send 
a payload with a push message. 


To get around not being able to tie data to your notification, you could use 
the service worker's caching API, for example, to save a URL for a 
particular notification tag; that way you can look it up in the 
`notificationclick` event and open the window to that URL.

An alternative approach (albeit somewhat unconventional) is to use a fragment
identifier on the end of your icon URL. This won’t affect the image’s
cacheability, and gives you access to a short URL. 

{% include shared/note.liquid list=page.notes.sameorigin %}