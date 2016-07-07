---
layout: shared/narrow
title: "Implicit Semantics"
description: "Using the implicit semantics of ARIA roles"
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

Certain ARIA roles have implicit, or default, semantics.

`alert` is an example of a role that has implicit aria-live semantics. An `alert` is implicitly `aria-live=assertive` and `aria-atomic=true`, meaning that its presence should be immediately announced to the user when it is added to the page.

There are also special roles, `application` and `document`, that may affect the way assistive technologies interact with a region.

The `application` role indicates that the region within the element with that role should be treated as an application, and that the assistive technology should not try to treat it as a document. This may mean that the assistive technology no longer intercepts certain keystrokes, instead allowing the page to handle everything.

Conversely, the `document` role indicates that that region should be treated as a document, and that the screen reader should allow the user to use their normal document browsing shortcuts. 
