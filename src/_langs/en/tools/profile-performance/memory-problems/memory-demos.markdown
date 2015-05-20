---
rss: false
layout: article
title: "Memory Profiling Demos"
seotitle: "Memory Profiline Demos"
description: "TBD description."
introduction: "TBD introduction."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 5
authors:
  - megginkearney
priority: 0
collection: memory-problems
key-takeaways:
  tbd:
    - tbd.
remember:
  tbd:
    - tbd.
---
{% wrap content %}

Although we've mentioned them throughout this guide, a good set of end-to-end examples for testing various memory issues, ranging from growing memory leaking DOM nodes can be found summarized below. You may wish to experiment with them before attempting to use the tooling on your own more complex page or application.

{% include modules/toc.liquid %}

## Example 1: Growing memory

Sample code to force memory growth:

{% include_code _code/example1.js full javascript %}

{% link_sample _code/example1.html %}Watch the memory grow.{% endlink_sample %}

## Example 2: Garbage collection inaction

Sample code to create lots of chunks and watch the Garbage Collector in overload mode:

{% include_code _code/example2.js full javascript %}

{% link_sample _code/example2.html %}Watch time spent by Garbage Collector.{% endlink_sample %}

## Example 3: Scattered objects

Sample code to create scattered objects:

{% include_code _code/example3.js full javascript %}

{% link_sample _code/example3.html %}Take a heap snapshot and watch the object (Item) allocations.{% endlink_sample %}

## Example 4: Detached nodes

Sample code to create detached nodes:

{% include_code _code/example4.js full javascript %}

{% link_sample _code/example4.html %}Watch nodes evolution in memory timeline.{% endlink_sample %}

## Example 5: Memory and hidden classes

Sample code to create objects with inner classes and without inner classes so that you can compare how much memory is saved using [hidden classes](https://developers.google.com/v8/design):

{% include_code _code/example5.js full javascript %}

{% link_sample _code/example5.html %}Compare memory usage with and without hidden class usage.{% endlink_sample %}

## Example 6: Leaking DOM nodes

Sample code to create leaking DOM nodes:

{% include_code _code/example6.js full javascript %}

{% link_sample _code/example6.html %}Watch timeline while creating leaking DOM nodes.{% endlink_sample %}

## Example 7: Eval is evil (almost always)

Sample code to analyze the impact of closures on memory:

{% include_code _code/example7.js full javascript %}

{% link_sample _code/example7.html %}Analyze the impact of closures on memory.{% endlink_sample %}

## Example 8: Recording heap allocations

Sample code to create new closures:

{% include_code _code/example8.js full javascript %}

{% link_sample _code/example8.html %}See how `eval` retains a reference on all variables of the closure.{% endlink_sample %}

## Example 9: DOM leaks bigger than expected

Sample code to create a subtree of DOM nodes and then detach the tree:

{% include_code _code/example9.js full javascript %}

{% link_sample _code/example9.html %}Watch bigger than expected DOM leaks.{% endlink_sample %}

## Example 10: Retaining path

Sample code to create objects and retain path:

{% include_code _code/example10.js full javascript %}

{% link_sample _code/example10.html %}Take heap snapshot and view dominators.{% endlink_sample %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
