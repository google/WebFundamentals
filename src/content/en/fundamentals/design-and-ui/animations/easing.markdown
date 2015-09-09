---
layout: shared/plain
title: "Understanding easing"
description: "TODO"
written_on: 2014-08-08
updated_on: 2015-08-26
authors:
  - paullewis
  - samthorogood
translation_priority: 0
key-takeaways:
  choosing:
    - "Use ease-out animations for UI elements; a Quintic ease-out is a very nice, albeit snappy, ease."
    - "Be sure to use the animation duration; ease-outs and ease-ins should be 200ms - 500ms, whereas bounces and elastic eases should clock in a longer duration of 800ms - 1200ms."
  custom:
    - "Custom easing will allow you to give more personality to your projects."
    - "You can create cubic bezier curves that resemble the default animation curves (ease-out, ease-in, etc) but with emphasis in different places."
    - "Use JavaScript when you need more control over the animation timing and behavior, e.g. elastic or bounce animations."
  basics:
    - "Easing makes your animations feel more natural."
    - "Choose ease-out animations for UI elements."
    - "Avoid ease-in or ease-in-out animations unless you can keep them short; they tend to feel sluggish to end users."
---

<p class="intro">
  Nothing in nature moves linearly from one point to another. In reality things
  tend to accelerate or decelerate as they move. Our brains are wired to expect
  this kind of motion, so when animating you should use this to your advantage.
  Natural motion will make your users feel more comfortable with your apps,
  which in turn leads to a better overall experience.
</p>

{% include shared/toc.liquid %}

In classic animation the terms for motion that starts slowly and accelerates is “slow in”, and those that start quickly and decelerate are referred to as “slow out”, but the terminology most commonly used on the web for these are “ease in” and “ease out” respectively. Sometimes the two are combined, which is called “ease in out”. Easing, then, is really the process of making the animation less severe or pronounced.

## Easing Keywords

CSS transitions and animations both let you [choose the kind of easing you want to use for your animations]({{site.fundamentals}}/look-and-feel/animations/choosing-the-right-easing.html). You can use keywords that affect the easing (or timing as it's sometimes called) of the animation in question. You can also [go completely custom with your easing]({{site.fundamentals}}/look-and-feel/animations/custom-easing.html), which gives you way more freedom to express your app's personality.

Here are some of the keywords that you can use in CSS:

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

Source: [CSS Transitions, W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

You can also use a `steps` keyword, which allows you to create transitions that have discrete steps, but those listed above are the most useful for creating animations that feel natural, and that’s exactly what you'll want.

## Linear animations

Animations without any kind of easing are referred to as **linear**. A graph of a linear transition looks like this:

<img src="imgs/linear.png" style="max-width: 300px" alt="Linear ease animation curve." />

{% link_sample _code/box-move-linear.html %}See a linear animation.{% endlink_sample %}

As time moves along the value increases in equal amounts. With linear motion things tend to feel robotic and unnatural, and this is something users will find jarring. Generally speaking you should avoid linear motion.

Whether you’re coding your animations by CSS or JavaScript you’ll find that there is always an option for linear motion. To achieve the effect above with CSS, the code would look something like this:

{% highlight css %}
transition: transform 500ms linear;
{% endhighlight %}


## Ease-out Animations

Easing out causes the animation to start more quickly than linear ones, and it also has deceleration at the end.

<img src="imgs/ease-out.png" style="max-width: 300px" alt="Ease-out animation curve." />

There are many ways to achieve an ease out effect, but the simplest is the `ease-out` keyword in CSS:

{% highlight css %}
transition: transform 500ms ease-out;
{% endhighlight %}

{% link_sample _code/box-move-ease-out.html %}See an ease-out animation.{% endlink_sample %}

Easing out is typically the best for user interface work, because the fast start gives your animations a feeling of responsiveness, while still allowing for a little bit of natural slowdown at the end.

## Ease-in Animations

Ease-in animations start slowly and end fast; the opposite of ease-out.

<img src="imgs/ease-in.png" style="max-width: 300px" alt="Ease-in animation curve." />

{% link_sample _code/box-move-ease-in.html %}See an ease-in animation.{% endlink_sample %}

This kind of animation is like a heavy stone falling, where it starts slowly and hits the ground quickly with a deadening thump.

To use an ease-in animation, similarly to ease-out and linear animations, you can use its keyword:

{% highlight css %}
transition: transform 500ms ease-in;
{% endhighlight %}

From an interaction point of view, however, ease-ins can feel a little unusual because of their abrupt end; things that move in the real world tend to decelerate rather than simply stopping dead. Ease-ins also have the detrimental effect of feeling sluggish to get going, which will negatively impact the perception of responsiveness in your site or app.

## Ease-in-out Animations

Easing both in and out is akin to a car accelerating and decelerating and, used judiciously, can provide a more dramatic effect than just easing out.

<img src="imgs/ease-in-out.png" style="max-width: 300px" alt="Ease-in-out animation curve." />

{% link_sample _code/box-move-ease-in-out.html %}See an ease-in-out animation.{% endlink_sample %}

Care must be taken here to not have an overly long animation duration, because of the sluggishness of an ease-in start to the animation. Typically something in the region of 300 - 500ms is going to be suitable, but it will depend heavily on the feel of your project as to what the exact number is. That said, because of the slow start, fast middle, and slow end, you will end up with an increased contrast to the animation, which can be quite satisfying for users.

To get an ease-in-out animation you can use the `ease-in-out` CSS keyword:

{% highlight css %}
transition: transform 500ms ease-in-out;
{% endhighlight %}

## Custom Easing

Sometimes you won't want to use the easing keywords that are included with CSS, or you will be using Web Animations or a JavaScript framework. In these cases you can typically define your own curves (or equations), and this gives you a lot of control over the feel of your project's animations.

If you're animating with CSS, you'll find that you can define cubic bezier curves to define the timing. In fact, the keywords `ease`, `ease-in`, `ease-out` and `linear` map to predefined bezier curves, which are detailed in the [CSS transitions specification](http://www.w3.org/TR/css3-transitions/) and the [Web Animations specification](http://w3c.github.io/web-animations/#scaling-using-a-cubic-bezier-curve).

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

The [TweenMax documentation](http://greensock.com/docs/#/HTML5/GSAP/TweenMax/) highlights all the options you have here, so it's well worth a read.

## Choosing the right easing

Having discussed the various options available for easing in animations, what kind should you use in your projects, and what kind of durations should your animations have?

Generally speaking an **ease-out** will be the right call, and certainly a good default. It is quick to start, giving your animations a feeling of responsiveness, which is desirable, but with a nice slowdown at the end.

There are a group of well-known ease-out equations beyond the one specified with the `ease-out` keyword in CSS, which range in their ‘aggressiveness’. For a super snappy ease-out effect consider a [Quintic ease-out](http://easings.net/#easeOutQuint).

<img src="imgs/quintic-ease-out-markers.png" alt="A Quintic ease-out animation curve" style="max-width: 300px"/>

{% link_sample _code/box-move-quintic-ease-out.html %}See a Quintic ease-out animation.{% endlink_sample %}

Other easing equations, particularly bounces or elastic eases, should be used sparingly, and only when it’s appropriate to your project. There’s few things that bring a user out of an experience like a jarring animation. If your project isn’t jolly and fun, then don’t have UI elements boinging around the place! Conversely, if you’re making a site that is supposed to be lighthearted and fun then by all means bring the bounce!

Play around with eases, see which ones match your project’s personality, and go from there. A full list of easing types, along with demos, can be found at [easings.net](http://easings.net).

### Pick the right animation duration

It is important that any animation added to your project has the correct duration. Too short and the animation will feel aggressive and sharp; too long and it will be obstructive and annoying.

* **Ease-outs: around 200ms - 500ms**. This gives the eye chance to see the animation, but doesn’t feel obstructive.
* **Ease-ins: around 200ms - 500ms**. Bear in mind that it will jolt at the end and no amount of timing changes will soften that feel.
* **Bounce or elastic effects: around 800ms - 1200ms**. You need to allow time for the elastic or bounce effect to ‘settle’. Without this extra time the elastic bouncing part of the animation will be really aggressive and unpleasant to the eye.

Of course these are just guidelines. Experiment with your own eases and choose what feels right for your projects.
