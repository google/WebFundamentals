---
rss: false
layout: tools-article
title: "Console API Reference"
seotitle: "Console API Reference"
description: "Write to the console, create JavaScript profiles, and start debugging sessions with the Console API."
introduction: "The Console API provides web applications with methods for writing information to the console, creating JavaScript profiles, and initiating a debugging session."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-12
  order: 6
authors:
  - megginkearney
  - pbakaus
priority: 0
collection: console
---
{% wrap content %}

{% include modules/toc.liquid %}

## console.assert(expression, object)

If the evaluated expression is `false`, the message is written to the console along with a stack trace. In the following example, the assert message is written to the console only when the `document` contains fewer than ten child nodes:

{% highlight js %}
var list = document.querySelector('#myList');
console.assert(list.childNodes.length < 10, "List item count is >= 10");
{% endhighlight %}

![Example of console.assert()](images/assert-failed-list.png)

## console.clear()

Clears the console.

{% highlight js %}
console.clear();
{% endhighlight %}

If *Preserve Logs* is on, `console.clear()` will not do anything in case there's an iframe that calls `console.clear()`, since that would make your debugging process harder. In this case, "Clear console" in the context menu will still work, and actually clear the console.

See also [Clearing the console](./console-ui#working-with-the-console-history).

## console.count(label)

Writes the the number of times that `count()` has been invoked at the same line and with the same label.

In the following example, `count()` is invoked each time the `login()` function is invoked.

{% highlight js %}
function login(user) {
    console.count("Login called");
    // login() code...
}
{% endhighlight %}

![Example of using console.count()](images/count.png)

See [Counting Statement Executions](./track-executions?#counting-statement-executions) for more examples.

## console.debug(object [, object, ...])

This method is identical to [`console.log()`](#consolelogobject--object-).

## console.dir(object)

Prints a JavaScript representation of the specified object. If the object being logged is an HTML element, then the properties of its DOM representation are printed, as shown below:

{% highlight js %}
console.dir(document.body);
{% endhighlight %}

![Example of using console.dir() with an HTML element()](images/consoledir-body.png)

Learn about the functional equivalent object formatter (`%O`) and more in [String substitution and formatting](./console-write#string-substitution-and-formatting).

## console.dirxml(object)

Prints an XML representation of the specified object as it would appear in the Elements panel. For HTML elements, calling this method is equivalent to calling [`console.log()`](#consolelogobject--object-).

{% highlight js %}
var list = document.querySelector("#myList");
console.dirxml(list);
{% endhighlight %}

`%o` acts either as dir or dirxml depending on the object type (non-DOM or DOM).

## console.error(object [, object, ...])

Similar to [`console.log()`](#consolelogobject--object-), `console.error()` additionally includes a stack trace from where the method was called and is styled like an error.

{% highlight js %}
function connectToServer() {
    var errorCode = 1;
    if (errorCode) {
        console.error("Error: %s (%i)", "Server is  not responding", 500);
    }
}
connectToServer();
{% endhighlight %}

![Example of console.error()](images/error-server-not-resp.png)

## console.group(object[, object, ...])

Starts a new logging group with an optional title. All console output that occurs after calling this method and calling `console.groupEnd()` appears in the same visual group.

{% highlight js %}
console.group("Authenticating user '%s'", user);
console.log("User authenticated");
console.groupEnd();
{% endhighlight %}

![Console group example](images/log-group-simple.png)

You can also nest groups:

{% highlight js %}
// New group for authentication:
console.group("Authenticating user '%s'", user);
// later...
console.log("User authenticated", user);
// A nested group for authorization:
console.group("Authorizing user '%s'", user);
console.log("User authorized");
console.groupEnd();
console.groupEnd();
{% endhighlight %}

![Nested logging group examples](images/nestedgroup-api.png)

Learn more about [organizing console output](./console-write?#organizing-console-output).

## console.groupCollapsed(object[, object, ...])

Creates a new logging group that is initially collapsed instead of open, as with `console.group()`.

{% highlight js %}
console.groupCollapsed("Authenticating user '%s'", user);
console.log("User authenticated");
console.groupEnd();
console.log("A group-less log trace.");
{% endhighlight %}

![Creating a collapsed group](images/groupcollapsed.png)

## console.groupEnd()

Closes the logging group that was most recently created with `console.group()` or `console.groupCollapsed()`. See `[console.group()](#consolegroupobject-object)` and `[console.groupCollapsed()](#consolegroupcollapsedobject-object)` for examples.

## console.info(object [, object, ...])

This method is identical in function to [`console.log()`](#consolelogobject--object-), but additionally shows an info icon next to the output.

## console.log(object [, object, ...])

Displays a message in the console. You pass one or more objects to this method, each of which are evaluated and concatenated into a space-delimited string.

Basic example:

{% highlight js %}
console.log("App started");
{% endhighlight %}

### Format specifiers

The first parameter you pass to `log()` may contain _format specifiers_, a string token composed of the percent sign (`%`) followed by a letter that indicates the formatting to be applied. Learn more about format specifiers in [String substitution and formatting](./console-write#string-substitution-and-formatting).

The following example uses the string (`%s`) and integer (`%d`) format specifiers to insert the values contained by the variables `userName` and `userPoints`:

{% highlight js %}
console.log("User %s has %d points", userName, userPoints);
{% endhighlight %}

![Console output styled with %c](images/log-format-specifier.png)

## console.profile([label])

Starts a JavaScript CPU profile with an optional label. To complete the profile, call `console.profileEnd()`. Each profile is added to the Profiles tab.

In the following example a CPU profile is used in a function that we suspect consumes excessive CPU resources.

{% highlight js %}
function processPixels() {
  console.profile("Processing pixels");
  // later, after processing pixels
  console.profileEnd();
}
{% endhighlight %}

## console.profileEnd()

Stops the current JavaScript CPU profiling session if one is in progress and prints the report to the Profiles panel.

{% highlight js %}
console.profileEnd()
{% endhighlight %}

See [console.profile()](#consoleprofilelabel) for an example.

## console.time(label)

Starts a new timer with an associated label. When `console.timeEnd()` is called with the same label, the timer is stopped and the elapsed time displayed in the console. Timer values are accurate to the sub-millisecond.

{% highlight js %}
console.time("Array initialize");
var array = new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
    array[i] = new Object();
};
console.timeEnd("Array initialize");
{% endhighlight %}

![Example of using console.time() and timeEnd()](images/time-duration.png)

Note: The strings you pass to the `time()` and `timeEnd()` methods must match or the timer will not finish.

## console.timeEnd(label)

Stops the timer with the specified label and prints the elapsed time.

For example usage, see [console.time()](#consoletimelabel).

## console.timeStamp([label])

Adds an event to the Timeline during a recording session. This lets you visually correlate your code-generated time stamp to events that are automatically added to the Timeline, like layout and point, for example.

See [Marking the Timeline](./track-executions/#marking-the-timeline) for an example of using `console.timeStamp()`.

## console.trace(object)

Prints a stack trace from the point where the method was called, including links to the specific lines in the JavaScript source. A counter indicates the number of times that `trace()` method was invoked at that point, as shown in the screen shot below.

![Example of a stack trace with counter](images/track-exceptions-console-trace.jpg)

It is also possible to pass in arguments to trace(). For example:

![Example of a stack trace with arguments](images/console-trace-args.png)

## console.warn(object [, object, ...])

This method is like [`console.log()`](#consolelogobject--object-) but also displays a yellow warning icon next to the logged message.

{% highlight js %}
console.warn("User limit reached! (%d)", userPoints);
{% endhighlight %}

![Example of console.warn()](images/log-warn.png)

## debugger

The global `debugger` function causes Chrome to stop program execution and start a debugging session at the line where it was called. It is equivalent to setting a "manual" breakpoint in the Sources tab of Chrome DevTools.

Note: The `debugger` command is not a method of the `console` object.

In the following example the JavaScript debugger is opened when an object's `brightness()` function is invoked:

{% highlight js %}
brightness: function() {
    debugger;
    var r = Math.floor(this.red*255);
    var g = Math.floor(this.green*255);
    var b = Math.floor(this.blue*255);
    return (r * 77 + g * 150 + b * 29) >> 8;
}
{% endhighlight %}

![Example of using debugger command](images/debugger.png)

{% include modules/nextarticle.liquid %}

{% endwrap %}
