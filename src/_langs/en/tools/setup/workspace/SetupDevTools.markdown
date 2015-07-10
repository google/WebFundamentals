---
layout: article
title: "Set Up DevTools"
rss: false
seotitle: "Set Up Chrome Developer Tools (DevTools)"
description: "DevTools provides web developers deep access into the 
internals of the Chrome browser and their web applications. Use Chrome DevTools
 to efficiently track down layout issues, set JavaScript breakpoints, 
and get insights for code optimization."
introduction: "Chrome DevTools provides web developers deep access into the 
internals of the browser and their web application."
authors:
  - dgash
  - kaycebasques
article:
  written_on: 2015-07-10
  updated_on: 2015-07-10
  order: 1
collection: workspace
takeaways:
    - takeaway 1
    - takeaway 2
---

{% wrap content %}

Most good software development environments include features that help developers find and fix bugs, but those features usually focus on one development language, such as C#, Java, or Python. Web developers, however, face a unique challenge in that a working page or app is not coded with a single language, but typically comprises at least three discrete but highly interconnected languages -- HTML, CSS, and JavaScript -- and maybe more. Thus, an integrated debugging environment that covers all the bases is very desirable.

Chrome Developer Tools (DevTools) is a set of debugging features built into the Google Chrome browser. As you develop web pages and applications, DevTools can help you identify and correct HTML, CSS, and JavaScript problems, as well as help you test content, style, and script changes.

{% include modules/takeaway.liquid list=page.takeaways %}

### Accessing DevTools

Open the Chrome menu ![Chrome menu](imgs/chrome_menu_button.png) and choose **More tools** > **Developer tools**, or right-click a page element and choose **Inspect element** from the context menu. The DevTools panel typically opens at the bottom of the main window, but you can change its position with the **Layout** button. Click the Dock to Main button ![Dock to main](imgs/dock_to_main_button.png) to dock the panel on the right side of the main window, click ![Dock to bottom](imgs/dock_to_bottom_button.png) to dock the panel at the bottom of the main window, or click and hold the button and click ![Undock](imgs/undock_button.png) to undock the panel from the main window and open it in a separate window (useful when you need to see more of your page at once).

You can also open and manage DevTools with a variety of keyboard shortcuts. See [this reference page](https://web-central.appspot.com/web/tools/iterate/inspect-styles/shortcuts?hl=en) for a full list of shortcuts and their actions.

### Using DevTools

Working with DevTools can be complex, but generally follows a workflow of identify, change, and test. Here is how you might use the tools in a typical situation.

1. While viewing your web page, open DevTools and position the tools panel as desired.

2. Examine the Sources tab to see the files that make up the site: HTML, CSS, JavaScript, and others.

3. Choose a file and make changes in the DevTools panel; content and style changes are immediately reflected in the web page panel, while script changes are reflected the next time the script runs.

4. You can use powerful features like search and replace, which is supported (even using regular expressions) both within and across files. In scripts, watch expressions, breakpoints, and other debugging features are available.

5. You can also find code that you want to change by approaching from the page elements; begin by inspecting an element, then examine the styles and scripts that apply to it, and backtrack to the rule or function that affects the element.

6. You can save local copies of your changed files for later use, and can even compare saved local files to their original online versions; also, you can revert all or part of your changes at any time.

As you can see, using DevTools even in the most basic ways gives you a rich set of features for examining, changing, and testing your web page's structure, appearance, and behavior.

### What's in DevTools

DevTools has many powerful and flexible capabilities that help you debug your pages. 

Click the **Device Mode** button ![Device mode](imgs/device_mode_button.png) to toggle the page display between full-screen and mobile. In mobile mode, you can change the size of the display to simulate a variety of existing devices, or set it to a size of your own choosing.

The DevTools panel contains a set of tabs, each of which accesses a DevTools section. In the table below, click a section name to open a description page for that section.

**[Meggin: The section titles below need links to their published docs.]**

<table>
  <tr>
    <th>[Section]()</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>[Elements]()</td>
    <td>Explores the real-time page structure (DOM) and all current elements.</td>
  </tr>
  <tr>
    <td>[Network]()</td>
    <td>Displays information about the network operations of the page, including timing data, HTTP request and response headers, cookies, WebSocket data, and more.</td>
  </tr>
  <tr>
    <td>[Sources]()</td>
    <td>Explores the source files -- domains, HTML, JavaScript, and CSS -- from which the page is constructed.</td>
  </tr>
  <tr>
    <td>[Timeline]()</td>
    <td>Chronologically records, displays, and analyzes the page's activity as it occurs.</td>
  </tr>
  <tr>
    <td>[Profiles]()</td>
    <td>Allows you to profile the page's execution time and memory usage to indicate where resources are being used.</td>
  </tr>
  <tr>
    <td>[Resources]()</td>
    <td>Allows you to inspect the page's IndexedDB or Web SQL databases, local and session storage, cookies, Application Cache, images, fonts, and style sheets.</td>
  </tr>
  <tr>
    <td>[Audits]()</td>
    <td>Allows you to run network and performance audits on the page, either on its current state or on a fresh reloaded state.</td>
  </tr>
  <tr>
    <td>[Console]()</td>
    <td>Allows you to log diagnostic information about the page to aid in debugging, and to execute direct commands that interact with the document and DevTools.</td>
  </tr>
</table>

{% endwrap %}
