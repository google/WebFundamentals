---
rss: false
layout: article
title: "How to Use the Allocation Profiler Tool"
seotitle: "How to Use the Allocation Profiler Tool"
description: "Learn how to the allocation profiler tool to find objects that aren't being properly garbage collected, and continue to retain memory."
introduction: "Learn how to the allocation profiler tool to find objects that aren't being properly garbage collected, and continue to retain memory."
article:
  written_on: 2015-04-14
  updated_on: 2015-07-09
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

The **object tracker** combines the detailed snapshot information of the
[heap profiler](tools/profile-performance/memory-problems/heap-snapshots)
with the incremental updating and tracking of the Timeline panel.
Similar to these tools, tracking objects’ heap allocation involves starting a recording,
performing a sequence of actions, then stop the recording for analysis.

The object tracker takes heap snapshots periodically throughout the recording (as frequently as every 50 ms!) and one final snapshot at the end of the recording. The heap allocation profile shows where objects are being created and identifies the retaining path.

{% include modules/toc.liquid %}

## Enable the Object Tracker

To begin using the Object Tracker:

1. Make sure you have the latest [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html).

2. Open the Developer Tools and click on the gear icon in the lower right.

3. Now, open the Profiler panel, you should see a profile called "Record Heap Allocations"

![Select profiling type](imgs/image_27.png)

## Reading a heap allocation profile

The bars at the top indicate when new objects are found in the heap.  The height of each bar corresponds to the size of the recently allocated objects, and the color of the bars indicate whether or not those objects are still live in the final heap snapshot: blue bars indicate objects that are still live at the end of the timeline, gray bars indicate objects that were allocated during the timeline, but have since been garbage collected.

[Object allocation tracker snapshot](imgs/collected.png)

In the example above, an action was performed 10 times.  The sample program caches five objects, so the last five blue bars are expected.  But the leftmost blue bar indicates a potential problem. You can then use the sliders in the timeline above to zoom in on that particular snapshot and see the objects that were recently allocated at that point.

![](imgs/image_29.png)

Clicking on a specific object in the heap will show its retaining tree in the bottom portion of the heap snapshot. Examining the retaining path to the object should give you enough information to understand why the object was not collected, and you can make the necessary code changes to remove the unnecessary reference.

{% include modules/nextarticle.liquid %}

{% endwrap %}
