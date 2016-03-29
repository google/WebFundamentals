---
layout: shared/narrow
title: "Console API Reference"
description: "Use the Console API to write information to the console, 
create JavaScript profiles, and start a debugging session."
updated_on: 2016-03-22
order: 6
authors:
  - kaycebasques
  - megginkearney
  - pbakaus
translation_priority: 0
related-guides:
  organizing:
    -
      title: "Organizing console output"
      href: tools/chrome-devtools/debug/console/console-write#organizing
  formatting:
    -
      title: "String substitution and formatting"
      href: tools/chrome-devtools/debug/console/console-write#string-substitution-and-formatting
  timeline:
    -
      title: "Marking the Timeline"
      href: tools/chrome-devtools/debug/console/track-executions#marking-the-timeline
---

<p class="intro">Use the Console API to write information to the console, 
create JavaScript profiles, and start a debugging session.</p>

{% include shared/toc.liquid %}

## console.assert(expression, object) {#assert}

Writes an [error](#error) to the console when the evaluated expression is 
`false`. 

{% highlight js %}
function greaterThan(a,b) {
  console.assert(a > b, {"message":"a is not greater than b","a":a,"b":b});
}
greaterThan(5,6);
{% endhighlight %}

![console.assert() example](images/assert.png)

## console.clear() {#clear}

Clears the console.

{% highlight js %}
console.clear();
{% endhighlight %}

If the [**Preserve log**](console-ui#preserve-log) checkbox is enabled, 
`console.clear()` is disabled. However, pressing the **clear console** button 
(![clear console button](images/clear-console-button.png){:.inline})
or typing the shortcut <kbd>Ctrl</kbd>+<kbd>L</kbd> while the Console is in
focus still works. 

See [Clearing the console](console-ui#clearing) for more information.

## console.count(label) {#count}

Writes the the number of times that `count()` has been invoked at the same 
line and with the same label.

{% highlight js %}
function login(name) {
  console.count(name + ' logged in');
}
{% endhighlight %}

![console.count() example](images/count.png)

See [Counting Statement Executions][cse] for more examples.

[cse]: track-executions#counting-statement-executions

## console.debug(object [, object, ...])

Identical to [`console.log()`](#log).

## console.dir(object) {#dir}

Prints a JavaScript representation of the specified object. If the object 
being logged is an HTML element, then the properties of its DOM representation 
are printed, as shown below:

{% highlight js %}
console.dir(document.body);
{% endhighlight %}

![`console.dir()` example](images/dir.png)

Learn about the functionally equivalent object formatter (`%O`) and more 
in [String substitution and formatting][of].

[of]: console-write#string-substitution-and-formatting

## console.dirxml(object)

Prints an XML representation of the descendant elements of `object` if 
possible, or the JavaScript representation if not. Calling `console.dirxml()`
on HTML and XML elements is equivalent to calling [`console.log()`](#log).

{% highlight js %}
console.dirxml(document);
{% endhighlight %}

![console.dirxml() example](images/dirxml.png)

## console.error(object [, object, ...]) {#error}

Prints a message similar to [`console.log()`](#log), styles the 
message like an error, and includes a stack trace from where the method was 
called.

{% highlight js %}
console.error('error: name is undefined');
{% endhighlight %}

![console.error() example](images/error.png)

## console.group(object[, object, ...])

Starts a new logging group with an optional title. All console output that
occurs after `console.group()` and before `console.groupEnd()` is visually
grouped together. 

{% highlight js %}
function name(obj) {
  console.group('name');
  console.log('first: ', obj.first);
  console.log('middle: ', obj.middle);
  console.log('last: ', obj.last);
  console.groupEnd();
}

name({"first":"Wile","middle":"E","last":"Coyote"});
{% endhighlight %}

![console.group() example](images/group.png)

You can also nest groups:

{% highlight js %}
function name(obj) {
  console.group('name');
  console.log('first: ', obj.first);
  console.log('middle: ', obj.middle);
  console.log('last: ', obj.last);
  console.groupEnd();
}

function doStuff() {
  console.group('doStuff()');
  name({"first":"Wile","middle":"E","last":"coyote"});
  console.groupEnd();
}

doStuff();
{% endhighlight %}

![nested console.group() example](images/nested-group.png)

{% include shared/related_guides.liquid inline=true list=page.related-guides.organizing %}

## console.groupCollapsed(object[, object, ...])

Creates a new logging group that is initially collapsed instead of open. 

{% highlight js %}
console.groupCollapsed('status');
console.log("peekaboo, you can't see me");
console.groupEnd();
{% endhighlight %}

## console.groupEnd() {#groupend}

Closes a logging group. See [`console.group`](#group) for an example.

## console.info(object [, object, ...])

Prints a message like [`console.log()`](#log) but also shows an icon (blue
circle with white "i") next to the output. 

## console.log(object [, object, ...]) {#log}

Displays a message in the console. Pass one or more objects to this method.
Each object is evaluated and concatenated into a space-delimited string.

{% highlight js %}
console.log('Hello, Logs!');
{% endhighlight %}

### Format specifiers {#format-specifiers}

The first object you pass can contain one or more **format specifiers**. A
format specifier is composed of the percent sign (`%`) followed by a letter
that indicates the formatting to apply. 

{% include shared/related_guides.liquid inline=true list=page.related-guides.formatting %}

## console.profile([label]) {#profile}

Starts a JavaScript CPU profile with an optional label. To complete the 
profile, call `console.profileEnd()`. Each profile is added to the **Profiles**
panel.

{% highlight js %}
function processPixels() {
  console.profile("processPixels()");
  // later, after processing pixels
  console.profileEnd();
}
{% endhighlight %}

## console.profileEnd() {#profileend}

Stops the current JavaScript CPU profiling session if one is in progress and 
prints the report to the **Profiles** panel.

See [`console.profile()`](#profile) for an example.

## console.time(label) {#time}

Starts a new timer with an associated label. When `console.timeEnd()` is 
called with the same label, the timer is stopped and the elapsed time is
displayed in the console. Timer values are accurate to the sub-millisecond.
The strings passed to `time()` and `timeEnd()` must match or else the timer 
will not finish.

{% highlight js %}
console.time("Array initialize");
var array = new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
}
console.timeEnd("Array initialize");
{% endhighlight %}

![console.time() example](images/time.png)

## console.timeEnd(label) {#timeend}

Stops the current timer if one is in progress and prints the timer label 
followed by the elapsed time to the Console. 

See [`console.time()`](#time) for an example. 

## console.timeStamp([label]) {#timestamp}

Adds an event to the **Timeline** during a recording session. 

{% highlight js %}
console.timeStamp('check out this custom timestamp thanks to console.timeStamp()!');
{% endhighlight %}

![console.timeStamp() example](images/timestamp.png)

{% include shared/related_guides.liquid inline=true list=page.related-guides.timeline %}

## console.trace(object) {#trace}

Prints a stack trace from the point where the method was called. 

    console.trace();

![console.trace() example](images/trace.png)

## console.warn(object [, object, ...]) {#warn}

Prints a message like [`console.log()`](#log), but also displays a yellow 
warning icon next to the logged message.

    console.warn('user limit reached!');

![console.warn() example](images/warn.png)
