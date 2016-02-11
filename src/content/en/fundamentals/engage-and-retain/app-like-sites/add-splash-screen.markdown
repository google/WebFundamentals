---
layout: shared/narrow
title: "Add a splash screen"
description: ""
published_on: 2014-12-17
updated_on: 2016-02-12
authors:
  - mattgaunt
  - paulkinlan
  - josephmedley
translation_priority: 1
order: 4
---

When you launch your web app from the home screen a number of things happen behind the
scenes:

1. Chrome launchs.
2. The renderer that displays the page starts up.
3. Your site loads from the network (or from cache if it has a service worker).

While this is happening the screen will be white and will look like it has stalled.
This becomes especially apparent if you are loading your web page from the network where
pages take more than one or two seconds to get any content visible on the homepage.

To provide a better user experience you can replace the white screen with color and images.

## Set the background color 

Specify background color using the appropriately named `background_color`
property. The color will be used by Chrome the instant the web app is launched
and will remain on the screen until the web app's first render.

Simply set the following in your manifest.

{% highlight json %}
"background_color": "#2196F3",
{% endhighlight %}

There will now be no white screen as your site is launched from the home screen.

A good suggested value for this property is the background color of the load page.  Using the 
same colors as the background page will allow for a smooth looking transistion from this
splashscreen to the homepage.

<figure>
  <img src="images/background-color.gif" alt="backgroud color" style="max-height: 550px;">
  <figcaption>Background color for launch screen</figcaption>
</figure>

## Set icons and title

