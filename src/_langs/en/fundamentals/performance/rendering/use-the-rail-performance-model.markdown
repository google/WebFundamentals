---
layout: article
title: "Use the RAIL Performance Model"
description: "When thinking about web site and app performance, it’s helpful to separate the performance requirements into four areas. The Google Chrome team calls this RAIL. RAIL stands for Response, Animation, Idle, Load, and it’s an extremely useful and user-centric way to think about performance."
introduction: "When thinking about web site and app performance, it’s helpful to separate the performance requirements into four areas. The Google Chrome team calls this <strong>RAIL</strong>. <strong>RAIL</strong> stands for <strong>R</strong>esponse, <strong>A</strong>nimation, <strong>I</strong>dle, <strong>L</strong>oad, and it’s an extremely useful and user-centric way to think about performance."
article:
  written_on: 2015-03-20
  updated_on: 2015-03-20
  order: 0
collection: rendering-performance
priority: 1
authors:
  - paullewis
notes:
  scrolling:
    - You should remember that <em>scrolling is an animation</em>. Just because the browser handles it for you doesn’t mean you can ignore it. Adding JavaScript or other work to scroll or other input handlers can negatively affect an app’s performance, so take care!

key-takeaways:
  rail:
    - "User perception of performance changes depending on where they are in your app’s lifecycle."
    - "<strong>Response</strong>: you have 100ms to respond to user interactions."
    - "<strong>Animation</strong>: all frames during scrolling and animations should be complete inside 10ms to achieve 60fps, and to allow the browser time to do housekeeping."
    - "<strong>Idle</strong>: there are periods of idle time where a user is not interacting; use these as opportunities to work on non-essential tasks. Split this into 50ms chunks."
    - "<strong>Load</strong>: use critical rendering path guidance to provide an initial experience in under 1 second; defer all non-essential load work to after the initial load."

---
{% wrap content%}

User perception of performance is different in these four stages of the lifecycle, and we need to approach the performance considerations, and thresholds, for them as such.

{% include modules/takeaway.liquid list=page.key-takeaways.rail %}

## Response
If a user clicks on a button you have **100ms** in which to respond to their click before they’ll notice any lag.

<img src="images/intro/response.png" class="center" alt="User interacting with a website.">

You can use this window of time to do calculations or other expensive work, like layout and paint, so that any animations you do in response to the user’s interaction require far less per-frame work.

<img src="images/use-the-rail-performance-model/interaction-pattern.jpg" class="center" alt="A user interaction pattern with 100ms grace period at the start.">

There is also a corresponding window of around 50 - 100ms at the end of the animation where you can do similar kinds of work, typically to clean up or finish the animation.

## Animate
Only an animation itself needs to run at 60fps, and you should do everything in our power to make sure that it can. Often that means being judicious with what you try and animate, in some cases it means dropping animations altogether. It’s often better to do nothing than to do something badly!

Most of the performance issues we will look at in the coming sections will be most acutely felt during animations, since it has the lowest time threshold of around **10ms**, and users will notice if you go over this budget and the frame rate varies.

{% include modules/remember.liquid title="Remember" list=page.notes.scrolling %}

If you want to take a shortcut and get to the “how can I make my animations run at 60fps more reliably?” bit, read the section on changing compositor-only properties.

## Idle
Whenever the app is waiting for user interaction, it is idle, and this is a great time to do additional work, like loading assets or non-critical functionality. The work should be grouped into buckets of about **50ms**, though, because if a user begins interacting then the highest priority is to respond to that, and defer the idle work until later.

A very solid approach for loading content and processing it off the main thread is to use Web Workers. Without DOM access, however, they are of limited use if your Idle work is to manipulate the elements on the page in some way. However, for load-centric work they are ideal because any callbacks won’t obstruct other main thread tasks like any JavaScript, style calculations, or painting.

## Load
Loading comes into two forms:

1. Bootstrapping the app, making it ready for interactions.
2. Continued loading in idle periods through fetch, XHRs, or Web Sockets.

For the former, a upper limit of **1000ms**, or 1 second, should be the goal. Reaching this goal requires prioritizing the Critical Rendering Path, and often deferring subsequent, non-essential loads to periods of idle time (or lazy loading them on demand).

A significant improvement to the load time, and therefore to the user’s experience, can be achieved through use of Service Workers. Using a Service Worker will allow you to both load in an app shell quickly, but also allow your app to run even when the user is offline, which is a significantly better experience for you user than the default offline browser page.

The latter loading should be done judiciously in your app, ideally during periods of idle time. You should avoid long-running callbacks for XHRs, images, and so on, because they potentially reduce your apps’ ability to respond to user input. If you opt to load functionality on demand then you may need a heap or queue to allow you to load items in priority order.

## Threshold Reference
There are many parts to the pipeline, and deriving adequate thresholds for each part of RAIL against the pipeline can be challenging. The table below, however, aims to do just that. You can adjust the numbers given to a specific task to suit your project, of course, but you should leave the thresholds the same.

<table class="table-5">
    <colgroup>
      <col span="1" />
      <col span="1" />
      <col span="1" />
      <col span="1" />
      <col span="1" />
    </colgroup>

    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Response</th>
        <th>Animation</th>
        <th>Idle</th>
        <th>Load</th>
      </tr>
    </thead>

    <tbody>
      <tr style="background: #555; color: #DDD; font-weight: bold;">
        <td data-th="title">Threshold</td>
        <td data-th="response">100ms</td>
        <td data-th="animation">10ms</td>
        <td data-th="idle">50ms chunks</td>
        <td data-th="load">1000ms</td>
      </tr>
      <tr style="background: #CFE2F3;">
        <td data-th="title">Asset load / parse</td>
        <td data-th="response" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="animation" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">400ms</td>
      </tr>
      <tr style="background: #FFF2CC;">
        <td data-th="title">JS: Parse</td>
        <td data-th="response" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="animation" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">30ms</td>
      </tr>
      <tr style="background: #FFF2CC;">
        <td data-th="title">JS: Execute</td>
        <td data-th="response">15ms</td>
        <td data-th="animation">3m</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">60ms</td>
      </tr>
      <tr style="background: #FFF2CC;">
        <td data-th="title">JS: GC</td>
        <td data-th="response" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="animation" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">20ms</td>
      </tr>
      <tr style="background: #D9D2E9;">
        <td data-th="title">Blink: Style Calcs</td>
        <td data-th="response">10ms</td>
        <td data-th="animation">1ms</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">25ms</td>
      </tr>
      <tr style="background: #D9D2E9;">
        <td data-th="title">Blink: Layout</td>
        <td data-th="response">15ms</td>
        <td data-th="animation">3ms</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">90ms</td>
      </tr>
      <tr style="background: #D9D2E9;">
        <td data-th="title">Blink: Layer Management</td>
        <td data-th="response">10ms</td>
        <td data-th="animation">2ms</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">10ms</td>
      </tr>
      <tr style="background: #D9EAD3;">
        <td data-th="title">Blink: Paint</td>
        <td data-th="response">5ms</td>
        <td data-th="animation" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">20ms</td>
      </tr>
      <tr style="background: #D9EAD3;">
        <td data-th="title">Compositor: Rasterize</td>
        <td data-th="response">30ms</td>
        <td data-th="animation" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">100ms</td>
      </tr>
      <tr style="background: #D9EAD3;">
        <td data-th="title">Compositor: Image Decode</td>
        <td data-th="response" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="animation" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">180ms</td>
      </tr>
      <tr style="background: #D9EAD3;">
        <td data-th="title">Compositor: Image Resize</td>
        <td data-th="response" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="animation" style="font-weight: bold; color: #980000">Avoid</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">55ms</td>
      </tr>
      <tr style="background: #D9EAD3;">
        <td data-th="title">Composite</td>
        <td data-th="response">10ms</td>
        <td data-th="animation">2ms</td>
        <td data-th="idle">Unknown</td>
        <td data-th="load">10ms</td>
      </tr>
    </tbody>
  </table>


{% include modules/nextarticle.liquid %}

{% endwrap%}
