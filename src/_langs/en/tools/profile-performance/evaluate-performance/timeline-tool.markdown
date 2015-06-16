---
rss: false
layout: article
title: "How to Use the Timeline Tool"
seotitle: "How to Use the Timeline Tool"
description: "The Chrome DevTools Timeline tool lets you record and analyze all the activity in your application as it runs. It's the best place to start investigating perceived performance issues in your application."
introduction: "The Chrome DevTools Timeline tool lets you record and analyze all the activity in your application as it runs. It's the best place to start investigating perceived performance issues in your application."
article:
  written_on: 2015-06-09
  updated_on: 2015-06-09
  order: 2
authors:
  - megginkearney
priority: 0
collection: evaluate-performance
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

The Timeline provides a complete overview of where time is spent when loading and using your site.
A timeline recording includes a record for each event that occurred in a "waterfall" presentation:

![Timeline tool](imgs/timeline-panel.png)

{% include modules/toc.liquid %}

## Test runtime performance in events mode

The Events mode provides an overview of all events that were captured during the recording, organized by their type. All events, from loading resources to parsing JavaScript, calculating styles, and repainting are plotted on a timeline. These event records are color-coded as follows:

![Color-key for event records](imgs/color-key.png)

For example, the recording below is of an HTML page being loaded into Chrome. The first record (Send Request) is Chrome's HTTP request for the page, followed by a Receive Response record (for the corresponding HTTP response), some Receive Data records (for the actual page data), and then a Finish Loading record.

![Example timeline recording](imgs/example-recording.png)

When you hover over a Timeline record, a pop-up appears with details
about the associated event. For example, the screenshot below shows
details for a Finish Loading record associated with an image resource.
The [Timeline Event Reference](tools/profile-performance/evaluate-performance/performance-reference)
explains the details available for each record type.

![Pop-up showing event details](imgs/event-details.png)

At a glance, you can see where your application is spending the most time, and on what types of tasks. 
The length of each horizontal bar in this view corresponds to time that event took to complete.

![Horizontal bar in events mode](imgs/events_mode.png)

## Test rendering performance in frames mode

Frames mode provides insight into the rendering performance of your application. A "frame" represents the work the browser must do to render a single frame of content to the display&mdash;run JavaScript, handle events, update the DOM and change styles, layout and paint the page. The goal is for your app to run at 60 frames per second (FPS), which corresponds to the 60Hz refresh rate of most (but not all) video displays. Consequently, your application has approximately 16.6 ms (1000 ms / 60) to prepare for each frame.

Horizontal lines across the Frames view represent frame rate targets for 60 FPS and 30 FPS. The height of a frame corresponds to the time it took to render that frame. The colors filling each frame indicate the percentage of time taken on each type of kind of task.

The time to render a frame is displayed atop of the Records view. If you hover over the displayed time, additional information appears about the frame, including the time spent on each type of task, CPU time, and the calculated FPS.

![Frames mode](imgs/frames_mode.png)

### Clear or light-gray frames

You may notice regions of a frame that are light-gray or clear (hollow). These regions indicate, respectively:

* Activity that was not instrumented by DevTools
* Idle time between display refresh cycles.

The frames in the recording below show both un-instrumented activity and idle time.

![Un-instrumented activity and idle time](imgs/clear-frames.png)

<p class="note">Want more details on the empty white space within the bars? Read <a href="https://plus.google.com/+NatDuca/posts/BvMgvdnBvaQ?e=-RedirectToSandbox">Chrome Engineer Nat Duca's explanation</a>, which describes how you can evaluate if you were bottlnecked by the GPU. </p>

### The green bars

Painting is a two-step process that includes: draw calls and rasterization.

 - **Draw calls**. This is a list of things you'd like to draw, and its derived from the CSS applied to your elements. Ultimately there is a list of draw calls not dissimilar to the Canvas element's: moveTo, lineTo, and fillRect. Although, they have different names in <a href="https://code.google.com/p/skia/">Skia</a>, Chrome's painting backend, it's a similar concept.
 - **Rasterization**. The process of stepping through those draw calls and filling out actual pixels into buffers that can be uploaded to the GPU for compositing.

So, with that background what is the difference between the solid green bars and empty green bars?

![Green bars in timeline](imgs/hollow-green-bars.png)

 - The **solid green bars** are the draw calls recorded by Chrome. This happens on the main thread alongside JavaScript, style calculations, and layout. The compositor thread gets passed a data structure grouping of draw calls.

 - The **empty green bars** are the rasterization. A worker thread spawned by the compositor is what handles these.

Both are paint, they just represent different sub-tasks of the job. If you're having performance issues you can look at what properties you're changing. Then, see if there is a compositor-only way to achieve the same ends. <a href="http://csstriggers.com/">CSS Triggers</a> can help with identifying a solution to this.

### View frame rate statistics

The average frame rate and its standard deviation represented are displayed along the bottom of the Timeline panel for the selected frame range. If you hover over the average frame rate, a pop-up appears with additional information about the frame selection:

* **Selected range** -- The selected time range, and the number of frames in the selection.
* **Minimum Time** -- The lowest time of the selected frames, and the corresponding frame rate in parentheses.
* **Average Time** -- The average time of the selected frames,  and the corresponding frame rate in parentheses.
* **Maximum Time** -- The maximum time for the selected range, and the corresponding frame rate in parentheses.
* **Standard Deviation** -- The amount of variability of the calculated Average Time.
* **Time by category** -- The amount of time spent on each type of process, color-coded by type.

![Average frame rate](imgs/average.png)

## Test memory usage in memory mode

The Memory view shows you a graph of memory used by your application
over time and maintains a counter of the number of documents, DOM
nodes, and event listeners that are held in memory (that is, that
haven’t been garbage collected).

![Memory view](imgs/memory-usage.png)

Memory mode can't show you exactly what is causing a memory leak, but it can help you identify what events in your application may be leading to a memory leak.
Learn more about memory problems in [Memory Diagnosis](tools/profile-performance/memory-problems/).

## Make a recording

To make a recording, open the page you want to record and open the Timeline panel. The Timeline has three primary sections: an overview section at the top, a records view, and a toolbar.

![Timeline UI annotated](imgs/timeline_ui_annotated.png)

Start a recording by doing one of the following:

* Click the round record button at the bottom of the Timeline panel.
* Press the keyboard shortcut Ctrl+E, or Cmd+E on Mac.

The Record button turns red during a recording.
Perform any necessary user actions to record the desired behavior.</li>
Stop the recording by pressing the now red record button, or repeating the keyboard shortcut.

Some recording tips:

* **Keep recordings as short as possible**. Shorter recordings generally make analysis easier.
* **Avoid unnecessary actions**. Try to avoid actions (mouse clicks, network loads, and so forth) that are extraneous to the activity you want to record and analyze. For instance, if you want to record events that occur after you click a “Login” button, don’t also scroll the page, load an image and so forth.
*  **Disable the browser cache**. When recording network operations, it’s a good idea to disable the browser’s cache in the DevTools Settings panel.
* **Disable extensions**. Chrome extensions can add unrelated noise to Timeline recordings of your application. You can do one of the following:
    * Open a Chrome window in [incognito mode](http://support.google.com/chrome/bin/answer.py?hl=en&answer=95464)
    * Create a new [Chrome user profile](http://support.google.com/chrome/bin/answer.py?hl=en&answer=142059) for testing.

## Record a page load

It helps to know in advance the kind of activity you want to record — for example, page loading, scrolling performance of a list of images, and so forth, and then stick to that script.

A common task is to record a page loading from the initial network request. Keyboard shortcuts are useful in this scenario, as they let you quickly start a recording, re-load the page, and stop the recording.

**To record a page load**:

1.  Open any [web page](http://www.jankfree.com) in a new tab or window.
2.  Open the Timeline and press Cmd+E (Mac) or Ctrl+E (Windows/Linux) to start recording.
3.  Quickly press Cmd+R or Ctrl+R to reload the browser page.
4.  Stop the recording when the page has finished loading (look for the red event marker).

The Timeline annotates each recording with a blue and a red line that indicate, respectively, when the [DOMContentLoaded](http://docs.webplatform.org/wiki/dom/events/DOMContentLoaded) and [load](http://docs.webplatform.org/wiki/dom/events/load) events were dispatched by the browser. The DOMContentLoaded event is fired when all of the page’s DOM content has been loaded and parsed. The load event is fired once all of the document’s resources (images and CSS files, and so forth) have been fully loaded.

Your recording should look something like the following. The first
record (Send Request) is Chrome's HTTP request for the page, followed by a Receive Response record for the corresponding HTTP response, followed by one or more Receive Data records, a Finish Loading record, and a Parse HTML record.

![Page load recording](imgs/page-load.png)

See the [Timeline event reference](#timeline-event-reference) for details on each record type.

## View recording details

When you select a record in the Timeline,
the Details pane displays additional information about the event.

![Event details pane](imgs/frames_mode_event_selected.png)

Certain details are present in events of all types, such as Duration and CPU Time, while some only apply to certain event types. For information on what details each kind of record contains, see the [Timeline Event Reference](tools/profile-performance/evaluate-performance/performance-reference).

When you select a Paint record, DevTools highlights the region of the screen that was updated with a blue semi-transparent rectangle, as shown below.

![Paint record](imgs/paint-hover.png)

## Filter and search records

You can filter the records shown according to their type (only show loading events, for example), or only show records longer or equal to 1 millisecond or 15 milliseconds. You can also filter the view to show events that match a string.

![Filter records](imgs/filters.png)

While looking at all the events, you may want to hunt for one, but maintain context of what's around it. In this case, you can find without filtering. Press Ctrl+F (Window/Linux) or Cmd+F (Mac), while the Timeline has focus to show those that contain the search term.

## Zoom in on a Timeline section

To make analyzing records easier, you can “zoom in” on a section of the timeline overview, which reduces accordingly the time scale in the Records view.

![Zoom in on section](imgs/zoom.png)

To zoom in on a Timeline section, do one of the following:

* In the overview region, drag out a Timeline selection with your mouse.
* Adjust the gray sliders in the ruler area.

Here are some more tips for working with Timeline selections:

*  "Scrub" the recording with the current selection by dragging the area between the two slider bars.
*  Trackpad users:

    *  Swiping left or right with two fingers moves the current Timeline selection.
    *  Swiping up or down with two fingers expands or contracts the current Timeline selection, respectively.

*  Scrolling the mouse wheel up or down while hovering over a Timeline selection expands and contracts the selection, respectively.

## View nested events

Events in Timeline recordings sometimes are nested visually beneath another event. You expand the "parent" event to view its nested "child" events. There are two reasons why the Timeline nests events:

*  Synchronous events that occurred during the processing of an event that occurred previously. Each event internally generates two atomic events, one for the start and one for the end, that are converted to a single "continuous" event. Any other events that occur between these two atomic events become children of the outer event.

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
*  **Used JS Heap size** at this point in the recording, and what this operation's effect was to the heap size.
*  **Other details** relevant to the event.

![Parent event record](imgs/parent_record.png)

## Save and load recordings

You can save a Timeline recording as a JSON file, and later open it in the Timeline.

**To save a Timeline recording:**

1.  Right+click or Ctrl+click (Mac only) inside the Timeline and select **Save Timeline Data…**, or press the Ctrl+S keyboard shorcut.
2. Pick a location to save the file and click Save.

**To open an existing Timeline recording file, do one of the following**:

1. Right-click or Ctrl+click inside the Timeline and select **Load Timeline Data...**, or press the Ctrl+O keyboard shortcut.
2. Locate the JSON file and click Open.

![Save and load timeline data menu](imgs/save.png)

{% include modules/nextarticle.liquid %}

{% endwrap %}
