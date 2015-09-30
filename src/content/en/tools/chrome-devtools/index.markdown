---
layout: shared/wide
description: "The Chrome DevTools are Chrome's built-in authoring and debugging tool."
title: "Chrome DevTools"
order: 3
---

<div class="wf-subheading wf-devtools-header">
  <div class="page-content">
      <h1><img src="images/chrome-devtools-logo.png" alt="">Chrome DevTools</h1>
  </div>
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col">
      <p>The Chrome DevTools are a set of web authoring and debugging tools built into Google Chrome. Use the DevTools to efficiently track down layout issues, set JavaScript breakpoints, and get insights for code optimization.</p>
      <div class="note">
        Note: Use <a href="https://tools.google.com/dlpage/chromesxs">Chrome Canary</a> for the latest DevTools.
      </div>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <p class="access">To access the DevTools:</p>
      <ul>
        <li>Select <strong>Tools > Developer Tools</strong> from the Chrome Menu.</li>
        <li>Right-click on any page element and select Inspect Element.</li>
        <li>Use <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">I</kbd> (or <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">I</kbd> on Mac) (<a href="https://developer.chrome.com/devtools/docs/shortcuts">more shortcuts</a>)</li>
      </ul>
    </div>
  </div>
</div>


## Elements panel: inspect DOM and styles

The Elements panel lets you see everything in one DOM tree, and allows inspection and on-the-fly editing of DOM elements. Use the Elements panel to identify the <abbr title="HyperText Markup Language">HTML</abbr> snippet for some aspect of the page.

[Read more about inspecting the DOM and styles »](/web/tools/iterate/inspect-styles/basics)

## Network panel: monitor network performance

The Network panel provides insights into resources that are requested and downloaded over the network in real time.
Identify requests taking longer than expected to optimize your page.

* [Page load performance](/web/tools/chrome-devtools/profile/network-performance/)

## Sources panel: debug JavaScript with breakpoints

The Sources panel lets you debug your JavaScript code using breakpoints. As the **complexity** of JavaScript applications increase, developers need powerful debugging tools to help quickly discover the cause of an issue and fix it efficiently.

* [Debugging with Breakpoints](/web/tools/chrome-devtools/debug/breakpoints)

## Timeline panel: record and analyze page activity

The **Timeline** panel gives you a complete overview of where time is spent when loading and using your web app or page. All events, from loading resources to parsing JavaScript, calculating styles, and repainting are plotted on a timeline.

* [How to look at performance](/web/tools/chrome-devtools/profile/evaluate-performance/)

## Profiles panel: profile execution time and memory usage

The Profiles panel lets you profile the execution time and memory usage of a web app or page. The provided profilers are:

* The **CPU profiler** shows where execution time is spent in your page's JavaScript functions.
* The **Heap profiler** shows memory distribution by your page's JavaScript objects and related DOM nodes.
* The **JavaScript** profile shows where execution time is spent in your scripts.

* [JavaScript Profiler](/web/tools/chrome-devtools/profile/rendering-tools/js-execution)
* [Heap Profiler](/web/tools/chrome-devtools/profile/memory-problems)

## Resources panel: inspect storage

The **Resources** panel lets you inspect resources that are loaded in the inspected page including IndexedDB or Web SQL databases, local and session storage, cookies, Application Cache, images, fonts, and style sheets.

* [Manage data](/web/tools/chrome-devtools/iterate/manage-data)

## Console panel: interact with page

The **Console** panel provides two primary functions: It logs diagnostic information in the development process and provides a shell prompt which can be used to interact with the document and DevTools.

* [Console](/web/tools/chrome-devtools/debug/console)

## Device Mode

Device mode lets you can change the size of the display to simulate a variety of existing devices, or set it to a size of your own choosing.

It also includes remote debugging to work with actual devices.

* [Device Mode](/web/tools/chrome-devtools/iterate/device-mode)
* [Remote Debugging](/web/tools/chrome-devtools/debug/remote-debugging)



<div class="page-content mdl-grid">

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/console.jpg">
    <h3>Settings &amp; commands</h3>
    <p>Whee</p>
    <ul>
      <li><a href="/web/tools/javascript/command-line/command-line-reference">Command line API</a></li>
      <li><a href="/web/tools/iterate/inspect-styles/shortcuts">Keyboard shortcuts</a></li>
      <li><a href="https://developer.chrome.com/devtools/docs/settings">Settings</a></li>
    </ul>
  </div>

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/timeline.jpg">
    <h3>Extending DevTools</h3>
    <p>Whee</p>
    <ul>
      <li><a href="https://developer.chrome.com/devtools/docs/integrating">Integrating with DevTools and Chrome</a></li>
      <li><a href="https://developer.chrome.com/extensions/devtools">DevTools Extensions API</a></li>
      <li><a href="https://developer.chrome.com/devtools/docs/debugger-protocol">Remote deubgging protocol</a></li>
    </ul>
  </div>

  <div class="mdl-cell--12-col mdl-cell">
    <h4>Why are some docs on another site?</h4>
    <p>While you'll get plenty of information of how to use DevTools here, our old home will stay around for a bit and provide you with info on how to extend DevTools.</p>
  </div>
</div>





