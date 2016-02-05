---
layout: shared/narrow
title: "Using app install banners"
description: "App Install Banners give you the ability to have your users quickly and seamlessly add your web app to their home screen, or install your native app, without ever leaving the browser."
published_on: 2014-12-17
updated_on: 2015-11-13
authors:
  - mattgaunt
  - paulkinlan
translation_priority: 1
order: 1
---

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p class="intro">
      App Install Banners give you the ability to have your users quickly and 
      seamlessly add your web app to their home screen, or install your native
      app, without ever leaving the browser.
    </p>
    <p>
      <i>"This looks great, I want it on my site!"</i>
    </p>
    <p>
      <i>"Please tell me how to add it!"</i>
    </p>
    <p>
      Adding app install banners is easy, and Chrome handles most of the heavy
      lifting for you. You'll need to include a web app manifest file in
      your site with details about your app.
    </p>
    <p>
      Chrome then uses a set of criteria and visit frequency heuristics to 
      determine when to show the banner. Read on for more details.
    </p>
  </div>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/add-to-home-screen.gif" alt="Web app install banner">
    <figcaption>Web app install banner flow</figcaption>
  </figure>
</div>



{% include shared/toc.liquid %}

### Manifest for web applications

The [manifest for Web applications](https://developer.mozilla.org/en-US/docs/Web/Manifest) is 
a simple JSON file that gives you, the developer, the ability to 
control how your app appears to the user in the areas that they would 
expect to see apps (for example the mobile home screen), direct what 
the user can launch and more importantly how they can launch it. 

## Creating the manifest

You can call the manifest whatever you want. Most people will probably just 
use `manifest.json`. An example is given below.

{% highlight json %}
{
  "short_name": "AirHorner",
  "name": "Kinlan's AirHorner of Infamy",
  "icons": [
    {
      "src": "launcher-icon-1x.png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-2x.png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html?launcher=true"
}
{% endhighlight %}

You should include a `short_name` as this will get used for the launcher text.

If you don't provide a `start_url`, then the current page will be used, which is 
unlikely to be what your users want.

## Tell the browser about your manifest

Once you have the manifest created and and on your site, all you need to do is add 
a `link` tag to all the pages that encompass your web app as follows:

{% highlight html %}
<link rel="manifest" href="/manifest.json">
{% endhighlight %}


