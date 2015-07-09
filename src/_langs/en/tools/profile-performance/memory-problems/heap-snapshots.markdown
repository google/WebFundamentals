---
rss: false
layout: article
title: "How to Record Heap Snapshots"
seotitle: "How to Record Heap Snapshots"
description: "Learn how to record heap snapshots with the Chrome DevTools heap profiler and find memory leaks."
introduction: "Learn how to record heap snapshots with the Chrome DevTools heap profiler and find memory leaks."
article:
  written_on: 2015-06-09
  updated_on: 2015-06-09
  order: 4
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

The Chrome DevTools heap profiler shows memory distribution by your page's JavaScript objects and related DOM nodes. Use it to take JS heap snapshots, analyze memory graphs, compare snapshots, and find memory leaks.

{% include modules/toc.liquid %}

## Take a snapshot

On the Profiles panel, choose ** *Take Heap Snapshot* **, then click **Start** or press <span class="kbd">Cmd</span> + <span class="kbd">E</span> or <span class="kbd">Ctrl</span> + <span class="kbd">E</span>:

![Select profiling type](imgs/image_11.png)

**
**Snapshots are initially stored in the renderer process memory. They are transferred to the DevTools on demand, when you click on the snapshot icon to view it. After the snapshot has been loaded into DevTools and has been parsed, the number below the snapshot title appears and shows the total size of the [reachable](tools/profile-performance/memory-problems/memory-101#object-sizes) JavaScript objects:

![Total size of reachable objects](imgs/image_12.png)

## Clear snapshots

Remove snapshots (both from DevTools and renderers memory) by pressing the Clear all profiles icon (![Clear all profiles icon](imgs/clear.png)):

![Remove snapshots](imgs/image_15.png)

Closing the DevTools window will not delete profiles from the renderers memory. When reopening DevTools, all previously taken snapshots will reappear in the list of snapshots.

<p class="note"><strong>Example:</strong> Try out this example of <a href="demos/memory/example3.html">scattered objects</a> and profile it using the Heap Profiler. You should see a number of (object) item allocations.</p>

## View snapshots

View snapshots from different perspectives for different tasks:

* **Summary view** shows objects grouped by the constructor name.

* **Comparison view** displays difference between two snapshots.

* **Containment view ** allows exploration of heap contents.

* **Dominators **view shows the [dominators tree](tools/profile-performance/memory-problems/memory-101#dominators) and can be useful to find accumulation points.

To switch between views, use the selector at the bottom of the view:

![Switch views selector](imgs/image_17.png)

### Summary view

Initially, a snapshot opens in the Summary view, displaying object totals, which can be expanded to show instances:

![Summary view](imgs/image_19.png)

Top-level entries are "total" lines. They display:

* **Constructor** represents all objects created using this constructor.

* **Number of object instances** is displayed in the # column.

* **Shallow size** column displays the sum of [shallow sizes](tools/profile-performance/memory-problems/memory-101#object-sizes) of all objects created by a certain constructor function

* **Retained size** column displays the maximum retained size among the same set of objects.

* **Distance** displays the distance to the root using the shortest simple path of nodes.

After expanding a total line in the upper view, all of its instances are displayed. For each instance, its shallow and retained sizes are displayed in the corresponding columns. The number after the @ character is the objects’ unique ID, allowing you to compare heap snapshots on per-object basis.

<p class="note"><strong>Example:</strong> Try this <a href="heap-profiling-summary.html">demo page</a> (opens in a new tab) to understand how the Summary view can be used.</p>

Remember that yellow objects have JavaScript references on them and red objects are detached nodes which are referenced from one with a yellow background.

### Comparison view

Find leaked objects by comparing multiple snapshots to each other. To verify that a certain application operation doesn't create leaks (for example, usually a pair of direct and reverse operations, like opening a document, and then closing it, should not leave any garbage), you may follow the scenario below:

1. Take a heap snapshot before performing an operation;

2. Perform an operation (interact with a page in some way that you believe to be causing a leak);

3. Perform a reverse operation (do the opposite interaction and repeat it a few times);

4. Take a second heap snapshot and change the view of this one to Comparison, comparing it to snapshot 1.

In the Comparison view, the difference between two snapshots is displayed. When expanding a total entry, added and deleted object instances are shown:

![Comparison view](imgs/image_21.png)

<p class="note"><strong>Example:</strong> Try this <a href="heap-profiling-comparison.html">demo page</a> (opens in a new tab) to get an idea how to use snapshot comparison for detecting leaks.</p>

### Containment view

The Containment view is essentially a "bird's eye view" of your application's objects structure. It allows you to peek inside function closures, to observe VM internal objects that together make up your JavaScript objects, and to understand how much memory your application uses at a very low level.

The view provides several entry points:

* **DOMWindow**** objects** are objects considered as "global" objects for JavaScript code.

* **GC roots** are the actual GC roots used by VM's garbage.

* **Native objects** are browser objects "pushed" inside the JavaScript virtual machine to allow automation, for example, DOM nodes, CSS rules.

![Containment view](imgs/image_22.png)

<p class="note">
  <strong>Example:</strong> Try this <a href="heap-profiling-containment.html">demo page</a> (opens in a new tab) for finding out how to explore closures and event handlers using the view.
</p>

<strong>A tip about closures</strong>

It helps a lot to name the functions so you can easily distinguish between closures in the snapshot. For example, this example does not use named functions:

<pre>
function createLargeClosure() {
  var largeStr = new Array(1000000).join('x');

  var lC = function() { // this is NOT a named function
    return largeStr;
  };

  return lC;
}
</pre>

Whilst this example does:

<pre>
function createLargeClosure() {
  var largeStr = new Array(1000000).join('x');

  var lC = function lC() { // this IS a named function
    return largeStr;
  };

  return lC;
}
</pre>

![Name functions to distinguish between closures](imgs/domleaks.png)

<p class="note">
    <strong>Examples:</strong>
    Try out this example of <a href="demos/memory/example7.html">why eval is evil</a> to analyze the impact of closures on memory. You may also be interested in following it up with this example that takes you through recording <a href="/devtools/docs/demos/memory/example8.html">heap allocations</a>.
</p>

### Dominators view

The Dominators view shows the dominators tree for the heap graph.
It looks similar to the Containment view, but lacks property names.
This is because a dominator of an object may lack direct references to it;
the dominators tree is not a spanning tree of the graph.
But this only serves for good,
as helps us to identify memory accumulation points quickly.

<p class="note"><strong>Note:</strong> In Chrome Canary, Dominators view can be enabled by going to Settings > Show advanced heap snapshot properties and restarting the DevTools.</p>

![Dominators view](imgs/image_25.png)

<p class="note">
    <strong>Examples:</strong>
    Try this <a href="heap-profiling-dominators.html">demo</a> (opens in a new tab) to train yourself in finding accumulation points. Follow it up with this example of running into <a href="/devtools/docs/demos/memory/example10.html">retaining paths and dominators</a>.
</p>

## Look up color coding

Properties and property values of objects have different types and
are colored accordingly. Each property has one of four types:

* **a: property — **a regular property with a name, accessed via the . (dot) operator, or via [ ] (brackets) notation, e.g. ["foo bar"];

* **0: element — **a regular property with a numeric index, accessed via [ ] (brackets) notation;

* **a:**** context var — **a variable in a function context, accessible by its name from inside a function closure;

* **a:**** system prop — **property added by the JavaScript VM, not accessible from JavaScript code.

Objects designated as `System `do not have a corresponding JavaScript type. They are part of JavaScript VM's object system implementation. V8 allocates most of its internal objects in the same heap as the user's JS objects. So these are just v8 internals.

## Find a specific object

To find an object in the collected heap you can search using <kbd><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F</kbd></kbd> and giving the <a href="#memory-profiling-faq">object ID</a>.

## Uncover DOM leaks

The heap profiler has the ability to reflect bidirectional dependencies
between browser native objects (DOM nodes, CSS rules) and JavaScript objects.
This helps to discover otherwise invisible leaks happening
due to forgotten detached DOM subtrees floating around.

DOM leaks can be bigger than you think.
Consider the following sample - when is the #tree GC?

<pre>
  var select = document.querySelector;
  var treeRef = select("#tree");
  var leafRef = select("#leaf");
  var body = select("body");

  body.removeChild(treeRef);

  //#tree can't be GC yet due to treeRef
  treeRef = null;

  //#tree can't be GC yet due to indirect
  //reference from leafRef

  leafRef = null;
  //#NOW can be #tree GC
</pre>

<code>#leaf</code> maintains a reference to it's parent (parentNode) and recursively up to <code>#tree</code>, so only when leafRef is nullified is the WHOLE tree under <code>#tree</code> a candidate for GC.

![DOM subtrees](imgs/treegc.png)

<p class="note">
    <strong>Examples:</strong>
    Try out this example of <a href="demos/memory/example6.html">leaking DOM nodes</a> to understand where DOM nodes can leak and how to detect them. You can follow it up by also looking at this example of <a href="/devtools/docs/demos/memory/example9.html">DOM leaks being bigger than expected</a>.
</p>

To read more about DOM leaks and memory analysis fundamentals checkout
[Finding and debugging memory leaks with the Chrome DevTools](http://slid.es/gruizdevilla/memory) by Gonzalo Ruiz de Villa.

Native objects are most easily accessible from Summary and Containment views — there are dedicated entry nodes for them:

![Entry nodes for native objects](imgs/image_24.png)

<p class="note">
    <strong>Example:</strong>
    Try this <a href="heap-profiling-dom-leaks.html">demo</a> (opens in a new tab) to play with detached DOM trees.
</p>

{% include modules/nextarticle.liquid %}

{% endwrap %}
