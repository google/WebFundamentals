---
layout: shared/narrow-pages-list
title: "Focus"
description: "Overview of screen focus in accessibility"
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

In this lesson we'll talk about *focus* and how you can manage it in your application. Focus refers to which control on the screen (an input item such as a field, checkbox, button, or link) currently receives input from the keyboard, and from the clipboard when you paste content.

You're probably familiar with focus for text fields. To type into a text field, you click it with the mouse, giving it focus. You may also know that if you press `Tab`, focus moves to the next control on the page. This is a great place to start learning about accessibility because we all know how to use a keyboard, it's easy to relate to and test, and it benefits virtually all users. 

![Keyboard focus](imgs/keyboard-focus.png)

Users with motor impairments, which could be anything from permanent paralysis to a sprained wrist, may rely on a keyboard or switch device to navigate your page, so a good focus strategy is critical to providing a good experience for them.

And for the power users who know every keyboard shortcut on their machine, being able to quickly navigate your site with the keyboard alone will certainly make them more productive.

Thus, a well implemented focus strategy ensures that everyone using your application has a better experience. We'll see in the upcoming lessons that the effort you put into focus is an important basis for supporting assistive technology users and, indeed, all users.
