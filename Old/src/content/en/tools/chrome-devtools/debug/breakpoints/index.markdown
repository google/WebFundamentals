---
layout: shared/narrow-pages-list
title: "Debug with Breakpoints"
description: "Chrome DevTools includes powerful breakpoint features that help you find and fix logic errors in your JavaScript code."
published_on: 2015-04-14
updated_on: 2015-04-14
order: 2
authors:
  - megginkearney
  - dgash
translation_priority: 0
---

<p class="intro">
  Chrome DevTools includes powerful breakpoint features that help you find and fix logic errors in your JavaScript code. Use different breakpoint types to control exactly what conditions can trigger a pause in script execution.
</p>

As you develop your web page,
you will want to locate and correct bugs in your JavaScript.
But in an executing script,
the erroneous code will almost certainly be processed
before you can identify it.

Pause running JavaScript at various points
so you can determine its progress or examine its variable values.
Chrome DevTools breakpoints let you pause your code
without having to use brute-force statements
such as `alert("ok so far")` or `alert("x = " + x)`.
