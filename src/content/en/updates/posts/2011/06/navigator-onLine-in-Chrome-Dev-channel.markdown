---
layout: updates/post
title: "navigator.onLine in Chrome Dev channel"
published_on: 2011-06-24
updated_on: 2011-06-24
authors:
  - ericbidelman
tags:
  - news
  - offline
---
With the [offline APIs](http://www.html5rocks.com/features/offline) in HTML5, there's no excuse not to provide a flawless offline experience for users. One thing that can help this story is the `navigator.onLine` property; a feature that recently landed in Chrome dev channel. This property returns `true` or `false` depending on whether or not the app has network connectivity:

{% highlight javascript %}
if (navigator.onLine) {
  console.log('ONLINE!');
} else {
  console.log('Connection flaky');
}
{% endhighlight %}

A web app can also listen for `online` and `offline` events to determine when the connection is available again or when an app goes offline:

{% highlight javascript %}
window.addEventListener('online', function(e) {
  // Re-sync data with server.
}, false);

window.addEventListener('offline', function(e) {
  // Queue up events for server.
}, false);
{% endhighlight %}

I've posted a working demo at [http://html5-demos.appspot.com/static/navigator.onLine.html](http://html5-demos.appspot.com/static/navigator.onLine.html) and more information on offline events can be found in the [MDN](https://developer.mozilla.org/en/Online_and_offline_events).
