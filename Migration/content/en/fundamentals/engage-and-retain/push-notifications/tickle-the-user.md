---
layout: shared/narrow
title: "Tickle the user and pull in the data"
description: "The PushMessageData object will eventually let you send data to the user immediately, but you may not want to use that every time, especially if additional data could accumulate on the server after the notification is sent."
published_on: 2015-10-02
updated_on: 2015-10-02
order: 5
published: false
authors:
  - josephmedley
translation_priority: 1
---

<p class="intro"> 
  The PushMessageData object will eventually let you send
  data to the user immediately, but you may not want to use that every time,
  especially if additional data could accumulate on the server after the
  notification is sent. 
</p>



For example, an email client might want to show a notification when an email
comes in. It might be several minutes before the user acknowledges the
notification. Meanwhile additional emails have appeared on the server. In that
case, use `fetch()` inside the `onnotificationclick` event.

## In the service worker

{% highlight javascript %}
  self.addEventListener('notificationclick', function(event) {
  event.waitUntil(
    var someRequest = new Request('some/url/path.html');
    // This call will be intercepted by the fetch handler.
    fetch(someRequest);
  )
  });

  self.addEventListener('fetch', function(event) {
    event.waitUntil(
      //Some call to global fetch with an appropriate caching pattern.
    )
  });
{% endhighlight %}

## In the client page

{% highlight javascript %}
  window.addEventListener('focus', function(event) {
    var someRequest = new Request('some/url/path.html');
    // This call will be intercepted by the service worker's
    // fetch handler and the result returned from cache.
    var someResponse = fetch(someRequest);
    // Update the page with the data from the response.
  });
{% endhighlight %}
