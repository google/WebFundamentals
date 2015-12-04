---
layout: updates/post
title: "Present to a second screen with the Presentation API"
description: "Chrome on Android now allows mobile sites to present to Google Cast devices using the Presentation API and the Cast Web SDK."
published_on: 2015-12-04
updated_on: 2015-12-04
authors:
  - samdutton
tags:
  - news
  - audio
  - video
  - media
  - second_screen
featured_image: /web/updates/images/2015/11/presentation-api/featured.jpg
---

<p class="intro">Imagine being able to use a web app to present a slide deck to a conference projector from your phone — or share images, play games or watch videos on TV, using your phone (or tablet or laptop) as a controller.</p>

The latest release of Chrome on Android allows sites to [present to Google Cast devices](https://storage.googleapis.com/presentation-api/index.html)
using the [Presentation  API](https://w3c.github.io/presentation-api/) and the [Cast Web
SDK](https://developers.google.com/cast/docs/chrome_sender).

![Alt text](/web/updates/images/2015/11/presentation-api/screens.jpg)

The Presentation API 'enables an exchange of messages between a page that acts as the  [controller](http://www.w3.org/TR/presentation-api/#dfn-controller) and another page that represents the [presentation](http://www.w3.org/TR/presentation-api/#dom-presentation) shown in  the [presentation display](http://www.w3.org/TR/presentation-api/#dfn-presentation-display)' (as the spec puts it).

The user agent (which may be a web browser) gets to decide how to exchange control messages. A user agent acting as a controller may even render the presentation itself, for example when the presentation display is connected via HDMI or [Miracast](https://en.wikipedia.org/wiki/Miracast) — or when the presentation is to another window on the same device.  Alternatively, the presentation display device may render the content.

Here's how to create a request to start displaying a presentation, and find out when presentation displays become available:

{% highlight javascript %}
// controller.html

// presentationUrl could also be a local file
var presentationUrl = 'https://example.com/presentation.html';

var handleAvailabilityChange = function(isAvailable) {
  // do something
};

var request = new PresentationRequest(presentationUrl);

request.getAvailability().then(function(availability) {
  handleAvailabilityChange(availability.value);
  availability.onchange = function() {
    handleAvailabilityChange(this.value);
  };
}).catch(function() {
  handleAvailabilityChange(true);
});
{% endhighlight %}

Once a `PresentationRequest` has been created successfully, `start()` can be called on it to show a display selection dialog to the user (unless there's no presentation display compatible with the `presentationUrl`):

{% highlight javascript %}
// controller.html

request.start() // user will be presented with a display selection dialog
  .then(setConnection) // success!
  .catch(endConnection); // error, or the user canceled the dialog
{% endhighlight %}

Once the user has selected a display device, a new page or tab (strictly speaking, a [browsing context](http://www.w3.org/TR/html5/browsers.html#browsing-context)) will be opened on it, and `presentationUrl` will be displayed.

Now, in the controller, you can send messages to the presentation and keep tabs on the connection state:

{% highlight javascript %}
// controller.html

var connection;

function setConnection(newConnection) {
  endConnection(); // end any existing connection
  connection = newConnection;
  if (connection) {
    localStorage.setItem('connectionId', connection.id);
    connection.onstatechange = function() {
      if (this === connection) {
        if (this.state === 'closed') {
          // could reconnect, e.g. after network disruption
        } else if (this.state === 'terminated') {
          // could start a new presentation
        } else if (this.state === 'connected') {
          // send message to presentation page
          connection.send('Hello from controller page!');
        }
      }
    };
  }
}

connection.onmessage = function(evt) {
  console.log('receive message', evt.data);
};

function disconnectController() {
  if (connection) {
    connection.close();
  }
}

function endConnection() {
  if (connection) {
    connection.terminate();
    localStorage.removeItem('connectionId');
  }
}
{% endhighlight %}

In the presentation, you can then make a connection and handle messages:

{% highlight javascript %}
// presentation.html

// note that there may be multiple connections
function addConnection(connection) {
  connection.onstatechange = function() {
    // connection.state is 'connected,' 'closed,' or 'terminated'
  };
  connection.onmessage = function(event) {
    // do something with event.data
    connection.send('Hello from presentation!');
  };
};

navigator.presentation.receiver.
  getConnection().then(addConnection);

navigator.presentation.receiver.
  onconnectionavailable = function() {
    navigator.presentation.receiver.
      getConnections().then(function(connections) {
        // add the latest connection
        addConnection(connections[connections.length - 1]);
  });
};
{% endhighlight %}

The Presentation API, along with the [Remote Playback API](https://w3c.github.io/remote-playback/), is part of the [Second Screen Working Group](http://www.w3.org/2014/secondscreen) effort to enable web pages to use second screens to display web content.

These APIs take advantage of the range of devices coming online — including connected displays that run a user agent — enabling a rich variety of applications for users with access to a 'control' device and a 'display' device.

Let us know what you make of them.

### Find out more

* [Presentation API spec](http://www.w3.org/TR/presentation-api)
* [Use cases and requirements](https://github.com/w3c/presentation-api/blob/gh-pages/uc-req.md)
* [The Second Screen Working Group](http://www.w3.org/2014/secondscreen/)
* [Remote Playback API](https://w3c.github.io/remote-playback)



