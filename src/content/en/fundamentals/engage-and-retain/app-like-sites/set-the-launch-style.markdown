---
layout: shared/narrow
title: "Set the launch style"
description: ""
published_on: 2014-12-17
updated_on: 2016-02-12
authors:
  - mattgaunt
  - paulkinlan
translation_priority: 1
order: 5
---

## Customize how your site is launched

You make your web app hide the browser's UI by setting the `display` type to `standalone`.

{% highlight json %}
"display": "standalone"
{% endhighlight %}

Don't worry, if you think users would prefer to view your page as a normal 
site in a browser, you can set the `display` type to `browser`.

{% highlight json %}
"display": "browser"
{% endhighlight %}

<figure>
  <img src="images/manifest-display-options.png" alt="web-app-capable">
  <figcaption>Manifest Display Options</figcaption>
</figure>

## Specify the initial orientation of the page

You can enforce a specific orientation, which is really useful for use cases 
that work in only one orientation, like games for example. Use this with 
selectively. Users prefer selecting the orientation.

{% highlight json %}
"orientation": "landscape"
{% endhighlight %}

<figure>
  <img src="images/manifest-orientation-options.png" alt="Web App Manifest Orientation Options">
  <figcaption>Web App Manifest Orientation Options</figcaption>
</figure>