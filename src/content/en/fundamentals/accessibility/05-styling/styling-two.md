---
layout: shared/narrow
title: "Input Modality"
description: "Styling input elements for proper focus"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 2
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

For native elements like `button`, browsers implement behaviors that let them detect whether the element was interacted with via a mouse click or a keyboard press, and only display the focus ring for keyboard interaction. The logic here is that mouse users are less likely to need the focus ring because they know what element they clicked.

But where does that leave us? Unfortunately there isn't currently any single, cross-browser solution that yields this same behavior. But there are some options.

In Firefox, the `:-moz-focusring` CSS pseudo-class allows you to write a focus style that is only applied if the element is focused via the keyboard, quite a handy feature. While this pseudo-class is currently only supported in Firefox, there is currently work going on to add it to other browsers. By the time you read this, it may be implemented in your favorite browser.

There is also [this great article by Alice Boxhall](http://radar.oreilly.com/2015/08/proposing-css-input-modailty.html) that explores the topic of modality and contains prototype code for differentiating between mouse and keyboard input. You can use her solution today, and then include the focus ring pseudo-class later when it has more widespread support.

Finally, you can use ARIA styles to indicate control states. When you build components, it's common practice to reflect their state, and thus their appearance, using CSS classes controlled with JavaScript.

Fox example, consider a toggle button that goes into a "pressed" visual state when clicked and retains that state until it is clicked again. To style the state, your JavaScript might add a `pressed` class to the button. And, because you want good semantics on all your controls, you would also set the `aria-pressed` state for the button to `true`.

A useful technique to employ here is to remove the class altogether, and just use the ARIA attributes to style the element. Now you can update the CSS selector for the pressed state of the button from this

```CSS
.toggle.pressed { ... }
```

to this.

```CSS
.toggle[aria-pressed="true"] { ... }
```

This creates both a logical and a semantic relationship between the ARIA state and the element's appearance, and cuts down on extra code as well.
