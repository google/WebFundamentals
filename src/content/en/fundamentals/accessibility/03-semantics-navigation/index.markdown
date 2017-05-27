---
layout: shared/narrow-pages-list
title: "Semantics and Navigating Content"
description: "The role of semantics in page navigation"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 4
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

You've learned about affordances, semantics, and how assistive technologies use the accessibility tree to create an alternative user experience for their users. You can see that writing expressive, semantic HTML gives you a lot of accessibility with very little effort, as many standard elements have both the semantics and supporting behavior built in.

In this lesson we'll cover some less obvious semantics that are very important to screen reader users, especially as regards navigation. In a simple page with lots of controls but not much content, it's easy to scan the page to find what you need. But on a content-heavy page, such as a Wikipedia entry or a news aggregator, it's not practical to read through everything from the top down; you need a way to efficiently navigate through the content.

Developers often have the misconception that screen readers are tedious and slow to use, or that everything on the screen has to be focusable for the screen reader to find it. That's often not the case.

One popular screen reader is called VoiceOver, and it is built into the OS X operating system. Mac users can turn on VoiceOver by pressing `Command+F5`. VoiceOver uses keyboard shortcuts to let low-vision users find their way around a web page, discover headings and other important content, and access and activate both intra- and inter-page links.

>You can learn more about VoiceOver at <a href="https://en.wikipedia.org/wiki/VoiceOver" target="_blank">its Wikipedia page</a>. The WebAIM site also has <a href="http://webaim.org/articles/voiceover/" target="_blank">an excellent article</a> that includes many keyboard shortcuts for operating VoiceOver and navigating within a page, and links to additional information.
>
>We will also explore other screen readers, including NVDA, [in a later lesson](/web/fundamentals/accessibility/04-semantics-aria/semaria-four).

Screen reader users often rely on a list of headings to locate information. Most screen readers have easy ways to isolate and scan a list of page headings, an important feature called the *rotor*. Let's see how we can use HTML headings effectively to support this feature.
