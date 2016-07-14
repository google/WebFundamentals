---
layout: updates/post
title: "dialog element: Modals made easy"
description: "Have you ever created your own modal dialog box? Soon, you won't need to ever again; dialog boxes are becoming a part of the web platform."
published_on: 2013-09-23
updated_on: 2013-09-23
authors:
  - agektmr
tags:
  - news
  - dialog
  - semantics
---
Chrome Canary has landed support for the [dialog element](http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#the-dialog-element) behind a flag. The `dialog` element can be used for popups in a web page.


* `show()`: Open dialog.
* `close()`: Close dialog. Takes an optional argument which if present `dialog.returnValue` is set to.
* `showModal()`: Open modal dialog.
* `::backdrop`: Pseudo-element to style background behind a modal dialog.
* `close` event: Fired when a dialog is closed.

**Update on Dec 16th 2013**

The `dialog` element now supports:

* `cancel` event: Fired when the Escape key is pressed on a modal dialog. This event can be canceled using `event.preventDefault()`.
* `autofocus` attribute: The first form control in a modal dialog that has the `autofocus` attribute, if any, will be focused when the dialog is shown. If there is no such element, the first focusable element is focused.
* `form[method="dialog"]`: Only valid inside a dialog. Upon form submission, it closes the dialog and sets `dialog.returnValue` to the value of the submit button that was used.

[Check out details with a live demo and polyfill](http://demo.agektmr.com/dialog/).

Turn it on by enabling "Enable experimental Web Platform features" in about://flags.
