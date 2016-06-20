---  
layout: shared/narrow  
title: "Subscribing users"  
description: "Requesting permission for and subscribing users to notifications requires as 
light a touch as showing them notifications."  
published_on: 2016-06-20  
updated_on: 2016-06-20  
order: 20  
translation_priority: 0  
authors:  
  - josephmedley  
---

<p class="intro">
Requesting permission for and subscribing users to notifications requires as 
light a touch as showing them notifications.
</p>

## Avoid page-load permission requests {#avoid-load-perm-requests}

We discourage sites from requesting notification permissions during page load. 
Such requests may seem timely. Since you don't yet know anything about your 
users, it's difficult for them to be precise or relevant. 

## Check for existing subscriptions {#check-subscriptions}

Always check for an existing permission when the page loads. This lets you avoid 
re-prompting the user for a permission that's already been granted. If the 
permission has already been granted you'll be able to start sending customized 
notifications sooner than you would for new users. Finally, it lets you set the 
state of any controls that manage the subscription. (More about that later.)

The following code shows the basic pattern.

{% highlight javascript %}
navigator.serviceworker.ready.then( registration => {  
  if ('showNotification' in ServiceWorkerRegistration.prototype) {  
    registration.pushManager.getSubscription().then (subscription => {  
      if (!subscription) {  
        // Run flow for requesting permission.  
      }  
    });  
  }  
});
{% endhighlight %}

## Requesting permission {#requesting-permission}

Regardless of when you do it, requesting permission is a two-step process. 
First, ask whether your application can send notifications using a message that 
explains exactly why you want to send them notifications. 

<img src="images/news-prompt.png" width="296" height="525" />

If the user approves, we need to send a subscription request to the push 
manager. Do this by calling PushManager.subscribe(). In this example, we're 
passing it an object with userVisibleOnly set to true so that all push messages 
sent the client will be shown to the user as a notification.

{% highlight javascript %}
navigator.serviceworker.ready.then( registration => {  
  if ('showNotification' in ServiceWorkerRegistration.prototype) {  
    registration.pushManager.getSubscription().then (subscription => {  
      if (!subscription) {
**        registration.pushManager.subscribe({**  
**          userVisibleOnly:**** ****true,**  
**          applicationServerKey: window.base64UrlToUint8Array(**  
**            'bdbdbd\_totallyFakePublicKey\_a10nZ13'**  
**          )**  
**        }****)**  
**        .then( subscription => {**  
**          // Do something with the subscription.**  
**        ****}).catch( error => {**  
**          // Do something with the error.**
    **  });**
      }  
    });  
  }  
});
{% endhighlight %}

This is the result in Chrome.

<img src="images/news-permissions.png" width="296" height="526" />

## Trigger from a specific action {#trigger-fr-specific-action}

Ask for permission to send notifications in response to a specific,   
contextual user interaction. This allows you to tie your notifications   
to a user's goal and makes it clear to the user why you want to send   
notifications. 

For example, If an airline site wanted to notify users of flight delays,   
they would prominently display an opt-in checkbox and only ask for   
notification permissions after the user chooses to opt in.

<img src="images/airline-prompt.png" width="324" height="520" />

## Provide a place to manage notifications {#manage-notifications}

Make it easy for users to change and even disable notifications for your site. 
It prevents users from killing notifications at the browser or device level. 

Add a notification switch in a place with high visibility. Also, label it to 
show users what you want to send them, not how it's implemented. Users have no 
more idea what a 'push notification' is than you would know how to adjust the 
orbit of a Soyuz capsule.

Good:  
<img src="images/flight-delay.png" width="276" height="36" />

Bad:  
<img src="images/send-push.png" width="276" height="36" />

## Passing a subscription to the server {#passing-a-subscription}

After getting a user's permission to send notifications and setting the state of 
related controls, you need to send the subscription information to the push 
server. This involves creating an appropriate request object containing the 
subscription data, then passing it to the server.

### Preparing the subscription{#preparing-the-subscription}

When you create the request, use the POST verb and a Content-Type header of 
application/json. For the body you need to convert the subscription object to a 
string. We'll look at what's in this object in the next section, Sending 
Messages.

{% highlight javascript %}
navigator.serviceworker.ready.then( registration => {  
  if ('showNotification' in ServiceWorkerRegistration.prototype) {  
    registration.pushManager.getSubscription().then (subscription => {  
      if (!subscription) {  
**       ** registration.pushManager.subscribe({userVisibleOnly: true})  
          .then( subscription => {  
**            var fetchOptions = {  
              method: 'post',  
              headers: new Headers({  
                'Content-Type': 'application/json'  
              }),  
              body: JSON.stringify(subscription)  
            };**  
**            ****// Send subscription data to the server.**  
**         ** })**.**catch( error => {

	// Do something with the error.  
	     });

        }  
      }  
    });  
  }  
});
{% endhighlight %}

### Posting to the server {#post-to-server}

Use `fetch()` to send the subscription request to the server.

{% highlight javascript %}
navigator.serviceworker.ready.then( registration => {  
  if ('showNotification' in ServiceWorkerRegistration.prototype) {  
    registration.pushManager.getSubscription().then (subscription => {  
      if (!subscription) {  
**       ** registration.pushManager.subscribe({userVisibleOnly: true})  
          .then( subscription => {  
**            **var fetchOptions = {  
              method: 'post',  
              headers: new Headers({  
                'Content-Type': 'application/json'  
              }),  
              body: JSON.stringify(subscription)  
            }.catch( error => {

	   // Do something with the error.

            });  
            **fetch('/api/updatePushSubscription', fetchOptions)**  
**              .then( response => {**  
**                // Handle the response.**  
**            });**  
**         ** });  
        }  
      }  
    });  
  }  
});
{% endhighlight %}