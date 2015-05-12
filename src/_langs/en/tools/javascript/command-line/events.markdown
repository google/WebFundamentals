---
rss: false
layout: article
title: "Monitor Events"
seotitle: "Monitor Events Using the Chrome DevTools Command Line API"
description: "The Chrome DevTools Command Line API offers various ways to observe and inspect Event Listeners"
introduction: "The Chrome DevTools Command Line API offers various ways to observe and inspect Event Listeners. JavaScript plays a central role in interactive pages, and the Browser provides you some useful tools to debug events and event handlers."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-11
  order: 2
authors:
  - megginkearney
  - flaviocopes
priority: 0
collection: command-line
key-takeaways:
  command-line:
    - Use monitorEvents() to listen to events of a certain type
    - Use unmonitorEvents() to stop listening
    - Use getEventListeners() to get the event listeners of a DOM element
    - Use the Event Listeners Inspector panel to get information on event listeners
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.command-line %}

## Monitor Events


The [monitorEvents()](https://developer.chrome.com/devtools/docs/commandline-api#monitoreventsobject-events) method instructs the DevTools to log information on the specified targets.

The first parameter is the object to monitor.
All events return if the second parameter is not provided.
To specify the events to listen to you may pass either a string or an array of strings as the second parameter.


Listen to click events on the body of the page.

    monitorEvents(document.body, "click");

If a supported *event type* that the DevTools maps to a set of standard event names then it will listen to the events for that type.
The [Command Line API](https://developer.chrome.com/devtools/docs/commandline-api#monitoreventsobject-events) has a full mapping of *event types* to the events they cover.

To stop monitoring events you call the `unmonitorEvents()` method and give it the object to stop monitoring.

Stop listening to events on the `body` object

    unmonitorEvents(document.body);

## View event listeners registered on objects using the getEventListeners() API

The [getEventListeners() API](https://developer.chrome.com/devtools/docs/commandline-api#geteventlistenersobject) returns the event listeners registered on the specified object.

The return value is an object that contains an array for each registered event type (`click` or `keydown`, for example). The members of each array are objects that describe the listener registered for each type. For example, the following code lists all the event listeners registered on the document object

    getEventListeners(document);

![Alt text](images/events-call-geteventlisteners.png)

If more than one listener is registered on the specified object, then the array contains a member for each listener. For instance, in the following example there are two event listeners registered on the #scrollingList element for the `mousedown` event:

![Alt text](images/events-geteventlisteners_multiple.png)


You can further expand each of these objects to explore their properties:

![Alt text](images/events-geteventlisteners_expanded.png)


## View event listeners registered on DOM Elements using the Elements Inspector

The *Event Listeners* panel in the Elements Inspector by default shows all the events attached to a page:

![Alt text](images/events-eventlisteners_panel.png)

The filter can limit the events just to the selected node:

![Alt text](images/events-eventlisteners_panel_filtered.png)

By expanding the object, the panel shows the event listener details. In this case the page has two event listeners attached via jQuery:

![Alt text](images/events-eventlisteners_panel_details.png)

{% endwrap %}