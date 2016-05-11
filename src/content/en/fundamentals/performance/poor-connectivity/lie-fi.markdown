---
layout: shared/narrow-pages-list
title: "Handle unreliable connectivity and 'lie-fi'"
description: "As users move to mobile, it's increasingly important to handle unreliable connectivity — especially when the browser behaves as if it ha connectivity when, for whatever reason, it doesn't. Some new techniques can help."
published_on: 2016-05-10
updated_on: 2016-05-10
order: 5
translation_priority: 1
authors:
  - samdutton
---

## What is lie-fi?

<p class="intro">The term <a href="http://www.urbandictionary.com/define.php?term=lie-fi">lie-fi</a> dates back to at least 2008 (when phones looked like <a href="https://www.mobilegazette.com/2008-phones-wallchart.htm" title="Images of phones from 2008">this</a>), and refers to connectivity that isn't what it seems. Your browser behaves as if it has connectivity when, for whatever reason, it doesn't.</p>

Misinterpreted connectivity can result in a poor experience as the browser (or JavaScript) persists in trying to retrieve resources rather than giving up and choosing a sensible fallback. Lie-fi can actually be worse than offline; at least if a device is definitely offline, your JavaScript can take appropriate evasive action.

Lie-fi is likely to become a bigger problem as more people move to mobile and away from fixed broadband. Recent [US Census data](https://www.ntia.doc.gov/blog/2016/evolving-technologies-change-nature-internet-use) shows a [move away from fixed broadband](https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/). The following chart compares the use of mobile internet at home in 2015 compared with 2013:

<img src="images/home-broadband.png" class="center" alt="Chart from US census data showing the move to mobile away from fixed broadband, particularly in lower income households">

## Use timeouts to handle intermittent connectivity

In the past, [hacky methods using XHR](http://stackoverflow.com/questions/189430/detect-that-the-internet-connection-is-offline) have been used to test for intermittent connectivity, but Service Worker enables more reliable methods in order to set network timeouts. Jeff Posnick explains how to achieve this using [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) timeouts in his talk [Instant Loading with Service Workers](https://youtu.be/jCKZDTtUA2A?t=19m58s):

{% highlight javascript %}
toolbox.router.get(
  '/path/to/image',
  toolbox.networkFirst,
  {networkTimeoutSeconds: 3}
);
{% endhighlight %}

A [timeout option](https://github.com/whatwg/fetch/issues/20) is also planned for the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) — and the [Streams API](https://www.w3.org/TR/streams-api/) should help by optimizing content delivery and avoiding monolithic requests. Jake Archibald gives more details about tackling lie-fi in [Supercharging page load](https://youtu.be/d5_6yHixpsQ?t=6m42s).

