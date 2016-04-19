---
layout: shared/narrow
title: "Make it Useful"
description: "Here are a few tips for making your notifications useful."
authors:
- josephmedley
published_on: 2016-01-05
updated_on: 2016-04-01
order: 40
translation_priority: 1
---

<p class="intro">
  Here are a few tips for making your notifications useful.
</p>

## Make it available regardless of connectivity {#make-it-available}

Until recently only mobile apps could do this. With service workers you can store a notification until a user wants it. When the user clicks it, the status of the network is irrelevant. 

## Always use a title, description, and icon {#title-desc-icon}

A notification takes a number of options. To be minimally user-friendly you
should always include a title, description, and icon. Do this with the options
parameter of the `showNotification()` method. For example:

{% highlight javascript %} 
  self.addEventListener('push', function(event) {
    console.log('Received a push message', event);

    var title = 'Yay a message.';
    var body = 'We have received a push message.';
    var icon = '/images/icon-192x192.png';
    var tag = 'simple-push-demo-notification-tag';

    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: icon,
        tag: tag
      })
    );
  });
{% endhighlight %}

## Make the icon contextual {#contextual-icon}

Just as with titles, icons should convey something about the message. In the
previous instance where 'Paul Kinlan sent you a message', use an
icon specific to messages rather than your app or site logo.

