project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Choose the appropriate easing for your project, whether that's easing in, out, or both. Maybe even use bounces for extra fun!

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Choosing the Right Easing {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Having discussed the various options available for easing in animations, what kind should you use in your projects, and what kind of durations should your animations have?

### TL;DR {: .hide-from-toc }
* Use ease-out animations for UI elements; a Quintic ease-out is a very nice, albeit quick, ease.
* Be sure to use the animation duration; ease-outs and ease-ins should be 200ms-500ms, whereas bounces and elastic eases should clock in a longer duration of 800ms-1200ms.


<img src="images/quintic-ease-out-markers.png" alt="A Quintic ease-out animation curve" style="max-width: 300px" class="attempt-right"/>

Generally speaking, an **ease-out** will be the right call, and certainly a good default. It is quick to start, giving your animations a feeling of responsiveness, which is desirable, but with a nice slowdown at the end.

There is a group of well-known ease-out equations beyond the one specified with the `ease-out` keyword in CSS, which range in their "aggressiveness." For a fast ease-out effect, consider a [Quintic ease-out](http://easings.net/#easeOutQuint).


[See a Quintic ease-out animation](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-quintic-ease-out.html){: target="_blank" .external }

Other easing equations, particularly bounces or elastic eases, should be used sparingly, and only when it’s appropriate to your project. There are few things that bring a user out of an experience like a jarring animation. If your project isn’t intended to be fun, then don’t have elements bouncing around the UI. Conversely, if you’re creating a site that is supposed to be lighthearted, then by all means use bounces!

Play around with eases, see which ones match your project’s personality, and go from there. For a full list of easing types, along with demos, see [easings.net](http://easings.net).

## Pick the right animation duration

It is important that any animation added to your project has the correct duration. Too short and the animation will feel aggressive and sharp; too long and it will be obstructive and annoying.

* **Ease-outs: around 200ms-500ms**. This gives the eye a chance to see the animation, but it doesn’t feel obstructive.
* **Ease-ins: around 200ms-500ms**. Bear in mind that it will jolt at the end, and no amount of timing changes will soften that impact.
* **Bounce or elastic effects: around 800ms-1200ms**. You need to allow time for the elastic or bounce effect to "settle." Without this extra time, the elastic bouncing part of the animation will be aggressive and unpleasant to the eye.

Of course, these are just guidelines. Experiment with your own eases and choose what feels right for your projects.


