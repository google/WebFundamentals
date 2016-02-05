---
layout: shared/narrow
title: "Web app install banner"
description: "Web app install Banners give you the ability to have your users quickly and seamlessly add your web app to their home screen, making it easy to launch and return to your app."
published_on: 2014-12-17
updated_on: 2015-09-30
authors:
  - mattgaunt
  - paulkinlan
translation_priority: 1
order: 2
notes:
  icons: "Chrome first looks for icons that match the density of the display and are sized to 48dp * screen density. If none are found it searches for the icon that most closely matches the device characteristics. If, for whatever reason, you want be specific about targetting an icon at a particular-pixel density, you can use the optional density member which takes a number. When you don’t declare density, it defaults to 1.0. This means “use this icon for screen densities 1.0 and up”, which is normally what you want."
---

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p class="intro">
      Web app install Banners give you the ability to have your users quickly and 
      seamlessly add your web app to their home screen, making it easy to 
      launch and return to your app.
    </p>
  </div>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/add-to-home-screen.gif" alt="Web app install banner">
    <figcaption>Web app install banner flow</figcaption>
  </figure>
</div>

{% include shared/toc.liquid %}

Chrome will automatically display the banner when your app meets the following
criteria:

* Has a [web app manifest](.) file with:
  - a `short_name`
  - a 144x144 png icon (the icon declarations must include a mime type of `image/png`).
* Has a [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
  registered on your site.
* Is served over [HTTPS](/web/fundamentals/security/encrypt-in-transit/) (you 
  need a service worker after all).
* Is visited by the user twice, over two separate days during the course
  of two weeks.

## Customize the icons

When a user adds your site to their home screen, you can define a set of icons for the 
browser to use.

The icons for your web app can be defined as above, with a type, size and opitional
density.

{% highlight json %}
"icons": [{
    "src": "images/touch/icon-128x128.png",
    "type": "image/png",
    "sizes": "128x128"
  }, {
    "src": "images/touch/apple-touch-icon.png",
    "sizes": "152x152"
  }, {
    "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "sizes": "144x144"
  }, {
    "src": "images/touch/chrome-touch-icon-192x192.png",
    "sizes": "192x192"
  }],
{% endhighlight %}

{% include shared/note.liquid list=page.notes.icons %}

<figure>
  <img src="images/homescreen-icon.png" alt="Add to Home Screen Icon">
  <figcaption>Add to Home Screen Icon</figcaption>
</figure>


## Customize how your site is launched

You make your web app hide the browser's UI by setting the `display` type to `standalone`.

{% highlight json %}
"display": "standalone"
{% endhighlight %}

Don't worry, if you think users would prefer to view your page as a normal 
site in a browser, you can set the `display` type to `browser`.

{% highlight json %}
"display": "browser"
{% endhighlight %}

<figure>
  <img src="images/manifest-display-options.png" alt="web-app-capable">
  <figcaption>Manifest Display Options</figcaption>
</figure>


## Add a splash screen

When you launch your web app from the home screen a number of things happen behind the
scenes:

1. Chrome launchs.
2. The renderer that displays the page starts up.
3. Your site loads from the network (or from cache if it has a ServiceWorker).

While this is happening the screen will be white and will look like it has stalled.
This becomes especially apparent if you are loading your web page from the network where
pages take more than one or two seconds to get any content visible on the homepage.

To provide a better user experience you can control the color of the screen by adding a
`background_color` to your manifest and giving it an HTML color value. The color will be used
by Chrome the instant the web app is launched and will remain on the screen until the web
app's first render.

Simply set the following in your manifest.

{% highlight json %}
"background_color": "#2196F3",
{% endhighlight %}

There will now be no white screen as your site is launched from the home screen.

A good suggested value for this property is the background color of the load page.  Using the 
same colors as the background page will allow for a smooth looking transistion from this
splashscreen to the homepage.

<figure>
  <img src="images/background-color.gif" alt="backgroud color" style="max-height: 550px;">
  <figcaption>Background color for launch screen</figcaption>
</figure>


## Provide a site-wide theme color

Chrome introduced the concept of a theme color for your site in 2014. The theme color
is a hint from your web page that tells the browser what color to tint
[UI elements such as the address bar](/web/fundamentals/design-and-ui/browser-customization/).  


<figure>
  <img src="images/theme-color.png" alt="backgroud color">
  <figcaption>Theme color</figcaption>
</figure>

Without a manifest, you have to define the theme color on every single page, and if 
you have a large site or legacy site, making a lot of site wide changes is not feasible.

Add in a `theme_color` attribute to your manifest, and when the site is launched
from the home screen every page in the domain will automatically get the theme color.

{% highlight json %}
"theme_color": "#2196F3"
{% endhighlight %}

<figure>
  <img src="images/manifest-display-options.png" alt="backgroud color">
  <figcaption>Sitewide theme color</figcaption>
</figure>


## Specify the initial orientation of the page

You can enforce a specific orientation, which is really useful for use cases 
that work in only one orientation, like games for example. Use this with 
selectively. Users prefer selecting the orientation.

{% highlight json %}
"orientation": "landscape"
{% endhighlight %}

<figure>
  <img src="images/manifest-orientation-options.png" alt="Web App Manifest Orientation Options">
  <figcaption>Web App Manifest Orientation Options</figcaption>
</figure>

## Detect if you are launched from the home screen

Because you can now define how your app is launched, add a query string 
parameter to the `start_url` that indicates how it was launched. For 
example `start_url: /index.html?homescreen=1`. 

