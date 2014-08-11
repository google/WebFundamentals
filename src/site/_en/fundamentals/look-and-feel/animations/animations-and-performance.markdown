---
layout: article
title: "Animations and Performance"
description: "Animations must perform well, otherwise they will negatively impact the user experience."
introduction: "Care must be taken to maintain 60fps whenever you are animating, because any stutters or stalls will be noticeable to your users and negatively impact their experiences."
article:
  written_on: 2014-08-08
  updated_on: 2014-08-08
  order: 3
id: animations-and-performance
collection: animations
key-takeaways:
  code:
    - Take care that your animations don’t cause performance issues; ensure you know the impact of animating a given CSS property.
    - Animating properties that change the geometry of the page (layout)or cause painting are particularly expensive.
    - Where you can stick to changing transforms and opacity.
    - Use <code>will-change</code> to ensure that the browser knows what you plan to animate.


authors:
  - paullewis
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.code %}

## High Performance Animations

 Animating properties is not free, and some properties are cheaper to animate than others. For example, animating the width and height of an element changes the geometry of the element and may cause other elements on the page to move or change size. This process is called layout, and can be expensive if your page has a lot of elements. Whenever layout is triggered, the page or part of it will normally need to be painted, which is typically even more expensive than the layout operation.

Where you can, you should avoid animating properties that trigger layout or paint. For most modern browsers this means animating just opacity or transform, both of which can be highly optimized by the browser, and it doesn’t matter if the animation is handled by JavaScript or CSS.

For a full list of the work triggered by individual CSS properties can be found at [CSS Triggers](http://csstriggers.com), and you can find a full guide on creating [High Performance Animations on HTML5 Rocks](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/).

### Using the will-change property

It is worth using [`will-change`](http://dev.w3.org/csswg/css-will-change/) to ensure the browser knows that you intend to change an element’s property. This allows the browser to put the most appropriate optimizations in place ahead of you making the change. Care must be taken to not overuse will-change, however, as it can cause the browser to waste resources, which will in turn cause performance issues.

The general rule of thumb is that if the animation could be triggered in the next 200ms, either by a user’s interaction or because of your application’s state, then having will-change on animating elements is a good idea. For most cases, then, any element in your app’s current view that you intend to animate should have will-change set for whichever properties you plan to change. In the case of the box sample we’ve been using throughout this guide, adding will-change would give us:

{% highlight css %}
.box {
  will-change: transform;
}
{% endhighlight %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
