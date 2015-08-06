---
rss: false
layout: tools-article
title: "Keyboard & UI Shortcuts Reference"
seotitle: "Chrome DevTools Keyboard & UI Shortcuts Reference"
description: "Chrome DevTools has several built-in shortcut keys that developers can use to save time in their day to day workflow. "
introduction: "Chrome DevTools has several built-in shortcut keys that developers can use to save time in their day to day workflow."
article:
  written_on: 2015-04-30
  updated_on: 2015-04-30
  order: 5
authors:
  - megginkearney
priority: 0
collection: inspect-styles
key-takeaways:
  shortcuts:
    - TBD tldr.
remember:
  tbd:
    - TBD
---
{% wrap content %}

This guide provides a quick reference to each shortcut availabe in Chrome DevTools. While some shortcuts are available globally, others are specific to a single panel, and are broken up based on where it can be used.

{% include modules/toc.liquid %}

## Accessing DevTools

To access the DevTools, on any web page or app in Google Chrome:

* Open the **Chrome menu** ![Chrome menu](imgs/chrome-menu.png){:.inline} at the top-right of your browser window, then select **Tools > Developer Tools**.
* Right-click on any page element and select **Inspect Element**.

On the keyboard:

<table class="table-3">
  <thead>
      <th>Access DevTools</th>
      <th>On Windows</th>
      <th>On Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Launch DevTools">Open Developer Tools</td>
	  <td data-th="Windows"><span class="kbd">F12</span>, <span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">I</span></td>
	  <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">I</span></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Open / switch from inspect element mode and browser window</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">C</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">C</span></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Open Developer Tools and bring focus to the console</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">J</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">J</span></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Inspect the Inspector (undock first one and press)</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">I</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">I</span></td>
    </tr>
  </tbody>
</table>

## Global keyboard shortcuts

The following keyboard shortcuts are available in all DevTools panels:

<table class="table-3">
  <thead>
      <th>Global Shortcut</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Global Shortcuts">Show General Settings dialog</td>
      <td data-th="Windows"><span class="kbd">?</span>, <span class="kbd">F1</span></td>
      <td data-th="Mac"><span class="kbd">?</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Show General Settings dialog</td>
      <td data-th="Windows"><span class="kbd">?</span>, <span class="kbd">F1</span></td>
      <td data-th="Mac"><span class="kbd">?</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Next panel</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">]</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">]</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Previous panel</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">[</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">[</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Backward in panel History</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Alt</span> + <span class="kbd">[</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">[</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Forward in panel history</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Alt</span> + <span class="kbd">]</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">]</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Change docking location</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">D</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">D</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Open Device Mode</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">M</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">M</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Toggle Console / close settings dialog when open</td>
      <td data-th="Windows"><span class="kbd">Esc</span></td>
      <td data-th="Mac"><span class="kbd">Esc</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Refresh the page</td>
      <td data-th="Windows"><span class="kbd">F5</span>, <span class="kbd">Ctrl</span> + <span class="kbd">R</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">R</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Refresh the page ignoring cached content</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">F5</span>, <span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">R</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">R</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Text search within current file or panel</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">F</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">F</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Text search across all sources</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">F</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">F</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Search by filename (except on Timeline)</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">O</span>, <span class="kbd">Ctrl</span> + <span class="kbd">O</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">O</span>, <span class="kbd">Cmd</span> + <span class="kbd">O</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Zoom in (while focused in DevTools)</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">+</span></td>
      <td data-th="Mac"><span class="kbd">Shift</span> + <span class="kbd">+</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Zoom out</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">-</span></td>
      <td data-th="Mac"><span class="kbd">Shift</span> + <span class="kbd">-</span></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Restore default text size</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">0</span></td>
      <td data-th="Mac"><span class="kbd">Shift</span> + <span class="kbd">0</span></td>
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

<table class="table-3">
  <thead>
      <th>Elements Panel</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Elements Panel">Undo change</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Z</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Z</span></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Redo change</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Y</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Y</span>, <span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">Z</span></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Navigate</td>
      <td data-th="Windows"><span class="kbd">Up</span>, <span class="kbd">Down</span></td>
      <td data-th="Mac"><span class="kbd">Up</span>, <span class="kbd">Down</span></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Expand / collapse node</td>
      <td data-th="Windows"><span class="kbd">Right</span>, <span class="kbd">Left</span></td>
      <td data-th="Mac"><span class="kbd">Right</span>, <span class="kbd">Left</span></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Expand node</td>
      <td data-th="Windows"><span class="kbd">Single-click on arrow</span></td>
      <td data-th="Mac"><span class="kbd">Single-click on arrow</span></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Expand / collapse node and all its children</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Alt</span> + <span class="kbd">Click on arrow icon</span></td>
      <td data-th="Mac"><span class="kbd">Opt</span> + <span class="kbd">Click on arrow icon</span></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Edit attribute</td>
      <td data-th="Windows"><span class="kbd">Enter</span>, <span class="kbd">Double-click on attribute</span></td>
      <td data-th="Mac"><span class="kbd">Enter</span>, <span class="kbd">Double-click on attribute</span></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Hide element</td>
      <td data-th="Windows"><span class="kbd">H</span></td>
      <td data-th="Mac"><span class="kbd">H</span></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Toggle edit as HTML</td>
      <td data-th="Windows"><span class="kbd">F2</span></td>
      <td data-th="Mac"></td>
    </tr>
  </tbody>
</table>

#### Styles sidebar

Shortcuts available in the Styles sidebar:

<table class="table-3">
  <thead>
      <th>Styles Sidebar</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Styles Sidebar">Edit rule</td>
      <td data-th="Windows"><span class="kbd">Single-click</span></td>
      <td data-th="Mac"><span class="kbd">Single-click</span></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Insert new property</td>
      <td data-th="Windows"><span class="kbd">Single-click on whitespace</span></td>
      <td data-th="Mac"><span class="kbd">Single-click on whitespace</span></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Go to line of style rule property declaration in source</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Click on property</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Click on property</span></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Go to line of property value declaration in source</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Click on property value</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Click on property value</span></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Cycle through the color definition value</td>
      <td data-th="Windows"><span class="kbd">Shift</span> + <span class="kbd">Click on color picker box</span></td>
      <td data-th="Mac"><span class="kbd">Shift</span> + <span class="kbd">Click on color picker box</span></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Edit next / previous property</td>
      <td data-th="Windows"><span class="kbd">Tab</span>, <span class="kbd">Shift</span> + <span class="kbd">Tab</span></td>
      <td data-th="Mac"><span class="kbd">Tab</span>, <span class="kbd">Shift</span> + <span class="kbd">Tab</span></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Increment / decrement value</td>
      <td data-th="Windows"><span class="kbd">Up</span>, <span class="kbd">Down</span></td>
      <td data-th="Mac"><span class="kbd">Up</span>, <span class="kbd">Down</span></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Increment / decrement value by 10</td>
      <td data-th="Windows"><span class="kbd">Shift</span> + <span class="kbd">Up</span>, <span class="kbd">Shift</span> + <span class="kbd">Down</span></td>
      <td data-th="Mac"><span class="kbd">Shift</span> + <span class="kbd">Up</span>, <span class="kbd">Shift</span> + <span class="kbd">Down</span></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Increment / decrement value by 10</td>
      <td data-th="Windows"><span class="kbd">PgUp</span>, <span class="kbd">PgDown</span></td>
      <td data-th="Mac"><span class="kbd">PgUp</span>, <span class="kbd">PgDown</span></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Increment / decrement value by 100</td>
      <td data-th="Windows"><span class="kbd">Shift</span> + <span class="kbd">PgUp</span>, <span class="kbd">Shift</span> + <span class="kbd">PgDown</span></td>
      <td data-th="Mac"><span class="kbd">Shift</span> + <span class="kbd">PgUp</span>, <span class="kbd">Shift</span> + <span class="kbd">PgDown</span></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Increment / decrement value by 0.1</td>
      <td data-th="Windows"><span class="kbd">Alt</span> + <span class="kbd">Up</span>, <span class="kbd">Alt</span> + <span class="kbd">Down</span></td>
      <td data-th="Mac"><span class="kbd">Opt</span> + <span class="kbd">Up</span>, <span class="kbd">Opt</span> + <span class="kbd">Down</span></td>
    </tr>
  </tbody>
</table>

### Sources

<table class="table-3">
  <thead>
      <th>Sources Panel</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Sources Panel">Pause / resume script execution</td>
      <td data-th="Windows"><span class="kbd">F8</span>, <span class="kbd">Ctrl</span> + <span class="kbd">\</span></td>
      <td data-th="Mac"><span class="kbd">F8</span>, <span class="kbd">Cmd</span> + <span class="kbd">\</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Step over next function call</td>
      <td data-th="Windows"><span class="kbd">F10</span>, <span class="kbd">Ctrl</span> + <span class="kbd">'</span></td>
      <td data-th="Mac"><span class="kbd">F10</span>, <span class="kbd">Cmd</span> + <span class="kbd">'</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Step into next function call</td>
      <td data-th="Windows"><span class="kbd">F11</span>, <span class="kbd">Ctrl</span> + <span class="kbd">;</span></td>
      <td data-th="Mac"><span class="kbd">F11</span>, <span class="kbd">Cmd</span> + <span class="kbd">;</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Step out of current function</td>
      <td data-th="Windows"><span class="kbd">Shift</span> + <span class="kbd">F11</span>, <span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">;</span></td>
      <td data-th="Mac"><span class="kbd">Shift</span> + <span class="kbd">F11</span>, <span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">;</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Select next call frame</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">.</span></td>
      <td data-th="Mac"><span class="kbd">Opt</span> + <span class="kbd">.</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Select previous call frame</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">,</span></td>
      <td data-th="Mac"><span class="kbd">Opt</span> + <span class="kbd">,</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Toggle breakpoint condition</td>
      <td data-th="Windows"><span class="kbd">Click on line number</span>, <span class="kbd">Ctrl</span> + <span class="kbd">B</span></td>
      <td data-th="Mac"><span class="kbd">Click on line number</span>, <span class="kbd">Cmd</span> + <span class="kbd">B</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Edit breakpoint condition</td>
      <td data-th="Windows"><span class="kbd">Right-click on line number</span></td>
      <td data-th="Mac"><span class="kbd">Right-click on line number</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Delete individual words</td>
      <td data-th="Windows"><span class="kbd">Alt</span> + <span class="kbd">Delete</span></td>
      <td data-th="Mac"><span class="kbd">Opt</span> + <span class="kbd">Delete</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Comment a line or selected text</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">/</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">/</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Save changes to local modifications</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">S</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">S</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Save all changes</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Alt</span> + <span class="kbd">S</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">S</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Go to line</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">G</span></td>
      <td data-th="Mac"><span class="kbd">Ctrl</span> + <span class="kbd">G</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Search by filename</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">O</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">O</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Jump to line number</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">P</span> + <span class="kbd">:<i>number</i></span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">P</span> + <span class="kbd">:<i>number</i></span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Jump to column</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">O</span> + <span class="kbd">:<i>number</i></span> + <span class="kbd">:<i>number</i></span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">O</span> + <span class="kbd">:<i>number</i></span> + <span class="kbd">:<i>number</i></span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Go to member</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">O</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">O</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Close active tab</td>
      <td data-th="Windows"><span class="kbd">Alt</span> + <span class="kbd">W</span></td>
      <td data-th="Mac"><span class="kbd">Opt</span> + <span class="kbd">W</span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Run snippet</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Enter</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Enter</span></td>
    </tr>
  </tbody>
</table>

#### Within the code editor

<table class="table-3">
  <thead>
      <th>Code Editor</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Code Editor">Go to matching bracket</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">M</span></td>
      <td data-th="Mac"><span class="kbd"></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Jump to line number</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">P</span> + <span class="kbd">:<i>number</i></span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">P</span> + <span class="kbd">:<i>number</i></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Jump to column</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">O</span> + <span class="kbd">:<i>number</i></span> + <span class="kbd">:<i>number</i></span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">O</span> + <span class="kbd">:<i>number</i></span> + <span class="kbd">:<i>number</i></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Toggle comment</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">/</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">/</span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Select next occurrence</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">D</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">D</span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Undo last selection</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">U</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">U</span></td>
    </tr>
  </tbody>
</table>

### Timeline

<table class="table-3">
  <thead>
      <th>Timeline Panel</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Timeline Panel">Start / stop recording</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">E</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">E</span></td>
    </tr>
    <tr>
      <td data-th="Timeline Panel">Save timeline data</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">S</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">S</span></td>
    </tr>
    <tr>
      <td data-th="Timeline Panel">Load timeline data</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">O</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">O</span></td>
    </tr>
  </tbody>
</table>

### Profiles

<table class="table-3">
  <thead>
      <th>Profiles Panel</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Profiles Panel">Start / stop recording</td>
	  <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">E</span></td>
	  <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">E</span></td>
    </tr>
  </tbody>
</table>

### Console

<table class="table-3">
  <thead>
      <th>Console Shortcuts</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Console Shortcuts">Accept suggestion</td>
      <td data-th="Windows"><span class="kbd">Right</span></td>
      <td data-th="Mac"><span class="kbd">Right</span></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Previous command / line</td>
      <td data-th="Windows"><span class="kbd">Up</span></td>
      <td data-th="Mac"><span class="kbd">Up</span></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Next command / line</td>
      <td data-th="Windows"><span class="kbd">Down</span></td>
      <td data-th="Mac"><span class="kbd">Down</span></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Focus the Console</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">`</span></td>
      <td data-th="Mac"><span class="kbd">Ctrl</span> + <span class="kbd">`</span></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Clear Console</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">L</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">K</span>, <span class="kbd">Opt</span> + <span class="kbd">L</span></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Multi-line entry</td>
      <td data-th="Windows"><span class="kbd">Shift</span> + <span class="kbd">Enter</span></td>
      <td data-th="Mac"><span class="kbd">Ctrl</span> + <span class="kbd">Return</span></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Execute</td>
      <td data-th="Windows"><span class="kbd">Enter</span></td>
      <td data-th="Mac"><span class="kbd">Return</span></td>
    </tr>
  </tbody>
</table>

### Device mode

<table class="table-3">
  <thead>
      <th>Device Mode Shortcuts</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Emulation Shortcuts">Pinch zoom in and out</td>
      <td data-th="Windows"><span class="kbd">Shift</span> + <span class="kbd">Scroll</span></td>
      <td data-th="Mac"><span class="kbd">Shift</span> + <span class="kbd">Scroll</span></td>
    </tr>
  </tbody>
</table>

#### When screencasting

<table class="table-3">
  <thead>
      <th>Screencasting Shortcuts</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Screencasting Shortcuts">Pinch zoom in and out</td>
      <td data-th="Windows"><span class="kbd">Alt</span> + <span class="kbd">Scroll</span>,<span class="kbd">Ctrl</span> + <span class="kbd">Click and drag with two fingers</span></td>
      <td data-th="Mac"><span class="kbd">Opt</span> + <span class="kbd">Scroll</span>, <span class="kbd">Cmd</span> + <span class="kbd">Click and drag with two fingers</span></td>
    </tr>
    <tr>
      <td data-th="Screencasting Shortcuts">Inspect element tool</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">C</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">C</span></td>
    </tr>
  </tbody>
</table>

## Bonus: useful Chrome shortcuts

Here are some additional Chrome shortcuts which are useful for general use within the browser not specific to the DevTools. [View all Chrome shortcuts](http://goo.gl/PsTNm) for Windows, Mac, and Linux:

<table class="table-3">
  <thead>
      <th>More Chrome Shortcuts</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="More Chrome Shortcuts">Find next</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">G</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">G</span></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Find previous</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">G</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">G</span></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Open a new window in Incognito mode</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">N</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">N</span></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Toggle Bookmarks bar on and off</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">B</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">B</span></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">View the History page</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">H</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Y</span></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">View the Downloads page</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">J</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">J</span></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">View the Task Manager</td>
      <td data-th="Windows"><span class="kbd">Shift</span> + <span class="kbd">ESC</span></td>
      <td data-th="Mac"><span class="kbd">Shift</span> + <span class="kbd">ESC</span></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Next page in a tabs browsing history</td>
      <td data-th="Windows"><span class="kbd">Alt</span> + <span class="kbd">Right</span></td>
      <td data-th="Mac"><span class="kbd">Opt</span> + <span class="kbd">Right</span></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Previous page in a tabs browsing history</td>
      <td data-th="Windows"><span class="kbd">Backspace</span>, <span class="kbd">Alt</span> + <span class="kbd">Left</span></td>
      <td data-th="Mac"><span class="kbd">Backspace</span>, <span class="kbd">Opt</span> + <span class="kbd">Left</span></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Highlight content in the web address area</td>
      <td data-th="Windows"><span class="kbd">F6</span>, <span class="kbd">Ctrl</span> + <span class="kbd">L</span>, <span class="kbd">Alt</span> + <span class="kbd">D</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">L</span>, <span class="kbd">Opt</span> + <span class="kbd">D</span></td>
    </tr>
    <tr>
      <td data-th="More Chrome Shortcuts">Places a ? in the address bar for performing a keyword search using your default search engine</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">K</span>, <span class="kbd">Ctrl</span> + <span class="kbd">E</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">K</span>, <span class="kbd">Cmd</span> + <span class="kbd">E</span></td>
    </tr>
  </tbody>
</table>

{% endwrap %}
