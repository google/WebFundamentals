project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: RAIL is a user-centric performance model. Every web app has these four distinct aspects to its life cycle, and performance fits into them in very different ways: Response, Animation, Idle, Load.

{# wf_updated_on: 2017-12-15 #}
{# wf_published_on: 2015-06-07 #}
{# wf_blink_components: Blink>PerformanceAPIs,Blink>JavaScript>Runtime,Blink>Input #}

# Measure Performance with the RAIL Model {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/addyosmani.html" %}

**RAIL** is a **user-centric** performance model that breaks down the user's
experience into key actions. RAIL's [**goals** and **guidelines**](#goals-and-guidelines) aim to
help developers and designers ensure a good user experience for each of these actions. By
laying out a structure for thinking about performance, RAIL enables designers and developers to
reliably target the work that has the highest impact on user experience.

Every web app has four distinct aspects to its life cycle, and performance fits into them in
different ways:

<figure>
  <img src="images/rail.png"
    alt="The 4 parts of the RAIL performance model: Response, Animation, Idle, and Load."/>
  <figcaption>
    <b>Figure X</b>. The 4 parts of the RAIL performance model
  </figcaption>
</figure>

## Goals and guidelines {: #goals-and-guidelines }

In the context of RAIL, the terms **goals** and **guidelines** have specific meanings:

* **Goals**. Key performance metrics related to user experience. Since human perception is
  relatively constant, these goals are unlikely to change any time soon.
* **Guidelines**. Recommendations that help you achieve goals. These may be specific to current
  hardware and network connection conditions, and therefore may change over time.

## Focus on the user {: #ux }

Make users the focal point of your performance effort. The table below describes key metrics of
how users perceive performance delays:

<table class="responsive">
  <thead>
      <th colspan="2">User Perception Of Performance Delays</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Delay">0 to 16ms</td>
      <td data-th="User Reaction">Users are exceptionally good at tracking motion, and they
      dislike it when animations aren't smooth. Users perceive animations as smooth so long as
      60 new frames are rendered every second. That's 16ms per frame, including the time it
      takes for the browser to paint the new frame to the screen, leaving an app about 10ms to
      produce a frame.</td>
    </tr>
    <tr>
      <td data-th="Delay">0 to 100ms</td>
      <td data-th="User Reaction">Respond to user actions within this time window and users
      feel like the result is immediate. Any longer, and the connection between action and
      reaction is broken.</td>
    </tr>
    <tr>
      <td data-th="Delay">100 to 300ms</td>
      <td data-th="User Reaction">Users experience a slight perceptible delay.</td>
    </tr>
    <tr>
      <td data-th="Delay">300 to 1000ms</td>
      <td data-th="User Reaction">Within this window, things feel part of a natural and continuous progression of tasks. For most users on the web, loading pages or changing views represents a task.</td>
    </tr>
    <tr>
      <td data-th="Delay">1000ms or more</td>
      <td data-th="User Reaction">Beyond 1000 milliseconds (1 second), the user loses focus on
      the task they are performing.</td>
    </tr>
    <tr>
      <td data-th="Delay">10000ms or more</td>
      <td data-th="User Reaction">Beyond 10000 milliseconds (10 seconds), users are frustrated
      and are likely to abandon tasks. They may or may not come back later.</td>
    </tr>
  </tbody>
</table>

Users perceive performance delays differently, depending on network conditions and hardware.
For example, loading an experience in 1000ms is plausible on a powerful desktop machine over a
fast Wi-Fi connection, so users have grown accustomed to a 1000ms loading experience. But for
mobile devices over slow 3G connections, loading in 5000ms is a more realistic goal, so mobile
users are generally more patient.

## Response: respond in under 50ms {: #response }

**Goal**: Complete a transition initiated by user input within 100ms. Users spend the majority
of their time waiting for sites to respond to their input, not waiting for the sites to load.

**Guidelines**:

* Respond to user input within 50ms, or else the connection between action and
  reaction is broken. This applies to most inputs, such as clicking buttons, toggling form
  controls, or starting animations. This does not apply to touch drags or scrolls.
* Though it may sound counterintuitive, it's not always the right call to respond to user
  input immediately. You can use this 100ms window to do other expensive work. But be
  careful not to block the user. If possible, do work in the background.
* For actions that take longer than 500ms to complete, always provide feedback.

## Animation: produce a frame in 10ms {: #animation }

**Goal**: Produce frames as fast as the user's hardware can display them. Users notice when
animation frame rates vary.

**Guidelines**:

<ul>
  <li>
    Produce each frame in an animation in 10ms or less. Technically, the maximum budget for
    each frame is 16ms (1000ms / 60 frames per second ≈ 16ms), but browsers need about 6ms to
    render each frame, hence the guideline of 10ms per frame.
  </li>
  <li>
    In high pressure points like animations, the key is to do nothing where you
    can, and the absolute minimum where you can't. Whenever possible, make use of
    the 100ms response to pre-calculate expensive work so that you maximize your
    chances of hitting 60fps.
  </li>
  <li>
    See <a href="/web/fundamentals/performance/rendering/">Rendering Performance</a>
    for various animation optimization strategies.
  </li>
  <li>
  Recognize all the types of animations. Animations aren't just fancy UI effects. Each of these
  interactions are considered animations:
  <ul>
    <li>
      Visual animations, such as entrances and exits, 
      <a href="https://www.webopedia.com/TERM/T/tweening.html">tweens</a>, and loading indicators.
    </li>
    <li>
      Scrolling. This includes flinging, which is when the user starts scrolling, then lets go,
      and the page continues scrolling.
    </li>
    <li>
      Dragging. Animations often follow user interactions, such as panning a map or pinching to
      zoom.
    </li>
  </ul>
</ul>


## Idle: maximize idle time {: #idle }

**Goal**: Maximize idle time to increase the odds that the page responds to user input within
50ms.

**Guidelines**: 

* Use idle time to complete deferred work. For example, for the initial page load, load as little
  data as possible, then use idle time to load the rest.
* Perform work during idle time in 50ms or less. Any longer, and you risk interfering with the
  app's ability to respond to user input within 50ms.
* If a user interacts with a page during idle time work, the user interaction should always
  take the highest priority and interrupt the idle time work.

## Load: deliver content and become interactive in under 5 seconds {: #load }

When pages load slowly, user attention wanders, and users perceive the task as broken. Sites
that load quickly have longer average sessions, lower bounce rates, and higher ad viewability.
See [The Need For Mobile Speed: How Mobile Latency Impacts Publisher Revenue][NEED4SPEED].

[NEED4SPEED]: https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/

**Goals**: 

* For first loads, pages should load and be interactive in 5 seconds or less. 

* On first load, pages should load and get [interactive](/web/tools/lighthouse/audits/time-to-interactive) in under 5 
seconds over slow 3G on median mobile hardware.
* Subsequent loads should take under 2s

**Guidelines**:

* Pages should load and be interactive in 5 seconds or less for first-time mobile users.
* Subsequent visits should load in 2 seconds or less for mobile users.
* Test your load performance on the mobile devices and network connections that are common
  among your users. If your business has information on what devices and network connections your
  users are on, then you can use that combination and set your own loading performance targets. 
  Otherwise, [The Mobile Economy 2017][ME17] suggests that a good global baseline is a
  mid-range Android phone, such as a Moto G4, and a slow 3G network, defined as 400ms RTT and
  400kbps transfer speed. This combination is available on [WebPageTest][WPT].
* Keep in mind that although your typical mobile user's device might claim that it's on a 2G, 3G,
  or 4G connection, in reality the *effective connection speed* is often significantly slower,
  due to packet loss and network variance.
* Focus on optimizing the [Critical Rendering Path][CRP] to unblock rendering.
* You don't have to load everything in under 5 seconds to produce the perception of a complete
  load. Enable progressive rendering and do some work in the background. Defer non-essential
  loads to periods of idle time. See [Website Performance Optimization][Udacity].

[ME17]: https://www.gsma.com/mobileeconomy/
[WPT]: https://www.webpagetest.org/easy
[CRP]: /web/fundamentals/performance/critical-rendering-path/
[Udacity]: https://www.udacity.com/course/website-performance-optimization--ud884

<img src="images/speed-metrics.png" alt="Speed metrics include first paint and time to interactive">

How quickly a page loads can be impacted by a number of different factors:

* Network speed and latency
* Hardware (e.g with slower CPUs)
* Cache eviction
* Differences in L2/L3 caching
* Parsing JavaScript

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

## Summary {: #summary }

RAIL is a lens to look at a website's user experience as a journey composed 
of individual interactions. Once you're of where each interaction fits, you'll
know what users will perceive and what your performance goals are. 

* **Focus on the user**.
* **Respond to user input in under 100ms**.
* **Produce a frame in under 10ms when animating or scrolling**.
* **Maximize main thread idle time**.
* **Load interactive content in under 5000ms**.
