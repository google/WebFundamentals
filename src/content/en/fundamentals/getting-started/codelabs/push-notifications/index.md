project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: In this codelab, you will learn how to enable push messaging and notifications for web apps and sites.

{# wf_updated_on: 2016-09-28T18:24:28Z #}


# Enable Push Notifications for your Web App {: page-title }

{% include "web/_shared/contributors/samdutton.html" %}



## Overview



![68c4c0bef9c548cd.png](img/68c4c0bef9c548cd.png)

In this codelab, you'll learn how to add Push Notifications to web applications.

This will enable you to re-engage users with breaking news and information about new content. 

You'll also learn the basics of Service Workers.

### What you'll learn

* Service Worker basics: installation and event handling
* How to set up a Firebase Cloud Messaging (FCM) account
* How to add a web manifest
* Techniques for requesting FCM to send a notification to a web client
* Notification display
* Notification click handling

### What you'll need

* Chrome 42 or above
* A basic understanding of  [git](http://git-scm.com/), and  [Chrome DevTools](https://developer.chrome.com/devtools)
* Experience of  [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/) and  [Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) would also be useful, but is not crucial 
* The sample code
* A text editor
* A terminal window to run command line tools
* Python or a local web server stack (see below)


## Get the sample code



You can either download all the sample code to your computer: 

[](https://github.com/GoogleChrome/push-notifications/archive/master.zip)

...or clone the GitHub repository from the command line:

    $ git clone https://github.com/GoogleChrome/push-notifications.git

This will create a __push-notifications__ directory containing:

* A __completed __directory containing completed code for each step.
* An __app__ directory where you will do your work.


## Get started



### Install and verify web server

While you're free to use your own web server, this codelab is designed to work well with the Chrome Web Server. If you don't have that app installed yet, you can install it from the Chrome Web Store.

[](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

![7f4505211b238ae9.png](img/7f4505211b238ae9.png)

After installing the __Web Server for Chrome__ app, click on the Chrome Apps shortcut from the bookmarks bar, a New Tab page, or from the App Launcher: 

![bab91398f0bf59f5.png](img/bab91398f0bf59f5.png)

Click on the Web Server icon: 

![60da10ee57cbb190.png](img/60da10ee57cbb190.png)

Next, you'll see this dialog, which allows you to configure your local web server:

![433870360ad308d4.png](img/433870360ad308d4.png)

Click the __CHOOSE FOLDER__ button, and select the __app__ folder you just downloaded. This will enable you to view your work in progress in Chrome via the URL highlighted in the Web Server dialog in the __Web Server URL(s)__ section.

Under __Options__, check the box next to __Automatically show index.html__ as shown below:

![8937a38abc57e3.png](img/8937a38abc57e3.png)

Then stop and restart the server by sliding the toggle labeled __Web Server: STARTED__ to the left and then back to the right.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

Now visit your app site in your web browser by clicking on the highlighted Web Server URL. You should see a page that looks like this, which corresponds to __app/index.html__:

![eb3d06482c41fd25.png](img/eb3d06482c41fd25.png)


## Get started with Service Worker



### Add a Service Worker

In your __app__ directory, notice that you have an empty file named __sw.js.__ You'll add code to this later. 

### Register and install a Service Worker

In this step you add code to the __js/main.js__ JavaScript file linked to in __app/index.html__. This in turn gives access to the Service Worker script. 

Add the following code to __js/main.js__:

    if ('serviceWorker' in navigator) {
      console.log('Service Worker is supported');
      navigator.serviceWorker.register('sw.js').then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(reg) {
        console.log('Service Worker is ready :^)', reg);
          // TODO
      }).catch(function(error) {
        console.log('Service Worker error :^(', error);
      });
    }

This code checks if Service Worker is supported by your browser, then registers and installs the Service Worker defined in __sw.js. __— which is currently empty!

### Try it out

Check your changes by opening the URL __127.0.0.1:8887__ in the browser.  

Open Chrome DevTools to check the console. The page should look like this:

![d180bb63d3057b35.png](img/d180bb63d3057b35.png)

### Try out serviceworker-internals

The diagnostic page __chrome://serviceworker-internals__ is a good place to check that your Service Workers are working:

![fb7c89320959f9fd.png](img/fb7c89320959f9fd.png) 

5. Add event listeners to your Service Worker

Add the following code to __sw.js__:

    console.log('Started', self);
    
    self.addEventListener('install', function(event) {
      self.skipWaiting();
      console.log('Installed', event);
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Activated', event);
    });
    
    self.addEventListener('push', function(event) {
      console.log('Push message received', event);
      // TODO
    });



In a Service Worker, `self`__ __refers to the `ServiceWorkerGlobalScope` object: the Service Worker itself.


Click the __Inspect__ button on the chrome://serviceworker-internals page. You should see the following:

![3c32ddccce1cc6cd.png](img/3c32ddccce1cc6cd.png)


## Make a project on the Google Developer Console



Push notifications from a web app need a backend service to handle messaging. Chrome currently uses  [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) (FCM, formerly known as Google Cloud Messaging)  for this. Other browsers are free to use other services.

For this step, you need to set up a project on the Firebase Developer Console. 

1. Create a project

From the  [Firebase Developers Console](https://firebase.google.com/console/) create a new project:

![a4eac9ab79130343.png](img/a4eac9ab79130343.png)
2. Once you've created your new project you need to go to the __Project Settings __page.

![fe4510ccb62ff70.png](img/fe4510ccb62ff70.png)
3. From the settings page, you need to click the __Cloud Messaging__ tab to view your FCM details, you'll need the Sender ID and Server Key later in this code lab.

![3d271ced94f821ea.png](img/3d271ced94f821ea.png)


Congratulations!

You've now created a Firebase Cloud Messaging project. 


## Add a manifest




A manifest is a JSON file that provides information about your web app, including Push Notifications configuration.

1. Create a manifest file

At the top level of your __app __directory, create a file named __manifest.json __(you can give it any name you like). 

Include the following code.The `gcm_sender_id`__ __value should be the Sender ID you for the project you created in the previous step:

    {
      "name": "Push Notifications codelab",
      "gcm_sender_id": "447755010661"
    }

2. Tell the browser where to find the manifest for your web app 

Add the following to the head element in the __index.html __file you created previously:

    <link rel="manifest" href="manifest.json">


## Subscribe to Push Notifications



1. Replace the TODO comment in __main.js__ so that it looks like this:

    if ('serviceWorker' in navigator) {
      console.log('Service Worker is supported');
      navigator.serviceWorker.register('sw.js').then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(reg) {
        console.log('Service Worker is ready :^)', reg);
        reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
          console.log('endpoint:', sub.endpoint);
        });
      }).catch(function(error) {
        console.log('Service Worker error :^(', error);
      });
    }


This code uses the `ServiceWorkerRegistration` object's `pushManager` to subscribe to  messages for the `gcm_sender_id` you added to the manifest previously.

You must pass a `{userVisibleOnly: true}` argument to the `subscribe()` method. This tells the browser that a notification will always be shown when a push message is received. Currently it's mandatory to show a notification.

2. Try it out from localhost

Open __index.html__ from localhost and open Chrome DevTools to check the console. 

You should see something like this:

![40001a5567ff0f8f.png](img/40001a5567ff0f8f.png)

If you want to reset push notification permissions preferences at any time, click the page icon to the left of the URL.  You should get a dialog that looks something like this: 

![78ff6c799af1a2cf.png](img/78ff6c799af1a2cf.png)

5. From Chrome DevTools, right-click the `endpoint` value and select Copy Link Address to copy the value, which should look like this: 

__https://android.googleapis.com/gcm/send/____ *APA91bGdUldXgd4Eu9MD0qNmGd0K6fu0UvhhNGL9FipYzisrRWbc-qsXpKbxocgSXm7lQuaEOwsJcEWWadNYTyqN8OTMrvNA94shns_BfgFH14wmYw67KZGHsAg74sm1_H7MF2qoyRCwr6AsbTf5n7Cgp7ZqsBZwl8IXGovAuknubr5gaJWBnDc

* __Make a note of the subscription ID, which is the last part of the URL, highlighted here in bold.

You'll use that value in a later step to tell Firebase Cloud Messaging where to send messages. 

![8472902e4c6b5faa.png](img/8472902e4c6b5faa.png)


## Send a request from the command line for FCM to push a message



As you saw previously, Chrome uses Firebase Cloud Messaging (FCM, formerly known as GCM) for push messaging.

To get FCM to push a notification to your web client, you need to send FCM a request that includes the following:

* The __Server key__ for the Firebase project you created, which looks like this:

__AIzaSyAc2e8MeZHA5NfhPANea01wnyeQD7uVY0c

__FCM will match this with the Sender ID you got from the Firebase Developer Console, which matches the `gcm_sender_id` value in the manifest.
* An appropriate __Content-Type header__, such as `application/json`.
* An array of __subscription IDs__, each of which corresponds to an individual client app. That's the last part of the subscription endpoint URL, and looks like this: 

__APA91bHMaA-R0eZrPisZCGfwwd7z1EzL7P7Q7cyocVkxBU3nXWed1cQYCYvFglMHIJ40kn-jZENQ62UFgg5QnEcqwB5dFZ-AmNZjATO8QObGp0p1S6Rq2tcCuUibjnyaS0UF1gIM1mPeM25MdZdNVLG3dM6ZSfxV8itpihroEN5ANj9A26RU2Uw__

For a production site or app, you would normally set up a service to interact with FCM from your server. (There is some sample code for doing just that in  [Push Notifications on the Open Web](/web/updates/2015/03/push-notificatons-on-the-open-web).) For this codelab, you can send requests from your terminal or from an app running in the browser.

You can send a request to FCM using the cURL utility.

The cURL command to send a request to FCM to issue a push message looks like this:

`curl --header "Authorization: key=`__`<PUBLIC_API_KEY>`__`" 
--header "Content-Type: application/json"
https://android.googleapis.com/gcm/send -d
"{\"registration_ids\":[\"`__`<SUBSCRIPTION_ID>`__`\"]}"`

Let's see that in action...

1. From your terminal, run the cURL command below — but __make sure to use your own API key and the subscription you created__: 

    curl --header "Authorization: key=AIzaSyAc2e8MeZHA5NfhPANea01wnyeQD7uVY0c" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"APA91bE9DAy6_p9bZ9I58rixOv-ya6PsNMi9Nh5VfV4lpXGw1wS6kxrkQbowwBu17ryjGO0ExDlp-S-mCiwKc5HmVNbyVfylhgwITXBYsmSszpK0LpCxr9Cc3RgxqZD7614SqDokwsc3vIEXkaT8OPIM-mnGMRYG1-hsarEU4coJWNjdFP16gWs\"]}"

2. If it all worked out, you will see a response like this in your terminal: ![6af8d97d9cdd5b20.png](img/6af8d97d9cdd5b20.png)If there are authorisation errors, check the Authorization key value. If the response shows an invalid registration error, check the subscription ID you used.
3. Take a look at chrome://serviceworker-internals. You should see something like this:

![e7da861dbe28ff02.png](img/e7da861dbe28ff02.png)

(If you want, you can try opening your app in Chrome Canary as well as Chrome and requesting a notification for two different endpoints. Make sure to put escaped quotes around each subscription ID.)

4. Try closing or moving focus away from the browser tab that's running your app. You should see a notification like this:

![b573392d75d7bd77.png](img/b573392d75d7bd77.png)


## Send a request using XHR (Ajax)



Another way to make a request to FCM to send a notification is via XHR.


## Show a notification



In this step you will add code to your Service Worker's push handler to show a notification.

1. Add __showNotification()__ code

Update __sw.js __to look like this, replacing the __TODO__ comment from the previous step:

    console.log('Started', self);
    
    self.addEventListener('install', function(event) {
      self.skipWaiting();
      console.log('Installed', event);
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Activated', event);
    });
    
    self.addEventListener('push', function(event) {
      console.log('Push message', event);
    
      var title = 'Push message';
    
      event.waitUntil(
        self.registration.showNotification(title, {
         body: 'The Message',
         icon: 'images/icon.png',
         tag: 'my-tag'
       }));
    });
    
    // TODO


The `event.waitUntil()` method takes a promise and extends the lifetime of the event handler until, in this case, the promise returned by `showNotification()` is resolved.

One notification will be shown for each `tag` value; if a new push message is received, the old notification will be replaced. To show multiple notifications, use a different `tag` value for each `showNotification()` call, or no `tag` at all.

2. Make a request to FCM to send a notification

Run the cURL command or the XHR request you created previously.

You should see a notification like this:

![9c6a8b6b4164824b.png](img/9c6a8b6b4164824b.png)


## Handle notification clicks



In this step you will add code to enable an action (such as navigating to a web page) when a user clicks a notification.

1. Listen for a notification click

Add the following code to __sw.js__, replacing the __TODO__ comment from the previous step:

    self.addEventListener('notificationclick', function(event) {
      console.log('Notification click: tag', event.notification.tag);
      // Android doesn't close the notification when you click it
      // See http://crbug.com/463146
      event.notification.close();
      var url = 'https://youtu.be/gYMkEMCHtJ4';
      // Check if there's already a tab open with this URL.
      // If yes: focus on the tab.
      // If no: open a tab with the URL.
      event.waitUntil(
        clients.matchAll({
          type: 'window'
        })
        .then(function(windowClients) {
          console.log('WindowClients', windowClients);
          for (var i = 0; i < windowClients.length; i++) {
            var client = windowClients[i];
            console.log('WindowClient', client);
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


This code listens for a notification click, then opens a web page — in this example, a YouTube video.

This code checks all window clients for this Service Worker; if the requested URL is already open in a tab, focus on it — otherwise open a new tab for it. 


## Unsubscribe from notifications



ENOUGH WITH THE MESSAGES ALREADY! How can you enable your users to unsubscribe — and resubscribe?

Simple: a client unsubscribes from notifications by calling the `unsubscribe()` method of the `PushSubscription` object. 

In a production implementation you will also need to to remove subscription data for an unsubscribed client from your server, to avoid sending notifications that won't be received.

1. Add a Subscribe/Unsubscribe button to your app

In the __index.html__ file you created at the start of the codelab, add a button so the code looks like this:

    <!DOCTYPE html>
    <html>
    <head>
    
      <title>Push Notification codelab</title>
    
      <link rel="manifest" href="manifest.json">
    
    </head>
    
    <body>
    
      <h1>Push Notification codelab</h1>
    
      <p>This page must be accessed using HTTPS or via localhost.</p>
    
      <button disabled>Subscribe</button>
    
      <script src="js/main.js"></script>
    
    </body>
    </html>

2. Add subscribe/unsubscribe functionality to __main.js

__Adjust __main.js__ so the code looks like this:

    var reg;
    var sub;
    var isSubscribed = false;
    var subscribeButton = document.querySelector('button');
    
    if ('serviceWorker' in navigator) {
      console.log('Service Worker is supported');
      navigator.serviceWorker.register('sw.js').then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(serviceWorkerRegistration) {
        reg = serviceWorkerRegistration;
        subscribeButton.disabled = false;
        console.log('Service Worker is ready :^)', reg);
      }).catch(function(error) {
        console.log('Service Worker Error :^(', error);
      });
    }
    
    subscribeButton.addEventListener('click', function() {
      if (isSubscribed) {
        unsubscribe();
      } else {
        subscribe();
      }
    });
    
    function subscribe() {
      reg.pushManager.subscribe({userVisibleOnly: true}).
      then(function(pushSubscription){
        sub = pushSubscription;
        console.log('Subscribed! Endpoint:', sub.endpoint);
        subscribeButton.textContent = 'Unsubscribe';
        isSubscribed = true;
      });
    }
    
    function unsubscribe() {
      sub.unsubscribe().then(function(event) {
        subscribeButton.textContent = 'Subscribe';
        console.log('Unsubscribed!', event);
        isSubscribed = false;
      }).catch(function(error) {
        console.log('Error unsubscribing', error);
        subscribeButton.textContent = 'Subscribe';
      });
    }


In this code, you set the value of the `ServiceWorkerRegistration` object `reg` when the Service Worker installs, which is then used in the `subscribe()` function to subscribe to push messaging. 

The `subscribe()` function creates the `PushSubscription` object `sub` which can be used by the `unsubscribe()` function.

Remember, the client gets a new registration ID every time it re-subscribes, so you will need to adjust requests to FCM accordingly.


## Frequently Asked Questions




__My Service Worker didn't update! __

Are you sure? Check the source tab in chrome://serviceworker-internals. If it really didn't update, restart Chrome.

__I tried everything, but my Service Worker's still not updating__

Did you check and validate your code? If your Service Worker code can't be parsed, it won't install. 

__My request to FCM is failing__

Check the project on  [console.developers.google.com](https://console.developers.google.com/). Make sure that the `gcm_sender_id` matches the Project Number and the Authorization key value matches the API key. Make sure you're looking at the right project!

__The request to FCM is working, but no push event is fired__

Check the subscription ID from the console for __main.js__. Is the subscription ID in the array of IDs for your request correctly? Make sure you you have the messaging API enabled on  [console.developers.google.com](https://console.developers.google.com/).

__I'm getting strange errors__

Try using Chrome Canary — this often gives more informative error messages about Service Worker woes.

__I'm not seeing console logs for events in my Service Worker__

You'll only get `installed` and `activated` events the first time you use the Service Worker or when the code is changed. The `started` event will only be fired once for each Service Worker session.

__What about Firefox?__

[As of Firefox 42](https://groups.google.com/forum/#!topic/mozilla.dev.platform/BL6TrHN73dY), the Push API will be turned on by default. 


## What we've covered




* Install a Service Worker and handle events
* Set up a Firebase Cloud Messaging (FCM) account
* Add a web manifest
* Enable a Service Worker to handle push message events
* Send a request to FCM via cURL or XHR
* Display notifications
* Handle notification clicks


## Next Steps




* Service Worker codelab (if you haven't already done it!)


## Learn More




*  [Push Notifications on the Open Web](/web/updates/2015/03/push-notificatons-on-the-open-web)
*  [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/)
*  [Best Practices for Push Notifications Permission UX](https://docs.google.com/document/d/1WNPIS_2F0eyDm5SS2E6LZ_75tk6XtBSnR1xNjWJ_DPE/edit)
*  [Do's and Don'ts for Notifications](http://android-developers.blogspot.co.uk/2015/08/get-dos-and-donts-for-notifications.html)
*  [Notifications guidelines](https://www.google.com/design/spec/patterns/notifications.html)
*  [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)





## Found an issue, or have feedback? {: .hide-from-toc }
Help us make our code labs better by submitting an 
[issue](https://github.com/GoogleChrome/push-notifications/issues) today. And thanks!
