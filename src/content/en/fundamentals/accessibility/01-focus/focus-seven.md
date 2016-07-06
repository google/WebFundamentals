---
layout: shared/narrow
title: "Accessibility Codelab"
description: "Accessibility Codelab"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 13
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

# Offscreen Content
Earlier we discussed making sure that elements appear in the DOM in a way that makes sense for the tab order. But what if you have content that isn't on screen yet, but still needs to be in the DOM, such as a slide-in/slide-out panel? When you have elements like this that receive focus, it can seem as if focus is disappearing and reappearing as the user tabs around, clearly an undesirable effect. Ideally, we should prevent the panel from gaining focus when it's offscreen, and only allow it to be focused when the user is able to interact with it.

Sometimes you may need to do a bit of detective work to figure out where focus has gone. You can use `document.activeElement` from the console and figure out which element is currently focused. 

>Another tool at your disposal is the [Accessibility Developer Tools extension](https://chrome.google.com/webstore/search/accessibility%20developer%20tools), which can be installed from the Chrome Web Store. The extension offers an audit that can run against your entire site and alert you of any accessibility issues, and an accessibilities tab in the elements panel for inspecting elements and learning about their semantic information.
>
>In this example, when the focus ring disappears, you can either use `document.activeElement` from the console, or you can run the accessibility audit to actively check for other things you may have overlooked.

Once you know which offscreen element is being focused, you can set it to `display: none` or `visibility: hidden`, and then set it back to `display: block` or `visibility: visible` before showing it to the user. You could even give the element a tabindex of -1 and call focus on it when it appears on screen, although you must be careful with this approach because the element would still be visible to screen readers.

Here's a sample page where the focus seems to get lost as we tab around. It is probably focusing something offscreen, but exactly which element isn't obvious.

[The Accessibility Blog sample page](http://robdodson.github.io/udacity-a11y/lesson2-focus/04-offscreen-content/)

Tabbing through the page, it seems that focus jumps out of order somewhere after the navigation links. If you use `document.activeElement` (or run the accessibility audit), you can see that the item stealing focus is a button with a class of "close". Looking in the source, there is some markup for a modal window and, sure enough, there's a button with `class="close"` in there. 

Because you aren't currently displaying that modal, you can update the CSS to set anything with `class="modal"` to `display: none`. That will opt it &mdash; and all of its children &mdash; out of the tab order. When you want to display the modal you can override that style, and its elements will have a normal tab order.
