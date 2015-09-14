---
rss: false
layout: tools-article
title: "Navigating the Console"
seotitle: "Navigating the Console in Chrome DevTools"
description: "Learn how to navigate the JavaScript Console UI within Chrome DevTools."
introduction: "The powerful JavaScript Console within Chrome DevTools can be customized and controlled in a number of ways, and learning how to use it makes you a better developer, guaranteed."
article:
  written_on: 2015-05-11
  updated_on: 2015-05-11
  order: 1
authors:
  - andismith
  - megginkearney
  - pbakaus
priority: 0
collection: console
key-takeaways:
  tldr:
    - Use the Console to not only log, but interact with the page and execute JavaScript.
    - Open the Console Drawer anytime by using the <kbd class="kbd">Esc</kbd> key shortcut.
    - Consecutive repeated messages will be stacked.
    - Use clear() to clear the console.
    - Persist your console output by selecting 'Preserve Log'.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.tldr %}

## Opening the Console

Access the Console full screen as dedicated panel or from a Drawer that opens next to any open panel.

### The Console panel

To open the dedicated 'Console' panel, either:

* Use the keyboard shortcuts
  * On Windows and Linux: <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">J</kbd>
  * On Mac: <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Option</kbd> + <kbd class="kbd">J</kbd>
* Select the Chrome Menu icon <img src="images/menu.gif" alt="menu" style="display:inline-block;margin:0;width:15px" /> > More Tools > JavaScript Console.
* Or if the Chrome Developer Tools are already open, press the 'Console' tab.

![The Console Panel](images/console-panel.png)

### The Console Drawer

To open the Drawer from within another panel, either:

* Press the <kbd class="kbd">Esc</kbd> key when the Chrome DevTools are in focus.
* Or click the 'Show Drawer' icon <img src="images/drawer.gif" alt="drawer" style="display:inline-block;margin:0;width:15px" /> found in the upper right corner of the Chrome DevTools.

![The Console Drawer while on the 'Sources' panel](images/console-drawer.png)

## Message stacking

![Example of messages stacking within the console](images/message-stacking.png)

The console keeps a record of every message posted to it on any given page until the page is closed, navigated away from, or refreshed. If the same message is repeated consecutive times, the console stacks them to keep the information provided as concise as possible. When messages are stacked, the number in the left margin shows how many times a particular message has been repeated.

If you prefer a unique line entry for every log, enable **Show timestamps** from the Settings menu  <img src="images/settings.gif" alt="settings" style="display:inline-block;margin:0;width:15px" /> found in the upper right corner to give every message a unique timestamp.

## Working with the Console history

### Clearing the history

You can clear the console history by doing any of the following:

* Right-click or Ctrl-click anywhere in the Console area and choose 'Clear Console'.
* Enter the `clear()` Command Line API at the shell prompt.
* Invoke `console.clear()` Console API from within your JavaScript code.
* Use the keyboard shortcut <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">K</kbd> (Mac) or <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">L</kbd> (Windows and Linux).

### Persisting the history

Persist the console history during page refreshes and when navigating between pages by selecting the 'Preserve log' option found at the top of the console. Messages will be stored until you clear the Console or until you close the tab.

![Example of preserve log activated](images/preserve-log.png)

### Saving the history

Right-click or Ctrl-click anywhere in the console area and choose 'Save As' to save the output of the console to a log file that can be opened in any text editor.

![Example of preserve log activated](images/console-save-as.png)

## Selecting the right target

By default, logging and error output from frames or extensions contained within a page will not be output to the Console. You can access other frames' Console output by using the dropdown at the top of the console. An iframe element, for example, would create its own frame context, selectable from this menu.

![Example of frame selection](images/frame-selection.png)

## Filtering the Console output

![Filtering errors](images/console-write-filter-errors.png)

Filter console output by its severity level by selecting one of the filter options.
Activate filters under the filter icon located in the upper-left corner of the console panel.
The following filter options are available:

<table class="table-3">
  <thead>
     <tr>
      <th>Option</th>
      <th>Shows</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>All</td>
    <td>Shows all console output</td>
  </tr>
  <tr>
    <td>Errors</td>
    <td>Only show output from <a href="/web/tools/javascript/console/console-reference#consoleerrorobject--object-">console.error()</a>.</td>
  </tr>
  <tr>
    <td>Warnings</td>
    <td>Only show output from <a href="/web/tools/javascript/console/console-reference#consolewarnobject--object-">console.warn()</a>.</td>
  </tr>
  <tr>
    <td>Info</td>
    <td>Only show output from <a href="/web/tools/javascript/console/console-reference#consoleinfoobject--object-">console.info()</a>.</td>
  </tr>
  <tr>
    <td>Logs</td>
    <td>Only show output from <a href="/web/tools/javascript/console/console-reference#consolelogobject--object-">console.log()</a>.</td>
  </tr>
  <tr>
    <td>Debug</td>
    <td>Only show output from <a href="/web/tools/javascript/console/console-reference#consoletimeendlabel">console.timeEnd()</a> and <a href="/web/tools/javascript/console/console-reference#consoledebugobject--object-">console.debug()</a>.</td>
  </tr>
  </tbody>
</table>

## Additional settings

You can customize the Console further from the 'Settings' menu <img src="images/settings.gif" alt="settings" style="display:inline-block;margin:0;width:15px" /> in the upper right corner of DevTools.

<table class="table-3">
  <thead>
     <tr>
      <th>Setting</th>
      <th>Description</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>Hide network messages</td>
    <td>By default, the console reports network issues. Turning this on instructs the console to not show logs for these errors. For example, 404 and 500 series errors will not be logged.</td>
  </tr>
  <tr>
    <td>Log XMLHttpRequests</td>
    <td>Determines if the console logs each XMLHttpRequest.</td>
  </tr>
  <tr>
    <td>Preserve log upon navigation</td>
    <td>Persists the console history during page refreshes or navigation.</td>
  </tr>
  <tr>
    <td>Show timestamps</td>
    <td>Prepends a timestamp to each console message showing when the call was made. Useful for debugging when a certain event occurred. This will disable message stacking.</td>
  </tr>
  </tbody>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
