---
layout: article
title: "Render Blocking CSS"
description: "By default CSS is treated as a render blocking resource, which means that the browser will hold rendering of any processed content until the CSSOM is constructed. Make sure to keep your CSS lean, deliver it as quickly as possible, and use media types and queries to unblock rendering."
introduction: "By default CSS is treated as a render blocking resource, which means that the browser will hold rendering of any processed content until the CSSOM is constructed. Make sure to keep your CSS lean, deliver it as quickly as possible, and use media types and queries to unblock rendering."
article:
  written_on: 2014-04-01
  updated_on: 2014-09-18
  order: 3
collection: critical-rendering-path
priority: 0
authors:
  - ilyagrigorik
related-guides:
  media-queries:
    -
      title: Use CSS media queries for responsiveness
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        title: "Responsive Web design"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
key-takeaways:
  render-blocking-css:
    - By default, CSS is treated as a render blocking resource.
    - Media types and media queries allow us to mark some CSS resources as non-render blocking.
    - All CSS resources, regardless of blocking or non-blocking behavior, are downloaded by the browser.
---
{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>


In the previous section we saw that the critical rendering path requires that we have both the DOM and the CSSOM to construct the render tree, which creates an important performance implication: **both HTML and CSS are render blocking resources.** The HTML is obvious, since without the DOM we would not have anything to render, but the CSS requirement may be less obvious. What would happen if we try to render a typical page without blocking rendering on CSS?

{% include modules/takeaway.liquid list=page.key-takeaways.render-blocking-css %}

<div class="clear">
  <div class="g--half">
    <b>NYTimes with CSS</b>
    <img class="center" src="images/nytimes-css-device.png" alt="NYTimes with CSS">

  </div>

  <div class="g--half g--last">
    <b>NYTimes without CSS (FOUC)</b>
    <img src="images/nytimes-nocss-device.png" alt="NYTimes without CSS">

  </div>
</div>

{% comment %}
<table>
<tr>
<td>NYTimes with CSS</td>
<td>NYTimes without CSS (FOUC)</td>
</tr>
<tr>
<td><img src="images/nytimes-css-device.png" alt="NYTimes with CSS" class="center"></td>
<td><img src="images/nytimes-nocss-device.png" alt="NYTimes without CSS" class="center"></td>
</tr>
</table>
{% endcomment %}

The above example, showing the NYTimes website with and without CSS, demonstrates why rendering is blocked until CSS is available - without CSS the page is effectively unusable. In fact, the experience on the right is often referred to as a "Flash of Unstyled Content" (FOUC). As a result, the browser will block rendering until it has both the DOM and the CSSOM.

> **_CSS is a render blocking resource, get it down to the client as soon and as quickly as possible to optimize the time to first render!_**

However, what if we have some CSS styles that are only used under certain conditions, for example, when the page is being printed, or being projected onto a large monitor? It would be nice if we didn’t have to block rendering on these resources!

CSS "media types" and "media queries" allow us to address these use-cases:

{% highlight html %}
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
{% endhighlight %}

A [media query]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html) consists of a media type and zero or more expressions that check for the conditions of particular media features. For example, our first stylesheet declaration does not provide any media type or query, hence it will apply in all cases - that is to say, it is always render blocking. On the other hand, the second stylesheet will only apply when the content is being printed - perhaps you want to rearrange the layout, change the fonts, etc - and hence this stylesheet does not need to block the rendering of the page when it is first loaded. Finally, the last stylesheet declaration provides a "media query" which is executed by the browser: if the conditions match, the browser will block rendering until the stylesheet is downloaded and processed.

By using media queries, our presentation can be tailored to specific use cases such as display vs. print, and also to dynamic conditions such as changes in screen orientation, resize events, and more. **When declaring your stylesheet assets, pay close attention to the media type and queries, as they will have big performance impact on the critical rendering path!**

{% include modules/related_guides.liquid inline=true list=page.related-guides.media-queries %}

Let's consider some hands-on examples:

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="screen">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

* The first declaration is render blocking and matches in all conditions.
* The second declaration is also render blocking: "screen" is the default type and if you don’t specify any type, it’s implicitly set to "screen". Hence, the first and second declarations are actually equivalent.
* The third declaration has a dynamic media query which will be evaluated when the page is being loaded. Depending on the orientation of the device when the page is being loaded, portrait.css may or may not be render blocking.
* The last declaration is only applied when the page is being printed, hence it is not render blocking when the page is first loaded in the browser.

Finally, note that "render blocking" only refers to whether the browser will have to hold the initial rendering of the page on that resource. In either case, the CSS asset is still downloaded by the browser, albeit with a lower priority for non-blocking resources.

{% include modules/nextarticle.liquid %}

{% endwrap%}
