---
rss: false
layout: shared/narrow
title: "How to Add or Remove Breakpoints"
description: "DevTools provides four types of breakpoints that you use in different circumstances: line, DOM mutation, XMLHttpRequest, event listener. Each breakpoint type is added or removed differently."
published_on: 2015-04-14
updated_on: 2015-08-03
order: 2
authors:
  - megginkearney
  - dgash
translation_priority: 0
key-takeaways:
  breakpoint:
    - "Breakpoint on a line of code to test the code before it finishes, for example, to examine variable values."
    - "Breakpoint on a DOM mutation event to observe DOM changes."
    - "Breakpoint on XMLHttpRequest to examine request data before it is transmitted. "
    - "Breakpoint on a JavaScript event listener to see how a certain event (such as keypress or doubleclick) is processed by the script."
---
<p class="intro">
  DevTools provides four types of breakpoints that you use in different circumstances. Each breakpoint type is added or removed differently.
</p>

Breakpoint types allow you to control exactly what conditions can trigger a pause in script execution.

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.breakpoint %}

## View breakpoints

View existing breakpoints at any time in the Sources panel:

1. Open the Chrome menu ![Chrome menu](imgs/image_0.png){:.inline}.
2. Choose **More tools** > **Developer tools**, or right-click a page element and choose **Inspect element** from the context menu.
3. Select the **Sources** panel. 

Breakpoints are shown in the sidebar, grouped by type.

![Breakpoints sidebar](imgs/image_1.png)

## Breakpoint on a line of code 

Use the line breakpoint when you want to see the effect of a script up to a certain point before it finishes, or when you want to examine the values of variables or parameters the script is processing. Execution pauses at a specific line, before the line is executed.  

To add/remove a line breakpoint:

1. Click the line number of the line where you want to set the breakpoint. You can add multiple breakpoints by clicking each line's line number. Alternately, you can include a **debugger;** statement in your code, which is equivalent to setting a line breakpoint at that line.

2. Temporarily disable a line breakpoint by clearing its checkbox in the sidebar. 

3. Remove a line breakpoint by clicking the line number again; or right-click the breakpoint in the sidebar and choose **Remove breakpoint**.

![Line breakpoint](imgs/image_2.png)

*A line breakpoint*

## Breakpoint on a DOM mutation event 

Use the DOM mutation event breakpoint when the script is about to insert, change, or delete a DOM node and you want to isolate and observe the change as it happens. Execution pauses when a specific DOM node is to be modified, before the modification is applied (see also [Edit the DOM](/web/tools/iterate/inspect-styles/edit-dom)).

To add/remove a DOM mutation breakpoint:

1. Open the Elements panel and right-click an element. From the context menu, click **Break on…**, then choose one of the options: **Subtree modifications**, **Attributes modifications**, or **Node removal**. 

2. Temporarily disable a DOM breakpoint by clearing its checkbox in the sidebar. 

3. Remove a DOM breakpoint by right-clicking the element again, then click **Break on…**, then choose the currently checked option; or right-click the breakpoint in the sidebar and choose **Remove breakpoint**.

![DOM mutation breakpoint](imgs/image_3.png)

*A DOM mutation breakpoint*

## Breakpoint on an XMLHttpRequest

Use the XMLHttpRequest breakpoint when the script communicates with the server via XHR and you want to examine the request’s data before it is transmitted. Execution pauses when an XMLHttpRequest is to be sent to a URL, before the request is sent.

To add/remove an XMLHttpRequest (XHR) breakpoint:

1. Click the **Add XHR breakpoint** button ![Add XHR breakpoint](imgs/image_4.png){:.inline} in the sidebar. 

2. In the **Break when URL contains** field, type a string that the URL should contain when you want the XHR request to break and press **Enter**; or, if you want to break on all XHR requests, leave the field empty. To edit the field, double-click the breakpoint. 

3. Remove an XHR breakpoint by right-clicking the breakpoint in the sidebar, then choose **Remove breakpoint**.

![XMLHttpRequest breakpoint](imgs/image_5.png)

*An XMLHttpRequest breakpoint*

## Breakpoint on a JavaScript Event Listener

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
  </tbody>
</table>

