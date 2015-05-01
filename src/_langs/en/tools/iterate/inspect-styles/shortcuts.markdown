---
layout: article
title: "Keyboard Shortcuts Reference"
seotitle: "Chrome DevTools Keyboard Shortcuts Reference"
description: "Chrome DevTools has several built-in shortcut keys that developers can use to save time in their day to day workflow. "
introduction: "Chrome DevTools has several built-in shortcut keys that developers can use to save time in their day to day workflow."
article:
  written_on: 2015-04-30
  updated_on: 2015-04-30
  order: 4
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

This guide provides a quick reference to each DevTools shortcut and the corresponding key for each on Windows/Linux and Mac. While some shortcuts are globally available across all of the DevTools, others are specific to a single panel, and are broken up based on where it can be used.

{% include modules/toc.liquid %}

## Open DevTools

To access the DevTools, on any web page or app in Google Chrome, you can use one of these options:

* Open the **Chrome menu** ![Chrome menu](imgs/chrome-menu.png) at the top-right of your browser window, then select **Tools > Developer Tools**.
* Right-click on any page element and select **Inspect Element**.

Additonal shortcuts to launch DevTools:

<table class="table-3">
  <thead>
      <th>Launch DevTools</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Launch DevTools">Open Developer Tools</td>
	  <td data-th="Windows"><span class="kbd">F12</span>, <span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">I</span></td>
	  <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">I</span></td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>poster</code></td>
      <td data-th="Availability">All browsers</td>
      <td data-th="Description">Address (URL) of an image file that the browser can show as soon as the video element is displayed, without downloading video content.</td>

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
      <td data-th="Launch DevTools">Inspect the Inspector (_undock first one and press_)</td>
      <td data-th="Windows"><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">I</span></td>
      <td data-th="Mac"><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">I</span></td>
    </tr>
  </tbody>
</table>

## All Panels

Shortcuts available on all DevTools panels:

<table>
<tbody>
<tr>
<th>Windows / Linux</th>

<th>Mac</th>

</tr>

<tr>
<td>Show General Settings dialog</td>

<td><span class="kbd">?</span>, <span class="kbd">F1</span></td>

<td><span class="kbd">?</span></td>

</tr>

<tr>
<td>Next panel</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">]</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">]</span></td>

</tr>

<tr>
<td>Previous panel</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">[</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">[</span></td>

</tr>

<tr>
<td>Backward in panel History</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Alt</span> + <span class="kbd">[</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">[</span></td>

</tr>

<tr>
<td>Forward in panel history</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Alt</span> + <span class="kbd">]</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">]</span></td>

</tr>

<tr>
<td>Change docking location</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">D</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">D</span></td>

</tr>

<tr>
<td>Open Device Mode</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">M</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">M</span></td>

</tr>

<tr>
<td>Toggle Console / close settings dialog when open</td>

<td><span class="kbd">Esc</span></td>

<td><span class="kbd">Esc</span></td>

</tr>

<tr>
<td>Refresh the page</td>

<td><span class="kbd">F5</span>, <span class="kbd">Ctrl</span> + <span class="kbd">R</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">R</span></td>

</tr>

<tr>
<td>Refresh the page ignoring cached content</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">F5</span>, <span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">R</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">R</span></td>

</tr>

<tr>
<td>Text search within current file or panel</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">F</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">F</span></td>

</tr>

<tr>
<td>Text search across all sources</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">F</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">F</span></td>

</tr>

<tr>
<td>Search by filename (_except on Timeline_)</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">O</span>, <span class="kbd">Ctrl</span> + <span class="kbd">O</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">O</span>, <span class="kbd">Cmd</span> + <span class="kbd">O</span></td>

</tr>

<tr>
<td>Zoom in (while focused in DevTools)</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">+</span></td>

<td><span class="kbd">Shift</span> + <span class="kbd">+</span></td>

</tr>

<tr>
<td>Zoom out</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">-</span></td>

<td><span class="kbd">Shift</span> + <span class="kbd">-</span></td>

</tr>

<tr>
<td>Restore default text size</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">0</span></td>

<td><span class="kbd">Shift</span> + <span class="kbd">0</span></td>

</tr>

</tbody>

</table>

</div>

<div class="collapsible">
## Elements Panel

<table>
<tbody>
<tr>
<th>Windows / Linux</th>

<th>Mac</th>

</tr>

<tr>
<td>Undo change</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Z</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Z</span></td>

</tr>

<tr>
<td>Redo change</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Y</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Y</span>, <span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">Z</span></td>

</tr>

<tr>
<td>Navigate</td>

<td><span class="kbd">Up</span>, <span class="kbd">Down</span></td>

<td><span class="kbd">Up</span>, <span class="kbd">Down</span></td>

</tr>

<tr>
<td>Expand / collapse node</td>

<td><span class="kbd">Right</span>, <span class="kbd">Left</span></td>

<td><span class="kbd">Right</span>, <span class="kbd">Left</span></td>

</tr>

<tr>
<td>Expand node</td>

<td><span class="kbd">Single-click on arrow</span></td>

<td><span class="kbd">Single-click on arrow</span></td>

</tr>

<tr>
<td>Expand / collapse node and all its children</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Alt</span> + <span class="kbd">Click on arrow icon</span></td>

<td><span class="kbd">Opt</span> + <span class="kbd">Click on arrow icon</span></td>

</tr>

<tr>
<td>Edit attribute</td>

<td><span class="kbd">Enter</span>, <span class="kbd">Double-click on attribute</span></td>

<td><span class="kbd">Enter</span>, <span class="kbd">Double-click on attribute</span></td>

</tr>

<tr>
<td>Hide element</td>

<td><span class="kbd">H</span></td>

<td><span class="kbd">H</span></td>

</tr>

<tr>
<td>Toggle edit as HTML</td>

<td><span class="kbd">F2</span></td>

</tr>

</tbody>

</table>

Right-clicking an element you can:

*   Force element pseudo states: (`:active`, `:hover`, `:focus`, `:visited`)
*   Set breakpoints on the elements: (Subtree modifications, Attribute modification, Node removal)
*   Clear console

</div>

<div class="collapsible">
## Styles Sidebar

<table>
<tbody>
<tr>
<th>Windows / Linux</th>

<th>Mac</th>

</tr>

<tr>
<td>Edit rule</td>

<td><span class="kbd">Single-click</span></td>

<td><span class="kbd">Single-click</span></td>

</tr>

<tr>
<td>Insert new property</td>

<td><span class="kbd">Single-click on whitespace</span></td>

<td><span class="kbd">Single-click on whitespace</span></td>

</tr>

<tr>
<td>Go to line of style rule property declaration in source</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Click on property</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Click on property</span></td>

</tr>

<tr>
<td>Go to line of property value declaration in source</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Click on property value</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Click on property value</span></td>

</tr>

<tr>
<td>Cycle through the color definition value</td>

<td><span class="kbd">Shift</span> + <span class="kbd">Click on color picker box</span></td>

<td><span class="kbd">Shift</span> + <span class="kbd">Click on color picker box</span></td>

</tr>

<tr>
<td>Edit next / previous property</td>

<td><span class="kbd">Tab</span>, <span class="kbd">Shift</span> + <span class="kbd">Tab</span></td>

<td><span class="kbd">Tab</span>, <span class="kbd">Shift</span> + <span class="kbd">Tab</span></td>

</tr>

<tr>
<td>Increment / decrement value</td>

<td><span class="kbd">Up</span>, <span class="kbd">Down</span></td>

<td><span class="kbd">Up</span>, <span class="kbd">Down</span></td>

</tr>

<tr>
<td>Increment / decrement value by 10</td>

<td><span class="kbd">Shift</span> + <span class="kbd">Up</span>, <span class="kbd">Shift</span> + <span class="kbd">Down</span></td>

<td><span class="kbd">Shift</span> + <span class="kbd">Up</span>, <span class="kbd">Shift</span> + <span class="kbd">Down</span></td>

</tr>

<tr>
<td>Increment / decrement value by 10</td>

<td><span class="kbd">PgUp</span>, <span class="kbd">PgDown</span></td>

<td><span class="kbd">PgUp</span>, <span class="kbd">PgDown</span></td>

</tr>

<tr>
<td>Increment / decrement value by 100</td>

<td><span class="kbd">Shift</span> + <span class="kbd">PgUp</span>, <span class="kbd">Shift</span> + <span class="kbd">PgDown</span></td>

<td><span class="kbd">Shift</span> + <span class="kbd">PgUp</span>, <span class="kbd">Shift</span> + <span class="kbd">PgDown</span></td>

</tr>

<tr>
<td>Increment / decrement value by 0.1</td>

<td><span class="kbd">Alt</span> + <span class="kbd">Up</span>, <span class="kbd">Alt</span> + <span class="kbd">Down</span></td>

<td><span class="kbd">Opt</span> + <span class="kbd">Up</span>, <span class="kbd">Opt</span> + <span class="kbd">Down</span></td>

</tr>

</tbody>

</table>

![Element Pseudostates](../images/attributes-icon.png)Emulate an element's pseudo state (`:active`, `:hover`, `:focus`, `:visited`)

![Adding style selectors](../images/plus.png)Add new style selectors

</div>

<div class="collapsible">
## Sources Panel

<table>
<tbody>
<tr>
<th>Windows / Linux</th>

<th>Mac</th>

</tr>

<tr>
<td>Pause / resume script execution</td>

<td><span class="kbd">F8</span>, <span class="kbd">Ctrl</span> + <span class="kbd">\</span></td>

<td><span class="kbd">F8</span>, <span class="kbd">Cmd</span> + <span class="kbd">\</span></td>

</tr>

<tr>
<td>Step over next function call</td>

<td><span class="kbd">F10</span>, <span class="kbd">Ctrl</span> + <span class="kbd">'</span></td>

<td><span class="kbd">F10</span>, <span class="kbd">Cmd</span> + <span class="kbd">'</span></td>

</tr>

<tr>
<td>Step into next function call</td>

<td><span class="kbd">F11</span>, <span class="kbd">Ctrl</span> + <span class="kbd">;</span></td>

<td><span class="kbd">F11</span>, <span class="kbd">Cmd</span> + <span class="kbd">;</span></td>

</tr>

<tr>
<td>Step out of current function</td>

<td><span class="kbd">Shift</span> + <span class="kbd">F11</span>, <span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">;</span></td>

<td><span class="kbd">Shift</span> + <span class="kbd">F11</span>, <span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">;</span></td>

</tr>

<tr>
<td>Select next call frame</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">.</span></td>

<td><span class="kbd">Opt</span> + <span class="kbd">.</span></td>

</tr>

<tr>
<td>Select previous call frame</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">,</span></td>

<td><span class="kbd">Opt</span> + <span class="kbd">,</span></td>

</tr>

<tr>
<td>Toggle breakpoint condition</td>

<td><span class="kbd">Click on line number</span>, <span class="kbd">Ctrl</span> + <span class="kbd">B</span></td>

<td><span class="kbd">Click on line number</span>, <span class="kbd">Cmd</span> + <span class="kbd">B</span></td>

</tr>

<tr>
<td>Edit breakpoint condition</td>

<td><span class="kbd">Right-click on line number</span></td>

<td><span class="kbd">Right-click on line number</span></td>

</tr>

<tr>
<td>Delete individual words</td>

<td><span class="kbd">Alt</span> + <span class="kbd">Delete</span></td>

<td><span class="kbd">Opt</span> + <span class="kbd">Delete</span></td>

</tr>

<tr>
<td>Comment a line or selected text</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">/</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">/</span></td>

</tr>

<tr>
<td>Save changes to local modifications</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">S</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">S</span></td>

</tr>

<tr>
<td>Save all changes</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Alt</span> + <span class="kbd">S</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span class="kbd">S</span></td>

</tr>

<tr>
<td>Go to line</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">G</span></td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">G</span></td>

</tr>

<tr>
<td>Search by filename</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">O</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">O</span></td>

</tr>

<tr>
<td>Jump to line number</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">P</span> + <span class="kbd">:<number></span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">P</span> + <span class="kbd">:<number></span></td>

</tr>

<tr>
<td>Jump to column</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">O</span> + <span class="kbd">:<number></span> + <span class="kbd">:<number></span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">O</span> + <span class="kbd">:<number></span> + <span class="kbd">:<number></span></td>

</tr>

<tr>
<td>Go to member</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">O</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">O</span></td>

</tr>

<tr>
<td>Close active tab</td>

<td><span class="kbd">Alt</span> + <span class="kbd">W</span></td>

<td><span class="kbd">Opt</span> + <span class="kbd">W</span></td>

</tr>

<tr>
<td>Run snippet</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Enter</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Enter</span></td>

</tr>

</tbody>

</table>

![Pause on Exception Button](../images/pause-gray.png)Don't pause on exceptions

![Pause on All Exceptions](../images/pause-blue.png)Pause on All exceptions (including those caught within try/catch blocks)

![Pause on Uncaught Exceptions](../images/pause-purple.png)Pause on uncaught exceptions (usually the one you want)

</div>

<div class="collapsible">
## Code Editor Shortcuts

<table>
<tbody>
<tr>
<th>Windows / Linux</th>

<th>Mac</th>

</tr>

<tr>
<td>Go to matching bracket</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">M</span></td>

</tr>

<tr>
<td>Jump to line number</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">P</span> + <span class="kbd">:<number></span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">P</span> + <span class="kbd">:<number></span></td>

</tr>

<tr>
<td>Jump to column</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">O</span> + <span class="kbd">:<number></span> + <span class="kbd">:<number></span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">O</span> + <span class="kbd">:<number></span> + <span class="kbd">:<number></span></td>

</tr>

<tr>
<td>Toggle comment</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">/</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">/</span></td>

</tr>

<tr>
<td>Select next occurrence</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">D</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">D</span></td>

</tr>

<tr>
<td>Undo last selection</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">U</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">U</span></td>

</tr>

</tbody>

</table>

</div>

<div class="collapsible">
## Timeline Panel

<table>
<tbody>
<tr>
<th>Windows / Linux</th>

<th>Mac</th>

</tr>

<tr>
<td>Start / stop recording</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">E</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">E</span></td>

</tr>

<tr>
<td>Save timeline data</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">S</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">S</span></td>

</tr>

<tr>
<td>Load timeline data</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">O</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">O</span></td>

</tr>

</tbody>

</table>

</div>

<div class="collapsible">
## Profiles Panel

<table>
<tbody>
<tr>
<th>Windows / Linux</th>

<th>Mac</th>

</tr>

<tr>
<td>Start / stop recording</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">E</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">E</span></td>

</tr>

</tbody>

</table>

</div>

<div class="collapsible">
## Console

<table>
<tbody>
<tr>
<th>Windows / Linux</th>

<th>Mac</th>

</tr>

<tr>
<td>Accept suggestion</td>

<td><span class="kbd">Right</span></td>

<td><span class="kbd">Right</span></td>

</tr>

<tr>
<td>Previous command / line</td>

<td><span class="kbd">Up</span></td>

<td><span class="kbd">Up</span></td>

</tr>

<tr>
<td>Next command / line</td>

<td><span class="kbd">Down</span></td>

<td><span class="kbd">Down</span></td>

</tr>

<tr>
<td>Focus the Console</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">`</span></td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">`</span></td>

</tr>

<tr>
<td>Clear Console</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">L</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">K</span>, <span class="kbd">Opt</span> + <span class="kbd">L</span></td>

</tr>

<tr>
<td>Multi-line entry</td>

<td><span class="kbd">Shift</span> + <span class="kbd">Enter</span></td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Return</span></td>

</tr>

<tr>
<td>Execute</td>

<td><span class="kbd">Enter</span></td>

<td><span class="kbd">Return</span></td>

</tr>

</tbody>

</table>

Right-clicking on console:

*   XMLHttpRequest logging: Turn on to view the XHR log
*   Preserve log upon navigation
*   Filter: Hide and unhide messages from script files
*   Clear console: Clear all console messages

</div>

<div class="collapsible">
## Screencasting

<table>
<tbody>
<tr>
<th>Windows / Linux</th>

<th>Mac</th>

</tr>

<tr>
<td>Pinch zoom in and out</td>

<td><span class="kbd">Alt</span> + <span class="kbd">Scroll</span>,<span class="kbd">Ctrl</span> + <span class="kbd">Click and drag with two fingers</span></td>

<td><span class="kbd">Opt</span> + <span class="kbd">Scroll</span>, <span class="kbd">Cmd</span> + <span class="kbd">Click and drag with two fingers</span></td>

</tr>

<tr>
<td>Inspect element tool</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">C</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">C</span></td>

</tr>

</tbody>

</table>

</div>

<div class="collapsible">
## Emulation

<table>
<tbody>
<tr>
<th>Windows / Linux</th>

<th>Mac</th>

</tr>

<tr>
<td>Pinch zoom in and out</td>

<td><span class="kbd">Shift</span> + <span class="kbd">Scroll</span></td>

<td><span class="kbd">Shift</span> + <span class="kbd">Scroll</span></td>

</tr>

</tbody>

</table>

</div>

<div class="collapsible">
## Other Chrome Shortcuts

Here are some additional Chrome shortcuts which are useful for general use within the browser not specific to the DevTools. [View all Chrome shortcuts](http://goo.gl/PsTNm) for Windows, Mac, and Linux.

<table>
<tbody>
<tr>
<th>Windows / Linux</th>

<th>Mac</th>

</tr>

<tr>
<td>Find next</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">G</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">G</span></td>

</tr>

<tr>
<td>Find previous</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">G</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">G</span></td>

</tr>

<tr>
<td>Open a new window in Incognito mode</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">N</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">N</span></td>

</tr>

<tr>
<td>Toggle Bookmarks bar on and off</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">B</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">B</span></td>

</tr>

<tr>
<td>View the History page</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">H</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Y</span></td>

</tr>

<tr>
<td>View the Downloads page</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">J</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">Shift</span> + <span class="kbd">J</span></td>

</tr>

<tr>
<td>View the Task Manager</td>

<td><span class="kbd">Shift</span> + <span class="kbd">ESC</span></td>

<td><span class="kbd">Shift</span> + <span class="kbd">ESC</span></td>

</tr>

<tr>
<td>Next page in a tabs browsing history</td>

<td><span class="kbd">Alt</span> + <span class="kbd">Right</span></td>

<td><span class="kbd">Opt</span> + <span class="kbd">Right</span></td>

</tr>

<tr>
<td>Previous page in a tabs browsing history</td>

<td><span class="kbd">Backspace</span>, <span class="kbd">Alt</span> + <span class="kbd">Left</span></td>

<td><span class="kbd">Backspace</span>, <span class="kbd">Opt</span> + <span class="kbd">Left</span></td>

</tr>

<tr>
<td>Highlight content in the web address area</td>

<td><span class="kbd">F6</span>, <span class="kbd">Ctrl</span> + <span class="kbd">L</span>, <span class="kbd">Alt</span> + <span class="kbd">D</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">L</span>, <span class="kbd">Opt</span> + <span class="kbd">D</span></td>

</tr>

<tr>
<td>Places a ? in the address bar for performing a keyword   
search using your default search engine</td>

<td><span class="kbd">Ctrl</span> + <span class="kbd">K</span>, <span class="kbd">Ctrl</span> + <span class="kbd">E</span></td>

<td><span class="kbd">Cmd</span> + <span class="kbd">K</span>, <span class="kbd">Cmd</span> + <span class="kbd">E</span></td>

</tr>

</tbody>

</table>

{% endwrap %}
