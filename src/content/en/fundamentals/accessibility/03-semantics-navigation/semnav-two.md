---
layout: shared/narrow
title: "Accessibility Codelab"
description: "Accessibility Codelab"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 24
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

# Using Headings Effectively

First, let's reiterate an ealier point: *DOM order matters*, not only for focus order but for screen reader order. As you experiment with screen readers like VoiceOver and ChromeVox Lite, you'll notice how the heading list follows the DOM order rather than the visual order. 

This is true for screen readers in general. Because the screen reader is interacting with the accessibility tree, which is based directly on the DOM tree, the order a screen reader perceives is directly based on the DOM order. That means an appropriate heading structure becomes more important than ever.

>Tip: Paste the following JavaScript snippet into the Chrome DevTools console to generate a list of headings in a page.

```javascript
for (var i = 0, headings = $$('h1,h2,h3,h4,h5,h6'); i < headings.length; i++) console.log(headings[i].textContent.trim() + " " + headings[i].tagName, headings[i])
```
In most well-structured pages, the heading levels are nested to indicate parent-child relationships among content blocks. The WebAIM checklist repeatedly refers to this technique.

 - 1.3.1 mentions "Semantic markup is used to designate headings"
 - 2.4.1 mentions heading structure as a technique for bypassing blocks of content
 - 2.4.6 discusses some details for writing useful headings
 - 2.4.10 states "individual sections of content are designated using headings, where appropriate"

Not all headings are visible on-screen. Wikipedia, for instance, uses a technique that places some headings off-screen to specifically make them accessible *only* to screen readers and other assistive technology. The WebAIM site discusses this technique at length in [this article](http://webaim.org/techniques/css/invisiblecontent/).

For complex applications, this can be a good way to accommodate headings when the visual design doesn't require or have room for a visible heading. 

>Caveat: It's important not to go overboard with this technique. Remember that assistive technology users may also be able to see the screen for themselves, so going too far down the path of creating "screen reader only" content may actually degrade the user experience for some users. It can also create a maintenance headache for you later.










