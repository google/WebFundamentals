---
layout: article
title: "Choosing the Right Easing"
description: ""
introduction: ""
article:
  written_on: 2014-08-08
  updated_on: 2014-08-08
  order: 5
id: custom-easing
collection: animations
key-takeaways:
  code:
    - Easing makes your animations feel more natural.
    - Choose ease-out animations for UI elements.
    - Avoid ease-in or ease-in-out animations unless you can keep them short; they tend to feel sluggish to end users.
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.code %}

So now we know about the various options for easing, what kind of easing should you use in your projects?

Generally speaking an **ease-out** equation will be the right call, and certainly a good default. It is quick to start, giving your animations a feeling of responsiveness, but with a nice slowdown at the end.

There are a group of well-known “ease out” equations beyond the one specified with the ease-out keyword in CSS, which range in their ‘aggressiveness’. For a super snappy ease out consider a [Quintic Ease Out](http://easings.net/#easeOutQuint).

<img src="quintic-ease-out-markers.png" alt="A Quintic ease-out animation curve" />

{% link_sample _code/box-move-quintic-ease-out.html %}See a Quintic ease-out animation.{% endlink_sample %}

Other easing equations, particularly bounces or elastic eases, should be used sparingly, and only when it’s appropriate to your project. There’s few things that bring a user out of an experience like a jarring animation. If your project isn’t jolly and fun, then don’t have UI elements boinging around the place! Conversely, if you’re making a site that is supposed to be lighthearted then that might be the perfect time to bring the bounce.

Play around with eases, see which ones match your project’s personality, and go from there. A full list of easing types, along with demos, can be found at [easings.net](http://easings.net).

## Pick the right animation duration

Lastly, we must choose the animation’s duration. Too short and the animation will feel aggressive and sharp; too long and it will be obstructive.

* **Ease-outs: around 200 - 500ms**. This gives the eye chance to see the animation, but doesn’t feel obstructive.
* **Ease-ins: around 200ms - 500ms**. Bear in mind that it will jolt at the end and no amount of timing changes will soften that feel.
* **Bounce or elastic effects: around 800 - 1200ms**. You need to allow time for the elastic or bounce effect to ‘settle’. Without this extra time the elastic bouncing part of the animation will be really aggressive and unpleasant to the eye.

{% include modules/nextarticle.liquid %}

{% endwrap %}
