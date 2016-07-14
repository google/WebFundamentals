---
layout: shared/narrow
title: "Subscribe to Push Notifications"
description: "Add code to your web app's service worker to subscribe to push notifications"
notes:
  styling:
    - Styling will come later
published_on: 2015-09-28
updated_on: 2015-09-28
translation_priority: 1
order: 6
authors:
  - samdutton
---

{% include shared/toc.liquid %}

A completed version of this step is in the completed/step6 directory.

## 1. Add subscription code

Replace the TODO comment in the _main.js_ file you created earlier so that it looks like this:

{% highlight javascript %}
if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log(':^)', reg);
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            console.log('endpoint:', sub.endpoint);
        });
    }).catch(function(error) {
        console.log(':^(', error);
    });
}
{% endhighlight %}

This code uses the `ServiceWorkerRegistration` object's `pushManager` to subscribe to  messages for the gcm\_sender\_id you added to the manifest.

You must pass a `{userVisibleOnly: true}` argument to the subscribe() method. This tells the browser that a notification will always be shown when a push message is received. Currently it's mandatory to show a notification.

## 2. Try it out from localhost

Open _index.html_ from localhost and open Chrome DevTools to check the console.

You should see something like this:

<img src="images/image13.png" width="888" height="590" alt="Web page screenshot: permissions dialog for Push Notifications" />

**Important**: Chrome currently does not support the Push API in Incognito Mode.
If you want to reset push notification permissions preferences at any time,
click the page icon to the left of the URL:

<img src="images/image14.png" width="713" height="672"  alt="Web page screenshot: Push notifications permissions setting dialog" />

## 3. Get the subscription ID

From Chrome DevTools, right-click the `endpoint` value and select **Copy Link Address** to copy the value, which should look like this:

_https://android.googleapis.com/gcm/send/**APA91bGdUldXgd4Eu9MD0qNmGd0K6fu0UvhhNGL9FipYzisrRWbc-qsXpKbxocgSXm7lQuaEOwsJcEWWadNYTyqN8OTMrvNA94shns\_BfgFH14wmYw67KZGHsAg74sm1\_H7MF2qoyRCwr6AsbTf5n7Cgp7ZqsBZwl8IXGovAuknubr5gaJWBnDc**_

Make a note of the subscription ID, which is the last part of the URL,
highlighted here in bold.

You'll use this value later to tell Google Cloud Messaging where to send
messages.

<img src="images/image15.png" width="774" height="932" alt="Web page screenshot: Chrome DevTools console showing Push Notifications endpoint value" />
