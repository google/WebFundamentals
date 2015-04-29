---
layout: article
title: "Inspect and Tweak Your Pages: the Basics"
seotitle: "Inspect and Tweak Your Pages in the Chrome DevTools Elements Panel"
description: "Inspect and live-edit the HTML & CSS of a web page using the Chrome DevTools Elements panel."
introduction: "Inspect and live-edit the HTML & CSS of a web page using the Chrome DevTools Elements panel."
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
    - The Sources panel lets you see the changes you've made to your page locally.
    - This doc covers only the very basics of inspecting and tweaking your pages. See the related guides to learn all there is to know about editing your pages.
remember:
  cascade-inheritance:
    - Understanding how cascading and inheritance works is essential to debugging your styles. The cascade relates to how CSS declarations are given weights to determine which rules should take precedence when they overlap with another rule. Inheritance relates to how HTML elements inherit CSS properties from their containing elements (ancestors). For more, see <a href="http://www.w3.org/TR/CSS2/cascade.html">W3C documentation on cascading</a>.
---
{% wrap content %}

Having a real-time representation of the page can be a powerful tool when debugging and authoring web pages. The Chrome DevTools Elements panel lets you view structured information about the current page and make live-edits. 

The Styles pane within the Elements panel shows the CSS rules applied to the individual elements in the page structure. For example, here’s a heading element selected in the Elements panel showing the styles applied to that element in the Styles pane:

![Viewing a heading element in the DOM](imgs/elements-panel.png)

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.dom-styles %}

## How to inspect a page

Use the **Elements panel** to inspect all elements in your page in one DOM tree. Select any element and inspect the styles applied to it.

![Inspect element animation](animations/inspect-element.png)

### Inspect an element

There are several ways to inspect an element:

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

{% include modules/remember.liquid title="Note" list=page.remember.cascade-inheritance %}

## How to live-edit a DOM node

To live-edit a DOM node, simply double-click on a [selected element](#inspect-an-element) and make changes:

![Editable DOM node](animations/edit-element-name.png)

{% include modules/related_guides.liquid inline=true list=page.related-guides.edit-dom %}

## How to live-edit a style

Live-edit styles within the **Styles pane** in the Elements panel. Unless the area containing the styling information is greyed out (as is the case with user agent stylesheets), all styles are editable.

To edit a property name, click on it, edit, and press Tab or Enter:

![Edit property name](imgs/image_20.png)

To edit the property's value, click on that value, edit, and press Tab or Enter:

![Edit property value](imgs/image_21.png)

By default, your CSS modifications are not permanent, changes are lost when you reload the page.
We recommend [setting up persistent authoring](tools/setup/workspace/setup-workflow) so your changes aren't lost.

{% include modules/related_guides.liquid inline=true list=page.related-guides.edit-styles %}

## View local changes

To view a history of live-edits made to your page:

* Open the **Sources** panel.
* Right-click (or **Ctrl + Click** on Mac) on a source file in the sidebar.
* Select **Local modifications**.

![How to get to local modifications](animations/revisions.png)

To explore the changes made:

* Expand top-level file names to view the time ![time modification occurred](imgs/image_25.png)a modification occurred.
* Expand second-level items to view a [diff](http://en.wikipedia.org/wiki/Diff) (before and after) corresponding to the modification. A line with a pink background signifies a removal while a line with a green background signifies an addition.

![View diffs based on local edits](animations/revision-apply-original.png)

## Undo changes

As mentioned earlier in this guide, if you haven't set up persistent authoring, any time you reload the page, all live-edits are lost. So [set up persistent authoring](tools/setup/workspace/setup-workflow).

Assuming you've set up persistent authoring, to undo changes:

* Use **Ctrl + Z** (or **Ctrl + Z** on Mac) to quickly undo minor changes to the DOM or styles via the Elements panel.

* To undo all local modifications made to a file, open the **Sources** panel and select **revert** next to the filename.

{% include modules/nextarticle.liquid %}

{% endwrap %}
