---
rss: false
layout: article
title: "Does Page Use Too Much Memory?"
seotitle: "Does Page Use Too Much Memory?"
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
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

TBD. Possible TL;DR:

** Check and nullify variables that contain references to DOM elements.

** Let go of references to elements you no longer need to use.

** Check object properties which may reference other objects.

** Unbind unneeded event listeners

** Keep an eye on variable caches.

** Take care when storing large chunks of data you aren’t going to use.

** Check the impact of closures on memory.

TBD. The Timeline memory view and Chrome task manager can help you identify if you’re using too much memory.

TBD. Some of the eye-catching things we can see in the Heap Profiler recording below include distance: the distance from the GC root. If almost all the objects of the same type are at the same distance, and a few are at a bigger distance, that's something worth investigating.

{% include modules/takeaway.liquid list=page.key-takeaways.tldr-tbd %}

## Demos

TBD. List of demos. Leaning toward creating a folder for all the demos and then just having a table describing what the demo shows with a link to the code (maybe?)

** Demo: Watch memory grow: https://developer.chrome.com/devtools/docs/demos/memory/example1

** Demo: memory allocation to objects: https://developer.chrome.com/devtools/docs/demos/memory/example3

** Demo on detached nodes: https://developer.chrome.com/devtools/docs/demos/memory/example4

** Demo: https://developer.chrome.com/devtools/docs/demos/memory/example7

** Demo: https://developer.chrome.com/devtools/docs/demos/memory/example8 

** Demo: https://developer.chrome.com/devtools/docs/demos/memory/example9 

{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
