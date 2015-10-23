---
layout: shared/narrow
title: "The RAIL Performance Model"
description: "RAIL is a user-centric performance model. Every web app has these four distinct aspects to its life cycle, and performance fits into them in very different ways: Response, Animation, Idle, Load."
published_on: 2015-06-08
updated_on: 2015-06-08
order: 1
authors:
  - megginkearney
translation_priority: 0
key-takeaways:
  rail:
    - "Focus on the user; the end goal isn't to make your site perform fast on any specific device, it's to ultimately make users happy."
    - "Respond to users immediately; acknowledge user input in under 100ms."
    - "Render each frame in under 16ms and aim for consistency; users notice 'jank'."
    - "Maximize main thread idle time."
    - "Keep users engaged; deliver interactive content in under 1000ms."
notes:
  animation:
    - "Respond to user's touchmoves and scrolling in under 16ms."
---

<p class="intro">
  RAIL is a user-centric performance model. Every web app has these four distinct aspects to its life cycle, and performance fits into them in very different ways:
</p>

![RAIL performance model](imgs/rail.png)

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.rail %}

## Focus on the user

Make users the focal point of your performance effort.
The majority of time users spend in your site isn't waiting for it to load,
but waiting for it to respond while using it.
Understand how users perceive performance delays:

<table class="mdl-data-table">
  <thead>
      <th>Delay</th>
      <th>User Reaction</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Delay">0 - 16ms</td>
      <td data-th="User Reaction">Given a screen that is updating 60 times per second, this window represents the time to get a single frame to the screen (Professor Math says "1000/60 ~= 16"). People are exceptionally good at tracking motion, and they dislike it when the expectation of motion isn’t met, either through variable frame rates or periodic halting.</td>
    </tr>
    <tr>
      <td data-th="Delay">0 - 100ms</td>
      <td data-th="User Reaction">Respond to a user action within this time window and they will feel like the result was immediate. Any longer, and the connection between action and reaction is broken.</td>
    </tr>
    <tr>
      <td data-th="Delay">100 - 300ms</td>
      <td data-th="User Reaction">Users experience a slight perceptible delay.</td>
    </tr>
    <tr>
      <td data-th="Delay">300 - 1000 ms</td>
      <td data-th="User Reaction">Within this window, things feel part of a natural and continuous progression of tasks. For most users on the web, loading pages or changing views represents a task.</td>
    </tr>
    <tr>
      <td data-th="Delay">1000+ms</td>
      <td data-th="User Reaction">Beyond 1 second, the user loses focus on the task they are performing.</td>
    </tr>
    <tr>
      <td data-th="Delay">10,000+ms</td>
      <td data-th="User Reaction">The user is frustrated and is likely to abandon the task; they may or may not come back later.</td>
    </tr>
  </tbody>
</table>

## Response: respond in under 100ms

You have 100ms to respond to user input before they notice a lag.
This applies to any input, whether they are clicking a button,
toggling form controls, or starting an animation.

If you don't respond, the connection between action and reaction is broken. Users will notice.

While it may seem obvious to respond to user's actions immediately,
that's not always the right call.
Use this 100ms window to do other expensive work, but be careful not to block the user.
If possible, do work in the background.

For actions that take longer than 500ms to complete, always provide feedback.

{% include shared/remember.liquid title="Remember" list=page.notes.animation %}

## Animation: render frames every 16ms

Animations aren't trivial actions that web apps can opt into.
For example, scrolling and touchmoves are types of animation.
Your users will really notice if the animation frame rate varies.
Your goal is to produce 60 frames per second, and every frame has to go through all of these steps:

![Steps to render a frame](imgs/render-frame.png)

From a purely mathematical point of view, every frame has a budget of 16.66ms (divide 1 second by 60) but, because browsers have housekeeping to do, the reality is that there is a window of 10ms for your code during animations.

In high pressure points like animations, the key is to do nothing where you can, and where you can’t, do the absolute minimum. Whenever possible, make use of the 100ms response to pre-calculate expensive work so that you maximize your chances of hitting 60fps.

For more information, see
[Rendering Performance](/web/fundamentals/performance/rendering/).

## Idle: maximize idle time

Use idle time to complete deferred work. For example, keep pre-load data to a minimum so that your app loads fast, and use idle time to load remaining data.

Deferred work should be grouped into blocks of about 50ms. Should a user begin interacting, then the highest priority is to respond to that. 

To allow for <100ms response,
the app must yield control back to main thread every <100ms,
such that it can execute its pixel pipeline, react to user input, and so on.

Working in 50ms blocks allows the task to finish while still ensuring instant response.

## Load: deliver content under 1000ms

Load your site in under 1 second.
If you don't, your user's attention wanders,
and their perception of dealing with the task is broken.

Focus on
[optimizing the critical rendering path](/web/fundamentals/performance/critical-rendering-path/)
to unblock rendering.

You don't have to load everything in under 1 second to produce the perception of a complete load. Enable progressive rendering and do some work in the background. Defer non-essential loads to periods of idle time (see this [Website Performance Optimization Udacity course](https://www.udacity.com/course/website-performance-optimization--ud884) for more information).

## Summary of key rail metrics

To evaluate your site against RAIL metrics, use the Chrome DevTools [Timeline tool](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) to record user actions. Then check the recording times in the Timeline against these key rail metrics:

<table class="mdl-data-table">
  <thead>
      <th>RAIL Step</th>
      <th>Key Metric</th>
      <th>User Actions</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="RAIL Step"><strong>Response</strong></td>
      <td data-th="Key Metric">Input latency (from tap to paint) < 100ms.</td>
      <td data-th="User Test">User taps on an icon or button (e.g., opening the nav menu, tapping Compose).</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Response</strong></td>
      <td data-th="Key Metric">Input latency (from tap to paint) < 16ms.</td>
      <td data-th="User Test">User drags their finger and the app's response is bound to the finger position (e.g., pull to refresh, swiping a carousel).</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Animation</strong></td>
      <td data-th="Key Metric">Input latency (from tap to paint) < 100ms for initial response.</td>
      <td data-th="User Test">User initiates page scroll or animation begins.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Animation</strong></td>
      <td data-th="Key Metric">Each frame's work (JS to paint) completes < 16ms.</td>
      <td data-th="User Test">User scrolls the page or sees an animation.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Idle</strong></td>
      <td data-th="Key Metric">Main thread JS work chunked no larger than 50ms.</td>
      <td data-th="User Test">User isn't interacting with the page, but main thread should be available enough to handle the next user input.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Load</strong></td>
      <td data-th="Key Metric">Page considered ready to use in 1000ms.</td>
      <td data-th="User Test">User loads the page and sees the critical path content.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Load</strong></td>
      <td data-th="Key Metric">Satisfy the Response goals during the full page load process.</td>
      <td data-th="User Test">User loads the page and starts interacting (e.g., scrolls or opens navigation).</td>
    </tr>
  </tbody>
</table> 


