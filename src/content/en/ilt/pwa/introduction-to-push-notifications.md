project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2018-04-12 #}
{# wf_published_on: 2016-01-01 #}


# Introduction to Push Notifications {: .page-title }




Codelab:  [Integrating Web Push](lab-integrating-web-push)

<div id="what"></div>


## What are Push Notifications?




A notification is a message that pops up on the user's device. Notifications can be triggered locally by an open application, or they can be "pushed" from the server to the user even when the app is not running. They allow your users to opt-in to timely updates and allow you to effectively re-engage users with customized content.

Push Notifications are assembled using two APIs: the  [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) and the  [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API). The Notifications API lets the app display system notifications to the user. The Push API allows a service worker to handle Push Messages from a server, even while the app is not active.

The Notification and Push API's are built on top of the  [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), which responds to  push message events in the background and relays them to your application.



Note: Service workers require secure origins so testing Push Notifications requires running a local server.



<div id="terms"></div>


## Push Notification Terms




* __Notification__ – a message displayed to the user outside of the app's normal UI (i.e., the browser)
* __Push Message__ – a message sent from the server to the client
* __Push Notification__ – a notification created in response to a push message
* __Notifications API__ – an interface used to configure and display notifications to the user
* __Push API__ – an interface used to subscribe your app to a push service and receive push messages in the service worker
* __Web Push__ – an informal term referring to the process or components involved in the process of pushing messages from a server to a client on the web
* __Push Service__ – a system for routing push messages from a server to a client. Each browser implements its own push service.
* __Web Push Protocol__ – describes how an application server or user agent interacts with a push service

<div id="understanding"></div>


## Understanding Push Notifications on the web




Push notifications let your app extend beyond the browser, and are an incredibly powerful way to engage with the user. They can do simple things, such as alert the user to an important event, display an icon and a small piece of text that the user can then click to open up your site. You can also integrate action buttons in the notification so that the user can interact with your site or application without needing to go back to your web page.

There are several pieces that come together to make push notifications work. Browsers that support web push each implement their own push service, which is a system for processing messages and routing them to the correct clients. Push messages destined to become notifications are sent from a server directly to the push service, and contain the information necessary for the push service to send it to the right client and wake up the correct service worker. The section on the  [Push API](#pushapi) describes this process in detail.

When it receives a message, the service worker wakes up just long enough to display the notification and then goes back to sleep. Because notifications are paired with a service worker, the service worker can listen for notification interactions in the background without using resources. When the user interacts with the notification, by clicking or closing it, the service worker wakes up for a brief time to handle the interaction before going back to sleep.

<div id="notificationapi"></div>


## Notifications API




The  [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) lets us display notifications to the user. It is incredibly powerful and simple to use. Where possible, it uses the same mechanisms a native app would use, giving a completely native look and feel.

We can split the Notifications API into two core areas (these are non-technical and are not part of the spec). The  *Invocation API * controls how to make your notification appear, including styling and vibration. We create (or invoke) the notification from the page (or from the server, in the case of push notifications). The  *Interaction API*  controls what happens when the user engages with the notification. User interaction is handled in the service worker.

### Request permission

Before we can create a notification we need to get permission from the user. Below is the code to prompt the user to allow notifications. This goes in the app's main JavaScript file.

#### main.js

```
Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});
```

We call the  [`requestPermission`](https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission) method on the global Notification object. This displays a pop-up message from the browser requesting permission to allow notifications. The user's response is stored along with your app, so calling this again returns the user's last choice. Once the user grants permission, the app can display notifications.

<div id="shownotification"></div>

### Display a notification

We can show a notification from the app's main script with the  [`showNotification`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification) method (the "Invocation API"). Here is an example:

#### main.js

```
function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification('Hello world!');
    });
  }
}
```

Notice the `showNotification` method is called on the service worker registration object. This creates the notification on the active service worker, so that events triggered by interactions with the notification are heard by the service worker.



Note: You can also create a notification using a  [notification constructor](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification). However, a notification created this way is not paired with a service worker and is therefore not interactive.



### Add notification options

The `showNotification` method has an optional second argument for configuring the notification. The following example code demonstrates some of the available options. See the  [showNotification reference on MDN](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification) for a complete explanation of each option.

#### main.js

```
function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      reg.showNotification('Hello world!', options);
    });
  }
}
```

* The `body` option adds a main description to the notification. It should give the user enough information to decide how to act on it.
* The `icon` option attaches an image to make the notification more visually appealing, but also more relevant to the user.  For example, if it's a message from their friend you might include an image of the sender's avatar.
* The `vibrate` option specifies a vibration pattern for a phone receiving the notification. In our example, a phone would vibrate for 100 milliseconds, pause for 50 milliseconds, and then vibrate again for 100 milliseconds.
* The `data` option attaches custom data to the notification, so that the service worker can retrieve it when the user interacts with the notification. For instance, adding a unique "id" or "key" option to the data allows us to determine which notification was clicked when the service worker handles the click event.

Here is a  [useful tool](https://tests.peter.sh/notification-generator/) that allows you to experiment with all of the different notification options.

### Add actions to the notification

Simple notifications display information to the user and handle basic interactions when clicked. This is a massive step forward for the web, but it's still a bit basic. We can add contextually relevant actions to the notification so the user can quickly interact with our site or service without opening a page. For example:

#### main.js

```
function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close notification',
            icon: 'images/xmark.png'},
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
}
```

To create a notification with a set of custom actions, we add an actions array inside the notification options object. This array contains a set of objects that define the action buttons to show to the user.

Actions can have an identifier string, a title containing text to be shown to the user, and an icon containing the location of an image to be displayed next to the action.

### Listen for events

Displaying a notification was the first step. Now we need to handle user interactions in the service worker (using the "Interaction API"). Once the user has seen your notification they can either  *dismiss*  it or  *act on*  it.

#### The notificationclose event

If the user dismisses the notification through a direct action on the notification (such as a swipe in Android), it raises a `notificationclose` event inside the service worker.



Note: If the user dismisses all notifications then, to save resources, an event is not raised in the service worker.



This event is important because it tells you how the user is interacting with your notifications. You might, for example, log the event to your analytics database. Or, you might use the event to synchronize your database and avoid re-notifying the user of the same event.

Here is an example of a `notificationclose` event listener in the service worker:

#### serviceworker.js

```
self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});
```

We can access the  [notification object](https://developer.mozilla.org/en-US/docs/Web/API/notification) from the event object. From there we can get the data and decide how to respond. In the example, we are getting the `primaryKey` property defined earlier and logging it to the console.

#### The notificationclick event

The most important thing is to handle when the user clicks on the notification. The click triggers a `notificationclick` event inside your service worker.

Let's look at the code to handle the click event in the service worker.

#### serviceworker.js

```
self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://www.example.com');
    notification.close();
  }
});
```

We can determine what action button the user clicked by inspecting the action property on the event object.

When a user clicks on a notification they usually expect to be taken directly to where  they can get more information about the notification. You can open a new window by calling `clients.openWindow` in your `notificationclick` handler and passing in the URL where you want the user to navigate.

Notice we check for the `close` action first and handle the `explore` action in an `else` block. This is a best practice as not every platform supports action buttons, and not every platform displays all your actions. Handling actions in this way provides a default experience that works everywhere.

<div id="future"></div>


## Designing with the future in mind




The  [notification spec](https://notifications.spec.whatwg.org/) is constantly evolving with the authors and browser vendors constantly adding new features and increasing the possibilities of what you can do with the Notifications API. Note that:

* Not all browsers implement the Notifications API to the same level
* Operating systems may not support the same features for notifications

We need to build our sites and apps defensively, yet progressively so that our experiences work well everywhere. Let's look at what we can do to create a consistent experience.

### Check for Support

The web is not yet at the point where we can build apps that depend on web notifications. When possible, design for a lack of notification support and layer on notifications.

The simplest thing to do is detect if the ability to send notifications is available and, if it is, enable that part of the user's experience:

#### main.js

```
if ('Notification' in window && navigator.serviceWorker) {
  // Display the UI to let the user toggle notifications
}
```

Here are some things you can do when the user's browser doesn't support the Notifications API:

* Offer a simple inline "notification" on your web page. This works well when the user has the page open.
* Integrate with another service, such as an SMS provider or email provider to provide timely alerts to the user.

### Check for permission

Always check for permission to use the Notifications API. It is important to keep checking that permission has been granted because the status may change:

#### main.js

```
if (Notification.permission === "granted") {
  /* do our magic */
} else if (Notification.permission === "blocked") {
 /* the user has previously denied push. Can't reprompt. */
} else {
  /* show a prompt to the user */
}
```

### Cross-platform differences

The action buttons and images differ significantly across platforms. For example, some OSs may display a limited number of actions and others may not make actions directly visible to the user.

You can check the maximum number of action buttons that can be displayed by calling `Notification.maxActions`. Do this when you create notifications so you can adapt them if needed. You can also check this in the `notificationclick` handler in the service worker to determine the right response.

A good practice is to assume that the system cannot support any actions other than the notification click. This means that you must design your notification to handle the default click and have it execute the default response. You can then layer on some customization for each action.

Decide if the context of each action requires buttons to be grouped together. If you have a binary choice, such as accept and decline, but can only display one button, you may decide to not display buttons.

Finally, treat every attribute of the notification other than `title` and `body` as optional and at the discretion of the browser and the operating system to use. For example, don't rely on images being present in the notification. If you are using the image to display contextual information (such as a photo of a person), be sure to display that information in the title or the body so the user can determine the importance of the notification if the image is not visible.

Button labels should be clear and concise. Although action buttons can have images, not every system can display them.

Also, don't rely on vibrations to notify the user. Many systems can't vibrate, or won't vibrate if the user has their device volume muted.

<div id="pushapi"></div>


## Push API




We have learned how to create a notification and display it to the user directly from a web page. This is great if you want to create notifications when the page is open, but what if the page isn't open? How can you create a notification that alerts the user of some important information?

Native apps have been able to do this for a long time using a technology called Push Messaging. We can now do the same on the web through the Push API.



Note: Push and notification are different but complementary functions. A push is the action of the server supplying message information to a service worker; a notification is the action of the service worker sending the information to a user.



Push messaging lets developers engage users by providing timely and customized content outside the context of the web page. It is one of the most critical APIs to come to the web, giving users the ability to engage with web experiences even when the browser is closed, without the need for a native app install.

There are many moving parts to web push that involve client-side management and also server management. We are primarily going to focus on the client-side aspects of web push as it relates to push notifications (the Push API). We'll leave the server-side details to commercial services that we will provide links to.

### How Web Push works

Let's walk through an overview of how web push works.

Each browser manages push notifications through their own system, called a "push service". When the user grants permission for Push on your site, you can then subscribe the app to the browser's push service. This creates a special subscription object that contains the "endpoint URL" of the push service, which is different for each browser, and a public key (see the example below). You send your push messages to this URL, encrypted with the public key, and the push service sends it to the right client. A typical subscription object looks like this:

```
{"endpoint":"https://fcm.googleapis.com/fcm/send/dpH5lCsTSSM:APA91bHqjZxM0VImWWqDRN7U0a3AycjUf4O-byuxb_wJsKRaKvV_iKw56s16ekq6FUqoCF7k2nICUpd8fHPxVTgqLunFeVeB9lLCQZyohyAztTH8ZQL9WCxKpA6dvTG_TUIhQUFq_n",
"keys": {
    "p256dh":"BLQELIDm-6b9Bl07YrEuXJ4BL_YBVQ0dvt9NQGGJxIQidJWHPNa9YrouvcQ9d7_MqzvGS9Alz60SZNCG3qfpk=",
    "auth":"4vQK-SvRAN5eo-8ASlrwA=="
    }
}
```

How does the push service know which client to send the message to? The endpoint URL contains a unique identifier. This identifier is used to route the message that you send to the correct device, and when processed by the browser, identifies which service worker should handle the request.

The identifier is opaque. As a developer, you can't determine any personal data from it. Also, it is not stable, so it can't be used to track users.

Because push notifications are paired with a service worker, apps that use push notifications must be on HTTPS. This ensures that the communication channel between your server and the push service is secure, and from the push service to the user is also secure.

However, HTTPS doesn't ensure that the push service itself is secure. We must be sure that the data sent from your server to the client is not tampered with or directly inspected by any third party. You must encrypt the message payload on your server.

The following summarizes the process of sending and receiving a push message and then displaying a push notification.

On the client:

1. Subscribe to the push service
2. Send the subscription object to the server

On the server:

3. Generate the data that we want to send to the user
4. Encrypt the data with the user public key
5. Send the data to the endpoint URL with a payload of encrypted data.

The message is routed to the user's device. This wakes up the browser, which finds the correct service worker and invokes a "push" event. Now, on the client:

6. Receive the message data (if there is any) in the "push" event
7. Perform some custom logic in the push event
8. Show a notification

That completes the path from server push to user notification. Let's look at each part. We'll start with receiving the message in the service worker, since that's the simplest, and then move on to subscribing to the push service and sending the push message from the server.

### Handling the push event in the service worker

Let's see how the service worker handles push messages. The service worker both receives the push message and creates the notification.

When a  [browser that supports push messages](http://caniuse.com/#search=notification) receives a message, it sends a `push` event to the service worker. We can create a `push` event listener in the service worker to handle the message:

#### serviceworker.js

```
self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close',
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});
```

This code is very similar to what we have covered before in this tutorial, the difference being that this is happening inside the service worker in response to a `push` event, instead of in the app's main script.

Another important difference is that the `showNotification` method is wrapped in an  [`e.waitUntil` method](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil). This extends the lifetime of the push event until the `showNotification` promise resolves. In general, we use the `waitUntil` method to ensure the service worker doesn't terminate before an asynchronous operation has completed.

### Subscribing to Push Notifications

Before we can send a push message we must first subscribe to a push service. Subscribing returns a subscription object, or `subscription`. The `subscription` is a critical piece of the process to send push messages. It tells us, the developer, to which push service we should send our push messages (remember, each browser will provide their own push service). The subscription also details which client the push service should route the messages to. Finally, the `subscription` contains the public key to encrypt the data so that it is delivered securely to the user.

It is your job to take this `subscription` object and store it somewhere on your system. For instance, you might store it in a database attached to a user object. In our examples, we will log results to the console.

First, we need to check if we already have a `subscription` object and update the UI accordingly.

#### main.js

```
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    console.log('Service Worker Registered!', reg);

    reg.pushManager.getSubscription().then(function(sub) {
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
      } else {
        // We have a subscription, update the database
        console.log('Subscription object: ', sub);
      }
    });
  })
   .catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
}
```

We should perform this check whenever the user accesses our app because `subscription` objects may change during their lifetime. We need to make sure that it is synchronized with our server. If there is no `subscription` object we can update our UI to ask the user if they would like receive notifications.

Assume the user enabled notifications. Now we can subscribe to the push service:

#### main.js

```
function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {

      reg.pushManager.subscribe({
        userVisibleOnly: true
      }).then(function(sub) {
        console.log('Endpoint URL: ', sub.endpoint);
      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}
```

It's best practice to call the `subscribeUser()` function in response to a user action signalling they would like to subscribe to push messages from our app.

In the above example we call the  [`subscribe` method](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe) on the  [`pushManager`](https://developer.mozilla.org/en-US/docs/Web/API/PushManager) and log the subscription object to the console.

Notice we are passing a flag named `userVisibleOnly` to the subscribe method. By setting this to `true`, the browser ensures that every incoming message has a matching (and visible) notification.



Note: In the current implementation of Chrome, whenever we receive a push message and we don't have our site visible in the browser we must display a notification. That is, we can't do it silently without the user knowing. If we don't display a notification the browser automatically creates one to let the user know that the app is doing work in the background.



If the user doesn't accept the permission request or there's another error, the promise rejects.

We add a catch clause to handle this, and then check the permission property on the notification global object to understand why we can't display notifications.

### The Web Push Protocol

Let's look at how to send a push message to the browser using the  [Web Push Protocol](https://datatracker.ietf.org/doc/draft-thomson-webpush-protocol/).

The Web Push protocol is the formal standard for sending push messages destined for the browser. It describes the structure and flow of how to create your push message, encrypt it, and send it to a Push messaging platform. The protocol abstracts the details of which messaging platform and browser the user has.

The Web Push protocol is complex, but we don't need to understand all of the details. The browser automatically takes care of subscribing the user with the push service. Our job, as developers, is to take the subscription token, extract the URL, and send our message there.

### Sending a Push Message Using Firebase Cloud Messaging

Chrome currently uses  [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) (FCM) as its push service.  [FCM recently adopted the Web Push protocol](/web/updates/2016/07/web-push-interop-wins). FCM is the successor to Google Cloud Messaging (GCM) and supports the same functionality and more.

To use Firebase Cloud Messaging, you need to set up a project on  [Firebase](https://firebase.google.com/) (see the  [section on VAPID](#vapid) to get around this step). Here's how:

1. In the  [Firebase console](https://console.firebase.google.com/), select __Create New Project__.
2. Supply a project name and click __Create Project__.
3. Click the Settings icon next to your project name in the Navigation panel and select __Project Settings__.
4. Open the __Cloud Messaging__ tab. You can find your __Server key__ and __Sender ID__ in this page. Save these values.

For Chrome to route FCM messages to the correct service worker, it needs to know the Sender ID. Supply this by adding a `gcm_sender_id` property to your app's  `manifest.json` file. For example, the manifest could look like this:

```
{
  "name": "Push Notifications app",
  "gcm_sender_id": "370072803732"
}
```



Note: The <code>gcm_sender_id</code> is required for Chrome prior to version 52, Opera Android, and Samsung Internet.



To get FCM to push a notification without a payload to your web client, the request must include the following:

* The subscription endpoint URL
* The public Server key. FCM uses this to check whether the server making the requests is actually allowed to send messages to the receiving user.

A production site or app normally sets up a service to interact with FCM from your server. Check out the  [Web Fundamentals documentation](/web/fundamentals/engage-and-retain/push-notifications/) for more information.

We can test push messaging in our app using  [cURL](https://curl.haxx.se/docs/manpage.html). We can send an empty message, called a "tickle", to the push service, then the push service sends a message to the browser. If the notification displays, then we have done everything correctly and our app is ready to push messages from the server.

#### Sending a Message Using cURL

The cURL command that sends a request to FCM to issue a push message looks like this:

    curl "ENDPOINT_URL" --request POST --header "TTL: 60" --header "Content-Length: 0" \
    --header "Authorization: key=SERVER_KEY"

For example:

    curl "https://android.googleapis.com/gcm/send/fYFVeJQJ2CY:APA91bGrFGRmy-sY6NaF8a...gls7HZcwJL4 \
    LFxjg0y0-ksEhKjpeFC5P" --request POST --header "TTL: 60" --header "Content-Length: 0" \
     --header "Authorization: key=AIzaSyD1JcZ8WM1vTtH6Y0tXq_Pnuw4jgj_92yg"

You can send a message to Firefox using the same cURL command, but without the `Authorization` header:

    curl "ENDPOINT_URL" --request POST --header "TTL: 60" --header "Content-Length: 0" --header

For example:

    curl "https://updates.push.services.mozilla.com/wpush/v1/gAAAAABYGml8oAFQC2a-HYb...7hKVui9zuT" \
    --request POST --header "TTL: 60" --header "Content-Length: 0"

### Working with Data Payloads

It's relatively easy to get a push message to the user. However, so far the notifications we have sent have been empty. Chrome and Firefox support the ability to deliver data to your service worker using the push message.

#### Receiving Data in the Service Worker

Let's first look at what changes are needed in the service worker to pull the data out of the push message.

#### serviceworker.js

```
self.addEventListener('push', function(e) {
  var body;

  if (e.data) {
    body = e.data.text();
  } else {
    body = 'Push message no payload';
  }

  var options = {
    body: body,
    icon: 'images/notification-flat.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'I don't want any of this',
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
```

When we receive a push notification with a payload, the data is available directly on the event object. This data can be of any type, and you can access the data as a JSON result, a BLOB, a typed array, or raw text.

#### Sending the message from the Server

In this section, we cover how to send a push message from the server.

In order to send data, the push message must be encrypted with the key information from the subscription object. As with anything related to encryption, it's usually easier to use an actively maintained library than to write your own code.

We are using Mozilla's  [web-push library](https://www.npmjs.com/package/web-push) for Node.js. This handles both encryption and the web push protocol, so that sending a push message from a Node.js server is simple:

```
webpush.sendNotification(pushSubscription, payload, options)
```

The first argument is the the `subscription` object. The second argument  is the `payload`. The third is an `options` object that contains various options to configure the message. See  [the documentation](https://github.com/web-push-libs/web-push/) for details.

While we recommend using a library, this is a new feature and there are many popular languages that don't yet have any libraries. Here is a list of some available  [web-push libraries](https://github.com/web-push-libs) for various languages. If you do need to implement encryption manually, use Peter Beverloo's  [encryption verifier](https://tests.peter.sh/push-encryption-verifier/).

We now have all the client side components in place, so let's create a simple server-side script using Node.js that imports the web-push library and then uses our subscription object to send a message to the client.

To install web-push in the app from the command window we run:

    $ npm install web-push

The node script looks like this:

#### node/main.js

```
var webPush = require('web-push');

var pushSubscription = {"endpoint":"https://android.googleapis.com/gcm/send/f1LsxkKphfQ:APA91bFUx7ja4BK4JVrNgVjpg1cs9lGSGI6IMNL4mQ3Xe6mDGxvt_C_gItKYJI9CAx5i_Ss6cmDxdWZoLyhS2RJhkcv7LeE6hkiOsK6oBzbyifvKCdUYU7ADIRBiYNxIVpLIYeZ8kq_A",
"keys":{"p256dh":"BLc4xRzKlKORKWlbdgFaBrrPK3ydWAHo4M0gs0i1oEKgPpWC5cW8OCzVrOQRv-1npXRWk8udnW3oYhIO4475rds=", "auth":"5I2Bu2oKdyy9CwL8QVF0NQ=="}};

var payload = 'Here is a payload!';

var options = {
  gcmAPIKey: 'AIzaSyD1JcZ8WM1vTtH6Y0tXq_Pnuw4jgj_92yg',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);
```

This example passes the subscription object, payload, and server key into the `sendNotification` method. It also passes in a time-to-live, which is the value in seconds that describes how long a push message is retained by the push service (by default, four weeks).

<div id="vapid"></div>

### Identifying Your Service with VAPID Auth

The Web Push Protocol has been designed to respect the user's privacy by keeping users anonymous and not requiring strong authentication between your app and the push service. This presents some challenges:

* An unauthenticated push service is exposed to a greater risk of denial of service attack
* Any application server in possession of the endpoint is able to send messages to your users
* There's no way for the push service to contact the developer if there are problems

The solution is to have the publisher optionally identify themselves using the  [Voluntary Application Server Identification for Web Push (VAPID) protocol](https://tools.ietf.org/html/draft-ietf-webpush-vapid-01). At a minimum, this provides a stable identity for the application server, though this could also include contact information, such as an email address.

The spec lists several benefits of using VAPID:

* A consistent identity can be used by a push service to establish behavioral expectations for an application server. Significant deviations from an established norm can then be used to trigger exception handling procedures.
* Voluntarily-provided contact information can be used to contact an application server operator in the case of exceptional situations.
* Experience with push service deployment has shown that software errors or unusual circumstances can cause large increases in push message volume.  Contacting the operator of the application server has proven to be valuable.
* Even in the absence of usable contact information, an application server that has a well-established reputation might be given preference over an unidentified application server when choosing whether to discard a push message.

Using VAPID also lets you avoid the FCM-specific steps for sending a push message. You no longer need a Firebase project, a `gcm_sender_id`, or an `Authorization` header.

### Using VAPID

The process is pretty simple:

1. Your application server creates a public/private key pair. The public key is given to your web app.
2. When the user elects to receive pushes, add the public key to the `subscribe()` call's options object.
3. When your app server sends a push message, include a signed JSON web token along with the public key.

Let's look at these steps in detail.



Note: We recommend using a <a href="https://github.com/web-push-libs">library</a> to implement VAPID in your push messages. This spares you from the details of encryption and JWT signing. We show an <a href="#webpushvapid">example</a> using the <a href="https://github.com/web-push-libs/web-push">web-push library</a> for Node.js at the end of this section.



#### Create a public/private key pair

Here's the relevant section from the spec regarding the format of the VAPID public/private keys:

 *Application servers SHOULD generate and maintain a signing key pair usable with elliptic curve digital signature (ECDSA) over the P-256 curve.*

You can see how to do this in the  [web-push node library](https://github.com/web-push-libs/web-push):

```
function generateVAPIDKeys() {
  const vapidKeys = webpush.generateVAPIDKeys();

  return {
    publicKey: vapidKeys.publicKey,
    privateKey: vapidKeys.privateKey,
  };
}
```

#### Subscribing with the public key

To subscribe a Chrome user for push with the VAPID public key, pass the public key as a `Uint8Array` using the `applicationServerKey` parameter of the `subscribe()` method.

```
const publicKey = new Uint8Array([0x4, 0x37, 0x77, 0xfe, .... ]);
serviceWorkerRegistration.pushManager.subscribe(
  {
    userVisibleOnly: true,
    applicationServerKey: publicKey
  }
);
```

You'll know if it has worked by examining the endpoint in the resulting subscription object; if the origin is __fcm.googleapis.com__, it's working.



Note: Even though this is an FCM URL, use the <a href="https://tools.ietf.org/html/draft-ietf-webpush-protocol-12">Web Push Protocol</a> <strong>not</strong> the FCM protocol, this way your server-side code will work for any push service.



#### Sending a push message

To send a message using VAPID, you make a normal Web Push Protocol request with two additional HTTP headers: an `Authorization` header and a `Crypto-Key` header. Let's look at these new headers in detail.



Note: This is where web push <a href="https://github.com/web-push-libs">libraries</a> really shine, as the process of signing and sending a message can be quite complex. We include an <a href="#webpushvapid">example</a> of sending a message with VAPID using the <a href="https://github.com/web-push-libs/web-push">web-push library</a> for Node.js at the end of this section.



##### Authorization header

The `Authorization` header is a signed  [JSON Web Token (JWT)](https://jwt.io/) with "WebPush " in front of it.

A JWT is a way of sharing a JSON object with a second party in such a way that the sending party can sign it and the receiving party can verify the signature is from the expected sender. The structure of a JWT is three encrypted strings, joined with a single dot between them.

`<JWTHeader>.<Payload>.<Signature>`

##### JWT header

The JWT Header contains the algorithm name used for signing and the type of token. For VAPID this must be:

```
{
  "typ": "JWT",
  "alg": "ES256"
}
```

This is then base64 url encoded and forms the first part of the JWT.

##### Payload

The Payload is another JSON object containing the following:

* Audience (`aud`)
* This is the origin of the push service (NOT the origin of your site). In JavaScript, you could do the following to get the audience: <code>const audience = new URL(subscription.endpoint).origin</code>
* Expiration Time (`exp`)
* This is the number of seconds until the request should be regarded as expired. This MUST be within 24 hours of the request being made, in UTC.
* Subject (`sub`)
* The subject needs to be a URL or a mailto: URL. This provides a point of contact in case the push service needs to contact the message sender.

An example payload could look like the following:

```
{
    "aud": "http://push-service.example.com",
    "exp": Math.floor((Date.now() / 1000) + (12 * 60 * 60)),
    "sub": "mailto: my-email@some-url.com"
}
```

This JSON object is base64 url encoded and forms the second part of the JWT.

##### Signature

The Signature is the result of joining the encoded header and payload with a dot then encrypting the result using the VAPID private key you created earlier. The result itself should be appended to the header with a dot.

There are a  [number of libraries](https://jwt.io/#libraries-io) that will take the header and payload JSON objects and generate this signature for you.

The signed JWT is used as the `Authorization` header, with "WebPush" prepended to it, and looks something like the following:

    WebPush eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTQ2NjY2ODU5NCwic3ViIjoibWFpbHRvOnNpbXBsZS1wdXNoLWRlbW9AZ2F1bnRmYWNlLmNvLnVrIn0.Ec0VR8dtf5qb8Fb5Wk91br-evfho9sZT6jBRuQwxVMFyK5S8bhOjk8kuxvilLqTBmDXJM5l3uVrVOQirSsjq0A

There are a few things to point out here. First, the `Authorization` header literally contains the word `WebPush` and should be followed by a space then the JWT. Also notice the dots separating the JWT header, payload, and signature.

##### Crypto-Key header

As well as the `Authorization` header, you must add your VAPID public key to the `Crypto-Key` header as a base64 url encoded string with `p256ecdsa=` prepended to it.

    p256ecdsa=BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaNndIo

When you are sending a notification with encrypted data, you will already be using the `Crypto-Key` header, so to add the application server key, you just need to add a comma before adding the above content, resulting in:

    dh=BGEw2wsHgLwzerjvnMTkbKrFRxdmwJ5S_k7zi7A1coR_sVjHmGrlvzYpAT1n4NPbioFlQkIrTNL8EH4V3ZZ4vJE,
    p256ecdsa=BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaN



Note: There is a bug in Chrome prior to version 52 that requires the use of a semicolon instead of a comma in the Crypto-key header.



<div id="vapidexamples"></div>

#### Examples

Here's an example cURL request using VAPID:

    curl "https://updates.push.services.mozilla.com/wpush/v1/gAAAAABXmk....dyR" --request POST --header "TTL: 60" --header "Content-Length: 0" --header "Authorization: WebPush eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTQ2NjY2ODU5NCwic3ViIjoibWFpbHRvOnNpbXBsZS1wdXNoLWRlbW9AZ2F1bnRmYWNlLmNvLnVrIn0.Ec0VR8dtf5qb8Fb5Wk91br-evfho9sZT6jBRuQwxVMFyK5S8bhOjk8kuxvilLqTBmDXJM5l3uVrVOQirSsjq0A" --header "Crypto-Key: p256ecdsa=BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaNndIo"

We've added two new headers to the request: an Authorization header that is the  [HMAC signature](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code) of our JWT token, and the Crypto-key, which is our public key that is used to determine if the JWT is valid.

<div id="webpushvapid"></div>

Here is an example of sending a payload with VAPID in a node script using the web-push library:

```
var webPush = require('web-push');

var pushSubscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/c0NI73v1E0Y:APA91bEN7z2weTCpJmcS-MFyfbgjtmlAWuV5YaaNw625_Rq2-f0ZrVLdRPXKGm7B3uwfygicoCeEoWQxCKIxlL3RWG2xkHs6C8-H_cxq-4Z-isAiZ3ixo84-2HeXB9eUvkfNO_t1jd5s","keys":{"p256dh":"BHxSHtYS0q3i0Tb3Ni6chC132ZDPd5uI4r-exy1KsevRqHJvOM5hNX-M83zgYjp-1kdirHv0Elhjw6Hivw1Be5M=","auth":"4a3vf9MjR9CtPSHLHcsLzQ=="}};

var vapidPublicKey = 'BAdXhdGDgXJeJadxabiFhmlTyF17HrCsfyIj3XEhg1j-RmT2wXU3lHiBqPSKSotvtfejZlAaPywJ9E-7AxXQBj4
';
var vapidPrivateKey = 'VCgMIYe2BnuNA4iCfR94hA6pLPT3u3ES1n1xOTrmyLw
';

var payload = 'Here is a payload!';

var options = {
  vapidDetails: {
    subject: 'mailto:example_email@example.com',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey
  },
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);
```

We add the VAPID object to the options parameter in the `sendNotification` method. It contains the subject (your email address) and the generated Public and Private keys. The library takes care of encrypting the message, generating and signing the JWT, and adding the `Authorization` and `Crypto-Key` headers to the request. See the  [web-push documentation](https://github.com/web-push-libs/web-push) for more information on how to use the library.

<div id="bestpractices"></div>


## Best Practices




While it's relatively simple to get notifications up and running, making an experience that users really value is trickier. There are also many edge cases to consider when building an experience that works well.

This lesson discusses best practices for implementing push notifications.

### Using Notifications Wisely

Notifications should be timely, precise, and relevant. By following these three rules, you'll keep your users happier and increase their return visits.

__Timely__ – The notification should display at the right time. Use notifications primarily for time-sensitive events, especially if these synchronous events involve other people.

For instance, an incoming chat is a real-time and synchronous form of communication (another user is actively waiting on your response). Calendar events are another good example of when to use a notification to grab the user's attention, because the event is imminent and often involves other people.

__Precise__ – Offer enough information so that the user can make a decision without clicking through to the web page.

In particular, you should:

* Keep it short
* Make the title and content specific
* Keep important information on the top and to the left
* Make the desired action the most prominent

Because users often give notifications only a quick glance, you can make their lives easier with a well-chosen title, description, and icon. If possible, make the icon match the context of the notification so users can identify it without reading.

__Relevant__ – Make notifications relevant to the user's needs. If the user receives too many unimportant notifications, they might turn them all off. So keep it personal. If it's a chat notification, tell them who it's from.

Avoid notifications that are not directed specifically at the user, or information that is not truly time-sensitive. For instance, the asynchronous and undirected updates flowing through a social network generally do not warrant a real-time interruption.

Don't create a notification if the relevant new information is currently on screen. Instead, use the UI of the application itself to notify the user of new information directly in context. For instance, a chat application should not create system notifications while the user is actively chatting with another user.

Whatever you do, don't use notifications for advertising of any kind.

### Design Notifications According to Best Principles

This section provides best practices to make your notifications timely, precise, and relevant.

To show notifications we need to prompt the user to give permission. But when is the best time to do that?

Geolocation offers a good example of where we can look at people's experience with its prompts. Although geolocation is a great API, many sites immediately prompt the user for their location the instant that the page loads. This is a poor time to ask. The user has no context for how to make an informed decision about allowing access to this powerful piece of data, and users frequently deny this request. Acceptance rates for this API can be as low as six percent.

However, when the user is presented with the prompt after an action such as clicking on a locator icon, the acceptance rate skyrockets.

The same applies to the push notifications. If you ask the user for permission to send push notifications when they first land on your site, they might dismiss it. Once they have denied permission, they can't be asked again. Case studies show that when a user has context when the prompt is shown, they are more likely to grant permission.

The following interaction patterns are good times to ask for permission to show notifications:

* When the user is configuring their communication settings, you can offer push notifications as one of the options.
* After the user completes a critical action that needs to deliver timely and relevant updates to the user. For example, if the user purchased an item from your site, you can offer to notify the user of delivery updates.
* When the user returns to your site they are likely to be a satisfied user and more understanding of the value of your service.

Another pattern that works well is to offer a very subtle promotion area on the screen that asks the user if they would like to enable notifications. Be careful not to distract too much from your site's main content. Clearly explain the benefits of what notifications offers the user.

### Managing the Number of Notifications

It's not unreasonable for a site to send the user lots of important and relevant updates. However, if you don't build them correctly, they can become unmanageable for the user.

A simple technique is to group messages that are contextually relevant into one notification. For example, if you are building a social app, group notifications by sender and show one per person. If you have an auction site, group notifications by the item being bid on.

The notification object includes a `tag` attribute that is the grouping key. When creating a notification with a `tag` and there is already a notification with the same `tag` visible to the user, the system automatically replaces it without creating a new notification. For example:

#### serviceworker.js

```
registration.showNotification('New message', {body: 'New Message!', tag: 'id1' });
```

Not giving a second cue is intentional, to avoid annoying the user with continued beeps, whistles and vibrations. To override this and continue to notify the user, set the `renotify` attribute to true in the notification options object:

#### serviceworker.js

```
registration.showNotification('2 new messages', {
  body: '2 new Messages!',
  tag: 'id1',
  renotify: true
});
```

### When to Show Notifications

If the user is already using your application there is no need to display a notification. You can manage this logic on the server, but it is easier to do it in the push handler inside your service worker:

#### serviceworker.js

```
self.addEventListener('push', function(e) {
  clients.matchAll().then(function(c) {
    if (c.length === 0) {
      // Show notification
      e.waitUntil(
        self.registration.showNotification('Push notification')
      );
    } else {
      // Send a message to the page to update the UI
      console.log('Application is already open!');
    }
  });
});
```

The `clients` global in the service worker lists all of the active push clients on this machine.

If there are no clients active, the user must be in another app. We should show a notification in this case.

If there  *are*  active clients it means that the user has your site open in one or more windows. The best practice is to relay the message to each of those windows.

### Hiding Notifications on Page Focus

When a user clicks on a notification we may want to close all the other notifications that have been raised by your site. In most cases you will be sending the user to the same page that has easy access to the other data that is held in the notifications.

We can clear all notifications by iterating over the notifications returned from the  `getNotifications` method on our service worker registration and closing each:

#### serviceworker.js

```
self.addEventListener('notificationclick', function(e) {
  // do your notification magic

  // close all notifications
  self.registration.getNotifications().then(function(notifications) {
    notifications.forEach(function(notification) {
      notification.close();
    });
  });
});
```

If you don't want to clear all of the notifications, you can filter based on the tag by passing it into `getNotifications`:

#### serviceworker.js

```
self.addEventListener('notificationclick', function(e) {
  // do your notification magic

  // close all notifications with tag of 'id1'
  var options = {tag: 'id1'};
  self.registration.getNotifications(options).then(function(notifications) {
    notifications.forEach(function(notification) {
      notification.close();
    });
  });
});
```

You could also filter out the notifications directly inside the promise returned from `getNotifications`. For example, there might be some custom data attached to the notification that you could use as your filter-criteria.

### Notifications and Tabs

Window management on the web can often be difficult. Think about when you would want to open a new window, or just navigate to the current open tab.

When the user clicks on the notification, you can get a list of all the open clients. You can decide which one to reuse.

#### serviceworker.js

```
self.addEventListener('notificationclick', function(e) {
  clients.matchAll().then(function(clis) {
    var client = clis.find(function(c) {
      c.visibilityState === 'visible';
    });
    if (client !== undefined) {
      client.navigate('some_url');
      client.focus();
    } else {
      // there are no visible windows. Open one.
      clients.openWindow('some_url');
      notification.close();
    }
  });
});
```

The code above looks for the first window with `visibilityState` set to `visible`.  If one is found it navigates that client to the correct URL and focuses the window. If a window that suits our needs is not found, it opens a new window.

### Managing Notifications at the Server

So far, we've been assuming the user is around to see our notifications. But consider the following scenario:

1. The user's mobile device is offline
2. Your site sends user's mobile device a message for something time sensitive, such as breaking news or a calendar reminder
3. The user turns the mobile device on a day later. It now receives the push message.

That scenario is a poor experience for the user. The notification is neither timely or relevant. Our site shouldn't display the notification because it's out of date.

You can use the `time_to_live` (TTL) parameter, supported in both HTTP and XMPP requests, to specify the maximum lifespan of a message. The value of this parameter must be a duration from 0 to 2,419,200 seconds, corresponding to the maximum period of time for which FCM stores and tries to deliver the message. Requests that don't contain this field default to the maximum period of 4 weeks. If the message is not sent within the TTL, it is not delivered.

Another advantage of specifying the lifespan of a message is that FCM never throttles messages with a `time_to_live` value of 0 seconds. In other words, FCM guarantees best effort for messages that must be delivered "now or never". Keep in mind that a `time_to_live` value of 0 means messages that can't be delivered immediately are discarded. However, because such messages are never stored, this provides the best latency for sending notifications.

Here is an example of a JSON-formatted request that includes TTL:

```
{
   "collapse_key" : "demo",
   "delay_while_idle" : true,
   "to" : "xyz",
   "data" : {
     "key1" : "value1",
     "key2" : "value2",
   },
   "time_to_live" : 3
 },
```

### Managing Redundant Notifications

What should you do if the user can get the same notification in multiple places, such as in a chat app?

Consider the following:

1. The user's mobile device is unavailable.
2. The site sends a message to the user's phone announcing a new email.
3. The user checks email on desktop and reads the new email.
4. Now when the user turns their phone on, the push message is received but there is no new email to show (and no visible notification on the site).

We don't want to display redundant notifications that have been removed elsewhere, but you currently have to display a notification to the user.

There are a number of options available to solve this:

1. __Show the old notification__, even if it's no longer relevant. This looks like a small glitch of the clients being out of sync.
2. __Handle the push message without triggering a notification__. Chrome allows sites to  *very occasionally*  handle a push message without triggering a notification. If this case occurs extremely rarely it may be OK to do nothing.
3. Ignore the message from the server and __replace the notification with a fallback__ to be displayed if no other is available. For example, rather than display the information from an email the user has already read you could say "We've updated your inbox".

<div id="resources"></div>


## More Resources




#### Your first push notifications

*  [Adding Push Notifications to a Web App](/web/fundamentals/getting-started/push-notifications/)
*  [Adding Push Notifications to a Web App (Codelab)](https://codelabs.developers.google.com/codelabs/push-notifications/index.html?index=..%2F..%2Findex#0)
*  [Using the Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API/Using_the_Push_API)

#### When to use push notifications

*  [Web Push Notifications: Timely, Relevant, and Precise](/web/fundamentals/engage-and-retain/push-notifications/)

#### Demos

*  [Push demo](https://gauntface.github.io/simple-push-demo/)
*  [Notification Generator](https://tests.peter.sh/notification-generator/#actions=8)

#### Messaging concepts and options

*  [Setting the lifespan of a message](/cloud-messaging/concept-options#ttl)

#### Web-push documentation

*  [web-push - Web Push library for Node.js](https://www.npmjs.com/package/web-push)

#### Web Push Libraries

*  [web-push-libs](https://github.com/web-push-libs)

#### VAPID

*  [Voluntary Application Server Identification for Web Push](https://tools.ietf.org/html/draft-thomson-webpush-vapid-02)
*  [Using VAPID with WebPush - Mozilla Cloud Services](https://blog.mozilla.org/services/2016/04/04/using-vapid-with-webpush/)
*  [Sending VAPID identified WebPush Notifications via Mozilla's Push Service - Mozilla Cloud Services](https://blog.mozilla.org/services/2016/08/23/sending-vapid-identified-webpush-notifications-via-mozillas-push-service/)
*  [Easy VAPID generation](https://github.com/web-push-libs/vapid)
*  [VAPID verification](https://web-push-libs.github.io/vapid/js/)

#### Encryption

*  [Web Push Payload Encryption](/web/updates/2016/03/web-push-encryption)
*  [Push Encryption Verifier](https://tests.peter.sh/push-encryption-verifier/)
*  [Message Encryption for Web Push](https://tools.ietf.org/html/draft-ietf-webpush-encryption-01)

#### JWT Signing

*  [Libraries for Token Signing/Verification](https://jwt.io/#libraries-io)

#### Firebase Cloud Messaging

*  [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/)
*  [Set Up a JavaScript Firebase Cloud Messaging Client App](https://firebase.google.com/docs/cloud-messaging/chrome/client)


