---
layout: article
title: "Additional Customizations"
description: "The following are customizations that are very useful, but work only in a subset of browsers. All of them are optional but strongly suggested, as they further enhance the app experience."
introduction: "The following are customizations that are very useful, but work only in a subset of browsers. All of them are optional but strongly suggested, as they further enhance the app experience."
article:
  written_on: 2014-09-22
  updated_on: 2014-11-18
  order: 4
id: additional-customizations
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

{% include modules/toc.liquid %}

## Chrome: Color the browser elements

Starting with Chrome 39 on mobile, you can override application colors such as
the title bar color and the highlight in the color switcher using a meta
tag. For example:

{% highlight html %}
<meta name="theme-color" content="#00ff00">
{% endhighlight %}

Though this tag is not yet supported in other browswers, you can do the same
thing with `msapplication-navbutton-color` on Internet Explorer and 
`apple-mobile-web-app-status-bar-style` on mobile safari.

## Safari: Startup images, status bar appearance

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
working solution, courtesy of [tfausak's gist](//gist.github.com/tfausak/2222823):

{% highlight html %}
<!-- iOS 6 & 7 iPad (retina, portrait) -->
<link href="/static/images/apple-touch-startup-image-1536x2008.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPad (retina, landscape) -->
<link href="/static/images/apple-touch-startup-image-1496x2048.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (portrait) -->
<link href="/static/images/apple-touch-startup-image-768x1004.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (landscape) -->
<link href="/static/images/apple-touch-startup-image-748x1024.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone 5 -->
<link href="/static/images/apple-touch-startup-image-640x1096.png"
     media="(device-width: 320px) and (device-height: 568px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone (retina) -->
<link href="/static/images/apple-touch-startup-image-640x920.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPhone -->
<link href="/static/images/apple-touch-startup-image-320x460.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">
{% endhighlight %}

### Change the status bar appearance

You can change the appearance of the default status bar to either `black` or
`black-translucent`. With `black-translucent`, the status bar floats on top
of the full screen content, rather than pushing it down. This gives the layout
more height, but obstructs the top.  Here’s the code required:

{% highlight html %}
<meta name="apple-mobile-web-app-status-bar-style" content="black">
{% endhighlight %}

And here is a preview of how the different modes look:

<div class="clear g-wide--pull-1">
  <div class="g--half">
    <figure class="fluid">
      <img src="images/status-bar-translucent.png" srcset="images/status-bar-translucent.png 1x, images/status-bar-translucent-2x.png 2x" alt="black-translucent">
      <figcaption>Screenshot using <code>black-translucent</code></figcaption>
    </figure>
  </div>
  <div class="g--half g--last">
    <figure class="fluid">
      <img src="images/status-bar-black.png" srcset="images/status-bar-black.png 1x, images/status-bar-black-2x.png 2x" alt="black-black">
      <figcaption>Screenshot using <code>black</code></figcaption>
      </figure>
  </div>
</div>

## Internet Explorer: Live Tiles, notifications and pinned sites

Microsoft’s “Pinned Sites” and their rotating “Live Tiles” go far beyond other
implementations and covering them here would blow up this guide. If you’d like
to learn more,
[learn how to create live tiles at MSDN](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx).

{% include modules/nextarticle.liquid %}

{% endwrap %}
