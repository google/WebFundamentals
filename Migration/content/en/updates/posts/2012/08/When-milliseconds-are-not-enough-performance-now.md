---
layout: updates/post
title: "When milliseconds are not enough: performance.now"
published_on: 2012-08-16
updated_on: 2012-08-16
authors:
  - paulirish
tags:
  - news
  - internals
  - performance
---
The [High Resolution Timer](http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HighResolutionTime/Overview.html) was added by the [WebPerf Working Group](http://www.w3.org/2010/webperf/) to allow measurement in the Web Platform that's more precise than what we've had with `+new Date` and the newer `Date.now()`.

So just to compare, here are the sorts of values you'd get back:

{% highlight javascript %}
Date.now()         //  1337376068250
performance.now()  //  20303.427000007
{% endhighlight %}

You'll notice the two above values are many orders of magnitude different. `performance.now()` is a measurement of floating point milliseconds since that particular page started to load (the <code>performance.timing.<a href="http://www.w3.org/TR/navigation-timing/#dom-performancetiming-navigationstart">navigationStart</a></code> timeStamp to be specific). You could argue that it could have been the number of milliseconds since the [unix epoch](http://en.wikipedia.org/wiki/Unix_time), but rarely does a web app need to know the distance between now and 1970. This number stays relative to the page because you'll be comparing two or more measurements against eachother.

### Monotonic time

Another added benefit here is that you can rely on the time being monotonic. Let's let WebKit engineer Tony Gentilcore [explain this one](http://gent.ilcore.com/2012/06/better-timer-for-javascript.html):

> Perhaps less often considered is that `Date`, based on system time, isn't ideal for real user monitoring either. Most systems run a daemon which regularly synchronizes the time. It is common for the clock to be tweaked a few milliseconds every 15-20 minutes. At that rate about 1% of 10 second intervals measured would be inaccurate.

### Use Cases

There are a few situations where you'd use this high resolution timer instead of grabbing a basic timestamp:

* benchmarking
* game or animation runloop code
* calculating framerate with precision
* cueing actions or audio to occur at specific points in an animation or other time-based sequence

### Availability

The high resolution timer is currently available in Chrome (Stable) as `window.performance.webkitNow()`, and this value is generally equal to the [new argument value passed into the requestAnimationFrame callback](http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision). Pretty soon, [WebKit will drop its prefix](https://bugs.webkit.org/show_bug.cgi?id=88278) and this will be available through `performance.now()`. The WebPerfWG in particular, led by Jatinder Mann of Microsoft, has been very [successful in unprefixing](http://jatindersmann.com/2012/08/07/ieblog-web-performance-apis-rapidly-become-w3c-candidate-recommendations/) their features quite quickly[.](http://mediacdn.disqus.com/uploads/mediaembed/images/272/1565/original.jpg)

In summary, `performance.now()` is...

* a double with microseconds in the fractional
* relative to the `navigationStart` of the page rather than to the UNIX epoch
* not skewed when the system time changes
* available in Chrome stable, Firefox 15+, and IE10.

