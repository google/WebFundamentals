---
layout: updates/post
title: "High Resolution Timestamps for Events"
description: "Find out when events occur with microsecond precision, thanks to DOMHighResTimeStamp."
published_on: 2016-01-29
updated_on: 2016-01-29
authors:
  - jeffposnick
tags:
  - events
  - performance
  - chrome49
featured_image: /web/updates/images/2016/01/high-res-timestamps/ic_timer_black.png
---

The [`timeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp)
property of the [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event)
interface indicates the time at which a given event took place.

In versions of Chrome prior to 49, this <code>timeStamp</code> value was
represented as a [`DOMTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTimeStamp),
which was a whole number of milliseconds since the
[system epoch](https://en.wikipedia.org/wiki/Epoch_(reference_date)#Computing),
much like the value returned by
[`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now).

Starting with Chrome 49, <code>timeStamp</code> is a
[`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)
value. This value is still a number of milliseconds, but with microsecond
resolution, meaning the value will include a decimal component. Additionally,
instead of the value being relative to the epoch, the value is relative to the
[`PerformanceTiming.navigationStart`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/navigationStart),
i.e. the time at which the user navigated to the page.

The benefits of additional time stamp accuracy can be seen in these examples:

  * [Calculating mouse velocity](https://googlechrome.github.io/samples/event-timestamp/index.html)
  * [Measuring scroll “jank”](http://rbyers.github.io/scroll-latency.html)

### Cross-browser & Legacy Considerations

If you have existing code that compares <code>Event.timeStamp</code> values from
two events, you should not have to adjust your code on account of the shift to
<code>DOMHighResTimeStamp</code>. Moreover, on browsers that support
<code>DOMHighResTimeStamp</code>, your existing code will benefit from the
increased microsecond accuracy, as well as the fact that the
<code>DOMHighResTimeStamp</code> is guaranteed to
[increase monotonically](http://mathworld.wolfram.com/MonotoneIncreasing.html),
regardless of whether the system clock changes in the middle of your web
page’s execution.

If, instead of comparing two <code>Event.timeStamp</code> values, your code
needs to determine how long ago an event took place, the new
<code>DOMHighResTimeStamp</code> value can be compared directly to
[`performance.now()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now).
And if you need to transform <code>Event.timeStamp</code> to an absolute number
of milliseconds since the system epoch, you can get that value by adding a
<code>DOMHighResTimeStamp</code> to <code>performance.timing.navigationStart</code>.

In both of those cases, <code>DOMTimeStamp</code> and <code>DOMHighResTimeStamp</code>
behave differently, but you can simplify your cross-browser code by using this
[conversion function](https://github.com/majido/high-resolution-timestamp-polyfill/blob/master/translate-timeStamp.js),
courtesy of [Majid Valipour](https://github.com/majido). It takes an
<code>Event</code> object as a parameter and returns a
<code>DOMHighResTimeStamp</code>-like value, ready to be compared to
<code>performance.now()</code> or added to
<code>performance.timing.navigationStart</code>.
