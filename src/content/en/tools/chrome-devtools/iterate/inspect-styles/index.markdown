---
layout: shared/narrow-pages-list
title: "Inspect and Edit Pages and Styles"
description: "Inspect and edit the HTML and CSS of your pages."
published_on: 2015-04-14
updated_on: 2016-01-29
order: 1
authors:
  - megginkearney
  - kaycebasques
translation_priority: 0
key-takeaways:
  dom-styles:
    - "Inspect and edit on the fly any element in the DOM tree in the 
      Elements panel."
    - "View and change the CSS rules applied to any selected element in 
      the Styles pane."
    - "View and edit a selected element's box model in the Computed pane."
    - "View any changes made to your page locally in the Sources panel."
related-guides:
  edit-styles:
    -
      title: "Edit Styles"
      href: tools/chrome-devtools/iterate/inspect-styles/edit-styles
  edit-dom:
    -
      title: "Edit the DOM"
      href: tools/chrome-devtools/iterate/inspect-styles/edit-dom
---

<p class="intro">Inspect and live-edit the HTML and CSS of a page using 
the Chrome DevTools Elements panel.</p>

![Chrome DevTools Elements panel](/web/tools/chrome-devtools/iterate/inspect-styles/imgs/elements-panel.png)

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.dom-styles %}

## Inspect an element {#inspect-an-element}

Use the **Elements panel** to inspect all elements in your page in one 
DOM tree. Select any element and inspect the styles applied to it.

{% animation animations/inspect-element.mp4 %}

There are several ways to inspect an element:

Right-click any element on the page and select **Inspect**.

![Inspect an element via right-click](/web/tools/chrome-devtools/iterate/inspect-styles/imgs/right-click-inspect.png)

Press <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd>
+ <kbd class="kbd">C</kbd> (Windows) or <kbd class="kbd">Cmd</kbd>
+ <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd> (Mac) to open 
DevTools in Inspect Element mode, then click on an element.

Click the **Inspect Element** button
![Inspect icon](/web/tools/chrome-devtools/iterate/inspect-styles/imgs/inspect-icon.png){:.inline} 
to go into Inspect Element Mode, then click on an element.

Use the [`inspect`][inspect] method in the console, such as 
`inspect(document.body)`. 

### Inspect styles applied to an element

The Styles pane shows the CSS rules that apply to the selected element, from 
highest priority to lowest.

![styles pane](/web/tools/chrome-devtools/iterate/inspect-styles/imgs/styles-pane.png)

At the top are element styles applied directly to the element 
(`element.style`) using the style property (or applied in DevTools).

Below that are any CSS rules that match the element. For example, in
the screenshot above the selected element receives `font-weight:400` from
a rule defined in `tools.css`.

Below that are inherited styles, which include any inheritable style 
rules that match the selected element's ancestors. For example, in the
screenshot above the selected element inherits `display:block` from 
`user agent stylesheet`.

The labels on the image below correspond with the numbered items below.

![Annotated Styles pane](/web/tools/chrome-devtools/iterate/inspect-styles/imgs/styles-annotated.png)

1. Styles associated with a selector that matches the element.
2. [User agent stylesheets](http://meiert.com/en/blog/20070922/user-agent-style-sheets/) 
   are clearly labelled, and are often overridden by the CSS on your web page.
3. Rules that have been overridden by **cascading rules** are shown with 
   strikethrough text.
4. **Inherited** styles are displayed as a group under the "Inherited 
   from `<NODE>`" header. Click the DOM node in the header to navigate to 
   its position in the DOM tree view. (The [CSS 2.1 properties 
   table](http://www.w3.org/TR/CSS21/propidx.html) shows which properties 
   are inheritable.)
5. Grey colored entries are rules that are not defined but instead 
   **computed at runtime**.

Understanding how cascading and inheritance works is essential to 
debugging your styles. The cascade relates to how CSS declarations are 
given weights to determine which rules should take precedence when they 
overlap with another rule. Inheritance relates to how HTML elements inherit 
CSS properties from their containing elements (ancestors). For more, 
see [W3C documentation on cascading](http://www.w3.org/TR/CSS2/cascade.html).

## Live-edit a DOM node

{% include shared/related_guides.liquid inline=true list=page.related-guides.edit-dom %}

To live-edit a DOM node, simply double-click a 
[selected element](#inspect-an-element) and make changes:

{% animation animations/edit-element-name.mp4 %}

The DOM tree view shows the current state of the tree; it may not match 
the HTML that was originally loaded for different reasons. For example, 
you can modify the DOM tree using JavaScript; the browser engine can try 
to correct invalid author markup and produce an unexpected DOM.

## Live-edit a style

{% include shared/related_guides.liquid inline=true list=page.related-guides.edit-styles %}

Live-edit style property names and values in the **Styles** pane. All
styles are editable, except the ones that are greyed out (as is the case
with user agent stylesheets).

To edit a name or value, click on it, make your changes, and press
<kbd class="kbd">Tab</kbd> or <kbd class="kbd">Enter</kbd> to save the change.

![edit property name](/web/tools/chrome-devtools/iterate/inspect-styles/imgs/edit-property-name.png)

By default, your CSS modifications are not permanent, changes are lost 
when you reload the page. Set up [persistent 
authoring](/web/tools/setup/setup-workflow) if you want to persist your 
changes between page loads. 

## Examine and edit box model parameters

Examine and edit the current element's box model parameters using the 
**Computed pane**. All values in the box model are editable, just click 
on them.

![Computed pane](/web/tools/chrome-devtools/iterate/inspect-styles/imgs/computed-pane.png)

The concentric rectangles contain the **top**, **bottom**, **left**, **right**
values for the current element's **padding**, **border**, and **margin**
properties. 

For non-statically positioned elements, a **position** rectangle 
is also displayed, containing the values of the **top**, 
**right**, **bottom**, and **left** properties.

![non-static computed element](/web/tools/chrome-devtools/iterate/inspect-styles/imgs/computed-non-static.png)

For `position: fixed` and `position: absolute` elements, the central 
field contains the actual **offsetWidth × offsetHeight** pixel dimensions 
of the selected element. All values can be modified by double-clicking 
them, like property values in the Styles pane. The changes are not, however, 
guaranteed to take effect, as this is subject to the concrete element 
positioning specifics.

![fixed computed element](/web/tools/chrome-devtools/iterate/inspect-styles/imgs/computed-fixed.png)

## View local changes

{% animation animations/revisions.mp4 %}

To view a history of live-edits made to your page:

1. In the **Styles** pane, click on the file that you modified. DevTools
   takes you to the **Sources** panel.
1. Right-click on the file. 
1. Select **Local modifications**.

To explore the changes made:

* Expand top-level file names to view the time 
  ![time modification occurred](/web/tools/chrome-devtools/iterate/inspect-styles/imgs/image_25.png){:.inline} 
  a modification occurred.
* Expand second-level items to view a 
  [diff](https://en.wikipedia.org/wiki/Diff) (before and after) 
  corresponding to the modification. A line with a pink background signifies 
  a removal while a line with a green background signifies an addition.

## Undo changes

If you haven't [set up persistent authoring](/web/tools/setup/setup-workflow), 
any time you reload the page, all live-edits are lost.

Assuming you've set up persistent authoring, to undo changes:

* Use <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Z</kbd> (Windows) or 
  <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Z</kbd> (Mac) to quickly 
  undo minor changes to the DOM or styles via the Elements panel.

* To undo all local modifications made to a file, open the **Sources** 
  panel and select **revert** next to the filename.

[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect
