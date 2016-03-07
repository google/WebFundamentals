---
layout: shared/narrow
title: "Don't be <s>Evil</s> Anoying"
description: ""
authors:
- josephmedley
published_on: 2016-01-05
updated_on: 2016-03-11
order: 50
translation_priority: 1
---

<p class="intro">
  xxx
</p>

{% include shared/toc.liquid %}

## Don't advertise your native app

The point of service workers, the technology behind push notifications, is that you can avoid the time and expense of writing an application separate from your web site. A user who has both your service worker and your native app may get duplicate notifications unless write server-side code to prevent it. You can avoid the problem completely; don't encourage users to run both.

## Don't advertise

You'll have opportunities to monetize the user experience once they're in your app. Don't blow it by spamming your users when they're not. If you spam your users with notifications, they may stop allowing them altogether.

## Keep it Short.

Notifications aren't emails. The intent of notifications is to tease users so they'll open your app. The PushMessageData object, which is still being implemented in some browsers, lets you send data to the user immediately, but you may not want to show all of that data to the user, especially if additional data could accumulate on the server after the notification is sent. 

For example, an email client might want to show a notification when an email
comes in. It might be several minutes before the user acknowledges the
notification. Meanwhile additional emails have appeared on the server. In that
case, use `fetch()` inside the `onnotificationclick` event.

### In the service worker

{% highlight javascript %}
  self.addEventListener('notificationclick', function(event) {
  event.waitUntil(
    var someRequest = new Request('some/url/path.html');
    // This call will be intercepted by the fetch handler.
    fetch(someRequest);
  )
  });

  self.addEventListener('fetch', function(event) {
    event.waitUntil(
      //Some call to global fetch with an appropriate caching pattern.
    )
  });
{% endhighlight %}

### In the client page

{% highlight javascript %}
  window.addEventListener('focus', function(event) {
    var someRequest = new Request('some/url/path.html');
    // This call will be intercepted by the service worker's
    // fetch handler and the result returned from cache.
    var someResponse = fetch(someRequest);
    // Update the page with the data from the response.
  });
{% endhighlight %}

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
