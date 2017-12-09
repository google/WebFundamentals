project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: RAIL is a user-centric performance model. Every web app has these four distinct aspects to its life cycle, and performance fits into them in very different ways: Response, Animation, Idle, Load.

{# wf_updated_on: 2017-12-08 #}
{# wf_published_on: 2015-06-07 #}

# Measure Performance with the RAIL Model {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/addyosmani.html" %}

RAIL is a **user-centric** performance model. It breaks down the user's experience
into key actions, providing **goals** and **guidelines** for these actions.
By laying out a structure for thinking about performance, RAIL enables
designers and developers to reliably target the highest-impact work.

Every web app has these four distinct aspects to its life cycle, and performance 
fits into them in different ways:

![RAIL performance model](images/rail.png)

### TL;DR {: .hide-from-toc }

- Focus on the user; the end goal isn't to make your site perform fast on any 
specific device, it's to ultimately make users happy.
- Respond to users immediately; acknowledge user input in under 100ms.
- When animating or scrolling, produce a frame in under 10ms.
- Maximize main thread idle time.
- Keep users engaged; deliver interactive content in under 5s on slow 3G on median mobile phones

## Focus on the user

Make users the focal point of your performance effort.
The majority of time users spend in your site isn't waiting for it to load,
but waiting for it to respond while using it.

Understand how users perceive performance delays:

<table class="responsive">
  <thead>
      <th colspan="2">Delay &amp; User Reaction</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Delay">0 - 16ms</td>
      <td data-th="User Reaction">People are exceptionally good at tracking
      motion, and they dislike it when animations aren't smooth. Users
      perceive animations as smooth so long as 60 new frames are rendered
      every second. That's 16ms per frame, including the time it takes for
      the browser to paint the new frame to the screen, leaving an app
      about 10ms to produce a frame.</td>
    </tr>
    <tr>
      <td data-th="Delay">0 - 100ms</td>
      <td data-th="User Reaction">Respond to a user action within this time window and users feel like the result is immediate. Any longer, and the connection between action and reaction is broken.</td>
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

The perception of performance delays can vary based on mobile hardware
and network conditions. While loading an experience in 1000ms is plausible on
a powerful desktop machine over cable, on mobile, ensuring users can load and 
interact with content in under 5000s is a more [realistic](http://chimera.labs.oreilly.com/books/1230000000545/ch08.html#MOBILE_NETWORK_LATENCY_OVERHEAD) target under slow 3G.

A user on a 2G/3G/4G connection is almost never always on such a connection
either. Due to packet loss and network variance, their **effective connection
type** could be significantly slower.

## Goals and guidelines

RAIL offers a set of performance **guidelines** which map closely to set of 
**goals** regarding user-facing performance metrics. We believe that our
guidelines can help you achieve the goals.

* **Goals** aim to be timeless
* Following the **Guidelines** should result in achieving goals, but may
be specific to current hardware / connection speed distributions.

## Response: respond in under 50ms {: #response }

**Guideline**: You have 100ms to perform work related to transitioning.

**Goal**:
We want to transition in under this time and suggest you have 50ms to 
respond to user input before they notice a lag. This applies to most inputs, 
such as clicking buttons, toggling form controls, or starting animations. 
This does not apply to touch drags or scrolls.

If you don't respond, the connection between action and reaction is broken. Users will notice.

While it may seem obvious to respond to user's actions immediately,
that's not always the right call.
Use this 100ms window to do other expensive work, but be careful not to block the user.
If possible, do work in the background.

For actions that take longer than 500ms to complete, always provide feedback.

## Animation: produce a frame in 10ms {: #animation }

**Guideline**: You have 10ms to perform work related to producting a frame
in an animation.

**Goal**
Animations aren't just fancy UI effects. Users notice when the animation 
frame rate varies.

Animation includes the following:

* **visual animation**: This includes entrance and exit animations, tweened state 
changes, and loading indicators.
* **scrolling**: This refers to when the user starts scrolling and lets go and the 
page is flung.
* **drag**: While we need to respond to the user’s interaction in under 100 ms, 
animation might follow as a result, as when panning a map or pinching to zoom.

Your goal is to produce frames as fast as the hardware can display them.

* For 60hz devices, this is once every 16ms. 
* For the 60hz case, we've leaving Chrome 6ms to do its work

When you're attempting to produce 60 frames per second, and every frame has to go 
through all of these steps:

![Steps to render a frame](images/render-frame.png)

From a purely mathematical point of view, every frame has a budget of about 
16ms (1000ms / 60 frames per second = 16.66ms per frame). However, because
browsers need some time to paint the new frame to the screen, **your code
should finish executing in under 10ms**. 

In high pressure points like animations, the key is to do nothing where you
can, and the absolute minimum where you can't. Whenever possible, make use of
the 100ms response to pre-calculate expensive work so that you maximize your
chances of hitting 60fps.

For more information, see
[Rendering Performance](/web/fundamentals/performance/rendering/).

## Idle: maximize idle time {: #idle }

**Guideline**: You have 50ms to perform work during idle periods.

**Goal**: This is part of achieving 100ms response times.

Use idle time to complete deferred work. For example, keep pre-load data to a minimum so that your app loads fast, and use idle time to load remaining data.

Deferred work should be grouped into blocks of about 50ms. Should a user begin interacting, then the highest priority is to respond to that. 

To allow for <100ms response,
the app must yield control back to main thread every <50ms,
such that it can execute its pixel pipeline, react to user input, and so on.

Working in 50ms blocks allows the task to finish while still ensuring instant response.

## Load: deliver content & become interactive in under 5 seconds {: #load }

**Goal**: 

* On first load, pages should load and get [interactive](/web/tools/lighthouse/audits/time-to-interactive) in under 5 
seconds over slow 3G on median mobile hardware.
* Subsequent loads should take under 2s

**Guideline**:  

Loading your site quickly matters. If you don't, user attention wanders,
and their perception of dealing with the task is broken. Sites that load
in under [5 seconds](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) have longer average sessions, lower bounce rates and higher ad viewability.

<img src="images/speed-metrics.png" alt="Speed metrics include first paint and time to interactive">

Some teams and businesses are intimately aware of their audience and can
make informed estimates about the devices and networks their prospective
users are on. When this is the case, you're in a good position to set your
own targets for loading performance.

Many of us do not have such a baseline easily accessible however. Data suggests 
that [the median user is on a slow network](https://goo.gl/fDkY1g) so it's 
important to ensure pages can load and be interactive even on slower networks.

A global baseline we recommend for testing loading performance on mobile is:

* A median Android phone (such as the Moto G4)
* On a slow 3G network, emulated at 400ms RTT and 400kbps transfer.

This [configuration](https://github.com/WPO-Foundation/webpagetest/blob/6a79fedb6bb5792f11d2891d9ae80f8ffb8b1a7d/www/settings/connectivity.ini.sample#L61) is available on [WebPageTest](https://www.webpagetest.org/easy) allowing us to re-create these conditions in a straight-forward way.

How quickly a page loads can be impacted by a number of different factors:

* Network speed and latency
* Hardware (e.g with slower CPUs)
* Cache eviction
* Differences in L2/L3 caching
* Parsing JavaScript

Focus on
[optimizing the critical rendering path](/web/fundamentals/performance/critical-rendering-path/)
to unblock rendering.

You don't have to load everything in under 5 seconds to produce the perception of a complete load. Enable progressive rendering and do some work in the background. Defer non-essential loads to periods of idle time (see this [Website Performance Optimization Udacity course](https://www.udacity.com/course/website-performance-optimization--ud884) for more information).

Note: To learn more about loading performance budgets for mobile, see [Real-world Performance
Budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/).

## Summary of key RAIL metrics

To evaluate your site against RAIL metrics, you can use [Chrome DevTools](/web/tools/chrome-devtools/), [Lighthouse](/web/tools/lighthouse/) and [WebPageTest](https://webpagetest.org/easy).

### Chrome DevTools

Use the Chrome DevTools [Performance Panel](/web/tools/chrome-devtools/evaluate-performance/reference) to record user actions. Then check the recording times in the Timeline against these key RAIL metrics:

<table>
  <thead>
      <th>RAIL Step</th>
      <th>Key Metric</th>
      <th>User Actions</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="RAIL Step"><strong>Response</strong></td>
      <td data-th="Key Metric">Input latency (from tap to paint) < 100ms.</td>
      <td data-th="User Test">User taps a button (for example, opening navigation).</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Animation</strong></td>
      <td data-th="Key Metric">Each frame's work (from JS to paint) completes < 16ms.</td>
      <td data-th="User Test">User scrolls the page, drags a finger (to open
        a menu, for example), or sees an animation. When dragging, the app's
        response is bound to the finger position, such as pulling to refresh,
        or swiping a carousel. This metric applies only to the continuous
        phase of drags, not the start.
      </td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Idle</strong></td>
      <td data-th="Key Metric">Main thread JS work chunked no larger than 50ms.</td>
      <td data-th="User Test">User isn't interacting with the page, but main thread should be available enough to handle the next user input.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Load</strong></td>
      <td data-th="Key Metric">Page can be interacted with in 5000ms on mobile over 3G.</td>
      <td data-th="User Test">User loads the page and sees the critical path content. This 
      can be tested using the DevTools <a href="/web/tools/chrome-devtools/network-performance/network-conditions">network</a> and <a href="/web/tools/chrome-devtools/evaluate-performance/">CPU</a> emulation.</td>
    </tr>
  </tbody>
</table> 

### Lighthouse

Lighthouse can audit for different page load performance metrics including modern
speed metrics like [Time-to-Interactive](/web/tools/lighthouse/audits/time-to-interactive).

<img src="images/lighthouse-performance.png" alt="Lighthouse performance metrics">

## Conclusions

RAIL is a lens to look at a website's user experience as a journey composed 
of individual interactions. Once you're of where each interaction fits, you'll
know what users will perceive and what your performance goals are. 


