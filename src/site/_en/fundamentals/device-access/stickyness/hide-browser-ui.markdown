---
layout: article
title: "Hide the Browser UI"
description: "Your users can add your site to the homescreen even without any special code on your end, but we recommend to have your web app display without the browser UI when launched from the homescreen (effectively going fullscreen)."
introduction: "Your users can add your site to the homescreen even without any special code on your end, but we recommend to have your web app display without the browser UI when launched from the homescreen (effectively going fullscreen)."
article:
  written_on: 2014-09-22
  updated_on: 2014-09-22
  order: 1
id: hide-browser-ui
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

Add the following code to the `<head>` of your page:

{% highlight html %}
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
{% endhighlight %}


This will tell both Mobile Safari and Chrome for Android that they're dealing with a web app. Internet Explorer doesn't require instructions for this, as sites open fullscreen in Windows' start screen experience from the get-go.

{% include modules/nextarticle.liquid %}

{% endwrap %}
