---
rss: false
layout: tools-article
title: "Speed Up JavaScript Execution"
seotitle: "Speed Up JavaScript Execution Using DevTools Profiles Panel"
description: "Learn how to identify expensive functions using the Chrome DevTools CPU profiler, Flamechart, and V8 optimization checks."
introduction: "Learn how to identify expensive functions using the Chrome DevTools CPU profiler, Flamechart, and V8 optimization checks."
article:
  written_on: 2015-04-14
  updated_on: 2015-07-16
  order: 2
authors:
  - megginkearney
priority: 0
collection: rendering-tools
key-takeaways:
  javascript-performance:
    - Visualize expensive functions using the Chrome DevTools CPU profiler.
    - Visualize expensive functions over time using the Chrome DevTools Flamechart.
    - Identify specific functions that the V8 engine can't optimize and why as a next step to making these functions better.
remember:
  absolute-times:
    - Click the <strong>Percentage</strong> button to view absolute times.
  high-resolution:
    - For increased accuracy, enable <strong>High resolution CPU profiling</strong> in the DevTools flame-chart under Profiling. When enabled, you can zoom into the graph to view it by a tenth of a millisecond.
  optimize:
    - Learn more about how to write JavaScript the V8 engine can optimize in <a href="http://www.html5rocks.com/en/tutorials/speed/v8/">Performance Tips for JavaScript in V8</a>.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.javascript-performance %}

## Visualize JavaScript performance in a CPU profile

If you’re noticing jank in your JavaScript,
collect a JavaScript CPU profile.
CPU profiles show where execution time is spent in your page’s functions.

The sidebar on the left lists your recorded profiles,
the tree view on the right shows the information gathered for the selected profile:

![Sample CPU profile](imgs/cpu-profile.png)

### Record a CPU profile

First verify the CPU profiler is enabled:

1. Navigate to the Chrome DevTools Profiles panel.
2. Verify "Collect JavaScript CPU Profile" is selected.

To start recording a JavaScript CPU profiler:

1. Open the page that calls the JavaScript you wish to profile.
For example, let's profile the [Google Chrome V8 Benchmark Suite](http://v8.googlecode.com/svn/data/benchmarks/v7/run.html).
2. Open the Chrome DevTools Profiles panel and click the **Start** button or press <span class="kbd">Cmd</span> + <span class="kbd">E</span>.
3. Refresh the V8 Benchmark Suite page. When the page has completed reloading, a score for the benchmark tests is shown.
4. Return to the Profiles panel and stop the recording by clicking the Stop button or by pressing <span class="kbd">Cmd</span> + <span class="kbd">E</span> again.

### View CPU profile

The following **Bottom Up** view lists functions by impact on performance. It also enables you to examine the calling paths to those functions.

![Bottom-up view of CPU profile](imgs/heavy-bottom-up.png)

The **Top Down** view shows an overall picture of the calling structure, starting at the top of the call stack.
Select the **Top Down** view by clicking the Bottom Up / Top Down selection button. Then click the small arrow to the left of **(program)** in the **Function** column.

{% include modules/remember.liquid title="Note" list=page.remember.absolute-times %}

Select one of the functions in the **Function** column,
then click the **Focus selected function** button (the Eye icon on the right).
This filters the profile to show only the selected function and its callers:

![Focus on selected function](imgs/focus-selected-function.png)

### Exclude functions from CPU profile

The **Exclude selected function** button removes the selected function from the profile and charges its callers with the excluded function's total time.

1. Click the **Reload** button at the bottom-right of the window to restore the profile to its original state.
2. Select one of the functions in the **Function** column.
3. Click the **Exclude selected function** button (the X icon). 

Depending on the function you selected, you should see something like this:

![Exclude selected function](imgs/tree-top-down.png)

### Customize the CPU profiler

Use the [Chrome DevTools Console](/web/tools/javascript/console/console-ui) and [Command Line API](/web/tools/javascript/command-line/)
to customize and control CPU profiles:

* Create profiles from console using [profile() and profileEnd()](/web/tools/javascript/command-line/command-line-reference?hl=en#profilename-and-profileendname).
* [Group profiles](/web/tools/javascript/command-line/command-line-reference?hl=en#profilename-and-profileendnam) from console by using the same label.

## How to profile JavaScript performance over time

The Flame Chart view provides a visual representation
of JavaScript processing aggregated _over_time_,
similar to those found in the
[Timeline](/web/tools/profile-performance/evaluate-performance/timeline-tool) and 
[Network](/web/tools/profile-performance/network-performance/resource-loading) panels.

### Read the Flame Chart

The horizontal axis is time and vertical axis is the call stack.
Expensive functions are wide.
Call stacks are represented on the Y axis,
so a tall flame is not necessarily significant.
Pay close attention to wide bars,
no matter their position in the call stack.

![Flamechart view](imgs/flamechart.png)

Identify outlier functions with color coding.
When zoomed out you can identify repetitive patterns that could be optimized,
or more importantly, you're able to spot outliers or unexpected executions much easier.

![Identify outlier functions through color coding](imgs/flamechart-outliers.png)

### How to use the Flame Chart:

1.  Open the DevTools and go to the Profiles panel.
2.  Choose **Record JavaScript CPU profile** and click **Start**.
3.  When you are done collecting data, click **Stop**.

In the profile view,
select the Flame Chart visualization from the select menu at the bottom of the DevTools.

![Flamechart menu](imgs/flamechart-menu.jpg)

{% include modules/remember.liquid title="Note" list=page.remember.high-resolution %}

### Zoom in on specific parts of recording

Across the top of the panel is an overview that shows the entire recording.
Zoom in on a specific region of the overview
by selecting it with your mouse as shown below.

You can also pan left and right by clicking on the white area and
dragging your mouse.
The Details view timescale shrinks accordingly.

![Flamechart zoom](imgs/flamechart-zoom.png)

### View call stacks

In the Details view,
a **call stack** is represented as a stack of function "blocks".
A block that sits atop another was called by the lower function block.
Hovering over a given block displays its function name and timing data:

![Flamechart hover](imgs/flamechart-hover.jpg)

*  **Name** — The name of the function.
*  **Self time** — How long it took to complete the current invocation of the function, including only the statements in the function itself, not including any functions that it called.
*  **Total time** — The time it took to complete the current invocation of this function and any functions that it called.
*  **Aggregated self time** — Aggregate time for all invocations of the function across the recording, not including functions called by this function.
*  **Aggregated total time** — Aggregate total time for all invocations of the function, including functions called by this function.

### Open function in Sources panel

The colors in the Flame Chart are random;
however, functions will always be colored the same across invocations.
This allows you to see a pattern of execution and spot outliers easier.
There is no correlation to the colors used in the Timeline.

Clicking a function block opens its containing JavaScript file in the Sources panel, at the line where the function is defined:

![Function block](imgs/function-block.png)

## Test for optimized functions

The [standalone "d8" version](https://developers.google.com/v8/build)
provides tools to test whether or not your JavaScript
can be optimized by the V8 engine.

Two tools worth calling out are `d8 --trace-opt primes.js`,
which lists all optimized functions, and
`d8 --trace-deopt primes.js`,
which lists functions that the V8 engine can't optimize.

### List optimized functions

Log what gets optimized using the
[standalone "d8" version](https://developers.google.com/v8/build)
of the V8 engine:
`d8 --trace-opt primes.js`. This logs names of optimized functions to stdout.

V8 re-compiles "hot" functions (that is, functions that are run many times) with an optimizing compiler. This compiler uses type feedback to make the compiled code faster.

In the optimizing compiler, operations get speculatively inlined (directly placed where they are called). This speeds execution (at the cost of memory footprint), but also enables other optimizations. Monomorphic functions and constructors can be inlined entirely.

Not all functions can be optimized.
Some features prevent the optimizing compiler from running on a given function (a "bail-out"). The `--trace-opt` option above gives you more information on which functions were bailed out.

### List de-optimized functions

Sometimes optimization doesn't work out.
The process of "deoptimization" throws away optimized code, and resumes execution at the right place in "full" compiler code.

Reoptimization might be triggered again later,
but for the short term, execution slows down.
In particular, causing changes in the hidden classes of variables after the functions have been optimized will cause this deoptimization to occur.

Therefore:

Avoid hidden class changes in functions after they are optimized.
Get a log of functions that V8 had to deoptimize with a logging flag:
`d8 --trace-deopt primes.js`.

{% include modules/remember.liquid title="Note" list=page.remember.optimize %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
