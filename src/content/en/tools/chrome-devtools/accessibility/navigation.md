project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: A guide on navigating Chrome DevTools using assistive technology like screen readers.

{# wf_updated_on: 2019-03-08 #}
{# wf_published_on: 2019-03-08 #}
{# wf_blink_components: Platform>DevTools #}

# Navigating Chrome DevTools with assistive technology

{% include "web/_shared/contributors/robdodson.html" %}

This guide helps users who primarily rely on assistive technology,
such as screen readers, access and use [Chrome DevTools](/web/tools/chrome-devtools/).
Chrome DevTools is a suite of web developer tools built into the Google Chrome browser.

Before starting, it helps to have a mental model of how the DevTools interface
is structured. The DevTools are divided into a series of **panels** which are
organized into an [ARIA `tablist`](https://www.w3.org/TR/wai-aria-1.1/#tablist).
For example:

- The **Elements** panel lets you view and change
  [DOM nodes](/web/tools/chrome-devtools/dom/) or [CSS](/web/tools/chrome-devtools/css/).
- The [**Console** panel](/web/tools/chrome-devtools/console/) lets you read JavaScript
  logs and live edit objects.

Within the content area of each panel, there are a number of different
tools, often referred to as **tabs** or **panes** in the documentation.
For instance, the **Elements** panel contains additional tabs to inspect 
event listeners, the accessibility tree, and much more.

The accessibility of DevTools is a work-in-progress. Some panels and tabs
work better with assistive technology than others. This guide
walks you through the panels which are the most accessible and highlights
specific issues you may encounter along the way.

## Keyboard shortcuts {: #shortcuts }

The [DevTools Keyboard Shortcuts
reference](/web/tools/chrome-devtools/shortcuts) is a helpful cheat-sheet. Be
sure to bookmark it and refer back to it as you explore the different panels.

## Open DevTools {: #open }

To get started, read through the guide to [Open Chrome
DevTools](/web/tools/chrome-devtools/open). There are a number of ways to open
the DevTools, either through keyboard shortcut or menu item.

Once DevTools is open it will likely put focus inside of one of its panels. The
remainder of this guide will help you get your bearings.

## Navigating between panels {: #panelnav }

### Navigating by keyboard {: #keynav }

With the DevTools open, press <kbd>Control</kbd>+<kbd>]</kbd> or
<kbd>Command</kbd>+<kbd>]</kbd> (Mac) to focus the next panel. Press
<kbd>Control</kbd>+<kbd>[</kbd> or <kbd>Command</kbd>+<kbd>[</kbd> (Mac)
to focus the previous panel.

It is also possible to use <kbd>Shift</kbd>+<kbd>Tab</kbd> to move focus into the panels'
`tablist` and use the arrow keys to change panels, though it may be faster to use the
previously mentioned shortcuts.

#### Known issues {: #keynavissues }

- Some panels, such as the **Console** and **Performance** panels, may move focus into
  their content area as soon as they are activated. This can make navigating by
  arrow keys difficult.

- The selected panel's name will be announced, but only after it has read the
  focused content in the panel. This can make it very easy to miss.

### Navigating by Command Menu {: #commandmenunav }

To focus a specific panel use the [Command Menu](/web/tools/chrome-devtools/ui#command-menu).
With DevTools open, press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.

The Command Menu is a fuzzy search autocomplete combobox. Type the name of the
panel you'd like to open, then use the <kbd>Down Arrow</kbd> key to navigate to the
correct option or press <kbd>Enter</kbd>.

For example, to open the Elements panel, first open the Command Menu, then type
the letters <kbd>E</kbd>, <kbd>L</kbd>. The **Panel > Show Elements** option will be selected.
Press <kbd>Enter</kbd> to open the panel.

Opening a panel this way will direct focus to the contents of the panel itself.
In the case of the Elements panel, focus will move into the **DOM Tree**.

## Elements panel {: #elements }

### Inspecting an element on the page {: #inspect }

To inspect an element on the page, navigate to it using the screen reader's
cursor and simulate a right-mouse click to open the context menu. Choose the
**Inspect** option. This will open the DevTools [**Elements**
panel](/web/tools/chrome-devtools/dom/) and focus
the element in the **DOM Tree**.

The **DOM Tree** is laid out as an [ARIA `tree`](https://www.w3.org/TR/wai-aria-1.1/#tree).
See [Navigate the DOM Tree with a keyboard](/web/tools/chrome-devtools/dom/#keynav)
for an example.

### Copying the code for an element in the DOM Tree {: #outerhtml }

With focus on a node in the **DOM Tree**, bring up the right-click context menu,
expand the **Copy** option and select **Copy outerHTML**.

#### Known issues {: #outerhtmlissues }

- Often this will not select the current node but will instead select its parent
  node. However, the contents of the element should still be in the copied
  outerHTML.

### Modifying the attributes of an element in the DOM Tree {: #attributes }

With focus on a node in the **DOM Tree**, press <kbd>Enter</kbd> to make it editable. Press
<kbd>Tab</kbd> to move between attribute values. When you hear "space" you are inside of
an empty text input and can type a new attribute value. Press <kbd>Control</kbd>+<kbd>Enter</kbd> or
<kbd>Command</kbd>+<kbd>Enter</kbd> (Mac) to accept the change and hear the entire contents of the element.

#### Known issues {: #attributesissues }

- When you type into the text input you get no feedback. If you make a typo and
  use the arrow keys to explore your input you also get no feedback. The easiest
  way to check your work is to accept the change, then listen for the entire
  element to be announced.

### Editing the HTML of an element in the DOM Tree {: #nodetype }

With focus on a node in the **DOM Tree**, press <kbd>Enter</kbd> to make it editable. Press
<kbd>Tab</kbd> to move between attribute values. When you hear the element's name, for
instance, "h2", you are inside of a text input and may change the element's
type. For example, typing `h3` and pressing <kbd>Control</kbd>+<kbd>Enter</kbd> or 
<kbd>Command</kbd>+<kbd>Enter</kbd> (Mac) will change the element's start and end tags to be `h3`.

## Elements panel tabs {: #elementstabs }

The Elements panel contains additional tabs for inspecting things like the CSS
applied to an element or its place in the accessibility tree.

With focus on a node in the **DOM Tree**, press <kbd>Tab</kbd> until you hear that
the **Styles** tab is selected. Use the <kbd>Right Arrow</kbd> to explore other available
tabs.

Note: The **DOM Tree** will turn elements with `href` attributes into
focusable links, so you may need to press <kbd>Tab</kbd> more than once to reach the
Styles tab.

<aside class="caution">
  <strong>Caution!</strong> Currently the DOM Breakpoints and Properties tabs are not keyboard
  accessible.
</aside>

### Styles tab {: #styles }

With focus on the [**Styles** tab](/web/tools/chrome-devtools/css/reference),
press <kbd>Tab</kbd> to move focus inside and explore its contents.

Within the Styles tab there are controls for filtering styles, toggling element
states (such as active and focus), toggling classes, and adding new classes.
There is also a powerful style inspection tool to explore and modify styles
currently applied to an element.

#### Navigating the style inspector {: #stylesnav }

Because all of the style tools connect in one way or another back to the style
inspector, it makes sense to master this tool first.

With focus inside of the **Styles** tab, press <kbd>Tab</kbd> until the first style
becomes active. If you're using a screen reader this first style will be
announced as "element.style {}".

Press <kbd>Down Arrow</kbd> to navigate the list of styles in order of specificity. A
screen reader will announce each style starting with the name of the CSS file,
the line number that the style appears on, and the style name itself. For
example: `main.css:233 .card__img {}`.

Press <kbd>Enter</kbd> to inspect a style in more detail. Focus will begin on an editable
version of the style name. Press <kbd>Tab</kbd> to move between editable versions of each
CSS property and their corresponding values. At the end of each style block is a
blank editable text field which you may use to add additional CSS properties.

You may continue to press <kbd>Tab</kbd> to move through the list of styles, or press
<kbd>Escape</kbd> to exit this mode and go back to navigating by arrow keys.

Note: Be sure to read through [the styles tab keyboard
reference](/web/tools/chrome-devtools/shortcuts#styles) for additional Style tab
shortcuts.

##### Known Issues {: #stylesnavissues }

- If you use the **filter** editable text field you will no longer be able to
  navigate the list of styles.

#### Toggle element state {: #togglestate }

To toggle an element's state, such as its active or focused state, navigate to
the Style tab and press <kbd>Tab</kbd> until the **Toggle Element State** button has
focus. Press <kbd>Enter</kbd> to expand the collection of element states.

The element states are presented as a group of checkboxes. Press <kbd>Tab</kbd> until the
first state, `:active`, has focus. Then press <kbd>Space</kbd> to enable it. If the
currently selected element in the **DOM Tree** has an `:active` style, it will now
be applied. Continue pressing <kbd>Tab</kbd> to explore all of the available states.

#### Add an exiting class {: #addclass }

Adjacent to the Toggle Element State button is the **Element Classes** button.
Move focus to it by pressing <kbd>Tab</kbd> and press <kbd>Enter</kbd>. Focus will move into an
edit text field labeled "Add new class".

The Element Classes button is primarily used for adding existing classes to an
element. For example, if your stylesheet contained a helper class named
`.clearfix` you could press `.` inside of the edit text field to see a
suggestion list of classes and use the <kbd>Down Arrow</kbd> to find the `.clearfix`
suggestion. Or type the class name out yourself and press <kbd>Enter</kbd> to apply it.

#### Add a new style rule {: #addrule }

Adjacent to the Element Classes button is the **New Style Rule** button. Move
focus to it by pressing <kbd>Tab</kbd> and press <kbd>Enter</kbd>. Focus will move into an
editable text field inside of the style inspector. The initial text content of
the field will be the tag name of the element that is selected in the **DOM Tree**.
You may type any class name you want into this field and then press tab to
assign CSS properties to it.

### Computed tab {: #computed }

With focus on the [**Computed**
tab](/web/tools/chrome-devtools/css/reference#computed), press <kbd>Tab</kbd> to move
focus inside and explore its contents.

Within the Computed tab there are controls for exploring which CSS properties
are actually applied to an element in order of specificity.

#### Explore all computed styles {: #explorecomputed }

Press <kbd>Tab</kbd> until you reach the collection of computed styles. These are
presented as an ARIA `tree`. Expanding a listbox will reveal which CSS selectors
are applying the computed style. These selectors are organized by specificity.

A screen reader will announce the computed value, which CSS selector is
currently matching, the filename of the stylesheet that contains the selector,
and the line number for the selector.

#### Known issues {: #explorecomputedissues }

- If you use the filter box you can no longer inspect styles.

### Event listeners tab {: #listeners }

From within the **Elements** panel you may inspect the event listeners applied
to an element using the **Event Listeners** tab. // TODO: Is this tab
documented?

With focus on the Styles tab, press the <kbd>Right Arrow</kbd> to navigate to the Event
Listeners tab.

#### Explore event listeners {: #explorelisteners }

Event listeners are presented as an ARIA `tree`. You may use the arrow keys to
navigate them. A screen reader will announce the name of the DOM object that the
event listener is attached to, as well as the file name where the event listener
is defined and its line number.

### Accessibility tab {: #accessibility }

With focus on the [**Accessibility**
tab](/web/tools/chrome-devtools/css/reference#computed), press <kbd>Tab</kbd> to move
focus inside and explore its contents.

Within the Accessibility tab there are controls for exploring the accessibility
tree, the ARIA attributes applied to an element, and its computed accessibility
properties.

#### Accessibility tree {: #accessibilitytree }

The accessibility tree is presented as an ARIA `tree` where each `treeitem`
corresponds to an element in the DOM.

The accessibility tree will announce the computed role for the selected node.
Generic elements like `div` and `span` will be announced as "GenericContainer"
in the tree.

Use the arrow keys to traverse the tree and explore parent-child relationships.

#### Known issues {: #accessibilitytreeissues }

- The type of ARIA tree used by the Accessibility panel may not be properly
  exposed in Chrome for macOS screen readers like VoiceOver. Please subscribe to
  [the chromium tracking
  bug](https://bugs.chromium.org/p/chromium/issues/detail?id=868480) for more
  information.
- The ARIA Attributes and Computed Properties sections are marked up as ARIA
  trees, but they do not currently have focus managmenet so they are not
  keyboard operable.

## Audits panel {: #audits }

The **Audits** panel let's you run a series of tests against a site to check
for common issues related to performance, accessibility, SEO, and a number of
other categories.

### Configuring and running an audit {: #configureaudits }

When the Audits panel is first opened, focus will be placed on the **Run Audit**
button at the end of the form.

By default the form will be configured to run audits for every category
using mobile emulation on a simulated 3G connection. Use <kbd>Shift</kbd>+<kbd>Tab</kbd> or navigate
back in Browse mode to change the audit settings.

When you're ready to run the audit, navigate back to the **Run Audit** button and
press <kbd>Enter</kbd>. Focus will move into a modal window with a **Cancel** button which
allows you to exit the audit. You may hear a series of earcons as the audit runs
and refreshes the page multiple times.

#### Known issues {: #configureauditsissues }

- The different sections of the configuration form are not currently marked up
  with a `fieldset` element. It may be easier to navigate them in Browse mode
  to figure out which controls are associated with each section.
- There is no earcon or live region announcement when the audit is finished
  running. Generally it takes about 30 seconds, after which you should be able
  to navigate to the results. Using Browse mode may be the easiest way to reach
  the results.

### Navigating the audit report {: #auditsnav }

The audit report is organized into sections that correspond with each of the
audit categories.

The report opens with a list of scores for each category. These scores are also
links which can be used to skip to the relevant sections.

Within each section are expandable `details` elements, which contain information
relating to passed or failed audits. By default, only failing audits are shown.
Each section ends with a final `details` element which contains all of the
passed audits.

To run a new audit, use <kbd>Shift</kbd>+<kbd>Tab</kbd> to exit the report and look for the `Perform
an audit...` button.