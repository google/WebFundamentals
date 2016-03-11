---
layout: shared/narrow
title: "Edit Styles"
description: "Use the Styles pane in Chrome DevTools to inspect and modify the
CSS styles associated to an element."
published_on: 2015-04-14
updated_on: 2016-02-26
order: 2
authors:
  - kaycebasques
  - megginkearney
translation_priority: 0
key-takeaways:
  edit-styles:
    - "The styles pane lets you change your CSS in as many ways as possible, locally, including editing existing styles, adding new styles, adding rules for styles."
    - "If you want styles to persist (so they don't go away on a reload), you need to persist them to your development workspace."
notes:
  navigation:
    - "Use the shortcut <kbd class='kbd'>Ctrl</kbd> + <strong>Click</strong>(or <kbd class='kbd'>Cmd</kbd> + <strong>Click</strong> on Mac) on CSS properties or property values from the styles pane to navigate to their position in the source code within the Sources panel."
  enable-style:
    - "To enable or disable a style declaration, check or uncheck the checkbox next to it."
  new-rule:
    - "When you create a new rule, the new rule doesn't belong to an existing stylesheet. DevTools adds it to a special inspector stylesheet. The inspector stylesheet can be edited in the Sources panel, like other files."
  setup-preprocessor:
    - "This section assumes that you've got source maps working already. <a href='/web/tools/setup/setup-preprocessors'>Read here how setup your preprocessor</a>."
---

<p class="intro">Use the <strong>Styles</strong> pane to modify the CSS
styles associated to an element.</p>

![Styles pane](imgs/styles-pane.png)

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.edit-styles %}

## Inspect styles applied to an element

[Select an element](edit-dom#inspect-an-element) to inspect its styles. 
The **Styles** pane shows the CSS rules that apply to the selected element, 
from highest priority to lowest:

* At the top is `element.style`. These are styles either applied directly to 
  the element using the style property (for example, 
  `<p style="color:green">`), or applied in DevTools.

* Below that are any CSS rules that match the element. For example, in
  the screenshot below the selected element receives `line-height:24px` from
  a rule defined in `tools.css`.

* Below that are inherited styles, which include any inheritable style
  rules that match the selected element's ancestors. For example, in the
  screenshot below the selected element inherits `display:list-item` from
  `user agent stylesheet`.

The labels on the image below correspond with the numbered items below it.

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
given weights to determine which rules should take precedence when theyoverlap with another rule. Inheritance relates to how HTML elements inherit
CSS properties from their containing elements (ancestors). For more,
see [W3C documentation on cascading](http://www.w3.org/TR/CSS2/cascade.html).

## Add, enable, and disable CSS classes {#classes}

Click on the **.cls** button to view all of the CSS classes associated to the
currently selected element. From there, you can:

* Enable or disable the classes currently associated to the element.
* Add new classes to the element. 

![classes pane](imgs/classes.png)

## Edit an existing property name or value

Click on a CSS property name or value to edit it. While a name or value is 
highlighted, press <kbd>Tab</kbd> to move forward to the next property, name,
or selector. Hold <kbd>Shift</kbd> and press <kbd>Tab</kbd> to move backwards.

When editing a numeric CSS property value, increment and decrement with the 
following keyboard shortcuts:

* <kbd>Up</kbd> and <kbd>Down</kbd> to increment and decrement the value by 1,
  or by .1 if the current value is between -1 and 1.
* <kbd>Alt</kbd>+<kbd>Up</kbd> and <kbd>Alt</kbd>+<kbd>Down</kbd> to 
  increment and decrement the value by 0.1.
* <kbd>Shift</kbd>+<kbd>Up</kbd> to increment by 10 and 
  <kbd>Shift</kbd>+<kbd>Down</kbd> to decrement by 10.
* <kbd>Shift</kbd>+<kbd>Page Up</kbd> (Windows, Linux) or 
  <kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>Up</kbd> (Mac) to increment the 
  value by 100. <kbd>Shift</kbd>+<kbd>Page Down</kbd> (Windows, Linux) or 
  <kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>Down</kbd> (Mac) to decrement the 
  value by 100. 

## Add a new property declaration

Click an empty space within an editable CSS rule to create a new declaration. 
Type it out, or paste the CSS into the **Styles** pane. Properties and their 
values are parsed and entered into the correct fields.

{% include shared/remember.liquid title="Remember" list=page.notes.enable-style %}

## Add a style rule

Click the **New Style Rule** 
(![new style rule button](imgs/new-style-rule.png){:.inline}) button to add a 
new CSS rule. 

Click and hold the button to choose which stylesheet the rule is added to. 

## Add or remove dynamic styles (pseudo-classes) {#pseudo-classes}

You can manually set dynamic pseudo-class selectors (such as `:active`, 
`:focus`, `:hover`, and `:visited`) on elements. 

There are two ways to set these dynamic states on an element:

* Right-click on an element within the **Elements** panel and then select
  the target pseudo-class from the menu to enable or disable it.
  
  ![right-click on element 
  to enable pseudoclass selector](imgs/pseudoclass-rightclick.png)

* Select an element in the **Elements** panel, click the **:hov** button
  in the **Styles** pane, and use the checkboxes to enable or disable the 
  selectors for the currently selected element.

  ![:hov pane](imgs/hov.png)

## Edit Sass, Less or Stylus

If you are using Sass, Less, Stylus or any other CSS preprocessor, editing the generated CSS output files in the Styles editor won't help as they don't map to your original source.

With CSS source maps, DevTools can automatically map the generated files to the original source files, which lets you live-edit these in the Sources panel and view the results without having to leave DevTools or refresh the page. 

### The preprocessor workflow

When you inspect an element whose styles are provided by a generated CSS file, the Elements panel displays a link to the original source file, not the generated CSS file.

![Elements panel showing .scss stylesheet](imgs/sass-debugging.png)

To jump to the source file:

1. Click the link to open the (editable) source file in the Sources panel.
2. <kbd class="kbd">Ctrl</kbd> + **Click** (or <kbd class="kbd">Cmd</kbd> + **click**) on any CSS property name or value to open the source file and jump to the appropriate line.

![Sources panel showing .scss file](imgs/sass-sources.png)

When you save changes to a CSS preprocessor file in DevTools, the CSS preprocessor should re-generate the CSS files. Then DevTools then reloads the newly-generated CSS file.

### Enable/Disable CSS source maps & auto-reloading

**CSS source maps are enabled by default**. You can choose to enable automatic reloading of generated CSS files. To enable CSS source maps and CSS reload:

1. Open DevTools Settings and click **General**.
2. Turn on **Enable CSS source maps** and **Auto-reload generated CSS**.

### Use the Colorpicker's palettes

The Colorpicker now helps you select and maintain a consistent color palette for your site. Access the palettes by clicking the spinner at the bottom right of the Colorpicker window.

![spinner.png](imgs/spinner.png)

This version of the Colorpicker has three distinct palettes.

####Page colors
This palette is automatically generated from the colors found in your CSS, making it a great option if you're extending an existing site. Use this palette when you are adding or changing colors, to keep your site's color scheme consistent.

####Material Design
The [Material Design](https://www.google.com/design/spec/style/color.html) palette offers a selection of beautiful colors out of the box and is an ideal choice when starting a new project. This palette will expand as Material Design continues to evolve.

####Custom
This palette is your own playground, made up of any colors you choose. The Custom palette is maintained when the palette pane is closed, so if the palette pane is open, click the "Return to color picker" button to close it.

![closepalettesx.png](imgs/closepalettesx.png)

To add a new color, choose one in the main color box, then click the "Add to palette" button next to the lower spinner. 

![addtopalette.png](imgs/addtopalette.png)

You can add as many colors as you like, to keep them handy as you work. You can reorder the custom colors by dragging them, and you can right-click a color to reveal more options, including "Remove color", "Remove all to the right", and "Clear palette".

### Requirements & Gotchas

- **Changes made in an external editor** are not detected by DevTools until the Sources tab containing the associated source file regains focus.
- **Manual editing of a CSS file** generated by the Sass/LESS/other compiler will break the source map association until the page is reloaded.
- **Using <a href="/web/tools/setup/setup-workflow">Workspaces</a>?** Make sure the generated CSS file is also mapped into the workspace. You can verify this by looking in Sources panel right-side tree, and seeing the CSS is served from your local folder.
- **For DevTools to automatically reload styles** when you change the source file, your preprocessor must be set up to regenerate CSS files whenever a source file changes. Otherwise, you must regenerate CSS files manually and reload the page to see your changes.
- **You must be accessing your site or app from a web server** (not a **file://** URL), and the server must serve the CSS files as well as the source maps (.css.map) and source files (.scss, etc.).
- If you are _not_ using the Workspaces feature, the web server must also supply the `Last-Modified` header.

Learn how to setup source maps in [Setup CSS & JS Preprocessors](/web/tools/setup/setup-preprocessors).


