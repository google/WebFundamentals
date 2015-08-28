---
rss: true
layout: update
published: true
title: 'Using the web app manifest to create a solid color loading screen'
date: 2015-08-29
article:
  written_on: 2015-08-29
  updated_on: 2015-08-29
authors:
- paulkinlan
collection: updates
category: chrome
product: chrome
type: news
tags:
- performance
- update
description: "Set a theme-color in the manifest and have it available to all pages on your
             site when launched from the homescreen."
featured-image: /web/updates/images/2015-08-27-using-requestidlecallback/featured.jpg
permalink: /updates/2015/09/using-manifest-to-set-sitewide-theme-color.html
---

Chrome introduced the concept of a theme color for your site in 2014. The theme color
is a hint from your web page that tells the browser what color to tint
 [UI elements such as the address bar](additional-customizations.html).  

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/theme-color.png" alt="backgroud color">

        <figcaption>Theme color</figcaption>
    </figure>
</div>

<div class="clear"></div>

The problem is, you have to define the theme color on every single page, and if 
you have a large site or legacy site, making a lot of site wide changes is not feasible.

Starting in Chrome 46 (Beta September 2015), adding in a `theme_color` attribute 
to your manifest will have the effect of applying the colour automatically 
to every page the user visits on your domain when the site is lauched from the homescree.  

If you page already has a theme-color meta tag then the page level configuration will 
be used instead of the value in the manifest.

Simply add in the theme_color attribute to your manifest.
{% highlight json %}
"theme_color": "#2196F3"
{% endhighlight %}

To see this in action, visit <a href="https://airhorner.com">Airhorner &mdash; the worlds best airhorn</a> 
and add it to your homescreen. Or look at the <a href="https://airhorner.com/manifest.json">sites manifest</a>.


