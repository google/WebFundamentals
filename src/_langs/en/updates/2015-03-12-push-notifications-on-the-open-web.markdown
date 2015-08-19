---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2015-03-12

title: "Push Notifications on the Open Web"
description: "Push messaging and notifications are landing in Chrome 42."
article:
  written_on: 2015-03-12
  updated_on: 2015-05-15
authors:
  - mattgaunt
tags:
  - pushmessaging
  - notifications
  - serviceworker
permalink: /updates/2015/03/push-notificatons-on-the-open-web.html
---

<style>
  img {max-width: 100%; height: auto;}
</style>

If you ask a room of developers what mobile device features are missing from the 
web, push notifications are always high on the list.

Push notifications allow your users to opt-in to timely updates from sites they 
love and allow you to effectively re-engage them with customized, engaging content.

As of Chrome version 42, the [Push API](http://w3c.github.io/push-api/) and 
[Notification API](https://notifications.spec.whatwg.org) are available to 
developers.  
  
The Push API in Chrome relies on a few different pieces of technology, including 
[Web app 
manifests](http://updates.html5rocks.com/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android) 
and [Service 
Workers](http://www.html5rocks.com/en/tutorials/service-worker/introduction/). 
In this post we'll look at each of these technologies, but only the bare minimum 
to get push messaging up and running. To get a better understanding of some of 
the other features of manifests and the offline capabilities of service workers, 
please check out the links above.

We will also look at what will be added to the API in future versions of Chrome, 
and finally we'll have an FAQ.

## Things to Know Up Front

* A **simple code example** can be found on the [GoogleChrome Samples Repo](https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications).
* When I refer to **'payload'** in this article, I am talking about data that comes with a push message,
i.e. data you send to a device from your server.
* When I refer to **'notification data'**,
I am referring to the data attribute on the Notification class in JavaScript. Notification
data is a way to store information with a notification that you can retrieve in the
`notificationclick` event, for example.
* Looking for a **demo**? Check out [https://simple-push-demo.appspot.com](https://simple-push-demo.appspot.com).
* There is a new standard which defines the API you'd use to send a push
message to your users, although it's not fully formed yet but you can [learn more here](https://datatracker.ietf.org/doc/draft-thomson-webpush-protocol/). In 
this article I cover how to get things working with GCM only, as soon as 
the standard the Web Push Protocol is fully formed an another browser 
supports Push, I'll update this doc & the sample.

Now that's out of the way...

## Implementing Push Messaging for Chrome

This section describes each step you need to complete in order to support push 
messaging in your web app.

### Register a Service Worker

There is a dependency of having a service worker to implement push messages for 
the web. The reason for this is that when a push message is received, the 
browser can start up a service worker, which runs in the background without a 
page being open, and dispatch an event so that you can decide how to handle that 
push message.

Below is an example of how you register a service worker in your web app. When 
the registration has completed successfully we call **initialiseState()**, which 
we'll cover shortly.

{% highlight javascript %}
var isPushEnabled = false;

…

window.addEventListener('load', function() {  
  var pushButton = document.querySelector('.js-push-button');  
  pushButton.addEventListener('click', function() {  
    if (isPushEnabled) {  
      unsubscribe();  
    } else {  
      subscribe();  
    }  
  });

  // Check that service workers are supported, if so, progressively  
  // enhance and add push messaging support, otherwise continue without it.  
  if ('serviceWorker' in navigator) {  
    navigator.serviceWorker.register('/service-worker.js')  
    .then(initialiseState);  
  } else {  
    console.warn('Service workers aren\'t supported in this browser.');  
  }  
});
{% endhighlight %}

The button click handler subscribes or unsubscribes the user to push messages. 
**isPushEnabled** is a global variable which simply tracks whether push 
messaging is currently subscribed or not. These will be referenced throughout
the code snippets.

We then check that service workers are supported before registering the `service-worker.js` 
file which has the logic for handling a push message. Here we 
are simply telling the browser that this JavaScript file is the service worker 
for your site.

### Set Up the Initial State

<p style="text-align: center;">
  <img src="{{site.baseurl}}/updates/images/2015-03-04-push-on-the-open-web/enabled-disabled-push-ux-chrome.png" alt="Example of enabled and disabled push messaging UX in Chrome" />
</p>

Once the service worker is registered, we need to set up our UI's state.

Users will expect a simple UI to enable or disable push messages for your site, 
and they'll expect it to keep up to date with any changes that occur. In other 
words, if they enable push messages for your site, then leave and come back a 
week later, your UI should show that push messages are already enabled.

You can find some [UX guidelines in this doc](https://docs.google.com/document/d/1WNPIS_2F0eyDm5SS2E6LZ_75tk6XtBSnR1xNjWJ_DPE/edit?usp=sharing),
in this article we'll be focusing on the technical aspects.

At this point you may be thinking there are only two states to deal with, 
enabled or disabled. There are however some other states surrounding 
notifications which you need to take into account.  

<p style="text-align: center;">
  <img src="{{site.baseurl}}/updates/images/2015-03-04-push-on-the-open-web/push-messaging-states-diagram-ux.png" alt="A diagram highlighting the different considerations and state of push in Chrome" />
</p>

There are a number of things we need to check before we enable our button, and 
if everything is supported, we can enable our UI and set the initial state to 
indicate whether push messaging is subscribed or not.

Since the majority of these checks result in our UI being disabled, you should 
set the initial state to disabled. This also avoids any confusion should there 
be an issue with your page's JavaScript, for example the JS file can't be 
downloaded or the user has disabled JavaScript.

{% highlight html %}
<button class="js-push-button" disabled> 
  Enable Push Messages  
</button>
{% endhighlight %}

With this initial state, we can perform the checks outlined above in an 
**initialiseState()** method, i.e. after our service worker is registered.

{% highlight javascript %}
// Once the service worker is registered set the initial state  
function initialiseState() {  
  // Are Notifications supported in the service worker?  
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {  
    console.warn('Notifications aren\'t supported.');  
    return;  
  }

  // Check the current Notification permission.  
  // If its denied, it's a permanent block until the  
  // user changes the permission  
  if (Notification.permission === 'denied') {  
    console.warn('The user has blocked notifications.');  
    return;  
  }

  // Check if push messaging is supported  
  if (!('PushManager' in window)) {  
    console.warn('Push messaging isn\'t supported.');  
    return;  
  }

  // We need the service worker registration to check for a subscription  
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
    // Do we already have a push message subscription?  
    serviceWorkerRegistration.pushManager.getSubscription()  
      .then(function(subscription) {  
        // Enable any UI which subscribes / unsubscribes from  
        // push messages.  
        var pushButton = document.querySelector('.js-push-button');  
        pushButton.disabled = false;

        if (!subscription) {  
          // We aren't subscribed to push, so set UI  
          // to allow the user to enable push  
          return;  
        }
        
        // Keep your server in sync with the latest subscriptionId
        sendSubscriptionToServer(subscription);

        // Set your UI to show they have subscribed for  
        // push messages  
        pushButton.textContent = 'Disable Push Messages';  
        isPushEnabled = true;  
      })  
      .catch(function(err) {  
        console.warn('Error during getSubscription()', err);  
      });  
  });  
}
{% endhighlight %}

A brief overview of these steps:

* We check that **showNotification** is available in the ServiceWorkerRegistration 
  prototype. Without it we won't be able to show a notification from our service worker
  when a push message is received.
* We check what the current **Notification.permission** is to ensure it's not 
  **"denied"**. A denied permission means that you can't show notifications 
  until the user manually changes the permission in the browser.
* To check if push messaging is supported we check that **PushManager** is 
  available in the window object.
* Finally, we used **pushManager.getSubscription()** to check whether we already 
  have a subscription or not. If we do, we send the subscription details to our
  server to ensure we have the right information and set our UI to indicate that push messaging is already enabled or not.
  We'll look at what details exist in the subscription object later in this article.

We wait until navigator.serviceWorker.ready is resolved to check for a 
subscription and to enable the push button because it's only after the service 
worker is active that you can actually subscribe to push messages.

The next step is to handle when the user wants to enable push messages, but 
before we can do this, we need to set up a Google Developer Console project 
and add some parameters to our manifest to 
use [Google Cloud Messaging (GCM)](https://developer.android.com/google/gcm/index.html).

### Make a Project on the Google Developer Console

Chrome uses GCM to handle the sending and delivery of push messages, however, to 
use the GCM restful API, you need to set up a project on the Google Developer Console. 
Follow the instructions in the [getting started 
guide](https://developer.android.com/google/gcm/gs.html), making sure you 
enable both "Google Cloud Messaging for Android" and make a note of the **project number** and **API key** as you'll 
need to use them later on.

This step is **specific to Chrome** since it relies on GCM's restful API
to send push messages. The end goal is for Chrome and GCM to support the 
[Web Push Protocol](https://datatracker.ietf.org/doc/draft-thomson-webpush-protocol/).
Other browsers are free to use any push service and these will hopefully implement
the web push protocol, meaning there will only ever be one API standard you need to
implement on your server.

Below are screenshots highlighting where the project number and API keys are.  

<p style="text-align: center;">
  <img src="{{site.baseurl}}/updates/images/2015-03-04-push-on-the-open-web/google-developer-console-project-number.png" alt="Highlighting where the project number is in the Google Developer Console" />
</p>

<p style="text-align: center;">
  <img src="{{site.baseurl}}/updates/images/2015-03-04-push-on-the-open-web/google-developer-console-api-key.png" alt="Highlighting where the API key is in the Google Developer Console" />
</p>

The project number will be used in the Web App manifest (see the next section) 
as the **gcm\_sender\_id** parameter, and the **Public API Key** will be 
needed on your server when you use GCM's restful API.

### Add a Web App Manifest

For push on Chrome, we need to add a manifest file and add the **gcm\_sender\_id**
parameter, otherwise the push subscription will fail. These parameters 
are only required by Chrome to use GCM, other browsers won't require a web
app manifest.

The **gcm\_sender\_id** (i.e. the project number) is used by Chrome when 
establishing a subscription with GCM. This means that GCM can link a 
specific subscription to a corresponding project number and this can be matched 
with the corresponding public API key. This ensures that your server is permitted 
to send messages to the client web app by validating these three pieces of information
against the IP Addresses whitelisted in the project you set up on 
console.developers.google.com. 

In Chrome version 42 a **gcm\_user\_visible\_only** parameter is 
required to indicate that **you promise to show a notification 
whenever you receive a push**. In Chrome version 44 and above, 
this parameter is moved to the `subscribe()` method as 
a parameter you pass in, **userVisibleOnly**. Once Chrome version
44 is stable `gcm_user_visible_only` will no longer be required.

Below is a super-simple manifest file:

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

You'll need to swap out the **gcm\_sender\_id** with your **project number** 
from the Google Developer Console mentioned in the previous step.

Once you have saved your manifest file in your project (manifest.json is a good 
name), reference it from your HTML with the following tag in the head of your 
page.

{% highlight html %}
<link rel="manifest" href="manifest.json">
{% endhighlight %}

If you don't add a web manifest with these parameters you'll get an exception 
when you attempt to subscribe the user to push messages, with the error 
"Registration failed - no sender id provided" or "Registration failed - 
permission denied". 

### Subscribe to Push Messaging

To subscribe, we have to call the `subscribe()` method on the 
[PushManager](http://w3c.github.io/push-api/#pushmanager-interface) object, 
which you access through the 
[ServiceWorkerRegistration](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/#service-worker-registration-obj) 
object.

This method takes an object to define options. You'll need to pass in a
**{userVisibleOnly: true}** option to inform the browser that you 
intend to always show a notification. At the moment there is no support
for sending a push message without showing a notification.

Calling the `subscribe()` method will result in the browser asking the user 
to give your origin permission to send push notifications. 
Without this permission, you will not be able to successfully 
subscribe.

If the [promise](http://www.html5rocks.com/en/tutorials/es6/promises/) returned 
by the **subscribe()** method resolves, you'll be given a 
[PushSubscription](http://w3c.github.io/push-api/#idl-def-PushSubscription) 
object which will contain an **endpoint**. 

The following code subscribes the user for push messaging:

{% highlight javascript %}
function subscribe() {
  // Disable the button so it can't be changed while
  // we process the permission request
  var pushButton = document.querySelector('.js-push-button');
  pushButton.disabled = true;

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
      .then(function(subscription) {
        // The subscription was successful
        isPushEnabled = true;
        pushButton.textContent = 'Disable Push Messages';
        pushButton.disabled = false;

        // TODO: Send the subscription subscription.endpoint
        // to your server and save it to send a push message
        // at a later date
        return sendSubscriptionToServer(subscription);
      })
      .catch(function(e) {
        if (Notification.permission === 'denied') {
          // The user denied the notification permission which
          // means we failed to subscribe and the user will need
          // to manually change the notification permission to
          // subscribe to push messages
          window.Demo.debug.log('Permission for Notifications was denied');
          pushButton.disabled = true;
        } else {
          // A problem occurred with the subscription, this can
          // often be down to an issue or lack of the gcm_sender_id
          // and / or gcm_user_visible_only
          window.Demo.debug.log('Unable to subscribe to push.', e);
          pushButton.disabled = false;
          pushButton.textContent = 'Enable Push Messages';
        }
      });
  });
}
{% endhighlight %}

It's in the `sendSubscriptionToServer(subscription)` method that you would want to
send the `subscription.endpoint` to your server to use later on.

There are some steps that you need to do support older versions of Chrome until
Chrome 44 is stable.

### Supporting Pre-Chrome 44 Push

When push was first implemented in Chrome 42, the spec also defined a subscriptionId,
which Chrome used to pass a GCM ID to the web app. The spec has since
changed and removed subscriptionId, so in Chrome 44 the subscriptionId 
is appended to the endpoint object with a '/' inbetween, but is still
accessible in Chrome 44 legacy reasons.  In Chrome 45,
the subscriptionId will be completely removed.

What this means is that in Chrome 42 and 43, you need add the `subscriptionId`
to the end of the PushSubscription.endpoint, meaning your server will have one
set of logic. You can do the following to send the same endpoint to your server:

{% highlight javascript %}
// This method handles the removal of subscriptionId
// in Chrome 44 by concatenating the subscription Id
// to the subscription endpoint
function endpointWorkaround(pushSubscription) {
  // Make sure we only mess with GCM
  if (pushSubscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') !== 0) {
    return pushSubscription.endpoint;
  }

  var mergedEndpoint = pushSubscription.endpoint;
  // Chrome 42 + 43 will not have the subscriptionId attached
  // to the endpoint.
  if (pushSubscription.subscriptionId &&
    pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
    // Handle version 42 where you have separate subId and Endpoint
    mergedEndpoint = pushSubscription.endpoint + '/' +
      pushSubscription.subscriptionId;
  }
  return mergedEndpoint;
} 
{% endhighlight %}

The above will only be needed until Chrome 44 becomes stable, at which point you
can use just the endpoint.

At this point your web app is almost ready to receive a push message, 
however nothing will happen until we add a push event listener to 
our service worker file.

### Service Worker Push Event Listener

When a push message is received (we'll talk more about how to send a push 
message from your server in the next section), a **push event** 
will be dispatched in your service worker, at which point you'll need 
to display a [notification](https://notifications.spec.whatwg.org/).

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

This code registers a **push** event listener and displays a notification with a 
predefined title, body text, icon and a notification tag.

One subtlety to highlight with this example is the **_event.waitUntil()_** 
method. This method takes a 
[promise](http://www.html5rocks.com/en/tutorials/es6/promises/) and extends the 
lifetime of an event handler until the promise is 
[settled](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md#states); 
In this case, until the promise returned from **showNotification()** is 
resolved.
  
The [notification tag](https://notifications.spec.whatwg.org/#tag) identifies 
unique notifications. If we sent two push messages to the same device, 
with a short delay between them, and displayed a notification with the same tag 
for both, the browser will display the first notification and replace it with 
the second notification when the second push message is received.

If you want to show multiple notifications at once then use a different tag, or 
no tag at all.    

We'll look at a more complete example of showing a notification later on in this 
post. For now, let's keep things simple and see if sending a push message shows 
this notification.

### Sending a Push Message

We've subscribed to push messages and our service worker is ready to show a 
notification, so it's time to send a push message through GCM.  

Since Chrome is the only browser who has implemented push messaging at the
moment and it uses GCM to handle push messaging, we're going to look 
at how to use the GCM API at a high level. For other browsers and 
hopefully Chrome in the future, you will interact
with the the push service as defined by the 
[Web Push Protocol spec](https://datatracker.ietf.org/doc/draft-thomson-webpush-protocol/). However this standard is still in flux. 

To use GCM, there are some [great docs on what you need to do to send a 
push message](https://developer.android.com/google/gcm/server.html). 

The key aspects of their API are:

* You need to send an **Authorization** header with a value of 
  **key=&lt;YOUR\_PUBLIC\_API\_KEY&gt;**, where 
  **&lt;YOUR\_PUBLIC\_API\_KEY&gt;** is the API key from the 
  Google Developer Console.
    * The public API key is used by GCM to find the appropriate project number, match 
      it with the subscriptionId's project number, which you are trying to send 
      a message too and finally ensure that the server's IP address is 
      whitelisted for that project.
* An appropriate **Content-Type** header of **application/json** or 
  **application/x-www-form-urlencoded;charset=UTF-8** depending on whether you 
  send the data as JSON or form data.
* An array of **registration\_ids** - these are ID's, which you can 
  extract from the PushSubscription.endpoint you would have sent to your server.

To give you an idea of how to extract the registration\_id from
the endpoint on your server, here is some example Python
code:

{% highlight python %}
endpoint = self.request.get("endpoint")
if endpoint.startswith('https://android.googleapis.com/gcm/send') :
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': 'key=AIzaSyBBh4ddPa96rQQNxqiq_qQj7sq1JdsNQUQ'
  }
  endpointParts = endpoint.split('/')
  registrationId = endpointParts[len(endpointParts) - 1]
   
  endpoint = 'https://android.googleapis.com/gcm/send'

  form_fields = {
    "registration_id": registrationId
  }
  form_data = urllib.urlencode(form_fields)
  result = urlfetch.fetch(url=endpoint,
                        payload=form_data,
                        method=urlfetch.POST,
                        headers=headers)
{% endhighlight %}

Essentially what we do here is if the endpoint is to GCM (starts with 
the android.googleapis.com url), we split
the endpoint at forward slashes. We then use the last element
from the resulting array as the registration ID.

Please do check out the docs about how to send push messages from your server, 
but for a quick sanity check of your service worker you can use 
[cURL](http://www.google.com/url?q=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCURL&sa=D&sntz=1&usg=AFQjCNHRhFnXmOaG9ZHmto3zw6T_7B15Ng) 
to send a push message to your browser (as long as you [whitelisted your IP 
address for your local machine](https://developer.android.com/google/gcm/gs.html) 
on the Google Developer Console).

Swap out the **&lt;YOUR\_PUBLIC\_API\_KEY&gt;** and 
**&lt;YOUR\_REGISTRATION\_ID&gt;** in this cURL command, run it from a 
terminal and you should see a glorious notification:

    curl --header "Authorization: key=<YOUR_PUBLIC_API_KEY>" --header 
    "Content-Type: application/json" https://android.googleapis.com/gcm/send -d 
    "{\"registration_ids\":[\"<YOUR_REGISTRATION_ID>\"]}"

<p style="text-align: center;">
  <img src="{{site.baseurl}}/updates/images/2015-03-04-push-on-the-open-web/push-message.gif" alt="Example of a push message from Chrome for Android" />
</p>

When developing your backend logic, remember that the Authorization header and 
format of the POST body are specific to the GCM endpoint, so detect when the 
endpoint is GCM and conditionally add the header and format the POST body.

A downside to the current implementation of the Push API in Chrome is that you 
can't send a payload with a push message. Nope, nothing. The reason for this is 
that in a future implementation, payload will have to be encrypted on your 
server before it's sent to a push messaging endpoint. This way the endpoint, 
whatever push provider it is, will not be able to easily view the content of the 
push payload. This also protects against other vulnerabilities like poor 
validation of HTTPS certificates and man-in-the-middle attacks between your 
server and the push provider. However, this encryption isn't supported yet, so 
in the meantime you'll need to perform a [fetch request](http://updates.html5rocks.com/2015/03/introduction-to-fetch) 
to get information needed to populate a notification.

### A More Complete Push Event Example

The notification we've seen so far is pretty basic and as far as samples go, 
it's pretty poor at covering a real world use case.

Realistically, most people will want to get some information from their server 
before displaying the notification. This may be data to populate the 
notification title and message with something specific, or going a step further 
and caching some pages or data so that when the user clicks on the notification, 
everything is immediately available when the browser is opened—even if the 
network isn't available at that time.

In the following code we fetch some data from an API, convert the response to an 
object and use it to populate our notification.

{% highlight javascript %}
self.addEventListener('push', function(event) {  
  // Since there is no payload data with the first version  
  // of push messages, we'll grab some data from  
  // an API and use it to populate a notification  
  event.waitUntil(  
    fetch(SOME_API_ENDPOINT).then(function(response) {  
      if (response.status !== 200) {  
        // Either show a message to the user explaining the error  
        // or enter a generic message and handle the   
        // onnotificationclick event to direct the user to a web page  
        console.log('Looks like there was a problem. Status Code: ' + response.status);  
      throw new Error();  
      }

      // Examine the text in the response  
      return response.json().then(function(data) {  
        if (data.error || !data.notification) {  
          console.error('The API returned an error.', data.error);  
          throw new Error();  
        }  
          
        var title = data.notification.title;  
        var message = data.notification.message;  
        var icon = data.notification.icon;  
        var notificationTag = data.notification.tag;

        return self.registration.showNotification(title, {  
          body: message,  
          icon: icon,  
          tag: notificationTag  
        });  
      });  
    }).catch(function(err) {  
      console.error('Unable to retrieve data', err);

      var title = 'An error occurred';
      var message = 'We were unable to get the information for this push message';  
      var icon = URL_TO_DEFAULT_ICON;  
      var notificationTag = 'notification-error';  
      return self.registration.showNotification(title, {  
          body: message,  
          icon: icon,  
          tag: notificationTag  
        });  
    })  
  );  
});
{% endhighlight %}  
      
It's worth, once again, highlighting that the **event.waitUntil()** takes a promise 
which results in the promise returned by **showNotification()**, follow the
return statements inside the fetch request's promise. The reason we do thiat
is that our event listener won't terminate the serviceworker until the 
asynchronous fetch() call is complete, and the notification is shown.

You'll notice that we show a notification even when there is an error, 
if we don't, Chrome will show it's own generic notification.

### Opening a URL when the User Clicks a Notification

When the user clicks a notification, a **notificationclick** event is dispatched 
in your service worker. Within your handler, you can take appropriate action, 
like focusing a tab or opening a window with a particular URL:

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {  
  console.log('On notification click: ', event.notification.tag);  
  // Android doesn't close the notification when you click on it  
  // See: http://crbug.com/463146  
  event.notification.close();

  // This looks to see if the current window is already open and  
  // focuses if it is  
  event.waitUntil(
    clients.matchAll({  
      type: "window"  
    })
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

This example opens the browser to the root of the site's origin, by focusing an 
existing same-origin tab if one exists, otherwise opening a new one.

There are two parts of today's implementation of Notifications which require 
some unpleasant work arounds:

1. There is was no easy way to stash data with a notification in Chrome 42 
   (i.e. what URL to open when a particular notification is clicked). 
   In Chrome 44 the [**data** attribute](https://notifications.spec.whatwg.org/#dom-notification-data) was implemented. Until Chrome 44 is in stable, you'll need to handle both cases or assume Notification.data isn't supported.
1. In Chrome 42 you could only open a URL which is on the same origin as 
   your service worker, this was changed in Chrome 43 so that you could open
   any URL.

**Don't worry,** there are ways to overcome these issues for Chrome 42 and 43.

To get around not being able to tie data to your notification, you can use 
[IndexedDB](http://www.html5rocks.com/en/tutorials/indexeddb/todo/) to save a 
URL for a particular notification tag, this way you can look it up in the 
**notificationclick** event and open the window to that particular URL.

An alternative approach (albeit somewhat unconventional) would be to use a 
[fragment identifier](http://en.wikipedia.org/wiki/Fragment_identifier) on the 
end of your icon URL. This way it won't affect the image's cachability while 
giving you access to a short URL. (H/T to [Casey at Roost](https://goroost.com/) 
for this idea.)

You can feature detect if Notification.data is supported with the following code:

    if (Notification.prototype.hasOwnProperty('data')) {
      // Data is supported :)
    } else {
      // No data here, time to use something else :(
    }

The simplest way to overcome the issue of only being able to open URLs 
on the same origin in Chrome 42, is to have a page on your domain which 
performs a redirect.

### Unsubscribe a User's Device

You've subscribed a user's device and they're receiving push messages, 
but how can you unsubscribe them?

The main things required to unsubscribe a users device is to call the 
**unsubscribe()** method on the 
[PushSubscription](http://w3c.github.io/push-api/#idl-def-PushSubscription) 
object and to remove the PushSubscription data from your servers 
(just so you aren't sending push messages which you know won't be received). 

The code below does exactly this:

{% highlight javascript %}
function unsubscribe() {  
  var pushButton = document.querySelector('.js-push-button');  
  pushButton.disabled = true;

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
    // To unsubscribe from push messaging, you need get the  
    // subscription object, which you can call unsubscribe() on.  
    serviceWorkerRegistration.pushManager.getSubscription().then(  
      function(pushSubscription) {  
        // Check we have a subscription to unsubscribe  
        if (!pushSubscription) {  
          // No subscription object, so set the state  
          // to allow the user to subscribe to push  
          isPushEnabled = false;  
          pushButton.disabled = false;  
          pushButton.textContent = 'Enable Push Messages';  
          return;  
        }  

        // TODO: Make a request to your server to remove
        // the users data from your data store so you
        // don't attempt to send them push messages anymore

        // We have a subscription, so call unsubscribe on it  
        pushSubscription.unsubscribe().then(function(successful) {  
          pushButton.disabled = false;  
          pushButton.textContent = 'Enable Push Messages';  
          isPushEnabled = false;  
        }).catch(function(e) {  
          // We failed to unsubscribe, this can lead to  
          // an unusual state, so may be best to remove   
          // the users data from your data store and   
          // inform the user that you have done so

          console.log('Unsubscription error: ', e);  
          pushButton.disabled = false;
          pushButton.textContent = 'Enable Push Messages'; 
        });  
      }).catch(function(e) {  
        console.error('Error thrown while unsubscribing from push messaging.', e);  
      });  
  });  
}
{% endhighlight %}

### Keeping the Subscription Up to Date

Subscriptions may get out of sync between GCM and your server. Make sure
your server parses the response body of the GCM API's send POST, looking for
**error:NotRegistered** and **canonical_id** results, as explained in the GCM
documentation.

Subscriptions may also get out of sync between the service worker and your
server. For example, after subscribing/unsubscribing successfully, a flaky
network connection may prevent you from updating your server; or a user might
revoke notifications permission, which triggers an automatic unsubscribe. Handle
such cases by checking the result of
**serviceWorkerRegistration.pushManager.getSubscription()** periodically (e.g.
on page load) and synchronizing it with the server. You may also wish to
re-subscribe automatically if you no longer have a subscription and
Notification.permission == 'granted'.

In **sendSubscriptionToServer()** you will need to consider how you handle 
failed network requests when updating the PushSubscription data. One solution is
to track the state of the **endpoint** in a cookie 
to determine whether your server needs the latest details or not. 

All of the above steps results in a full implementation of push messaging on the 
web in Chrome.

### How to Debug Your Web App

While implementing push messages, bugs will live in one of two places: your page 
or your service worker.  
  
Bugs in the page can be debugged using 
[DevTools](https://developer.chrome.com/devtools). To debug service worker 
issues, you have two options:

1. Go to **chrome://inspect &gt; Service workers**. This view doesn't provide 
   much information other than the currently running service workers.
1. Go to **chrome://serviceworker-internals** and from here you can view the 
   state of service workers, and see errors, if there are any. This page is 
   temporary until DevTools has a similar feature set.

One of the best tips I can give to anyone who is new to service workers is make 
use of the checkbox called "Open DevTools window and pause JavaScript execution 
on service worker startup for debugging." on 
**chrome://serviceworker-internals**. This checkbox will add a breakpoint at 
the start of your service worker and **pause execution**, this allows you to 
resume or step through your service worker script and see if you hit any 
problems.

<p style="text-align: center;">
  <img src="{{site.baseurl}}/updates/images/2015-03-04-push-on-the-open-web/sw-internals-pause-checkbox.png" alt="Screenshot showing where the pause execution checkbox is on serviceworker-internals" />
</p>

If there seems to be an issue between GCM and your service worker's push event, 
then there isn't much you can do to debug the problem since there is no way for 
you to see whether Chrome received anything. The key thing to ensure is that the 
response from GCM is successful when your server makes an API call. It'll look 
something like:

{% highlight javascript %}
{
  "multicast_id":1234567890,
  "success":1,
  "failure":0,
  "canonical_ids":0,
  "results":[{"message_id":"0:1234567890"}]
}
{% endhighlight %}
Notice the `"success": 1` response. If you see a failure instead, then that 
suggests that something isn't right with the GCM subscription and the push 
message isn't getting sent to Chrome.

### Debugging Service Workers on Chrome for Android

At the moment debugging service workers on Chrome for Android is not obvious. 
You need to navigate to **chrome://inspect**, find your device and look for a 
list item with the name "Worker pid:...." which has the URL of your service 
worker.

<p style="text-align: center;">
  <img src="{{site.baseurl}}/updates/images/2015-03-04-push-on-the-open-web/service-worker-on-chrome-for-android.png" alt="Screenshot showing where service workers live in chrome inspect" />
</p>

## UX for Push Notifications

The Chrome team has been putting together a document of best practices
for push notifications UX as well as a document covering some
of the edge cases when working with push notifications.

- [Best Practices for Push Notifications Permissions UX](https://docs.google.com/document/d/1WNPIS_2F0eyDm5SS2E6LZ_75tk6XtBSnR1xNjWJ_DPE/edit?usp=sharing)
- [Push Notifications Edge Cases and Mitigations](https://docs.google.com/document/d/1KbmuByY7mJsTtqS-Mh6cDBt463hmDdp-67rTcN-Gmn8/edit?usp=sharing)

## Future of Push Messaging on Chrome and the Open Web

This section goes into a little bit of detail surrounding some of the Chrome 
specific parts of this implementation that you should be aware of and how it 
will differ from other browser implementations.

### Web Push Protocol and Endpoints

The beauty of the Push API standard is that you should be able to take the 
**endpoint**,  pass it to your server and send push 
messages by implementing the [Web Push Protocol](https://datatracker.ietf.org/doc/draft-thomson-webpush-protocol/).

The Web Push Protocol is a new standard which push providers can implement, 
allowing developers to not have to worry about who the push provider is. The 
idea is that this avoids the need to sign up for API keys and send specially 
formatted data, like you have to with GCM.

The end goal is to move away from requiring these Chrome / GCM specific steps
and to move to using the Web Push Protocol with Chrome and GCM. 

Until then, you need to detect the endpoint 
"[https://android.googleapis.com/gcm/send](https://android.googleapis.com/gcm/send)" 
and handle it separately from other endpoints, i.e. format the payload data in a 
specific way and add the Authorization key.

### How to Implement the Web Push Protocol?

At the moment there is no push service which implements the latest
version of the Web Push Protocol, meaning there is no sample to 
give on how to send a push message on your server for anything 
other than GCM.

## FAQs

### Where are the specs?

- [https://slightlyoff.github.io/ServiceWorker/spec/service\_worker/](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/)  
- [https://w3c.github.io/push-api/](https://w3c.github.io/push-api/)  
- [https://notifications.spec.whatwg.org/](https://notifications.spec.whatwg.org/)

### Can I prevent duplicate notifications if my web presence has multiple origins, or if I have both a web and native presence?

There isn't a solution to this at the moment, but you can follow progress [on Chromium](https://crbug.com/402223).

The ideal scenario would be to have some kind of ID for a users device and then 
on the server side match up the native app and web app subscription ID's and 
decide which one to send a push message to. You could do this via screen size, 
device model, sharing a generated key between the web app and native app, but 
each approach has pro's and con's.

### Why do I need a gcm\_sender\_id?

This is required so that Chrome can make use of the Google Cloud Messaging (GCM) 
API. The goal is to use the Web Push Protocol when the standard is finalised and 
GCM can support it.

### Why not use Web Sockets or [Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#server-sent-events) (EventSource)?

The advantage of using push messages is that even if your page is closed, your 
service worker will be woken up and be able to show a notification. Web Sockets 
and EventSource have their connection closed when the page or browser is closed.

### What if I don't need background event delivery?

If you don't need background delivery then Web Sockets are a great option.

### When can I use push without showing notifications (i.e. silent background push)?

There is no timeline for when this will be available yet, but there is an 
[intent to implement background sync](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/iaAyTxWmx7o) 
and while it's not decided or spec'd, there is some discussion of enabling 
silent push with background sync.

### Why does this require HTTPS? How do I work around this during development?

Service workers require secure origins to ensure that the service worker script 
is from the intended origin and hasn't come about from a man-in-the-middle 
attack. Currently, that means using HTTPS on live sites, though localhost will 
work during development.

### What does browser support look like?

At the moment Chrome is the only browser to implement this standard, but Mozilla 
have begun work on [implementing the Push API](https://bugzilla.mozilla.org/show_bug.cgi?id=1038811) and you can track 
[their Notification implementation here](https://bugzilla.mozilla.org/show_bug.cgi?id=1114554).

### Can I remove a notification after a certain time period?

At the moment this isn't possible, but as of Chrome 44 you can get a list
of currently visible notifications and perform actions on them accordingly.
If you have a use case to set an expiration for notification after it's 
displayed, we'd love to know what that is, so please add a comment and we'll 
pass it back to the Chrome team.

If you only need to stop a push notification from being sent to the user
after a certain time period, and don't care how long the notification stays
visible, then you can use GCM's time to live (ttl) parameter, 
[learn more here](https://developer.android.com/google/gcm/server.html#ttl).

### What are the limitations of push messaging in Chrome?

There are a few limitations outlined in this post:

* There is a range of changes from the initial version in Chrome 42 to Chrome 44
  (See the next question for more info).
* You can't send a payload with a push message.
* Chrome's usage of GCM as a push service creates a number of proprietary 
  requirements. We're working together to see if some of these can be lifted in 
  the future.
* You **have** to show a notification when you receive a push message.
* Chrome on desktop has the caveat that if Chrome isn't running, push messages 
  won't be received. This differs from Chrome OS and Android where push messages 
  will always be received. This is something we hope to resolve in the future.

### What changes exist in the Push API since Chrome 42

* In Chrome 43+, you can open any URL with clients.openWindow(),
  however in Chrome 42 you could only open URL on the same origin
* In Chrome 44 [Notification.data and ServiceWorkerRegistration.getNotifications()](https://www.chromestatus.com/feature/5736434757533696) 
  were implemented. The lack of Notification.data required the use of IndexDB 
  or hacks to get around it and there is no alternative for 
  ServiceWorkerRegistration.getNotifications() before Chrome version 44.
* In Chrome 42 the PushSubscription object had a subscriptionId variable
  on it. In Chrome 44+, the subscriptionId (a.k.a the GCM registration ID),
  is appended to the PushSubscription.endpoint. In Chrome 44 a warning is shown 
  but subscriptionId is still in the PushSubscription object and in Chrome 45 the subscriptionId variable will be removed.
* In Chrome 42 and 43 you needed to include 'gcm_user_visible: true' in your
  web app manifest. In Chrome 44 this is no longer needed but you need to pass
  in 'userVisibleOnly' as an option to the subscribe method, like so: `subscribe({userVisibleOnly: true})`

### Shouldn't we be using the Permissions API?

The 
[Permission API](https://w3c.github.io/permissions/) was added to Chrome
in version 43 and you can [learn more about the API in this article](http://updates.html5rocks.com/2015/04/permissions-api-for-the-web). For future proofing your
app you should use the Permission API and it's `onchange` event makes managing
state much easier, however you need to account for browsers which may not support
the Permission API but implement the Push API.

### What if a notification is out of date by the time the users device received the push?

You always have to show a notification when you receive a push message. 
In the scenario where you want to send a notification but it's only useful
for a certain period time, you can use the 'time_to_live' parameter on GCM
so that GCM won't send the push message if it passes the expiry time.

[More details can be found here](https://developer.android.com/google/gcm/server.html#ttl).

### What happens if I send 10 push messages but only want the device to receive one?

GCM has a 'collapse_key' parameter you can use to tell GCM to replace any pending
message which has the same 'collapse_key', with the new message.

[More details can be found here](https://developer.android.com/google/gcm/server.html#lifetime).
