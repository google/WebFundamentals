---
layout: shared/narrow
title: "Accessibility Codelab"
description: "Accessibility Codelab"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 8
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

# What is Focus?

Focus determines where keyboard events go in the page at any given moment. For instance, if you focus a text input field and begin typing, the input field receives the keyboard events and displays the characters you type. While it has focus, it will also receive pasted input from the clipboard.

The currently focused item is often indicated by a *focus ring*, the style of which depends on both the browser and on any styling the page authors have applied. Chrome, for instance, typically highlights focused elements with a blue border, whereas Firefox uses a dashed border.

Some users drive their computer entirely with the keyboard or other input device. For those users, focus is critical; it's their primary means of reaching everything on the screen. For that reason, the Web AIM checklist states in section 2.1.1 that all page functionality should be available using the keyboard, unless it's something you cannot do with a keyboard, such as freehand drawing.

As a user, you can control which element is currently focused using `Tab`, `Shift+Tab`, or the arrow keys. On Mac OSX this works a little differently: while Chrome always lets you navigate with `Tab`, you'll need to press `Option+Tab` to change focus in other browsers like Safari. (You can change this setting in the Keyboard section of System Preferences.)

The order in which focus proceeds, forward and backward, through the page via `Tab` is called, not surprisingly, the *tab order*. Ensuring that you design your page with a logical tab order is an important step that we'll cover later.

Built-in interactive HTML elements like text fields, buttons, and select lists are *implicitly focusable*, meaning they are automatically inserted into the tab order and have built-in keyboard event handling without developer specification. But not all elements are focusable; paragraphs, divs, and various other page elements are not focused as you tab through the page, and that's by design. There's no need to focus something if the user can't interact with it.
