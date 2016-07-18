---
layout: shared/narrow
title: "Off screen Content"
description: "Managing tab order for off screen content"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 7
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

Earlier we discussed making sure that elements appear in the DOM in a way that the default tab order makes sense. But what if you have content that isn't currently displayed, yet still needs to be in the DOM, such as a slide-in panel? When you have elements like this that receive focus when they're off screen, it can seem as if the focus is disappearing and reappearing as the user tabs through the page &mdash; clearly an undesirable effect. Ideally, we should prevent the panel from gaining focus when it's off screen, and only allow it to be focused when the user can interact with it.

Sometimes you need to do a bit of detective work to figure out where focus has gone. You can use `document.activeElement` from the console to figure out which element is currently focused. 

>Another tool at your disposal is the <a href="https://chrome.google.com/webstore/search/accessibility%20developer%20tools" target="_blank">Accessibility Developer Tools extension</a>, available on the Chrome Web Store. The extension offers an audit that can run against your entire site and alert you of any accessibility issues, and an accessibilities tab in the elements panel for inspecting elements and learning about their semantic information.
>
>In this example, when the focus ring disappears, you can either use `document.activeElement` from the console, or you can run the accessibility audit to actively check for other things you may have overlooked.

Once you know which off screen element is being focused, you can set it to `display: none` or `visibility: hidden`, and then set it back to `display: block` or `visibility: visible` before showing it to the user. You could even give the element a `tabindex` of -1 and call focus on it when it appears on screen (although you should be careful with this approach, because the element would still be visible to screen readers).

Here's a sample page where the focus seems to get lost as you tab around. It is probably focusing something off screen, but exactly which invisible element is grabbing the focus isn't obvious.

<a href="http://robdodson.github.io/udacity-a11y/lesson2-focus/04-offscreen-content/" target="_blank">The Accessibility Blog sample page</a>

Tabbing through the page, it seems that focus jumps out of order somewhere after the navigation links. If you use `document.activeElement` or run the accessibility audit, you can see that the item stealing focus is a button with a class of "close". Looking at the source, you'll find that there is some markup for a modal window and, sure enough, there's a button with `class="close"` applied. 

Because you aren't currently displaying that modal, you can update the CSS to set anything with `class="modal"` to `display: none`. That will opt it, and all of its children, out of the tab order. Then when you want to display the modal you can override that style, and its elements will have a normal tab order.
