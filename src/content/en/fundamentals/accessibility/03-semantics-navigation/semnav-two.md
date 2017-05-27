---
layout: shared/narrow
title: "Using Headings Effectively"
description: "The role of heading structure in accessibility"
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

First, let's reiterate an ealier point: *DOM order matters*, not only for focus order but for screen reader order. As you experiment with screen readers like VoiceOver and ChromeVox, you'll find the heading list follows the DOM order rather than the visual order. 

This is true for screen readers in general. Because screen readers interact with the accessibility tree, and the accessibility tree is based on the DOM tree, the order a screen reader perceives is thus directly based on the DOM order. This means that an appropriate heading structure is more important than ever.

>Tip: Paste the following JavaScript snippet into the Chrome DevTools console to generate a list of headings in a page.

`for (var i = 0, headings = $$('h1,h2,h3,h4,h5,h6'); i < headings.length; i++) console.log(headings[i].textContent.trim() + " " + headings[i].tagName, headings[i])`

In most well-structured pages, the heading levels are nested to indicate parent-child relationships among content blocks. The <a href="http://webaim.org/standards/wcag/checklist" target="_blank">WebAIM checklist</a> repeatedly refers to this technique.

 - 1.3.1 mentions "Semantic markup is used to designate headings"
 - 2.4.1 mentions heading structure as a technique for bypassing blocks of content
 - 2.4.6 discusses some details for writing useful headings
 - 2.4.10 states "individual sections of content are designated using headings, where appropriate"

Not all headings are visible on-screen. Wikipedia, for instance, uses a technique that deliberately places some headings off-screen to specifically make them accessible *only* to screen readers and other assistive technology. The WebAIM site discusses this technique at length in <a href="http://webaim.org/techniques/css/invisiblecontent/" target="_blank">this article</a>.

For complex applications, this can be a good way to accommodate headings when the visual design doesn't require or have room for a visible heading. 

>Caveat: It's important not to go overboard with this technique. Remember that assistive technology users may also be able to see the screen for themselves, so going too far down the path of creating "screen reader only" content may actually degrade the user experience for some users. It can also create a maintenance headache for you later.
