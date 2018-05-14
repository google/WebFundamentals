project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2018-04-12 #}
{# wf_published_on: 2016-01-01 #}


# Integrating Analytics {: .page-title }




Codelab:  [Integrating Analytics](lab-integrating-analytics)

<div id="what"></div>


## What is Google Analytics?




Google Analytics is a service that collects, processes, and reports data about an application's use patterns and performance. Adding Google Analytics to a web application enables the collection of data like visitor traffic, user agent, user's location, and so forth. This data is sent to Google Analytics servers where it is processed. The processed data is then reported to the developer and/or application owner. This information is accessible from the Google Analytics web interface (dashboard) and through the  [reporting API](/analytics/devguides/reporting/core/v4/).

#### Why use it?

Using analytics tools gives developers valuable information about their application such as:

* User's geographic location, user agent, screen resolution, and language
* How long users spend on pages, how often they visit pages, and the order in which pages are viewed
* What times users are visiting the site and from where they arrived at the site

Google Analytics is free, relatively simple to integrate, and customizable.

<div id="account"></div>


## Creating an account




Google Analytics requires creating a Google Analytics account. An account has  [properties](https://support.google.com/analytics/answer/2649554) that represent individual collections of data. These properties have tracking IDs (also called property IDs) that identify them to Google Analytics. For example, an account might represent a company. One property in that account might represent the company's web site, while another property might represent the company's iOS app.

![Accounts and Properties](img/766f9ab38e16446b.png)

If you only have one app, the simplest scenario is to create a single Google Analytics account, and add a single property to that account. That property can represent your app.

A Google Analytics account can be created from  [analytics.google.com](https://analytics.google.com/).



Note: The Google Analytics UI is subject to updates and may not look exactly like the screenshots presented here.



#### If you already have a Google Analytics account

Create another one. Select the __Admin__ tab. Under __account__, select your current Google Analytics account and choose __create new account__. A single Gmail account can have multiple (currently 100) Google Analytics accounts.

![Adding an account](img/76e8d691850a2b7c.png)

#### If you don't have a Google Analytics account

Select __Sign up__ to begin creating your account. The account creation screen should look like this:

![Creating an account](img/e5475081784bd614.png)

#### What would you like to track?

Websites and mobile apps implement Google Analytics differently. This document assumes a web app is being used. For mobile apps, see  [analytics for mobile applications](https://support.google.com/analytics/answer/2587086?ref_topic=2587085&rd=1).

#### Setting up your account

This is where you can set the name for your account, for example "PWA Training" or "Company X".

#### Setting up your property

A property must be associated with a website (for web apps). The website name can be whatever you want, for example "GA Code Lab Site" or "My New App". The website URL should be the URL where your app is hosted.



Note: Analytics will still work even if this URL does not match your site. The only thing that ties analytics data to your account is the value of your __tracking / property ID__. The site URL that you use to create your Google Analytics account is only used for things like automated testing.



You can set an industry category to get benchmarking information later (in other words, to compare your app with other apps in the same industry). You can set your timezone here as well. You may also see data sharing options, but these are not required.

Once you have filled in your information, choose __Get Tracking ID__ and agree to the terms and conditions to finish creating your account and its first property. This will take you to the tracking code page where you get the tracking ID and tracking snippet for your app.

<div id="addanalytics"></div>


## Add analytics to your site




Once you have created an account, you need to add the tracking snippet to your app. You can find the tracking snippet with the following steps:

1. Select the __Admin__ tab.
2. Under __account__, select your account (for example "PWA Training") from the dropdown list.
3. Then under __property__, select your property (for example "GA Code Lab Site") from the dropdown list.
4. Now choose __Tracking Info__, and then __Tracking Code__.

![Finding the snippet](img/dc1b90e9a8dd54c9.png)

Your tracking ID looks like `UA-XXXXXXXX-Y` and your tracking code snippet looks like:

#### index.html

```
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]) \
.push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0]; \
a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script', \
'https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXXXXXX-Y', 'auto');
  ga('send', 'pageview');

</script>
```

Your tracking ID is embedded into your tracking snippet. This snippet needs to be embedded into every page that you want to track.

When a page with the snippet loads, the tracking snippet script is executed. The IIFE ( [Immediately Invoked Function Expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)) in the script does two things:

* Creates another `script` tag that starts asynchronously downloading __analytics.js__, the library that does all of the analytics work.
* Initializes a global `ga` function, called the command queue.

The `ga` command queue is the main interface for using __analytics.js__. The command queue stores commands (in order) until __analytics.js__ has loaded. Once __analytics.js__ has loaded, the commands are executed sequentially. This functionality ensures that analytics can begin independent of the loading time of __analytics.js__.

Commands are added by calling `ga()`. The first argument passed is the command itself, which is a method of the __analytics.js__ library. The remaining arguments are parameters for that method.

The next lines add two commands to the queue. The first creates a new  [tracker object](/analytics/devguides/collection/analyticsjs/tracker-object-reference). Tracker objects track and store data. When the new tracker is created, the analytics library gets the user's IP address, user agent, and other page information, and stores it in the tracker. From this info Google Analytics can extract:

* User's geographic location
* User's browser and operating system (OS)
* Screen size
* If Flash or Java is installed
* The referring site

You can learn more about  [creating trackers](/analytics/devguides/collection/analyticsjs/creating-trackers) in the documentation.

The second command sends a " [hit](https://support.google.com/analytics/answer/6086082)". This sends the tracker's data to Google Analytics. Sending a hit is also used to note a user interaction with your app. The user interaction is specified by the hit type, in this case a "pageview".  Since the tracker was created with your tracking ID, this data is sent to your account and property. You can learn more about  [sending data](/analytics/devguides/collection/analyticsjs/sending-hits) in the Google Analytics documentation.

The code so far provides the basic functionality of Google Analytics. A tracker is created and a  pageview hit is sent every time the page is visited. In addition to the data gathered by tracker creation, the pageview event allows Google Analytics to infer:

* The total time the user spends on the site
* The time spent on each page and the order in which the pages are visited
* Which internal links are clicked (based on the URL of the next pageview)



Note: Tracker objects do not update themselves. If a user changes the size of the window, or if code running on the page updates the URL (such as in a single page app), tracker objects do not automatically capture this information. In order for the tracker object to reflect these changes, you must <a href="/analytics/devguides/collection/analyticsjs/accessing-trackers">manually update it</a>.



### Debugging and development

Google Analytics offers the __analytics.js__ library with a debug mode: __analytics_debug.js__. Using this version will log detailed messages to the console that break down each hit sent. It also logs warnings and errors for your tracking code. To use this version, replace __analytics.js__ with __analytics_debug.js__ (in all instances of your tracking snippet).



Note: The debug version should not be used in production as it is a much larger file.





Note: You can also use the <a href="https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna">Chrome debugger extension</a>.



#### For more information

*  [Adding analytics.js to Your Site](/analytics/devguides/collection/analyticsjs/)
*  [Google Reporting API v4](/analytics/devguides/reporting/core/v4/)
*  [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
*  [Google Analytics Debugging](/analytics/devguides/collection/analyticsjs/debugging)
*  [Getting and Setting Tracker Data](/analytics/devguides/collection/analyticsjs/accessing-trackers)

<div id="dash"></div>


## Google Analytics dashboard




All of the data that is sent to Google Analytics can be viewed in the Google Analytics dashboard (the Google Analytics web interface). For example, overview data is available by selecting __Audience__ and then __Overview__ (shown below).

From the overview page you can see general information such as pageview records, bounce rate, ratio of new and returning visitor, and other statistics.

![Records overview](img/74d4a769d29dacc2.png)

You can also see specific information like visitors' language, country, city, browser, operating system, service provider, screen resolution, and device.

![Records details](img/6f1ff51dd71cedfe.png)

### Real time analytics

It's also possible to view analytics information in real time from the __Real-Time__ tab. The  __Overview__ section is shown below:

![Real-time navigation](img/7939d0762e616983.png)

If you are visiting your app in another tab or window, you should see yourself being tracked. The screen should look similar to this:

![Real-time screen](img/6293fe6be6811ccd.png)

These are only the basic aspects of the Google Analytics dashboard. There is an extensive set of features and functionality.

#### For more information

*  [Learn about Google Analytics for business](https://analyticsacademy.withgoogle.com/)

<div id="customevents"></div>


## Custom events




Google Analytics supports custom events that allow for fine-grain analysis of user behavior.

For example, the following code will send a custom event:

#### main.js

```
ga('send', {
  hitType: 'event',
  eventCategory: 'products',
  eventAction: 'purchase',
  eventLabel: 'Summer products launch'
});
```

Here the hit type is set to 'event' and values associated with the event are added as parameters. These values represent the `eventCategory`, `eventAction`, and `eventLabel`. All of these are arbitrary, and used to organize events. Sending these custom events allow us to deeply understand user interactions with our site.



Note: Many of the <code>ga</code> commands are flexible and can use multiple signatures. You can see all method signatures in the <a href="/analytics/devguides/collection/analyticsjs/command-queue-reference">command queue reference</a>.



Event data can also be viewed in the Google Analytics dashboard. Real-time events are found in the __Real-Time__ tab under __Events__, and should look like the following:

![Real-time events](img/83a15cc1df334a9.png)

Here you can see events as they are occurring. You can view past events in the Google Analytics dashboard by selecting __Behavior__, followed by __Events__ and then __Overview__:

![Recorded events](img/90b6a60013803441.png)

#### For more information

*  [Event tracking](/analytics/devguides/collection/analyticsjs/events)
*  [About events](https://support.google.com/analytics/answer/1033068)
*  [The ga Command Queue Reference](/analytics/devguides/collection/analyticsjs/command-queue-reference)

<div id="analyticsserviceworker"></div>


## Analytics and service worker




Service workers do not have access to the analytics command queue, `ga`, because the command queue is in the main thread (not the service worker thread) and requires the `window` object. You need to use the  [Measurement Protocol](/analytics/devguides/collection/protocol/v1/) interface to send hits from the service worker.

This interface allows us to make HTTP requests to send hits, regardless of the execution context. This can be achieved by sending a URI containing your __tracking ID__ and the custom event parameters (`eventCategory`, `eventAction`, and `eventLabel`) along with some  [required parameters](/analytics/devguides/collection/protocol/v1/devguide) (__version number__, __client ID__, and __hit type)__ to the  [API endpoint](/analytics/devguides/collection/protocol/v1/reference) (__https://www.google-analytics.com/collect__). Let's look at an example using the Measurement Protocol interface to send hits related to push events in the service worker.

A helper script, __analytics-helper.js__ has the following code:

#### analytics-helper.js

```
// Set this to your tracking ID
var trackingId = 'UA-XXXXXXXX-Y';

function sendAnalyticsEvent(eventAction, eventCategory) {
  'use strict';

  console.log('Sending analytics event: ' + eventCategory + '/' + eventAction);

  if (!trackingId) {
    console.error('You need your tracking ID in analytics-helper.js');
    console.error('Add this code:\nvar trackingId = \'UA-XXXXXXXX-X\';');
    // We want this to be a safe method, so avoid throwing unless absolutely necessary.
    return Promise.resolve();
  }

  if (!eventAction && !eventCategory) {
    console.warn('sendAnalyticsEvent() called with no eventAction or ' +
    'eventCategory.');
    // We want this to be a safe method, so avoid throwing unless absolutely necessary.
    return Promise.resolve();
  }

  return self.registration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription === null) {
      throw new Error('No subscription currently available.');
    }

    // Create hit data
    var payloadData = {
      // Version Number
      v: 1,
      // Client ID
      cid: subscription.endpoint,
      // Tracking ID
      tid: trackingId,
      // Hit Type
      t: 'event',
      // Event Category
      ec: eventCategory,
      // Event Action
      ea: eventAction,
      // Event Label
      el: 'serviceworker'
    };

    // Format hit data into URI
    var payloadString = Object.keys(payloadData)
    .filter(function(analyticsKey) {
      return payloadData[analyticsKey];
    })
    .map(function(analyticsKey) {
      return analyticsKey + '=' + encodeURIComponent(payloadData[analyticsKey]);
    })
    .join('&');

    // Post to Google Analytics endpoint
    return fetch('https://www.google-analytics.com/collect', {
      method: 'post',
      body: payloadString
    });
  })
  .then(function(response) {
    if (!response.ok) {
      return response.text()
      .then(function(responseText) {
        throw new Error(
          'Bad response from Google Analytics:\n' + response.status
        );
      });
    } else {
      console.log(eventCategory + '/' + eventAction +
        'hit sent, check the Analytics dashboard');
    }
  })
  .catch(function(err) {
    console.warn('Unable to send the analytics event', err);
  });
}
```

The script starts by creating a variable with your tracking ID (replace `UA-XXXXXXXX-Y` with your actual tracking ID). This ensures that hits are sent to your account and property, just like in the analytics snippet.

The `sendAnalyticsEvent` helper function starts by checking that the tracking ID is set and that the function is being called with the correct parameters. After checking that the client is subscribed to push, the hit data is created in the `payloadData` variable:

#### analytics-helper.js

```
var payloadData = {
  // Version Number
  v: 1,
  // Client ID
  cid: subscription.endpoint,
  // Tracking ID
  tid: trackingId,
  // Hit Type
  t: 'event',
  // Event Category
  ec: eventCategory,
  // Event Action
  ea: eventAction,
  // Event Label
  el: 'serviceworker'
};
```

Again, the __version number__, __client ID__, __tracking ID__, and __hit type__ parameters are  [required by the API](/analytics/devguides/collection/protocol/v1/devguide). The `eventCategory`, `eventAction`, and `eventLabel` are the same parameters that we have been using with the command queue interface.

Next, the hit data is  [formatted into a URI](/analytics/devguides/collection/protocol/v1/reference) with the following code:

#### analytics-helper.js

```
var payloadString = Object.keys(payloadData)
.filter(function(analyticsKey) {
  return payloadData[analyticsKey];
})
.map(function(analyticsKey) {
  return analyticsKey + '=' + encodeURIComponent(payloadData[analyticsKey]);
})
.join('&');
```

Finally the data is sent to the  [API endpoint](/analytics/devguides/collection/protocol/v1/reference) (__https://www.google-analytics.com/collect__) with the following code:

#### analytics-helper.js

```
return fetch('https://www.google-analytics.com/collect', {
  method: 'post',
  body: payloadString
});
```

This sends the hit with the  [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) using a POST request. The body of the request is the hit data.

Now we can import the helper script functionality into a service worker by adding the following code to the service worker file:

#### sw.js

```
self.importScripts('path/to/analytics-helper.js');
```

Where `path/to/analytics-helper.js` is the path to the __analytics-helper.js__ file. Now we should be able to send custom events from the service worker by making calls to the `sendAnalyticsEvent` function. For example, to send a custom "notification close" event, we could add code like this to the service worker file:

#### sw.js

```
self.addEventListener('notificationclose', function(event) {
  event.waitUntil(
    sendAnalyticsEvent('close', 'notification')
  );
});
```

Observe that we have used `event.waitUntil` to wrap an asynchronous operation. If unfamiliar, `event.waitUntil` extends the life of an event until the asynchronous actions inside of it have completed. This ensures that the service worker will not be terminated pre-emptively while waiting for an asynchronous action to complete.



Note: Because this event uses the Measurement Protocol interface instead of <strong>analytics_debug.js</strong>, the debug console log won't appear. You can debug Measurement Protocol hits with <a href="/analytics/devguides/collection/protocol/v1/validating-hits"> hit validation</a>.



#### For more information

*  [WorkerGlobalScope.importScripts()](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts)
*  [Measurement Protocol Overview](/analytics/devguides/collection/protocol/v1/)
*  [Simple Push Demo](https://github.com/gauntface/simple-push-demo) (includes Measurement Protocol example code)

<div id="offline"></div>


## Offline analytics




With the help of service workers, analytics data can be stored when users are offline and sent at a later time when they have reconnected based on an  [npm package](https://www.npmjs.com/package/sw-offline-google-analytics).

Install the package with the following command-line command:

```
npm install sw-offline-google-analytics
```

This imports the  [node](https://nodejs.org/en/) module.

In your service worker file, add the following code:

#### sw.js

```
importScripts('path/to/offline-google-analytics-import.js');
goog.offlineGoogleAnalytics.initialize();
```

Where `path/to/offline-google-analytics-import.js` is the path to the __offline-google-analytics-import.js__ file in the node module. This will likely look something like:

#### sw.js

```
node_modules/sw-offline-google-analytics/offline-google-analytics-import.js
```

We import and initialize the __offline-google-analytics-import.js__ library. This library adds a fetch event handler to the service worker that only listens for requests made to the Google Analytics domain. The handler attempts to send Google Analytics data first by network requests. If the network request fails, the request is stored in  [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). The requests are then sent later when connectivity is re-established.

You can test this by  [simulating offline behavior](tools-for-pwa-developers#offline), and then firing hit events. You will see an error in the console since you are offline and can't make requests to Google Analytics servers. Then  [check IndexedDB](tools-for-pwa-developers#indexeddb). Open __offline-google-analytics__. You should see URLs cached in __urls__ (you may need to click the refresh icon inside the indexedDB interface). These are the stored hits.

![Offline hits](img/88188d9545f98f83.png)

Now disable offline mode, and refresh the page. Check __IndexedDB__ again, and observe that the URL is no longer cached (and has been sent to analytics servers).



Note: This strategy won't work for hits sent from a service worker since the service worker doesn't listen to fetch events from itself (that could cause some serious problems!). This may not be too important in many cases, because many of the hits that we would want to send from the service worker are tied to online events (like push notifications) anyways.





Note: These events don't use <strong>analytics_debug.js</strong>, so the debug console logs don't appear.





Note: Some users have reported a bug in Chrome that recreates deleted databases on reload.



#### For more information

*  [Offline Google Analytics Made Easy](/web/updates/2016/07/offline-google-analytics)
*  [Google I/O offline example](/web/showcase/2015/service-workers-iowa#offline_google_analytics)
*  [Node package manager (npm)](https://docs.npmjs.com/getting-started/what-is-npm)
*  [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

<div id="resources"></div>


## Further reading




*  [Adding analytics.js to Your Site](/analytics/devguides/collection/analyticsjs/)
*  [Learn analytics with free online courses](https://analyticsacademy.withgoogle.com/) (Google Analytics Academy)
*  [Measuring Critical Performance Metrics with Google Analytics](https://codelabs.developers.google.com/codelabs/performance-analytics/index.html?index=..%2F..%2Findex#0)
*  [Improving session duration calculations](https://github.com/googleanalytics/autotrack/blob/master/docs/plugins/page-visibility-tracker.md#improving-session-duration-calculations)


