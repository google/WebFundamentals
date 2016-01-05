---
layout: shared/narrow
title: "How to Step Through the Code"
description: "By executing code one line or one function at a time, you can observe changes in the data and in the page to understand exactly what is happening."
published_on: 2015-04-14
updated_on: 2015-09-02
order: 3
authors:
  - dgash
  - pbakaus
  - kaycebasques
translation_priority: 0
key-takeaways:
  tldr:
    - "Step through code to observe issues before or while they happen and test out changes through live editing."
    - "Prefer stepping over console logging, as logged data is already stale the moment it arrives in the console."
    - "Enable the 'Async call stack' feature to gain greater visibility into the call stack of asynchronous functions."
    - "Blackbox scripts to hide third-party code from your call stacks."
    - "Use named functions rather than anonymous ones to improve call stack readability."
---
<p class="intro">
  By executing code one line or one function at a time, you can observe changes in the data and in the page to understand exactly what is happening. You can also modify data values used by the script, and you can even modify the script itself.
</p>

*Why is this variable value 20 instead of 30? Why doesn't that line of code seem to have any effect? Why is this flag true when it should be false?* Every developer faces these questions, and steps through code to find out.

After [setting breakpoints](/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints), return to the page and use it normally until a breakpoint is reached. This pauses all JavaScript on the page, focus shifts to the DevTools Sources panel, and the breakpoint is highlighted. You can now selectively execute code and examine its data, step by step.

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Stepping in action

All step options are represented through clickable icons ![Breakpoints button bar](imgs/image_7.png){:.inline} in the sidebar, but can also be triggered via shortcut. Here's the rundown:

<table class="mdl-data-table">
  <thead>
    <tr>
      <th data-th="Icon/Button">Icon/Button</th>
      <th data-th="Action">Action</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_8.png" alt="Resume" class="inline"></td>
      <td data-th="Action">Resume</td>
      <td data-th="Description">Resumes execution up to the next breakpoint. If no breakpoint is encountered, normal execution is resumed.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_9.png" alt="Long Resume" class="inline"></td>
      <td data-th="Action">Long Resume</td>
      <td data-th="Description">Resumes execution with breakpoints disabled for 500ms. Convenient for momentarily skipping breakpoints that would otherwise continually pause the code, e.g., a breakpoint inside a loop. <p><b>Click and hold <i>Resume</i> until expands to show the action.</b></p></td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_10.png" alt="Step Over" class="inline"></td>
      <td data-th="Action">Step Over</td>
      <td data-th="Description">Executes whatever happens on the next line and jumps to the next line.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_11.png" alt="Step Into" class="inline"></td>
      <td data-th="Action">Step Into</td>
      <td data-th="Description">If the next line contains a function call, <i>Step Into</i> will jump to and pause that function at its first line.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_12.png" alt="Step Out" class="inline"></td>
      <td data-th="Action">Step Out</td>
      <td data-th="Description">Executes the remainder of the current function and then pauses at the next statement after the function call.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_13.png" alt="Deactivate breakpoints" class="inline"></td>
      <td data-th="Action">Deactivate breakpoints</td>
      <td data-th="Description">Temporarily disables all breakpoints. Use to resume full execution without actually removing your breakpoints. Click it again to reactivate the breakpoints.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_14.png" alt="Pause on exceptions" class="inline"></td>
      <td data-th="Action">Pause on exceptions</td>
      <td data-th="Description">Automatically pauses the code when an exception occurs.</td>
    </tr>
  </tbody>
</table>

Use **step into** as your typical "one line at a time" action, as it ensures that only one statement gets executed, no matter what functions you step in and out of.

Use [Pause on exceptions](add-breakpoints#break-on-uncaught-exception) when you suspect an uncaught exception is causing a problem, but you don't know where it is. When this option is enabled, you can refine it by clicking the **Pause On Caught Exceptions** checkbox; in this case, execution is paused only when a specifically-handled exception occurs.

## The call stack

Near the top of the sidebar is the **Call Stack** section. When the code is paused at a breakpoint, the call stack shows the execution path, in reverse chronological order, that brought the code to that breakpoint. This is helpful in understanding not just where the execution is *now*, but how it got there, an important factor in debugging.

### Example

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--4-col">
    <img src="imgs/image_15.png" alt="Call stack">
  </div>
  <div class="mdl-cell mdl-cell--8-col">
    An initial onclick event at line 50 in the <strong>index.html</strong> file called the <code>setone()</code> function at line 18 in the <strong>dgjs.js</strong> JavaScript file, which then called the <code>setall()</code> function at line 4 in the same file, where execution is paused at the current breakpoint.
  </div>
</div>

### Enable the async call stack

Enable the async call stack feature to gain more visibiliy into the execution
of your asynchronous function calls.

1. Open the **Sources** panel of DevTools.
2. On the **Call Stack** pane, enable the **Async** checkbox.

The video below contains a simple script to demonstrate the async call 
stack feature. In the script, a third-party library is used to select a
DOM element. A function called `onClick` is registered as the 
`onclick` event handler for the element. Whenever `onClick` is called,
it in turn calls a function named `f`, which just forces the script to 
pause via the `debugger` keyword. 

{% animation animations/async-call-stack-demo.mp4 %}

In the video, a breakpoint is triggered, and the call stack is expanded.
There is only one call in the stack: `f`. The async call stack feature is then
enabled, the script resumes, the breakpoint is triggered again, and then the
call stack is expanded a second time. This time, the call stack contains 
all of the calls leading up to `f`, including third-party library calls, and
the call to `onClick`. The first time that the script was called, there 
was only one call in the call stack. The second time, there were four. In
short, the async call stack feature provides increased visibility into 
the full call stack of asynchronous functions.

### Tip: name functions to improve call stack readability

Anonymous functions make the call stack difficult to read. Name your functions
to improve readability.

The code in the two screenshots below is functionally equivalent. The
exact functioning of the code is not important, what is important is
that the code in the first screenshot uses anonymous functions, while
the second uses named functions.

In the call stack in the first screenshot, the top two functions are both just titled
`(anonymous function)`. In the second screenshot, the top two functions
are named, which makes it easier to understand the program flow at a glance.
When you are working with numerous script files, including third-party
libraries and frameworks, and your call stack is five or ten calls deep,
it is much easier to understand the call stack flow when functions are named.

Call stack with anonymous functions:

![Call stack with hard-to-read anonymous functions](imgs/anon.png)

Call stack with named functions: 

![Call stack with easier-to-read named function](imgs/named.png)

<!-- blackbox OR disable third-party code??? -->

### Blackbox third-party code

Blackbox script files to omit third-party files from your call stacks.

Before blackbox:

![Call stack before blackbox](/web/tools/chrome-devtools/debug/breakpoints/imgs/before-blackbox.png)

After blackbox:

![Call stack after blackbox](/web/tools/chrome-devtools/debug/breakpoints/imgs/after-blackbox.png)

To blackbox a file:

1. Open DevTools Settings.

   ![Opening DevTools Settings](/web/tools/chrome-devtools/debug/breakpoints/imgs/open-settings.png)

2. In the navigation menu on the left, click **Blackboxing**.

   ![Blackboxing panel in Chrome DevTools](/web/tools/chrome-devtools/debug/breakpoints/imgs/blackbox-panel.png)

3. Click **Add pattern**.

4. In the **Pattern** textfield enter the filename pattern that you wish to 
   exclude from your call stack. DevTools excludes any scripts that match the 
   pattern. 

   ![Adding blackbox pattern](/web/tools/chrome-devtools/debug/breakpoints/imgs/add-pattern.png)

5. In the dropdown menu to the right of the textfield, select **Blackbox** to
   execute the script files but exclude the calls from the call stack, or select
   **Disabled** to prevent the files from executing.

6. Click **Add** to save.

The next time that you run the page and a breakpoint is triggered, DevTools
hides any function calls from the blackboxed scripts from the call stack.

## Data manipulation

When code execution is paused, you can observe and modify the data it is processing. This is crucial when trying to track down a variable that seems to have the wrong value or a passed parameter that isn't received as expected.

Show the Console drawer by clicking **Show/Hide drawer** ![Show/Hide drawer](imgs/image_16.png){: .inline} or press <kbd class="kbd">ESC</kbd>. With the console open while stepping, you can now:

* Type the name of a variable to see its current value in the scope of the current function
* Type a JavaScript assignment statement to change the value

Try modifying values, then continue execution to see how it changes the outcome of your code and whether it behaves as you expect.

#### Example

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--4-col">
    <img src="imgs/image_17.png" alt="Console Drawer">
  </div>
  <div class="mdl-cell mdl-cell--8-col">
    We reveal that the value of the parameter `dow` is currently 2, but manually change it to 3 before resuming execution.
  </div>
</div>

## Live editing

Observing and pausing the executing code helps you locate errors, and live editing allows you to quickly preview changes without the need for reloading.

To live edit a script, simply click into the editor part of the Sources panel while stepping. Make your changes as you would do in your editor, then resume execution and interact with the page as usual; your modified script will execute in place of the original, and you can observe the effects of your changes.

#### Example

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--4-col">
    <img src="imgs/image_18.png" alt="Live Editing" >
  </div>
  <div class="mdl-cell mdl-cell--8-col">
    We suspect that the parameter <code>dow</code> is, in every case, off by +1 when it is passed to the function <code>setone()</code> – that is, the value of <code>dow</code>, as received, is 1 when it should be 0, 2 when it should be 1, etc. To quickly test whether decrementing the passed value confirms that this is the problem, we add line 17 at the beginning of the function and resume.
  </div>
</div>



