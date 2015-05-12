---
rss: false
layout: article
title: "Track Executions in Console"
seotitle: "Track Executions in Chrome DevTools Console"
description: "You can take advantage of the Console API to measure execution times and count statement executions."
introduction: "You can take advantage of the Console API to measure execution times and count statement executions."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-12
  order: 4
authors:
  - megginkearney
  - flaviocopes
priority: 0
collection: console
key-takeaways:
  track-executions:
    - Use console.time() and console.timeEnd() to track time elapsed between code execution points
    - Use console.count() to count how many times the same string is passed to that function
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.track-executions %}

## Measure execution times

### Measuring how long something takes

A timer starts by calling the [`time()`](https://developer.chrome.com/devtools/docs/console-api#consoletimelabel) method. You must pass a string to the method to identify the time marker.
When you want to end the measurement call [`timeEnd()`](https://developer.chrome.com/devtools/docs/console-api#consoletimeendlabel) and pass it the same string passed to the initializer.
The console logs the label and time elapsed when the `timeEnd()` method fires.

Example code and output for timing JavaScript execution:

    console.time("Array initialize");
    var array= new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
        array[i] = new Object();
    };
    console.timeEnd("Array initialize");

Output in the console:
![Time elapsed](images/track-executions-time-duration.png)

When a [Timeline](https://developer.chrome.com/devtools/docs/timeline) recording is taking place during a `time()` operation it will annotate the timeline as well.
This is useful when tracing what your application does and where it comes from.

How an annotation on the timeline looks from `time()`:
![Time annotation on timeline](images/track-executions-time-annotation-on-timeline.png)

### Marking the Timeline

The [Timeline panel](https://developer.chrome.com/devtools/docs/timeline) provides a complete overview of where the engine spends time.
You can add a mark to the timeline from the console with the [`timeStamp()`](https://developer.chrome.com/devtools/docs/console-api#consoletimestamplabel). This is a simple way to correlate events in your application with other events.

Note: The `timeStamp()` method only functions while a Timeline recording is in progress.

The `timeStamp()` annotates the Timeline in the following places:

- A yellow vertical line in the Timeline's summary and details view.
- It adds a record to the list of events.

Example code:

    function AddResult(name, result) {
        console.timeStamp("Adding result");
        var text = name + ': ' + result;
        var results = document.getElementById("results");
        results.innerHTML += (text + "<br>");
    }

Timestamps in the timeline:
![Timestamps in the timeline](images/track-executions-timestamp2.png)

## Counting statement executions

The `count()` method will log the provided string along with the number of times the same string has been provided.
The string may have dynamic content.
When the exact statement is given to `count()` on the same line the number will increment.

Example code of using `count()` with some dynamic content:

    function login(user) {
        console.count("Login called for user " + user);
    }

    users = [ // by last name since we have too many Pauls.
        'Irish',
        'Bakaus',
        'Kinlan'
    ];

    users.forEach(function(element, index, array) {
        login(element);
    });

    login(users[0]);

Output of the code sample:
![console.count() example output](images/track-executions-console-count.png)

{% include modules/nextarticle.liquid %}

{% endwrap %}
