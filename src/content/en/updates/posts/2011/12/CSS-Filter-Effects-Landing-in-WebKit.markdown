---
layout: updates/post
title: "CSS Filter Effects Landing in WebKit"
published_on: 2011-12-22
updated_on: 2011-12-22
authors:
  - ericbidelman
tags:
  - news
  - presentation
  - css
  - filters
  - graphics
---
### Background

Filter effects have been around for awhile but were [designed](http://www.w3.org/TR/SVG/filters.html) to work in SVG. They're fantastically powerful at applying effects like color intensity, warping, or blurring to an image before it's composited and rendered into the document.

Well,...way back in 2009 Mozilla said SVG wasn't enough! They ended up taking filters one step further and [allowed them on HTML content](https://developer.mozilla.org/En/Applying_SVG_effects_to_HTML_content) in Firefox 3.5. Check out Paul Irish's timeless [demo](http://paulirish.com/work/videooo.xhtml) of SVG filters on a playing `<video>`. Again, only works in Firefox but still the bees knees.

### Today

Flash forward to the end of 2011 and Adobe (plus others) have been hard at work bringing this amazing technology to CSS. Specifically, I'm referring to [CSS Filter Effects 1.0](https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html), which WebKit has started to implement.

The magic happens with a new prefixed `filter' property in a style rule:

{% highlight CSS %}
/* gray all images by 50% and blur by 10px */
img {
  -webkit-filter: grayscale(0.5) blur(10px);
}
{% endhighlight %}

Enabling filters directly in CSS means that nearly any DOM element can take advantage of them! Images, `<video>`, `<canvas>`,... you name it. You can even <a href="javascript:document.body.style.webkitFilter='grayscale(0.5) blur(3px)';return false;">see what the web looks like without glasses</a>.

#### Demo

<figure><a href="http://html5-demos.appspot.com/static/css/filters/index.html"><img src="{{site.WFBaseUrl}}/updates/images/2011-12-22-css-filter-effects-landing-in-webkit/filter-effects-demo.jpg" style="border-radius:3px;border:1px solid #ccc;"></a></figure>

[Try it out!](http://html5-demos.appspot.com/static/css/filters/index.html) (works in Chrome Canary and WebKit nightlies)

### Future

The spec also defines [CSS shaders](http://www.adobe.com/devnet/html5/articles/css-shaders.html), which will eventually bring OpenGL shader technology to CSS. That's very VERY exciting! However, there are security considerations any time you open up the GPU of a system. For this reason, WebKit only has CSS filter functions implemented for now.

### Support

Chrome 18.0.976.0 (currently canary), Webkit nightly

In Webkit nightlies, filters can be applied to hardware accelerated content ( e.g. `img { -webkit-transform: translateZ(0); }` ). In Chrome, filters on accelerated content are still a work in progress (use the `--enable-accelerated-filters` flag). This includes `<video>`, which is accelerated by default.
