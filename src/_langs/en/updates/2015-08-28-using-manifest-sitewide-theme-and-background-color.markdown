---
rss: true
layout: update
published: true
title: 'Using the web app manifest to create a solid color loading screen'
date: 2015-08-27
article:
  written_on: 2015-08-28
  updated_on: 2015-08-28
authors:
- paulkinlan
collection: updates
category: chrome
product: chrome
type: news
tags:
- manifest
description: Improve your perceived loading performance for web apps launched from the homescreen.
permalink: /updates/2015/09/using-web-app-manifest-to-set-solid-color-loading-screen.html
---

When you launch your web app from the homescreen a number of things happen behind the
scenes:

1. Chrome needs to launch,
2. The renderer that displays the page needs to start up.
3. Your site needs to loaded from the network (or from a store like through ServiceWorker).

Up until now, while this is happening the screen will be white to the user and will look like
it has stalled. This becomes especially apparent if you are loading your web page from the 
network where frequently many pages take more than 1 or 2 seconds to get any content
visible on the homepage.

To provide a better user experience from Chrome 46 (Beta in September 2015) you can control the color
of the screen by adding a `background_color` to your manifest and giving it an HTML 
color value. The color will be used by Chrome the instant the web app is launched from the
homescreen and will remain on the screen until the web apps first render.

Simply set the following in your manifest.

{% highlight json %}
"background_color": "#2196F3",
{% endhighlight %}

There will now be no white screen as your site is launched from the homescreen.

A good suggested value for this property is the background color of the load page.  Using the 
same colors as the background page will allow for a smooth looking transistion from this
splashscreen to the homepage.

It is strongly suggested that you add the `background_color` in to your manifest.

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/background-color.png" alt="backgroud color">

        <figcaption>Background color for launch screen</figcaption>
    </figure>
</div>

<div class="clear"></div>

To see this in action, visit <a href="https://airhorner.com">Airhorner &mdash; the worlds best airhorn</a> 
and add it to your homescreen and then launch it. Or look at the <a href="https://airhorner.com/manifest.json">sites manifest</a>.