project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Learn how to use Chrome and DevTools to find memory issues that affect page performance, including memory leaks, memory bloat, and frequent garbage collections.

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-04-13 #}

# Fix Memory Problems {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Learn how to use Chrome and DevTools to find memory issues
that affect page performance, including memory leaks, memory bloat, and
frequent garbage collections.


### TL;DR {: .hide-from-toc }
- Find out how much memory your page is currently using with the Chrome Task Manager.
- Visualize memory usage over time with Timeline recordings.
- Identify detached DOM trees (a common cause of memory leaks) with Heap Snapshots.
- Find out when new memory is being allocated in your JS heap with Allocation Timeline recordings.


## Overview

In the spirit of the [RAIL][RAIL] performance model, the focus of your
performance efforts should be your users.

Memory issues are important because they are often
perceivable by users. Users can perceive memory issues in the following
ways:

* **A page's performance gets progressively worse over time.** This is possibly
  a symptom of a memory leak. A memory leak is when a bug in the page 
  causes the page to progressively use more and more memory over time. 
* **A page's performance is consistently bad.** This is possibly a symptom
  of memory bloat. Memory bloat is when a page uses more memory than is
  necessary for optimal page speed.
* **A page's performance is delayed or appears to pause frequently.** This is
  possibly a symptom of frequent garbage collections. Garbage collection
  is when the browser reclaims memory. The browser decides when this happens.
  During collections, all script execution is paused. So if the browser is
  garbage collecting a lot, script execution is going to get paused a lot.

### Memory bloat: how much is "too much"?

A memory leak is easy to define. If a site is progressively using more
and more memory, then you've got a leak. But memory bloat is a bit
harder to pin down. What qualifies as "using too much memory"?

There are no hard numbers here, because different
devices and browsers have different capabilities. The same page that
runs smoothly on a high-end smartphone might crash on a low-end
smartphone.

The key here is to use the RAIL model and focus on your users. Find
out what devices are popular with your users, and then test out your page on
those devices. If the experience is consistently bad, the page
may be exceeding the memory capabilities of those devices.

[RAIL]: /web/tools/chrome-devtools/profile/evaluate-performance/rail

## Monitor memory use in realtime with the Chrome Task Manager

Use the Chrome Task Manager as a starting point to your memory issue
investigation. The Task Manager is a realtime monitor that tells
you how much memory a page is currently using.

1. Press <kbd>Shift</kbd>+<kbd>Esc</kbd> or go to
   the Chrome main menu and select **More tools** > **Task manager** to open
   the Task Manager.

   ![opening the task
   manager](imgs/task-manager.png)

1. Right-click on the table header of the Task Manager and enable **JavaScript
   memory**.

   ![enable javascript
   memory](imgs/js-memory.png)

These two columns tell you different things about how your page is using memory:

* The **Memory** column represents native memory. DOM nodes are stored in
  native memory. If this value is increasing, DOM nodes are getting created.
* The **JavaScript Memory** column represents the JS heap. This column
  contains two values. The value you're interested in is the live
  number (the number in parentheses). The live number represents
  how much memory the reachable objects on your page are using. If this
  number is increasing, either new objects are being created, or the existing
  objects are growing.

<!-- live number reference: https://groups.google.com/d/msg/google-chrome-developer-tools/aTMVGoNM0VY/bLmf3l2CpJ8J -->

## Visualize memory leaks with Timeline recordings

You can also use the Timeline panel as another starting point in your
investigation. The Timeline panel helps you visualize a page's memory use
over time.

1. Open the **Timeline** panel on DevTools.
1. Enable the **Memory** checkbox.
1. [Make a recording][recording].

Tip: It's a good practice to start and end your recording with a forced
garbage collection. Click the **collect garbage** button
(![force garbage collection button][cg]{:.inline})
while recording to force garbage collection.

To demonstrate Timeline memory recordings, consider the code below:

    var x = [];
    
    function grow() {
      for (var i = 0; i < 10000; i++) {
        document.body.appendChild(document.createElement('div'));
      }
      x.push(new Array(1000000).join('x'));
    }
    
    document.getElementById('grow').addEventListener('click', grow);

Every time that the button referenced in the code is pressed, ten 
thousand `div` nodes are appended to
the document body, and a string of one million `x` characters is pushed onto
the `x` array. Running this code produces a Timeline recording like the 
following screenshot:

![simple growth example][sg]

First, an explanation of the user interface.
The **HEAP** graph in the **Overview** pane (below **NET**) represents the JS
heap. Below the **Overview** pane is the **Counter** pane. Here you can see
memory usage broken down by JS heap (same as **HEAP** graph in the
**Overview** pane), documents, DOM nodes, listeners, and GPU memory.
Disabling a checkbox hides it from the graph.

Now, an analysis of the code compared with the screenshot.
If you look at the node counter (the green graph) you can see that it matches
up cleanly with the code. The node count increases
in discrete steps. You can presume that each increase in the node count is a
call to `grow()`. The JS heap graph (the blue graph) is not as straightforward.
In keeping with best practices, the first dip is actually a forced
garbage collection (achieved by pressing the **collect garbage** button).
As the recording progresses you can see that the JS heap size spikes. This is
natural and expected: the JavaScript code is creating the DOM nodes on every
button click and doing a lot of work when it creates the string of one million
characters. The key thing here is the fact that the JS heap ends higher
than it began (the "beginning" here being the point after the forced
garbage collection). In the real world, if you saw this pattern of increasing
JS heap size or node size, it would potentially mean a memory leak.

[recording]: https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#make-a-recording

[cg]: imgs/collect-garbage.png

[sg]: imgs/simple-growth.png

[hngd]: https://jsfiddle.net/kaycebasques/tmtbw8ef/

## Discover detached DOM tree memory leaks with Heap Snapshots

A DOM node can only be garbage collected when there are no references to it
from either the page's DOM tree or JavaScript code. A node is said to be 
"detached" when it's removed from the DOM tree but some JavaScript still
references it. Detached DOM nodes are a common cause of memory leaks. This
section teaches you how to use DevTools' heap profilers to identify detached
nodes.

Here's a simple example of detached DOM nodes. 

    var detachedNodes;
    
    function create() {
      var ul = document.createElement('ul');
      for (var i = 0; i < 10; i++) {
        var li = document.createElement('li');
        ul.appendChild(li);
      }
      detachedNodes = ul;
    }
    
    document.getElementById('create').addEventListener('click', create);

Clicking the button referenced in the code creates a `ul` node with ten `li`
children. These nodes are referenced by the code but do not exist in the
DOM tree, so they're detached.

Heap snapshots are one way to identify detached nodes. As the name implies,
heap snapshots show you how memory is distributed among your page's JS objects
and DOM nodes at the point of time of the snapshot.

To create a snapshot, open DevTools and go to the **Profiles** panel, select
the **Take Heap Snapshot** radio button, and then press the **Take
Snapshot** button. 

![take heap snapshot][ths]

The snapshot may take some time to process and load. Once it's finished, select
it from the lefthand panel (named **HEAP SNAPSHOTS**). 

Type `Detached` in the **Class filter** textbox to search for detached DOM
trees.

![filtering for detached nodes][df]

Expand the carats to investigate a detached tree.

![investigating detached tree][ed]

Nodes highlighted yellow have direct references to them from the JavaScript 
code. Nodes highlighted red do not have direct references. They are only
alive because they are part of the yellow node's tree. In general, you want to
focus on the yellow nodes. Fix your code so that the yellow node isn't alive
for longer than it needs to be, and you also get rid of the red nodes that are
part of the yellow node's tree.

Click on a yellow node to investigate it further. In the **Objects** pane
you can see more information about the code that's referencing it. For example,
in the screenshot below you can see that the `detachedTree` variable is
referencing the node. To fix this particular memory leak, you would study 
the code that uses `detachedTree` and ensure that it removes it's reference to
the node when it's no longer needed.

![investigating a yellow node][yn]

[ths]: imgs/take-heap-snapshot.png

[df]: imgs/detached-filter.png

[ed]: imgs/expanded-detached.png

[yn]: imgs/yellow-node.png

## Identify JS heap memory leaks with Allocation Timelines

The Allocation Timeline is another tool that can help you track down 
memory leaks in your JS heap. 

To demonstrate the Allocation Timeline consider the following code:

    var x = [];

    function grow() {
      x.push(new Array(1000000).join('x'));
    }

    document.getElementById('grow').addEventListener('click', grow);

Every time that the button referenced in the code is pushed, a string of one
million characters is added to the `x` array.

To record an Allocation Timeline, open DevTools, go to the **Profiles** panel,
select the **Record Allocation Timeline** radio button, press the **Start**
button, perform the action that you suspect is causing the memory leak, and
then press the **stop recording** button 
(![stop recording button][sr]{:.inline})
when you're done. 

As you're recording, notice if any blue bars show up on the Allocation
Timeline, like in the screenshot below. 

![new allocations][na]

Those blue bars represent new memory allocations. Those new memory allocations
are your candidates for memory leaks. You can zoom on a bar to filter the
**Constructor** pane to only show objects that were allocated during the
specified timeframe. 

![zoomed allocation timeline][zat]

Expand the object and click on its value to view more details about it in the
**Object** pane. For example, in the screenshot below, by viewing the details
of the object that was newly allocated, you'd be able to see that it was
allocated to the `x` variable in the `Window` scope.

![object details][od]

[sr]: imgs/stop-recording.png

[na]: imgs/new-allocations.png

[zat]: imgs/zoomed-allocation-timeline.png

[od]: imgs/object-details.png

## Investigate memory allocation by function {: #allocation-profile }

Use the **Record Allocation Profiler** type to view memory allocation by
JavaScript function.

![Record Allocation Profiler](imgs/record-allocation-profile.png)

1. Select the **Record Allocation Profiler** radio button. If there is a
   worker on the page, you can select that as the profiling target using
   the dropdown menu next to the **Start** button.
1. Press the **Start** button.
1. Perform the actions on the page which you want to investigate.
1. Press the **Stop** button when you have finished all of your actions.

DevTools shows you a breakdown of memory allocation by function. The default
view is **Heavy (Bottom Up)**, which displays the functions that allocated the
most memory at the top.

![Allocation profile](imgs/allocation-profile.png)

## Spot frequent garbage collections

If your page appears to pause frequently, then you may have garbage collection
issues. 

You can use either the Chrome Task Manager or Timeline memory recordings to
spot frequent garbage collections. In the Task Manager, frequently rising
and falling **Memory** or **JavaScript Memory** values represent frequent
garbage collections. In Timeline recordings, frequently rising and falling
JS heap or node count graphs indicate frequent garbage collections.

Once you've identified the problem, you can use an Allocation Timeline
recording to find out where memory is being allocated and which functions are
causing the allocations. 
