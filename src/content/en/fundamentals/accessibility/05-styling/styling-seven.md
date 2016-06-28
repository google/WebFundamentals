---
layout: shared/narrow
title: "Accessibility Codelab"
description: "Accessibility Codelab"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 42
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

# High-contrast Mode

High-contrast mode allows a user to invert foreground and background colors, which may help text stand out better. For someone with a low vision impairment, high -contrast mode can make it much easier to navigate the content on the page. There are a few ways to get a high-contrast setup on your machine.

Operating systems like Mac OSX and Windows offer high-contrast modes that can be enabled for everything at the system level. Or users can install an extension, like the [Chrome High Contrast extension](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph?hl=en-US) to only enable high-contrast in that specific app.

A useful exercise is to turn on high-contrast settings and verify that all of the UI in your application is still visible.

For example, a navigation bar might use a subtle background color to indicate which page is currently selected. If you view it in high-contrast extension, that subtlety completely disappears, and with it goes the reader's understanding of which page is active.

Similarly, if you consider the example from the previous lesson, the red underline on the invalid phone number field might be displayed in a bright blue-green color.

If you are meeting the contrast ratios covered in the previous lessons you should be fine when it comes to supporting high-contrast mode. But for added peace of mind, consider installing the Chrome High Contrast extension and giving your page a once-over just to check that everything works, and looks, as expected.
