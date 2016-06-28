---
layout: shared/narrow
title: "Accessibility Codelab"
description: "Accessibility Codelab"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 35
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

# Semantics and ARIA Wrap-up

ARIA allows us to express an extremely broad range of semantic concepts via the use of HTML attributes.

Obviously, ARIA is a very complex topic and it can take a long time to learn all of the precise details of the best use of ARIA roles, states, and properties, and special roles and attributes like `aria-live`.

The [ARIA practices document](http://rawgit.com/w3c/aria/master/practices/aria-practices.html) is a great place to get information on ARIA best practices and design patterns, and the [ARIA spec](https://www.w3.org/TR/wai-aria/) has all the nitty gritty details on what the roles and attributes do, if you need to take a deeper dive. Then, like any skill, it's a matter of experimentation, practice, and persistence. There is no substitute for trying things out with real-world assistive technology, especially screen readers. And keep an eye out, because browsers are also developing native features that will start to make all of this easier.

However, it bears repeating that if you don't need to use ARIA, you can just... not use it! Implicit HTML semantics can get you a long way, and will save you a lot of effort in re-implementing the semantics and behaviors of many standard user experience patterns.

This wraps up our discussion of semantics. It's been a long journey, but we're not quite done with the course yet &mdash; we need to make sure that the visual UI is usable for everyone as well. So, in the next lesson, we'll discuss *styling* and the role it can play in accessibility.
