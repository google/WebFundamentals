


In this codelab, you’ll learn how to integrate a service worker into an existing application to make it work offline.

<img src="images/image00.png" width="624" height="409" />

The application is called [Air
Horner](https://airhorner.com). It uses the Web Audio API to play and manipulate
an airhorn sound, and it is probably one of the best air horn apps on the market
today (according to the author of this codelab at least). It's a simple
application but it will demonstrate the use of a service worker.

A service worker is a script that is run by your browser in the background,
separate from a web page, opening the door to features which don't need a web
page or user interaction. In the future this will include push messages,
background sync, and geofencing, but the first feature it will launch with is
the ability to intercept and handle network requests, including programmatically
managing a cache of responses.

The reason this is such an exciting API is that it allows you to support offline
experiences, giving developers complete control over what exactly that
experience is.

### What you'll learn

* How to add a basic service worker to an existing project.
* A brief overview of the service worker Lifecycle
* A simple offline caching strategy

### What you'll need

* Chrome 44 or above
* A basic understanding of
  [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
* The sample code
* A text editor
* Python or a simple local web server


### Topics


  [Get the sample code](/web/fundamentals/getting-started/your-first-offline-web-app/step-1?hl=en)

  [Run the sample app](/web/fundamentals/getting-started/your-first-offline-web-app/step-2?hl=en)

  [Test the app](/web/fundamentals/getting-started/your-first-offline-web-app/step-3?hl=en)

  [Build the starter app](/web/fundamentals/getting-started/your-first-offline-web-app/step-4?hl=en)

  [Register a Service Worker on the site](/web/fundamentals/getting-started/your-first-offline-web-app/step-5?hl=en)

  [Install the Site Assets](/web/fundamentals/getting-started/your-first-offline-web-app/step-6?hl=en)

  [Intercept the web page requests](/web/fundamentals/getting-started/your-first-offline-web-app/step-7?hl=en)

  [Congratulations](/web/fundamentals/getting-started/your-first-offline-web-app/step-8?hl=en)

