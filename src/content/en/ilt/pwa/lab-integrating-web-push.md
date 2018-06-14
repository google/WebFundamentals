project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2018-02-15 #}
{# wf_published_on: 2016-01-01 #}


# Lab: Integrating Web Push {: .page-title }




Concepts:  [Introduction to Push Notifications](introduction-to-push-notifications)

<div id="overview"></div>


## Overview




This lab shows you the basics of sending, receiving, and displaying push notifications. Notifications are messages that display on a user's device, outside of the context of the browser or app. Push notifications are notifications created in response to a message from a server, and work even when the user is not actively using your application. The notification system is built on top of the  [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), which receives push messages in the background and relays them to your application.

#### What you will learn

* How to create and display a notification in a web application, with and without user-required actions
* How to use the  [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) to receive notifications
* How to design push notifications into your app following best practices

#### What you should know

* Have completed the [Service Worker](lab-scripting-the-service-worker) course or have equivalent experience with Service Worker
* Have completed the [Promises](lab-promises) lab or have equivalent experience
* Intermediate experience using the command line interface
* Intermediate-to-advanced experience with JavaScript

#### What you will need

* Computer with terminal/shell access
* Connection to the Internet
* A Google or Gmail account
* A  [browser that supports web push](http://caniuse.com/#search=push)
*  [Node](https://nodejs.org/en/) and  [npm](https://www.npmjs.com/)

<div id="setup"></div>


## 1. Get set up




If you have not downloaded the repository, installed Node, and started a local server, follow the instructions in [Setting up the labs](setting-up-the-labs).

In the command window, change to the __app__ directory in the __push-notification-lab__ and run the following:

    npm install

This reads the dependencies in __package.json__ and installs the web-push module for Node.js, which we will use in the second half of the lab to push a message to our app.

Open your browser and navigate __localhost:8080/push-notification-lab/app/__.



Note: <a href="tools-for-pwa-developers#unregister">Unregister</a> any service workers and <a href="tools-for-pwa-developers#clearcache">clear all service worker caches</a> for localhost so that they do not interfere with the lab.



Open the __push-notification-lab/app__ folder in your preferred text editor. The __app__ folder is where you will be building the lab.

This folder contains:

* __images__ folder contains sample images
* __js/main.js__ is the main JavaScript for the app, and where you will write the app's script
* __node/main.js__ is the Node.js server
* __samples__ folder contains sample landing pages
* __index.html__ is the main HTML page for our sample site/application
* __manifest.json__ is the Firebase manifest file
* __package.json__ is the Node.js manifest file
* __sw.js__ is the service worker file where we will write the script to handle notifications

<div id="notificationapi"></div>


## 2. Using the Notifications API




Push notifications are assembled using two APIs: the  [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) and the  [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API). The Notifications API lets us display system notifications to the user.

### 2.1 Check for support

Because notifications are not yet fully supported by all browsers, we must check for support.

Replace TODO 2.1 in __js/main.js __with the following code:

#### js/main.js

```
if (!('Notification' in window)) {
  console.log('This browser does not support notifications!');
  return;
}
```

<aside markdown="1" class="key-point">
<p>Note: In a practical application we would perform some logic to compensate for lack of support, but for our purposes we can log an error and return.</p>
</aside>


### 2.2 Request permission

Before we can show notifications, we must get permission from the user.

Replace TODO 2.2 in __js/main.js__ with the following code:

#### js/main.js

```
Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
});
```

Let's test this function in the browser. Save the code and refresh the page in the browser. A message box should appear at the top of the browser window prompting you to allow notifications.

If the prompt does not appear, you can [set the permissions](tools-for-pwa-developers#permissions) manually by clicking the __Information__ icon in the URL bar. As an experiment, try rejecting permission and then check the console. Now reload the page and this time allow notifications. You should see a permission status of "granted" in the console.

#### Explanation

This opens a popup when the user first lands on the page prompting them to allow or block notifications. Once the user accepts, you can display a notification. This permission status is stored in the browser, so calling this again returns the user's last choice.

### 2.3 Display the notification

Replace TODO 2.3 in __js/main.js__ in the `displayNotification()` function with the following code:

#### js/main.js

```
if (Notification.permission == 'granted') {
  navigator.serviceWorker.getRegistration().then(function(reg) {

    // TODO 2.4 - Add 'options' object to configure the notification

    reg.showNotification('Hello world!');
  });
}
```

Save the file and reload the page in the browser. Click __allow__ on the permission pop-up if needed. Now if you click __Notify me!__ you should see a notification appear!

#### For more information

*  [`showNotification` method - MDN](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)

### 2.4 Add notification options

The notification can do much more than just display a title.

Replace TODO 2.4 in __js/main.js__ with an options object:

#### main.js

```
var options = {
  body: 'First notification!',
  icon: 'images/notification-flat.png',
  vibrate: [100, 50, 100],
  data: {
    dateOfArrival: Date.now(),
    primaryKey: 1
  },

  // TODO 2.5 - add actions to the notification

  // TODO 5.1 - add a tag to the notification

};
```

Be sure to add the options object to the second parameter of `showNotification`:

#### main.js

```
reg.showNotification('Hello world!', options);
```

Save the code and reload the page in the browser. Click __Notify me!__ In the browser to see the new additions to the notification.

#### Explanation

`showNotification` has an optional second parameter that takes an object containing various configuration options. See the  [reference on MDN](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification) for more information on each option.

Attaching data to the notification when you create it lets your app get that data back at some point in the future. Because notifications are created and live asynchronously to the browser, you will frequently want to inspect the notification object after the user interacts with it so you can work out what to do. In practice, we can use a "key" (unique) property in the data to determine which notification was called.

### 2.5 Add notification actions

To create a notification with a set of custom actions, we can add an actions array inside our notification options object.

Replace TODO 2.5 in the options object in __js/main.js__ with the following code:

#### js/main.js

```
actions: [
  {action: 'explore', title: 'Go to the site',
    icon: 'images/checkmark.png'},
  {action: 'close', title: 'Close the notification',
    icon: 'images/xmark.png'},
]
```

Save the code and reload the page in the browser. Click __Notify me!__ on the page to display a notification. If you're using Chrome, the notification now has two new buttons to click. These don't do anything yet. In the next sections we'll write the code to handle notification events and actions.

#### Explanation

The actions array contains a set of action objects that define the buttons that we want to show to the user. Actions get an ID when they are defined so that we can tell them apart in the service worker. We can also specify the display text, and add an optional image.

### 2.6 Handle the notificationclose event

When the user closes a notification, a `notificationclose` event is triggered in the service worker.

Replace TODO 2.6 in __sw.js__ with an event listener for the `notificationclose` event:

#### sw.js

```
self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});
```

Save the code and [update the service worker](tools-for-pwa-developers#update) in the browser. Now, in the page, click __Notify me!__ and then close the notification. [Check the console](tools-for-pwa-developers#console) to see the log message appear when the notification closes.

#### Explanation

This code gets the notification object from the event and then gets the data from it. This data can be anything we like. In this case, we get the value of the `primaryKey` property.

<aside markdown="1" class="key-point">
<p><strong>Tip:</strong>  The <code>notificationclose</code> event is a great place to add Google analytics to see how often users are closing our notifications. You can learn more about this in the <a href="lab-integrating-analytics">Google Analytics codelab</a>.</p>
</aside>


### 2.7 Handle the notificationclick event

When the user clicks on a notification or notification action, a `notificationclick` event is triggered in the service worker.

Replace the TODO 2.7 in __sw.js__ with the following code:

#### sw.js

```
self.addEventListener('notificationclick', function(e) {

  // TODO 2.8 - change the code to open a custom page

  clients.openWindow('http://google.com');
});
```

Save the code and reload the page. [Update the service worker](tools-for-pwa-developers#update) in the browser. Click __Notify me!__ to create a new notification and click it. You should land on the Google homepage.

### 2.8 Optional: Open a custom page from the notification

To complete TODO 2.8 inside the `notificationclick` event, write the code to complete the following tasks. The first two steps will be the same as the first two lines of code in the `notificationclose` event handler.

1. Get the notification from the event object and assign it to a variable called "notification".
2. Then get the `primaryKey` from the data in the notification and assign it to a `primaryKey` variable.
3. Replace the URL in `clients.openWindow` with `'samples/page' + primaryKey + '.html'`.
4. Finally, at the bottom of the listener, add a line to close the notification. Refer to the Methods section in the  [Notification article on MDN](https://developer.mozilla.org/en-US/docs/Web/API/notification) to see how to programmatically close the notification.

Save the code and [update the service worker](tools-for-pwa-developers#update) in the browser. Click __Notify me!__ to create a new notification and then click the notification. It should take you to __page1.html__ and the notification should close after it is clicked. Try changing the `primaryKey` in __main.js__ to 2 and test it again. This should take you to __page2.html__ when you click the notification.

### 2.9 Handle actions

Let's add some code to the service worker to handle the actions.

Replace the entire `notificationclick` event listener in __sw.js__ with the following code:

#### sw.js

```
self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('samples/page' + primaryKey + '.html');
    notification.close();
  }

  // TODO 5.3 - close all notifications when one is clicked

});
```

Save the code and [update the service worker](tools-for-pwa-developers#update) in the browser. Click __Notify me!__ to create a new notification. Try clicking the actions.

<aside markdown="1" class="key-point">
<p>Note: Notice we check for the "close" action first and handle the "explore" action in an <code>else</code> block. This is a best practice as not every platform supports action buttons, and not every platform displays all your actions. Handling actions in this way provides a default experience that works everywhere.</p>
</aside>


#### Solution code

The solution code can be found in the __02-9-handle-events__ directory.

<div id="pushapi"></div>


## 3. Using the Push API




The Push API is an interface that lets your app subscribe to a push service and enables the service worker to receive push messages.

#### For more information

*  [Push API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
*  [Using the Push API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Push_API/Using_the_Push_API)

### 3.1 Handle the push event

If a browser that supports push messages receives one, it registers a `push` event in the service worker.

Inside __sw.js__ replace TODO 3.1 with the code to handle push events:

#### sw.js

```
self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/notification-flat.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '-push-notification'
    },
    actions: [
      {action: 'explore', title: 'Go to the site',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close the notification',
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});
```

Save the code and [update the service worker](tools-for-pwa-developers#update). Try [sending a push message](tools-for-pwa-developers#push) from the browser to your service worker. A notification should appear on your screen.

<aside markdown="1" class="key-point">
<p>Note: Push notifications are currently only supported in Chrome and Firefox. See the entry for "push" on  <a href="http://caniuse.com/#search=push">caniuse.com</a> for the latest browser support status.</p>
</aside>


#### Explanation

This event handler displays a notification similar to the ones we've seen before. The important thing to note is that the notification creation is wrapped in an `e.waitUntil` function. This extends the lifetime of the push event until the `showNotification` Promise resolves.

#### For more information

*  [Push Event - MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent)

### 3.2 Create a project on Firebase

To subscribe to the push service in Chrome, we need to create a project on Firebase.

<aside markdown="1" class="key-point">
<p>If you are using Firefox, you can skip this step and continue to step 3.3.</p>
</aside>


<aside markdown="1" class="key-point">
<p>Note: Recent changes to Firebase Cloud Messaging let developers avoid creating a Firebase account if the VAPID protocol is used. See the  <a href="#vapid">section on VAPID</a> for more information.</p>
</aside>


1. In the  [Firebase console](https://console.firebase.google.com/), select __Create New Project__.
2. Supply a project name and click __Create Project__.
3. Click the __Settings__ icon (next to your project name in the Navigation panel), and select __Project Settings__.
4. Open the __Cloud Messaging__ tab. You can find your __Server key__ and __Sender ID__ in this page. Save these values.

Replace `YOUR_SENDER_ID`  in the code below with the Sender ID of your project on Firebase and paste it into __manifest.json__ (replace any code already there):

#### manifest.json

```
{
  "name": "Push Notifications codelab",
  "gcm_sender_id": "YOUR_SENDER_ID"
}
```

#### Explanation

Chrome uses Firebase Cloud Messaging (FCM) to route its push messages. All push messages are sent to FCM, and then FCM passes them to the correct client.

<aside markdown="1" class="key-point">
<p>Note: FCM has replaced Google Cloud Messaging (GCM). Some of the code to push messages to Chrome still contains references to GCM. These references are correct and work for both GCM and FCM.</p>
</aside>


### 3.3 Get the subscription object

Whenever the user opens the app, check for the subscription object and update the server and UI.

Replace TODO 3.3a in the service worker registration code at the bottom of __js/main.js__ with the following function call:

#### js/main.js

```
initializeUI();
```

Replace TODO 3.3b in the `initializeUI()` function in __js/main.js__ with the following code:

#### js/main.js

```
pushButton.addEventListener('click', function() {
  pushButton.disabled = true;
  if (isSubscribed) {
    unsubscribeUser();
  } else {
    subscribeUser();
  }
});

swRegistration.pushManager.getSubscription()
.then(function(subscription) {
  isSubscribed = (subscription !== null);

  updateSubscriptionOnServer(subscription);

  if (isSubscribed) {
    console.log('User IS subscribed.');
  } else {
    console.log('User is NOT subscribed.');
  }

  updateBtn();
});
```

Save the code.

#### Explanation

Here we add a click event listener to the __Enable Push Messaging__ button in the page. The button calls `unsubscribeUser()` if the user is already subscribed, and `subscribeUser()` if they are not yet subscribed.

We then get the latest subscription object from the `pushManager`. In a production app, this is where we would update the subscription object for this user on the server. For the purposes of this lab, `updateSubscriptionOnServer()` simply posts the subscription object to the page so we can use it later. `updateBtn()` updates the text content of the __Enable Push Messaging__ button to reflect the current subscription status. You'll need to use these functions later, so make sure you understand them before continuing.

### 3.4 Subscribe to the push service

Before sending any data via a push message, you must first subscribe to the browser's push service.

Replace TODO 3.4 in __js/main.js__ with the following code:

#### js/main.js

```
swRegistration.pushManager.subscribe({
  userVisibleOnly: true
})
.then(function(subscription) {
  console.log('User is subscribed:', subscription);

  updateSubscriptionOnServer(subscription);

  isSubscribed = true;

  updateBtn();
})
.catch(function(err) {
  if (Notification.permission === 'denied') {
    console.warn('Permission for notifications was denied');
  } else {
    console.error('Failed to subscribe the user: ', err);
  }
  updateBtn();
});
```

Save the code and refresh the page. Click __Enable Push Messaging__. The subscription object should display on the page. The subscription object contains the endpoint URL, which is where we send the push messages for that user, and the keys needed to encrypt the message payload. We use these in the next sections to send a push message.

#### Explanation

Here we subscribe to the `pushManager`.  In production, we would then update the subscription object on the server.

The `.catch` handles the case in which the user has denied permission for notifications. We might then update our app with some logic to send messages to the user in some other way.

<aside markdown="1" class="key-point">
<p>Note: We are setting the <code>userVisibleOnly</code> option to <code>true</code> in the subscribe method. By setting this to <code>true</code>, we ensure that every incoming message has a matching notification. The default setting is <code>false</code>. Setting this option to <code>true</code> is required in Chrome.</p>
</aside>


#### For more information

*  [PushSubscription - MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
*  [Subscribe method - MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe)
*  [Notification permission status - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Notification/permission)

### 3.5 Unsubscribe from the push service

Replace TODO 3.5 in __js/main.js__ with the following code:

#### js/main.js

```
swRegistration.pushManager.getSubscription()
.then(function(subscription) {
  if (subscription) {
    return subscription.unsubscribe();
  }
})
.catch(function(error) {
  console.log('Error unsubscribing', error);
})
.then(function() {
  updateSubscriptionOnServer(null);

  console.log('User is unsubscribed');
  isSubscribed = false;

  updateBtn();
});
```

Save the code and refresh the page in the browser. Click __Disable Push Messaging__ in the page. The subscription object should disappear and the console should display `User is unsubscribed`.

#### Explanation

Here we unsubscribe from the push service and then "update the server" with a `null` subscription object. We then update the page UI to show that the user is no longer subscribed to push notifications.

#### For more information

*  [Unsubscribe method - MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription/unsubscribe)

### 3.6 Optional: Send your first web push message using cURL

Let's use cURL to test pushing a message to our app.

<aside markdown="1" class="key-point">
<p>Note: Windows machines do not come with cURL preinstalled. If you are using Windows, you can skip this step.</p>
</aside>


In the browser, click __Enable Push Messaging__ and copy the endpoint URL. Replace `ENDPOINT_URL` in the cURL command below with this endpoint URL.

If you are using Chrome, replace `SERVER_KEY` in the Authorization header with the server key you saved earlier.

<aside markdown="1" class="key-point">
<p>Note: The Firebase Cloud Messaging server key can be found in your project on  <a href="https://console.firebase.google.com/">Firebase</a> by clicking the Settings icon in the Navigation panel, clicking <strong>Project settings</strong> and then opening the <strong>Cloud messaging</strong> tab.</p>
</aside>


Paste the following cURL command (with your values substituted into the appropriate places) into a command window and execute:

```
curl "ENDPOINT_URL" --request POST --header "TTL: 60" --header "Content-Length: 0" --header "Authorization: key=SERVER_KEY"
```

Here is an example of what the cURL should look like:

```
curl "https://android.googleapis.com/gcm/send/fYFVeJQJ2CY:APA91bGrFGRmy-sY6NaF8atX11K0bKUUNXLVzkomGJFcP-lvne78UzYeE91IvWMxU2hBAUJkFlBVdYDkcwLG8vO8cYV0X3Wgvv6MbVodUfc0gls7HZcwJL4LFxjg0y0-ksEhKjpeFC5P" --request POST --header "TTL: 60" --header "Content-Length: 0" --header "Authorization: key=AAAANVIuLLA:APA91bFVym0UAy836uQh-__S8sFDX0_MN38aZaxGR2TsdbVgPeFxhZH0vXw_-E99y9UIczxPGHE1XC1CHXen5KPJlEASJ5bAnTUNMOzvrxsGuZFAX1_ZB-ejqBwaIo24RUU5QQkLQb9IBUFwLKCvaUH9tzOl9mPhFw"
```

You can send a message to Firefox's push service by opening the app in Firefox, getting the endpoint URL, and executing the same cURL without the `Authorization` header.

<aside markdown="1" class="key-point">
<p>Note: Remember to <a href="tools-for-pwa-developers#firefoxunregister">unregister the previous service worker</a> at localhost if it exists.</p>
</aside>


```
curl "ENDPOINT_URL" --request POST --header "TTL: 60" --header "Content-Length: 0"
```

That's it! We have sent our very first push message. A notification should have popped up on your screen.

#### Explanation

We are using the Web Push protocol to send a push message to the endpoint URL, which contains the address for the browser's Push Service and the information needed for the push service to send the push message to the right client. For Firebase Cloud Messaging specifically, we must include the Firebase Cloud Messaging server key in a header (when not using VAPID). We do not need to encrypt a message that doesn't contain a payload.

#### For more information

*  [Push Demo](https://gauntface.github.io/simple-push-demo/)
*  [Getting Started with cURL](http://www.ethanmick.com/getting-started-with-curl/)
*  [cURL Documentation](https://curl.haxx.se/docs/manpage.html)

### 3.7 Get data from the push message

Chrome and Firefox support the ability to deliver data directly to your service worker using a push message.

Replace the `push` event listener in __sw.js__ with the following code to get the data from the message:

#### sw.js

```
self.addEventListener('push', function(e) {
  var body;

  if (e.data) {
    body = e.data.text();
  } else {
    body = 'Default body';
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
      {action: 'explore', title: 'Go to the site',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close the notification',
        icon: 'images/xmark.png'},
    ]
  };

  e.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
```

Save the code.

#### Explanation

In this example, we're getting the data payload as text and setting it as the body of the notification.

We've now created everything necessary to handle the notifications in the client, but we have not yet sent the data from our server. That comes next.

#### For more information

*  [Push Event data - MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent/data)

### 3.8 Push the message from a Node.js server

We can get all the information we need to send the push message to the right push service (and from there to the right client) from the subscription object.

There are a few things you must do for this step to work:

1. Paste the code below into __node/main.js__
2. Make sure you have saved the changes you made to the service worker in the last step and then [unregister the service worker](tools-for-pwa-developers#unregister) in the browser and refresh the page.
3. Then, click __Enable Push Messaging__ and copy the whole subscription object.
4. Replace `YOUR_SUBSCRIPTION_OBJECT` in the code you just pasted into __node/main.js__ with the subscription object.
5. If you are working in Chrome, replace `YOUR_SERVER_KEY` in the `options` object with your own Server Key from your project on Firebase. Do not overwrite the single quotes.

<aside markdown="1" class="key-point">
<p>Note: If you are working in Firefox, you can delete the <code>gcmAPIKey</code> option.</p>
</aside>


#### node/main.js

```
var webPush = require('web-push');

var pushSubscription = YOUR_SUBSCRIPTION_OBJECT;

// TODO 4.3a - include VAPID keys

var payload = 'Here is a payload!';

var options = {
  gcmAPIKey: 'YOUR_SERVER_KEY',
  TTL: 60,

  // TODO 4.3b - add VAPID details

};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);
```

Save the code. From the __push-notification-lab/app__ directory, run the command below:

    node node/main.js

A push notification should pop up on the screen. It may take a few seconds to appear.

#### Explanation

We are using the  [web-push Mozilla library](https://www.npmjs.com/package/web-push) for Node.js to simplify the syntax for sending a message to the push service. This library takes care of encrypting the message with the public encryption key. The code we added to __node/main.js__ sets the Server key. It then passes the subscription endpoint to the `sendNotification` method and passes the public keys and payload to the object in the second argument.

#### For more information

*  [web-push library documentation](https://www.npmjs.com/package/web-push)
*  [Other Web Push libraries](https://github.com/web-push-libs)

#### Solution code

The solution code can be found in the __03-8-payload__ directory.

<div id="vapid"></div>


## 4. Optional: Identifying your service with VAPID




Let's use the VAPID protocol to identify the app for the push service. This eliminates the need for a Firebase account.

### 4.1 Generate the keys

First, let's install the web-push library globally so we can use it from the command line.

Run the following command:

```
npm install web-push -g
```

Now generate the public and private keys by entering the following command into a command window at the __project__ directory:

    web-push generate-vapid-keys [--json]

This generates a public/private key pair. The output should look like this:

    =======================================

    Public Key:
    BAdXhdGDgXJeJadxabiFhmlTyF17HrCsfyIj3XEhg1j-RmT2wXU3lHiBqPSKSotvtfejZlAaPywJ9E-7AxXQBj4

    Private Key:
    VCgMIYe2BnuNA4iCfR94hA6pLPT3u3ES1n1xOTrmyLw

    =======================================

Copy your keys and save them somewhere safe. Use these keys for all future messages you send.

<aside markdown="1" class="key-point">
<p>Note: The keys are URL Safe Base64 encoded strings.</p>
</aside>


### 4.2 Subscribe with the public key

In order for VAPID to work we must pass the public key to the `subscribe` method as a `Uint8Array`. We have included a helper function to convert the public key to this format.

Replace TODO 4.2a in __js/main.js__, with the following code with your VAPID public key substituted in:

#### js/main.js

```
var applicationServerPublicKey = 'YOUR_VAPID_PUBLIC_KEY';
```

Replace the `subscribeUser()` function in __js/main.js __with the code below:

#### js/main.js

```
function subscribeUser() {
  var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);
    updateSubscriptionOnServer(subscription);
    isSubscribed = true;
    updateBtn();
  })
  .catch(function(err) {
    if (Notification.permission === 'denied') {
      console.warn('Permission for notifications was denied');
    } else {
      console.error('Failed to subscribe the user: ', err);
    }
    updateBtn();
  });
}
```

Save the code. In the browser, click __Disable Push Messaging__ or unregister the service worker. Then refresh the page and click __Enable Push Messaging__. If you are using Chrome, the endpoint URL domain should now be __fcm.googleapis.com__.

### 4.3 Sign and send the request

Copy the new subscription object and overwrite the old subscription object assigned to the `pushSubscription` variable in __node/main.js__.

Replace TODO 4.3a in __node/main.js__ with the following code, with your values for the public and private keys substituted in:

#### node/main.js

```
var vapidPublicKey = 'YOUR_VAPID_PUBLIC_KEY';
var vapidPrivateKey = 'YOUR_VAPID_PRIVATE_KEY';
```

Next, replace TODO 4.3b in the `options` object with the following code containing the required details for the request signing:

<aside markdown="1" class="key-point">
<p>Note: You'll need to replace <code>YOUR_EMAIL_ADDRESS</code> in the <code>subject</code> property with your actual email.</p>
</aside>


#### node/main.js

```
vapidDetails: {
  subject: 'mailto: YOUR_EMAIL_ADDRESS',
  publicKey: vapidPublicKey,
  privateKey: vapidPrivateKey
}
```

Comment out the `gcmAPIKey` in the options object (it's no longer necessary):

```
// gcmAPIKey: 'YOUR_SERVER_KEY',
```

Save the file. Enter the following command in a command window at the working directory (__push-notification-lab/app__):

    node node/main.js

A push notification should pop up on the screen. It may take a few seconds to appear.

<aside markdown="1" class="key-point">
<p>Note: The notification may not surface if you're in full screen mode.</p>
</aside>


#### Explanation

Both Chrome and Firefox support the  [The Voluntary Application Server Identification for Web Push (VAPID) protocol](https://tools.ietf.org/html/draft-thomson-webpush-vapid-02) for the identification of your service.

The web-push library makes using VAPID relatively simple, but the process is a bit more involved behind the scenes. For a full explanation of VAPID, see the  [Introduction to Web Push](introduction-to-push-notifications#vapid) and the links below.

#### For more information

*  [Web Push Interoperability Wins](/web/updates/2016/07/web-push-interop-wins)
*  [Using VAPID](https://blog.mozilla.org/services/2016/04/04/using-vapid-with-webpush/)

#### Solution code

The solution code can be found in the __04-3-vapid__ directory.

<div id="best"></div>


## 5. Optional: Best practices




### 5.1 Manage the number of notifications

To complete TODO 5.1 in __js/main.js__ in the `displayNotification` function, give the notification a `tag` attribute of `'id1'`.

Save the code and refresh the page in the browser. Click __Notify me!__ multiple times. The notifications should replace themselves instead of creating new notifications.

#### Explanation

Whenever you create a notification with a tag and there is already a notification with the same tag visible to the user, the system automatically replaces it without creating a new notification.

Your can use this to group messages that are contextually relevant into one notification. This is a good practice if your site creates many notifications that would otherwise become overwhelming to the user.

#### Solution code

The solution code can be found in the __solution__ directory.

### 5.2 When to show notifications

Depending on the use case, if the user is already using our application we may want to update the UI instead of sending them a notification.

In the `push` event handler in __sw.js__, replace the `event.waitUntil()` function below the TODO with the following code:

#### sw.js

```
e.waitUntil(
  clients.matchAll().then(function(c) {
    console.log(c);
    if (c.length === 0) {
      // Show notification
      self.registration.showNotification(title, options);
    } else {
      // Send a message to the page to update the UI
      console.log('Application is already open!');
    }
  })
);
```

Save the file and [update the service worker](tools-for-pwa-developers#update), then refresh the page in the browser. Click __Enable Push Messaging__. Copy the subscription object and replace the old subscription object in __node/main.js__ with it.

Execute the command to run the node server in the command window at the __app__ directory:

    node node/main.js

Send the message once with the app open, and once without. With the app open, the notification should not appear, and instead a message should display in the console. With the application closed, a notification should display normally.

#### Explanation

The `clients` global in the service worker lists all of the active clients of the service worker on this machine. If there are no clients active, we create a notification.

If there  *are*  active clients it means that the user has your site open in one or more windows. The best practice is usually to relay the message to each of those windows.

#### Solution code

The solution code can be found in the __solution__ directory.

### 5.3 Hide notifications on page focus

If there are several open notifications originating from our app, we can close them all when the user clicks on one.

In __sw.js__, in the `notificationclick` event handler, replace the TODO 5.3 with the following code:

#### sw.js

```
self.registration.getNotifications().then(function(notifications) {
  notifications.forEach(function(notification) {
    notification.close();
  });
});
```

Save the code.

Comment out the `tag` attribute in the `displayNotification` function in __main.js__ so that multiple notifications will display at once:

#### main.js

```
// tag: 'id1',
```

Save the code, open the app again, and update the service worker. Click __Notify me!__ a few times to display multiple notifications. If you click "Close the notification" on one notification they should all disappear.

<aside markdown="1" class="key-point">
<p>Note: If you don't want to clear out all of the notifications, you can filter based on the <code>tag</code> attribute by passing the tag into the <code>getNotifications</code> function. See the  <a href="https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/getNotifications">getNotifications reference on MDN</a> for more information.</p>
</aside>


<aside markdown="1" class="key-point">
<p>Note: You can also filter out the notifications directly inside the promise returned from <code>getNotifications</code>. For example there might be some custom data attached to the notification that you would use as your filter criteria.</p>
</aside>


#### Explanation

In most cases, you send the user to the same page that has easy access to the other data that is held in the notifications. We can clear out all of the notifications that we have created by iterating over the notifications returned from the `getNotifications` method on our service worker registration and then closing each notification.

#### Solution code

The solution code can be found in the __solution__ directory.

### 5.4 Notifications and tabs

We can re-use existing pages rather than opening a new tab when the notification is clicked.

Replace the code inside the `else` block in the `notificationclick` handler in __sw.js__ with the following code:

#### sw.js

```
e.waitUntil(
  clients.matchAll().then(function(clis) {
    var client = clis.find(function(c) {
      return c.visibilityState === 'visible';
    });
    if (client !== undefined) {
      client.navigate('samples/page' + primaryKey + '.html');
      client.focus();
    } else {
      // there are no visible windows. Open one.
      clients.openWindow('samples/page' + primaryKey + '.html');
      notification.close();
    }
  })
);
```

Save the code and update the service worker in the browser. Click __Notify me! __to create a new notification. Try clicking on a notification once with your app open and focused, and once with a different tab open.

<aside markdown="1" class="key-point">
<p>Note: The <code>clients.openWindow</code> method can only open a window when called as the result of a <code>notificationclick</code> event. Therefore, we need to wrap the method in a <code>waitUntil</code>, so that the event does not complete before <code>openWindow</code> is called. Otherwise, the browser throws an error.</p>
</aside>


#### Explanation

In this code we get all the clients of the service worker and assign the first "visible" client to the `client` variable. Then we open the page in this client. If there are no visible clients, we open the page in a new tab.

#### For more information

*  [openWindow() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clients/openWindow)

#### Solution code

The solution code can be found in the __solution__ directory.

<div id="congrats"></div>


## Congratulations!




In this lab we have learned how to create notifications and configure them so that they work well and look great on the user's device. Push notifications are an incredibly powerful mechanism to keep in contact with your users. Using push notifications, it has never been easier to build meaningful relationships with your customer. By following the concepts in this lab you will be able to build a great experience that your users will keep coming back to.

### What we've covered

* How to create notifications and configure them.
* How to build notifications that the user can interact with through either a single tap, or by clicking on one of a number of different actions.
* How to send messages to the user's device whether or not they have the browser open through the Open Web Push protocol, and how to implement this across all the browsers that support this API.

<div id="resources"></div>

### Resources

#### Introduction to push notifications

*  [Enable Push Notifications for your Web App](/web/fundamentals/getting-started/push-notifications/)
*  [Web Push Notifications: Timely, Relevant, and Precise](/web/fundamentals/engage-and-retain/push-notifications/)

#### Demos

*  [Simple Push Demo](https://gauntface.github.io/simple-push-demo/)
*  [Notification Generator](https://tests.peter.sh/notification-generator/#actions=8)

#### Learn about Web Push libraries

*  [Web Push Libraries](https://github.com/web-push-libs)

#### Learn about encryption

*  [Web Push Payload Encryption](/web/updates/2016/03/web-push-encryption)
*  [Web Push: Data Encryption Test Page](https://jrconlin.github.io/WebPushDataTestPage/)

#### Learn about Firebase Cloud Messaging

*  [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/)
*  [Set Up a JavaScript Firebase Cloud Messaging Client App](https://firebase.google.com/docs/cloud-messaging/chrome/client)


