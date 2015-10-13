---
layout: updates/post
title: "Use mediump precision in WebGL when possible"
published_on: 2011-12-08
updated_on: 2011-12-08
authors:
  - ilmariheikkinen
tags:
  - news
  - mobile
  - performance
  - webgl
  - graphics
---
Heads-up from our friends at Opera, who have been testing WebGL on actual OpenGL ES 2.0 hardware: many demos and applications use highp precision in fragment shaders when it's not really warranted.

Highp in fragment shaders is an optional part of the OpenGL ES 2.0 spec, so not all hardware supports it (and even when they do, there "may be a performance hit":http://my.opera.com/emoller/blog/2011/10/18/all-hail-ios-5). Using mediump will usually be good enough and it will ensure that your applications will work on mobile devices as well.

In practice, if your fragment shader previously started with

{% highlight javascript %}
precision highp float;
{% endhighlight %}

Changing it to the following should do the trick:

{% highlight javascript %}
precision mediump float; // or lowp
{% endhighlight %}
