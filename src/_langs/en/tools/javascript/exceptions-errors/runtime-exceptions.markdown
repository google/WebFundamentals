---
rss: false
layout: article
title: "Handle Exceptions at Runtime"
seotitle: "Handle Exceptions at Runtime"
description: "Chrome exposes the window.onerror handler function, called whenever an error happens in the JavaScript code execution."
introduction: "How to intercept runtime errors, and catch JavaScript errors and exceptions."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-13
  order: 2
authors:
  - megginkearney
  - flaviocopes
priority: 0
collection: exceptions-errors
---
{% wrap content %}

## Handling exceptions at runtime using window.onerror

Chrome supports setting a handler function to window.onerror. Whenever a JavaScript exception is thrown in the window context and is not caught by any try/catch block, the function will be invoked with the exception's message, the URL of the file where the exception was thrown and the line number in that file passed as three arguments in that order.

You may find it convenient to set an error handler that would collect information about uncaught exceptions and report it back to your server using an AJAX POST call, for example. In this way you can for example log all the errors happening on the users browsers, and be notified about them.

Example of using window.onerror:
![Example of window.onerror handler](images/runtime-exceptions-window-onerror.jpg)

{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
