


When a user adds your site to their home screen, you can define a set of icons for the 
browser to use. The icons for your web app can be defined as shown below, with a type, size, and optional
density.

{% highlight json %}
"icons": [{
    "src": "images/touch/icon-128x128.png",
    "type": "image/png",
    "sizes": "128x128"
  }, {
    "src": "images/touch/apple-touch-icon.png",
    "type": "image/png",
    "sizes": "152x152"
  }, {
    "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "type": "image/png",
    "sizes": "144x144"
  }, {
    "src": "images/touch/chrome-touch-icon-192x192.png",
    "type": "image/png",
    "sizes": "192x192"
  }],
{% endhighlight %}

{% include shared/note.liquid list=page.notes.icons %}

<figure>
  <img src="images/homescreen-icon.png" alt="Add to Home Screen Icon">
  <figcaption>Add to Home Screen Icon</figcaption>
</figure>



