---
layout: shared/narrow
title: "Focus in Complex Components"
description: "Managing focus with complex or custom components"
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

Managing focus when you change something on the page is important, but sometimes you need to manage focus at the control level &mdash; for example, if you're building a custom component.

Consider the native `select` element. It can receive basic focus but, once there, you can use the arrow keys to expose additional functionality like selecting options. If you were building a custom select element, you would want to expose these same kinds of behaviors so that users who rely primarily on the keyboard could still interact with your control.

Knowing which keyboard behaviors to implement can be difficult, but there is a helpful guide you can refer to. The [Accessible Rich Internet Applications (ARIA) Authoring Practices](https://www.w3.org/TR/wai-aria-practices/) document lists types of components and what kinds of keyboard actions they support. We will cover ARIA in more detail later, but for now, let's use the guide to help us add keyboard support to a new component.

Perhaps you're working on a new input element that resembles a set of radio buttons, but with your unique take on appearance and behavior. To determine what kind of keyboard support it needs, you would check the ARIA Design Patterns guide. Section 11 contains a list of design patterns, and in that list is a characteristics table for standard radio buttons, the existing component that most closely matches your new element.

As you can see in the table, one of the common keyboard behaviors that should be supported is the up/down/left/right arrow keys. To add this behavior to the new component, we'll use a technique called *roving focus*.

Roving focus works by setting `tabindex` to -1 for all children except the first. The component then uses a keyboard event listener to determine which key the user presses; when this happens, it sets the previously focused child's `tabindex` to -1, sets the to-be-focused child's `tabindex` to 0, and calls the focus method on it. 

When the user reaches the last (or first, depending on the direction they're moving the focus) child, you will loop around and focus the first (or last) child again.
