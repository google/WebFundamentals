---
layout: article
title: "Specify an Icon"
description: "To make your site stand out, be sure to provide a beautiful, full size icon, otherwise the favicon or a low quality screenshot may be used."
introduction: "To make your site stand out, be sure to provide a beautiful, full size icon, otherwise the favicon or a low quality screenshot may be used."
article:
  written_on: 2014-09-22
  updated_on: 2014-09-24
  order: 2
id: specify-an-icon
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

<figure>
  <img src="images/icons.png" alt="Customizing icons per platform" />
  <figcaption>Adding custom icons is an easy way to stand out.</figcaption>
</figure>


Add the following code to your `<head>` to add a custom icon to Chrome, Safari
and Internet Explorer:

{% highlight html %}
<!-- icon in the highest resolution we need it for -->
<link rel="icon" sizes="228x228" href="icon.png">
<!-- reuse same icon for Safari -->
<link rel="apple-touch-icon" href="icon.png">
<!-- multiple icons for IE -->
<meta name="msapplication-square70x70logo" content="icon\_smalltile.png">
<meta name="msapplication-square150x150logo" content="icon\_mediumtile.png">
<meta name="msapplication-wide310x150logo" content="icon\_widetile.png">
<meta name="msapplication-square310x310logo" content="icon\_largetile.png">
{% endhighlight %}

In this example, Chrome, Safari and Opera use the 228x228px icon, which is 
scaled to the necessary size by the device. Both Chrome and Safari use the 
`<link>` tag and support the `sizes` attribute, the only difference in syntax 
is the `rel` attribute: `icon` (Chrome) vs. `apple-touch-icon` (Safari).

Windows 8' new home screen experience supports four different layouts for 
pinned sites, and requires four icons. You can leave out the relevant meta 
tags if you don't want to support a specific size.

You can specify [explicit sizes](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27) by providing a separate link tag 
for each icon, preventing the OS from having to resize the icon:

{% highlight html %}
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
{% endhighlight %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
