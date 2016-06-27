---
layout: shared/narrow
title: "How to set breakpoints"
description: "Set breakpoints in Chrome DevTools to quickly and effectively debug problematic code."
published_on: 2015-04-14
updated_on: 2015-09-03
order: 2
authors:
  - megginkearney
  - dgash
  - kaycebasques
translation_priority: 0
key-takeaways:
  breakpoint:
    - "Use manual breakpoints to pause script execution at a specific line of code."
    - "Use conditional breakpoints to pause when a specific condtion is met."
    - "Set conditional breakpoints on DOM node changes, XHR requests, event listeners, and uncaught exceptions."
---
<p class="intro">
  Breakpoints are one of the most effective ways to debug code. Breakpoints
  enable you to pause script execution and then investigate the call stack
  and variable values at that particular moment in time. There are two types 
  of breakpoints at your disposal: manual and conditional.
</p>

* Manual breakpoints are individual breakpoints that you set on a 
  specific line of code. You can set these via the Chrome DevTools GUI, or
  by inserting the `debugger` keyword in your code.
* Conditional breakpoints are triggered when a specified condition is 
  met (e.g. an `onclick` event is fired, an exception is uncaught, and 
  so on). You enable these via the DevTools GUI,
  and then DevTools automatically breaks whenever
  the specified condition is met.

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.breakpoint %}

## View breakpoints

View existing breakpoints at any time in the Sources panel:

1. Open the Chrome menu ![Chrome menu](imgs/image_0.png){:.inline}.
2. Choose **More tools** > **Developer tools**, or right-click a page 
   element and choose **Inspect element** from the context menu.
3. Select the **Sources** panel. 

Breakpoints are shown in the sidebar, grouped by type.

![Breakpoints sidebar](imgs/image_1.png)

## Create manual breakpoints

Manual breakpoints are breakpoints that you set on a single line of code. There are two ways 
to set manual breakpoints, via the DevTools GUI, or by inserting the `debugger` keyword in 
your code.

Use manual breakpoints when you have a strong suspicion of where your code is failing,
and you want to inspect the call stack and variable values at that exact moment
in time.

### Add a manual breakpoint on a single line of code

To add a line breakpoint:

* Click the line number of the line where you 
  want to set the breakpoint. You can add multiple breakpoints by clicking 
  each line's line number. 
* Insert the `debugger` keyword in your code, which is 
  equivalent to setting a line breakpoint at that line.

![Line breakpoint](imgs/image_2.png)

To temporarily disable a breakpoint, clear its checkbox in the sidebar.

To remove a breakpoint, click the line number again. Or, right-click 
the breakpoint in the sidebar, and then select **Remove breakpoint**.

## Create conditional breakpoints

Conditional breakpoints are triggered when a specified condition is
met (e.g. an `onclick` event is fired, or an exception is uncaught). 
You enable these via the DevTools GUI,
and then DevTools automatically breaks whenever
the specified condition is met.

Use conditional breakpoints when you need to set many breakpoints at once.
For example, suppose you are experiencing errors when DOM nodes are removed.
There are 20 different places where the error might be originating from. Rather 
than placing a manual breakpoint before every suspicious statement, you can just 
set a conditional breakpoint. The breakpoint is triggered whenever any code
removes a DOM node.

DevTools provides four types of conditional breakpoints:

* DOM mutation events (insertions, modifications, deletions)
* `XMLHttpRequest`
* JavaScript event listeners
* Uncaught exceptions

### Break before DOM mutation event 

Use the DOM mutation event breakpoint when the script is about to insert, change, 
or delete a DOM node and you want to isolate and observe the change as it happens. 
Execution pauses when a specific DOM node is to be modified, before the modification 
is applied (see also [Edit the DOM](/web/tools/chrome-devtools/iterate/inspect-styles/edit-dom)).

To add a DOM mutation breakpoint, open the Elements panel and right-click an element. 
From the context menu, click **Break on…**, then choose one of the options: 
**Subtree modifications**, **Attributes modifications**, or **Node removal**. 

![DOM mutation breakpoint](imgs/image_3.png)

Temporarily disable a DOM breakpoint by clearing its checkbox in the sidebar. 

To remove a DOM breakpoint, right-click the element again, then click 
**Break on…**, then choose the currently enabled option. Or, right-click the 
breakpoint in the sidebar and choose **Remove breakpoint**.

### Break on `XMLHttpRequest`

There are two ways you can create conditional breakpoints for an `XMLHttpRequest`:

* When the URL of a request contains a specified string. DevTools breaks before 
  the request is sent.
* Before a specified `XMLHttpRequest` event (e.g. `load`, `timeout`, `error`). DevTools 
  breaks right before the specified `XMLHttpRequest` event is fired. 

#### Break when XMLHttpRequest URL contains specified string

To break when an `XMLHttpRequest` URL contains a specific string:

1. Click the **Add XHR breakpoint** button 
   ![Add XHR breakpoint](imgs/image_4.png){:.inline} in the sidebar. 
2. In the **Break when URL contains** field, type the string that the 
   URL should contain when you want the XHR request to break and press 
   **Enter**. 

![XMLHttpRequest breakpoint](imgs/image_5.png)

To edit the field, double-click the breakpoint. 

To remove the breakpoint, right-click the breakpoint in the sidebar, then 
choose **Remove breakpoint**.

#### Break before specified `XMLHttpRequest` event

To break before a specified `XMLHttpRequest` event is fired:

1. Go to the **Event Listener Breakpoints** panel.
2. Expand the **XHR** dropdown menu.
3. Select the stage in the event lifecycle which you want to break at.
   DevTools breaks at that stage for all `XMLHttpRequest` events.

![Available breakpoints for XMLHttpRequest events](imgs/xhr-events.png)

### Break before JavaScript event listener is fired 

Use the JavaScript event listener breakpoint
when you want to see how a certain event
(such as keypress or dblclick) is processed by the script.
Execution pauses before the event listener is fired (see also 
[View element event listeners](/web/tools/chrome-devtools/iterate/inspect-styles/edit-dom#view-element-event-listeners)).

To add a JavaScript event listener breakpoint:

1. Expand the **Event Listener Breakpoints** section in the sidebar, 
   then expand the category of listener you want to break on 
   (**Animation**, **Clipboard**, **Control**, etc.).
2. Under the expanded category, click the checkbox for the type(s) 
   of listener that should trigger a break. To choose all possible 
   listener types in a category, click the checkbox for the category itself. 

![Event listener breakpoint](imgs/image_6.png)

Remove an event listener breakpoint by clearing its checkbox.

### Break on uncaught exception

Click on the **Pause on Exceptions** button 
(!["pause on exceptions" button](imgs/pause-on-exception-button.png){:.inline})
in the **Sources** panel of DevTools to pause script execution on any
uncaught exception.

In the animation below, the **Pause on Exceptions** button is clicked, a
button on the page is clicked, and an uncaught exception is triggered.
DevTools automatically breaks at the line where the exception is thrown.

{% animation animations/pause-on-uncaught-exception.mp4 %}

You can also view the call stack leading up to an uncaught exception 
in the DevTools console. In the animation below, a button is clicked,
an uncaught exception is triggered,
and then the carat next to the uncaught exception message (`Uncaught 0`) in the 
DevTools console is clicked. The call stack leading up to the exception
is displayed in the console.

{% animation animations/exception-in-console.mp4 %}

## Never Pause Here {#never-pause-here}

Sometimes conditional breakpoints will cause DevTools to break repeatedly on
a line that isn't relevant to the issue you're debugging. You can tell
the debugger to never pause on a specific line.

1. Right-click on the line number.
2. Select "Never pause here" from the context menu.

![Never Pause Here](imgs/never-pause-here.png)

You can also use this to disable `debugger` statements.
