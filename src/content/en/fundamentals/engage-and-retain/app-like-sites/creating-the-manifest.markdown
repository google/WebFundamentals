---
layout: shared/narrow
title: "Create the manifest"
description: "Before diving into details, let's create a basic manifest link a web page to it."
published_on: 2014-12-17
updated_on: 2015-02-12
authors:
  - mattgaunt
  - paulkinlan
translation_priority: 1
order: 2
---

Before diving into details, let's create a basic manifest link a web page to it.

{% include shared/toc.liquid %}

## Create the manifest

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