---
layout: article
title: "Inspect and Tweak Your Pages: the Basics"
seotitle: "Inspect and Tweak Your Pages in the Chrome DevTools Elements Panel"
description: "TBD description."
introduction: "TBD introduction."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 1
authors:
  - megginkearney
priority: 0
collection: inspect-styles
key-takeaways:
  dom-styles:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

Having a real-time representation of the page can be a powerful tool when debugging and authoring web pages. The **Elements panel** lets you view structured information about the current page; the **Styles pane** within the Elements panel shows the CSS rules applied to the individual elements in the page structure. Use the Elements panel and Styles pane to inspect and live-edit the HTML & CSS of a web page.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.dom-styles %}

## How to inspect a page

## How to edit a page

### Live-edit a style

** Todo: Related guide for Edit Styles very important

### Live-edit a DOM node

** Todo: Related guide for Edit the DOM very important

You will often visit the Elements panel when you need to identify the HTML snippet for some aspect of the page. For example, you may be curious if an image has an HTML id attribute and what the value is.

The **Elements panel** lets you see everything in one DOM tree, and allows inspection and on-the-fly editing of DOM elements. 

### Inspect HTML elements

Inspecting an element shows you the DOM nodes and CSS responsible for a rendered element in the browser.

There are several ways to inspect an element:

* Right-click any element on the page the page and select **Inspect Element**.
* Press **Ctrl + Shift + C** (or **Cmd + Shift + C** on Mac) to open DevTools in Inspect Element mode, then click on an element.
* Click the **Inspect Element button** ![Inspect icon](imgs/inspect-icon.png) at the top of the DevTools window to go into Inspect Element Mode, then click on an element.
* Use the `inspect()` method in the console, such as `inspect(document.body)`. See the [Command-Line API](commandline-api.md) for information on using inspect.

### Inspect styles applied to an element

CSS defines the presentation layer of your page. You can view and modify any CSS declaration which affects an element on the current page. An understanding of the cascade (in Cascading Style Sheets) and inheritance aids a development and debugging workflow:

* The cascade relates to how CSS declarations are given weights to determine which rules should take precedence when they overlap with another rule.
* Inheritance relates to how HTML elements inherit CSS properties from their containing elements (ancestors).

See the W3C documentation on cascading and inheritance for more information: [http://www.w3.org/TR/CSS2/cascade.html](http://www.w3.org/TR/CSS2/cascade.html)

The Styles pane shows the CSS rules that apply to the selected element, from highest priority to lowest:

* Element styles applied directly to the element using the style property (or applied in DevTools).
* Matched CSS rules include any rules matched by the element. For example, the CSS selector `span` matches an HTML `<span>` element.
* Inherited styles include any inheritable style rules that match the selected element's ancestors.

![](imgs/styles-annotated.png)

The labels on the image above correspond with the numbered items below.

1. Styles associated with a selector that matches the element.
2. **Cascade** rules dictate that if two rules have the same origin, weight, and specificity, the last defined rule takes precedence. In this case, the second color property takes precedence. The first color property is shown in strikethrough text to show that it's been overridden.
3. [User agent stylesheets](http://meiert.com/en/blog/20070922/user-agent-style-sheets/) are clearly labelled, and are often overridden by the CSS on your web page.
4. The **cascade** dictates that author styles have more weight than user agent styles, so the user-defined style of `display: inline-block;` overrides the user-agent defined style of `display: block`.
5. **Inherited** styles are displayed as a group under the "Inherited from [node]" header. Click the DOM node in the header to navigate to its position in the DOM tree view. (The [CSS 2.1 properties table](http://www.w3.org/TR/CSS21/propidx.html) shows which properties are inheritable.)
6. The selector `:root body` has a higher **specificity** than just `body`, therefore its style declarations take precedence.
7. `font-family` on the body is **overridden**. It is also a similar case for the `font-size` property (overridden due to [selector specificity](http://www.w3.org/TR/css3-selectors/#specificity))

Comma separated selectors are colored differently depending on whether or not they match the selected DOM node.

![](dom-and-styles-files/images/selector-visibility.png)

Greyed out selectors like `audio` and `video` do not apply to the selected node. The rules shown above corresponds to the following CSS source:

<pre>video, audio, div, .message, body *, time {
  /* visibility: hidden */
  margin-top: 10px;
}
</pre>

Since the visibility declaration is commented out, the Styles pane shows it as disabled.

Use the shortcut **Ctrl + Click** (or **Cmd + Click** on Mac) on CSS properties or property values from the styles pane to navigate to their position in the source code within the Sources panel.

### Navigate the DOM

The DOM tree is a tree of DOM nodes that represent individual HTML elements, such as `<body>` and `<p>`. The DOM tree view displays the DOM structure of the current web page.

For ease of reading, the DOM tree view displays the HTML element tags instead of the DOM node types: for example, `<h1>` instead of `HTMLHeadingElement`. 

[Viewing a heading element in the DOM](imgs/elements-panel.png)

You can navigate through the DOM structure using either mouse or keyboard.

* To expand a collapsed node ![Expand node](imgs/collapsed-div.png), double-click the node or press **Right arrow**.
* To collapse an expanded node ![Collapse node](imgs/expanded-body.png), double-click the node or press **Left arrow**.

Expanding a node automatically selects its first child, so you can expand a deeply-nested structure by pressing the **Right arrow** repeatedly.

As you navigate, the Elements panel shows a breadcrumb trail in the bottom bar:

![Breadcrumb trail](imgs/breadcrumb-body.png)

The currently selected node is highlighted in blue. Navigating down the structure extends the trail:

![Extend breadcrumb trail](imgs/breadcrumb-footer.png)

Navigating back up the structure moves the highlight:

![Navigating up DOM](imgs/breadcrumb-trail.png)

DevTools displays as many items as possible in the trail. If the entire trail doesn't fit in the status bar, an ellipsis (...) shows where the trail has been truncated. Click the ellipsis to show the hidden elements.

![Breadcrumb ellipsis](imgs/breadcrumb-ellipsis.png)

## How to edit a page

### Live-edit styles

Make sure to link off to more advanced docs on css preprocessors.

You can add or edit styles within the **Styles pane** in the Elements panel. Unless the area containing the styling information is greyed out (as is the case with user agent stylesheets), all styles are editable. Edit styles in the following ways:

*   Edit an existing property name or value.
*   Add a new property declaration.
*   Add a new CSS rule.

To enable or disable a style declaration, check or uncheck the checkbox next to it.

#### Edit an existing property name or value

Click a CSS property name to edit the name:

![](dom-and-styles-files/images/image_20.png)

Click on a property value to edit the value. If you're editing a property name, press Tab or Enter to edit the property value.

![](dom-and-styles-files/images/image_21.png)

By default, your CSS modifications are not permanent, changes are lost when you reload the page. To customise the behaviour, see [Workspaces](workspaces.html).

When editing a numeric CSS property value, you can increment and decrement numeric CSS property values using the following shortcuts:

*   Press <span class="kbd">Up</span> or <span class="kbd">Down</span> to increment or decrement the value by 1 (or by .1 if the current value is between -1 and 1).
*   Press <span class="kbd">Alt</span> + <span class="kbd">Up</span> or <span class="kbd">Alt</span> + <span class="kbd">Down</span> to increment or decrement the value by 0.1.
*   Press <span class="kbd">Shift</span> + <span class="kbd">Up/Down</span> or <span class="kbd">PageUp</span>/<span class="kbd">PageDown</span> to increment or decrement the value by 10.
*   Press <span class="kbd">Shift</span> + <span class="kbd">PageUp</span>/<span class="kbd">PageDown</span> to increment or decrement the value by 100.

#### Add a new property declaration

Click an empty space within an editable CSS rule to create a new style. Edit mode now applies to the CSS property field, you can now enter a new property.

To add a new property and view code hints in the CSS property field, follow these steps:

*   Begin typing into the CSS property field. Suggestions display in a drop down box.
*   Press <span class="kbd">Up</span> **or <span class="kbd">Down</span> arrows** to focus on a suggestion.
*   Accept a suggestion using <span class="kbd">Tab</span>, Right arrow or <span class="kbd">Enter</span>.

After you have selected a valid CSS property, bring up suggestions for applicable CSS values by moving focus to the CSS property value field. For example, the property `display` suggests values such as `block, flex, none,` and others.

Paste CSS into the Styles pane using <span class="kbd">Ctrl</span> + <span class="kbd">V</span> (or <span class="kbd">Cmd</span> + <span class="kbd">V</span> on Mac). Properties and their values are parsed and entered into the correct fields.

#### Add a style rule

You may find it preferable to add styles along with a **new selector**. Click **New Style Rule** ![plus](../images/plus.png)within the styles pane header bar to generate a new CSS rule.

### Live-edit the DOM

** Todo: figure out what to do with this: 

The HTML markup served on an initial page load is not necessarily what you'll see in the Document Object Model ([DOM](http://docs.webplatform.org/wiki/dom)) tree:

* You can modify the DOM tree using JavaScript.
* The browser engine can try to correct invalid author markup and produce an unexpected DOM tree.

** End Todo **

The Elements panel lets you modify the DOM:

*   Edit a DOM node as HTML.
*   Add and remove individual DOM nodes.
*   Edit attribute names and values.
*   Move DOM elements

Updating the in-memory DOM tree **doesn't** modify the source files. Reloading the page erases any DOM tree modifications.

### Editing DOM nodes

For DOM nodes, double click the opening **Element tag** (`h2, section, img`). The field is now editable and can be renamed, the closing tag is automatically updated after renaming.

![](dom-and-styles-files/images/editable-dom-node.png)

### Editing attributes

For DOM attributes, DevTools differentiates between the attribute name and value, click on either of these respective portions to make them editable.

*   Double click the attribute name ![](dom-and-styles-files/images/edit-node-attribute.png)to edit it independently of the attribute value.
*   Double click the attribute value ![](dom-and-styles-files/images/edit-node-attribute-value.png)to edit this portion independently of the attribute name.

When edit mode is active,cycle through attribute values by pressing **Tab.** Once you reach the last attribute value, pressing tab again creates a new attribute field.

Using **Tab** is not the only way to add and edit attributes, since it's a common pattern, there are dedicated items for it in the DOM node context menu titled **Add Attribute** and **Edit Attribute**.

![](dom-and-styles-files/images/context-menu-add-edit-attribute.png)

*   Select **Add Attribute** to create a new field at the end of the opening tag.
*   Select **Edit Attribute** to modify an existing attribute. This action is context-sensitive, the portion you **Right-click** on determines the editable portion of the node.

### Editing DOM nodes as HTML

To edit a DOM node and its children as HTML:

*   Right-click on the node and choose **Edit as HTML** (On Windows, press <span class="kbd">F2</span> to toggle editing mode on the currently selected node).

Use the editable field to make your changes.

*   Click outside the editable field to update the DOM.

Press <span class="kbd">Esc</span> to stop editing without modifying the DOM.

<div class="collapsible">
## Moving elements

You can rearrange the DOM tree in the Elements panel to test out different arrangements for the page.

Drag a node within the Elements panel to move it to a new position in the DOM tree.

</div>

<div class="collapsible">
## Deleting elements

Remove DOM nodes by using any of the following techniques:

*   Right-click on the node and select **Delete Node.**
*   Select the node and press **Delete**.

You can also remove an element by deleting its tag when using **Edit as HTML**.

If you delete a node by accident, use <span class="kbd">Ctrl</span> + <span class="kbd">Z</span> (or <span class="kbd">Cmd</span> + <span class="kbd">Z</span> on Mac) to undo your last action.

</div>

<div class="collapsible">
## Scrolling into view

When you hover over or select a DOM node, the rendered element is highlighted in the main browser window. If the element is scrolled offscreen, a tooltip is displayed at the edge of the browser window indicating that the selected element is offscreen.

To scroll the page so the element appears in the viewport, **Right-click** the element and select **Scroll into View**.

![](dom-and-styles-files/images/scroll-into-view-tooltip.png)

</div>

{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
