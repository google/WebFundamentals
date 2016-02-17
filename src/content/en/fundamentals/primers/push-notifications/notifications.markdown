---
layout: shared/narrow
title: "Display a notification"
description: "The notification is the actual message that is sent to a user after he has enabled push messages and has subscribed to the site. Messages are often sent via Google Cloud Messaging (GCM), a service that handles all aspects of message queueing and delivery to client applications running on target devices, but there are other services that support push notifications."
authors:
  - dgash
published_on: 2015-10-01
updated_on: 2015-10-01
order: 20
translation_priority: 1
notes:
  sameorigin: "It is important to note that a notification can only open URLs from the same origin as the notification. The simplest way to overcome this issue is to have a page on your domain that performs a redirect."
---

<p class="intro">
  The notification is the actual message that is sent to a user after enabling
  push messages and has subscribed to the site. Messages are often sent 
  via <a href="https://developer.android.com/google/gcm/index.html">Google 
  Cloud Messaging (GCM)</a>, a service that handles all aspects of message 
  queueing and delivery to client applications running on target devices, but 
  there are other services that support push notifications.
</p>

{% include shared/toc.liquid %}

At the most basic level, push notifications from a web app need a back-end 
service to handle messaging. Chrome currently uses Google Cloud Messaging 
(GCM). While the eventual goal is for Chrome and GCM to support the 
[Web Push Protocol](https://datatracker.ietf.org/doc/draft-thomson-webpush-protocol/), 
other browsers are free to use other services.

## Displaying

To use the GCM API, you must set up a project in the 
[Google Developer Console](https://console.developers.google.com/). Follow the 
instructions in the getting started guide for either 
[Android](https://developers.google.com/cloud-messaging/android/start) or 
[iOS](https://developers.google.com/cloud-messaging/ios/start). Make sure to 
enable *Google Cloud Messaging for Android*, and make a note of the 
*project number* and *API key*, as you’ll need them later on. The project 
number is used in the web app manifest ([below](#the-web-app-manifest)) as the `gcm_sender_id` 
parameter, and you will need the Public API Key on your server when you use 
the GCM API.

### The web app manifest

You will also need a [manifest](/web/fundamentals/engage-and-retain/simplified-app-installs/#manifest-for-web-applications) 
file that includes the `gcm_sender_id` parameter, used by Chrome when 
establishing a subscription with GCM. This allows GCM to link a specific 
subscription to a corresponding project number that can be matched with the 
corresponding public API key. This relationship ensures that your server 
is permitted to send messages to the client web app by validating the 
information against the IP addresses whitelisted in the project you set up 
in Google Developer Console.

{% highlight json %}
{  
  "name": "Push Demo",  
  "short_name": "Push Demo",  
  "icons": [{  
    "src": "images/icon-192x192.png",  
    "sizes": "192x192",
    "type": "image/png" 
  }],  
  "start_url": "/index.html?homescreen=1",  
  "display": "standalone",  
  "gcm_sender_id": "123456789012",  
  "gcm_user_visible_only": true  
}
{% endhighlight %}

When a push message is received, a push event is dispatched in the 
service worker, at which point it is ready to display a notification.

You can send notifications via GCM; in addition to the introductory 
document linked above, you can find more detailed information 
[in the GCM documentation](https://developer.chrome.com/apps/gcm). Some key 
aspects of the API include:

- An Authorization header with a value of `key=<YOUR_PUBLIC_API_KEY>`, which 
is the API key from the Google Developer Console. The public API key is used 
by GCM to find the appropriate project number, match it with the subscription 
ID’s project number you want to send the message to, and ensure that the 
server’s IP address is whitelisted for that project.
- An appropriate `Content-Type` header of `application/json` or 
`application/x-www-form-urlencoded; charset=UTF-8`, depending on whether you 
send the data as JSON or form data.
- An array of `registration_ids`, which you can extract from the 
`PushSubscription.endpoint` you sent to your server.



