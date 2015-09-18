---
layout: shared/narrow
title: "Choosing the right easing"
description: "Choose the appropriate easing for your project, whether that's easing in, out, or both. Maybe even go bouncy for extra shenanigans!"
published_on: 2014-08-08
updated_on: 2014-10-21
order: 5
translation_priority: 0
key-takeaways:
  code:
    - "Use ease-out animations for UI elements; a Quintic ease-out is a very nice, albeit snappy, ease."
    - "Be sure to use the animation duration; ease-outs and ease-ins should be 200ms - 500ms, whereas bounces and elastic eases should clock in a longer duration of 800ms - 1200ms."
authors:
  - paullewis
---
<p class="intro">
  Having discussed the various options available for easing in animations, what kind should you use in your projects, and what kind of durations should your animations have?
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

Generally speaking an **ease-out** will be the right call, and certainly a good default. It is quick to start, giving your animations a feeling of responsiveness, which is desirable, but with a nice slowdown at the end.

There are a group of well-known ease-out equations beyond the one specified with the `ease-out` keyword in CSS, which range in their ‘aggressiveness’. For a super snappy ease-out effect consider a [Quintic ease-out](http://easings.net/#easeOutQuint).

<img src="imgs/quintic-ease-out-markers.png" alt="A Quintic ease-out animation curve" style="max-width: 300px"/>

{% link_sample _code/box-move-quintic-ease-out.html %}See a Quintic ease-out animation.{% endlink_sample %}

Other easing equations, particularly bounces or elastic eases, should be used sparingly, and only when it’s appropriate to your project. There’s few things that bring a user out of an experience like a jarring animation. If your project isn’t jolly and fun, then don’t have UI elements boinging around the place! Conversely, if you’re making a site that is supposed to be lighthearted and fun then by all means bring the bounce!

Play around with eases, see which ones match your project’s personality, and go from there. A full list of easing types, along with demos, can be found at [easings.net](http://easings.net).

## Pick the right animation duration

It is important that any animation added to your project has the correct duration. Too short and the animation will feel aggressive and sharp; too long and it will be obstructive and annoying.

* **Ease-outs: around 200ms - 500ms**. This gives the eye chance to see the animation, but doesn’t feel obstructive.
* **Ease-ins: around 200ms - 500ms**. Bear in mind that it will jolt at the end and no amount of timing changes will soften that feel.
* **Bounce or elastic effects: around 800ms - 1200ms**. You need to allow time for the elastic or bounce effect to ‘settle’. Without this extra time the elastic bouncing part of the animation will be really aggressive and unpleasant to the eye.

Of course these are just guidelines. Experiment with your own eases and choose what feels right for your projects.


