---
layout: article
title: "Edit the DOM"
seotitle: "Edit the DOM in the Chrome DevTools Elements panel."
description: "The DOM tree represents the page structure. Each DOM node is a page element. View and modify page elements and attributes in the Elements panel. Watch for changes to the DOM using DOM breakpoints."
introduction: "The DOM tree represents the page structure. Each DOM node is a page element. View and modify page elements and attributes in the Elements panel. Watch for changes to the DOM using DOM breakpoints."
article:
  written_on: 2015-04-30
  updated_on: 2015-04-30
  order: 3
authors:
  - megginkearney
related-guides:
  basics:
    -
      title: Edit Styles
      href: tools/iterate/inspect-styles/edit-styles
      section:
        title: "Edit Styles"
        href: tools/iterate/inspect-styles/edit-styles
  breakpoints:
    -
      title: How to Add or Remove Breakpoints
      href: web/tools/javascript/breakpoints/add-breakpoints
      section:
        title: "Breakpoint on a DOM mutation event"
        href: web/tools/javascript/breakpoints/add-breakpoints
priority: 0
collection: inspect-styles
key-takeaways:
  dom:
    - The DOM tree view in the Chrome DevTools Elements panel displays the DOM structure of the current web page. 
    - Live-edit the content and structure of your page through DOM updates.
    - Updating the in-memory DOM tree **doesn't** modify the source files. Reloading the page erases any DOM tree modifications.
    - Watch for changes to the DOM using DOM breakpoints.
remember:
  current-tree:
    - The DOM tree view shows the current state of the tree; it may not match the HTML that was originally loaded for different reasons. For example, you can modify the DOM tree using JavaScript; the browser engine can try to correct invalid author markup and produce an unexpected DOM:
    - If you delete a node by accident, use <strong>Ctrl + Z</strong> (or <strong>Cmd + Z</strong> on Mac) to undo your last action.
  chrome-extensions:
    - Many Chrome extensions add their own event listeners onto the DOM. If you see a number of event listeners that aren't set by your code, you may want to reopen your page in an Incognito window. Incognito windows prevent extensions from running by default.
---
{% wrap content %}

The DOM tree is a tree of DOM nodes that represent individual HTML elements, such as `<body>` and `<p>`. For ease of reading, the DOM tree view displays the HTML element tags instead of the DOM node types: for example, `<p>` instead of `HTMLParagraphElement`.

[Inspecting an element](tools/iterate/inspect-styles/basics?hl=en#how-to-inspect-a-page) shows you the DOM nodes for a rendered element in the browser. 

![Inspect DOM nodes for an element animation](animations/right-click-inspect-element.png)

{% include modules/remember.liquid title="Note" list=page.remember.current-tree %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.dom %}

## Navigate the DOM

Navigate through the DOM structure using either mouse or keyboard.

* To expand a collapsed node ![Expand node](imgs/collapsed-div.png), double-click the node or press **Right arrow**.
* To collapse an expanded node ![Collapse node](imgs/expanded-body.png), double-click the node or press **Left arrow**.

Expanding a node automatically selects its first child, so you can expand a deeply-nested structure by pressing the **Right arrow** repeatedly.

As you navigate, the Elements panel shows a breadcrumb trail in the bottom bar:

![Breadcrumb trail](imgs/breadcrumb-body.png)

The currently selected node is highlighted in blue. Navigating down the structure extends the trail:

![Extend breadcrumb trail](imgs/breadcrumb-footer.png)

Navigating back up the structure moves the highlight:

![Navigate up breadcrumb trail](imgs/breadcrumb-trail.png)

DevTools displays as many items as possible in the trail.
If the entire trail doesn't fit in the status bar, an ellipsis (...) shows where the trail has been truncated. Click the ellipsis to show the hidden elements:

![Breadcrumb ellipsis](imgs/breadcrumb-ellipsis.png)

Take a look at the [complete list of keyboard shortcuts](tools/iterate/inspect-styles/shortcuts)

## Edit DOM nodes

Simplest way to [edit DOM nodes](tools/iterate/inspect-styles/basics#how-to-live-edit-a-dom-node): double-click the DOM node opening **Element tag** and edit. The closing tag is automatically updated after renaming.

To edit a DOM node and its children as HTML:

* Right-click on the node and choose **Edit as HTML**.
(On Windows, press **F2** to toggle editing mode on the currently selected node.)
* Use the editable field to make your changes.
* Click outside the editable field to update the DOM.
* Press **Esc** to stop editing without modifying the DOM.

![Edit DOM as HTML](animations/tab-switch-html-attr.png)

{% include modules/related_guides.liquid inline=true list=page.related-guides.basics %}

## Edit DOM attributes

Double-click on the DOM attribute name or value to make either of them editable.
When edit mode is active,
cycle through attribute values by pressing **Tab**.
Once you reach the last attribute value, pressing tab again creates a new attribute field.

Using **Tab** is not the only way to add and edit attributes, since it's a common pattern, there are dedicated items for it in the DOM node context menu titled **Add Attribute** and **Edit Attribute**.

![Edit DOM from Context Menu](imgs/context-menu-add-edit-attribute.png)

* Select **Add Attribute** to create a new field at the end of the opening tag.
* Select **Edit Attribute** to modify an existing attribute. This action is context-sensitive, the portion you **Right-click** on determines the editable portion of the node.

## Move DOM elements

You can rearrange the DOM tree in the Elements panel to test out different arrangements for the page. Drag a node within the Elements panel to move it to a new position in the DOM tree.

![Edit DOM as HTML](animations/tab-switch-html-attr.png)

## Delete DOM elements

Remove DOM nodes by using any of the following techniques:

* Right-click on the node and select **Delete Node.**
* Select the node and press **Delete**.

You can also remove an element by deleting its tag when using **Edit as HTML**.

{% include modules/remember.liquid title="Remember" list=page.remember.undo-delete %}

## Scroll into view

When you hover over or select a DOM node, the rendered element is highlighted in the main browser window. If the element is scrolled offscreen, a tooltip is displayed at the edge of the browser window indicating that the selected element is offscreen.

To scroll the page so the element appears in the viewport, **Right-click** the element and select **Scroll into View**.

![Scroll the page](animiations/scroll-into-view.png)

## Set DOM breakpoints

A DOM breakpoint is associated with a specific DOM element, and is triggered when the element is modified in some way. Use a DOM breakpoint to debug complex JavaScript applications, when you're not sure what part of the JavaScript is updating a given element. For example, if your JavaScript is changing the styling of a DOM element, you can set a DOM breakpoint to fire when the element's attributes are modified.

Set a DOM breakpoint in the Sources panel and choose on of the following DOM modifications to break on: subtree change, attribute change, node removal.

{% include modules/related_guides.liquid inline=true list=page.related-guides.breakpoints %}

### Subtree Modifications

A subtree modification breakpoint is triggered when a child element is added, removed, or moved. For example, if you set a subtree modification breakpoint on the 'main-content' element, the following code triggers the breakpoint:

`var element = document.getElementById('main-content');

//modify the element's subtree

var mySpan = document.createElement('span');

element.appendChild( mySpan );
`

### Attributes Modifications

An attribute modification occurs when the attribute of an element (`class, id, name`) is changed dynamically:

`var element = document.getElementById('main-content');

// class attribute of element has been modified

element.className = 'active';
`

### Node Removal

A node removal modification is triggered when the node in question is removed from the DOM:

`document.getElementById('main-content').remove();`

## View DOM breakpoints

The Elements and Sources panels both include a pane for managing your DOM Breakpoints.

To see all of your DOM breakpoints, click the expander arrow next to DOM Breakpoints to show the pane. Each breakpoint is listed with an element identifier and the breakpoint type.

![List of DOM breakpoints](imgs/active-dom-breakpoints.png)

## Interact with DOM breakpoints

Interact with each listed breakpoint in any of the following ways:

* **Hover** over the element identifier to show the element's corresponding position on the page (similar to hovering over nodes in the Elements panel).
* **Click** an element to jump to its location in the Elements panel.
* **Toggle** the **checkbox** to enable or disable the breakpoint.

For example, in the following animation:

* User types in the search box, and the search box changes size.
* User sets an attribute modification breakpoint on the search box.
* User types in the search box, triggering the breakpoint and pausing execution.
* User hovers over a JavaScript variable, displaying a popover with more details.

![Interact with DOM breakpoint](animations/dom-breakpoint.png)

When you trigger a DOM breakpoint, the breakpoint is highlighted in the DOM Breakpoints pane. The **Call Stack** pane displays the **reason** for a debugger pause:

![Breakpoint reason](imgs/breakpoint-reason.png)

## View element event listeners

View JavaScript event listeners associated with a DOM node in the **Event Listeners** pane.
The top-level items in the Event Listeners pane show the event types
that have registered listeners.

![Breakpoint reason](imgs/view-event-listeners.png)

Click the expander arrow next to the event type (for example `click`) to see a list of registered event handlers. Each handler is identified by a CSS-selector like element identifier, such as "`document`" or "`button#call-to-action`". If more than one handler is registered for the same element, the element is listed repeatedly.

![Element event listeners](animtations/element-event-listener.png)

Click the expander arrow next to an element identifier to see the properties of the event handler. The Event Listeners pane lists the following properties for each listener:

* **handler:** Contains a callback function. Right-click on the function and select **Show Function Definition** to view where the function is defined (if source code is available).
* **isAttribute:** True if the event is registered through a DOM attribute (for example, `onclick`).
* **lineNumber:** Line number containing the event registration.
* **listenerBody:** String representation of the callback function.
* **node:** The DOM node that the listener is registered on. Hover over the node to reveal its position in the page viewport.
* **sourceName:** URL Path to the source file containing the event listener.
* **type:** Type of event being listened for (for example, `click`).
* **useCapture****:** A boolean value stating whether the [useCapture](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener) flag on `addEventListener` was set.

By default, registered event handlers display for the following types of elements:

* The currently selected element.
* Ancestors of the currently selected element.

If you find it excessive to view all event handlers, including those registered using event delegation, click **Filter** and select the menu item **Selected Node Only** which limits displayed event listeners to only those registered directly on the element.

{% include modules/remember.liquid title="Note" list=page.remember.chrome-extensions %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
