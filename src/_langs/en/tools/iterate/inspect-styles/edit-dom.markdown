---
rss: false
layout: tools-article
title: "Edit the DOM"
seotitle: "Edit the DOM in the Chrome DevTools Elements panel."
description: "The DOM tree view in the Chrome DevTools Elements panel displays the DOM structure of the current web page. Live-edit the content and structure of your page through DOM updates."
introduction: "The DOM tree view in the Chrome DevTools Elements panel displays the DOM structure of the current web page. Live-edit the content and structure of your page through DOM updates."
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
      href: https://web-central.appspot.com/web/tools/javascript/breakpoints/add-breakpoints
      section:
        title: "Breakpoint on a DOM mutation event"
        href: https://web-central.appspot.com/web/tools/javascript/breakpoints/add-breakpoints
priority: 0
collection: inspect-styles
key-takeaways:
  dom:
    - The DOM defines your page structure. Each DOM node is a page element, for example, a header node, paragraph node.
    - Live-edit the content and structure of your pages through the rendered DOM.
    - But remember, you can't modify source files through DOM changes in the Elements panel. Reloading the page erases any DOM tree modifications.
    - Watch for changes to the DOM using DOM breakpoints.
remember:
  delete-node:
    - If you delete a node by accident, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Z</kbd> (or <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Z</kbd> on Mac) to undo your last action.
  chrome-extensions:
    - Many Chrome extensions add their own event listeners onto the DOM. If you see a number of event listeners that aren't set by your code, you may want to reopen your page in an <a href="https://support.google.com/chrome/answer/95464?hl=en">Incognito window</a>. Incognito windows prevent extensions from running by default.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.dom %}

## Inspect page element

[Inspect a page element](/web/tools/iterate/inspect-styles/basics?hl=en#how-to-inspect-a-page) to see it's DOM nodes rendered in the browser:

{% animation animations/right-click-inspect-element.mp4 %}

## Navigate the DOM

Navigate through the DOM structure using either mouse or keyboard.
See also the complete list of [keyboard shortcuts for the Elements panel](/web/tools/iterate/inspect-styles/shortcuts).

### Expand or collapse node

To expand a collapsed node: ![Expand node](imgs/collapsed-div.png){:.inline}, double-click the node or press **Right arrow**.
Expanding a node automatically selects its first child, so you can expand a deeply-nested structure by pressing the **Right arrow** repeatedly.

To collapse an expanded node: ![Collapse node](imgs/expanded-body.png){:.inline}, double-click the node or press **Left arrow**.

### Navigate the breadcrumb trail

As you navigate, the Elements panel shows a breadcrumb trail in the bottom bar:

![Breadcrumb trail](imgs/breadcrumb-body.png)

The currently selected node is highlighted in blue. Navigating down the structure extends the trail:

![Extend breadcrumb trail](imgs/breadcrumb-footer.png)

Navigating back up the structure moves the highlight:

![Navigate up breadcrumb trail](imgs/breadcrumb-trail.png)

DevTools displays as many items as possible in the trail.
If the entire trail doesn't fit in the status bar, an ellipsis (...) shows where the trail has been truncated. Click the ellipsis to show the hidden elements:

![Breadcrumb ellipsis](imgs/breadcrumb-ellipsis.png)

## Edit DOM nodes and attributes

To [edit DOM nodes](/web/tools/iterate/inspect-styles/basics#how-to-live-edit-a-dom-node), double-click the DOM node to open the **Element tag** and edit. The closing tag is automatically updated after renaming.

To edit DOM attributes, double-click on the attribute name or value.
When edit mode is active,
cycle through attribute values by pressing **Tab**.
Once you reach the last attribute value, pressing tab again creates a new attribute field.

### Edit DOM node and its children as HTML

To edit a DOM node and its children as HTML:

1. Right-click on the node and choose **Edit as HTML**.
(On Windows, press <kbd class="kbd">F2</kbd> to toggle editing mode on the currently selected node.)
2. Use the editable field to make your changes.
3. Click outside the editable field to update the DOM.
4. Press <kbd class="kbd">Esc</kbd> to stop editing
without modifying the DOM.

{% animation animations/edit-as-html.mp4 %}

### Edit node attributes using context menu

Using **Tab** is not the only way to add and edit attributes.
Edit and add attributes using the DOM node context menu:

![Edit DOM from Context Menu](imgs/context-menu-add-edit-attribute.png)

* Select **Add Attribute** to create a new field
at the end of the opening tag.
* Select **Edit Attribute** to modify an existing attribute. This action is context-sensitive; the portion you **Right-click** on determines the editable portion of the node.

## Move DOM elements

Test out different page structures by rearranging the elements
in the DOM tree.
Drag a node within the Elements panel
to move it to a new position in the DOM tree.

{% animation animations/rearrange-nodes.mp4 %}

## Delete DOM elements

Remove DOM nodes by using any of the following techniques:

* Right-click on the node and select **Delete Node**.
* Select the node and press **Delete**.

You can also remove an element by deleting its tag
when using **Edit as HTML**.

{% include modules/remember.liquid title="Note" list=page.remember.delete-node %}

## Scroll into view

When you hover over or select a DOM node,
the rendered element is highlighted in the main browser window.
If the element is scrolled offscreen,
a tooltip is displayed at the edge of the browser window
indicating that the selected element is offscreen.

To scroll the page so the element appears in the viewport,
**Right-click** the element and select **Scroll into View**.

{% animation animations/scroll-into-view.mp4 %}

## Set DOM breakpoints

Set DOM breakpoints to debug complex JavaScript applications.
For example, if your JavaScript is changing the styling of a DOM element,
set a DOM breakpoint to fire when the element's attributes are modified. Trigger a breakpoint on one of the following DOM changes: subtree change, attribute change, node removal.

{% include modules/related_guides.liquid inline=true list=page.related-guides.breakpoints %}

### Subtree Modifications

A subtree modification breakpoint is triggered when a child element is added, removed, or moved. For example, if you set a subtree modification breakpoint on the `main-content` element, the following code triggers the breakpoint:

{% highlight javascript %}
var element = document.getElementById('main-content');
//modify the element's subtree.
var mySpan = document.createElement('span');
element.appendChild( mySpan );
{% endhighlight %}

### Attribute Modifications

An attribute modification occurs when the attribute of an element (`class, id, name`) is changed dynamically:

{% highlight javascript %}
var element = document.getElementById('main-content');
// class attribute of element has been modified.
element.className = 'active';
{% endhighlight %}

### Node Removal

A node removal modification is triggered when the node
in question is removed from the DOM:

{% highlight javascript %}
document.getElementById('main-content').remove();
{% endhighlight %}

## View DOM breakpoints

The Elements and Sources panels both include a pane for managing your DOM Breakpoints.

To see all of your DOM breakpoints,
click the expander arrow next to DOM Breakpoints to show the pane.
Each breakpoint is listed with an element identifier and the breakpoint type.

![List of DOM breakpoints](imgs/active-dom-breakpoints.png)

## Interact with DOM breakpoints

Interact with each listed breakpoint in any of the following ways:

* **Hover** over the element identifier to show the element's corresponding position on the page (similar to hovering over nodes in the Elements panel).
* **Click** an element to jump to its location in the Elements panel.
* **Toggle** the **checkbox** to enable or disable the breakpoint.

For example, in the following animation:

* Type in the search box, and the search box changes size.
* Set an attribute modification breakpoint on the search box.
* Type in the search box, triggering the breakpoint and pausing execution.
* Hovers over a JavaScript variable, displaying a popover with more details.

{% animation animations/dom-breakpoint.mp4 %}

When you trigger a DOM breakpoint, the breakpoint is highlighted in the DOM Breakpoints pane. The **Call Stack** pane displays the **reason** for a debugger pause:

![Breakpoint reason](imgs/breakpoint-reason.png)

## View element event listeners

View JavaScript event listeners associated with a DOM node in the **Event Listeners** pane.
The top-level items in the Event Listeners pane show the event types
that have registered listeners.

![Event types that have event listeners](imgs/view-event-listeners.png)

Click the expander arrow next to the event type (for example `click`) to see a list of registered event handlers. Each handler is identified by a CSS selector-like element identifier, such as `document` or `button#call-to-action`. If more than one handler is registered for the same element, the element is listed repeatedly.

{% animation animations/event-listeners.mp4 %}

Click the expander arrow next to an element identifier to see the properties of the event handler. The Event Listeners pane lists the following properties for each listener:

<table class="table-2">
  <thead>
    <tr>
      <th>Event Listener Properties</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
      <td data-th="Value"><code>handler</code></td>
      <td data-th="Description">Contains a callback function. Right-click on the function and select <strong>Show Function Definition</strong> to view where the function is defined (if source code is available).</td>
    </tr>
    <tr>
      <td data-th="Value"><code>isAttribute</code></td>
      <td data-th="Description">True if the event is registered through a DOM attribute (for example, <code>onclick</code>).</td>
    </tr>
    <tr>
      <td data-th="Value"><code>lineNumber</code></td>
      <td data-th="Description">Line number containing the event registration.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>listenerBody</code></td>
      <td data-th="Description">String representation of the callback function.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>sourceName</code></td>
      <td data-th="Description">URL Path to the source file containing the event listener.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>type</code></td>
      <td data-th="Description">Type of event being listened for (for example, <code>click</code>).</td>
    </tr>
    <tr>
      <td data-th="Value"><code>useCapture</code></td>
      <td data-th="Description">A boolean value stating whether the <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener">useCapture</a> flag on <code>addEventListener</code> was set.</td>
    </tr>
  </tbody>
</table>

By default, registered event handlers display for the following types of elements:

* The currently selected element.
* Ancestors of the currently selected element.

If you find it excessive to view all event handlers, including those registered using event delegation, click **Filter** and select the menu item **Selected Node Only** which limits displayed event listeners to only those registered directly on the element.

{% include modules/remember.liquid title="Note" list=page.remember.chrome-extensions %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
