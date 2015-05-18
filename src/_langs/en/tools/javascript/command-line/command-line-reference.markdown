---
rss: false
layout: article
title: "Command Line API Reference"
seotitle: "Command Line API Reference for Chrome DevTools"
description: "TBD description."
introduction: "The Command Line API contains a collection of convenience functions for performing common tasks."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 3
authors:
  - andismith
  - megginkearney
priority: 0
collection: command-line
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

The API includes functions for selecting and inspecting elements in the DOM; displaying data in a readable format; stopping and starting the profiler; and monitoring DOM events.

*Please note:* The API is only available from within the console itself. It is not possible to access the Command Line API from scripts on the page.

### $_

Returns the value of the most recently evaluated expression.

In the following example, a simple expression (`2 + 2`) is evaluated. The `$_` property is then evaluated, which contains the same value:

![$_ is the most recently evaluated expression](images/recently-evaluated-expression-1.png)

In the next example, the evaluated expression initially contains an array of names.  Evaluating `$_.length` to find the length of the array, the value stored in `$_` changes to become the latest evaluated expression which is 4.

![$_ changes when new commands are evaluated](images/recently-evaluated-expression-2.png)

### $0 - $4

The `$0`, `$1`, `$2`, `$3` and `$4` commands work as a historical reference to the last five DOM elements inspected within the 'Elements' panel or the last five JavaScript heap objects selected in the 'Profiles' panel. So `$0` returns the most recently selected element or JavaScript object, `$1` returns the second most recently selected one, and so on.

In the following example, an element with the class `medium` is selected in the `Elements` panel. In the Console drawer `$0` has been evaluated, which displays the same element.

![Example of $0](images/element-0.png)

The image below shows a different element selected in the same page. The $0 now refers to newly selected element, while $1 now returns the previously selected one.

![Example of $1](images/element-1.png)

### $(selector)

Returns reference to the first DOM element with the specified CSS selector. This function is an alias for the [document.querySelector()](http://docs.webplatform.org/wiki/css/selectors_api/querySelector) function.

The following example returns a reference to the first `<img>` element in the document.

![Example of $('img')](images/selector-img.png)

You can right click on the returned result and select 'Reveal in Elements Panel' to find it in the DOM, or 'Scroll in to View' to show it on the page.

The following example returns a reference to the currently selected element and displays its src property:

![Example of $('img').src](images/selector-img-src.png)

*Please note:* If you are using a library such as jQuery that uses `$`, this will functionality will be overwritten, and `$` will correspond to that libraries implementation.

### $$(selector)

Returns an array of elements that match the given CSS selector. This command is equivalent to calling [document.querySelectorAll()](http://docs.webplatform.org/wiki/css/selectors_api/querySelectorAll)).

The following example uses `$$()` to create an array of all `<img>` elements in the current document and displays the value of each element's `src` property.

		var images = $$('img');
		for (each in images) {
			console.log(images[each].src);
		}

![Example of using $$() to select all images in the document and display their sources.](images/all-selector.png)

*Please note:* Press <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Enter</kbd> in the console to start a new line without executing the script.

### $x(path)

Returns an array of DOM elements that match the given XPath expression.

For example, the following returns all the `<p>` elements on the page:

		$x("//p")

![Example of using an XPath selector](images/xpath-p-example.png)

While the following example returns all the `<p>` elements that contain `<a>` elements:

		$x("//p[a]")

![Example of using a more complicated XPath selector](images/xpath-p-a-example.png)

### clear()

Clears the console of its history.

		clear();

### copy(object)

Copies a string representation of the specified object to the clipboard.

		copy($0);

### debug(function)

When the function specified is called, the debugger will be invoked and will break inside the function on the Sources panel allowing you to be able to step through the code and debug it.

		debug(getData);

![Breaking inside a function with debug()](images/debug.png)

Use undebug(fn) to stop breaking on the function, or use the UI to disable all breakpoints.

### dir(object)
Displays an object-style listing of all the properties of the specified object. This method is an alias for the Console API's `console.dir()` method.

The following example shows the difference between evaluating `document.body` directly in the command line, and using `dir()` to display the same element.

		document.body;
		dir(document.body);

![Logging document.body with and without dir() function](images/dir.png)

For more information, see the `console.dir()` entry in the Console API.

### dirxml(object)

Prints an XML representation of the specified object, as seen in the Elements tab. This method is equivalent to the `console.dirxml()` method.

### inspect(object/function)

Opens and selects the specified element or object in the appropriate panel: either the Elements panel for DOM elements and the Profiles panel for JavaScript heap objects.

The following example opens the `document.body` in the 'Elements' panel:

		inspect(document.body);


![Inspecting an element with inspect()](images/inspect.png)

When passing a function to inspect, when the function is called it will open it up in the Sources panel for you to inspect.

### getEventListeners(object)

Returns the event listeners registered on the specified object. The return value is an object that contains an array for each registered event type ("click" or "keydown", for example). The members of each array are objects that describe the listener registered for each type. For example, the following lists all the event listeners registered on the document object.

		getEventListeners(document);

![Output of using getEventListeners()](images/get-event-listeners.png)

If more than one listener is registered on the specified object, then the array contains a member for each listener. For instance, in the following example there are two event listeners registered on the #scrollingList element for the "mousedown" event:

![Multiple listeners](images/scrolling-list.png)

You can further expand each of these objects to explore their properties:

![Expanded view of listener object](images/scrolling-list-expanded.png)

### keys(object)

Returns an array containing the names of the properties belonging to the specified object. To get the associated values of the same properties, use values().

For example, suppose your application defined the following object:

		var player1 = { "name": "Ted", "level": 42 }

Assuming `player1` was defined in the global namespace (for simplicity), typing `keys(player1)` and `values(player1)` in the console would result in the following:

![Example of keys() and values() methods](images/keys-values.png)

### monitor(function)

When the function specified is called, a message is logged to the console that indicates the function name along with the arguments that are passed to the function when it was called.

		function sum(x, y) {
			return x + y;
		}
		monitor(sum);

![Example of monitor() method](images/monitor.png)

Use unmonitor(function) to cease monitoring.

### monitorEvents(object[, events])

When one of the specified events occurs on the specified object, the Event object is logged to the console. You can specify a single event to monitor, an array of events, or one of the generic events "types" that are mapped to a predefined collection of events. See examples below.

The following monitors all resize events on the window object.

		monitorEvents(window, "resize");

![Monitoring window resize events](images/monitor-events.png)

The following defines an array to monitor both "resize" and "scroll" events on the window object:

		monitorEvents(window, ["resize", "scroll"])

You can also specify one of the available event "types", strings that map to predefined sets of events. The table below lists the available event types and their associated event mappings:

<table class="table">
	<thead>
		<tr>
			<th>Event type</th>
			<th>Corresponding mapped events</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>mouse</td>
			<td>"mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"</td>
		</tr>
		<tr>
			<td>key</td>
			<td>"keydown", "keyup", "keypress", "textInput"</td>
		</tr>
		<tr>
			<td>touch</td>
			<td>"touchstart", "touchmove", "touchend", "touchcancel"</td>
		</tr>
		<tr>
			<td>control</td>
			<td>"resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"</td>
		</tr>
	</tbody>
</table>

For example, the following uses the "key" event type all corresponding key events on an input text field currently selected in the 'Elements' panel.

		monitorEvents($0, "key");

Below is sample output after typing a characters in the text field:

![Monitoring key events](images/monitor-key.png)

### profile([name]) and profileEnd([name])

`profile()` starts a JavaScript CPU profiling session with an optional name. `profileEnd()` will complete the profile and display the results in the 'Profile' panel.

To start profiling:

		profile("My profile")

To stop profiling and display the results in the Profiles panel:

		profileEnd("My profile")

Profiles can also be nested. For example, this will work in any order:

		profile('A');
		profile('B');
		profileEnd('A');
		profileEnd('B');

### table(data[, columns])

Log object data with table by passing in a data object in with optional column headings. For example, to display a list of names using a table in the console you would do:

		var names = {
			0: { firstName: "John", lastName: "Smith" },
			1: { firstName: "Jane", lastName: "Doe" }
		};
		table(names);

![Example of table() method](images/table.png)

### undebug(function)

Stops the debugging of the specified function so that when the function is called the debugger will no longer be invoked.

		undebug(getData);


### unmonitor(function)

Stops the monitoring of the specified function. Used in concert with monitor(fn).

		unmonitor(getData);


### unmonitorEvents(object[, events])

Stops monitoring events for the specified object and events. For example, the following stops all event monitoring on the window object:

		unmonitorEvents(window);

You can also selectively stop monitoring specific events on an object. For example, following code starts monitoring all mouse events on the currently selected element, and then stops monitoring "mousemove" events (perhaps to reduce noise in the console output).

		monitorEvents($0, "mouse");
		unmonitorEvents($0, "mousemove");

### values(object)

Returns an array containing the values of all properties belonging to the specified object.

		values(object);

{% include modules/takeaway.liquid list=page.key-takeaways.tldr-tbd %}

### TBD

TBD.

{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
