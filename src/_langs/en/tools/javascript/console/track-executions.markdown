---
rss: false
layout: tools-article
title: "Measure and count executions"
seotitle: "Measure and count executions in Chrome DevTools Console"
description: "Take advantage of the Console API to measure execution times and count statement executions."
introduction: "Take advantage of the Console API to measure execution times and count statement executions."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-12
  order: 4
authors:
  - megginkearney
  - flaviocopes
  - pbakaus
priority: 0
collection: console
key-takeaways:
  track-executions:
    - Use console.time() and console.timeEnd() to track time elapsed between code execution points.
    - Use console.count() to count how many times the same string is passed to a function.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.track-executions %}

## Measure execution times

The [`time()`](./console-api#consoletimelabel) method starts a new timer and is very useful to measure how long something took. Pass a string to the method to give the marker a name.

When you want to stop the timer, call [`timeEnd()`](./console-api#consoletimeendlabel) and pass it the same string passed to the initializer.

The console then logs the label and time elapsed when the `timeEnd()` method fires.

### Basic example

Here, we measure the initialization of a million new Arrays:

{% highlight js %}
console.time("Array initialize");
var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
    array[i] = new Object();
};
console.timeEnd("Array initialize");
{% endhighlight %}

Which outputs the following in the Console:
![Time elapsed](images/track-executions-time-duration.png)

### Timers on the Timeline

When a [Timeline](/web/tools/profile-performance/evaluate-performance/timeline-tool) recording is taking place during a `time()` operation, it annotates the timeline as well. Use it when you want to trace what your application does and where it comes from.

How an annotation on the timeline looks from `time()`:

![Time annotation on timeline](images/track-executions-time-annotation-on-timeline.png)

### Marking the Timeline

*Note: The `timeStamp()` method only functions while a Timeline recording is in progress.*

The [Timeline panel](/web/tools/profile-performance/evaluate-performance/timeline-tool) provides a complete overview of where the engine spends time.
You can add a mark to the timeline from the console with the [`timeStamp()`](./console-api#consoletimestamplabel). This is a simple way to correlate events in your application with other events.

The `timeStamp()` annotates the Timeline in the following places:

- A yellow vertical line in the Timeline's summary and details view.
- It adds a record to the list of events.

The following example code:

{% highlight js %}
function AddResult(name, result) {
    console.timeStamp("Adding result");
    var text = name + ': ' + result;
    var results = document.getElementById("results");
    results.innerHTML += (text + "<br>");
}
{% endhighlight %}

Results in the following Timeline timestamps:

![Timestamps in the timeline](images/track-executions-timestamp2.png)

## Counting statement executions

Use the `count()` method to log a provided string along with the number of times the same string has been provided. When the exact statement is given to `count()` on the same line, the number is incremented.

Example code of using `count()` with some dynamic content:

{% highlight js %}
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
{% endhighlight %}

Output of the code sample:

![console.count() example output](images/track-executions-console-count.png)

{% include modules/nextarticle.liquid %}

{% endwrap %}
