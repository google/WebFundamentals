project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-11-09 #}
{# wf_published_on: 2016-01-01 #}


# Lab: Scripting the Service Worker {: .page-title }




Concepts:  [Introduction to Service Worker](introduction-to-service-worker)

<div id="overview"></div>


## Overview




This lab walks you through creating a simple service worker. 

#### What you will learn

* Create a basic service worker script, install it, and do simple debugging

#### What you should know

* Basic JavaScript and HTML
* Concepts and basic syntax of ES2015  [Promises](/web/fundamentals/getting-started/primers/promises) 
* Concept of an  [Immediately Invoked Function Expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) (IIFE)
* How to enable the developer console

#### What you need before you begin

* Computer with terminal/shell access
* Connection to the internet 
* A  [browser that supports service workers](https://jakearchibald.github.io/isserviceworkerready/)
* A text editor

<div id="setting-up"></div>


## 1. Get set up




If you have not downloaded the repository, installed Node, and started a local server, follow the instructions in [Setting up the labs](setting-up-the-labs). 

Open your browser and navigate to __localhost:8080/service-worker-lab/app__.



Note: <a href="tools-for-pwa-developers#unregister">Unregister</a> any service workers and <a href="tools-for-pwa-developers#clearcache">clear all service worker caches</a> for localhost so that they do not interfere with the lab.



If you have a text editor that lets you open a project, open the __service-worker-lab/app__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __app__ folder is where you will be building the lab.

This folder contains:

* __other.html__, __js/other.js__, __below/another.html__, and __js/another.js__ are sample resources that we use to experiment
* __index.html__ is the main HTML page for our sample site/application
* __index.css__ is the cascading stylesheet for __index.html__
* __service-worker.js__ is the JavaScript file that is used to create our service worker
* __styles__ folder contains the cascading stylesheets for this lab
* __test__ folder contains files for testing your progress

<div id="register-service-worker"></div>


## 2. Register the service worker




Open __service-worker.js__ in your text editor. Note that the file contains only an empty function. We have not added any code to run within the service worker yet. 



Note: We are using an <a href="https://en.wikipedia.org/wiki/Immediately-invoked_function_expression">Immediately Invoked Function Expression</a> inside the service worker. This is just a best practice for avoiding namespace pollution; it is not related to the Service Worker API. 



Open __index.html__ in your text editor. 

Replace TODO 2 with the following code:

#### index.html

```
if (!('serviceWorker' in navigator)) {
  console.log('Service worker not supported');
  return;
}
navigator.serviceWorker.register('service-worker.js')
.then(function() {
  console.log('Registered');
})
.catch(function(error) {
  console.log('Registration failed:', error);
});
```

Save the script and refresh the page. The <a href="tools-for-pwa-developers#console">console</a> should return a message indicating that the service worker was registered. 

In your browser, navigate to __test-registered.html__ (__app/test/test-registered.html__) to confirm that you have registered the service worker. This is a unit test. Passed tests are blue and failed tests are red. If you've done everything correctly so far, this test should be blue. Close the test page when you are done with it.



Note: Be sure to open the test page using the localhost address so that it opens from the server and not directly from the file system.



__Optional__: Open the site on an  [unsupported browser](https://jakearchibald.github.io/isserviceworkerready/) and verify that the support check conditional works. 

#### Explanation

Service workers must be registered. Always begin by checking whether the browser supports service workers. The service worker is exposed on the window's  [`Navigator`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator) object and can be accessed with `window.navigator.serviceWorker`. 

In our code, if service workers aren't supported, the script logs a message and fails immediately. Calling `serviceworker.register(...)` registers the service worker, installing the service worker's script. This returns a promise that resolves once the service worker is successfully registered. If the registration fails, the promise will reject.

<div id="listen-events"></div>


## 3. Listening for life cycle events




Changes in the service worker's status trigger events in the service worker.

### 3.1 Add event listeners

Open __service-worker.js__ in your text editor. 

Replace TODO 3.1 with the following code:

#### service-worker.js

```
self.addEventListener('install', function(event) {
  console.log('Service worker installing...');
  // TODO 3.4: Skip waiting
});

self.addEventListener('activate', function(event) {
  console.log('Service worker activating...');
});
```

Save the file. Close __app/test/test-registered.html__ page if you have not already. Manually <a href="tools-for-pwa-developers#unregister">unregister the service worker</a> and refresh the page to install and activate the updated service worker. The console log should indicate that the new service worker was registered, installed, and activated. 



Note: All pages associated with the service worker must be closed before an updated service worker can take over.





Note: The registration log may appear out of order with the other logs (installation and activation). The service worker runs concurrently with the page, so we can't guarantee the order of the logs (the registration log comes from the page, while the installation and activation logs come from the service worker). Installation, activation, and other service worker events occur in a defined order inside the service worker, however, and should always appear in the expected order.



#### Explanation

The service worker emits an `install` event at the end of registration. In this case we log a message, but this is a good place for caching static assets. 

When a service worker is registered, the browser detects if the service worker is new (either because it is different from the previously installed service worker or because there is no registered service worker for this site). If the service worker is new (as it is in this case) then the browser installs it. 

The service worker emits an `activate` event when it takes control of the page. We log a message here, but this event is often used to update caches. 

Only one service worker can be active at a time for a given scope (see  [Exploring service worker scope](#explore-scope)), so a newly installed service worker isn't activated until the existing service worker is no longer in use. This is why all pages controlled by a service worker must be closed before a new service worker can take over. Since we unregistered the existing service worker, the new service worker was activated immediately.



Note: Simply refreshing the page is not sufficient to transfer control to a new service worker, because the new page will be requested before the the current page is unloaded, and there won't be a time when the old service worker is not in use.





Note: You can also manually activate a new service worker using some browsers' <a href="tools-for-pwa-developers#accesssw">developer tools</a> and programmatically with <a href="https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting"><code>skipWaiting()</code></a>, which we discuss in section 3.4. 



### 3.2 Re-register the existing service worker

Reload the page. Notice how the events change. 

Now close and reopen the page (remember to close all pages associated with the service worker). Observe the logged events. 

#### Explanation

After initial installation and activation, re-registering an existing worker does not re-install or re-activate the service worker. Service workers also persist across browsing sessions.

### 3.3 Update the service worker

Replace TODO 3.3 in __service-worker.js __with the following comment:

#### service-worker.js

```
// I'm a new service worker
```

Save the file and refresh the page. Notice that the new service worker installs but does not activate. 

Navigate to __test-waiting.html__ (__app/test/test-waiting.html__) to confirm that the new service worker is installed but not activated. The test should be passing (blue).

Close all pages associated with the service worker (including the __app/test/test-waiting.html__ page). Reopen the __app/__ page. The console log should indicate that the new service worker has now activated. 



Note: If you are getting unexpected results, make sure your <a href="tools-for-pwa-developers#disablehttpcache">HTTP cache is disabled</a> in developer tools.



#### Explanation

The browser detects a byte difference between the new and existing service worker file (because of the added comment), so the new service worker is installed. Since only one service worker can be active at a time (for a given scope), even though the new service worker is installed, it isn't activated until the existing service worker is no longer in use. By closing all pages under the old service worker's control, we are able to activate the new service worker.

### 3.4 Skipping the waiting phase

It is possible for a new service worker to activate immediately, even if an existing service worker is present, by skipping the waiting phase. 

Replace TODO 3.4 in <strong>service-worker.js</strong> with the following code:

#### service-worker.js

```
self.skipWaiting();
```

Save the file and refresh the page. Notice that the new service worker installs and activates immediately, even though a previous service worker was in control. 

#### Explanation

The `skipWaiting()` method allows a service worker to activate as soon as it finishes installation. The install event listener is a common place to put the `skipWaiting()` call, but it can be called anywhere during or before the waiting phase. See  [this documentation](/web/fundamentals/instant-and-offline/service-worker/lifecycle#skip_the_waiting_phase) for more on when and how to use `skipWaiting()`. For the rest of the lab, we can now test new service worker code without manually unregistering the service worker.

#### For more information

*  [Service worker lifecycle](/web/fundamentals/instant-and-offline/service-worker/lifecycle)

<div id="intercept-requests"></div>


## 4. Intercept network requests




Service Workers can act as a proxy between your web app and the network. 

Replace TODO 4 in <strong>service-worker.js</strong> with:

#### service-worker.js

```
self.addEventListener('fetch', function(event) {
  console.log('Fetching:', event.request.url);
});
```

Save the script and refresh the page to install and activate the updated service worker. 

Check the console and observe that no fetch events were logged. Refresh the page and check the console again. You should see fetch events this time for the page and its assets (like CSS).

Click the links to __Other page__, __Another page__, and __Back__.

You'll see fetch events in the console for each of the pages and their assets. Do all the logs make sense? 



Note: If you visit a page and do not have the HTTP cache disabled, CSS and JavaScript assets may be cached locally. If this occurs you will not see fetch events for these resources.



#### Explanation

The service worker receives a fetch event for every HTTP request made by the browser. The  [fetch event](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent) object contains the request. Listening for fetch events in the service worker is similar to listening to click events in the DOM. In our code, when a fetch event occurs, we log the requested URL to the console (in practice we could also create and return our own custom response with arbitrary resources).

Why didn't any fetch events log on the first refresh? By default, fetch events from a page won't go through a service worker unless the page request itself went through a service worker. This ensures consistency in your site; if a page loads without the service worker, so do its subresources.

#### For more information

*  [Fetch Event - MDN](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent)
*  [Using Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
*  [Introduction to Fetch - Google Developer](/web/updates/2015/03/introduction-to-fetch)

#### Solution code

To get a copy of the working code, navigate to the __04-intercepting-network-requests__ folder.

<div id="explore-scope"></div>


## 5. Optional: Exploring service worker scope




Service workers have scope. The scope of the service worker determines from which paths the service worker intercepts requests. 

### 5.1 Find the scope

Update the registration code in __index.html__ with:

#### index.html

```
if (!('serviceWorker' in navigator)) {
  console.log('Service worker not supported');
  return;
}
navigator.serviceWorker.register('service-worker.js')
.then(function(registration) {
  console.log('Registered at scope:', registration.scope);
})
.catch(function(error) {
  console.log('Registration failed:', error);
});
```

Refresh the browser. Notice that the console shows the scope of the service worker (for example __http://localhost:8080/service-worker-lab/app/__). 

#### Explanation

The promise returned by `register()` resolves to the  [registration object](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration), which contains the service worker's scope.

The default scope is the path to the service worker file, and extends to all lower directories. So a service worker in the root directory of an app controls requests from all files in the app.

### 5.2 Move the service worker 

[Unregister](/web/ilt/pwa/tools-for-pwa-developers#unregister) the current service worker.

Then move __service-worker.js__ into the __app/below__ directory and update the service worker URL in the registration code. <a href="tools-for-pwa-developers#unregister">Unregister the service worker</a> and refresh the page. 

The console shows that the scope of the service worker is now __localhost:8080/service-worker-lab/app/below/__. 

Navigate to __test-scoped.html__ (__app/test/test-scoped.html__) to confirm that that service worker is registered in __app/below/__. If you've done everything correctly, you shouldn't see any red errors. Close the test page when you are done with it.

Back on the main page, click __Other page__,  __Another page__ and  __Back__. Which fetch requests are being logged? Which aren't?

#### Explanation

The service worker's default scope is the path to the service worker file. Since the service worker file is now in __app/below/__, that is its scope. The console is now only logging fetch events for __another.html__, __another.css__, and __another.js__, because these are the only resources within the service worker's scope (__app/below/__).

### 5.3 Set an arbitrary scope

[Unregister](/web/ilt/pwa/tools-for-pwa-developers#unregister) the current service worker again.

Move the service worker back out into the project root directory (__app__) and update the service worker URL in the registration code.

Use the  [reference on MDN](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register) to set the scope of the service worker to the __app/below/__ directory using the optional parameter in `register()`. <a href="tools-for-pwa-developers#unregister">Unregister the service worker</a> and refresh the page. Click __Other page__, __Another page__ and __Back__.

Again the console shows that the scope of the service worker is now __localhost:8080/service-worker-lab/app/below__, and logs fetch events only for __another.html__, __another.css__, and __another.js__. 

Navigate to __test-scoped.html__ again to confirm that the service worker is registered in __app/below/__. 

#### Explanation

It is possible to set an arbitrary scope by passing in an additional parameter when registering, for example:

#### index.html

```
navigator.serviceWorker.register('/service-worker.js', {
  scope: '/kitten/'
});
```

In the above example the scope of the service worker is set to __/kitten/__. The service worker intercepts requests from pages in __/kitten/__ and __/kitten/lower/__ but not from pages like __/kitten__ or __/__. 



Note:  You cannot set an arbitrary scope that is above the service worker's actual location.



#### For more information

*  [Service worker registration object](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration)
*  [The register() method](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)
*  [Service worker scope](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/scope)

#### Solution code

To get a copy of the working code, navigate to the __solution__ folder.

<div id="congratulations"></div>


## Congratulations!




You now have a simple service worker up and running.


