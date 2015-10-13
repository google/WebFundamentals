---
layout: updates/post
title: "Using poster images on plugin content"
description: "Chrome can now add custom poster images to object elements to improve percieved loading performance of plugins such as Flash."
published_on: 2015-08-20
updated_on: 2015-08-20
authors:
  - paulkinlan
tags:
  - news
  - poster
  - flash
  - performance
---

Several weeks ago, [Chrome announced a new content setting that automatically pauses plugin content](http://chrome.blogspot.com/2015/06/better-battery-life-for-your-laptop.html)
that it detects to be peripheral to the main content of the site will go live to all users of Chrome 45 onwards (Stable September 2015).
This is a win for your users in terms of CPU usage and power consumption, but may result in their not seeing the full content
that your website provides.

Luckily, the setting also respects the poster parameter in a similar way that video elements do.
This allows you to specify an image that should be used in place of the paused plugin, instead of
whichever frame Chrome pauses your plugin content on.

Here’s an example of using it in practice. If Chrome decides to pause flash.swf, poster.png
will be shown in its place. If the user clicks on the poster than the Flash content will
play like normal.

{% highlight html %}
<object data="http://example.com/flash.swf"  
        type="application/x-shockwave-flash"
        poster="poster.png">
</object>
{% endhighlight %}

The value of the poster parameter is interpreted the same way as the srcset attribute of an img tag,
so it can support high-DPI displays as well. Here’s an example of the srcset syntax:

{% highlight html %}
<object data="http://example.com/flash.swf"  
        type="application/x-shockwave-flash"
        poster="snapshot1x.png 1x, snapshot2x.png 2x">
</object>
{% endhighlight %}

It's important that the image used is the same dimensions as the plugin content - otherwise,
the image could end up distorted on the user's screen
