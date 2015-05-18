---
rss: false
layout: section
title: "Debug with Breakpoints"
seotitle: "Debug with Breakpoints"
description: "Chrome DevTools includes powerful breakpoint features that help you find and fix logic errors in your JavaScript code. Use different breakpoint types to control exactly what conditions can trigger a pause in script execution."
introduction: "Chrome DevTools includes powerful breakpoint features that help you find and fix logic errors in your JavaScript code. Use different breakpoint types to control exactly what conditions can trigger a pause in script execution."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 1
authors:
  - megginkearney
  - davegash
priority: 0
collection: javascript
panel: sources
id: breakpoints
---

{% wrap content %}

As you develop a web page that contains any significant amount of JavaScript, you will undoubtedly encounter logic errors, or bugs. Of course, you’ll want to locate and correct the bugs but, in an executing script, the erroneous code will almost certainly be processed before you can identify it.

One of the best ways to debug a running JavaScript process is to pause it at various points so you can determine its progress or examine its variable values. Because JavaScript has no built-in facility for this, developers often resort to adding brute-force statements such as `alert("ok so far")` or `alert("x = " + x)`. This kind of pause in execution is called a *breakpoint*.

Breakpoints in Chrome DevTools help you debug your code without resorting to such inelegant tactics. You access the breakpoint features through the Sources panel.

{% endwrap %}