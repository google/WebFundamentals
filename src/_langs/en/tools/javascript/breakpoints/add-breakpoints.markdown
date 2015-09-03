---
rss: false
layout: tools-article
title: "How to Add or Remove Breakpoints"
seotitle: "How to Add or Remove Breakpoints"
description: "DevTools provides five types of breakpoints that you use in different circumstances: line, DOM mutation, XMLHttpRequest, event listener, exception. Each breakpoint type is added or removed differently."
introduction: "DevTools provides five types of breakpoints that you use in different circumstances. Each breakpoint type is added or removed differently."
article:
  written_on: 2015-04-14
  updated_on: 2015-09-03
  order: 2
authors:
  - megginkearney
  - dgash
  - kaycebasques
priority: 0
collection: breakpoints
key-takeaways:
  breakpoint:
    - Breakpoint on a line of code to test the code before it finishes, for example, to examine variable values.
    - Breakpoint on a DOM mutation event to observe DOM changes.
    - Breakpoint on XMLHttpRequest to examine request data before it is transmitted. 
    - Breakpoint on a JavaScript event listener to see how a certain event (such as keypress or doubleclick) is processed by the script.
    - Breakpoint on uncaught exceptions to pause before an exception is thrown.
---

<!-- to-do:
change title
change seotitle
change description
change introduction
change key-takeaways
change headings
-->


{% wrap content %}

Breakpoints are one of the most common  ways to debug code. Breakpoints
enable you to pause script execution and then investigate call stacks
and the variable values at that particular moment in time. There are two types 
of breakpoints at your disposal: manual and conditional.

* Manual breakpoints are individual breakpoints that you set on a 
  specific line of code. You can set these via the Chrome DevTools GUI, or
  by inserting the `debugger` keyword in your code.
* Conditional breakpoints are triggered when a specified condition is 
  met (e.g. an `onclick` event is fired, an exception is uncaught, and 
  so on). You enable these via the DevTools GUI,
  and then DevTools automatically breaks whenever
  the specified condition is met.

Read on to learn how to create both types of breakpoints in Chrome DevTools.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.breakpoint %}

## View breakpoints

View existing breakpoints at any time in the Sources panel:

1. Open the Chrome menu ![Chrome menu](imgs/image_0.png){:.inline}.
2. Choose **More tools** > **Developer tools**, or right-click a page 
   element and choose **Inspect element** from the context menu.
3. Select the **Sources** panel. 

Breakpoints are shown in the sidebar, grouped by type.

![Breakpoints sidebar](imgs/image_1.png)

## Manual breakpoints

Manual breakpoints are breakpoints that you set on a single line of code. There are two ways 
to set manual breakpoints, via the DevTools GUI, or by inserting the `debugger` keyword in 
your code.

Use manual breakpoints when you have a strong suspicion of where your code is failing,
and you want to inspect the call stack and variable values at that exact moment
in time.

### Add a manual breakpoint on a single line of code

To add/remove a line breakpoint:

1. Click the line number of the line where you want to set the breakpoint. 
   You can add multiple breakpoints by clicking each line's line number. 

   Alternately, you can include a **debugger;** statement in your code, which is 
   equivalent to setting a line breakpoint at that line.

2. Temporarily disable a line breakpoint by clearing its checkbox in the sidebar. 

3. Remove a line breakpoint by clicking the line number again; or right-click 
   the breakpoint in the sidebar and choose **Remove breakpoint**.

![Line breakpoint](imgs/image_2.png)

*A line breakpoint*

## Conditional breakpoints

### DOM mutation event 

Use the DOM mutation event breakpoint when the script is about to insert, change, or delete a DOM node and you want to isolate and observe the change as it happens. Execution pauses when a specific DOM node is to be modified, before the modification is applied (see also [Edit the DOM](/web/tools/iterate/inspect-styles/edit-dom)).

To add/remove a DOM mutation breakpoint:

1. Open the Elements panel and right-click an element. From the context menu, click **Break on…**, then choose one of the options: **Subtree modifications**, **Attributes modifications**, or **Node removal**. 

2. Temporarily disable a DOM breakpoint by clearing its checkbox in the sidebar. 

3. Remove a DOM breakpoint by right-clicking the element again, then click **Break on…**, then choose the currently checked option; or right-click the breakpoint in the sidebar and choose **Remove breakpoint**.

![DOM mutation breakpoint](imgs/image_3.png)

*A DOM mutation breakpoint*

### XMLHttpRequest

There are two different ways you can break on an `XMLHttpRequest`:

* When a request URL contains a substring. DevTools breaks before the request is sent.
* At a given stage in the `XMLHttpRequest` event lifecycle. DevTools breaks at the 
  specified stage for all requests.

#### Break when XMLHttpRequest contains specific string

To break when an `XMLHttpRequest` URL contains a specific string:

1. Click the **Add XHR breakpoint** button ![Add XHR breakpoint](imgs/image_4.png){:.inline} in the sidebar. 

2. In the **Break when URL contains** field, type a string that the URL should contain when you want the XHR request to break and press **Enter**; or, if you want to break on all XHR requests, leave the field empty. To edit the field, double-click the breakpoint. 

3. Remove an XHR breakpoint by right-clicking the breakpoint in the sidebar, then choose **Remove breakpoint**.

![XMLHttpRequest breakpoint](imgs/image_5.png)

*An XMLHttpRequest breakpoint*

#### Break all XMLHttpRequests at given stage in event lifecycle

To break at a given stage in the `XMLHttpRequest` event lifecycle:

1. Go to the **Event Listener Breakpoints** panel.

2. Expand the **XHR** dropdown menu.

3. Select the stage in the event lifecycle which you want to break at.
   DevTools breaks at that stage for all `XMLHttpRequest` events.

![Available breakpoints for XMLHttpRequest events](imgs/xhr-events.png)

### JavaScript event listener 

Use the JavaScript event listener breakpoint
when you want to see how a certain event
(such as keypress or dblclick) is processed by the script.
Execution pauses when a specific event listener is to be fired,
before the listener fires
(see also [View element event listeners](/web/tools/iterate/inspect-styles/edit-dom#view-element-event-listeners)).

To add/remove a JavaScript event listener breakpoint:

1. Expand the **Event Listener Breakpoints** section in the sidebar, then expand the category of listener you want to break on (**Animation**, **Clipboard**, **Control**, etc.). 

2. Under the expanded category, click the checkbox for the type(s) of listener that should trigger a break. To choose all possible listener types in a category, click the checkbox for the category itself. 

3. Remove an event listener breakpoint by clearing its checkbox.

![Event listener breakpoint](imgs/image_6.png)

*An event listener breakpoint* 

### Uncaught exceptions

Use the **Pause on Uncaught Exceptions** DevTools feature to pause script
execution on any uncaught exception. When an uncaught exception is encountered,
DevTools pauses at the statement where the exception is thrown. From there,
you can use the call stack to investigate the program flow leading up
to the exception.

1. Click on the **Pause on Exceptions** button 
   (!["pause on exceptions" button](imgs/pause-on-exception-button.png){:.inline})
   in the **Sources** panel of DevTools.
   
In the animation below, the user clicks on the *Pause on Exceptions* button
and then triggers an uncaught exception in the script. DevTools automatically
breaks at the line where the exception is thrown.

{% animation animations/pause-on-uncaught-exception.mp4 %}

You can also view the call stack leading up to an uncaught exception 
in the DevTools console.

In the animation below, the user triggers an uncaught exception and
then clicks the carat next to the uncaught exception message (`Uncaught 0`)
in order to display the call stack leading up to the exception.

{% animation animations/exception-in-console.mp4 %}

## Summary of breakpoint types

The following briefly summarizes the breakpoint types:

<table class="table-3">
  <thead>
    <tr>
      <th>Breakpoint type</th>
      <th>Breaks before</th>
      <th>Use to</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td data-th="Breakpoint type">Line</td>
    <td data-th="Breaks before">Specified line is executed.</td>
    <td data-th="Use to">Examine current variable or parameter values.</td>
  </tr>
  <tr>
    <td data-th="Breakpoint type">DOM mutation</td>
    <td data-th="Breaks before">DOM node is modified.</td>
    <td data-th="Use to">Isolate and observe the DOM change.</td>
  </tr>
  <tr>
    <td data-th="Breakpoint type">XMLHttpRequest</td>
    <td data-th="Breaks before">Request is sent.</td>
    <td data-th="Use to">View the request’s prepared data.</td>
  </tr>
  <tr>
    <td data-th="Breakpoint type">Event listener</td>
    <td data-th="Breaks before">Listener is fired.</td>
    <td data-th="Use to">Follow how an event is processed.</td>
  </tr>
  <tr>
    <td data-th="Breakpoint type">Exception</td>
    <td data-th="Breaks before">Uncaught exception is thrown</td>
    <td data-th="Use to">
      Examine the context leading up to an uncaught exception.
    </td>
  </tr>
  </tbody>
</table>

{% endwrap %}
