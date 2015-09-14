---
rss: false
layout: tools-article
title: "How to Use the Timeline Tool"
seotitle: "How to Use the Timeline Tool"
description: "The Chrome DevTools Timeline tool lets you record and analyze all the activity in your application as it runs. It's the best place to start investigating perceived performance issues in your application."
introduction: "The Chrome DevTools Timeline tool lets you record and analyze all the activity in your application as it runs. It's the best place to start investigating perceived performance issues in your application."
article:
  written_on: 2015-06-09
  updated_on: 2015-08-03
  order: 2
authors:
  - megginkearney
priority: 0
collection: evaluate-performance
key-takeaways:
  timeline:
    - In the Timeline panel, test runtime performance in events mode; test rendering performance in frames mode.
    - Check the memory used by your application over time in the memory view.
    - To make analyzing records easier, zoom in on a section of the timeline overview, which reduces the time scale in the Records view accordingly.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

The Timeline provides a complete overview of where time is spent when loading and using your site.
A timeline recording includes a record for each event that occurred, displayed in a "waterfall" graph:

![Timeline tool](imgs/timeline-panel.png)

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.timeline %}

## Test runtime performance in events mode

The Events mode provides an overview of events that were captured during the recording, organized by type. All events, from loading resources, to parsing JavaScript, calculating styles, and repainting are plotted on a timeline. These event records are color-coded as follows:

![Color-key for event records](imgs/color-key.png)

For example, the recording below is of an HTML page being loaded into Chrome. The first record, Send Request, is Chrome's HTTP request for the page, followed by a Receive Response record for the corresponding HTTP response, some Receive Data records for the actual page data, and a Finish Loading record.

![Example timeline recording](imgs/example-recording.png)

When you hover over a Timeline record, a pop-up appears with details
about the associated event. For example, the screenshot below shows
details for a Finish Loading record associated with an image resource.
The [Timeline Event Reference](/web/tools/profile-performance/evaluate-performance/performance-reference)
explains the details that are available for each record type.

![Pop-up showing event details](imgs/event-details.png)

At a glance, you can see where your application is spending the most time, and on what types of tasks. 
The length of each horizontal bar in this view corresponds to the time the event took to complete.

![Horizontal bar in events mode](imgs/events_mode.png)

## Test rendering performance in frames mode

Frames mode provides insight into the rendering performance of your application. A "frame" represents the work the browser must do to render a single frame of content to the display&mdash;run JavaScript, handle events, update the DOM and change styles, layout and paint the page.

The goal is for your app to run at 60 frames per second (fps), which corresponds to the 60Hz refresh rate of most (but not all) video displays. Thus, your application has approximately 16.6ms (1000ms / 60) to prepare for each frame.

Horizontal lines across the Frames view represent frame rate targets for 60fps and 30fps. The height of a frame corresponds to the time it took to render that frame. The colors filling each frame indicate the percentage of time taken on each type of task.

The time to render a frame is displayed above of the Records view. If you hover over the displayed time, additional information appears about the frame, including the time spent on each type of task, CPU time, and the calculated fps.

![Frames mode](imgs/frames_mode.png)

You can learn more about how to test and fix rendering problems in [Analyze Runtime Performance](/web/tools/profile-performance/rendering-tools/analyze-runtime).

### Clear or light-gray frames

You may notice regions of a frame that are light-gray or clear (hollow). These regions indicate, respectively:

* Activity that was not instrumented by DevTools.
* Idle time between display refresh cycles.

The frames in the recording below show both un-instrumented activity and idle time.

![Un-instrumented activity and idle time](imgs/clear-frames.png)

<p class="note">Want more details on the empty white space within the bars? Read <a href="https://plus.google.com/+NatDuca/posts/BvMgvdnBvaQ?e=-RedirectToSandbox">Chrome Engineer Nat Duca's explanation</a>, which describes how you can evaluate whether you were bottlenecked by the GPU. </p>

### The green bars

Painting is a two-step process that includes draw calls and rasterization.

 - **Draw calls**. This is a list of things you'd like to draw, and is derived from the CSS applied to your elements. The list of draw calls is not dissimilar to the Canvas element's methods: moveTo, lineTo, and fillRect. Although they have different names in <a href="https://skia.org/">Skia</a>, Chrome's painting backend, the concepts are similar.
 - **Rasterization**. The process of stepping through the draw calls and filling out actual pixels into buffers that can be uploaded to the GPU for compositing.

So, with that background, what is the difference between solid green bars and empty green bars?

![Green bars in timeline](imgs/hollow-green-bars.png)

 - The **solid green bars** are the draw calls recorded by Chrome. This happens on the main thread alongside JavaScript, style calculations, and layout. The compositor thread gets passed a data structure grouping of draw calls.

 - The **empty green bars** are the rasterization. A worker thread spawned by the compositor handles this process.

Both are painting components, they just represent different sub-tasks of the job. If you're having performance issues, you can look at what properties you're changing and then see if there is a compositor-only way to achieve the same result. <a href="http://csstriggers.com/">CSS Triggers</a> can help with identifying a solution.

### View frame rate statistics

The average frame rate and its standard deviation represented are displayed along the bottom of the Timeline panel for the selected frame range. If you hover over the average frame rate, a pop-up appears with additional information about the frame selection:

![Average frame rate](imgs/average.png)

* **Selected range** -- The selected time range, and the number of frames in the selection.
* **Minimum Time** -- The lowest time of the selected frames, and the corresponding frame rate in parentheses.
* **Average Time** -- The average time of the selected frames,  and the corresponding frame rate in parentheses.
* **Maximum Time** -- The maximum time for the selected range, and the corresponding frame rate in parentheses.
* **Standard Deviation** -- The amount of variability of the calculated Average Time.
* **Time by category** -- The amount of time spent on each type of process, color-coded by type.

## Test memory usage in memory mode

The Memory view shows you a graph of memory used by your application
over time and maintains a counter of the number of documents, DOM
nodes, and event listeners that are held in memory (that is, that
haven’t been garbage collected).

![Memory view](imgs/memory-usage.png)

Memory mode can't show you exactly what is causing a memory leak, but it can help you identify what events in your application may be leading to a memory leak.
Learn more about memory problems in [Memory Diagnosis](/web/tools/profile-performance/memory-problems/memory-diagnosis).

## Make a recording

To make a recording, open the page you want to analyze and open the Timeline panel. The Timeline has three primary sections: an overview section, a records view, and a toolbar.

![Timeline UI annotated](imgs/timeline_ui_annotated.png)

Start a recording by doing one of the following:

* Click the round Record button.
* Press the keyboard shortcut
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">E</kbd>,
or <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">E</kbd> on Mac.

The Record button turns red during a recording.
Perform any necessary user actions to record the desired behavior.
Stop the recording by clicking the (now red) Record button, or repeating the keyboard shortcut.

Some recording tips:

* **Keep recordings as short as possible**. Shorter recordings generally make analysis easier.
* **Avoid unnecessary actions**. Try to avoid actions (mouse clicks, network loads, etc.) that are extraneous to the activity you want to record and analyze. For example, if you want to record events that occur after you click a Login button, don’t also scroll the page, load an image, and so on.
*  **Disable the browser cache**. When recording network operations, it’s a good idea to disable the browser’s cache in the DevTools Settings panel.
* **Disable extensions**. Chrome extensions can add unrelated noise to Timeline recordings of your application. You can do one of the following:
    * Open a Chrome window in [incognito mode](http://support.google.com/chrome/bin/answer.py?hl=en&answer=95464).
    * Create a new [Chrome user profile](http://support.google.com/chrome/bin/answer.py?hl=en&answer=142059) for testing.

## Record a page load

It helps to know in advance the kind of activity you want to record — page loading, scrolling performance of a list of images, and so forth — and then stick to that script.

A common task is to record a page load from initial network request to completion. Keyboard shortcuts are useful in this scenario, as they let you quickly start a recording, reload the page, and stop the recording.

**To record a page load**:

1.  Open any web page ([this one](http://www.jankfree.com), for example) in a new tab or window.
2.  Open the Timeline and press
<kbd class="kbd">Cmd</kbd> + <kbd class="kbd">E</kbd> or
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">E</kbd> (Windows/Linux)
to start recording.
3.  Quickly press
<kbd class="kbd">Cmd</kbd> + <kbd class="kbd">R</kbd> or
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">R</kbd>
to reload the browser page.
4.  Stop the recording as soon as the page has finished loading (look for the red event marker).

The Timeline annotates each recording with blue and red lines that indicate, respectively, when the [DOMContentLoaded](http://docs.webplatform.org/wiki/dom/events/DOMContentLoaded) and [load](http://docs.webplatform.org/wiki/dom/events/load) events were dispatched by the browser. The DOMContentLoaded event is fired when all of the page’s DOM content has been loaded and parsed. The load event is fired once all of the document’s resources (images and CSS files, and so forth) have been fully loaded.

Your recording should look something like the following example.
The first record (Send Request) is Chrome's HTTP request for the page,
followed by a Receive Response record for the corresponding HTTP response,
followed by one or more Receive Data records, a Finish Loading record,
and a Parse HTML record.

![Page load recording](imgs/page-load.png)

See the [Timeline event reference](/web/tools/profile-performance/evaluate-performance/performance-reference) for details on each record type.

## View recording details

When you select a record in the Timeline,
the Details pane displays additional information about the event.

![Event details pane](imgs/frames_mode_event_selected.png)

Certain details are present in events of all types, such as Duration and CPU Time, while some only apply to certain event types. See the [Timeline event reference](/web/tools/profile-performance/evaluate-performance/performance-reference) for details on each record type.

When you select a Paint record, DevTools highlights the region of the screen that was updated with a blue semi-transparent rectangle, as shown below.

![Paint record](imgs/paint-hover.png)

## Filter and search records

You can filter the records shown according to their type (only show loading events, for example), or only show records longer or equal to 1 millisecond or 15 milliseconds. You can also filter the view to show events that match a string.

![Filter records](imgs/filters.png)

While looking at the events,
you may want to focus on one,
but maintain the context of what's around it.
In this case, you can perform a Find without filtering.
Press
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F</kbd> (Window/Linux) or
<kbd class="kbd">Cmd</kbd> + <kbd class="kbd">F</kbd> (Mac)
while the Timeline has focus to show those events
that contain the search term.

## Zoom in on a Timeline section

To make analyzing records easier, you can zoom in on a section of the timeline overview, which reduces the time scale in the Records view accordingly.

![Zoom in on section](imgs/zoom.png)

To zoom in on a Timeline section, do one of the following:

* In the overview region, drag out a Timeline selection with your mouse.
* Adjust the gray sliders in the ruler area.

Here are some more tips for working with Timeline selections:

*  "Scrub" the recording with the current selection by dragging the area between the two slider bars.
*  Mac trackpad users:

    *  Swiping left or right with two fingers moves the current Timeline selection.
    *  Swiping up or down with two fingers expands or contracts the current Timeline selection, respectively.

*  Scrolling the mouse wheel up or down while hovering over a Timeline selection expands and contracts the selection, respectively.

## View nested events

Events in Timeline recordings are sometimes nested visually beneath another event. You can expand the "parent" event to view its nested "child" events. 

The Timeline nests events to account for synchronous events that occurred during the processing of a previous event. Each event internally generates two atomic events, one for the start and one for the end, that are converted to a single continuous event. Any other events that occur between these two atomic events become children of the outer event.

The following screenshot shows an example of nested synchronous events. In this case, Chrome was parsing some HTML (the Parse HTML event) when it found several external resources that needed to be loaded. Those requests were made before Chrome has finished the parsing, so the Send Request events are displayed as children of the Parse HTML event.

![Nested synchronous events](imgs/sync_events.png)

### Coloring of Timeline records with nested events

Timeline bars are color-coded as follows:

*  The **first, darkest part** of the bar represents how long the parent event and all of its _synchronous_ children took.
*  The **next, slightly paler color** represents the CPU time that the event and all its _asynchronous_ children took.
*  The **palest bars** represent the time from the start of first asynchronous event to the end of last of its asynchronous children.

![Color-coded timeline bars](imgs/nested-coloring.png)

Selecting a parent record will display the following in the Details pane:

*  **Event type summary** in text and visualized in a pie chart.
*  **Used JS Heap size** at this point in the recording, and what this operation's effect was on the heap size.
*  **Other details** relevant to the event.

![Parent event record](imgs/parent_record.png)

## Save and load recordings

You can save a Timeline recording as a JSON file, and open it later in the Timeline.

**To save a Timeline recording:**

1.  Right+click or Ctrl+click (Mac only) inside the Timeline and select **Save Timeline Data…**,
or press the
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> keyboard shortcut.
2. Pick a location to save the file and click Save.

**To open an existing Timeline recording file, do one of the following**:

1. Right-click or Ctrl+click inside the Timeline and
select **Load Timeline Data...**, or press the
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> keyboard shortcut.
2. Locate the JSON file and click Open.

![Save and load timeline data menu](imgs/save.png)

{% include modules/nextarticle.liquid %}

{% endwrap %}
