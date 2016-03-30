---
layout: shared/narrow
title: "Sending Push Messages Using GCM"
description: "Sending a push message requires server-side code. To get you started with push, this section describes how to send a message using <a href='https://developer.android.com/google/gcm/index.html'>Google Cloud Messaging (GCM)</a>."
authors:
  - dgash
published_on: 2015-10-01
updated_on: 2016-04-01
order: 1
translation_priority: 1
notes:
  protocol: "The <a href='https://developer.android.com/google/gcm/index.html'>GCM documentation</a> has a reference for the <a href='https://developers.google.com/cloud-messaging/http-server-ref'>HTTP syntax</a> used to pass messages from your app server to client apps. The <a href='https://developers.google.com/cloud-messaging/xmpp-server-ref'>XMPP server protocol</a> serves a similar purpose. Consult these resources if you're interested in implementing your own push server."
---

<p class="intro">
  Sending a push message requires server-side code. To get you started with push, this section describes how to send a message using <a href='https://developer.android.com/google/gcm/index.html'>Google Cloud Messaging (GCM)</a>, a service that handles all aspects of message 
  queueing and delivery to client applications. 
</p>

{% include shared/note.liquid list=page.notes.protocol %}

{% include shared/toc.liquid %}

## Configure GCM

To use the GCM API, you must set up a project in the 
[Google Developer Console](https://console.developers.google.com/). Follow the 
instructions in the getting started guide for either 
[Android](https://developers.google.com/cloud-messaging/android/start) or 
[iOS](https://developers.google.com/cloud-messaging/ios/start). Make sure to 
enable *Google Cloud Messaging*. When you create the credentials select *API key* then select *Browser key* as the type. Some developers have found that they need to use an *Android key*. In either case, if one doesn't work, try the other.

Before leaving the Developer Console, make a note of the 
*API key* and the *Project number* (located under *Home*, then *Dashboard*), as you’ll need them later. You'll need the Project number for the web app manifest ([described below](#the-web-app-manifest)) as the `gcm_sender_id` 
parameter, and the API key on your server when you use 
the GCM API. Also make sure you've added localhost to the whitelist.

## Configure the Web App Manifest

You will also need a [web app manifest](/web/fundamentals/engage-and-retain/web-app-manifest/) 
file that includes the `gcm_sender_id` parameter, used by Chrome when 
establishing a subscription with GCM. This allows GCM to link a specific 
subscription to a corresponding project number that can be matched with the 
corresponding public API key. This relationship ensures that your server 
is permitted to send messages to your. Is does this by checking your messages against the IP addresses whitelisted in Google Developer Console.

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
  "gcm_sender_id": "123456789012"  
}
{% endhighlight %}

You can find more detailed information 
[in the GCM documentation](https://developer.chrome.com/apps/gcm). Some key 
aspects of the API include:

- An appropriate `Content-Type` header of `application/json` or 
`application/x-www-form-urlencoded; charset=UTF-8`, depending on whether you 
send the data as JSON or form data.
- An array of `registration_ids`, which you can extract from the 
`PushSubscription.endpoint` you sent to your server.

## Send a Test Push

For a quick check of your service worker, use 
[cURL](https://en.wikipedia.org/wiki/CURL) to send a push message to your 
Browser (provided that you have whitelisted your IP address for your local 
machine in the Google Developer Console).

In the cURL command below, replace `<YOUR_PUBLIC_API_KEY>` and 
`<YOUR_REGISTRATION_ID>` with your values, run it from a terminal window, 
and you should get a notification.

{%highlight bash %}
curl --header "Authorization: key=<YOUR_PUBLIC_API_KEY>" \ 
  --header "Content-Type: application/json" 
  https://android.googleapis.com/gcm/send -d \
  '{"registration_ids":["<YOUR_REGISTRATION_ID>"]}'
{% endhighlight %}