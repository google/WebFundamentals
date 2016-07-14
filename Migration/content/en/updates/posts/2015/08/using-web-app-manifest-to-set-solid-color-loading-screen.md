---
layout: updates/post
title: "Using the web app manifest to create a solid color loading screen"
published_on: 2015-08-28
updated_on: 2015-08-28
authors:
  - paulkinlan
tags:
  - news
  - manifest
  - webapp
description: "Improve your perceived loading performance for web apps launched from the home screen."
---

When you launch your web app from the home screen a number of things happen behind the
scenes:

1. Chrome needs to launch.
2. The renderer that displays the page needs to start up.
3. Your site needs to loaded from the network (or from a store like through ServiceWorker).

Up until now, while this is happening the screen will be white and will look like
it has stalled. This becomes especially apparent if you are loading your web page from the 
network where frequently many pages take more than 1 or 2 seconds to get any content
visible on the homepage.

To provide a better user experience from Chrome 46 (Beta in September 2015) you can control the color
of the screen by adding a `background_color` to your manifest and giving it an HTML 
color value. The color will be used by Chrome the instant the web app is launched from the
home screen and will remain on the screen until the web app's first render.

Simply set the following in your manifest:

{% highlight json %}
"background_color": "#2196F3",
{% endhighlight %}

There will now be no white screen as your site is launched from the home screen.

A good suggested value for this property is the background color of the load page.  Using the 
same colors as the background page will allow for a smooth looking transition from this
splashscreen to the homepage.

It is strongly suggested that you add the `background_color` in to your manifest.

<p style="text-align: center;">
  <img style="max-width: 50%; height: auto;" src="{{site.WFBaseUrl}}/updates/images/2015-08-28-using-web-app-manifest-to-set-solid-color-loading-screen/background_color.gif" alt="background color = blue loading screen">
</p>

<div class="clear"></div>

To see this in action, visit <a href="https://airhorner.com">Airhorner &mdash; the worlds best airhorn</a> 
and add it to your home screen and then launch it. Or look at the <a href="https://airhorner.com/manifest.json">site's manifest</a>.

### FAQ

* **Does this apply if my site is not launched from the home screen?** <br>
  No. The user will only see this when they launch it from the home screen.
* **Will it ever apply to my entire site, say when they user is just browsing?** <br>
  Unlikely at the moment, to do that it would mean that the browser would have to download the manifest
  a lot more frequently and currently it is low priority asset. This is intended to be parsed when 
  the user adds the site to the home screen.
