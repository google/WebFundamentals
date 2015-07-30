---
layout: article
title: "Hide the Browser UI"
description: "Your users can add your site to the home screen without any special code, but we recommend that you make your web app display without the browser UI when launched from the home screen (effectively going fullscreen)."
introduction: "Your users can add your site to the home screen without any special code, but we recommend that you make your web app display without the browser UI when launched from the home screen (effectively going fullscreen)."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 2
id: hide-browser-ui
collection: stickyness
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

Add the following code to the `<head>` of your page:

{% highlight html %}
<meta name="apple-mobile-web-app-capable" content="yes">
{% endhighlight %}


This will tell Mobile Safari that it's dealing 
with a web app.

Internet Explorer doesn't require instructions for this, as 
sites will launch fullscreen by default

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/web-app-capable.png" alt="web-app-capable">
        
        <figcaption>Launching a Site with Web App Capable Meta Tag</figcaption>
    </figure>
</div>

<div class="clear"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
