---
layout: shared/narrow
title: "Set the Launch Style"
description: "Use the web app manifest to control the display type and page orientation."
published_on: 2014-12-17
updated_on: 2016-02-12
authors:
  - mattgaunt
  - paulkinlan
translation_priority: 1
order: 5
---

Use the web app manifest to control the display type and page orientation.

{% include shared/toc.liquid %}

## Customize the Display Type

You make your web app hide the browser's UI by setting the `display` type to `standalone`.

{% highlight json %}
"display": "standalone"
{% endhighlight %}

Don't worry, if you think users would prefer to view your page as a normal 
site in a browser. You can set the `display` type to `browser`.

{% highlight json %}
"display": "browser"
{% endhighlight %}

<figure>
  <img src="images/manifest-display-options.png" alt="web-app-capable">
  <figcaption>Manifest Display Options</figcaption>
</figure>

## Specify the Initial Orientation of the Page

You can enforce a specific orientation, which is advantageous for use cases 
that work in only one orientation, like games for example. Use this 
selectively. Users prefer selecting the orientation.

{% highlight json %}
"orientation": "landscape"
{% endhighlight %}

<figure>
  <img src="images/manifest-orientation-options.png" alt="Web App Manifest Orientation Options">
  <figcaption>Web App Manifest Orientation Options</figcaption>
</figure>

