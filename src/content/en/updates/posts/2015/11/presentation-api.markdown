---
layout: updates/post
title: "Google Cast for Chrome on Android"
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

The latest release of Chrome on Android allows sites to [present to Google Cast devices](https://storage.googleapis.com/presentation-api/index.html) using the [Presentation  API](https://w3c.github.io/presentation-api/) and the [Cast Web SDK](https://developers.google.com/cast/docs/chrome_sender). This means you can now use the Cast Web SDK with Chrome on Android or iOS, or on desktop with the extension, along with native Android and iOS Cast apps. (Previously, a Google Cast sender application needed the Google Cast Chrome extension, so on Android it was only possible to interact with Cast devices from native apps.)

Below is a brief introduction to building a Cast sender app. More comprehensive information is available from the [Chrome Sender App Development Guide](https://developers.google.com/cast/docs/chrome_sender).

All pages using Cast must include the Cast library:

{% highlight html %}
<script type="text/javascript"
  src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script>
{% endhighlight %}

Add a callback to handle API availability and initialize the Cast session (make sure to add the handler before the API is loaded!):

{% highlight javascript %}
window['__onGCastApiAvailable'] = function(isLoaded, error) {
  if (isLoaded) {
    initializeCastApi();
  } else {
    console.log(error);
  }
}

function initializeCastApi() {
  var sessionRequest = new chrome.cast.SessionRequest(applicationID);
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener,
      receiverListener);
  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};
{% endhighlight %}

If you're using the default receiver application, not a roll-your-own [registered](https://developers.google.com/cast/docs/registration) receiver, you can create a `SessionRequest` like this:

{% highlight javascript %}
var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.
  DEFAULT_MEDIA_RECEIVER_APP_ID);
{% endhighlight %}

The `receiverListener` callback above is executed when one or more devices becomes available:

{% highlight javascript %}
function receiverListener(e) {
  if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
    // update UI
  }
}
{% endhighlight %}

When your user clicks the Cast icon, as mandated by the [User Experience Guidelines](https://developers.google.com/cast/docs/ux_guidelines#sender-cast-icon-available), launch a Cast session:

{% highlight javascript %}
chrome.cast.requestSession(onRequestSessionSuccess,
    onRequestSessionError);

function onRequestSessionSuccess(e) {
  session = e;
}
{% endhighlight %}

Once you have a Cast session, you can load media for the selected Cast device, and add a listener for media playback events:

{% highlight javascript %}
var mediaInfo = new chrome.cast.media.MediaInfo(mediaURL);
var request = new chrome.cast.media.LoadRequest(mediaInfo);
session.loadMedia(request,
    onMediaDiscovered.bind(this, 'loadMedia'),
    onMediaError);

function onMediaDiscovered(how, media) {
  currentMedia = media;
  media.addUpdateListener(onMediaStatusUpdate);
}
{% endhighlight %}

The `currentMedia` variable here is a `chrome.cast.media.Media` object, which can be used for controlling playback:

{% highlight javascript %}
function playMedia() {
  currentMedia.play(null, success, error)
}
// ...
{% endhighlight %}

The `sessionListener` callback for `chrome.cast.ApiConfig()` (see above) enables your app to join or manage an existing Cast session:

{% highlight javascript %}
function sessionListener(e) {
  session = e;
  if (session.media.length !== 0) {
    onMediaDiscovered('onRequestSessionSuccess', session.media[0]);
  }
}
{% endhighlight %}

The [Cast Web SDK guide](https://developers.google.com/cast/docs/chrome_sender) has links to sample apps, and information about Cast features such as session management, text tracks (for subtitles and captions) and status updates.

![Alt text](/web/updates/images/2015/11/presentation-api/screens.jpg)

At present, you can only present to a Cast [Receiver Application](https://developers.google.com/cast/docs/receiver_apps) using the Cast Web SDK, but there is work underway to enable the Presentation API to be used without the Cast SDK (on desktop and Android) to present any web page to a Cast device without registration with Google: to any user agent that supports the API.

The Presentation API, along with the [Remote Playback API](https://w3c.github.io/remote-playback/), is part of the [Second Screen Working Group](http://www.w3.org/2014/secondscreen) effort to enable web pages to use second screens to display web content.

These APIs take advantage of the range of devices coming online — including connected displays that run a user agent — to enable a rich variety of applications with a 'control' device and a 'display' device.

We'll keep you posted on progress with implementation.

In the meantime, please let us know if you find bugs or have feature requests: [crbug.com/new](https://crbug.com/new).

### Find out more

* [Get Started with Google Cast SDK](https://developers.google.com/cast/)
* [Presentation API spec](http://www.w3.org/TR/presentation-api)
* [Use cases and requirements](https://github.com/w3c/presentation-api/blob/gh-pages/uc-req.md)
* [The Second Screen Working Group](http://www.w3.org/2014/secondscreen/)
* [Remote Playback API](https://w3c.github.io/remote-playback)



