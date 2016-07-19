---
layout: shared/narrow-pages-list
title: "Accessibility Styling"
description: "Using proper styling to improve accessibility"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 6
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

We've explored two of the crucial pillars of accessibility, focus and semantics. Now let's tackle the third, styling. It's a broad topic that we can cover in three sections.

 - Ensuring that elements are styled to support our accessibility efforts by adding styles for focus and various ARIA states.
 - Styling our UIs for flexibility so they can be zoomed or scaled to accommodate users who may have trouble with small text.
 - Choosing the right colors and contrast to avoid conveying information with color alone.

Generally, any time we focus an element, we rely on the built-in browser focus ring (the CSS *outline* property) to style the element. The focus ring is handy because, without it, it's impossible for a keyboard user to tell which element has the focus. The WebAIM checklist makes a point of this, requiring that "It is visually apparent which page element has the current keyboard focus (i.e., as you tab through the page, you can see where you are)."

However, sometimes the focus ring can look distorted or it may just not fit in with your page design. Some developers remove this style altogether by setting the element's `outline` to `0` or `none`. But without a focus indicator, how is a keyboard user supposed to know which item they're interacting with?

You might be familiar with adding hover states to your controls using the CSS `:hover` *pseudo-class*. For example, you might use `:hover` on a link element to change its color or background when the mouse is over it. Similar to `:hover`, you can use the `:focus` pseudo-class to target an element when it has focus. 

A simple solution to the problem of removing the focus ring, then, is to give your element the same hover and focus styles. This solves the where's-the-focus? problem for keyboard users, while not interfering in any way with mouse users. As usual, improving the accessibility experience improves everyone's experience.

>Another benefit of not using the default focus ring is that different browsers tend to implement focus rings differently; modifying it in a certain way might look fine in one browser but look awful in another.
