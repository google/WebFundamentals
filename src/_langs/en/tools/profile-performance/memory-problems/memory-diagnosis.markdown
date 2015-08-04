---
rss: false
layout: tools-article
title: "Memory Diagnosis"
seotitle: "Memory Diagnosis"
description: "Effective memory management is crucial for performance. Similar to native applications, web apps can suffer from memory leaks and bloat, but they also have to deal with garbage collection pauses."
introduction: "Effective memory management is crucial for performance. Similar to native applications, web apps can suffer from memory leaks and bloat, but they also have to deal with garbage collection pauses."
article:
  written_on: 2015-04-14
  updated_on: 2015-08-04
  order: 1
authors:
  - megginkearney
priority: 0
collection: memory-problems
key-takeaways:
  too-much-memory:
    - Quickly see if a page is consuming too much memory by monitoring memory columns in the Chrome Task Manager.
    - Determine if memory usage is growing using the memory view in the <a href="/web/tools/profile-performance/evaluate-performance/timeline-tool">Chrome DevTools Timeline</a>.
    - Identify detached nodes still retaining memory using the Chrome DevTools heap profiler.
    - Watch out for frequent garbage collection and garbage collection pauses. Both frequent garbage collection and garbage collection pauses can impact performance.
remember:
  memory-terminology:
    - New to memory management? Get started with the basics in <a href="/web/tools/profile-performance/memory-problems/memory-101">Memory Terminology</a>.
---
{% wrap content %}

A memory leak is a gradual loss of available computer memory.
It occurs when a program repeatedly fails to return memory it has obtained for temporary use.
When you think you have a memory leak,
follow the investigative steps outlined in the table of contents.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.too-much-memory %}

## Check if page uses too much memory

To check if a page uses too much memory, the first thing to do is identify a sequence of actions you suspect is leaking memory. 
This could be anything from navigating around a site, hovering, clicking, or otherwise somehow interacting with page in a way that seems to negatively impact performance more over time.

Once you suspect memory performance issues,
use the
[Chrome DevTools Timeline](/web/tools/profile-performance/evaluate-performance/timeline-tool)
to diagnose excessive memory usage
when you first notice your page has slowed down after extended use.

{% include modules/remember.liquid title="Note" list=page.remember.memory-terminology %}

### Monitor memory using Chrome task manager

Monitor a page's live memory usage using the Chrome task manager.

Access the Task Manager from the Chrome menu > Tools > Task Manager or by pressing <span class="kbd">Shift</span> + <span class="kbd">Esc</span>.

Once open, right-click on the heading area of the columns and enable the JavaScript memory column.
Perform actions that may use too much memory and monitor how the live memory usage changes:

![JavaScript Memory profiling in task manager](imgs/task-manager.png)

### Determine if memory usage is growing using memory view

To diagnose whether memory is the issue,
go to the Timeline panel and Memory view.
Hit the record button and interact with your application,
repeating any steps you feel may be causing a leak. Stop the recording.

The graph you see will display the memory allocated to your application. If it happens to be consuming an increasing amount of this over time (without ever dropping), it’s an indication you may have a memory leak:

![Healthy profile](imgs/normal-sawtooth.png)

The profile for a healthy application should look more like a sawtooth curve
as memory is allocated then freed when the garbage collector comes in.
There’s nothing to worry about here – there’s always going to be a cost of doing business in JavaScript
and even an empty `requestAnimationFrame` will cause this type of sawtooth, you can’t avoid it.

Just ensure it’s not sharp as that’s an indication a lot of allocations are being made,
which can equate to a lot of garbage on the other side.
It's the rate of increase in the steepness of this curve that you need to keep an eye on.

![Sawtooth-shaped graph](imgs/steep-sawtooth.png)

There is also a DOM node counter, Document counter and Event listener count in the Memory view
which can be useful during diagnosis.
DOM nodes use native memory and do not directly affect the JavaScript memory graph.

Once you suspect you have a memory leak, use the heap profiler and object allocation tracker
to discover the source of the leak.

<p class="note">
    <strong>Example:</strong>
    Try out this example of <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example1.html">memory growth</a> where you can practice how to effectively use Timeline memory mode.
</p>

## Discover objects not cleaned up by garbage collection

Discover objects not cleaned up by garbage collection
using the Chrome DevTools Heap profiler in the Profiles panel.

The heap profiler shows memory distribution by your page's JavaScript objects and related DOM nodes.
This helps to discover otherwise invisible leaks happening
due to forgotten detached DOM subtrees floating around.

Use the heap profiler to take JS heap snapshots, analyze memory graphs, compare snapshots, and detect DOM leaks
(see [How to Record Heap Snapshots](/web/tools/profile-performance/memory-problems/heap-snapshots)).

There can be a lot of data in the constructor and retained view.
The object retained with the shortest distance is usually your first candidate for causing a memory leak.
Begin investigation for memory leaks from the first object retained in your tree
as retainers are sorted by distance to the window.

![First retained object](imgs/first-retained.jpg)

Also watch out for yellow and red objects in your heap snapshots.
Red nodes (which have a darker background) do not have direct references from JavaScript to them,
but are alive because they’re part of a detached DOM tree.
There may be a node in the tree referenced from JavaScript (maybe as a closure or variable)
but is coincidentally preventing the entire DOM tree from being garbage collected.

![Red and yellow node objects](imgs/red-yellow-objects.jpg)

Yellow nodes (with a yellow background) however do have direct references from JavaScript.
Look for yellow nodes in the same detached DOM tree to locate references from your JavaScript.
There should be a chain of properties leading from the DOM window to the element (e.g `window.foo.bar[2].baz`).

Watch this animation to understand where detached notes fit
into the overall picture:

![](animations/detached-nodes.gif)

<p class="note">
    <strong>Example:</strong>
    Try out this example of <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example4.html">detached nodes</a> where you can watch node evolution in the Timeline then take heap snapshots to find detached nodes.
</p>

## Narrow down causes of memory leaks

Narrow down the cause of memory leaks by looking at JS object allocation in real-time using the object allocation tracker. The **object tracker** combines the detailed snapshot information of the heap profiler with the incremental updating and tracking of the Timeline panel. 

Tracking objects’ heap allocation involves starting a recording, performing a sequence of actions, then stop the recording for analysis. The object tracker takes heap snapshots periodically throughout the recording (as frequently as every 50 ms) and one final snapshot at the end of the recording. The heap allocation profile shows where objects are being created and identifies the retaining path:

![Object allocation tracker](imgs/allocation-tracker.png)

Learn how to use this tool in [How to Use the Allocation Profiler Tool](/web/tools/profile-performance/memory-problems/allocation-profiler).

## Determine garbage collection frequency

A *garbage collector* (such as the one in V8) needs to be able to locate objects in your application which are *live*, as well as, those which are considered *dead* (garbage*)* and are *unreachable*. If you are GCing frequently, you may be allocating too frequently. 

Also watch out for garbage collection pauses of interest. If **garbage collection** (GC) misses any dead objects due to logical errors in your JavaScript then the memory consumed by these objects cannot be reclaimed. Situations like this can end up slowing down your application over time (see [How to Use the Allocation Profiler Tool](/web/tools/profile-performance/memory-problems/allocation-profiler)).

This often happens when you’ve written your code in such a way that variables and event listeners you don’t require are still referenced by some code. While these references are maintained, the objects cannot be correctly cleaned up by GC.

Remember to check and nullify variables that contain references to DOM elements which may be getting updated/destroyed during the lifecycle of your app. Check object properties which may reference other objects (or other DOM elements). Be sure to keep an eye on variable caches which may accumulate over time.

## Memory Profiling Resources

A good set of end-to-end examples for testing various memory issues,
ranging from growing memory leaking DOM nodes are summarized below:

*   [Example 1: Growing memory](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example1.html)
*   [Example 2: Garbage collection in action](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example2.html)
*   [Example 3: Scattered objects](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example3.html)
*   [Example 4: Detached nodes](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example4.html)
*   [Example 5: Memory and hidden classes](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example5.html)
*   [Example 6: Leaking DOM nodes](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example6.html)
*   [Example 7: Eval is evil (almost always)](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example7.html)
*   [Example 8: Recording heap allocations](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example8.html)
*   [Example 9: DOM leaks bigger than expected](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example9.html)
*   [Example 10: Retaining path](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example10.html)

Additional demos are available for:

* [Gathering scattered objects](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/heap-profiling-summary.html)
* [Verifying action cleanness](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/heap-profiling-comparison.html)
* [Exploring the heap contents](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/heap-profiling-containment.html)
* [Uncovering DOM leaks](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/heap-profiling-dom-leaks.html)
* [Finding accumulation points](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/heap-profiling-dominators.html) 

### Extras 

[Memory Management Masterclass](http://youtu.be/LaxbdIyBkL0) with Addy Osmani gives you a crash-course in debugging memory issues. The [slides for the presentation](https://speakerdeck.com/addyosmani/javascript-memory-management-masterclass) are available as well as the [example code](https://github.com/addyosmani/memory-mysteries).

<br>

<iframe width="560" height="315" src="//www.youtube.com/embed/LaxbdIyBkL0?rel=0" frameborder="0" allowfullscreen=""></iframe>

### Community Resources

There are a number of excellent resources written by the community on finding and fixing memory issues in web apps using the Chrome DevTools. Below are a selection of some you may find useful:

* [Finding and debugging memory leaks with the Chrome DevTools](http://slid.es/gruizdevilla/memory)
* [JavaScript profiling with the DevTools](http://coding.smashingmagazine.com/2012/06/12/javascript-profiling-chrome-developer-tools/)
* [Effective memory management at GMail scale](http://www.html5rocks.com/en/tutorials/memory/effectivemanagement/)
* [Chrome DevTools Revolutions 2013](http://www.html5rocks.com/en/tutorials/developertools/revolutions2013/)
* [Rendering and memory profiling with the DevTools](http://www.slideshare.net/matenadasdi1/google-chrome-devtools-rendering-memory-profiling-on-open-academy-2013)
* [Performance optimization with DevTools timeline and profile](http://addyosmani.com/blog/performance-optimisation-with-timeline-profiles/)

{% include modules/nextarticle.liquid %}

{% endwrap %}
