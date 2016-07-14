---
layout: shared/narrow
title: "Add a Splash Screen"
description: "To provide a better user experience you can replace the white launch screen with a title, color, and images."
published_on: 2014-12-17
updated_on: 2016-02-12
authors:
  - mattgaunt
  - paulkinlan
translation_priority: 1
order: 4
---

{% include shared/toc.liquid %}

When you launch your web app from the home screen a number of things happen behind the
scenes:

1. Chrome launchs.
2. The renderer that displays the page starts up.
3. Your site loads from the network (or from cache if it has a service worker).

While this is happening the screen will be white and will look like it has stalled.
This becomes especially apparent if you are loading your web page from the network where
pages take more than one or two seconds to get any content visible on the homepage.

To provide a better user experience you can replace the white screen with a title, color, and images. 

## Set an Image and Title

If you've been following from the beginning, you've actually set and image and title already. Chrome infers the image and title from specific members of the manifest. What's important here is knowing the specifics. 

A splashscreen image is drawn from the `icons` array. Chrome chooses the image that is closest to 128dp for the device. The title is simply pulled from the `name` member.

## Set the Background Color 

Specify background color using the appropriately named `background_color`
property. The color will be used by Chrome the instant the web app is launched
and will remain on the screen until the web app's first render.

To set the bacground color, simply set the following in your manifest.

{% highlight json %}
"background_color": "#2196F3",
{% endhighlight %}

There will now be no white screen as your site is launched from the home screen.

A good suggested value for this property is the background color of the load page.  Using the 
same colors as the load page allows for a smooth transistion from the
splashscreen to the homepage.

<figure>
  <img src="images/background-color.gif" alt="backgroud color" style="max-height: 550px;">
  <figcaption>Background color for launch screen</figcaption>
</figure>

## Set a Theme Color

Specify a theme color using the (wait for it) `theme_color` property. This property
sets the color of the toolbar. For this we also suggest duplicating an existing
color, specifically the `theme-color` `<meta>`.
