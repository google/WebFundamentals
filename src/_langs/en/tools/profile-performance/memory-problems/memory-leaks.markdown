---
rss: false
layout: article
title: "Does Page Have Memory Leaks?"
seotitle: "Does Page Have Memory Leaks?"
description: "TBD description."
introduction: "TBD introduction."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 3
authors:
  - megginkearney
priority: 0
collection: memory-problems
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

TBD. Describe memory mode and Heap Profiler working together. What’s kind of annoying is that Heap Profiler doesn’t cover memory mode lead-in, and memory mode lead-in doesn’t really make a solid bridge to Heap Profiler.
 
TBD: “Memory mode can’t show you exactly what is causing a memory leak, but it can help you identify what events in your application may be leading to a memory leak.” How? The Object allocation tracker can help you narrow down leaks by looking at JS object allocation in real-time. You can also use the heap profiler to take JS heap snapshots, analyze memory graphs and compare snapshots to discover what objects are not being cleaned up by garbage collection.

TBD. Also important to cover how to detect and fix a leaky DOM
Memory doc below can help with this, but also: http://slides.com/gruizdevilla/memory#/

{% include modules/takeaway.liquid list=page.key-takeaways.tldr-tbd %}

## Demos

TBD. List of demos could be in a table with links off to demo folder.

** Demo: uncovering DOM leaks: https://developer.chrome.com/devtools/docs/heap-profiling-dom-leaks

** Demo: leaking dom nodes: https://developer.chrome.com/devtools/docs/demos/memory/example6 

** Demo: ** Demo: https://developer.chrome.com/devtools/docs/heap-profiling-summary

{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
