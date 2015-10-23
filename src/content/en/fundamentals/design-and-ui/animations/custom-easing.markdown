---
layout: shared/narrow
title: "Custom easing"
description: "Go offroad and create totally custom animations for your projects."
published_on: 2014-08-08
updated_on: 2015-08-26
order: 4
translation_priority: 0
key-takeaways:
  code:
    - "Custom easing will allow you to give more personality to your projects."
    - "You can create cubic bezier curves that resemble the default animation curves (ease-out, ease-in, etc) but with emphasis in different places."
    - "Use JavaScript when you need more control over the animation timing and behavior, e.g. elastic or bounce animations."
authors:
  - paullewis
  - samthorogood
---
<p class="intro">
  Sometimes you won't want to use the easing keywords that are included with CSS, or you will be using Web Animations or a JavaScript framework. In these cases you can typically define your own curves (or equations), and this gives you a lot of control over the feel of your project's animations.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

If you're animating with CSS, you'll find that you can define cubic bezier curves to define the timing. In fact, the keywords `ease`, `ease-in`, `ease-out` and `linear` map to predefined bezier curves, which are detailed in the [CSS transitions specification](http://www.w3.org/TR/css3-transitions/) and the [Web Animations specification](https://w3c.github.io/web-animations/#scaling-using-a-cubic-bezier-curve).

These bezier curves take four values, or 2 pairs of numbers, with each pair describing the X and Y coordinates of a cubic bezier curve’s control points.  The starting point of the bezier curve has a coordinate of (0, 0) and the end coordinate is (1, 1); you get to set the X and Y values of the two control points. The X values for the two control points must be between 0 and 1, and each control point’s Y value can exceed the [0, 1] limit, although the spec isn’t clear by how much!

Changing the X and Y value of each control point will give you vastly different curve, and therefore a vastly different feel to your animation. For example, if the first control point is in the lower right the animation will be slow to start. If it’s in the top left area it’s going to be fast to start. Conversely, if the second control point is in the bottom right of the grid it’s going to be fast at the end, whereas if it’s in the top left it will be slow to end.

For comparison, here are two curves: a typical ease-in-out curve and a custom curve:

<img src="imgs/ease-in-out-markers.png" style="display: inline; max-width: 300px" alt="Ease-in-out animation curve." />
<img src="imgs/custom.png" style="display: inline; max-width: 300px" alt="Custom animation curve." />

{% link_sample _code/box-move-custom-curve.html %}See an animation with custom easing.{% endlink_sample %}

The CSS for the custom curve is:

{% highlight css %}
transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
{% endhighlight %}

The first two numbers are the X and Y coordinates of the first control point, the second two numbers are the X and Y coordinates of the second control point.

Making a custom curve is a lot of fun, and it gives you significant control over the feel of the animation. For example, given the above curve, you can see the curve resembles a classic ease-in-out curve, but with a shortened ease-in, or ‘getting going’, portion, and an elongated slowdown at the end.

Experiment with this {% link_sample _code/curve-playground.html %}animation curve tool{% endlink_sample %} and see how the curve affects the feel of an animation.

## Use JavaScript frameworks for more control

Sometimes you will need even more control than a cubic bezier curve can provide. If you wanted an elastic bounce feel, you might consider using a JavaScript framework, as this is a difficult effect to achieve with either CSS or Web Animations.

### TweenMax

One powerful framework is [GreenSock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) (or TweenLite if you want to keep things super lightweight) as you get a lot of control from it in a small JavaScript library, and it’s a very mature codebase.

{% link_sample _code/box-move-elastic.html %}See an elastic ease animation.{% endlink_sample %}

To use TweenMax include the script in your page:

{% highlight html %}
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
{% endhighlight %}

Once that’s in place you can call TweenMax against your element and tell it which properties you’d like, along with any easing you’d like. There are a ton of easing options that you can use; the code below uses an elastic ease-out:

{% highlight javascript %}
var box = document.getElementById('my-box');
var animationDurationInSeconds = 1.5;

TweenMax.to(box, animationDurationInSeconds, {
  x: '100%',
  ease: 'Elastic.easeOut'
});
{% endhighlight %}

The [TweenMax documentation](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/) highlights all the options you have here, so it's well worth a read.



