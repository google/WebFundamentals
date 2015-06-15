---
rss: false
layout: article
title: "Memory Diagnosis"
seotitle: "Memory Diagnosis"
description: "TBD description."
introduction: "TBD introduction."
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
    - Check and nullify variables that contain references to DOM elements.
    - Let go of references to elements you no longer need to use.
    - Check object properties which may reference other objects.
    - Unbind unneeded event listeners
    - Keep an eye on variable caches.
    - Take care when storing large chunks of data you aren’t going to use.
    - Check the impact of closures on memory.
remember:
  tbd:
    - tbd.
---
{% wrap content %}

Will cover three memory problems and how to diagnose them.

## Too much memory

Track the number of live DOM nodes, documents, and JS event listeners in the inspected render process using the Chrome DevTools Memory view. As a rule of thumb, avoid holding references to DOM elements you no longer need to use, unbind unneeded event listeners, and take care when storing large chunks of data you aren't going to use.

The Timeline memory view and Chrome task manager can help you identify if you’re using too much memory.

TBD. This is also covered a little bit in “Memory mode” section in https://developer.chrome.com/devtools/docs/timeline#timeline-event-reference.

TBD. Some of the eye-catching things we can see in the Heap Profiler recording below include distance: the distance from the GC root. If almost all the objects of the same type are at the same distance, and a few are at a bigger distance, that's something worth investigating.

{% include modules/takeaway.liquid list=page.key-takeaways.too-much-memory %}

### Demos

TBD. List of demos. Leaning toward creating a folder for all the demos and then just having a table describing what the demo shows with a link to the code (maybe?)

** Demo: Watch memory grow: https://developer.chrome.com/devtools/docs/demos/memory/example1

** Demo: memory allocation to objects: https://developer.chrome.com/devtools/docs/demos/memory/example3

** Demo on detached nodes: https://developer.chrome.com/devtools/docs/demos/memory/example4

** Demo: https://developer.chrome.com/devtools/docs/demos/memory/example7

** Demo: https://developer.chrome.com/devtools/docs/demos/memory/example8 

** Demo: https://developer.chrome.com/devtools/docs/demos/memory/example9 

## Memory Leaks

TBD. Describe memory mode and Heap Profiler working together. What’s kind of annoying is that Heap Profiler doesn’t cover memory mode lead-in, and memory mode lead-in doesn’t really make a solid bridge to Heap Profiler.
 
TBD: “Memory mode can’t show you exactly what is causing a memory leak, but it can help you identify what events in your application may be leading to a memory leak.” How? The Object allocation tracker can help you narrow down leaks by looking at JS object allocation in real-time. You can also use the heap profiler to take JS heap snapshots, analyze memory graphs and compare snapshots to discover what objects are not being cleaned up by garbage collection.

TBD. Also important to cover how to detect and fix a leaky DOM
Memory doc below can help with this, but also: http://slides.com/gruizdevilla/memory#/

{% include modules/takeaway.liquid list=page.key-takeaways.tldr-tbd %}

### Demos

TBD. List of demos could be in a table with links off to demo folder.

** Demo: uncovering DOM leaks: https://developer.chrome.com/devtools/docs/heap-profiling-dom-leaks

** Demo: leaking dom nodes: https://developer.chrome.com/devtools/docs/demos/memory/example6 

** Demo: ** Demo: https://developer.chrome.com/devtools/docs/heap-profiling-summary

## Garbage Collection

TBD. If you are GCing frequently, you may be allocating too frequently. The Timeline memory view can help you identify pauses of interest.

TBD. Demo: Garbage Collection: https://developer.chrome.com/devtools/docs/demos/memory/example2

{% include modules/nextarticle.liquid %}

{% endwrap %}
