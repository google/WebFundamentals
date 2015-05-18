---
rss: false
layout: article
title: "How to Use Console UI"
seotitle: "How to Use Console UI in Chrome DevTools"
description: "Learn how to use the JavaScript Console UI within Chrome DevTools."
introduction: "The JavaScript Console allows you to view log and error messages; enter JavaScript commands and programmatically interact with the page."
article:
  written_on: 2015-05-11
  updated_on: 2015-05-11
  order: 1
authors:
  - andismith
  - megginkearney
priority: 0
collection: console
key-takeaways:
  tldr:
    - As well as showing logging and debug information, the console can be used to enter JavaScript commands and interact with the page.
    - The console can be opened as a Drawer from any panel using the <kbd class="kbd">Esc</kbd> key shortcut.
    - Consecutive repeated messages will be stacked.
    - Use `clear()` to clear your console.
    - You can persist your console output by selecting 'Preserve Log'.
remember:
  note-tbd:
    - You can open the conole on any panel by pressing the <kbd class="kbd">Esc</kbd> key.
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.tldr %}

### Opening the Console

The console is accessible either from the dedicated Chrome DevTools 'Console' panel, or from a Drawer which can be opened from within any of the other panels for quick access.


#### The Console Panel

To open the dedicated 'Console' panel either:

* Use the keyboard shortcuts
  * On Windows and Linux: <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">J</kbd>
  * On Mac: <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Option</kbd> + <kbd class="kbd">J</kbd>
* Select the Chrome Menu icon <img src="images/menu.gif" alt="menu" style="display:inline-block;margin:0;width:15px" /> > More Tools > JavaScript Console.
* Or if the Chrome Developer Tools are already open, press the 'Console' tab.

![The Console Panel](images/console-panel.png)

#### The Console Drawer

To open the drawer from within another panel either:

* Press the <kbd class="kbd">Esc</kbd> key when the Chrome DevTools are in focus.
* Or click the 'Show Drawer' icon <img src="images/drawer.gif" alt="drawer" style="display:inline-block;margin:0;width:15px" /> found in the upper right corner of the Chrome DevTools.

![The Console Drawer while on the 'Sources' panel](images/console-drawer.png)

### Message Stacking

The console keeps a record of every message and interaction made on any given page until either the page is either closed, navigated away from or refreshed. If the same message is repeated consecutive times, the console will stack them to keep the information provided as concise as possible. When messages are stacked, the number in the left margin shows how many times this particular message has been repeated.

For example, the following code outputs the message 'Hello There' for numbers not divisible by 5 without a remainder, causing console message stacking:

		for (i = 0; i < 15; i++) {
			if (i % 5 === 0) {
				console.log('Hello World');
			} else {
				console.log('Hello There');
			}
		}

![Example of messages stacking within the console](images/message-stacking.png)

To keep Console messages unstacked, enable 'Show timestamps' from the 'Settings' menu  <img src="images/settings.gif" alt="settings" style="display:inline-block;margin:0;width:15px" /> found in the upper right corner to give every message a unique timestamp.

### Clearing the Console History

The console history can be cleared by doing any of the following:

* Right-click or Ctrl-click anywhere in the Console area and choose 'Clear Console' from the context menu that appears.
* Enter the `clear()` Command Line API at the shell prompt.
* Invoke `console.clear()` Console API from within your JavaScript code.
* Use the keyboard shortcut <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">K</kbd> (Mac) or <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">L</kbd> (Windows and Linux).

### Persisting the Console History

The console history can be persisted during page refreshes and when navigating between pages by selecting the 'Preserve log' option found at the top of the console. Messages will be stored until the console is cleared or until the tab is closed.

![Example of preserve log activated](images/preserve-log.png)

### Saving the Console History

Right-click or Ctrl-click anywhere in the console area and choose 'Save As' to save the output of the console to a log file that can be opened in any text editor.

![Example of preserve log activated](images/console-save-as.png)

### Frame Selection

By default logging and error output from frames contained within a page will not be output to the Console. Multiple frames on a single page can be accessed individually from the Chrome DevTools by using the dropdown at the top of the console. An iframe element, for example, would create its own frame context, selectable from this menu.

![Example of frame selection](images/frame-selection.png)

### Filtering the Console Output

For more information on filtering see [Organizing Console Output](https://web-central.appspot.com/web/tools/javascript/console/console-write?hl=en)

### Settings

There are a number of other Console customisation options available from the 'Settings' menu <img src="images/settings.gif" alt="settings" style="display:inline-block;margin:0;width:15px" /> under the 'Console' heading.

![The Console settings dialog](images/console-settings.png)

#### Hide network messages

By default, the console will report network issues. Turning this on instructs the console to not show logs from these errors. For example, 404 and 500 series errors will not be logged.

#### Log XMLHttpRequests

Determines if the console logs each XMLHttpRequest.

#### Preserve log upon navigation

Persists the console history during page refreshes or navigation.

#### Show timestamps

Prepends a timestamp to each console message showing when the call was made. Useful for debugging when a certain event occurred. This will disable message stacking.


{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
