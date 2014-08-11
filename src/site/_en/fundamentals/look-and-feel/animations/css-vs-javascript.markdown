---
layout: article
title: "CSS vs JavaScript Animations"
description: "You can animate with CSS or JavaScript. Which should you use, and why?"
introduction: "There are two primary ways to do animations on the web: using CSS and using JavaScript. Which one you choose really depends on what else you have as a dependency in your project, and what effect you're trying to achieve."
article:
  written_on: 2014-08-08
  updated_on: 2014-08-08
  order: 2
id: css-vs-javascript-animations
collection: animations
key-takeaways:
  code:
    - Use CSS animations for simpler “one-shot” transitions, like toggling UI element states.
    - Use JavaScript animations when you want to have advanced effects like bouncing, stop, pause, rewind or slow-down.
    - If you choose to animate with JavaScript, go with TweenLite or, if you need more features, TweenMax.

notes:
  keyframes:
    - If you’re new to animations, keyframes are an old term from hand-drawn animations. Animators would create specific frames for a piece of action, called key frames, which would capture things like the most extreme part of some motion, and then they would set about drawing all the individual frames in between the keyframes. We have a similar process today with CSS animations, where we instruct the browser what values CSS properties need to have at given points, and it fills in the gaps.
  setinterval:
    - You may see code around the web that uses setInterval or setTimeout for animations. This is a terrible idea, as the animation will not be synchronized to the refresh rate of the screen, and it’s highly likely to judder and skip. You should always avoid such code, and use requestAnimationFrame, which is synchronized properly, instead.

authors:
  - paullewis
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.code %}

You can achieve most effects with both CSS and JavaScript, but the amount of effort and time will differ. Each has their pros and cons, but this is a good rule-of-thumb:

* **Use CSS when you have smaller, self-contained states for UI elements.** CSS transitions and animations are ideal for bringing a navigation menu in from the side, or showing a tooltip. You may end up using JavaScript to control the states, but the animations themselves are written in your CSS.
* **Use JavaScript when you need significant control over your animations.** Something that dynamically tracks a touch position, or an animation that you need to stop, pause, slow-down or reverse are both examples of when you need JavaScript-based animations.

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


{% include modules/nextarticle.liquid %}

{% endwrap %}
