---
rss: false
layout: article
title: "The RAIL Performance Model"
seotitle: "The RAIL Performance Model"
description: "RAIL is a user-centric performance model. Every web app has these distinct aspects to its lifecycle, and performance fits in to them in very different ways: Response, Animation, Idle, Load."
introduction: "RAIL is a user-centric performance model. Every web app has these distinct aspects to its lifecycle, and performance fits in to them in very different ways:"
article:
  written_on: 2015-06-08
  updated_on: 2015-06-08
  order: 1
authors:
  - megginkearney
priority: 0
collection: evaluate-performance
key-takeaways:
  rail:
    - Focus on the user; the end goal isn't to make your site perform fast on any device, it's to ultimately make users happy.
    - Respond to users in an instant. Acknowledge user input under 100 ms.
    - Render each frame under 16 ms and aim for consistency; users notice jank.
    - Maximize main thread idle time.
    - Keep users engaged; deliver interactive content in under 1000 ms.
remember:
  animation:
    - Respond to user's touchmoves and scrolling under 16 ms (see <a href="">Animation: render frames every 16 ms</a>).
---
{% wrap content %}

![RAIL performance model](imgs/rail.png)

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.rail %}

## Focus on the user

Make users th focal point of your performance effort.
The majority of time users spend in your site isn't waiting for it to load,
but using it.
Understand how users perceive performance delays:

<table class="table-2">
  <thead>
      <th>Delay</th>
      <th>User Reaction</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Delay">0 - 16 ms</td>
      <td data-th="User Reaction">Given a screen that is updating 60 times per second, this window represents the time to get a single frame to the screen (Professor Math says "1000/60 ~= 16"). People are exceptionally good at tracking motion, and they dislike it when the expectation of motion isn’t met, either through variable framerates or periodic halting.</td>
    </tr>
    <tr>
      <td data-th="Delay">0 - 100 ms</td>
      <td data-th="User Reaction">Respond to a user action within this time window and they will feel like the result was immediate. Any longer and that connection between action and reaction is broken.</td>
    </tr>
    <tr>
      <td data-th="Delay">100 - 300 ms</td>
      <td data-th="User Reaction">Users experience a slight perceptible delay.</td>
    </tr>
    <tr>
      <td data-th="Delay">300 - 1000 ms</td>
      <td data-th="User Reaction">Within this window, things feel part of a natural and continuous progression of tasks. For most users on the web, loading pages, or changing views, represents a task.</td>
    </tr>
    <tr>
      <td data-th="Delay">1000+ ms</td>
      <td data-th="User Reaction">Beyond 1 second, the user loses focus on the task they were performing.</td>
    </tr>
    <tr>
      <td data-th="Delay">10,000+ ms+</td>
      <td data-th="User Reaction">Fingers-crossed the user will come back later.</td>
    </tr>
  </tbody>
</table>

## Response: respond under 100 ms

You have 100 ms to respond to any user input before they notice any lag.
This applies to any input, whether they are clicking a button,
toggling form controls, or starting an animation.

If you don't respond, the connection between action and reaction is broken. Users will notice.

While it may seem obvious to respond to user's actions immediately,
that's not always the right call.
Use this 100 ms window to do other expensive work. Be careful though not to block the user;
if possible, do work in the background.

For actions that take longer than 500 ms to complete, always provide feedback.

{% include modules/remember.liquid title="Remember" list=page.remember.animation %}

## Animation: render frames every 16 ms

Animations aren't trivial actions that web apps can opt into.
For example, scrolling and touchmoves are types of animation.
Your users will really notice if the animation frame rate varies.
60 frames per second, and every frame has to go through all these steps:

![Steps to render a frame](imgs/render-frame.png)

From a purely mathematical point-of-view, every frame has a budget of 16.66ms, (divide 1 second by 60), but, because browsers have housekeeping to do the reality is there is a window of 10ms for your code during animations.

In high pressure points like animations, the key is to do nothing where you can, and where you can’t, do the absolute minimum. Where you can you should make use of the 100 ms Response to pre-calculate expensive work so that you maximize your chances of hitting 60fps.

For more information, see
[Rendering Performance](https://developers.google.com/web/fundamentals/performance/rendering/).

## Idle: maximize idle time

Use idle time to complete deferred work. For example, keep pre-load data to a minimum so your app loads fast, and use idle time to load remaining data.

Deferred work should be grouped into blocks of about 50ms. Should a user begin interacting then the highest priority is to respond to that. 

To allow for <100 ms response,
the app must yield control back to main thread every <100 ms,
such that it can execute its pixel pipeline, react to user input, and so on.

Working in 50ms blocks allows the task to finish, while still ensuring instant response.

## Load: deliver content under 1000 ms

Load your site in under 1 second.
If you don't, your user's attention will wander,
and their perception of dealing with the task is broken.

Focus on
[optimizing the critical rendering path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
to unblock rendering.

You don't have to load everything under 1 second. Enable progressive rendering and do your work in the background. Defer non-essentioal loads to periods of idle time (see the [Website Performance Optimization Udacity course](
(see https://www.udacity.com/course/ud884)).

{% include modules/nextarticle.liquid %}

{% endwrap %}
