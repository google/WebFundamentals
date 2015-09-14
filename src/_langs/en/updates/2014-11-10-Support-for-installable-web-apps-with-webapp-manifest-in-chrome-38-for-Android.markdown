---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2014-11-10

title: "Installable Web Apps with the WebApp Manifest in Chrome for Android"
description: "Use the WebApp manifest to control how your web app launches"
article:
  written_on: 2014-11-10
  updated_on: 2015-08-28
authors:
  - paulkinlan
tags:
  - mobile
  - apps
  - frontend
permalink: /updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android.html
---

*Note:* This article is pretty old now and a deeper version of the guidance is available in our
[Device Access section](/web/fundamentals/device-access/stickness/web-app-manifest.html).

For Web Apps to be successful they need to work as the user would expect an native application to work. The ability for the developer to control how their web app is launched is just one part of the UX that needs to be solved.  

The [manifest for Web applications](https://w3c.github.io/manifest/) is a simple JSON file that gives you, the developer, the ability to control how your app appears to the user in the areas where they would expect to see apps (for example the mobile home screen), direct what the user can launch and more importantly *how* they can launch it.  In the future the manifest will give you even more control over your app, but right now we are just focusing on how your app can be launched.

Chrome has had support for manifests since version 38 for Android (October 2014) and it gives you the control over how your web app appears when it is installed to the home screen via the `short_name`, `name` and `icons` properties and how it should be launched when the user clicks on the launch icon with the `start_url`, `display` and `orientation`.  Check out [our sample](https://github.com/GoogleChrome/samples/tree/gh-pages/web-application-manifest) to see this in action.

# Deploying the manifest

To integrate the manifest in to your own site you just need to do two things:

1.  Create and deploy a manifest file.
2.  Add a `link` element from the pages in your app pointing to the manifest file.

## Creating the manifest

You can call the manifest whatever you want.  Most people will probably just use `manifest.json`.

{% highlight json %}
{
  "short_name": "Kinlan's Amaze App",
  "name": "Kinlan's Amazing Application ++",
  "icons": [
    {
      "src": "launcher-icon-2x.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "launcher-icon-3x.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "start_url": "/index.html",
  "display": "standalone",
  "orientation": "landscape"
}
{% endhighlight %}

Some interesting points in Chrome's implementation:

*  The `short_name` is preferred over `name` and if provided will be used.
*  If you don't supply a `start_url` it will use the current page's url.
*  Chrome [first looks for icons](https://code.google.com/p/chromium/codesearch#chromium/src/chrome/browser/manifest/manifest_icon_selector.cc&l=68) that match the density of the display and are sized to [48dp * screen density](https://code.google.com/p/chromium/codesearch#chromium/src/chrome/browser/android/shortcut_data_fetcher.cc&l=35). If none are found it searches for the icon that most closely matches the device characteristics. If, for whatever reason, you want be specific about targetting an icon at a particular-pixel density, you can use the optional [`density` member](http://w3c.github.io/manifest/#density-member) which takes a number. When you don't declare `density`, it defaults to `1.0`. This means "use this icon for screen densities 1.0 and up", which is normally what you want.

{% highlight json %}
{
  "src": "launcher-icon-2x.png",
  "sizes": "96x96",
  "type": "image/png",
  "density": 2
}
{% endhighlight %}

## Telling the browser about your manifest

Once you have the manifest created and it is hosted on your site all you need to do is add a `link` tag from all your pages that encompass your app as follows.

{% highlight html %}
<link rel="manifest" href="/manifest.json">
{% endhighlight %}

That's it.

# What every developer should do today

This feature is entirely progressive and allows you create better, more integrated experiences for users that are using a browser that supports the feature.  As of Nov 2014 Chrome has implemented the manifest, Mozilla are implementing and [IE is exploring the area](https://status.modern.ie/webapplicationmanifest?term=manifest).

When a user adds your site or app to the home screen there is an intent by the user to treat it like an app.  This means you should aim to direct the user to the functionality of your app rather than a product landing page, for example if the user is required to sign-in to your app then that is a good page to launch in to.

For every type of app you are always going to do the following:

*  Create the manifest
*  Create beautiful icons
*  Set the start_url

## Utility Apps

The majority of utility apps will benefit from this immediately.  You are more than likely going to want to launch as a standalone experience much like every other app on a mobile platform. Tell it to launch `standalone`

{% highlight javascript %}
"display": "standalone"
{% endhighlight %}

## Games 

The majority of games will benefit from a manifest immediately.  The vast majority of games will want to launch full-screen straight away and be forced into a [specific orientation](https://w3c.github.io/screen-orientation/#idl-def-OrientationLockType).

If you are developing a vertical scroller or a game like Flappy Birds then you will most likely want your game to always be in portrait mode.

{% highlight javascript %}
"display": "fullscreen",
"orientation": "portrait"
{% endhighlight %}

If on the other-hand you are building a puzzler or a game like X-Com then you will probably want the game to always be in the landscape orientation.

{% highlight javascript %}
"display": "fullscreen",
"orientation": "landscape"
{% endhighlight %}

## News Sites

News sites in most cases are pure content based experiences.  Most developers naturally wouldn't think of adding a manifest to a news site however.

If you want your site to have all the Browser Chrome that you would expect a content site to have you can set the display to `browser`.

{% highlight javascript %}
"display": "browser"
{% endhighlight %}

Taking a look at native apps, the majority of News based apps treat their experiences as Apps and remove all web-like chrome from their experiences.  This is easy to do by setting `display` to `standalone`.

{% highlight javascript %}
"display": "standalone"
{% endhighlight %}

# Detecting if you are launched from the home screen

A question that keeps popping up about Chrome's implementation of "mobile-web-app-capable" is: How can I tell if
I am running as launched from the home screen?  On iOS you can use `navigator.standalone` to see if it is running
like a native app, but we don't have this on Chrome for Android.

A naive approach is: Because you can now define how your app is launched, add a query string parameter to your `start_url` that indicates how it was launched.  For example `start_url: /index.html?homescreen=1`.  This will help in some cases but it is not infallible.

# Learning More

Check out Chrome's guidance for [Add to home screen](https://developer.chrome.com/multidevice/android/installtohomescreen#supporting) the [HTML5Doctor](http://html5doctor.com/web-manifest-specification/) for a deeper dive in 
to where the future of the spec and implementations will be

## Diving deep

Let's face it, the majority of us love to see under the hood about how a feature is implemented, it lets us learn more about the systems and also helps us track when changes occur that might give us early access to new features for our users.

If like me your are interested about how this is implemented in Chrome here are some useful links:

*  The [logic for extracting the data](https://code.google.com/p/chromium/codesearch#chromium/src/chrome/browser/android/shortcut_helper.cc&sq=package:chromium&q=file:shortcut_helper.cc&l=1) from the manifest and managing how to use the fallback
*  Check [OnDidGetManifest](https://code.google.com/p/chromium/codesearch#chromium/src/chrome/browser/android/shortcut_helper.cc&l=233) - This is where Chrome does all the grunt work and you can see what parameters are supported.
*  The code for showing the [Add to home screen UI](https://code.google.com/p/chromium/codesearch#chromium/src/chrome/android/java/src/org/chromium/chrome/browser/webapps/AddToHomescreenDialog.java&sq=package:chromium)

# We crave feedback

This spec is a critical part in bringing Web Apps to all users and we need your feedback. You can help us in a number of ways:

*  Add it to your site and tell us what needs work and what works well (adding comments here is a good start).
*  Let us know good practice you have discovered
*  [Contribute to the specification](https://w3c.github.io/manifest/) and give the team feedback.
