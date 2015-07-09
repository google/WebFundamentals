---
rss: false
layout: article
title: "Memory Diagnosis"
seotitle: "Memory Diagnosis"
description: "Effective memory management is crucial for performance. Similar to native applications, web apps can suffer from memory leaks and bloat, but they also have to deal with garbage collection pauses."
introduction: "Effective memory management is crucial for performance. Similar to native applications, web apps can suffer from memory leaks and bloat, but they also have to deal with garbage collection pauses."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 1
authors:
  - megginkearney
priority: 0
collection: memory-problems
key-takeaways:
  too-much-memory:
    - Quickly see if a page is consuming too much memory by monitoring memory columns in the Chrome Task Manager.
remember:
  tbd:
    - tbd.
---
{% wrap content %}

A memory leak is a gradual loss of available computer memory.
It occurs when a program repeatedly fails to return memory it has obtained for temporary use.
When you think you have a memory leak,
follow these investigative steps to find out more:

* Check if page uses too much memory.
* Discover objects not being cleaned up by garbage collection.
* Narrow down causes of the memory leak.
* Determine if garbage collection is happening too frequently.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.too-much-memory %}

## Check if page uses too much memory

The Timeline memory view and Chrome task manager can help you identify if you’re using too much memory.

### Chrome task manager

Quickly see if a page is consuming a lot of memory using the Chrome Task Manager.
Access the Task Manager from the Chrome menu > Tools > Task Manager or by pressing <span class="kbd">Shift</span> + <span class="kbd">Esc</span>.
Once open, right-click on the heading area of the columns and enable the JavaScript memory column.
Monitor the memory columns while performing actions that may be causing this to happen:

![JavaScript Memory profiling in task manager](imgs/task-manager.png)

### Memory view in the Chrome DevTools Timeline

Determine if memory usage is growing using the memory view in the Chrome DevTools Timeline panel. To check if a page uses too much memory, the first thing to do is identify a sequence of actions you suspect is leaking memory. 

This could be anything from navigating around a site, hovering, clicking, or otherwise somehow interacting with page in a way that seems to negatively impact performance more over time.

On the Timeline panel,
start recording (<span class="kbd">Ctrl</span> + <span class="kbd">E</span> or <span class="kbd">Cmd</span> + <span class="kbd">E</span>) and perform the sequence of actions you want to test. To force a full garbage collection click the trash icon (![Trash icon](imgs/collect-garbage.png)) at the bottom.

The following lmemory leak pattern shows some nodes are not being collected:

![Nodes not being collected](imgs/nodescollected.png)

If after a few iterations,
you see a [sawtooth](http://en.wikipedia.org/wiki/Sawtooth_wave) shaped graph (in the memory pane at the top), you are allocating lots of shortly lived objects. But if the sequence of actions is not expected to result in any retained memory, and the DOM node count does not drop down back to the baseline where you began, you have good reason to suspect there is a leak.

![Sawtooth-shaped graph]imgs/image_10.png" />

Once you’ve confirmed that the problem exists, you can narrow down the cause of the memory leaks using the Chrome DevTools heap profiler and object allocation tracker.

<p class="note">
    <strong>Example:</strong>
    Try out this example of <a href="demos/memory/example1.html">memory growth</a> where you can practice how to effectively use Timeline memory mode.
</p>

## Discover objects not cleaned up by garbage collection

Discover objects not cleaned up by garbage collection
using the Chrome DevTools Heap profiler in the Profiles panel.

The heap profiler shows memory distribution by your page's JavaScript objects and related DOM nodes.
It reflects bidirectional dependencies between browser native objects
(DOM nodes, CSS rules) and JavaScript objects.
This helps to discover otherwise invisible leaks happening
due to forgotten detached DOM subtrees floating around.

![An example heap snapshot](imgs/profiles-panel.png)

Use the heap profiler to take JS heap snapshots, analyze memory graphs, compare snapshots, and detect DOM leaks
(see [How to Record Heap Snapshots](tools/profile-performance/memory-problems/heap-snapshots)).

## Narrow down causes of memory leaks

Narrow down the cause of these leaks by looking at JS object allocation in real-time using the object allocation tracker. The **object tracker** combines the detailed snapshot information of the heap profiler with the incremental updating and tracking of the Timeline panel. 

Tracking objects’ heap allocation involves starting a recording, performing a sequence of actions, then stop the recording for analysis. The object tracker takes heap snapshots periodically throughout the recording (as frequently as every 50 ms) and one final snapshot at the end of the recording. The heap allocation profile shows where objects are being created and identifies the retaining path.

![Object allocation tracker](imgs/image_26.png)

Learn how to use this tool in [How to Use the Allocation Profiler Tool](tools/profile-performance/memory-problems/allocation-profiler).

## Determine garbage collection frequency

A *garbage collector* (such as the one in V8) needs to be able to locate objects in your application which are *live*, as well as, those which are considered *dead* (garbage*)* and are *unreachable*. If you are GCing frequently, you may be allocating too frequently. 

Also watch out for garbage collection pauses of interest. If **garbage collection** (GC) misses any dead objects due to logical errors in your JavaScript then the memory consumed by these objects cannot be reclaimed. Situations like this can end up slowing down your application over time (see [How to Use the Allocation Profiler Tool](tools/profile-performance/memory-problems/allocation-profiler)).

This often happens when you’ve written your code in such a way that variables and event listeners you don’t require are still referenced by some code. While these references are maintained, the objects cannot be correctly cleaned up by GC.

Remember to check and nullify variables that contain references to DOM elements which may be getting updated/destroyed during the lifecycle of your app. Check object properties which may reference other objects (or other DOM elements). Be sure to keep an eye on variable caches which may accumulate over time.

## Memory Profiling Resources

A good set of end-to-end examples for testing various memory issues,
ranging from growing memory leaking DOM nodes are summarized below:

*   [Example 1: Growing memory](/devtools/docs/demos/memory/example1.html)
*   [Example 2: Garbage collection in action](/devtools/docs/demos/memory/example2.html)
*   [Example 3: Scattered objects](/devtools/docs/demos/memory/example3.html)
*   [Example 4: Detached nodes](/devtools/docs/demos/memory/example4.html)
*   [Example 5: Memory and hidden classes](/devtools/docs/demos/memory/example5.html)
*   [Example 6: Leaking DOM nodes](/devtools/docs/demos/memory/example6.html)
*   [Example 7: Eval is evil (almost always)](/devtools/docs/demos/memory/example7.html)
*   [Example 8: Recording heap allocations](/devtools/docs/demos/memory/example8.html)
*   [Example 9: DOM leaks bigger than expected](/devtools/docs/demos/memory/example9.html)
*   [Example 10: Retaining path](/devtools/docs/demos/memory/example10.html)
*   [Example 11: Last exercise](/devtools/docs/demos/memory/example11.html)

Additional demos are available for:

* [Gathering scattered objects](heap-profiling-summary.html)
* [Verifying action cleanness](heap-profiling-comparison.html)
* [Exploring the heap contents](heap-profiling-containment.html)
* [Uncovering DOM leaks](heap-profiling-dom-leaks.html)
* [Finding accumulation points](heap-profiling-dominators.html) 

### Extras 

[Memory Management Masterclass](http://youtu.be/LaxbdIyBkL0) with Addy Osmani gives you a crash-course in debugging memory issues. The [slides for the presentation](https://speakerdeck.com/addyosmani/javascript-memory-management-masterclass) are available as well as the [example code](https://github.com/addyosmani/memory-mysteries). 

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
