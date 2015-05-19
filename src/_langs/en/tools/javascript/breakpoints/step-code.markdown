---
rss: false
layout: article
title: "How to Step Through the Code"
seotitle: "How to Step Through the Code Using Chrome DevTools Breakpoints"
description: "By executing code one line or one function at a time, you can observe changes in the data and in the page to understand exactly what is happening."
introduction: "By executing code one line or one function at a time, you can observe changes in the data and in the page to understand exactly what is happening. You can also modify data values used by the script, and you can even modify the script itself."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-18
  order: 3
authors:
  - megginkearney
priority: 0
collection: breakpoints
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

The goal of pausing script execution with breakpoints is to answer questions about perceived bugs: *Why is this variable value 20 instead of 30? Why doesn't that line of code seem to have any effect? Why is this flag true when it should be false?* To answer these kinds of questions, you can interact with both the paused script and with the data it manipulates.

After setting breakpoints, return to the page and use it normally until a breakpoint is reached. The page is put on hold, focus shifts to the DevTools panel, and the breakpoint is highlighted. You can now selectively execute code and examine its data. By executing code one line or one function at a time, you can observe changes in the data and in the page to understand exactly what is happening. You can also modify data values used by the script, and you can even modify the script itself.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.tldr-tbd %}

## Step options

Let's look at the options for stepping through the paused code, represented by a series of buttons at the top of the sidebar.

![Breakpoints button bar](imgs/image_7.png)

*The breakpoints button bar*

To resume execution up to the next breakpoint, click **Resume** ![Resume](imgs/image_8.png). If no breakpoint is encountered, normal execution is resumed.

To resume execution with breakpoints disabled for 500ms (one-half second), click and hold **Resume** until it expands, then click **Long resume** ![Long resume](imgs/image_9.png). This action is convenient for momentarily skipping breakpoints that would otherwise continually pause the code, e.g., a breakpoint inside a loop.

To step over a function call, click **Step over** ![Step over](imgs/image_10.png); or, to step into a function call, click **Step into** ![Step into](imgs/image_11.png). These actions differ only if the next line of code to be executed contains a function call. If so, **Step over** executes the complete function and then pauses at the next statement outside the called function, while **Step into** executes only the function call and then pauses at the first statement inside the called function. If the next line of code to be executed does not contain a function call, these actions are identical. **Step into** is the typical "one line at a time" action.

To step out of a function, click **Step out** ![Step out](imgs/image_12.png). This action executes the remainder of the current function and then pauses at the next statement after the function call.

To temporarily disable all breakpoints, click **Deactivate breakpoints** ![Deactivate breakpoints](imgs/image_13.png). This action is convenient when you want to resume full execution without actually removing your breakpoints. Click the button again to reactivate the breakpoints.

To automatically pause when an exception (such as an undefined variable) occurs, click **Pause on exceptions** ![Pause on exceptions](imgs/image_14.png). This action is useful when you suspect a non-fatal exception is causing a problem, but you don't know where it is. When this option is enabled, you can refine it by clicking the **Pause On Caught Exceptions** checkbox; in this case, execution is paused only when a specifically-handled exception occurs. 

Near the top of the sidebar is the **Call Stack** section. When the code is paused at a breakpoint, the Call Stack shows the execution path, in reverse chronological order, that brought the code to that breakpoint. This is helpful in understanding not just where the execution is now, but how it got there, an important factor in debugging. 

In this Call Stack example, an initial onclick event at line 50 in the *index.html* file called the `setone()` function at line 18 in the *dgjs.js* JavaScript file, which then called the `setall()` function at line 4 in the same file, where execution is paused at the current breakpoint.

![Call Stack](imgs/image_15.png)

*The Call Stack*

## Data manipulation

While at a breakpoint, you can not only examine the code, but you can observe and modify the data it is processing. This is crucial when trying to track down a variable that seems to have the wrong value or a passed parameter that isn't received as expected. These actions are taken in the Console Drawer; click **Show/Hide drawer** ![Show/Hide drawer](imgs/image_16.png) to open or close the drawer.

In the Console Drawer, you can simply type the name of a variable or parameter to see its current value. You can also type a JavaScript assignment statement to change the value, and then continue executing the script to observe the effect. In this way you can force variables to hold certain values in order to see whether your code behaves as you expect. 

In this Console Drawer example, we reveal that the value of the parameter `dow` is currently 2, but manually change it to 3 before resuming execution.

![Console Drawer](imgs/image_17.png)

*The Console Drawer*

## Live editing

Observing the executing code and pausing it with breakpoints helps you locate logic errors, but it doesn't help you fix them if you can't make code changes and test the results. DevTools' live editing feature lets you do just that.

To live edit a script, open it in the center editing panel and scroll to the desired code. Make your changes, then save them to a local file (right-click in the editor, then choose **Save** or **Save as…** from the context menu). You can then resume execution and interact with the page as usual; your modified script will execute in place of the original, and you can observe the effects of your changes.

In this live editing example, we suspect that the parameter `dow` is, in every case, off by +1 when it is passed to the function setone() – that is, the value of `dow`, as received, is 1 when it should be 0, 2 when it should be 1, etc. To quickly test whether decrementing the passed value confirms that this is the problem, we add line 17 at the beginning of the function, save the modification, and resume execution. If this temporary fix avoids the bug, we can remove it and look elsewhere for the real reason the parameter's value is incorrect each time it is passed to the function.

![Live editing](imgs/image_18.png)

*A Live editing modification*

{% include modules/nextarticle.liquid %}

{% endwrap %}
