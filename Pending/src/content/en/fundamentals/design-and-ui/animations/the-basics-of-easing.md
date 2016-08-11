project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Learn how to soften and give weighting to your animations.

{# wf_review_required #}
{# wf_updated_on: 2014-10-21 #}
{# wf_published_on: 2014-08-08 #}

# The basics of easing {: .page-title }

{% include "_shared/contributors/paullewis.html" %}

Nothing in nature moves linearly from one point to another. In reality things tend to accelerate or decelerate as they move. Our brains are wired to expect this kind of motion, so when animating you should use this to your advantage. Natural motion will make your users feel more comfortable with your apps, which in turn leads to a better overall experience.

## TL;DR
- Easing makes your animations feel more natural.
- Choose ease-out animations for UI elements.
- Avoid ease-in or ease-in-out animations unless you can keep them short; they tend to feel sluggish to end users.


In classic animation the terms for motion that starts slowly and accelerates is “slow in”, and those that start quickly and decelerate are referred to as “slow out”, but the terminology most commonly used on the web for these are “ease in” and “ease out” respectively. Sometimes the two are combined, which is called “ease in out”. Easing, then, is really the process of making the animation less severe or pronounced.

## Easing Keywords

CSS transitions and animations both let you [choose the kind of easing you want to use for your animations](choosing-the-right-easing). You can use keywords that affect the easing (or timing as it's sometimes called) of the animation in question. You can also [go completely custom with your easing](custom-easing), which gives you way more freedom to express your app's personality.

Here are some of the keywords that you can use in CSS:

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

Source: [CSS Transitions, W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

You can also use a `steps` keyword, which allows you to create transitions that have discrete steps, but those listed above are the most useful for creating animations that feel natural, and that’s exactly what you'll want.

## Linear animations

<div class="attempt-right">
  <figure>
    <img src="imgs/linear.png" alt="Linear ease animation curve." />
  </figure>
</div>

Animations without any kind of easing are referred to as **linear**. A graph of a linear transition looks like this:

As time moves along the value increases in equal amounts. With linear motion things tend to feel robotic and unnatural, and this is something users will find jarring. Generally speaking you should avoid linear motion.

Whether you’re coding your animations by CSS or JavaScript you’ll find that there is always an option for linear motion. 

<a href="https://googlesamples.github.io/web-fundamentals/samples/fundamentals/design-and-ui/animations/box-move-linear.html">See a linear animation.</a>

<div style="clear:both;"></div>

To achieve the effect above with CSS, the code would look something like this:


    transition: transform 500ms linear;
    


## Ease-out Animations

<div class="attempt-right">
  <figure>
    <img src="imgs/ease-out.png" alt="Ease-out animation curve." />
  </figure>
</div>

Easing out causes the animation to start more quickly than linear ones, and it also has deceleration at the end.

Easing out is typically the best for user interface work, because the fast start gives your animations a feeling of responsiveness, while still allowing for a little bit of natural slowdown at the end.

<a href="https://googlesamples.github.io/web-fundamentals/samples/fundamentals/design-and-ui/animations/box-move-ease-out.html">See an ease-out animation.</a>

<div style="clear:both;"></div>

There are many ways to achieve an ease out effect, but the simplest is the `ease-out` keyword in CSS:


    transition: transform 500ms ease-out;
    


## Ease-in Animations

<div class="attempt-right">
  <figure>
    <img src="imgs/ease-in.png" alt="Ease-in animation curve." />
  </figure>
</div>

Ease-in animations start slowly and end fast; the opposite of ease-out.

This kind of animation is like a heavy stone falling, where it starts slowly and hits the ground quickly with a deadening thump.

From an interaction point of view, however, ease-ins can feel a little unusual because of their abrupt end; things that move in the real world tend to decelerate rather than simply stopping dead. Ease-ins also have the detrimental effect of feeling sluggish to get going, which will negatively impact the perception of responsiveness in your site or app.

<a href="https://googlesamples.github.io/web-fundamentals/samples/fundamentals/design-and-ui/animations/box-move-ease-in.html">See an ease-in animation.</a>

<div style="clear:both;"></div>

To use an ease-in animation, similarly to ease-out and linear animations, you can use its keyword:


    transition: transform 500ms ease-in;
    

## Ease-in-out Animations

<div class="attempt-right">
  <figure>
    <img src="imgs/ease-in-out.png" alt="Ease-in-out animation curve." />
  </figure>
</div>

Easing both in and out is akin to a car accelerating and decelerating and, used judiciously, can provide a more dramatic effect than just easing out.

Care must be taken here to not have an overly long animation duration, because of the sluggishness of an ease-in start to the animation. Typically something in the region of 300 - 500ms is going to be suitable, but it will depend heavily on the feel of your project as to what the exact number is. That said, because of the slow start, fast middle, and slow end, you will end up with an increased contrast to the animation, which can be quite satisfying for users.

<a href="https://googlesamples.github.io/web-fundamentals/samples/fundamentals/design-and-ui/animations/box-move-ease-in-out.html">See an ease-in-out animation.</a>

<div style="clear:both;"></div>


To get an ease-in-out animation you can use the `ease-in-out` CSS keyword:


    transition: transform 500ms ease-in-out;
    


