---
layout: article
title: "Render Blocking CSS"
description: "Delivering a fast web experience requires a lot of work by the browser. 
  Most of this work is hidden from us as web developers: we write the markup, and a nice 
  looking page comes out on the screen. But how exactly does the browser go from 
  consuming our HTML, CSS, and JavaScript to rendered pixels on the screen?"
introduction: "Delivering a fast web experience requires a lot of work by the browser. 
  Most of this work is hidden from us as web developers: we write the markup, and a nice 
  looking page comes out on the screen. But how exactly does the browser go from 
  consuming our HTML, CSS, and JavaScript to rendered pixels on the screen?"
article:
  written_on: 2014-01-01
  updated_on: 2014-01-05
  order: 3
collection: critical-path-rendering
key-takeaways:
  render-blocking-css:
    - By default CSS is treated as a render blocking resource
    - Media types and media queries allow us to mark some CSS resources as non render blocking
    - All CSS resources, regardless of blocking or non-blocking behavior are downloaded by the browser
  adding-interactivity:
    - JavaScript can query and modify DOM and CSSOM
    - JavaScript execution blocks on CSSOM
    - JavaScript blocks DOM construction unless explicitly declared as async</td>
  measure-crp:
    - Navigation Timing provides high resolution timestamps for measuring CRP.
    - Browser emits series of consumable events which capture various stages of the CRP.
---
{% wrap content%}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.render-blocking-css %}


In the previous section we saw that the critical rendering path requires that we 
have both the DOM and the CSSOM to construct the render tree, which creates an 
important performance implication: **both HTML and CSS are render blocking 
resources. **The HTML is obvious, since without the DOM we would not have 
anything to render, but the CSS requirement may be less so. What would happen if 
we try to render a typical page without blocking rendering on CSS?

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>NYTimes with CSS</td>
<td>NYTimes without CSS (FOUC)</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
</table>

Above example with the NYTimes website illustrates the difference for a typical 
website with and without the CSS: it's dramatic. In fact, the experience on the 
right is often referred to as a "Flash of Unstyled Content" (FOUC), and for 
obvious reasons is not a good one for the user. As a result, the browser will 
block rendering until it has both the DOM and the CSSOM. 

> **_"CSS is a render blocking resource, get it down to the client as soon and 
> as quickly as possible to optimize the time to first render!"_**

However, what if we have some CSS styles that are only used under certain 
conditions, for example, when the page is being printed, or being projected onto 
a large monitor? It would be nice if we didn't have to block rendering on these 
resources!  

CSS "media types" and "media queries" allow us to address this very use case:

    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">


A media query consists of a media type and zero or more expressions that check 
for the conditions of particular media features. For example, our first 
stylesheet declaration does not provide any media type or query, hence it will 
apply in all cases - that is to say, it is always render blocking. On the other 
hand, the second stylesheet will only apply when the content is being printed - 
perhaps you want to rearrange the layout, change the fonts, etc - and hence does 
not need to block the rendering of the page when it is first loaded. Finally, 
the last stylesheet declaration provides a "media query" which is executed by 
the browser: if the conditions match, the browser will block rendering until the 
stylesheet is downloaded and processed.

By using media queries our presentation can be tailored to specific use cases 
such as display _vs._ print, and also to dynamic conditions such as changes in 
screen orientation, resize events, and more. **When declaring your stylesheet 
assets, pay close attention to the media type and queries, as they will have big 
performance impact on the critical rendering path!**

Let's consider some hands-on examples:

    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="screen">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print"></td>


* First declaration is render blocking and matches in all conditions.
* Second declaration is also render blocking: "screen" is the default type and 
  if you don't specify any type, it's implicitly set to "screen". Hence, first 
  and second declarations are actually equivalent.
* Third declaration has a dynamic media query which will be evaluated when the 
  page is being loaded. Depending on the orientation of the device when the page 
  is being loaded portrait.css may or may not be render blocking.
* Last declaration is only applied when the page is being printed, hence it is 
  not render blocking when the page is first loaded in the browser.

Finally, note that "render blocking" only refers to whether the browser will 
have to hold the initial rendering of the page on that resource. In either case, 
the CSS asset is still downloaded by the browser, albeit with a lower priority 
for non-blocking resources. 

{% include modules/nextarticle.liquid %}

{% endwrap%}
