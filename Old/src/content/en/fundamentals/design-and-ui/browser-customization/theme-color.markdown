---
layout: shared/narrow
title: "Color browser elements"
description: "Color browser elements like the address bar and more."
published_on: 2014-09-22
updated_on: 2015-09-21
authors:
  - pbakaus
  - mattgaunt
  - petelepage
translation_priority: 1
---

<p class="intro">
Using different <code>meta</code> elements, you can customize the browser and 
even elements of the platform. Keep in mind that some may only work on certain
platforms or browsers, but they can greatly enhance the experience. 
</p>

{% include shared/toc.liquid %}

## Color the browser elements

Chrome, Firefox OS, Safari, Internet Explorer and Opera Coast allow you to define 
colors for elements of the browser, and even the platform using meta tags.

{% highlight html %}
<!-- Chrome, Firefox OS and Opera -->
<meta name="theme-color" content="#4285f4">
<!-- Windows Phone -->
<meta name="msapplication-navbutton-color" content="#4285f4">
<!-- iOS Safari -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
{% endhighlight %}

<img src="imgs/theme-color.png" alt="Theme colors styling the address bar in Chrome">

## Safari specific styling

Safari allows you to style the status bar and specify a startup image.

### Specify a startup image

By default, Safari shows a blank screen during load time and after multiple
loads a screenshot of the previous state of the app. You can prevent this by
telling Safari to show an explicit startup image, by adding a link tag, with
`rel=apple-touch-startup-image`. For example:

{% highlight html %}
<link rel="apple-touch-startup-image" href="icon.png">
{% endhighlight %}

The image has to be in the specific size of the target device's screen or it
won't be used. Refer to
[Safari Web Content Guidelines](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
for further details.

While Apple's documentation is sparse on this topic, the developer community
has figured out a way to target all devices by using advanced media queries to
select the appropriate device and then specify the correct image. Here's a
working solution, courtesy of [tfausak's gist](//gist.github.com/tfausak/2222823)

### Change the status bar appearance

You can change the appearance of the default status bar to either `black` or
`black-translucent`. With `black-translucent`, the status bar floats on top
of the full screen content, rather than pushing it down. This gives the layout
more height, but obstructs the top.  Here’s the code required:

{% highlight html %}
<meta name="apple-mobile-web-app-status-bar-style" content="black">
{% endhighlight %}

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="imgs/status-bar-translucent.png" srcset="imgs/status-bar-translucent.png 1x, imgs/status-bar-translucent-2x.png 2x" alt="black-translucent">
    <figcaption>Screenshot using <code>black-translucent</code></figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="imgs/status-bar-black.png" srcset="imgs/status-bar-black.png 1x, imgs/status-bar-black-2x.png 2x" alt="black-black">
    <figcaption>Screenshot using <code>black</code></figcaption>
  </figure>
</div>

