---
rss: false
layout: tools-article
title: "Edit Styles"
seotitle: "Edit Styles in the Chrome DevTools Styles pane."
description: "CSS defines the presentation layer of your page. View and modify any CSS declaration that affects an element on the current page using the Chrome DevTools Styles pane."
introduction: "CSS defines the presentation layer of your page. View and modify any CSS declaration that affects an element on the current page using the Chrome DevTools Styles pane."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 2
authors:
  - megginkearney
priority: 0
collection: inspect-styles
key-takeaways:
  edit-styles:
    - The styles pane lets you change your CSS in as many ways as possible, locally, including editing existing styles, adding new styles, adding rules for styles.
    - If you want styles to persist (so they don't go away on a reload), you need to persist them to your development workspace.
remember:
  navigation:
    - Use the shortcut <kbd class="kbd">Ctrl</kbd> + <strong>Click</strong>(or <kbd class="kbd">Cmd</kbd> + <strong>Click</strong> on Mac) on CSS properties or property values from the styles pane to navigate to their position in the source code within the Sources panel.
  enable-style:
    - To enable or disable a style declaration, check or uncheck the checkbox next to it.
  new-rule:
    - When you create a new rule, the new rule doesn't belong to an existing stylesheet. DevTools adds it to a special inspector stylesheet. The inspector stylesheet can be edited in the Sources panel, like other files.
  setup-preprocessor:
    - This section assumes that you've got source maps working already. <a href="/web/tools/setup/workspace/setup-preprocessors">Read here how setup your preprocessor</a>.
---
{% wrap content %}

If you haven't already, familiarize yourself on the [basics of inspecting and tweaking your pages](/web/tools/iterate/inspect-styles/basics). This guide dives deeper into editing and creating styles, including working with css preprocessor source files.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.edit-styles %}

You can add or edit styles within the **Styles pane** in the Elements panel in the following ways:

* Edit an existing property name or value.
* Add a new property declaration.
* Add a new CSS rule.

## Edit an existing property name or value

Click on a CSS property name or property value to edit; press Tab or Enter to change the name or value (see also [How to live-edit a style](/web/tools/iterate/inspect-styles/basics?hl=en#how-to-live-edit-a-style)).

When editing a numeric CSS property value, increment and decrement numeric CSS property values using the following shortcuts:

* Press <kbd class="kbd">Up</kbd> or <kbd class="kbd">Down</kbd> to increment or decrement the value by 1 (or by .1 if the current value is between -1 and 1).
* Press <kbd class="kbd">Alt</kbd> + <kbd class="kbd">Up</kbd> or <kbd class="kbd">Alt</kbd> + <kbd class="kbd">Down</kbd> to increment or decrement the value by 0.1.
* Press <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Up/Down</kbd> or <kbd class="kbd">PageUp</kbd>/<kbd class="kbd">PageDown</kbd> to increment or decrement the value by 10.
* Press <kbd class="kbd">Shift</kbd> + <kbd class="kbd">PageUp</kbd>/<kbd class="kbd">PageDown</kbd> to increment or decrement the value by 100.

## Add a new property declaration

Click an empty space within an editable CSS rule to create a new style. Edit mode now applies to the CSS property field, where you can enter a new property.

To add a new property and view code hints in the CSS property field, follow these steps:

1. Begin typing into the CSS property field. Suggestions display in a drop down box.
2. Press <kbd class="kbd">Up</kbd> or <kbd class="kbd">Down</kbd> arrows to focus on a suggestion.
3. Accept a suggestion using <kbd class="kbd">Tab</kbd>, Right arrow or <kbd class="kbd">Enter</kbd>.

After you select a valid CSS property, bring up suggestions for applicable CSS values by moving focus to the CSS property value field. For example, the property `display` suggests values such as `block, flex, none,` and others.

Paste CSS into the Styles pane using <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">V</kbd> (or <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">V</kbd> on Mac). Properties and their values are parsed and entered into the correct fields.

{% include modules/remember.liquid title="Remember" list=page.remember.enable-style %}

## Add a style rule

You may find it preferable to add styles along with a **new selector**.
Click **New Style Rule** within the styles pane header bar to generate a new CSS rule.

{% animation animations/new-style-rule.mp4 %}

{% include modules/remember.liquid title="Note" list=page.remember.new-rule %}

## Add dynamic styles to page elements

You can provide dynamic styling for your UI elements using pseudo-class selectors such as `:hover`. However, these dynamic states can be hard to debug, so DevTools lets you manually set pseudo-classes on individual elements.

{% animation animations/pseudo-triggers.mp4 %}

Trigger any combination of the following four pseudo-classes:

<table class="table-2">
  <thead>
    <tr>
      <th>Pseudo-class</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Value"><code>:active</code></td>
      <td data-th="Description">Applies to a link in the process of activation (for example, upon click).</td>
    </tr>
    <tr>
      <td data-th="Value"><code>:hover</code></td>
      <td data-th="Description">Applies to an element while a mouse cursor is over it.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>:focus</code></td>
      <td data-th="Description">Applies to an element which gains focus (for example, through pressing Tab).</td>
    </tr>
    <tr>
      <td data-th="Value"><code>:visited</code></td>
      <td data-th="Description">Applies to a link previously visited in the browser.</td>
    </tr>
  </tbody>
</table>

To set an element's state:

1. Click **Toggle Element State**![attributes](imgs/attributes-icon.png){:.inline} next to **New Style Rule** ![plus](imgs/plus.png){:.inline} within the styles pane header.
2. Right-click a DOM node in the Elements panel and select **Force Element State**.

## Edit Sass, Less or Stylus

{% include modules/remember.liquid title="Note" list=page.remember.setup-preprocessor %}

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

### Requirements & Gotchas

- **Changes made in an external editor** are not detected by DevTools until the Sources tab containing the associated source file regains focus.
- **Manual editing of a CSS file** generated by the Sass/LESS/other compiler will break the source map association until the page is reloaded.
- **Using <a href="/web/tools/setup/workspace/setup-workflow">Workspaces</a>?** Make sure the generated CSS file is also mapped into the workspace. You can verify this by looking in Sources panel right-side tree, and seeing the CSS is served from your local folder.
- **For DevTools to automatically reload styles** when you change the source file, your preprocessor must be set up to regenerate CSS files whenever a source file changes. Otherwise, you must regenerate CSS files manually and reload the page to see your changes.
- **You must be accessing your site or app from a web server** (not a **file://** URL), and the server must serve the CSS files as well as the source maps (.css.map) and source files (.scss, etc.).
- If you are _not_ using the Workspaces feature, the web server must also supply the `Last-Modified` header.

Learn how to setup source maps in [Setup CSS & JS Preprocessors](/web/tools/setup/workspace/setup-preprocessors).

{% include modules/nextarticle.liquid %}

{% endwrap %}
