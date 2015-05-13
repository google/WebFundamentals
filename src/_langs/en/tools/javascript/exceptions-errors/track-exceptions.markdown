---
rss: false
layout: article
title: "Track Exceptions"
seotitle: "Track Exceptions"
description: "Chrome provides useful tools that can help you debug a Web Page when it's throwing exceptions or some JavaScript code gives an error."
introduction: "Chrome provides useful tools that can help you debug a Web Page when it's throwing exceptions or some JavaScript code gives an error."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-13
  order: 1
authors:
  - megginkearney
  - flaviocopes
priority: 0
collection: exceptions-errors
key-takeaways:
  track-exceptions:
    - Chrome exposes a lot of useful information when errors and exceptions happen
    - You can turn on Pause on Exceptions to debug the code context when the exception was triggered
    - Use console.trace() to print the current JavaScript call stack
    - Use console.assert() to place assertions in your code and throw exceptions
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.track-exceptions %}

## Tracking exceptions

When something goes wrong, you can open the DevTools console (`Ctrl+Shift+J` / `Cmd+Option+J`) and find a number of JavaScript error messages there. Each message has a link to the file name with the line number you can navigate to.

An example of an exception:
![Exception example](images/track-exceptions-tracking-exceptions.jpg)

### Viewing exception stack trace

There might be several execution paths that lead to the error and it's not always obvious which one of them has happened. **Once DevTools window is opened**, exceptions in the console are accompanied with the **complete JavaScript call stacks**. You can expand these console messages to see the stack frames and navigate to the corresponding locations in the code:

![Exception stack trace](images/track-exceptions-exception-stack-trace.jpg)

### Pause on JavaScript exceptions

You may also want to pause JavaScript execution next time exception is thrown
and inspect its call stack, scope variables and state of your app. A tri-state
stop button at the bottom of the Scripts panel enables you to switch between
different exception handling modes:

![Pause button](images/track-exceptions-pause-gray.png)

You can choose to either pause on all
exception or only on the uncaught ones or you can ignore exceptions altogether.

Pause execution:
![Pause execution](images/track-exceptions-pause-execution.jpg)

## Printing stack traces

Printing log messages to the DevTools console may be very helpful in understanding how your application behaves. You can make the log entries even more informative by including associated stack traces. There are several ways of doing that.

### Error.stack
Each Error object has a string property named stack that contains the stack trace:

![Error.stack example](images/track-exceptions-error-stack.jpg)

### console.trace()
You can instrument your code with console.trace() calls that would print current JavaScript call stacks:

![console.trace() example](images/track-exceptions-console-trace.jpg)

### console.assert()
There is also a way to place assertion in your JavaScript code. Just call console.assert() with the error condition as the first parameter. Whenever this expression evaluates to false you will see a corresponding console record:

![console.assert() example](images/track-exceptions-console-assert.jpg)

## Finding what triggered the exceptions / errors by examining the stack trace

Let's see how to use the tools you've just learned about, and find the real cause of an error.
Here's a simple HTML page that includes two scripts:
![Example code](images/track-exceptions-example-code.png)

When the user clicks on the page, the paragraph changes its inner text, and the callLibMethod() function provided by lib.js is called.

This function prints a console.log, and then calls console.slog, a method not provided by the Console API. This should trigger an error.

When the page is run and you click on it, the error is triggered:
![Error triggered](images/track-exceptions-example-error-triggered.png)

By clicking the arrow you can expand the error message:
![Error message expanded](images/track-exceptions-example-error-message-expanded.png)

The Console tells you the error was triggered in lib.js, line 4, which was called by script.js in the addEventListener callback, which is an anonymous function, in line 3.

This is a very simple example but even the most complicated log trace debugging follow the same process.

{% include modules/nextarticle.liquid %}

{% endwrap %}
