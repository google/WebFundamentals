project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Use breakpoints to pause your JavaScript code and investigate the values of variables and the call stack at that particular moment in time.

{# wf_updated_on: 2016-07-17 #}
{# wf_published_on: 2015-04-13 #}

# How to set breakpoints {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Use breakpoints to pause your JavaScript code and investigate
the values of variables and the call stack at that particular moment in
time.

Once you've got your breakpoints set up, learn how to step through your code
and investigate your variables and call stacks in [How to step through your
code](step-code).


## TL;DR
- The most basic way to set a breakpoint is to manually add one on a specific line of code. You can configure these breakpoints to only get triggered when a certain condition is met.
- You can also set breakpoints that are triggered when general conditions are met, such as an event, a DOM change, or an uncaught exception.


## Set a breakpoint on a particular line of code {:#line-number}

Setting a breakpoint on a particular line of code is useful when you know
what statement you want to investigate. For example, if your
login workflow is not working as expected, and you only have one function in
your code that handles the login, then it's safe to assume that the bug
is probably in that function. It makes sense in this scenario to add a
breakpoint at the first line of that function.

When you set a breakpoint on a line of code, the code always pauses on that
line of code until you delete the breakpoint, disable it, or make it
conditional.

To set a breakpoint on a particular line of code, first open the **Sources**
panel, and select the script from the **File Navigator** pane on the lefthand
side. If you can't see the **File Navigator**, press the **Toggle file
navigator** button
(![hide / show file navigator button][fn]{:.inline})
.

**Tip**: If you're working with minified code, press the **pretty print**
button 
(![pretty print button][pp]{:.inline})
to make it readable. 

Along the left side of your source code you can see line numbers. This region
is called the **line number gutter**. Click within the line number gutter to
add a breakpoint on that line of code.

![line number breakpoint][lnb]

[pp]: imgs/pretty-print.png
[fn]: imgs/file-navigator.png
[lnb]: imgs/line-number-breakpoint.png

### Make a line number breakpoint conditional

A conditional breakpoint is only triggered when the condition that you specify
is true.

Right-click on a line number that does not already have a breakpoint and
press **Add conditional breakpoint** to create a conditional breakpoint. 
If you've already added a breakpoint on a line of code and you want to make
that breakpoint conditional, right-click and press **Edit breakpoint**.

Enter your condition in the textfield and press <kbd>Enter</kbd>.

![adding condition][ac]

Conditional breakpoints are colored gold. 

![conditional breakpoint][cb]

[ac]: imgs/adding-condition.png
[cb]: imgs/conditional-breakpoint.png

### Delete or disable a line number breakpoint

If you want to temporarily ignore a breakpoint, then disable it. 
Right-click within the **line number gutter** and select **Disable
breakpoint**.

![disable breakpoint][db]

If you no longer need a breakpoint, then delete it. Right-click within the 
**line number gutter** and select **Remove breakpoint**.

You can also manage all of your line number breakpoints across all of your
scripts from a single location. This location is the **Breakpoints** pane
on the **Sources** panel.

To delete a breakpoint from the **Breakpoints** pane UI, right-click on it
and select **Remove breakpoint**.

![breakpoints pane][bp]

To disable a breakpoint from this pane, disable its checkbox.

To disable all breakpoints, right-click from this pane and select **Deactivate
breakpoints**. This produces the same effect as the **Disable All
Breakpoints** option.

You can also disable all breakpoints by pressing the **deactivate
breakpoints** button
(![deactivate breakpoints button][dbb]{:.inline}), also on the 
**Sources** panel.

[db]: imgs/disable-breakpoint.png
[bp]: imgs/breakpoints-pane.png
[dbb]: imgs/deactivate-breakpoints-button.png

## Set a breakpoint on DOM change {:#dom}

Setting a breakpoint on DOM changes is useful when a DOM node is being added,
deleted, or modified in an unexpected way, and you don't know what script is
causing the change.

This section shows you how to set a breakpoint on a particular node. If you
want to trigger a breakpoint when *any* node is deleted, changed, etc., check
out the **DOM Mutation** category in the [event listeners breakpoints 
pane](#events).

Go to the **Elements** panel to set DOM change breakpoints.

Right-click on a node, hover over **Break on**, and select one of the options.

![DOM change breakpoint][dcb]

**Tip**: These are not exclusive options. You can have two or more of the
options enabled on any given node.

Here's more information about each type of breakpoint:

* **Subtree modifications**. Triggered when a child of the currently-selected
  node is removed, added, or the contents of a child are changed. Not
  triggered on child node attribute changes, or on any changes to the
  currently-selected node.

* **Attributes modifications**: Triggered when an attribute is added or removed
  on the currently selected node, or when an attribute value changes.

* **Node Removal**: Triggered when the currently-selected node is removed.

When you set a DOM change breakpoint, a blue circle is displayed next to
the node where the breakpoint is set. 

![DOM change breakpoint indicator][dbi]

You can manage all of your DOM change breakpoints from the **DOM Breakpoints**
pane on the **Elements** panel.

Toggle the checkbox next to a breakpoint to disable or enable that breakpoint.
Right-click on a breakpoint and select **Remove Breakpoint** to delete that
breakpoint. You can also remove all breakpoints by right-clicking anywhere
within the **DOM Breakpoints** pane and selecting **Remove all breakpoints**.

![DOM Breakpoints pane][dbp]

You can also access the **DOM Breakpoints** pane from the **Sources** panel.

![DOM Breakpoints pane on Sources panel][dbps]

[dcb]: imgs/dom-change-breakpoint.png
[dbi]: imgs/dom-breakpoint-indicator.png
[dbp]: imgs/dom-breakpoints-pane.png
[dbps]: imgs/dom-breakpoints-pane-sources.png

## Break on XHR

There are two ways you can trigger breakpoints on XHRs: when *any* XHR reaches
a certain stage of the XHR lifecycle (`readystatechange`, `load`, etc.), or
when the URL of an XHR matches a certain string. 

If you want to break on a certain stage of the XHR lifecycle, check out the
**XHR** category in the [event listener breakpoints pane](#events).

To break when the URL of an XHR matches a certain string, use the **XHR
Breakpoints** pane on the **Sources** panel. 

![XHR breakpoints pane][xbp]

[xbp]: imgs/xhr-breakpoints-pane.png

Click the plus sign button to add a new breakpoint pattern. Enter your string
in the textfield and press <kbd>Enter</kbd> to save it.

**Tip**: Click the plus sign and then immediately press <kbd>Enter</kbd> to
trigger a breakpoint before any XHR is sent.

## Break when an event is fired {:#events}

Use the **Event Listener Breakpoints** pane on the **Sources** panel to
break when a certain event (e.g. `click`) or category of events (e.g. any
`mouse` event) is fired.

![event listener breakpoints pane][elbp]

The top-level represents categories of events. Enable one of these checkboxes
to pause whenever any of the events from that category is triggered. Expand
the top-level category to see what events it encompasses.

If you want to monitor a specific event, find the top-level category that the
event belongs to, and then enable the checkbox next to your target event.

![expanded event listener breakpoints pane][eelbp]

[elbp]: imgs/event-listener-breakpoints-pane.png

[eelbp]: imgs/expanded-event-listener-breakpoints-pane.png

## Break on uncaught exceptions {:#exceptions}

If your code is throwing exceptions, and you don't know where they're coming
from, press the **pause on exception** button 
(![pause on exception button][poeb]{:.inline})
on the **Sources** panel.

DevTools automatically breaks at the line where the exception is thrown.

[poeb]: imgs/pause-on-exception-button.png
