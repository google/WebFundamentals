---
layout: article
title: "Add a WebApp Manifest"
description: "The Manifest for Web applications is a simple JSON file that gives you, the developer, the ability to control how your app appears to the user in the areas that they would expect to see apps (for example the mobile homescreen), direct what the user can launch and more importantly how they can launch it. In the future the manifest will give you even more control over your app, but right now we are just focusing on how your app can be launched."
introduction: "The Manifest for Web applications is a simple JSON file that gives you, the developer, the ability to control how your app appears to the user in the areas that they would expect to see apps (for example the mobile homescreen), direct what the user can launch and more importantly how they can launch it. In the future the manifest will give you even more control over your app, but right now we are just focusing on how your app can be launched."
article:
  written_on: 2014-12-17
  updated_on: 2014-12-17
  order: 1
id: wapp-app-manifest
collection: stickyness
authors:
  - mattgaunt
  - paulkinlan
collection: stickyness
priority: 1
key-takeaways:
  manifest:
    - Define a range of icons so that they work across all device form factors
    - Choose a good `short_name` as this is what users will see
    - Add a launch URL and a Querystring parameter so that you can track how many users launch your app
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.manifest %}

Adding a WebApp manifest is really easy. You create a manifest.json
file which contains the settings and resources for your WebApp and
then add a *link* to it from your html pages.

## Creating the manifest

You can call the manifest whatever you want. Most people will probably just use manifest.json. An example is given below.

{% highlight json %}
{
  "short_name": "Kinlan's Amaze App",
  "name": "Kinlan's Amazing Application ++",
  "icons": [
    {
      "src": "launcher-icon-0-75x.png",
      "sizes": "36x36"
    },
    {
      "src": "launcher-icon-1x.png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-1-5x.png",
      "sizes": "72x72"
    },
    {
      "src": "launcher-icon-2x.png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-3x.png",
      "sizes": "144x144"
    },
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html",
  "display": "standalone"
}
{% endhighlight %}

You should include a *short_name* as this will get used for the launcher text.

If you don't provide a *start_url*, then the current page will be used, which is unlikely to be what your users want.

## Tell the browser about your manifest

Once you have the manifest created and and on your site, all you need to do is add a link tag to all the pages that encompass your web app as follows.

{% highlight html %}
<link rel="manifest" href="/manifest.json">
{% endhighlight %}

## Create great app icons for the device

When a user adds your site to their homescreen, you can define a set of icons for the browser to use.

The icons for your web app can be defined as above, with a type, size and density, but you don't have to define all of these, you can define just sizes and the image src.

{% highlight json %}
"icons": [{
    "src": "images/touch/icon-128x128.png",
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

<div class="clear g-wide--full">
    <figure>
        <img src="images/homescreen-icon.png" alt="Add to Homescreen Icon">

        <figcaption>Add to Homescreen Icon</figcaption>
    </figure>
</div>

<div class="clear"></div>

## Configure how your site is lauched

You make your WebApp hide the browsers UI by defining the *display* type to *standalone*.

{% highlight json %}
"display": "standalone"
{% endhighlight %}

Don't worry, if you think users would prefer to view your page as a normal site in a browser, you can use the browser display type.

{% highlight json %}
"display": "browser"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-display-options.png" alt="web-app-capable">

        <figcaption>Manifest Display Options</figcaption>
    </figure>
</div>

<div class="clear"></div>

## Define the initial orientation of the page

You can enforce a specific orientation, which is really useful for some use cases like games, which may only work in landscape. However, this should be used with care. Users prefer being able to view apps in both orientations.

{% highlight json %}
"orientation": "landscape"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-orientation-options.png" alt="WebApp Manifest Orientation Options">

        <figcaption>WebApp Manifest Orientation Options</figcaption>
    </figure>
</div>

<div class="clear"></div>

## Is it safe to use today. A.K.A Browser Support

Yes.  This is a progressive feature that if you support, users of browsers that can handle this feature will
get a better experience.  If the browser doesn't support the manifest then users are not stopped from using the
site.

As of Nov 2014 Chrome has implemented the manifest. Mozilla are implementing and [IE is exploring the area](https://status.modern.ie/webapplicationmanifest?term=manifest).

{% include modules/nextarticle.liquid %}

{% endwrap %}
