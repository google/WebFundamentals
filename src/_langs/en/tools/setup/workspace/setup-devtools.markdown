---
layout: tools-article
title: "Set Up Chrome DevTools"
rss: false
seotitle: "Set Up Chrome Developer Tools (DevTools)"
description: "Chrome Developer Tools (DevTools) helps you develop, test, and debug your web sites and applications directly from the Google Chrome browser."
introduction: "Chrome Developer Tools (DevTools) helps you develop, test, and debug your web sites and applications directly from the Google Chrome browser."
authors:
  - dgash
  - kaycebasques
  - megginkearney
article:
  written_on: 2015-07-10
  updated_on: 2015-07-30
  order: 1
collection: workspace
takeaways:
    - Inspect DOM and styles in the Elements panel.
    - Debug Javascript with breakpoints in the Sources panel.
    - Interact with your page in the Console.
    - Interact with a page and record performance using the Timeline tool.
    - Test your pages on mobile; work in device mode.
remember:
  canary:
    - Use <a href="https://www.google.com/intl/en/chrome/browser/canary.html">Google Chrome Canary</a> to get the latest version of DevTools.
---

{% wrap content %}

As you develop web pages and applications, the DevTools are essential tools to efficiently track down layout issues, set JavaScript breakpoints, and profile performance.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.takeaways %}

## Access DevTools

Access the DevTools from any web page in Google Chrome:

* Select the Chrome menu ![Chrome menu](imgs/chrome_menu_button.png){:.inline} and choose **More tools** > **Developer tools**.

* Right-click a page element and choose **Inspect element** from the context menu.

* [Keyboard shortcut](/web/tools/iterate/inspect-styles/shortcuts): <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">I</kbd> (or <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">I</kbd> on Mac).

DevTols are organized into task-orientated panels.
Access each panel from the toolbar
at the top of the DevTools window.

{% include modules/remember.liquid title="Note" list=page.remember.canary %}

## Elements panel: inspect DOM and styles

The Elements panel lets you see everything in one DOM tree,
and allows inspection and on-the-fly editing of DOM elements.
Use the Elements panel to identify the
<abbr title="HyperText Markup Language">HTML</abbr> snippet for some aspect of the page.

For example, view the styles applied to a heading element in the DOM:

![Viewing a heading element in the DOM](imgs/elements-panel.png)

[Read more about inspecting the DOM and styles »](/web/tools/iterate/inspect-styles/basics)

## Network panel: monitor network performance

The Network panel provides insights into resources that are requested and downloaded over the network in real time.
Identify requests taking longer than expected
to optimize your page.

![Context menu for network requests](imgs/network-panel.png)

[Read more about how to improve your network performance »](/web/tools/profile-performance/network-performance/resource-loading)

## Sources panel: debug JavaScript with breakpoints

The Sources panel lets you debug your JavaScript code 
using breakpoints.
As the **complexity** of JavaScript applications increase,
developers need powerful debugging tools to help quickly discover the cause of an issue and fix it efficiently.

![Conditional breakpoint which logs to the console](imgs/js-debugging.png)

[Read more about how to debug JavaScript with breakpoints »](/web/tools/javascript/breakpoints)

## Timeline panel: record and analyze page activity

The **Timeline** panel gives you a complete overview
of where time is spent when loading and using your web app or page.
All events, from loading resources to parsing JavaScript,
calculating styles, and repainting are plotted on a timeline.

![Example timeline with various events](imgs/timeline-panel.png)

[Read more about how to use the timeline tool »](/web/tools/profile-performance/evaluate-performance/timeline-tool)

## Profiles panel: profile execution time and memory usage

The **Profiles** panel lets you profile the execution time and
memory usage of a web app or page. The provided profilers are:

* The **CPU profiler** shows where execution time is spent in your page's JavaScript functions.
* The **Heap profiler** shows memory distribution by your page's JavaScript objects and related DOM nodes.
* The **JavaScript** profile shows where execution time is spent in your scripts.

![Example heap snapshot](imgs/profiles-panel.png)

[Read more about how to speed up JavaScript execution »](/web/tools/profile-performance/rendering-tools/js-execution)

## Resources panel: inspect storage

The **Resources** panel lets you inspect resources that are loaded in the inspected page including IndexedDB or Web SQL databases, local and session storage, cookies, Application Cache, images, fonts, and style sheets.

![JavaScript file in resources panel](imgs/resources-panel.png)

[Read more about inspecting storage resources »](/web/tools/iterate/manage-data/index)

## Console panel: interact with page

The **Console** panel provides two primary functions:

* Log diagnostic information in the development process.
* Provide a shell prompt which can be used to interact with the document and DevTools.

![Evaluating commands in JS Console](imgs/expression-evaluation.png)

[Read more about working with the console »](/web/tools/javascript/console/)

## Work in device mode

Device mode lets you can change the size of the display to simulate a variety of existing devices, or set it to a size of your own choosing.

![DevTools device mode](imgs/device-mode-initial-view.png)

Change from device mode to full-screen,
and vice versa, by clicking the **Device Mode** button
![Device mode](imgs/device_mode_button.png){:.inline}. 

[Read more about device mode »](/web/tools/setup/device-testing/devtools-emulator)

## How to re-position tools

Use the **Layout** button to re-position DevTools:

* Click the Dock to Main button ![Dock to main](imgs/dock_to_main_button.png){:.inline} to dock the panel on the right side of the main window.

* Click ![Dock to bottom](imgs/dock_to_bottom_button.png){:.inline} to dock the panel at the bottom of the main window.

* Click and hold the button and click
![Undock](imgs/undock_button.png){:.inline}
to undock the panel from the main window and
open it in a separate window
(useful when you need to see more of your page at once).

{% endwrap %}
