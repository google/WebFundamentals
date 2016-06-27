---
layout: shared/narrow
title: "Keyboard & UI Shortcuts Reference"
description: "Chrome DevTools has several built-in shortcut keys that developers can use to save time in their day to day workflow. "
published_on: 2015-04-30
updated_on: 2016-01-28
order: 5
authors:
  - megginkearney
  - kaycebasques
translation_priority: 0
key-takeaways:
  shortcuts:
    - "TBD tldr"
notes:
  tbd:
    - "TBD"
---
<p class="intro">Chrome DevTools has several built-in shortcut keys that
can save you time in your daily workflows.</p>

This guide provides a quick reference to each shortcut available in Chrome
DevTools. While some shortcuts are available globally, others are specific
to a single panel, and are broken up based on where it can be used.

You can also find shortcuts in tooltips. Hover over an element to display its
tooltip. If the element has a shortcut, the tooltip will include it.

{% include shared/toc.liquid %}

## Accessing DevTools

To access the DevTools, on any web page or app in Google Chrome:

* Open the **Chrome menu** ![Chrome menu](imgs/chrome-menu.png){:.inline} at the top-right of your browser window, then select **Tools > Developer Tools**.
* Right-click on any page element and select **Inspect Element**.

On the keyboard:

<table class="mdl-data-table">
  <thead>
      <th>Access DevTools</th>
      <th>On Windows</th>
      <th>On Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Launch DevTools">Open Developer Tools</td>
	  <td data-th="Windows"><kbd class="kbd">F12</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">I</kbd></td>
	  <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">I</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Open / switch from inspect element mode and browser window</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Open Developer Tools and bring focus to the console</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">J</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">J</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Inspect the Inspector (undock first one and press)</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">I</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">I</kbd></td>
    </tr>
  </tbody>
</table>

## Global keyboard shortcuts

The following keyboard shortcuts are available in all DevTools panels:

<table class="mdl-data-table">
  <thead>
      <th>Global Shortcut</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Global Shortcuts">Show General Settings dialog</td>
      <td data-th="Windows"><kbd class="kbd">?</kbd>, <kbd class="kbd">F1</kbd></td>
      <td data-th="Mac"><kbd class="kbd">?</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Next panel</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">]</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">]</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Previous panel</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">[</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">[</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Backward in panel History</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">[</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">[</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Forward in panel history</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">]</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">]</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Change docking location</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">D</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">D</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Open Device Mode</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">M</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">M</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Toggle Console / close settings dialog when open</td>
      <td data-th="Windows"><kbd class="kbd">Esc</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Esc</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Refresh the page</td>
      <td data-th="Windows"><kbd class="kbd">F5</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">R</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">R</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Refresh the page ignoring cached content</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F5</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">R</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">R</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Text search within current file or panel</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">F</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Text search across all sources</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">F</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">F</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Search by filename (except on Timeline)</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">P</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">P</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Zoom in (while focused in DevTools)</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">+</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">+</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Zoom out</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">-</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">-</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Restore default text size</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">0</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">0</kbd></td>
    </tr>
  </tbody>
</table>

## Mouse shortcuts by Panel

### Elements

By right-clicking an element you can:

* Force element pseudo states: (`:active`, `:hover`, `:focus`, `:visited`).
* Set breakpoints on the elements: (Subtree modifications, Attribute modification, Node removal).
* Clear console.

#### In the styles sidebar

![Element Pseudostates](imgs/attributes-icon.png)
Emulate an element's pseudo state (`:active`, `:hover`, `:focus`, `:visited`).

![Adding style selectors](imgs/plus.png)
Add new style selectors.

### Sources

![Pause on Exception Button](imgs/pause-gray.png)
Don't pause on exceptions.

![Pause on All Exceptions](imgs/pause-blue.png)
Pause on all exceptions (including those caught within try/catch blocks).

![Pause on Uncaught Exceptions](imgs/pause-purple.png)
Pause on uncaught exceptions (usually the one you want).

### Console

Right-clicking on console:

* XMLHttpRequest logging: Turn on to view the XHR log.
* Preserve log upon navigation.
* Filter: Hide and unhide messages from script files.
* Clear console: Clear all console messages.

## Keyboard shortcuts by panel

### Elements

<table class="mdl-data-table">
  <thead>
      <th>Elements Panel</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Elements Panel">Undo change</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Z</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Z</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Redo change</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Y</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Y</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Z</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Navigate</td>
      <td data-th="Windows"><kbd class="kbd">Up</kbd>, <kbd class="kbd">Down</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Up</kbd>, <kbd class="kbd">Down</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Expand / collapse node</td>
      <td data-th="Windows"><kbd class="kbd">Right</kbd>, <kbd class="kbd">Left</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Right</kbd>, <kbd class="kbd">Left</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Expand node</td>
      <td data-th="Windows"><kbd class="kbd">Single-click on arrow</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Single-click on arrow</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Expand / collapse node and all its children</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">Click on arrow icon</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">Click on arrow icon</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Edit attribute</td>
      <td data-th="Windows"><kbd class="kbd">Enter</kbd>, <kbd class="kbd">Double-click on attribute</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Enter</kbd>, <kbd class="kbd">Double-click on attribute</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Hide element</td>
      <td data-th="Windows"><kbd class="kbd">H</kbd></td>
      <td data-th="Mac"><kbd class="kbd">H</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Toggle edit as HTML</td>
      <td data-th="Windows"><kbd class="kbd">F2</kbd></td>
      <td data-th="Mac"></td>
    </tr>
  </tbody>
</table>

#### Styles sidebar

Shortcuts available in the Styles sidebar:

<table class="mdl-data-table">
  <thead>
      <th>Styles Sidebar</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Styles Sidebar">Edit rule</td>
      <td data-th="Windows"><kbd class="kbd">Single-click</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Single-click</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Insert new property</td>
      <td data-th="Windows"><kbd class="kbd">Single-click on whitespace</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Single-click on whitespace</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Go to line of style rule property declaration in source</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Click on property</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Click on property</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Go to line of property value declaration in source</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Click on property value</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Click on property value</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Cycle through the color definition value</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">Click on color picker box</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">Click on color picker box</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Edit next / previous property</td>
      <td data-th="Windows"><kbd class="kbd">Tab</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Tab</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Tab</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Tab</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Increment / decrement value</td>
      <td data-th="Windows"><kbd class="kbd">Up</kbd>, <kbd class="kbd">Down</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Up</kbd>, <kbd class="kbd">Down</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Increment / decrement value by 10</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">Up</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Down</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">Up</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Down</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Increment / decrement value by 10</td>
      <td data-th="Windows"><kbd class="kbd">PgUp</kbd>, <kbd class="kbd">PgDown</kbd></td>
      <td data-th="Mac"><kbd class="kbd">PgUp</kbd>, <kbd class="kbd">PgDown</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Increment / decrement value by 100</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgUp</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgDown</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgUp</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgDown</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Increment / decrement value by 0.1</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd> + <kbd class="kbd">Up</kbd>, <kbd class="kbd">Alt</kbd> + <kbd class="kbd">Down</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">Up</kbd>, <kbd class="kbd">Opt</kbd> + <kbd class="kbd">Down</kbd></td>
    </tr>
  </tbody>
</table>

### Sources

<table class="mdl-data-table">
  <thead>
      <th>Sources Panel</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Sources Panel">Pause / resume script execution</td>
      <td data-th="Windows"><kbd class="kbd">F8</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">\</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F8</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">\</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Step over next function call</td>
      <td data-th="Windows"><kbd class="kbd">F10</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">'</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F10</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">'</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Step into next function call</td>
      <td data-th="Windows"><kbd class="kbd">F11</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">;</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F11</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">;</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Step out of current function</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">F11</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">;</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">F11</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">;</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Select next call frame</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">.</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">.</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Select previous call frame</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">,</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">,</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Toggle breakpoint condition</td>
      <td data-th="Windows"><kbd class="kbd">Click on line number</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">B</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Click on line number</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">B</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Edit breakpoint condition</td>
      <td data-th="Windows"><kbd class="kbd">Right-click on line number</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Right-click on line number</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Delete individual words</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Delete</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">Delete</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Comment a line or selected text</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">/</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">/</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Save changes to local modifications</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Save all changes</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Go to line</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">G</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">G</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Search by filename</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Jump to line number</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>number</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>number</i></span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Jump to column</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>number</i></span> + <span class="kbd">:<i>number</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>number</i></span> + <span class="kbd">:<i>number</i></span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Go to member</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">O</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Close active tab</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd> + <kbd class="kbd">W</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">W</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Run snippet</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Enter</kbd></td>
    </tr>
  </tbody>
</table>

#### Within the code editor

<table class="mdl-data-table">
  <thead>
      <th>Code Editor</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Code Editor">Go to matching bracket</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">M</kbd></td>
      <td data-th="Mac"><span class="kbd"></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Jump to line number</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>number</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>number</i></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Jump to column</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>number</i></span> + <span class="kbd">:<i>number</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>number</i></span> + <span class="kbd">:<i>number</i></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Toggle comment</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">/</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">/</kbd></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Select next occurrence</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">D</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">D</kbd></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Undo last selection</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">U</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">U</kbd></td>
    </tr>
  </tbody>
</table>

### Timeline

<table class="mdl-data-table">
  <thead>
      <th>Timeline Panel</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Timeline Panel">Start / stop recording</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">E</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">E</kbd></td>
    </tr>
    <tr>
      <td data-th="Timeline Panel">Save timeline data</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Timeline Panel">Load timeline data</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd></td>
    </tr>
  </tbody>
</table>

### Profiles

<table class="mdl-data-table">
  <thead>
      <th>Profiles Panel</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Profiles Panel">Start / stop recording</td>
	  <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">E</kbd></td>
	  <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">E</kbd></td>
    </tr>
  </tbody>
</table>

### Console

<table class="mdl-data-table">
  <thead>
      <th>Console Shortcuts</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Console Shortcuts">Accept suggestion</td>
      <td data-th="Windows"><kbd class="kbd">Right</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Right</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Previous command / line</td>
      <td data-th="Windows"><kbd class="kbd">Up</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Up</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Next command / line</td>
      <td data-th="Windows"><kbd class="kbd">Down</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Down</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Focus the Console</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">`</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">`</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Clear Console</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">L</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">K</kbd>, <kbd class="kbd">Opt</kbd> + <kbd class="kbd">L</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Multi-line entry</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Return</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Execute</td>
      <td data-th="Windows"><kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Return</kbd></td>
    </tr>
  </tbody>
</table>

### Device mode

<table class="mdl-data-table">
  <thead>
      <th>Device Mode Shortcuts</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Emulation Shortcuts">Pinch zoom in and out</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">Scroll</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">Scroll</kbd></td>
    </tr>
  </tbody>
</table>

#### When screencasting

<table class="mdl-data-table">
  <thead>
      <th>Screencasting Shortcuts</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Screencasting Shortcuts">Pinch zoom in and out</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd> + <kbd class="kbd">Scroll</kbd>,<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Click and drag with two fingers</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">Scroll</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Click and drag with two fingers</kbd></td>
    </tr>
    <tr>
      <td data-th="Screencasting Shortcuts">Inspect element tool</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
    </tr>
  </tbody>
</table>

## Bonus: useful Chrome shortcuts

Here are some additional Chrome shortcuts which are useful for general use within the browser not specific to the DevTools. [View all Chrome shortcuts](https://goo.gl/PsTNm) for Windows, Mac, and Linux:

<table class="mdl-data-table">
  <thead>
      <th>More Chrome Shortcuts</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="More Chrome Shortcuts">Find next</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">G</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">G</kbd></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Find previous</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">G</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">G</kbd></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Open a new window in Incognito mode</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">N</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">N</kbd></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Toggle Bookmarks bar on and off</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">B</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">B</kbd></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">View the History page</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">H</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Y</kbd></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">View the Downloads page</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">J</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">J</kbd></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">View the Task Manager</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">ESC</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">ESC</kbd></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Next page in a tabs browsing history</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd> + <kbd class="kbd">Right</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">Right</kbd></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Previous page in a tabs browsing history</td>
      <td data-th="Windows"><kbd class="kbd">Backspace</kbd>, <kbd class="kbd">Alt</kbd> + <kbd class="kbd">Left</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Backspace</kbd>, <kbd class="kbd">Opt</kbd> + <kbd class="kbd">Left</kbd></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Highlight content in the web address area</td>
      <td data-th="Windows"><kbd class="kbd">F6</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">L</kbd>, <kbd class="kbd">Alt</kbd> + <kbd class="kbd">D</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">L</kbd>, <kbd class="kbd">Opt</kbd> + <kbd class="kbd">D</kbd></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Places a ? in the address bar for performing a keyword search using your default search engine</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">K</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">E</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">K</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">E</kbd></td>
    </tr>
  </tbody>
</table>
