---
layout: article
title: "简化描绘的复杂度、减小描绘区域"
description: "描绘，是填充像素的过程，这些像素将最终显示在用户的屏幕上。通常，这个过程是整个渲染流水线中耗时最长的一环，因此也是最需要避免发生的一环。"
introduction: "描绘，是填充像素的过程，这些像素将最终显示在用户的屏幕上。通常，这个过程是整个渲染流水线中耗时最长的一环，因此也是最需要避免发生的一环。"
article:
  written_on: 2015-03-20
  updated_on: 2015-03-20
  order: 4
collection: rendering-performance
priority: 0
authors:
  - paullewis
notes:
  highdpi:
    - "在DPI较高的屏幕上，固定定位的元素会自动地被提升到一个它自有的渲染层中。但在DPI较低的设备上却并非如此，因为这个渲染层的提升会使得字体渲染方式由子像素变为灰阶（请参考：[Text Rendering](http://www.html5rocks.com/en/tutorials/internals/antialiasing-101/?redirect_from_locale=zh#toc-text-rendering)），我们需要手动实现渲染层的提升。"

key-takeaways:
  - Changing any property apart from transforms or opacity always triggers paint.
  - Paint is often the most expensive part of the pixel pipeline; avoid it where you can.
  - Reduce paint areas through layer promotion and orchestration of animations.
  - Use the Chrome DevTools paint profiler to assess paint complexity and cost; reduce where you can.


---
{% wrap content%}

{% include modules/takeaway.liquid list=page.key-takeaways %}

If you trigger layout, you will _always trigger paint_, since changing the geometry of any element means its pixels need fixing!

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg" class="g--centered" alt="The full pixel pipeline.">

You can also trigger paint if you change non-geometric properties, like backgrounds, text color, or shadows. In those cases layout won’t be needed and the pipeline will look like this:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg" class="g--centered" alt="The pixel pipeline without layout.">

## Use Chrome DevTools to quickly identify paint bottlenecks

You can use Chrome DevTools to quickly identify areas that are being painted. Go to DevTools and hit the escape key on your keyboard. Go to the rendering tab in the panel that appears and choose “Show paint rectangles”:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles.jpg" class="g--centered" alt="The show paint rectangles option in DevTools.">

With this option switched on Chrome will flash the screen green whenever painting happens. If you’re seeing the whole screen flash green, or areas of the screen that you didn’t think should be painted, then you should dig in a little further.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles-green.jpg" class="g--centered" alt="The page flashing green whenever painting occurs.">

There’s an option in the Chrome DevTools timeline which will give you more information: a paint profiler. To enable it, go to the Timeline and check the “Paint” box at the top. It’s important to _only have this switched on when trying to profile paint issues_, as it carries an overhead and will skew your performance profiling. It’s best used when you want more insight into what exactly is being painted.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-toggle.jpg" class="g--centered" alt="The toggle to enable paint profiling in Chrome DevTools.">

From here you can now run a Timeline recording, and paint records will carry significantly more detail. By clicking on a paint record in a frame you will now get access to the Paint Profiler for that frame:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-button.jpg" class="g--centered" alt="The button to bring up the paint profiler.">

Clicking on the paint profiler brings up a view where you can see what got painted, how long it took, and the individual paint calls that were required:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler.jpg" class="g--centered" alt="Chrome DevTools Paint Profiler.">

This profiler lets you know both the area and the complexity (which is really the time it takes to paint), and both of these are areas you can look to fix if avoiding paint is not an option.

## Promote elements that move or fade

Painting is not always done into a single image in memory. In fact, it’s possible for the browser to paint into multiple images, or compositor layers, if necessary.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/layers.jpg" class="g--centered" alt="A representation of compositor layers.">

The benefit of this approach is that elements that are regularly repainted, or are moving on screen with transforms, can be handled without affecting other elements. This is the same as with art packages like Sketch, GIMP, or Photoshop, where individual layers can be handled and composited on top of each other to create the final image.

The best way to create a new layer is to use the `will-change` CSS property. This will work in Chrome, Opera and Firefox, and, with a value of `transform`, will create a new compositor layer:

{% highlight css %}
.moving-element {
  will-change: transform;
}
{% endhighlight %}

For browsers that don’t support `will-change`, but benefit from layer creation, such as Safari and Mobile Safari, you need to (mis)use a 3D transform to force a new layer:

{% highlight css %}
.moving-element {
  transform: translateZ(0);
}
{% endhighlight %}

Care must be taken not to create too many layers, however, as each layer requires both memory and management. There is more information on this in the [Stick to compositor-only properties and manage layer count](stick-to-compositor-only-properties-and-manage-layer-count) section.

If you have promoted an element to a new layer, use DevTools to confirm that doing so has given you a performance benefit. **Don't promote elements without profiling.**

## Reduce paint areas

Sometimes, however, despite promoting elements, paint work is still necessary. A large challenge of paint issues is that browsers union together two areas that need painting, and that can result in the entire screen being repainted. So, for example, if you have a fixed header at the top of the page, and something being painted at the bottom the screen, the entire screen may end up being repainted.

{% include modules/remember.liquid title="Note" list=page.notes.highdpi %}

Reducing paint areas is often a case of orchestrating your animations and transitions to not overlap as much, or finding ways to avoid animating certain parts of the page.

## Simplify paint complexity
When it comes to painting, some things are more expensive than others. For example, anything that involves a blur (like a shadow, for example) is going to take longer to paint than -- say -- drawing a red box. In terms of CSS, however, this isn’t always obvious: `background: red;` and `box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);` don’t necessarily look like they have vastly different performance characteristics, but they do.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/profiler-chart.jpg" class="g--centered" alt="The time taken to paint part of the screen.">

The paint profiler above will allow you to determine if you need to look at other ways to achieve effects. Ask yourself if it’s possible to use a cheaper set of styles or alternative means to get to your end result.

Where you can you always want to avoid paint during animations in particular, as the **10ms** you have per frame is normally not long enough to get paint work done, especially on mobile devices.

{% include modules/nextarticle.liquid %}

{% endwrap%}
