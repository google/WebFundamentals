---
layout: shared/narrow
title: "Handle notification clicks"
description: "Add service worker code to enable an action (such as navigating to a web page) when a user clicks a notification."
notes:
  styling:
    - Styling will come later
published_on: 2015-09-28
updated_on: 2015-09-28
translation_priority: 1
order: 10
authors:
  - samdutton
---

{% include shared/toc.liquid %}

A completed version of this step is in the completed/step10 directory.

In this step you will add code to enable an action (such as navigating to a web page) when a user clicks a notification.

Add the following code to _sw.js_, replacing the _TODO_ comment from step
6:

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'https://youtu.be/gYMkEMCHtJ4';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
{% endhighlight %}

This code listens for a notification click, then opens a web page — in this example, a YouTube video.

This code checks all window clients for this service worker: if the requested URL is already open in a tab, focus on it — otherwise open a new tab for it.

**NOTE**: Android [doesn't close the notification](https://crbug.com/463146) when you click it.

That's why we need `event.notification.close();`.
