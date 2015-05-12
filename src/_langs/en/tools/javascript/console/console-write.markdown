---
rss: false
layout: article
title: "Write to Console"
seotitle: "Write to Console in Chrome DevTools"
description: "Console logging is a powerful way to inspect what your page or application does. Let's start with console.log() and explore other advanced usage."
introduction: "Console logging is a powerful way to inspect what your page or application does. Let's start with console.log() and explore other advanced usage"
article:
  written_on: 2015-04-14
  updated_on: 2015-05-12
  order: 2
authors:
  - megginkearney
  - flaviocopes
priority: 0
collection: console
key-takeaways:
  console-write:
    - console.log() is the main console writing function, and has pretty useful options
    - use console.error() and console.warn() too
    - filter the console messages by message type (error, warning, info..) in the Console
    - can use console.group() and console.groupEnd() to group related messages and avoid clutter
    - use console.assert() to show conditional error messages
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.console-write %}

## Writing to the console

The <a href="console-api#consolelogobject-object">console.log()</a> method takes one or more expressions as parameters and writes their current values to the console.

A simple write to the console:

    var a = document.createElement('p');
    a.appendChild(document.createTextNode('foo'));
    a.appendChild(document.createTextNode('bar'));
    console.log("Node count: " + a.childNodes.length);

Display of the example code in the console:
![Basic log](images/console-write-log-basic.png)

Multiple parameters will concatenate into a space-delimited line.

`console.log()` with multiple parameters:

    console.log("Node count:", a.childNodes.length, "and the current time is:", Date.now());

Output of multiple parameter `console.log()`:
![Log Multiple](images/console-write-log-multiple.png)

### Styling console output with CSS

The CSS format specifier allows you to customize the display in the console.
Start the string with the specifier and give the style you wish to apply as the second parameter.

Styling log information example code:

    console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");

Example code output:
![Formatted string](images/console-write-format-string.png)

## Organizing Console output

### Filtering console output

You can filter console output by its severity level by selecting one of the filter options.
Activate filters under the filter funnel icon located in the upper-left corner of the console panel.
The following filter options are available:


| Option   |      Shows                                                       |
|----------|:-----------------------------------------------------------------|
| All      | Shows all console output                                         |
| Errors   | Only show output from `console.error()`                          |
| Warnings | Only show output from `console.warn()`.                          |
| Info     | Only show output from `console.info()`                           |
| Logs     | Only show output from `console.log()`                            |
| Debug    | Only show output from `console.timeEnd()` and `console.debug()`. |

Filter enabled for showing only errors:
![Filtering errors](images/console-write-filter-errors.png)

### Grouping Output

You can group related output together with the group commands.
The [`group()`](https://developer.chrome.com/devtools/docs/console-api#consolegroupobject-object) command takes a single string parameter to set the name of the group.
The console will begin to group all subsequent output together.
To end the grouping you only need to call [`groupEnd()`](https://developer.chrome.com/devtools/docs/console-api#consolegroupobject-object).

Simple grouping example code:

    var user = "jsmith", authenticated = false;
    console.group("Authentication phase");
    console.log("Authenticating user '%s'", user);
    // authentication code here...
    if (!authenticated) {
        console.log("User '%s' not authenticated.", user)
    }
    console.groupEnd();

Example output:
![Simple console group output](images/console-write-group.png)

Log groups may also nest within each other. This is useful to see a large group in smaller pieces at a time.

This example shows a log group for the authentication phase of a login process:

    var user = "jsmith", authenticated = true, authorized = true;
    // Top-level group
    console.group("Authenticating user '%s'", user);
    if (authenticated) {
        console.log("User '%s' was authenticated", user);
        // Start nested group
        console.group("Authorizing user '%s'", user);
        if (authorized) {
            console.log("User '%s' was authorized.", user);
        }
        // End nested group
        console.groupEnd();
    }
    // End top-level group
    console.groupEnd();
    console.log("A group-less log trace.");

Nested groups output in the console:
![Simple console group output](images/console-write-nestedgroup.png)

When you are using groups heavily it can be very useful to not see everything as it happens. For these times you can automatically collapse groups by calling [`groupCollapsed()`](https://developer.chrome.com/devtools/docs/console-api#consolegroupcollapsed) instead of `group()`.

console.groupCollapsed() usage example:

    console.groupCollapsed("Authenticating user '%s'", user);
    if (authenticated) {
        ...
    }
    console.groupEnd();

groupCollapsed() output:
![Initially collapsed group](images/console-write-groupcollapsed.png)

## Errors and Warnings

Errors and warnings act the same way as normal logging. The difference is `error()` and `warn()` have styles to bring attention to them. The [`console.error()`](https://developer.chrome.com/devtools/docs/console-api#consoleerrorobject-object) method displays a red icon along with red message text. The [`console.warn()`](https://developer.chrome.com/devtools/docs/console-api#consolewarnobject-object) method displays a yellow warning icon with the message text.

### Using console warn and error methods.

Using the `error()` method:

    function connectToServer() {
        console.error("Error: %s (%i)", "Server is  not responding",500);
    }
    connectToServer();

How `connectToServer()` displays in the console:
![Error example output](images/console-write-error-server-not-resp.png)

Using the `warn()` method:

    if(a.childNodes.length < 3 ) {
        console.warn('Warning! Too few nodes (%d)', a.childNodes.length);
    }

Example warning output:
![Warn example](images/console-write-warning-too-few-nodes.png)


## Assertions

The [`console.assert()`](https://developer.chrome.com/devtools/docs/console-api#consoleassertexpression-object) method conditionally displays an error string (its second parameter) only if its first parameter evaluates to `false`.

### A simple assertion and how it displays

The following code will cause an error message in the console only if the number of child nodes belonging to the `list` element is greater than 500.

    console.assert(list.childNodes.length < 500, "Node count is > 500");

How an assertion failure displays in the console:
![Assertion failed](images/console-write-assert-failed.png)

## String substitution and formatting

The first parameter passed to any of the logging methods may contain one or more format specifiers. A format specifier consists of a `%` symbol followed by a letter that indicates the formatting that applies to the value. The parameters following the string apply to the placeholders in order.

The following example uses the string and digit formatters to insert values into the output string. You will see Sam has 100 points in the console.

    console.log("%s has %d points", "Sam", 100);

The full list of format specifiers are as follows:

| Specifier | Output                                                                            |
|-----------|:----------------------------------------------------------------------------------|
| %s        | Formats the value as a string                                                     |
| %i or %d  | Formats the value as an integer                                                   |
| %f        | Formats the value as a floating point value                                       |
| %o        | Formats the value as an expandable DOM element. As seen in the Elements panel     |
| %O        | Formats the value as an expandable JavaScript object                              |
| %c        | Applies CSS style rules to the output string as specified by the second parameter |

This example uses the digit specifier to format the value of `document.childNodes.length`. It also uses the floating point specifier to format the value of `Date.now()`.

The code:

    console.log("Node count: %d, and the time is %f.", document.childNodes.length, Date.now());

The output of the previous code sample:
![Example subsitution output](images/console-write-log-multiple.png)


TBD. Not sure what to do with “Formatting DOM elements as JavaScript objects”. It seems a little bit out of place in this page, and yet it’s not enough to get it’s own page. Gonna wait to figure this out while writing the doc.

{% include modules/nextarticle.liquid %}

{% endwrap %}
