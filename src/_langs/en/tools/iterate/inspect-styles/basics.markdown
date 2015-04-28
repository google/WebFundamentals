---
layout: article
title: "Inspect and Tweak Your Pages: the Basics"
seotitle: "Inspect and Tweak Your Pages in the Chrome DevTools Elements Panel"
description: "Inspect and live-edit the HTML & CSS of a web page using the Chrome DevTools Elements panel. View locals changes in the Sources panel."
introduction: "Inspect and live-edit the HTML & CSS of a web page using the Chrome DevTools Elements panel. View local changes in the Sources panel."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-28
  order: 1
authors:
  - megginkearney
related-guides:
  edit-styles:
    -
      title: Edit Styles
      href: tools/iterate/inspect-styles/edit-styles
      section:
        title: "Edit Styles"
        href: tools/iterate/inspect-styles/edit-styles
  edit-dom:
    -
      title: Edit the DOM
      href: tools/iterate/inspect-styles/edit-dom
      section:
        title: "Edit the DOM"
        href: tools/iterate/inspect-styles/edit-styles
priority: 0
collection: inspect-styles
key-takeaways:
  dom-styles:
    - The Elements panel lets you see everything in one DOM tree, and allows inspection and on-the-fly editing of DOM elements.
    - The Styles pane shows the CSS rules that apply to the selected element, from highest priority to lowest.
    - The Sources panel lets you inspect local changes made to your page.
    - This doc covers only the very basics of inspecting and tweaking your pages. See the related guides to learn all there is to know about editing your pages.
remember:
  new-rule:
    - tbd
---
{% wrap content %}

Having a real-time representation of the page can be a powerful tool when debugging and authoring web pages. The Chrome DevTools Elements panel lets you view structured information about the current page.

The Styles pane within the Elements panel shows the CSS rules applied to the individual elements in the page structure. For example, here's a heading element selected in the Elements panel showing the styles applied to that element in the Styles pane:

![Viewing a heading element in the DOM](imgs/elements-panel.png)

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.dom-styles %}

## How to inspect a page

Use the **Elements panel** to inspect all elements in your page in one DOM tree. Select any element and inspect the styles applied to it.

### Inspect an element

Inspecting an element shows you the DOM nodes for a rendered element in the browser. There are several ways to inspect an element:

* Right-click any element on the page the page and select **Inspect Element**.
* Press **Ctrl + Shift + C** (or **Cmd + Shift + C** on Mac) to open DevTools in Inspect Element mode, then click on an element.
* Click the **Inspect Element button** ![Inspect icon](imgs/inspect-icon.png) at the top of the DevTools window to go into Inspect Element Mode, then click on an element.
* Use the `inspect()` method in the console, such as `inspect(document.body)`. See the [Command Line API Reference](tools/javascript/command-line/command-line-reference) for information on using inspect.

### Inspect styles applied to an element

The Styles pane shows the CSS rules that apply to the selected element, from highest priority to lowest:

* Element styles applied directly to the element using the style property (or applied in DevTools).
* Matched CSS rules include any rules matched by the element. For example, the CSS selector `span` matches an HTML `<span>` element.
* Inherited styles include any inheritable style rules that match the selected element's ancestors.

The labels on the image below correspond with the numbered items below.

![Annotated Styles pane](imgs/styles-annotated.png)

1. Styles associated with a selector that matches the element.
2. **Cascade** rules dictate that if two rules have the same origin, weight, and specificity, the last defined rule takes precedence. In this case, the second color property takes precedence. The first color property is shown in strikethrough text to show that it's been overridden.
3. [User agent stylesheets](http://meiert.com/en/blog/20070922/user-agent-style-sheets/) are clearly labelled, and are often overridden by the CSS on your web page.
4. The **cascade** dictates that author styles have more weight than user agent styles, so the user-defined style of `display: inline-block;` overrides the user-agent defined style of `display: block`.
5. **Inherited** styles are displayed as a group under the "Inherited from [node]" header. Click the DOM node in the header to navigate to its position in the DOM tree view. (The [CSS 2.1 properties table](http://www.w3.org/TR/CSS21/propidx.html) shows which properties are inheritable.)
6. The selector `:root body` has a higher **specificity** than just `body`, therefore its style declarations take precedence.
7. `font-family` on the body is **overridden**. It is also a similar case for the `font-size` property (overridden due to [selector specificity](http://www.w3.org/TR/css3-selectors/#specificity)).

## CSS visibility

Comma separated selectors are colored differently depending on whether or not they match the selected DOM node.

![Selector visibility](imgs/selector-visibility.png)

Greyed out selectors like `audio` and `video` do not apply to the selected node. The rules shown above corresponds to the following CSS source:

`video, audio, div, .message, body *, time {
  /* visibility: hidden */
  margin-top: 10px;
}
`

Since the visibility declaration is commented out, the Styles pane shows it as disabled.

## How to live-edit a DOM node

To live-edit a DOM node, simply double-click on a [selected element](#inspect-an-element) and make changes. For example, double-click on the opening Element tag (`nav`). The field is now editable and can be renamed, the closing tag is automatically updated after renaming.

![Editable DOM node](imgs/editable-dom-node.png)

{% include modules/related_guides.liquid inline=true list=page.related-guides.edit-dom %}

## How to live-edit a style

You can add or edit styles within the **Styles pane** in the Elements panel. Unless the area containing the styling information is greyed out (as is the case with user agent stylesheets), all styles are editable.

To edit a property name, click on it:

![Edit property name](imgs/image_20.png)

To edit the property's value, click on that value, edit it, and press Tab or Enter:

![Edit property value](imgs/image_21.png)

By default, your CSS modifications are not permanent, changes are lost when you reload the page. To customize the behaviour, see [Set Up Persistent Authoring](tools/setup/workspace/setup-workflow).

{% include modules/related_guides.liquid inline=true list=page.related-guides.edit-styles %}

## View local changes

To view a history of live-edits made to your page:

* Open the **Sources** panel.
* Right-click (or **Ctrl + Click** on Mac) on a source file in the sidebar.
* Select **Local modifications**.

** Todo: image showing local modifications made to css. There's currently an animation for this.

To explore the changes made:

* Expand top-level file names to view the time ![time modification occurred](imgs/image_25.png)a modification occurred.
* Expand second-level items to view a [diff](http://en.wikipedia.org/wiki/Diff) (before and after) corresponding to the modification. A line with a pink background signifies a removal while a line with a green background signifies an addition.

** Todo: image showing more local modification stuff. There's currently an animation for this.

To undo all local modifications, select **revert** next to filename.

## Undo changes

Use **Ctrl + Z** (or **Ctrl + Z** on Mac) to quickly undo minor changes to the DOM or styles via the Elements panel.

To undo all local modifications made to a file, open the **Sources** panel and select **revert** next to the filename.

{% include modules/nextarticle.liquid %}

{% endwrap %}
