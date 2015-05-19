---
rss: false
layout: article
title: "How to Add or Remove Breakpoints"
seotitle: "How to Add or Remove Breakpoints"
description: "DevTools provides four types of breakpoints that you use in different circumstances. Each breakpoint type is added or removed differently."
introduction: "DevTools provides four types of breakpoints that you use in different circumstances. Each breakpoint type is added or removed differently."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 2
authors:
  - megginkearney
priority: 0
collection: breakpoints
key-takeaways:
  breakpoint:
    - Breakpoint on a line of code to test the code before it finishes, for example, to examine variable values.
    - Breakpoint on a DOM mutation event to observe DOM changes.
    - Breakpoint on XMLHttpRequest to examine request data before it is transmitted. 
    - Breakpoint on a JavaScript event listener to see how a certain event (such as keypress or doubleclick) is processed by the script.
---
{% wrap content %}

Breakpoint types allow you to control exactly what conditions can trigger a pause in script execution. You can view existing breakpoints at any time in the Sources panel:

* Open the Chrome menu ![Chrome menu](imgs/image_0.png).
* Choose **More tools** > **Developer tools**, or right-click a page element and choose **Inspect element** from the context menu.
* Selet the **Sources** panel. 

Breakpoints are shown in the sidebar, grouped by type.

![Breakpoints sidebar](imgs/image_1.png)

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.breakpoint %}

## Breakpoint on a line of code 

Execution pauses at a specific line, before the line is executed. Use this breakpoint type when you want to see the effect of a script up to a certain point before it finishes, or when you want to examine the values of variables or parameters the script is processing. 

* To add/remove a line breakpoint*

1. Click the line number of the line where you want to set the breakpoint. You can add multiple breakpoints by clicking each line's line number. Alternately, you can include a **debugger;** statement in your code, which is equivalent to setting a line breakpoint at that line.

2. Temporarily disable a line breakpoint by clearing its checkbox in the sidebar. 

3. Remove a line breakpoint by clicking the line number again; or right-click the breakpoint in the sidebar and choose **Remove breakpoint**.

![Line breakpoint](imgs/image_2.png)

*A line breakpoint*

## Breakpoint on a DOM mutation event 

Execution pauses when a specific DOM node is to be modified, before the modification is applied. Use this breakpoint type when the script is about to insert, change, or delete a DOM node and you want to isolate and observe the change as it happens.

*To add/remove a DOM mutation breakpoint *

1. Open the Elements panel and right-click an element. From the context menu, click **Break on…**, then choose one of the options: **Subtree modifications**, **Attributes modifications**, or **Node removal**. 

2. Temporarily disable a DOM breakpoint by clearing its checkbox in the sidebar. 

3. Remove a DOM breakpoint by right-clicking the element again, then click **Break on…**, then choose the currently checked option; or right-click the breakpoint in the sidebar and choose **Remove breakpoint**.

![DOM mutation breakpoint](imgs/image_3.png)

*A DOM mutation breakpoint*

## Breakpoint on an XMLHttpRequest

Execution pauses when an XMLHttpRequest is to be sent to a URL, before the request is sent. Use this breakpoint type when the script communicates with the server via XHR and you want to examine the request’s data before it is transmitted. 

*To add/remove an XMLHttpRequest (XHR) breakpoint*

1. Click the **Add XHR breakpoint** button ![Add XHR breakpoint](imgs/image_4.png) in the sidebar. 

2. In the **Break when URL contains** field, type a string that the URL should contain when you want the XHR request to break and press **Enter**; or, if you want to break on all XHR requests, leave the field empty. To edit the field, double-click the breakpoint. 

3. Remove an XHR breakpoint by right-clicking the breakpoint in the sidebar, then choose **Remove breakpoint**.

![XMLHttpRequest breakpoint](imgs/image_5.png)

*An XMLHttpRequest breakpoint*

## Breakpoint on a JavaScript Event Listener

Execution pauses when a specific event listener is to be fired, before the listener fires. Use this breakpoint type when you want to see how a certain event (such as keypress or dblclick) is processed by the script. Note: This type of breakpoint refers to specific listener code; you can also set a breakpoint for listeners associated with a DOM node through the Element panel's Event Listeners tab. 

*To add/remove a JavaScript Event Listener breakpoint*

1. Expand the **Event Listener Breakpoints** section in the sidebar, then expand the category of listener you want to break on (**Animation**, **Clipboard**, **Control**, etc.). 

2. Under the expanded category, click the checkbox for the type(s) of listener that should trigger a break. To choose all possible listener types in a category, click the checkbox for the category itself. 

3. Remove an event listener breakpoint by clearing its checkbox.

![Event listener breakpoint](imgs/image_6.png)

*An event listener breakpoint*

{% endwrap %}
