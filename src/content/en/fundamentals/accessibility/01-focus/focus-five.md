---
layout: shared/narrow
title: "Using tabindex"
description: "Modifying the DOM order with tabindex"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 5
translation_priority: 0
authors:
  - megginkearney
  - dgash
key-takeaways:
  tldr: 
    - "Learn what accessibility means and how it applies to web development."
    - "Learn how to make web sites accessible and usable for everyone."
    - "Learn how to include basic accessibility with minimal development impace."
    - "Learn what HTML features are available and how to use them to improve accessibility."
    - "Learn about advanced accessibility techniques for creating polished accessibility experiences."
notes:
  efficiency:
    - "Understanding the accessibility issue, its scope, and its impact can make you a better web developer."
  problem-solving:
    - "Catching, identifying, and removing potential accessibility roadblocks before they happen can improve your development process and reduce maintenance requirements."
---

The default tab order provided by the DOM position of native elements is convenient, but there are times when you'll want to modify the tab order, and physically moving elements in the HTML isn't always an optimal (or even a feasible) solution. For these cases you can use the `tabindex` HTML attribute to explicitly set an element's tab position.

`tabindex` can be applied to any element (although it is not necessarily useful on every element), and takes a range of positive integer values. Using `tabindex`, you can specify an explicit order for focusable page elements, insert an otherwise unfocusable element (like a button made from a `div`) into the tab order, and remove elements from the tab order. Like `focus`, `taborder` can also be controlled programmatically. See [this MDN page](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) for more details. 

Take care when attempting to manage focus with `tabindex`. Users who depend on screen readers typically navigate a page's DOM linearly, and an artificially manipulated tab order can interfere with the DOM order and make the page difficult or impossible to use.

This is particularly true of non-input elements like headers, images, or article titles. Adding `tabindex` to those kinds of elements is counter-productive. If possible, it's best to arrange your source code so the DOM sequence provides a logical tab order. If you do use `tabindex`, restrict it to interactive controls like buttons, tabs, dropdowns, and text fields &mdash; elements the user might expect to provide input to.

Don't worry about screen reader users missing important content because it doesn't have a `tabindex`. Even if the content is very important, like an image, if it's not something the user can interact with, there's no reason to make it focusable. Screen reader users can still understand the content of the image so long as you provide proper `alt` attribute support, which we'll cover shortly.

Here's a scenario where `tabindex` is not only useful, but necessary. You might be building a robust single page with different content sections, not all of which are simultaneously visible. In this kind of page, clicking a navigation link might change the content without doing a page refresh.

When this happens, you would probably identify the selected content area, give it a `tabindex` of `-1` so that it doesn't appear in the natural tab order, and call its `focus` method. This technique, called *managing focus*, keeps the user's interactive context in sync with the site's visual representation (content).
