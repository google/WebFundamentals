---
layout: shared/narrow
title: "Provide great icons & tiles"
description: "When a user visits your webpage, the browser tries to fetch an icon from the HTML. The icon may show up in many places, including the browser tab, recent app switch, the new (or recently visited) tab page, and more."
published_on: 2014-09-22
updated_on: 2015-10-06
authors:
  - pbakaus
translation_priority: 1
notes:
  fourtyeight:
    - "Icons sizes should be based on 48px, for example 48px, 96px, 144px and 192px"
---

<p class="intro">
When a user visits your webpage, the browser tries to fetch an icon from the HTML. The icon may show up in many places, including the browser tab, recent app switch, the new (or recently visited) tab page, and more.</p>

Providing a high quality image will make your site more recognizable, making it
easier for users to find your site. 

{% include shared/toc.liquid %}

## Add support for icons to your website
To fully support all browsers, you'll need to add a few tags to the `<head>`
element of each page.

{% highlight html %}
<!-- icon in the highest resolution we need it for -->
<link rel="icon" sizes="192x192" href="icon.png">

<!-- reuse same icon for Safari -->
<link rel="apple-touch-icon" href="ios-icon.png">

<!-- multiple icons for IE -->
<meta name="msapplication-square310x310logo" content="icon_largetile.png">
{% endhighlight %}

### Chrome & Opera

Chrome and Opera uses `icon.png`, which is scaled to the necessary size by 
the device. To prevent automatic scaling, you can also provide additional 
sizes by specifying the `sizes` attribute.

{% include shared/remember.liquid title="Note" list=page.notes.fourtyeight %}

### Safari

Safari also uses the `<link>` tag with the `rel` attribute: `apple-touch-icon`.

You can specify [explicit sizes](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27) 
by providing a separate link tag for each icon, preventing the OS from 
having to resize the icon:

{% highlight html %}
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
{% endhighlight %}

### Internet Explorer & Windows Phone

Windows 8's new home screen experience supports four different layouts for 
pinned sites, and requires four icons. You can leave out the relevant meta 
tags if you don't want to support a specific size.

{% highlight html %}
<meta name="msapplication-square70x70logo" content="icon_smalltile.png">
<meta name="msapplication-square150x150logo" content="icon_mediumtile.png">
<meta name="msapplication-wide310x150logo" content="icon_widetile.png">
{% endhighlight %}

## Tiles in Internet Explorer

Microsoft’s "Pinned Sites" and rotating "Live Tiles" go far beyond other
implementations and is beyond the scope of this guide. You can learn more
at MSDN's
[how to create live tiles](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx).
