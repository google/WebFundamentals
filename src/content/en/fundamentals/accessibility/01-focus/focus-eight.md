---
layout: shared/narrow
title: "Accessibility Codelab"
description: "Accessibility Codelab"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 14
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

# Modals and Keyboard Traps

Sometimes when you're managing focus you can get into a situation you can't get out of. Consider an autocomplete widget that tries to manage focus and captures the tab behavior, but prevents the user from leaving it until it's complete. This is a *keyboard trap*, and it can be very frustrating for the user. Section 2.1.2 of the Web AIM checklist addresses this issue, stating that keyboard focus should never be locked or trapped at one particular page element. The user should be able to navigate to and from all page elements using only the keyboard.

Oddly, there are times when this behavior is actually desirable, like in a modal window. Normally you don't want the user to access any of the content behind it. You might add an overlay to cover the page, but that doesn't stop keyboard focus from accidentally traveling outside the modal. In instances like this you can implement a temporary keyboard trap to ensure that you trap focus while the modal is displaying and restore it to the previously-focused item when the modal is closed.

>There are some proposals on how to make this easier for developers, including the `<dialog>` element, but they don't yet have widespread browser support.

Consider a modal dialog represented by a `div` that contains a few elements, and another `div` that represents a background overlay. Let's walk through the basic steps we would take to implement a temporary keyboard trap in this situation.

 1. Using `document.querySelector`, select the modal and overlay divs and store their references.
 1. As the modal opens, store a reference to the element that was focused when the modal was opened so you can return focus to that element.
 1. Use a *keydown listener* to grab keys as they are pressed while the modal is open. You could also listen for a click on the background overlay, and close the modal if the user clicks it.
 1. Next, get the collection of focusable elements within the modal. The first and last focusable elements will act as "sentinels" to let you know when to loop focus forward or backward to stay inside the modal.
 1. Display the modal window and focus the first focusable element.
 1. As the user presses `Tab` or `Shift+Tab`, move focus forward or backward, looping at the last or first elements as appropriate.
 1. If the user presses `Esc`, close the modal. This is very helpful because it allows the user to close the modal without searching for a specific close button, and it benefits even users who are using a mouse. 
 1. When the modal is closed, hide it and the background overlay, and restore focus to the previously-focused element saved earlier.

This procedure will give you a usable, non-frustrating modal window that everyone can use effectively.
