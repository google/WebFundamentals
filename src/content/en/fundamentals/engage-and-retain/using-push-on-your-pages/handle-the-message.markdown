---
layout: shared/narrow
title: "Handle the Incoming Message"
description: "We're going to start our exploration of push by showing how to handle an incoming push message."
authors:
 - josephmedley
published_on: 2016-02-19
updated_on: 2016-04-01
order: 10
translation_priority: 1
notes:
  sameorigin: "A notification can only open URLs from the same origin as the notification. The simplest way to overcome this issue is to have a page on your domain that performs a redirect."
---

<p class="intro" markdown="1">   We're going to start our exploration of push by
showing how to handle an incoming push message. We do this by implementing a
push handler on a service worker. If you're unfamiliar with service workers, you
may want to [read about them before studying push](https://milkbone.googleplex.com/web/fundamentals/primers/service-worker).
</p>

{% include shared/toc.liquid %}

## Add the Handler Code {#handler-code}

The first step in implementing push is to add a push event handler to your
service worker script.

{% highlight javascript %}
self.addEventListener('push', function(event) {
  console.log('Push message received: ', event);
  event.waitUntil(
    // Process the push event.
  );
}
{% endhighlight %}

Notice how the `event` object is used. Just like `install` and `activate`,
`push` supports the `waitUntil()` method, giving you greater control over the
order of asynchronous actions.

## Message Content {#message-content}

[Chrome 50 and Firefox 44](http://caniuse.com/#feat=push-api), introduced the
Push spec's [`PushMessageData`](https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData)
interface. This interface supports four types of data including array buffers, 
blobs, text, and JSON. Processing JSON might look something like this:

{% highlight javascript %}
self.addEventListener('push', function(event) {
  if (event.data) {
    console.log(event.data.json());
  }
});
{% endhighlight %}

## Show the Message {#show-the-message}

Of course the console isn't where you want to put information for users. So we
need to show a notification. As stated elsewhere, push and notification are two
different things. A push handler doesn't need to show a notification and a
notification doesn't need to be triggered from a push handler. In practice, many
of your notifications will be triggered by a push message.

To show a notification, use a call to `showNotification()`. It takes two
parameters: a title and an options object. In practice this looks something like
this:

{% highlight javascript %}
self.addEventListener('push', function(event) {
  var msgData = event.data.json();
  var title = msgData.title || 'My App Name';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: event.data.body,
      icon: 'images/icon.png'
    })
  );
});
{% endhighlight %}

The `title` and `body` are likely specific to this push. The `icon` may vary
depending on the type of push but has likely already been retrieved from the
server either during
[the service worker's install step](/web/fundamentals/primers/service-worker/install) 
or in a [previous call to `fetch()`](/web/fundamentals/primers/service-worker/cache-and-return-requests). 
The `options` object [has other parameters](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)
, but that's another discussion.

## Test the Handler {#test-handler}

You can test your push handler without a single line of server code . Though
service workers are [supported in multiple browsers](https://jakearchibald.github.io/isserviceworkerready/)
we're going to do this in Chrome.

Load your client page in a Chrome tab. Open DevTools either through 'Inspect'
from the context menu or from the 'More Tools' menu. Switch to the Resources tab
and select Service Workers. You'll get something like the following, though you
may need to scroll to find the service worker for your app:

![Resources panel showing service worker controls.](images/serviceworker-panel.png)

Click the bell icon toward the top of the panel. If you've done everything
correctly, you should see something like the image below. If not, double check
your work.

![A test push message.](images/notification.png){:width="380px"}

## Fetch Some Content {#fetch-content}

At the time of this writing [only Chrome and Firefox support message payloads](caniuse.com/#feat=push-api).
For browsers that don't, we'll get around this using `fetch()`.  For the best
user experience we want to minimize the perceived wait for updates. To do that
get the data from the server before showing a message to the user. The following
example uses `waitUntil()` to halt other actions until the data is ready to be
displayed.

{% highlight javascript %}
self.addEventListener('push', function(event) {
  event.waitUntil(
    var msgData = {}
    // Did we get a payload from the server?
    If (data in event) {
      // Yes, we did.
      msgData = event.data.json();
    } else {
      // No, we didn't. Go get it.
      fetch('notification/end/point/data.json')
        .then(function(response) {
          response.json().then(function(data){
            msgData = data;
          })
        })
    }
  );
  // Now tell the user.
  Var title = data.title || 'My App Name';
  self.registration.showNotification(title, {
    body: event.data.body,
    icon: 'images/icon.png'
  })
});
{% endhighlight %}

{% include shared/note.liquid list=page.notes.sameorigin %}