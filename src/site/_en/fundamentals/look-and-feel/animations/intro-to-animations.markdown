---
layout: article
title: "Intro to Animations"
description: "Get a better understanding of animations and their use in modern apps and sites."
introduction: "Animations are increasingly a required part of making compelling web applications and sites. Users have come to expect highly responsive and interactive user interfaces. Animating your interface, however, is not necessarily straight forward. What should be animated, and when? What kind of feel should the animation have? How can you add life to your project without overwhelming your users?"
article:
  written_on: 2014-08-08
  updated_on: 2014-08-08
  order: 2
id: animations
collection: look-and-feel
key-takeaways:
  code:
    - Use animations as a way to add life to your projects.
    - Use CSS animations for simpler “one-shot” transitions, like toggling UI element states.
    - Use JavaScript animations when you want to have advanced effects like bouncing, stop, pause, rewind or slow-down.
    - If you choose to animate with JavaScript, go with TweenLite or, if you need more features, TweenMax.
    - Take care that your animations don’t cause performance issues; ensure you know the impact of animating a given CSS property.

notes:
  keyframes:
    - If you’re new to animations, keyframes are an old term from hand-drawn animations. Animators would create particular frames for a piece of action, called key frames, and then they would set about drawing all the individual frames between. We have a similar process today with CSS animations, where we instruct the browser what values CSS properties need to have at given points, and it fills in the gaps.
  setinterval:
    - You may see code around the web that uses setInterval or setTimeout for animations. This is a terrible idea, as the animation will not be synchronized to the refresh rate of the screen, and it’s highly likely to judder and skip. You should always avoid such code, and use requestAnimationFrame, which is synchronized properly, instead.

authors:
  - paullewis
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.code %}

## Properties to animate

Great animations add a layer of enjoyment and engagement to your projects for your users. Care must also be taken to maintain performance as it will be very noticeable should they stutter or skip, and potentially be worse than no animation at all.

You can animate pretty much anything you like, whether that’s widths, heights, positions, colors, backgrounds, but there are two major considerations:

1. **Animations should be in support of user interaction.** Don’t just animate something because you can. That just annoys users and feels obstructive. Use strategically placed animations to reinforce the user interactions. So if they tap on the menu icon, shoot the menu out of the side of the page, or if they tap a button, have it glow or bounce to acknowledge their interaction. Do not, under any circumstances, animate the entirety of your page.
2. **Not all animations are equal.** Some properties are more expensive to change than others. So, for example, changing the box-shadow of an element will require a much more expensive paint operation than changing -- say -- the text color. You can read more on the performance considerations of animations below, but if you want the TL;DR stick to transforms and opacity.

## Ways of animating

There are two primary ways to do animations on the web: using CSS and using JavaScript. There are pros and cons to each:

* **Use CSS when you have smaller, self-contained states for UI elements.** For example, CSS transitions and animations are ideal for bringing a navigation menu in from the side, or showing a tooltip.
* **Use JavaScript when you need significant control over your animations.** For example, something that tracks a touch position, or an animation that you need to stop, pause, slow-down or reverse.

### Animate with CSS

There’s no doubt that animating with CSS is the simplest way to get something moving:

{% highlight css %}
.box {
  -webkit-transform: translate(0, 0);
  -webkit-transition: -webkit-transform 1300ms;

  transform: translate(0, 0);
  transition: transform 1300ms;
}

.box:hover {
  -webkit-transform: translate(100px, 100px);
  transform: translate(100px, 100px);
}
{% endhighlight %}

Here we have a box element that we want to move 100px in both the X & Y axes on hover. To achieve this we use a CSS transition and declare that we would like the animation to take 1300 milliseconds.

{% link_sample _code/box-move-simple.html %}See sample{% endlink_sample %}

We have other options besides the time that the transition takes, such as how the animation feels as it animates. You can get more on that in the [“Easing and Natural Motion”]({{site.fundamentals}}/look-and-feel/animations/easing-and-natural-motion.html) guide.

If you create separate CSS classes to manage your animations, you can then use JavaScript to toggle each animation on and off:

{% highlight javascript %}
box.classList.add('expanded');
{% endhighlight %}

Doing this will provide a very nice balance to your apps. You can focus on managing state with JavaScript, and simply set the appropriate classes on the target elements. If you go down this route you can listen to transitionend events on the element, but only if you’re able to forego support for older versions of Internet Explorer; version 10 was the first version to support these events. All other browsers have supported the event for some time.

The JavaScript required to listen for the end of a transition looks like this:

{% highlight javascript %}
var box = document.querySelector('.box');
box.addEventListener('transitionend', onTransitionEnd, false);

function onTransitionEnd() {
  // Handle the transition finishing.
}
{% endhighlight %}

In addition to using CSS transitions, we can also use CSS animations. These allow us to have much more control over individual animation keyframes, durations and iterations.

{% include modules/remember.liquid title="Note" list=page.notes.keyframes %}

We can, for example, animate the box in the same way as we did with the transition, but have it animate without any user interactions like hovering, and with infinite repetitions. We can also change multiple properties at the same time:

{% highlight css %}
/**
 * This is a simplified version without
 * vendor prefixes. With them included
 * (which you will need) things get far
 * more verbose!
 */
.box {
  /* Choose the animation */
  animation-name: movingBox;

  /* The animation’s duration */
  animation-duration: 1300ms;

  /* The number of times we want
      the animation to run */
  animation-iteration-count: infinite;

  /* Causes the animation to reverse
      on every odd iteration */
  animation-direction: alternate;
}

@keyframes movingBox {
  0% {
    transform: translate(0, 0);
    opacity: 0.3;
  }

  25% {
    opacity: 0.9;
  }

  50% {
    transform: translate(100px, 100px);
    opacity: 0.2;
  }

  100% {
    transform: translate(30px, 30px);
    opacity: 0.8;
  }
}
{% endhighlight %}

{% link_sample _code/box-move-keyframes.html %}See sample{% endlink_sample %}

With CSS animations you define the animation itself independently of the target element, and use the animation-name property to choose the required animation.

CSS Animations are still mostly vendor prefixed, with -webkit- being used in Chrome, Safari, Opera, Safari Mobile, and Android Browser. Internet Explorer and Firefox both ship without prefixes. Many tools will aid you in creating the prefixed versions of the CSS you need, allowing you to write the unprefixed version in your source files.

### Animate with JavaScript

Creating animations with JavaScript is, by comparison, more complex than writing CSS transitions or animations, but it does typically provide significantly more power to you as the developer. The general approach is to use `requestAnimationFrame` and, on each frame of the animation, manually determine the value of each property of the element that is animating.

{% include modules/remember.liquid title="Note" list=page.notes.setinterval %}

Below is the JavaScript that you would need to write to recreate the CSS transition we discussed earlier.

{% highlight javascript %}
function Box () {

  var animationStartTime = 0;
  var animationDuration = 1300;
  var target = document.querySelector('.box');

  this.startAnimation = function() {
    animationStartTime = Date.now();
    requestAnimationFrame(update);
  };

  function update() {
    var currentTime = Date.now();
    var positionInAnimation = (currentTime - animationStartTime) / animationDuration;

    var xPosition = positionInAnimation * 100;
    var yPosition = positionInAnimation * 100;

    target.style.transform = 'translate(' + xPosition + 'px, ' + yPosition + 'px)';

    if (positionInAnimation <= 1)
      requestAnimationFrame(update);
  }
}

var box = new Box();
box.startAnimation();
{% endhighlight %}

{% link_sample _code/box-move-js.html %}See sample{% endlink_sample %}

This code starts to become very complex and difficult to manage as you try to expand it to cover more cases, so generally speaking you will benefit from choosing one of the many JavaScript libraries available for animation. If you are using jQuery in your project already, you will likely benefit from sticking with it and using the [`.animate()`](http://api.jquery.com/animate/) functions. If, on the other hand, you’re in need of a dedicated library then look at [Greensock’s TweenLite](https://github.com/greensock/GreenSock-JS/tree/master/src/minified), which is both powerful and lightweight.

Since you are in total control of the elements styles at every step you can slow down the animation, pause it, stop it, reverse it and manipulate it as you see fit.

## High Performance Animations

Care must be taken to maintain 60fps whenever you are animating, because any stutters or stalls will be noticeable to your users and negatively impact their experiences. Animating properties is not free, and some properties are cheaper to animate than others. For example, animating the width and height of an element changes the geometry of the element and may cause other elements on the page to move or change size. This process is called layout, and can be expensive if your page has a lot of elements. Whenever layout is triggered, the page or part of it will normally need to be painted, which is typically even more expensive than the layout operation.

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
