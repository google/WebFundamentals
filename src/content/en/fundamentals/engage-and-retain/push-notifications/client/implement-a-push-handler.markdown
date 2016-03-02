---
layout: shared/narrow
title: "Implement a Push Handler"
description: "We're going to start our exploration of push by implementing a push event handler in a service worker."
authors:
 - josephmedley
published_on: 2016-02-19
updated_on: 2016-03-04
order: 10
translation_priority: 1
notes:
  sameorigin: "Currently, a notification can only open URLs from the same origin as the notification. The simplest way to overcome this issue is to have a page on your domain that performs a redirect."
---

<p class="intro">
  We're going to start our exploration of push by implementing a push event handler in a service worker. If you don't have a service worker yet, then <a href="/web/fundamentals/primers/service-worker">build one</a> or download ours, then come back here when you're ready to implement push.
</p>

{% include shared/toc.liquid %}

## Add the Handler Code

The first step in implementing push is to add a push event handler to your service worker script. 

{% highlight javascript %}
self.addEventListener('push', function(event) {
  console.log('Push message received: ', event);
  event.waitUntil(
    // Process the push event.
  );
}
{% endhighlight %}

Notice how the `event` object is used. Just like `install` and `activate`, `push` supports the `waitUntil()` method, giving you greater control over the order of asynchronous actions.

## Message Content

Next, we show a notification to the user. Do this with a call to `showNotification()`. It takes two parameters: a title and an options object. In practice this looks something like this:

{% highlight javascript %}
self.addEventListener('push', function(event) {
  console.log('Push message received: ', event);
  var title = 'Yay a message.';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'We have received a push message',
      icon: 'images/icon.png'
    })
  );
});
{% endhighlight %}

The title and body are likely specific to this push. The icon may vary depending on the type of push but has likely already been retrieved from the server either during [the service worker's install step](/web/fundamentals/primers/service-worker/install) or in a [previous call to fetch()](/web/fundamentals/primers/service-worker/cache-and-return-requests). The options object [has other parameters](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification), but those are for a later lesson.

## Test the Handler

Believe it or not, we already have enough code to test what we've done so far. Though service workers are [supported in multiple browsers](https://jakearchibald.github.io/isserviceworkerready/) we're going to do this in Chrome.

Go ahead and load your client page in a Chrome tab. Open a new tab and enter `chrome://serviceworker-internals/` in the address box. You'll get something like the following:

![Chrome's service worker internals page.](images/sw-internals.png)

If `Running Status` says `STOPPED`, click the `Start` button. Now click `Push`. If you've done everything correctly, you should see something like the image below. If not, double check your work. Remember, there's a sample you can compare too if need be.

![A test push message.](images/notification.png){:width="380px"}

## Fetch Some Content

Current implementations of the Push API do not allow you to send 
a payload with a push message. Even if they did, pushes are intended to be merely tickles (meaning small) and the exact payload size will likely vary from browser to browser. To get around this, we're going to make a call to global `fetch()`.

Using `fetch()` is a whole subject in and of itself. What we want to focus on here is how to use `fetch()` with a push handler. For the best user experience we want to minimize the perceived wait for updates. To do that we're going to get data from the server before telling the user there's new data available. This is when [chaining promises](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-chaining) comes in handy.

{% highlight javascript %}
self.addEventListener('push', function(event) {
  console.log('Push message received: ', event);
  event.waitUntil(
    fetch('notification/end/point/data.txt')
      .then(function(response) {
        response.json().then(function(data){
          console.log(data.message);
          var title = 'Yay a message.';
          self.registration.showNotification(title, {
            body: data.message,
            icon: 'images/icon.png'
          })
        })
      })
  );
});
{% endhighlight %}

{% include shared/note.liquid list=page.notes.sameorigin %}