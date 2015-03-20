---
layout: article
title: "Avoid large, complex layouts and layout thrashing"
description: "When the browser has figured out which styles apply to which elements it must now calculate the geometric information for those elements: their size and location in the page. Each element will have explicit or implicit sizing information based on the CSS that was used, or based on the contents of the element. The process is called Layout in Blink, WebKit browsers, and Internet Explorer. In Gecko browsers like Firefox it’s called Reflow, but effectively these processes are the same."
introduction: "When the browser has figured out which styles apply to which elements it must now calculate the geometric information for those elements: their size and location in the page. Each element will have explicit or implicit sizing information based on the CSS that was used, or based on the contents of the element. The process is called Layout in Blink, WebKit browsers, and Internet Explorer. In Gecko browsers like Firefox it’s called Reflow, but effectively these processes are the same."
article:
  written_on: 2015-03-20
  updated_on: 2015-03-20
  order: 3
collection: rendering-performance
priority: 7
authors:
  - paullewis
notes:
  tree:
    - "Internally to the browser there is a render tree, which is created from the DOM, and is a representation of all the items that need to be drawn to the device’s screen. It contains all the visual information about the elements: colors, dimensions, location, etc. If an element has a style of display: none, however, it won’t be in the render tree. Equally if an element has a pseudo element (:after, :before) then those will not exist in the DOM, but will exist in the render tree."
  csstriggers:
    - Want a definitive list of which CSS properties trigger layout, paint, or composite? Check out <a href="http://csstriggers.com/">CSS Triggers</a>.

key-takeaways:
  - Layout is normally scoped to the whole document.
  - The number of DOM elements will affect performance; you should avoid triggering layout wherever possible.
  - Assess layout model performance; new Flexbox is typically faster than older Flexbox or float-based layout models.
  - Avoid forced synchronous layouts and layout thrashing; read style values then make style changes.


---
{% wrap content%}

{% include modules/takeaway.liquid list=page.key-takeaways %}

Similarly to style calculations, the immediate concerns for layout cost are:

1. The number of elements that require layout.
2. The complexity of those layouts.

## Avoid layout wherever possible

When you change styles the browser checks to see if any of the changes require layout to be calculated, and for that render tree to be updated. Changes to “geometric properties”, such as widths, heights, left, or top all require layout.

{% include modules/remember.liquid title="Note" list=page.notes.tree %}

**Layout is almost always scoped to the entire document.** If you have a lot of elements, it’s going to take a long time to figure out the locations and dimensions of all the elements.

If it’s not possible to avoid layout then the key is to once again use Chrome DevTools to see how long it’s taking, and determine if layout is the cause of a bottleneck. Firstly, open DevTools, go to the Timeline tab, hit record and interact with your site. When you stop recording you’ll see a breakdown of how your site performed:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/big-layout.png" alt="DevTools showing a long time in Layout" />

When digging into the frame in the above example, we see that over 20ms is spent inside layout, which, when we have 16ms to get a frame on screen in an animation, is far too high. You can also see that DevTools will tell you the tree size (1,618 elements in this case), and how many nodes were in need of layout.

{% include modules/remember.liquid title="Note" list=page.notes.csstriggers %}

## Use flexbox over older layout models
The web has a range of layout models, some being more widely supported than others. An older CSS layout model that is ubiquitous allows us to position elements on screen using relatively, absolutely, as well as by floating elements.

The screenshot below uses that exact model and has a (contrived) example of 1,300 boxes, all of which are floated.

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-float.png" alt="Using floats as layout" />

If we update that model to use a more recent addition to the web platform, flexbox, to see how it compares when layout is triggered, we get a different picture:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-flex.png" alt="Using flexbox as layout" />

Now we spend far less time (3.5ms vs 14ms) in layout for the same number of elements. It’s important to remember that for some contexts you may not be able to choose flexbox, since it’s [less widely supported than floats](http://caniuse.com/#search=flexbox), but where you can you should at least investigate the layout model’s impact on your performance, and go with the one that minimizes the cost of performing it.

In any case, however, you should still try and avoid triggering layout altogether!

## Avoid forced synchronous layouts
Shipping a frame to screen looks like this:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/frame.png" alt="Using flexbox as layout" />

Notably the JavaScript runs, _then_ style calculations, _then_ layout. It is, however, possible to force a browser to perform layout earlier, via JavaScript, and this is called a **forced synchronous layout**.

The first thing to keep in mind is that as the JavaScript runs all the old layout values from the previous frame are known and available for the elements we might query. So if, for example, you want to write out the height of an element (let’s call it “box”) at the start of the frame you may write some code like this:

{% highlight javascript %}
// Schedule our function to run at the start of the frame.
requestAnimationFrame(logBoxHeight);

function logBoxHeight() {
  // Gets the height of the box in pixels and logs it out.
  console.log(box.offsetHeight);
}
{% endhighlight %}

Things get problematic if you’ve changed the styles of the box _before_ you ask for its height:

{% highlight javascript %}
function logBoxHeight() {

  box.classList.add('super-big');

  // Gets the height of the box in pixels and logs it out.
  console.log(box.offsetHeight);
}
{% endhighlight %}

Now, in order to answer the height question, the browser must first apply the style change (because of adding the “super-big” class), and then run layout. Only then will it be able to return the correct height.

Because of this you should always batch your style reads and do them first (where the browser can use the previous frame’s layout values) and then do any writes:

Done correctly the above function would be:

{% highlight javascript %}
function logBoxHeight() {
  // Gets the height of the box in pixels and logs it out.
  console.log(box.offsetHeight);

  box.classList.add('super-big');
}
{% endhighlight %}

For the most part you shouldn’t need to apply styles and then query values; using the last frame’s values should be sufficient. Running the style calculations and layout synchronously and earlier than the browser would like are potential bottlenecks, and not something you will typically want to do.

## Avoid layout thrashing
There’s a way to make forced synchronous layouts even worse: do lots of them in quick succession. It’s surprisingly easy to do. Take a look at this code:

{% highlight javascript %}
function resizeAllParagraphsToMatchBlockWidth() {
  for (var i = 0; i < paragraphs.length; i++) {
     paragraphs[i].style.width = box.offsetWidth + 'px';
  }
}
{% endhighlight %}

This code loops over a group of paragraphs and sets each paragraph’s width to match the width of an element called “box”, and it looks harmless enough. The problem is that each iteration of the loop reads a style value (`box.offsetWidth`) and then uses it to update the width of a paragraph (`paragraphs[i].style.width`). On the next iteration of the loop, the browser has to account for the fact that styles have changed since offsetWidth was requested in the last iteration, and so it must apply the style changes, and run layout. This will happen on _every single iteration!_

If you want to guarantee safety you should check out [FastDOM](https://github.com/wilsonpage/fastdom), which automatically batches your reads and writes for you, and should prevent you from triggering forced synchronous layouts or layout thrashing accidentally.

{% include modules/nextarticle.liquid %}

{% endwrap%}
