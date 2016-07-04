---
layout: updates/post
title: "Adding a Splash screen for installed web apps in Chrome 47"
published_on: 2015-10-15
updated_on: 2015-10-15
authors:
  - paulkinlan
tags:
  - news
  - splashscreen
  - addtohomescreen
featured_image: /web/updates/images/2015/10/splashscreen.png
description: "Chrome 47 introduces a splash screen to web apps added to the home screen"
---

Over the past year we have focused on letting developers build sites and apps 
that feel like they are installed on the user's system: [service worker](/web/fundamentals/primers/service-worker) for 
letting you easily build offline first experiences and Add to Homescreen to give 
your site the presence on the user's device.

The home screen launch process on Android is a great first step, however there was always a 
tell that this wasn't a native-like experience: When you click on the home screen 
icon the screen would go white until the document was ready to render its first 
frame of the document.  This could take anywhere from 200ms of white up to, 
well, it depends on how quickly you can draw something.  Some poorly designed 
sites can take many seconds to get their first paint and we believe that the 
splash screen increases the perceived performance of loading of your site. 

In Chrome 46 on Android we quietly introduced `background_color` that removes this delay and 
paints the screen with a solid colour until the browser is ready to paint 
something from the web page. This was a good addition, yet it still didn't 
look fully like an app.

Now in Chrome 47 on Android (Beta in October 2015) we are introducing the concept of a 
"splash screen".  

<img src="/web/updates/images/2015/10/splashscreen.gif" style="max-width=100%" />

Try it out on [Voice Memos](https://voice-memos.appspot.com/), 
[Air Horner](https://airhorner.com) or [SVG OMG](https://jakearchibald.github.io/svgomg/).

The splash screen is generated dynamically from information held in the Web App 
Manifest and is a combination of the `name` and `background_color` properties, 
and the icon in the `icons` array that is closest to "128dp" for the device.

128dp is the ideal size for the image on the splash screen as it means no 
scaling will be applied to the image.  Now we web developers don't deal with 
dp's. We use physical pixels or CSS pixels. In the case of splash screen and 
configuration in the manifest only physical pixels are considered.  1dp is 1 
physical pixel at a screen density of 160dpi. 

1dp = 1px at 160 dpi.

128dp at 1x   (160dpi) = 128px  
128dp at 1.5x (240dpi) = 192px  ( 128 * ( 240 / 160 ) )
128dp at 2x   (320dpi) = 256px   
128dp at 3x   (480dpi) = 384px (Equivalent to Nexus 5)  
128dp at 4x   (640dpi) = 512px (Nexus 6 is in between 3 and 4)

If you want to ensure that an icon will always be displayed consider that 48dp 
is the minimum image size we will display, which if you take the maximum density 
display currently supported (4x) then 48 \* 4 = 192px. This is lucky because we 
need to 192px image for Add to Homescreen to work! Yay. Therefore, _I_ would 
recommend **always** having 192px as the minimum sized icon and create 3 other 
versions at 256px, 384px and 512px. However, if you want to ensure that the user
is not downloading too much data for the splash screen, especially on a low density
device then you can go lower and Chrome will try to fetch the most appropriate
image.

The following is a sample manifest (note: do not set the density field in the 
icons array, it will cause you a whole heap of pain, well, unless you know what 
you are doing):

{% highlight javascript %}
{  
  "short_name": "Voice Memos",  
  "name": "Voice Memos",  
  "start_url": "./?utm_source=web_app_manifest",  
  "icons": [  
    {  
      "src": "/images/icon-192x192.png",  
      "sizes": "192x192",  
      "type": "image/png"  
    },  
    {  
      "src": "/images/icon-256x256.png",  
      "sizes": "256x256",  
      "type": "image/png"  
    },  
    {  
      "src": "/images/icon-384x384.png",  
      "sizes": "384x384",  
      "type": "image/png"  
    },  
    {  
      "src": "/images/icon-512x512.png",  
      "sizes": "512x512",  
      "type": "image/png"  
    }
  ],  
  "background_color": "#FAFAFA",
  "theme_color": "#512DA8", 
  "display": "standalone",  
  "orientation": "portrait"  
}
{% endhighlight %}

Ensure that in your manifest you have:

* A `name` - it will be displayed at the bottom of the screen
* A `background_color`, and for the best effect have it match the background color 
  of your page so the transition on first paint is near seamless. 
* An optional `theme_color` if you have them inside the your app already, this will
  ensure a smooth transition when the splash screen is replaced by your app content.
* High quality icons that will displayed in the center of the splash screen - ensure 
  your icon is at least 192px.

I think this is a great step in making sites and apps feel even more like they 
are meant to be part of the user's mobile device.

### FAQ

* Will this work on Chrome for iOS or on Desktop?
    * No. It is only Android.
* Will this splash screen appear when a user visits my site from a link?
    * No, this only shows when a user clicks the icon for your site on their 
      home screen.
* Is there an API to control this or make it look like the shell of my app?
    * No, we are following guidelines similar to Android's and how iOS works.  
      Added to that, we don't know that the screen size will always be the same 
      and trying to predict that for an app shell is outside that remit of this.

 
