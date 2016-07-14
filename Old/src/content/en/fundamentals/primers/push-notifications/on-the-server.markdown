---
layout: shared/narrow
title: "On the server: sending notifications"
description: "A service running on a server is responsible for taking the data provided in the push message and actually forwarding it to the user as a notification."
authors:
  - dgash
published_on: 2015-10-01
updated_on: 2015-10-01
order: 7
translation_priority: 1
---

<p class="intro">
  A service running on the server is responsible for taking the 
  data provided in the push message and actually forwarding it to the user as a notification.
</p>

{% include shared/toc.liquid %}

The [GCM documentation](https://developer.android.com/google/gcm/index.html) 
has a reference for the [HTTP syntax](https://developers.google.com/cloud-messaging/http-server-ref)
used to pass messages from your app server to client apps. The 
[XMPP server protocol](https://developers.google.com/cloud-messaging/xmpp-server-ref)
serves a similar purpose.

## Message content

In the service worker's push handler, code is executed that establishes 
the message information, including the `title`, `body`, `icon`, and `tag`. It 
is the service worker's job to take the pushed data and turn it into a 
sendable notification.

{% highlight javascript %}
self.addEventListener('push', function(event) {
  console.log('Push message', event);
  var title = 'Push message';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'The Message',
      icon: 'images/icon.png',
      tag: 'my-tag'
    })
  );
});
{% endhighlight %}


## Notification test

[Earlier](notifications), we discussed creating a project in Google Developer 
Console, and retaining some information for later use in the manifest file. 
That information is also useful in a simple notification test.

For a quick check of your service worker, you can use 
[cURL](https://en.wikipedia.org/wiki/CURL) to send a push message to your 
browser, provided that you have whitelisted your IP address for your local 
machine in the Google Developer Console.

In the cURL command below, replace `<YOUR_PUBLIC_API_KEY>` and 
`<YOUR_REGISTRATION_ID>` with your values, run it from a terminal window, 
and you should get a notification.

{%highlight bash %}
curl --header "Authorization: key=<YOUR_PUBLIC_API_KEY>" \ 
  --header "Content-Type: application/json" 
  https://android.googleapis.com/gcm/send -d \
  '{"registration_ids":["<YOUR_REGISTRATION_ID>"]}'
{% endhighlight %}
