project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Animation Worklet allows you to write imperative animations that run at the device's native frame rate for that extra buttery jank-free smoothness™, make your animations more resilient against main thread jank and are linkable to scroll instead of time.

{# wf_updated_on: 2020-07-24 #}
{# wf_published_on: 2018-10-06 #}
{# wf_tags: houdini,css #}
{# wf_featured_image: /web/updates/images/2018/10/animation-worklet/social.png #}
{# wf_featured_snippet: Animation Worklet allows you to write imperative animations that run at the device's native frame rate for that extra buttery jank-free smoothness™, make your animations more resilient against main thread jank and are linkable to scroll instead of time. #}
{# wf_blink_components: Blink #}

# Houdini's Animation Worklet {: .page-title }
## Supercharge your webapp's animations

{% include "web/_shared/contributors/surma.html" %}

**TL;DR:** Animation Worklet allows you to write imperative animations that run
at the device's native frame rate for that extra buttery jank-free smoothness™,
make your animations more resilient against main thread jank and are linkable
to scroll instead of time. Animation Worklet is in Chrome Canary (behind the
"Experimental Web Platform features" flag) and we are planning an [Origin
Trial](http://bit.ly/OriginTrialSignup) for Chrome 71. You can start using it as
a progressive enhancement _today_.

## Another Animation API?

Actually no, it is an extension of what we already have, and with good reason!
Let's start at the beginning. If you want to animate any DOM element on the web
today, you have 2 ½ choices: [CSS
Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) for
simple A to B transitions, [CSS
Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) for
potentially cyclical, more complex time-based animations and [Web Animations
API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
(WAAPI) for almost arbitrarily complex animations. [WAAPI's support
matrix](https://caniuse.com/#feat=web-animation) is looking pretty grim, but
it's on the way up. Until then, there is a
[polyfill](https://github.com/web-animations/web-animations-js).

What all these methods have in common is that they are stateless and
time-driven. But some of the effects developers are trying are neither
time-driven nor stateless. For example the infamous parallax scroller is, as the
name implies, scroll-driven. [Implementing a performant parallax scroller on the
web today is surprisingly
hard.](/web/updates/2016/12/performant-parallaxing)

And what about statelessness? Think about Chrome's address bar on Android, for
example. If you scroll down, it scrolls out of view. But the
second you scroll up, it comes back, even if you are half way
down that page. The animation depends not only on scroll position, but also on
your previous scroll direction. It is _stateful_.

<video loop muted controls class="attempt-left"
  src="https://storage.googleapis.com/webfundamentals-assets/animation-worklet/hidey_x264.mp4">
</video>

Another issue is styling scrollbars. They are notoriously unstylable — or at
least not styleable enough. What if I want a [nyan cat as my
scrollbar](https://googlechromelabs.github.io/ui-element-samples/custom-scrollbar/)?
Whatever technique you choose, building a custom scrollbar is neither
performant, nor [easy](/web/updates/2017/03/custom-scrollbar).

The point is all of these things are awkward and hard to impossible to
implement efficiently. Most of them rely on events and/or
`requestAnimationFrame`, which might keep you at 60fps, even when your screen is
capable of running at 90fps, 120fps or higher and use a fraction of your
precious main thread frame budget.

Animation Worklet extends the capabilities of the web's animations stack to make
these kind of effects easier. Before we dive in, let's make sure we are
up-to-date on the basics of animations.

## A primer on animations and timelines

WAAPI and Animation Worklet make extensive use of timelines to allow you to
orchestrate animations and effects in the way that you want. This section is a
quick refresher or introduction to timelines and how they work with animations.

Each document has `document.timeline`. It starts at 0 when the document is
created and counts the milliseconds since the document started existing. All of
a document's animations work relative to this timeline.

<div class="clearfix"></div>

To make things a little more concrete, let's take a look at this WAAPI snippet

    const animation = new Animation(
      new KeyframeEffect(
        document.querySelector('#a'),
        [
          {
            transform: 'translateX(0)'
          },
          {
            transform: 'translateX(500px)'
          },
          {
            transform: 'translateY(500px)'
          }
        ],
        {
          delay: 3000,
          duration: 2000,
          iterations: 3
        }
      ),
      document.timeline
    );

    animation.play();

When we call `animation.play()`, the animation uses the timeline’s `currentTime`
 as its start time. Our animation has a delay of 3000ms, meaning that the
 animation will start (or become "active") when the timeline reaches `startTime
 + 3000`. After that time, the animation engine will animate
 the given element from the first keyframe (`translateX(0)`), through all
 intermediate keyframes (`translateX(500px)`) all the way to the last keyframe
 (`translateY(500px)`) in exactly 2000ms, as prescribed by the `duration`
 options. Since we have a duration of 2000ms, we will reach the middle keyframe
 when the timeline's `currentTime` is `startTime + 3000 + 1000` and the last
 keyframe at `startTime + 3000 + 2000`. The point is, the
 timeline controls where we are in our animation!

Once the animation has reached the last keyframe, it will jump back to the first
keyframe and start the next iteration of the animation. This process repeats a
total of 3 times since we set `iterations: 3`. If we wanted the animation to
never stop, we would write `iterations: Number.POSITIVE_INFINITY`. Here's the
[result](https://animation-worklet-article.glitch.me/waapi.html) of the code
above.

Note: All demos currently require Canary with the "Experimental Web Platform
features" flag enabled on chrome://flags.

WAAPI is incredibly powerful and there are many more features in this API like
easing, start offsets, keyframe weightings and fill behavior that would blow the
scope of this article. If you would like to know more, I recommend reading [this
article on CSS Animations on CSS
Tricks.](https://css-tricks.com/css-animations-vs-web-animations-api/)

## Writing an Animation Worklet

Now that we have the concept of timelines down, we can start looking at
Animation Worklet and how it allows you to mess with timelines! The Animation
Worklet API is not only based on WAAPI, but is — in the sense of the [extensible
web](https://extensiblewebmanifesto.org/) — a lower-level primitive that
explains how WAAPI functions. In terms of syntax, they are incredibly similar:

<table>
  <tr>
    <th>Animation Worklet</th>
    <th>WAAPI</th>
  </tr>
  <tr>
    <td>
      <pre class="prettyprint">
new WorkletAnimation(
  'passthrough',
  new KeyframeEffect(
    document.querySelector('#a'),
    [
      {
        transform: 'translateX(0)'
      },
      {
        transform: 'translateX(500px)'
      }
    ],
    {
      duration: 2000,
      iterations: Number.POSITIVE_INFINITY
    }
  ),
  document.timeline
).play();
      </pre>
    </td>
    <td>
      <pre class="prettyprint">
new Animation(

  new KeyframeEffect(
    document.querySelector('#a'),
    [
      {
        transform: 'translateX(0)'
      },
      {
        transform: 'translateX(500px)'
      }
    ],
    {
      duration: 2000,
      iterations: Number.POSITIVE_INFINITY
    }
  ),
  document.timeline
).play();
      </code>
    </td>
  </tr>
</table>

The difference is in the first parameter, which is the name of the _worklet_
that drives this animation.

## Feature detection

Chrome is the first browser to ship this feature, so you need to make sure your
code doesn't just expect `AnimationWorklet` to be there. So before loading the
worklet, we should detect if the user's browser has support for
`AnimationWorklet` with a simple check:

    if('animationWorklet' in CSS) {
      // AnimationWorklet is supported!
    }

## Loading a worklet

Worklets are a new concept introduced by the Houdini task force to make many of
the new APIs easier to build and scale. We will cover the details of worklets a
bit more later, but for simplicity you can think of them as cheap and
lightweight threads (like workers) for now.

We need to make sure we have loaded a worklet with the name "passthrough",
before declaring the animation:

    // index.html
    await CSS.animationWorklet.addModule("passthrough-aw.js");
    // ... WorkletAnimation initialization from above ...

    // passthrough-aw.js
    registerAnimator('passthrough', class {
      animate(currentTime, effect) {
        effect.localTime = currentTime;
      }
    });


What is happening here? We are registering a class as an animator using the
AnimationWorklet's `registerAnimator()` call, giving it the name "passthrough".
It's the same name we used in the `WorkletAnimation()` constructor above. Once the
registration is complete, the promise returned by `addModule()` will resolve and
we can start creating animations using that worklet.

The `animate()` method of our instance will be called for _every frame_ the
browser wants to render, passing the `currentTime` of the animation's timeline
as well as the effect that is currently being processed. We only have one
effect, the `KeyframeEffect` and we are using `currentTime` to set the effect's
`localTime`, hence why this animator is called "passthrough". With this code for
the worklet, the WAAPI and the AnimationWorklet above behave exactly the
same, as you can see in the
[demo](https://animation-worklet-article.glitch.me/index.html).

## Time

The `currentTime` parameter of our `animate()` method is the `currentTime` of the
timeline we passed to the `WorkletAnimation()` constructor. In the previous
example, we just passed that time through to the effect. But since this is
JavaScript code, and we can _distort time_ 💫

    function remap(minIn, maxIn, minOut, maxOut, v) {
      return (v - minIn)/(maxIn - minIn) * (maxOut - minOut) + minOut;
    }
    registerAnimator('sin', class {
      animate(currentTime, effect) {
        effect.localTime =
          remap(-1, 1, 0, 2000, Math.sin(currentTime * 2 * Math.PI / 2000));
      }
    });

Note: `currentTime` _can_ be `NaN` in certain circumstances (more later). You
should keep that in mind when writing animation worklets. Since all
mathematical operations can handle `NaN` (they return `NaN` when one of their
inputs is `NaN`) we are fine here!

We are taking the `Math.sin()` of the `currentTime`, and remapping that value to
the range [0; 2000], which is the time range that our effect is defined for. Now
[the animation looks very
different](https://animation-worklet-article.glitch.me/sin.html), without having
changed the keyframes or the animation's options. The worklet code can be
arbitrarily complex, and allows you to programmatically define which effects are
played in which order and to which extent.

<video loop muted autoplay
  src="https://storage.googleapis.com/webfundamentals-assets/animation-worklet/sin_x264.mp4">
</video>

## Options over Options

You might want to reuse a worklet and change its numbers. For this reason the
WorkletAnimation constructor allows you pass an options object to the worklet:

    registerAnimator('factor', class {
      constructor(options = {}) {
        this.factor = options.factor || 1;
      }
      animate(currentTime, effect) {
        effect.localTime = currentTime * this.factor;
      }
    });

    new WorkletAnimation(
      'factor',
      new KeyframeEffect(
        document.querySelector('#b'),
        [ /* ... same keyframes as before ... */ ],
        {
          duration: 2000,
          iterations: Number.POSITIVE_INFINITY
        }
      ),
      document.timeline,
      {factor: 0.5}
    ).play();

Note: The options object will be structurally cloned when it is being sent to
the worklet, similar to how `postMessage()` operates.

In this [example](https://animation-worklet-article.glitch.me/options.html),
both animations are driven with the same code, but with different options.

## Gimme your local state!

As I hinted at before, one of the key problems animation worklet aims to solve is
stateful animations. Animation worklets are allowed to hold state. However, one
of the core features of worklets is that they can be migrated to a different
thread or even be destroyed to save resources, which would also destroy their
state. To prevent state loss, animation worklet offers a hook that
is called _before_ a worklet is destroyed that you can use to return a state
object. That object will be passed to the constructor when the worklet is
re-created. On initial creation, that parameter will be `undefined`.

    registerAnimator('randomspin', class {
      constructor(options = {}, state = {}) {
        this.direction = state.direction || (Math.random() > 0.5 ? 1 : -1);
      }
      animate(currentTime, effect) {
        // Some math to make sure that `localTime` is always > 0.
        effect.localTime = 2000 + this.direction * (currentTime % 2000);
      }
      destroy() {
        return {
          direction: this.direction
        };
      }
    });

Every time you refresh [this
demo](https://animation-worklet-article.glitch.me/state.html), you have a 50/50
chance in which direction the square will spin. If the browser were to tear down
the worklet and migrate it to a different thread, there would be another
`Math.random()` call on creation, which could cause a sudden change of
direction. To make sure that doesn't happen, we return the animations
randomly-chosen direction as _state_ and use it in the constructor, if provided.

Note: The `destroy()` lifecycle hook has been replaced by getter method, but
this change is not reflected in the spec or Chrome’s implementation just yet.

## Hooking into the space-time continuum: ScrollTimeline

As the previous section has shown, AnimationWorklet allows us to
programmatically define how advancing the timeline affects the effects of the
animation. But so far, our timeline has always been `document.timeline`, which
tracks time.

`ScrollTimeline` opens up new possibilities and allows you to drive animations
with scrolling instead of time. We are going to reuse our very first
"passthrough" worklet for this
[demo](https://animation-worklet-article.glitch.me/scroller.html):

    new WorkletAnimation(
      'passthrough',
      new KeyframeEffect(
        document.querySelector('#a'),
        [
          {
            transform: 'translateX(0)'
          },
          {
            transform: 'translateX(500px)'
          }
        ],
        {
          duration: 2000,
          fill: 'both'
        }
      ),
      new ScrollTimeline({
        scrollSource: document.querySelector('main'),
        orientation: "vertical", // "horizontal" or "vertical".
        timeRange: 2000
      })
    ).play();

Instead of passing `document.timeline`, we are creating a new `ScrollTimeline`.
You might have guessed it, `ScrollTimeline` doesn't use time but the
`scrollSource`'s scroll position to set the `currentTime` in the worklet. Being
scrolled all the way to the top (or left) means `currentTime = 0`, while
being scrolled all the way to the bottom (or right) sets `currentTime` to
`timeRange`. If you scroll the box in this
[demo](https://animation-worklet-article.glitch.me/scroller.html), you can
control the position of the red box.

Note: It might _look_ like you should be able to use `ScrollTimeline` with a
normal `Animation`, and we agree. This is planned, but currently not supported
in Chrome.

<video loop muted autoplay
  src="https://storage.googleapis.com/webfundamentals-assets/animation-worklet/scroller_x264.mp4">
</video>

If you create a `ScrollTimeline` with an element that doesn't scroll, the
timeline's `currentTime` will be `NaN`. So especially with responsive design in
mind, you should always be prepared for `NaN` as your `currentTime`. It’s often
sensible to default to a value of 0.

Linking animations with scroll position is something that has long been sought,
but was never really achieved at this level of fidelity (apart from hacky
workarounds with CSS3D). Animation Worklet allows these effects to be
implemented in a straightforward way while being highly performant. For example:
a parallax scrolling effect like this
[demo](https://animation-worklet-article.glitch.me/parallax.html) shows that it
now takes just a couple of lines to define a scroll-driven animation.

## Under the hood
### Worklets

Worklets are JavaScript contexts with an isolated scope and a very small API
surface. The small API surface allows more aggressive optimization from the
browser, especially on low-end devices. Additionally, worklets are not bound to
a specific event loop, but can moved between threads as necessary. This is
especially important for AnimationWorklet.

### Compositor NSync

You might know that certain CSS properties are fast to animate, while others are
not. Some properties just need some work on the GPU to be animated, while others
force the browser to re-layout the entire document. Sites like
[CSSTriggers.com](https://csstriggers.com/) show you which properties are fast
to animate, and which are not.

In Chrome (as in many other browsers) we have a process called the compositor,
whose job it is — and I'm very much simplifying here — to arrange layers and
textures and then utilize the GPU to update the screen as regularly as possible,
ideally as fast as the screen can update (typically 60Hz). Depending on which
CSS properties are being animated, the browser might just need have the
compositor do it's work, while other properties need to run layout, which is an
operation that only the main thread can do. Depending on which properties you
are planning to animate, your animation worklet will either be bound to the main
thread or run in a separate thread in sync with the compositor.

Note: You should avoid "slow" properties at all costs. Limit yourself to
animation `opacity` and `transform` to make sure your animations run smoothly
even on slow devices.

### Slap on the wrist

There is usually only one compositor process which is potentially shared across
multiple tabs, as the GPU is a highly-contended resource. If the compositor gets
somehow blocked, the entire browser grinds to a halt and becomes unresponsive to
user input. This needs to be avoided at all costs. So what happens if your
worklet cannot deliver the data the compositor needs in time for the frame to be
rendered?

If this happens the worklet is allowed — per spec — to "slip". It falls behind
the compositor, and the compositor is allowed to re-use the last frame's data to
keep the frame rate up. Visually, this will look like jank, but the big
difference is that the browser is still responsive to user input.

Note: This is what the spec allows the browser to do. Chrome does not currently
do any of these things, but will implement these behaviors soon™

## Conclusion

There are many facets to AnimationWorklet and the benefits it brings to the web.
The obvious benefits are more control over animations and new ways to drive
animations to bring a new level of visual fidelity to the web. But the APIs
design also allows you to make your app more resilient to jank while getting
access to all the new goodness at the same time.

Animation Worklet is in Canary and we are aiming for an Origin Trial with
Chrome 71. We are eagerly awaiting your great new web experiences and hearing
about what we can improve. There is also a
[polyfill](https://github.com/GoogleChromeLabs/houdini-samples/blob/master/animation-worklet/anim-worklet.js)
that gives you the same API, but doesn't provide the performance isolation.

Keep in mind that CSS Transitions and CSS Animations are still valid
options and can be much simpler for basic animations. But if you need to go
fancy, AnimationWorklet has your back!

{% include "web/_shared/rss-widget-updates.html" %}
