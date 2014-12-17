---
layout: article
title: "Detect When Launched From The Home Screen"
description: "Sometimes it’s useful to know whether the app is launched from the home screen vs. the web browser."
introduction: "Sometimes it’s useful to know whether the app is launched from the home screen vs. the web browser."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 5
id: detect-when-launched
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

Sometimes it’s useful to know whether the app is launched from the home screen
vs. the web browser. To demonstrate one use case, you might want to show a 
banner suggesting to install the app to the users’ home screen when he arrives
from the browser, but hide it once installed.

In Mobile Safari, querying `window.navigator.standalone` will tell you whether
your app is running as home screen icon or simply in the browser. In Internet
Explorer, you can achieve the same by querying
[`window.external.msIsSiteMode()`](http://msdn.microsoft.com/en-us/library/ie/gg491733(v=vs.85).aspx). Here’s a combined check:

{% highlight js %}
var fromHomescreen = window.navigator.standalone || window.external.msIsSiteMode();
if(!fromHomescreen) {
    // show them a guide on how to install the web app
    ...
}
{% endhighlight %}

Unfortunately, it is not possible to detect the same in Chrome for Android.

{% include modules/nextarticle.liquid %}

{% endwrap %}