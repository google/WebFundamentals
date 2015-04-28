---
layout: article
title: "Edit Styles"
seotitle: "Edit Styles in the Chrome DevTools Styles pane."
description: "CSS defines the presentation layer of your page. View and modify any CSS declaration which affects an element on the current page using the Chrome DevTools Styles pane."
introduction: "CSS defines the presentation layer of your page. View and modify any CSS declaration which affects an element on the current page using the Chrome DevTools Styles pane."
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
    - TBD.
remember:
  workspace:
    - To make better use of screen real estate, collapse any panes you are not actively using and resize the divider between the DOM tree and the sidebar containing the panes.
  navigation:
    - Use the shortcut <strong>Ctrl + Click</strong>(or <strong>Cmd + Click</strong> on Mac) on CSS properties or property values from the styles pane to navigate to their position in the source code within the Sources panel.
  enable-style:
    - To enable or disable a style declaration, check or uncheck the checkbox next to it.
  new-rule:
    - When you create a new rule, the new rule doesn't belong to an existing stylesheet. DevTools adds it to a special inspector stylesheet. The inspector stylesheet can be edited in the Sources panel, like other files.
---
{% wrap content %}

If you haven't already, familiarize yourself on the [basics of inspecting and tweaking your pages](tools/iterate/inspect-styles/basics). This guide dives deeping into changing the way your pages look and persisting those changes to your development workspace.

## About Cascading Style Sheets (CSS) 

An understanding of the cascade (in Cascading Style Sheets) and inheritance aids a development and debugging workflow:

* The cascade relates to how CSS declarations are given weights to determine which rules should take precedence when they overlap with another rule.
* Inheritance relates to how HTML elements inherit CSS properties from their containing elements (ancestors).

See the [W3C documentation](http://www.w3.org/TR/CSS2/cascade.html) on cascading and inheritance for more information.

{% include modules/takeaway.liquid list=page.key-takeaways.edit-styles %}

## Edit and create styles

You can add or edit styles within the **Styles pane** in the Elements panel in the following ways:

* Edit an existing property name or value.
* Add a new property declaration.
* Add a new CSS rule.

{% include modules/remember.liquid title="Remember" list=page.remember.workspace %}

### Edit an existing property name or value

Click on a CSS property name or property value to edit; press Tab or Enter to change the name or value (see also [How to live-edit a style](tools/iterate/inspect-styles/basics?hl=en#how-to-live-edit-a-style)).

When editing a numeric CSS property value, increment and decrement numeric CSS property values using the following shortcuts:

* Press **Up** or **Down** to increment or decrement the value by 1 (or by .1 if the current value is between -1 and 1).
* Press ** Alt + Up** or **Alt + Down** to increment or decrement the value by 0.1.
* Press **Shift + Up/Down** or **PageUp**/**PageDown** to increment or decrement the value by 10.
* Press **Shift + PageUp**/**PageDown** to increment or decrement the value by 100.

### Add a new property declaration

Click an empty space within an editable CSS rule to create a new style. Edit mode now applies to the CSS property field, you can now enter a new property.

To add a new property and view code hints in the CSS property field, follow these steps:

* Begin typing into the CSS property field. Suggestions display in a drop down box.
* Press **Up** or **Down** arrows to focus on a suggestion.
* Accept a suggestion using **Tab**, Right arrow or **Enter**.

After you selected a valid CSS property, bring up suggestions for applicable CSS values by moving focus to the CSS property value field. For example, the property `display` suggests values such as `block, flex, none,` and others.

Paste CSS into the Styles pane using **Ctrl + V** (or **Cmd + V** on Mac). Properties and their values are parsed and entered into the correct fields.

{% include modules/remember.liquid title="Remember" list=page.remember.enable-style %}

### Add a style rule

You may find it preferable to add styles along with a **new selector**. Click **New Style Rule** ![plus](imgs/plus.png)within the styles pane header bar to generate a new CSS rule.

{% include modules/remember.liquid title="Remember" list=page.remember.new-rule %}

### How to add dynamic styles for page elements

You can provide dynamic styling for your UI elements using pseudo-class selectors such as `:hover`. However, these dynamic states can be hard to debug. So DevTools lets you manually set pseudo-classes on individual elements.

Trigger any combination of the following four pseudo-classes:

* **:active** - Applies to a link in the process of activation (for example, upon click).
* **:hover** - Applies to an element while a mouse cursor is over it.
* **:focus** - Applies to an element which gains focus (for example, through pressing **Tab**).
* **:visited** - Applies to a link previously visited in the browser.

To set an element's state:

* Click **Toggle Element State**![attributes](imgs/attributes-icon.png) next to **New Style Rule** ![plus](imgs/plus.png)within the styles pane header.
* Right-click a DOM node in the Elements panel and select **Force Element State**.

## Edit preprocessor source files

TBD. Simplest version of content in https://developer.chrome.com/devtools/docs/css-preprocessors 

{% include modules/nextarticle.liquid %}

{% endwrap %}
