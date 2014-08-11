---
layout: article
title: "Animating Between Views"
description: "Learn how to animate between two views in your apps."
introduction: "Many times you will want to move users between views in your application, whether that's a list to a details view, or show a sidebar navigation. Animations between these views are great for keeping the user engaged and add even more life to your projects."
article:
  written_on: 2014-08-08
  updated_on: 2014-08-08
  order: 5
collection: animations
id: animating-between-views
key-takeaways:
  code:
    - Use transitions to move between views; avoid using `left`, `top` or any other property that triggers layout.
    - Ensure any animations you use are snappy and the durations are kept short.
    - Consider how your animations and layouts change as the screen sizes go up; what works for a smaller screen may look odd when  used in a desktop context.
notes:
  sixtyfps:
    You should be aiming to maintain 60fps for all of your animations. That way your users will not experience stuttering animations that pull them out of their experience. Ensure that any animating element has will-change set for anything you plan to change well ahead of the animation starting. For view transitions, it’s highly likely you will want to use <code>will-change: transform</code>.
  flinging:
    "Making this kind of hierarchy in a cross-browser way can be challenging. For example, iOS requires additional an additional CSS property, <code>-webkit-overflow-scrolling: touch</code>, to ‘reenable’ fling scrolling, but you don’t get to control which axis that’s for, as you can with the standard overflow property. Be sure to test your implementation across a range of devices!"

authors:
  - paullewis
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.code %}

What these view transitions look and behave like will depend very much on the type of views you’re dealing with, so for example animating a modal overlay on top of a view should be a different experience to transitioning between a list and details view.

{% include modules/remember.liquid title="Note" list=page.notes.sixtyfps %}

## Use translations to move between views

To make life a bit easier let’s assume there are two views: a list view and a details view. As the user taps on a list item inside the list view the details view will slide in, and the list view will slide out.

<img src="imgs/gifs/view-translate.gif" alt="Translating between two views" />

To achieve this effect you will need a container for both views which has `overflow: hidden` set on it. That way the two views can both be inside it side-by-side without any horizontal scrollbars, and each view can slide side to side inside the container as needed.

<img src="imgs/container-two-views.svg" alt="View hierarchy." />

The CSS for the container is:

{% highlight css %}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
{% endhighlight %}

Notice how the position is `relative`. This will mean that each view inside the container can be positioned absolutely and moved around with transforms, which is better for performance and is typically easier to rationalize. An alternative would be to use the `left` property here, but since that will change the geometry of the page, and therefore trigger layout, it should be avoided at all costs:

{% highlight css %}
.view {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  /* let the browser know we plan to animate
     each view in and out */
  will-change: transform;
}
{% endhighlight %}

Adding a `transition` on the `transform` property provides a nice slide effect. To give it a nice feel it’s using a custom `cubic-bezier` curve, which we discussed in the [Custom Easing guide](custom-easing.html).

{% highlight css %}
.view {
  /* Prefixes are needed for Safari and other WebKit-based browsers */
  transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
  transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
}
{% endhighlight %}

The view that is offscreen should be translated to the right, so in this case the details view needs to be moved:

{% highlight css %}
.details-view {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
{% endhighlight %}

Now a small amount of JavaScript is necessary to set a class on the container, and this toggles the transforms of the two views.

{% highlight javascript %}
var container = document.querySelector('.container');
var backButton = document.querySelector('.back-button');
var listItems = document.querySelectorAll('.list-item');

/**
 * Toggles the class on the container so that
 * we choose the correct view.
 */
function onViewChange(evt) {
  container.classList.toggle('view-change');
}

// When you click on a list item bring on the details view.
for (var i = 0; i < listItems.length; i++) {
  listItems[i].addEventListener('click', onViewChange, false);
}

// And switch it back again when you click on the back button
backButton.addEventListener('click', onViewChange);
{% endhighlight %}

{% link_sample _code/inter-view-animation.html %}See sample.{% endlink_sample %}

You could expand this to cover multiple views, and the basic concept should remain the same; each non-visible view should be offscreen and brought on as needed, and the currently onscreen view should be moved off.

{% include modules/remember.liquid title="Note" list=page.notes.flinging %}

In addition to transitioning between views this technique can also be applied to other slide-in elements, like sidebar navigation elements. The only real difference is that you wouldn’t move the other views.

## Ensure your animation works with larger screens

For a larger screen you should keep the list view around all the time rather than removing it, and slide on the details view from the right hand side. It’s pretty much the same as dealing with a navigation view.

<img src="imgs/container-two-views-ls.svg" alt="View hierarchy on a large screen." />

{% include modules/nextarticle.liquid %}

{% endwrap %}
